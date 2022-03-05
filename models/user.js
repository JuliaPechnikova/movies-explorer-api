const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnathorizedError = require('../errors/unathorized');
const {
  wrongEmailOrPassword,
  differentPasswordMessage
} = require('../utils/error-messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: (email) => validator.isEmail(email) },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnathorizedError(wrongEmailOrPassword));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError(differentPasswordMessage));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
