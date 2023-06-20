import React from "react";
import "./dashboard.css";
import Sidebar from "../Sildebar/Slidebar";
import { Outlet } from "react-router-dom";

const MainDashboard = () => {
  return (
    <>
      <section className="dash-board">
        <div className="glass">
          <Sidebar />
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainDashboard;
