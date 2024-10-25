import React, { useEffect, useContext, useState } from 'react';
import "./TripStatus.css";
import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import { Status } from "./TripStatusData.js";
import Autocomplete from "@mui/material/Autocomplete";
import useTripStatus from './useTripStatus.js';
import { MdOutlineCalendarMonth } from "react-icons/md";
import { SiStatuspal } from "react-icons/si";
import { GiMatterStates } from "react-icons/gi";
import Box from "@mui/material/Box";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DialogTitle from '@mui/material/DialogTitle';
import { PermissionContext } from '../../../context/permissionContext.js';
// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
//import Skeleton from '@mui/material/Skeleton';
import {  CircularProgress } from '@mui/material';

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const TripStatus = ({ stationName, customer, vehicleNo }) => {

  const {
    statusvalue, handlestatusChange, VehNo, cutomerName,
    fromDate, handleVechicleNoChange, handleCustomerChange,
    selectedCustomerId,
    setFromDate,
    toDate,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    setToDate,
    handleClick,
    handleShow,
    handleShowAll,
    department,
    hidePopup,
    handleInputChange,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    handleButtonClick,
    popupOpen,
    handlePopupClose,
    selectedRow,
    handleTripsheetClick,
    columns,
    filteredColumns,
    columnshowall,
     //setCutomerName,
     // setVehNo, 
      handleBookingClick,
      loading,
      isStations,setisStations
     // setLoading
  } = useTripStatus();
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);
  const { permissions } = useContext(PermissionContext)
  const TripStatus_read = permissions[2]?.read;
  const [allCustomer, setAllCustomer] = useState([])
  // useEffect(() => {
  //   if (customer?.length > 1) {
  //     setAllCustomer([...customer, { customer: "All" }])
  //   }
  //   else {
  //     setAllCustomer(customer)
  //   }
  // })
  useEffect(() => {
    if (customer?.length > 1) {
        setAllCustomer([...customer, { customer: "All" }]);
    } else {
        setAllCustomer(customer);
    }
}, [customer]); // Include customer as a dependency

