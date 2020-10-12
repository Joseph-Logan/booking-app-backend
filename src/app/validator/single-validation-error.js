class ResponseValidationError {
  statusCode = 400

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