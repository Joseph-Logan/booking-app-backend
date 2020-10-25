const { bcryptPassword } = require('../../services/password')
const mongoose = require('mongoose')
const { ROLE, PROJECT } = require('../../utils/strings')

const User = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ROLE
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: PROJECT
    }
  ],
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  firstSurname: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  secondSurname: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  dni: {
    type: String,
    required: true,
    min: 9
  },
  password: { 
    type: String, 
    required: true, 
    max: 1024, 
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
    unique: true
  },
  isEnabled: {
    type: Boolean,
    default: true
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

/**
* Always when event save is dispatched, it's will encrypt the password
*/
User.pre('save', async function (next) {
  try {
    let encryptedPassword = await bcryptPassword(this.password)
    this.password = encryptedPassword
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('User', User)