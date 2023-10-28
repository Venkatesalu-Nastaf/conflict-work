import React, { useEffect, useState } from 'react';
import './Costomers.css'
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


const Costomers = () => {
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
    <div className='Costomers-conatiner' id='menu'>
      <div className='menu-bar'>
         <MenuItem label="Customer" to='/home/customers/customer' menuItemKey="Customer" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
        <MenuItem label="Supplier" to='/home/customers/supplier' menuItemKey="Supplier" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
        {/* <MenuItem label="Received" to='/home/orders/received' menuItemKey="Received" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
        <MenuItem label="Dispatched" to='/home/orders/dispatched' menuItemKey="Dispatched" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} /> */}
        <MenuItem label="Mailers" to='/home/customers/mailer' menuItemKey="Mailers" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
        {/* <MenuItem label="Drivers" to='/home/orders/drivermaster' menuItemKey="Drivers" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} /> */}
      </div>
      <Outlet />
    </div>
  );
}

export default Costomers;
