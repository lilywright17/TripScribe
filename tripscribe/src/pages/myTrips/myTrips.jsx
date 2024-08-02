import React from 'react';
// import NavBar from...
import DummyCard from "./DummyCard.jsx";
// import Footer from...
import NewYork from "./images/newyork.jpg"
import Paris from "./images/paris.jpg"
import './myTrips.css';

const tripsArray = [
	{
	  image: Paris,
	  city: 'Paris',
	  country: 'France',
	  title: 'Trip to Paris',
	  startDate: '2024-06-01',
	  endDate: '2024-06-10',
	  description: 'A wonderful trip to Paris with visits to the Eiffel Tower and the Louvre.'
	},
	{
	  image: NewYork,
	  city: 'New York',
	  country: 'USA',
	  title: 'Trip to New York',
	  startDate: '2024-07-15',
	  endDate: '2024-07-20',
	  description: 'Exploring the city that never sleeps, including Times Square and Central Park.'
	}
];
//Get trips data from SQL database, get user ID and return rows where user ID matches, store in an array of object

// Card should have a delete button. We'll need to make a modal for deleting the trip


  

const MyTrips = () => {

	const formatDate = date => {
		date = new Date(date);
		return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
	  };
	  
	return (
	  <div>
		{/* <NavBar></NavBar> */}
		<div className="card-container">
		{tripsArray.map((trip, index) => (
		  <DummyCard 
		  	key={index}
			city={trip.city}
			country={trip.country}
			startDate={formatDate(trip.startDate)}
			endDate={formatDate(trip.endDate)}
			image={trip.image} 
			description={trip.description} // The text will need to be limited to a certain number of characters to fit in the card component
			/> 
		))}
		</div>
	  </div>
	);
  };

  export default MyTrips;
// When we click on a card we want to bring up the full post page - how?

// example of card component:

// const Card = ({ title, photo, location, text }) => {
// 	return (
// 	  <div className="card">
// 		<h2>{title}</h2>
// 		<img src={photo} alt={title} />
// 		<p>{location}</p>
// 		<p>{text}</p>
// 	  </div>
// 	);
//   };