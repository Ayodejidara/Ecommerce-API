const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const Review = require('./../model/reviewModel');

exports.createReview =  catchAsync(async (req,res,next) =>{
    const newReview = await Review.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});

exports.getAllReviews = catchAsync(async (req,res,next) =>{
    const reviews= await  Review.find();
 
    res.status(200).json({
     status: 'success',
     result: reviews.length,
     data: {
         reviews
     }
    });
 });

 exports.getReview = catchAsync(async (req,res,next) =>{
    const review = await Review.findById(req.params.id);

    if(!review){
        return next(new AppError('No review found with that ID',404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});