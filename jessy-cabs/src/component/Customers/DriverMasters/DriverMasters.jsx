import React from 'react';
import './DriverMasters.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MasterEnter from './MasterEnter/MasterEnter';
import AppUserList from './AppUserList/AppUserList';

const DriverMasters = () => {

    const [value, setValue] = React.useState("masterentry");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="form-container-drivermaster">
                <div className="container-main">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Master Entry" value="masterentry" />
                                    <Tab label="App USer List" value="appuserlist" />
                                </TabList>
                            </Box>
                            <TabPanel value="masterentry"><MasterEnter /></TabPanel>
                            <TabPanel value="appuserlist"><AppUserList /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div >
        </>
    )
}

export default DriverMasters