import React from "react";
import { Input } from "../../components/input/input";
import Standing from "./Standing.svg";
import Humaaan from "./Humaaan.svg";
import './userProfile.css';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from 'axios';

export const UserProfileView = () => {
    //TODO: enable edit view- review value - replace with data form userTables
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

    // added for Redux work
    const userRedux = useSelector((state)=>
      state.userRedux.value);

    // Acquiring the UserID from the sessionStorage
    const userID = sessionStorage.getItem("userID");

    useEffect(() => {
      const getUserProfile = async () => {
        try {
          if (userID){
            const response = await axios.get(
              `http://localhost:8000/api/user/${userID}`,
              {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
              }
            );
            // Logging response from BE
            console.log("API Response:", response.data); 
            setUserProfile(response.data);
          }else {
            setError('User ID is missing');
          }
        } catch (error) {
          console.error("Error fetching User details:", error);
          setError(error.response?.data?.message || 'Error fetching user profile');
        }
      };

      getUserProfile();
    }, [userID]);

    // Get the User's first name from fullname 
    const getFirstName = (fullname) => fullname.split(' ')[0];

    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <>
        <div className="userProfilePage">
          <div className="userProfileViewForm">
              <div className='formContainer'>
                <div className='inputColumn'>
                <h1>Hello {userRedux?.name || getFirstName(userProfile?.fullname || 'Guest')}!</h1>
                  <Input id= 'fullNameUserProfile' labelText='Full Name'  value={userProfile?.fullname} readOnly={true} />                
                  <Input id= 'emailUserProfileView' labelText='Email'  value={userProfile?.email} readOnly={true}  />
                  <Input id= 'passwordUserProfileView' labelText='Password'  value={'********'} readOnly={true}  />    
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
  