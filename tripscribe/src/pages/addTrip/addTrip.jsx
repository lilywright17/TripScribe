import React from 'react';
import {Navbar} from '../../components/navbar/navbar';
import {AddTripForm} from './addTripForm';
import { AddTripImgUpload } from './addTripImgUpload';

export const AddTrip = () => { 
    return (
        <>
            <Navbar />
            <AddTripImgUpload / >
            <AddTripForm/>
        </>
        
    );
    }
