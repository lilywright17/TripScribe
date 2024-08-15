const express = require('express'); 
const { getTrips } = require('../controllers/tripController');

const router = express.Router();

// All the trip related routes will be included below and the imported in server.js

router.get('/trips' , getTrips);

module.exports = router;