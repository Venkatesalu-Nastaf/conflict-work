import React, { useEffect, useContext, useState, useRef } from 'react';
import "./TripSheet.css";
import {
  Apps,
  // VehicleRate,
  Status,
  HireTypes,
  DocumentType,
  Duty,
  // Pickup,
  Email,
  // Select,
  GroupTypes
} from "./TripSheetdata";
import dayjs from "dayjs";
import Tabs from "@mui/joy/Tabs";
import Box from "@mui/material/Box";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Invoice from '../Invoice/Invoice';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/joy/Tab";
import AltRouteIcon from "@mui/icons-material/AltRoute";

import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
// import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EmailIcon from "@mui/icons-material/Email";
//dialog box
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
// import EditNoteIcon from "@mui/icons-material/EditNote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import PaymentsIcon from "@mui/icons-material/Payments";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faStamp } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { PermissionContext } from '../../context/permissionContext';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChecklistIcon from "@mui/icons-material/Checklist";
import { MdOutlineAccessTimeFilled } from "react-icons/md";


import {
  vehicaleinfos
} from "../../Bookings/BookingMain/Booking/Booking";
import { PiCarSimpleFill } from 'react-icons/pi';


import useTripsheet from './useTripsheet';

// UpdateTbaleRowsGPSSlider TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  // { field: "name", headerName: "Attach Name", width: 130 },
  { field: "documenttype", headerName: "Document Type", width: 140 },
  { field: "path", headerName: "Attach Path", width: 160 },

  { field: "tripid", headerName: "TripID", width: 100 },
  { field: "booking_id", headerName: "Booking ID", width: 110 },
];
// Update Table
// const UpdateTbaleColumns = [
//   { field: "id", headerName: "Sno", width: 70 },
//   { field: "document", headerName: "Document", width: 130 },
//   { field: "documentname", headerName: "Document Name", width: 130 },
//   { field: "filename", headerName: "File Name", width: 90 },
// ];

// const UpdateTbaleRows = [
//   {
//     id: 1,
//     document: 1,
//     documentname: "Employee 1",
//     filename: "John Doe",
//   },
//   {
//     id: 2,
//     document: 2,
//     documentname: "Band 2",
//     filename: "Employee 2",
//   },
// ];

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





