import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


//  for timelinetable
const columnstimeline = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'Vehicle',
      headerName: 'Vehicle',
      width: 120,
      editable: true,
    },
    {
      field: 'Domain',
      headerName: 'Domain',
      width: 120,
      editable: true,
    },
    									
    {
      field: 'Date',
      headerName: 'Date',
      type: 'number',
      width: 120,
      editable: true,
    },
  
    {
      field: 'WorkOrder',
      headerName: 'Work Order',
      width: 120,
      editable: true,
    },
    {
      field: 'LineItems',
      headerName: 'Line Items',
      width: 120,
      editable: true,
    },
    {
      field: 'Costs',
      headerName: 'Costs',
      width: 120,
      editable: true,
    },
    {
      field: 'OtherDetails',
      headerName: 'Other Details',
      width: 120,
      editable: true,
    },
    {
      field: 'TotalAmount',
      headerName: 'Total Amount',
      width: 120,
      editable: true,
    },
    {
      field: 'MoreInfo',
      headerName: 'More Info',
      width: 120,
      editable: true,
    },
    {
      field: 'Odometer',
      headerName: 'Odometer',
      width: 120,
      editable: true,
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 120,
      editable: true,
    }
  
  ];
  
  const rowstimeline = [
    { id: 1, Vehicle: 'Snow', Domain: 'Jon', Date: 14, WorkOrder: 14, LineItems: 14, Costs: 14, OtherDetails: 14, TotalAmount: 14, MoreInfo: 14, Odometer: 14, Actions: 14 },
   
  
  ];
  


export const OverallTable = () => {
  return (
    <>
    <div className='overall-table-div-width-records-fuel-log' >
 
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
                              rows={rowstimeline}
                              columns={columnstimeline}
                              initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 5,
                                  },
                                },
                              }}
                              pageSizeOptions={[5]}
                              disableRowSelectionOnClick
                            />
                          </Box>
                          </div>
    </>
  )
}
