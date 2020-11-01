const { User } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_UPDATE_DATA
} = require('../../utils/strings')

const {
  SERVER_ERROR,
  ACCEPTED
} = require('../../utils/codes')

const {
  checkPassword,
  bcryptPassword
} = require('../../services/password')

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

  async update (req, res) {
    try {
      let id = req.params.id
      let data = req.body

      let check = await checkPassword(data)
      if (check) {
        data.password = await bcryptPassword(data.password)
      }
      let userUpdated = await User.findByIdAndUpdate(id, data, {new: true})

      return res.json(userUpdated)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_UPDATE_DATA]))
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

      return res.status(ACCEPTED).json(userUpdated)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }
}

module.exports = new UserController
