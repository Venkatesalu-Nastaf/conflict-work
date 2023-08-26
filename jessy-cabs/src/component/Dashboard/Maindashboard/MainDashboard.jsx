import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Sidebar from "../MainDash/Sildebar/Slidebar";
import { useNavigate, Outlet } from "react-router-dom"; 
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import logoImage from "../MainDash/Sildebar/Logo-Img/logo.png";
import { useThemes } from '../../UserSettings/Themes/ThemesContext'; 
import { ThemesProvider } from '../../UserSettings/Themes/ThemesContext';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { selectedTheme } = useThemes(); // Access selected theme

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      // StyledBadge styles
    },
    '@keyframes ripple': {
      // Ripple animation styles
    },
  }));

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setExpanded(true);
    navigate("/");
  };

  const handleButtonClickUserInfo = () => {
    window.location.href = '/home/usersettings/usersetting';
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
            <p onClick={handleButtonClickUserInfo}>abdul fahad</p>
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
