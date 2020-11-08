const mongoose = require('mongoose')

const { 
  PROJECT, 
  DEFAULT_PATH_IMG 
} = require('../../utils/strings')

const { createCode } = require('../../services/handle-code')

const Product = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PROJECT
  },
  code: {
    type: String,
    max: 50,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  stock: {
    type: Number,
    min: 0,
    required: true
  },
  price: {
    type: Number,
    min: 0.00, 
    default: 0.00
  },
  isActive: {
    type: Boolean,
    default: true
  },
  urlImagePath: {
    type: String,
    max: 1024,
    default: DEFAULT_PATH_IMG
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

Product.pre('save', async function (next) {
  try {
    this.code = await createCode()
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Product', Product)