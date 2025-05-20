import { useState, useContext, useEffect } from 'react';
import "./Payment.css";
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

const Payment = () => {


  // permission -------------------

  const { permissions } = useContext(PermissionContext)

  // const Customer = permissions[9]?.read || permissions[8]?.read;
  // const Supllier = permissions[10]?.read;
  // const INFO = permissions[16]?.read;
  // const Station_Creation = permissions[14]?.read;

  
  const Payment_Vendor = permissions[8]?.read;
  const Payment_Customer = permissions[8]?.read
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

      case "Vendor":
        hasPermission = Payment_Vendor;
        break;
      case "Customer":
        hasPermission = Payment_Customer;
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
    <div className="Payment-conatiner" id="menu">
      <div className='menu-bar-main'>
        <div className="menu-bar">
          {Payment_Vendor ?
          <MenuItem
            label="Vendor"
            to={ Payment_Vendor && ("/home/payment/vendor")}
            alt="/home/payment/vendor"
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
          {Payment_Customer ?
          <MenuItem
            label="Customer"
            to={Payment_Customer && ("/home/payment/customer")}
            alt="/home/payment/customer"
            menuItemKey="Customer"
            activeMenuItem={activeMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          />:<></> }
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

export default Payment;
