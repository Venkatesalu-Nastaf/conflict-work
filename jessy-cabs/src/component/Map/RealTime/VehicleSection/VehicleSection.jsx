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
import VehicleInformationDrawer from "./VehicleInformationDrawer/VehicleInformationDrawer";
import VehcileSectionDrawer from './vehicleSectionDrawer/VehicleSectionDrawer';
import { useNavigate } from 'react-router-dom';
import useDetailsVehicle from './useDetailsVehicle';
import { VehicleMapData } from '../../vehicleMapContext/vehcileMapContext';
import "./VehicleSection.css"
import axios from 'axios';
import { APIURL } from '../../../url';

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



const VehicleSection = ({ allVehicleList, vehicleCurrentLocation, todayVehicle }) => {

  const { setOpenHistoryDrawer, setOpenmessage, setOpenshare, setOpenDriverModify, setHistoryLocation, setOpenAddTag, setOpendetailsDrawer, setOpen, vehicleListData, setVehicleListData,
    vehicleSearchDetails, setVehicleSearchDetails
  } = useContext(PermissionContext)
  const { vehiclesData } = useDetailsVehicle()
  const { jessyCabsDistance, vehcilecurrentAddress, hover, setHover } = VehicleMapData()
  const [selectedOption, setSelectedOption] = useState('Vehicle');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [selectValue, setSelectedValue] = useState(false);
  const [vehNo, setVehNo] = useState(null);

  //Tripid search state
  const [isTripid, setIsTripid] = useState(false);
  const [tripStatusMessage, setTripStatusMessage] = useState('');
  const [isStatusError, setIsStatusError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState(null);
  const [reached, setReached] = useState('')



  const handleToggleChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsTripid(false);
    setReached('')
    setTripStatusMessage('');
    setIsStatusError(false)
  };

  // const handleKeyDown =(event)=>{

  //   if(event.key === 'Enter'){
  //     setIsTripid(true)
  //   }
  // }
  // console.log(searchTerm,"kkwwwwwwwwwwwwwwwwww")
  const apiUrl = APIURL
  const handleKeyDown = async (event) => {
    // console.log(searchTerm,"kkkjjjjjjjjjjjjjjjjjjjj")
    if(!searchTerm){
      return;
    }
    if (event.key === 'Enter') {
      setIsTripid(true);
      try {
        const response = await axios.get(`${apiUrl}/tripStatus/${searchTerm}`);
        const status = response.data.status;
        // console.log("TripStatus:", status);
        setReached(status)
        // console.log(reached,"reachedghj");
        setTripStatusMessage(`Trip Status: ${status}`);
        setSuccess(true);
      } catch (error) {
        // console.error("Error", error);
        setTripStatusMessage("Trip ID not found or error occurred.");
        setIsStatusError(true);
        setReached('')
      }
    }
  };



  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };
  const [vehicleOpenDrawer, setVehicleOpenDrawer] = useState(false)
  const handleClose = () => {
    setVehicleOpenDrawer(false)
  }
  //vehicle section drawer
  const toggleDrawer = (open, vehno) => (event) => {
    // console.log(vehno, "vehnooo");

    setVehicleSearchDetails(vehno);
    setVehNo(vehno)
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setOpen(open);
    setVehicleOpenDrawer(true)
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
  // const filteredVehicles = allVehicleList?.filter((vehicle) => {
  //   return (
  //     vehicle.vehRegNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vehicle.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vehicle.stations?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vehicle.fueltype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vehicle.vehicleName?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });
  const filteredVehicles = Array.isArray(allVehicleList)
    ? allVehicleList?.filter((vehicle) => {
      if (isTripid) {
        return vehicle.tripids?.some((id) =>
          id.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return (
        vehicle.vehRegNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.stations?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.fueltype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vehicleName?.toLowerCase().includes(searchTerm.toLowerCase())
        // vehicle.tripid?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    : [];
  const hybrid = localStorage.getItem("SuperAdmin")
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
                onKeyDown={handleKeyDown}
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
            {tripStatusMessage && (
              <p style={{ color: isStatusError ? 'red' : 'green', margin: '5px 0 0 10px', fontSize: '14px' }}>
                {tripStatusMessage}
              </p>
            )}
          </div>


          {hybrid === "Hybrid_Customer" ? (
            <>
            </>
          ) : (
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
          )}
        </div>
        {/* {console.log(active ,reached !== "Reached",reached ,"kkkk")} */}
        {selectedOption === 'Vehicle' && (

          <div className='vehicle-details' style={{ height: "400px", overflow: "auto" }} >
            <div className="vehicle-indiduals">
              {filteredVehicles?.map((li, index) => (
                <>
                  <div className={`vehicle-indiduals-cards ${active === index && reached !== "Reached" ? 'hovered-card' : ''}`}
                    // onMouseEnter={() => console.log('Hovered:', li)}
                    onMouseEnter={() => {
                      if (reached !== "Reached") {
                        setHover(li);
                        setActive(index)
                      }else if(reached === "Reached"){
                        setHover(null)
                        setActive(null);
                        
                      }else{
                         setHover(li);
                        setActive(index)           
                      }
                    }}
                    onMouseLeave={() => {
                     
                        setHover(null)
                        setActive(null);
                     
                    }}
                    onClick={toggleDrawer(true, li?.vehRegNo)}>
                    <div className='vehicle-indiduals-cards-width' >
                      <div className='vehicle-indiduals-cards'>
                        <h3 className='heading-three ' onClick={toggleDrawer(true, li?.vehRegNo)}>{li?.vehRegNo}</h3>
                        <div className='location-icon'>
                          <FaLocationArrow className='white-text' />
                        </div>
                      </div>

                      <div className='flex-class margins'>
                        <p className='indidual-para text-color' onClick={toggleDrawer(true)}>Group: {li?.stations}</p>
                        <p className='flex-class indidual-para driver-para text-color' onClick={toggleDrawer(true)}> <span>Driver: {li?.driverName}</span> <span onClick={handleClickOpenDriverModify}>< FiUpload /></span></p>
                      </div>

                      <div className='flex-class margins'>
                        <p className='flex-class indidual-para ' onClick={toggleDrawer(true)}> <span>< GoClock /></span><span className='text-warning'>15m</span></p>
                        <p className='indidual-para driver-para text-warning' onClick={toggleDrawer(true)}>2.5 km</p>
                        <p className='indidual-para driver-para text-color' onClick={toggleDrawer(true)}>speed: <span className='text-warning'>25 km/h</span></p>
                      </div>
                      <p className='indidual-para margins' onClick={toggleDrawer(true)}> <span><CiLocationOn /></span> <span></span></p>
                      <p className='indidual-para margins vehicle-nearest-address' onClick={toggleDrawer(true)} > NEAREST ADDRESS: {jessyCabsDistance} km from JESSY CABS ( Office )</p>
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


                  {/* {hybrid === "Hybrid_Customer" ? (
                    <></>
                  ) : (
                    <div className='last-row-buttons' style={{ marginBottom: "10px" }} >
                      <button className='bottom-buttons' onClick={handleOpenHistoryDrawer}>History</button>
                      <button className='bottom-buttons' onClick={handleOpendetailsDrawer}>Details</button>
                      <button className='bottom-buttons' onClick={handleClickOpenAddTag}>Add Tag</button>
                      <button className='bottom-buttons' onClick={handleOpenhistoryLocation}>History Location</button>
                    </div>
                  )} */}
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
      {/* <VehicleInformationDrawer /> */}
      <VehcileSectionDrawer open={vehicleOpenDrawer} handleClose={handleClose} vehicleCurrentLocation={vehicleCurrentLocation} vehNo={vehNo} todayVehicle={todayVehicle} />
      <ShareIconPopup />
      <MessageIconPopup />
    </>
  )
}
export default VehicleSection;