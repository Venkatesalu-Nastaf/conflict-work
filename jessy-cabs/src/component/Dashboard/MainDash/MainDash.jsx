import React, { useState, useEffect } from "react";
import "./MainDash.css";
import RightSide from "./RightSide/RightSide";
import Cards from "./Cards/Cards";
import Table from "./Table/Table";
const MainDash = () => {

  const [isBelow768px, setIsBelow768px] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsBelow768px(window.innerWidth < 768);
    };

    // Call handleResize initially to set the initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {isBelow768px ? (
        <div style={{height: '93vh', width: '100%', overflowY: 'scroll', overflowX: 'hidden', paddingBottom: '20px'}}>
          <div className="MainDash">
            <Cards />
            <Table />
          </div>
          <RightSide />
        </div>
      ) : (
        <>
          <div className="MainDash">
            <Cards />
            <Table />
          </div>
          <RightSide />
        </>
      )}
    </>
  );
};

export default MainDash;
