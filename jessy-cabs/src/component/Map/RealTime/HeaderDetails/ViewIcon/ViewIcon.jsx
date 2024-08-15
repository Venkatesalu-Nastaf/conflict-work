import React, { useState } from 'react';
import { MdOutlineViewCompactAlt } from "react-icons/md";
import ViewListIcon from '@mui/icons-material/ViewList';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Replacing with DashboardIcon
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';


const ViewIcon = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleViewButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleviewIconClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (view) => {
        console.log(`Selected view: ${view}`);
        handleviewIconClose();
    };
    return (
        <>
            <div onClick={handleViewButtonClick}>
                <MdOutlineViewCompactAlt />
            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleviewIconClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => handleMenuItemClick('List View')}>
                    <ListItemIcon>
                        <ViewListIcon />
                    </ListItemIcon>
                    <ListItemText primary="List View" />
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Map View')}>
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Map View" />
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Split View')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Split View" />
                </MenuItem>
            </Menu>
        </>
    )
}

export default ViewIcon;
