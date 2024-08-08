import React from "react";
import { useLocation } from 'react-router-dom';

export const TripDetails = () => {
    const location = useLocation();
    
    return (
        <div>
            <h1>This is Trip Details page</h1>
        </div>
    );
}