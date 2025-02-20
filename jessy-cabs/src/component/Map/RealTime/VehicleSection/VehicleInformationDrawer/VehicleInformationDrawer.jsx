import React, { useState, useContext, useCallback, useEffect, useRef, useMemo } from 'react';
import { GoogleMap, MarkerF, InfoWindow, useLoadScript, DirectionsRenderer, Polyline } from '@react-google-maps/api';
// import { IconButton, Button } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import { FaShare } from "react-icons/fa";
import { Button, Drawer } from '@mui/material';
import { MenuItem } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MdChangeHistory } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { FaCarOn } from "react-icons/fa6";
import TabContext from '@mui/lab/TabContext';
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { PermissionContext } from '../../../../context/permissionContext';
import "./VehicleInformationDrawer.css"
import { useNavigate } from 'react-router-dom';
import { chennaiCoordinates } from '../../MapSection/mapData';
import mapicon from "./mapicon.png"
import blackicon from "./blackmapicon.png"
import startPointIcon from "./startPointIcon.png"
import useDetailsVehicle from '../useDetailsVehicle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { VehicleMapData } from '../../../vehicleMapContext/vehcileMapContext';
import TripDetailModal from '../../../Modal/TripDetailModal';
import Autocomplete from "@mui/material/Autocomplete";
import MapParticularTrip from '../MapParticulaTrip/MapParticularTrip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

/* global google */
// Define the container style for the map
const containerStyle = {
    width: '100%',
    height: '650px',
    // border: '2px solid black',
};

// Set the default map center (Chennai)




