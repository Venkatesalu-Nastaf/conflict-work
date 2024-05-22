import { useState, useContext, useEffect } from 'react';
import "./Bookings.css";
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

const Bookings = () => {

  const { permissions } = useContext(PermissionContext);
  // const BOOKING = permissions[0]?.read;
  const Booking = permissions[1]?.read || permissions[0]?.read;;
  const Trip_Status = permissions[2]?.read;
  const Trip_sheet = permissions[3]?.read;
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
      case "Booking":
        hasPermission = Booking;
        break;
      case "Trip Status":
        hasPermission = Trip_Status;
        break;
      case "Trip Sheet":
        hasPermission = Trip_sheet;
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
      }
    }
    catch {
    }
  };

  return (

    <div className="Bookings-main">
      <div className="menu-bar">
        <MenuItem
          label="Booking"
          to={Booking && ("/home/bookings/booking")}
          alt="/home/bookings/booking"
          menuItemKey="Booking"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Trip Status"
          to={Trip_Status && ("/home/bookings/tripstatus")}
          alt="/home/bookings/tripstatus"
          menuItemKey="TripStatus"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Trip Sheet"
          to={Trip_sheet && ("/home/bookings/tripsheet")}
          alt="/home/bookings/tripsheet"
          menuItemKey="Trip Sheet"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
      </div>
      <div className='alert-popup-main'>
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>You do not have Permission ..!</p>
          </div>
        }
      </div>

      <Outlet />

    </div>

  );
};

export default Bookings;
