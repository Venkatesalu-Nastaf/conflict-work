// import React from 'react'

// export const Map = () => {
//   return (
//     <div>Map</div>
//   )
// }



import React from 'react'
import { useState, useContext, useEffect } from 'react';
// import "./Billings.css";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { PermissionContext } from '../context/permissionContext';
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

const Map = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const { permissions } = useContext(PermissionContext)
  // const Maps = permissions[21]?.read;
  // const Map_Realtime = permissions[23]?.read || 0
  // const Map_Vehicle = permissions[24]?.read || 0
  // const Map_Reminders = permissions[25]?.read || 0
  // const Map_History = permissions[26]?.read || 0
  // const Map_Records = permissions[27]?.read || 0
  const Map_Realtime = permissions[24]?.read || 0
  const Map_Vehicle = permissions[25]?.read || 0
  const Map_Reminders = permissions[26]?.read || 0
  const Map_History = permissions[27]?.read || 0
  const Map_Records = permissions[28]?.read || 0



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
    let hasPermission = 0;
    switch (menuItem) {
      case "RealTime":
        hasPermission = Map_Realtime;
        break;
      case "Vehicle":
        hasPermission = Map_Vehicle;
        break;
      case "Reminders":
        hasPermission = Map_Reminders;
        break;
      case "History":
        hasPermission = Map_History;
        break;
        case "Records":
        hasPermission = Map_Records;
        break;
      default:
        break;
    }
    try {
      if (hasPermission === 1) {
        Navigate(alt)
      }
      else if (hasPermission === 0) {
        e.preventDefault();
        setWarning(true);
        // setInfoMessage("You do not have Permission ..!")
        // alert("You do not have Permission ..!");
      }
    }
    catch {
    }
  };


  //permission --------------

  const myLocation = useLocation();
  var myTo = '';
  if (myLocation.pathname === '/home/Map/Vehicle/AddVehicle') {
    myTo = '/home/Map/Vehicle/AddVehicle';
  }
  else {
    myTo = '/home/Map/Vehicle';
  }
  return (

    <div className="billings-conatiner" id="menu">
      <div className="menu-bar-main">
        <div className="menu-bar">
          {Map_Realtime ?
          <MenuItem
            label="RealTime"
            // to={Billing && ("/home/billing/billing")}
            to={"/home/Map/RealTime"}
            alt="/home/Map/RealTime"
            menuItemKey="RealTime"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> : <></>}
          {Map_Vehicle ?
          <MenuItem
            label="Vehicle"
            // to={"/home/Map/Vehicle"}
            to={"/home/Map/Vehicle" && myTo}
            alt="/home/Map/Vehicle"
            menuItemKey="Vehicle"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          />:<></>}
          {Map_History ?
          <MenuItem
            label="History"
            // to={"/home/Map/Vehicle"}
            to={"/home/Map/History" }
            alt="/home/Map/History"
            menuItemKey="History"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> : <></>}
          {Map_Reminders ?
          <MenuItem
            label="Reminders"
            // to={"/home/Map/Vehicle"}
            to={"/home/Map/Reminders"}
            alt="/home/Map/Reminders"
            menuItemKey="Reminders"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> : <></> }

          {Map_Records ? 
            <MenuItem
            label="Records"
            // to={"/home/Map/Vehicle"}
            to={"/home/Map/Records"}
            alt="/home/Map/Records"
            menuItemKey="Records"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> : <></> }

        </div>
      </div>
      <div className='alert-popup-main'>
        {warning &&
          <div className='alert-popup Warning' >
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

export default Map;

