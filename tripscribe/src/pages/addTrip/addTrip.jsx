import React from 'react';
import { AddTripForm } from './addTripForm';
import Standing4 from './Standing4.svg'
import './addTrip.css'

export const AddTrip = () => { 

    return (
        <>
            <div className='addTripPageContainer'>
                <div className='addTripContainer'>
                    <AddTripForm />
                </div>
                <div className='addTripIllustration'>
                    <img src={Standing4} alt={'Standing Illustration'} />
                </div>
            </div>
        </>
    );
};
