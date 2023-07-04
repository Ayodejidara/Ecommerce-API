const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({  
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    sizes: String
});

module.exports = mongoose.model('Size', sizeSchema);