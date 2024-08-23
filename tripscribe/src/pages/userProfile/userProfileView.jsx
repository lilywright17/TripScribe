import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logoutRedux } from '../../features/userRedux';
import { AuthContext } from "../../context/authContext";
import axios from 'axios';
import { Input } from "../../components/input/input";
import { Button }  from '../../components/button/button'
import Standing from "./Standing.svg";
import Humaaan from "./Humaaan.svg";
import './userProfile.css';

export const UserProfileView = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  const userRedux = useSelector((state)=>
    state.userRedux.value);

  const userID = sessionStorage.getItem("userID");

  const dispatch = useDispatch();

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

  const getFirstName = (fullname) => fullname.split(' ')[0];

  const handleLogOut = () => {
    sessionStorage.removeItem('userID'); 
    sessionStorage.removeItem('token'); 
    setIsAuthenticated(false);
    console.log('Token removed!') 
    dispatch(logoutRedux()); 
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
                <Input 
                  id= 'fullNameUserProfile' 
                  labelText='Full Name'  
                  value={userProfile?.fullname} 
                  readOnly={true} 
                />                
                <Input 
                  id= 'emailUserProfileView' 
                  labelText='Email'  
                  value={userProfile?.email} 
                  readOnly={true}  
                />
                <Input 
                  id= 'passwordUserProfileView' 
                  labelText='Password'  
                  value={'********'} 
                  readOnly={true}  
                />    
                <Button text="LOG OUT" onClick={handleLogOut} />
              </div>
            </div>    
        </div>
        <div className='userProfileLeftSection'>
            <div className='userProfileIllustration'>
                <img src={Standing} alt='Standing Illustration' />
                <img src={Humaaan} alt='Humaaan Illustration' />
            </div>
        </div>
      </div>
    </>
  );
};
  