import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import groupImage from '../register/Group 2.png';
import { Button } from '../../components/button/button.jsx';
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton.jsx";
import './login.css';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../../features/userRedux.js';


export const LogIn = () => {
    // for react hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailure, setLoginFailure] = useState(false);
    const [failMessage, setFailMessage] = useState('');
    const [loginVisibility, setLoginVisibility] = useState(false);

    const navigate = useNavigate();

     // redux work
     const dispatch = useDispatch();

    // Triggers animation when login page loads
    useEffect(() => {setLoginVisibility(true);}, []);

    function validateForm() {
        return email.length > 5 && password.length >= 6 && validateEmail(email);
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    //links to API
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password
            });

            const { token, user } = response.data;
            // Acquiring the userID from the response
            const userID = user?.id; 
            console.log("userID is:", userID);

            if (!userID) {
                throw new Error('User ID not found in response');
            }

            // Store the token in SessionStorage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userID', userID);

            setLoginFailure(false);

            //added below for redux
           dispatch(loginRedux({name:'Tripscriber'}));
        
           //add in timeout to allow state change
           setTimeout(() => {
            navigate('/mytrips');
          }, 100);
        } catch (error) {
            setLoginFailure(true);
            setFailMessage(error.response?.data?.message || 'An unexpected error occurred. Please try again later.');
            console.error('Login error:', error);
        }
    }, [email, password, navigate]);

    const toRegister = () => {
        setLoginVisibility(false);
        navigate('/register');
    };

    return (
        <div className="login">
            
            <div className={`main-box login-animation ${loginVisibility ? 'visible' : 'hidden'}`}>
                <div className='login-container'>
                    <h1 className="h-signin">Sign In</h1>
                </div>
                {loginFailure && <p className='error-text'>{failMessage}</p>}
                <form className="form-submit" onSubmit={handleSubmit}>
                    <div className = "form-group">
                        <label className="label-input" htmlFor="email">Email</label>
                        <input className="input"
                            autoFocus
                            type="email"
                            id="email"
                            placeholder="Enter your email here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-input" htmlFor="password">Password</label>
                        <input className="input"
                            type="password"
                            id="password"
                            placeholder="Enter your password here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='button-container'>
                        <Button
                            className='button-submit'
                            text='LOG IN'
                            type='submit'
                            disabled={!validateForm()}
                        />
                    </div>
                </form>
            </div>

            <div className="side-box">
                <div className='to-register-container'>
                    <div className="new-here-text">New here?</div>
                    <div className='to-register-text'>
                        <h2>TRIPSCRIBE</h2> Start your digital journey
                    </div>
                        <SecondaryButton
                            text = "REGISTER"
                            handleClick={toRegister}
                        />
                    <div>
                        <img src={groupImage} alt="Group" />  
                    </div>

                </div>
                
            </div>
        </div>
    );
};
