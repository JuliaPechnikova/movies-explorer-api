const router = require('express').Router();
const NotFoundError = require('../errors/not-found');
const auth = require('../middlewares/auth');
const { requestNotFoundMessage } = require('../utils/error-messages');

router.use(require('./sign'));
router.use(require('./users'));
router.use(require('./movies'));

router.use(auth, (req, res, next) => {
  next(new NotFoundError(requestNotFoundMessage));
});

module.exports = router;
