require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;

jest.mock('cloudinary', () => {
  const originalCloudinary = jest.requireActual('cloudinary');
  return {
      v2: {
          ...originalCloudinary.v2,  
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