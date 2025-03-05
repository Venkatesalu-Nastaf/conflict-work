import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const defaultIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const OSMapDrawer = ({ vehNo, startMarkerPosition, currentPosition, currentDatePoints }) => {
  // Helper function to safely get lat/lng
  const getLatLng = (position) => {
    if (!position || !position.Latitude_loc || !position.Longtitude_loc) {
      return null; // Skip if invalid data
    }
    return [parseFloat(position.Latitude_loc), parseFloat(position.Longtitude_loc)];
  };

  // Safe coordinate extraction
  const startPos = getLatLng(startMarkerPosition);
  const currentPos = getLatLng(currentPosition);
  const polylinePoints = currentDatePoints?.map(getLatLng).filter(Boolean) || [];

  return (
    <MapContainer center={startPos || [0, 0]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Start Marker */}
      {startPos && (
        <Marker position={startPos} icon={defaultIcon}>
          <Popup>Start Position</Popup>
        </Marker>
      )}

      {/* Current Position Marker */}
      {currentPos && (
        <Marker position={currentPos} icon={defaultIcon}>
          <Popup>Current Position: {vehNo}</Popup>
        </Marker>
      )}

      {/* Polyline for Route */}
      {polylinePoints.length > 1 && (
        <Polyline positions={polylinePoints} color="blue" weight={4} opacity={0.7} />
      )}
    </MapContainer>
  );
};

export default OSMapDrawer;
