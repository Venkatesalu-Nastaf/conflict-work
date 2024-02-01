import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Sidebar.css";
import Logo from "./Logo-Img/logo.png";
import { motion } from "framer-motion";
import { Sidebardata } from "./Sidebar";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import logoImage from "../Sildebar/Logo-Img/logo.png";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

// ICONS
import { useUser } from '../../../form/UserContext';
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";

const MenuItem = ({ label, to, alt, menuItemKey, name, isActive, handleMenuItemClick, icon: Icon }) => {
  return (
    <Link
      className={isActive(menuItemKey) ? "menuItem active" : "menuItem"}
      to={to}
      onClick={() => handleMenuItemClick(menuItemKey, name, alt)}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [expanded, setExpanded] = useState(true); const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    },
    '@keyframes ripple': {
    },
  }));

  const user_id = localStorage.getItem('useridno');
  const [permissions, setPermissions] = useState({});

  // const pagename = localStorage.getItem('selectedMenuItem');

  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState({});


  const hidePopup = () => {
    setSuccess(false);
    setInfo(false);
    setInfoMessage("");
  };

  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);
  //end

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  const isActive = (itemKey) => {
    return currentPath.includes(itemKey);
  };

  const handleMenuItemClick = async (menuItemKey, name, alt) => {
    const location = alt;
    console.log('location', location);
    const currentPageName = name;
    console.log('page name', currentPageName);
    localStorage.setItem("selectedMenuItem", menuItemKey);

    try {
      const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
      const permissions = response.data;
      setPermissions(permissions);

      if (permissions.read_permission === 1) {
        navigate(alt);
      } else {
        setInfo(true);
        setInfoMessage("You do not have permission to access this page.");
      }
    } catch (error) {
      console.error('Error fetching user permissions:', error);
    }
  };



  useEffect(() => {
    const selectedMenuItem = localStorage.getItem("selectedMenuItem");
    const selectedItemIndex = Sidebardata.findIndex((item) => item.key === selectedMenuItem);
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
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

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
    }
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <AiOutlineBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="menu">
          <MenuItem
            label="Dashboard"
            to="/home/dashboard"
            menuItemKey="/home/dashboard"
            alt="/home/dashboard"
            name="Dashboard page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiHomeAlt}
          />
          <MenuItem
            label="Booking"
            to={permissions.read && ("/home/bookings/booking")}
            alt="/home/bookings/booking"
            menuItemKey="/home/bookings"
            name="Booking page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={HiOutlineUsers}
          />
          <MenuItem
            label="Billing"
            to={permissions.read && ("/home/billing/billing")}
            alt="/home/billing/billing"
            menuItemKey="/home/billing"
            name="Billing page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiBarChartSquare}
          />
          <MenuItem
            label="Register"
            to={permissions.read && ("/home/registration/customer")}
            alt="/home/registration/customer"
            menuItemKey="/home/registration"
            name="Register page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiNotepad}
          />
          {/* <MenuItem
            label="Accounts"
            to="/home/accounts/expense"
            menuItemKey="/home/accounts"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineSetting}
          />  */}
          <MenuItem
            label="Settings"
            to={permissions.read && ("/home/settings/usercreation")}
            alt="/home/settings/usercreation"
            menuItemKey="/home/settings"
            name="Settings page"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineSetting}
          />
          <MenuItem
            label="Info"
            to={permissions.read && ("/home/info/ratetype")}
            alt="/home/info/ratetype"
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
            menuItemKey="/home/usersettings"
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
                    {success &&
                      <div className='alert-popup Success' >
                        <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{success}</p>
                      </div>
                    }

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
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt="userimage" src={logoImage} />
              </StyledBadge>
            </div>

          </div>
        </div>
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
      </motion.div>
    </>
  );
};

export default Sidebar;
