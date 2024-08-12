import React from "react";
import {Navbar} from '../../components/navbar/navbar';
import { EditTripForm } from "./editTripForm";



export const EditTrip = () => {
    return (
        <>
            <Navbar />
            <h2>Edit Trip</h2>
            <EditTripForm />
        </>
    );
}