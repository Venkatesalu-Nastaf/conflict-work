import React, { useState } from "react";
import "./RealTime.css";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import HeaderDetails from "./HeaderDetails/HeaderDetails";
import VehicleSection from "./VehicleSection/VehicleSection";
import GoogleMapFile from "./MapSectionArea/GoogleMapFile";
import OSMap from "./MapSectionArea/OSMap";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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

export const RealTime = ({ allVehicleList, vehicleCurrentLocation ,todayVehicle}) => {
  const [selectMap, setSelectMap] = useState("OSMap");

  // Handle Select Change
  const handleChange = (event) => {
    setSelectMap(event.target.value);
  };

  return (
    <>
      <div className="form-container-realtime">
        <div className="main-content-realtime">
          <div className="main-content-form">
            <div style={{ position: "relative", height: "55px", width: "100%" }}>
              <HeaderDetails />
            </div>
            <div style={{display:"flex"}}>
                       <VehicleSection allVehicleList={allVehicleList} vehicleCurrentLocation={vehicleCurrentLocation} todayVehicle={todayVehicle} />

            <div className="main-body-container">
            {/* <VehicleSection allVehicleList={allVehicleList} /> */}
              <Select
                labelId="map-select-label"
                id="map-select"
                value={selectMap}
                onChange={handleChange}
                displayEmpty
                style={{ marginBottom: "10px", width: "150px" }}
              >
                <MenuItem value="OSMap">OSMap</MenuItem>
                <MenuItem value="GoogleMap">Google Map</MenuItem>
              </Select>

              {selectMap === "OSMap" &&
                <OSMap vehicleCurrentLocation={vehicleCurrentLocation} todayVehicle={todayVehicle} /> }
                {selectMap === "GoogleMap" &&
                <GoogleMapFile vehicleCurrentLocation={todayVehicle} />}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
