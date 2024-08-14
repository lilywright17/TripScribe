import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton";
import { AddTripImgUpload } from "../../components/uploadImages/addTripImgUpload";
import { ArrowLeft } from '@phosphor-icons/react';
import axios from 'axios';
import Modal from 'react-modal';
import "./addTrip.css";

Modal.setAppElement('#root');


export const AddTripForm = () => {
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [errors, setErrors] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [images, setImages] = useState([]); // State to hold images
    const [urls, setUrls] = useState([]); // State to hold the uploaded image URLs
    const maxLength = 200;
    const navigate = useNavigate();// Initialize the useNavigate hook

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

        data.imageUrls = urls;

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
            await axios.post('http://localhost:5000/addTrip', data);
            console.log('Trip data submitted successfully:', data);

            setModalIsOpen(true);
            e.target.reset();
            setUrls([]); 

            setTimeout(() => navigate("/mytrips"), 4000);
        } catch (error) {
            console.error('Error submitting trip data:', error);
        }

        console.log(data)
    };

    const handleSecondaryButtonClick = () => {
        navigate("/mytrips");
    };

    const convertBase64 = (files) => {
        return new Promise((resolve, reject) => {
            const filesReader = new FileReader();
            filesReader.readAsDataURL(files);

            filesReader.onload = () => {
                resolve(filesReader.result);
            };

            filesReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImages = async (event) => {
        const files = Array.from(event.target.files);
        console.log(`Number of files selected: ${files.length}`); // Debugging line

        const uploadPromises = files.map(async (file) => {
            const base64 = await convertBase64(file);
            return axios.post('http://localhost:5000/uploadImages', { image: base64 })
                .then(res => {
                    console.log(`Uploaded URL: ${res.data.url}`); // Debugging line
                    return res.data.url;
                })
                .catch(err => {
                    console.error('Error uploading image:', err);
                    throw err;
                });
        });

        try {
            const uploadedUrls = await Promise.all(uploadPromises); 
            setUrls(prevUrls => [...prevUrls, ...uploadedUrls]);
            console.log('Images uploaded successfully:', uploadedUrls);
        } catch (err) {
            console.error('Error uploading images:', err);
        }
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
                        onChange={uploadImages}
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
                </div>
                <div className="buttonContainer">
                    <SecondaryButton 
                        text="MY TRIPS" 
                        icon={<ArrowLeft size={24} weight='bold' padding= '' />} 
                        handleClick={handleSecondaryButtonClick} 
                    />
                    <Button text="SAVE MY TRIP" type="submit" />
                </div>
            </form>

            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Form Submission Success"
            >
                <h1>Success!</h1>
                <h2>Your trip has been saved!</h2>
                <p>You will be redirected to My Trips...in 3, 2, 1!</p>
            </Modal>
        </>
    );
};
