const { verify, sign } = require('jsonwebtoken')
const { serializeErrors } = require('../app/validator/single-validation-error')

const validateActiveAuth = async (req, res, next) => {
  try {
    let getTokenValidated = await isValidToken(req)

    verify(getTokenValidated, process.env.SECRET_KEY)
    next()
  } catch (err) {
    res.status(400).send(await serializeErrors([err]))
  }
}

const isValidToken = async (req) => {
  const token = req.header('Authorization')
  if (!token) {
    throw 'Forbidden'
  }
  return token
}

const createToken = async (data) => {
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

module.exports = {
  validateActiveAuth,
  createToken
}