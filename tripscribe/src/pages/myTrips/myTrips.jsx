import React, { useState } from 'react';
import Navbar from "../../components/navbar/navbar.jsx"
import Card from "../../components/card/card.jsx";
// import Footer from...
import NewYork from "./images/newyork.jpg"
import Paris from "./images/paris.jpg"
import Lisbon from "./images/Lisbon.jpg"
import './myTrips.css';
import DatePick from '../../components/datepicker/datepicker.jsx';


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
	},
	{
		image: Lisbon,
		city: 'Lisbon',
		country: 'Spain',
		title: 'Trip to Lisbon',
		startDate: '2024-07-15',
		endDate: '2024-07-20',
		description: 'Exploring the city that never sleeps, including Times Square and Central Park.'
	},
	{
		image: Lisbon,
		city: 'Lisbon',
		country: 'Spain',
		title: 'Trip to Lisbon',
		startDate: '2024-07-15',
		endDate: '2024-07-20',
		description: 'Exploring the city that never sleeps, including Times Square and Central Park.'
	},
	{
		image: NewYork,
		city: 'New York',
		country: 'USA',
		title: 'Trip to New York',
		startDate: '2024-07-15',
		endDate: '2024-07-20',
		description: 'Exploring the city that never sleeps, including Times Square and Central Park.'
	  },
	  {
		image: Lisbon,
		city: 'Lisbon',
		country: 'Spain',
		title: 'Trip to Lisbon',
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
	
	  const [startDate, setStartDate] = useState(null);
	  const [endDate, setEndDate] = useState(null);
	
	  // Filter trips based on selected dates
	  const filteredTrips = tripsArray.filter((trip) => {
		const tripStart = new Date(trip.startDate);
		const tripEnd = new Date(trip.endDate);
	
		if (startDate && endDate) {
		  return tripStart >= startDate && tripEnd <= endDate;
		}
	
		return true; // Show all trips if no date range is selected
	  });

	return (
	  <div>
		<Navbar></Navbar>
		<div>
			<div className="date-picker-container">
        		<label>Start Date:</label>
        			<DatePick
         			 selected={startDate}
         			 onChange={(date) => setStartDate(date)}
         			 dateFormat="MM/dd/yyyy"
          			placeholderText="Select start date"
        			/>
        		<label>End Date:</label>
        			<DatePick
          				selected={endDate}
        				onChange={(date) => setEndDate(date)}
          				dateFormat="MM/dd/yyyy"
          				placeholderText="Select end date"
        			/>
      		</div>
		</div>
		<div className="card-container">
		{tripsArray.map((trip, index) => (
		  <Card 
		  	key={index}
			city={trip.city}
			country={trip.country}
			startDate={formatDate(trip.startDate)}
			endDate={formatDate(trip.endDate)}
			imageUrl={trip.image} 
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