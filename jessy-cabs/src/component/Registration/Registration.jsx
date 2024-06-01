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


  const Customer = permissions[9]?.read || permissions[8]?.read;
  const Supllier = permissions[10]?.read;
  const Employee = permissions[11]?.read;


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

      case "Customer":
        hasPermission = Customer;
        break;
      case "Supplier":
        hasPermission = Supllier;
        break;
      case "Employees":
        hasPermission = Employee;
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
    <div className="Registration-conatiner" id="menu">
      <div className="menu-bar">
        <MenuItem
          label="Customer"
          to={Customer && ("/home/registration/customer")}
          alt="/home/registration/customer"
          menuItemKey="Customer"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Supplier"
          to={Supllier && ("/home/registration/supplier")}
          alt="/home/registration/supplier"
          menuItemKey="Supplier"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Employees"
          to={Employee && ("/home/registration/employes")}
          alt="/home/registration/employes"
          menuItemKey="Employees"
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

export default Registration;
