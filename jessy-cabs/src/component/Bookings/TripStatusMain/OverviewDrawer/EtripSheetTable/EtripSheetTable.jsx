import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box} from '@mui/material';


const columns = [
    { field: "id5", headerName: "Sno", width: 50 },
    { field: "bookingno", headerName: "Booking No", width: 110 },
    { field: "tripid", headerName: "Tripsheet No", width: 110 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "servicestation", headerName: "Service Station", width: 130 },
    { field: "vehRegNo", headerName: "VehicleRegNo", width: 130 },
    { field: "bookingdate", headerName: "Booking Date", width: 120 },
    { field: "shedOutDate", headerName: "ShedOut Date", width: 120 },
    { field: "startdate", headerName: "Start Date", width: 120 },
    { field: "guestname", headerName: "Guest Name", width: 140 },
    { field: "address1", headerName: "Address", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "employeeno", headerName: "Employee No", width: 110 },
    { field: "report", headerName: "Report", width: 130 },
    { field: "driverName", headerName: "Driver Name", width: 130 },
    { field: "mobileNo", headerName: "Driver MobNo", width: 130 },
    { field: "vehType", headerName: "Rate For", width: 130 },
    { field: "reporttime", headerName: "ShedOut Time", width: 110 },
    { field: "starttime", headerName: "Start Time", width: 100 },
    { field: "duty", headerName: "Duty", width: 100 },
    { field: "customercode", headerName: "Cost Code", width: 110 },
    { field: "registerno", headerName: "Request Id", width: 130 },
    { field: "flightno", headerName: "Flight No", width: 130 },
    { field: "orderByEmail", headerName: "OrderedBy Email", width: 150 },
    { field: "remarks", headerName: "Remark", width: 130 },
    { field: "vehiclemodule", headerName: "Vehicle Type", width: 110 },
    { field: "paymenttype", headerName: "Payment Type", width: 130 },
    { field: "advance", headerName: "Advance", width: 90 },
    { field: "totaltime", headerName: "TotalHR", width: 90 },
    { field: "totalkm1", headerName: "TotalKM", width: 100 },
    { field: "toll", headerName: "Toll", width: 70 },
    { field: "permit", headerName: "Permit", width: 90 },
    { field: "parking", headerName: "Parking", width: 80 },
    { field: "totalcalcAmount", headerName: "TotalAmount", width: 100 },
  ];





  const rows = [
    {
      id: 1,
      bookingNo: 'Snow',
      tripsheetNo: 'Jon',
      status: 35,
      customer: 35,
      serviceStation: 35,
      vehicleRegNo: 35,
      bookingDate: 35,
      shedOutDate: 35,
      startdate: 1,
      guestname: 1,
      address1: 1,
      email: 1,
      employeeno: 1,
      report: 1,
      driverName: 1,
      mobileNo: 1,
      vehType: 1,
      reporttime: 1,
      starttime: 1,
      duty: 1,
      customercode: 1,
      registerno: 1,
      flightno: 1,
      orderByEmail: 1,
      remarks: 1,
      vehiclemodule: 1,
      paymenttype: 1,
      advance: 1,
      totaltime: 1,
      totalkm1: 1,
      toll: 1,
      permit: 1,
      parking: 1,
      totalcalcAmount: 1,
    },

  ];


 const EtripSheetTable = () => {
  return (
    <>
    <Box sx={{ padding: '16px' }}>
            <div className='trip-status-table'>
              <Box
                sx={{
                  height: 400, // Adjust this value to fit your needs
                  '& .MuiDataGrid-virtualScroller': {
                    '&::-webkit-scrollbar': {
                      width: '8px', // Adjust the scrollbar width here
                      height: '8px', // Adjust the scrollbar width here
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#457cdc',
                      borderRadius: '20px',
                      minHeight: '60px', // Minimum height of the scrollbar thumb (scroll indicator)

                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: '#3367d6',
                    },
                  },
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  // onRowClick={(event) => handleButtonClick(event.row)}
                  pageSize={5}
                />
              </Box>

            </div>
          </Box>
    </>
  )
}
export default EtripSheetTable;




// import React, { useState, useContext } from 'react';
// import { Drawer, IconButton, Box, Button, Typography } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { PermissionContext } from "../../../context/permissionContext";

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';




// const OverviewDrawer = () => {
//   const { isDrawerOpen, setIsDrawerOpen } = useContext(PermissionContext)

//   // Open the drawer
//   const openDrawer = () => {
//     setIsDrawerOpen(true);
//   };

//   // Close the drawer
//   const closeDrawer = () => {
//     setIsDrawerOpen(false);
//   };





//   return (
//     <>
//       <div>
//         {/* <Button variant="contained" onClick={openDrawer}>
//         Open Full-Page Drawer
//       </Button> */}

//         {/* Full-page Drawer */}
//         <Drawer
//           anchor="left"
//           open={isDrawerOpen}
//           onClose={closeDrawer}
//           PaperProps={{
//             sx: { width: '100%' }, // Full width
//           }}
//         >
//           {/* Drawer content */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
//             <Typography variant="h6">Full-Page Drawer</Typography>

//             {/* Close button */}
//             <IconButton onClick={closeDrawer}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

          
//         </Drawer>
//       </div>
//     </>
//   )
// }
// export default OverviewDrawer;