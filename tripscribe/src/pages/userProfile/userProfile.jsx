import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfileView } from "./userProfileView";

export const UserProfile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            sessionStorage.removeItem('token'); // Clear token from sessionStorage
            navigate('/login'); // Redirect to login if there's no token
        }
    }, [navigate]);

    return (
        <>
            <UserProfileView />
        </>
    )
};
