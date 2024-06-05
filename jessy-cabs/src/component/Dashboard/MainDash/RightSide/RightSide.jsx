import React from "react";
import CustomerReview from "./CustomerReview/CustomerReview";
import Updates from "./Updates/Updates";
import "./RightSide.css";

const RightSide = ({stationName}) => {
  return (
    <div className="RightSide">
      <div className="updates-comp">
        <Updates />
      </div>
      <div className="area-chart">
        <h3 cl className="area-chart-text">Area Chart</h3>
        <CustomerReview  station={stationName}/>
      </div>
    </div>
  );
};

export default RightSide;