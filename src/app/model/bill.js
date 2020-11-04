const mongoose = require('mongoose')
const { USER } = require("../../utils/strings");

const BillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    max: 1024
  },
  transanctionId: {
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

module.exports = mongoose.model('Bill', BillSchema)