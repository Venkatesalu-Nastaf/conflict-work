/* global google */

import axios from 'axios';
import { APIURL } from "../../../url";

let map;
let directionsService;
let directionsRenderer;
let markersMap = {}; // Dictionary to keep track of markers by their labels
let startMarker;
let endMarker;
let searchBox;
let popup;
let waypoints = [];
let latitude = [];
let longitude = [];
let allLatitudeValues = [];
let allLongitudeValues = [];
let startPlaceName;
let endPlaceName;
let wayPlaceName = [];
let startLatitude;
let startLongitude;
let endLatitude;
let endLongitude;
let wayLatitude;
let wayLongitude
let wayPointLatitude;
let wayPointLongitude;
let wayDate = [];
let wayTime = [];
let Alpha;
let mapDetails = [];
let editmode;
const apiUrl = APIURL;
let markerLabel;


// function updateMapPoints(mapdet){
//     console.log(mapdet,'map234');
    
//     startLatitude = mapdet?.startLatitude
//     startLongitude = mapdet?.startLongitude
//     endLatitude = mapdet?.endLatitude
//     endLongitude = mapdet?.endLongitude
//     wayLatitude = mapdet?.wayLatitude
//     wayLongitude = mapdet?.wayLongitude
// }

function initMap(lat) {    
    const allLatitudeValues = [];
    const allLongitudeValues = [];
    console.log(lat, 'allvalues');
    const lastPointrow = lat?.row;
    const endpoint = lastPointrow?.map(li => li?.Location_Alpha)
    const lastPoint = endpoint?.includes('C');

    console.log(endpoint, lastPoint, 'alphalast');

    const latitudevalue = lat?.lat;
    const longitudevalue = lat?.lng;
    editmode = lat?.editMode
    const wayTrips = lat?.row?.filter(trip => trip.trip_type === "waypoint")
    wayDate = wayTrips?.map(li => li.date)
    wayTime = wayTrips?.map(li => li.time)
    wayPointLatitude = wayTrips?.map(li => li.Latitude)
    wayPointLongitude = wayTrips?.map(li => li.Longitude)
    console.log(wayPointLatitude, wayPointLongitude, wayTrips, wayDate, 'allway');

    startLatitude = lat?.startLatitude
    startLongitude = lat?.startLongitude
    startPlaceName = lat?.startPlaceName
    endPlaceName = lat?.endPlaceName
    wayPlaceName = lat?.wayPlaceName
    endLatitude = lat?.endLatitude
    endLongitude = lat?.endLongitude
    wayLatitude = lat?.wayLatitude
    wayLongitude = lat?.wayLongitude
    // if (latitudevalue !== undefined && longitudevalue !== undefined) {
    //     const latArray = latitudevalue?.toString().split(',').map(item => item.trim());
    //     const lngArray = longitudevalue?.toString().split(',').map(item => item.trim());

    //     allLatitudeValues?.push(...latArray);
    //     allLongitudeValues?.push(...lngArray);
    // }

    // console.log(allLatitudeValues, allLongitudeValues, 'latitude and longitude arrays');

    try {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: 13.0827, lng: 80.2707 },
        });
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        map.addListener('click', (event) => {
            handleMapClick(event.latLng);
        });
        const input = document.getElementById('pac-input');
        searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards the current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener('places_changed', function () {
            const places = searchBox.getPlaces();
            if (places.length === 0) {
                return;
            }
            const bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log('Returned place contains no geometry');
                    return;
                }
                createMarker(place.geometry.location, place.name);
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });

            map.fitBounds(bounds);
        });
        // Create a new marker using the first latitude and longitude values
        if (startLatitude && startLongitude) {
            const markerA = createMarker(
                new google.maps.LatLng(startLatitude, startLongitude),
                "A",
                lat?.startingDate || '',
                lat?.startingTime || '',
                'start',
                startPlaceName,
                startLatitude,
                startLongitude,
            );

            google.maps.event.addListener(markerA, 'click', function () {
                Alpha = "A"
                console.log("Marker A clicked, showing popup.");

            });
        }

        // Marker B (End)
 
        const infoWindow = new google.maps.InfoWindow();
