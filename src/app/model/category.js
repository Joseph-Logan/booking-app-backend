const mongoose = require('mongoose')

const Category = new mongoose.Schema({
  name: {
    type: String,
    max: 20,
    min: 2,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Category', Category)
