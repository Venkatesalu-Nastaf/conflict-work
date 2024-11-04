
/* global google */
import React, { useState, useCallback , useEffect} from 'react';
import { GoogleMap, MarkerF, InfoWindow, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { IconButton, Button } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import "./MapSection.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Fix for marker icon issues with Webpack
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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
    // googleMapsApiKey: "AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk", // Your actual Google Maps API key
    libraries: ['places'], // Add any additional libraries you need
  });

  // State management for the map, location, directions, popup, etc.
  const [mapType, setMapType] = useState('google'); // State to manage map type

  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(13.0827); // Default latitude (Chennai)
  const [long, setLong] = useState(80.2707); // Default longitude (Chennai)
  const [direction, setDirection] = useState(false);
  const [directionRendererKey, setDirectionRendererKey] = useState(0);
  const [directionRoute, setDirectionRoute] = useState(null);
  const [openPopup, setOpenPopup] = useState(false); // State to handle popup open/close
  const [popupPosition, setPopupPosition] = useState(null); // State for popup position


  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location: ', error);
        }
      );
    }
  }, []);
  const [userPosition, setUserPosition] = useState(null); // State for the user's current location

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting the current location: ", error);
        }
      );
    }
  }, []);

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
  const position = [51.505, -0.09]; // Latitude and Longitude for the map center


 

  return (
    <>
      {/* <div className='map-section'>

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
              onClick={handleOpenPopup}
            />
          )}

          {openPopup && popupPosition && (
            <InfoWindow
              position={popupPosition}
              onCloseClick={handleClosePopup} 
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
        

          <div style={{ zIndex: 1, position: 'absolute', top: '400px', right: '60px' }} onClick={handleOpenPopup}>
            <IconButton onClick={handleCenterButtonClick} style={{ backgroundColor: 'red', color: 'white' }}>
              <NavigationIcon />
            </IconButton>
          </div>

        </GoogleMap>
      </div>
      <div style={{width:"100%", border:"2px solid #000000"}}>
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}>
        <Popup>
          Aaaaaaaaaaaaaaa pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
      </div> */}

      <div className='map-section'>
        {/* <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
          <InputLabel id="map-type-label">Map Type</InputLabel>
          <Select
            labelId="map-type-label"
            value={mapType}
            onChange={(e) => setMapType(e.target.value)}
            label="Map Type">
            <MenuItem value="google">Google Map</MenuItem>
            <MenuItem value="os">OS Map</MenuItem>
          </Select>
        </FormControl> */}
        {mapType === 'google' && (
          // <GoogleMap
          //   mapContainerStyle={containerStyle}
          //   options={{
          //     minZoom: 12,
          //     maxZoom: 18,
          //   }}
          //   center={center}
          //   zoom={10}
          //   onLoad={setMap}
          //   onUnmount={() => setMap(null)}>

<GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      {/* {userLocation && (
        <MarkerF
          position={userLocation}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Optional: Custom icon for current location
          }}
         
          onClick={handleOpenPopup}
        />
      )} */}

{userLocation && (
              <MarkerF
                position={userLocation}
                icon={{
                  anchor: new window.google.maps.Point(137 / 2, 137 / 2),
                  scaledSize: new window.google.maps.Size(137, 137),
                }}
                onClick={handleOpenPopup}
              />
            )}


            {/* {markerLocation && (
              <MarkerF
                position={markerLocation}
                icon={{
                  anchor: new window.google.maps.Point(137 / 2, 137 / 2),
                  scaledSize: new window.google.maps.Size(137, 137),
                }}
                onClick={handleOpenPopup}
              />
            )} */}

            {openPopup && popupPosition && (
              <InfoWindow
                position={popupPosition}
                onCloseClick={handleClosePopup}
              >
                <div className="map-popup">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <h4 style={{ margin: 0 }}>6744TN11BE6744</h4>
                  </div>
                  <p>Group: Hyderabad | Driver: Vijayakumar</p>
                  <p>
                    <span className="red-indication"></span>Last updated: 22 Aug 24,
                    02:13:10 PM
                  </p>
                  <div className="status-from">
                    <p>Status: Parked</p>
                    <p>From: An Hour</p>
                  </div>
                  <div className="location-near">
                    <p>
                      Location: Perumalpattu - Kottamedu Road, Oragadam Industrial
                      Corridor, Perinjambakkam, Kanchipuram, Tamil Nadu
                    </p>
                    <p>Nearest Address: 46.9 km from JESSY CABS (Office)</p>
                  </div>
                  <div className="btns-section">
                    <button className="popup-last-btns">Nearby</button>
                    <button className="popup-last-btns">Add Address</button>
                    <button className="popup-last-btns">Create Job</button>
                    <button className="popup-last-btns">History</button>
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
                    strokeColor: '#1FA445',
                    strokeWeight: 7,
                  },
                }}
              />
            )}

            <div
              style={{
                zIndex: 1,
                position: 'absolute',
                top: '400px',
                right: '60px',
              }}
              onClick={handleOpenPopup}
            >
              <IconButton
                onClick={handleCenterButtonClick}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                <NavigationIcon />
              </IconButton>
            </div>

            {/* Select Dropdown inside the Map */}
            <div
              style={{
                zIndex: 1,
                position: 'absolute',
                top: '60px',
                right: '20px',
                padding: '2px',
                backgroundColor: "#fff",
              }}
            >
              <Select
                value={mapType}
                onChange={(e) => setMapType(e.target.value)}
                displayEmpty
                renderValue={(selected) => (selected ? selected : 'Select Map')}
                sx={{
                  '& .MuiSelect-select': {
                    paddingRight: '2px', // Adjust this to increase space between value and dropdown icon
                    minWidth: '70px'

                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Removes the border
                    // minWidth:'100px'
                  },
                }}
              >
                <MenuItem value="google">Google Map</MenuItem>
                <MenuItem value="os">OS Map</MenuItem>
              </Select>
            </div>
          </GoogleMap>
        )}
        {mapType === 'os' && (
          // <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
          //   <TileLayer
          //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          //   />
          //   <Marker position={position} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}>
          //     <Popup>
          //       Aaaaaaaaaaaaaaa pretty CSS3 popup. <br /> Easily customizable.
          //     </Popup>
          //   </Marker>

          // </MapContainer>

          <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            {/* <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={position}
                icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}
              >
                <Popup>
                  Aaaaaaaaaaaaaaa pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer> */}

<MapContainer center={userPosition || position} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {userPosition && (
        <Marker position={userPosition} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}>
          <Popup>
            You are here!
          </Popup>
        </Marker>
      )}

      <Marker position={position} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}>
        <Popup>
          Aaaaaaaaaaaaaaa pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>

            {/* Select Dropdown inside the Map */}
            <div
              style={{
                zIndex: 1000,
                position: 'absolute',
                top: '60px',
                right: '20px',
                padding: '2px',
                backgroundColor: "#fff",
              }}
            >
              <Select
                value={mapType}
                onChange={(e) => setMapType(e.target.value)}
                displayEmpty
                renderValue={(selected) => (selected ? selected : 'Select Map')}
                sx={{
                  '& .MuiSelect-select': {
                    paddingRight: '2px', // Adjust this to increase space between value and dropdown icon
                    minWidth: '70px'

                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Removes the border
                    // minWidth:'100px'
                  },
                }}
              >
                <MenuItem value="google">Google Map</MenuItem>
                <MenuItem value="os">OS Map</MenuItem>
              </Select>
            </div>
          </div>


        )}
      </div>
    </>
  );
};

export default MapSection;
