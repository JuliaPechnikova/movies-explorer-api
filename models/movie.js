const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: (link) => validator.isURL(link) },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: (link) => validator.isURL(link) },
  },
  image: {
    type: String,
    required: true,
    validate: { validator: (link) => validator.isURL(link) },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
