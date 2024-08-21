import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); // Set initial authentication state based on token
        } else {
            setIsAuthenticated(false); // Ensure the user is marked as not authenticated if no token
        }

        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                const status = error.response ? error.response.status : null;
    
                if (status === 401 || status === 403) {
                    if (isAuthenticated) { // Only trigger logout and snackbar if user was authenticated
                        console.log('Token expired or invalid - triggering logout'); // Debugging Log 

                        // Clear token from sessionStorage
                        sessionStorage.removeItem('token');
                        setIsAuthenticated(false); // Update authentication state

                        setOpenSnackbar(true); // Trigger the snackbar
                        console.log('Snackbar triggered'); // Debugging Log

                        // Redirect to login after a slight delay
                        setTimeout(() => {
                            navigate('/login', { replace: true });
                            console.log('Navigation to login initiated');
                        }, 100); 
                    }
                }
                return Promise.reject(error);
            }
        );
    
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate, isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
            <Snackbar
                key={openSnackbar ? 'open' : 'closed'}
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

