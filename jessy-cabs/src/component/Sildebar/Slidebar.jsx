import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { Sidebardata } from "../../Data/Data";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { motion } from "framer-motion";
const Sidebar = () => {
  const navigates = useNavigate();
  const menu = (keys) => {
    navigates(keys);
  };
  function main(inx, key) {
    setSelected(inx);
    menu(key);
  }
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  const navigate = useNavigate();
  const [logout, setlogout] = useState(false);
  React.useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/");
  }, [logout]);

  const logouHandler = (e) => {
    e.preventDefault();
    if (!localStorage.removeItem("auth"));
    setlogout(true);
  };
  console.log(window.innerWidth);
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <AiOutlineBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="menu">
          {Sidebardata.map((item, index) => {
            return (
              <Link
                className={selected === index ? "menuItem active" : "menuItem"}
                key={item.key}
                to={item.key}
                onClick={() => main(index, item.key)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </Link>
            );
          })}
          <div className="menuItem">
            <FiLogOut onClick={logouHandler} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
