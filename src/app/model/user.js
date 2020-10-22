const { bcryptPassword } = require('../../services/password')
const mongoose = require('mongoose')

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  first_surname: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  second_surname: {
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
  is_enabled: {
    type: Boolean,
    default: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
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
    console.warn(err, 'catch')
  }
})

module.exports = mongoose.model('User', User)