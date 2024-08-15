import React from 'react'
import "./Cost.css";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const Cost = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'drivingScore', headerName: 'Driving Score', width: 130 },
        { field: 'idleDuration', headerName: 'Idle Duration', width: 130 },
        { field: 'overspeedDuration', headerName: 'Overspeed Duration', width: 130 },
        { field: 'hardAccelerationCount', headerName: 'Hard Acceleration Count', width: 130 },
        { field: 'hardBrakeCount', headerName: 'Hard Brake Count', width: 130 },

    ];

    const rows = [
        { id: 1, name: 'Snow', drivingScore: 'Jon', idleDuration: 35, overspeedDuration: 'Snow', hardAccelerationCount: 'Jon', hardBrakeCount: 35 },
    ];
    return (
        <div>
            <div className='bill-wise-reciept-table'>
                <Box
                    sx={{
                        height: 400,
                        '& .MuiDataGrid-virtualScroller': {
                            '&::-webkit-scrollbar': {
                                width: '8px',
                                height: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#457cdc',
                                borderRadius: '20px',
                                minHeight: '60px',

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
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    />
                </Box>
            </div>
        </div>
    )
}

export default Cost
