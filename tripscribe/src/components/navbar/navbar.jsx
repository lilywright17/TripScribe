import React from "react";
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="nameLogo">TripScribe</h1>
        <div className="nav-links">
            <p>➕  Add Trip</p>
            <p>👁️  View Trips</p>
            <p>🗺️  Map View</p>
            <p>👤  User Profile</p>
        </div>
    </div>
  );
}

export default Navbar;
/* Will replace emojis with icons when we have chosen an icons library! 
 eg import {Eye, PlusSquare, MapTrifold, User} from '@phosphor-icons/react';
*/