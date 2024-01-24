import React, { useEffect } from 'react';
import './Billings.css'
import { Link, Outlet, useLocation } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ThreeCircles } from "react-loader-spinner";
import useBilling from './useBilling';


const MenuItem = ({ label, to, handleMenuItemClick }) => {
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


    const {
        actionName,
        warning,
        warningMessage,
        handleClick,
        hidePopup,
        isLoading,
        activeMenuItem,
        handleMenuItemClick,
        permissions,


        // ... (other state variables and functions)
    } = useBilling();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);


    return (
        <div className={isLoading ? "loading-container" : ""}>
            {isLoading ? (
                <div className="loading-spinners">
                    <ThreeCircles color="#3d92f3" height={80} width={80} />

                </div>
            ) : (
                <>
                    <div className='billings-conatiner' id='menu'>

                        <div className='menu-bar'>
                            <MenuItem label="Billing" to='/home/billing/billing' menuItemKey="Billing" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                            <MenuItem label="Transfer" to='/home/billing/transfer' menuItemKey="Transfer" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                            <MenuItem label="Covering Bill" to='/home/billing/coveringbill' menuItemKey="Covering Bill" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                        </div>

                        {permissions.read && < Outlet />}

                        {warning &&
                            <div className='alert-popup Warning' >
                                <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                <p>{warningMessage}</p>
                            </div>
                        }
                    </div>
                </>
            )
            }
        </div >
    )
}

export default Billings;
