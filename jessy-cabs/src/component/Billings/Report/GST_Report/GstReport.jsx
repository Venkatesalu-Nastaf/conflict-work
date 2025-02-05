import React, { useState, useEffect } from 'react';
import "./GstReport.css";
import Box from "@mui/material/Box";
import { Menu, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiMatterStates } from "react-icons/gi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuItem from '@mui/material/MenuItem';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useGstReport from './useGstReport';
import { Autocomplete } from "@mui/material";
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import axios from "axios"
import { APIURL } from '../../../url';
import LoadingButton from '@mui/lab/LoadingButton';



export const GstReport = ({ stationName, Statename }) => {
  const { organization, gstReport, setGstReport, department, handleShow, hidePopup, handleShowAll, rows, columns,
    taxReport, handleDownloadPdf, handleDownloadExcel, success, successMessage, error, errorMessage,isGstbtnloading,setisGstbtnloading } = useGstReport();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const apiUrl = APIURL;

  const handleDateChange = (field, date) => {
    setGstReport(prevGstReport => ({
      ...prevGstReport,
      [field]: dayjs(date).format('YYYY-MM-DD')
    }));
  };

  const handleDepartmentChange = (event, value) => {
    setGstReport(prevGstReport => ({
      ...prevGstReport,
      department: value || '', 
    }));
  };

  // const handleCustomerChange = (event, value) => {
    
  //   setGstReport(prevGstReport => ({
  //     ...prevGstReport,
  //     customer: value || '', // Ensure value is not undefined
      
  //   }));
  // };

  const handleCustomerChange = (event, value) => {
    
    setGstReport((prevGstReport) => ({
      ...prevGstReport,
      customer: value || '',
    }));
  
    setisGstbtnloading(true);
  };
  

  return (
    <>
      <div className='main-content-form'>
        <div className='input-field gst-report-input-field' style={{ flexWrap: 'wrap' }}>
          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="From Date"
                  format="DD/MM/YYYY"
                  value={dayjs(gstReport?.fromDate)}
                  onChange={(date) => handleDateChange('fromDate', date)}
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
                  value={dayjs(gstReport?.toDate)}
                  onChange={(date) => handleDateChange('toDate', date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="input">
            <div className="icone">
              <GiMatterStates color="action" />
            </div>
            <Autocomplete
              fullWidth
              id="free-solo-customer"
              freeSolo
              size="small"
              //   options={Statename.map((option) => ({
              //     label: option.state,
              // }))}
              options={[...Statename.map((org) => org.state)]}
              value={gstReport.department}
              onChange={handleDepartmentChange}
              renderInput={(params) => {
                return (
                  <TextField {...params} label="State" name='department' inputRef={params.inputRef}
                  />
                )
              }}
            />
          </div>
          <div className="input">
            <div className="icone">
              <GiMatterStates color="action" />
            </div>
            <Autocomplete
              fullWidth
              id="free-solo-customer"
              freeSolo
              size="small"
              options={["All", ...organization.map(org => org.customer)]}
              value={gstReport.customer}
              onChange={handleCustomerChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Organization"
                  name='customer'
                  inputRef={params.inputRef}
                />
              )}
            />
          </div>
          <div className='input'>
            <div className="input" >
              {/* <Button onClick={handleShow} variant="outlined">Show</Button> */}
              <LoadingButton loading={isGstbtnloading} onClick={handleShow} variant="outlined">Show</LoadingButton>
            </div>
            <div className="input">
              {/* <Button className='text-nowrap' variant="contained" style={{ whiteSpace: 'nowrap' }} onClick={handleShowAll}>Show All</Button> */}
              <LoadingButton  loading={isGstbtnloading} className='text-nowrap' variant="contained" style={{ whiteSpace: 'nowrap' }} onClick={handleShowAll}>Show All</LoadingButton>
            </div>
          </div>
        </div>
        <div style={{ overflowX:"auto"}}>
        <div className='input-field gst-report-table-input-field'>
          <div className="input" >
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              value={taxReport.TaxableValue}
              label="Taxable Value"
              id="customer"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              value={taxReport.cgst}
              label="CGST"
              id="customer"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              value={taxReport.sgst}
              label="SGST"
              id="customer"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              value={taxReport.igst}
              label="IGST"
              id="customer"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              value={taxReport.totalGST}
              label="TOT.GST"
              id="customer"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              value={taxReport.totalAmount}
              label="Total Amount"
              id="customer"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={handleDownloadExcel} >Excel</MenuItem>
                    <MenuItem onClick={handleDownloadPdf} >GST PDF</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        </div>
        </div>
        
        <div className='gst-report-table'>
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
            <div className='alert-popup-main'>
              {error &&
                <div className='alert-popup Error'>
                  <div className="popup-icon"><ClearIcon /> </div>
                  <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                  <p>{errorMessage}</p>
                </div>
              }
              {success &&
                <div className='alert-popup Success'>
                  <div className="popup-icon"><FileDownloadDoneIcon /> </div>
                  <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                  <p>{successMessage}</p>
                </div>
              }

            </div>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Box>
        </div>


      </div>
    </>
  )
}
