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