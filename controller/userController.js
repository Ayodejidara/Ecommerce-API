const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../model/userModel');

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