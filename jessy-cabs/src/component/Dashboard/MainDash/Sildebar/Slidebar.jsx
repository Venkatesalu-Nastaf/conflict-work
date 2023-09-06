import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Logo from "./Logo-Img/logo.png";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { motion } from "framer-motion";
import { Sidebardata } from "./Sidebar";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
import { BiNotepad } from "@react-icons/all-files/bi/BiNotepad";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { AiOutlineFileProtect } from "@react-icons/all-files/ai/AiOutlineFileProtect";
import { BiBarChartSquare } from "@react-icons/all-files/bi/BiBarChartSquare";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";

const MenuItem = ({ label, to, menuItemKey, isActive, handleMenuItemClick, icon: Icon }) => {
  return (
    <Link
      className={isActive(menuItemKey) ? "menuItem active" : "menuItem"}
      to={to}
      onClick={() => handleMenuItemClick(menuItemKey)}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  const isActive = (itemKey) => {
    // Check if the current path includes the itemKey
    return currentPath.includes(itemKey);
  };

  const handleMenuItemClick = (menuItemKey) => {
    localStorage.setItem("selectedMenuItem", menuItemKey);
    navigate(menuItemKey);
  };

  useEffect(() => {
    const selectedMenuItem = localStorage.getItem("selectedMenuItem");
    const selectedItemIndex = Sidebardata.findIndex((item) => item.key === selectedMenuItem);
    if (selectedItemIndex !== -1) {
      navigate(selectedMenuItem);
    }
  }, [navigate]);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <AiOutlineBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="menu">
          <MenuItem
            label="Dashboard"
            to="/home/dashboard"
            menuItemKey="/home/dashboard"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiHomeAlt}
          />
          <MenuItem
            label="Customers"
            to="/home/customers/customers"
            menuItemKey="/home/customers"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={HiOutlineUsers}
          />
          <MenuItem
            label="Orders"
            to="/home/orders/received"
            menuItemKey="/home/orders"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiNotepad}
          />
          <MenuItem
            label="Billing"
            to="/home/billing"
            menuItemKey="/home/billing"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={BiBarChartSquare}
          />
          <MenuItem
            label="Options"
            to="/home/options/ratetype"
            menuItemKey="/home/options"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineFileProtect}
          />
          <MenuItem
            label="Settings"
            to="/home/settings/usercreation"
            menuItemKey="/home/settings"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={AiOutlineSetting}
          />
          <MenuItem
            label="User"
            to="/home/usersettings/usersetting"
            menuItemKey="/home/usersettings"
            isActive={isActive}
            handleMenuItemClick={handleMenuItemClick}
            icon={FaUserAstronaut}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
