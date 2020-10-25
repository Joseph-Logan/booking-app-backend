const mongoose = require('mongoose')
const { DEFAULT_DIRECTION, DEFAULT_PHONE_NUMBER } = require('../../utils/strings')

const Contact = new mongoose.Schema({
  direction: {
    type: String,
    max: 1024,
    default: DEFAULT_DIRECTION
  },
  phone_1: {
    type: String,
    max: 15
  },
  phone_2: {
    type: String,
    default: DEFAULT_PHONE_NUMBER
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

module.exports = mongoose.model('Contact', Contact)