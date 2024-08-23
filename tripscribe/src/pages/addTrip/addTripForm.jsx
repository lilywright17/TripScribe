import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { SecondaryButton } from '../../components/secondaryButton/secondaryButton';
import { AddTripImgUpload } from '../../components/uploadImages/addTripImgUpload';
import { ArrowLeft } from '@phosphor-icons/react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './addTripForm.css';

export const AddTripForm = () => {
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null); 
    const [errorMessage, setErrorMessage] = useState(null); 
    const [images, setImages] = useState([]); 
    const maxLength = 500;
    const navigate = useNavigate(); 
    const [formValues, setFormValues] = useState({
        country: '',
        city: '',
        startDate: '',
        endDate: ''
    });

    const getUserIdFromToken = () => {
        const token = sessionStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            return decoded.userID;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }; 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
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

        data.imgUrls = images.map(image => image.url);

        data.date_from = data.startDate;
        data.date_to = data.endDate;
        delete data.startDate;
        delete data.endDate;

        const userID = getUserIdFromToken();
        if (userID) {
            data.userID = userID;
        }

        const newErrors = {};
        const startDate = new Date(data.date_from);
        const endDate = new Date(data.date_to);

        if (!data.date_from || !data.date_to) {
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
            const token = sessionStorage.getItem('token');
            
            const decoded = jwtDecode(token);
            console.log('Token expires at:', new Date(decoded.exp * 1000)); 
            
            await axios.post('http://localhost:8000/api/addtrip', data, {
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                }
            });

            console.log('Trip data submitted successfully:', data);
            setSuccessMessage("Your trip has been saved successfully!");

            e.target.reset();
            setImages([]); 

            setFormValues({
                country: '',
                city: '',
                startDate: '',
                endDate: '',
                description: '',
            });

            setTimeout(() => navigate("/mytrips"), 3000);
        } catch (error) {
            console.error('Error submitting trip data:', error);
            setErrorMessage(error.response?.data?.error || "There was a problem saving your trip. Please try again.");
        }
    };

    const handleSecondaryButtonClick = () => {
        navigate("/mytrips");
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='addTripBox'>
                <AddTripImgUpload 
                    inputType='file'
                    images={images} 
                    setImages={setImages} 
                    multiple 
                />
                <div className='addTripForm'>
                    <div className="formContainer">
                        <div className="inputColumn">
                            <div className='locationColumn'>
                                <Input 
                                    labelText="Country" 
                                    inputType="text" 
                                    placeholderText="Enter the country" 
                                    name="country"
                                    className={errors.country ? 'input-error' : ''}
                                    value={formValues.country}
                                    onChange={handleInputChange}
                                />
                                {errors.country && <div className="error">{errors.country}</div>}
                                
                                <Input 
                                    labelText="City/Town" 
                                    inputType="text" 
                                    placeholderText="Enter the city or town" 
                                    name="city"
                                    className={errors.city ? 'input-error' : ''}
                                    value={formValues.city}
                                    onChange={handleInputChange}
                                />
                                {errors.city && <div className="error">{errors.city}</div>}
                            </div>
                            <div className='datesColumn'>
                                <Input 
                                    labelText="Start Date" 
                                    inputType="date" 
                                    name="startDate"
                                    className={errors.date ? 'input-error' : ''}
                                    value={formValues.startDate}
                                    onChange={handleInputChange}
                                />
                                
                                <Input 
                                    labelText="End Date" 
                                    inputType="date" 
                                    name="endDate"
                                    className={errors.date ? 'input-error' : ''}
                                    value={formValues.endDate}
                                    onChange={handleInputChange}
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
                </div>
                <div className='buttonContainer'>
                    <SecondaryButton 
                        text='MY TRIPS' 
                        icon={<ArrowLeft size={24} 
                        weight='bold' 
                        padding='' 
                    />} 
                        handleClick={handleSecondaryButtonClick} 
                        style={{ borderRadius: "30px"}}
                    />
                    <Button 
                        text='SAVE MY TRIP' 
                        type='submit' 
                        style={{ borderRadius: "30px"}}
                    />
                </div>
                {successMessage && (
                    <Stack sx={{ width: '50%' }} spacing={2}>
                        <Alert 
                            variant="filled" 
                            severity="success" 
                            onClose={() => setSuccessMessage(null)}
                            sx={{ fontSize: '1.25rem' }}
                        >
                            {successMessage}
                        </Alert>
                    </Stack>
                )}
                {errorMessage && (
                    <Stack sx={{ width: '50%' }} spacing={2}>
                        <Alert 
                            variant="filled" 
                            severity="error" 
                            onClose={() => setErrorMessage(null)}
                            sx={{ fontSize: '1.25rem' }}
                        >
                            {errorMessage}
                        </Alert>
                    </Stack>
                )}
            </div>     
        </form>
    );
};
