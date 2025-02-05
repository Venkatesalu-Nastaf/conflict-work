import React from 'react';
import './AgreementMain.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
// import Employe from './Employe/Employe';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Agreement from './Agreement/Agreement';

const AgreementMain = ({organizationNames}) => {
    const [value, setValue] = React.useState("agreement");

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
                                <Tab label="Agreement" value="agreement" />
                            </TabList>
                        </Box>
                        <TabPanel value="agreement"><Agreement organizationNames={organizationNames} /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

export default AgreementMain