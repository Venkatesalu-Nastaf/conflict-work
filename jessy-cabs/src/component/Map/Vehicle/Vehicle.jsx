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


import Driving from "./Driving/Driving";
import Running from "./Running/Running";
import Fuel from "./Fuel/Fuel";
import Cost from './Cost/Cost';
import Safety from './Safety/Safety';
import VehicleTag from './VehicleTag/VehicleTag';

import { TextField } from "@mui/material";
import Switch from '@mui/material/Switch';

import Menu from '@mui/material/Menu';
import Vehicles from './Vehicles/Vehicles';

import { useNavigate, Link, useLocation, } from "react-router-dom";

import { CiFilter } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';






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


  const [openFilter, setOpenFilter] = React.useState(false);

  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [checkedDeletedVehicles, setCheckedDeletedVehicles] = React.useState(true);

  const handleChangeSwitchDeletedVehicles = (event) => {
    setCheckedDeletedVehicles(event.target.checked);
  };

  const [checkedRemovedVehicles, setCheckedRemovedVehicles] = React.useState(true);

  const handleChangeSwitchRemovedVehicles = (event) => {
    setCheckedRemovedVehicles(event.target.checked);
  };

  const [checkedCurrentTransporter, setCheckedCurrentTransporter] = React.useState(true);

  const handleChangeSwitchCurrentTransporter = (event) => {
    setCheckedCurrentTransporter(event.target.checked);
  };




  const [anchorElReoprts, setAnchorElReoprts] = React.useState(null);
  const openReoprts = Boolean(anchorElReoprts);
  const openReports = (event) => {
    setAnchorElReoprts(event.currentTarget);
  };
  const closeReoprts = () => {
    setAnchorElReoprts(null);
  };

  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const openPlusMenu = Boolean(anchorElMenu);
  const openMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorElMenu(null);
  };

  const navigate = useNavigate();

  const navigateAddVehicle = () => {
    navigate("/home/Map/Vehicle/AddVehicle");
  }


  const [valuedetailstabs, SetValuedetailstabs] = React.useState('1');

  const handleChangedetailstabs = (event, newValue) => {
    SetValuedetailstabs(newValue);
  };


  return (
    <>
      <div className="form-container-realtime">
        <div className="main-content-vehicle">
          <p className="head-tab-type-2-all">
            <span className="Title-Name">VEHICLES</span>
          </p>
          <div className='vehicle-main-content-form'>
            <div className='vehicle-main'>
              {/* <div className='vehicle-top-section-left'> <span>Vehicles</span> </div> */}
              <div className='vehicle-top-section-right'>
                <span>
                  <Box sx={{ minWidth: 200 }}>
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
                  <Button variant="outlined" onClick={handleClickOpenFilter}><CiFilter className='btn-icon' /> Filters</Button>
                </span>

                <span>
                  <div>
                    <Button variant="contained" onClick={openReports}><IoDownloadOutline className='btn-icon' /> Reports</Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorElReoprts}
                      open={openReoprts}
                      onClose={closeReoprts}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={closeReoprts}>All Summary Vehicles</MenuItem>
                      <MenuItem onClick={closeReoprts}>Vehicles Details Report</MenuItem>
                      <MenuItem onClick={closeReoprts}>Vehicle PnL Report</MenuItem>
                      <MenuItem onClick={closeReoprts}>Vehicle Tag Report</MenuItem>
                      <MenuItem onClick={closeReoprts}>Day Wise Report</MenuItem>
                      <MenuItem onClick={closeReoprts}>Night Driving</MenuItem>
                      <MenuItem onClick={closeReoprts}>Sim Tracking Report</MenuItem>
                      <MenuItem onClick={closeReoprts}>Vehicle Performance Report</MenuItem>
                    </Menu>
                  </div>
                </span>
                <span>

                  <div>
                    <Button variant="contained" onClick={openMenu}><FaPlus /></Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorElMenu}
                      open={openPlusMenu}
                      onClose={closeMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={navigateAddVehicle}>Add Vehicles</MenuItem>
                      <MenuItem onClick={closeMenu}>Vehicles Details Report</MenuItem>
                      <MenuItem onClick={closeMenu}>Vehicle PnL Report</MenuItem>
                      <MenuItem onClick={closeMenu}>Vehicle Tag Report</MenuItem>
                      <MenuItem onClick={closeMenu}>Day Wise Report</MenuItem>
                      <MenuItem onClick={closeMenu}>Night Driving</MenuItem>
                      <MenuItem onClick={closeMenu}>Sim Tracking Report</MenuItem>
                      <MenuItem onClick={closeMenu}>Vehicle Performance Report</MenuItem>
                    </Menu>
                  </div>
                </span>
              </div>
            </div>



            <React.Fragment>
              <Dialog
                open={openFilter}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseFilter}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  <div>Filters</div>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <div>
                      <div className='edit-driver-details-div'>
                        <Button variant='contained'>Filter By Tags</Button>
                      </div>
                      <div className='vehicles-filter-division'>
                        <Box sx={{ minWidth: 320 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
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
                      </div>

                      <div className='vehicles-filter-division'>
                        <Box sx={{ minWidth: 320 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Vehicle Make</InputLabel>
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
                      </div>

                      <div className='vehicles-filter-division'>
                        <Box sx={{ minWidth: 320 }}>
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
                      </div>

                      <div className='vehicles-filter-division'>
                        <Box sx={{ minWidth: 320 }}>
                          <TextField
                            size="small"
                            name="advancepaidtovendor"
                            className='full-width'
                            value=''
                            // onChange={handleChange}
                            // onChange={(e) => {
                            //   handleChange(e)
                            //   setVendorinfodata({ ...vendorinfo, vendor_advancepaidtovendor: e.target.value })
                            // }}
                            label="Search Device"
                            id="advance-paid-to-vendor"
                            autoComplete="password"
                          />
                        </Box>
                      </div>

                      <div className='vehicles-filter-division'>
                        <Box sx={{ minWidth: 320 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Vehicle Ownership</InputLabel>
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
                      </div>

                      <div className='vehicles-filter-division'>
                        <Box sx={{ minWidth: 320 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Transporter</InputLabel>
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
                      </div>

                      <div className='vehicles-filter-division'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Switch
                            checked={checkedDeletedVehicles}
                            onChange={handleChangeSwitchDeletedVehicles}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          <span>Show Deleted Vehicles</span>
                        </div>
                      </div>

                      <div className='vehicles-filter-division'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Switch
                            checked={checkedRemovedVehicles}
                            onChange={handleChangeSwitchRemovedVehicles}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          <span>Show Removed Vehicles</span>
                        </div>
                      </div>

                      <div className='vehicles-filter-division'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Switch
                            checked={checkedCurrentTransporter}
                            onChange={handleChangeSwitchCurrentTransporter}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          <span>Current Transporter</span>
                        </div>
                      </div>


                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' onClick={handleCloseFilter}>Update</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>




          </div>

          {/* <div >
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
                <Vehicles />

              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>

                <Driving />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>

                <Running />

              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>

                <Fuel />

              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>

                <Cost />

              </CustomTabPanel>
              <CustomTabPanel value={value} index={5}>

                <Safety />

              </CustomTabPanel>
              <CustomTabPanel value={value} index={6}>

                <VehicleTag />

              </CustomTabPanel>
            </Box>
          </div> */}
          {/* <div style={{ padding: "20px", zoom: "90%" }}> */}
            <Box sx={{ width: '100%', typography: 'body1',padding:"20px" }}>
              <TabContext value={valuedetailstabs}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChangedetailstabs} aria-label="lab API tabs example">
                    <Tab label="Vehicles" value="1" />
                    <Tab label="Driving" value="2" />
                    <Tab label="Running" value="3" />
                    <Tab label="Fuel" value="4" />
                    <Tab label="Cost" value="5" />
                    <Tab label="Safety" value="6" />
                    <Tab label="Vehicle Tag" value="7" />
                  </TabList>
                </Box>
                <TabPanel value="1" >
                  <Vehicles />
                </TabPanel>

                <TabPanel value="2" >
                  <Driving />
                </TabPanel>

                <TabPanel value="3" >
                  <Running />
                </TabPanel>

                <TabPanel value="4" >
                  <Fuel />
                </TabPanel>

                <TabPanel value="5" >
                  <Cost />
                </TabPanel>

                <TabPanel value="6" >
                  <Safety />
                </TabPanel>

                <TabPanel value="7" >
                  <VehicleTag />
                </TabPanel>


              </TabContext>
            </Box>
          {/* </div> */}

        </div>
      </div>
    </>
  )
}
