import React, { useEffect, useState } from 'react';
import './Maintenance.css'
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

const Maintenance = () => {
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
        <div className='Maintenance-conatiner' id='menu'>
            <div className='menu-bar'>
                <MenuItem label="Rate Type" to='/home/maintenance/ratetype' menuItemKey="Rate Type" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Rate Management" to='/home/maintenance/ratemanagement' menuItemKey="Rate Management" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Mailers" to='/home/maintenance/mailer' menuItemKey="Mailers" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Fuel Info" to='/home/maintenance/fuelinfo' menuItemKey="FuelInfo" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
            </div>
            <Outlet />
        </div>
    )
}

export default Maintenance;
