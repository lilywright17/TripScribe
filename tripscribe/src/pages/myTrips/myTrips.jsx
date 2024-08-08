import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { Navbar } from "../../components/navbar/navbar.jsx";
import Card from "../../components/card/card.jsx";
// import Footer from...
import "./myTrips.css";
import { DatePick } from "../../components/datepicker/datepicker.jsx";
import { Filter } from "../../components/filter/filter.jsx";
import { SearchInput } from "../../components/searchInput/searchInput.jsx";
import tripsArray from "./tripsArray.js";
import Button from "../../components/button/button.jsx";
import editButtonImage from "./images/edit_button.png";
import Standing from "./images/Standing.png";

//Get trips data from SQL database, get user ID and return rows where user ID matches, store in an array of object

// Card should have a delete button. We'll need to make a modal for deleting the trip

export const MyTrips = () => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    date = new Date(date);
    return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
      console.log("Searching...");
    }
  };

  const executeSearch = () => {
    const results = tripsArray.filter((trip) => {
      const matchesSearchQuery =
        !searchQuery ||
        trip.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim());
      return matchesSearchQuery;
    });

    setSearchResults(results);
    // You can now use searchResults as needed, e.g., update state, display results, etc.
  };

  const [rangeDate, setRangeDate] = useState([null, null]);
  const [startDate, endDate] = rangeDate;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const countries = [...new Set(tripsArray.map((trip) => trip.country))];
  //Only the cities from the selected county will will be displayed
  const cities = selectedCountry
    ? [
        ...new Set(
          tripsArray
            .filter((trip) => trip.country === selectedCountry)
            .map((trip) => trip.city)
        ),
      ]
    : [...new Set(tripsArray.map((trip) => trip.city))];

  // Logic to combine and apply the filters
  const filteredTrips = tripsArray.filter((trip) => {
    const tripStart = new Date(trip.startDate);
    const tripEnd = new Date(trip.endDate);

    const matchesDateRange =
      !startDate || !endDate || (tripStart >= startDate && tripEnd <= endDate);
    const matchesCountry = !selectedCountry || trip.country === selectedCountry;
    const matchesCity = !selectedCity || trip.city === selectedCity;

    return matchesDateRange && matchesCountry && matchesCity;
  });

  //handling the selection of the country
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
  };

  //handling the selection of the country
  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  // To clear the filters
  const clearFilters = () => {
    setRangeDate([null, null]);
    setSelectedCountry("");
    setSelectedCity("");
  };
  // Checking if the filter is applied
  const isFilterApplied =
    startDate || endDate || selectedCountry || selectedCity;

  // Edit button handler navigates to edittrip page
  const handleEdit = (trip) => {
    navigate("/edittrip", { state: { trip } });
  };
  // Addtrip handler navigates to Addtrip page
  const handleAddTrip = () => {
    navigate("/addtrip");
  };

  // Viewtrip handler
	const handleTripDetails = (trip) => {
    console.log('Trip Details');
    navigate("/tripdetails", { state: { trip } });
  };

  const tripsToRender =
    searchResults.length > 0 ? searchResults : filteredTrips;

  const isInitialTripsEmpty = tripsArray.length === 0;

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className="filters-container">
          <div></div>
          <div className="country-filter">
            <Filter
              choice={countries}
              onFilterChange={handleSelectCountry}
              selectedOption={selectedCountry}
              label="Country"
            />
          </div>
          <div className="city-filter">
            <Filter
              choice={cities}
              onFilterChange={handleSelectCity}
              selectedOption={selectedCity}
              label="City"
            />
          </div>
          <div className="date-picker-container">
            <DatePick
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setRangeDate(update)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy-dd/mm/yyyy"
            />
          </div>
          {isFilterApplied && (
            <Button
              className="clear-button"
              handleClick={clearFilters}
              text="Clear Filters"
            />
          )}
          <SearchInput
            handleKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            searchQuery={searchQuery}
          />
        </div>
        {/* if there is no trips display message otherwise display trip cards*/}
        {tripsToRender.length === 0 ? (
          isInitialTripsEmpty ? (
            <div className="no-trips-container">
              <div className="no-trips-image">
                <img src={Standing} alt="Standing girl" />
              </div>
              <div className="no-trips-message">
                <h2>Welcome!</h2>
                <p>
                  Lools like you have no scribles(trips) yet.
                  <br />
                  Click on the botton bellow and make some memories!
                </p>
                <Button
                  className="add-trip-button"
                  handleClick={handleAddTrip}
                  text="+ New Trip"
                />
              </div>
            </div>
          ) : (
            <div className="no-results-container">
              <h2>No trips match your filter choices!</h2>
            </div>
          )
        ) : (
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
				onClick={() => handleTripDetails(trip)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// When we click on a card we want to bring up the full post page - how?
