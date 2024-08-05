import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Navbar from "../../components/navbar/navbar.jsx"
import Card from "../../components/card/card.jsx";
// import Footer from...
import './myTrips.css';
import DatePick from '../../components/datepicker/datepicker.jsx';
import CountryFilter from '../../components/filterByCountry/countryFilter.jsx';
import CityFilter from '../../components/filterByCity/cityFilter.jsx';
import SearchInput from '../../components/searchInput/searchInput.jsx';
import tripsArray from './tripsArray.js';
import Button from '../../components/button/button.jsx';
import editButtonImage from './images/edit_button.png';

//Get trips data from SQL database, get user ID and return rows where user ID matches, store in an array of object

// Card should have a delete button. We'll need to make a modal for deleting the trip


  

const MyTrips = () => {

	const formatDate = date => {
		date = new Date(date);
		return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};	

	const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
			console.log("Searching...")
        }
    };

	const executeSearch = () => {
        const results = tripsArray.filter((trip) => {
            const matchesSearchQuery = !searchQuery || trip.description.toLowerCase().includes(searchQuery.toLowerCase().trim());
            return matchesSearchQuery;
        });

        setSearchResults(results);
        // You can now use searchResults as needed, e.g., update state, display results, etc.
    };
	
	
	const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);

    const countries = [...new Set(tripsArray.map(trip => trip.country))];
	const cities = [...new Set(tripsArray.map(trip => trip.city))];

	// Logic to combine and apply the filters
    const filteredTrips = tripsArray.filter((trip) => {
        const tripStart = new Date(trip.startDate);
        const tripEnd = new Date(trip.endDate);

        const matchesDateRange = !startDate || !endDate || (tripStart >= startDate && tripEnd <= endDate);
        const matchesCountry = !selectedCountry || trip.country === selectedCountry;
		const matchesCity = !selectedCity || trip.city === selectedCity;

        return matchesDateRange && matchesCountry && matchesCity;
    });

	// To clear the filters
	const clearFilters = () => {
		setStartDate(null);
        setEndDate(null);
        setSelectedCountry('');
        setSelectedCity('');
	}
	// Checking if the filter is applied
	const isFilterApplied = startDate || endDate || selectedCountry || selectedCity;

	// Edit button handler
    const handleEdit = (trip) => {
        // Navigation to Edit Trips page to be added
		// For now console logging it to see if clicking works
        console.log('Edit trip:', trip);
    };

	const tripsToRender = searchResults.length > 0 ? searchResults : filteredTrips;

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
				{isFilterApplied &&(<Button className="clear-button" handleClick={clearFilters}
					text="Clear Filters"
				/>)}
			<SearchInput 
				handleKeyDown={handleKeyDown} 
				onChange={(e) => setSearchQuery(e.target.value)} 
				searchQuery={searchQuery}/>

		</div>
		<div className="card-container">
		{tripsToRender.map((trip, index) => (
		  <Card 
		  	key={index}
			city={trip.city}
			country={trip.country}
			startDate={formatDate(trip.startDate)}
			endDate={formatDate(trip.endDate)}
			imageUrl={trip.image} 
			description={trip.description.substring(0, 250)} // The text will need to be limited to a certain number of characters to fit in the card component
			editButton={editButtonImage}
            onEdit={() => handleEdit(trip)}
			/> 
		))}
		</div>
		
	  </div>
	  </div>
	);
  };

  export default MyTrips;
// When we click on a card we want to bring up the full post page - how?