console.log(wayPointLatitude,wayPointLongitude,'00000');

        // Marker C (Waypoint)
        if (wayPointLatitude && wayPointLongitude && wayPointLatitude.length === wayPointLongitude.length) {
            wayPointLatitude?.map((latStr, index) => {
                const lonStr = wayPointLongitude[index];

                // Convert latitude and longitude from strings to numbers
                const latitude = parseFloat(latStr);
                const longitude = parseFloat(lonStr);
console.log(latitude,longitude,'00000111111111');

                const wayDates = wayDate[index] || ''; // Assuming wayDate is an array
                const wayTimes = wayTime[index] || ''; // Assuming wayTime is an array
                const placeName = wayPlaceName || 'Unnamed Location'; // Assuming wayPlaceName is an array or fallback to a default
                console.log(wayDate, wayTime, placeName, lonStr, index, wayDate, 'alphawaypoints');

                // Generate alphabet for marker label based on index
                markerLabel = String.fromCharCode(66 + index); // 65 is the char code for 'A'

                console.log(`Rendering marker ${markerLabel} for Latitude: ${latitude}, Longitude: ${longitude}`);

                // Create marker for each latitude and longitude pair, with incrementing alphabet labels
                const markerB = createMarker(
                    new google.maps.LatLng(latitude, longitude),
                    markerLabel, // Alphabet label
                    wayDates,
                    wayTimes,
                    'waypoint',
                    placeName,
                    latitude,
                    longitude
                );

                // Add event listener for marker click
                google.maps.event.addListener(markerB, 'click', function () {
                    console.log(`Marker ${markerLabel} at Latitude: ${latitude}, Longitude: ${longitude} clicked, showing popup.`);
                });
            });
        } 
        
        if (endLatitude && endLongitude) {
            // const markerB = createMarker(new google.maps.LatLng(endLatitude, endLongitude), "B");
            // google.maps.event.addListener(markerB, 'click', function () {
            //     infoWindow.setContent(`End Location (B)`);
            //     infoWindow.open(map, markerB);
            // });
            const markerE = createMarker(
                new google.maps.LatLng(endLatitude, endLongitude),
                'Z',
                lat?.endingDate || '',
                lat?.endingTime || '',
                'end',
                endPlaceName,
                endLatitude,
                endLongitude,
            );

            google.maps.event.addListener(markerE, 'click', function () {
                Alpha = "E"
                console.log("Marker C clicked, showing popup.");

            });
        }else {
            console.error("Mismatch in the length of wayPointLatitude and wayPointLongitude arrays.");
        }




        // if (wayLatitude && wayLongitude) {

        //     // google.maps.event.addListener(markerB, 'click', function () {
        //     //     infoWindow.setContent(`Waypoint (B) - Date: ${markerData.date}, Time: ${markerData.time}`);
        //     //     infoWindow.open(map, markerB);
        //     // });
        //     const markerB = createMarker(
        //         new google.maps.LatLng(wayLatitude, wayLongitude), 
        //         "B", 
        //         lat?.wayDate || '', 
        //         lat?.wayTime || '', 
        //         'waypoint', 
        //         wayPlaceName,
        //         wayLatitude,
        //         wayLongitude
        //     );
        //     google.maps.event.addListener(markerB, 'click', function () {
        //         console.log("Marker C clicked, showing popup.");

        //     });
        // }
        window.map = map;
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}



