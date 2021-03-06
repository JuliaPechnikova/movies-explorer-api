const { celebrate, Joi } = require('celebrate');

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(true),
    email: Joi.string().email().required(true),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(true),
    password: Joi.string().required(true),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(true),
    email: Joi.string().email().required(true),
    password: Joi.string().required(true),
  }),
});
