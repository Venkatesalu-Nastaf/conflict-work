import React from 'react';
import './Dispatcheds.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Dispatched from './Dispatched/Dispatched';
import VehicleStatement from './VehicleStatement/VehicleStatement';

const Dispatcheds = () => {
    const [value, setValue] = React.useState("dispatched");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="form-container-dispatched">
            <div className="container-main">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Trip Status" value="dispatched" />
                                <Tab label="VehicleStatement" value="vehicleStatement" />
                            </TabList>
                        </Box>
                        <TabPanel value="dispatched"><Dispatched /></TabPanel>
                        <TabPanel value="vehicleStatement"><VehicleStatement /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default Dispatcheds