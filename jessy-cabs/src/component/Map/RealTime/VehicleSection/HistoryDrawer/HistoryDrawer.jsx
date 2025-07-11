import React, { useState, useContext } from 'react'
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
import { PermissionContext } from "../../../../context/permissionContext";
import "./HistoryDrawer.css"


//  for historytable
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Vehicle',
    headerName: 'Vehicle',
    width: 150,
    editable: true,
  },
  {
    field: 'StartTime',
    headerName: 'Start Time',
    width: 150,
    editable: true,
  },
  {
    field: 'EndTime',
    headerName: 'End Time',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'StartLocation',
    headerName: 'Start Location',
    width: 150,
    editable: true,
  },
  {
    field: 'EndLocation',
    headerName: 'End Location',
    width: 150,
    editable: true,
  },
  {
    field: 'Distance',
    headerName: 'Distance',
    width: 150,
    editable: true,
  },
  {
    field: 'Duration',
    headerName: 'Duration',
    width: 150,
    editable: true,
  },
  {
    field: 'Mileage',
    headerName: 'Mileage',
    width: 150,
    editable: true,
  },
  {
    field: 'Fuel',
    headerName: 'Fuel',
    width: 150,
    editable: true,
  },

];

const rows = [
  { id: 1, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14, },
  { id: 2, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 3, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 4, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 5, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 6, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 7, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 8, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  { id: 9, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
];



//  for timelinetable
const columnstimeline = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Vehicle',
    headerName: 'Vehicle',
    width: 150,
    editable: true,
  },
  {
    field: 'StartTime',
    headerName: 'Start Time',
    width: 150,
    editable: true,
  },
  {
    field: 'EndTime',
    headerName: 'End Time',
    type: 'number',
    width: 150,
    editable: true,
  },

  {
    field: 'Duration',
    headerName: 'Duration',
    width: 150,
    editable: true,
  },
  {
    field: 'Location',
    headerName: 'Location',
    width: 350,
    editable: true,
  },
  {
    field: 'NearestAddress',
    headerName: 'Nearest Address',
    width: 250,
    editable: true,
  },
  {
    field: 'DistanceTravelled',
    headerName: 'Distance Travelled',
    width: 150,
    editable: true,
  }

];

