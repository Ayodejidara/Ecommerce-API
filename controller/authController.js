const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/Email');
const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');

const signToken = id =>{
  return jwt.sign({id},process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES_IN
  })
};

const createSendToken = (res,user,statusCode) =>{
  const token = signToken(user._id);

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    })
};

exports.signUp = catchAsync(async (req,res,next) =>{
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${req.protocol}://${req.get('host')}/me`;
  console.log(url);

  await new Email(newUser,url).sendWelcome();

  createSendToken(res,newUser,201)
});

exports.login = catchAsync( async(req,res,next) =>{
  const { email,password } = req.body;

  if(!(email || password)) {
    return next(new AppError('Please provide email and password',400));
  };

  const user = await User.findOne({ email }).select('+password');

  if(!user || !(await user.comparePassword(password,user.password))) {
    return next(new AppError('Incorrect email or password',401));
  };

  createSendToken(res,user,201);
});

exports.protect = catchAsync(async (req,res,next) =>{
  let token;
  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return next(new AppError('You are not logged In!. Please login to access this route',401));

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(decoded.id);

    if(!currentUser){
      return next(new AppError('The user belonging to this token does no longer exist',401));
    };

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    };
    
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) =>{
  return (req,res,next) =>{
     if(!roles.includes(req.user.role)){
      return next(new AppError('You do not have permission to perform this action',401))
     }
     next()
  }
}