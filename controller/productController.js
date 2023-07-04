const factory = require('./handlerFactory');
const Product = require('./../model/productModel');

exports.createProduct = factory.createOne(Product);
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: 'reviews'});
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);