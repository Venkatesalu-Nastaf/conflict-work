import React from 'react';
import { BiUpArrowAlt } from "react-icons/bi";
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



//  for historytable
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Vehicle',
      headerName: 'Vehicle',
      width: 150,
      editable: true,
    },
    {
      field: 'StartTime',
      headerName: 'Start Time',
      width: 150,
      editable: true,
    },
    {
      field: 'EndTime',
      headerName: 'End Time',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'StartLocation',
      headerName: 'Start Location',
      width: 150,
      editable: true,
    },
    {
      field: 'EndLocation',
      headerName: 'End Location',
      width: 150,
      editable: true,
    },
    {
      field: 'Distance',
      headerName: 'Distance',
      width: 150,
      editable: true,
    },
    {
      field: 'Duration',
      headerName: 'Duration',
      width: 150,
      editable: true,
    },
    {
      field: 'Mileage',
      headerName: 'Mileage',
      width: 150,
      editable: true,
    },
    {
      field: 'Fuel',
      headerName: 'Fuel',
      width: 150,
      editable: true,
    },
  
  ];
  
  const rows = [
    { id: 1, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14, },
    { id: 2, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
    { id: 3, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
    { id: 4, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
    { id: 5, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
    { id: 6, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
    { id: 7, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
    { id: 8, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
    { id: 9, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, StartLocation: 14, EndLocation: 14, Distance: 14, Duration: 14, Mileage: 14, Fuel: 14 },
  ];


const HistoryTab = () => {
  return (
    <>
     <div className='history-btn-tab'  >
                      <div className='history-btn-tab-left'  >
                        <div className='history-btn-tab-left-content'>
                          <p className='stoppages-para account-summary-para'>Account Summary</p>
                          <div className='account-summary-division' >

                            <div>
                              <div className='account-summary-division-content' >
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p className='history-tab-para' >Runnings</p>

                            </div>


                            <div>
                              <div className='account-summary-division-content'>
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>
                              <p className='history-tab-para'>Total Km</p>

                            </div>


                            <div>

                              <div className='account-summary-division-content'>
                                <span className='ac-sum-txt'>11</span><sub className='sub-txt'>57%</sub><span className='sub-txt'>
                                  <BiUpArrowAlt />
                                </span>
                              </div>

                              <p className='history-tab-para'>Alarms</p>

                            </div>

                          </div>



                        </div>
                      </div>
                      <div className='history-btn-tab-left'>
                        <div className='fuel-summary-div' >
                          <p className='stoppages-para'>Fuel Summary
                            (Diesel)</p>
                          <div className='no-fuel-warning' >
                            No fuel data available for this period.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='history-table-section' >
                      <p className='history-table-section-topic'>History - 0703 (KA03AD0703)
                      </p>
                      <div className='table-div-width'>
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

                    </div>
    </>
  )
}
export default HistoryTab;
