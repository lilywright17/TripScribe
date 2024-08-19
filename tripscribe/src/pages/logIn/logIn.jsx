import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import groupImage from '../register/Group 2.png';
import { Button } from '../../components/button/button.jsx';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton.jsx";
import './login.css';


export const LogIn = () => {
    // React hooks for state management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailure, setLoginFailure] = useState(false);
    const [failMessage, setFailMessage] = useState('');
    const [loginVisibility, setLoginVisibility] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();

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

    // Axios interceptor to handle 401 errors globally    
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    // Token expired or unauthorized
                    sessionStorage.removeItem('token');
                    setOpenSnackbar(true); 

                    // Delay before redirecting to login
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000); 
                }
                return Promise.reject(error);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, [navigate]);    

    // API call to handle login
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password
            });

            const { token } = response.data;

            // Store the token in SessionStorage
            sessionStorage.setItem('token', token);

            setLoginFailure(false);
            navigate('/mytrips');
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
            <div className="side-box">
                <div className='to-register-container'>
                    <div className="new-here-text">New here?</div>
                    <div className='to-register-text'>Start your journey!</div>
                        <SecondaryButton
                            text = "REGISTER"
                            handleClick={toRegister}
                        />   
                </div>
                <img src={groupImage} alt="Group" />
            </div>
            
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
            <Snackbar 
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                sx={{ width: '100%' }}
                >
                    <Alert 
                    variant="filled"
                    severity="warning"
                    >
                        Session expired. Redirecting to login...
                </Alert>
            </Snackbar>
        </div>
    );
};
