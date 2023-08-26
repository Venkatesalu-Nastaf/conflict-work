import React, { useEffect } from 'react';
import './Customers.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Customers = () => {
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
    <div className='order-conatiner' id='menu'>
      <div className='menu-bar'>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Customer' ? 'actives' : ''}`}
          to='/home/customers/customers'
          onClick={() => handleMenuItemClick('Customer')}
        >
          Customer
        </Link>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Supplier' ? 'actives' : ''}`}
          to='/home/customers/supplier'
          onClick={() => handleMenuItemClick('Supplier')}
        >
          Supplier
        </Link>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Booking' ? 'actives' : ''}`}
          to='/home/customers/bookings'
          onClick={() => handleMenuItemClick('Booking')}
        >
          Booking
        </Link>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Trip Sheet' ? 'actives' : ''}`}
          to='/home/customers/tripsheet'
          onClick={() => handleMenuItemClick('Trip Sheet')}
        >
          Trip Sheet
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Customers;
