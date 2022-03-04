const router = require('express').Router();
const NotFoundError = require('../errors/not-found');
const auth = require('../middlewares/auth');

router.use(require('./sign'));
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Запрос не найден'));
});

module.exports = router;
