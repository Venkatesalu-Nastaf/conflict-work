import React, { useEffect } from "react";
import "./Bookings.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CirclesWithBar } from "react-loader-spinner";
import useBooking from "./useBooking";

const MenuItem = ({ label, to, activeMenuItem, handleMenuItemClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`menu-link ${isActive ? "actives" : ""}`}
      to={to}
      onClick={() => handleMenuItemClick(label)}
    >
      {label}
    </Link>
  );
};

const Bookings = () => {
  const {
    actionName,
    warning,
    warningMessage,
    handleClick,
    hidePopup,
    isLoading,
    activeMenuItem,
    handleMenuItemClick,
    permissions,

    // ... (other state variables and functions)
  } = useBooking();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  return (
    <div className={isLoading ? "loading-container" : ""}>
      {isLoading ? (
        <div className="loading-spinners">
          <CirclesWithBar color="#fff" height={70} width={70} />
        </div>
      ) : (
        <>
          <div className="Bookings-main">
            <div className="menu-bar">
              <MenuItem
                label="Booking"
                to="/home/bookings/booking"
                menuItemKey="Booking"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Trip Sheet"
                to="/home/bookings/tripsheet"
                menuItemKey="Trip Sheet"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Received"
                to="/home/bookings/received"
                menuItemKey="Received"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Dispatched"
                to="/home/bookings/dispatched"
                menuItemKey="Dispatched"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
            </div>

            {permissions.read && <Outlet />}

            {warning && (
              <div className="alert-popup Warning">
                <div className="popup-icon">
                  {" "}
                  <ErrorOutlineIcon style={{ color: "#fff" }} />{" "}
                </div>
                <span className="cancel-btn" onClick={hidePopup}>
                  <ClearIcon color="action" style={{ fontSize: "14px" }} />{" "}
                </span>
                <p>{warningMessage}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;
