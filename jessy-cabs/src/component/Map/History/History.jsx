import React, { useState, useContext, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindow, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import NavigationIcon from '@mui/icons-material/Navigation';

import { Drawer } from '@mui/material';
import { IoBook } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaList } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoStop } from "react-icons/io5";
import { IoSpeedometerSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import { DataGrid } from '@mui/x-data-grid';
import { AiFillEdit } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from "@mui/material";
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
// import { PermissionContext } from "../../../../context/permissionContext";
import { PermissionContext } from "../../context/permissionContext";
import HistoryLocationModal from "../RealTime/VehicleSection/HistoryLocationModal/HistoryLocationModal"
import './History.css'
import HistoryTab from './HistoryTab/HistoryTab';
import { TimeLine } from './TimeLine/TimeLine';
import HistoryStopages from './HistoryStopages/HistoryStopages';
import HistorySpeedViolation from './HistorySpeedViolation/HistorySpeedViolation';
import HistoryTripSites from './HistoryTripSites/HistoryTripSites';



const Historystates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
];

const Historynumbers = [
  51551518445, 4555555555, 5555451211, 5517777,
];


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const labelswitch = { inputProps: { 'aria-label': 'Size switch demo' } };


// for timeline tab

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const History = () => {


  const { openHistoryDrawer, setOpenHistoryDrawer, setHistoryLocation } = useContext(PermissionContext);

  const handleCloseHistoryDrawer = () => {
    setOpenHistoryDrawer(false);
  };

  // history state select
  const [selectHistoryState, setSelectHistoryState] = useState('');

  const handleHistoryState = (event) => {
    setSelectHistoryState(event.target.value);
  };

  // history number select
  const [selectHistorynumber, setSelectHistorynumber] = useState('');

  const handleHistorynumber = (event) => {
    setSelectHistorynumber(event.target.value);
  };

  // start and end date 
  const [selectedDatehistory, setSelectedDatehistory] = useState(null);

  const handleDateChangehistory = (newValue) => {
    setSelectedDatehistory(newValue);
  };

  const [timeline, SetTimeline] = useState(false);
  const opentimelineTab = () => {
    SetHistory(false);
    SetTimeline(true);
    SetSpeedviolation(false)
    SetStoppages(false);
    SetTripsites(false);

  }

  const [stoppages, SetStoppages] = useState(false);
  const openstoppagesTab = () => {
    SetHistory(false);
    SetTimeline(false);
    SetStoppages(true);
    SetTripsites(false);
    SetSpeedviolation(false);


  }

  // for history
  const [history, SetHistory] = useState(true);
  const openhistoryTab = () => {
    SetHistory(true);
    SetTimeline(false);
    SetStoppages(false);
    SetSpeedviolation(false);
    SetTripsites(false);
  }

  const [speedviolation, SetSpeedviolation] = useState(false);
  const openspeedviolationTab = () => {
    SetHistory(false);
    SetTimeline(false);
    SetStoppages(false);
    SetSpeedviolation(true);
    SetTripsites(false);

  }

  const [tripsites, SetTripsites] = useState(false);
  const opentripsitesTab = () => {
    SetHistory(false);
    SetTimeline(false);
    SetStoppages(false);
    SetSpeedviolation(false);
    SetTripsites(true);
  }

  const handleOpenhistoryLocationhistory = () => {
    setHistoryLocation(true);
    console.log(setHistoryLocation, "setHistoryLocation");
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

 

  // Check if Google Maps API is loaded
  // if (!isLoaded) return <div>Loading...</div>;



  return (
    <>
      <div className="form-container-realtime">
        <div className="main-content-history">
          <p className="head-tab-type-2-all">
            <span className="Title-Name">HISTORY</span>
          </p>
          <div className='main-content-form'>



            <>
              <div className='HistoryDrawer-head'>
                <div className='HistoryDrawer-top' >
                  <div className='history-heading'>
                    <IoBook className='history-topic' />
                    <h3 className='history-topic'>HISTORY</h3>

                  </div>
                  <div className='history-head-buttons' >
                    <FormControl sx={{ m: 0, width: 200 }}>
                      <Select
                        value={selectHistoryState}
                        onChange={handleHistoryState}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select a state</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Select a state</em>
                        </MenuItem>
                        {Historystates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ m: 0, width: 200 }}>
                      <Select
                        value={selectHistorynumber}
                        onChange={handleHistorynumber}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select a number</em>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Select a number</em>
                        </MenuItem>
                        {Historynumbers.map((number) => (
                          <MenuItem key={number} value={number}>
                            {number}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>


                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box sx={{ m: 0 }}>
                        <DatePicker
                          label="Select Date"
                          value={selectedDatehistory}
                          onChange={handleDateChangehistory}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              fullWidth
                              style={{
                                height: '40px', // Adjust height as needed
                                '& input': {
                                  height: '100%', // Ensure input takes full height
                                  padding: '8px 14px', // Adjust padding if needed
                                },
                              }}
                              InputProps={{
                                style: {
                                  height: '100%', // Ensure input takes full height
                                },
                              }}
                            />

                          }
                        />
                      </Box>
                    </LocalizationProvider>

                    <button className='history-drawer-report-btn' ><TbReportSearch />Reports
                      <RiArrowDropDownLine />
                    </button>

                  </div>

                </div>
                <div className='history-tabs'>
                  <div className='history-tabs-row'>
                    <button className={`tab-btn-buttons ${history ? 'history-present' : ''}`} onClick={openhistoryTab}>
                      <FaList />
                      History
                    </button>

                    <button className={`tab-btn-buttons ${timeline ? 'timeline-present' : ''}`} onClick={opentimelineTab}>
                      <FaBookOpen />
                      Timeline
                    </button>

                    <button className={`tab-btn-buttons ${stoppages ? 'stoppages-present' : ''}`} onClick={openstoppagesTab}>
                      <IoStop />
                      Stoppages
                    </button>
                    <button className={`tab-btn-buttons ${speedviolation ? 'speedviolation-present' : ''}`} onClick={openspeedviolationTab}>
                      <IoSpeedometerSharp />
                      speed Violation
                    </button>

                    <button className={`tab-btn-buttons ${tripsites ? 'history-present' : ''}`} onClick={opentripsitesTab}>
                      <FaRegEye />
                      Trips b/w Sites
                    </button>

                    <button className='tab-btn-buttons' onClick={handleOpenhistoryLocationhistory}>
                      <FaHistory />
                      Historical Location
                    </button>
                  </div>
                </div>
                {history &&
                  <>
                    <HistoryTab/>
                  </>
                }
                {timeline &&
                  <>
                    <TimeLine/>
                  </>
                }

                {stoppages &&
                  <>
                    <HistoryStopages/>
                  </>
                }

                {speedviolation &&
                  <>
                    <HistorySpeedViolation/>
                  </>
                }


                {tripsites &&
                  <>
                    <HistoryTripSites/>
                  </>
                }
              </div>
            </>

          </div>
        </div>
      </div>

      <HistoryLocationModal />



    </>
  )
}
export default History;
