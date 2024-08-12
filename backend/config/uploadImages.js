const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_API_KEY, 
  api_secret: process.env.REACT_APP_API_SECRET,
});

const opts = {
    overwrite: true, 
    invalidate: true,
    resource_type: 'image',
};

const uploadImages = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (error) {
                console.error(error.message || "An unknown error occurred");
                return reject({ message: error.message || "An unknown error occurred" });
            }

            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            } else {
                return reject({ message: "Upload failed, no secure URL returned." });
            }
        });
    });
};

module.exports = uploadImages;