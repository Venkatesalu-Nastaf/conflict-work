import React from "react";
import "./dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../MainDash/Sildebar/Slidebar";

const MainDashboard = () => {
  return (
    <>
      <section className="dash-board">
        <div className="glass">
          <Sidebar/>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainDashboard;
