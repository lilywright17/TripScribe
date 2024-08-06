import React from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import "./addTrip.css";

export const AddTripForm = () => {
    return (
        <>
            <div className='addTripForm'>
                <div className="formContainer">
                    <div className="inputColumn">
                        <Input labelText="Country" inputType="text" placeholderText="Enter the country" />
                        <Input labelText="City/Town" inputType="text" placeholderText="Enter the city or town" />
                        <Input labelText="Start Date" inputType="date"/>
                        <Input labelText="End Date" inputType="date"/>
                    </div>
                    <div className="textAreaContainer">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" rows="8" cols="50" placeholder="Enter a description of the trip"></textarea> 
                    </div>
                </div>
            </div>
            <div className="buttonContainer">
                <Button text="BACK TO ?" /> {/*Replace with Secondary Button*/}
                <Button text="SAVE MY TRIP" />
            </div>
        </>
    );
}
