const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Review = require('./../model/reviewModel');

exports.createReview =  catchAsync(async (req,res,next) =>{
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user.id;
    const newReview = await Review.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});

exports.getAllReviews = catchAsync(async (req,res,next) =>{
    let filter = {};
    if(req.params.productId) filter = { product: req.params.productId }

    const reviews = await  Review.find(filter);
 
    res.status(200).json({
     status: 'success',
     result: reviews.length,
     data: {
         reviews
     }
    });
 });