const TripSheet = ({ stationName, logoImage }) => {


  const {
    selectedCustomerData, handleConfirm, driverBeta, driverbeta_Count, nightBta, nightCount,
    selectedCustomerId, setNightBeta, setNightCount, calcCheck, vehileNames,
    rows, handleKeyEnterDriverDetails, handleimagedelete, maplogcolumns,
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
    formData,
    handleKeyDown,
    handleDateChange,
    handleAutocompleteChange, copyToClipboard, setFormValues,
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
    setFormData,
    setSelectedCustomerData,
    setCloseTime,
    calculateTotalTime,
    organizationdata,
    popupOpen,
    setSmsGuest,
    setSelectedCustomerDatas,
    setreporttime,
    setshedintime,
    shedKilometers,
    calculateTotalKilometers,
    additionalTime,
    handleETripsheetClick,
    handlePopupClose,
    tripSheetData,
    attachedImage,
    routeData,
    signimageUrl,
    selectedImage,
    GmapimageUrl,
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
    // SignPage, 
    driverdetails,
    sign, handleCalc, calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount,
    ex_kmAmount, ex_hrAmount, night_totalAmount, driverBeta_calc, driverbeta_Count_calc, driverBeta_amount,
    totalcalcAmount, escort, handleEscortChange, setSign, setLink, setError,
    setErrorMessage,
    open, handleClose, handleTransferChange, transferreport, signaturepopup, setSignaturepopup, siganturediaglogclose, handlesignaturemageDownload, setSignatureupload, handleFileChangesignature, getSignatureImage, handlesignaturemageDelete

  } = useTripsheet();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  // Permission ------------ayyan
  const { permissions } = useContext(PermissionContext)
  const fileInputRefdata = useRef(null);

  const Tripsheet_read = permissions[3]?.read;
  const Tripsheet_new = permissions[3]?.new;
  const Tripsheet_modify = permissions[3]?.modify;
  const Tripsheet_delete = permissions[3]?.delete;

  // varibles for validation 

  // time 
  let startTimeVar = formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime
  let reportTimeVar = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime
  let shedInTimeVar = formData.shedintime || selectedCustomerData.shedintime || selectedCustomerDatas.shedintime || book.shedintime
  let closeTimeVar = formData.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || book.closetime

  // kilometer
  const [kmValue, setKmValue] = useState({
    shedOutState: '',
    startKMState: '',
    closeKMState: '',
    shedInState: '',
    startDate: '',
    closeDate: '',
    totalDays: '',
  })

  const handlesignatureimages = () => {

    getSignatureImage()
    const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;

    if (!tripid) {

      setError(true);
      setErrorMessage("Enter The Tripid")
      return
    }
    else if (signimageUrl === "") {
      if (fileInputRefdata.current) {
        fileInputRefdata.current.click();
        setSignatureupload(false)

      } else {
        console.error("File input ref is not available");
      }
    } else {
      setSignaturepopup(true);
      getSignatureImage()
    }
  }
  const textRef = useRef();


  const SignPage = async (event) => {
    event.preventDefault();
    console.log("link", link)
    if (link) {
      const textElement = textRef.current;
      navigator.clipboard.writeText(textElement.textContent).then(() => {
        setSign(true)
        setTimeout(() => {
          setSign(false)
          setLink("")
        }, 2000)

      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });

    } else {
      alert("no link data ", link)
    }
  }

  // const handleCopyClick = () => {
  //   const textElement = textRef.current;
  //   navigator.clipboard.writeText(textElement.textContent).then(() => {
  //     alert('Text copied to clipboard');
  //   }).catch(err => {
  //     console.error('Failed to copy text: ', err);
  //   });
  // };






  return (
    <div className="form-container form-container-tripsheet">
      <div className="Tripsheet-form">
        <form action="">
          <p className="Title-Name head-tab-tripsheet">Trip Sheet</p>
          <div className="Tripsheet-header">

            <div>
              <div className='tripsheet-division1'>
                <div className="input">
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>

                  <TextField
                    margin="normal"
                    size="small"
                    id="tripid"
                    label="Trip Sheet No"
                    name="tripid"
                    value={formData.tripid || selectedCustomerData.tripid || book.tripid || ''}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="password"
                    autoFocus
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="bookingno"
                    label="Booking ID"
                    name="bookingno"
                    value={formData.bookingno || selectedCustomerData.bookingno || book.bookingno || ''}
                    onChange={handleChange}
                    autoComplete="password"
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="tripsheetdate"
                      value={formData.tripsheetdate || selectedCustomerData.tripsheetdate ? dayjs(selectedCustomerData.tripsheetdate) : null || book.tripsheetdate ? dayjs(book.tripsheetdate) : dayjs()}
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

                <div className="input">
                  <div className="icone">
                    <QuizOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-Status"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "status")}
                    value={Status.find((option) => option.optionvalue)?.label || formData.status || selectedCustomerData.status || book.status || 'Opened'}
                    options={Status.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || formData.status || selectedCustomerData.status || book.status || 'Opened'}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Status" autoComplete="password" name="status" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="billingno"
                    label="Billing No"
                    name="billingno"
                    value={formData.billingno || selectedCustomerData.billingno || book.billingno || ''}
                    onChange={handleChange}
                    autoComplete="password"
                    required
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <AppsOutageOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-apps"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "apps")}
                    value={Apps.find((option) => option.optionvalue)?.label || formData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                    options={Apps.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || formData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Apps" autoComplete="password" name="apps" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    name="customer"
                    value={formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''}
                    onChange={handleChange}
                    label="Customer"
                    id="standard-size-customer"
                    variant="standard"
                    required
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    name="orderedby"
                    value={formData.orderedby || selectedCustomerData.orderedby || book.orderedby || ''}
                    onChange={handleChange}
                    label="Ordered By"
                    id="standard-size-orderedby"
                    variant="standard"
                    autoComplete="password"
                    required
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
                    id="email"
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

                <div className="input">
                  <div className="icone">
                    <PhoneIphoneIcon color="action" />
                  </div>
                  <TextField
                    name="mobile"
                    value={formData.mobile || selectedCustomerData.mobile || book.mobile || ''}
                    onChange={handleChange}
                    label="Mobile"
                    id="standard-size-mobile"
                    size="small"
                    autoComplete="password"
                    required
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <AssignmentIndIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    id="guestname"
                    label="Guest Name"
                    name="guestname"
                    value={formData.guestname || selectedCustomerData.guestname || formValues.guestname || book.guestname || ''}
                    onChange={handleChange}
                    size="small"
                    autoComplete="password"
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <CallIcon color="action" />
                  </div>
                  <TextField
                    name="guestmobileno"
                    value={formData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno || ''}
                    onChange={handleChange}
                    label="Phone (Cell)"
                    id="guestmobileno"
                    size="small"
                    autoComplete="password"
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <AttachEmailIcon color="action" />
                  </div>
                  <TextField
                    name="email"
                    value={formData.email || selectedCustomerData.email || formValues.email || book.email || ''}
                    onChange={handleChange}
                    label="Email"
                    id="email"
                    size="small"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AttachEmailIcon color="action" />
                  </div>
                  <TextField
                    name="orderbyemail"
                    value={formData.orderbyemail || selectedCustomerData.orderbyemail || formValues.orderbyemail || book.orderbyemail || ''}
                    onChange={handleChange}
                    label="orderbyemail"
                    id="orderbyemail"
                    size="small"
                    autoComplete="password"
                  />
                </div>

              </div>

              <div className='tripsheet-division2'>

                <div>


                  <div className="input">
                    <div className="icone">
                      <AddHomeWorkIcon color="action" />
                    </div>
                    <TextField
                      margin="normal"
                      id="address1"
                      label="Address"
                      name="address1"
                      multiline
                      rows={2}
                      sx={{ width: "100%" }}
                      autoComplete="new-password"
                      value={formData.address1 || selectedCustomerData.address1 || book.address1 || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <div className="Scroll-Style tripsheet-table1">
                      <thead>
                        <tr>
                          <th className="table-head-booking table-heading-1"> Driver name</th>
                          <th className="table-head-booking">Driver phone</th>
                          <th className="table-head-booking">Vehicle Name</th>
                          <th className="table-head-booking">Vehicle Type</th>
                          <th className="table-head-booking">Vehicle Reg No</th>
                          <th className="table-head-booking">HireTypes</th>
                          <th className="table-head-booking">Grouphs</th>
                          <th className="table-head-booking">Active</th>
                        </tr>
                      </thead>
                      <tbody>
                        {driverdetails.length === 0 ? (
                          <tr>
                            <td colSpan={7}>No data available.</td>
                          </tr>
                        ) : (
                          driverdetails.map((row) => (
                            <tr key={row.id} onClick={() => handleRowClick(row)}>
                              <td>{row.driverName}</td>
                              <td>{row.mobileNo}</td>
                              <td>{row.vehicleName}</td>
                              <td>{row.vechtype}</td>
                              <td>{row.vehRegNo}</td>
                              <td>{row.hiretypes}</td>
                              <td>{row.Groups}</td>
                              <td>{row.active}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </div>
                  </div>
                </div>
              </div>

              <div className='tripsheet-division3'>
                <div className="vehicle-confirm">
                  <div className="input-field input-feild-vehicle-confirm">
                    <div className="input">
                      <div className="icone">
                        <HowToRegIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-hireTypes"
                        freeSolo
                        sx={{ width: "100%" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "hireTypes")}
                        value={selectedCustomerDatas.hiretypes || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                        options={HireTypes.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.hireTypes || selectedCustomerDatas.hiretypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Hire Types" autoComplete="password" name="hireTypes" inputRef={params.inputRef} />
                          )
                        }
                        }
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <AltRouteIcon color="action" />
                      </div>
                      <TextField
                        name="travelsname"
                        autoComplete="new-password"
                        value={
                          selectedCustomerDatas.travelsname ||
                          formData.travelsname ||
                          selectedCustomerData.travelsname ||
                          book.travelsname ||
                          ""
                        }
                        onChange={handleChange}
                        label="Travels Name"
                        id="travelsname"
                        variant="standard"
                      />
                    </div>

                    <div className="input">
                      <div className="icone">
                        <CarCrashIcon color="action" />
                      </div>
                      <TextField
                        margin="normal"
                        size="small"
                        id="vehRegNo"
                        label="Vehicle Rigster No"
                        name="vehRegNo"
                        value={formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || ''}
                        onChange={handleChange}
                        autoComplete="password"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <PiCarSimpleFill color="action" />
                      </div>

                      <Autocomplete
                        fullWidth
                        id="free-solo-vehType"
                        freeSolo
                        size="small"
                        value={
                          selectedCustomerDatas.vehType || formData.vehType ||
                          selectedCustomerData.vehType ||
                          book.vehType || ""
                        }
                        options={vehicaleinfos?.map((option) => ({
                          label: option?.Option,
                        }))}
                        onChange={(event, value) =>
                          handleAutocompleteChange(event, value, "vehType")
                        }
                        renderInput={(params) => {
                          return (
                            <TextField {...params} name='vehType' label="Vehicle Type" inputRef={params.inputRef} />
                          );
                        }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <NoCrashIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-vehileName"
                        freeSolo
                        sx={{ width: "100%" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleName")}
                        value={selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName || ''}
                        options={vehileNames?.map((option) => ({
                          label: option,
                        }))}
                        renderInput={(params) => (
                          <TextField {...params} label="Vehicle Name" autoComplete="password" name="vehicleName" inputRef={params.inputRef} />
                        )}
                      />


                    </div>

                    <div className="input">
                      <div className="icone">
                        <EmailIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        id="free-solo-Groups"
                        freeSolo
                        size="small"
                        value={(selectedCustomerDatas.Groups || formData.Groups || selectedCustomerData.Groups || formValues.Groups || packageData.Groups || book.Groups) ? (formData.Groups || selectedCustomerData.Groups || formValues.Groups || selectedCustomerDatas.Groups || packageData.Groups || book.Groups) : null}
                        options={GroupTypes?.map((option) => ({
                          label: option?.Option,
                        }))}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "Groups")}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Groups" inputRef={params.inputRef} />
                          );
                        }}
                      />
                    </div>

                    <div className="input">
                      <div className="icone">
                        <SensorOccupiedIcon color="action" />
                      </div>
                      {/* <TextField
                        name="driverName"
                        className='full-width'
                        value={selectedCustomerDatas?.driverName || formData.driverName || selectedCustomerData.driverName || formValues.driverName || book.driverName || ''}
                        onChange={handleChange}
                        label="Driver Name"
                        id="driverName"
                        variant="standard"
                        autoComplete="password"
                        onKeyDown={handleKeyEnterDriverDetails}
                      /> */}
                      <TextField
                        name="driverName"
                        className='full-width'
                        value={selectedCustomerDatas?.driverName || selectedCustomerData.driverName || formData.driverName || formValues.driverName || book.driverName || ''}
                        onChange={(e) => {
                          handleChange(e)
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, driverName: e.target.value })
                          setFormData({ ...formData, driverName: e.target.value })
                          setSelectedCustomerData({ ...selectedCustomerData, driverName: e.target.value })
                          setFormValues({ ...formValues, driverName: e.target.value })
                          setBook({ ...book, driverName: e.target.value })
                        }}

                        label="Driver Name"
                        id="driverName"
                        variant="standard"
                        autoComplete="password"
                        onKeyDown={handleKeyEnterDriverDetails}
                      />

                    </div>

                    <div className="input">
                      <div className="icone">
                        <PhoneIphoneIcon color="action" />
                      </div>
                      <TextField
                        name="mobileNo"
                        className='full-width'
                        value={formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || ''}
                        onChange={handleChange}
                        label="Cell"
                        id="mobileNo"
                        variant="standard"
                        autoComplete="password"
                      />
                    </div>



                    <div className="input">
                      <div className="icone">
                        <AttachEmailIcon color="action" />
                      </div>
                      <TextField
                        name="travelsemail"
                        autoComplete="new-password"
                        value={
                          formData.travelsemail ||
                          selectedCustomerData.travelsemail ||
                          book.travelsemail ||
                          ""
                        }
                        onChange={handleChange}
                        label="Travels Email"
                        id="travelsemail"
                        variant="standard"
                      />
                    </div>
                  </div>
                </div>
                <div className="input">
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-department"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "department")}
                    value={stationName.find((option) => option.optionvalue)?.label || selectedCustomerDatas.department || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                    options={stationName.map((option) => ({
                      label: option.Stationname,
                    }))}
                    getOptionLabel={(option) => option.label || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Department" autoComplete="password" name="department" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-Groups_solo-"
                    freeSolo
                    size="small"
                    value={(selectedCustomerDatas.Groups || formData.Groups || selectedCustomerData.Groups || formValues.Groups || packageData.Groups || book.Groups) ? (formData.Groups || selectedCustomerData.Groups || formValues.Groups || selectedCustomerDatas.Groups || packageData.Groups || book.Groups) : null}
                    options={GroupTypes?.map((option) => ({
                      label: option?.Option,
                    }))}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "Groups")}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Groups" inputRef={params.inputRef} />
                      );
                    }}
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

                <div className="input">
                  <div className="icone">
                    <AttachEmailIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-email1"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "email1")}
                    value={Email.find((option) => option.optionvalue)?.label || formData.email1 || selectedCustomerData.email1 || book.email1 || ''}
                    options={Email.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || formData.email1 || selectedCustomerData.email1 || book.email1 || ''}
                    renderInput={(params) => {
                      params.inputProps.value = formData.email1 || selectedCustomerData.email1 || book.email1 || ''
                      return (
                        <TextField {...params} label="Email" autoComplete="new-password" name="email1" inputRef={params.inputRef} />
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
                    id="free-solo-duty"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                    value={Duty.find((option) => option.optionvalue)?.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                    options={Duty.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Duty" autoComplete="password" name="duty" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AirlineStopsIcon color="action" />
                  </div>
                  {/* <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-pickup"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "pickup")}
                    value={Pickup.find((option) => option.optionvalue)?.label || formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                    options={Pickup.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Pickup" autoComplete="password" name="pickup" inputRef={params.inputRef} />
                      )
                    }
                    }
                  /> */}
                  <TextField
                    margin="normal"
                    size="small"
                    id="pickup1"
                    label="PickUp"
                    name="pickup"
                    autoComplete="new-password"
                    value={
                      formData.pickup ||
                      selectedCustomerData.pickup ||
                      formValues.pickup ||
                      book.pickup ||
                      ""
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <DataUsageIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="useage"
                    value={formData.useage || selectedCustomerData.useage || formValues.useage || book.useage || ''}
                    onChange={handleChange}
                    label="Usage"
                    id="useage"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <StreamIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="request"
                    value={selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request || ''}
                    onChange={handleChange}
                    label="Request"
                    id="request"
                    autoComplete="password"
                  />

                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customercode"
                    value={formData.customercode || selectedCustomerData.customercode || book.customercode || ''}
                    onChange={handleChange}
                    label="Customer Code"
                    id="customer-customercode"
                    autoComplete="password"
                  />
                </div>

                <div className="input">


                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      id="startdate"
                      value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || book.startdate ? dayjs(book.startdate) : null}
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        setKmValue((prev) => ({ ...prev, startDate: date }));
                        handleDateChange(date, 'startdate')
                      }}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>


                <div className="input">
                  {kmValue.startDate && (kmValue.closeDate ? "" : <lable className='invalid-km'>Give Date</lable>)}
                  {/* {kmValue.totalDays === 0 && <lable className='invalid-km'>Give Correct Date</lable>} */}
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Close Date"
                      id="closedate"
                      value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null || book.closedate ? dayjs(book.closedate) : null}
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        handleDateChange(date, 'closedate')
                        setKmValue(prev => ({ ...prev, closeDate: date }))

                        const startDate = formData.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate;
                        const closeDate = date

                        if (startDate && closeDate) {
                          const startDateObj = dayjs(startDate);
                          const closeDateObj = dayjs(closeDate);
                          const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
                          setKmValue(prev => ({ ...prev, totalDays: totalDays }))
                        }
                      }}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <DemoItem>
                    <TextField
                      name="totaldays"
                      value={calculateTotalDays()}
                      label="Total Days"
                      size="small"
                      type="number"
                      id="totaldays"
                      variant="standard"
                      autoComplete="password"
                    />
                  </DemoItem>
                </div>
                <div className="input">
                  <div className="icone">
                    <RecentActorsIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    value={formData.employeeno || selectedCustomerData.employeeno || book.employeeno || ''}
                    onChange={handleChange}
                    name="employeeno"
                    label="Employee No"
                    id="employeeno"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CurrencyRupeeTwoToneIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="advancepaidtovendor"
                    value={formData.advancepaidtovendor || selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor || ''}
                    onChange={handleChange}
                    label="advancepaidtovendor"
                    id="advance-paid-to-vendor"
                    autoComplete="password"
                  />
                </div>
                <div className="input time">
                  <div className='icone'>
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className='input-type-grid'>
                    <label>shed out Time</label>
                    <input
                      type="time"
                      id="starttime"
                      name='starttime'
                      value={formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime || ''}
                      onChange={(event) => {
                        setBook({ ...book, starttime: event.target.value });
                        setStartTime(event.target.value);
                        setFormData({ ...formData, starttime: event.target.value });
                        setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="input time">
                  <div className='icone'>
                    <MdOutlineAccessTimeFilled />
                  </div>


                  <div className='input-type-grid'>

                    {(startTimeVar && ((startTimeVar < reportTimeVar) ? (<label>Report Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>))) || (!startTimeVar && <label>Report Time</label>)}

                    <input
                      type="time"
                      name="reporttime"
                      value={formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime || ''}
                      onChange={(event) => {
                        const rTime = event.target.value;
                        if ((startTimeVar && rTime <= startTimeVar)) {
                          return;
                        } else {
                          setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, reporttime: event.target.value });
                          setBook({ ...book, reporttime: event.target.value });
                          setreporttime(event.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="input time">
                  <div className='icone'>
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className='input-type-grid'>
                    {(Number(kmValue.totalDays) === 1) ? ((reportTimeVar && ((reportTimeVar < shedInTimeVar) ? (<label>Close Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>))) || (!reportTimeVar && <label>Close Time</label>)) : (<label>Close Time</label>)}

                    <input
                      type="time"
                      name="shedintime"
                      value={formData.shedintime || selectedCustomerData.shedintime || book.shedintime || ''}
                      onChange={(event) => {
                        const rTime = event.target.value;
                        if ((Number(kmValue.totalDays) === 1) && (reportTimeVar && rTime <= reportTimeVar)) {
                          return;
                        } else {
                          setSelectedCustomerData({ ...selectedCustomerData, shedintime: event.target.value });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, shedintime: event.target.value });
                          setBook({ ...book, shedintime: event.target.value });
                          setshedintime(event.target.value);
                        }

                      }}
                    />
                  </div>
                </div>


                <div className="input time">
                  <div className='icone'>
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className='closetime tripsheet-shed-in-time'>
                    {(Number(kmValue.totalDays) === 1) ? ((shedInTimeVar && ((shedInTimeVar < closeTimeVar) ? (<label>ShedIn Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>))) || (!shedInTimeVar && <label>ShedIn Time</label>)) : (<label>ShedIn Time</label>)}

                    <input
                      type="time"
                      name="closetime"
                      id="closetime"
                      value={formData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                      onChange={(event) => {
                        const rTime = event.target.value;
                        if ((Number(kmValue.totalDays) === 1) && (shedInTimeVar && rTime <= shedInTimeVar)) {
                          return;
                        } else {
                          setSelectedCustomerData({ ...selectedCustomerData, closetime: event.target.value });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, closetime: event.target.value });
                          setBook({ ...book, closetime: event.target.value });
                          setCloseTime(event.target.value);
                        }

                      }}
                    />
                  </div>
                </div>

                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    name="shedout"
                    value={formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout || ''}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value >= 0) {
                        handleChange(e)
                        setKmValue(pre => ({ ...pre, shedOutState: e.target.value }))
                      }
                    }}

                    label="Shed Out"
                    id="shedout"
                    size='small'
                    type="number"
                    autoComplete="password"
                  />
                </div>


                <div style={{ display: "grid" }} className="input">
                  {kmValue.shedOutState && (Number(kmValue.startKMState) <= Number(kmValue.shedOutState)) && <lable className='invalid-km'>invalid KM</lable>}

                  <div style={{ display: "flex" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faRoad} size="lg" />
                    </div>

                    <TextField
                      name="startkm"
                      value={formData.startkm || selectedCustomerData.startkm || selectedCustomerDatas.startkm || book.startkm || ''}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value >= 0) {
                          handleChange(e)
                          setKmValue(pre => ({ ...pre, startKMState: e.target.value }))
                        }
                      }}
                      size="small"
                      label="Start KM"
                      type="number"
                      id="startkm"
                      autoComplete="password"
                    />
                  </div>
                </div>


                <div className="input" style={{ display: "grid" }}>
                  {kmValue.startKMState && (Number(kmValue.closeKMState) <= Number(kmValue.startKMState)) && <lable className='invalid-km'>invalid KM</lable>}
                  <div style={{ display: "flex" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faRoad} size="lg" />
                    </div>
                    <TextField
                      name="closekm"
                      value={formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm || ''}

                      onChange={(e) => {
                        let value = e.target.value;
                        if (value >= 0) {
                          setKmValue(pre => ({ ...pre, closeKMState: e.target.value }))
                          handleChange(e)
                        }
                      }}
                      label="Close KM"
                      size="small"
                      type="number"
                      id="outlined-start-closekm"
                      autoComplete="password"
                    />
                  </div>
                </div>

                <div style={{ display: "grid" }} className="input">
                  {kmValue.closeKMState && (Number(kmValue.shedInState) <= Number(kmValue.closeKMState)) && <lable className='invalid-km'>invalid KM</lable>}
                  <div style={{ display: "flex" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faRoad} size="lg" />
                    </div>

                    <TextField
                      name="shedin"
                      value={formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin || ''}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value >= 0) {
                          setKmValue(pre => ({ ...pre, shedInState: e.target.value }))
                          handleChange(e)
                        }
                      }}
                      label="Shed In"
                      type="number"
                      id="shedin"
                      size='small'
                      autoComplete="password"
                    />
                  </div>
                </div>


                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField
                    name="shedkm"
                    value={formData.shedkm || book.shedkm || selectedCustomerData.shedkm || shedKilometers.shedkm || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 0) {
                        handleChange(e)
                      }
                    }}
                    label="Add KM"
                    type="number"
                    id="shedkm"
                    size='small'
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faRoad} size="lg" />
                  </div>
                  <TextField


                    name="totalkm1"
                    value={calculateTotalKilometers() || ''}
                    onChange={handleChange}
                    label="Total KM"
                    id="totalkm1"
                    type="number"
                    size='small'
                    autoComplete="password"
                  />
                </div>

                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faStopwatch} size="lg" />
                  </div>
                  <TextField
                    name="additionaltime"
                    value={formData.additionaltime || book.additionaltime || selectedCustomerData.additionaltime || additionalTime.additionaltime || ''}
                    onChange={handleChange}
                    label="Additional Time"
                    id="additionaltime"
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faStopwatch} size="lg" />
                  </div>
                  <TextField
                    name="totaltime"
                    value={formData.totaltime || packageData.totaltime || book.totaltime || selectedCustomerData.totaltime || calculateTotalTime() || ''}
                    onChange={handleChange}
                    label="Total Time"
                    id="totaltime"
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faStamp} />
                  </div>
                  <TextField
                    name="permit"
                    value={formData.permit || selectedCustomerData.permit || book.permit || ''}
                    onChange={handleChange}
                    label="Permit"
                    id="permit"
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faSquareParking} />
                  </div>
                  <TextField
                    name="parking"
                    value={formData.parking || selectedCustomerData.parking || book.parking || ''}
                    onChange={handleChange}
                    label="Parking"
                    id="parking"
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <TollTwoToneIcon color="action" />
                  </div>
                  <TextField
                    name="toll"
                    value={formData.toll || selectedCustomerData.toll || book.toll || ''}
                    onChange={handleChange}
                    label="Toll"
                    id="toll"
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
                <div className="input">

                  <Button variant="contained"
                    onClick={() => {
                      handleCalc();
                      // handleClickOpen();
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
                    <DialogTitle id="alert-dialog-title">
                      {"Customer Bill"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <div className="Customer-Customer-Bill-Slider">
                          <div className="input-field">
                            <div className="input">
                              <div className="icone">
                                <Inventory2Icon color="action" />
                              </div>

                              <TextField
                                name="pack"
                                value={calcPackage || formData.calcPackage || ''}
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
                                value={package_amount || formData.calcPackage || ''}
                                size="small"
                                label="Amount"
                                autoComplete="password"
                                id="amount5"
                                variant="standard"
                              />
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faRoad} />
                              </div>
                              <TextField
                                name="exkm1"
                                className='customer-bill-input'
                                value={extraKM || formData.calcPackage || 0}
                                label="Ex.Km"
                                id="ex-exkm1"
                                autoComplete="password"
                                size="small"
                                variant="standard"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField size="small"
                                name='exkmTkm2'
                                className='customer-bill-input'
                                value={extrakm_amount || formData.calcPackage || ''}
                                id="exkmTkm2"
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
                                value={ex_kmAmount || formData.calcPackage || 0}
                                size="small"
                                label="Amount"
                                autoComplete="password"
                                id="amount6"
                                variant="standard"
                              />
                            </div>
                          </div>

                          <div className="input-field">
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faStopwatch} />
                              </div>
                              <TextField
                                name="exHrs1"
                                className='customer-bill-input'
                                value={extraHR || formData.calcPackage || ''}
                                label="exHrs1"
                                id="ex-exHrs1"
                                size="small"
                                autoComplete="password"
                                variant="standard"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField
                                size="small"
                                id="exHrsTHrs2"
                                name='exHrsTHrs2'
                                className='customer-bill-input'
                                value={extrahr_amount || formData.calcPackage || ''}
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
                                value={ex_hrAmount || formData.calcPackage || 0}
                                size="small"
                                label="Amount"
                                autoComplete="password"
                                id="amouamount7"
                                variant="standard"
                              />
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faCloudMoon} />
                              </div>
                              <TextField
                                name="night1"
                                className='customer-bill-input'
                                value={nightBta || ''}
                                onChange={(e) => setNightBeta(e.target.value)}
                                label="Night"
                                id="night1"
                                autoComplete="password"
                                size="small"
                                variant="standard"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField
                                size="small"
                                className='customer-bill-input'
                                name='nightThrs2'
                                id="nightThrs2"
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
                                id="amount8"
                                variant="standard"
                              />
                            </div>
                          </div>
                          <div className="input-field">
                            <div className="input">
                              <div className="icone">
                                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                              </div>
                              <TextField
                                name="driverconvenience1"
                                className='customer-bill-input'
                                value={driverBeta || formData.driverBeta || ''}
                                onChange={driverBeta_calc}
                                label="Driver Convenience"
                                autoComplete="password"
                                id="driverconvenience1"
                                size="small"
                                variant="standard"
                              />
                            </div>
                            <div className="input">
                              <div className="icone">
                                <TollTwoToneIcon color="action" />
                              </div>
                              <TextField
                                size="small"
                                name='dtc2'
                                id='dtc2'
                                className='customer-bill-input'
                                value={driverbeta_Count || formData.driverbeta_Count || ''}
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
                                id="amount9"
                                autoComplete="password"
                                variant="standard"
                              />
                            </div>
                          </div>

                          <TextField
                            name="amount9"
                            className='total-amount-textfield'
                            value={totalcalcAmount || 0}
                            size="small"
                            label="Total Amount"
                            id="amount-amount9"
                            autoComplete="password"
                            variant="standard"
                          />

                          <div className="input-field">

                          </div>
                          <div className="input-field">
                          </div>
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions className='tripsheet-cancel-save-btn'>
                      <Button className='tripsheet-cancel-button' onClick={handleClose}>Cancel</Button>
                      <Button variant="contained" onClick={handleClose} autoFocus>
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>

                <div className="input">
                  <div className="icone">
                    <BackupTableSharpIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="vpermettovendor"
                    value={formData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor || ''}
                    onChange={handleChange}
                    label="v-permet-To-Vendor"
                    id="vpermettovendor"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <MinorCrashSharpIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="vendortoll"
                    value={formData.vendortoll || selectedCustomerData.vendortoll || book.vendortoll || ''}
                    onChange={handleChange}
                    label="Vendor-Toll"
                    id="vendor-vendortoll"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <PaymentsIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customeradvance"
                    value={formData.customeradvance || selectedCustomerData.customeradvance || book.customeradvance || ''}
                    onChange={handleChange}
                    label="Customer-customeradvance"
                    id="customer-advance"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <Button startIcon={<BorderColorIcon />} variant="outlined" onClick={handleETripsheetClick} >
                    E-Tripsheet
                  </Button>
                </div>

                <div className="input">
                  <div className="icone">
                    <MarkChatReadIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="remark"
                    value={formData.remark || selectedCustomerData.remark || book.remark || ''}
                    onChange={handleChange}
                    label="Remark"
                    id="remark"
                    multiline
                    rows={5}
                    sx={{ m: 2, width: "100%" }}
                    autoComplete="password"
                  />
                </div>

                <div className='input d-grid'>
                  <label>Escort</label>
                  <span>
                    <label>
                      <input
                        id="radioNo"
                        type="radio"
                        value="Yes"
                        checked={escort === "Yes"}
                        onChange={handleEscortChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        id="radioyes"
                        type="radio"
                        value="No"
                        checked={escort === "No"}
                        onChange={handleEscortChange}
                      />
                      No
                    </label>
                  </span>
                </div>

                <div className='input d-grid'>
                  <label>Airport Transfer</label>
                  <span>
                    <label>
                      <input
                        id="radioYes-TransferChange"
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
                        id="radioNo-TransferChange"
                        checked={transferreport === "No"}
                        onChange={handleTransferChange}
                      />
                      No
                    </label>
                  </span>
                </div>

                <Dialog open={popupOpen} onClose={handlePopupClose} maxWidth="md">
                  <DialogContent style={{ width: '210mm', maxWidth: 'none' }}>
                    <Invoice tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={logoImage} attachedImage={attachedImage} routeData={routeData} formData={calculateTotalTime} book={book} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} totalhour={formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || ''} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handlePopupClose} variant="contained" color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>


                <div className="input">
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


                <TabPanel value={3} sx={{ p: 2 }}>
                  <div className="Customer-Customer-Bill-Slider">
                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <Inventory2Icon color="action" />
                        </div>

                        <TextField
                          name="pack"
                          value={calcPackage || formData.calcPackage || ''}
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
                          value={package_amount || formData.calcPackage || ''}
                          size="small"
                          label="Amount"
                          autoComplete="password"
                          id="amount"
                          variant="standard"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faRoad} />
                        </div>
                        <TextField
                          name="exkm1"
                          value={extraKM || formData.calcPackage || 0}
                          label="Ex.Km"
                          id="ex-km"
                          autoComplete="password"
                          size="small"
                          variant="standard"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField size="small"
                          name='exkmTkm2'
                          value={extrakm_amount || formData.calcPackage || ''}
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
                          value={ex_kmAmount || formData.calcPackage || 0}
                          size="small"
                          label="Amount"
                          autoComplete="password"
                          id="amount"
                          variant="standard"
                        />
                      </div>
                    </div>

                    <div className="input-field">
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faStopwatch} />
                        </div>
                        <TextField
                          name="exHrs1"
                          value={extraHR || formData.calcPackage || ''}
                          label="Ex.Hrs"
                          id="ex-Hrs"
                          size="small"
                          autoComplete="password"
                          variant="standard"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='exHrsTHrs2'
                          value={extrahr_amount || formData.calcPackage || ''}
                          variant="standard"
                        />

                      </div>
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faEquals} />
                        </div>
                        <TextField
                          name="amount7"
                          value={ex_hrAmount || formData.calcPackage || 0}
                          size="small"
                          label="Amount"
                          autoComplete="password"
                          id="amount"
                          variant="standard"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input">
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
                      <div className="input">
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
                      <div className="input">
                        <div className="icone">
                          <FontAwesomeIcon icon={faMoneyBill1Wave} />
                        </div>
                        <TextField
                          name="driverconvenience1"
                          value={driverBeta || formData.driverBeta || ''}
                          onChange={driverBeta_calc}
                          label="Driver Convenience"
                          autoComplete="password"
                          id="driver-convenience"
                          size="small"
                          variant="standard"
                        />
                      </div>
                      <div className="input">
                        <div className="icone">
                          <TollTwoToneIcon color="action" />
                        </div>
                        <TextField
                          size="small"
                          name='dtc2'
                          value={driverbeta_Count || formData.driverbeta_Count || ''}
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
                          value={DocumentType.find((option) => option.optionvalue)?.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                          options={DocumentType.map((option) => ({
                            label: option.option,
                          }))}
                          getOptionLabel={(option) => option.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
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
                      <div className="input">
                        <Button variant="contained" onClick={handleUpload}>Select File & Upload</Button>
                      </div>

                    </div>
                    <div className="input-field">
                      <div className="input">
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
                      <div className="input">
                        <Button onClick={handlesignatureimages} variant="contained">Download signature</Button>
                      </div>


                      <input
                        ref={fileInputRefdata}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChangesignature}
                      />
                      <Dialog open={signaturepopup} onClose={siganturediaglogclose}>
                        <DialogContent>
                          <div
                            style={{
                              // display: "flex",
                              overflowY: "auto",
                              backgroundColor: "#E5E5E5"
                            }}
                          >

                            <div style={{ marginLeft: "10px", backgroundColor: "#EAEAEA" }}>
                              <img src={signimageUrl} alt="Embedded Content" style={{ width: "200px", height: "200px", border: '1px solid grey' }} />
                            </div>
                          </div>

                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              handlesignaturemageDownload()
                            }}
                          >
                            DOWNLOAD
                          </Button>
                          <Button variant="contained" onClick={() => {
                            handlesignaturemageDelete()
                          }} color="primary">
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
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
                          onChange={handleChange}
                          checked={Boolean(formData.reload || selectedCustomerData?.reload || book.reload)}
                        />
                      </div>
                    </div>
                    <div className="table-TripSheet">
                      <div className='tripsheet-booking-table'>
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          onRowClick={handleTripRowClick}
                          pageSize={5}
                          checkboxSelection
                        />
                      </div>
                    </div>

                    <Dialog open={imgpopupOpen} onClose={handleimgPopupClose} maxWidth="md" fullWidth>
                      <DialogContent style={{ padding: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {selectedRow && (
                          <img src={imageUrl} alt="Embedded Content" style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }} />
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            handleimagedelete(selectedRow);
                            handleimgPopupClose();
                            handleRefresh();
                          }}
                        >
                          Delete
                        </Button>
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
                                <textarea ref={textRef} readOnly style={{ width: '400px', height: '8  0px' }}>{link}</textarea>
                                <button onClick={SignPage} className='signature'>Copy </button>
                                <div>
                                  <button onClick={copyToClipboard}>Copy Link</button>

                                </div>
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

        </form>
      </div >
    </div >
  );
};

export default TripSheet;