const { DEFAULT_DESCRIPTION, USD } = require('../../utils/strings')
const mongoose = require('mongoose')
const { createCode } = require('../../services/membership')

const Membership = new mongoose.Schema({
  code: {
    type: String,
    max: 50,
    unique: true
  },
  startDate: {
    type: Date,
    default: new Date()
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: DEFAULT_DESCRIPTION
  },
  priceMembership: {
    type: Number,
    default: 7.99
  },
  typeCurrency: {
    type: String,
    default: USD
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

Membership.pre('save', async function (next) {
  try {
    this.code = await createCode()

    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Membership', Membership)