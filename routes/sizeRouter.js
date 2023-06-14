const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('./../controller/authController');
const sizeController = require('./../controller/sizeController');


router.route('/')
.post(authController.protect,
      sizeController.addProductSize);

module.exports = router;
