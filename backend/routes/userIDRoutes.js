const express = require('express');
const { getUserID } = require('../controllers/userIDController');

const router = express.Router();

// All the [new]user related routes will be included below and the imported in server.js

router.post('/userID' , getUserID);

module.exports = router;