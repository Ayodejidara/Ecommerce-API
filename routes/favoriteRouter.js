const express = require('express');
const router = express.Router();

const favoriteController = require('./../controller/favoriteController');

router.route('/')
.get(favoriteController.getFavorites)
.post(favoriteController.addFavorite);

router.route('/:id')
.delete(favoriteController.deleteFavorite);

module.exports = router;