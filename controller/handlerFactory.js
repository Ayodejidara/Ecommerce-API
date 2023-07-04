const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Product = require('./../model/productModel');

exports.deleteOne = Model => catchAsync(async(req,res,next) =>{
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc) return next(new AppError('No document found with ID',404));

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateOne = Model => catchAsync(async (req,res,next) =>{
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true
    });
 
    if(!doc) return next(new AppError('No document found with ID',404));
 
    res.status(200).json({
       status: 'success',
       data: {
          data: doc
       }
    })
 });

exports.createOne = Model => catchAsync(async (req,res,next) =>{
    const doc = await Model.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
}); 

exports.getOne = (Model, popOptions) => catchAsync(async (req,res,next) =>{
    let query = Model.findById(req.params.id)
    if(popOptions) query = query.populate(popOptions);
    const doc = await query;

    if(!doc){
        return next(new AppError('No document found with that ID',404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getAll = Model => catchAsync(async (req,res,next) =>{
    
    // To allow nested get reviews on Product
    let filter = {};
    if(req.params.productId) filter = { product: req.params.productId };

    const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const doc = await features.query;

    res.status(200).json({
    status: 'success',
    result: doc.length,
    data: {
        data: doc
    }
   });
});

exports.addProductDetails = Model => catchAsync(async(req,res,next) =>{

    if(!req.body.product) req.body.product = req.params.productId

    const product = await Product.findById(req.body.product);
    if(!product) return next(new AppError('No product found with ID',404));

    //Compare the currently logged in userId with the vendorId in the product model
    if(product.vendor.id != req.user.id) {
         return next(new AppError('Only vendor can update Product details'),401);
     };

    const newDoc= await Model.create(req.body);
     
    if (req.body.colors) {
        product.colors.push(newDoc.id);
        await product.save();
    };

    if (req.body.sizes) {
        product.sizes.push(newDoc.id);
        await product.save();
    };
    

    res.status(200).json({
     status: 'success',
     data: {
        newDoc
     }
    });
});

