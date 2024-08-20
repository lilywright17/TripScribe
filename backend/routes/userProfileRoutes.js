const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userProfileController.js');
const jwtAuthentication = require('../middleware/auth.js');

// Route to get user profile information by userID
router.get('/user/:userID', jwtAuthentication, getUserProfile);

module.exports = router;