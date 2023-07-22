import React, { useEffect } from 'react';
import './Customers.css'
import { Link, Outlet, useLocation } from 'react-router-dom';

const Customer = () => {

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
      <div className='customer-conatiner' id='menu'>
        <div className='menu-bar'>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Received' ? 'actives' : ''}`}
            to='/home/customers/received'
            onClick={() => handleMenuItemClick('Received')}
          >
            Received
          </Link>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Dispatched' ? 'actives' : ''}`}
            to='/home/customers/dispatched'
            onClick={() => handleMenuItemClick('Dispatched')}
          >
            Dispatched
          </Link>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Collected' ? 'actives' : ''}`}
            to='/home/customers/collected'
            onClick={() => handleMenuItemClick('Collected')}
          >
            Collected
          </Link>
          <Link
            className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Driver Master' ? 'actives' : ''}`}
            to='/home/customers/drivermaster'
            onClick={() => handleMenuItemClick('Driver Master')}
          >
            Driver Master
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Customer