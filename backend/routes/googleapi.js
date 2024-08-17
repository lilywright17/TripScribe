const express = require('express');
const router = express.Router();
const { apiKey } = require('../config/googlemaps');

// Endpoint to get the API key
router.get('/apikey', (req, res) => {
  res.json({ apiKey });
});

module.exports = router;