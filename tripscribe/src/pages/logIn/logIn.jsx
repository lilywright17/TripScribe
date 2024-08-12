import React, {useState, useEffect, useCallback} from 'react';
import travelBG from './travel_bg.jpg';

import './login.css';

export const LogIn = () => {
    // for react hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginVisibility, setLoginVisibility] = useState(false);

    useEffect(() => {
        // Triggers animation when login page loads
        setLoginVisibility(true);

        document.body.style.backgroundImage = `url(${travelBG})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
    }, [])

    function validateForm() {
        // function to validate user inputs for email and password
        return email.length > 5 && password.length > 7 && validateEmail(email);
    }

    const validateEmail = (email) => {
        return email.match(
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmit = useCallback(async (event) => {
            event.preventDefault();

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers: {
                        "Content-Type": 'application/json',
                    }
                });

                const result = await response.json();
                console.log('Success: ', result);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    );

    const toRegister = () => {
        setLoginVisibility(false);
    }

    return (
        <div className="login">
            <div className="register-box">
                <div className="register-container">
                    <h1 className='register-text'>Welcome to TripScribe!</h1>
                    <h2 className='register-text'>Start your journey</h2>
                </div>
                <div className="button-container">
                    <button 
                        className='register-button'
                        onClick={toRegister}
                    >
                        REGISTER
                    </button>
                </div>
            </div>
            {/* <img src={require("./travel_bg.jpg")} alt="background_travel_image"/> */}

            <div className={`login-box login-animation ${loginVisibility ? 'visible' : 'hidden'}`}>

                <div className='login-container'>
                    <h1 className="h-signin">Sign In</h1>
                </div>
                
                
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
                    <button className='button-submit'
                        type="submit" 
                        disabled={!validateForm()}
                        // onClick={handleSubmit}
                    >
                        LOG IN
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );

}
