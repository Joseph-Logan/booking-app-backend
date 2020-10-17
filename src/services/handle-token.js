const { verify, sign } = require('jsonwebtoken')
const { serializeErrors } = require('../app/validator/single-validation-error')

class HandleToken {

  async validateActiveAuth (req, res, next) {
    try {
      let getTokenValidated = await HandleToken.isValidToken(req)

      verify(getTokenValidated, process.env.SECRET_KEY)
      next()
    } catch (err) {
      res.status(400).send(await serializeErrors([err]))
    }
  }

  static async isValidToken (req) {
    const token = req.header('Authorization') 
    if (!token) {
      throw 'Forbidden'
    }
    return token
  }

  async createToken (data) {
    try {
      const token = sign({
        data,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, process.env.SECRET_KEY)
  
      return token
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new HandleToken()