import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


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
    <Box sx={{ height: 400, width: '100%' }}>
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
    </>
  )
}
export default RenewalReminders;