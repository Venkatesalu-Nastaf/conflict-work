import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { APIURL } from "../../../url";
import PopUpContent from "./PopupContent";
import "./EditMapComponent.css"
import PlacesAutocomplete from 'react-places-autocomplete';
import { useData1 } from "../../../Dashboard/Maindashboard/DataContext";
const EditMapComponent = ({ tripid, edit, startdate, closedate, starttime, closetime }) => {

    const markersRef = useRef([]); // Store marker references
    const mapRef = useRef(null); // Store map reference
    const infoWindowRef = useRef(null); // Store info window reference
    const directionsServiceRef = useRef(null); // Directions service reference
    const directionsRendererRef = useRef(null); // Directions renderer reference
    const [mapUpdate, setMapUpdate] = useState(false);
    const [manualTripID, setManualTripID] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [mapCaptureVerify, setMapCaptureVerify] = useState(false);
    const apiUrl = APIURL;
    const { mapButtonTrigger, setMapButtonTrigger } = useData1()
    const [address, setAddress] = useState('');
    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // console.log(tripid, 'tripidmanual');
            try {
                const response = await axios.get(`${apiUrl}/getGmapdataByTripId/${tripid}`);
                // console.log(response.data, 'manual');
                setManualTripID(response.data);
            } catch (error) {
                console.log(error, 'Manual Error');
            }
        };
        fetchData();
    }, [mapUpdate, refresh]);

    const RefreshFetch = () => {
        setRefresh(prev => prev + 1)
    }

    // Extracting starting, ending, and way trips
    const startingTrips = manualTripID?.filter(trip => trip.trip_type === "start");
    const endingTrips = manualTripID?.filter(trip => trip.trip_type === "end");
    const wayTrips = manualTripID?.filter(trip => trip.trip_type === "waypoint");

    const startLatitude = startingTrips.length > 0 ? startingTrips[0].Latitude : '';
    const endLatitude = endingTrips.length > 0 ? endingTrips[0].Latitude : '';
    const startLongitude = startingTrips.length > 0 ? startingTrips[0].Longitude : '';
    const endLongitude = endingTrips.length > 0 ? endingTrips[0].Longitude : '';

    const startingDate = startingTrips.length > 0 ? startingTrips[0].date : '';
    const startingTime = startingTrips.length > 0 ? startingTrips[0].time : '';
    const startingTripType = startingTrips.length > 0 ? startingTrips[0].trip_type : '';
    const endingDate = endingTrips.length > 0 ? endingTrips[0].date : '';
    const endingTime = endingTrips.length > 0 ? endingTrips[0].time : '';
    const endingTripType = endingTrips.length > 0 ? endingTrips[0].trip_type : '';
    const wayLatitude = wayTrips?.map(li => li.Latitude);
    const wayLongitude = wayTrips?.map(li => li.Longitude);
    const wayDate = wayTrips?.map(li => li.date);
    const wayTime = wayTrips?.map(li => li.time);
    const startPlaceName = startingTrips.length > 0 ? startingTrips[0].place_name : '';
    const endPlaceName = endingTrips.length > 0 ? endingTrips[0].place_name : '';
    const wayPlaceName = wayTrips?.map(li => li.place_name)

    useEffect(() => {
        const loadGoogleMapsScript = (callback) => {
            const existingScript = document.getElementById('googleMaps');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk&libraries=places`;
                script.id = 'googleMaps';
                document.body.appendChild(script);

                script.onload = () => {
                    if (callback) callback();
                };
            } else if (existingScript && callback) callback();
        };

        const initMap = () => {
            const { Map, LatLng, Marker, InfoWindow, DirectionsService, DirectionsRenderer, Geocoder } = window.google.maps;

            // Initialize map
            mapRef.current = new Map(document.getElementById("map"), {
                center: new LatLng(startLatitude || 13.0827, startLongitude || 80.2707),
                zoom: 10,
            });

            setMapInstance(mapRef.current)

            infoWindowRef.current = new InfoWindow();
            directionsServiceRef.current = new DirectionsService();
            directionsRendererRef.current = new DirectionsRenderer();
            directionsRendererRef.current.setMap(mapRef.current);

            let waypointLabelCharCode = 'B'.charCodeAt(0); // Start label for waypoints from 'B'

            // Create start marker with label "A"
            if (startLatitude && startLongitude) {
                const startMarker = new Marker({
                    position: new LatLng(startLatitude, startLongitude),
                    map: mapRef.current,
                    label: "A",
                    title: startPlaceName,
                });
                markersRef.current.push({ marker: startMarker, placeName: startPlaceName, lat: startLatitude, lng: startLongitude });

                startMarker.addListener("click", () => {
                    showPopUpContent(startMarker, startPlaceName, startLatitude, startLongitude, startingDate, startingTime, startingTripType);
                });
            }

            // Create waypoints with labels starting from "B", "C", "D", etc.
            wayLatitude?.forEach((lat, index) => {
                if (wayLongitude[index]) {
                    const waypointMarker = new Marker({
                        position: new LatLng(lat, wayLongitude[index]),
                        map: mapRef.current,
                        label: String.fromCharCode(waypointLabelCharCode++), // Increment the label character
                        title: `Waypoint ${index + 1}`,
                    });

                    const waypointPlaceName = wayPlaceName ? wayPlaceName[index] : `Waypoint ${index + 1}`;
                    markersRef.current.push({
                        marker: waypointMarker,
                        placeName: waypointPlaceName,
                        lat: lat,
                        lng: wayLongitude[index],
                    });

                    waypointMarker.addListener("click", () => {
                        showPopUpContent(
                            waypointMarker,
                            waypointPlaceName,
                            lat,
                            wayLongitude[index],
                            wayDate[index],
                            wayTime[index],
                            "waypoint"
                        );
                    });
                }
            });

            // Create end marker with the next available label after waypoints
            const endMarkerLabel = String.fromCharCode(waypointLabelCharCode); // Use the next available letter after the last waypoint
            if (endLatitude && endLongitude) {
                const endMarker = new Marker({
                    position: new LatLng(endLatitude, endLongitude),
                    map: mapRef.current,
                    label: endMarkerLabel, // Assign the next available label
                    title: endPlaceName,
                });
                markersRef.current.push({ marker: endMarker, placeName: endPlaceName, lat: endLatitude, lng: endLongitude });

                endMarker.addListener("click", () => {
                    showPopUpContent(endMarker, endPlaceName, endLatitude, endLongitude, endingDate, endingTime, endingTripType);
                });
            }

            const geocoder = new Geocoder();

            // Map click event
            mapRef.current.addListener("click", (mapsMouseEvent) => {
                infoWindowRef.current.close();

                const lat = mapsMouseEvent.latLng.lat();
                const lng = mapsMouseEvent.latLng.lng();

                geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        const placeName = results[0].formatted_address;

                        const infoWindowContentDiv = document.createElement('div');

                        ReactDOM.render(
                            <PopUpContent
                                lat={lat}
                                lng={lng}
                                placeName={placeName}
                                tripid={tripid}
                                refresh={() => RefreshFetch()}
                                onAddMarker={addMarker}
                                startTime={startingTime}
                                date={startingDate}
                                tripType={startingTripType}
                            />,
                            infoWindowContentDiv
                        );

                        infoWindowRef.current.setContent(infoWindowContentDiv);
                        infoWindowRef.current.setPosition(mapsMouseEvent.latLng);
                        infoWindowRef.current.open(mapRef.current);
                    } else {
                        console.error("Geocoder failed due to: " + status);
                    }
                });
            });
        };

        loadGoogleMapsScript(initMap);
    }, [startLatitude, startLongitude, endLatitude, endLongitude, tripid, manualTripID]);


    const addMarker = (lat, lng, tripType, placeName, date, time, maptype) => {
        const { Marker, LatLng } = window.google.maps;
        let label;

        // Determine the label for the marker based on the type (start, waypoint, end)
        if (maptype === "start") {
            label = "A"; // Label for start trip
        } else if (maptype === "end") {
            // Label for end trip: next letter after the last waypoint
            const lastWaypointLabel = markersRef.current.length > 0
                ? markersRef.current[markersRef.current.length - 1].marker.label?.text
                : 'A'; // Fallback to 'A' if no previous markers

            if (lastWaypointLabel) {
                label = String.fromCharCode(lastWaypointLabel.charCodeAt(0) + 1);
            } else {
                label = 'A'; // Fallback in case of undefined lastWaypointLabel
            }
        } else {
            const waypointCount = markersRef.current.length;  // Use the current length of markersRef for indexing
            label = String.fromCharCode('B'.charCodeAt(0) + (waypointCount - 1));
        }

        // Create the marker with the appropriate label
        const marker = new Marker({
            position: new LatLng(lat, lng),
            map: mapRef.current,
            title: placeName,
            label: label,
        });

        // Push the new marker to the markers array
        markersRef.current.push({ marker, placeName, lat, lng });
        setMapButtonTrigger(!mapButtonTrigger)

        // Add a click listener to the marker
        marker.addListener("click", () => {
            showPopUpContent(marker, placeName, lat, lng, date, time, tripType); // Pass the new parameters
        });

        // Force map update
        setMapUpdate(prev => !prev);

        // Close any open info windows
        infoWindowRef.current.close();
    };



    const showPopUpContent = (marker, placeName, lat, lng, date, time, tripType) => {
        const infoWindowContentDiv = document.createElement('div');

        ReactDOM.render(
            <PopUpContent
                lat={lat}
                lng={lng}
                placeName={placeName}
                tripid={tripid}
                onAddMarker={addMarker}  // Pass addMarker function
                date={date} // Pass the date
                time={time} // Pass the time
                tripType={tripType} // Pass the trip type
                onRemoveMarker={() => removeMarker(marker)} // Pass remove function
            />,
            infoWindowContentDiv
        );

        infoWindowRef.current.setContent(infoWindowContentDiv);
        infoWindowRef.current.setPosition(marker.getPosition());
        infoWindowRef.current.open(mapRef.current);
    };

    const handleMapDraw = () => {
        if (!directionsServiceRef.current || !directionsRendererRef.current) {
            console.error("Directions service or renderer is not initialized.");
            return;
        }
        markersRef.current.forEach(({ marker }) => {
            marker.setMap(null); // Removes the marker from the map
        });
        markersRef.current = []; // Clear the marker array
        directionsRendererRef.current.setDirections({ routes: [] });

        const waypoints = wayLatitude.map((lat, index) => ({
            location: new window.google.maps.LatLng(lat, wayLongitude[index]),
            stopover: true,
        }));

        directionsServiceRef.current.route(
            {
                origin: new window.google.maps.LatLng(startLatitude, startLongitude),
                destination: new window.google.maps.LatLng(endLatitude, endLongitude),
                waypoints: waypoints,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === "OK") {
                    setMapCaptureVerify(true)
                    directionsRendererRef.current.setDirections(response);
                } else {
                    console.error("Directions request failed due to " + status);
                }
            }
        );
    };

    const removeMarker = async (markerToRemove) => {
        const markerData = markersRef.current.find(({ marker }) => marker === markerToRemove);

        if (!markerData) {
            console.error("Marker not found in markersRef.");
            return;
        }


        try {
            // Close the infoWindow if it's currently open
            if (infoWindowRef.current) {
                infoWindowRef.current.close();
            }

            const response = await axios.delete(`${apiUrl}/deleteMapPoint`, {
                data: {
                    latitude: markerData.lat,
                    longitude: markerData.lng,
                    tripid: tripid
                }
            });


            // Remove marker from the map
            markerToRemove.setMap(null);

            // Update markersRef to remove the deleted marker
            markersRef.current = markersRef.current.filter(({ marker }) => marker !== markerToRemove);

            // Optionally: You could trigger a re-render or update a state variable here if necessary
            setMapUpdate(!mapUpdate); // Uncomment if you want to re-render the map

        } catch (error) {
            console.error("Error deleting marker: ", error);
        }
    };

    function calculateZoomLevel(bounds) {
        const WORLD_DIM = { height: 256, width: 256 };
        const ZOOM_MAX = 21;
        function latRad(lat) {
            const sin = Math.sin(lat * Math.PI / 180);
            const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
            return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
        }
        function zoom(mapPx, worldPx, fraction) {
            return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
        }
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
        const lngDiff = ne.lng() - sw.lng();
        const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
        const latZoom = zoom(WORLD_DIM.height, 256, latFraction);
        const lngZoom = zoom(WORLD_DIM.width, 256, lngFraction);
        return Math.min(latZoom, lngZoom, ZOOM_MAX);
    }

    const handleMapDrawRouteVerify = () => {
        setTimeout(() => {
            setError(false)
        }, [1500])
    }

    const handleSuccessCapture = () => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, [1500])
    }

    const handleMapCapture = async () => {
        if (mapCaptureVerify === false) {
            setError(true)
            handleMapDrawRouteVerify()
            return
        }
        const mapCenter = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: { lat: 13.0827, lng: 80.2707 },
        });

        // Add markers to the static map URL
        const markers = [];

        // Sort waypoints based on the label
        const sortedWaypoints = wayTrips.slice().sort((a, b) => {
            const orderA = a?.order || 0;
            const orderB = b?.order || 0;
            const labelA = a?.label || '';
            const labelB = b?.label || '';

            return orderA - orderB || labelA.localeCompare(labelB);
        });

        // Add the start marker
        if (startLatitude && startLongitude) {
            markers.push(`markers=color:red%7Clabel:A%7C${startLatitude},${startLongitude}`);
        }

        let waypointLabelCharCode = 'B'.charCodeAt(0);
        for (let i = 0; i < wayTrips.length; i++) {
            const label = String.fromCharCode(waypointLabelCharCode++);  // "B", "C", "D", etc.
            const waypointLat = wayLatitude[i];  // Assuming latitude for waypoints is stored here
            const waypointLng = wayLongitude[i];  // Assuming longitude for waypoints is stored here

            if (label && waypointLat && waypointLng) {
                markers.push(`markers=color:red%7Clabel:${label}%7C${waypointLat},${waypointLng}`);
            }
        }

        // Add the end marker with the next letter after the last waypoint
        if (endLatitude && endLongitude) {
            const nextEndLabel = String.fromCharCode(waypointLabelCharCode); // Next letter after the last waypoint
            markers.push(`markers=color:red%7Clabel:${nextEndLabel}%7C${endLatitude},${endLongitude}`);
        }

        const directionsService = new window.google.maps.DirectionsService();
        if (startLatitude && endLatitude) {
            const startLocation = new window.google.maps.LatLng(startLatitude, startLongitude);
            const endLocation = new window.google.maps.LatLng(endLatitude, endLongitude);
            const waypoints = wayLatitude.map((lat, index) => ({
                location: new window.google.maps.LatLng(lat, wayLongitude[index]),
                stopover: true,
            }));
console.log('start',startLatitude,startLongitude,'end',endLatitude,endLongitude,'way',wayLatitude,wayLongitude);

            directionsService.route({
                origin: startLocation,
                destination: endLocation,
                waypoints: waypoints,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, async (response, status) => {
                if (status === 'OK') {
                    const routePolyline = response.routes[0].overview_polyline;

                    // Set up bounds and fit map to bounds
                    const allPositions = [startLocation, endLocation, ...waypoints.map(waypoint => waypoint.location)];
                    const bounds = new window.google.maps.LatLngBounds();
                    allPositions.forEach(position => bounds.extend(position));
                    mapCenter.fitBounds(bounds);

                    const zoom = calculateZoomLevel(bounds);
                    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.getCenter().lat()},${mapCenter.getCenter().lng()}&zoom=${zoom}&size=800x500&dpi=720`;
                    const pathEncoded = encodeURIComponent(`enc:${routePolyline}`);
                    const pathParam = `path=${pathEncoded}`;
                    const apiKey = 'AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk&libraries=places';

                    async function urlToBlob(url) {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        return blob;
                    }
                    const a = markers.join('&')
                    const finalStaticMapUrl = `${staticMapUrl}&${markers.join('&')}&${pathParam}&key=${apiKey}`;
                    console.log(markers.join('&'),a,markers,'nandhakalai');
                    
                    const staticMapBlob = await urlToBlob(finalStaticMapUrl);
                    // const tripid = localStorage.getItem('selectedTripid');
                    const formDataUpload = new FormData();
                    formDataUpload.append('file', new File([staticMapBlob], 'static_map.png'));
                    formDataUpload.append('tripid', tripid);
                    setMapCaptureVerify(false)
                    handleSuccessCapture()

                    try {
                        const response = await axios.post(`${apiUrl}/mapuploads`, formDataUpload, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Accept': 'image/png',
                            },
                        });
                        console.log('Uploaded file details', response.data);
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }
                } else {
                    console.error('Directions request failed due to ' + status);
                }
            });
        }
    };
    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const submitPopup = (latLng) => {
        // Implement your logic for displaying a popup
        console.log("Mappppppppppppppp", latLng);
    };
    const handleSelect = async (address) => {
        const geocoder = new window.google.maps.Geocoder();

        try {
            const results = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === 'OK' && results && results.length > 0) {
                        resolve(results);
                    } else {
                        reject(new Error(`Geocode failed: ${status}`)); // Include status in error
                    }
                });
            });

            if (results[0].geometry && results[0].geometry.location) {
                const latLng = results[0].geometry.location;
                console.log(latLng, results, 'Location found'); // Better log message

                if (mapInstance) {
                    mapInstance.setCenter(latLng);
                    mapInstance.setZoom(14);
                    submitPopup(latLng);
                } else {
                    console.log("Map instance not available");
                }
            }
        } catch (error) {
            console.error("Error occurred in handleSelect:", error.message);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly",padding:"10px" }}>
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
                            className="search-input"
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
            
            <div style={{ display: 'flex', gap: "20px", padding: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>Trip Id :<span>{tripid}</span> </label>
                <label style={{ fontWeight: 'bold' }}>Start Date : <span>{startdate}</span></label>
                <label style={{ fontWeight: 'bold' }}>Close Date : <span>{closedate}</span></label>
                <label style={{ fontWeight: 'bold' }}>Start Time : <span>{starttime}</span></label>
                <label style={{ fontWeight: 'bold' }}>Close Time : <span>{closetime}</span> </label>
            </div>
            <div id="map" style={{ height: "500px", width: "100%" }}></div>
            <div style={{ position: "relative" }}>
                <div className="buttons-div">
                    <button onClick={handleMapDraw} className="draw-route">Draw Route</button>
                    <button onClick={() => handleMapCapture()} className="Capture-View" >Capture View</button>
                </div>
                <div style={{ position: "absolute", top: "3px", left: "40%" }}>
                    {success ? <p style={{ display: "flex", justifyContent: "center", color: '#347928', fontSize: "22px", fontWeight: 600 }}>Successfully Captured....</p> :
                        ""}

                </div>
                <div style={{ position: "absolute", top: "3px", left: "40%" }}>
                    {error ? <p style={{ display: "flex", justifyContent: "center", color: 'red', fontSize: "22px", fontWeight: 600 }}>Please Draw The Route....</p> :
                        ""}

                </div>
            </div>


        </div>
    );
};

export default EditMapComponent;
