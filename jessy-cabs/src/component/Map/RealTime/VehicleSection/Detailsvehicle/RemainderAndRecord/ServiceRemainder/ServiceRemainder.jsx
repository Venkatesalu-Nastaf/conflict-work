import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./ServiceRemainder.css"

//  for historytable
const remaindercolumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
        field: 'Status',
        headerName: 'Status',
        width: 350,
        editable: true,
    },
    {
        field: 'NextDue',
        headerName: 'Next Due',
        width: 350,
        editable: true,
    },
    {
        field: 'LastOccurred',
        headerName: 'Last Occurred At',
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

const remainderrows = [
    { id: 1, Status: 'Snow', NextDue: 'Jon', LastOccurred: 14, Subscribers: 14, },

];

const ServiceRemainder = () => {
    return (
        <>
            <div className="ServiceRemainder">
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
                        rows={remainderrows}
                        columns={remaindercolumns}
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


export default ServiceRemainder;