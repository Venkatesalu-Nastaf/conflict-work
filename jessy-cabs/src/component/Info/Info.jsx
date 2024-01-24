import React, { useEffect } from 'react';
import './Info.css'
import { Link, Outlet, useLocation } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ThreeCircles } from "react-loader-spinner";
import useInfo from './useInfo';


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

const Info = () => {



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
    } = useInfo();

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
                    <div className='Info-conatiner' id='menu'>

                        <div className='menu-bar'>
                            <MenuItem label="Rate Type" to='/home/info/ratetype' menuItemKey="Rate Type" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                            <MenuItem label="Rate Management" to='/home/info/ratemanagement' menuItemKey="Rate Management" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                            <MenuItem label="Mailers" to='/home/info/mailer' menuItemKey="Mailers" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
                            <MenuItem label="Fuel Info" to='/home/info/fuelinfo' menuItemKey="FuelInfo" activeMenuItem={activeMenuItem} handleMenuItemClick={handleMenuItemClick} />
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
            )}

        </div>
    )
}

export default Info;
