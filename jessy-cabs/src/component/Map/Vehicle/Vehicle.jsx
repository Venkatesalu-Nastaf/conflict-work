import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./Vehicle.css";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export const Vehicle = () => {
  const [vehicleNO, setVehicleNO] = React.useState('');

  const handleChange = (event) => {
    setVehicleNO(event.target.value);
  };

  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="form-container-realtime">
        <div className="main-content-container">
          {/* <p className="head-tab-type-2-all">
            <span className="Title-Name">Real Time</span>
          </p> */}
          <div className='main-content-form'>
            <div className='vehicle-main'>
              <div className='vehicle-top-section-left'> <span>Vehicles</span> </div>
              <div className='vehicle-top-section-right'>
                <span>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Vehicle No</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vehicleNO}
                        label="Vehicle No"
                        onChange={handleChange}
                      >
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                        <MenuItem value={'TN07CC1234'}>TN07CC1234</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </span>
                <span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="From Date" />
                    </DemoContainer>
                  </LocalizationProvider>
                </span>
                <span>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="To Date" />
                    </DemoContainer>
                  </LocalizationProvider>
                </span>
                <span>
                  <Button variant="outlined">Filters</Button>
                </span>
                <span>
                  <Button variant="contained">Reports</Button>
                </span>
                <span>
                  <Button variant="contained"><FaPlus /></Button>
                </span>
              </div>
            </div>

            <div>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChangeTabs} aria-label="basic tabs example">
                    <Tab label="Vehicles" {...a11yProps(0)} />
                    <Tab label="Driving" {...a11yProps(1)} />
                    <Tab label="Running" {...a11yProps(2)} />
                    <Tab label="Fuel" {...a11yProps(3)} />
                    <Tab label="Cost" {...a11yProps(4)} />
                    <Tab label="Safety" {...a11yProps(5)} />
                    <Tab label="Vehicle Tag" {...a11yProps(6)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className='vehicle-tab-main'>
                    <div className='vehicle-tab-left-main'>
                      <div style={{ marginBottom: '20px' }}>
                        <Button variant="outlined">Sort Options</Button>
                      </div>
                      <div className='vehicle-details-section-main Scroll-Style'>
                        <div className='vehicle-details-box'>
                          <span className='vehicle-details-box-veh-no'>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div className='vehicle-details-box'>
                          <span className='vehicle-details-box-veh-no'>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div className='vehicle-details-box'>
                          <span className='vehicle-details-box-veh-no'>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div className='vehicle-details-box'>
                          <span className='vehicle-details-box-veh-no'>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div className='vehicle-details-box'>
                          <span className='vehicle-details-box-veh-no'>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div className='vehicle-details-box'>
                          <span className='vehicle-details-box-veh-no'>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                      </div>
                    </div>
                    <div className='vehicle-tab-right-main Scroll-Style'>
                      <div className='vehicle-tab-right-top-division-main'>
                        <div className='vehicle-tab-right-top-division-box'>
                          <div className='vehicle-details-box-veh-no'>TN22EB3001</div>
                          <div className='vehicle-tab-right-top-division-btn-section'>
                            <span><Button variant="outlined">Live</Button></span>
                            <span><Button variant="outlined">History</Button></span>
                            <span><Button variant="contained">View Details</Button></span>
                          </div>
                        </div>
                        <div className='vehicle-tab-right-top-division-btn-section-2'>
                          <Button variant="outlined">Jobs</Button>
                          <Button variant="outlined">Alarms</Button>
                          <Button variant="outlined">DTCs</Button>
                          <Button variant="outlined">Fuel Entry</Button>
                          <Button variant="outlined">Service Reminders</Button>
                          <Button variant="outlined">Renewable Reminders</Button>
                        </div>
                      </div>
                      <div>
                        <h3>Vehicle Cost</h3>
                        <div>
                          <h2>Vehicle Stats</h2>
                          <div className='vehicle-stats-main'>

                            <div className='vehicle-stats-box vehicle-stats-box-border'>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>0 Min</span>
                                <span>Running time</span>
                              </span>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>-</span>
                                <span>Stoppage time</span>
                              </span>
                              <span className='vehicle-stats-box-content'>
                                <span className='vehicle-stats-box-content-heading'>0</span>
                                <span>Average Speed</span>
                              </span>
                            </div>

                            <div className='vehicle-stats-box vehicle-stats-box-border'>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>INR 0</span>
                                <span>Fuel Cost</span>
                              </span>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>-</span>
                                <span>Stoppage time</span>
                              </span>
                              <span className='vehicle-stats-box-content'>
                                <span className='vehicle-stats-box-content-heading'>0</span>
                                <span>Average Speed</span>
                              </span>
                            </div>


                            <div className='vehicle-stats-box'>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                <span>Distance</span>
                              </span>

                              <span className='vehicle-stats-box-content'>
                                <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                <span>Consumption per Hour</span>
                              </span>
                            </div>
                          </div>

                          <div className='vehicle-stats-distance-box'>

                            <div className='vehicle-stats-distance-box-left'>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                <span>Distance</span>
                              </span>
                              <span className='vehicle-stats-box-content'>
                                <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                <span>Consumption per Hour</span>
                              </span>
                            </div>

                            <div className='vehicle-stats-distance-box-right'>
                              <span style={{ display: 'grid' }}>
                                <span style={{ fontSize: '25px', fontWeight: '600' }}>Transactions</span>
                                <span>No data found</span>
                              </span>
                            </div>
                          </div>

                          <div className='vehicle-stats-graph-main'>
                            <div className='vehicle-stats-graph-left'>
                              <span style={{ display: 'grid' }}>
                                <span style={{ fontSize: '25px', fontWeight: '600' }}>Graph</span>
                                <span>No data found</span>
                              </span>
                            </div>

                            <div className='vehicle-stats-graph-right'>
                              <div>
                                <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                  <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                  <span>Distance</span>
                                </span>
                                <span className='vehicle-stats-box-content'>
                                  <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                  <span>Consumption per Hour</span>
                                </span>
                              </div>
                              <div>
                                <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                  <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                  <span>Distance</span>
                                </span>
                                <span className='vehicle-stats-box-content'>
                                  <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                  <span>Consumption per Hour</span>
                                </span>
                              </div>
                            </div>

                          </div>

                          <div className='vehicle-stats-fuel-cost-main'>

                            <div className='vehicle-stats-fuel-cost-box'>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                <span>Distance</span>
                              </span>
                              <span className='vehicle-stats-box-content'>
                                <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                <span>Consumption per Hour</span>
                              </span>
                            </div>

                            <div className='vehicle-stats-fuel-cost-box'>
                              <span className='vehicle-stats-box-content vehicle-stats-box-content-border-bottom'>
                                <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                <span>Distance</span>
                              </span>
                              <span className='vehicle-stats-box-content'>
                                <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                <span>Consumption per Hour</span>
                              </span>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  Item 4
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                  Item 5
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                  Item 6
                </CustomTabPanel>
                <CustomTabPanel value={value} index={6}>
                  Item 7
                </CustomTabPanel>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
