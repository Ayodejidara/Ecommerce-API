const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    color: String
});

module.exports = mongoose.model('Color', colorSchema);