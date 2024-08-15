import React, { useState, useContext } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import { ToggleButton, ToggleButtonGroup, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FiUpload } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsFillShareFill } from "react-icons/bs";
import { BiSolidMessageRounded } from "react-icons/bi";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import HistoryDrawer from "./HistoryDrawer/HistoryDrawer"
import MessageIconPopup from "./MessageIconPopup/MessageIconPopup"
import ShareIconPopup from "./ShareIconPopup/ShareIconPopup"
import { PermissionContext } from "../../../context/permissionContext";
import ModifyDriver from "./ModifyDriver/ModifyDriver"
import HistoryLocationModal from "./HistoryLocationModal/HistoryLocationModal"
import AddTags from "./AddTags/AddTags"
import Detailsvehicle from "./Detailsvehicle/Detailsvehicle"
import VehicleInformationDrawer from "./VehicleInformationDrawer/VehicleInformationDrawer"





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



const VehicleSection = () => {


  const {  setOpenHistoryDrawer,  setOpenmessage,  setOpenshare,  setOpenDriverModify,  setHistoryLocation,  setOpenAddTag, setOpendetailsDrawer,  setOpen } = useContext(PermissionContext)

  const [selectedOption, setSelectedOption] = useState('Vehicle');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };



  //vehicle section drawer


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };




  const handleClickOpenDriverModify = () => {
    setOpenDriverModify(true);
  };


  const handleClickOpenshare = () => {
    setOpenshare(true);
  };


  const handleClickOpenMessage = () => {
    setOpenmessage(true);
  };




  // details drawer
  const handleOpendetailsDrawer = () => {
    setOpendetailsDrawer(true);
  };


  // history drawer
  const handleOpenHistoryDrawer = () => {
    setOpenHistoryDrawer(true);
  };

  const handleClickOpenAddTag = () => {
    setOpenAddTag(true);
  };

  const handleOpenhistoryLocation = () => {
    setHistoryLocation(true);
  };

  return (
    <>
      <div className='vehicle-section'>
        <div style={{ display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "center", }}>
          <div style={{ width: "70%" }}>
            {selectedOption === 'Vehicle' && (
              <TextField
                variant="outlined"
                placeholder="Search vehicles/Groups..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ display: 'flex', justifyContent: 'center', margin: '20px', marginLeft: "0px" }}
              />
            )}

            {selectedOption === 'Location' && (
              <TextField
                select
                variant="outlined"
                label="Search for Locations"

                placeholder="Search for Locations..."
                value={dropdownValue}
                onChange={handleDropdownChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ display: 'flex', justifyContent: 'center', margin: '20px', marginLeft: "0px" }}
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bike">Bike</MenuItem>
                <MenuItem value="truck">Truck</MenuItem>
              </TextField>
            )}
          </div>
          <div style={{ width: "20%" }}>
            <ToggleButtonGroup
              value={selectedOption}
              exclusive
              onChange={handleToggleChange}
              aria-label="text alignment"
              sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
            >
              <ToggleButton value="Vehicle" aria-label="Vehicle" sx={{ margin: '0px', borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", height: "35px" }}>
                Vehicle
              </ToggleButton>
              <ToggleButton value="Location" aria-label="Location" sx={{ margin: '0px', borderTopRightRadius: "10px", borderBottomRightRadius: "10px", height: "35px" }}>
                Location
              </ToggleButton>
            </ToggleButtonGroup>

          </div>
        </div>
        {selectedOption === 'Vehicle' && (
          <div className='vehicle-details' onClick={toggleDrawer(true)}>


            <div className="vehicle-indiduals">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 className='heading-three '>1544115144444</h3>
                    <div className='location-icon' >
                      <FaLocationArrow style={{ color: "#fff" }} />
                    </div>
                  </div>

                  <div className='flex-class margins'>
                    <p className='indidual-para text-color'>Group: chennai</p>
                    <p className='flex-class indidual-para driver-para text-color'> <span>Driver: Sekar</span> <span onClick={handleClickOpenDriverModify}>< FiUpload /></span></p>
                  </div>

                  <div className='flex-class margins'>
                    <p className='flex-class indidual-para '> <span>< GoClock /></span><span className='text-warning'>15m</span></p>
                    <p className='indidual-para driver-para text-warning'>2.5 km</p>

                    <p className='indidual-para driver-para text-color'>speed: <span className='text-warning'>25 km/h</span></p>
                  </div>
                  <p className='indidual-para margins'> <span><CiLocationOn /></span> <span>5-7, Sholinganallur Main Road, Sholinganallur, Chennai, Kanchipuram, TamilNadu</span></p>
                  <p className='indidual-para margins' style={{ color: "rgb(85, 85, 85)", fontWeight: "600" }}> NEAREST ADDRESS: 21 km from JESSY CABS ( Office )</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p className='indidual-para margins' > <span><GiPathDistance /></span> <span style={{ color: "#0078d4", fontWeight: "700" }}>Not On Job</span></p>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div className="call-icon">
                        <a href="tel:+4733378901"><IoCall style={{ color: "#fff" }} /></a>


                      </div>
                      <div className="share-icon" onClick={handleClickOpenshare}>
                        <BsFillShareFill style={{ color: "#fff" }} />

                      </div>
                      <div className="message-icon" onClick={handleClickOpenMessage}>
                        <BiSolidMessageRounded style={{ color: "#fff" }} />

                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className='last-row-buttons'>
                <button className='bottom-buttons' onClick={handleOpenHistoryDrawer}>History</button>
                <button className='bottom-buttons' onClick={handleOpendetailsDrawer}>Details</button>
                <button className='bottom-buttons' onClick={handleClickOpenAddTag}>Add Tag</button>
                <button className='bottom-buttons' onClick={handleOpenhistoryLocation}>History Location</button>
              </div>

            </div>



          </div>

        )}
        {selectedOption === 'Location' && (
          <div className='flex-class' style={{ justifyContent: "space-between" }}>
            <div>
              <p>KM Radius for</p>
              <p style={{ margin: "0px" }}>Search Location/Nearby (KM)50</p>
            </div>
            <div className='flex-class'>
              <input type="number" name="" id="" style={{ width: "50px" }} />
              <Button style={{ border: "1px solid #1976d2" }}>Apply</Button>
            </div>
          </div>
        )}

      </div>

      <Detailsvehicle />
      <HistoryDrawer />
      <HistoryLocationModal />
      <AddTags />
      <ModifyDriver />
      <VehicleInformationDrawer />
      <ShareIconPopup />
      <MessageIconPopup />

    </>
  )
}
export default VehicleSection;