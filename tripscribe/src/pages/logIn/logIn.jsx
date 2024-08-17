import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';

import groupImage from '../register/Group 2.png';
import {Button} from '../../components/button/button.jsx';
import {SecondaryButton} from "../../components/secondaryButton/secondaryButton.jsx";

import './login.css';


export const LogIn = () => {
    // for react hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginFailure, isLoginFailure] = useState(false);
    const [failMessage, setFailMessage] = useState('');

    const [loginVisibility, setLoginVisibility] = useState(false);

    const navigate = useNavigate();

    // Triggers animation when login page loads
    useEffect(() => {setLoginVisibility(true);}, [])

    function validateForm() {
        // function to validate user inputs for email and password
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
                //change port to whatever backend is being run on
                const response = await fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers: {
                        "Content-Type": 'application/json',
                    }
                });

                const result = await response.json();

                if (response.ok){
                    console.log('Success: ', result);
                    isLoginFailure(false);
                    navigate('/mytrips');
                }
                else{
                    isLoginFailure(true);
                    setFailMessage(result.message);
                }
                
            } catch (error) {
                console.error('Error: ', error);
            }
        }, [email, password]
    );

    const toRegister = () => {
        setLoginVisibility(false);
        navigate('/register');
    }

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
                
                {/* Error message */}
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
        </div>
    );

}
