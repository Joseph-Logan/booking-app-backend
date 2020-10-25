const { validatePassword } = require('../../services/password')
const { createToken } = require('../../services/handle-token')
const { serializeErrors, statusCode } = require('../validator/single-validation-error')
const { 
  INVALID_CREDENTIALS, 
  REGISTER_FAILED 
} = require('../../utils/strings')

// MODELS
const { User } = require('../model')

class AuthenticationController {
  static firstUser = 0
  static user = {}

  /**
   * @param {Request} req
   * @param {Response} res
   * Recieve the param about the user or data has will to storage
   */
  async singUp (req, res) {
    try {
      let data = req.body
      let user = new User(data)
      
      let userRegistered = await user.save()
      res.status(201).json(userRegistered)

    } catch (err) {
      res.status(500).json(await serializeErrors([REGISTER_FAILED]))
    }
  }
  /**
   * @param {Request} req
   * @param {Response} res
   * Recieve the param to validate authentication
   */
  async signInAndSendToken (req, res) {
    try {
      let auth = AuthenticationController
      let { email, password } = req.body

      let validateCredentials = await auth.validateAndSetCredentials(email, password)

      validateCredentials ? 
        res.json(await auth.getCurrentUserAuthenticated())
        : res.status(401).json(await serializeErrors([INVALID_CREDENTIALS]))

    } catch (err) {
      res.status(statusCode).json(await serializeErrors([err]))
    }
  }

  static async validateAndSetCredentials (email, password) {
    let auth = AuthenticationController

    let user = await auth.findCurrentUserByEmail(email)
    auth.user = user
    return await validatePassword(password, user.password)
  }

  static async findCurrentUserByEmail (email) {
    let user = await User.find({ email }).select('-__v')
    if (user.length > 0) {
      return user[AuthenticationController.firstUser]
    }
    throw INVALID_CREDENTIALS
  }

  static async getCurrentUserAuthenticated () {
    let user = AuthenticationController.user
    return {
      user,
      token: await createToken(user)
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res 
   * Send the email and then this will must retuned a new password
   */
  async recoveryPassword (req, res) {
    try {

    } catch (err) {

    }
  }
  
  /**
   * @param {Request} req
   * @param {Response} res 
   * Return a new token
   */
  
  async refreshToken (req, res) {
    try {

    } catch (err) {

    }
  }

}

module.exports = new AuthenticationController 