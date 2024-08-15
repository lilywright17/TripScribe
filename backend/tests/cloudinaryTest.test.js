require('dotenv').config(); // Load environment variables from the .env file
const cloudinary = require('cloudinary').v2;
const uploadImages = require('../config/uploadImages');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

describe('Cloudinary Image Upload', () => {
  it('should upload an image and return the secure_url', async () => {
    // Use a Base64 string or a valid file path for the test image
    const testImage = './tests/replacehere'; // Replace with an actual Base64 string or file path (upload it inside the test folder)

    const urls = await uploadImages([testImage]);

    // Expect the URL returned from Cloudinary
    expect(urls[0]).toMatch(/^https:\/\/res\.cloudinary\.com\/.+/);
  });

  it('should handle an error from Cloudinary', async () => {
    // You can still mock this if you want to test error handling
    jest.spyOn(cloudinary.uploader, 'upload').mockImplementationOnce((image, options, callback) => {
      // Simulate an upload error
      callback(new Error('Upload failed'), null);
    });

    const testImage = './tests/replacehere'; // Replace with an actual Base64 string or file path (upload it inside the test folder)

    await expect(uploadImages([testImage])).rejects.toThrow('Upload failed');

    // Restore the original implementation after the test
    cloudinary.uploader.upload.mockRestore();
  });
});