// require('dotenv').config();
const express = require("express"), bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server running"));

app.use(express.json());

// User routes
app.use('/api', authRoutes);// Use the link http://localhost:5000/api/register or http://localhost:5000/api/login
app.use('/api', tripRoutes);// Use the link http://localhost:5000/api/trips

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});