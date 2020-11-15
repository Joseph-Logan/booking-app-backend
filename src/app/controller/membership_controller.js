const { Membership, Bill } = require('../model')
const { serializeErrors } = require('../validator/single-validation-error')
const { purchaseProcess } = require('../../services/payment')

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

  async pruchaseAndStoreMembership (req, res) {
    try {
      let { 
        membership_data, 
        card_credentials,
        user_data
      } = req.body

      let purchaseResult = await purchaseProcess(card_credentials)

      let billData = {
        user: user_data.id,
        price: card_credentials.amount,
        description: card_credentials.description,
        transanctionId: purchaseResult.data.charge_id
      }
      let bill = new Bill(billData)
      await bill.save()

      let membership = new Membership({
        ...membership_data,
        user: user_data.id,
        transactionId: purchaseResult.data.charge_id
      })
      let membershipSaved = await membership.save()

      return res.status(CREATED).json(membershipSaved)
    } catch (err) {
      let error = err.response ? err.response.data.detail : ERROR_STORE_DATA
      return res.status(SERVER_ERROR).json(await serializeErrors([error]))
    }
  }

  async findMembershipActivated (id) {
    let memberhsip = await Membership.findById(id)
    return memberhsip.isActive 
  }
}

module.exports = new MembershipController
