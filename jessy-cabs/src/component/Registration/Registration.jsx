import { useState, useContext, useEffect } from 'react';
import "./Registration.css";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { PermissionContext } from '../context/permissionContext';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';

const MenuItem = ({ label, to, alt, activeMenuItem, handleMenuItemClick }) => {
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

const Registration = () => {


  // permission -------------------

  const { permissions } = useContext(PermissionContext)

  // const Customer = permissions[9]?.read || permissions[8]?.read;
  // const Supllier = permissions[10]?.read;
  // const INFO = permissions[16]?.read;
  // const Station_Creation = permissions[14]?.read;

  
  const R_RATEtype = permissions[10]?.read ;
  const R_Customer = permissions[11]?.read ;
  const R_Supllier = permissions[12]?.read ;
  const R_Station = permissions[13]?.read ;
  // const Rate_Management = permissions[17]?.read;

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



  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (label, alt, e) => {
    localStorage.setItem('activeMenuItem', label);
    setActiveMenuItem(label);

    let hasPermission = 0

    switch (label) {

      case "Rate Type":
        hasPermission = R_RATEtype;
        break;
      // case "Rate Management":
      //   hasPermission = Rate_Management;
      //   break;
      case "Customer":
        hasPermission = R_Customer;
        break;
      case "Supplier":
        hasPermission = R_Supllier;
        break;
        case "Station Creation":
          hasPermission = R_Station;
          break;
      // case "Employees":
      //   hasPermission = Employee;
      //   break;
      // case "Reports":
      //   hasPermission = Employee;
      //   break;
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
    <div className="Registration-conatiner" id="menu">
      <div className='menu-bar-main'>
        <div className="menu-bar">
          {R_RATEtype ?
          <MenuItem
            label="Rate Type"
            to={R_RATEtype && ("/home/registration/ratetype")}
            alt="/home/registration/ratetype"
            menuItemKey="Ratetype"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> :<></>}
          {/* <MenuItem
            label="Rate Management"
            to={Rate_Management && ("/home/registration/ratemanagement")}
            alt="/home/registration/ratemanagement"
            menuItemKey="Ratemanagement"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> */}
          {R_Customer ?
          <MenuItem
            label="Customer"
            to={R_Customer && ("/home/registration/customer")}
            alt="/home/registration/customer"
            menuItemKey="Customer"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          />:<></> }
          {R_Supllier ?
          <MenuItem
            label="Supplier"
            to={R_Supllier && ("/home/registration/supplier")}
            alt="/home/registration/supplier"
            menuItemKey="Supplier"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> :<></>}
          {R_Station ? 
           <MenuItem
            label="Station Creation"
            to={R_Station && ("/home/registration/stationcreation")}
            alt="/home/registration/stationcreation"
            menuItemKey="Station Creation"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> :<></>}
          {/* <MenuItem
            label="Employees"
            to={Employee && ("/home/registration/employes")}
            alt="/home/registration/employes"
            menuItemKey="Employees"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          />
          <MenuItem
            label="Reports"
            to={Employee && ("/home/registration/reports")}
            // to="/home/registration/reports"
            alt="/home/registration/reports"
            menuItemKey="Reports"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          /> */}
        </div>
      </div>
      <div className='alert-popup-main'>
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
            <p style={{color: 'black'}}>You do not have Permissionssssssssssssss ..!</p>
          </div>
        }
      </div>

      <Outlet />

    </div>
  );
};

export default Registration;
