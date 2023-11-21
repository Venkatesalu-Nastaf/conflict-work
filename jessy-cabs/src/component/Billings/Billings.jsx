import React, {  useState } from 'react';
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

    const handleMenuItemClick = (menuItem) => {
        localStorage.setItem('activeMenuItem', menuItem);
        setActiveMenuItem(menuItem);
    };
    return (
        <div className='billings-conatiner' id='menu'>
            <div className='menu-bar'>
                <MenuItem label="Billing" to='/home/billing/billing' menuItemKey="Billing" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Transfer" to='/home/billing/transfer' menuItemKey="Transfer" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="QuickBill" to='/home/billing/quickbill' menuItemKey="Quick Bill" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Covering Bill" to='/home/billing/coveringbill' menuItemKey="Covering Bill" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                {/* <MenuItem label="Expense" to='/home/billing/expense' menuItemKey="Cash Flow" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Income" to='/home/billing/income' menuItemKey="Driver Master" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                <MenuItem label="Profit & Loss" to='/home/billing/profitandloss' menuItemKey="Profit & Loss" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} /> */}
                {/* <MenuItem label="Expense" menuItemKey="Cash Flow" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />
                <MenuItem label="Income" menuItemKey="Driver Master" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} />
                <MenuItem label="Profit & Loss" menuItemKey="Profit & Loss" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClickMsgInfo} /> */}
                
            </div>
            <Outlet />
        </div>
    )
}

export default Billings;
