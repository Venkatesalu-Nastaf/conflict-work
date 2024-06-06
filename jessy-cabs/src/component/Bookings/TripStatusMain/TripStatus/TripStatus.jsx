import React, { useEffect, useContext } from 'react';
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


const TripStatus = ({ stationName }) => {

  const {
    statusvalue, handlestatusChange,
    fromDate,
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
    // handleButtontripsheet,
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
    columnshowall
  } = useTripStatus();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);
  const { permissions } = useContext(PermissionContext)
  const TripStatus_read = permissions[2]?.read;

  return (
    <div className="TripStatus-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main detail-container-main-tripstatus">
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
                <div className='show-all-button'>
                  <div className="input" >
                    <Button variant="outlined" disabled={!TripStatus_read} onClick={handleShow} >Show</Button>
                  </div>
                  <div className="input">
                    <Button className='text-nowrap' variant="outlined" disabled={!TripStatus_read} onClick={handleShowAll} style={{ whiteSpace: 'nowrap' }}>Show All</Button>
                  </div>
                </div>
              </div>
              <div className="input-field TripStatus-input-feilds">
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
                    id="Department"
                    freeSolo
                    size="small"
                    value={department}
                    options={stationName?.map((option) => ({
                      label: option.Stationname,
                    }))}
                    onChange={(event, value) => handleInputChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Department" inputRef={params.inputRef} />
                      );
                    }}
                  />
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
          <Box sx={{ position: "relative", mt: 2, }}>
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
        <div className="table-bookingCopy-TripStatus">
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
          <div className='trip-status-table'>
            <DataGrid
              rows={reversedRows}
              columns={columnshowall ? columns : filteredColumns}
              onRowClick={(event) => handleButtonClick(event.row)}
              pageSize={5}
            />
            <Dialog open={popupOpen} onClose={handlePopupClose}>
              <DialogTitle>Select an Option</DialogTitle>
              <DialogContent>
                {selectedRow && (
                  <div>
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