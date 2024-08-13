require('dotenv').config();
const express = require('express');
const cors = require('cors');
const uploadImages = require('./config/uploadImages'); 
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Endpoint for uploading images to Cloudinary
app.post('/uploadImages', async (req, res) => {
    try {
        const images = req.body.images; 
        
        if (!images || !images.length) {
            return res.status(400).send({ error: 'No images provided' });
        }
        
        // Upload the images to Cloudinary
        const imageUrls = await uploadImages(images); 
        
        // Send back the URLs
        res.send({ urls: imageUrls });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send({ error: 'Failed to upload images' });
    }
});

// Endpoint for adding a trip
app.post('/addTrip', (req, res) => {
    try {
        const tripData = req.body;
        
        // Save tripData to a database
        // TODO: Implement database logic here
        
        res.status(200).send({ message: 'Trip added successfully' });
    } catch (error) {
        console.error('Error adding trip:', error);
        res.status(500).send({ error: 'Failed to add trip' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
});

