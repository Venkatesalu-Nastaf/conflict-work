import React from 'react'

import './Reminders.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import ServiceReminders from './ServiceReminder/ServiceReminder';
import EntityReminder from './EntityReminder/EntityReminder';
import VehicleRenewalReminder from './VehicleRenewalReminder/VehicleRenewalReminder';
import ContactRenewalReminder from './ContactRenewalReminder/ContactRenewalReminder';

const Reminders = () => {
    const [value, setValue] = React.useState("serviceReminders");
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
                                <Tab label="Service Reminders" value="serviceReminders" />
                                <Tab label="Vehicle Renewal Reminders" value="vehicleRenewalReminders" />
                                <Tab label="Entity Reminders" value="entityReminders" />
                                <Tab label="Contact Renewal Reminders" value="contactRenewalReminders" />
                            </TabList>
                        </Box>
                        <TabPanel value="serviceReminders"><ServiceReminders /></TabPanel>
                        <TabPanel value="vehicleRenewalReminders"><VehicleRenewalReminder /></TabPanel>
                        <TabPanel value="entityReminders"><EntityReminder /></TabPanel>
                        <TabPanel value="contactRenewalReminders"><ContactRenewalReminder /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default Reminders
