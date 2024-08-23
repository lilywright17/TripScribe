import React, { useState, useEffect, useCallback, useRef } from "react";
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

  useEffect(() => {
    console.log('useEffect running');
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
          console.log('Trip Data:', tripData);
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

  console.log('MapPage component is rendering');
  // define navigate so that we can navigate to different pages on clicking
  const navigate = useNavigate();

  // State for setting the user location
  const [userLocation, setUserLocation] = useState(null);

  // State to keep track of the currently active marker
  const [activeMarker, setActiveMarker] = useState(null);
  // Had some issues with markers not loading, so set them to be executed only when map is loaded - setting the state of the map loading

  const centerRef = useRef({ lat: 51.507351, lng: -0.127758 });

  const [apiKey, setApiKey] = useState(null);
  const [tripsArray, setTripsArray] = useState([]);

  const handleMarkerClick = (trip) => {
    setActiveMarker(trip);
  };

  // Function to handle map click - so that we can click off of an info window by clicking the map
  const handleMapClick = useCallback((event) => {
      setActiveMarker(null);
  }, []);

 // TripDetails navigation handler
 const handleTripDetails = (tripID) => {
  console.log('Trip Details');
  navigate(`/tripdetails/${tripID}`); 
};

  // Creating the infowindow and marker as one component, with the infowindow only showing when the marker is clicked
   const MarkerWithInfoWindow = ({ trip, isActive, onClick }) => {
    console.log('Rendering MarkerWithInfoWindow with trip:', trip);
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
    // Ask for the user's location
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            centerRef.current = { lat: latitude, lng: longitude };
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
          console.log('Attempting to load API key...');
          try {
            const key = await fetchApiKey();
            console.log('API key loaded successfully');
            setApiKey(key);
          } catch (error) {
            console.error('Failed to load API key:', error);
          }
        };
        loadApiKey();
      }, []);

      // Only render the map when API key is loaded - this was the cause of the map failing to load before
  if (!apiKey) {
    return <div>Loading map...</div>;
  }

   return (
  <APIProvider
    apiKey={apiKey}
    // onLoad={() => setMapLoaded(true)} 
  >
    <div className="map-div">
      <Map
        mapId={mapId}
        defaultZoom={13}
        defaultCenter={userLocation ||centerRef.current}
        onClick={handleMapClick} 
      >{/* Render a Marker for each location */}
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
