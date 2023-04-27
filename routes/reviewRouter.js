const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('./../controller/authController');
const reviewController = require('./../controller/reviewController');

router.route('/')
.get(reviewController.getAllReviews)
.post(
    authController.protect,
    authController.restrictTo('customer'),reviewController.createReview
    );

module.exports = router;