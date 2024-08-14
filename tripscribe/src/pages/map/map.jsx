import React from "react";
import './map.css';
import { tripsArray } from './tripsArray.js'
import {
  APIProvider,
  Map,
  Marker
} from "@vis.gl/react-google-maps";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const MapPage = () => (
  <APIProvider
    apiKey={apiKey}
    onLoad={() => console.log("Maps API has loaded.")}
  >
    <div className = "map-div">
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
      >{/* Render a Marker for each location */}
      {tripsArray.map((trip) => (
  <Marker key={trip.tripID} position={{ lat: trip.latitude, lng: trip.longitude }} />
))}</Map>

    </div>
  </APIProvider>
);
