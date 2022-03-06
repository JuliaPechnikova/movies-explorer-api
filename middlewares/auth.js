require('dotenv').config();

const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorized');
const { JWT_DEV } = require('../utils/config');
const { unathorizedMessage } = require('../utils/error-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnathorizedError(unathorizedMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV);
  } catch (err) {
    return next(new UnathorizedError(unathorizedMessage));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
