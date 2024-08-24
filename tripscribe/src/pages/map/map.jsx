import React, { useState, useEffect, useCallback } from "react";
import { Card } from "../../components/card/card.jsx";
import { useNavigate } from "react-router-dom";
import './map.css';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from "@vis.gl/react-google-maps";
import { fetchApiKey } from './googleapi.js'; 
import axios from 'axios';

const mapId = 'a86e835a30ffed0';

const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const MapPage = () => {
	
	const navigate = useNavigate();
	const [activeMarker, setActiveMarker] = useState(null);
	const [center, setCenter] = useState({ lat: 51.507351, lng: -0.127758 }); 
	const [apiKey, setApiKey] = useState(null);
	const [tripsArray, setTripsArray] = useState([]);
	
  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/trips", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          const tripData = response.data.map(trip => ({
            ...trip,
            latitude: parseFloat(trip.latitude),
      longitude: parseFloat(trip.longitude),
            tripID: Number(trip.tripID) // Ensure tripID is a number
          }))
          .filter(trip => !isNaN(trip.latitude) && !isNaN(trip.longitude));
          setTripsArray(Array.isArray(tripData) ? tripData : []);
        } else if (response.status === 204) {
          setTripsArray([]);
        } else {
          console.error("Failed to get trips information");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getTrips();
  }, []);

  	// Function to bring up trip details in an info window when marker is clicked
  	const handleMarkerClick = (trip) => {
    	setActiveMarker(trip);
  	};

	// Function to close info windows when the map is clicked
  	const handleMapClick = useCallback((event) => {
      	setActiveMarker(null);
  	}, []);

 	const handleTripDetails = (tripID) => {
  		navigate(`/tripdetails/${tripID}`); 
	};

   const MarkerWithInfoWindow = ({ trip, isActive, onClick }) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
  
    return (
      <>
        <AdvancedMarker
          position={{ lat: trip.latitude, lng: trip.longitude }}
          ref={markerRef}
          onClick={() => onClick(trip)}
        />
        {isActive && (
          <InfoWindow anchor={marker}>
            <Card
                key={trip.tripID}
                city={trip.city}
                country={trip.country}
                startDate={formatDate(trip.startDate)}
                endDate={formatDate(trip.endDate)}
                imageUrl={trip.photos[0]?.url}
                description={trip.description}
				        onClick={() => handleTripDetails(trip.tripID)}
              />
          </InfoWindow>
        )}
      </>
    );
  };

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCenter({ lat: latitude, lng: longitude });
            },
          (error) => {
            console.error("Error getting user location:", error);
            }
          );
      } else {
        console.error("Geolocation is not supported by this browser.");
        }
      }, []);

      useEffect(() => {
        const loadApiKey = async () => {
          try {
            const key = await fetchApiKey();

            setApiKey(key);
          } catch (error) {
            console.error('Failed to load API key:', error);
          }
        };
        loadApiKey();
      				}, []);

  if (!apiKey) {
    return <div>Loading map...</div>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="map-div">
        <Map
          mapId={mapId}
          defaultZoom={13}
          defaultCenter={center}
          onClick={handleMapClick}
        >
          {tripsArray.map((trip) => (
            <MarkerWithInfoWindow
              key={trip.tripID}
              trip={trip}
              isActive={activeMarker === trip}
              onClick={handleMarkerClick}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  )};
