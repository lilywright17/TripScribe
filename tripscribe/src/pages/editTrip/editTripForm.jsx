import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "../../components/input/input";
import { AddTripImgUpload } from "../../components/uploadImages/addTripImgUpload";
import { Button } from "../../components/button/button";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton";
import { ArrowLeft } from '@phosphor-icons/react';
import axios from 'axios';
import { Alert } from '@mui/material';
import './editTrip.css'; 

export const EditTripForm = () => {
  const [images, setImages] = useState([]);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate
  const maxLength = 500;

  const handleDescriptionChange = (e) => {
    setDescriptionLength(e.target.value.length);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Attach the Cloudinary image URLs to the data object
    data.imageUrls = images.map(image => image.url);

    const newErrors = {};
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (!data.startDate || !data.endDate) {
      newErrors.date = "Date cannot be empty";
    } else if (startDate > endDate) {
      newErrors.date = "Start date cannot be greater than end date";
    }

    if (!data.description) {
      newErrors.description = "Description cannot be empty";
    }

    if (!data.country) {
      newErrors.country = "Country cannot be empty";
    }

    if (!data.city) {
      newErrors.city = "City cannot be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/addtrip', data);
      console.log('Trip data submitted successfully:', data);

      setSuccessMessage("Your trip has been saved successfully!");

      e.target.reset();
      setImages([]); // Clear images after successful submission

      setTimeout(() => navigate("/mytrips"), 4000); // Navigate after 4 seconds
    } catch (error) {
      console.error('Error submitting trip data:', error);
    }

    console.log(data);
  };

  const handleSecondaryButtonClick = () => {
    navigate("/mytrips");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="edit-trip-form">
        <div className="form-row">
          <div className='input-container'>
            <Input 
              labelText="Country" 
              inputType="text" 
              placeholderText="Enter the country" 
              name="country"
              className={`input ${errors.country ? 'input-error' : ''}`}
            />
            {errors.country && <div className="error">{errors.country}</div>}
                                  
            <Input 
                labelText="City/Town" 
                inputType="text" 
                placeholderText="Enter the city or town" 
                name="city"
                className={`input ${errors.city ? 'input-error' : ''}`}
            />
            {errors.city && <div className="error">{errors.city}</div>}
                  
            <Input 
              labelText="Start Date" 
              inputType="date" 
              name="startDate"
              className={`input ${errors.date ? 'input-error' : ''}`}
            />
                                  
            <Input 
                labelText="End Date" 
                inputType="date" 
                name="endDate"
                className={`input ${errors.date ? 'input-error' : ''}`}
            />
            
          </div>
        </div>

        <div className="image-upload-container">
          <div className="images-display">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.url} alt={`Uploaded preview ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="upload-section">
            <AddTripImgUpload images={images} setImages={setImages} />
          </div>
      </div>

        {errors.date && <p className="error-message">{errors.date}</p>}
        {errors.description && <p className="error-message">{errors.description}</p>}
        {errors.country && <p className="error-message">{errors.country}</p>}
        {errors.city && <p className="error-message">{errors.city}</p>}

        <div className="textAreaContainer">
            <label htmlFor="description">Description</label>
            <textarea 
                className={`text-description ${errors.description ? 'input-error' : ''}`}
                id="description" 
                name="description" 
                rows="8" 
                cols="50" 
                placeholder="Enter a description of the trip"
                onChange={handleDescriptionChange}
                maxLength={maxLength}
            ></textarea>
              {errors.description && <div className="error">{errors.description}</div>}
              <div className="characterCount">
                  {descriptionLength}/{maxLength} characters
              </div>
        </div>
        <div className="buttonContainer">
          <SecondaryButton 
              text="MY TRIPS" 
              icon={<ArrowLeft size={24} weight='bold' padding='' />} 
              handleClick={handleSecondaryButtonClick} 
          />
          <Button text="SAVE MY TRIP" type="submit" />
        </div>
      </form>

      {successMessage && (
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
              {successMessage}
          </Alert>
      )}
    </>
  );
};
