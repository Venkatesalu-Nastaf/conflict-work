import React, { useState, useContext } from 'react'
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

const Detailsvehicle = () => {
  const { opendetailsDrawer, setOpendetailsDrawer } = useContext(PermissionContext)



  const handleClosedetailsDrawer = () => {
    setOpendetailsDrawer(false);
  };

  const [selectedValuesdetails, setSelectedValuesdetails] = useState([]);

  const optionsdetails = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];



  const [setValuedetailstabs, SetValuedetailstabs] = React.useState('1');

  const handleChangedetailstabs = (event, newValue) => {
    SetValuedetailstabs(newValue);
  };



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


                <div style={{ display: "flex", gap: "20px", borderBottom: "1px solid #000000" }}>
                  <p>Vehicle Information</p>
                  <p>Vehicle - Driver History</p>
                  <p>Reminders & Records</p>
                  <p>Sensors & Tracking</p>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={setValuedetailstabs}>
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
                                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width:"40%" }}>
                                    <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                      0
                                    </h5>
                                    <p style={{ margin: "0px" }}>Alerts</p>
                                  </div>

                                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" , width:"40%"}}>
                                    <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                      0
                                    </h5>
                                    <p style={{ margin: "0px" }}>
                                      DTC's</p>
                                  </div>

                                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" , width:"40%"}}>
                                    <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                      0
                                    </h5>
                                    <p style={{ margin: "0px" }}>Service Cost</p>
                                  </div>


                                </div>
                              </div>


                              {/* <div className='card-report' >
                                <p>Fuel</p>
                                <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap:"5px" }}>
                                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                      0
                                    </h5>
                                    <p style={{ margin: "0px" }}>Fuel Consumption (lts)</p>
                                  </div>

                                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                      0
                                    </h5>
                                    <p style={{ margin: "0px" }}>Sec. Fuel Consumption</p>
                                  </div>

                                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <h5 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "0px" }}>
                                      0
                                    </h5>
                                    <p style={{ margin: "0px" }}>Fuel Cost (INR/km)</p>
                                  </div>


                               

                                  



                                </div>
                              </div> */}

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




                            </div>
                          </div>
                        </>
                      </TabPanel>
                      <TabPanel value="2" >
                        <p>aaaaaaaaaaaaaaa</p>

                      </TabPanel>
                      <TabPanel value="3" >
                        <p>aaaaaaaaaaaaaaa</p>

                      </TabPanel>

                    </TabContext>
                  </Box>
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