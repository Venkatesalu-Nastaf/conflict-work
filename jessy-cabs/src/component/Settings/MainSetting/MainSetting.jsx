import React from "react";
import "./MainSetting.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import BackUp from "./BackUp/BackUp";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FuelRate from "./FuelRate/FuelRate";
import TabContext from "@mui/lab/TabContext";
import SMSFormat from "./SMSFromat/SMSFormat";
import TaxSetting from "./TaxSetting/TaxSetting";
import YearEndProcess from "./YearEndProcess/YearEndProcess";


const MainSetting = () => {
  const [value, setValue] = React.useState("fuel_rate");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="main-setting-main">
      <div className="main-setting-form-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Fuel Rate" value="fuel_rate" />
                <Tab label="BackUp" value="Back_Up" />
                <Tab label="SMS Format" value="SMS_Format" />
                <Tab label="Year End Process" value="Year_End_Process" />
                <Tab label="Tax Setting" value="Tax_Setting" />

              </TabList>
            </Box>
            <TabPanel value="fuel_rate">
              <FuelRate />
            </TabPanel>
            <TabPanel value="Back_Up">
              <BackUp />
            </TabPanel>
            <TabPanel value="SMS_Format">
              <SMSFormat />
            </TabPanel>
            <TabPanel value="Year_End_Process">
              <YearEndProcess />
            </TabPanel>
            <TabPanel value="Tax_Setting">
              <TaxSetting />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default MainSetting;
