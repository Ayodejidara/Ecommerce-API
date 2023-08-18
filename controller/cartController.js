const Cart = require('./../model/cartModel');
const factory = require('./handlerFactory');

exports.addToCart = factory.createOne(Cart);
exports.getCartItems = factory.getAll(Cart);
exports.deleteCartItem = factory.deleteOne(Cart);