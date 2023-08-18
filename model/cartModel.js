const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Enter your Email'],
        validate: {
            validator: validator.isEmail,
            message: 'Enter a valid email address'
        }
    },
    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            selectedColor: {
                type: 'String'
            },
            selectedSize: {
                type: 'String'
            },
            totalProductQuantity: {
                type: Number,
                required: true
            }, 
            totalProductPrice: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    }
},  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

module.exports = mongoose.model('Cart', cartSchema);