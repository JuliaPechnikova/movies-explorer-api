const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/unathorized');
const UnathorizedError = require('../errors/unathorized');
const ConflictError = require('../errors/conflict');
const okCode = require('../utils/error-codes');
const {
  invalidUpdateDataMessage,
  invalidCreateDataMessage,
  userIdNotFoundMessage,
  emailIsUsedMessage,
  wrongEmailOrPassword
} = require('../utils/error-messages');

require('dotenv').config();
const JWT_DEV = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnathorizedError(wrongEmailOrPassword));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.status(okCode).send({
      data: {
        name,
        email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(invalidCreateDataMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(emailIsUsedMessage));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(() => new NotFoundError(userIdNotFoundMessage))
    .then((user) => res.status(okCode).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(invalidUpdateDataMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(emailIsUsedMessage));
      } else {
        next(err);
      }
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(userIdNotFoundMessage))
    .then((user) => res.status(okCode).send(user))
    .catch(next);
};
