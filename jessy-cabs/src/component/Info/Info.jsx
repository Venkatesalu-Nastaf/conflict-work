import { useContext, useState, useEffect } from 'react';
import "./Info.css";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
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

const Info = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  //------------------popup------------------------

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

  //end-----------------------------------

  // permission -----------------

  const { permissions } = useContext(PermissionContext)
  const INFO = permissions[16]?.read;
  const Rate_Management = permissions[17]?.read;
  const Mailers = permissions[18]?.read;
  const Fuel_Info = permissions[19]?.read;
  const handleMenuItemClick = (menuItem, alt, e) => {
    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);
    let hasPermission = 0;
    switch (menuItem) {
      case "Rate Management":
        hasPermission = Rate_Management;
        break;
      case "Mailers":
        hasPermission = Mailers;
        break;
      case "Fuel Info":
        hasPermission = Fuel_Info;
        break;
      case "Rate Type":
        hasPermission = INFO;
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

  //---------------------------------------

  const myLocation = useLocation();
  var myTo = ''
  if (myLocation.pathname === '/home/info/mailer/TemplateSelection') {
    myTo = '/home/info/mailer/TemplateSelection';
  }
  else if (myLocation.pathname === '/home/info/mailer/TemplateCreation') {
    myTo = '/home/info/mailer/TemplateCreation'
  }
  else {
    myTo = '/home/info/mailer';
  }

  return (
    <div className="Info-conatiner" id="menu">
      <div className="menu-bar">
        <MenuItem
          label="Rate Type"
          to={INFO && ("/home/info/ratetype")}
          alt="/home/info/ratetype"
          menuItemKey="Rate Type"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Rate Management"
          to={Rate_Management && ("/home/info/ratemanagement")}
          alt="/home/info/ratemanagement"
          menuItemKey="Rate Management"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Mailers"
          to={Mailers && myTo}
          alt={myTo}
          menuItemKey="Mailers"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Fuel Info"
          to={Fuel_Info && ("/home/info/fuelinfo")}
          alt={"/home/info/fuelinfo"}
          menuItemKey="FuelInfo"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
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

export default Info;
