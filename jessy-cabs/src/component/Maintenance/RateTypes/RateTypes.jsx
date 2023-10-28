import React from 'react'
import './RateTypes.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RateType from './RateType/RateType';
import Ratevalidity from './Ratevalidity/Ratevalidity';
import Division from './Division/Division';


const RateTypes = () => {

  const [value, setValue] = React.useState("ratetype");

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
                <Tab label="RateType" value="ratetype" />
                <Tab label="Ratevalidity" value="ratevalidity" />
                <Tab label="Division" value="division" />
              </TabList>
            </Box>
            <TabPanel value="ratetype"><RateType/></TabPanel>
            <TabPanel value="ratevalidity"><Ratevalidity/></TabPanel>
            <TabPanel value="division"><Division /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default RateTypes