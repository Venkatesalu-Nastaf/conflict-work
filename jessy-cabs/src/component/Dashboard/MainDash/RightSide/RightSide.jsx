import React from "react";
import CustomerReview from "./CustomerReview/CustomerReview";
import Updates from "./Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div className="updates-comp">
        <Updates />
      </div>
      <div className="area-chart">
        <h3 className="area-chart-text">Area Chart</h3>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;