import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton";
import { AddTripImgUpload } from "../../components/uploadImages/addTripImgUpload";
import { ArrowLeft } from '@phosphor-icons/react';
import axios from 'axios';
import Alert from '@mui/material/Alert'; 
import "./addTrip.css";

export const AddTripForm = () => {
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null); // State to hold success message
    const [errorMessage, setErrorMessage] = useState(null); // State to hold error message
    const [images, setImages] = useState([]); // State to hold images
    const maxLength = 500;
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const getUserIdFromToken = () => {
        const token = sessionStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            return decoded.id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };    
    
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
        data.imgUrls = images.map(image => image.url);

        // Add the userID to the trip data
        const userID = getUserIdFromToken();
        if (userID) {
            data.userID = userID;
        }

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
            const token = sessionStorage.getItem('token');; 

            await axios.post('http://localhost:8000/api/addtrip', data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Trip data submitted successfully:', data);
            setSuccessMessage("Your trip has been saved successfully!");

            e.target.reset();
            setImages([]); 

            setTimeout(() => navigate("/mytrips"), 4000);
        } catch (error) {
            console.error('Error submitting trip data:', error);
            setErrorMessage(error.response?.data?.error || "There was a problem saving your trip. Please try again.");
        }
    
        console.log(data);
    };

    const handleSecondaryButtonClick = () => {
        navigate("/mytrips");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='addTripContainer'>
                    <AddTripImgUpload 
                        inputType='file'
                        images={images} 
                        setImages={setImages} 
                        multiple 
                    />
                    <div className='addTripForm'>
                        <div className="formContainer">
                            <div className="inputColumn">
                                <Input 
                                    labelText="Country" 
                                    inputType="text" 
                                    placeholderText="Enter the country" 
                                    name="country"
                                    className={errors.country ? 'input-error' : ''}
                                />
                                {errors.country && <div className="error">{errors.country}</div>}
                                
                                <Input 
                                    labelText="City/Town" 
                                    inputType="text" 
                                    placeholderText="Enter the city or town" 
                                    name="city"
                                    className={errors.city ? 'input-error' : ''}
                                />
                                {errors.city && <div className="error">{errors.city}</div>}
                                
                                <Input 
                                    labelText="Start Date" 
                                    inputType="date" 
                                    name="startDate"
                                    className={errors.date ? 'input-error' : ''}
                                />
                                
                                <Input 
                                    labelText="End Date" 
                                    inputType="date" 
                                    name="endDate"
                                    className={errors.date ? 'input-error' : ''}
                                />
                                {errors.date && <div className="error">{errors.date}</div>}
                            </div>
                            
                            <div className="textAreaContainer">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    className={`text-description ${errors.description ? 'input-error' : ''}`}
                                    id="description" 
                                    name="description" 
                                    rows="8" 
                                    cols="50" 
                                    placeholder="Enter a description of the trip"
                                    maxLength={maxLength}
                                    onChange={handleDescriptionChange}
                                ></textarea>
                                {errors.description && <div className="error">{errors.description}</div>}
                                <div className="characterCount">
                                    {descriptionLength}/{maxLength} characters
                                </div>
                            </div>
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
                </div>
            </form>
            {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage(null)}>
                    {errorMessage}
                </Alert>
            )}
        </>
    );
};
