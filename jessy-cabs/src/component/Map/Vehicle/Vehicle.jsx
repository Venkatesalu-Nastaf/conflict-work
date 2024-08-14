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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { CiEdit } from "react-icons/ci";

import Driving from "./Driving/Driving";
import Running from "./Running/Running";
import Fuel from "./Fuel/Fuel";
import Cost from './Cost/Cost';
import Safety from './Safety/Safety';
import VehicleTag from './VehicleTag/VehicleTag';





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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const Vehicle = () => {
  const [vehicleNO, setVehicleNO] = React.useState('');

  const handleChange = (event) => {
    setVehicleNO(event.target.value);
  };

  const [value, setValue] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const [openEditDriver, setOpenEditDriver] = React.useState(false);

  const handleClickOpenEditDriver = () => {
    setOpenEditDriver(true);
    setOpenAddDriver(false);
  };

  const handleCloseEditDriver = () => {
    setOpenEditDriver(false);
  };

  const [openAddDriver, setOpenAddDriver] = React.useState(false);

  const handleClickOpenAddDriver = () => {
    setOpenAddDriver(true);
    setOpenEditDriver(false);
  };

  const handleCloseAddDriver = () => {
    setOpenAddDriver(false);
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
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span><span onClick={handleClickOpenEditDriver}><CiEdit /></span></span>
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

                    <React.Fragment>
                      <Dialog
                        open={openEditDriver}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseEditDriver}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>
                          <div>Modify Driver</div>
                          <span>Add, Edit and Delete Driver</span>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            <div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Vehicle:</span>
                                <span>0642 (TN11AA0642)</span>
                              </div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Driver Name:</span>
                                <span>
                                  palani (+91-9443011846)
                                </span>
                                <span>
                                  <Button variant='outlined'>Edit</Button>
                                </span>
                              </div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Remove Driver:</span>
                                <span>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                      <DatePicker label="From Date" />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </span>
                                <span>
                                  <Button variant='contained'>Remove Driver</Button>
                                </span>
                              </div>

                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Change Driver:</span>
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
                              </div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Assigned From:</span>
                                <span>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                      <DatePicker label="From Date" />
                                    </DemoContainer>
                                  </LocalizationProvider>
                                </span>
                              </div>
                              <div>
                                <Button onClick={handleClickOpenAddDriver}>Add Driver</Button>
                              </div>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button variant='contained' onClick={handleCloseEditDriver}>Update</Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>

                    <React.Fragment>
                      <Dialog
                        open={openAddDriver}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseAddDriver}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>
                          <div>Modify Driver</div>
                          <span>Add, Edit and Delete Driver</span>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            <div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Vehicle:</span>
                                <span>0642 (TN11AA0642)</span>
                              </div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>First Name*:</span>
                                <span>
                                  <input type="text" name="" id="" />
                                </span>
                              </div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Last Name:</span>
                                <span>
                                  <input type="text" name="" id="" />
                                </span>
                              </div>
                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Mobile No*:</span>
                                <span>
                                  <input type="text" name="" id="" />
                                </span>
                              </div>


                              <div className='edit-driver-details-div'>
                                <span className='edit-driver-heading'>Group:</span>
                                <span>
                                  <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Select Group</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={vehicleNO}
                                        label="Vehicle No"
                                        onChange={handleChange}
                                      >
                                        <MenuItem value={'Chennai'}>Chennai</MenuItem>
                                        <MenuItem value={'Bangalore'}>Bangalore</MenuItem>
                                        <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
                                        <MenuItem value={'Goa'}>Goa</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </span>
                              </div>

                              <div>
                                <Button onClick={handleClickOpenEditDriver}>Select Existing Driver</Button>
                              </div>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button variant='contained' onClick={handleCloseAddDriver}>Update</Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
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
                  <div>
                    <Driving></Driving>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div>
                    <Running></Running>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                  <div>
                    <Fuel></Fuel>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                  <div>
                    <Cost></Cost>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                  <div>
                    <Safety></Safety>
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={6}>
                  <div>
                    <VehicleTag></VehicleTag>
                  </div>
                </CustomTabPanel>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
