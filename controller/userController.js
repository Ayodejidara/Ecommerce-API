const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../model/userModel');

const filterObj = (obj, ...allowedFields) =>{
   const newObj = {}
    Object.keys(obj).forEach(el =>{
      if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllUsers = catchAsync(async (req,res,next) =>{
   const user = await User.find();
   res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
       user
    }
   })
});

exports.getMe = catchAsync(async (req,res,next) =>{
   req.params.id = req.user.id;
   next();
});

exports.getUser = catchAsync(async (req,res,next) =>{
   const user = await User.findById(req.params.id);
   if(!user) return next(new AppError('No user found with ID',404));
   res.status(200).json({
      status: 'success',
      data: {
         user
      }
   })
});

exports.updateUser = catchAsync(async (req,res,next) =>{
   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
   });

   if(!user) return next(new AppError('No user found with ID',404));

   res.status(200).json({
      status: 'success',
      data: {
         user
      }
   })
});

exports.deleteUser = catchAsync(async (req,res,next) =>{
   const user = await User.findByIdAndDelete(req.params.id);
   if(!user) return next(new AppError('No user found with ID',404));

   res.status(204).json({
      status: 'success',
      data: null
   });  
});

exports.updateMe = catchAsync(async (req,res,next) =>{
   //Create error if user tries to update password
   if(req.body.password || req.body.passwordConfirm) {
   return next(new AppError('This route is not for password updates. Please use /updateMyPaassword!',400));
   };

   //Filter Out unwanted field names that should not be updated
   const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');

   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
   });

   res.status(200).json({
      status: 'success',
      data: {
         user: updatedUser
      }
   });
});

exports.deleteMe = catchAsync(async (req,res,next) =>{
   await User.findByIdAndUpdate(req.user.id, { active: false });

   res.status(204).json({
      status: 'success',
      data: null
   });
});