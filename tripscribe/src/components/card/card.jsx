import React from "react";
import "./card.css";

export const Card = ({ country, city, startDate, endDate, description, imageUrl,editButton,onEdit,onClick }) =>{
    const handleCardClick = () => {
        onClick(); // Trigger the navigation to ViewTrip
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); // Prevents the click from propagating to the card's onClick
        onEdit(); // Trigger the edit functionality
    };
      

    return (
        <div className="card" onClick={handleCardClick}>
            <img src={imageUrl} alt={city || 'photo of city'} width={200} className="card-img"/>
            <h1>{country || 'country'}</h1>
            <h2>{city || 'town/city'}</h2>
            <p>{startDate || 'start date'} - {endDate || 'end date'}</p>
            <p>{description.trim() || 'description of trip'}...</p>
            <img 
                className="edit-button" 
                src={editButton} 
                alt="Edit button" 
                onClick={handleEditClick}
                style={{ cursor: 'pointer' }}
            />
        </div>
    )
}
/* 
NEED TO - ADD TRASHCAN & PENCIL ICONS TO THE CARD, ONCE CHOSEN ICON LIBRARY IS INSTALLED, 
for deleting and editing the card respectively.

Here's a photo of a cat to use as the imageUrl prop for the Card component as a test:
'https://www.catster.com/wp-content/uploads/2018/05/A-gray-cat-crying-looking-upset.jpg'

example use of Card component:

<Card 
    location="Spain" 
    city="Madrid" 
    startDate="10/01/2019" 
    endDate="24/01/2019"    
    description="Memorable trip to Spain with lovely weather!" 
    imageUrl="https://www.catster.com/wp-content/uploads/2018/05/A-gray-cat-crying-looking-upset.jpg"/>

*/