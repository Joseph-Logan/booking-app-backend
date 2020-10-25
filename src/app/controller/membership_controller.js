const { Membership } = require('../model')
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

class MembershipController {

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