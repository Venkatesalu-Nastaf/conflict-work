import React, { useEffect, useContext } from 'react';
import "./VendorStatement.css";
import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from 'dayjs';
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { styled } from "@mui/material/styles";
// import SpeedDial from "@mui/material/SpeedDial";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { PermissionContext } from '../../../context/permissionContext';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useVehiclestatement from './useVendorstatement';
import { IoBusinessSharp } from "react-icons/io5";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


const VendorStatement = () => {

  const {
    
    rows,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    hidePopup,
    handleInputChange,
    fromDate,
    setFromDate,
    toDate,
    handleShow,
    handleShowAll,
    handleExcelDownload,
    handlePdfDownload,
    handleButtonClick,
    setToDate, accountinfodata, travelsname, fullamountdata,
    columns
  } = useVehiclestatement();





  const { permissions } = useContext(PermissionContext)
  const TripStatus_read = permissions[2]?.read;

  return (
    <div className="VehicleStatement-form main-content-form Scroll-Style-hide">
      <form action="">     
        <div className=" VehicleStatement-container-main ">
          <div className="container-left">
            <div className="SearchContainer-VehicleStatement">
              <div className="input-field vehiclestatement-inputfeild">
                <div className="input">
                  <div className="icone">
                    <IoBusinessSharp color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="vendor_name_from"
                    freeSolo
                    size="small"
                    value={travelsname}
                    options={accountinfodata.map((option) => ({
                      label: option?.travelsname,
                    }))}
                    getOptionLabel={(option) => option.label || travelsname || ""}
                    onChange={handleInputChange}
                    renderInput={(params) =>
                      <TextField {...params} label="Vendor Name From" />
                    }
                  />
                </div>
                {/* <div className="input vehiecle-date">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="fromDate"
                        label="From Date"
                        value={fromDate}
                        onChange={(date) => setFromDate(dayjs(date).format('DD-MM-YYYY'))}
                        format="DD-MM-YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div> */}
                 <div className="input vehiecle-date">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="fromDate"
                      label="From Date"
                      value={fromDate} 
                      onChange={(date) => setFromDate(date)} 
                      format="DD-MM-YYYY" 
                    />
                  </LocalizationProvider>
                </div>
                {/* <div className="input vehiecle-date">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="dateTo"
                        label="To Date"
                        value={toDate}
                        onChange={(date) => setToDate(dayjs(date).format('DD-MM-YYYY'))}
                        format='DD-MM-YYYY'
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div> */}
                  <div className="input vehiecle-date">
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        id="dateTo"
                        label="To Date"
                        value={toDate} 
                        onChange={(date) => setToDate(date)} 
                        format="DD-MM-YYYY" 
                      />
                    </LocalizationProvider>
                </div>
                <div className="input" style={{ gap: '15px' }}>
                  <div className="">
                    <Button variant="outlined" disabled={!TripStatus_read} onClick={handleShow} >Show</Button>
                  </div>
                  <div className="">
                    <Button variant="contained" disabled={!TripStatus_read}
                      onClick={handleShowAll}
                    >Show All</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <div className='vendor-down-section'>
          <div className="Download-btn" style={{ paddingRight: '15px',paddingBottom:"0px" }}>
            <PopupState variant="popover" popupId="demo-popup-menu">
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
            </PopupState>
          </div>
          <div className="input">
            <TextField
              margin="normal"
              size="small"
              id="paidamount"
              label="Paid Amount"
              name="paidamount"
              value={fullamountdata}
            />
          </div>

          <div className="input">
            <TextField
              margin="normal"
              size="small"
              id=""
              label="Opening Balance"
              name=""
              autoComplete="off"
            />
          </div>
        </div>

        <div className='alert-popup-main'>
          {error &&
            <div className='alert-popup Error' >
              <div className="popup-icon"> <ClearIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{errorMessage}</p>
            </div>
          }
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{warningMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{successMessage}</p>
            </div>
          }
          {info &&
            <div className='alert-popup Info' >
              <div className="popup-icon"> <BsInfo /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{infoMessage}</p>
            </div>
          }
        </div>
        <div className="table-bookingCopy-VehicleStatement">
          <div className='vehicle-statement-table'>
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
                onRowClick={(event) => handleButtonClick(event.row)}
                pageSize={5}
              />
            </Box>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VendorStatement