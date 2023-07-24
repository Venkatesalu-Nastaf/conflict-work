import React, { useEffect } from 'react';
import './Options.css'
import { Link, Outlet, useLocation } from 'react-router-dom';

const Options = () => {


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
        <div className='customer-conatiner' id='menu'>
            <div className='menu-bar'>
                <Link
                    className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Rate Type' ? 'actives' : ''}`}
                    to='/home/options/ratetype'
                    onClick={() => handleMenuItemClick('Rate Type')}
                >
                   Rate Type
                </Link>
                <Link
                    className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Rate Management' ? 'actives' : ''}`}
                    to='/home/options/ratemanagement'
                    onClick={() => handleMenuItemClick('Rate Management')}
                >
                   Rate Management
                </Link>
                <Link
                    className={`menu-link ${localStorage.getItem('activeMenuItem') === 'Fule Details' ? 'actives' : ''}`}
                    to='/home/options/fuledetails'
                    onClick={() => handleMenuItemClick('Fule Details')}
                >
                    Fule Details
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Options