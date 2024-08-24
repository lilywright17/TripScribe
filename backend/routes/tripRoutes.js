const express = require('express'); 
const { getTrips, getTripByID } = require('../controllers/tripController');
const jwtAuthentication = require('../middleware/auth.js');

const router = express.Router();

router.get('/trips', jwtAuthentication, getTrips);
router.get('/trips/:tripID', jwtAuthentication, getTripByID); 

module.exports = router;