import React, { useState, useEffect, useCallback } from 'react';
import './register.css';

export const Register = ({ toLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerVisibility, setRegisterVisibility] = useState(false);

    useEffect(() => {
        setRegisterVisibility(true);
    }, []);

    function validateForm() {
        return email.length > 5 && password.length > 7 && validateEmail(email);
    }

    function validateRegisterForm() {
        return validateForm() && password === confirmPassword;
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
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": 'application/json',
                    },
                });

                const result = await response.json();
                console.log('Register Success: ', result);
            } catch (error) {
                console.error('Register Error: ', error);
            }
        }, [email, password]);

    return (
        <div className="register">
            <div className={`register-box register-animation ${registerVisibility ? 'visible' : 'hidden'}`}>
                <div className='register-container'>
                    <h1>Sign Up</h1>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="register-email">Email</label>
                        <input
                            autoFocus
                            type="email"
                            id="register-email"
                            placeholder="Enter your email here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-password">Password</label>
                        <input
                            type="password"
                            id="register-password"
                            placeholder="Enter your password here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm your password here"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className='button-container'>
                        <button type="submit" disabled={!validateRegisterForm()}>
                            REGISTER
                        </button>
                    </div>
                </form>
            </div>

            <div className="login-box">
                <div className="login-container">
                    <h1>Welcome to TripScribe!</h1>
                </div>
                <div className="button-container">
                    <button className='login-button' onClick={toLogin}>
                        LOG IN
                    </button>
                </div>
            </div>
        </div>
    );
};
