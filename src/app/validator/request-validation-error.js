class RequestValidationError {
  statusCode = 400

  serializeErrors(errors) {
    return errors.map(err => {
      return { message: err.msg, field: err.param }
    })
  }
}

module.exports = RequestValidationError