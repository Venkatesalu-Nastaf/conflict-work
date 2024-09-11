import React from 'react'
import "./RealTime.css"
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import HeaderDetails from "./HeaderDetails/HeaderDetails";
import VehicleSection from "./VehicleSection/VehicleSection";
import MapSection from "./MapSection/MapSection"
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

export const RealTime = () => {

  return (
    <>
      <div className="form-container-realtime">
        <div className="main-content-realtime">
          <div className='main-content-form'>
            <div style={{position:"relative", height:"55px", width:"100%"}}>
            <HeaderDetails />

            </div>
            <div className='main-body-container'>
              <VehicleSection />
              <MapSection />
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
