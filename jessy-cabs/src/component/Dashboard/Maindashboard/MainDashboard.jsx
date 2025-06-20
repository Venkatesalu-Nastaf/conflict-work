import React, { useState, useEffect, useCallback, useContext } from "react";
import "./MainDashboard.css";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Sidebar from "../MainDash/Sildebar/Slidebar";
import { useNavigate, Outlet } from "react-router-dom";
import { useThemes } from "../../UserSettings/Themes/ThemesContext";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { ThemesProvider } from "../../UserSettings/Themes/ThemesContext";
import { useUser } from "../../form/UserContext";
import Button from "@mui/material/Button";
import { useData1 } from "./DataContext"; //- data contaxt
import Logo from "../../../assets/img/logo.png"
import { PiWarningCircleBold } from "react-icons/pi";
import { IoPower } from "react-icons/io5";
import { PermissionContext } from "../../context/permissionContext";
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons/fa
import { FaBell } from "react-icons/fa";
import { useData } from "../MainDash/Sildebar/DataContext2";

//dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { APIURL } from "../../url";
import Tooltip from '@mui/material/Tooltip';
import { BiSolidBellRing } from "react-icons/bi";

const MainDashboard = () => {

  const apiUrl = APIURL;
  const { datatriguserinfo, expanded, setExpanded } = useData1();
  // const { setFilteredData, datatriguserinfo, expanded, setExpanded } = useData1();

  const navigate = useNavigate();

  const { selectedTheme, setSelectedAvatar, selectedavtar, setSelectedTheme } = useThemes();
 
  const [success, setSuccess] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user, setUserdashboard, userdashboard } = useUser();
  const data1 = localStorage.getItem("useridno")
  const data4 = localStorage.getItem("username");
  const data6 = localStorage.getItem("organizationimages")

  const { setUser_id, setMakeRender, permissions, setPermission } = useContext(PermissionContext)


  // ------------

  const [setSendTrue] = useState("");
  const sendTrueValue = (datavaule) => {
    setSendTrue(datavaule);
  }


  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  // const IDLE_TIMEOUT_DURATION = 5 * 60 * 1000;

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
      // localStorage.removeItem("auth");
      localStorage.setItem("auth",false);
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
      localStorage.removeItem("searchdataurl")
 
      localStorage.removeItem("SuperAdmin")
      // localStorage.removeItem("expiretime")
      localStorage.removeItem('reports')



      setPermission([]);
      setExpanded(true);
      navigate("/");
      setMakeRender((prev) => !prev);
    },
    [navigate, setMakeRender, setPermission]
  );

  

  // useEffect(() => {

  //   if (!localStorage.getItem("auth")) {
  //     navigate("/");
  //   } else {
  //     let timeout;

  //     const resetIdleTimeout = () => {
  //       if (timeout) {
  //         clearTimeout(timeout);
  //       }
  //       timeout = setTimeout(() => {
  //         handleLogout();
  //       }, IDLE_TIMEOUT_DURATION);
  //     };

  //     const handleUserActivity = () => {
  //       resetIdleTimeout();
  //     };

  //     window.addEventListener("mousemove", handleUserActivity);
  //     window.addEventListener("keydown", handleUserActivity);

  //     resetIdleTimeout();

  //     return () => {
  //       window.removeEventListener("mousemove", handleUserActivity);
  //       window.removeEventListener("keydown", handleUserActivity);
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [navigate, handleLogout, IDLE_TIMEOUT_DURATION]);
  const IDLE_TIMEOUT_DURATION = 30 * 60 * 1000;
  // const IDLE_TIMEOUT_DURATION = 1000;

  const useIdleTimeout = (handleLogoutdialog) => {
    const checkinactivity = useCallback(() => {
      const expiretime = localStorage.getItem("expiretime");

      if (expiretime && Number(expiretime) < Date.now()) {
        // console.log("logout");
        // localStorage.removeItem("auth");
        localStorage.setItem("auth",false);
        handleLogoutdialog();
      }
      // console.log("timeout");
    }, [handleLogoutdialog]);

    const Upadteexpiretime = useCallback(() => {
      const expiretime = Date.now() + IDLE_TIMEOUT_DURATION;
      localStorage.setItem("expiretime", expiretime);
    }, []);

    useEffect(() => {
      Upadteexpiretime();

      const events = ["mousemove", "keypress", "click", "scroll", "keydown"];
      events.forEach(event => window.addEventListener(event, Upadteexpiretime));

      return () => {
        events.forEach(event => window.removeEventListener(event, Upadteexpiretime));
      };
    }, [Upadteexpiretime]);

    useEffect(() => {
      const checkintrvval = setInterval(() => {
        checkinactivity();
      }, 1000); // Check inactivity every second

      return () => clearInterval(checkintrvval);
    }, [checkinactivity]);
  };

  useIdleTimeout(handleLogoutdialog)




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
  }, [user, datatriguserinfo]);

  const storedUsername = localStorage.getItem("username");
  const navigateToUserSettings = () => {
    if (window.location.pathname !== "/home/usersettings/usersetting") {
      navigate("/home/usersettings/usersetting");
    }
  };

  const [routeData, setRouteData] = useState("");
  const storeUsername = localStorage.getItem("username");
  const { setOrgName } = useData()
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
        const userprofile = routeData[0]?.profile_image
        setSelectedTheme(usertheme);
        setSelectedAvatar(userprofile)
        localStorage.setItem("selectedusertheme", JSON.stringify(usertheme));
        localStorage.setItem("selectedProfileimageuser", JSON.stringify(userprofile))
        if (routeData) {
          setOrgName(routeData[0]?.organizationname)
          localStorage.setItem("useridno", routeData[0]?.userid);
          setRouteData(routeData);
        }

      } catch (error) {
        console.log("error", error)
      }
    };
    fetchData();
  }, [storeUsername, setSelectedTheme, apiUrl, setSelectedAvatar]);
  const storedusertheme = JSON.parse(localStorage.getItem("selectedusertheme"));

  const useridno = routeData[0]?.userid;
  // const usercompany = routeData[0]?.organizationname;
  setUser_id(useridno);

  // useLayoutEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/tripsheet-maindash`);
  //       if (response.status === 200) {
  //         if (response.ok) {
  //           const data = await response.json();
  //           if (data.length > 0) {
  //             setFilteredData(data);
  //           } else {
  //             setFilteredData([]);
  //           }
  //         } else {
  //         }
  //       }
  
  //     } catch {
  //     }
  //   };

  //   fetchData();
  // }, [apiUrl]);

  useEffect(() => {
    if (permissions.length > 1 && data1 !== undefined && data4 !== null  && storedusertheme !== null) {
      setTimeout(() => {
        setUserdashboard(false)
      }, 2000);

    }
  }, [data1,data4,setUserdashboard, data6, storedusertheme, permissions]);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleIconClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handlePopupmodalClose = () => {
    setPopupVisible(false);
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iPhone-responsive';
    }

    // Android detection
    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    return 'unknown';
  };

  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    const type = getDeviceType();
    setDeviceType(type);
  }, []);

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
            {/* <img src={update} alt="update" className="whats-new-image" /> */}
            <div>
              <div>
                <BiSolidBellRing className="notification-bell-icon" />
              </div>
              <div style={{ fontSize: '20px', fontWeight: '600' }}>
                What's New!
              </div>
            </div>
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
          className={`dash-board ${storedusertheme ? storedusertheme : selectedTheme} ${deviceType}`}
        >
          {/* <div className="glass"> */}
          <div className={`glass ${expanded ? 'side-bar-menu-open' : 'side-bar-menu-close'}`}>
            <Sidebar onData={sendTrueValue} expanded={expanded} />
            <div className="header-user">
              <div className="avatar-item">
                <Tooltip title={`Hi ${storedUsername}`} arrow>
                  <span>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt="userimage"
                        // src={`${apiUrl}/public/user_profile/${selectedImage}`}
                        src={selectedavtar}
                      />
                    </StyledBadge>
                  </span>
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
          <Dialog open={popupOpen} onClose={handlePopupClose} className="open-dialog"   BackdropProps={{ className: 'custom-dialog-backdrop' }}
>
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