const Category = require('./../model/categoryModel');
const factory = require('./handlerFactory');

exports.createCategory =  factory.createOne(Category);
exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.updateCategory = factory.updateOne(Category)
exports.deleteCategory = factory.deleteOne(Category)