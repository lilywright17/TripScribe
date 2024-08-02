import React from 'react';
import './dummyCard.css';
import editButton from './images/editButton.png';

const DummyCard = ({ image, city, country, description, startDate, endDate }) => {
		return (
		  <div className="card">
			<img src={image} alt={city} className="card-img"/>
			<h2>{city}, {country}</h2>
			<p>{startDate} - {endDate}</p>
			<p>{description}</p>
			<img src={editButton} className="edit-button"/>
		  </div>
		);
	  };

export default DummyCard;