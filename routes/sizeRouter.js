const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('./../controller/authController');
const sizeController = require('./../controller/sizeController');

router.use(authController.protect)

router.route('/')
.post(sizeController.addProductSize);

router.route('/:id')
.patch(sizeController.updateProductSize)
.delete(sizeController.deleteProductSize);

module.exports = router;
