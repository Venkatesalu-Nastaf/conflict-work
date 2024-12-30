import React, { useState, useContext , useCallback} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Slide } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MenuItem } from '@mui/material';
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PermissionContext } from '../../../../context/permissionContext';
import "./HistoryLocationModal.css"
import { GoogleMap, MarkerF, InfoWindow, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
// import { IconButton, Button } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
/* global google */

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const optionshistoryLocation = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];


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



const HistoryLocationModal = () => {
  const { historyLocation, setHistoryLocation } = useContext(PermissionContext);

  const handleClosehistoryLocation = () => {
    setHistoryLocation(false);
  };

  const [selecthistoryLocation, setSelecthistoryLocation] = useState('');

  const handleChangeselecthistoryLocation = (event) => {
    setSelecthistoryLocation(event.target.value);
  };

  const [selectedDatehistoryLocation, setSelectedDatehistoryLocation] = useState(null);
  const handleDateChangehistoryLocation = (newDate) => {
    setSelectedDatehistoryLocation(newDate);
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
  // if (!isLoaded) return <div>Loading...</div>;


  return (
    <>
      <React.Fragment>

        <Dialog
          open={historyLocation}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClosehistoryLocation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '.MuiDialog-container': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Historical Vehicle Location
            <p className='history-location-text' >View the location and status of any vehicle at any time.</p>
            <IconButton
              aria-label="close"
              onClick={handleClosehistoryLocation}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <>
                <div className='history-location' >
                  <div className='history-location-content'>

                    <FormControl sx={{ m: 1, width: 300 }}>
                      <Select
                        value={selecthistoryLocation}
                        onChange={handleChangeselecthistoryLocation}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select an option</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Select an option</em>
                        </MenuItem>
                        {optionshistoryLocation.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={selectedDatehistoryLocation}
                        onChange={handleDateChangehistoryLocation}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

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

          <div style={{ zIndex: 1, position: 'absolute', top: '400px', right: '60px' }} onClick={handleOpenPopup}>
            <IconButton onClick={handleCenterButtonClick} style={{ backgroundColor: 'red', color: 'white' }}>
              <NavigationIcon />
            </IconButton>
          </div>

        </GoogleMap>
              </>
            </DialogContentText>
          </DialogContent>

        </Dialog>
      </React.Fragment>
    </>
  )
}


export default HistoryLocationModal;