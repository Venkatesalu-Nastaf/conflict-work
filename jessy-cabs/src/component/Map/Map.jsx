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
  const Maps = permissions[21]?.read;



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
        hasPermission = Maps;
        break;
      case "Vehicle":
        hasPermission = Maps;
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
          <MenuItem
            label="RealTime"
            // to={Billing && ("/home/billing/billing")}
            to={"/home/Map/RealTime"}
            alt="/home/Map/RealTime"
            menuItemKey="RealTime"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          />
          <MenuItem
            label="Vehicle"
            // to={"/home/Map/Vehicle"}
            to={"/home/Map/Vehicle" && myTo}
            alt="/home/Map/Vehicle"
            menuItemKey="Vehicle"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          />

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

