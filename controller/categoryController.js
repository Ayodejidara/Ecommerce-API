const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Category = require('./../model/categoryModel');

exports.createCategory =  catchAsync(async (req,res,next) =>{
    const newCategory = await Category.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            product: newCategory
        }
    });
});

exports.getAllCategories = catchAsync(async (req,res,next) =>{
    const categories = await  Category.find();
 
    res.status(200).json({
     status: 'success',
     result: categories.length,
     data: {
         categories
     }
    });
 });

 exports.getCategory = catchAsync(async (req,res,next) =>{
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new AppError('No category found with that ID',404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    });
});

exports.updateCategory = catchAsync(async (req,res,next) =>{
   const category = await Category.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
    runValidators: true
   });
   
   if(!category) return next(new AppError('No category found with ID',404));

   res.status(200).json({
    status: 'success',
    data: {
        category
    }
   });
});

exports.deleteCategory = catchAsync(async (req,res,next) =>{
    const category = await Category.findByIdAndDelete(req.params.id);

    if(!category) return next(new AppError('No category found with ID',404));

    res.status(204).json({
        status: 'success',
        data: null
    });
});