import React , {useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';





//  for timelinetable
const columnstripsite = [
    { field: 'id', headerName: 'ID', width: 90 },
  
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
      field: 'RunningTime',
      headerName: 'Running Time',
      type: 'number',
      width: 200,
      editable: true,
    },
  
    {
      field: 'stoptime',
      headerName: 'Stop Time',
      type: 'number',
      width: 200,
      editable: true,
    },
  
    {
      field: 'totalTime',
      headerName: 'Total Time',
      type: 'number',
      width: 200,
      editable: true,
    },
  
    {
      field: 'DistanceTravelled',
      headerName: 'Distance Travelled',
      width: 150,
      editable: true,
    },
    {
      field: 'fuelcomsumed',
      headerName: 'Total Fuel consumed',
      width: 350,
      editable: true,
    },
  ];
  
  const rowstripsite = [
    { id: 1, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
    { id: 2, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
    { id: 3, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
    { id: 4, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
    { id: 5, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
    { id: 6, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
    { id: 7, StartTime: 'Jon', EndTime: 14, RunningTime: 14, stoptime: 14, totalTime: 14, DistanceTravelled: 14, fuelcomsumed: 456 },
  ];
  
  
  


 const HistoryTripSites = () => {
      // for trip sites dropdown 1
  const [selectedValuetripsites, setSelectedValuetripsites] = useState('');

  const handleChangetripsites1 = (event) => {
    setSelectedValuetripsites(event.target.value);
  };

  // for trip sites dropdown 2
  const [selectedValuetripsitesSelect, setSelectedValuetripsitesSelect] = useState('');

  const handleChangetripsitesSelect = (event) => {
    setSelectedValuetripsitesSelect(event.target.value);
  };


  return (
    <>
        <div className='tripsites'>
                      <div className='speeed-violation'>
                        <p className='history-table-section-topic'>Trips b/w Sites - 0715 (TN75AL0715)</p>
                        <p style={{ color: "rgb(148 142 142)" }}>View trips between source and destination addresses</p>
                      </div>
                      <div>
                        <div className='stoppages-ischecked'>
                          <p className='tripsites-para'>Source</p>
                          <Box sx={{ m: 2, width: "100%" }}>
                            <FormControl fullWidth>
                              <Select
                                value={selectedValuetripsites}
                                onChange={handleChangetripsites1}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                              >

                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        <div className='stoppages-ischecked'>
                          <p className='tripsites-para'>Destination</p>
                          <Box sx={{ m: 2, width: "100%" }}>
                            <FormControl fullWidth>
                              <Select
                                value={selectedValuetripsitesSelect}
                                onChange={handleChangetripsitesSelect}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                              >

                                <MenuItem value={10}>Option 1</MenuItem>
                                <MenuItem value={20}>Option 2</MenuItem>
                                <MenuItem value={30}>Option 3</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div>



                    </div>
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
                          rows={rowstripsite}
                          columns={columnstripsite}
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

export default HistoryTripSites;
