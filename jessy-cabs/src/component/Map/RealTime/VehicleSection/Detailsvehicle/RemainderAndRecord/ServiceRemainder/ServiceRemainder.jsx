import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


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
    <Box sx={{ height: 400, width: '100%' }}>
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
    </>
  )
}


export default ServiceRemainder;