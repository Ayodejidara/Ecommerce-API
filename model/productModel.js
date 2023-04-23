const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
   productName: {
    type: String,
    required: [true, 'Product must have a name'],
    trim: true
   },
   slug: String,
   coverImage: {
    type: String,
    required: [true, 'A product must hae a cover image']
   },
   images: [String],
   vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
   },
   description: {
    type: String,
    required: [true, 'A product must have a description']
   },
   price:{
    type: Number,
    required: [true, 'A product must have a price']
   },
   category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
   },
   priceDiscount: {
    type: Number,
    validate: {
        validator: function(val) {
            return val < this.price
        },
        message: 'Discount price ({VALUE}) should be below regular price'
    }
   },
   quantity: {
    type: Number,
    default: 0
   },
   Colors: String,
   sizes: String,
   sold: {
     type: Number,
     default: 0
   },
   inStock: {
    type: Boolean,
    default: true
   },
   ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10)/10
   },
   ratingsQuantity: {
    type: Number,
    default: 0
   }
});

productSchema.pre(/^find/, function(next){
  this.populate({
    path: 'vendor',
   select: 'firstName lastName email' 
  });
  next();
});

productSchema.pre(/^find/, function(next){
  this.populate({
    path: 'category',
   select: 'name' 
  });
  next();
});

module.exports = mongoose.model('Product',productSchema)