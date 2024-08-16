const jwtAuthentication = require('../middleware/auth.js');
const express = require('express');
const { handleUploadImages } = require('../controllers/uploadImgController.js'); 
const { addNewTrip } = require('../controllers/newTripController.js');

const router = express.Router();

// Apply jwtAuthentication to protected routes
router.post('/uploadImages' , jwtAuthentication, handleUploadImages);
router.post('/addtrip' , jwtAuthentication, addNewTrip);

module.exports = router;