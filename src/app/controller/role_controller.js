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
      res.json({
        roles
      })
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async show (req, res) {
    try {
      let id = req.params.id
      let role = await Role.findById(id).select('-__v')

      res.json({
        role
      })
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
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
      let id = req.params.id

      let data = req.body
      let roleUpdated = await Role.findByIdAndUpdate(id, data, {"new": true})

      res.status(OK).json(roleUpdated)
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_UPDATE_DATA]))
    }
  }

  async destroy (req, res) {
    try {
      let id = req.params.id

      await Role.findByIdAndDelete(id)
      res.json(DELETE_ROLE_MSG)
    } catch (err) {
      res.status(SERVER_ERROR).json(await serializeErrors([ERROR_DELETE_DATA]))
    }
  }
}

module.exports = new RoleController