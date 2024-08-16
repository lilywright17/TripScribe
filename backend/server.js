const express = require("express"), bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const newTripRoutes = require('./routes/newTripRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => res.send("Server running"));

app.use(express.json());

// User routes
app.use('/api', authRoutes);// Use the link http://localhost:5000/api/register or http://localhost:5000/api/login
app.use('/api', tripRoutes);// Use the link http://localhost:5000/api/trips

// New trip + getUser routes

app.use('/api', newTripRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});