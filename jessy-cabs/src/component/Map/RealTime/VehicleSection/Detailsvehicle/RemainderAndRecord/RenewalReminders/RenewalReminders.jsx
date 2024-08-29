import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./RenewalReminders.css"
//  for historytable
const renewalcolumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
        field: 'VehicleRenewalType',
        headerName: 'Vehicle Renewal Type',
        width: 350,
        editable: true,
    },
    {
        field: 'DueDate',
        headerName: 'Due Date',
        width: 350,
        editable: true,
    },
    {
        field: 'Subscribers',
        headerName: 'Subscribers',
        width: 350,
        editable: true,
    },

];

const renewalrows = [
    { id: 1, DriverName: 'Snow', DriverNumber: 'Jon', AssignedFrom: 14, AssignedTill: 14, },
];

const RenewalReminders = () => {
    return (
        <>
            <div className='RenewalReminders'>
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
                        rows={renewalrows}
                        columns={renewalcolumns}
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
export default RenewalReminders;