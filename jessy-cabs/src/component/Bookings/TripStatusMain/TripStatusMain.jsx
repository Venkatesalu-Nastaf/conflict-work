import React, { useState, useContext } from 'react';
import './TripStatusMain.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TripStatus from './TripStatus/TripStatus';
import OverviewDrawer from './OverviewDrawer/OverviewDrawer';
import Button from "@mui/material/Button";
// import Box from '@mui/material/Box';
import { PermissionContext } from "../../context/permissionContext";


// import VendorStatement from './VendorStatement/VendorStatement';
// import VehicleStatement from './VehicleStatement/VehicleStatement';

const TripStatusMain = ({ stationName, customer, vehicleNo }) => {
    const { isDrawerOpen, setIsDrawerOpen } = useContext(PermissionContext)

    const [value, setValue] = React.useState("tripstatus");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleopendrawer = () => {
        setIsDrawerOpen(true);
    }

    return (
        <>

            <div className="form-container-TripStatus">

                <div className="main-content-container">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box className='head-tab-all' sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Trip Status" value="tripstatus" />
                                    <Button onClick={handleopendrawer} style={{ color: "#746b6b" }}>Overview</Button>
                                    {/* <Tab label="Vehicle Statement" value="VehicleStatement" /> */}
                                </TabList>
                            </Box>
                            <TabPanel value="tripstatus"><TripStatus stationName={stationName} customer={customer} vehicleNo={vehicleNo} /> </TabPanel>
                            {/* <TabPanel value="vendorStatement"><VendorStatement /></TabPanel> */}
                            {/* <TabPanel value="VehicleStatement"><VehicleStatement /></TabPanel> */}

                        </TabContext>
                    </Box>
                </div>

            </div >
            <div>
                <OverviewDrawer stationName={stationName} customer={customer} vehicleNo={vehicleNo} />
            </div>
        </>

    )
}

export default TripStatusMain