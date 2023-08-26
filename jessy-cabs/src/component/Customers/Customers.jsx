import React, { useEffect, useState } from 'react';
import './Customers.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MenuItem = ({ label, to, activeMenuItem, handleMenuItemClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`menu-link ${isActive ? 'actives' : ''}`}
      to={to}
      onClick={() => handleMenuItemClick(label)}
    >
      {label}
    </Link>
  );
};


const Customers = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  useEffect(() => {
    const storedActiveMenuItem = localStorage.getItem('activeMenuItem');
    setActiveMenuItem(storedActiveMenuItem || '');
  }, []);

  const handleMenuItemClick = (menuItem) => {
    localStorage.setItem('activeMenuItem', menuItem);
    setActiveMenuItem(menuItem);
  };

  return (
    <div className='order-conatiner' id='menu'>
      <div className='menu-bar'>
        <MenuItem label="Customer" to='/home/customers/customers' menuItemKey="Customer" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
        <MenuItem label="Supplier" to='/home/customers/supplier' menuItemKey="Supplier" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
        <MenuItem label="Booking" to='/home/customers/bookings' menuItemKey="Booking" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
        <MenuItem label="Trip Sheet" to='/home/customers/tripsheet' menuItemKey="Trip Sheet" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
      </div>
      <Outlet />
    </div>
  );
};

export default Customers;
