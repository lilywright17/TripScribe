import React from "react";
import './footer.css';
import { Link } from "react-router-dom";
import {XLogo, FacebookLogo,InstagramLogo } from '@phosphor-icons/react';

export const Footer = () => {
    return (
        <div className="footer">
            <p> <Link to="/aboutUs" className="footer-link"> ABOUT US </Link> </p>
            
            <div className="footer-links"> 
                <Link to="https://x.com/home" className="footer-link"><XLogo size={32} /></Link>
                <Link to="https://www.facebook.com/" className="footer-link"><FacebookLogo size={32} /></Link>
                <Link to="https://www.instagram.com/" className="footer-link"><InstagramLogo size={32} /></Link>
            </div>

            <p>Copyright © 2024 Team5</p> 

        </div>
    );
}