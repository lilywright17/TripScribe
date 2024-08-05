import React, {useState, useEffect} from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstap/Button';

import './login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginVisibility, setLoginVisibility] = useState(false);

    useEffect(() => {
        // Triggers animation when login page loads
        setLoginVisibility(true);
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

    function handleSubmit(event) {
        event.preventDefault();
    }

    const toRegister = () => {
        setLoginVisibility(false);
    }

    return (
        <div className="login">
            <div className="register-box">
                <div className="register-container">
                    <h1 className='register-text'>New here?</h1>
                    <h2 className='register-text'>Lorem Ipsum...</h2>
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
                    <h1>Sign In</h1>
                </div>
                
                
                <form onSubmit={handleSubmit}>
                    <div className = "form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            autoFocus
                            type="email"
                            id="email"
                            placeholder="Enter your email here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='button-container'>
                    <button 
                        type="submit" disabled={!validateForm()}
                    >
                        LOG IN
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );

}
