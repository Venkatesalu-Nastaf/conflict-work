import React from 'react'
import './CoveringBill.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import GroupBilling from './GroupBilling/GroupBilling';
import CoveringSubmit from './CoveringSubmit/CoveringSubmit';

const CoveringBill = ({ Statename,stationName, organizationNames }) => {
  const [value, setValue] = React.useState("groupbilling");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="form-container-CoveringBill">
      <div className="main-content-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box className='head-tab-all' sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Group Billing" value="groupbilling" />
                <Tab label="Covering Submit" value="coveringsubmit" />
              </TabList>
            </Box>
            <TabPanel value="groupbilling"><GroupBilling stationName={stationName} organizationNames={organizationNames} /></TabPanel>
            <TabPanel value="coveringsubmit"><CoveringSubmit stationName={stationName} Statename={Statename} organizationNames={organizationNames} /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default CoveringBill