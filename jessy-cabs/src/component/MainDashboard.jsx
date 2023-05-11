import React from "react";
import "../Style/dashboard.css";
import Sidebar from "./Sildebar/Slidebar";
// import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import MainDash from "./MainDash/MainDash";
import Rightside from "./RightSide/RightSide";

const MainDashboard = () => {
  return (
    <>
      <section className="dash-board">
        <div className="glass">
          <Sidebar />
          <div className="MainDash">
            <MainDash />
          </div>
          <Rightside />
        </div>
      </section>
    </>
  );
};

export default MainDashboard;
