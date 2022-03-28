const router = require('express').Router();

const {
  login,
  createUser,
} = require('../controllers/users');

const { loginValidation, createUserValidation } = require('../middlewares/userValidation');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

module.exports = router;
