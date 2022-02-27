const router = require('express').Router();
const auth = require('../middlewares/auth');
const { updateUserInfoValidation } = require('../middlewares/userValidation');

const {
  updateUserInfo,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', auth, getUserInfo);
router.patch('/me', auth, updateUserInfoValidation, updateUserInfo);

module.exports = router;
