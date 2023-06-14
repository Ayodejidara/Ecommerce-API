const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('./../controller/authController');
const colorController = require('./../controller/colorController');


router.route('/')
.post(authController.protect,
      colorController.addProductColor);

module.exports = router;
