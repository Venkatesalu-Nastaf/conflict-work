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
                <Box sx={{ height: 400, width: '100%' }}>
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