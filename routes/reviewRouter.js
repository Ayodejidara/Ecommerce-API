const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('./../controller/authController');
const reviewController = require('./../controller/reviewController');

router.route('/')
.get(reviewController.getAllReviews)
.post(
    authController.protect,
    authController.restrictTo('customer'),
    reviewController.setProductUserIds,
    reviewController.createReview
    );

router.use(authController.protect);
router.use(authController.restrictTo('customer'));

router.route('/:id')
.get(reviewController.getReview)
.patch(
    authController.protect,
    authController.restrictTo('customer'),
    reviewController.updateReview
)
.delete(
    authController.protect,
    authController.restrictTo('customer'),
    reviewController.deleteReview
);    

module.exports = router;