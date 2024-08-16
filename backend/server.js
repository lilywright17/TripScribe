const express = require("express"), bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const newTripRoutes = require('./routes/newTripRoutes');


const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    //change port to whatever frontend is being run on
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => res.send("Server running"));

app.use(express.json());

// User routes
app.use('/api', authRoutes);// Use the link http://localhost:8000/api/register or http://localhost:8000/api/login
app.use('/api', tripRoutes);// Use the link http://localhost:8000/api/trips

// New trip

app.use('/api', newTripRoutes); // Use the link http://localhost:8000/api/addtrip



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});