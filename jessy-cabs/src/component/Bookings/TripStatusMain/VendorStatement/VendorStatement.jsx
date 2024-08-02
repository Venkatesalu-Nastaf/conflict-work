import React, { useEffect, useContext } from 'react';
import "./VendorStatement.css";
import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
// import Dialog from '@mui/material/Dialog';
// import { Stations } from "./VendorStatementData";
import Autocomplete from "@mui/material/Autocomplete";
// import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { PermissionContext } from '../../../context/permissionContext';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useVehiclestatement from './useVendorstatement';
import { IoBusinessSharp } from "react-icons/io5";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const VendorStatement = () => {

  const {
    actionName,
    selectedCustomerId,
    handleClick,
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
    // popupOpen,
    // handlePopupClose,
    // selectedRow,
    // handleBookingClick,
    // handleTripsheetClick,
    setToDate, accountinfodata, travelsname, fullamountdata,
    columns
  } = useVehiclestatement();



  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const { permissions } = useContext(PermissionContext)
  const TripStatus_read = permissions[2]?.read;

  return (
    <div className="VehicleStatement-form main-content-form Scroll-Style-hide">
      <form action="">
        {/* <div className="input-field vehiclestatement-inputfeild-top">
                <div className="input-top-vehicle">
                  <div className="icone">
                    <IoBusinessSharp color="action" style={{fontSize:"15px"}}/>
                  </div>
                  <Autocomplete
                    fullWidth
                    id="vendor_name_from"
                    freeSolo
                    size="small"
                    value={servicestation}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={handleInputChange}
                    renderInput={(params) =>
                      <TextField {...params} label="Vendor Name From"
                      sx={{
                        '& .MuiInputBase-root': {
                          padding: '2px', // Reduce padding
                          fontSize: '0.8rem', // Adjust font size
                          height: '30px', // Adjust height
                          width: '150px', // Adjust width
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '0.8rem', // Adjust label font size
                          transform: 'translate(14px, 8px) scale(1)', // Adjust label position
                        },
                        '& .MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.2rem', // Adjust icon size
                        },
                      }} />
                    }
                  />
                </div>
                <div className="input-top-vehicle">
                  <div className="icone">
                    <IoBusinessSharp color="action" style={{fontSize:"15px"}}/>
                  </div>
                  <Autocomplete
                    fullWidth
                    id="vendorNameTo"
                    freeSolo
                    size="small"
                    value={servicestation}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={handleInputChange}
                    renderInput={(params) =>
                      <TextField {...params} label="Vendor Name To"
                      sx={{
                        '& .MuiInputBase-root': {
                          padding: '2px', // Reduce padding
                          fontSize: '0.8rem', // Adjust font size
                          height: '30px', // Adjust height
                          width: '150px', // Adjust width
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '0.8rem', // Adjust label font size
                          transform: 'translate(14px, 8px) scale(1)', // Adjust label position
                        },
                        '& .MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.2rem', // Adjust icon size
                        },
                      }}
                      />
                    }
                  />
                </div>
                <div className="input-top-vehicle vehiecle-date">
                  <div className="icone">
                    <CalendarMonthIcon color="action"  style={{fontSize:"15px"}}/>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="fromDate"
                        label="From Date"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                        sx={{
                          '.MuiInputBase-root': {
                            padding: '10px', // Reduce padding
                            fontSize: '0.8rem', // Adjust font size
                            height: '30px', // Adjust height
                            width: '150px', // Adjust width
                            overflow: 'hidden', // Hide overflow
                          },
                          '.MuiInputLabel-root': {
                            fontSize: '0.8rem', // Adjust label font size
                            transform: 'translate(14px, 10px) scale(1)', // Adjust label position
                          },
                          '.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                          },
                          '.MuiSvgIcon-root': {
                            fontSize: '1.2rem', // Adjust calendar icon size
                          },
                          '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ccc', // Optional: Adjust border color
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input-top-vehicle vehiecle-date">
                  <div className="icone">
                    <CalendarMonthIcon color="action"  style={{fontSize:"15px"}}/>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="dateTo"
                        label="To Date"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                        sx={{
                          '.MuiInputBase-root': {
                            padding: '10px', // Reduce padding
                            fontSize: '0.8rem', // Adjust font size
                            height: '30px', // Adjust height
                            width: '150px', // Adjust width
                            overflow: 'hidden', // Hide overflow
                          },
                          '.MuiInputLabel-root': {
                            fontSize: '0.8rem', // Adjust label font size
                            transform: 'translate(14px, 10px) scale(1)', // Adjust label position
                          },
                          '.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                          },
                          '.MuiSvgIcon-root': {
                            fontSize: '1.2rem', // Adjust calendar icon size
                          },
                          '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ccc', // Optional: Adjust border color
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <button className='top-buttons-vehicle'>List</button>
                <button className='top-buttons-vehicle'>print</button>
                <button className='top-buttons-vehicle'>Excel</button>
                <div style={{display:"flex", alignItems:"center"}}>
                  <input type="checkbox" name="" id="" />
                  Preview
                </div>
              </div> */}







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
                <div className="input vehiecle-date">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="fromDate"
                        label="From Date"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input vehiecle-date">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="dateTo"
                        label="To Date"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                      />
                    </DemoContainer>
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
        <div className="SpeedDial SpeedDial-division">
          <Box sx={{ position: "fixed", mt: 3, height: 320, bottom: "30px", right: "30px", zIndex: '1' }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<SpeedDialIcon />}
              direction="left"
            >

              {TripStatus_read === 1 && (
                <SpeedDialAction
                  key="list"
                  icon={<ChecklistIcon />}
                  tooltipTitle="List"
                  onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                />
              )}
              <SpeedDialAction
                key="Cancel"
                icon={<CancelPresentationIcon />}
                tooltipTitle="Cancel"
                onClick={(event) => handleClick(event, "Cancel", selectedCustomerId)}
              />
            </StyledSpeedDial>
          </Box>
        </div>

        <div style={{ display: "flex" }}>
          <div className="Download-btn" style={{ paddingRight: '15px' }}>
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
          {/* <div className="paid-amount-input-field"> */}
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
              label="opening balance"
              name=""
              autoComplete="off"
            />
          </div>

          {/* </div> */}
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