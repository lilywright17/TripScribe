const express = require('express'); 
const { getTrips } = require('../controllers/tripController');
const jwtAuthentication = require('../middleware/auth.js');

const router = express.Router();

// All the trip related routes will be included below and imported in server.js
// Added jwtAuthentication to protect the route
router.post('/trips', jwtAuthentication, getTrips);

module.exports = router;