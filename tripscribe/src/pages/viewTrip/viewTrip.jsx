import React from "react";
import { useLocation } from 'react-router-dom';

export const ViewTrip = () => {
    const location = useLocation();
    
    return (
        <div>
            <h1>This is ViewTrip page</h1>
        </div>
    );
}