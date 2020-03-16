const express = require('express');
const router = express.Router();
const userValidation = require('../users/utils/userValidation');

require('../../lib/passport');

const { 
  getLogin,
  getRegister,
  getProfile,
  getUpdateProfile,
  updateProfile,
  updatePassword,
  register,
  login,
  logout
} = require('../users/controllers/userController');

router.get('/register', getRegister);
router.get('/login', getLogin);
router.get('/profile', getProfile);
router.get('/update-profile', getUpdateProfile);
router.get('/logout', logout);

router.post('/register', userValidation, register);
router.post('/login', login);
router.put('/update-password', updatePassword);

router.put('/update-profile', (req, res, next) => {
  updateProfile(req.body, req.user._id)
    .then((user) => res.redirect('/api/users/profile'))
    .catch((err) => res.redirect('/api/users/update-profile'))
});

module.exports = router;
