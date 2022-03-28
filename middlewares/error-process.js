const { internalServerCode } = require('../utils/error-codes');
const { internalServerMessage } = require('../utils/error-messages');

module.exports = (err, req, res, next) => {
  const { statusCode = internalServerCode, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === internalServerCode
        ? internalServerMessage
        : message,
    });
  next();
};
