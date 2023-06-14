const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Size = require('./../model/sizeModel');
const Product = require('./../model/productModel');

exports.addProductSize = catchAsync(async (req,res,next) =>{
    
    if(!req.body.product) req.body.product = req.params.productId

    const product = await Product.findById(req.body.product);
    if(!product) return next(new AppError('No product found with ID',404));

    //Compare the currently logged in userId with the vendorId in the product model
    if(product.vendor.id != req.user.id) {
         return next(new AppError('Only vendor can update Product details'),401);
     };

    const newSize = await Size.create(req.body);

    product.sizes = newSize.id;
    await product.save();

    res.status(200).json({
     status: 'success',
     data: {
        newSize
     }
    });
});