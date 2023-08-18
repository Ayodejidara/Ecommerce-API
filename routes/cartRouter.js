const express = require('express');

const cartController = require('./../controller/cartController');

const router = express.Router();

router.route('/')
.get(cartController.getCartItems)
.post(cartController.addToCart);

router.route('/:id')
.delete(cartController.deleteCartItem);

module.exports = router;