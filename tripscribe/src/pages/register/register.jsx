import React, { useState, useCallback } from 'react';
import './register.css';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    function validateForm() {
        return username.length > 0 && email.length > 5 && password.length > 7 && password === confirmPassword && validateEmail(email);
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
                body: JSON.stringify({ username, email, password }),
                headers: {
                    "Content-Type": 'application/json',
                },
            });

            const result = await response.json();
            console.log('Success: ', result);
        } catch (error) {
            console.error('Error: ', error);
        }
    }, [username, email, password]);

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    }

    return (
        <div className="register">
            <div className={`register-box register-animation ${isRegistering ? 'visible' : 'hidden'}`}>
                <div className='register-container'>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                autoFocus
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

                        <div className='button-container'>
                            <button
                                type="submit"
                                disabled={!validateForm()}
                            >
                                REGISTER
                            </button>
                        </div>
                    </form>
                    <div className='button-container'>
                        <button onClick={toggleForm}>Back to Login</button>
                    </div>
                </div>
            </div>

            <div className={`login-box login-animation ${isRegistering ? 'hidden' : 'visible'}`}>
                <div className='login-container'>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                autoFocus
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

                        <div className='button-container'>
                            <button
                                type="submit"
                                disabled={!validateForm()}
                            >
                                LOG IN
                            </button>
                        </div>
                    </form>
                    <div className='button-container'>
                        <button onClick={toggleForm}>REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
