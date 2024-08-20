import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton";
import { ArrowLeft } from '@phosphor-icons/react';
import { ImgList } from "../../components/ImgList/ImgList";
import { AddTripImgUpload } from "../../components/uploadImages/addTripImgUpload";
import "./editTrip.css";

export const EditTripForm = () => {
    const [descriptionLength, setDescriptionLength] = useState(0);
    const maxLength = 500;
    const navigate = useNavigate();

    const handleDescriptionChange = (e) => {
        setDescriptionLength(e.target.value.length);
    };

    const handleSecondaryButtonClick = () => {
        navigate("/tripDetails");
    };


    return (
        <>
        <form className="editTripForm">
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
                name="startDate"
                //call the inputted data from user
            />

            <Input 
                labelText="End Date"
                inputType="date"
                name="endDate" 
                //call the inputted data from user
            />                       
        </div>

        <div className="editTripDescriptionContainer">
            <label htmlFor="description">Description</label>
            <textarea className="editTripTextDescription"
                id="description"
                name="description"
                rows="8"
                cols="50"
                placeholder="You can edit your trip details here..."
                maxLength={maxLength}
                onChange={handleDescriptionChange}
            ></textarea>
            <div className="characterCount">
                {descriptionLength}/{maxLength} characters
            </div>
        </div>

        <ImgList />

        <AddTripImgUpload />

        </form>

        <div className="editTripButtonContainer">
                <SecondaryButton 
                    text="GO BACK"
                    icon={<ArrowLeft size={20} />} 
                    handleClick={handleSecondaryButtonClick}
                />
                <Button text="SAVE MY CHANGES" type="submit" />
        </div>

        </>
        
    )   
}
