import React, { useState } from 'react'
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Menu from '@mui/material/Menu';
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";
import "./LogDetails.css";
import axios from 'axios'
import { APIURL } from '../../../url'






const LogDetails = () => {
  const apiurl=APIURL
  const [logdetails,setLogDetails]=useState([])
  const [selecteddata,setSelectedData]=useState('')
  const [selectbooking,setSelectedBooking]=useState()
  const [selectcolumns,setSelectedColumns]=useState([{}])

  const handlecolumnvalues=(data)=>{
    // const logDetails = []; // Empty array
    const headers = Object.keys(data[0]);
    const columns = headers.map(key => ({ field:key, headerName: key,width:150 }));
// Extract unique keys


setSelectedColumns(columns)
// console.log(uniqueKeys);
  }

  const handleshowdetails=async()=>{
    
    try{
      const response=await axios.get(`${apiurl}/bookinglogdetailsget/${selectbooking}`);
      const data=response.data;
      console.log(data,"ff")
      if(data.length >0){

    
      setLogDetails(data)
      handlecolumnvalues(data)
      }
      else{
        setLogDetails([])
      }
    } catch(err){
      console.log(err)
    }
  }



  return (

    <>
      <div className='main-content-form'>
        <div className='input-field vendor-statement-input-field' style={{alignItems: 'flex-end'}}>

          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Select Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selecteddata}
                label="Owner Type"
                onChange={(e) => setSelectedData(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Booking"}>Booking</MenuItem>
                <MenuItem value={"Tripsheet"}>Tripsheet</MenuItem>
              </Select>
            </FormControl>
          </div>


          <div className="input">
            <div style={{}}>
              <label htmlFor="">Id</label>
              <input type="text" value={selectbooking}style={{backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '5px', padding: '10px 5px'}}
              onChange={(e)=>setSelectedBooking(e.target.value)}
              />
            </div>
          </div>

          <div className="input">
            <Button variant='contained' onClick={handleshowdetails}>Search</Button>
          </div>
          
        </div>

        <div className="Download-btn download-btn-purchase" style={{ display: "flex", gap: "15px" }}>
          <></>
          {/* <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                  Download
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                  <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState> */}
          
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
              rows={logdetails}
              columns={selectcolumns}
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



export default LogDetails