const { Role } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_GET_DATA, 
  ERROR_STORE_DATA,
  ERROR_UPDATE_DATA,
  ERROR_DELETE_DATA,
  DELETE_ROLE_MSG
} = require('../../utils/strings')

const {
  SERVER_ERROR, CREATED, OK
} = require('../../utils/codes')

class RoleController {

  async index (req, res) {
    try {
      let roles = await Role.find().select('-__v')
      return res.json({
        roles
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async show (req, res) {
    try {
      let id = req.params.id
      let role = await Role.findById(id).select('-__v')

      return res.json({
        role
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async store (req, res) {
    try {
      let data = req.body

      let role = new Role(data)
      let userSaved = await role.save()

      return res.status(CREATED).json(userSaved)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

  async update (req, res) {
    try {
      let id = req.params.id

      let data = req.body
      let roleUpdated = await Role.findByIdAndUpdate(id, data, {new: true, runValidators: true})

      return res.status(OK).json(roleUpdated)
    } catch (err) {
      let error = err.message || ERROR_UPDATE_DATA
      return res.status(SERVER_ERROR).json(await serializeErrors([error]))
    }
  }

  async destroy (req, res) {
    try {
      let id = req.params.id

      await Role.findByIdAndDelete(id)
      return res.json(DELETE_ROLE_MSG)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_DELETE_DATA]))
    }
  }
}

module.exports = new RoleController