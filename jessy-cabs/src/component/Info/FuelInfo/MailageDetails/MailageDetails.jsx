import React, { useEffect, useContext } from 'react';
import './MailageDetails.css';
import "jspdf-autotable";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { PermissionContext } from '../../../context/permissionContext';

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faGaugeHigh, faGaugeSimple } from "@fortawesome/free-solid-svg-icons";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import CommuteIcon from '@mui/icons-material/Commute';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useMailagedetails from './useMailagedetails';
// import DateRangeIcon from '@mui/icons-material/DateRange';

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


const MailageDetails = () => {

  const {
    selectedCustomerData,
    selectedCustomerId,
    rows,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    handleDateChange,
    initialOdometer,
    setInitialOdometer,
    finalOdometer,
    setFinalOdometer,
    fuelConsumption,
    setFuelConsumption,
    calculateMileage,
    mileage,
    columns,
    isEditMode,
    handleEdit,

  } = useMailagedetails();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  // Permission ---------------------
  const { permissions } = useContext(PermissionContext)
  const FuelInfo_read = permissions[19]?.read;
  const FuelInfo_new = permissions[19]?.new;
  const FuelInfo_modify = permissions[19]?.modify;
  const FuelInfo_delete = permissions[19]?.delete;

  return (

    <div className="form-container-FuelInfo">
      <div className="MailageDetails-Main">
        <form >
          <div className="MailageDetails-page-header">
            <div className="detailsFuel">
              <div className="input-field detailsFuel-inputs">
                <div className="input">
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleNo"
                    className='full-width'
                    label="Vehicle No"
                    name="VehicleNo"
                    autoComplete="new-password"
                    value={selectedCustomerData?.VehicleNo || book.VehicleNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CommuteIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleName"
                    className='full-width'
                    label="Vehicle Name"
                    name="VehicleName"
                    autoComplete="new-password"
                    value={selectedCustomerData?.VehicleName || book.VehicleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <DatePicker
                      label="Fill Date"
                      format="DD/MM/YYYY"
                      id="fill_date1"
                      value={selectedCustomerData.filldate ? dayjs(selectedCustomerData.filldate) : null}
                      onChange={(date) => handleDateChange(date, 'filldate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='filldate' value={selectedCustomerData.filldate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <DatePicker
                      id="empty_Date"
                      label="Empty Date"
                      format="DD/MM/YYYY"
                      value={selectedCustomerData.emptydate ? dayjs(selectedCustomerData.emptydate) : null}
                      onChange={(date) => handleDateChange(date, 'emptydate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='emptydate' value={selectedCustomerData.emptydate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="DriverName"
                    className='full-width'
                    label="Driver Name"
                    name="DriverName"
                    autoComplete="new-password"
                    value={selectedCustomerData?.DriverName || book.DriverName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CurrencyRupeeIcon color='action' />
                  </div>
                  <TextField
                    size="small"
                    id="FuelPrice"
                    className='full-width'
                    label="Fuel Price"
                    name="FuelPrice"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FuelPrice || book.FuelPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faGaugeSimple} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="InitialOdometerReading"
                    label="Initial Odometer Reading"
                    name="InitialOdometerReading"
                    autoComplete="new-password"
                    value={selectedCustomerData?.InitialOdometerReading || book.InitialOdometerReading || initialOdometer}
                    sx={{ width: "100%" }}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setInitialOdometer(e.target.value);
                    }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faGaugeHigh} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="FinalOdometerReading"
                    className='full-width'
                    label="Final Odometer Reading"
                    sx={{ width: "250px" }}
                    name="FinalOdometerReading"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FinalOdometerReading || book.FinalOdometerReading || finalOdometer}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setFinalOdometer(e.target.value);
                    }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faGasPump} size="xl" />
                  </div>
                  <TextField
                    size="small"
                    id="FuelConsumptioninliters"
                    label="Fuel Consumption (in liters)"
                    sx={{ width: "100%" }}
                    name="FuelConsumptioninliters"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FuelConsumptioninliters || book.FuelConsumptioninliters || fuelConsumption}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setFuelConsumption(e.target.value);
                    }}
                  />
                </div>
                <div className="input" >
                  <Button color="primary" variant="outlined" onClick={calculateMileage}>
                    Calculate Mileage
                  </Button>
                </div>
                <div className="input">
                  <div className="input">
                    {isEditMode ? (
                      <Button variant="contained" disabled={!FuelInfo_modify} onClick={handleEdit}>Edit</Button>
                    ) : (
                      <Button variant="contained" disabled={!FuelInfo_new} onClick={handleAdd} >Add</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>Mileage: </h2>
              <p>
                <span className="mailage-icone">
                  <FontAwesomeIcon icon={faGaugeHigh} size="lg" />
                </span>
                {mileage.toFixed(2)} km/L
              </p>
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
            <Box sx={{ position: "relative", mt: 3, height: 320 }}>
              <StyledSpeedDial
                ariaLabel="SpeedDial playground example"
                icon={<SpeedDialIcon />}
                direction="left"
              >

                {FuelInfo_read === 1 && (
                  <SpeedDialAction
                    key="list"
                    icon={<ChecklistIcon />}
                    tooltipTitle="List"
                    onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                  />
                )}
                {FuelInfo_modify === 1 && (
                  <SpeedDialAction
                    key="edit"
                    icon={<ModeEditIcon />}
                    tooltipTitle="Edit"
                    onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                  />
                )}
                {FuelInfo_delete === 1 && (
                  <SpeedDialAction
                    key="delete"
                    icon={<DeleteIcon />}
                    tooltipTitle="Delete"
                    onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                  />
                )}
                {FuelInfo_new === 1 && (
                  <SpeedDialAction
                    key="Add"
                    icon={<BookmarkAddedIcon />}
                    tooltipTitle="Add"
                    onClick={(event) => handleClick(event, "Add", selectedCustomerId)}
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
            <div className="Download-btn">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                      Download
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>Excel</MenuItem>
                      <MenuItem >PDF</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <div className="table-bookingCopy-Employe">
              <div className='milage-details-table'>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  onRowClick={handleRowClick}
                  pageSize={5}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MailageDetails