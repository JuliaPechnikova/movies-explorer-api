const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createMovieValidation, movieIdValidation } = require('../middlewares/movieValidation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, createMovieValidation, createMovie);
router.delete('/movies/:movieId', auth, movieIdValidation, deleteMovie);

module.exports = router;
