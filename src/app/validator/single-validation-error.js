class ResponseValidationError {
  async serializeErrors(errors) {
    let listErrors = errors.map(err => {
      return { message: err}
    })
    return {
      errors: listErrors
    }
  }
}
  
module.exports = new ResponseValidationError()