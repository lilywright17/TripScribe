// require('dotenv').config();

const express = require('express');
const db = require('../../../backend/tripscribedb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`)
})
