import React, { useState, useCallback, useEffect } from 'react';
import './register.css';
// import travelBG from '../logIn/travel_bg.jpg';
import { useNavigate } from 'react-router-dom';
import groupImage from './Group 2.png';

export const Register = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsRegistering(true);

        // document.body.style.backgroundImage = `url(${travelBG})`;
        // document.body.style.backgroundSize = 'cover';
        // document.body.style.backgroundRepeat = 'no-repeat';

    }, []);

    function validateForm() {
        return fullName.length > 0 && username.length > 0 && email.length > 5 && password.length > 7 && password === confirmPassword && validateEmail(email);
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ fullName, username, email, password }),
                headers: {
                    "Content-Type": 'application/json',
                },
            });

            const result = await response.json();
            console.log('Success: ', result);
        } catch (error) {
            console.error('Error: ', error);
        }
    }, [fullName, username, email, password]);

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
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                autoFocus
                                type="text"
                                id="fullName"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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
                            Register
                        </button>
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
