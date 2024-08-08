import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import SecondaryButton from "../../components/secondaryButton/secondaryButton";
import { ArrowLeft } from '@phosphor-icons/react';
import Modal from 'react-modal';
import "./addTrip.css";
import { AddTripImgUpload } from "./addTripImgUpload";

Modal.setAppElement('#root');

export const AddTripForm = () => {
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [errors, setErrors] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [images, setImages] = useState([]); // State to hold images
    const maxLength = 200;
    const navigate = useNavigate();// Initialize the useNavigate hook

    const handleDescriptionChange = (e) => {
        setDescriptionLength(e.target.value.length);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

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

        uploadImages();
        console.log(data)        // NEEED TO SEND FORM DATA TO THE DATABASE

        setModalIsOpen(true);
        e.target.reset();

        setTimeout(() => navigate("/mytrips"), 4000);
    };

    const handleSecondaryButtonClick = () => {
        navigate("/mytrips");
    };

    const uploadImages = () => {
        console.log('Images: ', images);
        //TODO: (Vic) need to research on how to add the logic to upload images cloudinary
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <AddTripImgUpload images={images} setImages={setImages} />
                <div className='addTripForm'>
                    <div className="formContainer">
                        <div className="inputColumn">
                            <Input 
                                labelText="Country" 
                                inputType="text" 
                                placeholderText="Enter the country" 
                                name="country"
                                style={{ borderColor: errors.country ? 'red' : '#ccc' }}
                            />
                            {errors.country && <div className="error">{errors.country}</div>}
                            
                            <Input 
                                labelText="City/Town" 
                                inputType="text" 
                                placeholderText="Enter the city or town" 
                                name="city"
                                style={{ borderColor: errors.city ? 'red' : '#ccc' }}
                            />
                            {errors.city && <div className="error">{errors.city}</div>}
                            
                            <Input 
                                labelText="Start Date" 
                                inputType="date" 
                                name="startDate"
                                style={{ borderColor: errors.date ? 'red' : '#ccc' }}
                            />
                            
                            <Input 
                                labelText="End Date" 
                                inputType="date" 
                                name="endDate"
                                style={{ borderColor: errors.date ? 'red' : '#ccc' }}
                            />
                            
                            {errors.date && <div className="error">{errors.date}</div>}
                        </div>
                        
                        <div className="textAreaContainer">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                rows="8" 
                                cols="50" 
                                placeholder="Enter a description of the trip"
                                maxLength={maxLength}
                                onChange={handleDescriptionChange}
                                style={{ borderColor: errors.description ? 'red' : '#ccc' }}
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
                        icon={<ArrowLeft size={20} />} 
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
