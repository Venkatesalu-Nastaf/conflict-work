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
    <div className="Settings-main">
      <div className='menu-bar'>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'User Creation' ? 'actives' : ''}`}
          to='/home/settings/usercreation'
          onClick={() => handleMenuItemClick('User Creation')}
        >
          User Creation
        </Link>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Permission' ? 'actives' : ''}`}
          to='/home/settings/permission'
          onClick={() => handleMenuItemClick('Permission')}
        >
          Permission
        </Link>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Staton Creation' ? 'actives' : ''}`}
          to='/home/settings/stationcreation'
          onClick={() => handleMenuItemClick('Station Creation')}
        >
          Station Creation
        </Link>
        <Link
          className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Main setting' ? 'actives' : ''}`}
          to='/home/settings/mainsetting'
          onClick={() => handleMenuItemClick('Main setting')}
        >
          Main setting
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Settings;
