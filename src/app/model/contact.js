const mongoose = require('mongoose')
const { DEFAULT_DIRECTION, DEFAULT_PHONE_NUMBER } = require('../../utils/strings')

const Contact = new mongoose.Schema({
  direction: {
    type: String,
    max: 1024,
    default: DEFAULT_DIRECTION
  },
  phone1: {
    type: String,
    max: 15
  },
  phone2: {
    type: String,
    default: DEFAULT_PHONE_NUMBER
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

module.exports = mongoose.model('Contact', Contact)