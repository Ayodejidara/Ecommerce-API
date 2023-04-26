const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Product = require('./../model/productModel');

exports.createProduct = catchAsync(async (req,res,next) =>{
    const newProduct = await Product.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    });
});

exports.getAllProducts = catchAsync(async (req,res,next) =>{
   const products = await  Product.find();

   res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
        products
    }
   });
});

exports.getProduct = catchAsync(async (req,res,next) =>{
    const product = await Product.findById(req.params.id).populate('reviews');

    if(!product){
        return next(new AppError('No product found with that ID',404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.updateProduct = catchAsync(async (req,res,next) =>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
     new: true,
     runValidators: true
    });
    
    if(!product) return next(new AppError('No product found with ID',404));
 
    res.status(200).json({
     status: 'success',
     data: {
         product
     }
    });
 });
 
 exports.deleteProduct = catchAsync(async (req,res,next) =>{
     const product = await Product.findByIdAndDelete(req.params.id);
 
     if(!product) return next(new AppError('No product found with ID',404));
 
     res.status(204).json({
         status: 'success',
         data: null
     });
 });