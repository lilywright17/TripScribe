import React from "react";
import './map.css';

import {
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps";

export const MapPage = () => (
  <APIProvider
    apiKey={"AIzaSyBXeEY40DPUFtPT41BSxfbpn20T_xKQvGY"}
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
      ></Map>
    </div>
  </APIProvider>
);
