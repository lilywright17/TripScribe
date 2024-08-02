import React from "react";
import './aboutUs.css';
import linkedInLogo from './linkedInLogo.png';
import githubLogo from './githubLogo.png';
import { Navbar } from '../../components/navbar/navbar';


export const AboutUs = () => {

    const usData = [
        {
            id:1,
            firstName: "Precious",
            lastName: "Joveres",
            info: "Precious info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
            emoji: "🌟"

        },
        {
            id:2,
            firstName: "Krystal",
            lastName: "Lake",
            info: "Krystal info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
            emoji: "💎"
        },
        {
            id:3,
            firstName: "Mediha",
            lastName: "Mustafova",
            info: "Mediha info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
            emoji: "🐣"
        },
        {
            id:4,
            firstName: "Victoria",
            lastName: "Proano",
            info: "Victoria info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
            emoji: "🎃"
        },
        {
            id:5,
            firstName: "Marta",
            lastName: "Walters",
            info: "Marta info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
            emoji: "🌍"
        },
        {
            id:6,
            firstName: "Katie",
            lastName: "Williams",
            info: "Katie info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
            emoji: "🧁"
        },
        {
            id:7,
            firstName: "Lily",
            lastName: "Wright",
            info: "Lily info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
            emoji: "🌸"
        }
    ]

    return (
        <>
            <Navbar />
            <div className="aboutUs">
                <h1 className="aboutUsTitle">About Us</h1>
                <p className="aboutUsText">Welcome to TripScribe, your go-to travel diary app! Here's a little info about each member of our team!</p>
            </div>
            <div className="aboutUsContainer">
                {usData.map((user) => (
                    <div key={user.id} className="userCard">
                        <img className="teamMemberImage" src={user.imageUrl} alt={`photo of ${user.firstName}`} />
                        <h2>{user.emoji} {user.firstName} </h2>
                        <h3>{user.lastName}</h3>
                        <p>{user.info}</p>
                        <div className="socialsContainer">
                            <img className="linkedInIcon" src={linkedInLogo}/>
                            <img className="githubIcon" src={githubLogo}/>
                        </div>
                        
                    </div>
                ))}
            </div>
        </>
    );    
}
