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

const checkPassword = async (data) => {
  if (data.hasOwnProperty('password')) {
    return true
  }
  return false
}

const deletePasswordInObject = async data => {
  let doc = {
    ...data._doc
  }
  delete doc.password
  return doc
}

module.exports = {
  validatePassword,
  bcryptPassword,
  checkPassword,
  deletePasswordInObject
}

