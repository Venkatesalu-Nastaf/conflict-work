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
              <div style={{ padding: "0px 30px 30px 30px" }}>
                <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "80px", alignItems: "center", justifyContent: "space-around" }}>
                    <div>
                      <p>0349 (TN07CT0349)</p>
                      <p>2019 TOYOTA ETIOS</p>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <p>Driver:</p>
                        <p>SEKAR </p>
                        <p>
                          <MdOutlineFileUpload />
                        </p>
                      </div>
                    </div>
                    <div>
                      <p style={{ display: "flex", gap: "5px" }}>
                        <span>Status:</span>
                        <span>Active</span>
                      </p>

                      <p style={{ display: "flex", gap: "5px" }}>
                        <span>Type:</span>
                        <span>Car</span>
                      </p>

                      <p style={{ display: "flex", gap: "5px" }}>
                        <span>Fuel:</span>
                        <span>Diesel</span>
                      </p>
                    </div>

                    <div>
                      <p style={{ display: "flex", gap: "5px" }}>
                        <span>Group:</span>
                        <span>Chennai</span>
                      </p>

                      <p style={{ display: "flex", gap: "5px" }}>
                        <span>Euro Class:</span>
                        <span>BHARAT STAGE IV</span>
                      </p>

                      <p style={{ display: "flex", gap: "5px" }}>
                        <span>PUCC Expiry Date:</span>
                        <span>2024-03-16</span>
                      </p>
                    </div>


                  </div>
                  <div>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "space-around" }}>
                      <button style={{}}>
                        <FaPlus />
                      </button>


                      <button style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <IoTimer />
                        Live
                      </button>


                      <button style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <IoTimer />
                        History
                      </button>


                      <button style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <IoTimer />
                        Alarms
                      </button>


                      <button style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <IoTimer />
                        DTCs
                      </button>


                      <button style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                        <IoTimer />
                        edit
                      </button>
                    </div>
                    <div>
                      <Box sx={{ width: 300 }}>
                        <Autocomplete
                          multiple
                          options={optionsdetails}
                          value={selectedValuesdetails}
                          onChange={(event, newValue) => {
                            setSelectedValuesdetails(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params}
                              placeholder="Select Options"
                              variant="outlined" />
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


                <div style={{ display: "flex", gap: "20px", borderBottom: "1px solid #000000" , marginTop:"30px"}}>
                 
                  <button onClick={handlevehicleInformation} style={{border:"none", background:"none"}}>Vehicle Information</button>
                  <button onClick={handlevehDriverHistory} style={{border:"none", background:"none"}}>Vehicle - Driver History</button>
                  <button onClick={handleremainderRecord} style={{border:"none", background:"none"}}> Reminders & Records</button>
                  <button onClick={handletrackingsensor} style={{border:"none", background:"none"}}>Sensors & Tracking</button>

                </div>
                <div style={{ marginTop: "10px" }}>

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
                            <div style={{ padding: "10px", width: "100%" }}>
                              <p>Summary</p>
                              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>


                                <div className='card-report' >
                                  <p>Running</p>
                                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                      <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                        49.8
                                      </h5>
                                      <p style={{ margin: "0px" }}>Running in KMs</p>
                                    </div>



                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                      <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                        13
                                      </h5>
                                      <p style={{ margin: "0px" }}>Running </p>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                      <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                        0
                                      </h5>
                                      <p style={{ margin: "0px" }}>% Job Utilization</p>
                                    </div>


                                  </div>
                                </div>

                                <div className='card-report' >
                                  <p>Alerts & Service</p>
                                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "40%" }}>
                                      <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                        0
                                      </h5>
                                      <p style={{ margin: "0px" }}>Alerts</p>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "40%" }}>
                                      <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                        0
                                      </h5>
                                      <p style={{ margin: "0px" }}>
                                        DTC's</p>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "40%" }}>
                                      <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                        0
                                      </h5>
                                      <p style={{ margin: "0px" }}>Service Cost</p>
                                    </div>


                                  </div>
                                </div>





                                <div className='vehicle-stats-graph-right'>

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


                                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: "15px", margin: "20px" }}>
                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>


                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>


                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>

                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>

                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>

                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>

                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>

                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>

                                  <div style={{ border: "1px solid #ccc", width: "400px", height: "300px" }}>
                                    <p>Daily Mileage (km/L)</p>

                                  </div>

                                </div>







                              </div>
                            </div>
                          </>
                        </TabPanel>
                        <TabPanel value="2" >
                          <>
                            <div style={{ width: "100%" }}>
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
                                  style={{
                                    border: "2px dotted #ccc",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "200px",
                                    cursor: "pointer"
                                  }}
                                  onClick={handleDivClick}
                                >
                                  <p>Click to Upload your photos</p>
                                </div>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  style={{ display: "none" }}
                                  onChange={handleFileChange}
                                  multiple // Allows multiple file uploads
                                />
                              </div>


                              <div style={{ border: "1px solid #ccc", marginTop: "20px" }}>
                                <div style={{ borderBottom: '1px solid #ccc', padding: "5px 5px 5px 15px" }}>
                                  <p>Images</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-around", gap: "15px" }}>
                                  <img src="" alt="" />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                                  <p>No Images Found
                                  </p>
                                </div>



                              </div>

                            </div>
                          </>
                        </TabPanel>
                        <TabPanel value="3" >
                          <>
                            <div style={{ width: "100%" }}>
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
                                  style={{
                                    border: "2px dotted #ccc",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "200px",
                                    cursor: "pointer"
                                  }}
                                  onClick={handleDivClickdocument}
                                >
                                  <p>Click to Upload your Documents</p>
                                </div>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  style={{ display: "none" }}
                                  onChange={handleFileChangedocument}
                                  multiple // Allows multiple file uploads
                                />
                              </div>


                              <div style={{ border: "1px solid #ccc", marginTop: "20px" }}>
                                <div style={{ borderBottom: '1px solid #ccc', padding: "5px 5px 5px 15px" }}>
                                  <p>Documents</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-around", gap: "15px" }}>
                                  <p></p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
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
                    <VehicleDriverHistory/>
                  }

                  {remainderRecord &&
                  <RemainderAndRecord/>
                  }

                  {trackingsensor && 
                     <SensorAndTracking/>

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