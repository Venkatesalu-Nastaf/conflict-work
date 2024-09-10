import React , {useState, useCallback} from 'react';
import { GoogleMap, MarkerF, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import NavigationIcon from '@mui/icons-material/Navigation';
import { IoIosWarning } from "react-icons/io";

/* global google */
// Define the container style for the map
const containerStyle = {
    width: '100%',
    height: '650px',
    border: '2px solid black',
  };
  
  

// Set the default map center (Chennai)
const center = {
    lat: 13.0827,
    lng: 80.2707,
  };

 const HistorySpeedViolation = () => {
    const [map, setMap] = useState(null);
    const [popupPosition, setPopupPosition] = useState(null); // State for popup position
    const [lat, setLat] = useState(13.0827); // Default latitude (Chennai)
    const [long, setLong] = useState(80.2707); // Default longitude (Chennai)
    const [direction, setDirection] = useState(false);
    const [directionRendererKey, setDirectionRendererKey] = useState(0);
    const [directionRoute, setDirectionRoute] = useState(null);
    const [showAddress, SetShowAddress] = useState(false);
    const handleshowaddress = () => {
      SetShowAddress(!showAddress);
    }

    const [openPopup, setOpenPopup] = useState(false); // State to handle popup open/close
 // Popup open/close handlers
 const handleOpenPopup = () => {
    setPopupPosition(markerLocation); // Open popup at marker location
    setOpenPopup(true);
  };
  const handleClosePopup = () => setOpenPopup(false);



  
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



  return (
    <>
         <div>
                <div>
                    <p className='stoppages-para history-table-section-topic'>Stoppages - 0715 (TN75AL0715)</p>
                    <p className='speesviolation-para'>Speed Limit :  80 km/h </p>
                </div>
                <div className='content-graph'>
                    <div className='left-content'>
                        <div className='left-top'>
                            <div>191 Speed Violations
                            </div>
                            <div>
                                Max. 94 km/h
                            </div>
                        </div>

                        <div className='height-left'>

                            <div className='speedviolation-cons'>
                                <p className='speesviolation-para'>Speed : 82 km/h
                                </p>
                                <p onClick={handleshowaddress} className='speesviolation-show-add speesviolation-para'>Show Address</p>
                                {showAddress &&
                                    <p>
                                        Bengaluru - Mysuru - Mangaluru Highway, Bengaluru, Ramanagara, Bangalore Division District, Karnataka
                                    </p>
                                }

                                <div className='last-datetime'>
                                    <p>26 Aug 24, 07:37:37 AM</p>
                                </div>
                            </div>

                            <div className='speedviolation-cons'>
                                <p className='speesviolation-para'>Speed : 82 km/h
                                </p>
                                <p onClick={handleshowaddress} className='speesviolation-show-add speesviolation-para'>Show Address</p>
                                {showAddress &&
                                    <p>
                                        Bengaluru - Mysuru - Mangaluru Highway, Bengaluru, Ramanagara, Bangalore Division District, Karnataka
                                    </p>
                                }

                                <div className='last-datetime'>
                                    <p>26 Aug 24, 07:37:37 AM</p>
                                </div>
                            </div>

                            <div className='speedviolation-cons'>
                                <p className='speesviolation-para'>Speed : 82 km/h
                                </p>
                                <p onClick={handleshowaddress} className='speesviolation-show-add speesviolation-para'>Show Address</p>
                                {showAddress &&
                                    <p>
                                        Bengaluru - Mysuru - Mangaluru Highway, Bengaluru, Ramanagara, Bangalore Division District, Karnataka
                                    </p>
                                }

                                <div className='last-datetime'>
                                    <p>26 Aug 24, 07:37:37 AM</p>
                                </div>
                            </div>

                            <div className='speedviolation-cons'>
                                <p className='speesviolation-para'>Speed : 82 km/h
                                </p>
                                <p onClick={handleshowaddress} className='speesviolation-show-add speesviolation-para'>Show Address</p>
                                {showAddress &&
                                    <p>
                                        Bengaluru - Mysuru - Mangaluru Highway, Bengaluru, Ramanagara, Bangalore Division District, Karnataka
                                    </p>
                                }

                                <div className='last-datetime'>
                                    <p>26 Aug 24, 07:37:37 AM</p>
                                </div>
                            </div>

                            <div className='speedviolation-cons'>
                                <p className='speesviolation-para'>Speed : 82 km/h
                                </p>
                                <p onClick={handleshowaddress} className='speesviolation-show-add speesviolation-para'>Show Address</p>
                                {showAddress &&
                                    <p>
                                        Bengaluru - Mysuru - Mangaluru Highway, Bengaluru, Ramanagara, Bangalore Division District, Karnataka
                                    </p>
                                }

                                <div className='last-datetime'>
                                    <p>26 Aug 24, 07:37:37 AM</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='right-graph'>
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
            </div>
            <div>
                <p className='history-table-section-topic'>Speeding - 0715 (TN75AL0715)</p>
                <div className='speeed-violation'>
                    <div className='speeed-violation-content'>
                        <p>Speed Limit :</p>
                        <TextField
                            type="number"
                            // value={value}
                            // onChange={handleChange}
                            variant="outlined"
                            // placeholder="Enter number"
                            InputProps={{
                                inputProps: { min: 0 },
                            }}
                            sx={{ width: '90px' }}
                        />
                    </div>
                    <div className='speeed-violation-content'>
                        <p>Speed Limit :</p>
                        <TextField
                            type="number"
                            // value={value}
                            // onChange={handleChange}
                            variant="outlined"
                            // placeholder="Enter number"
                            InputProps={{
                                inputProps: { min: 0 },
                            }}
                            sx={{ width: '90px' }}
                        />
                    </div>
                    <Button className='speed-violation'>Submit</Button>
                </div>
                <div className='stoppages-ischecked' >
                    <p className='no-stop-warning'>
                        <IoIosWarning />
                        No Stops available for this duration.

                    </p>
                </div>
            </div>
    </>
  )
}


export default HistorySpeedViolation;