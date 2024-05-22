import React from 'react';
import noPermission from "../../../assets/img/no-permission-img.png";
import "./NoPermission.css";

const NoPermission = () => {
  const pathnames = window.location.pathname;
  const segments = pathnames.split('/');
  const currentPage = segments.pop();

  return (
    <>
      <div className='no-permission-div'>
        <img className='no-permission-img' src={noPermission} alt="No-Permission" />
        <span className='no-permission-text'>You dont have permission for <span style={{ textTransform: 'capitalize' }}>{currentPage}</span></span>
      </div>
    </>
  )
}

export default NoPermission
