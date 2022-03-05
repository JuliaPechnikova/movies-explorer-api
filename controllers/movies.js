const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/unathorized');
const ForbiddenError = require('../errors/forbidden');
const okCode = require('../utils/error-codes');
const {
  invalidFilmDataMessage,
  invalidIdMessage,
  filmIdNotFoundMessage,
  deleteForeignFilmMessage
} = require('../utils/error-messages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.status(okCode).send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    trailerLink,
    thumbnail,
    image,
    country,
    director,
    duration,
    year,
    description,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    nameRU,
    nameEN,
    trailerLink,
    thumbnail,
    image,
    country,
    director,
    duration,
    year,
    description,
    owner,
    movieId,
  })
    .then((movie) => res.status(okCode).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'Bad Request') {
        next(new BadRequestError(invalidFilmDataMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError(filmIdNotFoundMessage))
    .then((movieOwner) => {
      if (movieOwner.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(req.params.movieId)
          .orFail(() => new NotFoundError(filmIdNotFoundMessage))
          .then((movie) => res.status(okCode).send(movie))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError(invalidIdMessage));
            } else {
              next(err);
            }
          });
      } else {
        next(new ForbiddenError(deleteForeignFilmMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(invalidIdMessage));
      } else {
        next(err);
      }
    });
};
