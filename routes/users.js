const router = require('express').Router();
const auth = require('../middlewares/auth');
const { updateUserInfoValidation } = require('../middlewares/userValidation');

const {
  updateUserInfo,
  getUserInfo,
} = require('../controllers/users');

router.get('/users/me', auth, getUserInfo);
router.patch('/users/me', auth, updateUserInfoValidation, updateUserInfo);

module.exports = router;
