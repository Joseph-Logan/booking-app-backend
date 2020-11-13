const { DEFAULT_DESCRIPTION, USD, USER } = require('../../utils/strings')
const mongoose = require('mongoose')
const { createCode } = require('../../services/handle-code')

const Membership = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER
  },
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
  // TODO modify when is added to a project
  isActive: {
    type: Boolean,
    default: false
  },
  transactionId: {
    type: String,
    required: true,
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

Membership.pre('save', async function (next) {
  try {
    this.code = await createCode()

    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Membership', Membership)