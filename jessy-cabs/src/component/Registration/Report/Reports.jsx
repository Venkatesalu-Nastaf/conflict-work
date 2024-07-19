import React from 'react';
// import './Reports.css';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
// import Employe from './Employe/Employe';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { GstReport } from './GST_Report/GstReport';
import { BillWiseReceipt } from './Billwised_receipt/BillWiseReceipt';
import MonthlyWise from './Monthly_Wise/MonthlyWise';
import SelectedSales from './Selected_Sales/SelectedSales';
// import zIndex from '@mui/material/styles/zIndex';

export const Reports = ({ stationName }) => {
    const [value, setValue] = React.useState("GST Reports");

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
                            <Tab label="GST Reports" className='tab-content' value="GST Reports" />
                            <Tab label="Billed wise Receipt" className='tab-content' value="Billed wise Receipt" />
                            <Tab label="Monthly Wise" className='tab-content' value="Monthly Wise" />
                            <Tab label="Selected Sales" className='tab-content' value="Selected Sales" />
                            </TabList>
                        </Box>
                        {/* <TabPanel value="Reports"></TabPanel> */}
                        <TabPanel value="GST Reports"><GstReport /></TabPanel>
                        <TabPanel value="Billed wise Receipt"><BillWiseReceipt stationName={stationName} /></TabPanel>
                        <TabPanel value="Monthly Wise"><MonthlyWise /></TabPanel>
                        <TabPanel value="Selected Sales"><SelectedSales /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

// export default Reports