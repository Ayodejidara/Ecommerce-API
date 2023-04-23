const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'A category must have a name']
   },
   description: {
      type: String,
      required: [true, 'A category must have a description']
   },
   image: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model('Category', categorySchema)