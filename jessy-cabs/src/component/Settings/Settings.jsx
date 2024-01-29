import React, { useEffect } from "react";
import "./Settings.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, Outlet, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { CirclesWithBar } from "react-loader-spinner";
import useSettings from "./useSettings";

const MenuItem = ({ label, to, handleMenuItemClick }) => {
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

const Settings = () => {
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
  } = useSettings();

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
          <div className="Settings-main">
            <div className="menu-bar">
              <MenuItem
                label="User Creation"
                to="/home/settings/usercreation"
                menuItemKey="User Creation"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Permission"
                to="/home/settings/permission"
                menuItemKey="Permission"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Station Creation"
                to="/home/settings/stationcreation"
                menuItemKey="Station Creation"
                activeMenuItem={activeMenuItem}
                handleMenuItemClick={handleMenuItemClick}
              />
              <MenuItem
                label="Main setting"
                to="/home/settings/mainsetting"
                menuItemKey="Main setting"
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

export default Settings;
