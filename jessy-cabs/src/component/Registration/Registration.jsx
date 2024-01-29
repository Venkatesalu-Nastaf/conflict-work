import React, { useEffect } from "react";
import "./Registration.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CirclesWithBar } from "react-loader-spinner";
import useRegistration from "./useRegistration";

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

const Registration = () => {
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
  } = useRegistration();

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
          <div className="Registration-conatiner" id="menu">
            <div className="menu-bar">
              <MenuItem
                label="Customer"
                to="/home/registration/customer"
                menuItemKey="Customer"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Supplier"
                to="/home/registration/supplier"
                menuItemKey="Supplier"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Employees"
                to="/home/registration/employes"
                menuItemKey="Employees"
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

export default Registration;
