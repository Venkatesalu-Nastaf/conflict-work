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
            <div style={{ display: 'flex' }}>
              <div style={{ width: '37%' }}> <span style={{ fontSize: '25px', fontWeight: '600' }}>Vehicles</span> </div>
              <div style={{ display: 'flex', width: '63%', alignItems: 'center', gap: '0px 20px' }}>
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
                  <div style={{ paddingTop: '20px', display: 'flex' }}>
                    <div style={{ width: '25%' }}>
                      <div style={{ marginBottom: '20px' }}>
                        <Button variant="outlined">Sort Options</Button>
                      </div>
                      <div style={{ height: '80vh', overflow: 'auto' }}>
                        <div style={{ display: 'grid', width: 'fit-content', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                          <span style={{ fontWeight: '600' }}>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div style={{ display: 'grid', width: 'fit-content', padding: '20px', border: '1px solid #ccc', marginTop: '20px', borderRadius: '5px' }}>
                          <span style={{ fontWeight: '600' }}>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div style={{ display: 'grid', width: 'fit-content', padding: '20px', border: '1px solid #ccc', marginTop: '20px', borderRadius: '5px' }}>
                          <span style={{ fontWeight: '600' }}>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div style={{ display: 'grid', width: 'fit-content', padding: '20px', border: '1px solid #ccc', marginTop: '20px', borderRadius: '5px' }}>
                          <span style={{ fontWeight: '600' }}>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div style={{ display: 'grid', width: 'fit-content', padding: '20px', border: '1px solid #ccc', marginTop: '20px', borderRadius: '5px' }}>
                          <span style={{ fontWeight: '600' }}>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                        <div style={{ display: 'grid', width: 'fit-content', padding: '20px', border: '1px solid #ccc', marginTop: '20px', borderRadius: '5px' }}>
                          <span style={{ fontWeight: '600' }}>TN22EB3001</span>
                          <span><span>Group: </span><span>Chennai</span></span>
                          <span><span>Driver: </span><span>Christopher (+91-8142535698)</span></span>
                          <span>2023 mahindra reva | CNG | car</span>
                          <span>Add Tag</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: '75%' }}>
                      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontWeight: '600' }}>TN22EB3001</div>
                          <div style={{ display: 'flex', gap: '0px 15px' }}>
                            <span><Button variant="outlined">Live</Button></span>
                            <span><Button variant="outlined">History</Button></span>
                            <span><Button variant="contained">View Details</Button></span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '0px 15px', marginTop: '20px' }}>
                          <Button variant="outlined">Jobs</Button>
                          <Button variant="outlined">Alarms</Button>
                          <Button variant="outlined">DTCs</Button>
                          <Button variant="outlined">Fuel Entry</Button>
                          <Button variant="outlined">Service Reminders</Button>
                          <Button variant="outlined">Renewable Reminders</Button>
                        </div>
                      </div>
                      <div>
                        <span style={{ fontWeight: '600' }}>Vehicle Cost</span>
                        <div>
                          <span>Vehicle Stats</span>
                          <div>
                            <div style={{display: 'grid', width: 'fit-content', textAlign: 'center'}}>
                              <span style={{display: 'grid'}}>
                                <span>0 Min</span>
                                <span>Running time</span>
                              </span>
                              <span style={{display: 'grid'}}>
                                <span>-</span>
                                <span>Stoppage time</span>
                              </span>
                              <span style={{display: 'grid'}}>
                                <span>0</span>
                                <span>Average Speed</span>
                              </span>
                            </div>
                            <div></div>
                            <div></div>
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
