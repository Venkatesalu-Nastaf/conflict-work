import React from 'react';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import VendorInvoice from './Invoice/VendorInvoice';
import VendorPayment from './Payment/VendorPayment';
import "./PaymentVendor.css"

export const PaymentVendor = ({ stationName }) => {
    const [value, setValue] = React.useState("Invoice");
    //  const {value, setValue} = ReportData()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="form-container-vendor">
            <div className="main-content-container">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="head-tab-all" >
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Invoice" className='tab-content' value="Invoice" />
                                <Tab label="Payment" className='tab-content' value="Payment" />
                            </TabList>
                        </Box>
                        {/* <TabPanel value="Reports"></TabPanel> */}
                        <TabPanel value="Invoice"><VendorInvoice /></TabPanel>
                        <TabPanel value="Payment"><VendorPayment /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div >
    )
}


