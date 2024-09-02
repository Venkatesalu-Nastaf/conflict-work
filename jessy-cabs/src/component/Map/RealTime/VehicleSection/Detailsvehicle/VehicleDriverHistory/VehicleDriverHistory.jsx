import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./VehicleDriverHistory.css"

//  for historytable
const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
        field: 'DriverName',
        headerName: 'Driver Name',
        width: 350,
        editable: true,
    },
    {
        field: 'DriverNumber',
        headerName: 'Driver Number',
        width: 350,
        editable: true,
    },
    {
        field: 'AssignedFrom',
        headerName: 'Assigned From',
        width: 350,
        editable: true,
    },
    {
        field: 'AssignedTill',
        headerName: 'Assigned Till',
        width: 350,
        editable: true,
    },



];

const rows = [
    { id: 1, DriverName: 'Snow', DriverNumber: 'Jon', AssignedFrom: 14, AssignedTill: 14, },

];


const VehicleDriverHistory = () => {
    return (
        <>
            <div className='VehicleDriverHistory-total'>
            {/* <div className=' table-div-width' > */}
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


export default VehicleDriverHistory;