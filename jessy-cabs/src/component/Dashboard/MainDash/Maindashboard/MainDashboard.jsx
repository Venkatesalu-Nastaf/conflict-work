import React, { useContext, useEffect } from 'react';
import "./dashboard.css";
import Sidebar from "../Sildebar/Slidebar";
import { Outlet } from "react-router-dom";
import Loading from '../../../Loading/Loading';
import LoadingContext from '../../../Loading/LoadingText';


const MainDashboard = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Since setIsLoading is used inside the effect, include it in the dependency array
  }, [setIsLoading]);
  return (
    <section className="dash-board">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="glass">
          <Sidebar />
          <Outlet />
        </div>
      )}
    </section>
  );
};

export default MainDashboard;
