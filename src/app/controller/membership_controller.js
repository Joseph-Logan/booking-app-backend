const { Membership } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')
const { 
  getAccessToken,
  simplePurchase
} = require('../../services/payment')

const {
  ERROR_STORE_DATA,
  USD
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
      // TODO call membreship method purchase, it's will return a transactionId
      let data = req.body
      let membership = new Membership(data)
      
      let membershipSaved = await membership.save()

      return res.status(CREATED).json(membershipSaved)
    } catch (err) {
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

  async purchaseMembership (req, res) {
    try {
      let accessToken = await getAccessToken()
      // let cardCredentials = req.body
      let cardCredentials = { 
        amount: 7.99,
        description: `Compra de membresia`,
        entity_description: `Compra de membresia`,
        currency: USD,
        credit_card_number: 4242424242424242,
        credit_card_security_code_number: 123,
        exp_month: 12,
        exp_year: 2020
      }

      let resp = await simplePurchase(accessToken.data, cardCredentials)
      console.log(resp.data)
    } catch (err) {
      console.log(err)
      return res.status(SERVER_ERROR).json(await serializeErrors([ERROR_STORE_DATA]))
    }
  }

}

module.exports = new MembershipController