require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;
//const uploadImages = require('../config/cloudinary'); 


// Mocking specific methods to test cloudinnary upload and receive secure_url
jest.mock('cloudinary', () => {
  const originalCloudinary = jest.requireActual('cloudinary');
  return {
      v2: {
          ...originalCloudinary.v2,  // Keep all original methods
          uploader: {
              upload: jest.fn((path, options) => {
                  if (path === 'path/to/nonexistent/file.jpeg') {
                      return Promise.reject(new Error('ENOENT: no such file or directory, open \'' + path + '\''));
                  } else {
                      return Promise.resolve({
                          secure_url: 'http://example.com/secure_url.jpeg'
                      });
                  }
              })
          }
      }
  };
});

describe('Cloudinary Image Upload', () => {
  test('should upload an image and return the secure_url', async () => {
      const imagePath = 'path/to/existing/file.jpeg';
      
      const result = await cloudinary.uploader.upload(imagePath);
      
      expect(result.secure_url).toBe('http://example.com/secure_url.jpeg');
  });

  test('should handle missing file error', async () => {
      try {
          const imagePath = 'path/to/nonexistent/file.jpeg';
          
          await cloudinary.uploader.upload(imagePath);
      } catch (error) {
          expect(error.message).toContain('ENOENT');
      }
  });
});

//Real test case; upload image to cloudinary an receive secure url

/*cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

describe('Cloudinary Image Upload', () => {
  it('should upload an image and return the secure_url', async () => {
    // Use a Base64 string or a valid file path for the test image
    const testImage = './images (4).jpeg'; // Replace with an actual Base64 string or file path (upload it inside the test folder)

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

    const testImage = './images (4).jpeg'; // Replace with an actual Base64 string or file path (upload it inside the test folder)

    await expect(uploadImages([testImage])).rejects.toThrow('Upload failed');

    // Restore the original implementation after the test
    cloudinary.uploader.upload.mockRestore();
  });
});*/