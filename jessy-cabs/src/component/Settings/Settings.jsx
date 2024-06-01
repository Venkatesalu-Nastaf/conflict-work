import React, { useState, useContext, useEffect } from 'react';
import "./Settings.css";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { PermissionContext } from '../context/permissionContext';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';

const MenuItem = ({ label, to, alt, handleMenuItemClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`menu-link ${isActive ? "actives" : ""}`}
      to={to}
      onClick={(e) => handleMenuItemClick(label, alt, e)}
    >
      {label}
    </Link>
  );
};

const Settings = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  // permission ------------------------

  const { permissions } = useContext(PermissionContext)

  const SETTING = permissions[12]?.read;
  const User_Creation = permissions[13]?.read;
  const Station_Creation = permissions[14]?.read;
  const Main_Setting = permissions[15]?.read;

  const [warning, setWarning] = useState(false);

  const hidePopup = () => {
    setWarning(false);
  };

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);


  const handleMenuItemClick = (menuItem, alt, e) => {

    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);

    let hasPermission = 0

    switch (menuItem) {

      case "User Creation":
        hasPermission = User_Creation || SETTING;
        break;
      case "Station Creation":
        hasPermission = Station_Creation;
        break;
      case "Main setting":
        hasPermission = Main_Setting;
        break;
      default:
        break;

    }
    try {

      if (hasPermission === 1) {
        Navigate(alt);
      }
      else if (hasPermission === 0) {
        e.preventDefault();
        setWarning(true);
        // alert("You do not have Permission ..!");
      }

    }
    catch {

    }


  };

  return (
    <div className="Settings-main">
      <div className="menu-bar">
        <MenuItem
          label="User Creation"
          to={User_Creation && ("/home/settings/usercreation")}
          alt="/home/settings/usercreation"
          menuItemKey="User Creation"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        {/* <MenuItem
          label="Permission"
          to="/home/settings/permission"
          menuItemKey="Permission"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        /> */}
        <MenuItem
          label="Station Creation"
          to={Station_Creation && ("/home/settings/stationcreation")}
          alt="/home/settings/stationcreation"
          menuItemKey="Station Creation"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Main setting"
          to={Main_Setting && ("/home/settings/mainsetting")}
          alt="/home/settings/mainsetting"
          menuItemKey="Main setting"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>
      <div className='alert-popup-main'>
        {warning &&
          <div className='alert-popup Warning'>
            <div className="popup-icon"> <ErrorOutlineIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
            <p>You do not have Permission ..!</p>
          </div>
        }
      </div>
      <Outlet />
    </div>

  );
};

export default Settings;
