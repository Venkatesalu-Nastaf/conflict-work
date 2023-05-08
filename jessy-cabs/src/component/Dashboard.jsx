import React, { useState } from "react";
import '../Style/dashboard.css';
import Sidebar from "./Sildebar/Slidebar";
import MainDash from "./MainDash/MainDash";


const Dashboard = () => {

  return (
    <>
      <section className="dash-board">
        <div className="glass">
          <Sidebar />
          <MainDash />
          <div></div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
