const uploadImages = require('../config/uploadImages'); 

const handleUploadImages = async (req, res) => {
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
};

module.exports = { handleUploadImages };