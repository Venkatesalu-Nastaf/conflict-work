import React from 'react';
// import { useLocation } from "react-router-dom";
import noPermission from "../../../assets/img/no-permission-img.png";
import "./NoPermission.css";

const NoPermission = () => {
    // const location = useLocation();

    // Get the pathname part of the current URL
    const pathnames = window.location.pathname;

    // Split the pathname by '/' to get an array of its segments
    const segments = pathnames.split('/');

    // Get the last segment (which is the last word of the pathname)
    const currentPage = segments.pop();

    // console.log(currentPage);

    // if(location.pathname == "/home/bookings/tripsheet"){
    //     var pathName = "Tripsheet";
    // }
    // else if(location.pathname == "/home/bookings/booking"){
    //     var pathName = "Booking";
    // }
    // else if(location.pathname == "/home/bookings/tripstatus"){
    //     var pathName = "Tripstatus";
    // }
    
  return (
    <>
      <div className='no-permission-div'>
        <img className='no-permission-img' src={noPermission} alt="No-Permission" />
        <span className='no-permission-text'>You dont have permission for <span style={{textTransform: 'capitalize'}}>{currentPage}</span></span>
      </div>
    </>
  )
}

export default NoPermission
