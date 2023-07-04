const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('./../controller/authController');
const colorController = require('./../controller/colorController');

router.use(authController.protect)

router.route('/')
.post(colorController.addProductColor);

router.route('/:id')
.patch(colorController.updateProductColor)
.delete(colorController.deleteColor);

module.exports = router;