useEffect(() => {

  if (stationName?.length > 0) {
    setisStations(stationName)
  }
}, [stationName])


  const CustomNoRowsOverlay = () => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
        {/* Optionally, you can add your own message or styles */}
        <p></p>
    </div>
);

  return (
    <div className="TripStatus-form main-content-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main-tripstatus">
          <div className="container-left-tripstatus">
            <div className="copy-title-btn-TripStatus">
              <div className="input-field TripStatus-input-feilds">
                <div className="input">
                  <div className="icone">
                    <MdOutlineCalendarMonth color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="From Date"
                        format="DD/MM/YYYY"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
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
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <SiStatuspal color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="Status"
                    freeSolo
                    size="small"
                    value={statusvalue}
                    options={Status.map((option) => ({
                      label: option.option,
                    }))}
                    onChange={(event, value) => handlestatusChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Status" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <GiMatterStates color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    multiple
                    id="Department"
                    size="small"
                    value={department}
                    options={stationName.map((option) => ({
                      label: option.Stationname,
                    }))}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    onChange={(event, value) => handleInputChange(event, value)}
                    disableCloseOnSelect
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Department" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <GiMatterStates color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    multiple
                    id="Customer"
                    freeSolo
                    size="small"
                    value={cutomerName}
                    options={allCustomer?.map((option) => ({
                      label: option.customer,
                    }))}
                    disableCloseOnSelect
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    onChange={(event, value) => handleCustomerChange(event, value)}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Customer" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <GiMatterStates color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="vehicleNo"
                    freeSolo
                    size="small"
                    value={VehNo}
                    options={vehicleNo?.map((option) => ({
                      label: option.vehRegNo,
                    }))}
                    onChange={(event, value) => handleVechicleNoChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Vehicle No" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className='show-all-button'>
                  <div className="input" >
                    <Button variant="outlined" disabled={!TripStatus_read} onClick={handleShow} >Show</Button>
                  </div>
                  <div className="input">
                    <Button className='text-nowrap' variant="contained" disabled={!TripStatus_read} onClick={handleShowAll} style={{ whiteSpace: 'nowrap' }}>Show All</Button>
                  </div>
                </div>
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
          </div>
        </div>
        <div className="SpeedDial">
          <Box className='common-speed-dail'>
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
        <div className="Download-btn">
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
        {/* <div className="table-bookingCopy-TripStatus">
          <div className='trip-status-table'>
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
               {loading && (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                width: '90%', // Slightly reduced width for padding
                height: '70%', // Height remains the same
                backgroundColor: '#fff', // Background color to match DataGrid
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                padding: '16px', // Padding for content
            }}
        >
            <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="10%"
                sx={{ bgcolor: '#b0bec5', opacity: 0.7 }}
            />
            <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="20%"
                sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
            />
            <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="20%"
                sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
            />
            <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="20%"
                sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
            />
            <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="20%"
                sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
            />
        </Box>
    )}
              <DataGrid
                rows={reversedRows}
                columns={columnshowall ? columns : filteredColumns}
                onRowClick={(event) => handleButtonClick(event.row)}
                pageSize={5}
              />
            </Box>*/}
            <div className="table-bookingCopy-TripStatus">
    <div className='trip-status-table'>
        <Box
            sx={{
                height: 400, // Adjust this value to fit your needs
                position: 'relative', // Ensure the loading box is positioned relative to the Box
                '& .MuiDataGrid-virtualScroller': {
                    '&::-webkit-scrollbar': {
                        width: '8px', // Adjust the scrollbar width here
                        height: '8px', // Adjust the scrollbar height here
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
                rows={reversedRows}
                columns={columnshowall ? columns : filteredColumns}
                onRowClick={(event) => handleButtonClick(event.row)}
                pageSize={5}
               // loading={loading} // This will show the built-in loading overlay
               components={{
                NoRowsOverlay: CustomNoRowsOverlay, // Use custom overlay
            }}
            />
            {loading && (
                // <Box
                //     sx={{
                //       position: 'absolute', // Position the loading spinner absolutely
                //       top: '50%',
                //       left: '50%',
                //       transform: 'translate(-50%, -50%)', // Center the spinner
                //       zIndex: 1, // Ensure it appears above the DataGrid
                //       width: '100%', // Make it full width of the parent
                //       height: '70%', // Make it full height of the parent
                //     }}
                // >
                //     <Skeleton
                //         variant="rectangular"
                //         animation="wave"
                //         width="100%"
                //         height="10%"
                //         sx={{ bgcolor: '#b0bec5', opacity: 0.7 }}
                //     />
                //     <Skeleton
                //         variant="rectangular"
                //         animation="wave"
                //         width="100%"
                //         height="20%"
                //         sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
                //     />
                //     <Skeleton
                //         variant="rectangular"
                //         animation="wave"
                //         width="100%"
                //         height="20%"
                //         sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
                //     />
                //     <Skeleton
                //         variant="rectangular"
                //         animation="wave"
                //         width="100%"
                //         height="20%"
                //         sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
                //     />
                //     <Skeleton
                //         variant="rectangular"
                //         animation="wave"
                //         width="100%"
                //         height="20%"
                //         sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: '8px' }}
                //     />
                // </Box>
                <Box
                sx={{
                  position: 'absolute', // Position the loading spinner absolutely
                  top: '50%', // Adjust this value based on your DataGrid header height
                  left: '50%',
                  transform: 'translate(-50%, -50%)', // Center the spinner horizontally
                  zIndex: 1, // Ensure it appears above the DataGrid
                  width: '100%', // Make it full width of the parent
                  height: '70%', // Make it full height of the parent
                  display: 'flex', // Use flexbox for centering
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                }}
              >
                <CircularProgress />
                    
                </Box>
            )}
        </Box>
            
            <Dialog open={popupOpen} onClose={handlePopupClose}> 
              <DialogTitle>Select an Option</DialogTitle>
              <DialogContent>
                {selectedRow && (
                  <div>
                    <Button onClick={handleBookingClick}>Booking</Button>
                    <Button onClick={handleTripsheetClick}>Tripsheet</Button>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  )
}
export default TripStatus