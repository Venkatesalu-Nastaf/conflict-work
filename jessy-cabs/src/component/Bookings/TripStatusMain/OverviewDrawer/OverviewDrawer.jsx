import React, { useState , useContext } from 'react';
import { Drawer, IconButton, Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PermissionContext } from "../../../context/permissionContext";


const OverviewDrawer = () => {
  const {isDrawerOpen, setIsDrawerOpen} = useContext(PermissionContext)

  // Open the drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Close the drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
    <div>
      {/* <Button variant="contained" onClick={openDrawer}>
        Open Full-Page Drawer
      </Button> */}

      {/* Full-page Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: '100%' }, // Full width
        }}
      >
        {/* Drawer content */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
          <Typography variant="h6">Full-Page Drawer</Typography>

          {/* Close button */}
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ padding: '16px' }}>
          <Typography variant="body1">This is the content inside the full-page drawer.</Typography>
        </Box>
      </Drawer>
    </div>
    </>
  )
}
export default OverviewDrawer;
