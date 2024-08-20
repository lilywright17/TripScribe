const express = require('express');
const deleteTrip = require('../controllers/deleteTripController')
const jwtAuthentication = require('../middleware/auth.js');

const router = express.Router();

// Route to delete the trip from TripDetails page
router.delete('/trips/:tripID', jwtAuthentication, deleteTrip);

module.exports = router;