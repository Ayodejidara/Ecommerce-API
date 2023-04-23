const express = require('express');
const router = express.Router();

const authController = require('./../controller/authController');
const productController = require('./../controller/productController');

router.route('/')
.get(productController.getAllProducts)
.post(authController.protect,authController.restrictTo('admin','vendor'),productController.createProduct);

router.route('/:id')
.get(productController.getProduct)
.patch(authController.protect,
    authController.restrictTo('admin','vendor'),
    productController.updateProduct)
.delete(authController.protect,
    authController.restrictTo('admin','vendor'),
    productController.deleteProduct);

module.exports = router;