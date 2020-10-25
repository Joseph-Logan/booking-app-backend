const { Role } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_UPDATE_DATA,
  ERROR_DELETE_DATA
} = require('../../utils/strings')

const {
  SERVER_ERROR, CREATED
} = require('../../utils/codes')


class RoleController {

  async index (req, res) {
    try {
      let roles = await Role.find().select('-__v')
      res.json({roles})
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async show (req, res) {

  }

  async store (req, res) {
    try {
      let data = req.body

      let role = new Role(data)
      let userSaved = await role.save()

      res.status(CREATED).json(userSaved)
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

  async update (req, res) {
    try {

    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_UPDATE_DATA]))
    }
  }

  async destroy (req, res) {
    try {

    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_DELETE_DATA]))
    }
  }
}

module.exports = new RoleController