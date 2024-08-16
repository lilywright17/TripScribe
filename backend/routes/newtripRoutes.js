const jwtAuthentication = require('../middleware/auth.js');
const express = require('express');
const { handleUploadImages } = require('../controllers/uploadImgController.js'); 
const { addNewTrip } = require('../controllers/newTripController.js');

const router = express.Router();

// All the [new]trip related routes will be included below and the imported in server.js

router.get('/uploadImages' , jwtAuthentication, handleUploadImages);
router.get('/addtrip' , jwtAuthentication, addNewTrip);

module.exports = router;