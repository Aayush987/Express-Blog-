const express = require('express');
const { register, login, profile, logout, getAuthorProfile } = require('../controllers/authController');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);
router.get('/profile/:username', getAuthorProfile);

module.exports = router;