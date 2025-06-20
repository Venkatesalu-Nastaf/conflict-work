import React, { useEffect, useState, useContext } from 'react';
import { Drawer, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PermissionContext } from "../../../context/permissionContext";
import EtripSheetImages from './EtripSheetImages/EtripSheetImages';
import EtripSheetMap from './EtripSheetMap/EtripSheetMap';
import EtripSheetSignature from './EtripSheetSignature/EtripSheetSignature';
import "./OverviewDrawer.css"
import { CiNoWaitingSign } from "react-icons/ci";
import { DataGrid } from "@mui/x-data-grid";
import EtripSheetTable from './EtripSheetTable/EtripSheetTable';
import { Status } from "./OverviewDrawerData.js";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SiStatuspal } from "react-icons/si";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { GiMatterStates } from "react-icons/gi";
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from "@mui/material/Button";
// import useTri pStatus from '../TripStatus/useTripStatus';
import useOverviewDrawer from './useOverviewDrawer.js'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SpeedDial from "@mui/material/SpeedDial";
import { styled } from "@mui/material/styles";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

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


const OverviewDrawer = ({ stationName, customer, vehicleNo }) => {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(PermissionContext)


  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // const [showCards, SetShowCards] = useState(false);
  // const handleShowCards = () => {
  //   SetShowCards(!showCards);
  // }
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const Roledatauser = localStorage.getItem("SuperAdmin")

  const filteredStatus =
    Roledatauser === "SuperAdmin" || Roledatauser === "Assistant CFO" || Roledatauser === "Billing_Headoffice"
      ? Status // Show all statuses for superAdmin and CFo
      : Status.filter((option) => option.optionvalue !== "Billed" && option.optionvalue !== "All");

  const {
    popupOpen,
    handlePopupClose,
    selectedRow,
    handleBookingClick,
    handleShowCards,
    handleCloseCards,
    showCards,
    reversedRows,
    columnshowall,
    columns,
    filteredColumns,
    handlestatusChange,
    handleCustomerChange,
    VehNo,
    handleButtonshowClick,
    handleVechicleNoChange,
    cutomerName,
    statusvalue,
    handleShow,
    // handleShowAll,
    fromDate,
    department,
    handleInputChange,
    // stationName,
    toDate,
    setToDate,
    setFromDate,
    handleClick,
    handleTripsheetClick,
    handleButtonClick,
    handleShowButtonClick,
    handleRowClick,
    //POP ups..
    hidePopup,
    error,
    errorMessage,
    warning,
    warningMessage,
    success,
    successMessage,
    info,
    infoMessage,
    columsnew,
    // map and img functions
    selectedCustomerId,
    setSignImageUrl,
    signImageUrl,
    setMapImageUrl,
    mapImgUrl,
    imageDetails,
    setImageDetails,
    setLoading,
    loading, isStations, setisStations


  } = useOverviewDrawer();
  // console.log(reversedRows,' datas if grid')


  const [allCustomer, setAllCustomer] = useState([])
  const { permissions } = useContext(PermissionContext)
  const TripStatus_read = permissions[2]?.read;

  // useEffect(() => {
  //   if (customer?.length > 1) {
  //     setAllCustomer([...customer, { customer: "All" }])
  //   }
  //   else {
  //     setAllCustomer(customer)
  //   }
  // })
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
    <>
      <div className='overview-drawer'>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={closeDrawer}
          PaperProps={{
            sx: { width: '100%' }, // Full width
          }}
        >
          {/* Drawer content */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <Typography variant="h6">Overview</Typography>
            {/* Close button */}
            <IconButton onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className='input-field main-content-overview' style={{ padding: '20px', flexWrap: "wrap" }}>

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
                // options={Status.map((option) => ({
                //   label: option.option,
                // }))}
                options={filteredStatus.map((option) => ({ label: option.option }))}
                onChange={(event, value) => handlestatusChange(event, value)}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Status" inputRef={params.inputRef} />
                  );
                }}
              />
            </div>

            {/* <div className="input">
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
            </div> */}

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
                options={[{ label: "All" }, ...stationName.map(option => ({ label: option.Stationname }))]}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                onChange={(event, value) => {
                  if (value.some(v => v.label === "All")) {
                    // If "All" is selected, only keep "All"
                    handleInputChange(event, [{ label: "All" }]);
                  } else {
                    // If any other option is selected, remove "All"
                    const filteredValues = value.filter(v => v.label !== "All");
                    handleInputChange(event, filteredValues);
                  }
                }}
                disableCloseOnSelect
                renderOption={(props, option, { selected }) => {
                  const isAllSelected = department.some(d => d.label === "All");

                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={isAllSelected || selected} // Ensure all checkboxes are checked when "All" is selected
                      />
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Department" inputRef={params.inputRef} />
                )}
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
              {/* <div className="input">
                <Button className='text-nowrap' variant="contained" disabled={!TripStatus_read} onClick={handleShowAll} style={{ whiteSpace: 'nowrap' }}>Show All</Button>
              </div> */}
            </div>
          </div>
          {/* <div className="SpeedDial">
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
          </div> */}
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

          <Box sx={{ padding: '16px' }} className="main-content-overview">
            {/* <Typography variant="body1">This is the content inside the full-page drawer.</Typography> */}
            {/* <p onClick={handleShowCards}>Show Cards</p> */}
            {showCards ?
              <div className='top-cards'>
                <IconButton onClick={handleCloseCards} sx={{ position: 'absolute', right: '16px', top: '300px' }}>
                  <CloseIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                {/* <EtripSheetSignature /> */}
                <EtripSheetSignature signImageUrl={signImageUrl} />

                {/* <EtripSheetMap /> */}
                <EtripSheetMap mapImgUrl={mapImgUrl} />
                {/* <EtripSheetImages /> */}
                {/* <EtripSheetImages imageDetails = {imageDetails}/> */}
                {/* <EtripSheetImages imageDetails={imageDetails} /> */}
                <EtripSheetImages imageDetails={imageDetails} />

              </div>
              :
              <div className='top-cards-hidden'>
                <CiNoWaitingSign />
                <p style={{ margin: '0px' }}>No data to show</p>
              </div>
            }
            <div className='table-top-buttons'>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Verified</Button>
              {/* <Button onRowClick={(event) => handleButtonClick(event.row)}>Show</Button> */}
              {/* <Button onClick={handleButtonClick}>Show</Button> */}
              <Button onClick={handleShowButtonClick}>Show</Button>

            </div>
            {/* <EtripSheetTable 
              rows1={reversedRows}
              columns={columnshowall ? columns : filteredColumns}
              onRowClick={(event) => handleButtonClick(event.row)}
              pageSize={5}
               /> */}

          </Box>
          {/* <Box sx={{ padding: '16px' }}>
         
            <div className='trip-status-table'>
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
              > */}
          {/* <DataGrid
                  rows={reversedRows}
                  columns={columnshowall ? columns : filteredColumns}
                  onRowClick={(event) => handleButtonClick(event.row)}
                  pageSize={5}
                /> */}
          {/* chges for show button and show card button */}
          {/* <DataGrid
                  rows={reversedRows}
                  columns={columnshowall ? columns : filteredColumns}
                  onRowClick={(event) => handleRowClick(event.row)}
                  pageSize={5}
                />
              </Box> */}

          {/* </div>
          </Box> */}

          {/* Code with loading */}
          <Box sx={{ padding: '16px' }}>
            <div className='trip-status-table-container'>
            <div className='trip-status-table'>
              <Box
                sx={{
                  position: 'relative', // Set position relative for the container
                  height: 400, // Adjust this value to fit your needs
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
                {/* Show loading spinner if loading is true */}
                {loading && (
                  // <Box
                  //     sx={{
                  //         position: 'absolute', // Position the loading spinner absolutely
                  //         top: '50%',
                  //         left: '50%',
                  //         transform: 'translate(-50%, -50%)', // Center the spinner
                  //         zIndex: 1, // Ensure it appears above the DataGrid
                  //         width: '100%', // Make it full width of the parent
                  //         height: '70%', // Make it full height of the parent
                  //     }}
                  // >
                  //     <CircularProgress />
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
                <DataGrid
                  rows={reversedRows}
                  columns={columnshowall ? columsnew : filteredColumns}
                  onRowClick={(event) => handleRowClick(event.row)}
                  pageSize={5}
                  components={{
                    NoRowsOverlay: CustomNoRowsOverlay, // Use custom overlay
                  }}
                />
              </Box>
            </div>
            </div>
          </Box>
        </Drawer>
      </div>
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

    </>

  )
}

export default OverviewDrawer;
