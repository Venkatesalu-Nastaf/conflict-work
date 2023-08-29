import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./Logo-Img/logo.png";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { motion } from "framer-motion";
import { Sidebardata } from "./Sidebar";
import { useLocation } from "react-router-dom";

const MenuItem = ({ item, index, currentPath, handleMenuItemClick }) => {
  const isActive = item.key === currentPath;

  return (
    <Link
      className={isActive ? "menuItem active" : "menuItem"}
      to={item.key}
      onClick={() => handleMenuItemClick(index, item.key)}
    >
      <item.icon />
      <span>{item.heading}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  const handleMenuItemClick = (index, key) => {
    setSelected(index);
    localStorage.setItem("selectedMenuItem", key);
    navigate(key);
  };

  useEffect(() => {
    const selectedMenuItem = localStorage.getItem("selectedMenuItem");
    const selectedItemIndex = Sidebardata.findIndex((item) => item.key === selectedMenuItem);
    setSelected(selectedItemIndex !== -1 ? selectedItemIndex : 0);
  }, []);

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
          {Sidebardata.map((item, index) => (
            <MenuItem
              item={item}
              index={index}
              currentPath={currentPath}
              handleMenuItemClick={handleMenuItemClick}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
