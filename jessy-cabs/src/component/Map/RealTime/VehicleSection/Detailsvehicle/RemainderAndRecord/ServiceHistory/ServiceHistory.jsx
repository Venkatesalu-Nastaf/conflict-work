import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./ServiceHistory.css"

//  for historytable
const servicecolumns = [
    { field: 'id', headerName: 'sno', width: 90 },
    {
        field: 'Date',
        headerName: 'Date',
        width: 130,
        editable: true,
    },
    {
        field: 'Odometer',
        headerName: 'Odometer',
        width: 130,
        editable: true,
    },
    {
        field: 'RunningHours',
        headerName: 'Running Hours',
        width: 130,
        editable: true,
    },
    {
        field: 'WorkOrder',
        headerName: 'Work Order',
        width: 130,
        editable: true,
    },
    {
        field: 'LineItems',
        headerName: 'Line Items',
        width: 130,
        editable: true,
    },
    {
        field: 'PartsCost',
        headerName: 'Parts Cost',
        width: 130,
        editable: true,
    },
    {
        field: 'LaborCost',
        headerName: 'Labor Cost',
        width: 130,
        editable: true,
    },
    {
        field: 'Discount',
        headerName: 'Discount',
        width: 130,
        editable: true,
    },
    {
        field: 'Tax',
        headerName: 'Tax',
        width: 130,
        editable: true,
    },
    {
        field: 'TotalAmount',
        headerName: 'Total Amount',
        width: 130,
        editable: true,
    },
    {
        field: 'MoreInfo',
        headerName: 'More Info',
        width: 130,
        editable: true,
    },
];

const servicerows = [
    { id: 1, Date: 'Snow', Odometer: 'Jon', RunningHours: 14, WorkOrder: 14, LineItems: 14, PartsCost: 14, LaborCost: 14, Discount: 14, Tax: 14, TotalAmount: 14, MoreInfo: 14 },

];

const ServiceHistory = () => {
    return (
        <>
            <div className="ServiceHistory">
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={servicerows}
                        columns={servicecolumns}
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


export default ServiceHistory;