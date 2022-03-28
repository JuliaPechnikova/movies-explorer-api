const { unathorizedCode } = require('../utils/error-codes');

class UnathorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = unathorizedCode;
  }
}

module.exports = UnathorizedError;
