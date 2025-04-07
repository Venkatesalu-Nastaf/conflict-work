
/* global google */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, MarkerF, InfoWindow, useLoadScript, DirectionsRenderer, MarkerClusterer } from '@react-google-maps/api';
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
import caricon from '../VehicleSection/VehicleInformationDrawer/mapicon.png';
import { VehicleMapData } from '../../vehicleMapContext/vehcileMapContext';
// import VehiclesDetailsPopup from "../../Modal/VehicleDetailsPopup";
import VehicleDetailsPopup from '../../VehicleModal/VehicleDetailsPopup';
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




const MapSection = ({ vehicleCurrentLocation, allVehicleList }) => {
  // Load the Google Maps script with your API key and necessary libraries
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE",
    libraries: ['places'],
  });
  const mapRef = useRef(null);

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
  const [vehiclePositionPopup, setVehiclePositionPopup] = useState(null)

  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [userLocation, setUserLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const menuItem = localStorage.getItem('activeMenuItem');
  const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });
  const { jessyCabsDistance, setJessyCabsDistance, vehiclePoint, setVehiclePoint } = VehicleMapData();
  const [officeDistance, setOfficeDistance] = useState("")
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
  // if (!isLoaded) return <div>Loading...</div>;
  const position = [51.505, -0.09]; // Latitude and Longitude for the map center
  const mapFitBounds = () => {
    // console.log("mapFitBounds:map> ", map);
    if (!map) return;

    const bounds = new google.maps.LatLngBounds();
    vehicleCurrentLocation?.map((loc) => {
      bounds.extend(new google.maps.LatLng(parseFloat(loc?.Lattitude_loc), parseFloat(loc?.Longitude_loc)));
    });
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds);
    }
    map.fitBounds(bounds);
  }
  useEffect(() => {
    if (map) {
      mapFitBounds();
    }
  }, [map, vehicleCurrentLocation])
  const clusterStyles = [

    {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png', // Medium cluster
      height: 70,
      width: 70,
      textColor: "black",
      textSize: 14,
    },

  ];
  console.log(vehicleCurrentLocation, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvs");
  useEffect(() => {
    if (menuItem === "RealTime" && localStorage.getItem('hasReloaded') !== 'true') {
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
      console.log("iiiiiiiiiiiiiiiiiiii");

    }
  }, [menuItem]);

  //   const handleVehicleLocation = (location, e) => {
  //     console.log(location, "weeeeeeeeeeeeeeeeeeeeeee",);
  //     console.log(e, "Mouse Event Data", e?.domEvent?.clientX, "wwwwww");

  //     setClickPosition({
  //         lat: parseFloat(location?.Lattitude_loc),
  //         lng: parseFloat(location?.Longitude_loc),
  //         pixelX: e?.domEvent?.clientX, // Capture X position
  //         pixelY: e?.domEvent?.clientY, // Capture Y position
  //         vehno:location?.Vehicle_No
  //     });

  //     setVehiclePoint(true);
  // };
  const jessyCabsLocation = {
    lat: 13.031207,
    lng: 80.239396
  }
  const handleVehicleLocation = (location, e) => {
    console.log(location, "weeeeeeeeeeeeeeeeeeeeeee");
    console.log(e, "Mouse Event Data", e?.domEvent?.clientX, "wwwwww");

    const lat = parseFloat(location?.Lattitude_loc);
    const lng = parseFloat(location?.Longitude_loc);

    const lat1 = location?.Lattitude_loc;
    const lng1 = (location?.Longitude_loc)
    setClickPosition({
      lat,
      lng,
      pixelX: e?.domEvent?.clientX, 
      pixelY: e?.domEvent?.clientY, 
      vehno: location?.Vehicle_No
    });

    setVehiclePoint(true);
    console.log(lat, "Addressss111111", lng);

    // Reverse Geocoding to get Address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        console.log("Addressss:", results[0].formatted_address);
        setClickPosition(prev => ({
          ...prev,
          address: results[0].formatted_address // Add address to state
        }));
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
    const origin = new window.google.maps.LatLng(jessyCabsLocation?.lat, jessyCabsLocation?.lng);
    const destination = new window.google.maps.LatLng(parseFloat(location?.Lattitude_loc), parseFloat(location?.Longitude_loc));
    console.log(destination, "mainnnnnnnnnnnn33333333", destination,);

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
      },
      (response, status) => {
        console.log(status, "mainnnnnnnnnnnn");

        if (status === "OK") {
          const distanceText = response.rows[0].elements[0].distance.text;
          console.log(distanceText, "mainnnnnnnnnnnn111111111111");
          setOfficeDistance(distanceText)
          return
        } else {
          console.log(response, "mainnnnnnnnnnnn2222222222222");

        }
      }
    );
  };


  console.log(vehiclePoint, "weeeeeeeeeeeeeeeeeeeeeeeeeeee-----------", vehicleCurrentLocation);

  return (
    <>

      <div className='map-section'>

        {mapType === 'google' && (

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            ref={mapRef}
            onLoad={(map) => {
              setMap(map);
              mapRef.current = map;
            }}
          >
            {vehiclePoint && <VehicleDetailsPopup position={clickPosition} setVehiclePoint={setVehiclePoint} officeDistance={officeDistance} />}


            <MarkerClusterer options={{ styles: clusterStyles }}>
              {(clusterer) =>
                vehicleCurrentLocation?.map((loc, index) => (
                  <div>
                    <MarkerF
                      key={index}
                      position={{ lat: parseFloat(loc?.Lattitude_loc), lng: parseFloat(loc?.Longitude_loc) }}
                      clusterer={clusterer}
                      onClick={(e) => handleVehicleLocation(loc, e)}
                      icon={{
                        url: caricon,
                        scaledSize: new window.google.maps.Size(100, 100),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(50, 50),
                      }}
                    />

                  </div>
                ))
              }
            </MarkerClusterer>




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
                    paddingRight: '2px',
                    minWidth: '70px'

                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', 
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


          <div style={{ position: 'relative', width: '100%', height: '400px' }}>


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
