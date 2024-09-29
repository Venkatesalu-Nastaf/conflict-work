/* global google */

import React, { useEffect, useState } from 'react';
import './googleMapScript';
import PlacesAutocomplete from 'react-places-autocomplete';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';

const MapComponent = () => {

    const [address, setAddress] = useState('');
    const [open, setOpen] = useState(false);
    const location = useLocation()

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
    // const latitude = JSON.parse(decodeURIComponent(urlParams.get('latitude')));
    // const longitude = JSON.parse(decodeURIComponent(urlParams.get('longitude')));
    const row = JSON.parse(decodeURIComponent(urlParams.get('row')));   
     const formattedStartTime = starttime?.slice(0, 5);
    const formattedEndTime = endtime?.slice(0, 5);
    console.log(startLatitude,startLongitude,endLatitude,endLongitude,wayLatitude,wayLongitude,'latitude');
    
    useEffect(() => {
        window.initMap({ lat: latitude, lng: longitude,row:row,startLatitude:startLatitude,startLongitude:startLongitude,endLatitude:endLatitude,endLongitude:endLongitude,wayLatitude:wayLatitude,wayLongitude:wayLongitude,startingDate:startingDate,startingTime:startingTime,startPlaceName:startPlaceName,endingDate:endingDate,endingTime:endingTime,endPlaceName:endPlaceName,wayDate:wayDate,wayTime:wayTime,wayPlaceName:wayPlaceName });
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

    const generateStaticMap = () => {
        window.generateStaticMap();
        setOpen(true);
    };
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
            <Button variant="" onClick={generateStaticMap}>
                Capture Map View
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={2}
                onClose={handleClose}
            >
                <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%', marginBottom: "742px", marginLeft: "1200px" }}>
                    Captured successfully!
                </MuiAlert>
            </Snackbar>
            <div style={{ display: 'flex', gap: 20 }}>
                <label>Trip Id : {TripId}</label>
                <label>Start Date : {startdate}</label>
                <label>Close Date : {enddate}</label>
                <label>Start Time : {formattedStartTime}</label>
                <label>Close Time : {formattedEndTime}</label>

            </div>
            <div id="map" style={{ height: '500px' }}></div>
        </div>
    );
};

export default MapComponent;