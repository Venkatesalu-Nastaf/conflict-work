import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const SensorAndTracking = () => {

  const [sensortabs, SetSensortabs] = React.useState('1');

  const handleSensortabs = (event, newValue) => {
    SetSensortabs(newValue);
  };

  return (
    <>
      <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={sensortabs}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleSensortabs} aria-label="lab API tabs example">
                <Tab label="Device Details" value="1" />
                <Tab label="Fuel Sensor Details" value="2" />
                <Tab label="Temperature" value="3" />
                <Tab label="Fuel Level" value="4" />
                <Tab label="Vehicle Duty Images" value="5" />
                <Tab label="Device History" value="6" />

              </TabList>
            </Box>
            <TabPanel value="1" >
              <>
                <div style={{ border: "1px solid #ccc", padding: '20px', width: "100%", marginTop:"20px" }}>
                  <p>Device Details</p>
                  <p>Device Install Date</p>
                  <p style={{marginTop:"0px"}}>13/07/2024 2:27 PM</p>

                </div>
              </>
            </TabPanel>
            <TabPanel value="2" >
            <>
                <div style={{ border: "1px solid #ccc", padding: '20px', width: "100%", marginTop:"20px" }}>
                  <p>Fuel Sensor Details</p>
                  <p>No Active Fuel Calibration.</p>

                </div>
              </>
            </TabPanel>
            <TabPanel value="3" >
              v
            </TabPanel>

            <TabPanel value="4" >
              <>
              <div style={{padding:"20px", width:"100%"}}>
                <div style={{ border: "1px solid #91caff",  width: "100%", marginTop:"20px",  display:"flex", justifyContent:"center", width:"100%", alignContent:"center", alignItems:"center", padding:"20px" }}>
                  <p style={{color:"#91caff", margin:"0px"}}>We are improving the fuel module with a modern look and improved analytics. Click here to access. New Fuel Page</p>
                </div>
              </div>
              </>
            </TabPanel>

            <TabPanel value="5" >
              n
            </TabPanel>

            <TabPanel value="6" >
            <>            
              <div style={{padding:"20px", width:"100%"}}>
              <p>Device Details History
              </p>
                <div style={{ border: "1px solid #91caff",  width: "100%", marginTop:"20px",  display:"flex", justifyContent:"center", width:"100%", alignContent:"center", alignItems:"center", padding:"20px" }}>
                  <p style={{color:"#91caff", margin:"0px"}}>We are improving the fuel module with a modern look and improved analytics. Click here to access. New Fuel Page</p>
                </div>
              </div>
            </>
            </TabPanel>

          </TabContext>
        </Box>
      </div>
    </>
  )
}
export default SensorAndTracking;
