import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer, useJsApiLoader, Polygon, Polyline, Circle } from '@react-google-maps/api';
import axios from 'axios';
import "./EditMapComponent.css"
import { APIURL } from '../../../url';
import { Typography, IconButton } from '@mui/material';
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for dayjs
import Button from "@mui/material/Button";
import PlacesAutocomplete from 'react-places-autocomplete';
import startMarkerIcon from "./StartMarkerIcon.png"
import endMarkerIcon from "./endMarkerIcon.png";
import wayPointMarker from "./wayPointMarker.png"
const style2 = {
  position: 'absolute',
  top: '50%',
  height: 'fit-content',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const mapStyles = {
  height: "450px",
  width: "100%"
};

const EditMapCheckComponent = ({ tripid, starttime, startdate, closedate, closetime, tripGpsData, fullGpsData, allGpsData }) => {
  const [tripData, setTripData] = useState({
    start: null,
    end: null,
    waypoints: []
  });
  const mapRef = useRef(null);

  const [refresh, setRefresh] = useState(0);
  const [mapUpdate, setMapUpdate] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [wayRoutes, setWayRoutes] = useState([])
  const [clickedPoint, setClickedPoint] = useState(null); // To store clicked point coordinates
  const apiUrl = APIURL;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [placeName, setPlaceName] = useState(''); // To store place name
  const [directions, setDirections] = useState(null); // New state for directions
  const [mapCaptureVerify, setMapCaptureVerify] = useState(false);
  const [startLat, setStartLat] = useState()
  const [startRoutes, setStartRoutes] = useState([])
  const [endRoutes, setEndRoutes] = useState([])
  const [startLng, setStartLng] = useState()
  const [endLat, setEndLat] = useState()
  const [endLng, setEndLng] = useState()
  const [endLabel, setEndLabel] = useState('')
  const [wayDirection, setWayDirection] = useState([])
  const [address, setAddress] = useState('');
  const [mapInstance, setMapInstance] = useState(null);
  const [center, setCenter] = useState({ lat: 22.00, lng: 77.00 }); // India's initial center
  const [polygonPath, setPolygonPath] = useState([]);
  const [polylinePath, setPolylinePath] = useState([])
  const [markerPosition, setMarkerPosition] = useState(null); // Store single marker position
  const [removeButtonHide, setRemoveButtonHide] = useState(false);
  const [mapContent, setMapContent] = useState({
    tripid: '',
    time: dayjs().format('HH:mm'),
    date: startdate,
    place_name: '',
    Location_Alpha: '',
    trip_type: 'start',
    Latitude: '',
    Longitude: ''
  });
  const [polyLineWaypoints, setPolyLineWaypoints] = useState([]);
  const fitMapToBounds = () => {
    if (!startLat || !endLat) return;

    const bounds = new window.google.maps.LatLngBounds();

    // Add start and end points
    bounds.extend(new window.google.maps.LatLng(startLat, startLng));
    bounds.extend(new window.google.maps.LatLng(endLat, endLng));

    // Add waypoints if any
    wayRoutes.waypoints?.forEach(point => {
      bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
    });

    // Fit the map to the bounds
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds);
    }
  };
  useEffect(() => {
    fitMapToBounds();
  }, [startLat, endLat, wayRoutes]); // Recalculate whenever tripData changes

  const [roadPoints, setRoadPoints] = useState([]);

  const getSnappedPoints = async (polywaypoints) => {
    const apiKey = "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE";
    const maxPointsPerRequest = 100;
    let snappedPoints = [];

    const chunkArray = (array, size) => {
      const chunkedArr = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
      }
      return chunkedArr;
    };

    const waypointChunks = chunkArray(polywaypoints, maxPointsPerRequest);

    for (const chunk of waypointChunks) {
      const path = chunk.map((point) => `${point.lat},${point.lng}`).join("|");
      const url = `https://roads.googleapis.com/v1/snapToRoads?path=${path}&interpolate=true&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.snappedPoints) {
          const chunkSnappedPoints = data.snappedPoints.map((point) => ({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }));
          snappedPoints = [...snappedPoints, ...chunkSnappedPoints];
        }
      } catch (error) {
        console.log("Error fetching snapped points:", error);
      }
    }

    return snappedPoints.length > 0 ? snappedPoints : polywaypoints;
  };

  useEffect(() => {
    if (polyLineWaypoints.length > 1) {
      getSnappedPoints(polyLineWaypoints).then(setRoadPoints);
    }
  }, [polyLineWaypoints]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getGmapdataByTripId/${tripid}`);
        const data = response.data;

        // Filter for start, end, and waypoints
        let start = null;
        let end = null;
        const waypoints = [];
        const polywaypoints = [];
        data.forEach((item) => {

          if (item.trip_type === 'start') {
            start = {
              lat: parseFloat(item.Latitude),
              lng: parseFloat(item.Longitude),
              label: 'A',
              placeName: item.place_name,
              date: item.date,
              time: item.time,
              tripType: item.trip_type
            };
          }

          if (item.trip_type !== 'start' && item.trip_type !== 'end' && item.trip_type !== 'On_Going') {
            console.log(item.Latitude, 'item', item);

            waypoints.push({
              lat: parseFloat(item.Latitude),
              lng: parseFloat(item.Longitude),
              label: '',
              placeName: item.place_name,
              date: item.date,
              time: item.time,
              tripType: item.trip_type
            });
          }
          if (item) {
            console.log(item.Latitude, 'item', item.length);
            polywaypoints.push({
              lat: parseFloat(item.Latitude),
              lng: parseFloat(item.Longitude),
            })
            // waypoints.push({
            //   lat: parseFloat(item.Latitude),
            //   lng: parseFloat(item.Longitude),
            //   label: '',
            //   placeName: item.place_name,
            //   date: item.date,
            //   time: item.time,
            //   tripType: item.trip_type
            // });
          }

          if (item.trip_type === 'end') {
            console.log('endlat', item.Latitude, parseFloat(item.Latitude), Number(item.Latitude));

            end = {
              lat: parseFloat(item.Latitude),
              lng: parseFloat(item.Longitude),
              label: 'C',
              placeName: item.place_name,
              date: item.date,
              time: item.time,
              tripType: item.trip_type
            };
          }
        });

        waypoints.forEach((point, index) => {
          point.label = String.fromCharCode(66 + index);  // 'B' is 66 in ASCII
        });

        if (end) {
          end.label = String.fromCharCode(66 + waypoints.length); // The letter after the last waypoint
        }
        // if (initialWaypoints.length === 0) {
        //   // localStorage.setItem("pointscount",polywaypoints.length);
        //   setInitialWaypoints(polywaypoints);
        // }
        // if (localStorage.getItem("pointscount") === "0" || localStorage.getItem("pointscount") === null) {
        //   // if (localStorage.getItem("pointscount") === "0") {

        //   localStorage.setItem("pointscount", polywaypoints.length);
        // }
        setPolyLineWaypoints(polywaypoints)
        setWayRoutes(waypoints)
        setStartRoutes(start)
        setEndRoutes(end)
        setStartLat(start?.lat)
        setStartLng(start?.lng)
        setEndLat(end?.lat)
        setEndLng(end?.lng)
        setEndLabel(end?.label)

        setTripData({ start, end, waypoints });
      } catch (error) {
        console.log(error, 'Error fetching map data');
      }
    };
    fetchData();
  }, [tripid, mapUpdate, refresh]);

  const getPlaceName = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          console.log(results[0].formatted_address, 'payloadadr');
          setPlaceName(results[0].formatted_address); // Get the first result for place name
        } else {
          setPlaceName('No results found');
        }
      } else {
        setPlaceName('Geocoder failed due to: ' + status);
      }
    });
  };

  // Handle marker click to open modal and display clicked coordinates
  const handleMarkerClick = (point) => {
    console.log(point, "clickPoint");
    if (point) {
      const isMatching = allGpsData?.some(li => parseFloat(li.Latitude_loc) === point.lat);

      if (isMatching) {
        setRemoveButtonHide(true);
      } else {
        setRemoveButtonHide(false);
      }
    }


    setClickedPoint(point);
    setMapContent((prevContent) => ({
      ...prevContent,
      place_name: point.placeName,
      date: point.date,
      time: point.time,
      trip_type: point.tripType
    }));
    getPlaceName(point.lat, point.lng); // Fetch place name using Geocoding
    setPopupOpen(true);
  };

  const handleCloseMapPopUp = () => {
    setPopupOpen(false);
    setClickedPoint(null); // Reset clicked point
  };

  const submitMapPopUp = async () => {
    const updatedTripData = { ...tripData };
    let alpha = '';

    if (mapContent.trip_type === "start") {
      alpha = "A";
      updatedTripData.start = {
        ...updatedTripData.start,
        placeName: placeName,
        date: mapContent.date,
        time: mapContent.time,
        tripType: mapContent.trip_type
      };
    } else if (mapContent.trip_type === "waypoint") {
      alpha = "B";
      const waypointIndex = updatedTripData.waypoints.findIndex(point => point.lat === clickedPoint.lat && point.lng === clickedPoint.lng);
      if (waypointIndex !== -1) {
        updatedTripData.waypoints[waypointIndex] = {
          ...updatedTripData.waypoints[waypointIndex],
          placeName: placeName,
          date: mapContent.date,
          time: mapContent.time,
          tripType: mapContent.trip_type
        };
      }
    } else if (mapContent.trip_type === "end") {
      alpha = "C";
      updatedTripData.end = {
        ...updatedTripData.end,
        placeName: placeName,
        date: mapContent.date,
        time: mapContent.time,
        tripType: mapContent.trip_type
      };
    }

    // Update the trip data state
    setTripData(updatedTripData);

    // Send the updated trip data to the backend if needed
    const payload = {
      tripid: tripid,
      placeName: placeName,
      Location_Alpha: alpha,
      latitude: clickedPoint.lat,
      longitude: clickedPoint.lng,
      date: mapContent.date,
      time: mapContent.time,
      tripType: mapContent.trip_type,
    };
    console.log(payload, 'payload');

    // Send POST request to the backend
    try {
      const response = await axios.post(`${apiUrl}/gmappost-submitForm`, payload);
      console.log(response.data, 'response from backend');
      setMapUpdate(!mapUpdate);
      setPopupOpen(false);
      setMapContent({
        tripid: '',
        time: dayjs().format('HH:mm'),
        // date: dayjs().format('YYYY-MM-DD'),
        date: startdate,
        place_name: '',
        Location_Alpha: '',
        trip_type: 'start',
        Latitude: '',
        Longitude: ''
      })
      return true;
    } catch (error) {
      console.error('Error submitting map pop-up data:', error);
      return false;
    }
  };

  const onRemoveMarker = async () => {
    if (clickedPoint) {
      let updatedTripData = { ...tripData };

      // Check if it's the start marker, end marker, or a waypoint
      if (clickedPoint.tripType === 'start') {
        updatedTripData.start = null;
      } else if (clickedPoint.tripType === 'end') {
        updatedTripData.end = null;
      } else if (clickedPoint.tripType === 'waypoint') {
        updatedTripData.waypoints = updatedTripData.waypoints.filter(
          (point) => point.lat !== clickedPoint.lat || point.lng !== clickedPoint.lng
        );
      }

      setTripData(updatedTripData); // Update the state with the marker removed


      // Optional: Send a request to the backend to remove the marker from the database
      try {
        const response = await axios.delete(`${apiUrl}/deleteMapPoint`, {
          data: {
            latitude: clickedPoint.lat,
            longitude: clickedPoint.lng,
            tripid: tripid
          }
        });
        console.log(response.data, 'Marker removed from backend');
        setPopupOpen(false);
        setMapUpdate(!mapUpdate);
        setMapContent({
          tripid: '',
          time: dayjs().format('HH:mm'),
          date: dayjs().format('YYYY-MM-DD'),
          place_name: '',
          Location_Alpha: '',
          trip_type: 'start',
          Latitude: '',
          Longitude: ''
        })
      } catch (error) {
        console.error('Error removing marker:', error);
      }
    }
  };

  const handledatechange = (value) => {
    const formattedDate = dayjs(value).format('YYYY-MM-DD'); // Format the date
    setMapContent((prevState) => ({
      ...prevState,
      date: formattedDate // Update date field
    }));
  };

  const handletimeChange = (e) => {
    const { name, value } = e.target;

    setMapContent((prevState) => ({
      ...prevState,
      [name]: value // Dynamically update the field based on the input name
    }));
  };

  const handleChange = (value, name) => {

    setMapContent((prevState) => ({
      ...prevState,
      [name]: value // Dynamically update the field based on the input name
    }));
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCenter({ lat, lng }); // Update center to clicked location
    // Set clicked point with lat and lng
    setClickedPoint({ lat, lng });
    getPlaceName(lat, lng); // Fetch place name using Geocoding
    setPolygonPath([])
    setMarkerPosition(null)
    setPolylinePath([])

    setPopupOpen(true);
  };

  const handleMapDraw = async () => {
    const directionsService = new window.google.maps.DirectionsService();
    const { start, end, waypoints } = tripData;

    if (startLat === "" || startLat === undefined) {
      setTimeout(() => {
        setErrorMessage(true);

        setTimeout(() => {
          setErrorMessage(false);
        }, 1000);

      }, 1000);
      return;
    }
    if (endLat === "" || endLat === undefined) {
      setTimeout(() => {
        setErrorMessage(true);

        setTimeout(() => {
          setErrorMessage(false);
        }, 1000);

      }, 1000);
      return;
    }

    try {
      const directionsResult = await directionsService.route({
        origin: new window.google.maps.LatLng(startLat, startLng),
        destination: new window.google.maps.LatLng(endLat, endLng),
        waypoints: waypoints?.map(point => ({ location: point, stopover: true })) || [],
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      // origin: new window.google.maps.LatLng(startLatitude, startLongitude),
      // destination: new window.google.maps.LatLng(endLatitude, endLongitude),
      // waypoints: waypoints,
      // travelMode: window.google.maps.TravelMode.DRIVING,
      const newWaypoints = directionsResult.routes[0].legs[0].via_waypoints.map(point => {
        return {
          lat: point.location.lat(),
          lng: point.location.lng(),
        };
      });

      // setTripData((prevTripData) => ({
      //   ...prevTripData,

      //   // waypoints: newWaypoints 
      // }));
      // setStartLat()
      // setStartLng()
      // setEndLat()
      // setEndLng()
      // setWayRoutes([])
      setWayDirection([])
      setDirections(directionsResult);
      setMapCaptureVerify(true)

    } catch (error) {
      console.log('Error fetching directions:', error);
    }


  };

  // const handleMapDraw = async () => {
  //   const directionsService = new window.google.maps.DirectionsService();
  //   const { start, end, waypoints } = tripData;

  //   if (!startLat || !endLat) {
  //     setTimeout(() => {
  //       setErrorMessage(true);
  //       setTimeout(() => setErrorMessage(false), 1000);
  //     }, 1000);
  //     return;
  //   }

  //   try {
  //     const directionsResult = await directionsService.route({
  //       origin: new window.google.maps.LatLng(startLat, startLng),
  //       destination: new window.google.maps.LatLng(endLat, endLng),
  //       waypoints: waypoints?.map(point => ({ location: point, stopover: true })) || [],
  //       travelMode: window.google.maps.TravelMode.DRIVING,
  //       // provideRouteAlternatives: false,
  //     });

  //     // Suppress ALL markers (Google’s default ones and custom ones)
  //     const directionsRenderer = new window.google.maps.DirectionsRenderer({
  //       suppressMarkers: true, // This removes Google's default markers
  //     });
  //     directionsRenderer.setDirections(directionsResult);

  //     setDirections(directionsResult);
  //     setMapCaptureVerify(true);

  //   } catch (error) {
  //     console.log("Error fetching directions:", error);
  //   }
  // };


  const handleMapDrawRouteVerify = () => {

    setTimeout(() => {
      setError(false)
    }, [1500])
  }

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

    // Check if bounds are valid
    if (!bounds || typeof bounds.getNorthEast !== 'function' || typeof bounds.getSouthWest !== 'function') {
      throw new Error('Invalid bounds provided.');
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
  const handleSuccessCapture = () => {

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, [1500])
  }

  const handleNoEditCapture = async () => {
    console.log("Start:", startLat, startLng, "End:", endLat, endLng, "Waypoints:", polyLineWaypoints);

    if (!startLat || !startLng || !endLat || !endLng || !polyLineWaypoints.length) {
      console.log("Missing required data for polyline capture");
      return;
    }

    // Ensure Google Maps API is loaded
    if (!window.google || !window.google.maps || !window.google.maps.geometry) {
      console.log("Google Maps API is not loaded");
      return;
    }

    // Prepare Polyline Path (Including Start, End, and Waypoints)
    const polylinePoints = [
      { lat: startLat, lng: startLng }, // Start point
      ...polyLineWaypoints, // Intermediate waypoints
      { lat: endLat, lng: endLng }, // End point
    ];

    // Encode polyline path using Google Maps API
    const encodePath = window.google.maps.geometry.encoding.encodePath(
      polylinePoints.map((point) => new window.google.maps.LatLng(point.lat, point.lng))
    );

    console.log("Encoded Polyline:", encodePath);

    // Generate markers dynamically
    let markerLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Label set
    let markersArray = [];

    // Add start marker
    markersArray.push(`markers=color:0x00FF00%7Clabel:%7C${startLat},${startLng}`);
    // Add waypoint markers (starting from B) ------commented waypoint markers
    // wayRoutes.forEach((waypoint, index) => {
    //   let label = markerLabels[index + 1]; // Start from B
    //   markersArray.push(`markers=color:red%7Clabel:${label}%7C${waypoint.lat},${waypoint.lng}`);
    // });

    // Add end marker (next label after last waypoint)
    // let endLabel = markerLabels[wayRoutes.length + 1]; // Next letter
    let endLabel = "B" // Next letter
    markersArray.push(`markers=color:red%7Clabel:%7C${endLat},${endLng}`);

    // Join markers
    const markers = markersArray.join("&");

    // Construct Static Map URL
    const staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=800x500&dpi=720";
    const pathParam = `path=enc:${encodeURIComponent(encodePath)}`;
    const apiKey = "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE";

    const finalStaticMapUrl = `${staticMapUrl}&${markers}&${pathParam}&key=${apiKey}`;

    console.log("Final Static Map URL:", finalStaticMapUrl);

    // Convert URL to Image Blob
    async function urlToBlob(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        return response.blob();
      } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
      }
    }

    try {
      const staticMapBlob = await urlToBlob(finalStaticMapUrl);
      const formDataUpload = new FormData();
      formDataUpload.append("file", new File([staticMapBlob], "static_map.png"));
      formDataUpload.append("tripid", tripid);

      const response = await axios.post(`${apiUrl}/mapuploads`, formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "image/png",
        },
      });

      console.log("Uploaded file details", response.data);
      localStorage.setItem("MapBoxClose", 1);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };



  const handleMapCapture = async () => {
    if (mapCaptureVerify === false) {
      setError(true);
      handleMapDrawRouteVerify();
      return;
    }

    const mapCenter = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: 13.0827, lng: 80.2707 },
    });

    const markers = [];
    let waypointLabelCharCode = "B".charCodeAt(0); // Start with 'B' for waypoints

    // Sort waypoints based on order or label
    const sortedWaypoints = wayRoutes
      .slice()
      .sort((a, b) => (a?.order || 0) - (b?.order || 0));

    // Add the start marker as 'A'
    if (startLat && startLng) {
      markers.push(`markers=color:0x00FF00%7Clabel:%7C${startLat},${startLng}`);
    }

    // Add waypoints with incrementing alphabet labels
    const waypoints = sortedWaypoints.map((wayRoute) => {
      const label = String.fromCharCode(waypointLabelCharCode++); // "B", "C", "D"...
      // markers.push(`markers=color:red%7Clabel:${label}%7C${wayRoute.lat},${wayRoute.lng}`);
      return {
        location: new window.google.maps.LatLng(wayRoute.lat, wayRoute.lng),
        stopover: true,
      };
    });

    // Assign next letter to the end marker
    if (endLat && endLng) {
      // const endLabel = String.fromCharCode(waypointLabelCharCode); // Next letter after last waypoint
      const endLabel = "B"; // Next letter after last waypoint
      markers.push(`markers=color:red%7Clabel:%7C${endLat},${endLng}`);
    }

    const directionsService = new window.google.maps.DirectionsService();

    if (startLat && endLat) {
      const startLocation = new window.google.maps.LatLng(startLat, startLng);
      const endLocation = new window.google.maps.LatLng(endLat, endLng);

      directionsService.route(
        {
          origin: startLocation,
          destination: endLocation,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        async (response, status) => {
          if (status === "OK") {
            const routePolyline = response.routes[0].overview_polyline;
            const allPositions = [startLocation, endLocation, ...waypoints.map((w) => w.location)];
            const bounds = new window.google.maps.LatLngBounds();
            allPositions.forEach((pos) => bounds.extend(pos));
            mapCenter.fitBounds(bounds);

            const zoom = calculateZoomLevel(bounds);
            const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.getCenter().lat()},${mapCenter.getCenter().lng()}&zoom=${zoom}&size=800x500&dpi=720`;
            const pathEncoded = encodeURIComponent(`enc:${routePolyline}`);
            const pathParam = `path=${pathEncoded}`;
            const apiKey = "AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk&libraries=places";

            async function urlToBlob(url) {
              const response = await fetch(url);
              return response.blob();
            }

            const finalStaticMapUrl = `${staticMapUrl}&${markers.join("&")}&${pathParam}&key=${apiKey}`;
            const staticMapBlob = await urlToBlob(finalStaticMapUrl);

            const formDataUpload = new FormData();
            formDataUpload.append("file", new File([staticMapBlob], "static_map.png"));
            formDataUpload.append("tripid", tripid);
            setMapCaptureVerify(false);
            handleSuccessCapture();

            try {
              const response = await axios.post(`${apiUrl}/mapuploads`, formDataUpload, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "image/png",
                },
              });
              console.log("Uploaded file details", response.data);
              localStorage.setItem("MapBoxClose", 1);
            } catch (error) {
              console.log("Error uploading file:", error);
            }
          } else {
            console.log("Directions request failed due to " + status);
          }
        }
      );
    }
  };


  // const handleMapCapture = async () => {
  //   if (mapCaptureVerify === false) {
  //     setError(true)
  //     handleMapDrawRouteVerify()
  //     return
  //   }
  //   const mapCenter = new window.google.maps.Map(document.getElementById('map'), {
  //     zoom: 15,
  //     center: { lat: 13.0827, lng: 80.2707 },
  //   });

  //   // Add markers to the static map URL
  //   const markers = [];

  //   // Sort waypoints based on the label
  //   const sortedWaypoints = wayRoutes.slice().sort((a, b) => {
  //     const orderA = a?.order || 0;
  //     const orderB = b?.order || 0;
  //     const labelA = a?.label || '';
  //     const labelB = b?.label || '';

  //     return orderA - orderB || labelA.localeCompare(labelB);
  //   });

  //   // Add the start marker
  //   if (startLat && endLat) {

  //     markers.push(`markers=color:red%7Clabel:A%7C${startLat},${startLng}`);
  //   }

  //   let waypointLabelCharCode = 'B'.charCodeAt(0);
  //   for (let i = 0; i < wayRoutes.length; i++) {
  //     const label = String.fromCharCode(waypointLabelCharCode++);  // "B", "C", "D", etc.
  //     const waypointLat = wayRoutes[i].lat;  // Assuming latitude for waypoints is stored here
  //     const waypointLng = wayRoutes[i].lng;  // Assuming longitude for waypoints is stored here

  //     if (label && waypointLat && waypointLng) {
  //       markers.push(`markers=color:red%7Clabel:${label}%7C${waypointLat},${waypointLng}`);
  //     }
  //   }

  //   // Add the end marker with the next letter after the last waypoint
  //   if (endLat && endLng) {
  //     const nextEndLabel = String.fromCharCode(waypointLabelCharCode); // Next letter after the last waypoint
  //     markers.push(`markers=color:red%7Clabel:${nextEndLabel}%7C${endLat},${endLng}`);
  //   }

  //   const directionsService = new window.google.maps.DirectionsService();

  //   if (startLat && endLat) {
  //     const startLocation = new window.google.maps.LatLng(startLat, startLng);
  //     const endLocation = new window.google.maps.LatLng(endLat, endLng);
  //     const waypoints = wayRoutes.map((wayRoute, index) => ({
  //       location: new window.google.maps.LatLng(wayRoute.lat, wayRoute.lng),
  //       stopover: true,
  //     }));

  //     directionsService.route({
  //       origin: startLocation,
  //       destination: endLocation,
  //       waypoints: waypoints,
  //       travelMode: window.google.maps.TravelMode.DRIVING,
  //     }, async (response, status) => {
  //       if (status === 'OK') {
  //         const routePolyline = response.routes[0].overview_polyline;

  //         // Set up bounds and fit map to bounds
  //         const allPositions = [startLocation, endLocation, ...waypoints.map(waypoint => waypoint.location)];
  //         const bounds = new window.google.maps.LatLngBounds();
  //         allPositions.forEach(position => bounds.extend(position));
  //         mapCenter.fitBounds(bounds);

  //         const zoom = calculateZoomLevel(bounds);
  //         const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.getCenter().lat()},${mapCenter.getCenter().lng()}&zoom=${zoom}&size=800x500&dpi=720`;
  //         const pathEncoded = encodeURIComponent(`enc:${routePolyline}`);
  //         const pathParam = `path=${pathEncoded}`;
  //         const apiKey = 'AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk&libraries=places';

  //         async function urlToBlob(url) {
  //           const response = await fetch(url);
  //           const blob = await response.blob();
  //           return blob;
  //         }
  //         const a = markers.join('&')
  //         const finalStaticMapUrl = `${staticMapUrl}&${markers.join('&')}&${pathParam}&key=${apiKey}`;

  //         const staticMapBlob = await urlToBlob(finalStaticMapUrl);
  //         // const tripid = localStorage.getItem('selectedTripid');
  //         const formDataUpload = new FormData();
  //         formDataUpload.append('file', new File([staticMapBlob], 'static_map.png'));
  //         formDataUpload.append('tripid', tripid);
  //         setMapCaptureVerify(false)

  //         handleSuccessCapture()

  //         try {
  //           const response = await axios.post(`${apiUrl}/mapuploads`, formDataUpload, {
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //               'Accept': 'image/png',
  //             },
  //           });
  //           console.log('Uploaded file details', response.data);
  //           localStorage.setItem('MapBoxClose', 1);
  //         } catch (error) {
  //           console.error('Error uploading file:', error);
  //         }
  //       } else {
  //         console.error('Directions request failed due to ' + status);
  //       }
  //     });
  //   }

  // };
  // const fitBoundsToMarkers = (map) => {
  //   const bounds = new window.google.maps.LatLngBounds();

  //   if (startLat && startLng) {
  //     bounds.extend(new window.google.maps.LatLng(startLat, startLng));
  //   }
  //   if (endLat && endLng) {
  //     bounds.extend(new window.google.maps.LatLng(endLat, endLng));
  //   }
  //   if (wayRoutes && wayRoutes.length > 0) {
  //     wayRoutes.forEach((point) => {
  //       bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
  //     });
  //   }

  //   map.fitBounds(bounds);
  // };

  const fitBoundsToMarkers = (map) => {
    const bounds = new window.google.maps.LatLngBounds();

    // Include start point
    if (startLat && startLng) {
      bounds.extend({ lat: startLat, lng: startLng });
    }

    // Include end point
    if (endLat && endLng) {
      bounds.extend({ lat: endLat, lng: endLng });
    }

    // Include all waypoints
    if (wayRoutes) {
      wayRoutes.forEach((point) => {
        bounds.extend({ lat: point.lat, lng: point.lng });
      });
    }

    // Adjust the map to fit all markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE",
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const handleChanges = (newAddress) => {
    setAddress(newAddress);
    setPolygonPath([])
    setPolylinePath([])
    setMarkerPosition(null)

  };

  const submitPopup = (latLng) => {
    // Implement your logic for displaying a popup
  };
  // const handleSelect = async (address) => {
  //   const geocoder = new window.google.maps.Geocoder();

  //   try {
  //     const results = await new Promise((resolve, reject) => {
  //       geocoder.geocode({ address: address }, (results, status) => {
  //         if (status === 'OK' && results && results.length > 0) {
  //           resolve(results);
  //         } else {
  //           reject(new Error(`Geocode failed: ${status}`)); // Include status in error
  //         }
  //       });
  //     });

  //     if (results[0].geometry && results[0].geometry.location) {
  //       const latLng = results[0].geometry.location;
  //       console.log(latLng, results, 'Location found'); // Better log message

  //       if (mapInstance) {
  //         mapInstance.setCenter(latLng);
  //         mapInstance.setZoom(14);
  //         submitPopup(latLng);
  //       } else {
  //         console.log("Map instance not available");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error occurred in handleSelect:", error.message);
  //   }
  // };

  const handleSelect = async (address) => {
    console.log(address, 'newaddress');
    setAddress(address);

    const geocoder = new window.google.maps.Geocoder();

    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            resolve(results);
          } else {
            reject(new Error(`Geocode failed: ${status}`));
          }
        });
      });

      if (results[0].geometry && results[0].geometry.location) {
        const latLng = results[0].geometry.location;
        const lat = latLng.lat();
        const lng = latLng.lng();

        if (mapInstance) {
          mapInstance.setCenter({ lat, lng });
          mapInstance.setZoom(16); // Set desired zoom level
          submitPopup({ lat, lng });
          setMarkerPosition({ lat, lng }); // Set marker position to the geocoded location

          const bounds = results[0].geometry.bounds;
          if (bounds) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();

            // Define polyline path for dotted line around bounds
            const path = [
              { lat: ne.lat(), lng: ne.lng() },
              { lat: ne.lat(), lng: sw.lng() },
              { lat: sw.lat(), lng: sw.lng() },
              { lat: sw.lat(), lng: ne.lng() },
              { lat: ne.lat(), lng: ne.lng() } // Close the path
            ];

            console.log("Setting polyline path:", path);
            setPolylinePath(path);

            mapInstance.setZoom(13)
          } else {
            console.log("Bounds not available");
          }
        } else {
          console.log("Map instance not available");
        }
      }
    } catch (error) {
      console.error("Error occurred in handleSelect:", error.message);
    }
  };

  const startLatVerify = allGpsData
    ?.filter((li) => li?.Trip_Status === "Started" && li?.Latitude_loc)
    ?.map((li) => parseFloat(li?.Latitude_loc));

  const endLatVerify = allGpsData
    ?.filter((li) => li?.Trip_Status === "Reached" && li?.Latitude_loc)
    ?.map((li) => parseFloat(li?.Latitude_loc));


  return (
    <>
      <div >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <LoadScript googleMapsApiKey="AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk"> */}
          <PlacesAutocomplete
            value={address}
            onChange={handleChanges}
            onSelect={handleSelect}

          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className="search-input-field" style={{ position: "relative", zIndex: "999" }}>
                <input
                  {...getInputProps({
                    placeholder: 'Enter location',
                  })}
                  className="search-input"
                />
                <div className={suggestions.length > 0 ? 'suggestion-box' : ''}>
                  {suggestions.map((suggestion, index) => (
                    <div key={index} {...getSuggestionItemProps(suggestion)}>
                      {suggestion.description}
                    </div>
                  ))}

                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={5}
            center={center}
            id='map'
            onClick={handleMapClick}
            onLoad={(map) => {
              mapRef.current = map;
              setMapInstance(mapRef.current)
              fitBoundsToMarkers(map);
            }}

          >
            {/* {polygonPath.length > 0 && (
          <Polygon
            onClick={handleMapClick}
            paths={polygonPath}
            options={{
              // fillColor: "#FF0000",
              // fillOpacity: 0.3,
              // strokeColor: "#FF0000",
              // strokeOpacity: 0.8,
              strokeWeight: 0.2,
            }}
          />
        )} */}
            {/* {polylinePath.length > 0 && (
          <Polyline
            path={polylinePath}
            options={{
              // strokeColor: "#000000", 
              // strokeOpacity: 1, 
              // strokeWeight: 2,
          
              // Add dashed line pattern using icons
              icons: [
                {
                  icon: {
                    path: "M 0,-1 0,1", // Creates a dash segment
                    strokeOpacity: 1,
                    scale: 2, // Adjust size of dashes
                  },
                  offset: "0",
                  repeat: "20px", // Controls spacing between dashes
                },
              ],
            }}
          />
        )} */}
            {markerPosition !== "" || markerPosition !== null ? <Marker
              position={markerPosition}
              onClick={handleMapClick}
            /> : ""
            }
            {startLat && directions !== null && (
              <Marker
                position={{ lat: startLat, lng: startLng }}
                icon={{
                  url: startMarkerIcon, // Custom PNG marker
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust size (smaller than default)
                }}
                onClick={() => handleMarkerClick(startRoutes)}
              />
            )}
            {startLat && directions === null && (
              <Marker
                position={{ lat: startLat, lng: startLng }}
                icon={{
                  url: startMarkerIcon, // Custom PNG marker
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust size (smaller than default)
                }}
                onClick={() => handleMarkerClick(startRoutes)}
              />
            )}
            {endLat && directions !== null && (
              <Marker
                position={{ lat: endLat, lng: endLng }}
                icon={{
                  url: endMarkerIcon, // Custom PNG marker
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust size (smaller than default)
                }}
                onClick={() => handleMarkerClick(endRoutes)}
              />
            )}
            {endLat && directions === null && (
              <Marker
                position={{ lat: endLat, lng: endLng }}
                icon={{
                  url: endMarkerIcon, // Custom PNG marker
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust size (smaller than default)
                }}
                onClick={() => handleMarkerClick(endRoutes)}
              />
            )}
            {directions !== null && polyLineWaypoints.length !== fullGpsData.length && wayRoutes?.map((point, index) => (
              point.tripType === "waypoint" && (
                <Marker
                  key={index}
                  position={{ lat: point.lat, lng: point.lng }}
                  icon={{
                    url: wayPointMarker, // Custom PNG marker
                    scaledSize: new window.google.maps.Size(40, 40), // Adjust size (smaller than default)
                  }}
                  onClick={() => handleMarkerClick(point)}
                />

              )
            ))}
            {directions === null && polyLineWaypoints.length !== fullGpsData.length && wayRoutes?.map((point, index) => (
              point.tripType === "waypoint" && (
                <Marker
                  key={index}
                  position={{ lat: point.lat, lng: point.lng }}
                  icon={{
                    url: wayPointMarker, // Custom PNG marker
                    scaledSize: new window.google.maps.Size(40, 40), // Adjust size (smaller than default)
                  }}
                  onClick={() => handleMarkerClick(point)}
                />

              )
            ))}

            {/* {startLat && directions === null && <Marker position={{ lat: startLat, lng: startLng }} label="A" onClick={() => handleMarkerClick(startRoutes)} />} */}
            {/* {endLat && directions === null && <Marker position={{ lat: endLat, lng: endLng }} label={polyLineWaypoints.length !== fullGpsData.length  ? endLabel : "B"} onClick={() => handleMarkerClick(endRoutes)} />} */}
            {/* {endLat && directions === null && <Marker position={{ lat: endLat, lng: endLng }} label={endLabel} onClick={() => handleMarkerClick(endRoutes)} />} */}
            {/* {directions === null && polyLineWaypoints.length !== fullGpsData.length && wayRoutes?.map((point, index) => (
              point.tripType === "waypoint" && (
                <Marker
                  key={index}
                  position={{ lat: point.lat, lng: point.lng }}
                  label={point.label}
                  onClick={() => handleMarkerClick(point)}
                />
              )
            ))} */}

            {/* {directions && <DirectionsRenderer directions={directions} />} */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{ suppressMarkers: true }} // Hide default markers
              />
            )}
            {polyLineWaypoints.length === fullGpsData.length && startLat === startLatVerify[0] && endLat === endLatVerify[0] && polyLineWaypoints.length > 0 && (
              <Polyline
                // path={polyLineWaypoints}
                path={roadPoints}
                options={{
                  strokeColor: "#0000FF", // Blue color for the polyline
                  strokeOpacity: 1,
                  strokeWeight: 3,

                }}
              />
            )}
          </GoogleMap>



          {popupOpen && (
            <Modal
              open={popupOpen}
              onClose={handleCloseMapPopUp}
            >
              <Box sx={style2}>

                <IconButton
                  aria-label="close"
                  onClick={handleCloseMapPopUp}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <div>
                  <DatePicker
                    value={dayjs(mapContent.date)}
                    onChange={(newValue) => handledatechange(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    format='DD/MM/YYYY'
                  />
                </div>
                <div>
                  {/* <FormControl fullWidth> */}
                  <div style={{ display: "grid", gap: "0px 20px", marginTop: "20px", marginBottom: "20px", alignItems: 'center' }}>

                    <InputLabel id="demo-simple-select-label">Select Trip Type</InputLabel>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mapContent.trip_type}
                        onChange={(e) => handleChange(e.target.value, 'trip_type')}
                        style={{ width: '100%' }}
                      >
                        <MenuItem value={"start"}>Start</MenuItem>
                        <MenuItem value={"waypoint"}>Waypoint</MenuItem>
                        <MenuItem value={"end"}>End</MenuItem>
                      </Select>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={mapContent.time}
                        onChange={handletimeChange}
                        required
                        style={{ border: '1px solid', }}
                      />
                    </div>
                    {/* </FormControl> */}
                  </div>
                </div>

                {/* <TextField
                name="time"
                label="Time"
                value={mapContent.time}
                onChange={handletimeChange}
              /> */}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={submitMapPopUp} variant="contained">Submit</Button>
                  <Button onClick={onRemoveMarker} variant="contained" disabled={removeButtonHide} style={{ whiteSpace: 'nowrap' }}>Remove Marker</Button>
                </div>
              </Box>


            </Modal>
          )}
          {/* </LoadScript> */}
          <div style={{ position: "relative" }}>
            <div className="buttons-div">

              {(fullGpsData.length !== polyLineWaypoints.length || startLat !== startLatVerify[0] || endLatVerify[0] !== endLat) && (
                <button onClick={handleMapDraw} className="draw-route">Draw Route</button>
              )}
              {fullGpsData.length !== polyLineWaypoints.length || (startLat !== startLatVerify[0] || endLatVerify[0] !== endLat) ? <button onClick={() => handleMapCapture()} className="Capture-View" >Capture View</button> :
                <button onClick={() => handleNoEditCapture()} className="Capture-View" >Capture Vieww</button>}
            </div>
            <div style={{ position: "absolute", top: "3px", left: "40%" }}>
              {success ? <p style={{ display: "flex", justifyContent: "center", color: '#347928', fontSize: "22px", fontWeight: 600 }}>Successfully Captured....</p> :
                ""}
            </div>
            <div style={{ position: "absolute", top: "3px", left: "40%" }}>
              {error ? <p style={{ display: "flex", justifyContent: "center", color: 'red', fontSize: "22px", fontWeight: 600 }}>Please Draw The Route....</p> :
                ""}
            </div>
            <div style={{ position: "absolute", top: "3px", left: "40%" }}>
              {(errorMessage && (startLat === "" || startLat === undefined)) ? (
                <p style={{ display: "flex", justifyContent: "center", color: 'red', fontSize: "22px", fontWeight: 600 }}>
                  Mark Your StartPoint
                </p>
              ) : null}
            </div>
            <div style={{ position: "absolute", top: "3px", left: "40%" }}>
              {(errorMessage && (startLat !== "" && startLat !== undefined) && (endLat === "" || endLat === undefined)) ? (
                <p style={{ display: "flex", justifyContent: "center", color: 'red', fontSize: "22px", fontWeight: 600 }}>
                  Mark Your EndPoint
                </p>
              ) : null}
            </div>



          </div>
        </LocalizationProvider>
      </div>
    </>

  );
};

export default EditMapCheckComponent;
