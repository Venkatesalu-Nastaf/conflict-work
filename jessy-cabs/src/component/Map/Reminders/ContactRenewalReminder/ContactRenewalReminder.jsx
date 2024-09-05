import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";

import { DataGrid } from '@mui/x-data-grid';

import "./ContactRenewalReminder.css";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { FaUpload } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { IoDownloadOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactRenewalReminder = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user', headerName: 'User', width: 250 },
    { field: 'contactRenewalType', headerName: 'Contact Renewal Type', width: 250 },
    { field: 'dueDate', headerName: 'Due Date', width: 250 },
    { field: 'subscribers', headerName: 'Subscribers', width: 250 },
  ];

  const rows = [
    { id: 1, user: 'Snow', contactRenewalType: 'Jon', dueDate: 35, subscribers: 'Snow' },
  ];

  const [vehicleNO, setVehicleNO] = React.useState('');

  const handleChangeDropDown = (event) => {
    setVehicleNO(event.target.value);
  };

  const [openFilter, setOpenFilter] = React.useState(false);

  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <div className='ContactRenewalReminder'>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px', marginBottom: '20px',flexWrap:"wrap" }}>
          <div>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Renewal Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Vehicle Type"
                  onChange={handleChange}
                >
                  <MenuItem value={'Car'}>Car</MenuItem>
                  <MenuItem value={'Bus'}>Bus</MenuItem>
                  <MenuItem value={'Bike'}>Bike</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Vehicle Type"
                  onChange={handleChange}
                >
                  <MenuItem value={'Car'}>Car</MenuItem>
                  <MenuItem value={'Bus'}>Bus</MenuItem>
                  <MenuItem value={'Bike'}>Bike</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Person</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Vehicle Type"
                  onChange={handleChange}
                >
                  <MenuItem value={'Car'}>Car</MenuItem>
                  <MenuItem value={'Bus'}>Bus</MenuItem>
                  <MenuItem value={'Bike'}>Bike</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <Button variant='contained' onClick={handleClickOpenFilter}><CiFilter className='btn-icon' /> Filter</Button>
          </div>
          <div>
            <Button variant='outlined'><FaUpload className='btn-icon'/></Button>
          </div>
          <div>
            <Button variant='contained'><IoDownloadOutline className='btn-icon'/> Report</Button>
          </div>
          <div>
            <Button variant='contained'><FaPlus className='btn-icon'/> Add Contact Renewal Reminder</Button>
          </div>
        </div>
      </div>

      <React.Fragment>
        <Dialog
          open={openFilter}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseFilter}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <div>Filters</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div>
                {/* <div className='edit-driver-details-div'>
                  <Button variant='contained'>Filter By Tags</Button>
                </div> */}
                <div className='vehicles-filter-division'>
                  <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Group</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vehicleNO}
                        label="Vehicle No"
                        onChange={handleChangeDropDown}
                      >
                        <MenuItem value={'Chennai'}>Chennai</MenuItem>
                        <MenuItem value={'Bangalore'}>Bangalore</MenuItem>
                        <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
                        <MenuItem value={'Goa'}>Goa</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                <div className='vehicles-filter-division'>
                  <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Tag</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vehicleNO}
                        label="Vehicle No"
                        onChange={handleChangeDropDown}
                      >
                        <MenuItem value={'Chennai'}>Chennai</MenuItem>
                        <MenuItem value={'Bangalore'}>Bangalore</MenuItem>
                        <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
                        <MenuItem value={'Goa'}>Goa</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={handleCloseFilter}>Update</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <div style={{ display: 'flex', gap: '20px', fontSize: '18px', marginBottom: '5px',flexWrap:"wrap" }}>
        <span>Total: <span>11</span></span>
        <span>Overdue: <span>1</span></span>
        <span>Due Soon: <span>0</span></span>
      </div>
      <div className='ContactRenewalReminder-table'>
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

export default ContactRenewalReminder
