import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); 
        } else {
            setIsAuthenticated(false); 
        }

        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                const status = error.response ? error.response.status : null;
    
                if (status === 401 || status === 403) {
                    if (isAuthenticated) {

                        sessionStorage.removeItem('token');
                        setIsAuthenticated(false); 

                        setOpenSnackbar(true); 

                        setTimeout(() => {
                            navigate('/', { replace: true });
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

