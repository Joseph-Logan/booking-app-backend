const mongoose = require('mongoose')
const { MEMBERSHIP, DEFAULT_PATH_IMG, CATEGORY } = require('../../utils/strings')

const Project = new mongoose.Schema({
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MEMBERSHIP
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CATEGORY,
  },
  name: {
    type: String,
    max: 100,
    min: 6,
    required: true,
    unique: true
  },
  description: {
    type: String,
    max: 255,
    min: 10,
    required: true
  },
  url_image_path: {
    type: String,
    max: 1024,
    default: DEFAULT_PATH_IMG
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

module.exports = mongoose.model('Project', Project)
