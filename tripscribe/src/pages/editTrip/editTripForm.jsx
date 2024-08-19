import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton";
import { ArrowLeft } from '@phosphor-icons/react';
import Modal from 'react-modal';
import "./editTrip.css";
import { ImgList } from "../../components/ImgList/ImgList";

export const EditTripForm = ( { trip }) => {
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const maxLength = 500;
    const navigate = useNavigate();

    const location = useLocation();
    const {
      country,
      city,
      startDate,
      endDate,
      images = [],
      description,
    } = location.state || {};
    
    const handleSecondaryButtonClick = () => {
        navigate("/tripDetails");
    };

    const handleSubmit = (e) => {
        setModalIsOpen(true);
        e.target.reset();

        setTimeout(() => navigate("/tripDetails"), 3000);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="EditTripInputBoxes">
            <h2 className="editTripTitle">Edit your trip</h2>
            <Input
                labelText="Country"
                inputType="text"
                placeholderText="You can edit the country here"
                name="country"  
            />

            <Input 
                labelText="City/Town"
                inputType="text"
                placeholderText="You can edit the city here"
                name="city"
            /> 

            <Input 
                labelText="Start Date"
                inputType="date"
                //call the inputted data from user
                name="startDate"
            />

            <Input 
                labelText="End Date"
                inputType="date"
                //call the inputted data from user
                name="endDate" 
            />                       
        </div>

        <div className="editTripDescriptionContainer">
            <label htmlFor="description">Description</label>
            <textarea className="editTripTextDescription"
                id="description"
                name="description"
                rows="8"
                cols="50"
                maxLength={maxLength}
            ></textarea>
            <div className="characterCount">
                {descriptionLength}/{maxLength} characters
            </div>
        </div>

        <ImgList />


        </form>

        <div className="editTripButtonContainer">
                <SecondaryButton 
                    text="GO BACK"
                    icon={<ArrowLeft size={20} />} 
                    handleClick={handleSecondaryButtonClick}
                />
                <Button text="SAVE MY CHANGES" type="submit" />
        </div>

        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Update Trip Form Submission Success"
            >
            <h1>Success!</h1>
            <h2>Your trip has been updated!</h2>
            <p>You will be redirected to your Trip Details...in 3, 2, 1!</p>
        </Modal>

        </>
        
    )   
}