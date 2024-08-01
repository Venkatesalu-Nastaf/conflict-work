// import React from 'react'

// export const Vehiecle = () => {
//   return (
//     <div>Vehiecle</div>
//   )
// }

import React from 'react'
import { useState, useContext, useEffect } from 'react';
// import "./Billings.css";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
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

const Vehiecle = () => {
  //permission --------------

  return (

    <div className="billings-conatiner" id="menu">
      <div className="menu-bar-main">
        <div className="menu-bar">
          <MenuItem
            label="overview"
            // to={Billing && ("/home/billing/billing")}
            alt="/home/billing/billing"
            menuItemKey="Billing"
            // activeMenuItem={activeMenuItem}
            // handleMenuItemClick={handleMenuItemClick}
          />
          <MenuItem
            label="Vehiecle"
            // to={Transfer && ("/home/billing/transfer")}
            alt="/home/billing/transfer"
            menuItemKey="Transfer"
            // activeMenuItem={activeMenuItem}
            // handleMenuItemClick={handleMenuItemClick}
          />
         
        </div>
      </div>
      <div className='alert-popup-main'>
        {/* {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
            <p>You do not have Permission ..!</p>
          </div>
        } */}
      </div>

      <Outlet />

    </div>

  );
};

export default Vehiecle;
