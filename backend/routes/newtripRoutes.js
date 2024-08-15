const express = require('express');
const { handleUploadImages } = require('../controllers/uploadImgController'); 
const { addNewTrip } = require('../controllers/newTripController');

const router = express.Router();

// All the [new]trip related routes will be included below and the imported in server.js

router.post('/uploadImages' , handleUploadImages);
router.post('/addtrip' , addNewTrip);

module.exports = router;