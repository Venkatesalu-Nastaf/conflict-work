import React, { useState, useContext, useRef } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { Autocomplete, Chip } from '@mui/material';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PermissionContext } from '../../../../context/permissionContext';
import "./Detailsvehicle.css"
import { Select, MenuItem, FormControl } from '@mui/material';
import VehicleDriverHistory from "./VehicleDriverHistory/VehicleDriverHistory"
import RemainderAndRecord from "./RemainderAndRecord/RemainderAndRecord"
import SensorAndTracking from "./SensorAndTracking/SensorAndTracking"
import { useNavigate } from 'react-router-dom';



const Detailsvehicle = () => {
  const { opendetailsDrawer, setOpendetailsDrawer } = useContext(PermissionContext)
  const handleClosedetailsDrawer = () => {
    setOpendetailsDrawer(false);
  };

  const [selectedValuesdetails, setSelectedValuesdetails] = useState([]);
  const optionsdetails = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const [valuedetailstabs, SetValuedetailstabs] = React.useState('1');

  const handleChangedetailstabs = (event, newValue) => {
    SetValuedetailstabs(newValue);
  };


  const [selectedValuephotos, setSelectedValuephotos] = useState('');
  const handleChangephotos = (event) => {
    setSelectedValuephotos(event.target.value);
  };

  const [selectedValuedocument, setSelectedValuedocument] = useState('');
  const handleChangedocument = (event) => {
    setSelectedValuedocument(event.target.value);
  };

  const fileInputRef = useRef(null);
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log('Files selected:', files);
  };


  const handleDivClickdocument = () => {
    fileInputRef.current.click();
  };

  const handleFileChangedocument = (event) => {
    const files = event.target.files;
    console.log('Files selected:', files);
  };


  // vehicle imformation
  const [vehicleInformation, setVehicleInformation] = useState(true);
  const handlevehicleInformation = () => {
    setVehicleInformation(true);
    setVehDriverHistory(false);
    setRemainderRecord(false);
    setTrackingsensor(false);
  };

  // vehicle drver history
  const [vehDriverHistory, setVehDriverHistory] = useState(false);
  const handlevehDriverHistory = () => {
    setVehDriverHistory(true);
    setVehicleInformation(false);
    setRemainderRecord(false);
    setTrackingsensor(false);
  }

  // Remainder And Record
  const [remainderRecord, setRemainderRecord] = useState(false);

  // const handleremainderRecord = () => {
  //   setRemainderRecord(true);

  //     setVehDriverHistory(false);
  //     setVehicleInformation(false);
  //     setTrackingsensor(false);


  //   }
  const handleremainderRecord = () => {
    setRemainderRecord(true);
    setVehDriverHistory(false);
    setVehicleInformation(false);
    setTrackingsensor(false);
  };


  // sensor and tracking
  const [trackingsensor, setTrackingsensor] = useState(false);
  const handletrackingsensor = () => {
    setTrackingsensor(true);
    setVehDriverHistory(false);
    setVehicleInformation(false);
    setRemainderRecord(false);

  }
  const navigate = useNavigate();

  const NavigateHistory = () => {
    navigate("/home/Map/History");

  }
  return (
    <>
      <div>

        <Drawer
          anchor="top"
          open={opendetailsDrawer}
          onClose={handleClosedetailsDrawer}
          PaperProps={{
            sx: { width: '100%', height: '100%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <IconButton onClick={handleClosedetailsDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <>
              <div className='detail-drawer' >
                <div className='detail-drawer-content' >
                  <div className='detail-drawer-heading' >
                    <div>
                      <p>0349 (TN07CT0349)</p>
                      <p>2019 TOYOTA ETIOS</p>
                      <div className='driver-name-detailsvehicle' >
                        <p>Driver:</p>
                        <p>SEKAR </p>
                        <p>
                          <MdOutlineFileUpload />
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className='details-drawer-head-para'>
                        <span>Status:</span>
                        <span>Active</span>
                      </p>

                      <p className='details-drawer-head-para'>
                        <span>Type:</span>
                        <span>Car</span>
                      </p>

                      <p className='details-drawer-head-para'>
                        <span>Fuel:</span>
                        <span>Diesel</span>
                      </p>
                    </div>

                    <div>
                      <p className='details-drawer-head-para'>
                        <span>Group:</span>
                        <span>Chennai</span>
                      </p>

                      <p className='details-drawer-head-para'>
                        <span>Euro Class:</span>
                        <span>BHARAT STAGE IV</span>
                      </p>

                      <p className='details-drawer-head-para'>
                        <span>PUCC Expiry Date:</span>
                        <span>2024-03-16</span>
                      </p>
                    </div>


                  </div>
                  <div className='detail-drawer-heading-second'>
                    <div className='details-drawer-head-btn' >
                      <button >
                        <FaPlus />
                      </button>

                      <button className='details-drawer-head-para-btn'>
                        <IoTimer />
                        Live
                      </button>

                      <button className='details-drawer-head-para-btn' onClick={NavigateHistory}>
                        <IoTimer />
                        History
                      </button>

                      <button className='details-drawer-head-para-btn'>
                        <IoTimer />
                        Alarms
                      </button>

                      <button className='details-drawer-head-para-btn'>
                        <IoTimer />
                        DTCs
                      </button>

                      <button className='details-drawer-head-para-btn'>
                        <IoTimer />
                        edit
                      </button>
                    </div>
                    <div>
                      <Box
                        sx={{
                          width: {
                            xs: '100%', // 100% width on extra-small devices (e.g., phones)
                            sm: '75%',  // 75% width on small devices (e.g., tablets)
                            md: '50%',  // 50% width on medium devices (e.g., small laptops)
                            lg: '300px' // 300px width on large devices (e.g., desktops)
                          },
                          maxWidth: '100%', // Ensures the box does not exceed the viewport width
                          // margin: 'auto',  // Centers the Box horizontally
                          padding: 1 // Adds some padding around the Box
                        }}
                      >
                        <Autocomplete
                          multiple
                          options={optionsdetails}
                          value={selectedValuesdetails}
                          onChange={(event, newValue) => {
                            setSelectedValuesdetails(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Options"
                              variant="outlined"
                              fullWidth // Ensures the TextField takes up the full width of the parent Box
                            />
                          )}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                key={option}
                                label={option}
                                {...getTagProps({ index })}
                                onDelete={() => {
                                  setSelectedValuesdetails((current) =>
                                    current.filter((item) => item !== option)
                                  );
                                }}
                              />
                            ))
                          }
                        />
                      </Box>

                    </div>
                  </div>
                </div>

                <div className='details-drawer-tabs' >
                  <button onClick={handlevehicleInformation} className={`details-drawer-tabs-btn ${vehicleInformation ? 'vehicle-info-active' : ''}`} >Vehicle Information</button>
                  <button onClick={handlevehDriverHistory} className={`details-drawer-tabs-btn ${vehDriverHistory ? 'vehDriverHistory-active' : ''}`} >Vehicle - Driver History</button>
                  <button onClick={handleremainderRecord} className={`details-drawer-tabs-btn ${remainderRecord ? 'remainderRecord-active' : ''}`} > Reminders & Records</button>
                  <button onClick={handletrackingsensor} className={`details-drawer-tabs-btn ${trackingsensor ? 'trackingsensor-active' : ''}`} >Sensors & Tracking</button>
                </div>
                <div className='details-drawer-tabs-content'  >
                  {vehicleInformation &&
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                      <TabContext value={valuedetailstabs}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList onChange={handleChangedetailstabs} aria-label="lab API tabs example">
                            <Tab label="Details" value="1" />
                            <Tab label="Photos" value="2" />
                            <Tab label="Documents" value="3" />
                            {/* <Tab label="Near By" value="4" /> */}
                          </TabList>
                        </Box>
                        <TabPanel value="1" >
                          <>
                            <div className='details-drawer-first-tab'>
                              <p>Summary</p>
                              <div className='details-drawer-summary' >
                                <div className='card-report' >
                                  <p>Running</p>
                                  <div className='card-report-running'>
                                    <div className='card-report-indidual'>
                                      <h5 className='card-report-indidual-h5'>
                                        49.8
                                      </h5>
                                      <p className='card-report-indidual-p'>Running in KMs</p>
                                    </div>

                                    <div className='card-report-indidual'>
                                      <h5 className='card-report-indidual-h5'>
                                        13
                                      </h5>
                                      <p className='card-report-indidual-p'>Running </p>
                                    </div>

                                    <div className='card-report-indidual'>
                                      <h5 className='card-report-indidual-h5'>
                                        0
                                      </h5>
                                      <p className='card-report-indidual-p'>% Job Utilization</p>
                                    </div>

                                  </div>
                                </div>

                                <div className='card-report' >
                                  <p>Alerts & Service</p>
                                  <div className='card-report-alerts-services' >
                                    <div className='card-report-alerts-services-indidual'>
                                      <h5 className='card-report-indidual-h5'>
                                        0
                                      </h5>
                                      <p className='card-report-indidual-p'>Alerts</p>
                                    </div>

                                    <div className='card-report-alerts-services-indidual'>
                                      <h5 className='card-report-indidual-h5'>
                                        0
                                      </h5>
                                      <p className='card-report-indidual-p'>
                                        DTC's</p>
                                    </div>

                                    <div className='card-report-alerts-services-indidual'>
                                      <h5 className='card-report-indidual-h5'>
                                        0
                                      </h5>
                                      <p className='card-report-indidual-p'>Service Cost</p>
                                    </div>
                                  </div>
                                </div>

                                <div className='vehicle-stats-graph-right-1'>
                                  <div>
                                    <span className='vehicle-stats-box-content '>
                                      <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                      <span>Distance</span>
                                    </span>
                                    <span className='vehicle-stats-box-content'>
                                      <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                      <span>Consumption per Hour</span>
                                    </span>
                                  </div>
                                  <div>
                                    <span className='vehicle-stats-box-content '>
                                      <span className='vehicle-stats-box-content-heading'>0 Km</span>
                                      <span>Distance</span>
                                    </span>
                                    <span className='vehicle-stats-box-content'>
                                      <span className='vehicle-stats-box-content-heading'>0 Kg/Hr</span>
                                      <span>Consumption per Hour</span>
                                    </span>
                                  </div>
                                </div>

                                <div className='details-vehicle-cards'>
                                  <div className='details-vehicle-cards-content' >
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>

                                  <div className='details-vehicle-cards-content'>
                                    <p>Daily Mileage (km/L)</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        </TabPanel>
                        <TabPanel value="2" >
                          <>
                            <div className='details-vehicle-tab-2'>
                              <FormControl sx={{ minWidth: '100%' }}>
                                <Select
                                  value={selectedValuephotos}
                                  onChange={handleChangephotos}
                                  displayEmpty
                                  renderValue={(value) => (value ? value : 'Select an Image tag')} // Placeholder
                                  variant="outlined"
                                  sx={{ minWidth: '100%' }} // Ensures the Select takes up the full width of the FormControl
                                >

                                  <MenuItem value="Option 1">Option 1</MenuItem>
                                  <MenuItem value="Option 2">Option 2</MenuItem>
                                  <MenuItem value="Option 3">Option 3</MenuItem>
                                </Select>
                              </FormControl>
                              <div>
                                <div
                                  className='details-vehicle-upload-photos'
                                  onClick={handleDivClick}
                                >
                                  <p>Click to Upload your photos</p>
                                </div>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className='multiple-img-photos'
                                  onChange={handleFileChange}
                                  multiple // Allows multiple file uploads
                                />
                              </div>

                              <div className='images-section'>
                                <div className='images-section-text'>
                                  <p>Images</p>
                                </div>
                                <div className='images-section-img'>
                                  <img src="" alt="" />
                                </div>
                                <div className='images-section-no-img'>
                                  <p>No Images Found
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        </TabPanel>
                        <TabPanel value="3" >
                          <>
                            <div className='details-vehicle-tab-2'>
                              <FormControl sx={{ minWidth: '100%' }}>
                                <Select
                                  value={selectedValuedocument}
                                  onChange={handleChangedocument}
                                  displayEmpty
                                  renderValue={(value) => (value ? value : 'Select an Document Tag')} // Placeholder
                                  variant="outlined"
                                  sx={{ minWidth: '100%' }}>

                                  <MenuItem value="Option 1">Option 1</MenuItem>
                                  <MenuItem value="Option 2">Option 2</MenuItem>
                                  <MenuItem value="Option 3">Option 3</MenuItem>
                                </Select>
                              </FormControl>
                              <div>
                                <div
                                  className='details-vehicle-upload-photos'
                                  onClick={handleDivClickdocument}
                                >
                                  <p>Click to Upload your Documents</p>
                                </div>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className='multiple-img-photos'
                                  onChange={handleFileChangedocument}
                                  multiple // Allows multiple file uploads
                                />
                              </div>
                              <div className='images-section'>
                                <div className='images-section-text'>
                                  <p>Documents</p>
                                </div>
                                <div className='images-section-img'>
                                  <p></p>
                                </div>
                                <div className='images-section-no-img'>
                                  <p>No Documents Found</p>
                                </div>
                              </div>

                            </div>
                          </>
                        </TabPanel>
                      </TabContext>
                    </Box>
                  }
                  {vehDriverHistory &&
                    <VehicleDriverHistory />
                  }

                  {remainderRecord &&
                    <RemainderAndRecord />
                  }

                  {trackingsensor &&
                    <SensorAndTracking />

                  }
                </div>
              </div>
            </>
          </Box>
        </Drawer>
      </div>
    </>
  )
}


export default Detailsvehicle;