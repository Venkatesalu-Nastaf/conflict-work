import React from "react";
import "./MainDash.css";
import RightSide from "../RightSide/RightSide";
import Cards from "../Cards/Cards";
import { Table } from "@mui/material";

const MainDash = () => {
  return (
    <>
      <div className="MainDash">

        <h1>Dashboard</h1>
        <Cards/>
        <h1>Driver Review</h1>
        <Table/>
      </div>
      <RightSide/>
    </>
  );
};

export default MainDash;
