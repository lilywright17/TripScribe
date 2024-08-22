import React, { useContext, useState, useEffect } from "react";
import { Input } from "../../components/input/input";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logoutRedux } from '../../features/userRedux';
import axios from 'axios';
//import { Button } from "@mui/material";
import { Button }  from '../../components/button/button'
import { AuthContext } from "../../context/authContext";
import Standing from "./Standing.svg";
import Humaaan from "./Humaaan.svg";
import './userProfile.css';

export const UserProfileView = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);


  // added for Redux work
  const userRedux = useSelector((state)=>
    state.userRedux.value);

  // Acquiring the UserID from the sessionStorage
  const userID = sessionStorage.getItem("userID");

  // Redux work
  const dispatch = useDispatch();

  // Access setIsAuthenticated from AuthContext
  const { setIsAuthenticated } = useContext(AuthContext);

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

  // Function to handle logout
  const handleLogOut = () => {
    sessionStorage.removeItem('userID'); // Remove token from sessionStorage
    sessionStorage.removeItem('token'); // Remove token from sessionStorage
    setIsAuthenticated(false);
    console.log('Token removed!') // Update authentication state to false
    dispatch(logoutRedux()); // Dispatch logout action for Redux 
  };

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
              <h2>Welcome {getFirstName(userProfile?.fullname || 'Guest')}</h2>
                <Input id= 'fullNameUserProfile' labelText='Full Name'  value={userProfile?.fullname} readOnly={true} />                
                <Input id= 'emailUserProfileView' labelText='Email'  value={userProfile?.email} readOnly={true}  />
                <Input id= 'passwordUserProfileView' labelText='Password'  value={'********'} readOnly={true}  />    
                <Button text="LOG OUT" onClick={handleLogOut} />
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
  