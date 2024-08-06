import React from "react";
import './navbar.css';
import { Link } from 'react-router-dom';
import {Eye, PlusSquare, MapTrifold, User} from '@phosphor-icons/react';

export const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="nameLogo">TripScribe</h1>
        <div className="nav-links">
          <Link to="/addtrip" className="nav-link"><PlusSquare size={40}/>Add Trip</Link>
          <Link to="/mytrips" className="nav-link"><Eye size={40}/>My Trips</Link>
          <Link to="/map" className="nav-link"><MapTrifold size={40}/>Map View</Link>
          <Link to="/userprofile" className="nav-link"><User size={40}/></Link>
        </div>
    </div>
  );
}