function submitMapPopup() {
    if (editmode === "editMode") {
        const position = popup.getPosition();
        const latitude = position.lat();
        const longitude = position.lng();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const placeName = document.getElementById('placeName')?.value;
        const tripTypeElement = document.getElementById('tripType');
        const tripid = localStorage.getItem('selectedTripid');
        const lat = document.getElementById('lat')?.value || startLatitude || endLatitude || wayLatitude;
        const long = document.getElementById('lng')?.value || startLongitude || endLongitude || wayLongitude;
        // const latitude = parseFloat(lat) || latitude1
        // const longitude = parseFloat(long) || longitude1
        let alpha;


        if (!date || !time || !tripTypeElement) {
            alert('Please fill in all required fields.');
            return;
        }

        const selectedTripType = tripTypeElement.value;
        if (selectedTripType === "start") {
            alpha = "A"
        }
        if (selectedTripType === "waypoint") {
            alpha = "B"
        }
        if (selectedTripType === "end") {
            alpha = "C"
        }
        console.log(date, time, selectedTripType, placeName, tripid, 'alpha', latitude, longitude, alpha, editmode, typeof (latitude));
        // gmappost-submitForm
        fetch(`${apiUrl}/gmappost-submitForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, time, tripType: selectedTripType, placeName, tripid, latitude, longitude, alpha }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Server response:', data);
                // Handle the response as needed
            })
            .catch(error => console.error('Error:', error));
        // fetch(`${apiUrl}/gmap-submitForm`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ date, time, tripType: selectedTripType, placeName, tripid, latitude, longitude }),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Server response:', data);
        //         // Handle the response as needed
        //     })
        //     .catch(error => console.error('Error:', error));
        console.log(waypoints, wayPlaceName, selectedTripType, 'waypoints');

        popup.close();
        if (selectedTripType === 'start') {
            startMarker = createMarker(popup.getPosition(), 'A', date, time, selectedTripType, placeName);
        } else if (selectedTripType === 'end') {
            if (waypoints.length > 0 || wayPlaceName !== "") {
                const lastWaypointLabel = waypoints[waypoints.length - 1]?.label;
                const nextEndLabel = getNextAlphabeticLetter(lastWaypointLabel);
                endMarker = createMarker(popup.getPosition(), nextEndLabel, date, time, selectedTripType, placeName);
                document.getElementById('end').value = placeName;
                console.log(placeName, nextEndLabel, lastWaypointLabel, 'wayp1234');

                calculateAndDisplayRoutes(directionsService, directionsRenderer);
            } else {
                endMarker = createMarker(popup.getPosition(), 'B', date, time, selectedTripType, placeName);
                document.getElementById('end').value = placeName;
                calculateAndDisplayRoutes(directionsService, directionsRenderer);
            }
        } else if (selectedTripType === 'waypoint') {
            const waypointLabel = getNextWaypointLabels(markerLabel) || getNextWaypointLabel();
            markerLabel=waypointLabel
            console.log(waypointLabel,'wayss');
            
            const waypointMarker = createMarker(popup.getPosition(), waypointLabel, date, time, selectedTripType, placeName);
            waypoints.push(waypointMarker);
            if (startMarker && endMarker) {
                calculateAndDisplayRoutes(directionsService, directionsRenderer);
            }
        }
    }
    else {

        const position = popup.getPosition();
        const latitude1 = position.lat();
        const longitude1 = position.lng();
        const date = document.getElementById('date')?.value;
        const time = document.getElementById('time')?.value;
        const placeName = document.getElementById('placeName')?.value;
        const tripTypeElement = document.getElementById('tripType');
        const tripid = localStorage.getItem('selectedTripid');
        const lat = document.getElementById('lat')?.value || startLatitude || endLatitude || wayLatitude;
        const long = document.getElementById('lng')?.value || startLongitude || endLongitude || wayLongitude;
        const latitude = parseFloat(lat) || latitude1
        const longitude = parseFloat(long) || longitude1
        let alpha;


        if (!date || !time || !tripTypeElement) {
            alert('Please fill in all required fields.');
            return;
        }

        const selectedTripType = tripTypeElement.value;
        if (selectedTripType === "start") {
            alpha = "A"
        }
        if (selectedTripType === "waypoint") {
            alpha = "B"
        }
        if (selectedTripType === "end") {
            alpha = "C"
        }
        console.log(date, time, selectedTripType, placeName, tripid, 'alpha', lat, long, latitude, longitude, latitude1, longitude1, alpha);
        // gmappost-submitForm
        fetch(`${apiUrl}/gmappost-submitForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, time, tripType: selectedTripType, placeName, tripid, latitude, longitude, alpha }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Server response:', data);
                // Handle the response as needed
            })
            .catch(error => console.error('Error:', error));
        // fetch(`${apiUrl}/gmap-submitForm`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ date, time, tripType: selectedTripType, placeName, tripid, latitude, longitude }),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Server response:', data);
        //         // Handle the response as needed
        //     })
        //     .catch(error => console.error('Error:', error));
        console.log(waypoints, wayPlaceName, selectedTripType, 'waypoints');

        popup.close();
        if (selectedTripType === 'start') {
            startMarker = createMarker(popup.getPosition(), 'A', date, time, selectedTripType, placeName);
        } else if (selectedTripType === 'end') {
            if (waypoints.length > 0 || wayPlaceName !== "") {
                const lastWaypointLabel = waypoints[waypoints.length - 1]?.label;
                const nextEndLabel = getNextAlphabeticLetter(lastWaypointLabel);
                endMarker = createMarker(popup.getPosition(), nextEndLabel, date, time, selectedTripType, placeName);
                document.getElementById('end').value = placeName;
                console.log(placeName, nextEndLabel, lastWaypointLabel, 'wayp1234');

                calculateAndDisplayRoute(directionsService, directionsRenderer);
            } else {
                endMarker = createMarker(popup.getPosition(), 'B', date, time, selectedTripType, placeName);
                document.getElementById('end').value = placeName;
                calculateAndDisplayRoute(directionsService, directionsRenderer);
            }
        } else if (selectedTripType === 'waypoint') {
            const waypointLabel = getNextWaypointLabel();
            const waypointMarker = createMarker(popup.getPosition(), waypointLabel, date, time, selectedTripType, placeName);
            waypoints.push(waypointMarker);
            if (startMarker && endMarker) {
                calculateAndDisplayRoute(directionsService, directionsRenderer);
            }
        }
    }
}


