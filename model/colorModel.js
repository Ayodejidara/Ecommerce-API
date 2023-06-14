const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    colors: [String]
});

module.exports = mongoose.model('Color', colorSchema);