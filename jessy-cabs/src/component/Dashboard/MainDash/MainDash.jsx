import React, { useState, useEffect } from "react";
import "./MainDash.css";
import RightSide from "./RightSide/RightSide";
import Cards from "./Cards/Cards";
import Table from "./Table/Table";
import { useData1 } from "../Maindashboard/DataContext";

const MainDash = ({stationName}) => {

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

  const {expanded } = useData1();

  return (
    <>
      {isBelow768px ? (
        <div className="main-dash-main-section">
          <div className="MainDash">
            <Cards />
            </div>
            <Table />
          <RightSide  stationName={stationName} />
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

          <div >
            <div className="first-div">
              <div className={`left-div ${expanded ? "extendedwidth" : ""}`}>
                <Cards />
                </div>
                
              
              <div className="right-div">
                 <Table  stationName={stationName}/>
                <RightSide  stationName={stationName} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainDash;