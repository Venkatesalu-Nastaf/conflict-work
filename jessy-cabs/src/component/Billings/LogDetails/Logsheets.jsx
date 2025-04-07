import React from 'react';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
// import Employe from './Employe/Employe';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import LogDetails from './LogDetails/LogDetails';

const LogSheets = ({organizationNames}) => {
    const [value, setValue] = React.useState("logDetails");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="form-container-Emplyes">
            <div className="main-content-container">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="head-tab-all" >
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Log Details" className='tab-content' value="logDetails" />
                            </TabList>
                        </Box>
                         <TabPanel value="logDetails"><LogDetails /></TabPanel>
                         <LogDetails />
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default LogSheets