import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import Standing from "./Standing.svg";
import Humaaan from "./Humaaan.svg";
import { NotePencil } from "@phosphor-icons/react";
import './userProfile.css'

export const UserProfileView = () => {
    //TODO: enable edit view- review value - replace with data form userTables
    const navigate = useNavigate();

    const handleEditProfileClick = () => {
        navigate('/userProfileEdit');
    };
    
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
                      <Button 
                      icon={<NotePencil size={24} weight='bold' padding='' />} 
                      text='EDIT PROFILE'
                      handleEditProfileClick={handleEditProfileClick}  
                      />
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
  