import React, { useState, useEffect, useCallback, useContext } from "react";
import "./MainDashboard.css";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Sidebar from "../MainDash/Sildebar/Slidebar";
import { useNavigate, Outlet } from "react-router-dom";
// import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { useThemes } from "../../UserSettings/Themes/ThemesContext";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { ThemesProvider } from "../../UserSettings/Themes/ThemesContext";
import { useUser } from "../../form/UserContext";
import Button from "@mui/material/Button";
import { useData } from "./DataContext"; //- data contaxt
import Logo from "../../../assets/img/logonas.png"
import { PiWarningCircleBold } from "react-icons/pi";
// import { FaPowerOff } from "react-icons/fa";
import { IoPower } from "react-icons/io5";
import { PermissionContext } from "../../context/permissionContext";
import update from "../../../assets/img/update.png"
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons/fa
import { FaBell } from "react-icons/fa";
// import axios from "axios";

//dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { APIURL } from "../../url";
import Tooltip from '@mui/material/Tooltip';

// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';

const MainDashboard = () => {

  const apiUrl = APIURL;
  const { sharedData, setFilteredData,datatriguserinfo } = useData();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { selectedTheme } = useThemes();
  const { setSelectedTheme } = useThemes();
  const [success, setSuccess] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, setUserdashboard, userdashboard } = useUser();
  const data1 = localStorage.getItem("useridno")
  const data2 = localStorage.getItem("usercompany")
  const data4 = localStorage.getItem("username");
  const data5 = localStorage.getItem("profileimages")
  const data6 = localStorage.getItem("organizationimages")

  const { setUser_id, setMakeRender, permissions, setPermission } = useContext(PermissionContext)

  useEffect(() => {

    setSelectedImage(sharedData)
  }, [sharedData])

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const IDLE_TIMEOUT_DURATION = 5 * 60 * 1000;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {},
    "@keyframes ripple": {},
  }));

  const handleLogout = useCallback(() => {
    setPopupOpen(true);
  }, []);

  const handleLogoutdialog = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
      localStorage.removeItem("useridno");
      localStorage.removeItem("selectedImage");
      localStorage.removeItem("selectedprofileImage");
      localStorage.removeItem("usercompany");
      localStorage.removeItem("selectedMenuItem");
      localStorage.removeItem("profileimages")
      localStorage.removeItem("organizationimages")
      localStorage.removeItem("selectedusertheme")
      localStorage.removeItem("username")

      setPermission([]);
      setExpanded(true);
      navigate("/");
      setMakeRender((prev) => !prev);
    },
    [navigate]
  );

  useEffect(() => {

    if (!localStorage.getItem("auth")) {
      navigate("/");
    } else {
      let timeout;

      const resetIdleTimeout = () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          handleLogout();
        }, IDLE_TIMEOUT_DURATION);
      };

      const handleUserActivity = () => {
        resetIdleTimeout();
      };

      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);

      resetIdleTimeout();

      return () => {
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("keydown", handleUserActivity);
        clearTimeout(timeout);
      };
    }
  }, [navigate, handleLogout, IDLE_TIMEOUT_DURATION]);

  const hidePopup = () => {
    setSuccess(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (user && user.username) {
      const username = user.username;
      localStorage.setItem("username", username);
      const successMessagepopup = `Login successful ${user.username}`;
      setSuccess(successMessagepopup);
    }
  }, [user,datatriguserinfo ]);

  const storedUsername = localStorage.getItem("username");

  const navigateToUserSettings = () => {
    if (window.location.pathname !== "/home/usersettings/usersetting") {
      navigate("/home/usersettings/usersetting");
    }
  };

  const [routeData, setRouteData] = useState("");

  const storeUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      const username = storeUsername;
      try {
        const response = await fetch(
          `${apiUrl}/userdata/${encodeURIComponent(username)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const routeData = await response.json();
        const usertheme = routeData[0]?.theme;
        setSelectedTheme(usertheme);
        localStorage.setItem("selectedusertheme", JSON.stringify(usertheme));
        setRouteData(routeData);
      } catch (error) { }
    };
    fetchData();
  }, [storeUsername, setSelectedTheme, apiUrl]);
  const storedusertheme = JSON.parse(localStorage.getItem("selectedusertheme"));

  const useridno = routeData[0]?.userid;
  const usercompany = routeData[0]?.organizationname;
  setUser_id(useridno);

  localStorage.setItem("useridno", useridno);

  localStorage.setItem("usercompany", usercompany);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/tripsheet-maindash`);
        if (response.status === 200) {
          if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
              setFilteredData(data);
            } else {
              setFilteredData([]);
            }
          } else {
          }
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch {
      }
    };

    fetchData();
  }, [apiUrl, setFilteredData]);

  useEffect(() => {
    if (permissions.length > 1 && data1 !== undefined && data4 !== null && data2 !== undefined && storedusertheme !== null && selectedImage !== null) {
      setTimeout(() => {
        setUserdashboard(false)
      }, 3000);

    }
  }, [data1, data2, data4, data5, setUserdashboard, data6, selectedImage, storedusertheme, permissions]);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleIconClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handlePopupmodalClose = () => {
    setPopupVisible(false);
  };

  return (
    <>
      {isPopupVisible && (
        <div className="popup" onClick={handlePopupmodalClose}>
          <div className="update-card ">

            <div className="close-button-container">
              <button className="close-button" onClick={handlePopupmodalClose}>
                {/* Close icon */}
                <FaTimes />
              </button>
            </div>
            <img src={update} alt="update" className="whats-new-image" />
            <h3 className="text-black update-text py-3">
              Update for more Features
            </h3>
            <button className="update-button">update</button>
          </div>
        </div>
      )}
      {userdashboard ? (
        <div className={userdashboard ? "loading-container" : ""}>
          <div className="loading-spinners">
            <div className="logo-loading">
              <img src={Logo} alt="logo" />
            </div>
          </div>
        </div>
      ) :
        <section
          className={`dash-board ${storedusertheme ? storedusertheme : selectedTheme}`}
        >
          <div className="glass">
            <Sidebar expanded={expanded} />
            <div className="header-user">
              <div className="avatar-item">
                <Tooltip title={`Hi ${storedUsername}`} arrow>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt="userimage"
                      src={`${apiUrl}/public/user_profile/${selectedImage}`}
                    />
                  </StyledBadge>
                </Tooltip>
                { }
              </div>
              <div className="user-name-item">
                {storedUsername ? (
                  <div className="tooltip">
                    <p className="login-user-name-text" onClick={navigateToUserSettings}>{storedUsername}</p>
                    <span class="tooltiptext">{storedUsername}</span>
                    <div className="alert-popup-main">
                      {success && (
                        <div className="alert-popup Success">
                          <div className="popup-icon">
                            {" "}
                            <FileDownloadDoneIcon />{" "}
                          </div>
                          <span className="cancel-btn" onClick={hidePopup}>
                            <ClearIcon color="action" />{" "}
                          </span>
                          <p>{success}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>User not logged in</p>
                  </div>
                )}
              </div>
              <div className="logout-item">
                <IoPower className="logout-icon" onClick={handleLogout} />
              </div>
              <div className="user-icon-update" onClick={handleIconClick}>
                <FaBell />
                <div className="user-icon-update-dot"></div>
              </div>
            </div>
            <Outlet />
          </div>
          <Dialog open={popupOpen} onClose={handlePopupClose}>
            <DialogContent>
              <p className="modal-warning-icon">< PiWarningCircleBold className="warning-icon" /></p>
              <p className="modal-warning-text">Are you sure want to logout from this <br /> application ?</p>
            </DialogContent>
            <DialogActions className="yes-no-buttons">
              <Button
                onClick={handleLogoutdialog}
                variant="contained"
                className="logout-btn"
              >
                Yes, I'm Sure
              </Button>
              <Button
                onClick={handlePopupClose}
                variant="contained"
                className="logout-cancel-btn"
              >
                NO, Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </section>
      }
    </>
  );
};

const WrappedMainDashboard = () => {
  return (
    <ThemesProvider>
      <MainDashboard />
    </ThemesProvider>
  );
};

export default WrappedMainDashboard;
