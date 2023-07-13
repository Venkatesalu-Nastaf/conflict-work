import React from 'react';
import './Collecteds.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Collected from './Collected/Collected';
import OtherOptions from './OtherOptions/OtherOptions';
import NRK from './NRK/NRK';
const Collecteds = () => {

    const [value, setValue] = React.useState("collected");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="form-container-collected">
                <div className="container-main">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Collected" value="collected" />
                                    <Tab label="Others Options" value="othersoptions" />
                                    <Tab label="NRK" value="nrk" />
                                </TabList>
                            </Box>
                            <TabPanel value="collected"><Collected/></TabPanel>
                            <TabPanel value="othersoptions"><OtherOptions/></TabPanel>
                            <TabPanel value="nrk"><NRK/></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div >
        </>
    )
}

export default Collecteds