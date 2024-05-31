import { useState, useContext, useEffect } from 'react';
import "./Billings.css";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
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

const Billings = () => {
  //permission --------------

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

  const { permissions } = useContext(PermissionContext)
  const Billing = permissions[5]?.read || permissions[4]?.read;;
  const Transfer = permissions[6]?.read;
  const Covering_Bill = permissions[7]?.read;
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const handleMenuItemClick = (label, alt, e) => {
    localStorage.setItem('activeMenuItem', label);
    setActiveMenuItem(label);
    let hasPermission = 0
    switch (label) {
      case "Billing":
        hasPermission = Billing;
        break;
      case "Transfer":
        hasPermission = Transfer;
        break;
      case "Covering Bill":
        hasPermission = Covering_Bill;
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

    <div className="billings-conatiner" id="menu">
      <div className="menu-bar">
        <MenuItem
          label="Billing"
          to={Billing && ("/home/billing/billing")}
          alt="/home/billing/billing"
          menuItemKey="Billing"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Transfer"
          to={Transfer && ("/home/billing/transfer")}
          alt="/home/billing/transfer"
          menuItemKey="Transfer"
          activeMenuItem={activeMenuItem}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuItem
          label="Covering Bill"
          to={Covering_Bill && ("/home/billing/coveringbill")}
          alt="/home/billing/coveringbill"
          menuItemKey="Covering Bill"
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

export default Billings;
