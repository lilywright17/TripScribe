const express = require('express');
const router = express.Router();
const { apiKey } = require('../config/googlemaps.js');

router.get('/google-maps-key', (req, res) => {
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }
  res.json({ apiKey });
});

module.exports = router; 