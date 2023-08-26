import React, { useEffect, useState } from 'react';
import './Options.css'
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

const Options = () => {
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
        <div className='customer-conatiner' id='menu'>
            <div className='menu-bar'>
                <MenuItem label="Rate Type" to='/home/options/ratetype' menuItemKey="Rate Type" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Rate Management" to='/home/options/ratemanagement' menuItemKey="Rate Management" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Employees" to='/home/options/employes' menuItemKey="Employees" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Fuel Details" to='/home/options/fuledetails' menuItemKey="Fuel Details" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
            </div>
            <Outlet />
        </div>
    )
}

export default Options;
