import React from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Accountinfo from './Account_Info/Accountinfo.jsx';
import Vehicaleinfo from './Vehicale_Info/Vehicaleinfo.jsx';
import DriverCreation from './DriverCreation/DriverCreation.jsx';
import "./Suppliers.css"
const Suppliers = ({ stationName }) => {
    const [value, setValue] = React.useState("accounting_info");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="form-container">
            <div className="container-main">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="head-tab">
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Accounting Info" className='tab-content' value="accounting_info" />
                                <Tab label="Vehicle Info" className='tab-content' value="vehicle_info" />
                                <Tab label="Driver Info" className='tab-content' value="driverinfo" />
                            </TabList>
                        </Box>
                        <TabPanel value="accounting_info"><Accountinfo /></TabPanel>
                        <TabPanel value="vehicle_info"><Vehicaleinfo stationName={stationName} /></TabPanel>
                        <TabPanel value="driverinfo"><DriverCreation stationName={stationName} /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default Suppliers