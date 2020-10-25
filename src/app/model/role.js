const mongoose = require('mongoose')

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    unique: true
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

module.exports = mongoose.model('Role', Role)