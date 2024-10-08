import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card } from "../../components/card/card.jsx";
import { DatePick } from "../../components/datepicker/datepicker.jsx";
import { Filter } from "../../components/filter/filter.jsx";
import { SearchInput } from "../../components/searchInput/searchInput.jsx";
import { Button } from "../../components/button/button.jsx";
import { SecondaryButton } from "../../components/secondaryButton/secondaryButton.jsx";
import { Grid, Box } from "@mui/material";
import Standing from "./images/Standing.png";
import "./myTrips.css";


export const MyTrips = () => {
  const [rangeDate, setRangeDate] = useState([null, null]);
  const [startDate, endDate] = rangeDate;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tripsArray, setTripsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userRedux = useSelector((state) => state.userRedux.value);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const getTrips = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/trips", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const tripData = response.data.map((trip) => ({
              ...trip,
              tripID: Number(trip.tripID),
            }));
            setTripsArray(Array.isArray(tripData) ? tripData : []);
          } else if (response.status === 204) {
            setTripsArray([]);
          } else {
            console.error("Failed to get trips information");
          }
        } catch (error) {
          console.error("Error fetching trips:", error);
        } finally {
          setLoading(false); 
        }
      };

      getTrips();
    }
  }, []);

  const formatDate = (date) => {
    date = new Date(date);
    return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
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
  };

  const countries = [...new Set(tripsArray.map((trip) => trip.country))];

  const cities = selectedCountry
    ? [
        ...new Set(
          tripsArray
            .filter((trip) => trip.country === selectedCountry)
            .map((trip) => trip.city)
        ),
      ]
    : [...new Set(tripsArray.map((trip) => trip.city))];

  const filteredTrips = tripsArray.filter((trip) => {
    const tripStart = new Date(trip.startDate);
    const tripEnd = new Date(trip.endDate);

    const matchesDateRange =
      !startDate || !endDate || (tripStart >= startDate && tripEnd <= endDate);
    const matchesCountry = !selectedCountry || trip.country === selectedCountry;
    const matchesCity = !selectedCity || trip.city === selectedCity;

    return matchesDateRange && matchesCountry && matchesCity;
  });

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  const clearFilters = () => {
    setRangeDate([null, null]);
    setSelectedCountry("");
    setSelectedCity("");
  };

  const isFilterApplied =
    startDate || endDate || selectedCountry || selectedCity;

  const handleAddTrip = () => {
    navigate("/addtrip");
  };

  const handleTripDetails = (tripID) => {
    navigate(`/tripdetails/${tripID}`); 
  };

  const tripsToRender =
    searchResults.length > 0 ? searchResults : filteredTrips;

  const isInitialTripsEmpty = tripsArray.length === 0;

  return (
    <div>
      <div>
        <Box sx={{ padding: "20px", maxWidth: "100%", mx: "auto" }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={1} />
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Filter
                choice={countries}
                onFilterChange={handleSelectCountry}
                selectedOption={selectedCountry}
                label="Country"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Filter
                choice={cities}
                onFilterChange={handleSelectCity}
                selectedOption={selectedCity}
                label="City"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <DatePick
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setRangeDate(update)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy-dd/mm/yyyy"
                />
              </Box>
              {isFilterApplied && (
                <SecondaryButton
                  className="clear-button"
                  handleClick={clearFilters}
                  text="Clear Filters"
                  style={{
                    borderRadius: "30px",
                    height: "40px",
                    minWidth: "120px",
                    lineHeight: "1.2",
                    whiteSpace: "nowrap",
                  }}
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={2}
              sx={{
                marginLeft: { sm: 2, md: 3, lg: 4 },
              }}
            >
              <SearchInput
                handleKeyDown={handleKeyDown}
                onChange={(e) => setSearchQuery(e.target.value)}
                searchQuery={searchQuery}
              />
            </Grid>
          </Grid>
        </Box>
        {/* if there is no trips display message "Welcome, No trips yet" otherwise display trip cards*/}
        {loading ? (
          <div className="loading"><h1>Loading trips...</h1></div>
        ) : isInitialTripsEmpty ? (
          <div className="no-trips-container">
            <div className="no-trips-image">
              <img src={Standing} alt="Standing girl" />
            </div>
            <div className="no-trips-message">
              <h2>Welcome {userRedux?.name}!</h2>
              <p>
                Looks like you have no scribbles (trips) yet.
                <br />
                Click on the button below and make some memories!
              </p>
              <Button
                className="add-trip-button"
                handleClick={handleAddTrip}
                text="+ New Trip"
              />
            </div>
          </div>
        ) : tripsToRender.length === 0 ? (
          <div className="no-results-container">
            <h2>No trips match your filter choices!</h2>
          </div>
        ) : (
          <div className="card-container">
            {tripsToRender.map((trip) => (
              <Card
                key={trip.tripID}
                city={trip.city}
                country={trip.country}
                startDate={formatDate(trip.startDate)}
                endDate={formatDate(trip.endDate)}
                imageUrl={trip.photos[0]?.url} 
                description={trip.description.substring(0, 250)} 
                onClick={() => handleTripDetails(trip.tripID)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
