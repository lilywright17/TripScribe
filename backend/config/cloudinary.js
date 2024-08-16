const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
    overwrite: true, 
    invalidate: true,
    resource_type: 'image',
};

const uploadImages = (images) => {
    return Promise.all(images.map(image => 
        new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image, opts, (error, result) => {
                if (error) {
                    console.error('Cloudinary Error:', error);
                    return reject(new Error(error.message || "An unknown error occurred"));
                }
                
                // Log the entire result to debug
                console.log('Cloudinary Upload Result:', result);
                
                if (result && result.secure_url) {
                    //console.log('Cloudinary Upload Success:', result.secure_url); //
                    return resolve(result.secure_url);
                } else {
                    return reject(new Error("Upload failed, no secure URL returned."));
                }
            });
        })
    ));
};

module.exports = uploadImages;