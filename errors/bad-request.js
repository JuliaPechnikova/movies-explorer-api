const { badRequestCode } = require('../utils/error-codes');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = badRequestCode;
  }
}

module.exports = BadRequestError;