const VehicleInformationDrawer = () => {

    const { vehiclesData, currentPosition, setCurrentPosition, isPolylineVisible, setIsPolylineVisible, isPlaying, setIsPlaying,
        startMarkerPosition, setStartMarkerPosition, handleDrawPaths, dynamicPolyline, handle10xDrawPaths, handle20xDrawPaths, handle50xDrawPaths,
        handledefault10xDrawPaths, speedState, address, startTripLocation, endTripLocation, tripidOptions, selectedTripid, setSelectedTripid,
        togglePlayPause, filterDate, handleChange, dateWiseFilter, currentDatePoints,startMarkerPosition1,setCurrentPosition1,currentPosition1

    } = useDetailsVehicle()
    //vehicle section drawer
    const { open, setOpen, setOpenHistoryDrawer, setOpenshare, setHistoryLocation, setOpendetailsDrawer, vehicleListData, setVehicleListData } = useContext(PermissionContext);
    const navigate = useNavigate();
    const [currentPointIndex, setCurrentPointIndex] = useState(0);
    const { jessyCabsDistance, setJessyCabsDistance, tripModalOpen, setTripModalOpen } = VehicleMapData();
    // const {jessyCabsLocation,setJessyCabsLocation} = useState({lat:13.031207,lng:80.239396});
    const jessyCabsLocation = {
        lat: 13.031207,
        lng: 80.239396
    }
    const mapRef = useRef(null)
    const handleopenHistoryDrawer = () => {
        // setOpenHistoryDrawer(true);
        navigate("/home/Map/History");

    };

    const handleopenHistoryLocation = () => {
        setHistoryLocation(true);
    };

    const handleopenDetailsDrawer = () => {
        setOpendetailsDrawer(true);
    };
    const handleopensharedrawer = () => {
        setOpenshare(true);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const [dropdowndrawer, setDropdowndrawer] = React.useState('');

    const handleChangedropdowndrawer = (event) => {
        setDropdowndrawer(event.target.value);
    };


    const [valuetabs, setValuetabs] = React.useState('1');

    const handleChangetabs = (event, newValue) => {
        setValuetabs(newValue);
    };

    const [searchTermdirection, setSearchTermdirection] = useState('');

    const handleSearchChangedirection = (event) => {
        setSearchTermdirection(event.target.value);
    };

    const [selectedOptionnearby, setSelectedOptionnearby] = useState('');

    const handleSelectChangenearby = (event) => {
        setSelectedOptionnearby(event.target.value);
    };

    const [number, setNumber] = useState('');

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };


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
    const [openPopup, setOpenPopup] = useState(false); // State to handle popup open/close
    const [popupPosition, setPopupPosition] = useState(null); // State for popup position
    const [directionsResponse, setDirectionsResponse] = useState(null);
    // Marker location based on latitude and longitude
    const markerLocation = lat && long ? { lat, lng: long } : null;

    const [mapiconBase64, setMapiconBase64] = useState('');
    const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });


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
    //   if (!isLoaded) return <div>Loading...</div>;
    // useEffect(() => {
    //     if (!chennaiCoordinates || chennaiCoordinates.length < 2) {
    //         console.error("Invalid chennaiCoordinates for routing");
    //         return;
    //     }

    //     const directionsService = new window.google.maps.DirectionsService();

    //     const updateDirections = (isInitial = false) => {
    //         const formattedCoordinates = chennaiCoordinates.map(coord => ({
    //             lat: coord.latitude,
    //             lng: coord.longitude,
    //         }));

    //         // Fixed last point as the standard destination
    //         const fixedLastPoint = formattedCoordinates[formattedCoordinates.length - 1];

    //         const waypoints = formattedCoordinates.slice(1, -1).map(location => ({
    //             location,
    //             stopover: false,
    //         }));

    //         directionsService.route(
    //             {
    //                 origin: formattedCoordinates[0],
    //                 destination: fixedLastPoint, // Always use the last coordinate
    //                 waypoints,
    //                 travelMode: window.google.maps.TravelMode.DRIVING,
    //             },
    //             (result, status) => {
    //                 console.log(status, "checkkkkkkk");

    //                 if (status === window.google.maps.DirectionsStatus.OK) {
    //                     setDirectionsResponse(result);

    //                     if (isInitial) {
    //                         const bounds = new window.google.maps.LatLngBounds();
    //                         formattedCoordinates?.forEach(coord => bounds.extend(coord));
    //                         mapRef?.current?.fitBounds(bounds);
    //                     }
    //                 } else {
    //                     console.error(`Error fetching directions: ${status}`);
    //                 }
    //             }
    //         );
    //     };

    //     updateDirections(true);

    //     const intervalId = setInterval(() => {
    //         updateDirections(false);
    //     }, 10000);

    //     return () => clearInterval(intervalId);
    // }, [chennaiCoordinates, open]);


    const handleMapLoad = (map) => {
        mapRef.current = map; // Save the map instance
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    const center = { lat: currentPosition?.lat, lng: currentPosition?.lng };
    const base64Image = `data:image/png;base64,${mapicon}`;
    console.log(base64Image, "llllllllllllllllllllllllllllllllllllll");

    function convertToBase64(imagePath, callback) {
        fetch(imagePath)
            .then((res) => res.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => callback(reader.result);
                reader.readAsDataURL(blob);
            })
            .catch((err) => console.error('Error converting image to Base64:', err));
    }

    // Use the function
    convertToBase64('/static/media/mapicon.b6f6d6a97abc01b5785e.png ', (base64Image) => {
        setMapiconBase64(base64Image)
    });


    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const startLat = chennaiCoordinates[0]?.latitude;
    const startLng = chennaiCoordinates[0]?.longitude;

    const endLat = chennaiCoordinates[chennaiCoordinates.length - 1].latitude;
    const endLng = chennaiCoordinates[chennaiCoordinates.length - 1].longitude;

    // Waypoints: All coordinates except the first and last
    const waypoints = chennaiCoordinates.slice(1, chennaiCoordinates.length - 1).map(coord => ({
        location: new google.maps.LatLng(coord.latitude, coord.longitude),
        stopover: true,
    }));

    // Log start, end, and waypoints
    console.log("Start:", startLat, startLng);
    console.log("End:", endLat, endLng);
    console.log("Waypoints:", waypoints);
    const request = {
        origin: new google.maps.LatLng(startLat, startLng),
        destination: new google.maps.LatLng(endLat, endLng),
        waypoints: waypoints, // Add waypoints here
        travelMode: google.maps.TravelMode.DRIVING, // Travel mode: Driving
    };
    directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
            const steps = response.routes[0].legs[0].steps;
            console.log(steps, "angleeeeeeeeeeeee22222222", response);

            steps.forEach((step, index) => {
                const instruction = step.instructions; // Direction instruction, e.g., "Turn left onto Main St."
                const distance = step.distance.text; // Distance for this step
                const angle = step.travelMode === google.maps.TravelMode.DRIVING ? getBearingFromStep(step) : 0;

                // Analyze the instructions to determine direction
                if (instruction.includes("left")) {
                    console.log("Left Turn", distance, angle);
                }
                else if (instruction.includes("east")) {
                    console.log("east", instruction);

                }

            });
        }
    });

    function getBearingFromStep(step) {
        const startLatLng = new google.maps.LatLng(step?.start_location.lat(), step?.start_location.lng());
        const endLatLng = new google.maps.LatLng(step?.end_location.lat(), step?.end_location.lng());
        return google.maps.geometry.spherical.computeHeading(startLatLng, endLatLng);
    }

    // distance calculate
    const calculateDistance = () => {

        const origin = new window.google.maps.LatLng(jessyCabsLocation?.lat, jessyCabsLocation?.lng);
        const destination = new window.google.maps.LatLng(currentPosition?.lat, currentPosition?.lng);

        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: "DRIVING",
            },
            (response, status) => {
                console.log(status, "distanceeeeeeeeeeeeeeee;;;;;;;;;;;;;;;;;;;;;;;;;");

                if (status === "OK") {
                    const distanceText = response.rows[0].elements[0].distance.text;
                    console.log(distanceText, "distanceeeeeeeeeeeeeeee");

                    //   setDistance(distanceText);
                    setJessyCabsDistance(distanceText)
                    return
                } else {
                    //   alert("Error calculating distance");
                    console.log(response, "distanceeeeeeeeeeeeeeeeresssssssssssssss");

                }
            }
        );
    };
    const handleStartTrip = (event) => {
        setClickPosition({
            lat: startTripLocation?.latitude,
            lng: startTripLocation?.longitude,
            pixelX: event?.domEvent?.clientX,
            pixelY: event?.domEvent?.clientY,
        });
        setTripModalOpen(true);
    };
    const handleEndTrip = (event) => {
        setClickPosition({
            lat: endTripLocation?.latitude,
            lng: endTripLocation?.longitude,
            pixelX: event?.domEvent?.clientX,
            pixelY: event?.domEvent?.clientY,
        });
        setTripModalOpen(true)

    }



    const handleTripidChange = (value) => {
        setSelectedTripid(value?.value || null);
    };
    return (
        <>
            <div>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: '100%',
                            height: '100%',
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                            <IconButton onClick={toggleDrawer(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, p: 2 }}>
                            <div className='vehicle-information-header'>
                                <div>
                                    <p> <span className='hrader-font-latest' >Latest</span>  - 1060 (TN09DH1060)
                                    </p>
                                </div>
                                <div className='vehicle-information-header-buttons'>
                                    <div>
                                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                                            <Select
                                                id="demo-simple-select-autowidth"
                                                value={dropdowndrawer}
                                                onChange={handleChangedropdowndrawer}
                                                autoWidth
                                                displayEmpty
                                            >

                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={21}>Twenty one</MenuItem>
                                                <MenuItem value={22}>Twenty one and a half</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    {/* <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="filterDate"// Set dynamic label
                                                id="shedOutDate"
                                                format="DD/MM/YYYY"
                                                onChange={(date) => { handleChange(date) }}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField
                                                        {...inputProps}
                                                        inputRef={inputRef}
                                                        value={filterDate}

                                                    />
                                                )}
                                            </DatePicker>
                                        </LocalizationProvider>

                                    </div> */}
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="filterDate" 
                                                id="shedOutDate"
                                                format="DD/MM/YYYY"
                                                value={filterDate ? dayjs(filterDate) : dayjs()} 
                                                onChange={(date) => handleChange(date)}
                                            />
                                        </LocalizationProvider>
                                    </div>

                                    <div className='vehicle-info-button-content' onClick={handleopenHistoryDrawer}>
                                        <MdChangeHistory />
                                        <p className='para-mar'>History</p>
                                    </div>

                                    <div className='vehicle-info-button-content' onClick={handleopenHistoryLocation}>
                                        <GoHistory />
                                        <p className='para-mar'>History Location</p>
                                    </div>

                                    <div className='vehicle-info-button-content' onClick={handleopenDetailsDrawer} >
                                        <FaCarOn />
                                        <p className='para-mar'>Details</p>
                                    </div>

                                    <div className='vehicle-info-button-content-share' onClick={handleopensharedrawer} y>
                                        <FaShare />

                                        <p className='para-mar'>Share Realtime Tracking </p>
                                    </div>

                                </div>
                            </div>

                            <div className='vehicle-info-content' >

                                <div className='vehicle-info-content-info'>
                                    <Box sx={{ width: '100%', typography: 'body1' }}>
                                        <TabContext value={valuetabs}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChangetabs} aria-label="lab API tabs example">
                                                    <Tab label="Overview" value="1" />
                                                    <Tab label="Speed Graph" value="2" />
                                                    <Tab label="Directions" value="3" />
                                                    <Tab label="Near By" value="4" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1" >
                                                <div className='overview-content-head'>


                                                    <div className='overview-content' >
                                                        <p className='overview-left'>Parked:</p>
                                                        <p style={{ color: 'green' }}>Speed 13km/h</p>
                                                    </div>
                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Current Location:</span>
                                                        <span>{address}</span>
                                                    </div>
                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Model:</span>
                                                        <span>{vehicleListData[0]?.yearModel}</span>
                                                    </div>

                                                    <div className='overview-content-border' >
                                                        <span className='overview-left'>Group:</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Fuel Type:</span>
                                                        <span>{vehicleListData[0]?.fueltype}</span>
                                                    </div>

                                                    <div className='overview-content-dropdown'>
                                                        <div>
                                                            <span className='overview-left'>Distance:</span>
                                                            <span>1.2 km</span>
                                                        </div>
                                                        <div>
                                                            <Autocomplete
                                                                fullWidth
                                                                // size="small"
                                                                sx={{ width: 180 }}
                                                                options={tripidOptions || ""}
                                                                value={tripidOptions.find(option => option.value === selectedTripid) || null}
                                                                onChange={(label, value) => handleTripidChange(value)} // Correcting onChange
                                                                getOptionLabel={option => option.label}
                                                                renderInput={(params) => <TextField {...params} label="Select Trip ID" />}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='overview-content-border'>
                                                        <span className='overview-left'>Time:</span>
                                                        <span>25m</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Start Time:</span>
                                                        <span>06 Aug 24, 11:21 AM</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>End Time:</span>
                                                        <span>06 Aug 24, 11:46 AM</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Start Location:</span>
                                                        <span>Saint Thomas Town, Saint Thomas Town, Kacharakanahalli, Bengaluru, Bangalore Urban, Karnataka</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>End Location:</span>
                                                        <span>Patel G Kulappa Road, Ramaswamipalya, Banasawadi, Bengaluru, Bangalore Urban, Karnataka</span>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="2" >

                                            </TabPanel>
                                            <TabPanel value="3" >
                                                <div className='directions-vehicle-info' >
                                                    <Box sx={{ m: 1, minWidth: 300 }}>
                                                        <TextField
                                                            id="search-input"
                                                            label="Search"
                                                            variant="outlined"
                                                            value={searchTermdirection}
                                                            onChange={handleSearchChangedirection}
                                                            fullWidth
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <SearchIcon />
                                                                    </InputAdornment>
                                                                ),
                                                                sx: { height: '40px' }, // Adjust the height as needed
                                                            }}
                                                            sx={{
                                                                '.MuiOutlinedInput-root': { height: '40px' }, // Adjust the height as needed
                                                                '.MuiInputLabel-root': { lineHeight: '40px' }, // Adjust the label's line-height as needed
                                                            }}
                                                        />
                                                    </Box>
                                                    <div className='Getdirection' >
                                                        <button className='Getdirection-btn'>Get Direction</button>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel value="4">
                                                <div className='directions-vehicle-info'>
                                                    <div className='direction-content'>

                                                        <span>Category :</span>
                                                        <Box sx={{ m: 1, minWidth: 302 }}>
                                                            <TextField
                                                                id="select-input"
                                                                select
                                                                label="Select Option"
                                                                value={selectedOptionnearby}
                                                                onChange={handleSelectChangenearby}
                                                                variant="outlined"
                                                                fullWidth
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                <MenuItem value={21}>Twenty-one</MenuItem>
                                                                <MenuItem value={22}>Twenty-one and a half</MenuItem>
                                                            </TextField>
                                                        </Box>


                                                    </div>
                                                    <div className='direction-content'>
                                                        <span>
                                                            Near By KM :
                                                        </span>
                                                        <div className='direction-box'>
                                                            <Box sx={{ m: 1, minWidth: 120 }}>
                                                                <TextField
                                                                    id="number-input"
                                                                    label="Number"
                                                                    type="number"
                                                                    value={number}
                                                                    onChange={handleNumberChange}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                />
                                                            </Box>
                                                            <button className='direction-apply-btn' >Apply</button>
                                                        </div>
                                                    </div>
                                                    <div className='warning-no-petrol' >
                                                        <p>No Petrol pump found.</p>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </TabContext>
                                    </Box>
                                </div>

                                <div className='vehicle-info-content-map'>
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
                                    {selectedTripid !== null ? <MapParticularTrip selectedTripid={selectedTripid} /> : <>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={18}
                                        onLoad={() => console.log("Map loaded")}
                                    >
                                        {dynamicPolyline.length > 0 ? (
                                            <Polyline
                                                path={dynamicPolyline}
                                                options={{
                                                    strokeColor: "#189df3",
                                                    strokeOpacity: 0.8,
                                                    strokeWeight: 6,
                                                }}
                                            />
                                        )
                                            : <Polyline
                                            path={currentDatePoints?.map((point) => ({
                                                lat: parseFloat(point?.Lattitude_loc),  // Convert string to float
                                                lng: parseFloat(point?.Longitude_loc), 
                                            }))}
                                            options={{
                                                strokeColor: "#189df3",
                                                strokeOpacity: 0.8,
                                                strokeWeight: 6,
                                            }}
                                        />
                                        }

                                        <MarkerF
                                            position={{
                                                lat: parseFloat(startMarkerPosition1?.Lattitude_loc),
                                                lng: parseFloat(startMarkerPosition1?.Longitude_loc),
                                            }}
                                            icon={{
                                                url: startPointIcon,
                                                scaledSize: new window.google.maps.Size(24, 24),
                                                origin: new window.google.maps.Point(0, 0),
                                                anchor: new window.google.maps.Point(12, 12),
                                            }}
                                        />

                                        <div>
                                            {startTripLocation.map((location, index) => (
                                                <MarkerF
                                                    key={`start-${index}`} // Unique key for each marker
                                                    position={{
                                                        lat: location.latitude,
                                                        lng: location.longitude,
                                                    }}
                                                    onClick={() => handleStartTrip(location)} // Pass clicked location
                                                    icon={{
                                                        url: startPointIcon,
                                                        scaledSize: new window.google.maps.Size(24, 24),
                                                        origin: new window.google.maps.Point(0, 0),
                                                        anchor: new window.google.maps.Point(12, 12),
                                                    }}
                                                />
                                            ))}
                                            {tripModalOpen && <TripDetailModal position={clickPosition} setTripModalOpen={setTripModalOpen} />}
                                        </div>

                                        <div>
                                            {endTripLocation.map((location, index) => (
                                                <MarkerF
                                                    key={`end-${index}`} // Unique key for each marker
                                                    position={{
                                                        lat: location.latitude,
                                                        lng: location.longitude,
                                                    }}
                                                    onClick={() => handleEndTrip(location)} // Pass clicked location
                                                    icon={{
                                                        url: startPointIcon, // Change icon if needed
                                                        scaledSize: new window.google.maps.Size(24, 24),
                                                        origin: new window.google.maps.Point(0, 0),
                                                        anchor: new window.google.maps.Point(12, 12),
                                                    }}
                                                />
                                            ))}
                                            {tripModalOpen && <TripDetailModal position={clickPosition} setTripModalOpen={setTripModalOpen} />}
                                        </div>



                                        <MarkerF
                                            position={{
                                                lat: parseFloat(currentPosition1?.Lattitude_loc),
                                                lng: parseFloat(currentPosition1?.Longitude_loc),
                                            }}
                                            icon={{
                                                url: blackicon,
                                                scaledSize: new window.google.maps.Size(24, 24),
                                                origin: new window.google.maps.Point(0, 0),
                                                anchor: new window.google.maps.Point(12, 12),
                                            }}
                                        />





                                    </GoogleMap>




                                        <div style={{ zIndex: 1, position: 'absolute', top: '400px', right: '60px' }} onClick={handleOpenPopup}>
                                            <IconButton onClick={handleCenterButtonClick} style={{ backgroundColor: 'red', color: 'white' }}>
                                                <NavigationIcon />
                                            </IconButton>
                                        </div>

                                        <div className='playButton'>
                                            <div>
                                            </div>
                                            <div className='playArrow'>
                                                <Button onClick={togglePlayPause}>
                                                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                                </Button>

                                            </div>
                                            <div className='playspeed'>

                                                <p style={{ textAlign: 'center', margin: 0 }}>Play Speed</p>
                                                <Button sx={{
                                                    backgroundColor: speedState === 1000 ? 'gray' : 'white',
                                                    color: speedState === 1000 ? 'white' : 'black',
                                                    '&:hover': { backgroundColor: 'lightgray' },
                                                }} onClick={() => handle10xDrawPaths()}>10X</Button>

                                                <Button sx={{
                                                    backgroundColor: speedState === 500 ? 'gray' : 'white',
                                                    color: speedState === 500 ? 'white' : 'black',
                                                    '&:hover': { backgroundColor: 'lightgray' },
                                                }} onClick={() => handle20xDrawPaths()}>20X</Button>

                                                <Button sx={{
                                                    backgroundColor: speedState === 100 ? 'gray' : 'white',
                                                    color: speedState === 100 ? 'white' : 'black',
                                                    '&:hover': { backgroundColor: 'lightgray' },
                                                }} onClick={() => handle50xDrawPaths()}>50X</Button>
                                            </div>
                                        </div></>}
                                </div>
                            </div>

                        </Box>
                    </Box>
                </Drawer>
            </div>
        </>
    )
}


export default VehicleInformationDrawer;