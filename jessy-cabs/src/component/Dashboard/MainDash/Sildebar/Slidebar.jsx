import React, { useState, useEffect, useCallback, useContext } from "react";
import { useData } from "../../MainDash/Sildebar/DataContext2";
import axios from "axios";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";
import { Sidebardata } from "./Sidebar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useNavigate, Link, useLocation, } from "react-router-dom";
import { PermissionContext } from "../../../context/permissionContext";

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
import { GrUserSettings } from "react-icons/gr";
import { GrSettingsOption } from "react-icons/gr";
import { FaCodeBranch } from "react-icons/fa6";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { BiBuildings } from "@react-icons/all-files/bi/BiBuildings";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { GiDuration } from "react-icons/gi";
import { SiMinutemailer } from "react-icons/si";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineMoving } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdGroup } from "react-icons/md";
import { MdGroupRemove } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { APIURL } from "../../../url";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { PiWarningCircleBold } from "react-icons/pi";
import Button from "@mui/material/Button";
import { FaUser } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import update from "../../../../assets/img/update.png";
// import { useData } from "../../MainDash/Sildebar/DataContext2";

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

    <div className="menuItemContainer">
      <Link
        className={isActive(value) ? "menuItem active" : "menuItem"}
        to={to}
        onClick={(e) => handleMenuItemClick(menuItemKey, name, alt, e)}
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
              onClick={(e) =>
                handleMenuItemClick(item.menuItemKey, item.name, item.alt, e)
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

  const closeMenuFunction = () => {
    setExpanded(false);
    setIsRegisterdropdownclicked(false);
    setIssettingdropdownclicked(false);
    setIsinfodropdownclicked(false);

    setIsbillingdropdownclicked(false);
    setIsbookingdropdownclicked(false);
  }

  document.addEventListener('click', function (event) {
    if ((!event.target.closest('.mobile-view-sidebar') && !event.target.closest('.bars')) && (!event.target.closest('.menu'))) {
      closeMenuFunction();
    }
  });

  //--------------------------to show logo-----------

  const { sharedData, logo } = useData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedprofileImage, setSelectedprofileImage] = useState(null);
  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false);
  const [infoDropdownVisible, setInfoDropdownVisible] = useState(false);
  const [registrationDropdownVisible, setRegistrationDropdownVisible] = useState(false);
  const [billingDropdownVisible, setBillingDropdownVisible] = useState(false);
  const [bookingDropdownVisible, setBookingDropdownVisible] = useState(false);

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
    setInfoDropdownVisible(false);
    setRegistrationDropdownVisible(false);
    setBookingDropdownVisible(false);
    setIssettingdropdownclicked((prevExpanded) => !prevExpanded);
    setBillingDropdownVisible(false)
  };

  const handleinfoClick = () => {
    setInfoDropdownVisible(!infoDropdownVisible);
    setSettingsDropdownVisible(false);
    setRegistrationDropdownVisible(false);
    setIsinfodropdownclicked((prevExpanded) => !prevExpanded);
    setBillingDropdownVisible(false);
    setBookingDropdownVisible(false);
  }

  const handleRegisterClick = () => {
    setRegistrationDropdownVisible(!registrationDropdownVisible);
    setSettingsDropdownVisible(false);
    setInfoDropdownVisible(false)
    setIsRegisterdropdownclicked((prevExpanded) => !prevExpanded);
    setBillingDropdownVisible(false);
    setBookingDropdownVisible(false);
  }

  const handleBillingClick = () => {
    setBillingDropdownVisible(!billingDropdownVisible);
    setRegistrationDropdownVisible(false);
    setSettingsDropdownVisible(false);
    setInfoDropdownVisible(false)
    setIsbillingdropdownclicked((prevExpanded) => !prevExpanded);
    setBookingDropdownVisible(false);
  }

  const handleBookingClick = () => {
    setBookingDropdownVisible(!bookingDropdownVisible);
    setBillingDropdownVisible(false);
    setRegistrationDropdownVisible(false);
    setSettingsDropdownVisible(false);
    setInfoDropdownVisible(false)
    setIsbookingdropdownclicked((prevExpanded) => !prevExpanded);
  }

  const { permissions } = useContext(PermissionContext)
  const BOOKING = permissions[0]?.read;
  const BILLING = permissions[4]?.read;
  const REGISTER = permissions[8]?.read;
  const SETTING = permissions[12]?.read || permissions[13]?.read;
  const INFO = permissions[16]?.read;
  const Dashbord_read = permissions[20]?.read;

  const handleMenuItemClick = async (menuItemKey, name, alt, e) => {
    setSettingsDropdownVisible(false);
    setInfoDropdownVisible(false);
    setRegistrationDropdownVisible(false);
    setExpanded(false)
    e.preventDefault();
    var hasPermission = false;
    switch (name) {
      case "Booking page":
        hasPermission = BOOKING;
        break;
      case "Billing page":
        hasPermission = BILLING;
        break;
      case "Register page":
        hasPermission = REGISTER;
        break;
      case "Settings page":
        // hasPermission = 1;
        hasPermission = SETTING;
        break;
      case "Info page":
        hasPermission = INFO;
        break;
      case "Dashboard page":
        hasPermission = Dashbord_read;
        break;
      case "User page":
        hasPermission = 1;
        break;
      default:
        break;
    }

    // const currentPageName = name;
    localStorage.setItem("selectedMenuItem", menuItemKey);
    try {

      if (hasPermission === 1) {

        navigate(alt);

      } else if (hasPermission === 0) {
        setInfo(true);
        setInfoMessage("You do not have Permission for this page ..!");
        return;
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
    } else if (window.location.pathname !== "settings/stationcreation") {
      navigate("settings/stationcreation");
    } else if (window.location.pathname !== "settings/mainsetting") {
      navigate("settings/mainsetting");
    } else if (window.location.pathname !== "/settings/usercreation") {
      navigate("/settings/usercreation");
    } else if (window.location.pathname !== "/info/ratetype") {
      navigate("/info/ratetype");
    } else if (window.location.pathname !== "/home/info/ratemanagement") {
      navigate("/home/info/ratemanagement");
    } else if (window.location.pathname !== "/home/info/mailer") {
      navigate("/home/info/mailer");
    } else if (window.location.pathname !== "/home/info/fuelinfo") {
      navigate("/home/info/fuelinfo");
    } else if (window.location.pathname !== "/home/registration/customer") {
      navigate("/home/registration/customer");
    }
    else if (window.location.pathname !== "/home/registration/supplier") {
      navigate("/home/registration/supplier");
    }
    else if (window.location.pathname !== "/home/registration/employes") {
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
        if (organizationname !== "undefined" && organizationname) {

          const response = await fetch(
            `${apiUrl}/get-companyimage/${organizationname}`
          );

          if (response.status === 200) {
            const data = await response.json();
            const attachedImageUrls = data.imagePaths.map(
              (path) => `${apiUrl}/images/${path}`
            );

            localStorage.setItem("selectedImage", JSON.stringify(attachedImageUrls));
          }
          else {
            const timer = setTimeout(fetchData, 2000);
            return () => clearTimeout(timer);
          }
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
            setSelectedprofileImage(res.data[0]?.filename);
          } else {
            const timer = setTimeout(handleImageView, 100);
            return () => clearTimeout(timer);
          }
        });
    };
    handleImageView();
  }, [sharedData, selectedprofileImage, apiUrl]);

  const [isRegisterdropdownclicked, setIsRegisterdropdownclicked] = useState(false);
  const [issettingdropdownclicked, setIssettingdropdownclicked] = useState(false);
  const [isinfodropdownclicked, setIsinfodropdownclicked] = useState(false);
  const [isbillingdropdownclicked, setIsbillingdropdownclicked] = useState(false);
  const [isbookingdropdownclicked, setIsbookingdropdownclicked] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleLogout = useCallback(() => {
    setPopupOpen(true);
  }, []);

  const handleLogoutdialog = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
      localStorage.removeItem("useridno");
      localStorage.removeItem("selectedImage");
      localStorage.removeItem("selectedprofileImage");
      localStorage.removeItem("usercompany");
      localStorage.removeItem("selectedMenuItem");
      localStorage.removeItem("profileimages")
      localStorage.removeItem("organizationimages")
      localStorage.removeItem("selectedusertheme")
      setExpanded(true);
      navigate("/");
    },
    [navigate]
  );

  const [openmodal, setOpenmodal] = useState(false);

  const handleClickOpenmodal = () => {
    setOpenmodal(true);
  };

  const handleClosemodal = () => {
    setOpenmodal(false);
  };

  const bookingSubMenu = (path) => {
    if (BOOKING !== 0) {
      navigate(path);
      closeMenuFunction();
    }
    else {
      setInfo(true);
      setInfoMessage("You do not have Permission for this page ..!");
      return;
    }
  }

  const billingSubMenu = (path) => {
    if (BILLING !== 0) {
      navigate(path);
      closeMenuFunction();
    }
    else {
      setInfo(true);
      setInfoMessage("You do not have Permission for this page ..!");
      return;
    }
  }

  const registerSubMenu = (path) => {
    if (REGISTER !== 0) {
      navigate(path);
      closeMenuFunction();
    }
    else {
      setInfo(true);
      setInfoMessage("You do not have Permission for this page ..!");
      return;
    }
  }

  const settingSubMenu = (path) => {
    if (SETTING !== 0) {
      navigate(path);
      closeMenuFunction();
    }
    else {
      setInfo(true);
      setInfoMessage("You do not have Permission for this page ..!");
      return;
    }
  }

  const infoSubMenu = (path) => {
    if (INFO !== 0) {
      navigate(path);
      closeMenuFunction();
    }
    else {
      setInfo(true);
      setInfoMessage("You do not have Permission for this page ..!");
      return;
    }
  }


  //------------------------------------------------------------------

  return (
    <>
      <div
        className={`bars ${expanded ? "bars" : "closedsidebar"}`}
        onClick={() => setExpanded(!expanded)}
      >
        <AiOutlineBars />
      </div>
      <motion.div
        className="sidebar desktop-view-sidebar" >
        <div className="logo">

          {logo ? (
            <img
              src={logo}
              alt=""
            />) : (<div style={{ 'fontSize': "55px" }}>
              <BiBuildings />
            </div>)}

        </div>
        <div className="menu">
          {Dashbord_read === 1 && <MenuItem
            label="Dashboard"
            to="/home/dashboard"
            value="/home/dashboard"
            alt="/home/dashboard"
            name="Dashboard page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiHomeAlt}
          />}
          <MenuItem
            label="Booking"
            to={BOOKING && ("/home/bookings/booking")}
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
            to={BILLING && ("/home/billing/billing")}
            // to={"/home/billing/billing"}
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
            to={REGISTER && ("/home/registration/customer")}
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
            to={SETTING && ("/home/settings/usercreation")}
            alt="/home/settings/usercreation"
            value="/home/settings"
            menuItemKey="/home/settings"
            name="Settings page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineSetting}
          />
          <MenuItem
            label="Info"
            to={INFO && ("/home/info/ratetype")}
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
                    <div className="alert-popup-main">
                      {success && (
                        <div className="alert-popup Success">
                          <div className="popup-icon">
                            {" "}
                            <FileDownloadDoneIcon
                            />{" "}
                          </div>
                          <span className="cancel-btn" onClick={hidePopup}>
                            <ClearIcon
                              color="action"
                            />{" "}
                          </span>
                          <p>{success}</p>
                        </div>
                      )}
                    </div>
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
      </motion.div >
      <div className="alert-popup-main">
        {info && (
          <div className="alert-popup Info">
            <div className="popup-icon">
              {" "}
              <BsInfo />{" "}
            </div>
            <span className="cancel-btn" onClick={hidePopup}>
              <ClearIcon color="action" />{" "}
            </span>
            <p>{infoMessage}</p>
          </div>
        )}
      </div>
      {
        expanded && (
          <motion.div className="sidebar mobile-view-sidebar">
            <div className="logo" onClick={closeMenuFunction}>
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
              {Dashbord_read === 1 && <MenuItem
                label="Dashboard"
                to="/home/dashboard"
                value="/home/dashboard"
                alt="/home/dashboard"
                name="Dashboard page"
                isActive={isActive}
                handleMenuItemClick={handleMenuItemClick}
                icon={BiHomeAlt}
              />}
              <motion.div>
                <MenuItem
                  label={
                    <span className="sidebar-main-menu">
                      <span>
                        Booking
                      </span>
                      <span className="sidebar-main-menu-arrow">
                        <FaChevronDown className={isbookingdropdownclicked ? 'isbookingdropdownclicked' : ''} />
                      </span>
                    </span>
                  }
                  value="/home/bookings"
                  menuItemKey="/home/bookings"
                  name="Booking page"
                  isActive={isActive}
                  handleMenuItemClick={handleBookingClick}
                  icon={HiOutlineUsers}
                />
              </motion.div>
              {bookingDropdownVisible && (
                <div className="settings-dropdown">
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => bookingSubMenu('/home/bookings/booking')}>
                      <span>
                        <FaBookmark />
                      </span>
                      <span className="menu-items-registration">
                        Booking
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => bookingSubMenu('/home/bookings/tripstatus')}>
                      <span>
                        <MdOutlineMoving />
                      </span>
                      <span className="menu-items-registration">
                        Trip status
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => bookingSubMenu('/home/bookings/tripsheet')}>
                      <span>
                        <BiSpreadsheet />
                      </span>
                      <span className="menu-items-registration">
                        Trip sheet
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <motion.div>
                <MenuItem
                  label={
                    <span className="sidebar-main-menu">
                      <span>
                        Billing
                      </span>
                      <span className="sidebar-main-menu-arrow">
                        <FaChevronDown className={isbillingdropdownclicked ? 'isbillingdropdownclicked' : ''} />
                      </span>
                    </span>
                  }
                  value="/home/billing"
                  menuItemKey="/home/billing"
                  name="Billing page"
                  isActive={isActive}
                  handleMenuItemClick={handleBillingClick}
                  icon={BiBarChartSquare}
                />
              </motion.div>
              {billingDropdownVisible && (
                <div className="settings-dropdown">
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => billingSubMenu('/home/billing/billing')}>
                      <span>
                        <FaMoneyBillTransfer />
                      </span>
                      <span className="menu-items-registration">
                        Billing
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => billingSubMenu('/home/billing/transfer')}>
                      <span>
                        <BiTransfer />
                      </span>
                      <span className="menu-items-registration">
                        Transfer
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => billingSubMenu('/home/billing/coveringbill')}>
                      <span>
                        <FaMoneyBillWheat />
                      </span>
                      <span className="menu-items-registration">
                        Covering Bill
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <motion.div>
                <MenuItem
                  label={
                    <span className="sidebar-main-menu">
                      <span>
                        Register
                      </span>
                      <span className="sidebar-main-menu-arrow">
                        <FaChevronDown className={isRegisterdropdownclicked ? 'isRegisterdropdownclicked' : ''} />
                      </span>
                    </span>
                  }
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
                    <p className="dropdown-icon" onClick={() => registerSubMenu('/home/registration/customer')}>
                      <span>
                        <MdGroup />
                      </span>
                      <span className="menu-items-registration">
                        Customer
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => registerSubMenu('/home/registration/supplier')}>
                      <span>
                        <MdGroupRemove />
                      </span>
                      <span className="menu-items-registration">
                        Supplier
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => registerSubMenu('/home/registration/employes')}>
                      <span>
                        <HiOutlineUserGroup />
                      </span>
                      <span className="menu-items-registration">
                        Employees
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <motion.div >
                <MenuItem
                  label={
                    <span className="sidebar-main-menu">
                      <span>
                        Settings
                      </span>
                      <span className="sidebar-main-menu-arrow">
                        <FaChevronDown className={issettingdropdownclicked ? 'issettingdropdownclicked' : ''} />
                      </span>
                    </span>
                  }
                  value="/home/settings"
                  menuItemKey="/home/settings"
                  name="Settings page"
                  isActive={isActive}
                  handleMenuItemClick={handleSettingsClick}
                  icon={AiOutlineSetting}
                  dropdownItems={[
                  ]}
                />
              </motion.div>
              {settingsDropdownVisible && (
                <div className="settings-dropdown">
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => settingSubMenu('settings/usercreation')}>
                      <span>
                        <GrUserSettings />
                      </span>

                      <span>
                        user Creation
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => settingSubMenu('settings/stationcreation')}>
                      <span>
                        <FaCodeBranch />
                      </span>
                      <span>
                        Station Creation
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => settingSubMenu('settings/mainsetting')}>
                      <span>
                        <GrSettingsOption />
                      </span>
                      <span>
                        Main setting
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <motion.div >
                <MenuItem
                  label={
                    <span className="sidebar-main-menu">
                      <span>
                        info
                      </span>
                      <span className="sidebar-main-menu-arrow">
                        <FaChevronDown className={isinfodropdownclicked ? 'isinfodropdownclicked' : ''} />
                      </span>
                    </span>
                  }
                  value="/home/info"
                  menuItemKey="/home/info"
                  name="info page"
                  isActive={isActive}
                  handleMenuItemClick={handleinfoClick}
                  icon={AiOutlineInfoCircle}
                  dropdownItems={[
                  ]}
                />
              </motion.div>
              {infoDropdownVisible && (
                <div className="settings-dropdown">
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => infoSubMenu('info/ratetype')}>
                      <span>
                        <GiDuration />
                      </span>
                      <span>
                        Rate Type
                      </span>
                    </p>
                  </div>

                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => infoSubMenu('/home/info/ratemanagement')}>
                      <span>
                        <GiReceiveMoney />
                      </span>
                      <span>
                        Rate Management
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => infoSubMenu('/home/info/mailer')}>
                      <span>
                        <SiMinutemailer />
                      </span>
                      <span>
                        Mailer
                      </span>
                    </p>
                  </div>
                  <div className="settings-dropdown-links">
                    <p className="dropdown-icon" onClick={() => infoSubMenu('/home/info/fuelinfo')}>
                      <span>
                        <BsFillFuelPumpFill />
                      </span>
                      <span>
                        Fuel Info
                      </span>
                    </p>
                  </div>
                </div>
              )}
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
              <div className="header-user-mobile" onClick={closeMenuFunction}>
                <div className="logout-item">
                  <FiLogOut className="logout-icon" onClick={handleLogout} />
                </div>
                <div className="user-name-item">
                  <div>
                    {storedUsername ? (
                      <div>
                        <p onClick={navigateToUserSettings}>{storedUsername}</p>
                        <div className="alert-popup-main">
                          {success && (
                            <div className="alert-popup Success">
                              <div className="popup-icon">
                                {" "}
                                <FileDownloadDoneIcon
                                />{" "}
                              </div>
                              <span className="cancel-btn" onClick={hidePopup}>
                                <ClearIcon
                                  color="action"
                                />{" "}
                              </span>
                              <p>{success}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>User not logged in</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="avatar-item avatar-item-2">
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
                  <div className="user-icon-update" onClick={handleClickOpenmodal}>
                    <FaUser />
                    <div className="user-icon-update-dot"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="alert-popup-main">
              {info && (
                <div className="alert-popup Info">
                  <div className="popup-icon">
                    {" "}
                    <BsInfo />{" "}
                  </div>
                  <span className="cancel-btn" onClick={hidePopup}>
                    <ClearIcon color="action" />{" "}
                  </span>
                  <p>{infoMessage}</p>
                </div>
              )}
            </div>
          </motion.div>
        )
      }
      <Modal open={openmodal} onClose={handleClosemodal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <div>
            <img src={update} className="sidebar-update-img" alt="update-img" />
          </div>
          <Button onClick={handleClosemodal} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
      <Dialog open={popupOpen} onClose={handlePopupClose}>
        <DialogContent>
          <p className="modal-warning-icon">< PiWarningCircleBold className="warning-icon" /></p>
          <p className="modal-warning-text">Are you sure want to logout from this <br /> application ?</p>
        </DialogContent>
        <DialogActions className="yes-no-buttons">
          <Button
            onClick={handleLogoutdialog}
            variant="contained"
            className="logout-btn"
          >
            Yes, I'm Sure
          </Button>
          <Button
            onClick={handlePopupClose}
            variant="contained"
            className="logout-cancel-btn"
          >
            NO, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
