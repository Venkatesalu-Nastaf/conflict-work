import React, { useEffect, useState } from 'react';
import './Transfer.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TransferDataEntry from './TransferDataEntry/TransferDataEntry';
import TransferList from './TransferList/TransferList';
import TransferReport from './TransferReport/TransferReport';
import { PdfData } from './TransferReport/PdfContext';

const Transfer = ({ stationName, organizationNames }) => {

  const [value, setValue] = useState("transferlist");
  const { setBillingPage, setTransferReport } = PdfData()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      setValue(tabParam);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setBillingPage(false)
    setTransferReport(false)
    localStorage.removeItem('selectedrowcount');
    localStorage.removeItem('selectedtripsheetid');
    localStorage.removeItem('selectedcustomerdata');
  };

  return (
    <div className="form-container-Transfer">
      <div className="container-main container-main-transfer">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box className='head-tab-transfer' sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Transfer List" value="transferlist" />
                <Tab label="Data Entry" value="dataentry" />
                <Tab label="Transfer Report" value="TransferReport" />
              </TabList>
            </Box>
            <TabPanel value="transferlist"><TransferList stationName={stationName} organizationNames={organizationNames} /></TabPanel>
            <TabPanel value="dataentry"><TransferDataEntry stationName={stationName} organizationNames={organizationNames} /></TabPanel>
            <TabPanel value="TransferReport"><TransferReport stationName={stationName} /></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div >
  )
}

export default Transfer