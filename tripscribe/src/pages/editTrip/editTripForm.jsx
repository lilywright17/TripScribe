import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import AddTripImgUpload from "../../components/uploadImages/addTripImgUpload";
import SecondaryButton from "../../components/secondaryButton/secondaryButton";
import { ArrowLeft } from '@phosphor-icons/react';
import Modal from 'react-modal';
import './editTrip.css';

export const EditTripForm = () => {
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [errors, setErrors] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    //add state to hold images
    const maxLength = 250;
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

//toDo: add the uploaded images

        setModalIsOpen(true);
        e.target.reset();

        setTimeout(() => navigate("/tripDetails"), 3000);
    };

    const handleSecondaryButtonClick = () => {
        navigate("/tripDetails");
    };
    
    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="uploadImgContainer">
        {/* this is juts a shell component that needs to be connected to the API in order to fetch the exisiting photos and then change the photos that the user whats to edit */}
            <AddTripImgUpload /> 
        </div>

        <div className="editTripForm">
            <div className="editTripFormContainer">
                <div className="editTripInputColumn">
                    <Input 
                        labelText="Country"
                        inputType="text"
                        //call the inputted data from user
                        name="country"
                        style={{ borderColor: errors.country ? 'red' : '#ccc' }}    
                    />
                    {errors.country && <div className="error">{errors.country}</div>}

                    <Input 
                        labelText="City/Town"
                        inputType="text"
                        //call the inputted data from user
                        name="city"
                        style={{ borderColor: errors.city ? 'red' : '#ccc' }}   
                    />
                    {errors.city && <div className="error">{errors.city}</div>}

                    <Input 
                        labelText="Start Date"
                        inputType="date"
                        //call the inputted data from user
                        name="startDate"
                        style={{ borderColor: errors.date ? 'red' : '#ccc' }} 
                    />

                    <Input 
                        labelText="End Date"
                        inputType="date"
                        //call the inputted data from user
                        name="endDate"
                        style={{ borderColor: errors.date ? 'red' : '#ccc' }} 
                    />
                    {errors.date && <div className="error">{errors.date}</div>}
                </div>

                <div className="editTripTextAreaContainer">
                    <label htmlFor="description">Description</label>
                    <textarea className="editTripTextDescription"
                                id="description" 
                                name="description" 
                                rows="8" 
                                cols="50" 
                                //call the inputted data from the user
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

            <div className="editTripButtonContainer">
                <SecondaryButton 
                    text="GO BACK"
                    icon={<ArrowLeft size={20} />} 
                    handleClick={handleSecondaryButtonClick}
                />
                <Button text="SAVE MY CHANGES" type="submit" />

{/* toDo: add a delete icon/button */}

            </div>
            </form>

            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Form Submission Success"
            >
                <h1>Success!</h1>
                <h2>Your trip has been updated!</h2>
                <p>You will be redirected to your Trip Details...in 3, 2, 1!</p>
            </Modal>
        </>
    )
};