const rowstimeline = [
  { id: 1, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
  { id: 2, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
  { id: 3, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
  { id: 4, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
  { id: 5, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
  { id: 6, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },

];



//  for timelinetable
const columnstripsite = [
  { field: 'id', headerName: 'ID', width: 90 },

  {
    field: 'StartTime',
    headerName: 'Start Time',
    width: 150,
    editable: true,
  },
  {
    field: 'EndTime',
    headerName: 'End Time',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'RunningTime',
    headerName: 'Running Time',
    type: 'number',
    width: 200,
    editable: true,
  },

  {
    field: 'stoptime',
    headerName: 'Stop Time',
    type: 'number',
    width: 200,
    editable: true,
  },

  {
    field: 'totalTime',
    headerName: 'Total Time',
    type: 'number',
    width: 200,
    editable: true,
  },

  {
    field: 'DistanceTravelled',
    headerName: 'Distance Travelled',
    width: 150,
    editable: true,
  },
  {
    field: 'fuelcomsumed',
    headerName: 'Total Fuel consumed',
    width: 350,
    editable: true,
  },
];

const rowstripsite = [
  { id: 1, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
  { id: 2, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
  { id: 3, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
  { id: 4, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
  { id: 5, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
  { id: 6, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
  { id: 7, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
];









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


const HistoryDrawer = () => {
  const { openHistoryDrawer, setOpenHistoryDrawer, setHistoryLocation } = useContext(PermissionContext)

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

  const handleOpenhistoryLocation = () => {
    setHistoryLocation(true);
  };

  // for timeline tab
  const [value, setValue] = React.useState(0);

  const handleChangetimelinetab = (event, newValue) => {
    setValue(newValue);
  };

  // timeline switch

  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // for trip sites dropdown 1
  const [selectedValuetripsites, setSelectedValuetripsites] = useState('');

  const handleChangetripsites1 = (event) => {
    setSelectedValuetripsites(event.target.value);
  };

  // for trip sites dropdown 2
  const [selectedValuetripsitesSelect, setSelectedValuetripsitesSelect] = useState('');

  const handleChangetripsitesSelect = (event) => {
    setSelectedValuetripsitesSelect(event.target.value);
  };

  return (
    <>
      <div>
        <Drawer
          anchor="top"
          open={openHistoryDrawer}
          onClose={handleCloseHistoryDrawer}
          PaperProps={{
            sx: { width: '100%', height: '100%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <IconButton onClick={handleCloseHistoryDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <>
              <div className='HistoryDrawer-head'>
                <div className='HistoryDrawer-top' >
                  <div className='history-heading'>
                    <IoBook className='history-topic' />
                    <h3 className='history-topic'>History</h3>

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

                    <button className='tab-btn-buttons' onClick={handleOpenhistoryLocation}>
                      <FaHistory />
                      Historical Location
                    </button>
                  </div>
                </div>
                {history &&
                  <>
                    <div className='history-btn-tab'  >
                      <div className='history-btn-tab-left'  >
                        <div className='history-btn-tab-left-content'>
                          <p className='stoppages-para account-summary-para'>Account Summary</p>
                          <div className='account-summary-division' >

                            <div>
                              <div className='account-summary-division-content' >
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p className='history-tab-para' >Runnings</p>

                            </div>


                            <div>
                              <div className='account-summary-division-content'>
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p className='history-tab-para'>Total Km</p>

                            </div>


                            <div>

                              <div className='account-summary-division-content'>
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>

                              <p className='history-tab-para'>Alarms</p>

                            </div>

                          </div>



                        </div>
                      </div>
                      <div className='history-btn-tab-left'>
                        <div className='fuel-summary-div' >
                          <p className='stoppages-para'>Fuel Summary
                            (Diesel)</p>
                          <div className='no-fuel-warning' >
                            No fuel data available for this period.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='history-table-section' >
                      <p className='history-table-section-topic'>History - 0703 (KA03AD0703)
                      </p>
                      <div className='table-div-width'>
                        <Box sx={{ height: 400, width: '100%' }}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </div>

                    </div>
                  </>
                }
                {timeline &&
                  <>
                    <div className='history-btn-tab'>
                      <div className='history-btn-tab-left'  >
                        <div className='history-btn-tab-left-content'>
                          <p className='stoppages-para account-summary-para'>Account Summary</p>
                          <div className='account-summary-division' >
                            <div>
                              <div className='account-summary-division-content' >
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p className='history-tab-para' >Runnings</p>

                            </div>

                            <div>
                              <div className='account-summary-division-content'>
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p className='history-tab-para'>Total Km</p>
                            </div>
                            <div>

                              <div className='account-summary-division-content'>
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p className='history-tab-para'>Alarms</p>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className='history-btn-tab-left'>
                        <div className='history-btn-tab-left-content pad-0'>
                          <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <Tabs value={value} onChange={handleChangetimelinetab} aria-label="basic tabs example">
                                <Tab label="Fuel Summary" {...a11yProps(0)} />
                                <Tab label="Speed Graph" {...a11yProps(1)} />
                              </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                              <p>Fuel Summary
                                (Diesel)</p>
                              <div className='no-fuel-warning'>
                                No fuel data available for this period.
                              </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                              Item Two
                            </CustomTabPanel>
                          </Box>
                        </div>
                      </div>
                    </div>
                    <div className='timeline' >
                      <div></div>
                      <div></div>
                    </div>
                  </>
                }

                {stoppages &&
                  <>
                    <div className='stoppages-border' >
                      <div className='stoppages-section' >
                        <div>
                          <p className='stoppages-para history-table-section-topic'>Stoppages - 0715 (TN75AL0715)</p>
                        </div>
                        <div className='stoppages-top-head' >
                          <p className='stoppages-para'>Only Addressbook Stops</p>
                          <Switch {...labelswitch}
                            checked={isChecked}
                            onChange={handleSwitchChange}
                          />
                          <p className='stoppages-para'>Minimum Stoppage Time</p>
                          <div className='stoppages-edit' >
                            <p className='stoppages-para'>0 mins(All Stops)</p>
                            <AiFillEdit />
                          </div>
                        </div>
                      </div>

                      {isChecked ? (
                        <div className='stoppages-ischecked'>
                          <p className='no-stop-warning' >
                            <IoIosWarning />
                            No Stops available for this duration.
                          </p>
                        </div>
                      ) : (

                        <div className='stoppages-notchecked table-div-width' >
                          <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                              rows={rowstimeline}
                              columns={columnstimeline}
                              initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 5,
                                  },
                                },
                              }}
                              pageSizeOptions={[5]}
                              disableRowSelectionOnClick
                            />
                          </Box>
                        </div>
                      )}
                    </div>
                  </>
                }

                {speedviolation &&
                  <>
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
                }


                {tripsites &&
                  <>
                    <div className='tripsites'>
                      <div className='speeed-violation'>
                        <p className='history-table-section-topic'>Trips b/w Sites - 0715 (TN75AL0715)</p>
                        <p style={{ color: "rgb(148 142 142)" }}>View trips between source and destination addresses</p>
                      </div>
                      <div>
                        <div className='stoppages-ischecked'>
                          <p className='tripsites-para'>Source</p>
                          <Box sx={{ m: 2, width: "100%" }}>
                            <FormControl fullWidth>
                              <Select
                                value={selectedValuetripsites}
                                onChange={handleChangetripsites1}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                              >

                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        <div className='stoppages-ischecked'>
                          <p className='tripsites-para'>Destination</p>
                          <Box sx={{ m: 2, width: "100%" }}>
                            <FormControl fullWidth>
                              <Select
                                value={selectedValuetripsitesSelect}
                                onChange={handleChangetripsitesSelect}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                              >

                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div>



                    </div>
                    <div className='table-div-width'>
                      <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                          rows={rowstripsite}
                          columns={columnstripsite}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          disableRowSelectionOnClick
                        />
                      </Box>
                    </div>
                  </>
                }
              </div>
            </>
          </Box>
        </Drawer>
      </div>
    </>
  )
}


export default HistoryDrawer;