const express = require('express');
const router = express.Router();

const authController = require('./../controller/authController');
const colorRouter = require('./colorRouter');
const sizeRouter = require('./sizeRouter');
const productController = require('./../controller/productController');
const reviewRouter = require('./../routes/reviewRouter');

router.use('/:productId/reviews', reviewRouter);
router.use('/:productId/color', colorRouter);
router.use('/:productId/size', sizeRouter);

router.route('/')
.get(productController.getAllProducts)
.post(
    authController.protect,
    authController.restrictTo('admin','vendor'),
    productController.createProduct
    );

router.route('/:id')
.get(productController.getProduct)
.patch(
    authController.protect,
    authController.restrictTo('admin','vendor'),
    productController.updateProduct
    )
.delete(
    authController.protect,
    authController.restrictTo('admin','vendor'),
    productController.deleteProduct
    );

module.exports = router;