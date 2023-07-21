import React from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchRate from './SearchRate/SearchRate';
import PackageRateEntery from './PackageRateEntery/PackageRateEntery';
import RateCopy from './RateCopy/RateCopy';
import MonthlyRate from './MonthlyRate/MonthlyRate';
import BataRateEntry from './BataRateEntry/BataRateEntry';

const RateManagement = () => {

  const [value, setValue] = React.useState("SearchRate");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="form-container-ratetype">
      <div className="container-main">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Search Rate" value="searchrate" />
                <Tab label="Package Rate Entery" value="packagerateentery" />
                <Tab label="Rate Copy" value="ratecopy" />
                <Tab label="Monthly Rate" value="monthlyrate" />
                <Tab label="BataRate Entry" value="batarateentry" />
              </TabList>
            </Box>
            <TabPanel value="searchrate"><SearchRate /></TabPanel>
            <TabPanel value="packagerateentery"><PackageRateEntery /></TabPanel>
            <TabPanel value="ratecopy"><RateCopy /></TabPanel>
            <TabPanel value="monthlyrate"><MonthlyRate/></TabPanel>
            <TabPanel value="batarateentry"><BataRateEntry/></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default RateManagement