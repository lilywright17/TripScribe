const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userProfileController.js');
const jwtAuthentication = require('../middleware/auth.js');

router.get('/user/:userID', jwtAuthentication, getUserProfile);

module.exports = router;