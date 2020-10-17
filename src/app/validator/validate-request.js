const { validationResult } = require('express-validator');
const RequestValidationError = require('./request-validation-error');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const validator = new RequestValidationError();
    return res.status(validator.statusCode).send({errors: validator.serializeErrors(errors.array())});
  }
  return next();
};

module.exports = validateRequest;