function getNextAlphabeticLetter(currentLetter) {
    return String.fromCharCode(currentLetter?.charCodeAt(0) + 1);
}
function getNextWaypointLabel() {
    const lastWaypointLabel = waypoints.length > 0 ? waypoints[waypoints.length - 1].label : 'A';
    const nextCharCode = lastWaypointLabel.charCodeAt(0) + 1;
    return String.fromCharCode(nextCharCode);

}
function getNextWaypointLabels(currentLetter) {
    // const lastWaypointLabel = waypoints.length > 0 ? waypoints[waypoints.length - 1].label : 'A';
    // const nextCharCode = lastWaypointLabel.charCodeAt(0) + 1;
    // return String.fromCharCode(nextCharCode);
        return String.fromCharCode(currentLetter?.charCodeAt(0) + 1);

}
function handleMapClick(latLng) {

    const geocoder = new google.maps.Geocoder();
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" value='' required /><br/>
        <label for="time">Time:</label>
        <input type="time" id="time" name="time" value='' required /><br/>
        <label for="tripType">Trip Type:</label>
        <select id="tripType" name="tripType" value=''>
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="waypoint">Waypoint</option>
        </select><br/>
        <input type="hidden" id="placeName" name="placeName" value="" disabled />
         <input type="hidden" id="lat" name="lat" value="${latLng.lat()}" />
        <input type="hidden" id="lng" name="lng" value="${latLng.lng()}" />
        <button id="submitButton">Submit</button>
    `;

    popup = new google.maps.InfoWindow({
        content: popupContent,
        position: latLng,
    });
    popup.open(map);


    geocoder.geocode({ location: latLng }, (results, status) => {
        console.log('Geocoding Results:', results);
        console.log('Geocoding Status:', status);

        if (status === 'OK' && results[0]) {
            const placeName = results[0].formatted_address;
            const placeNameElement = document.getElementById('placeName');
            if (placeNameElement) {
                placeNameElement.value = placeName;
            } else {
                console.error("Element with ID 'placeName' not found");
            }
            const submitButton = document.getElementById('submitButton');
            if (submitButton) {
                submitButton.addEventListener('click', () => {
                    submitMapPopup();
                });
            } else {
                console.error("Element with ID 'submitButton' not found");
            }
        }
    });
}


// function createNewMarker(){

//     const lat = allLatitudeValues[0]
//     const lng = allLongitudeValues[0]
//     const latLng = new google.maps.LatLng(lat, lng);
// console.log(latLng,'lat123','2222');

//     popup = new google.maps.InfoWindow({
//         // content: popupContent,
//         position: latLng,
//     });
//     popup.open(map);
// }
console.log(allLatitudeValues, allLongitudeValues, 'lat3333');

// Edit Map Function to draw the way
function handleEditMapPoints() {
    console.log('venkat');
    const a = popup?.getPosition()
    console.log(a, 'venkat2203');

    calculateAndDisplayRoutes(directionsService, directionsRenderer);


}


// Modify createMarker to set popup.marker
function createMarker(position, label, date = '', time = '', tripType = '', placeName = '') {
    console.log(position, 'latpos');

    if (markersMap[label]) {
        markersMap[label].setMap(null); // Remove old marker
    }

    const marker = new google.maps.Marker({
        position: position,
        map: map,
        label: label,
        title: `${label}: ${placeName} (${date} ${time})`,
    });

    // Store additional data in the marker
    marker.data = {
        date: date,
        time: time,
        tripType: tripType,
        placeName: placeName
    };
    console.log(marker.data, 'marker77');

    markersMap[label] = marker; // Add new marker to the dictionary

    // Add a click event listener to open the popup
    marker.addListener('click', () => {
        const { date, time, tripType, placeName } = marker.data;
        console.log(date, time, tripType, placeName, 'marker7788');

        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" value="${date}" required /><br/>
            <label for="time">Time:</label>
            <input type="time" id="time" name="time" value="${time}" required /><br/>
            <label for="tripType">Trip Type:</label>
            <select id="tripType" name="tripType">
                <option value="start" ${tripType === 'start' ? 'selected' : ''}>Start</option>
                <option value="end" ${tripType === 'end' ? 'selected' : ''}>End</option>
                <option value="waypoint" ${tripType === 'waypoint' ? 'selected' : ''}>Waypoint</option>
            </select><br/>
            <input type="hidden" id="placeName" name="placeName" value="${placeName}" />
            <button id="submitButton">Submit</button>
            <button id="DeleteButton">Delete</button>
        `;

        popup = new google.maps.InfoWindow({
            content: popupContent,
            position: position,
        });
        popup.marker = marker; // Store marker reference in popup
        popup.open(map);

        // const submitButton = document.getElementById('submitButton');


        const submitButton = popupContent.querySelector('#submitButton');

        if (submitButton) {

            submitButton.addEventListener('click', () => {
                submitMapPopup();
            });
        } else {
            console.error("Element with ID 'submitButton' not found in marker popup");
        }

        const deleteButton = popupContent.querySelector('#DeleteButton');

        if (deleteButton) {
            const position = popup.getPosition();
            const tripid = localStorage.getItem('selectedTripid');
            const latitudepoint = position.lat();
            const longitudepoint = position.lng();
            const latitude = latitudepoint.toString()
            const longitude = longitudepoint.toString()
            console.log(latitude, longitude, tripid, 'del Latitude and longitude');

            deleteButton.addEventListener('click', () => {
                marker.setMap(null); // Remove the marker from the map
                delete markersMap[label]; // Remove the marker from the markersMap

                // Check if the marker is a waypoint
                if (tripType === 'waypoint') {
                    waypoints = waypoints.filter(wp => wp.latitude !== latitude || wp.longitude !== longitude);
                    console.log('Updated waypoints:', waypoints); // Verify the waypoint is removed
                }
        
                // if (tripType === 'waypoint') {
                //     waypoints = waypoints.filter(wp => wp.label !== label); // Remove waypoint if applicable
                // }

                // Make the API call to delete the marker from the database
                fetch(`${apiUrl}/deleteMapPoint`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                        tripid: tripid  // Include the tripid for deletion
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message) {
                            console.log(data.message); // Log success message
                        } else {
                            console.log('Error:', data.error); // Log any errors
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting marker:', error);
                    });

                popup.close(); // Close the popup
            });
        }


    });



    return marker;
}


