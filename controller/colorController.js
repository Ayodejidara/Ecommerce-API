const Color = require('./../model/colorModel');
const factory = require('./handlerFactory');

exports.addProductColor =  factory.addProductDetails(Color);
exports.updateProductColor = factory.updateOne(Color);
exports.deleteColor = factory.deleteOne(Color);