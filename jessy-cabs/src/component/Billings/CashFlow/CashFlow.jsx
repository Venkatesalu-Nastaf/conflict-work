import React from 'react'
import './CashFlow.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import Division from './Division/Division';
import PettyCash from './PettyCash/PettyCash';
import PayRoll from './PayRoll/PayRoll';



const CashFlow = () => {
  const [value, setValue] = React.useState("pettycash");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-pettycash">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Petty Cash" value="pettycash" />
                <Tab label="Pay Roll" value="payroll" />
                {/* <Tab label="Division" value="division" /> */}
              </TabList>
            </Box>
            <TabPanel value="pettycash"><PettyCash /></TabPanel>
            <TabPanel value="payroll"><PayRoll /></TabPanel>
            {/* <TabPanel value="division"><Division /></TabPanel> */}
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default CashFlow