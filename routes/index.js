const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found');

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Запрос не найден'));
});

module.exports = router;
