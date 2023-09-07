import React, { useEffect, useState } from 'react';
import './Billings.css'
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

const Billings = () => {
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
        <div className='billings-conatiner' id='menu'>
            <div className='menu-bar'>
                <MenuItem label="Billing" to='/home/billing/billing' menuItemKey="Billing" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Cash Flow" to='/home/billing/cashflow' menuItemKey="Cash Flow" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Profit & Loss" to='/home/billing/profitandloss' menuItemKey="Profit & Loss" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Driver Master" to='/home/customers/drivermaster' menuItemKey="Driver Master" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
            </div>
            <Outlet />
        </div>
    )
}

export default Billings;
