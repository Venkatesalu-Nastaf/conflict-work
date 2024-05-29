import React from 'react';
import './TripStatusMain.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import VehicleStatement from './VehicleStatement/VehicleStatement';
import TripStatus from './TripStatus/TripStatus';

const TripStatusMain = ({ stationName }) => {
    const [value, setValue] = React.useState("tripstatus");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="form-container-TripStatus">
            <div className="container-main">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box className='head-tab-tripstatus' sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Trip Status" value="tripstatus" />
                                <Tab label="VehicleStatement" value="vehicleStatement" />
                            </TabList>
                        </Box>
                        <TabPanel value="tripstatus"><TripStatus stationName={stationName} /></TabPanel>
                        <TabPanel value="vehicleStatement"><VehicleStatement /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default TripStatusMain