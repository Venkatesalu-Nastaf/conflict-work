import React, { useState, useEffect } from "react";
import "./MainDash.css";
import RightSide from "./RightSide/RightSide";
import Cards from "./Cards/Cards";
import Table from "./Table/Table";
const MainDash = () => {

  const [isBelow768px, setIsBelow768px] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsBelow768px(window.innerWidth < 768.99);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {isBelow768px ? (
        <div className="main-dash-main-section">
          <div className="MainDash">
            <Cards />
            <Table />
          </div>
          <RightSide />
        </div>
      ) : (
        <>
          {/* <div className="main-dash-first-section">
            <div className="MainDash">
              <Cards />
              <Table />
            </div>
          </div>
          <div style={{height: '93vh', overflow: 'auto'}}>
            <RightSide />
          </div> */}

          <div className="first-div">
            <div className="left-div Scroll-Style-Slim">
              <Cards />
              <Table />
            </div>
            <div className="right-div Scroll-Style-Slim">
              <RightSide />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainDash;
