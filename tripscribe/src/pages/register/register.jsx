import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';  // Import axios
import './register.css';
import { useNavigate } from 'react-router-dom';
import groupImage from './Group 2.png';
import { PopDialog } from '../../components/dialog/dialog';
import { useDispatch } from 'react-redux';
import { loginRedux } from '../../features/userRedux';

export const Register = () => {
    const [fullname, setfullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const navigate = useNavigate();
    //Redux work
    const dispatch = useDispatch();

    useEffect(() => {
        setIsRegistering(true);
    }, []);

    function validateForm() {
        return fullname.length > 0 && username.length > 0 && email.length > 5 && password.length >= 6 && password === confirmPassword && validateEmail(email);
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                fullname,
                username,
                email,
                password,
                confirmPassword
            });

            if (response.data.message === 'Email is already registered') {
                setEmailExists(true);
            } else {
                setEmailExists(false);
                setRegistered(true);


                // Clear token if accidentally stored
                sessionStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setEmailExists(true);
        }
    }, [fullname, username, email, password, confirmPassword]);

    const handleOK = () => {
        //Redux work 
        dispatch(loginRedux({name:'Registered User'}));
        navigate('/');

    }

    const handleClose = () => {
        setRegistered(false);
    }

    const toLogin = () => {
        setIsRegistering(false);
        navigate('/');
    }

    return (
        <div className="register">
            <div className={`register-box register-animation ${isRegistering ? 'visible' : 'hidden'}`}>
                <div className='register-container'>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                autoFocus
                                type="text"
                                id="fullname"
                                placeholder="Enter your full name"
                                value={fullname}
                                onChange={(e) => setfullname(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {emailExists && <p className='error-text'>This email already exists!</p>}

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="terms">
                            <label>
                                By creating an account you agree to our <a href="#">Terms and Privacy</a>
                            </label>
                        </div>

                        <button type="submit" className="register-btn" disabled={!validateForm()}>
                            REGISTER
                            <PopDialog
                                open={registered}
                                handleClose={handleClose}
                                handleDelete = {handleOK}
                                title="Registered!"
                                content = "Redirecting to login page..."
                                agreeBtnText ="OK"
                                disagreeBtnText="CANCEL"
                            />  
                        </button>

                        <div className='click-to'>
                            <p onClick={toLogin}>Click here to log in</p>
                        </div>
                    </form>
                </div>
            </div>

            <div className="login-box">
                <div className="login-content">
                    <div className="one-of-us-text">One of us?</div>
                    <div className="slogan-text">TripScribe is here to document your journey!</div>
                    <button className="back-to-login" onClick={toLogin}>
                        Login
                    </button>
                    <img src={groupImage} alt="Group" className="group-image" />
                </div>
            </div>
        </div>
    );
};