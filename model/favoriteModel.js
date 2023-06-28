const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
});

favoriteSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'product',
        select: 'name'
    });
    next();
});

module.exports = mongoose.model('Favorite', favoriteSchema);