const express = require('express');
const deleteTrip = require('../controllers/deleteTripController')
const jwtAuthentication = require('../middleware/auth.js');

const router = express.Router();

router.delete('/trips/:tripID', jwtAuthentication, deleteTrip);

module.exports = router;