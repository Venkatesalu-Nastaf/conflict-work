import React from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { MarkerClustererF } from "@react-google-maps/api";
import caricon from "../VehicleSection/VehicleInformationDrawer/mapicon.png"

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 13.080555, // Default latitude
  lng: 80.163118, // Default longitude
};

const GoogleMapFile = ({ vehicleCurrentLocation }) => {
  console.log(vehicleCurrentLocation, "Vehicle Locations----------------");

  return (
    <LoadScript googleMapsApiKey="AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
        <MarkerClustererF>
          {(clusterer) =>
            vehicleCurrentLocation?.map((vehicle, index) => (
              <MarkerF
                key={index}
                position={{
                  lat: parseFloat(vehicle?.Lattitude_loc),
                  lng: parseFloat(vehicle?.Longitude_loc),
                }}
                icon={{
                  url: caricon,
                  scaledSize: new window.google.maps.Size(90, 90),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(45, 45),
                }}
                 clusterer={clusterer}
              />
            ))
          }
        </MarkerClustererF>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapFile;
