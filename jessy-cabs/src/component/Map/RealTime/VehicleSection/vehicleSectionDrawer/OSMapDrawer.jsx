import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline ,ZoomControl,useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

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
const SetMapCenter = ({ position }) => {
  const map = useMap();
  const [hasZoomed, setHasZoomed] = useState(false);

  useEffect(() => {
    if (position && !hasZoomed) {
      map.setView(position, 13, { animate: true }); // Zoom only once
      setHasZoomed(true); // Prevent future zoom changes
    } else if (position) {
      map.panTo(position, { animate: true }); // Move without zooming
    }
  }, [position, map, hasZoomed]);

  return null;
};

const OSMapDrawer = ({ vehNo, startMarkerPosition, currentPosition, currentDatePoints,dynamicPolyline,moveposition}) => {
  const [startAddress, setStartAddress] = useState("Fetching...");
  const [endAddress, setEndAddress] = useState("Fetching..."); 

  const getLatLng = (position) => {
    if (!position || !position.Latitude_loc || !position.Longtitude_loc) {
      return null;
    }
    return [parseFloat(position.Latitude_loc), parseFloat(position.Longtitude_loc)];
  };

  const getLatLng2 = (position) => {
    if (!position || !position.lat || !position.lng) {
      return null;
    }
    return [parseFloat(position.lat), parseFloat(position.lng)];
  };

  const GOOGLE_MAPS_API_KEY = "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE"; // Replace with your API key

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      if (response.data.status === "OK" && response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address lookup failed";
    }
  };
  // console.log(moveposition,"tolldps")

  useEffect(() => {
    if (startMarkerPosition) {
      getAddressFromLatLng(parseFloat(startMarkerPosition.Latitude_loc), parseFloat(startMarkerPosition.Longtitude_loc))
        .then((address) => setStartAddress(address));
    }
    if (currentPosition) {
      getAddressFromLatLng(parseFloat(currentPosition.Latitude_loc), parseFloat(currentPosition.Longtitude_loc))
        .then((address) => setEndAddress(address));
    }
  }, [startMarkerPosition, currentPosition]);

  const startPos = getLatLng(startMarkerPosition);
  const currentPos = getLatLng(currentPosition);
  const polylinePoints = currentDatePoints?.map(getLatLng).filter(Boolean) || [];
  const movedata= getLatLng2(moveposition)
  // console.log(movedata,"tolldmovell",startPos)
  // console.log(polylinePoints,"tolldpolll")

  const jessyCabsLocation = {
    lat: 13.031207,
    lng: 80.239396,
  };
  // console.log(startPos,"tolldstartpos")

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Distance in km (2 decimal places)
  };
  // Helper function to safely get lat/lng
  // const getLatLng = (position) => {
  //   if (!position || !position.Latitude_loc || !position.Longtitude_loc) {
  //     console.log("tollnullnoten")
  //     return [13.080555, 80.163118]; // Skip if invalid data
  //   }
  //   console.log("tolllnoten")
  //   return [parseFloat(position.Latitude_loc), parseFloat(position.Longtitude_loc)];
  // };

  // // Safe coordinate extraction
  // const startPos = getLatLng(startMarkerPosition);
  // console.log(startMarkerPosition,"tollpos")
  // const currentPos = getLatLng(currentPosition);
  // const polylinePoints = currentDatePoints?.map(getLatLng).filter(Boolean) || [];
  // // const polylinePoints2 = dynamicPolyline?.map(getLatLng).filter(Boolean) || [];
  // console.log(polylinePoints,"tollare",polylinePoints,dynamicPolyline,currentDatePoints,startPos)
  

  return (
    // <MapContainer center={startPos || [0, 0]} zoom={30} minZoom={1}  // Prevent zooming out too much
    // maxZoom={19} style={{ height: "400px", width: "100%" }}>
  //   <MapContainer center={startPos || [0,0]} zoom={20} minZoom={4}  maxZoom={19} style={{ height: "400px", width: "100%" }}>
          
     
  //     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  //     {/* Start Marker */}
  //     {startPos && currentDatePoints.length > 0 && (
  //       <Marker position={startPos} icon={defaultIcon}>
  //         <Popup>Start Position</Popup>
  //       </Marker>
  //     )}

  //     {/* Current Position Marker */}
  //     {currentPos && currentDatePoints.length > 0 && (
  //       <Marker position={currentPos} icon={defaultIcon}>
  //         <Popup>Current Position: {vehNo}</Popup>
  //       </Marker>
  //     )}

    
  //     {dynamicPolyline.length > 0  ? (
  // <Polyline positions={dynamicPolyline} color="blue" weight={4} opacity={0.7} />
  //     ): 
  //       <Polyline positions={polylinePoints} color="blue" weight={4} opacity={0.7} />
  //   }
  <MapContainer
  center={startPos || [21.7679, 78.8718]}
  zoom={4}
  minZoom={4}  // Prevent zooming out too much
    maxZoom={19} 
  style={{ height: "500px", width: "100%" }}
>
  <SetMapCenter position={startPos} />
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  {/* Start Marker */}
  {startPos && (
    <Marker position={startPos} icon={defaultIcon}>
      <Popup>
        <div>
          <strong style={{ fontSize: 19, fontWeight: "500" }}>{vehNo}</strong> <br />
          <strong style={{ fontSize: 14, fontWeight: 500, padding: 5 }}>Driver:</strong> <br />
          <strong style={{ fontSize: 14, fontWeight: 500, padding: 5 }}>Location : </strong> {startAddress} <br />
          <strong style={{ fontSize: 14, fontWeight: 500, padding: 5 }}>Nearest Address:</strong>{calculateDistance(jessyCabsLocation.lat, jessyCabsLocation.lng, parseFloat(startMarkerPosition?.Latitude_loc), parseFloat(startMarkerPosition?.Longtitude_loc))} km from JESSY CABS (Office)
        </div>
      </Popup>
    </Marker>
  )}

  {/* Current Position Marker */}
  {currentPos && (
    <Marker position={currentPos} icon={defaultIcon}>
      <Popup>
        <div>
          <strong style={{ fontSize: 19, fontWeight: "500", textAlign: 'center' }}>{vehNo}</strong> <br />
          <strong style={{ fontSize: 14, fontWeight: 500, padding: 5 }}>Driver:</strong> <br />
          <strong style={{ fontSize: 14, fontWeight: 500, padding: 5 }}>Location : </strong> {endAddress} <br />
          <strong style={{ fontSize: 14, fontWeight: 500, padding: 5 }}>Nearest Address:</strong>{calculateDistance(jessyCabsLocation.lat, jessyCabsLocation.lng, parseFloat(currentPosition?.Latitude_loc), parseFloat(currentPosition?.Longtitude_loc))} km from JESSY CABS (Office)
        </div>
      </Popup>
    </Marker>
  )}

 {movedata && (
    <Marker
        position={movedata}
        icon={defaultIcon}
      
    />
)} 

  {/* Polyline for Route */}
  {/* {polylinePoints.length > 1 && (
    <Polyline positions={polylinePoints} color="blue" weight={4} opacity={0.7} />
  )} */}
  {dynamicPolyline.length > 0 ?
    <Polyline positions={dynamicPolyline} color="blue" weight={4} opacity={0.7} />
  :
  <Polyline positions={polylinePoints} color="blue" weight={4} opacity={0.7} />}

    </MapContainer>
  );
};

export default OSMapDrawer;
