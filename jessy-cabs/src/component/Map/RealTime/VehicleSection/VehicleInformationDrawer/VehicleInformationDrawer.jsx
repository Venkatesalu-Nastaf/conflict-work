import React, { useState, useContext , useCallback} from 'react';
import { GoogleMap, MarkerF, InfoWindow, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
// import { IconButton, Button } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import { FaShare } from "react-icons/fa";
import { Drawer } from '@mui/material';
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




/* global google */
// Define the container style for the map
const containerStyle = {
    width: '100%',
    height: '650px',
    // border: '2px solid black',
  };
  
  // Set the default map center (Chennai)
  const center = {
    lat: 13.0827,
    lng: 80.2707,
  };



const VehicleInformationDrawer = () => {

    //vehicle section drawer
    const { open, setOpen, setOpenHistoryDrawer, setOpenshare, setHistoryLocation, setOpendetailsDrawer } = useContext(PermissionContext);
    const navigate = useNavigate();

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
                                                        <span>Patel G Kulappa Road, Ramaswamipalya, Banasawadi, Bengaluru, Bangalore Urban, Karnataka</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Model:</span>
                                                        <span>2016 TOYOTA ETIOS</span>
                                                    </div>

                                                    <div className='overview-content-border' >
                                                        <span className='overview-left'>Group:</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Fuel Type:</span>
                                                        <span>Diesel</span>
                                                    </div>

                                                    <div className='overview-content'>
                                                        <span className='overview-left'>Distance:</span>
                                                        <span>1.2 km</span>
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

                            </div>

                        </Box>
                    </Box>
                </Drawer>
            </div>
        </>
    )
}


export default VehicleInformationDrawer;