import React, { useState , useContext } from 'react';
import { Drawer, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PermissionContext } from "../../../context/permissionContext";
import EtripSheetImages from './EtripSheetImages/EtripSheetImages';
import EtripSheetMap from './EtripSheetMap/EtripSheetMap';
import EtripSheetSignature from './EtripSheetSignature/EtripSheetSignature';
import "./OverviewDrawer.css"
import { CiNoWaitingSign } from "react-icons/ci";
import EtripSheetTable from './EtripSheetTable/EtripSheetTable';

const OverviewDrawer = () => {
  const {isDrawerOpen, setIsDrawerOpen} = useContext(PermissionContext)

 
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const [showCards, SetShowCards] = useState(false);
  const handleShowCards = ()=>{
    SetShowCards(!showCards);
  }

  return (
    <>
    <div>
     
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: '100%' }, // Full width
        }}
      >
        {/* Drawer content */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          <Typography variant="h6">Trip Status Overview</Typography>

          {/* Close button */}
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ padding: '16px' }}>
          {/* <Typography variant="body1">This is the content inside the full-page drawer.</Typography> */}

          <p onClick={handleShowCards}>Show Cards</p>
          {showCards ?
          <div className='top-cards'>
            <EtripSheetSignature/>
            <EtripSheetMap/>
            <EtripSheetImages/>
          </div>
          :

          <div className='top-cards-hidden'>
           <CiNoWaitingSign/>
            <p style={{margin:'0px'}}>No data to show</p>
          </div>

}

<EtripSheetTable/>
        </Box>
      </Drawer>
    </div>
    </>
  )
}
export default OverviewDrawer;
