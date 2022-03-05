const { forbiddenCode } = require('../utils/error-codes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbiddenCode;
  }
}

module.exports = ForbiddenError;
