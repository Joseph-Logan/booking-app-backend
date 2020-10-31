const { Membership } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')

const {
  ERROR_STORE_DATA
} = require('../../utils/strings')

const {
  SERVER_ERROR, CREATED
} = require('../../utils/codes')

class MembershipController {

  async index (req, res) {
    try {

      let memberships = await Membership.find()

      return res.json({
        memberships
      })
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_GET_DATA]))
    }
  }

  async store (req, res) {
    try {
      let data = req.body
      let membership = new Membership(data)
      
      let membershipSaved = await membership.save()

      return res.status(CREATED).json(membershipSaved)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

}

module.exports = new MembershipController