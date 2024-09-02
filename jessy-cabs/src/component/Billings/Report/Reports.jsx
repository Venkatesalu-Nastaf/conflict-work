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
import { PendingBills } from './pendingBills/PendingBills';
import  VendorStatement  from './VendorStatement/VendorStatement';
import  VehicleStatement  from './VehicleStatement/VehicleStatement';
// import zIndex from '@mui/material/styles/zIndex';
// import { ReportData } from './Context/ReportContext';
// import { ReportData } from './Context/ReportContext';
export const Reports = ({ stationName }) => {
    const [value, setValue] = React.useState("MonthlyWise");
    //  const {value, setValue} = ReportData()
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
                                <Tab label="Monthly Wise" className='tab-content' value="MonthlyWise" />
                                <Tab label="GST Reports" className='tab-content' value="GSTReports" />
                                <Tab label="Billed wise Receipt" className='tab-content' value="BilledwiseReceipt" />
                                <Tab label="Pending Bills" className='tab-content' value="Pendingbills" />
                                <Tab label="Vendor Statement" className='tab-content' value="VendorStatement" />
                                <Tab label="Vehicle Statement" className='tab-content' value="VehicleStatement" />
                            </TabList>
                        </Box>
                        {/* <TabPanel value="Reports"></TabPanel> */}
                        <TabPanel value="MonthlyWise"><MonthlyWise /></TabPanel>
                        <TabPanel value="GSTReports"><GstReport /></TabPanel>
                        <TabPanel value="BilledwiseReceipt"><BillWiseReceipt stationName={stationName} /></TabPanel>
                        <TabPanel value="Pendingbills"><PendingBills /></TabPanel>
                        <TabPanel value="VendorStatement"><VendorStatement /></TabPanel>
                        <TabPanel value="VehicleStatement"><VehicleStatement /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}

// export default Reports