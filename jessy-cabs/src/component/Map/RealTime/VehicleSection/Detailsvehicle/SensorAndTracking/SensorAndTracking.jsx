import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DataGrid } from '@mui/x-data-grid';
import "./SensorAndTracking.css"

//  for historytable
const sensorcolumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'DutyType',
    headerName: 'Driver Name',
    width: 300,
    editable: true,
  },
  {
    field: 'DutyDate',
    headerName: 'Driver Number',
    width: 300,
    editable: true,
  },
  {
    field: 'TechnicianName',
    headerName: 'Assigned From',
    width: 300,
    editable: true,
  },
  {
    field: 'Images',
    headerName: 'Assigned Till',
    width: 300,
    editable: true,
  },



];

const sensorrows = [
  { id: 1, DutyType: 'Snow', DutyDate: 'Jon', TechnicianName: 14, Images: "", },

];


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
                <div className='SensorAndTracking-tab-one'>
                  <p>Device Details</p>
                  <p>Device Install Date</p>
                  <p className='para-s-s'>13/07/2024 2:27 PM</p>

                </div>
              </>
            </TabPanel>
            <TabPanel value="2" >
              <>
                <div className='SensorAndTracking-tab-one'>
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
                <div className='SensorAndTracking-tab-four' >
                  <div className='SensorAndTracking-tab-four-content'>
                    <p className='SensorAndTracking-tab-four-content-para'>We are improving the fuel module with a modern look and improved analytics. Click here to access. New Fuel Page</p>
                  </div>
                </div>
              </>
            </TabPanel>

            <TabPanel value="5" >
              <>
                <div className='SensorAndTracking-tab-five'>


                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={sensorrows}
                      columns={sensorcolumns}
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
            </TabPanel>

            <TabPanel value="6" >
              <>
                <div className='SensorAndTracking-tab-four'>
                  <p>Device Details History</p>
                  <div className='SensorAndTracking-tab-four-content'>
                    <p className='SensorAndTracking-tab-four-content-para'>We are improving the fuel module with a modern look and improved analytics. Click here to access. New Fuel Page</p>
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
