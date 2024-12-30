import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { GstReport } from './GST_Report/GstReport';
import { BillWiseReceipt } from './Billwised_receipt/BillWiseReceipt';
import MonthlyWise from './Monthly_Wise/MonthlyWise';
import { PendingBills } from './pendingBills/PendingBills';
import VendorStatement from './VendorStatement/VendorStatement';
import VehicleStatement from './VehicleStatement/VehicleStatement';
import LogDetails from './LogDetails/LogDetails';
import { ReportData } from './Context/ReportContext';
export const Reports = ({ stationName,Statename }) => {
    const { value, setValue } = ReportData()
//     const handleChange = (event, newValue) => {
//         console.log(newValue,"valueinner")
//         setValue(newValue);
//     };
//     const reports = localStorage.getItem('reports');
//     // console.log(reports,'repotrs111111111111')

// if (reports !== null) {
//     console.log(reports, 'reports');
//     setValue(reports); // Set value to the retrieved reports
// } else {
//     setValue("MonthlyWise"); // Set to the default value when reports is null
//     // localStorage.removeItem('reports'); // Correctly remove the item using the key
//     console.log(value,reports,'problem value')
// }
// let hasChanged = false; // Flag to track changes

const [hasChanged,sethasChanged] = useState(false)

const handleChange = (event, newValue) => {
    console.log(newValue, "valueinner");
    setValue(newValue);
    sethasChanged(true)
    localStorage.removeItem('reports')
 
};

// Check localStorage only if no change has been made
const reports = localStorage.getItem('reports');
// 
// if (!hasChanged) { // Only check if hasChanged is false
    if (reports !== null) {
        // console.log(reports, 'reports');
        setValue(reports); // Set value to the retrieved reports
    } else if(reports === null && !hasChanged) {
        setValue("MonthlyWise"); // Set to the default value when reports is null
        // console.log("Default value set:", value);
        // console.log(hasChanged,'chagned')
    }
// }

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
                                <Tab label="Log Details" className='tab-content' value="logDetails" />
                            </TabList>
                        </Box>
                        <TabPanel value="MonthlyWise"><MonthlyWise /></TabPanel>
                        <TabPanel value="GSTReports"><GstReport stationName={stationName}  Statename={Statename} /></TabPanel>

                        <TabPanel value="BilledwiseReceipt"><BillWiseReceipt stationName={stationName} /></TabPanel>
                        <TabPanel value="Pendingbills"><PendingBills /></TabPanel>
                        <TabPanel value="VendorStatement"><VendorStatement /></TabPanel>
                        <TabPanel value="VehicleStatement"><VehicleStatement /></TabPanel>
                        <TabPanel value="logDetails"><LogDetails /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}