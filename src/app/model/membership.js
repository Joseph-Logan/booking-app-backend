const { DEFAULT_DESCRIPTION, USD } = require('../../utils/strings')
const mongoose = require('mongoose')
const { createCode } = require('../../services/membership')

const Membership = new mongoose.Schema({
  code: {
    type: String,
    max: 50,
    unique: true
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
    default: 7.99
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

Membership.pre('save', async function (next) {
  try {
    this.code = await createCode()

    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Membership', Membership)