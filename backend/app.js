const express = require('express');
const cors = require('cors');
const uploadImage = require('./config/uploadImages'); 
const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/uploadImages', async (req, res) => {
    try {
        const image = req.body.image;
    
        if (!image) {
            return res.status(400).send({ error: 'No image provided' });
        }

        // Upload the image to Cloudinary
        const imageUrl = await uploadImage(image);
        
        // Send back the URL
        res.send({ url: imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ error: 'Failed to upload image' });
    }
});

app.post('/addTrip', (req, res) => {
    try {
        const tripData = req.body;
        
        // Save tripData to a database
        //TODO: database logic here)
        
        res.status(200).send({ message: 'Trip added successfully' });
    } catch (error) {
        console.error('Error adding trip:', error);
        res.status(500).send({ error: 'Failed to add trip' });
    }
});

/*function storeImageAndGetUrl(imageBase64) {
    // Decode the base64 string
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique filename
    const filename = `${uuidv4()}.png`;
    const filePath = path.join(__dirname, 'images', filename);

    // Save the image to the images folder
    fs.writeFileSync(filePath, buffer);

    // Return the URL where the image can be accessed
    return `http://localhost:5000/images/${filename}`;
}*/

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
});