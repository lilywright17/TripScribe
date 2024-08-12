import React from 'react';
import { Navbar } from '../../components/navbar/navbar';
import { AddTripForm } from './addTripForm';
//import AddTripWidget from '../../components/uploadWidgetCloudinary/addTripWidget';

export const AddTrip = () => { 
    return (
        <>
            <Navbar />
            <AddTripForm/>
        </>
    );
    }
