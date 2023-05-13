import React from "react";
import "../Style/dashboard.css";
import Sidebar from "./Sildebar/Slidebar";
import Rightside from "./RightSide/RightSide";
// import MainDash from "./MainDash/MainDash";
import { Outlet } from "react-router-dom";

const MainDashboard = () => {
  return (
    <>
      <section className="dash-board">
        <div className="glass">
          <Sidebar />
          <div className="MainDash">
            <Outlet />
            {/* <MainDash /> */}
          </div>
          <Rightside />
        </div>
      </section>
    </>
  );
};

export default MainDashboard;
