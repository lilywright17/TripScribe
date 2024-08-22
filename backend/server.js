const express = require('express'), bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const newTripRoutes = require('./routes/newtTripRoutes');
const deleteTripRoute = require('./routes/deleteTripRoute')
const googleRoute = require('./routes/googleRoute');
const userProfileRoutes = require('./routes/userProfileRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
    optionsSuccessStatus: 200,
    credentials: true 
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.get("/", (req, res) => res.send("Server running"));

app.use(express.json());

// User routes
app.use('/api', authRoutes);// Use the link http://localhost:8000/api/register or http://localhost:8000/api/login
app.use('/api', tripRoutes);// Use the link http://localhost:8000/api/trips
app.use('/api', newTripRoutes); // Use the link http://localhost:8000/api/imagesUpload or http://localhost:8000/api/addtrips
app.use('/api', googleRoute); // Use the link http://localhost:8000/api/google-maps-key
app.use('/api', deleteTripRoute); //Use the link http://localhost:8000/api/trips/:tripID
app.use('/api', userProfileRoutes); //Use the link http://localhost:8000/api/user/:userID

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
