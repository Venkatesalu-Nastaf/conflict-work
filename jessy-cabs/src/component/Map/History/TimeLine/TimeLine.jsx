import React from 'react';
import { BiUpArrowAlt } from "react-icons/bi";
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



// for timeline tab

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const TimeLine = () => {
  // for timeline tab
  const [value, setValue] = React.useState(0);

  const handleChangetimelinetab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='history-btn-tab'>
        <div className='history-btn-tab-left'  >
          <div className='history-btn-tab-left-content'>
            <p className='stoppages-para account-summary-para'>Account Summary</p>
            <div className='account-summary-division' >
              <div>
                <div className='account-summary-division-content' >
                  <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                    <BiUpArrowAlt />
                  </span>
                </div>
                <p className='history-tab-para' >Runnings</p>

              </div>

              <div>
                <div className='account-summary-division-content'>
                  <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                    <BiUpArrowAlt />
                  </span>
                </div>
                <p className='history-tab-para'>Total Km</p>
              </div>
              <div>

                <div className='account-summary-division-content'>
                  <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                    <BiUpArrowAlt />
                  </span>
                </div>
                <p className='history-tab-para'>Alarms</p>
              </div>
            </div>

          </div>
        </div>
        <div className='history-btn-tab-left'>
          <div className='history-btn-tab-left-content pad-0'>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChangetimelinetab} aria-label="basic tabs example">
                  <Tab label="Fuel Summary" {...a11yProps(0)} />
                  <Tab label="Speed Graph" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <p>Fuel Summary
                  (Diesel)</p>
                <div className='no-fuel-warning'>
                  No fuel data available for this period.
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Item Two
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
      <div className='timeline' >
        <div></div>
        <div></div>
      </div>
      {/* <div className='history-table-section' >
                      <p className='history-table-section-topic'>History - 0703 (KA03AD0703)
                      </p>
                   

                    </div> */}
    </>
  )
}
