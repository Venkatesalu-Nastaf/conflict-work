import React, { useEffect, useContext } from 'react';
import "./TripSheet.css";
import {
  Apps,
  VehicleRate,
  Status,
  HireTypes,
  DocumentType,
  Duty,
  Pickup,
  Email,
  Select,
  GroupTypes
} from "./TripSheetdata";
import dayjs from "dayjs";
// import { Table } from "@mui/joy";
import Tabs from "@mui/joy/Tabs";
import Box from "@mui/material/Box";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Invoice from '../Invoice/Invoice';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/joy/Tab";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EmailIcon from "@mui/icons-material/Email";
//dialog box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// ICONS
import CallIcon from "@mui/icons-material/Call";
import StoreIcon from "@mui/icons-material/Store";
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import StreamIcon from "@mui/icons-material/Stream";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import PaymentsIcon from "@mui/icons-material/Payments";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Inventory2Icon from "@mui/icons-material/Inventory2";
// import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import LocationCityIcon from "@mui/icons-material/LocationCity";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import MinorCrashSharpIcon from "@mui/icons-material/MinorCrashSharp";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
// FontAwesomeIcon Link
// import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faStamp } from "@fortawesome/free-solid-svg-icons";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { PermissionContext } from '../../context/permissionContext';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChecklistIcon from "@mui/icons-material/Checklist";
import useTripsheet from './useTripsheet';
import { MdOutlineAccessTimeFilled } from "react-icons/md";

// UpdateTbaleRowsGPSSlider TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "name", headerName: "Attach Name", width: 130 },
  { field: "path", headerName: "Attach Path", width: 130 },
  { field: "documenttype", headerName: "Document Type", width: 130 },
  { field: "tripid", headerName: "Trip ID", width: 90 },
];
// Update Table
const UpdateTbaleColumns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "document", headerName: "Document", width: 130 },
  { field: "documentname", headerName: "Document Name", width: 130 },
  { field: "filename", headerName: "File Name", width: 90 },
];

const UpdateTbaleRows = [
  {
    id: 1,
    document: 1,
    documentname: "Employee 1",
    filename: "John Doe",
  },
  {
    id: 2,
    document: 2,
    documentname: "Band 2",
    filename: "Employee 2",
  },
];

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


const maplogcolumns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripid", headerName: "TripSheet No", width: 130 },
  { field: "date", headerName: "Trip Date", width: 160 },
  { field: "time", headerName: "Trip Time", width: 130 },
  { field: "trip_type", headerName: "Trip Type", width: 160 },
  { field: "place_name", headerName: "Place Name", width: 600 },
];

