const { celebrate, Joi } = require('celebrate');

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(true),
    nameEN: Joi.string().required(true),
    trailerLink: Joi.string().pattern(/^(https?:\/\/)(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/).required(true),
    thumbnail: Joi.string().pattern(/^(https?:\/\/)(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/).required(true),
    image: Joi.string().pattern(/^(https?:\/\/)(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/).required(true),
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
    movieId: Joi.string().length(24).hex(),
  }),
});
