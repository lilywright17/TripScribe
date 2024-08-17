import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/card/card.jsx";
import "./myTrips.css";
import { DatePick } from "../../components/datepicker/datepicker.jsx";
import { Filter } from "../../components/filter/filter.jsx";
import { SearchInput } from "../../components/searchInput/searchInput.jsx";
//import tripsArray from "./tripsArray.js";
import { Button } from "../../components/button/button.jsx";
import editButtonImage from "./images/edit_button.png";
import Standing from "./images/Standing.png";


export const MyTrips = () => {
  const [rangeDate, setRangeDate] = useState([null, null]);
  const [startDate, endDate] = rangeDate;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tripsArray, setTripsArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/trips", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          },
        });
        if (response.ok) {
          const tripData = await response.json();
          // Ensure tripData is an array
          setTripsArray(Array.isArray(tripData) ? tripData : []);
          console.log('Trip Data:', tripData); // Log the trip data
        } else if (response.status === 204){
            // When no content is found, set an empty array
            setTripsArray([]);
        } else {
          console.error("Failed to get trips information");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }; 
    fetchTrips();
  },[]);

  // Formating the dates
  const formatDate = (date) => {
    date = new Date(date);
    return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Checking if the user presses 'Enter' to execute the Search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
      console.log("Searching...");
    }
  };

  //Filters the tripArray to match the user search entry to teh trip's description
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
  };

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

  //handling the selection of the city
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
    console.log("Trip Details");
    navigate("/tripdetails", {
      state: {
        country: trip.country,
        city: trip.city,
        startDate: trip.startDate,
        endDate: trip.endDate,
        images: trip.image || [],
        description: trip.description,
      },
    });
  };

  // To determine which will be rendered to the screen - If there is no serachResult then the filteredTrips will be rendered
  const tripsToRender =
    searchResults.length > 0 ? searchResults : filteredTrips;

  const isInitialTripsEmpty = tripsArray.length === 0;

  return (
    <div>
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
        {/* if there is no trips display message "Welcome, No trips yet" otherwise display trip cards*/}
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
            (
              <div className="no-results-container">
                <h2>No trips match your filter choices!</h2>
              </div>
            )
          )
        ) : (
          (
            <div className="card-container">
              {tripsToRender.map((trip, index) => (
                <Card
                  key={index}
                  city={trip.city}
                  country={trip.country}
                  startDate={formatDate(trip.startDate)}
                  endDate={formatDate(trip.endDate)}
                  imageUrl={trip.photos[0].url} 
                  //imageUrl={trip.image[0]}
                  //imageUrl={trip.image && trip.image.length > 0 ? trip.image[0] : Standing}
                  description={trip.description.substring(0, 250)} // The text will need to be limited to a certain number of characters to fit in the card component
                  editButton={editButtonImage}
                  onEdit={() => handleEdit(trip)}
                  onClick={() => handleTripDetails(trip)}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
