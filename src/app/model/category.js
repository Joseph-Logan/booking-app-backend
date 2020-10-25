const mongoose = require('mongoose')

const Category = new mongoose.Schema({
  name: {
    type: String,
    max: 20,
    min: 2,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Category', Category)