const { notFoundCode } = require('../utils/error-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFoundCode;
  }
}

module.exports = NotFoundError;
