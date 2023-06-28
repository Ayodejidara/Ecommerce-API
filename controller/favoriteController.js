const Favorite =  require('./../model/favoriteModel');
const factory = require('./handlerFactory');

exports.addFavorite = factory.createOne(Favorite);
exports.getFavorites = factory.getAll(Favorite);
exports.deleteFavorite = factory.deleteOne(Favorite);