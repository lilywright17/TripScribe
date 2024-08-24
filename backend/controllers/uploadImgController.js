const uploadImages = require('../config/cloudinary');

// Controller store images in Cloudinary
const handleUploadImages = async (req, res) => {
    try {
        const images = req.body.images;

        if (!images || !images.length) {
            return res.status(400).send({ error: 'No images provided' });
        }

        const imageUrls = await uploadImages(images);

        res.send({ urls: imageUrls });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send({ error: 'Failed to upload images' });
    }
};

module.exports = { handleUploadImages };