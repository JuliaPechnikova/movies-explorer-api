const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const customValidator = (value, helper) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helper.message('Некорректно передана ссылка');
};

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(true),
    nameEN: Joi.string().required(true),
    trailerLink: Joi.string().required(true).custom(customValidator),
    thumbnail: Joi.string().required(true).custom(customValidator),
    image: Joi.string().required(true).custom(customValidator),
    country: Joi.string().required(true),
    director: Joi.string().required(true),
    duration: Joi.number().required(true),
    year: Joi.string().required(true),
    description: Joi.string().required(true),
    movieId: Joi.number().required(true),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
});
