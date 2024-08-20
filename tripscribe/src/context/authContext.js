import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    // Set up the Axios interceptor to handle 401 and 403 errors globally
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                const status = error.response ? error.response.status : null;
                
                if (status === 401 || status === 403) {
                    console.log('Token expired or invalid - triggering logout'); // Debugging Log 

                    // Clear token from sessionStorage
                    sessionStorage.removeItem('token');

                    setOpenSnackbar(true); // Trigger the snackbar
                    console.log('Snackbar triggered'); // Debugging Log

                    // Redirect to login after a brief delay
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                        console.log('Navigating to login page'); // Debugging Log
                    }, 3000);  // Adjust delay as needed
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    return (
        <AuthContext.Provider value={{}}>
            {children}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                sx={{ width: '100%' }}
            >
                <Alert 
                    variant="filled" 
                    severity="warning">
                        Session expired. Redirecting to login...
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    );
};