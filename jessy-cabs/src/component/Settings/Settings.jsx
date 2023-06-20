import React, { useEffect } from 'react';
import './Settings.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
const Settings = () => {
    const location = useLocation();

    useEffect(() => {
      // Retrieve the previously stored actives menu item from localStorage
      const activeMenuItem = localStorage.getItem('activeMenuItem');
  
      // Add 'actives' class to the actives menu item if it exists
      if (activeMenuItem) {
        const menuItems = document.querySelectorAll('.menu-link');
        menuItems.forEach((item) => {
          if (item.textContent === activeMenuItem) {
            item.classList.add('actives');
          } else {
            item.classList.remove('actives');
          }
        });
      }
    }, [location]);
  
    // Function to handle menu item clicks
    const handleMenuItemClick = (menuItem) => {
      // Store the clicked menu item in localStorage
      localStorage.setItem('activeMenuItem', menuItem);
    };
  
  return (
    <>
      <div className="Settings-main">
      <div className='menu-bar'>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Customer Master' ? 'actives' : ''}`}
            to='/home/settings/usercreation'
            onClick={() => handleMenuItemClick('User Creation')}
          >
            User Creation
          </Link>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Supplier Master' ? 'actives' : ''}`}
            to='/home/orders/supplier'
            onClick={() => handleMenuItemClick('Supplier Master')}
          >
            Supplier Master
          </Link>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Booking' ? 'actives' : ''}`}
            to='/home/orders/bookings'
            onClick={() => handleMenuItemClick('Booking')}
          >
            Booking
          </Link>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Trip Sheet' ? 'actives' : ''}`}
            to='/home/orders/tripsheet'
            onClick={() => handleMenuItemClick('Trip Sheet')}
          >
            Trip Sheet
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Settings;
