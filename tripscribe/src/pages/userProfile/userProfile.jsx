import React from "react";
import { UserProfileView } from "./userProfileView";
import { useSelector } from "react-redux";

export const UserProfile = () => {
     // added for Redux work
     const userRedux = useSelector((state)=>
        state.userRedux?.value);
    return (
        <>
            <h1>Hello {userRedux?.name}!</h1>
            <UserProfileView />
        </>
    )
};
