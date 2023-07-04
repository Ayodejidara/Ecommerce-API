const factory = require('./handlerFactory');
const Size = require('./../model/sizeModel');

exports.addProductSize = factory.addProductDetails(Size);
exports.updateProductSize = factory.updateOne(Size);
exports.deleteProductSize = factory.deleteOne(Size);