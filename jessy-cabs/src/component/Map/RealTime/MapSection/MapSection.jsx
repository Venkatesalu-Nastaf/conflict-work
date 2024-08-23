



/* global google */

import React, { useState, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindow, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { IconButton, Button } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import "./MapSection.css";

// Define the container style for the map
const containerStyle = {
  width: '100%',
  height: '450px',
  // border: '2px solid black',
};

// Set the default map center (Chennai)
const center = {
  lat: 13.0827,
  lng: 80.2707,
};

const MapSection = () => {
  // Load the Google Maps script with your API key and necessary libraries
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk", // Your actual Google Maps API key
    libraries: ['places'], // Add any additional libraries you need
  });

  // State management for the map, location, directions, popup, etc.
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(13.0827); // Default latitude (Chennai)
  const [long, setLong] = useState(80.2707); // Default longitude (Chennai)
  const [direction, setDirection] = useState(false);
  const [directionRendererKey, setDirectionRendererKey] = useState(0);
  const [directionRoute, setDirectionRoute] = useState(null);
  const [openPopup, setOpenPopup] = useState(false); // State to handle popup open/close
  const [popupPosition, setPopupPosition] = useState(null); // State for popup position

  // Marker location based on latitude and longitude
  const markerLocation = lat && long ? { lat, lng: long } : null;

  // Map loading handler
  const onLoad = useCallback((map) => {
    map.setCenter(center);
    map.setZoom(16);
    setMap(map);
  }, []);

  // Map unmount handler
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Center button click handler
  const handleCenterButtonClick = () => {
    const zoomLevel = 16;
    if (map) {
      map.panTo(markerLocation ? markerLocation : center);
      map.setZoom(zoomLevel);
    }
  };

  // Popup open/close handlers
  const handleOpenPopup = () => {
    setPopupPosition(markerLocation); // Open popup at marker location
    setOpenPopup(true);
  };
  const handleClosePopup = () => setOpenPopup(false);

  // Check if Google Maps API is loaded
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className='map-section'>

        <GoogleMap
          mapContainerStyle={containerStyle}
          options={{
            minZoom: 12,
            maxZoom: 18,
          }}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markerLocation && (
            <MarkerF
              position={markerLocation}
              icon={{
                anchor: new google.maps.Point(137 / 2, 137 / 2),
                scaledSize: new google.maps.Size(137, 137),
              }}
              onClick={handleOpenPopup} // Open popup on marker click
            />
          )}

          {openPopup && popupPosition && (
            <InfoWindow
              position={popupPosition}
              onCloseClick={handleClosePopup} // Close popup when the close button is clicked
            >
              <div className='map-popup'>
                <h4>6744TN11BE6744</h4>
                <p>Group: Hyderabad|Driver: Vijayakumar</p>
                <p><span className='red-indication'></span>Last updated:22 Aug 24, 02:13:10 PM</p>
                <div className='status-from'>
                  <p>Status: Parked</p>
                  <p>From: An Hour</p>
                </div>
                <div className='location-near'>
                  <p>Location:
                    Perumalpattu - Kottamedu Road, Oragadam Industrial Corridor, Perinjambakkam, Kanchipuram, Tamil Nadu
                  </p>
                  <p>
                    Nearest
                    Address:
                    46.9 km from JESSY CABS ( Office )
                  </p>
                </div>
                
                <div className='btns-section'>
                  <button className='popup-last-btns'>Nearby</button>
                  <button className='popup-last-btns'>Add Address</button>
                  <button className='popup-last-btns'>Create Job</button>
                  <button className='popup-last-btns'>History</button>
                </div>

              </div>
            </InfoWindow>
          )}



          {direction && (
            <DirectionsRenderer
              key={directionRendererKey}
              directions={directionRoute}
              options={{
                polylineOptions: {
                  strokeColor: "#1FA445",
                  strokeWeight: 7,
                },
              }}
            />
          )}
          {/* <div style={{ zIndex: 1, position: 'absolute', top: '60px', right: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleOpenPopup}>
            Open Popup
          </Button>
        </div> */}

          <div style={{ zIndex: 1, position: 'absolute', top: '400px', right: '60px' }} onClick={handleOpenPopup}>
            <IconButton onClick={handleCenterButtonClick} style={{ backgroundColor: 'red', color: 'white' }}>
              <NavigationIcon />
            </IconButton>
          </div>

        </GoogleMap>
      </div>

    </>
  );
};

export default MapSection;
