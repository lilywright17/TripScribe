const express = require('express');
const { editTripByID } = require('../controllers/editTripController');
const jwtAuthentication = require('../middleware/auth.js');

const router = express.Router();

router.put('/edittrip/:tripID', jwtAuthentication, editTripByID);

module.exports = router;