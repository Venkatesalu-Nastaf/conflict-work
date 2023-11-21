import React from 'react'
import './QuickBill.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import GroupBilling from './GroupBilling/GroupBilling';
import GroupPrinting from './GroupPrinting/GroupPrinting';

const QuickBill = () => {
    const [value, setValue] = React.useState("groupbilling");
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div className="form-container-QuickBill">
        <div className="container-main">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Group Bill" value="groupbilling" />
                  <Tab label="Group Printing" value="GroupPrinting" />
                </TabList>
              </Box>
              <TabPanel value="groupbilling"><GroupBilling /></TabPanel>
              <TabPanel value="GroupPrinting"><GroupPrinting /></TabPanel>
            </TabContext>
          </Box>
         
        </div>
      </div >
    )
  }

export default QuickBill