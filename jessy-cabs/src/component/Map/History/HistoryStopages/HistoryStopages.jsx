import React , {useState}from 'react';
import Switch from '@mui/material/Switch';
import { AiFillEdit } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const labelswitch = { inputProps: { 'aria-label': 'Size switch demo' } };



//  for timelinetable
const columnstimeline = [
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
      field: 'Location',
      headerName: 'Location',
      width: 350,
      editable: true,
    },
    {
      field: 'NearestAddress',
      headerName: 'Nearest Address',
      width: 250,
      editable: true,
    },
    {
      field: 'DistanceTravelled',
      headerName: 'Distance Travelled',
      width: 150,
      editable: true,
    }
  
  ];
  
  const rowstimeline = [
    { id: 1, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
    { id: 2, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
    { id: 3, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
    { id: 4, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
    { id: 5, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
    { id: 6, Vehicle: 'Snow', StartTime: 'Jon', EndTime: 14, Duration: 14, Location: 14, NearestAddress: 14, DistanceTravelled: 14 },
  
  ];

 const HistoryStopages = () => {
      // timeline switch

  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
    <div className='stoppages-border' >
                      <div className='stoppages-section' >
                        <div>
                          <p className='stoppages-para history-table-section-topic'>Stoppages - 0715 (TN75AL0715)</p>
                        </div>
                        <div className='stoppages-top-head' >
                          <p className='stoppages-para'>Only Addressbook Stops</p>
                          <Switch {...labelswitch}
                            checked={isChecked}
                            onChange={handleSwitchChange}
                          />
                          <p className='stoppages-para'>Minimum Stoppage Time</p>
                          <div className='stoppages-edit' >
                            <p className='stoppages-para'>0 mins(All Stops)</p>
                            <AiFillEdit />
                          </div>
                        </div>
                      </div>

                      {isChecked ? (
                        <div className='stoppages-ischecked'>
                          <p className='no-stop-warning' >
                            <IoIosWarning />
                            No Stops available for this duration.
                          </p>
                        </div>
                      ) : (

                        <div className=' table-div-width' >
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
                              rows={rowstimeline}
                              columns={columnstimeline}
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
                      )}
                    </div>
    </>
  )
}

export default HistoryStopages;
