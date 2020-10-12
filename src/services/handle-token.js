const jwt = require('jsonwebtoken')

class HandleToken {

  async validateActiveAuth (req, res, next) {
    try {
      let getTokenValidated = await this.isValidToken(req)

      jwt.verify(getTokenValidated, process.env.SECRET_KEY)
      next()
    } catch (err) {
      res.status(400).send(err)
    }
  }

  async isValidToken (req) {
    const token = req.header('Authorization') 
    if (!token) {
      throw new Error('Forbidden')
    }
    return token
  }

  async createToken (data) {
    try {
      const token = jwt.sign({
        data
      }, process.env.SECRET_KEY)
  
      return token
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new HandleToken