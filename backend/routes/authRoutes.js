const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// All the Authentication routes will be included below and the imported in server.js
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;