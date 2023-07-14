import React from 'react'
import './Receiveds.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Received from './Received/Received';
import Sumbited from './Sumbited/Sumbited';
import Pending from './Pending/Pending';

const Receiveds = () => {
    const [value, setValue] = React.useState("received");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="form-container-receiveds">
                <div className="container-main">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Received" value="received" />
                                    <Tab label="Submited" value="submited" />
                                    <Tab label="Pending" value="pending" />
                                </TabList>
                            </Box>
                            <TabPanel value="received"><Received /></TabPanel>
                            <TabPanel value="submited"><Sumbited /></TabPanel>
                            <TabPanel value="pending"><Pending /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div >
        </>
    )
}

export default Receiveds