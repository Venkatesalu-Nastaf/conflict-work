import React, { useEffect, useState } from 'react';
import './Billings.css'
import { Link, Outlet, useLocation } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";


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
    const [info, setInfo] = useState(false);
    const [warningMessage, setwarningMessage] = useState({});
    //for popup
    const hidePopup = () => {
        setInfo(false);
    };
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [info]);
    useEffect(() => {
        const storedActiveMenuItem = localStorage.getItem('activeMenuItem');
        setActiveMenuItem(storedActiveMenuItem || '');
    }, []);

    const handleMenuItemClick = (menuItem) => {
        localStorage.setItem('activeMenuItem', menuItem);
        setActiveMenuItem(menuItem);
    };
    const handleMenuItemClickMsgInfo = () => {
        setInfo(true);
        setwarningMessage('Under Development');
    };
    return (
        <div className='billings-conatiner' id='menu'>
            <div className='menu-bar'>
                <MenuItem label="Billing" to='/home/billing/billing' menuItemKey="Billing" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                {/* <MenuItem label="Expense" to='/home/billing/expense' menuItemKey="Cash Flow" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Income" to='/home/billing/income' menuItemKey="Driver Master" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Profit & Loss" to='/home/billing/profitandloss' menuItemKey="Profit & Loss" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} /> */}
                <MenuItem label="Expense" menuItemKey="Cash Flow" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />
                <MenuItem label="Income" menuItemKey="Driver Master" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />
                <MenuItem label="Profit & Loss" menuItemKey="Profit & Loss" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />
            </div>
            {info &&
                <div className='alert-popup Info' >
                    <div className="popup-icon"> <BsInfo style={{ color: '#fff',fontSize: '23px' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p style={{ color: '#000' }}>{warningMessage}</p>
                </div>
            }
            <Outlet />
        </div>
    )
}

export default Billings;
