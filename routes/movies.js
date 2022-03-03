const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createMovieValidation, movieIdValidation } = require('../middlewares/movieValidation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.use('/movies');
router.get('/', auth, getMovies);
router.post('/', auth, createMovieValidation, createMovie);
router.delete('/:movieId', auth, movieIdValidation, deleteMovie);

module.exports = router;
