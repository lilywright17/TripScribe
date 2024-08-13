/*import React, { useState } from 'react';
import UploadWidgetCloudinary from './uploadWidget';

const AddTripWidget = () => {
    const [images, setImages] = useState([]);
  
    const handleUpload = (imageInfo) => {
      setImages((prevImages) => [...prevImages, imageInfo]);
    };
  
    return (
      <div>
        <h2>Add Trip</h2>
        <UploadWidgetCloudinary onUpload={handleUpload} />
        <div>
          <h3>Uploaded Images</h3>
          <ul>
            {images.map((image, index) => (
              <li key={index}>
                <img src={image.secure_url} alt={image.original_filename} width="200" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
export default AddTripWidget;*/
