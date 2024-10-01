/* global google */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import './googleMapScript';
import PlacesAutocomplete from 'react-places-autocomplete';
import axios from 'axios';
import { APIURL } from '../../../url';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';

const MapComponent = () => {

    const [address, setAddress] = useState('');
    const [open, setOpen] = useState(false);
    const [editMapTrigger, setEditMapTrigger] = useState(false)
    const location = useLocation()
    const apiURL = APIURL


    const TripId = localStorage.getItem('selectedTripid')
    const searchParams = new URLSearchParams(location.search);
    const urlParams = new URLSearchParams(window.location.search);

    const tripid = searchParams.get('tripid');
    const starttime = searchParams.get('starttime');
    const endtime = searchParams.get('endtime');
    const startdate = searchParams.get('startdate');
    const enddate = searchParams.get('closedate');
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude')
    const startLatitude = searchParams.get('startLatitude')
    const startLongitude = searchParams.get('startLongitude')
    const endLatitude = searchParams.get('endLatitude')
    const endLongitude = searchParams.get('endLongitude')
    const wayLatitude = searchParams.get('wayLatitude')
    const wayLongitude = searchParams.get('wayLongitude')
    const startingDate = searchParams.get('startingDate')
    const startingTime = searchParams.get('startingTime')
    const startPlaceName = searchParams.get('startPlaceName')
    const endPlaceName = searchParams.get('endPlaceName')
    const wayPlaceName = searchParams.get('wayPlaceName')
    const endingDate = searchParams.get('endingDate')
    const endingTime = searchParams.get('endingTime')
    const wayTime = searchParams.get('wayTime')
    const wayDate = searchParams.get('wayDate')
    const editMode = searchParams.get('edit')
    // const latitude = JSON.parse(decodeURIComponent(urlParams.get('latitude')));
    // const longitude = JSON.parse(decodeURIComponent(urlParams.get('longitude')));
    const row = JSON.parse(decodeURIComponent(urlParams.get('row')));
    const formattedStartTime = starttime?.slice(0, 5);
    const formattedEndTime = endtime?.slice(0, 5);

    const [startLat, setStartLat] = useState(null);
    const [startLong, setStartLong] = useState(null);
    const [endLat, setEndLat] = useState(null);
    const [endLong, setEndLong] = useState(null);
    const [wayLat, setWayLat] = useState([]);  // Assuming multiple waypoints, use an array
    const [wayLong, setWayLong] = useState([]);

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}/get-gmapdata/${tripid}`);
                const mapData = response.data;
                console.log(mapData, 'mapData');

                const startingTrips = mapData.filter(trip => trip.trip_type === "start");
                const endingTrips = mapData.filter(trip => trip.trip_type === "end");
                const wayTrips = mapData.filter(trip => trip.trip_type === "waypoint");

                // Set the state with the fetched values
                setStartLat(startingTrips.length > 0 ? startingTrips[0].Latitude : '');
                setStartLong(startingTrips.length > 0 ? startingTrips[0].Longitude : '');
                setEndLat(endingTrips.length > 0 ? endingTrips[0].Latitude : '');
                setEndLong(endingTrips.length > 0 ? endingTrips[0].Longitude : '');

                setWayLat(wayTrips.map(trip => trip.Latitude));
                setWayLong(wayTrips.map(trip => trip.Longitude));
                console.log(startingTrips, startLat, 'Updated Start Location');
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchData();
    }, [apiURL, tripid, editMapTrigger, editMode, startLat, startLong, endLat, endLong, location]);
    console.log(startLat, startLong, endLat, endLong, wayLat, wayLong, 'editttt');

    useEffect(() => {
        window.initMap({ lat: latitude, editMode: editMode, lng: longitude, row: row, startLatitude: startLatitude, startLongitude: startLongitude, endLatitude: endLatitude, endLongitude: endLongitude, wayLatitude: wayLatitude, wayLongitude: wayLongitude, startingDate: startingDate, startingTime: startingTime, startPlaceName: startPlaceName, endingDate: endingDate, endingTime: endingTime, endPlaceName: endPlaceName, wayDate: wayDate, wayTime: wayTime, wayPlaceName: wayPlaceName });
    }, []);
    const handleSelect = async (address) => {
        const geocoder = new google.maps.Geocoder();

        try {
            const results = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === 'OK' && results && results.length > 0) {
                        resolve(results);
                    } else {
                        reject(new Error('Geocode failed'));
                    }
                });
            });
            if (results[0].geometry && results[0].geometry.location) {
                const latLng = results[0].geometry.location;
                window.map.setCenter(latLng);
                window.map.setZoom(14);
                window.map.submitPopup();
            }
        } catch {
        }
    };

    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };
    const handleEditMapPoints = () => {
        window.handleEditMapPoints()
        setEditMapTrigger(editMapTrigger)
    }

    const generateStaticMap = () => {
        window.generateStaticMap();
        setOpen(true);
    };
    const generateEditStaticMap = () => {
        window.generateEditStaticMap();
        setOpen(true);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="search-input-field">
                        <input
                            {...getInputProps({
                                placeholder: 'Enter location',
                            })}
                        />
                        <div>
                            {suggestions.map((suggestion, index) => (
                                <div key={index} {...getSuggestionItemProps(suggestion)}>
                                    {suggestion.description}
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <input type="hidden" id="start" />
            <input type="hidden" id="end" />
            {
                editMode === "editMode" ?
                    <Button variant="" onClick={generateEditStaticMap}>
                        Capture EditMap View
                    </Button> : <Button variant="" onClick={generateStaticMap}>
                        Capture Map View
                    </Button>
            }

            <Snackbar
                open={open}
                autoHideDuration={2}
                onClose={handleClose}
            >
                <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%', marginBottom: "742px", marginLeft: "1200px" }}>
                    Captured successfully!
                </MuiAlert>
            </Snackbar>
            <div style={{ display: 'flex', gap: 25, }}>
                <label style={{ fontWeight: 'bold' }}>Trip Id :<span>{tripid}</span> </label>
                <label style={{ fontWeight: 'bold' }}>Start Date : <span>{startdate}</span></label>
                <label style={{ fontWeight: 'bold' }}>Close Date : <span>{enddate}</span></label>
                <label style={{ fontWeight: 'bold' }}>Start Time : <span>{formattedStartTime}</span></label>
                <label style={{ fontWeight: 'bold' }}>Close Time : <span>{formattedEndTime}</span> </label>
                {editMode === "editMode" ?
                    <div style={{ padding: 2 }}>
                        <button style={{ width: 100, height: 30, fontSize: '15px', backgroundColor: 'green', color: "white" }} onClick={handleEditMapPoints}>EDIT</button>
                    </div> : ""
                }
            </div>

            <div id="map" style={{ height: '500px' }}></div>
        </div>
    );
};

export default MapComponent;