import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Badge from '@mui/material/Badge';
import { Outlet } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Sidebar from "../MainDash/Sildebar/Slidebar";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";

// Import the image
import logoImage from "../MainDash/Sildebar/Logo-Img/logo.png";

const MainDashboard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
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

  return (
    <>
      <section className="dash-board">
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
              <p>abdul fahad</p>
            </div>
            <div className="logout-item">
              <FiLogOut className="logout-icon" onClick={handleLogout} />
            </div>
          </div>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainDashboard;
