import React from 'react'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiMatterStates } from "react-icons/gi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Menu from '@mui/material/Menu';
import "./PurchaseSummary.css";
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";



const columns = [
  { field: 'id', headerName: 'S.no', width: 100 },
  { field: 'vehiecle', headerName: 'vehiecle', width: 180 },
  { field: 'totalkms', headerName: 'Total Kms', width: 180 },
  { field: 'totaltime', headerName: 'Total Time', width: 180 },
  { field: 'Amount', headerName: 'Amount', width: 180 },
  { field: 'Dadvance', headerName: 'D.Advance', width: 180 },
  { field: 'Balance', headerName: 'Balance', width: 180 },
  { field: 'Bata', headerName: 'Bata', width: 180 },


];

const rows = [
  { id: 1, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 2, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 3, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 4, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 5, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 6, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 7, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 8, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },
  { id: 9, vehiecle: "car", totalkms: '50', totaltime: '4 hrs', Amount: '2000', Dadvance: '200', Balance: '1800', Bata: '200' },


];












export const PurchaseSummary = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (

    <>
      <div className='main-content-form'>
        <div className='input-field'>

          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>

            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Owner Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Owner Type"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Attached</MenuItem>
                <MenuItem value={20}>Lease</MenuItem>
                <MenuItem value={30}>Own</MenuItem>
              </Select>
            </FormControl>
          </div>





          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="From Date"
                  format="DD/MM/YYYY"
                // value={fromDate}
                // onChange={(date) => setFromDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="input dispatch-input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="To Date"
                  format="DD/MM/YYYY"
                // value={toDate}
                // onChange={(date) => setToDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>


          <Button variant="contained">List</Button>
          <Button variant="contained">Print</Button>
          <Button variant="contained">Tds</Button>

          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Preveiw"
            labelPlacement="Preveiw"
          />




        </div>

        <div className="Download-btn download-btn-purchase">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                  Download
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem >Excel</MenuItem>
                  <MenuItem >PDF</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>

        <div className='purchaseSummary-table'>
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
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            // checkboxSelection
            />
          </Box>
        </div>



      </div>
    </>)
}

