const { randomBytes } = require('crypto')
const { ERROR_CODE_MSG } = require('../utils/strings')

const createCode = async () => {
  try {
    let code = await generateRandomCode()
    return code
  } catch (err) {
    throw ERROR_CODE_MSG
  }
}

const generateRandomCode = async () => {
  return `${randomBytes(10).toString('hex')}-${Math.floor(Math.random() * 100)}`
}

module.exports = {
  createCode
}