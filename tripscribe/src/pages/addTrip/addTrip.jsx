import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddTripForm } from './addTripForm';

export const AddTrip = () => { 
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            sessionStorage.removeItem('token');  // Clear any existing token
            navigate('/login'); // Redirect to login
        }
    }, [navigate]);

    return (
        <>
            <AddTripForm/>
        </>
    );
}
