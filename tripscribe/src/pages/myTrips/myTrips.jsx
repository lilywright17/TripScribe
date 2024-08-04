import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/navbar.jsx"
import Card from "../../components/card/card.jsx";
// import Footer from...
import './myTrips.css';
import DatePick from '../../components/datepicker/datepicker.jsx';
import CountryFilter from '../../components/filterByCountry/countryFilter.jsx';
import CityFilter from '../../components/filterByCity/cityFilter.jsx';
import tripsArray from './tripsArray.js';

//Get trips data from SQL database, get user ID and return rows where user ID matches, store in an array of object

// Card should have a delete button. We'll need to make a modal for deleting the trip


  

const MyTrips = () => {

	const formatDate = date => {
		date = new Date(date);
		return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};	
	
	const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCity, setSelectedCity] = useState('');

    const countries = [...new Set(tripsArray.map(trip => trip.country))];
	const cities = [...new Set(tripsArray.map(trip => trip.city))];

    const filteredTrips = tripsArray.filter((trip) => {
        const tripStart = new Date(trip.startDate);
        const tripEnd = new Date(trip.endDate);

        const matchesDateRange = !startDate || !endDate || (tripStart >= startDate && tripEnd <= endDate);
        const matchesCountry = !selectedCountry || trip.country === selectedCountry;
		const matchesCity = !selectedCity || trip.city === selectedCity;

        return matchesDateRange && matchesCountry && matchesCity;
    });

	return (
	  <div>
		<Navbar></Navbar>
		<div>
			<div className="filters-container">
				<div className="country-filter">
					<CountryFilter
                    	countries={countries}
                    	onFilterChange={(country) => setSelectedCountry(country)}
                	/>
				</div>
				<div className="city-filter">
					<CityFilter
                    	cities={cities}
                    	onFilterChange={(city) => setSelectedCity(city)}
                	/>
				</div>
				<div className="date-picker-container">
        		<label>Start Date:</label>
        			<DatePick
         				selected={startDate}
         				onChange={(date) => setStartDate(date)}
         				dateFormat="dd/MM/yyyy"
          				placeholderText="Start date"
        			/>
        		<label>End Date:</label>
        			<DatePick
          				selected={endDate}
        				onChange={(date) => setEndDate(date)}
          				dateFormat="dd/MM/yyyy"
          				placeholderText="End date"
        			/>
      			</div>
			</div>
		</div>
		<div className="card-container">
		{filteredTrips.map((trip, index) => (
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