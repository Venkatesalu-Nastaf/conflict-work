import React from 'react'
import './RateTypes.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RateType from './RateType/RateType';
import DriverBataRate from './DriverBataRate/DriverBataRate';
import PackageRateEntery from './PackageRateEntery/PackageRateEntery';
// import Division from './Division/Division';
import TabContext from "@mui/lab/TabContext";
// import Ratevalidity from './Ratevalidity/Ratevalidity';

const RateTypes = ({ stationName, organizationNames,vehileName }) => {

  const [value, setValue] = React.useState("ratetype");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="form-container-ratetype">
      <div className="main-content-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="head-tab-all">
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="RateType" value="ratetype" />
                <Tab label="Package Rate" value="packagerateentery" />
                {/* Dont delete this -------------------- */}
                {/* <Tab label="Driver Bata Rate" value="driverbatarate" /> */}
                {/* ---------------------------------------------------------- */}
                {/* <Tab label="Ratevalidity" value="ratevalidity" />
                <Tab label="Division" value="division" /> */}
              </TabList>
            </Box>
            <TabPanel value="ratetype"><RateType stationName={stationName} /></TabPanel>
            <TabPanel value="packagerateentery"><PackageRateEntery organizationNames={organizationNames} vehileName={vehileName} stationname={stationName}/></TabPanel>
            {/* dont delete this --------------------------- */}
            {/* <TabPanel value="driverbatarate"><DriverBataRate /></TabPanel> */}
            {/* ------------------------------------------------------------ */}
            {/* <TabPanel value="ratevalidity"><Ratevalidity /></TabPanel>
            <TabPanel value="division"><Division /></TabPanel> */}
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default RateTypes