function clearMarkers() {
    if (startMarker) {
        startMarker.setMap(null);
    }
    if (endMarker) {
        endMarker.setMap(null);
    }
    for (const waypoint of waypoints) {
        console.log(waypoints,'editwayp');
        // waypoint.setMap(null);
    }
    // markersMap = {}; // Clear the markers map
}

function calculateAndDisplayRoutes(directionsService, directionsRenderer) {
    clearMarkers();

    // Assuming wayPointLatitude and wayPointLongitude are arrays of equal length
    const waypointsPositions = wayPointLatitude.map((lat, index) => ({
        location: new google.maps.LatLng(lat, wayPointLongitude[index]), // Use LatLng constructor for each waypoint
        stopover: true,
    }));

    if (startLatitude && startLongitude && endLatitude && endLongitude) {

        const startLocation = new google.maps.LatLng(startLatitude, startLongitude);
        const endLocation = new google.maps.LatLng(endLatitude, endLongitude);
        console.log(startLatitude,endLatitude,wayPointLatitude,'aaaaa');

        directionsService
            .route({
                origin: startLocation, // Use the LatLng object for origin
                destination: endLocation, // Use the LatLng object for destination
                waypoints: waypointsPositions, // Include waypoints created from latitude and longitude arrays
                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response) => {
                directionsRenderer.setDirections(response);
                console.log(response, 'resp');

            })
            .catch((e) => window.alert('Directions request failed due to ' + e));
    } else {
        window.alert('Start and end coordinates are required.');
    }
}



