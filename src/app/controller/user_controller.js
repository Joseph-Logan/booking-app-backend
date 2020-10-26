const { User } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA
} = require('../../utils/strings')

const {
  SERVER_ERROR
} = require('../../utils/codes')

class UserController {

  async index (req, res) {
    try {
      let users = await User.find().populate('projects', '-__v').select('-__v')

      return res.json({
        users
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async storeProjectByUserId (req, res) {
    try {
      let { projectId, userId } = req.body

      let userUpdated = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            projects: projectId
          }
        }, 
        {new: true}
      )

      return res.status(202).json(userUpdated)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }
}

module.exports = new UserController