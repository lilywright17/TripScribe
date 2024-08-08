import React, { useEffect, useRef } from 'react';
import { Cloudinary as CoreCloudinary } from 'cloudinary-core';

const UploadWidgetCloudinary = ({ onUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = CoreCloudinary.new({ cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME });
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: true,  // Allow multiple uploads
        folder: 'private_uploads', // Optional, specify the folder to save the uploads
        resource_type: 'image',
        clientAllowedFormats: ['jpeg', 'png'],
        maxImageFileSize: 10000000, // 10MB
        maxImageWidth: 2000,
        cropping: false,
        private: true, // Make uploads private
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          onUpload(result.info);
        }
      }
    );
  }, [onUpload]);

  const showWidget = () => {
    widgetRef.current.open();
  };

  return (
    <button onClick={showWidget}>Upload Images</button>
  );
  
};


export default UploadWidgetCloudinary;