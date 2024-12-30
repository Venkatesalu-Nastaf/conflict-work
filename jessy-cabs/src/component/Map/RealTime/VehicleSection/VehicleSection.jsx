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
import { useNavigate } from 'react-router-dom';
import useDetailsVehicle from './useDetailsVehicle';

import "./VehicleSection.css"


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

  const { setOpenHistoryDrawer, setOpenmessage, setOpenshare, setOpenDriverModify, setHistoryLocation, setOpenAddTag, setOpendetailsDrawer, setOpen,vehicleListData,setVehicleListData,
    vehicleSearchDetails,setVehicleSearchDetails
   } = useContext(PermissionContext)
  const { vehiclesData } = useDetailsVehicle()

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
  const toggleDrawer = (open,vehno) => (event) => {
    console.log(vehno,"vehnooo");
    
    setVehicleSearchDetails(vehno)
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
  const navigate = useNavigate();
  const handleOpenHistoryDrawer = () => {
    // setOpenHistoryDrawer(true);
    navigate("/home/Map/History");

  };

  const handleClickOpenAddTag = () => {
    setOpenAddTag(true);
  };

  const handleOpenhistoryLocation = () => {
    setHistoryLocation(true);
  };
  const filteredVehicles = vehiclesData?.filter((vehicle) => {
    return (
      vehicle.vehRegNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.stations?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.fueltype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <div className='vehicle-section'>
        <div className='vehicle-inputs'>
          <div className='inputs-width'>
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
                sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0px 10px 0px', }}
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
                sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0px 10px 0px', height: "50px" }}
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bike">Bike</MenuItem>
                <MenuItem value="truck">Truck</MenuItem>
              </TextField>
            )}
          </div>
          <div className='buttons-width'>
            <ToggleButtonGroup
              value={selectedOption}
              exclusive
              onChange={handleToggleChange}
              aria-label="text alignment"
              sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
            >
              <ToggleButton value="Vehicle" aria-label="Vehicle" sx={{ margin: '0px', borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", height: "35px", padding: '10px', border: '1px solid #0078d4', fontSize: "13px", fontWeight: "500", color: "#0078d4 !important" }}>
                Vehicle
              </ToggleButton>
              <ToggleButton value="Location" aria-label="Location" sx={{ margin: '0px', borderTopRightRadius: "10px", borderBottomRightRadius: "10px", height: "35px", padding: '10px', border: '1px solid #0078d4', fontSize: "13px", fontWeight: "500", color: "#0078d4 !important" }}>
                Location
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {selectedOption === 'Vehicle' && (
          
          <div className='vehicle-details' style={{height:"400px", overflow:"auto"}} >
            <div className="vehicle-indiduals">
              { filteredVehicles?.map((li)=>(
<>
              <div className='vehicle-indiduals-cards' onClick={toggleDrawer(true,li?.vehRegNo)}>
                <div className='vehicle-indiduals-cards-width' >
                  <div className='vehicle-indiduals-cards'>
                    <h3 className='heading-three ' onClick={toggleDrawer(true,li?.vehRegNo)}>{li?.vehRegNo}</h3>
                    <div className='location-icon'>
                      <FaLocationArrow className='white-text' />
                    </div>
                  </div>

                  <div className='flex-class margins'>
                    <p className='indidual-para text-color' onClick={toggleDrawer(true)}>Group: chennai</p>
                    <p className='flex-class indidual-para driver-para text-color' onClick={toggleDrawer(true)}> <span>Driver: {li?.driverName}</span> <span onClick={handleClickOpenDriverModify}>< FiUpload /></span></p>
                  </div>

                  <div className='flex-class margins'>
                    <p className='flex-class indidual-para ' onClick={toggleDrawer(true)}> <span>< GoClock /></span><span className='text-warning'>15m</span></p>
                    <p className='indidual-para driver-para text-warning' onClick={toggleDrawer(true)}>2.5 km</p>
                    <p className='indidual-para driver-para text-color' onClick={toggleDrawer(true)}>speed: <span className='text-warning'>25 km/h</span></p>
                  </div>
                  <p className='indidual-para margins' onClick={toggleDrawer(true)}> <span><CiLocationOn /></span> <span>5-7, Sholinganallur Main Road, Sholinganallur, Chennai, Kanchipuram, TamilNadu</span></p>
                  <p className='indidual-para margins vehicle-nearest-address' onClick={toggleDrawer(true)} > NEAREST ADDRESS: 21 km from JESSY CABS ( Office )</p>
                  <div className='vehicle-indiduals-cards'>
                    <p className='indidual-para margins' onClick={toggleDrawer(true)}> <span><GiPathDistance /></span> <span className='not-on-job-vehicle-info'>Not On Job</span></p>
                    <div className='call-share-message'>
                      <div className="call-icon">
                        <a href="tel:+4733378901"><IoCall className='white-text' /></a>
                      </div>
                      <div className="share-icon" onClick={handleClickOpenshare}>
                        <BsFillShareFill className='white-text' />

                      </div>
                      <div className="message-icon" onClick={handleClickOpenMessage}>
                        <BiSolidMessageRounded className='white-text' />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='last-row-buttons'  style={{marginBottom:"10px"}} >
                <button className='bottom-buttons' onClick={handleOpenHistoryDrawer}>History</button>
                <button className='bottom-buttons' onClick={handleOpendetailsDrawer}>Details</button>
                <button className='bottom-buttons' onClick={handleClickOpenAddTag}>Add Tag</button>
                <button className='bottom-buttons' onClick={handleOpenhistoryLocation}>History Location</button>
              </div>
              </>
                            ))

            }

            </div>

          </div>

        )}
        {selectedOption === 'Location' && (
          <div className='flex-class between' >
            <div>
              <p>KM Radius for</p>
              <p className="Search-Location" >Search Location/Nearby (KM)50</p>
            </div>
            <div className='flex-class'>
              <input type="number" name="" id="" className='location-input' />
              <Button className='location-button-border' >Apply</Button>
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