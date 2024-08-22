import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./FuelLog.css"

//  for historytable
const fuellogcolumns = [
    { field: 'id', headerName: 'S NO', width: 50 },
    {
        field: 'Status',
        headerName: 'Status',
        width: 120,
        editable: true,
    },
    {
        field: 'Vehicle',
        headerName: 'Vehicle',
        width: 120,
        editable: true,
    },
    {
        field: 'Vendor',
        headerName: 'Vendor',
        width: 120,
        editable: true,
    },
    {
        field: 'ReferenceNumber',
        headerName: 'Reference Number',
        width: 120,
        editable: true,
    },
    {
        field: 'Date',
        headerName: 'Date',
        width: 120,
        editable: true,
    },

    {
        field: 'OdometerReading',
        headerName: 'Odometer Reading',
        width: 120,
        editable: true,
    },
    {
        field: 'Volume',
        headerName: 'Volume',
        width: 120,
        editable: true,
    },
    {
        field: 'Usage',
        headerName: 'Usage',
        width: 120,
        editable: true,
    },
    {
        field: 'Amount',
        headerName: 'Amount',
        width: 120,
        editable: true,
    },
    {
        field: 'KmUnit',
        headerName: 'Km/Unit',
        width: 80,
        editable: true,
    },
    {
        field: 'CostKm',
        headerName: 'Cost/Km',
        width: 80,
        editable: true,
    },
    {
        field: 'ExpectedKm',
        headerName: 'Expected Km',
        width: 120,
        editable: true,
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 120,
        editable: true,
    },

];

const fuellogrows = [
    { id: 1, Status: 'Snow', Vehicle: 'Jon', Vendor: 14, ReferenceNumber: 14, Date: 14, OdometerReading: 14, Volume: 14, Usage: 14, Amount: 14, KmUnit: 14, CostKm: 14, ExpectedKm: 14, Action: 14 },

];

const FuelLog = () => {
    return (
        <>
            <div className='FuelLog'>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={fuellogrows}
                        columns={fuellogcolumns}
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

export default FuelLog;
