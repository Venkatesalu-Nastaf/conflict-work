import React from "react";
import "./MainSetting.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import BackUp from "./BackUp/BackUp";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TaxSetting from "./TaxSetting/TaxSetting";
import Organization from "./Organization/Organization";

const MainSetting = ({ logoImage }) => {
  const [value, setValue] = React.useState("Organization");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="main-setting-main">
      <div className="main-setting-form-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box className='head-tab' sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Organization Details" className="tablists" value="Organization" />
                <Tab label="Tax Setting" className="tablists" value="Tax_Setting" />
                <Tab label="BackUp" className="tablists" value="Back_Up" />
              </TabList>
            </Box>
            <TabPanel value="Organization">
              <Organization logoImage={logoImage} />
            </TabPanel>
            <TabPanel value="Tax_Setting">
              <TaxSetting />
            </TabPanel>
            <TabPanel value="Back_Up" className="back-up-component">
              <BackUp />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default MainSetting;