const TripSheet = ({ stationName }) => {

  const {
    selectedCustomerData, handleConfirm, driverBeta, driverbeta_Count, nightBta, nightCount,
    selectedCustomerId, setNightBeta, setNightCount, request, setRequest, calcCheck, vehileName,
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
    handleKeyDown,
    handleDateChange,
    handleAutocompleteChange,
    packageData,
    smsguest,
    sendEmail,
    setSendEmail,
    formValues,
    selectedCustomerDatas,
    setDriverSMS,
    DriverSMS,
    calculateTotalDays,
    setStartTime,
    setBook,

    setSelectedCustomerData,
    setCloseTime,
    calculateTotalTime,
    organizationdata,
    popupOpen,
    setSmsGuest,
    handleKeyEnter,
    setSelectedCustomerDatas,
    setreporttime,
    setshedintime,
    shedKilometers,
    calculateTotalKilometers,
    handleETripsheetClick,
    handlePopupClose,
    tripSheetData,
    attachedImage,
    routeData,
    signimageUrl,
    selectedImage,
    GmapimageUrl,
    setCloseTime2,
    setStartTime2,
    packageDetails,
    calculateExkmAmount,
    calculateExHrsAmount,
    calculateNightAmount,
    calculateTotalAmount,
    calculatedriverconvienceAmount,
    handleTripmapClick,
    mapimgpopupOpen,
    handleimgPopupClose,
    mapimageUrls,
    handleTripmaplogClick,
    maplogimgpopupOpen,
    row,
    handleUpload,
    handleRefresh,
    handleButtonClick,
    handleTripRowClick,
    imgpopupOpen,
    generateLink,
    selectedRow,
    imageUrl,
    link,
    isSignatureSubmitted,
    isEditMode,
    handleEdit,
    SignPage,
    sign, handleCalc, calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount,
    ex_kmAmount, ex_hrAmount, night_totalAmount, driverBeta_calc, driverbeta_Count_calc, driverBeta_amount,
    totalcalcAmount, escort, handleEscortChange, handleClickOpen, open, handleClose, handleTransferChange, transferreport,
    nocchangeData,

  } = useTripsheet();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  // Permission ------------ayyan
  const { permissions } = useContext(PermissionContext)
  const Tripsheet_read = permissions[3]?.read;
  const Tripsheet_new = permissions[3]?.new;
  const Tripsheet_modify = permissions[3]?.modify;
  const Tripsheet_delete = permissions[3]?.delete;
  // No chnage ----------

  const handleNoChange = (e) => {
    const { name } = e.target;
    if (name === 'tripid' && !nocchangeData.tripid) {
      handleChange(e);
    }

    if (name === 'bookingno' && !nocchangeData.bookingno) {
      handleChange(e);
    };

    if (name === 'billingno' && !nocchangeData.billingno) {
      handleChange(e);
    };

    if (name === 'customer' && !nocchangeData.customer) {
      handleChange(e);
    };

    if (name === 'orderedby' && !nocchangeData.orderedby) {
      handleChange(e);
    };

    if (name === 'mobile' && !nocchangeData.mobile) {
      handleChange(e);
    };

    if (name === 'guestname' && !nocchangeData.guestname) {
      handleChange(e);
    };

    if (name === 'guestmobileno' && !nocchangeData.guestmobileno) {
      handleChange(e);
    };

    if (name === 'email' && !nocchangeData.email) {
      handleChange(e);
    };

    if (name === 'remark' && !nocchangeData.remark) {
      handleChange(e);
    };

    if (name === 'vehRegNo' && !nocchangeData.vehRegNo) {
      handleChange(e);
    };

    if (name === 'driverName' && !nocchangeData.driverName) {
      handleChange(e);
    };

    if (name === 'mobileNo' && !nocchangeData.mobileNo) {
      handleChange(e);
    };

    if (name === 'useage' && !nocchangeData.useage) {
      handleChange(e);
    };

    if (name === 'customercode' && !nocchangeData.customercode) {
      handleChange(e);
    };

    if (name === 'employeeno' && !nocchangeData.employeeno) {
      handleChange(e);
    };

    if (name === 'employeeno' && !nocchangeData.employeeno) {
      handleChange(e);
    };

    if (name === 'advancepaidtovendor' && !nocchangeData.advancepaidtovendor) {
      handleChange(e);
    };

    if (name === 'employeeno' && !nocchangeData.employeeno) {
      handleChange(e);
    };

    if (name === 'shedout' && !nocchangeData.shedout) {
      handleChange(e);
    };

    if (name === 'startkm' && !nocchangeData.startkm) {
      handleChange(e);
    };

    if (name === 'closekm' && !nocchangeData.closekm) {
      handleChange(e);
    };

    if (name === 'shedin' && !nocchangeData.shedin) {
      handleChange(e);
    };

    if (name === 'shedkm' && !nocchangeData.shedkm) {
      handleChange(e);
    };

    if (name === 'totalkm1' && !nocchangeData.totalkm1) {
      handleChange(e);
    };

    if (name === 'additionaltime' && !nocchangeData.additionaltime) {
      handleChange(e);
    };

    if (name === 'totaltime' && !nocchangeData.totaltime) {
      handleChange(e);
    };

    if (name === 'permit' && !nocchangeData.permit) {
      handleChange(e);
    };

    if (name === 'additionaltime' && !nocchangeData.additionaltime) {
      handleChange(e);
    };
  }
  return (
    <div className="form-container">
      <div className="Tripsheet-form">
        <form action="">
          <p className="Title-Name head-tab-tripsheet">Trip Sheet</p>
          <div className="Tripsheet-header">
            <div>
              <div className='tripsheet-division1'>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="tripid"
                    label="Trip Sheet No"
                    name="tripid"
                    value={nocchangeData.tripid || selectedCustomerData.tripid || book.tripid || ''}
                    onChange={handleNoChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="password"
                    autoFocus
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="bookingid"
                    label="Booking ID"
                    name="bookingno"
                    value={nocchangeData.bookingno || selectedCustomerData.bookingno || book.bookingno || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex' }}>
                  <div className="icone">
                    <MdOutlineAccessTimeFilled style={{ fontSize: '25px' }} />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={nocchangeData.tripsheetdate || selectedCustomerData.tripsheetdate ? dayjs(selectedCustomerData.tripsheetdate) : null || book.tripsheetdate ? dayjs(book.tripsheetdate) : dayjs()}
                      format="DD/MM/YYYY"
                      label='Tripsheet Date'
                      onChange={(date) => handleDateChange(date, 'tripsheetdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.tripsheetdate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ display: 'flex' }}>
                  <div className="icone">
                    <QuizOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "status")}
                    value={Status.find((option) => option.optionvalue)?.label || nocchangeData.status || selectedCustomerData.status || book.status || 'Opened'}
                    options={Status.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.status || selectedCustomerData.status || book.status || 'Opened'}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Status" autoComplete="password" name="status" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="billingno"
                    label="Billing No"
                    name="billingno"
                    value={nocchangeData.billingno || selectedCustomerData.billingno || book.billingno || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                    required
                  />
                </div>
                <div className="input" style={{ display: 'flex' }}>
                  <div className="icone">
                    <AppsOutageOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "apps")}
                    value={Apps.find((option) => option.optionvalue)?.label || nocchangeData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                    options={Apps.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Apps" autoComplete="password" name="apps" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    name="customer"
                    value={nocchangeData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''}
                    onChange={handleNoChange}
                    label="Customer"
                    id="standard-size-normal"
                    variant="standard"
                    required
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    name="orderedby"
                    value={nocchangeData.orderedby || selectedCustomerData.orderedby || book.orderedby || ''}
                    onChange={handleNoChange}
                    label="Ordered By"
                    id="standard-size-normal"
                    variant="standard"
                    autoComplete="password"
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div className='input'>
                  <FormControlLabel
                    value="smsguest"
                    control={
                      <Checkbox
                        size="small"
                        checked={smsguest}
                        onChange={(event) => setSmsGuest(event.target.checked)}
                      />
                    }
                    label="Guest SMS"
                  />
                  <FormControlLabel
                    value="email"
                    control={
                      <Checkbox
                        size="small"
                        checked={sendEmail}
                        onChange={(event) => setSendEmail(event.target.checked)}
                      />
                    }
                    label="Email"
                  />
                </div>
                <div className="input" style={{ display: 'flex' }}>
                  <div className="icone">
                    <PhoneIphoneIcon color="action" />
                  </div>
                  <TextField
                    name="mobile"
                    value={nocchangeData.mobile || selectedCustomerData.mobile || book.mobile || ''}
                    onChange={handleNoChange}
                    label="Mobile"
                    id="standard-size-normal"
                    size="small"
                    autoComplete="password"
                    required
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <AssignmentIndIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    id="username"
                    label="Guest Name"
                    name="guestname"
                    value={nocchangeData.guestname || selectedCustomerData.guestname || formValues.guestname || book.guestname || ''}
                    onChange={handleNoChange}
                    size="small"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex' }}>
                  <div className="icone">
                    <CallIcon color="action" />
                  </div>
                  <TextField
                    name="guestmobileno"
                    value={nocchangeData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno || ''}
                    onChange={handleNoChange}
                    label="Phone (Cell)"
                    id="Phonecell"
                    size="small"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex' }}>
                  <div className="icone">
                    <AttachEmailIcon color="action" />
                  </div>
                  <TextField
                    name="email"
                    value={nocchangeData.email || selectedCustomerData.email || formValues.email || book.email || ''}
                    onChange={handleNoChange}
                    label="Email"
                    id="email"
                    size="small"
                    autoComplete="password"
                  />
                </div>
              </div>
              <div className='tripsheet-division2'>
                <div>
                  <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="icone">
                      <AddHomeWorkIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      name="remark"
                      className='address-field'
                      value={nocchangeData.address1 || selectedCustomerData.address1 || book.address1 || ''}
                      onChange={handleNoChange}
                      label="Address"
                      id="remark"
                      multiline
                      rows={5}
                      sx={{ m: 2 }}
                      autoComplete="password"
                    />
                  </div>
                </div>
                <div style={{ margin: '0px 10px' }}>
                  <div className="Scroll-Style tripsheet-table1 ">
                    <thead>
                      <tr>
                        <th className="table-head-booking" style={{ borderTopLeftRadius: '10px' }}>Vehicle_Name</th>
                        <th className="table-head-booking">Vehicle_Type</th>
                        <th className="table-head-booking">Driver_name</th>
                        <th className="table-head-booking">Driver_phone</th>
                        <th className="table-head-booking">Supplier</th>
                        <th className="table-head-booking" style={{ borderTopRightRadius: '10px' }}>Online_Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={7}>No data available.</td>
                        </tr>
                      ) : (
                        rows.map((row) => (
                          <tr key={row.id} onClick={() => handleRowClick(row)}>
                            <td>{row.vehRegNo}</td>
                            <td>{row.vehType}</td>
                            <td>{row.driverName}</td>
                            <td>{row.mobileNo}</td>
                            <td>{row.supplier}</td>
                            <td>{row.onlineAccess}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </div>
                </div>
              </div>
              <div className='tripsheet-division3'>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <HowToRegIcon color="action" />
                  </div>
                  {nocchangeData.hireTypes ? <TextField
                    margin="normal"
                    size="small"
                    id="hireTypes"
                    label="HireTypes"
                    name="hireTypes"
                    value={nocchangeData.hireTypes || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                    required
                  /> : <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "hireTypes")}

                    value={HireTypes.find((option) => option.option)?.label || nocchangeData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                    options={HireTypes.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Hire Types" autoComplete="password" name="hireTypes" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />}
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  {nocchangeData.department ? <TextField
                    margin="normal"
                    size="small"
                    id="department"
                    label="Department"
                    name="department"
                    value={nocchangeData.department || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                    required
                  /> : <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "department")}
                    value={stationName.find((option) => option.optionvalue)?.label || nocchangeData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                    options={stationName.map((option) => ({
                      label: option.Stationname,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Department" autoComplete="password" name="department" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />}
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: '240px' }}>
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="vehiclerigsterno"
                    label="Vehicle Rigster No"
                    name="vehRegNo"
                    value={nocchangeData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || ''}
                    onChange={handleNoChange}
                    onKeyDown={handleKeyEnter}
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: '150px' }}>
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  {nocchangeData.Groups ? <TextField
                    margin="normal"
                    size="small"
                    id="Groups"
                    label="Groups"
                    name="Groups"
                    value={nocchangeData.Groups || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                    required
                  /> : <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={(nocchangeData.Groups || selectedCustomerData.Groups || formValues.Groups || selectedCustomerDatas.Groups || packageData.Groups || book.Groups) ? (nocchangeData.Groups || selectedCustomerData.Groups || formValues.Groups || selectedCustomerDatas.Groups || packageData.Groups || book.Groups) : null}
                    options={GroupTypes?.map((option) => ({
                      label: option?.Option,
                    }))}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "Groups")}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Groups" inputRef={params.inputRef} />
                      );
                    }}
                  />}
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <NoCrashIcon color="action" />
                  </div>
                  {nocchangeData.vehType ? <TextField
                    margin="normal"
                    size="small"
                    id="billingno"
                    label="VehType"
                    name="vehType"
                    value={nocchangeData.vehType || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                    required
                  /> : <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "vehType")}
                    value={(nocchangeData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType) ? (nocchangeData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType) : null}
                    options={vehileName?.map((option) => ({
                      label: option,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                    renderInput={(params) => (
                      <TextField {...params} label="Vehicle Rate" autoComplete="password" name="vehType" inputRef={params.inputRef} />
                    )}
                  />}
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <SensorOccupiedIcon color="action" />
                  </div>
                  <TextField
                    name="driverName"
                    value={nocchangeData.driverName || selectedCustomerData.driverName || formValues.driverName || selectedCustomerDatas.driverName || book.driverName || ''}
                    onChange={handleNoChange}
                    label="Driver Name"
                    id="drivername"
                    variant="standard"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <PhoneIphoneIcon color="action" />
                  </div>
                  <TextField
                    name="mobileNo"
                    value={nocchangeData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || ''}
                    onChange={handleNoChange}
                    label="Cell"
                    id="cell"
                    variant="standard"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input radio">
                  <FormControlLabel
                    value="DriverSMS"
                    control={
                      <Checkbox
                        size="small"
                        checked={DriverSMS}
                        onChange={(event) => setDriverSMS(event.target.checked)}
                      />
                    }
                    label="Driver SMS"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <AttachEmailIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "email1")}
                    value={Email.find((option) => option.optionvalue)?.label || nocchangeData.email1 || selectedCustomerData.email1 || book.email1 || ''}
                    options={Email.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.email1 || selectedCustomerData.email1 || book.email1 || ''}
                    renderInput={(params) => {
                      params.inputProps.value = nocchangeData.email1 || selectedCustomerData.email1 || book.email1 || ''
                      return (
                        <TextField {...params} label="Email" autoComplete="new-password" name="email1" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <EngineeringIcon color="action" />
                  </div>
                  {nocchangeData.duty ? <TextField
                    margin="normal"
                    size="small"
                    id="duty"
                    label="Duty"
                    name="duty"
                    value={nocchangeData.duty || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                    required
                  /> : <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                    value={Duty.find((option) => option.optionvalue)?.label || nocchangeData.duty || selectedCustomerData.duty || book.duty || ''}
                    options={Duty.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.duty || selectedCustomerData.duty || book.duty || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Duty" autoComplete="password" name="duty" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />}
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <AirlineStopsIcon color="action" />
                  </div>
                  {nocchangeData.pickup ? <TextField
                    margin="normal"
                    size="small"
                    id="pickup"
                    label="Pickup"
                    name="pickup"
                    value={nocchangeData.pickup || ''}
                    onChange={handleNoChange}
                    autoComplete="password"
                    required
                  /> : <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "pickup")}
                    value={Pickup.find((option) => option.optionvalue)?.label || nocchangeData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                    options={Pickup.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || nocchangeData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Pickup" autoComplete="password" name="pickup" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />}
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <DataUsageIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="useage"
                    value={nocchangeData.useage || selectedCustomerData.useage || formValues.useage || book.useage || ''}
                    onChange={handleNoChange}
                    label="Usage"
                    id="usage"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <StreamIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="Request"
                    value={request || ''}
                    onChange={(e) => { setRequest(e.target.value) }}
                    label="Request No"
                    id="request"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customercode"
                    value={nocchangeData.customercode || selectedCustomerData.customercode || book.customercode || ''}
                    onChange={handleNoChange}
                    label="Customer Code"
                    id="customer-code"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  {nocchangeData?.startdate ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '100%' }}>
                      <DatePicker
                        label="Start Date"
                        value={dayjs(nocchangeData.startdate)}
                        format="DD/MM/YYYY"
                        readOnly
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputRef={params.inputRef}
                            value={dayjs(nocchangeData.startdate).format('DD/MM/YYYY')}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '100%' }}>
                      <DatePicker
                        label="Start Date"
                        value={
                          selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) :
                            book.startdate ? dayjs(book.startdate) : null
                        }
                        format="DD/MM/YYYY"
                        onChange={(date) => {
                          if (!nocchangeData.startdate) {
                            handleDateChange(date, 'startdate');
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputRef={params.inputRef}
                            value={
                              selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate).format('DD/MM/YYYY') :
                                book.startdate ? dayjs(book.startdate).format('DD/MM/YYYY') : ''
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Close Date"
                      value={nocchangeData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null || book.closedate ? dayjs(book.closedate) : null}
                      format="DD/MM/YYYY"
                      onChange={(date) => handleDateChange(date, 'closedate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <DemoItem>
                    <TextField
                      name="totaldays"
                      value={nocchangeData.totaldays || calculateTotalDays() || book.totaldays || ''}
                      label="Total Days"
                      size="small"
                      type="number"
                      id="total-days"
                      variant="standard"
                      autoComplete="password"
                      style={{ width: '100%' }}
                    />
                  </DemoItem>
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <RecentActorsIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    value={nocchangeData.employeeno || selectedCustomerData.employeeno || book.employeeno || ''}
                    onChange={handleNoChange}
                    name="employeeno"
                    label="Employee No"
                    id="employeeno"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: "300px" }}>
                  <div className="icone">
                    <CurrencyRupeeTwoToneIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="advancepaidtovendor"
                    value={nocchangeData.advancepaidtovendor || selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor || ''}
                    onChange={handleNoChange}
                    label="Advance-Paid-To-Vendor"
                    id="advance-paid-to-vendor"
                    autoComplete="password"
                  />
                </div>
                <div className="input time" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <MdOutlineAccessTimeFilled style={{ fontSize: '25px' }} />
                  </div>
                  {nocchangeData?.starttime ? (<div style={{ display: 'grid', width: '100%' }}>
                    <label>Shed out Time</label>
                    <input
                      type="time"
                      name="starttime"
                      value={nocchangeData?.starttime || ''}
                      readOnly
                    />
                  </div>) : (<div style={{ display: 'grid', width: '100%' }}>
                    <label>shed out Time</label>
                    <input
                      type="time"
                      name='starttime'
                      value={book?.starttime || nocchangeData?.starttime || selectedCustomerData.starttime || ''}
                      onChange={(event) => {

                        setBook({ ...book, starttime: event.target.value });
                        setStartTime(event.target.value);
                        setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                      }}
                    />
                  </div>)}
                </div>
                <div className="input time" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <MdOutlineAccessTimeFilled style={{ fontSize: '25px' }} />
                  </div>
                  {nocchangeData.reporttime ? (<div style={{ display: 'grid', width: '100%' }}>
                    <label>Report Time</label>
                    <input
                      type="time"
                      name="starttime"
                      value={nocchangeData?.reporttime || ''}
                      readOnly
                    />
                  </div>) : (<div style={{ display: 'grid', width: '100%' }}>
                    <label>Report Time</label>
                    <input
                      type="time"
                      name="reporttime"
                      value={nocchangeData.reporttime || selectedCustomerData.reporttime || book.reporttime || ''}
                      onChange={(event) => {
                        setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value });
                        setSelectedCustomerDatas({ ...selectedCustomerDatas, reporttime: event.target.value });
                        setBook({ ...book, reporttime: event.target.value });
                        setreporttime(event.target.value);
                      }}
                    />
                  </div>)}
                </div>
                <div className="input time" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <MdOutlineAccessTimeFilled style={{ fontSize: '25px' }} />
                  </div>
                  <div style={{ display: 'grid', width: '100%' }}>
                    <label>Close Time</label>
                    <input
                      type="time"
                      name="shedintime"
                      value={nocchangeData.shedintime || selectedCustomerData.shedintime || book.shedintime || ''}
                      onChange={(event) => {
                        setSelectedCustomerData({ ...selectedCustomerData, shedintime: event.target.value });
                        setSelectedCustomerDatas({ ...selectedCustomerDatas, shedintime: event.target.value });
                        setBook({ ...book, shedintime: event.target.value });
                        setshedintime(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="input time" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <MdOutlineAccessTimeFilled style={{ fontSize: '25px' }} />
                  </div>
                  <div style={{ display: 'grid', width: '100%' }}>
                    <label>Shed-In Time</label>
                    <input
                      type="time"
                      name="closetime"
                      value={nocchangeData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                      onChange={(event) => {
                        setSelectedCustomerData({ ...selectedCustomerData, closetime: event.target.value });
                        setSelectedCustomerDatas({ ...selectedCustomerDatas, closetime: event.target.value });
                        setBook({ ...book, closetime: event.target.value });
                        setCloseTime(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    name="shedout"
                    value={nocchangeData.shedout || book.shedout || selectedCustomerData.shedout || ''}
                    onChange={handleNoChange}
                    label="Shed Out"
                    id="shedout"
                    size='small'
                    type="number"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: "180px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    name="startkm"
                    value={nocchangeData.startkm || selectedCustomerData.startkm || book.startkm || ''}
                    onChange={handleNoChange}
                    size="small"
                    label="Start KM"
                    type="number"
                    id="outlined-start-adornment"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: "180px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    name="closekm"
                    value={nocchangeData.closekm || selectedCustomerData.closekm || book.closekm || ''}
                    onChange={handleNoChange}
                    label="Close KM"
                    size="small"
                    type="number"
                    id="outlined-start-adornment"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: "180px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    name="shedin"
                    value={nocchangeData.shedin || book.shedin || selectedCustomerData.shedin || ''}
                    onChange={handleNoChange}
                    label="Shed In"
                    type="number"
                    id="shedin"
                    size='small'
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    name="shedkm"
                    value={book.shedkm || selectedCustomerData.shedkm || shedKilometers.shedkm || ''}
                    onChange={handleNoChange}
                    label="Add KM"
                    type="number"
                    id="shedkm"
                    size='small'
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    // ayyanar total km
                    name="totalkm1"
                    value={nocchangeData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || ''}
                    onChange={handleNoChange}
                    label="Total KM"
                    id="totalkm1"
                    type="number"
                    size='small'
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faStopwatch} size="lg" />
                  </div>
                  <TextField
                    name="additionaltime"
                    value={nocchangeData.additionaltime || book.additionaltime || selectedCustomerData.additionaltime || ''}
                    onChange={handleNoChange}
                    label="Additional Time"
                    id="additionaltime"
                    variant="standard"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faStopwatch} size="lg" />
                  </div>
                  <TextField
                    // ayyanar total time
                    name="totaltime"
                    value={nocchangeData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTime() || ''}
                    onChange={handleNoChange}
                    label="Total Time"
                    id="totaltime"
                    variant="standard"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faStamp} />
                  </div>
                  <TextField
                    name="permit"
                    value={nocchangeData.permit || selectedCustomerData.permit || book.permit || ''}
                    onChange={handleNoChange}
                    label="Permit"
                    id="permit"
                    variant="standard"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faSquareParking} />
                  </div>
                  <TextField
                    name="parking"
                    value={nocchangeData.parking || selectedCustomerData.parking || book.parking || ''}
                    // onChange={handleChange}
                    onChange={(e) => {
                      if (!nocchangeData.parking) {
                        handleChange(e);
                      }
                    }}
                    label="Parking"
                    id="parking"
                    variant="standard"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="icone">
                    <TollTwoToneIcon color="action" />
                  </div>
                  <TextField
                    name="toll"
                    value={nocchangeData.toll || selectedCustomerData.toll || book.toll || ''}
                    onChange={(e) => {
                      if (!nocchangeData.toll) {
                        handleChange(e);
                      }
                    }}

                    label="Toll"
                    id="Toll"
                    variant="standard"
                    autoComplete="password"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input">
                  <Button style={{ marginLeft: "10px" }} variant="contained"
                    onClick={() => {
                      handleCalc();
                      handleClickOpen();
                    }}
                  >
                    calculate
                  </Button>
                </div>
                <React.Fragment>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
                      {"Customer Bill"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <div className="Customer-Customer-Bill-Slider">
                          <div className="input-field">
                            <div className="input" style={{ width: "390px" }}>
                              <div className="icone">
                                <Inventory2Icon color="action" />
                              </div>
                              <TextField
                                name="pack"
                                value={calcPackage || nocchangeData.calcPackage || ''}
                                label="Pack"
                                id="pack"
                                size="small"
                                variant="standard"
                                autoComplete="password"
                                sx={{ m: 1, width: "60ch" }}
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faEquals} />
                              </div>
                              <TextField
                                name="amount5"
                                value={package_amount || nocchangeData.calcPackage || ''}
                                size="small"
                                label="Amount"
                                autoComplete="password"
                                id="amount"
                                variant="standard"
                              />
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="input" style={{ width: "186px" }}>
                              <div className="icone">
                                <FontAwesomeIcon icon={faRoad} />
                              </div>
                              <TextField
                                name="exkm1"
                                className='customer-bill-input'
                                value={extraKM || nocchangeData.calcPackage || 0}
                                label="Ex.Km"
                                id="ex-km"
                                autoComplete="password"
                                size="small"
                                variant="standard"
                              />
                            </div>
                            <div className="input" style={{ width: "187px" }}>
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField size="small"
                                name='exkmTkm2'
                                className='customer-bill-input'
                                value={extrakm_amount || nocchangeData.calcPackage || ''}
                                id="exkmTkm"
                                variant="standard"
                                autoComplete="password"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faEquals} />
                              </div>
                              <TextField
                                name="amount6"
                                className='customer-bill-input'
                                value={ex_kmAmount || nocchangeData.calcPackage || 0}
                                size="small"
                                label="Amount"
                                autoComplete="password"
                                id="amount"
                                variant="standard"
                              />
                            </div>
                          </div>

                          <div className="input-field">
                            <div className="input" style={{ width: "186px" }}>
                              <div className="icone">
                                <FontAwesomeIcon icon={faStopwatch} />
                              </div>
                              <TextField
                                name="exHrs1"
                                className='customer-bill-input'
                                value={extraHR || nocchangeData.calcPackage || ''}
                                label="Ex.Hrs"
                                id="ex-Hrs"
                                size="small"
                                autoComplete="password"
                                variant="standard"
                              />
                            </div>
                            <div className="input" style={{ width: "187px" }}>
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField
                                size="small"
                                name='exHrsTHrs2'
                                className='customer-bill-input'
                                value={extrahr_amount || nocchangeData.calcPackage || ''}
                                variant="standard"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faEquals} />
                              </div>
                              <TextField
                                name="amount7"
                                className='customer-bill-input'
                                value={ex_hrAmount || nocchangeData.calcPackage || 0}
                                size="small"
                                label="Amount"
                                autoComplete="password"
                                id="amount"
                                variant="standard"
                              />
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="input" style={{ width: "186px" }}>
                              <div className="icone">
                                <FontAwesomeIcon icon={faCloudMoon} />
                              </div>
                              <TextField
                                name="night1"
                                className='customer-bill-input'
                                value={nightBta || ''}
                                onChange={(e) => setNightBeta(e.target.value)}
                                label="Night"
                                id="night"
                                autoComplete="password"
                                size="small"
                                variant="standard"
                              />
                            </div>
                            <div className="input" style={{ width: "187px" }}>
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField
                                size="small"
                                className='customer-bill-input'
                                name='nightThrs2'
                                value={nightCount || ''}
                                onChange={(e) => setNightCount(e.target.value)}
                                variant="standard"
                                autoComplete="password"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faEquals} />
                              </div>
                              <TextField
                                name="amount8"
                                className='customer-bill-input'
                                value={night_totalAmount || 0}
                                size="small"
                                autoComplete="password"
                                label="Amount"
                                id="amount"
                                variant="standard"
                              />
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="input" style={{ width: "186px" }}>
                              <div className="icone">
                                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                              </div>
                              <TextField
                                name="driverconvenience1"
                                className='customer-bill-input'
                                value={driverBeta || nocchangeData.driverBeta || ''}
                                onChange={driverBeta_calc}
                                label="Driver Convenience"
                                autoComplete="password"
                                id="driver-convenience"
                                size="small"
                                variant="standard"
                              />
                            </div>
                            <div className="input" style={{ width: "187px" }}>
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField
                                size="small"
                                name='dtc2'
                                className='customer-bill-input'
                                value={driverbeta_Count || nocchangeData.driverbeta_Count || ''}
                                onChange={driverbeta_Count_calc}
                                variant="standard"
                                autoComplete="password"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faEquals} />
                              </div>
                              <TextField
                                name="amount9"
                                className='customer-bill-input'
                                value={driverBeta_amount || 0}
                                size="small"
                                label="Amount"
                                id="amount"
                                autoComplete="password"
                                variant="standard"
                              />
                            </div>
                          </div>
                          <TextField
                            name="amount9"
                            value={totalcalcAmount || 0}
                            size="small"
                            label="Total Amount"
                            id="amount"
                            autoComplete="password"
                            variant="standard"
                            style={{ marginTop: '25px', marginLeft: '15px' }}
                          />
                          <div className="input-field">

                          </div>
                          <div className="input-field">

                          </div>
                          <div className="input-field">

                          </div>
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ padding: '20px' }}>
                      <Button onClick={handleClose} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</Button>
                      <Button variant="contained" onClick={handleClose} autoFocus>
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: "250px" }}>
                  <div className="icone">
                    <BackupTableSharpIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="vpermettovendor"
                    value={nocchangeData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor || ''}
                    onChange={(e) => {
                      if (!nocchangeData.vpermettovendor) {
                        handleChange(e);
                      }
                    }}
                    label="v-permet-To-Vendor"
                    id="v-permet-to-vendor"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: "250px" }}>
                  <div className="icone">
                    <MinorCrashSharpIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="vendortoll"
                    value={nocchangeData.vendortoll || selectedCustomerData.vendortoll || book.vendortoll || ''}
                    onChange={(e) => {
                      if (!nocchangeData.vendortoll) {
                        handleChange(e);
                      }
                    }}
                    label="Vendor-Toll"
                    id="vendor-toll"
                    autoComplete="password"
                  />
                </div>
                <div className="input" style={{ display: 'flex', alignItems: 'center', width: "250px" }}>
                  <div className="icone">
                    <PaymentsIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customeradvance"
                    value={nocchangeData.customeradvance || selectedCustomerData.customeradvance || book.customeradvance || ''}
                    onChange={(e) => {
                      if (!nocchangeData.customeradvance) {
                        handleChange(e);
                      }
                    }}
                    label="Customer-Advance"
                    id="customer-advance"
                    autoComplete="password"
                  />
                </div>
                <div className="">
                  <Button startIcon={<BorderColorIcon />} variant="outlined" onClick={handleETripsheetClick} >
                    E-Tripsheet
                  </Button>
                </div>
                <div className="remark-textfield" style={{ display: 'flex' }}>
                  <div className="icone">
                    <MarkChatReadIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="remark"
                    value={nocchangeData.remark || selectedCustomerData.remark || book.remark || ''}
                    onChange={(e) => {
                      if (!nocchangeData.remark) {
                        handleChange(e);
                      }
                    }}
                    label="Remark"
                    id="remark"
                    multiline
                    rows={5}
                    sx={{ m: 2, width: "100%" }}
                    autoComplete="password"
                  />
                </div>
                <div className='input' style={{ display: 'grid' }}>
                  <label>Escort</label>
                  <span>
                    <label>
                      <input
                        type="radio"
                        value="Yes"
                        checked={escort === "Yes"}
                        onChange={handleEscortChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="No"
                        checked={escort === "No"}
                        onChange={handleEscortChange}
                      />
                      No
                    </label>
                  </span>
                </div>
                <div className='input' style={{ display: 'grid' }}>
                  <label>Airport Transfer</label>
                  <span>
                    <label>
                      <input
                        type="radio"
                        value="Yes"
                        checked={transferreport === "Yes"}
                        onChange={handleTransferChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="No"
                        checked={transferreport === "No"}
                        onChange={handleTransferChange}
                      />
                      No
                    </label>
                  </span>
                </div>
                <Dialog open={popupOpen} onClose={handlePopupClose} maxWidth="md">
                  <DialogContent style={{ width: '210mm', maxWidth: 'none' }}>
                    <Invoice tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={selectedImage} attachedImage={attachedImage} routeData={routeData} nocchangeData={calculateTotalTime} book={book} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} totalhour={nocchangeData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || ''} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handlePopupClose} variant="contained" color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* // ayyanar calc */}
                <div className="input" style={{ width: "160px" }}>
                  {isEditMode ? (<>
                    <Button variant="contained" disabled={!Tripsheet_modify} onClick={handleEdit}>Edit</Button>
                    {calcCheck ? <Button variant="contained" disabled={!Tripsheet_modify} style={{ marginLeft: "10px" }} onClick={handleConfirm}>Confirm</Button> : ""}

                  </>
                  ) : (
                    <Button variant="contained" disabled={!Tripsheet_new} onClick={handleAdd} >Add</Button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                <StyledSpeedDial
                  ariaLabel="SpeedDial playground example"
                  icon={<SpeedDialIcon />}
                  direction="left"
                >
                  {Tripsheet_read === 1 && (
                    <SpeedDialAction
                      key="list"
                      icon={<ChecklistIcon />}
                      tooltipTitle="List"
                      onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                    />
                  )}
                  {Tripsheet_modify === 1 && (
                    <SpeedDialAction
                      key="edit"
                      icon={<ModeEditIcon />}
                      tooltipTitle="Edit"
                      onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                    />
                  )}
                  {Tripsheet_delete === 1 && (
                    <SpeedDialAction
                      key="delete"
                      icon={<DeleteIcon />}
                      tooltipTitle="Delete"
                      onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                    />
                  )}
                  {Tripsheet_new === 1 && (
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
            </div>
            <div className="Tipsheet-content-table-main">
              <Tabs
                className='Scroll-Style'
                aria-label="Pricing plan"
                defaultValue={0}
                sx={(theme) => ({
                  width: "100%",
                  height: "330px",
                  "--Tabs-gap": "0px",
                  borderRadius: "lg",
                  boxShadow: "sm",
                  overflow: "auto",
                  border: `2px solid #ccc`,
                })}
              >
                <TabList
                  className='tripsheet-tab'
                  sx={{
                    "--ListItem-radius": "0px",
                    borderRadius: 0,
                    [`& .${tabClasses.root}`]: {
                      fontWeight: "lg",
                      flex: 1,
                      bgcolor: "background.body",
                      position: "relative",
                      [`&.${tabClasses.selected}`]: {
                        color: "primary.500",
                      },
                      [`&.${tabClasses.selected}:before`]: {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        bottom: -1,
                        width: "100%",
                        height: 2,
                        bgcolor: "primary.400",
                      },
                      [`&.${tabClasses.focusVisible}`]: {
                        outlineOffset: "-3px",
                      },
                    },
                  }}
                >
                  <Tab>Booking</Tab>
                  <Tab>Vendor Info</Tab>
                  <Tab>Vendor Bill</Tab>
                  <Tab>Customer Bill</Tab>
                  <Tab>Alert</Tab>
                  <Tab>GPS Att</Tab>
                  <Tab>Message</Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                  <div className="Customer-Booking-Slider">
                    <div className="input-field table-input-field">
                      <div className="input" style={{ width: "200px" }}>
                        <Button
                          variant="outlined"
                          sx={{
                            bgcolor: "#9fed64",
                            color: "#fff",
                            border: `2px solid #fff`,
                            "&:hover": {
                              bgcolor: "transparent",
                              color: "#9fed64",
                              border: `2px solid #9fed64`,
                            },
                          }}
                        >
                          SMS Waiting
                        </Button>
                      </div>
                      <div className="input" style={{ width: "90px" }}>
                        <Button
                          variant="outlined"
                          sx={{
                            bgcolor: "#ed6464",
                            color: "#fff",
                            border: `2px solid #fff`,
                            "&:hover": {
                              bgcolor: "transparent",
                              color: "#ed6464",
                              border: `2px solid #ed6464`,
                            },
                          }}
                        >
                          Failed
                        </Button>
                      </div>
                    </div>
                    <div className="input-field table-input-field">
                      <div className="input">
                        <div
                          className="icone"
                          style={{ padding: "0px 10px 0px 5px" }}
                        >
                          <FontAwesomeIcon icon={faFolderOpen} size="lg" />
                        </div>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="free-solo-demo"
                          freeSolo
                          sx={{ width: "20ch" }}
                          onChange={(event, value) => handleAutocompleteChange(event, value, "documenttype")}
                          value={DocumentType.find((option) => option.optionvalue)?.label || nocchangeData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                          options={DocumentType.map((option) => ({
                            label: option.option,
                          }))}
                          getOptionLabel={(option) => option.label || nocchangeData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                          renderInput={(params) => {
                            return (
                              <TextField {...params} label="Document Type" autoComplete="password" name="documenttype" inputRef={params.inputRef} />
                            )
                          }
                          }
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faFileLines} size="lg" />
                        </div>
                        <TextField
                          name="documentnotes"
                          value={nocchangeData.documentnotes || selectedCustomerData.documentnotes || book.documentnotes || ''}
                          onChange={(e) => {
                            if (!nocchangeData.documentnotes) {
                              handleChange(e);
                            }
                          }}
                          label="Document Notes"
                          id="document-notes"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input" style={{ width: "90px" }}>
                        <Button variant="outlined">Select</Button>
                      </div>
                      <div className="input" style={{ width: "90px" }}>
                        <Button variant="contained">Refresh</Button>
                      </div>
                    </div>
                    <div className="table-TripSheet">
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          rows={UpdateTbaleRows}
                          columns={UpdateTbaleColumns}
                          pageSize={5}
                          checkboxSelection
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2 }}>
                  <div className="Customer-Vendor-Info-Slider">
                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faSuitcaseRolling} size="lg" />
                        </div>
                        <TextField
                          name="VendorTripNo"
                          value={nocchangeData.tripid || selectedCustomerData.tripid || book.tripid || ''}
                          onChange={(e) => {
                            if (!nocchangeData.tripid) {
                              handleChange(e);
                            }
                          }}
                          label="Vendor Trip No"
                          id="Vendor-Trip-No"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input" style={{ width: "250px" }}>
                        <div className="icone">
                          <NoCrashIcon color="action" />
                        </div>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="free-solo-demo"
                          freeSolo
                          sx={{ width: "20ch" }}
                          onChange={(event, value) => handleAutocompleteChange(event, value, "vehType")}
                          value={VehicleRate.find((option) => option.optionvalue)?.label || nocchangeData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                          options={VehicleRate.map((option) => ({
                            label: option.option,
                          }))}
                          getOptionLabel={(option) => option.label || nocchangeData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                          renderInput={(params) => {
                            return (
                              <TextField {...params} label="Vehicle type" autoComplete="password" name="vehType" inputRef={params.inputRef} />
                            )
                          }
                          }
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <EngineeringIcon color="action" />
                        </div>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="free-solo-demo"
                          freeSolo
                          sx={{ width: "20ch" }}
                          onChange={(event, value) => handleAutocompleteChange(event, value, "duty1")}
                          value={Duty.find((option) => option.optionvalue)?.label || nocchangeData.duty || selectedCustomerData.duty || book.duty || ''}
                          options={Duty.map((option) => ({
                            label: option.option,
                          }))}
                          getOptionLabel={(option) => option.label || nocchangeData.duty || selectedCustomerData.duty || book.duty || ''}
                          renderInput={(params) => {
                            return (
                              <TextField {...params} label="Duty" autoComplete="password" name="duty1" inputRef={params.inputRef} />
                            )
                          }
                          }
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem label="Start Date">
                            <DatePicker
                              value={nocchangeData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || book.startdate ? dayjs(book.startdate) : null}
                              onChange={(date) => handleDateChange(date, 'startdate1')}
                            >
                              {({ inputProps, inputRef }) => (
                                <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                              )}
                            </DatePicker>
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem label="Close Date">
                            <DatePicker
                              value={nocchangeData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null || book.closedate ? dayjs(book.closedate) : null}
                              onChange={(date) => handleDateChange(date, 'closedate1')}
                            >
                              {({ inputProps, inputRef }) => (
                                <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerData?.closedate} />
                              )}
                            </DatePicker>
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="input">
                        <div className="icone">
                          <CalendarMonthIcon color="action" />
                        </div>
                        <DemoItem>
                          <TextField
                            name="totaldays"
                            value={calculateTotalDays() || ''}
                            label="Total Days"
                            size="small"
                            type="number"
                            id="total-days"
                            variant="standard"
                            autoComplete="password"
                          />
                        </DemoItem>
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input time">
                        <label>Start Time</label>
                        <input
                          type="time"
                          value={nocchangeData.starttime || selectedCustomerData.starttime || book.starttime || ''}
                          onChange={(event) => {
                            setSelectedCustomerData({ ...selectedCustomerData, starttime2: event.target.value });
                            setSelectedCustomerDatas({ ...selectedCustomerDatas, starttime2: event.target.value });
                            setBook({ ...book, starttime2: event.target.value });
                            setStartTime2(event.target.value);
                          }}
                          name="starttime2"
                        />
                      </div>
                      <div className="input time">
                        <label>Close Time</label>
                        <input
                          type="time"
                          value={nocchangeData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                          onChange={(event) => {
                            setSelectedCustomerData({ ...selectedCustomerData, closetime2: event.target.value });
                            setSelectedCustomerDatas({ ...selectedCustomerDatas, closetime2: event.target.value });
                            setBook({ ...book, closetime2: event.target.value });
                            setCloseTime2(event.target.value);
                          }}
                          name="closetime2"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faStopwatch} size="lg" />
                        </div>
                        <TextField
                          name="totaltime"
                          value={nocchangeData.totaltime || calculateTotalTime() || book.totaltime || selectedCustomerData.totaltime || ''}
                          label="Total Time"
                          id="total-time"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <TextField
                          name="startkm1"
                          value={nocchangeData.startkm || selectedCustomerData.startkm || book.startkm || ''}
                          onChange={(e) => {
                            if (!nocchangeData.startkm) {
                              handleChange(e);
                            }
                          }}
                          size="small"
                          label="Start KM"
                          type="number"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "23ch" }}
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <TextField
                          name="closekm1"
                          value={nocchangeData.closekm || selectedCustomerData.closekm || book.closekm || ''}
                          onChange={(e) => {
                            if (!nocchangeData.closekm) {
                              handleChange(e);
                            }
                          }}
                          label="Close KM"
                          size="small"
                          type="number"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "23ch" }}
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faRoad} size="lg" />
                        </div>
                        <TextField
                          name="totalkm1"
                          value={nocchangeData.totalkm1 || calculateTotalKilometers() || book.totalkm1 || packageData.totalkm1 || selectedCustomerData.totalkm1 || ''}
                          label="Total KM"
                          id="total-km"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <EditNoteIcon color="action" />
                        </div>
                        <TextField
                          name="remark"
                          value={nocchangeData.remark || selectedCustomerData.remark || book.remark || ''}
                          onChange={(e) => {
                            if (!nocchangeData.remark) {
                              handleChange(e);
                            }
                          }}
                          label="Remarks"
                          id="remark"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faMoneyBill1Wave} />
                        </div>
                        <TextField
                          name="caramount"
                          value={nocchangeData.caramount || selectedCustomerData.caramount || book.caramount || ''}
                          onChange={(e) => {
                            if (!nocchangeData.caramount) {
                              handleChange(e);
                            }
                          }}
                          label="Car Amount"
                          id="car-amount"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                  <div className="Customer-Vendor-Bill-Slider">
                    <div className="input-field">
                      <div className="input">
                        <div
                          className="icone"
                          style={{ padding: "0px 10px 0px 5px" }}
                        >
                          <FontAwesomeIcon icon={faStopwatch} size="lg" />
                        </div>
                        <TextField
                          name="minhrs"
                          value={nocchangeData.minhrs || selectedCustomerData.minhrs || book.minhrs || packageDetails[0]?.Hours || ''}
                          onChange={(e) => {
                            if (!nocchangeData.minhrs) {
                              handleChange(e);
                            }
                          }}
                          label="Min.Hrs"
                          id="min-hrs"
                          size="small"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <div
                          className="icone"
                          style={{ padding: "0px 10px 0px 5px" }}
                        >
                          <FontAwesomeIcon icon={faRoad} size="lg" />
                        </div>
                        <TextField
                          name="minkm"
                          value={nocchangeData.minkm || packageDetails[0]?.KMS || book.minkm || selectedCustomerData.minkm || ''}
                          label="Min.Km"
                          id="minkm"
                          size="small"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "390px" }}>
                        <div className="icone">
                          <Inventory2Icon color="action" />
                        </div>
                        <TextField
                          name="package"
                          value={nocchangeData.package || selectedCustomerData.package || book.package || packageDetails[0]?.package || ''}
                          onChange={(e) => {
                            if (!nocchangeData.package) {
                              handleChange(e);
                            }
                          }}
                          label="Package"
                          id="package"
                          size="small"
                          variant="standard"
                          sx={{ m: 1, width: "60ch" }}
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount"
                          value={nocchangeData.amount || selectedCustomerData.amount || book.amount || packageDetails[0]?.Rate || ''}
                          onChange={(e) => {
                            if (!nocchangeData.amount) {
                              handleChange(e);
                            }
                          }}
                          size="small"
                          label="Amount"
                          id="amount"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faRoad} />
                        </div>
                        <TextField
                          name="exkm"
                          value={book.exkm || packageDetails[0]?.extraKMS || ''}
                          onChange={handleChange}
                          label="Ex.Km"
                          id="ex-km"
                          size="small"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField size="small"
                          name='exkmTkm'
                          value={nocchangeData.exkmTkm || selectedCustomerData.exkmTkm || book.exkmTkm || ''}
                          onChange={(e) => {
                            if (!nocchangeData.exkmTkm) {
                              handleChange(e);
                            }
                          }}
                          id="exkmTkm"
                          variant="standard"
                          autoComplete="password" />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount1"
                          value={book.amount1 || calculateExkmAmount() || ''}
                          onChange={handleChange}
                          size="small"
                          label="Amount"
                          id="amount"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faStopwatch} />
                        </div>
                        <TextField
                          name="exHrs"
                          value={nocchangeData.exHrs || selectedCustomerData.exHrs || book.exHrs || packageDetails[0]?.extraHours || ''}
                          onChange={(e) => {
                            if (!nocchangeData.exHrs) {
                              handleChange(e);
                            }
                          }}
                          label="Ex.Hrs"
                          id="ex-Hrs"
                          size="small"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='exHrsTHrs'
                          value={nocchangeData.exHrsTHrs || selectedCustomerData.exHrsTHrs || book.exHrsTHrs || ''}
                          onChange={(e) => {
                            if (!nocchangeData.exHrsTHrs) {
                              handleChange(e);
                            }
                          }}
                          variant="standard" />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount2"
                          value={book.amount2 || calculateExHrsAmount() || ''}
                          onChange={(e) => {
                            if (!nocchangeData.amount2) {
                              handleChange(e);
                            }
                          }}
                          size="small"
                          label="Amount"
                          id="amount"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faCloudMoon} />
                        </div>
                        <TextField
                          name="night"
                          value={nocchangeData.night || selectedCustomerData.night || book.night || packageDetails[0]?.NHalt || ''}
                          onChange={(e) => {
                            if (!nocchangeData.night) {
                              handleChange(e);
                            }
                          }}
                          label="Night"
                          id="night"
                          size="small"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='nightThrs'
                          value={nocchangeData.nightThrs || selectedCustomerData.nightThrs || book.nightThrs || ''}
                          onChange={(e) => {
                            if (!nocchangeData.nightThrs) {
                              handleChange(e);
                            }
                          }}
                          variant="standard"
                          autoComplete="password" />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount3"
                          value={book.amount3 || calculateNightAmount() || ''}
                          onChange={handleChange}
                          size="small"
                          label="Amount"
                          id="amount"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faMoneyBill1Wave} />
                        </div>
                        <TextField
                          name="driverconvenience"
                          value={nocchangeData.driverconvenience || selectedCustomerData.driverconvenience || book.driverconvenience || ''}
                          onChange={(e) => {
                            if (!nocchangeData.driverconvenience) {
                              handleChange(e);
                            }
                          }}
                          label="Driver Convenience00"
                          id="driver-convenience"
                          size="small"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='dtc'
                          value={nocchangeData.dtc || selectedCustomerData.dtc || book.dtc || ''}
                          onChange={(e) => {
                            if (!nocchangeData.dtc) {
                              handleChange(e);
                            }
                          }}
                          variant="standard"
                          autoComplete="password" />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount4"
                          value={book.amount4 || calculatedriverconvienceAmount() || ''}
                          onChange={handleChange}
                          size="small"
                          label="Amount"
                          id="amount"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <div className="icone" style={{ padding: "0px 10px 0px 10px" }}>
                          <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg" />
                        </div>
                        <TextField
                          name="netamount"
                          value={book.netamount || calculateTotalAmount() || ''}
                          onChange={handleChange}
                          size="small"
                          label="Net Amount"
                          id="net-amount"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <TextField
                          name="vehcommission"
                          value={nocchangeData.vehcommission || selectedCustomerData.vehcommission || book.vehcommission || ''}
                          onChange={(e) => {
                            if (!nocchangeData.vehcommission) {
                              handleChange(e);
                            }
                          }}
                          type="number"
                          label="Veh.Commission"
                          size="small"
                          id="outlined-start-adornment"
                          autoComplete="password"
                          sx={{ m: 1, width: "25ch" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">%</InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="input">
                        <TextField
                          name="caramount"
                          value={nocchangeData.caramount || selectedCustomerData.caramount || book.caramount || ''}
                          onChange={(e) => {
                            if (!nocchangeData.caramount) {
                              handleChange(e);
                            }
                          }}
                          size="small"
                          label="Car Amount"
                          id="car-amount"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={3} sx={{ p: 2 }}>
                  <div className="Customer-Customer-Bill-Slider">
                    <div className="input-field">
                      <div className="input" style={{ width: "390px" }}>
                        <div className="icone">
                          <Inventory2Icon color="action" />
                        </div>
                        <TextField
                          name="pack"
                          value={calcPackage || nocchangeData.calcPackage || ''}
                          label="Pack"
                          id="pack"
                          size="small"
                          variant="standard"
                          autoComplete="password"
                          sx={{ m: 1, width: "60ch" }}
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount5"
                          value={package_amount || nocchangeData.calcPackage || ''}
                          size="small"
                          label="Amount"
                          autoComplete="password"
                          id="amount"
                          variant="standard"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faRoad} />
                        </div>
                        <TextField
                          name="exkm1"
                          value={extraKM || nocchangeData.calcPackage || 0}
                          label="Ex.Km"
                          id="ex-km"
                          autoComplete="password"
                          size="small"
                          variant="standard"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField size="small"
                          name='exkmTkm2'
                          value={extrakm_amount || nocchangeData.calcPackage || ''}
                          id="exkmTkm"
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount6"
                          // value={book.amount6 || calculateExkmAmount2() || ''}
                          value={ex_kmAmount || nocchangeData.calcPackage || 0}
                          size="small"
                          label="Amount"
                          autoComplete="password"
                          id="amount"
                          variant="standard"
                        />
                      </div>
                    </div>

                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faStopwatch} />
                        </div>
                        <TextField
                          name="exHrs1"
                          value={extraHR || nocchangeData.calcPackage || ''}
                          label="Ex.Hrs"
                          id="ex-Hrs"
                          size="small"
                          autoComplete="password"
                          variant="standard"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='exHrsTHrs2'
                          value={extrahr_amount || nocchangeData.calcPackage || ''}
                          variant="standard"
                        />

                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount7"
                          value={ex_hrAmount || nocchangeData.calcPackage || 0}
                          size="small"
                          label="Amount"
                          autoComplete="password"
                          id="amount"
                          variant="standard"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faCloudMoon} />
                        </div>

                        <TextField
                          name="night1"
                          value={nightBta || ''}
                          onChange={(e) => setNightBeta(e.target.value)}
                          label="Night"
                          id="night"
                          autoComplete="password"
                          size="small"
                          variant="standard"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='nightThrs2'
                          value={nightCount || ''}
                          onChange={(e) => setNightCount(e.target.value)}
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount8"
                          value={night_totalAmount || 0}
                          size="small"
                          autoComplete="password"
                          label="Amount"
                          id="amount"
                          variant="standard"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "186px" }}>
                        <div className="icone">
                          <FontAwesomeIcon icon={faMoneyBill1Wave} />
                        </div>
                        <TextField
                          name="driverconvenience1"
                          value={driverBeta || nocchangeData.driverBeta || ''}
                          onChange={driverBeta_calc}
                          label="Driver Convenience"
                          autoComplete="password"
                          id="driver-convenience"
                          size="small"
                          variant="standard"
                        />
                      </div>
                      <div className="input" style={{ width: "187px" }}>
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='dtc2'
                          value={driverbeta_Count || nocchangeData.driverbeta_Count || ''}
                          onChange={driverbeta_Count_calc}
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount9"
                          value={driverBeta_amount || 0}
                          size="small"
                          label="Amount"
                          id="amount"
                          autoComplete="password"
                          variant="standard"
                        />
                      </div>
                    </div>

                    <TextField
                      name="amount9"
                      value={totalcalcAmount || 0}
                      size="small"
                      label="Total Amount"
                      id="amount"
                      autoComplete="password"
                      variant="standard"
                    />
                    <div className="input-field">

                    </div>
                    <div className="input-field">


                    </div>
                    <div className="input-field">


                    </div>

                  </div>
                </TabPanel>
                <TabPanel value={4} sx={{ p: 2 }}>
                  <div className="Customer-Alert-Slider">
                    <div className="input-field">
                      <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem label="FC">
                            <DatePicker
                              value={selectedCustomerDatas.fcdate || selectedCustomerData.fcdate ? dayjs(selectedCustomerData.fcdate) : null || book.fcdate ? dayjs(book.fcdate) : null}
                              onChange={(date) => handleDateChange(date, 'fcdate')}
                            >
                              {({ inputProps, inputRef }) => (
                                <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerDatas.fcdate || selectedCustomerData?.fcdate} />
                              )}
                            </DatePicker>
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem label="Tax Date">
                            <DatePicker
                              value={selectedCustomerData.taxdate ? dayjs(selectedCustomerData.taxdate) : null || book.taxdate ? dayjs(book.taxdate) : null}
                              onChange={(date) => handleDateChange(date, 'taxdate')}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="taxdate"
                                  autoComplete="password"
                                  value={selectedCustomerData.taxdate || ''}
                                  inputRef={params.inputRef}
                                />
                              )}
                            />
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem label="Ins">
                            <DatePicker
                              value={selectedCustomerData.insdate ? dayjs(selectedCustomerData.insdate) : null || book.insdate ? dayjs(book.insdate) : null}
                              onChange={(date) => handleDateChange(date, 'insdate')}
                            >
                              {({ inputProps, inputRef }) => (
                                <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerData?.insdate} />
                              )}
                            </DatePicker>
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                      <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoItem label="St.Permit">
                            <DatePicker
                              value={selectedCustomerData.stpermit ? dayjs(selectedCustomerData.stpermit) : null || book.stpermit ? dayjs(book.stpermit) : null}
                              onChange={(date) => handleDateChange(date, 'stpermit')}
                            >
                              {({ inputProps, inputRef }) => (
                                <TextField {...inputProps} inputRef={inputRef} autoComplete="password" value={selectedCustomerData?.stpermit} />
                              )}
                            </DatePicker>
                          </DemoItem>
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "390px" }}>
                        <TextField
                          name="maintenancetype"
                          value={nocchangeData.maintenancetype || selectedCustomerData.maintenancetype || book.maintenancetype || ''}
                          onChange={(e) => {
                            if (!nocchangeData.maintenancetype) {
                              handleChange(e);
                            }
                          }}
                          label="Maintenance Type"
                          id="maintenance-type"
                          autoComplete="password"
                          size="small"
                          sx={{ m: 1, width: "60ch" }}
                        />
                      </div>
                      <div className="input">
                        <TextField
                          name="kilometer"
                          value={nocchangeData.kilometer || selectedCustomerData.kilometer || book.kilometer || ''}
                          onChange={(e) => {
                            if (!nocchangeData.kilometer) {
                              handleChange(e);
                            }
                          }}
                          size="small"
                          autoComplete="password"
                          label="Kilometer"
                          id="kilometer"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "390px" }}>
                        <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                      </div>
                      <div className="input">
                        <TextField size="small" autoComplete="password" />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "390px" }}>
                        <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                      </div>
                      <div className="input">
                        <TextField size="small" autoComplete="password" />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "390px" }}>
                        <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                      </div>
                      <div className="input">
                        <TextField size="small" autoComplete="password" />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "390px" }}>
                        <TextField size="small" sx={{ m: 1, width: "60ch" }} autoComplete="password" />
                      </div>
                      <div className="input">
                        <TextField size="small" autoComplete="password" />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <EngineeringIcon color="action" />
                        </div>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="free-solo-demo"
                          freeSolo
                          sx={{ width: "20ch" }}
                          onChange={(event, value) => handleAutocompleteChange(event, value, "selects")}
                          value={Select.find((option) => option.optionvalue)?.label || nocchangeData.selects || selectedCustomerData.selects || book.selects || ''}
                          options={Select.map((option) => ({
                            label: option.option,
                          }))}
                          getOptionLabel={(option) => option.label || nocchangeData.selects || selectedCustomerData.selects || book.selects || ''}
                          renderInput={(params) => {
                            params.inputProps.value = nocchangeData.selects || selectedCustomerData.selects || book.selects || ''
                            return (
                              <TextField {...params} label="Select" autoComplete="password" name="selects" inputRef={params.inputRef} />
                            )
                          }
                          }
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={5} sx={{ p: 2 }}>
                  <div className="Customer-Gps-att-Slider">
                    <div className="input-field">
                      <div className="input">
                        <Button>View GPS TripSheet</Button>
                      </div>
                      <div className="input">
                        <Button onClick={handleTripmapClick}>View GPS Map</Button>
                      </div>
                      <Dialog open={mapimgpopupOpen} onClose={handleimgPopupClose}>
                        <DialogContent>
                          <img className='dialogboximg mapview' src={mapimageUrls} alt='imagess' />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleimgPopupClose} variant="contained" color="primary">
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <div className="input">
                        <Button onClick={handleTripmaplogClick}>View GPS Log</Button>
                      </div>
                      <Dialog open={maplogimgpopupOpen} onClose={handleimgPopupClose}>
                        <DialogContent>
                          <div className="table-customer-lists">
                            <DataGrid
                              rows={row}
                              columns={maplogcolumns}
                            />
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleimgPopupClose} variant="contained" color="primary">
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <div className="input">
                        <Button>View Closing</Button>
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faFolderOpen} size="lg" />
                        </div>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="free-solo-demo"
                          freeSolo
                          sx={{ width: "20ch" }}
                          onChange={(event, value) => handleAutocompleteChange(event, value, "documenttype")}
                          value={DocumentType.find((option) => option.optionvalue)?.label || nocchangeData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                          options={DocumentType.map((option) => ({
                            label: option.option,
                          }))}
                          getOptionLabel={(option) => option.label || nocchangeData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                          renderInput={(params) => {
                            return (
                              <TextField {...params} label="Document Type" autoComplete="password" name="documenttype" inputRef={params.inputRef} />
                            )
                          }
                          }
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faFileLines} size="lg" />
                        </div>
                        <TextField
                          name="on1"
                          value={selectedCustomerData.on1 || book.on1 || ''}
                          onChange={handleChange}
                          size="document-notes"
                          label="Document Notes"
                          autoComplete="password"
                          id="document-notes"
                          variant="standard"
                        />
                      </div>
                      <div className="input" style={{ width: "220px" }}>
                        <Button variant="contained" onClick={handleUpload}>Select File & Upload</Button>
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input" style={{ width: "400px" }}>
                        <div className="icone">
                          <MarkChatReadIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          sx={{ m: 1, width: "300ch" }}
                          variant="standard"
                          autoComplete="password"
                        />
                      </div>
                      <div className="input">
                        <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <Button onClick={handleButtonClick}>Manual Marking</Button>
                      </div>
                      <div className="input">
                        <Button>Delete GPS Log</Button>
                      </div>
                      <div className="input radio">
                        <FormControlLabel
                          name="reload"
                          value="reload"
                          control={<Checkbox size="small" />}
                          label="Reload"
                          autoComplete="new-password"
                          onChange={(e) => {
                            if (!nocchangeData.reload) {
                              handleChange(e);
                            }
                          }}
                          checked={Boolean(nocchangeData.reload || selectedCustomerData?.reload || book.reload)}
                        />
                      </div>
                    </div>
                    <div className="table-TripSheet">
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          onRowClick={handleTripRowClick}
                          pageSize={5}
                          checkboxSelection
                        />
                      </div>
                    </div>
                    <Dialog open={imgpopupOpen} onClose={handleimgPopupClose}>
                      <DialogContent>
                        {selectedRow && (
                          // <img className='dialogboximg' src={imageUrl} alt={selectedRow.name} />
                          <embed src={imageUrl} type="application/pdf" width="100%" height="600px" />
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleimgPopupClose} variant="contained" color="primary">
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </TabPanel>
                <TabPanel value={6} sx={{ p: 2 }}>
                  <div className="Customer-Message-Slider">
                    <div className="input-field">
                      <div>
                        <Button onClick={generateLink}>Generate Link</Button>
                      </div>
                      {link && (
                        <div>
                          {isSignatureSubmitted ? (
                            <p>Signature already submitted. Cannot access this link.</p>
                          ) : (
                            <div>
                              <p>Copy this link to send to the passenger:</p>
                              <div className='link-blank-button'>
                                <textarea readOnly style={{ width: '400px', height: '8  0px' }}>{link}</textarea>
                                <button onClick={SignPage} className='signature'>Copy </button>
                              </div>
                              {sign ? <p style={{ color: 'green' }}>Link Copied......</p> : <></>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
          <div className='alert-popup-main'>
            {error &&
              <div className='alert-popup Error' >
                <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{errorMessage}</p>
              </div>
            }
            {warning &&
              <div className='alert-popup Warning' >
                <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{warningMessage}</p>
              </div>
            }
            {success &&
              <div className='alert-popup Success' >
                <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{successMessage}</p>
              </div>
            }
            {info &&
              <div className='alert-popup Info' >
                <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{infoMessage}</p>
              </div>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripSheet;