import React, { useState, useEffect, useCallback } from "react";
import { Card } from "../../components/card/card.jsx";
import { useNavigate } from "react-router-dom";
import './map.css';
import editButtonImage from "./images/edit_button.png"
import { tripsArray } from './tripsArray.js'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  MapCameraChangedEvent,
  useAdvancedMarkerRef
} from "@vis.gl/react-google-maps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";


const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const mapId = 'a86e835a30ffed0';

const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const MapPage = () => {

  // define navigate so that we can navigate to different pages on clicking
  const navigate = useNavigate();

  // State for setting the user location
  const [userLocation, setUserLocation] = useState(null);

  // State to keep track of the currently active marker
  const [activeMarker, setActiveMarker] = useState(null);
  // Had some issues with markers not loading, so set them to be executed only when map is loaded - setting the state of the map loading

  const [mapLoaded, setMapLoaded] = useState(false);

  // Function to handle marker click
  //  const handleMarkerClick = useCallback((trip) => {
  //   setActiveMarker((prevActiveMarker) =>
  //     prevActiveMarker === trip ? null : trip
  //   );
  // }, []);

  const handleMarkerClick = (trip) => {
    setActiveMarker(trip);
  };

  // Function to handle map click - so that we can click off of an info window by clicking the map
  const handleMapClick = useCallback((event) => {
      setActiveMarker(null);
  }, []);

  // Function to navigate to the edit page when we click the edit button
   const handleEdit = (trip) => {
    navigate("/edittrip", { state: { trip } });
  };

  // Viewtrip handler
	const handleTripDetails = (trip) => {
    console.log('Trip Details');
    navigate("/tripdetails", { state: { country: trip.country, city: trip.city,startDate:trip.startDate,endDate: trip.endDate, images: trip.image || [], description: trip.description }});
  };

  // Creating the infowindow and marker as one component, with the infowindow only showing when the marker is clicked
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
                imageUrl={trip.image[0]}
                description={trip.description}
                editButton={editButtonImage}
                onEdit={() => handleEdit(trip)}
				        onClick={() => handleTripDetails(trip)}
              />
            {/* <div>
              <h2>{trip.title}</h2>
              <p>{trip.description.substring(0, 100).trim()}...</p>
              <p>{trip.startDate} to {trip.endDate}</p>
              <a href="google.com">View full trip details</a>
            </div> */}
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
            },
          (error) => {
            console.error("Error getting user location:", error);
            }
          );
      } else {
        console.error("Geolocation is not supported by this browser.");
        }
      }, []);

   return (
  <APIProvider
    apiKey="AIzaSyDFL24r_ClK5U1jnYPXhDgIlPSoz7KYuqM"
    onLoad={() => setMapLoaded(true)} 
  >
    <div className="map-div">
      <Map
        mapId={mapId}
        defaultZoom={13}
        center={userLocation || { lat: -33.860664, lng: 151.208138 }}
        onClick={handleMapClick} 
        // onCameraChanged={(ev) =>
        //   console.log(
        //     "camera changed:",
        //     ev.detail.center,
        //     "zoom:",
        //     ev.detail.zoom
      >{/* Render a Marker for each location */}
  {mapLoaded && tripsArray.map((trip) => (
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
