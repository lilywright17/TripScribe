import React, { useState } from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Standing from "./Standing.svg";
import Humaaan from "./Humaaan.svg";
import "./userProfile.css";

export const UserProfileView = () => {
    //TODO: enable edit view- review value - replace with data form userTables
    return (
      <>
        <div className="userProfilePage">
          <div className="userProfileViewForm">
              <div className='formContainer'>
                
                <div className='inputColumn'>
                <h1>Hi USERNAME!</h1>
                  <Input id= 'fullNameUserProfile' labelText='Full Name'  value= 'Jane Doe' readOnly />                
                  <Input id= 'emailUserProfileView' labelText='Email'  value='janedo@travelscribe.com' readOnly />
                  <Input id= 'passwordUserProfileView' labelText='Password'  value='********' readOnly /> 
                  <div className='buttonContainer'>
                      <Button text="EDIT"  />
                  </div>
                </div>
              </div>
  
            </div>
          <div className='userProfileLeftSection'>
              <div className='userProfileIllustration'>
                  <img src={Standing} alt="Standing Illustration" />
                  <img src={Humaaan} alt="Humaaan Illustration" />
              </div>
          </div>
        </div>
      </>
    );
  };
  