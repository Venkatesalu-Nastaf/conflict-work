import React, { useState, useEffect } from "react";
import { useData } from "../../MainDash/Sildebar/DataContext2";
import axios from "axios";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";
import { Sidebardata } from "./Sidebar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";


// ICONS
import { useUser } from "../../../form/UserContext";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";
// import { FaChevronDown } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { GrSettingsOption } from "react-icons/gr";
import { FaCodeBranch } from "react-icons/fa6";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { BiBuildings } from "@react-icons/all-files/bi/BiBuildings";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { GiDuration } from "react-icons/gi";
import { SiMinutemailer } from "react-icons/si";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
 


import { GiReceiveMoney } from "react-icons/gi";
import { MdGroup } from "react-icons/md";
import { MdGroupRemove } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";

import { APIURL } from "../../../url";

const MenuItem = ({
  label,
  to,
  value,
  alt,
  menuItemKey,
  name,
  isActive,
  handleMenuItemClick,
  icon: Icon,
  dropdownItems = [],
}) => {
  return (
    // <Link
    //   className={isActive(value) ? "menuItem active" : "menuItem"}
    //   to={to}
    //   onClick={() => handleMenuItemClick(menuItemKey, name, alt)}
    // >
    //   <Icon />
    //   <span>{label}</span>
    // </Link>
    <div className="menuItemContainer">
      <Link
        className={isActive(value) ? "menuItem active" : "menuItem"}
        to={to}
        onClick={() => handleMenuItemClick(menuItemKey, name, alt)}
      >
        <Icon />
        <span>{label}</span>
      </Link>
      {dropdownItems.length > 0 && (
        <div className='dropdownMenu'>
          {dropdownItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`dropdownMenuItem ${isActive(value) ? 'active ' : ' '}`}
              onClick={() =>
                handleMenuItemClick(item.menuItemKey, item.name, item.alt)
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {

  const apiUrl = APIURL;

  const location = useLocation();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [expanded, setExpanded] = useState(false);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {},
    "@keyframes ripple": {},
  }));

  //--------------------------to show logo-----------

  const { sharedData } = useData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedprofileImage, setSelectedprofileImage] = useState(null);
  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false);
  const [infoDropdownVisible, setInfoDropdownVisible] = useState(false);
  const [registrationDropdownVisible, setRegistrationDropdownVisible] = useState(false);

  useEffect(() => {
    setSelectedImage(sharedData)
  }, [sharedData])



  //------------------popup------------------------

  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState({});

  const hidePopup = () => {
    setSuccess(false);
    setInfo(false);
    setInfoMessage("");
  };

  useEffect(() => {
    if (info || success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info, success]);

  //end-----------------------------------

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  const isActive = (itemKey) => {
    return currentPath.includes(itemKey);
  };

  const handleSettingsClick = () => {
    setSettingsDropdownVisible(!settingsDropdownVisible);
    setInfoDropdownVisible(false)
    setRegistrationDropdownVisible(false);
    setIssettingdropdownclicked((prevExpanded) => !prevExpanded);

  };


  const handleinfoClick =()=>{
    setInfoDropdownVisible(!infoDropdownVisible);
    setSettingsDropdownVisible(false);
    setRegistrationDropdownVisible(false);
    setIsinfodropdownclicked((prevExpanded) => !prevExpanded);



  }

  const handleRegisterClick =()=>{
    setRegistrationDropdownVisible(!registrationDropdownVisible);
    setSettingsDropdownVisible(false);
    setInfoDropdownVisible(false)
    setIsRegisterdropdownclicked((prevExpanded) => !prevExpanded);



  }
  const handleRegistermenuClick =()=>{
    setRegistrationDropdownVisible(false);
 


  }

  const handleMenuItemClick = async (menuItemKey, name, alt) => {
    setSettingsDropdownVisible(false);
    setInfoDropdownVisible(false);
    setRegistrationDropdownVisible(false);


    // const currentPageName = name;
    localStorage.setItem("selectedMenuItem", menuItemKey);
    try {
      const per = true;
      if (per) {
        navigate(alt);
      } else {
        setInfo(true);
        setInfoMessage("Tthere is catch issue..");
      }
    } catch {
    }

  };

  useEffect(() => {
    const selectedMenuItem = localStorage.getItem("selectedMenuItem");
    const selectedItemIndex = Sidebardata.findIndex(
      (item) => item.key === selectedMenuItem
    );
    if (selectedItemIndex !== -1) {
      navigate(selectedMenuItem);
    }
  }, [navigate]);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  useEffect(() => {
    if (user && user.username) {
      const username = user.username;
      localStorage.setItem("username", username);
      const successMessagepopup = `Login successful ${user.username}`;
      setSuccess(successMessagepopup);
    }
  }, [user]);

  const storedUsername = localStorage.getItem("username");

  const navigateToUserSettings = () => {
    if (window.location.pathname !== "/home/usersettings/usersetting") {
      navigate("/home/usersettings/usersetting");
    }else if(window.location.pathname !== "settings/stationcreation"){
      navigate("settings/stationcreation");
    }else if(window.location.pathname !== "settings/mainsetting"){
      navigate("settings/mainsetting");
    }else if(window.location.pathname !== "/settings/usercreation"){
      navigate("/settings/usercreation");
    }else if(window.location.pathname !== "/info/ratetype"){
      navigate("/info/ratetype");
    }else if(window.location.pathname !== "/home/info/ratemanagement"){
      navigate("/home/info/ratemanagement");
    }else if(window.location.pathname !== "/home/info/mailer"){
      navigate("/home/info/mailer");
    }else if(window.location.pathname !== "/home/info/fuelinfo"){
      navigate("/home/info/fuelinfo");
    }else if(window.location.pathname !== "/home/registration/customer"){
      navigate("/home/registration/customer");
    }
    else if(window.location.pathname !== "/home/registration/supplier"){
      navigate("/home/registration/supplier");
    }
    else if(window.location.pathname !== "/home/registration/employes"){
      navigate("/home/registration/employes");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationname = localStorage.getItem("usercompany");

        if (!organizationname) {
          return;
        }

        const response = await fetch(
          `${apiUrl}/get-companyimage/${organizationname}`
        );

        if (response.status === 200) {
          const data = await response.json();
          const attachedImageUrls = data.imagePaths.map(
            (path) => `${apiUrl}/images/${path}`
          );

          localStorage.setItem(
            "selectedImage",
            JSON.stringify(attachedImageUrls)
          );
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleImageView = () => {
      const userid = localStorage.getItem("useridno");
      axios
        .get(`${apiUrl}/userprofileview/${userid}`)
        .then((res) => {
          if (res.status === 200) {
            setSelectedprofileImage(res.data[0]?.filename); // Assuming res.data.prof contains the image data
          } else {
            const timer = setTimeout(handleImageView, 100);
            return () => clearTimeout(timer);
          }
        });
    };
    handleImageView();
  }, [sharedData, selectedprofileImage, apiUrl]);


  // const isExtraSmallScreen = useMediaQuery("(max-width: 599.95px)");
  // const isSmallScreen = useMediaQuery("(min-width: 600px) and (max-width: 959.95px)");
  // const isMediumScreen = useMediaQuery("(min-width: 960px) and (max-width: 1279.95px)");
  // const isLargeScreen = useMediaQuery("(min-width: 1280px)");

  const [isRegisterdropdownclicked, setIsRegisterdropdownclicked] = useState(false);
const [issettingdropdownclicked, setIssettingdropdownclicked] = useState(false);
const [isinfodropdownclicked, setIsinfodropdownclicked] = useState(false);


// const isSmallScreen = useMediaQuery("(min-width: 579px) and (max-width: 768.99px)");
// const isExtraSmallScreen = useMediaQuery("(min-width: 430px) and(max-width: 576.99px)");
// const isExtremeSmallScreen = useMediaQuery("(min-width: 320px) and(max-width: 429.99px)");


// function determineSidebarWidth() {
//   if (isExtraSmallScreen) {
//     return "55%";
//   } else if (isSmallScreen) {
//     return "33%";
//   } else if (isExtremeSmallScreen) {
//     return "82%";
//   } 
// }

  return (
    <>
      <div
        // className="bars"
        className={`bars ${expanded ? "bars" : "closedsidebar"}`}
        // className={expanded ? "bars" : "closedsidebar"}
        // style={expanded ? { left: determineSidebarWidth() } : { left: "5%" }}
        // style={expanded ? { left: "33%" } : { left: "5%" }}
        
        // style={expanded ? { left: "5%" } : { left: "60%" }}
        onClick={() => setExpanded(!expanded)}
        
      >
        <AiOutlineBars />
      </div>

     



      <motion.div
        className="sidebar desktop-view-sidebar"
        // variants={sidebarVariants}
        // animate={window.innerWidth <= 768.99 ? `${!expanded}` : ""}
      >
        {/* <p>aaaaaaaaaaaaa</p> */}
        <div className="logo">
          {selectedImage !== null ? (
            <>
              {!isImageLoaded && (
                <div style={{ fontSize: "55px" }}>
                  <BiBuildings />
                </div>
              )}
              <img
                src={`${apiUrl}/public/org_logo/${selectedImage}`}
                alt=""
                onLoad={() => setIsImageLoaded(true)}
                style={{ display: isImageLoaded ? "block" : "none" }}
              />
            </>
          ) : (
            <div style={{ fontSize: "55px" }}>
              <BiBuildings />
            </div>
          )}
        </div>
        <div className="menu">
          <MenuItem
            label="Dashboard"
            to="/home/dashboard"
            value="/home/dashboard"
            alt="/home/dashboard"
            name="Dashboard page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiHomeAlt}
          />
          <MenuItem
            label="Booking"
            to={"/home/bookings/booking"}
            alt="/home/bookings/booking"
            value="/home/bookings"
            menuItemKey="/home/bookings"
            name="Booking page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={HiOutlineUsers}
          />
          <MenuItem
            label="Billing"
            to={"/home/billing/billing"}
            alt="/home/billing/billing"
            value="/home/billing"
            menuItemKey="/home/billing"
            name="Billing page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiBarChartSquare}
          />
          <MenuItem
            label="Register"
            to={"/home/registration/customer"}
            alt="/home/registration/customer"
            value="/home/registration"
            menuItemKey="/home/registration"
            name="Register page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiNotepad}
          />
          <MenuItem
            label="Settings"
            to={"/home/settings/usercreation"}
            alt="/home/settings/usercreation"
            value="/home/settings"
            menuItemKey="/home/settings"
            name="Settings page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineSetting}
          />
{/* 
<motion.div >
        
        <MenuItem
          label="Settings "
          // to={"/home/settings"}
          // alt="/home/settings"
          value="/home/settings"
          menuItemKey="/home/settings"
          name="Settings page"
          isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
          dropdownItems={[
            // {
            //   label: "user Creation",
            //   to : "settings/usercreation",
            // alt:"settings/usercreation",
            // value:"settings",
            // menuItemKey:"settings",
            // name:"User page",
            // isActive:{isActive},
            // handleMenuItemClick:{handleMenuItemClick},
            // icon:{FaUserAstronaut}
            // },
            // {
            //   label: "Setting 2",
            //   to: "/home/settings/setting2",
            //   menuItemKey: "/home/settings/setting2",
            //   name: "Setting 2",
            //   alt: "/home/settings/setting2",
            // },
          ]}
        />


      </motion.div>

      {settingsDropdownVisible && (
        <div className="settings-dropdown">
         <div className="settings-dropdown-links">
         <Link
          label="User"
          to="settings/usercreation"
          alt="settings/usercreation"
          value="/home/settings"
          menuItemKey="settings"
          name="User page"
          isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
          className="dropdown-links"
        
         >user Creation</Link>
         </div>
         <div className="settings-dropdown-links">
         <Link 
          label="jjjjjjjjj"
          to="settings/stationcreation"
          alt="home/settings/stationcreation"
          value="settings"
          menuItemKey="settings"
          name="ffff"
          className="dropdown-links"
          isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
         >Station Creation</Link>
         </div>


         
         <div className="settings-dropdown-links">
         <Link
         to="settings/mainsetting"
         label="User"
          // to="/home/usersettings/usersetting"
          alt="settings/mainsetting"
          value="home/settings"
          menuItemKey="home/settings"
          name="User page" isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
          className="dropdown-links"

         >Main setting</Link>

         </div>
        </div>
      )}



<motion.div >
        
        <MenuItem
          label="info "
          // to={"/home/settings"}
          // alt="/home/info"
          value="/home/info"
          menuItemKey="/home/info"
          name="info page"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
          dropdownItems={[
            // {
            //   label: "user Creation",
            //   to : "settings/usercreation",
            // alt:"settings/usercreation",
            // value:"settings",
            // menuItemKey:"settings",
            // name:"User page",
            // isActive:{isActive},
            // handleMenuItemClick:{handleMenuItemClick},
            // icon:{FaUserAstronaut}
            // },
            // {
            //   label: "Setting 2",
            //   to: "/home/settings/setting2",
            //   menuItemKey: "/home/settings/setting2",
            //   name: "Setting 2",
            //   alt: "/home/settings/setting2",
            // },
          ]}
        />


      </motion.div>

      {infoDropdownVisible && (
        <div className="settings-dropdown">
         <div className="settings-dropdown-links">
         <Link
          label="User"
          to="info/ratetype"
          alt="info/ratetype"
          value="/home/info"
          menuItemKey="ratetype"
          name="ratetype"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
          className="dropdown-links"
        
         >Rate Type</Link>
         </div>

         <div className="settings-dropdown-links">
         <Link 
          label="ratemanagement"
          to="/home/info/ratemanagement"
          alt="/home/info/ratemanagement"
          value="/home/info"
          menuItemKey="ratemanagement"
          name="ratemanagement"
          className="dropdown-links"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
         >Rate Management</Link>
         </div>

         <div className="settings-dropdown-links">
         <Link 
          label="mailer"
          to="/home/info/mailer"
          alt="/home/info/mailer"
          value="/home/info"
          menuItemKey="mailer"
          name="mailer"
          className="dropdown-links"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
         >Mailer</Link>
         </div>

         <div className="settings-dropdown-links">
         <Link 
          label="fuelinfo"
          to="/home/info/fuelinfo"
          alt="/home/info/fuelinfo"
          value="/home/info"
          menuItemKey="fuelinfo"
          name="fuelinfo"
          className="dropdown-links"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
         >Fuel Info</Link>
         </div>


         
     
        </div>
      )} */}
          <MenuItem
            label="Info"
            to={"/home/info/ratetype"}
            alt="/home/info/ratetype"
            value="/home/info"
            menuItemKey="/home/info"
            name="Info page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineInfoCircle}
          />
          <MenuItem
            label="User"
            to="/home/usersettings/usersetting"
            alt="/home/usersettings/usersetting"
            value="/home/usersettings"
            menuItemKey="/home/usersettings"
            name="User page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={FaUserAstronaut}
          />
          <div className="header-user-mobile">
            <div className="logout-item">
              <FiLogOut className="logout-icon" />
            </div>
            <div className="user-name-item">
              <div>
                {storedUsername ? (
                  <div>
                    <p onClick={navigateToUserSettings}>{storedUsername}</p>
                    {success && (
                      <div className="alert-popup Success">
                        <div className="popup-icon">
                          {" "}
                          <FileDownloadDoneIcon
                            style={{ color: "#fff" }}
                          />{" "}
                        </div>
                        <span className="cancel-btn" onClick={hidePopup}>
                          <ClearIcon
                            color="action"
                            style={{ fontSize: "14px" }}
                          />{" "}
                        </span>
                        <p>{success}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p>User not logged in</p>
                  </div>
                )}
              </div>
            </div>
            <div className="avatar-item">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt="userimage"
                  src={`${apiUrl}/images/${selectedprofileImage}`}
                />
              </StyledBadge>
            </div>
          </div>
        </div>
        {info && (
          <div className="alert-popup Info">
            <div className="popup-icon">
              {" "}
              <BsInfo style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{infoMessage}</p>
          </div>
        )}
      </motion.div>


      {expanded && (

<motion.div
        className="sidebar mobile-view-sidebar"
        // variants={sidebarVariants}
        // animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* <p>mobile</p> */}
        <div className="logo">
          {selectedImage !== null ? (
            <>
              {!isImageLoaded && (
                <div style={{ fontSize: "55px" }}>
                  <BiBuildings />
                </div>
              )}
              <img
                src={`${apiUrl}/public/org_logo/${selectedImage}`}
                alt=""
                onLoad={() => setIsImageLoaded(true)}
                style={{ display: isImageLoaded ? "block" : "none" }}
              />
            </>
          ) : (
            <div style={{ fontSize: "55px" }}>
              <BiBuildings />
            </div>
          )}
        </div>
        <div className="menu">
          <MenuItem
            label="Dashboard"
            to="/home/dashboard"
            value="/home/dashboard"
            alt="/home/dashboard"
            name="Dashboard page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiHomeAlt}
          />
          <MenuItem
            label="Booking"
            to={"/home/bookings/booking"}
            alt="/home/bookings/booking"
            value="/home/bookings"
            menuItemKey="/home/bookings"
            name="Booking page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={HiOutlineUsers}
          />
          <MenuItem
            label="Billing"
            to={"/home/billing/billing"}
            alt="/home/billing/billing"
            value="/home/billing"
            menuItemKey="/home/billing"
            name="Billing page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiBarChartSquare}
          />
          {/* <MenuItem
            label="Register"
            to={"/home/registration/customer"}
            alt="/home/registration/customer"
            value="/home/registration"
            menuItemKey="/home/registration"
            name="Register page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiNotepad}
          /> */}
          {/* <MenuItem
            label="Settings"
            to={"/home/settings/usercreation"}
            alt="/home/settings/usercreation"
            value="/home/settings"
            menuItemKey="/home/settings"
            name="Settings page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineSetting}
          /> */}




<motion.div>
        <MenuItem
          // label="Register "
          label={
            <span style={{display:'flex',alignItems:"center" , gap:'14px'}}>
              
              <span>
              Register
              </span>
              <span style={{marginTop:'10px'}}>
              {/* <FaChevronDown/>  */}
              {isRegisterdropdownclicked ? <FaChevronUp /> : <FaChevronDown />}
              </span>
             
            </span>
          }
          // to={"/home/registration/customer"}
          // alt="/home/registration/customer"
          value="/home/registration"
          menuItemKey="/home/registration"
          name="Registration page"
          isActive={isActive}
          handleMenuItemClick={handleRegisterClick}
          icon={BiNotepad}
        />
      </motion.div>

      {registrationDropdownVisible && (
        <div className="settings-dropdown">
          <div className="settings-dropdown-links">
            <Link
              label="Customer Registration"
              to="/home/registration/customer"
              alt="/home/registration/customer"
              value="/home/registration"
              menuItemKey="/home/registration/customer"
              name="Customer Registration"
              isActive={isActive}
              handleMenuItemClick={handleRegisterClick}
              icon={AiOutlineSetting}
              onClick={handleRegistermenuClick}
              className="dropdown-links"
            >

              <p className="dropdown-icon">
                <span>
                <MdGroup />
                </span>
                
                <span className="menu-items-registration">
                Customer
                </span>
              </p>

              
            </Link>
          </div>


    

          <div className="settings-dropdown-links">
            <Link
              label="Supplier Registration"
              to="/home/registration/supplier"
              alt="/home/registration/supplier"
              value="/home/registration"
              menuItemKey="/home/registration/supplier"
              name="Supplier Registration"
              className="dropdown-links"
              isActive={isActive}
              handleMenuItemClick={handleRegisterClick}
              icon={AiOutlineSetting}
              onClick={handleRegistermenuClick}

            >

              <p className="dropdown-icon">
                <span>
                  <MdGroupRemove />
                </span>
                
                <span className="menu-items-registration">
                Supplier
                </span>
              </p>
               </Link>
          </div>

          <div className="settings-dropdown-links">
            <Link
              label="Supplier Registration"
              to="/home/registration/employes"
              alt="/home/registration/employes"
              value="/home/registration"
              menuItemKey="/home/registration/employes"
              name="Supplier Registration"
              className="dropdown-links"
              isActive={isActive}
              handleMenuItemClick={handleRegisterClick}
              icon={AiOutlineSetting}
              onClick={handleRegistermenuClick}

            >
               <p className="dropdown-icon">
                <span>
                  <HiOutlineUserGroup />
                </span>
                
                <span className="menu-items-registration">
                Employees
                </span>
              </p>



              
              </Link>
          </div>

          </div>
      )}




          
<motion.div >
        
        <MenuItem
          // label="Settings "
          label={
            <span style={{display:'flex',alignItems:"center" , gap:'14px'}}>
              
              <span>
              Settings
              </span>
              <span style={{marginTop:'10px'}}>
              {issettingdropdownclicked ? <FaChevronUp /> : <FaChevronDown />}

              {/* <FaChevronDown/>  */}
              </span>
             
            </span>
          }
          // to={"/home/settings"}
          // alt="/home/settings"
          value="/home/settings"
          menuItemKey="/home/settings"
          name="Settings page"
          isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
          dropdownItems={[
            // {
            //   label: "user Creation",
            //   to : "settings/usercreation",
            // alt:"settings/usercreation",
            // value:"settings",
            // menuItemKey:"settings",
            // name:"User page",
            // isActive:{isActive},
            // handleMenuItemClick:{handleMenuItemClick},
            // icon:{FaUserAstronaut}
            // },
            // {
            //   label: "Setting 2",
            //   to: "/home/settings/setting2",
            //   menuItemKey: "/home/settings/setting2",
            //   name: "Setting 2",
            //   alt: "/home/settings/setting2",
            // },
          ]}
        />


      </motion.div>

      {settingsDropdownVisible && (
        <div className="settings-dropdown">
         <div className="settings-dropdown-links">
         <Link
          label="User"
          to="settings/usercreation"
          alt="settings/usercreation"
          value="/home/settings"
          menuItemKey="settings"
          name="User page"
          isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
          className="dropdown-links"
         >

              <p className="dropdown-icon">
                <span>
                <GrUserSettings />
                </span>
                
                <span>
                user Creation
                </span>
              </p>
          </Link>
         </div>
         <div className="settings-dropdown-links">
         <Link 
          label="Station Creation"
          to="settings/stationcreation"
          alt="home/settings/stationcreation"
          value="settings"
          menuItemKey="settings"
          name="Station Creation"
          className="dropdown-links "
          isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
         >
          <p className="dropdown-icon">
          <span>
          <FaCodeBranch  />
          </span>
          
          <span>
          Station Creation
          </span>
          </p>
      
         
          </Link>
         </div>


         
         <div className="settings-dropdown-links">
         <Link
         to="settings/mainsetting"
         label="User"
          // to="/home/usersettings/usersetting"
          alt="settings/mainsetting"
          value="home/settings"
          menuItemKey="home/settings"
          name="User page" isActive={isActive}
          handleMenuItemClick={handleSettingsClick}
          icon={AiOutlineSetting}
          className="dropdown-links "
           >   

            <p className="dropdown-icon">
              <span>
              <GrSettingsOption />
              </span>
              
              <span>
              Main setting
              </span>
              </p>
               
         </Link>

         </div>
        </div>
      )}



<motion.div >
        
        <MenuItem
          // label="info "
          label={
            <span style={{display:'flex',alignItems:"center" , gap:'14px'}}>
              
              <span>
              info
              </span>
              <span style={{marginTop:'10px'}}>
              {isinfodropdownclicked ? <FaChevronUp /> : <FaChevronDown />}

              {/* <FaChevronDown/>  */}
              </span>
             
            </span>
          }
          // to={"/home/settings"}
          // alt="/home/info"
          value="/home/info"
          menuItemKey="/home/info"
          name="info page"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineInfoCircle}
          dropdownItems={[
            // {
            //   label: "user Creation",
            //   to : "settings/usercreation",
            // alt:"settings/usercreation",
            // value:"settings",
            // menuItemKey:"settings",
            // name:"User page",
            // isActive:{isActive},
            // handleMenuItemClick:{handleMenuItemClick},
            // icon:{FaUserAstronaut}
            // },
            // {
            //   label: "Setting 2",
            //   to: "/home/settings/setting2",
            //   menuItemKey: "/home/settings/setting2",
            //   name: "Setting 2",
            //   alt: "/home/settings/setting2",
            // },
          ]}
        />


      </motion.div>

      {infoDropdownVisible && (
        <div className="settings-dropdown">
         <div className="settings-dropdown-links">
         <Link
          label="User"
          to="info/ratetype"
          alt="info/ratetype"
          value="/home/info"
          menuItemKey="ratetype"
          name="ratetype"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
          className="dropdown-links"
        
         >
           <p className="dropdown-icon">
              <span>
              <GiDuration  />
              </span>
              
              <span>
              Rate Type
              </span>
              </p>
          
         
         </Link>
         </div>

         <div className="settings-dropdown-links">
         <Link 
          label="ratemanagement"
          to="/home/info/ratemanagement"
          alt="/home/info/ratemanagement"
          value="/home/info"
          menuItemKey="ratemanagement"
          name="ratemanagement"
          className="dropdown-links"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
         >

            <p className="dropdown-icon">
              <span>
              <GiReceiveMoney   />
              </span>
              
              <span>
              Rate Management
              </span>
              </p>
          
          
         </Link>
         </div>

         <div className="settings-dropdown-links">
         <Link 
          label="mailer"
          to="/home/info/mailer"
          alt="/home/info/mailer"
          value="/home/info"
          menuItemKey="mailer"
          name="mailer"
          className="dropdown-links"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
         >

            <p className="dropdown-icon">
              <span>
              <SiMinutemailer   />
              </span>
              
              <span>
              Mailer
              </span>
              </p>
          
          
          
          
          </Link>
         </div>

         <div className="settings-dropdown-links">
         <Link 
          label="fuelinfo"
          to="/home/info/fuelinfo"
          alt="/home/info/fuelinfo"
          value="/home/info"
          menuItemKey="fuelinfo"
          name="fuelinfo"
          className="dropdown-links"
          isActive={isActive}
          handleMenuItemClick={handleinfoClick}
          icon={AiOutlineSetting}
         >
              <p className="dropdown-icon">
              <span>
              <BsFillFuelPumpFill    />
              </span>
              
              <span>
              Fuel Info
              </span>
              </p>
          
          
          </Link>
         </div>


         
     
        </div>
      )}
          {/* <MenuItem
            label="Info"
            to={"/home/info/ratetype"}
            alt="/home/info/ratetype"
            value="/home/info"
            menuItemKey="/home/info"
            name="Info page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineInfoCircle}
          /> */}

          











          <MenuItem
            label="User"
            to="/home/usersettings/usersetting"
            alt="/home/usersettings/usersetting"
            value="/home/usersettings"
            menuItemKey="/home/usersettings"
            name="User page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={FaUserAstronaut}
          />
          <div className="header-user-mobile">
            <div className="logout-item">
              <FiLogOut className="logout-icon" />
            </div>
            <div className="user-name-item">
              <div>
                {storedUsername ? (
                  <div>
                    <p onClick={navigateToUserSettings}>{storedUsername}</p>
                    {success && (
                      <div className="alert-popup Success">
                        <div className="popup-icon">
                          {" "}
                          <FileDownloadDoneIcon
                            style={{ color: "#fff" }}
                          />{" "}
                        </div>
                        <span className="cancel-btn" onClick={hidePopup}>
                          <ClearIcon
                            color="action"
                            style={{ fontSize: "14px" }}
                          />{" "}
                        </span>
                        <p>{success}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p>User not logged in</p>
                  </div>
                )}
              </div>
            </div>
            <div className="avatar-item">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt="userimage"
                  src={`${apiUrl}/images/${selectedprofileImage}`}
                />
              </StyledBadge>
            </div>
          </div>
        </div>
        {info && (
          <div className="alert-popup Info">
            <div className="popup-icon">
              {" "}
              <BsInfo style={{ color: "#fff" }} />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
            </span>
            <p>{infoMessage}</p>
          </div>
        )}
      </motion.div>
      )}


    </>
  );
};

export default Sidebar;
