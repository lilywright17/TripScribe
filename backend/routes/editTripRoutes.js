const express = require('express');
const { editTripByID } = require('../controllers/editTripController');
const jwtAuthentication = require('../middleware/auth.js');

const router = express.Router();

// Route to edit the trip
router.put('/edittrip/:tripID', jwtAuthentication, editTripByID);

module.exports = router;