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
                ref: 'product',
                required: true
            },
            selectedColor: {
                type: mongoose.Types.ObjectId,
                ref: 'color',
                required: true
            },
            selectedSize: {
                type: mongoose.Types.ObjectId,
                ref: 'size',
                required: true
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

cartSchema.pre('save', function(next) {
    this.populate([
        {
            path: 'items.selectedColor',
            select: 'color'
        }, 
        {
            path: this.items.selectedSize,
            select:'size'
        }
    ]);
    next();
});

cartSchema.pre(/^find/, function(next) {
    this.populate([
        {
            path: 'items.selectedColor',
            select: 'color'
        },
        {
            path: 'items.selectedSize',
            select: 'size'
        }
    ]);
    next();
})


module.exports = mongoose.model('Cart', cartSchema);