function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    clearMarkers();
    const waypointsPositions = waypoints.map((waypoint) => ({
        location: waypoint.getPosition(),
        stopover: true,
    }));

    const waypointsPosition = wayPointLatitude.map((lat, index) => ({
        location: new google.maps.LatLng(lat, wayPointLongitude[index]), // Use LatLng constructor for each waypoint
        stopover: true,
    }));
    if (startMarker && endMarker) {
        const startLocation = startMarker.getPosition();
        const endLocation = endMarker.getPosition();
        directionsService
            .route({
                origin: startLocation,
                destination: endLocation,
                waypoints: waypointsPositions || waypointsPosition,
                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response) => {
                directionsRenderer.setDirections(response);
            })
            .catch((e) => window.alert('Directions request failed due to ' + e));
    }
}

function generateEditStaticMap() {
    const mapCenter = map.getCenter().toJSON();

    // Sort waypoints based on their order and label, assuming order and label are attributes of each waypoint
    const sortedWaypoints = waypoints.slice().sort((a, b) => {
        return a.order - b.order || a.label.localeCompare(b.label);
    });

    // Add markers to the static map URL
    const markers = [];

    if (startLatitude && startLongitude) {
        markers.push(`markers=color:red%7Clabel:A%7C${startLatitude},${startLongitude}`);
    }

    if (endLatitude && endLongitude) {
        // Check if there are waypoints
        if (sortedWaypoints.length > 0) {
            // Use the last waypoint's label
            const lastWaypointLabel = sortedWaypoints[sortedWaypoints.length - 1].label;
            const nextEndLabel = String.fromCharCode(lastWaypointLabel.charCodeAt(0) + 1);
            markers.push(`markers=color:red%7Clabel:${nextEndLabel}%7C${endLatitude},${endLongitude}`);
        } else {
            // If no waypoints, use label 'B' for the end location
            markers.push(`markers=color:red%7Clabel:B%7C${endLatitude},${endLongitude}`);
        }
    }

    // Calculate route using Directions API
    const directionsService = new google.maps.DirectionsService();
    if (startLatitude && startLongitude && endLatitude && endLongitude) {
        const startLocation = new google.maps.LatLng(startLatitude, startLongitude);
        const endLocation = new google.maps.LatLng(endLatitude, endLongitude);

        // Create waypoints array using wayPointLatitude and wayPointLongitude
        const waypointsPositions = wayPointLatitude.map((lat, index) => ({
            location: new google.maps.LatLng(lat, wayPointLongitude[index]),
            stopover: true,
        }));

        directionsService.route({
            origin: startLocation,
            destination: endLocation,
            waypoints: waypointsPositions,
            travelMode: google.maps.TravelMode.DRIVING,
        }, async (response, status) => {
            if (status === 'OK') {
                // Extract polyline from Directions API response
                const routePolyline = response.routes[0].overview_polyline;

                // Add markers for waypoints to the static map URL
                waypointsPositions.forEach((waypoint, i) => {
                    const label = sortedWaypoints[i]?.label;
                    markers.push(`markers=color:red%7Clabel:${label}%7C${wayPointLatitude[i]},${wayPointLongitude[i]}`);
                });

                // Create an array of LatLng objects for all markers and route
                const allPositions = [startLocation, endLocation, ...waypointsPositions.map(waypoint => waypoint.location)];
                const bounds = new google.maps.LatLngBounds();
                // Extend the bounds for each position
                allPositions.forEach(position => bounds.extend(position));
                map.fitBounds(bounds);
                const zoom = calculateZoomLevel(bounds);

                // Generate static map URL
                const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=${zoom}&size=800x400&dpi=720`;
                const pathEncoded = encodeURIComponent(`enc:${routePolyline}`);
                const pathParam = `path=${pathEncoded}`;
                const apiKey = 'AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk&libraries=places';

                // Function to fetch and convert URL to Blob
                async function urlToBlob(url) {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return blob;
                }

                const finalStaticMapUrl = `${staticMapUrl}&${markers.join('&')}&${pathParam}&key=${apiKey}`;
                // Create a link element and trigger a download
                const staticMapBlob = await urlToBlob(finalStaticMapUrl);

                // Prepare and upload the file
                const tripid = localStorage.getItem('selectedTripid');
                const formDataUpload = new FormData();
                formDataUpload.append('file', new File([staticMapBlob], 'static_map.png'));
                formDataUpload.append('tripid', tripid);
                console.log(formDataUpload, 'formmap');

                try {
                    const response = await axios.post(`${apiUrl}/mapuploads`, formDataUpload, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'image/png',
                        },
                    });
                    console.log('Uploaded file details:', response.data);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });
    }
}


function generateStaticMap() {
    const mapCenter = map.getCenter().toJSON();
    // Sort waypoints based on the label
    const sortedWaypoints = waypoints.slice().sort((a, b) => {
        return a.order - b.order || a.label.localeCompare(b.label);
    });
    // Add markers to the static map URL
    const markers = [];
    if (startMarker) {
        markers.push(`markers=color:red%7Clabel:A%7C${startMarker.getPosition().lat()},${startMarker.getPosition().lng()}`);
    }
    if (endMarker) {
        // Check if there are waypoints
        if (waypoints.length > 0) {
            // If waypoints exist, use the last waypoint label
            const lastWaypointLabel = sortedWaypoints[sortedWaypoints.length - 1].label;
            const nextEndLabel = String.fromCharCode(lastWaypointLabel.charCodeAt(0) + 1);
            markers.push(`markers=color:red%7Clabel:${nextEndLabel}%7C${endMarker.getPosition().lat()},${endMarker.getPosition().lng()}`);
        } else {
            // If no waypoints, use 'B'
            markers.push(`markers=color:red%7Clabel:B%7C${endMarker.getPosition().lat()},${endMarker.getPosition().lng()}`);
        }
    }
    // Calculate route using Directions API
    const directionsService = new google.maps.DirectionsService();
    if (startMarker && endMarker) {
        const startLocation = startMarker.getPosition();
        const endLocation = endMarker.getPosition();
        const waypointsPositions = sortedWaypoints.map((waypoint) => ({
            location: waypoint.getPosition(),
            stopover: true,
        }));
        directionsService.route({
            origin: startLocation,
            destination: endLocation,
            waypoints: waypointsPositions,
            travelMode: google.maps.TravelMode.DRIVING,
        }, async (response, status) => {
            if (status === 'OK') {
                // Extract polylines from Directions API response
                const routePolyline = response.routes[0].overview_polyline;
                // Add markers for waypoints to the static map URL
                for (let i = 0; i < sortedWaypoints.length; i++) {
                    const label = sortedWaypoints[i].label;
                    markers.push(`markers=color:red%7Clabel:${label}%7C${sortedWaypoints[i].getPosition().lat()},${sortedWaypoints[i].getPosition().lng()}`);
                }
                // Create an array of LatLng objects for all markers and route
                const allPositions = [startLocation, endLocation, ...waypointsPositions.map(waypoint => waypoint.location)];
                const bounds = new google.maps.LatLngBounds();
                // Extend the bounds for each position
                allPositions.forEach(position => bounds.extend(position));
                // Fit the map to the bounds
                map.fitBounds(bounds);
                const zoom = calculateZoomLevel(bounds);
                const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=${zoom}&size=800x400&dpi=720`;
                // Add route path to the static map URL
                const pathEncoded = encodeURIComponent(`enc:${routePolyline}`);
                const pathParam = `path=${pathEncoded}`;
                // Add the API key to the static map URL (replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key)
                const apiKey = 'AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk&libraries=places';

                async function urlToBlob(url) {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return blob;
                }

                const finalStaticMapUrl = `${staticMapUrl}&${markers.join('&')}&${pathParam}&key=${apiKey}`;
                // Create a link element and trigger a download
                const staticMapBlob = await urlToBlob(finalStaticMapUrl);
                // Upload the file
                const tripid = localStorage.getItem('selectedTripid');
                const formDataUpload = new FormData();
                // formDataUpload.append('file', new File([await a.toBlob()], 'static_map.png'));
                formDataUpload.append('file', new File([staticMapBlob], 'static_map.png'));
                formDataUpload.append('tripid', tripid);
                console.log(formDataUpload, 'formmap');

                try {
                    const response = await axios.post(`${apiUrl}/mapuploads`, formDataUpload, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'image/png',
                        },
                    });
                    console.log('uploaded file details 2', response.data);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });
    }
}

// Function to calculate dynamic zoom level based on route bounds
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

window.initMap = initMap;
window.handleMapClick = handleMapClick;
window.createMarker = createMarker;
window.generateStaticMap = generateStaticMap;
window.generateEditStaticMap = generateEditStaticMap;
window.handleEditMapPoints = handleEditMapPoints;
// window.updateMapPoints = updateMapPoints;
