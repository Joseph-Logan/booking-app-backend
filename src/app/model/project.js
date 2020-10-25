const mongoose = require('mongoose')
const { MEMBERSHIP, DEFAULT_PATH_IMG, CATEGORY } = require('../../utils/strings')

const Project = new mongoose.Schema({
  name: {
    type: String,
    max: 100,
    min: 6,
    required: true
  },
  description: {
    type: String,
    max: 255,
    min: 10,
    required: true
  },
  membership_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MEMBERSHIP,
    required: true
  },
  url_image_path: {
    type: String,
    max: 1024,
    default: DEFAULT_PATH_IMG
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CATEGORY,
    required: true
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
