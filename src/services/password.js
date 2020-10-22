const bcrypt = require('bcryptjs')

const validatePassword = async (passwordFromUser, passwordStoraged) => {
  try {
    return bcrypt.compareSync(passwordFromUser, passwordStoraged)
  } catch (err) {
    throw 'Opp has ocurred error, try again'
  }
}

const bcryptPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  validatePassword,
  bcryptPassword
}

