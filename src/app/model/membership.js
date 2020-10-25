const { DEFAULT_DESCRIPTION, USD } = require('../../utils/strings')
const mongoose = require('mongoose')

const Membership = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    max: 50
  },
  start_date: {
    type: Date,
    default: new Date()
  },
  end_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: DEFAULT_DESCRIPTION
  },
  price_membership: {
    type: Number,
    default: 8.00
  },
  type_currency: {
    type: String,
    default: USD
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

module.exports = mongoose.model('Membership', Membership)