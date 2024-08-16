import React from 'react'

import './AddVehicle.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Details from './Details/Details';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Specification from './Specification/Specification';
import EngineTransmission from './EngineTransmission/EngineTransmission';

const AddVehicle = () => {
    const [value, setValue] = React.useState("details");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="form-container-BillingMain">
            <div className="main-content-container">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: 'auto' }} className="head-tab-all">
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Details" value="details" />
                                <Tab label="Specification" value="specification" />
                                <Tab label="Engine & Transmission" value="engineTransmission" />
                            </TabList>
                        </Box>
                        <TabPanel value="details"><Details /></TabPanel>
                        <TabPanel value="specification"><Specification /></TabPanel>
                        <TabPanel value="engineTransmission"><EngineTransmission /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default AddVehicle
