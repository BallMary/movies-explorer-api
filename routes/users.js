const router = require('express').Router();
const { validateUserPatch } = require('./validation');

const {
  getMe,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', validateUserPatch(), updateProfile);

module.exports = router;
