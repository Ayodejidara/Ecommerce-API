const factory = require('./handlerFactory');
const Review = require('./../model/reviewModel');

exports.setProductUserIds = (req,res,next) =>{
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
};

exports.createReview =  factory.createOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review)
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);