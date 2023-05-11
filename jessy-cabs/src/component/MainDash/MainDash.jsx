import React from "react";
import "../../Style/MainDash.css";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";

const MainDash = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Cards />
      <h1>Driver Review</h1>
      <Table />
    </>
  );
};

export default MainDash;
