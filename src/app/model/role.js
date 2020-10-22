const mongoose = require('mongoose')

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50
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

module.exports = mongoose.model('Role', Role)