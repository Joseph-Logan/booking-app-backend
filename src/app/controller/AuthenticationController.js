const { validatePassword } = require('../../services/password')
const { createToken } = require('../../services/handle-token')
const { serializeErrors, statusCode } = require('../validator/single-validation-error')

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
      res.status(500).json({
        errors: [
          { 
            msg: "The register was failed, so try again" 
          }
        ]
      })
    }
  }
  /**
   * @param {Request} req
   * @param {Response} res
   * Recieve the param to validate authentication
   */
  async signInAndSendToken (req, res) {
    try {
      let { email, password } = req.body

      let validateCredentials = await AuthenticationController.validateAndSetCredentials(email, password)

      validateCredentials ? 
        res.json(await AuthenticationController.getCurrentUserAuthenticated())
        : res.status(401).json(await serializeErrors(["Your credentials are invalids"]))

    } catch (err) {
      res.status(statusCode).json(await serializeErrors([err]))
    }
  }

  static async validateAndSetCredentials (email, password) {
    let user = await AuthenticationController.findCurrentUserByEmail(email)
    AuthenticationController.user = user
    return await validatePassword(password, user.password)
  }

  static async findCurrentUserByEmail (email) {
    let user = await User.find({ email }).select('-__v')
    if (user.length > 0) {
      return user[AuthenticationController.firstUser]
    }
    throw 'Your credentials are invalids'
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