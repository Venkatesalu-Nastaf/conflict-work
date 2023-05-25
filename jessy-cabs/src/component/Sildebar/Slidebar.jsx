import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { Sidebardata } from "../../Data/Data";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setExpanded(true);
    navigate("/");
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
            <Link
              className={selected === index ? "menuItem active" : "menuItem"}
              key={item.key}
              to={item.key}
              onClick={() => handleMenuItemClick(index, item.key)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          ))}
          <div className="menuItem">
            <FiLogOut onClick={handleLogout} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
