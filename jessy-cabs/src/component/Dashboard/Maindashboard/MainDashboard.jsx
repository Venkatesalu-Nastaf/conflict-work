import React, { useState, useEffect, useCallback } from "react";
import "./MainDashboard.css";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Sidebar from "../MainDash/Sildebar/Slidebar";
import { useNavigate, Outlet } from "react-router-dom";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import logoImage from "../MainDash/Sildebar/Logo-Img/logo.png";
import { useThemes } from '../../UserSettings/Themes/ThemesContext';
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { ThemesProvider } from '../../UserSettings/Themes/ThemesContext';
import { useUser } from '../../form/UserContext';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { selectedTheme } = useThemes();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);

  const IDLE_TIMEOUT_DURATION = 5 * 60 * 1000;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    },
    '@keyframes ripple': {
    },
  }));

  const handleLogout = useCallback((e) => {
    if (e) {
      e.preventDefault();
    }
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("useridno");
    localStorage.removeItem("usercompany");
    setExpanded(true);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Check if the event's returnValue property is set. If it's set, it means the browser is being closed.
      if (event) {
        event.returnValue = ''; // For some browsers to display a confirmation dialog before closing
      }
      // Remove auth only if it's not a page refresh
      if (performance.navigation.type !== 1) {
        localStorage.removeItem("auth");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


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
  }, [user]);

  const storedUsername = localStorage.getItem("username");

  const navigateToUserSettings = () => {
    if (window.location.pathname !== "/home/usersettings/usersetting") {
      navigate("/home/usersettings/usersetting");
    }
  };

  const [routeData, setRouteData] = useState('');

  const storeUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      const username = storeUsername;
      try {
        const response = await fetch(`http://localhost:8081/userdata/${encodeURIComponent(username)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const routeData = await response.json();
        setRouteData(routeData);
      } catch (error) {
      }
    };
    fetchData();
  }, [storeUsername]);

  const useridno = routeData[0]?.userid;
  const usercompany = routeData[0]?.organizationname;

  localStorage.setItem('useridno', useridno);

  localStorage.setItem('usercompany', usercompany);


  return (
    <section className={`dash-board ${selectedTheme}`}>
      <div className="glass">
        <Sidebar expanded={expanded} />
        <div className="header-user">
          <div className="avatar-item">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="userimage" src={logoImage} />
            </StyledBadge>
          </div>
          <div className="user-name-item">
            {storedUsername ? (
              <div>
                <p onClick={navigateToUserSettings}>{storedUsername}</p>
                {success &&
                  <div className='alert-popup Success' >
                    <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p>{success}</p>
                  </div>
                }
              </div>
            ) : (
              <div>
                <p>User not logged in</p>
              </div>
            )}
          </div>
          <div className="logout-item">
            <FiLogOut className="logout-icon" onClick={handleLogout} />
          </div>
        </div>
        <Outlet />
      </div>
    </section>
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
