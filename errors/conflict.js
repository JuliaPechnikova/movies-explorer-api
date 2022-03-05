const { conflictCode } = require('../utils/error-codes');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictCode;
  }
}

module.exports = ConflictError;
