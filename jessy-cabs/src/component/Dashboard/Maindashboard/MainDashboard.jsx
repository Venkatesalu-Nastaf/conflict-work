import React, { useState, useEffect } from "react";
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
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    },
    '@keyframes ripple': {
    },
  }));

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/"); // Redirect to the login page
    }
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    setExpanded(true);
    navigate("/");
  };

  const hidePopup = () => {
    setSuccess(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
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
