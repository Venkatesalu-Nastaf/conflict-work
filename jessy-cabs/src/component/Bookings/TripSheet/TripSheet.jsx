

import React, { useEffect, useContext, useState, useRef } from 'react';
import "./TripSheet.css";
import {
  Apps,
  Status,
  HireTypes,
  DocumentType,
  Duty,
  // Email,
  GroupTypes
} from "./TripSheetdata";
import dayjs from "dayjs";
import Tabs from "@mui/joy/Tabs";
import Box from "@mui/material/Box";
import TabList from "@mui/joy/TabList";
import Modal from '@mui/material/Modal';
import TabPanel from "@mui/joy/TabPanel";
import Invoice from '../Invoice/Invoice';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/joy/Tab";
import AltRouteIcon from "@mui/icons-material/AltRoute";

import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextField, FormControlLabel, FormControl, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EmailIcon from "@mui/icons-material/Email";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
// import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
// import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import MinorCrashSharpIcon from "@mui/icons-material/MinorCrashSharp";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
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
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import ChecklistIcon from "@mui/icons-material/Checklist";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InvoiceHCL from '../Invoice/InvoiceHCL';
import { APIURL } from '../../url';
import axios from "axios";
import CopyEmailHtmlcontent from './CopyEmailcontent';


import {
  vehicaleinfos
} from "../../Bookings/BookingMain/Booking/Booking";
import { PiCarSimpleFill } from 'react-icons/pi';


import useTripsheet from './useTripsheet';

// import { FaChevronDown } from "react-icons/fa";
import { WhatsappShareButton } from 'react-share';

// UpdateTbaleRowsGPSSlider TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "documenttype", headerName: "Document Type", width: 140 },
  { field: "path", headerName: "Attach Path", width: 160 },
  { field: "tripid", headerName: "TripID", width: 100 },
  { field: "booking_id", headerName: "Booking ID", width: 110 },
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TripSheet = ({ stationName, logoImage }) => {

  // const stationOptions = stationName?.filter(option => option?.Stationname !== "ALL").map(option => option?.Stationname)
  const stationOptions = stationName?.filter(option => option?.Stationname !== "All")
  // const inputRef = useRef(null);

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
    handleAutocompleteChange,
    //  copyToClipboard, 
    setFormValues,
    //  handlesignaturePopUpClose,
    packageData,
    smsguest,
    sendEmail,
    setSendEmail,
    formValues,
    selectedCustomerDatas,
    setDriverSMS,
    DriverSMS,
    setStartTime,
    setBook,
    setFormData,
    setSelectedCustomerData,
    setCloseTime,
    organizationdata,
    popupOpen,
    setSmsGuest,
    setSelectedCustomerDatas,
    setreporttime,
    // signaturePopUpOpen,
    setshedintime,
    shedKilometers,
    //  handleSignaturePopUpOpen,
    calculateTotalKilometers,
    additionalTime,
    handleETripsheetClick,
    handlePopupClose,
    tripSheetData,
    attachedImage,
    routeData,
    signimageUrl,
    // selectedImage,
    GmapimageUrl,
    handleTripmapClick,
    mapimgpopupOpen,
    handleimgPopupClose,
    mapimageUrls,
    handleTripmaplogClick,
    maplogimgpopupOpen,
    row,
    handleUpload, isHybridCustomer,
    handleRefresh,
    handleButtonClick,
    handleTripRowClick,
    imgpopupOpen,
    // generateLink,
    selectedRow,
    imageUrl,
    // link,
    // isSignatureSubmitted,
    isEditMode,
    handleEdit, checkCloseKM,
    driverdetails, ClosedTripData,
    // sign, 
    handleCalc, calcPackage, extraHR, extraKM, package_amount,
    extrakm_amount, extrahr_amount,
    ex_kmAmount, ex_hrAmount, night_totalAmount, driverBeta_calc,
    driverbeta_Count_calc, driverBeta_amount, setdriverBeta, setdriverbeta_Count, setdriverBeta_amount,
    totalcalcAmount, escort, handleEscortChange,
    open, handleClose, handleTransferChange, transferreport,
    signaturepopup, setSignaturepopup, siganturediaglogclose,
    handlesignaturemageDownload, setSignatureupload,
    handleFileChangesignature, getSignatureImage, handlesignaturemageDelete,
    handleVendorcalc, calculatevendorTotalDays, vendorinfo, handleAutocompleteVendor, handleDatevendorChange, lockdata, setLockData, setVendorinfodata, calculatevendorTotalTime, calculatevendorTotalKilometers, vendorbilldata, handlevendor_billdata,
    vendornightdatatotalAmount, vendorExtarkmTotalAmount, vendorExtrahrTotalAmount, handlevendorinfofata, vendorpassvalue, accountinfodata, handletravelsAutocompleteChange,
    generateAndCopyLinkdata,
    signaturelinkcopy, columnssignature, rowsignature, handleTripsignaturedata, signaturelinkwhatsapp, setWarning, setWarningMessage, setSignImageUrl,
    handleCloseMapLog,
    openEditMapLog,
    handleEditMapDetails,
    selectedMapRow,
    ratepackage,
    calculateTotalDay,
    calculateTotalTimes,
    handleClickOpen,
    setSelectedMapRow, CopyEmail, setCopyEmail, conflictkm, lockdatavendorbill, setLockDatavendorBill, lockdatacustomerbill, setLockDatacustomerBill,
    maxconflict, setExtraKM, setextrakm_amount, setExtraHR, setextrahr_amount, handleRefreshsign,
    handleEditMap,
    handleDeleteMap
  } = useTripsheet();
  const { getHtmlContentdata } = CopyEmailHtmlcontent();
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus(); // Focus the input field when component mounts
  //   }
  // }, [ selectedCustomerData.shedintime ,selectedCustomerDatas.shedintime]);
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const apiurl = APIURL
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
  let closeTimeVar = formData.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || book.closetime;


  // kilometer
  const [kmValue, setKmValue] = useState({
    shedOutState: '',
    startKMState: '',
    closeKMState: '',
    shedInState: '',
    shedOutDate: '',
    startDate: '',
    closeDate: '',
    shedInDate: '',
    start_totalDays: '',
    close_totalDays: '',
    shedIn_TotalDays: '',
    close_shedOut_totalDays: '',
    totalDays: '',
  })

  const handlesignatureimages = async () => {
    const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
    // await getSignatureImage()
    if (!tripid) {

      setWarning(true);
      setWarningMessage("Enter The Tripid")
      return
    }
    const response = await fetch(`${apiurl}/get-signimage/${tripid}`);   /// prob004
    if (response.status === 200) {
      const imageUrl = URL.createObjectURL(await response.blob());
      setSignImageUrl(imageUrl);
      setSignaturepopup(true);
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
  // const textRef = useRef();


  //   const SignPage = async (event) => {
  //     event.preventDefault();
  //     if (link) {
  //       const textElement = textRef.current;
  //       navigator.clipboard.writeText(textElement.textContent).then(() => {
  //         setSign(true)
  //         setTimeout(() => {
  //           setSign(false)
  //           setLink("")
  //         }, 2000)

  //       }).catch(err => {
  //         console.error('Failed to copy text: ', err);
  //       });

  //     } else {
  //       alert("no link data ", link)
  //     }
  //   }


  //  ;




  // { kmValue.startDate && ((kmValue.closeDate ? (Number(kmValue?.close_totalDays) > 0 ? '' : <lable className='invalid-km'>invalid Date</lable>) : <lable className='invalid-km'>Give Date</lable>)) }

  const shedOutDateObj = new Date(formData?.shedOutDate || selectedCustomerDatas?.shedOutDate || selectedCustomerData?.shedOutDate || book?.shedOutDate)
  const SatrtDateObj = new Date(formData?.startdate || selectedCustomerDatas?.startdate || selectedCustomerData?.startdate || book?.startdate)
  const closeDateObj = new Date(formData?.closedate || selectedCustomerDatas?.closedate || selectedCustomerData?.closedate || book?.closedate)
  const shedInDateObj = new Date(formData?.shedInDate || selectedCustomerDatas?.shedInDate || selectedCustomerData?.shedInDate || book?.shedInDate)

  const parcedShedOutDate = new Date(shedOutDateObj.getFullYear(), shedOutDateObj.getMonth(), shedOutDateObj.getDate())
  const parcedSatrtDate = new Date(SatrtDateObj.getFullYear(), SatrtDateObj.getMonth(), SatrtDateObj.getDate())
  const parcedcloseDate = new Date(closeDateObj.getFullYear(), closeDateObj.getMonth(), closeDateObj.getDate())
  const parcedshedInDate = new Date(shedInDateObj.getFullYear(), shedInDateObj.getMonth(), shedInDateObj.getDate())

  const startDateCheckFun = () => {

    if (parcedSatrtDate !== "Invalid Date" && !isNaN(new Date(parcedSatrtDate).getTime())) {
      if (parcedShedOutDate !== "Invalid Date" && !isNaN(new Date(parcedShedOutDate.getTime()))) {
        if (parcedSatrtDate >= parcedShedOutDate) {
          return
        } else {
          return <label style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Invalid Date</label>
        }
      } else {
      }
    } else {
      return
    }
  }


  const closeDateCheckFun = () => {
    if ((parcedSatrtDate !== "Invalid Date" && !isNaN(new Date(parcedSatrtDate).getTime())) && (parcedcloseDate !== "Invalid Date" && !isNaN(new Date(parcedcloseDate).getTime()))) {
      if (parcedSatrtDate <= parcedcloseDate) {
        return
      } else {
        return <label style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Invalid Date</label>
      }
    }
    return
  }

  const shedInDateCheck = () => {
    if ((parcedShedOutDate !== "Invalid Date" && !isNaN(new Date(parcedShedOutDate).getTime()))) {
      if ((parcedShedOutDate !== "Invalid Date" && !isNaN(new Date(parcedShedOutDate).getTime())) && (parcedshedInDate !== "Invalid Date" && !isNaN(new Date(parcedshedInDate).getTime()))) {
        if (parcedcloseDate !== "Invalid Date" && !isNaN(new Date().getTime(parcedcloseDate))) {
          if (parcedshedInDate < parcedcloseDate) {
            return <label style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Invalid Date</label>
          }
          else {
            if (parcedshedInDate < parcedShedOutDate) {
              return <label style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Invalid Date</label>
            }
          }
        } else {
          if (!(parcedshedInDate >= parcedShedOutDate)) {
            return <label style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Invalid Date</label>
          }
        }
      } else {
        // return <label style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Fill Date</label>
      }
    }
  }



  const tripID = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
  const shedOuttime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
  const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;

  const checkTimeandDateConflict = () => {
    if (ClosedTripData.length < 1 || !ClosedTripData) return

    let time = "00:00", tripid = null;
    for (const trip of ClosedTripData) {
      const shedInDate = new Date(trip.shedInDate);
      const parsedShedindate = new Date(shedInDate.getFullYear(), shedInDate.getMonth(), shedInDate.getDate());

      if ((parcedShedOutDate.getDate() === parsedShedindate.getDate()) && (parcedShedOutDate.getMonth() === parsedShedindate.getMonth()) && (parcedShedOutDate.getFullYear() === parsedShedindate.getFullYear())) {
        if (time < trip.shedintime) {
          time = trip.shedintime;
          tripid = trip.tripid;
        }
      }
    }
    if (shedOuttime && time) {
      if (shedOuttime <= time) {

        const sendLabel = (tripID !== tripid) ? <p style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Conflict maxTime :{time} | {tripid}</p> : null

        return sendLabel;
      }
      return
    } else {
      return
    }
  }


  const ratefor = selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName;


  const [fueltype, setFuelType] = useState('')

  useEffect(() => {
    const fetchFuleType = async () => {
      if (!ratefor) return
      const data = await axios.get(`${apiurl}/getFuelType/${ratefor}`)
      setFuelType(data?.data[0]?.fueltype)
    }

    fetchFuleType()

  }, [ratefor, apiurl])


  const [customerAddress, setCustomerAddress] = useState("")
  useEffect(() => {
    const fetchFuleType = async () => {
      if (!customer) return
      const data = await axios.get(`${apiurl}/getcustomer-address/${customer}`)
      setCustomerAddress(data?.data[0]?.address1)
    }
    fetchFuleType()

  }, [customer, apiurl])

  const appsstatus = formData.apps || selectedCustomerData.apps || book.apps;


  const dataToSend = {
    bookingno: formData.tripid || selectedCustomerData.tripid || book.tripid,
    guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname,
    guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno,
    email: formValues.email || selectedCustomerData.email || book.email || formData.email,
    driverName: selectedCustomerDatas.driverName || selectedCustomerData.driverName || tripSheetData.driverName || selectedCustomerDatas.driverName || book.driverName,
    // driverName: selectedCustomerDatas?.driverName || formData.driverName || selectedCustomerData.driverName || formValues.driverName || book.driverName,
    requestno: selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request,
    vehRegNo: formData.vehRegNo || selectedCustomerDatas.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || book.vehRegNo,
    mobileNo: formData.mobileNo || selectedCustomerDatas.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo || '',

    // vehType: formData.vehType || selectedCustomerData.vehType || book.vehType || formValues.vehType,
    vehType: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName ,
    // starttime: formData.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime,
    starttime: formData.starttime || formData.starttime || selectedCustomerData.starttime || book.starttime,
    startdate: formData.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate,
    status: formData.status || book.status || selectedCustomerData.status,
    customeremail: formData.orderbyemail || book.orderbyemail || selectedCustomerData.orderbyemail,
    servicestation: formData.department || formValues.department || selectedCustomerData.department || book.department || '',
  }

  const handlecopiedemailcontent = () => {
    const tripidstatus = formData.status || book.status || selectedCustomerData.status;

    if (sendEmail) {
      return;
    }


    if (tripidstatus === "Cancelled" || tripidstatus === "Opened") {
      const data = getHtmlContentdata(tripidstatus, dataToSend);
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = data;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
      setCopyEmail(true)

      setTimeout(() => {
        setCopyEmail(false)
      }, (2000));
    }
    else {

      setWarning(true)
      setWarningMessage("Check Your Trip Status")
    }


  }
  

  const data = formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin;
  return (
    <div className="form-container form-container-tripsheet">
      <div className="Tripsheet-form main-content-container">
        <form action="">
          {/* <p className="Title-Name head-tab-type-2-all">Trip Sheet</p> */}
          <p className="head-tab-type-2-all">
            <span className="Title-Name">Trip Sheet</span>
          </p>
          <div className="Tripsheet-header">

            <div>
              <div className='tripsheet-top-division'>

                <span className="d-grid">
                  <label>Booking ID</label>
                  <input type="text"
                    id="bookingno"
                    name="bookingno"
                    value={formData.bookingno || selectedCustomerData.bookingno || book.bookingno || ''}
                    onChange={handleChange}
                  />
                </span>

                <span className="d-grid">
                  <label>Billing No</label>
                  <input type="text"
                    id="billingno"
                    name="billingno"
                    value={formData.billingno || selectedCustomerData.billingno || book.billingno || ''}
                    onChange={handleChange}
                  />
                </span>



                {/* <span className="d-grid">
                  <div className="tripsheet-top-division-date">
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
                </span> */}

                <span className="d-grid">
                  <label className="tripsheet-top-division-date-label">Tripsheet Date</label>
                  <div className="tripsheet-top-division-date">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        id="tripsheetdate"
                        value={formData.tripsheetdate || selectedCustomerData.tripsheetdate ? dayjs(selectedCustomerData.tripsheetdate) : null || book.tripsheetdate ? dayjs(book.tripsheetdate) : dayjs()}
                        format="DD/MM/YYYY"
                        // label='Booking Date'
                        onChange={(date) => handleDateChange(date, 'tripsheetdate')}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.tripsheetdate} />
                        )}
                      </DatePicker>
                    </LocalizationProvider>
                  </div>
                </span>

                <div className="tripsheet-top-division-dropdown">
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-Status"
                    className='tripsheet-top-division-status-main'
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
                        <TextField {...params} label="Status" sx={{ padding: '0px', fontSize: '14px' }} autoComplete="password" name="status" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>

                <div className="tripsheet-top-division-dropdown">
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-apps"
                    className='tripsheet-top-division-status-main'
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

                <div style={{ display: 'flex' }}>
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

                  {isEditMode && !sendEmail && (
                    <>
                      <Button variant="outlined" size="small" onClick={handlecopiedemailcontent}>
                        Copy
                      </Button>
                      <span style={{ color: 'green' }}>
                        <span style={{ display: 'flex', alignItems: 'center', color: 'green' }}>{CopyEmail ? "Link Copied..." : ""}</span>
                      </span>
                    </>
                  )}
                </div>

                <div className="">
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



              </div>
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

                {/* <div className="input">
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
                </div> */}

                {/* <div className="input">
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
                </div> */}

                {/* <div className="input">
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
                </div> */}

                {/* <div className="input">
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
                </div> */}

                {/* <div className="input">
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
                </div> */}
                <div className="input">
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    name="customer"
                    size='small'
                    value={formData.customer || selectedCustomerData.customer || book.customer || packageData.customer || ''}
                    onChange={handleChange}
                    label="Customer"
                    id="standard-size-customer"
                    // variant="standard"
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
                    size="small"
                    value={formData.orderedby || selectedCustomerData.orderedby || book.orderedby || ''}
                    onChange={handleChange}
                    label="Ordered By"
                    id="standard-size-orderedby"
                    // variant="standard"
                    autoComplete="password"
                    required
                  />
                </div>
                {/* <div className='input'>
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
                </div> */}

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
                    <AttachEmailIcon color="action" />
                  </div>
                  <TextField
                    name="orderbyemail"
                    value={formData.orderbyemail || selectedCustomerDatas.orderbyemail || selectedCustomerData.orderbyemail || formValues.orderbyemail || book.orderbyemail || ''}
                    onChange={handleChange}
                    label="Order By Email"
                    id="orderbyemail"
                    size="small"
                    autoComplete="password"
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


                <div className="input tripsheet-remarks-division">
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





              <div className='tripsheet-division2'>
                <div>
                  {/* <div className="input">
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
                  </div> */}
                </div>

                <div>
                  {/* <div>
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
                  </div> */}
                </div>
              </div>

              {/* {showVehicleDetails && ( */}
              <div className='tripsheet-division3'>

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
                    // value={stationName.find((option) => option.optionvalue)?.label || selectedCustomerDatas.department || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                    // options={stationName.map((option) => ({
                    //   label: option.Stationname,
                    // }))}
                    value={stationOptions?.find((option) => option.optionvalue)?.label || selectedCustomerDatas.department || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                    options={stationOptions?.map((option) => ({
                      label: option.Stationname,
                    }))}
                    getOptionLabel={(option) => option.label || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Service Station" autoComplete="password" name="department" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                {/* <div className="input">
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
                </div> */}

                {/* <div className="input radio">
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
                </div> */}

                {/* <div className="input">
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
                </div> */}

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
                    onChange={(event, value) => {
                      handleAutocompleteChange(event, value, "duty")
                      if (!lockdata) {
                        setVendorinfodata({ ...vendorinfo, vendor_duty: value.label })
                      }
                    }}
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
                {/* <div className="input">
                    <div className="icone">
                      <AirlineStopsIcon color="action" />
                    </div>

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
                  </div> */}
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
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customercode"
                    value={formData.customercode || selectedCustomerData.customercode || book.customercode || ''}
                    onChange={handleChange}
                    label="Cost Code"
                    id="customer-customercode"
                    autoComplete="password"
                  />
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
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Shed Out Date"
                      id="shedOutDate"
                      value={formData?.shedOutDate || selectedCustomerData?.shedOutDate ? dayjs(selectedCustomerData?.shedOutDate) : null || book?.shedOutDate ? dayjs(book?.shedOutDate) : null}
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        setKmValue((prev) => ({ ...prev, shedOutDate: date }));
                        handleDateChange(date, 'shedOutDate')
                        // if(!lockdata){
                        // setVendorinfodata((prev) => ({ ...prev, vendorshedOutDate: date }))
                        // }
                      }}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.shedOutDate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>


                <div style={{ display: "grid" }} className="input">

                  {startDateCheckFun()}
                  <div style={{ display: "flex" }}>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Report Date"
                        id="startdate"
                        value={
                          formData.startdate || (selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null) || (book.startdate ? dayjs(book.startdate) : null)
                        }
                        format="DD/MM/YYYY"
                        onChange={(date) => {
                          setKmValue((prev) => ({ ...prev, startDate: date }));
                          handleDateChange(date, 'startdate');

                          // const shedoutdate = formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate;
                          // const startdate = date;

                          // if (shedoutdate && startdate) {
                          //   const shedoutdateObj = dayjs(shedoutdate);
                          //   const startdateObj = dayjs(startdate);
                          //   const totalDays = startdateObj.diff(shedoutdateObj, 'days') + 1;
                          //   setKmValue(prev => ({ ...prev, start_totalDays: totalDays }));
                          // }
                        }}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                        )}
                      </DatePicker>
                    </LocalizationProvider>
                  </div>
                </div>


                <div className="input" style={{ display: "grid" }}>
                  {closeDateCheckFun()}
                  <div style={{ display: "flex" }}>
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

                          // const startDate = formData.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate;
                          // const closeDate = date
                          // const shedindate = kmValue.shedInDate

                          // if (startDate && closeDate) {
                          //   const startDateObj = dayjs(startDate);
                          //   const closeDateObj = dayjs(closeDate);
                          //   const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
                          //   setKmValue(prev => ({ ...prev, close_totalDays: totalDays }))
                          // }

                          // if (shedindate && closeDate) {
                          //   const closedateObj = dayjs(closeDate);
                          //   const shedindateObj = dayjs(shedindate);
                          //   const totalDays = shedindateObj.diff(closedateObj, 'days') + 1;
                          //   setKmValue(prev => ({ ...prev, close_shedOut_totalDays: totalDays }))
                          // }
                        }}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate} />
                        )}
                      </DatePicker>
                    </LocalizationProvider>
                  </div>
                </div>


                <div className="input" style={{ display: "grid" }}>

                  {shedInDateCheck()}

                  <div style={{ display: "flex" }}>

                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Shed In Date"
                        id="shedInDate"
                        value={formData.shedInDate || selectedCustomerData.shedInDate ? dayjs(selectedCustomerData.shedInDate) : null || book.shedInDate ? dayjs(book.shedInDate) : null}
                        format="DD/MM/YYYY"
                        onChange={(date) => {
                          handleDateChange(date, 'shedInDate')

                          // setKmValue(prev => ({ ...prev, shedInDate: date }))
                          // const closedate = kmValue.closeDate;
                          // const shedoutdate = kmValue.shedOutDate;
                          // const shedindate = date

                          // if (shedoutdate && shedindate) {
                          //   const shedOutDateObj = dayjs(shedoutdate);
                          //   const shedindateObj = dayjs(shedindate);
                          //   const totalDays = shedindateObj.diff(shedOutDateObj, 'days') + 1;
                          //   setKmValue(prev => ({ ...prev, shedIn_TotalDays: totalDays }))
                          // }

                          // if (shedindate && closedate) {
                          //   const closedateObj = dayjs(closedate);
                          //   const shedindateObj = dayjs(shedindate);
                          //   const totalDays = shedindateObj.diff(closedateObj, 'days') + 1;
                          //   setKmValue(prev => ({ ...prev, close_shedOut_totalDays: totalDays }))
                          // }

                        }}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate} />
                        )}
                      </DatePicker>
                    </LocalizationProvider>
                  </div>

                </div>


                <div className="input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <DemoItem>
                    <TextField
                      name="totaldays"
                      value={calculateTotalDay()}
                      label="Total Days"
                      size="small"
                      type="number"
                      id="totaldays"
                      // variant="standard"
                      autoComplete="password"
                    />
                  </DemoItem>
                </div>



                <div className="input time" style={{ display: "grid" }}>
                  {/* {checkTimeandDateConflict()} */}

                  <div style={{ display: "flex", alignItems: 'center' }}>
                    <div className='icone icone-margin-adjust'>
                      <MdOutlineAccessTimeFilled />
                    </div>

                    <div className='input-type-grid'>
                      <label>Shed Out Time</label>
                      <input
                        type="time"
                        name="reporttime"
                        value={formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime || ''}
                        onChange={(event) => {

                          setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, reporttime: event.target.value });
                          setBook({ ...book, reporttime: event.target.value });
                          setreporttime(event.target.value);
                          if (!lockdata) {
                            setVendorinfodata({ ...vendorinfo, vendorreporttime: event.target.value })
                          }

                        }}
                      />
                    </div>
                  </div>

                </div>

                <div className="input time">
                  <div className='icone icone-margin-adjust'>
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className='input-type-grid'>
                    {(reportTimeVar && ((reportTimeVar < startTimeVar) ? (<label>Report Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>))) || (!reportTimeVar && <label>Report Time</label>)}
                    {/* {(calculateTotalDay() === 0 && ((reportTimeVar < startTimeVar) ? (<label>Start Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>))) || (!reportTimeVar && <label>Start Time</label>)} */}

                    <input
                      type="time"
                      id="starttime"
                      name='starttime'
                      value={formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime || ''}
                      onChange={(event) => {

                        const rTime = event.target.value;
                        if ((reportTimeVar && rTime <= reportTimeVar)) {
                          return;
                        } else {

                          setBook({ ...book, starttime: event.target.value });
                          setStartTime(event.target.value);
                          setFormData({ ...formData, starttime: event.target.value });
                          setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                        }
                      }}
                    />
                  </div>
                </div>


                <div className="input time">
                  <div className='icone icone-margin-adjust'>
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className='closetime tripsheet-shed-in-time'>
                    {/* {(Number(kmValue.totalDays) === 1) ? (startTimeVar && ((startTimeVar < closeTimeVar) ? (<label>Close Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>))) || (!startTimeVar && <label>Close Time</label>) : <label>Close Time</label>} */}
                    {calculateTotalDay() === 0 ? (startTimeVar && ((startTimeVar < closeTimeVar) ? (<label>Close Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>))) || (!startTimeVar && <label>Close Time</label>) : <label>Close Time</label>}

                    <input
                      type="time"
                      name="closetime"
                      id="closetime"
                      value={formData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                      onChange={(event) => {
                        const rTime = event.target.value;
                        if (calculateTotalDay() === 0 && (startTimeVar && rTime <= startTimeVar)) {
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


                <div className="input time">
                  <div className='icone icone-margin-adjust'>
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className='input-type-grid'>
                    {(closeTimeVar && calculateTotalDay() === 0 &&
                      ((closeTimeVar < shedInTimeVar)
                        ? (<label>Shed In Time</label>)
                        : (<label style={{ color: "red" }}>Invalid Time</label>)
                      ))
                      || (!closeTimeVar && <label> Shed In Time</label>)
                    }
                    {calculateTotalDay() > 0 ? (<label>Shed In Time</label>) : ""}
                    <input
                      type="time"
                      name="shedintime"
                      value={formData.shedintime || selectedCustomerData.shedintime || book.shedintime || ''}
                      onChange={(event) => {
                        const rTime = event.target.value;

                        // Check if the day difference is 0
                        if (calculateTotalDay() === 0) {
                          // Only allow time greater than closeTimeVar
                          if (closeTimeVar && rTime > closeTimeVar) {
                            setSelectedCustomerData({ ...selectedCustomerData, shedintime: rTime });
                            setSelectedCustomerDatas({ ...selectedCustomerDatas, shedintime: rTime });
                            setBook({ ...book, shedintime: rTime });
                            setshedintime(rTime);
                            if (!lockdata) {
                              setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                            }
                          }
                        } else {
                          // Allow any time
                          setSelectedCustomerData({ ...selectedCustomerData, shedintime: rTime });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, shedintime: rTime });
                          setBook({ ...book, shedintime: rTime });
                          setshedintime(rTime);
                          if (!lockdata) {
                            setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div style={{ padding: "10px", display: 'flex', alignItems: 'center' }}>
                  <div className="icone icone-margin-adjust">
                    <FontAwesomeIcon icon={faStopwatch} size="lg" />
                  </div>
                  <div className='tripsheet-total-time-div' style={{ display: 'grid', alignItems: 'center' }}>
                    <label>Total Time</label>
                    <div className="input">
                      <TextField
                        name="totaltime"
                        // value={ calculateTotalTimes()}
                        value={
                          (book.reporttime !== "" || selectedCustomerData.reporttime !== "") &&
                            (book.shedintime !== "" || selectedCustomerData.shedintime !== "" || selectedCustomerDatas.shedintime !== "")
                            ? calculateTotalTimes()
                            : ""
                        }
                        onChange={handleChange}
                        // label="Total Time"
                        id="totaltime"
                        // variant="standard"
                        size='small'
                        autoComplete="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="input" style={{ display: "grid" }} >
                  {/* {kmValue.shedOutState && customer && !/hcl/i.test(customer) && ((Number(kmValue.shedOutState) <= Number(checkCloseKM.maxShedInkm)) && (tripID !== checkCloseKM.maxTripId && <lable className='invalid-km'>Conflict id: {checkCloseKM.maxTripId}, KM: {checkCloseKM.maxShedInkm}</lable>))} */}
                  {/* {kmValue.shedOutState && customer && !isHybridCustomer && ((Number(kmValue.shedOutState) <= Number(checkCloseKM.maxShedInkm)) && (tripID !== checkCloseKM.maxTripId && <lable className='invalid-km'>Conflict id: {checkCloseKM.maxTripId}, KM: {checkCloseKM.maxShedInkm}</lable>))} */}
                  {/* {conflictkm?.maximumkm !== 0 && tripID !== conflictkm.maxtripid && ((Number(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) <= Number(conflictkm.maximumkm)) && <lable className='invalid-km'>Conflict id: {conflictkm.maxtripid}, KM: {conflictkm.maximumkm}</lable>)} */}
                  {conflictkm?.maximumkm !== 0 && tripID !== conflictkm.maxtripid && ((Number(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) <= Number(conflictkm.maximumkm)) && <lable className='invalid-km'>Conflict id: {conflictkm.maxtripid}, KM: {conflictkm.maximumkm}</lable>)}
                  {/* <br></br> */}
                  {data === undefined && maxconflict?.maxconflictdata !== 0 && Number(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) <= Number(maxconflict?.maxconflictdata) && (
                    <label className='invalid-km'>
                      Conflict MaxTripid:{maxconflict?.maxTripid}, KM: {maxconflict?.maxconflictdata}
                    </label>

                  )}
                  <div style={{ display: "flex" }}>
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
                          if (!lockdata) {
                            setVendorinfodata((prev) => ({ ...prev, vendorshedoutkm: e.target.value }))
                          }
                        }
                      }}

                      label="Shed Out"
                      id="shedout"
                      size='small'
                      type="number"
                      autoComplete="password"
                    />
                  </div>
                </div>


                <div style={{ display: "grid" }} className="input">
                  {/* {kmValue.shedOutState && (Number(kmValue.startKMState) <= Number(kmValue.shedOutState)) && <lable className='invalid-km'>invalid KM</lable>} */}
                  {(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) && ((Number(kmValue.startKMState) || formData.startkm || selectedCustomerData.startkm || selectedCustomerDatas.startkm || book.startkm) <= (Number(kmValue.shedOutState) || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout)) && <lable className='invalid-km'>invalid KM</lable>}

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
                          if (!lockdata) {
                            setVendorinfodata((prev) => ({ ...prev, vendorshedinkm: e.target.value }))
                          }

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
                    <FontAwesomeIcon icon={faStopwatch} size="lg" />
                  </div>
                  <TextField
                    name="additionaltime"
                    value={formData.additionaltime || book.additionaltime || selectedCustomerData.additionaltime || additionalTime.additionaltime || ''}
                    onChange={handleChange}
                    label="Additional Time"
                    id="additionaltime"
                    // variant="standard"
                    size='small'
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
                    // variant="standard"
                    size='small'
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
                    // variant="standard"
                    size='small'
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
                    // variant="standard"
                    size='small'
                    autoComplete="password"
                  />
                </div>


                <React.Fragment>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                      style: {
                        width: '750px', // Adjust width here
                        maxWidth: '90%' // Ensure it doesn't exceed viewport width
                      }
                    }}
                  >
                    <div className="Tipsheet-content-table-main">
                      <Tabs
                        className='Scroll-Style tripsheet-calculate-popup-main'
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
                          <Tab>Vendor Info</Tab>
                          <Tab>Vendor Bill</Tab>
                          <Tab>Customer Bill</Tab>
                          <Tab>GPS Att</Tab>
                          <Tab>Messages</Tab>
                        </TabList>

                        <TabPanel value={0} sx={{ p: 2 }}>
                          <div className="Customer-Customer-Bill-Slider tripsheet-vendor-info-main tripsheet-vendor-info-main-popup">
                            <div className="input-field tripsheet-vendor-info-first-input-field">
                              <div className="input">
                                {/* <div className="icone">
        <NoCrashIcon color="action" />
      </div> */}
                                <Autocomplete
                                  fullWidth
                                  size="small"
                                  id="free-solo-vendor_vehicle"
                                  freeSolo
                                  // sx={{ minWidth: 200 }}
                                  // onChange={(event, value) =>
                                  //    handleAutocompleteVendor(event, value, "vendor_vehicle")
                                  //  }
                                  onChange={(event, value) => {
                                    if (lockdata) {
                                      handleAutocompleteVendor(event, value, "vendor_vehicle");
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}


                                  // value={selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName ||vendorinfo.vendor_vehicle ||''}
                                  // value={vendorinfo?.vendor_vehicle || vendorinfo?.vehicleName}
                                  value={vendorinfo?.vendor_vehicle}
                                  // value={vendorinfo?.vehicleName||vendorinfo?.vendor_vehicle}
                                  options={vehileNames?.map((option) => ({
                                    label: option,
                                  }))}
                                  // options={lockdata ? vehileNames.map((option) => ({
                                  //   label: option,
                                  // })) : []} 
                                  renderInput={(params) => (
                                    <TextField {...params} label="Rate For - F3" name="vendor_vehicle" inputRef={params.inputRef} />
                                  )}
                                />
                              </div>
                              <div className="input" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                                {/* <p style={{ margin: "0px" }}>Duty</p> */}
                                <Autocomplete
                                  fullWidth
                                  size="small"
                                  id="free-solo-duty"
                                  freeSolo
                                  sx={{ width: "100%" }}
                                  onChange={(event, value) => {
                                    if (lockdata) {
                                      handleAutocompleteVendor(event, value, "vendor_duty")
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }

                                  }}

                                  // value={vendorinfo?.vendor_duty || vendorinfo?.duty || ""}
                                  value={vendorinfo?.vendor_duty}
                                  options={Duty.map((option) => ({
                                    label: option.option,
                                  }))}
                                  renderInput={(params) => {
                                    return (
                                      <TextField {...params} label="Duty" autoComplete="password" name="vendor_duty" inputRef={params.inputRef} />
                                    )
                                  }
                                  }
                                />

                              </div>

                              <div className="input" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                                <Checkbox
                                  size="small"
                                  checked={lockdata}
                                  onChange={(event) => setLockData(event.target.checked)}
                                />
                                <p style={{ margin: "0px" }}>Lock</p>
                              </div>
                            </div>
                            <div className="input-field" style={{ marginTop: '15px' }}>
                              <div className="input" >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    label="StartDate"
                                    id="vendorshedOutDate"
                                    // value={vendorinfo.shedOutDate ? dayjs(vendorinfo.shedOutDate) : null || vendorinfo.vendorshedOutDate ? dayjs(vendorinfo.vendorshedOutDate) : null}
                                    value={vendorinfo.vendorshedOutDate ? dayjs(vendorinfo.vendorshedOutDate) : null}
                                    format="DD/MM/YYYY"
                                    // onChange={(date) => {

                                    //   handleDatevendorChange(date, 'vendorshedOutDate')
                                    // }}
                                    onChange={(date) => {
                                      if (lockdata) {
                                        handleDatevendorChange(date, 'vendorshedOutDate')
                                      } else {
                                        setWarning(true);
                                        setWarningMessage("IS not locked,locked Enter Again");
                                      }
                                    }}
                                  >
                                    {({ inputProps, inputRef }) => (
                                      <TextField {...inputProps} inputRef={inputRef} />
                                    )}
                                  </DatePicker>
                                </LocalizationProvider>

                              </div>
                              <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                  <DatePicker
                                    label="CloseDate"
                                    id="vendorshedInDate"


                                    // value={vendorinfo.shedInDate ? dayjs(vendorinfo.shedInDate) : null || vendorinfo.vendorshedInDate ? dayjs(vendorinfo.vendorshedInDate) : null}
                                    value={vendorinfo.vendorshedInDate ? dayjs(vendorinfo.vendorshedInDate) : null}
                                    format="DD/MM/YYYY"
                                    // onChange={(date) => { handleDatevendorChange(date, 'vendorshedInDate') }}
                                    onChange={(date) => {
                                      if (lockdata) {
                                        handleDatevendorChange(date, 'vendorshedInDate')
                                      } else {
                                        setWarning(true);
                                        setWarningMessage("IS not locked,locked Enter Again");
                                      }
                                    }}
                                  >
                                    {({ inputProps, inputRef }) => (
                                      <TextField {...inputProps} inputRef={inputRef} />
                                    )}
                                  </DatePicker>
                                </LocalizationProvider>


                              </div>



                              <div className="input">
                                <TextField
                                  name="vendortotaldays"
                                  value={calculatevendorTotalDays()}
                                  label="Total Days"
                                  size="small"
                                  type="number"
                                  id="totaldays"
                                  // variant="standard"
                                  sx={{ width: "100%" }}
                                />
                              </div>

                            </div>
                            <div className="input-field" style={{ marginBottom: '10px' }}>

                              <div className="input">
                                {/* <div className='icone'>
        <MdOutlineAccessTimeFilled />
      </div> */}
                                <div className='input'>
                                  <div className='full-width' style={{ display: 'grid' }}>
                                    <label>Start Time</label>
                                    <input
                                      type="time"
                                      name="venodrreporttime"

                                      // value={vendorinfo?.vendorreporttime || vendorinfo?.reporttime}
                                      value={vendorinfo?.vendorreporttime}
                                      // onChange={(event) => {
                                      //   if (lockdata) {
                                      //     setVendorinfodata({ ...vendorinfo, vendorreporttime: event.target.value });
                                      //   }

                                      onChange={(event) => {
                                        if (lockdata) {
                                          setVendorinfodata({ ...vendorinfo, vendorreporttime: event.target.value });
                                        } else {
                                          setWarning(true);
                                          setWarningMessage("IS not locked,locked Enter Again");
                                        }
                                      }}

                                      style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px 5px' }}
                                    // }}
                                    />
                                  </div>
                                </div>


                              </div>

                              <div className="input">
                                {/* 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'TimePicker',
          ]}
        >


          <DemoItem label="Closing Time">
            <TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
          </DemoItem>

        </DemoContainer>
      </LocalizationProvider> */}
                                {/* <div className='icone'>
        <MdOutlineAccessTimeFilled />
      </div> */}
                                <div className='closetime tripsheet-shed-in-time'>
                                  <label>Close Time</label>

                                  <input
                                    type="time"
                                    name="vendorshedintime"

                                    // value={vendorinfo?.vendorshedintime || vendorinfo?.shedintime}
                                    value={vendorinfo?.vendorshedintime}
                                    onChange={(event) => {
                                      if (lockdata) {

                                        setVendorinfodata({ ...vendorinfo, vendorshedintime: event.target.value });
                                      }
                                      else {
                                        setWarning(true);
                                        setWarningMessage("IS not locked,locked Enter Again");
                                      }
                                    }
                                    }
                                    style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px 5px' }}

                                  />
                                </div>
                              </div>


                              <div className="input">
                                <TextField
                                  name="vendorTotaltime"
                                  value={calculatevendorTotalTime() || ""}
                                  label="Total Time"
                                  id="pack5"
                                  size="small"
                                  // variant="standard"
                                  sx={{ width: "100%" }}
                                />
                              </div>

                            </div>

                            <div className="input-field">


                              <div className="input" >
                                <TextField
                                  name="vendorshedoutkm"

                                  // value={vendorinfo?.vendorshedoutkm || vendorinfo?.shedout || ""}
                                  value={vendorinfo?.vendorshedoutkm || ""}

                                  onChange={handlevendorinfofata}
                                  label="starting Kilometers"
                                  id="vendorshedoutkm"
                                  size="small"
                                  sx={{ my: 1, width: "100%" }}
                                />
                              </div>


                              <div className="input" >
                                <TextField
                                  name="vendorshedinkm"

                                  // value={vendorinfo?.vendorshedinkm || vendorinfo?.shedin || ""}
                                  value={vendorinfo?.vendorshedinkm || ""}



                                  label="closing Kilometers"

                                  // onChange={(e)=>{

                                  //   setVendorinfodata({...vendorinfo,vendorshedin:e.target.value})
                                  // }}
                                  onChange={handlevendorinfofata}
                                  id="vendorshedinkm"
                                  size="small"
                                  sx={{ my: 1, width: "100%" }}
                                />
                              </div>



                              <div className="input" >
                                <TextField
                                  name="vendortotalkm"
                                  value={calculatevendorTotalKilometers() || ''}
                                  label="Total kilometers"
                                  id="vendortotalkm"
                                  size="small"
                                  sx={{ my: 1, width: "100%" }}
                                />
                              </div>
                            </div>
                            <div className="input-field">



                              <div className="input">
                                <TextField
                                  name="vendorRemarks"
                                  // value={calcPackage || formData.calcPackage || ''}
                                  value={vendorinfo?.vendorRemarks || ""}
                                  // value={vendorinfo?.vendorRemarks || vendorinfo?.remark || ""}
                                  onChange={handlevendorinfofata}
                                  label="Remarks"
                                  id="vendorRemarks"
                                  size="small"
                                  // variant="standard"

                                  sx={{ my: 1, width: "100%" }}
                                />

                              </div>


                              <div className="input">
                                <Button
                                  variant='contained'
                                  onClick={handleVendorcalc}
                                >
                                  Update
                                </Button>
                              </div>
                            </div>

                          </div>
                        </TabPanel>

                        <TabPanel value={1} sx={{ p: 2 }}>
                          <div className="Customer-Customer-Bill-Slider tripsheet-vendor-bill-main tripsheet-popup-vendor-bill-vendor-info-main">
                            <div className="input-field">
                              <div className="input">
                                <TextField
                                  name="Vendor_Calcpackage"
                                  value={vendorbilldata.Vendor_Calcpackage || vendorpassvalue.Vendor_Calcpackage || 0}
                                  label="Package"
                                  id="Vendor_Calcpackage"
                                  size="small"
                                  // variant="standard"
                                  sx={{ m: 1, width: "100%" }}
                                />
                              </div>
                              <div className="input">
                                <TextField
                                  name="Vendor_rateAmount"
                                  value={vendorbilldata.Vendor_rateAmount || vendorpassvalue.Vendor_rateAmount || 0}
                                  size="small"
                                  label="Amount"
                                  autoComplete="password"
                                  id="Vendor_rateAmount"
                                // variant="standard"
                                />
                              </div>
                              <div className="" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                                <Checkbox
                                  size="small"
                                  checked={lockdatavendorbill}
                                  onChange={(event) => setLockDatavendorBill(event.target.checked)}
                                />
                                <p style={{ margin: "0px" }}>Lock</p>
                              </div>
                            </div>

                            <div className="input-field tripsheet-vendor-bill-amount-input-field">
                              {/* <span>Ex.Km</span> */}
                              <div className="input">
                                <TextField
                                  name="Vendor_ExtraKms"
                                  value={vendorbilldata.Vendor_ExtraKms || vendorpassvalue.Vendor_ExtraKms || 0}
                                  label="Ex.Km"
                                  id="Vendor_ExtraKms"
                                  onChange={handlevendor_billdata}

                                  size="small"
                                // variant="standard"
                                />
                              </div>
                              <div className="input">
                                <span>@</span>
                                <TextField size="small"
                                  name='Vendor_ExtraAmountKms'
                                  value={vendorbilldata.Vendor_ExtraAmountKms || vendorpassvalue.Vendor_ExtraAmountKms || 0}
                                  onChange={handlevendor_billdata}
                                  id="Vendor_ExtraAmountKms"
                                // variant="standard"
                                />
                              </div>
                              <div className="input">
                                <div className="icone">
                                  <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <TextField
                                  name="Vendor_totalAmountKms"
                                  // value={ vendorExtarkmTotalAmount||vendorbilldata.Vendor_totalAmountKms || vendorExtarkmTotalAmount || vendorpassvalue.Vendor_totalAmountKms || 0}
                                  value={vendorExtarkmTotalAmount || vendorbilldata.Vendor_totalAmountKms || vendorpassvalue.Vendor_totalAmountKms || 0}
                                  size="small"
                                  label="Amount"
                                  id="Vendor_totalAmountKms"
                                // variant="standard"
                                />
                              </div>
                            </div>

                            <div className="input-field tripsheet-vendor-bill-amount-input-field">
                              {/* <span>Ex.Hr</span> */}
                              <div className="input">
                                <TextField
                                  name="Vendor_ExtraHours"
                                  value={vendorbilldata.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours || 0}
                                  label="Ex.Hrs"
                                  onChange={handlevendor_billdata}
                                  id="Vendor_ExtraHours"
                                  size="small"
                                // variant="standard"
                                />
                              </div>
                              <div className="input">
                                <span>@</span>
                                <TextField
                                  size="small"
                                  name='Vendor_ExtraAmountHours'
                                  value={vendorbilldata.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours || 0}
                                  onChange={handlevendor_billdata}
                                  // variant="standard
                                  id="Vendor_ExtraAmountHours"
                                />

                              </div>
                              <div className="input">
                                <div className="icone">
                                  <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <TextField
                                  name="Vendor_totalAmountHours"
                                  // value={vendorbilldata.Vendor_totalAmountHours || vendorExtrahrTotalAmount || vendorpassvalue.Vendor_totalAmountHours || 0}
                                  value={vendorExtrahrTotalAmount || vendorbilldata.Vendor_totalAmountHours || vendorpassvalue.Vendor_totalAmountHours || 0}
                                  size="small"
                                  label="Amount"
                                  id="Vendor_totalAmountHours"
                                // variant="standard"
                                />
                              </div>
                            </div>
                            <div className="input-field tripsheet-vendor-bill-amount-input-field">
                              {/* <span>Night</span> */}
                              <div className="input">
                                <TextField
                                  name="Vendor_NightHALT"
                                  // value={vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT || 0}
                                  value={vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT || 0}
                                  onChange={handlevendor_billdata}
                                  label="Night"
                                  id="Vendor_NightHALT"
                                  size="small"
                                // variant="standard"
                                />
                              </div>
                              <div className="input">
                                <span>@</span>
                                <TextField
                                  size="small"
                                  name='Vendor_NightBataAmount'
                                  value={vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount || 0}
                                  onChange={handlevendor_billdata}
                                  id="Vendor_NightBataAmount"
                                  // variant="standard"
                                  autoComplete="password"
                                />
                              </div>
                              <div className="input">
                                <div className="icone">
                                  <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <TextField
                                  name="Vendor_NightbataTotalAmount"
                                  value={vendornightdatatotalAmount || vendorbilldata.Vendor_NightbataTotalAmount || vendorpassvalue.Vendor_NightbataTotalAmount || 0}
                                  size="small"
                                  label="Amount"
                                  id="Vendor_NightbataTotalAmount"
                                // variant="standard"
                                />
                              </div>
                            </div>
                            <div className="input-field tripsheet-vendor-bill-amount-input-field">
                              {/* <span>Bata</span> */}
                              <div className="input">
                                <TextField
                                  name="Vendor_Bata"
                                  value={vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata || 0}
                                  onChange={handlevendor_billdata}
                                  label="Bata"
                                  id="Vendor_Bata"
                                  autoComplete="password"
                                  size="small"
                                // variant="standard"
                                />
                              </div>
                              <div className="input">
                                <span>@</span>
                                <TextField
                                  size="small"
                                  name='Vendor_BataAmount'
                                  value={vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount || 0}
                                  onChange={handlevendor_billdata}
                                  // variant="standard"
                                  id="Vendor_BataAmount"
                                />
                              </div>
                              <div className="input">
                                <div className="icone">
                                  <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <TextField
                                  name="Vendor_BataTotalAmount"
                                  value={vendorbilldata.Vendor_BataTotalAmount || vendorpassvalue.Vendor_BataTotalAmount || 0}
                                  size="small"
                                  label="Amount"
                                  id="Vendor_BataTotalAmount"
                                // variant="standard"
                                />
                              </div>
                            </div>
                            <div className="input-field">
                              <div className="input">
                                <TextField
                                  name="Vendor_FULLTotalAmount"
                                  value={vendorbilldata.Vendor_FULLTotalAmount || 0}
                                  size="small"

                                  label="Net Amount"
                                  id="Vendor_FULLTotalAmount"
                                // variant="standard"
                                />

                              </div>
                            </div>

                          </div>
                        </TabPanel>

                        <TabPanel value={2} sx={{ p: 2 }}>
                          <div className="Customer-Customer-Bill-Slider Customer-Customer-Bill-Slider-popup">
                            <div className="input-field">
                              {/* <div className="input">
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
                              </div> */}
                              <div className="input">
                                <div className="icone">
                                  <Inventory2Icon color="action" />
                                </div>

                                <TextField
                                  name="pack"
                                  value={calcPackage || formData.calcPackage || ratepackage || ''}
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
                              <div className="" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                                <Checkbox
                                  size="small"
                                  checked={lockdatacustomerbill}
                                  onChange={(event) => setLockDatacustomerBill(event.target.checked)}
                                />
                                <p style={{ margin: "0px" }}>Lock</p>
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
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setExtraKM(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setextrakm_amount(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  value={extraHR || formData.calcPackage || 0}
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setExtraHR(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  value={extrahr_amount || formData.calcPackage || 0}
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setextrahr_amount(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  // value={(checkNightBetaEligible() ? nightBta : 0) || ''}
                                  value={nightBta}

                                  // onChange={(e) => setNightBeta(e.target.value)}
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setNightBeta(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  value={nightCount}
                                  // onChange={(e) => setNightCount(e.target.value)}
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setNightCount(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  // value={night_totalAmount || 0}
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
                                  value={driverBeta}
                                  // value={(vendorinfo?.vendor_duty === "Outstation") && driverBeta || formData.driverBeta || 0}
                                  // onChange={(e) => setdriverBeta(e.target.value)}
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setdriverBeta(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  value={driverbeta_Count}
                                  // value={(vendorinfo?.vendor_duty === "Outstation") ? (driverbeta_Count || formData.driverbeta_Count || '') : 0}

                                  // onChange={(e) => setdriverbeta_Count(e.target.value)}
                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setdriverbeta_Count(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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
                                  value={driverBeta_amount}
                                  // value={(vendorinfo?.vendor_duty === "Outstation") ? driverBeta_amount : 0}
                                  // onChange={(e) => setdriverBeta_amount(e.target.value)}

                                  onChange={(e) => {

                                    if (lockdatacustomerbill) {
                                      setdriverBeta_amount(e.target.value)
                                    } else {
                                      setWarning(true);
                                      setWarningMessage("IS not locked,locked Enter Again");
                                    }
                                  }}
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

                          </div>
                        </TabPanel>
                        <TabPanel value={3} sx={{ p: 2 }}>
                          <div className="Customer-Gps-att-Slider tripsheet-vendor-gps-att-main">
                            <div className="input-field">
                              {/* <div className="input">
                                <Button variant='outlined' className='full-width'>View GPS TripSheet</Button>
                              </div> */}
                              <div className="input">
                                <Button onClick={handleTripmapClick} variant='outlined' className='full-width'>View GPS Map</Button>
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
                                <Button onClick={handleTripmaplogClick} variant='outlined' className='full-width'>View GPS Log</Button>
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
                              {/* <div className="input">
                                <Button variant='outlined' className='full-width'>View Closing</Button>
                              </div> */}
                            </div>
                            <div className="input-field" style={{ marginTop: '10px' }}>
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
                              <Modal
                                open={openEditMapLog}
                                onClose={handleCloseMapLog}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <div>
                                      <TextField type="date"
                                        value={selectedMapRow?.date || ''}
                                        onChange={(e) => setSelectedMapRow({ ...selectedMapRow, date: e.target.value })} />
                                    </div>
                                    <div>
                                      <TextField type="time"
                                        value={selectedMapRow?.time || ''}
                                        onChange={(e) => setSelectedMapRow({ ...selectedMapRow, time: e.target.value })} />
                                    </div>
                                    <div>

                                      <Button onClick={handleEditMapDetails}>Submit</Button>
                                    </div>
                                  </div>

                                </Box>
                              </Modal>
                              {/* <div className="input">
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
                              </div> */}
                              <div className="input">
                                <Button variant="contained" onClick={handleUpload} className='full-width'>Select File & Upload</Button>
                              </div>
                            </div>
                            <div className="input-field" style={{ marginTop: '20px' }}>
                              {/* <div className="input">
                                <div className="icone">
                                  <MarkChatReadIcon color="action" />
                                </div>
                                <TextField
                                  size="small"
                                  sx={{ m: 1, width: "300ch" }}
                                  variant="standard"
                                  autoComplete="password"
                                />
                              </div> */}
                              <div className="input">
                                <Button variant="outlined" onClick={handleRefresh} className='full-width'>Refresh</Button>
                              </div>
                              <div className="input">
                                <Button onClick={handlesignatureimages} variant="contained" className='full-width'>signature</Button>
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
                            <div className="input-field" style={{ marginTop: '10px' }}>
                              <div className="input">
                                <Button onClick={handleButtonClick} variant='outlined' className='full-width'>Manual Marking</Button>
                            
                              </div>
                              <div>
                              <Button variant='outlined' className='full-width' onClick={handleEditMap}>Edit Map</Button>
                              <Button variant='outlined' className='full-width' onClick={handleDeleteMap}>Delete Map</Button>
                              </div>
                              {/* <div className="input">
                                <Button variant='outlined' className='full-width'>Delete GPS Log</Button>
                              </div> */}
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
                            {/* 
                    <Dialog open={imgpopupOpen} onClose={handleimgPopupClose} maxWidth="md" fullWidth
                      PaperProps={{
                        style: {
                          width: 'fit-content',
                          maxWidth: '90%',
                          padding: '10px'
                        }
                      }}
                    >
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
                    </Dialog> */}
                            <Dialog
                              open={imgpopupOpen}
                              onClose={handleimgPopupClose}
                              maxWidth="md"
                              fullWidth
                              PaperProps={{
                                style: {
                                  width: 'fit-content',
                                  maxWidth: '90%',
                                  padding: '10px',
                                },
                              }}
                            >
                              <DialogContent
                                style={{
                                  padding: '7px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                {selectedRow && (
                                  <>
                                    {imageUrl && imageUrl.endsWith('.pdf') ? (
                                      <embed
                                        src={imageUrl}
                                        title="PDF Viewer"
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '600px',
                                          width: '100%',
                                          height: '600px',
                                          border: 'none',
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={imageUrl}
                                        alt="Embedded Content"
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '600px',
                                          objectFit: 'contain',
                                        }}
                                      />
                                    )}
                                  </>
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
                                <Button
                                  onClick={handleimgPopupClose}
                                  variant="contained"
                                  color="primary"
                                >
                                  Cancel
                                </Button>
                              </DialogActions>
                            </Dialog>

                          </div>
                        </TabPanel>
                        <TabPanel value={4} sx={{ p: 2 }}>
                          <div className="Customer-Message-Slider">
                            <div className="input-field">
                              {/* <div>
                              
                                <Button onClick={generateAndCopyLinkdata}>Generate Link</Button>

                                {appsstatus !== "Closed" && signaturelinkwhatsapp && <WhatsappShareButton url={signaturelinkwhatsapp} title={"Please Click the linke to close E-Tripsheet-"} separator=" - ">

                                  <button>Share on WhatsApp</button>
                                </WhatsappShareButton>
                                }

                                {signaturelinkcopy ? <p style={{ color: 'green' }}>Link Copied......</p> : <></>}
                              </div> */}
                              <div>
                                {/* <Button onClick={generateLink}>Generate Link</Button> */}
                                <Button onClick={generateAndCopyLinkdata}>Generate Link</Button>

                                {appsstatus !== "Closed" && signaturelinkwhatsapp && <WhatsappShareButton url={signaturelinkwhatsapp} title={"Please Click the linke to close E-Tripsheet-"} separator=" - ">

                                  <button>Share on WhatsApp</button>
                                </WhatsappShareButton>
                                }

                                {signaturelinkcopy ? <p style={{ color: 'green' }}>Link Copied......</p> : <></>}
                              </div>
                              <div>
                                <Button variant="contained" color="primary" onClick={handleRefreshsign}>
                                  Refresh
                                </Button>
                              </div>
                            </div>

                            <div className="table-TripSheet" style={{ marginTop: '15px' }}>
                              <div className='tripsheet-booking-table'>
                                <DataGrid
                                  rows={rowsignature}
                                  columns={columnssignature}
                                  onRowClick={handleTripsignaturedata}
                                  pageSize={5}
                                />
                              </div>
                            </div>
                          </div>
                        </TabPanel>

                      </Tabs>
                      <DialogActions className='tripsheet-cancel-save-btn'>
                        <Button className='tripsheet-cancel-button' onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleClose} autoFocus>
                          Save
                        </Button>
                      </DialogActions>
                    </div>
                    {/* <DialogTitle id="alert-dialog-title">
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
              // value={(checkNightBetaEligible() ? nightBta : 0) || ''}
              value={(checkNightBetaEligible() ? nightBta : 0) || ''}

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
              // value={night_totalAmount || 0}
              value={(checkNightBetaEligible() ? night_totalAmount : 0) || ''}

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
              // value={driverBeta || formData.driverBeta || ''}
              value={(vendorinfo?.vendor_duty === "Outstation") && driverBeta || formData.driverBeta || ''}
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
              // value={driverbeta_Count || formData.driverbeta_Count || ''}
              value={(vendorinfo?.vendor_duty === "Outstation") ? (driverbeta_Count || formData.driverbeta_Count || '') : ""}

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
              // value={driverBeta_amount || 0}
              value={(vendorinfo?.vendor_duty === "Outstation") ? driverBeta_amount : 0}
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
  </DialogActions> */}


                  </Dialog>
                </React.Fragment>

                <div className="input">
                  <div className="icone">
                    <BackupTableSharpIcon color="action" />
                  </div>
                  <TextField
                    // margin="normal"
                    size="small"
                    name="vpermettovendor"
                    value={formData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor || ""}
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e)
                      setVendorinfodata({ ...vendorinfo, vendor_vpermettovendor: e.target.value })
                    }}
                    label="V permet To Vendor"
                    id="vpermettovendor"
                    autoComplete="password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <MinorCrashSharpIcon color="action" />
                  </div>
                  <TextField
                    // margin="normal"
                    size="small"
                    name="vendortoll"
                    value={formData.vendortoll || selectedCustomerData.vendortoll || book.vendortoll || ""}
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e)
                      setVendorinfodata({ ...vendorinfo, vendor_toll: e.target.value })
                    }}
                    label="Vendor Toll"
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
                    label="Customer Customer Advance"
                    id="customer-advance"
                    autoComplete="password"
                  />
                </div>
                <div className="input tripsheet-calculate-input">
                  <Button variant="contained"
                    onClick={() => {
                      // handleCalc();
                      handleClickOpen();
                    }}
                  >
                    calculate
                  </Button>
                </div>
                <div className="input tripsheet-e-tripsheet-input">
                  <Button startIcon={<BorderColorIcon />} variant="outlined" onClick={handleETripsheetClick} >
                    E-Tripsheet
                  </Button>
                </div>

                <div className="input tripsheet-remarks-division">
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
                    rows={3}
                    sx={{ width: "100%" }}
                    autoComplete="password"
                  />
                </div>

                <div className='input d-grid'>

                  <Box sx={{ minWidth: '100%' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Escort</InputLabel>
                      <Select
                        labelId="demo-simple-select-labelescort"
                        id="demo-simple-select"
                        // value={bookingStatus}
                        value={escort}
                        // label="Status"
                        onChange={handleEscortChange}
                      >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* <label>Escort</label>
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
                  </span> */}
                </div>

                <div className='input d-grid'>

                  <Box sx={{ minWidth: '100%' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Airport Transfer</InputLabel>
                      <Select
                        labelId="demo-simple-select-labelescort"
                        id="demo-simple-select"
                        value={transferreport}
                        // label="Status"
                        onChange={handleTransferChange}
                      >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                </div>

                <Dialog open={popupOpen} onClose={handlePopupClose} maxWidth="md">
                  {/* <DialogContent style={{ width: '210mm', maxWidth: 'none' }}>
                    {isHybridCustomer ? (<InvoiceHCL customerAddress={customerAddress} fueltype={fueltype} pack={calcPackage || formData.calcPackage} airportTransfer={transferreport} tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={logoImage} attachedImage={attachedImage} routeData={routeData} formData={calculateTotalTimes} book={book} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} totalhour={formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || ''} />)
                      : (<Invoice tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={logoImage} attachedImage={attachedImage} routeData={routeData} Totaltimes={calculateTotalTimes()} book={book} TotalDays={calculateTotalDay()} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} totalkm={calculateTotalKilometers() || ''} />)}
                  </DialogContent> */}
                  <DialogContent style={{ width: '210mm', maxWidth: 'none' }}>
                    {isHybridCustomer ? (<InvoiceHCL customerAddress={customerAddress} fueltype={fueltype} pack={calcPackage || formData.calcPackage} airportTransfer={transferreport} tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={logoImage} attachedImage={attachedImage} routeData={routeData} Totaltimes={calculateTotalTimes()} TotalDays={calculateTotalDay()} book={book} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} totalkm={calculateTotalKilometers() || ''} />)
                      : (<Invoice tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={logoImage} attachedImage={attachedImage} routeData={routeData} Totaltimes={calculateTotalTimes()} book={book} TotalDays={calculateTotalDay()} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} totalkm={calculateTotalKilometers() || ''} />)}
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
                    <CurrencyRupeeTwoToneIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    name="advancepaidtovendor"
                    value={formData.advancepaidtovendor || selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor || ""}
                    // onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e)
                      setVendorinfodata({ ...vendorinfo, vendor_advancepaidtovendor: e.target.value })
                    }}
                    label="Advance Paid To Vendor"
                    id="advance-paid-to-vendor"
                    autoComplete="password"
                  />
                </div>

                <div className="vehicle-confirm-tripsheet">
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
                      {/* <TextField
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
                          // variant="standard"
                          size='small'
                        /> */}


                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-travelmail"
                        freeSolo
                        sx={{ width: "100%" }}
                        onChange={(event, value) => handletravelsAutocompleteChange(event, value, "travelsname ")}
                        value={
                          selectedCustomerDatas.travelsname ||
                          formData.travelsname ||
                          selectedCustomerData.travelsname ||
                          book.travelsname ||
                          ""
                        }
                        options={accountinfodata.map((option) => ({
                          label: option?.travelsname,
                        }))}
                        getOptionLabel={(option) => option.label || selectedCustomerDatas.travelsname ||
                          formData.travelsname ||
                          selectedCustomerData.travelsname ||
                          book.travelsname ||
                          ""}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Travels Name" name="travelsname" inputRef={params.inputRef} />
                          )
                        }
                        }
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
                        // value={formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || ''}
                        value={selectedCustomerDatas.vehRegNo || formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || book.vehRegNo || ''}
                        onChange={handleChange}
                        autoComplete="password"
                        onKeyDown={handleKeyEnterDriverDetails}
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
                        id="free-solo-vehileName2"
                        freeSolo
                        sx={{ width: "100%" }}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleName2")}
                        value={selectedCustomerDatas.vehicleName2 || formData.vehicleName2 || selectedCustomerData.vehicleName2 || formValues.vehicleName2 || packageData.vehicleName2 || book.vehicleName2 || ''}
                        options={vehileNames?.map((option) => ({
                          label: option,
                        }))}
                        renderInput={(params) => (
                          <TextField {...params} label="Vehicle Name" autoComplete="password" name="vehicleName2" inputRef={params.inputRef} />
                        )}
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
                        onChange={(event, value) => {
                          handleAutocompleteChange(event, value, "vehicleName")
                          if (!lockdata) {
                            setVendorinfodata({ ...vendorinfo, vendor_vehicle: value.label })

                          }
                        }}
                        value={selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName || ''}
                        options={vehileNames?.map((option) => ({
                          label: option,
                        }))}
                        renderInput={(params) => (
                          <TextField {...params} label="Rate For" autoComplete="password" name="vehicleName" inputRef={params.inputRef} />
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
                        // value={(selectedCustomerDatas.Groups || formData.Groups || selectedCustomerData.Groups || formValues.Groups || packageData.Groups || book.Groups) ? (formData.Groups || selectedCustomerData.Groups || formValues.Groups || selectedCustomerDatas.Groups || packageData.Groups || book.Groups) : null}
                        // options={GroupTypes?.map((option) => ({
                        //   label: option?.Option,
                        // }))}
                        value={
                          selectedCustomerDatas.Groups || formData.Groups ||
                          selectedCustomerData.Groups ||
                          book.Groups || ""
                        }
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
                          if (!lockdata) {
                            setVendorinfodata({ ...vendorinfo, driverName: e.target.value })
                          }
                        }}

                        label="Driver Name"
                        id="driverName"
                        // variant="standard"
                        size='small'
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
                        // value={formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || ''}
                        value={selectedCustomerDatas.mobileNo || formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo || ''}
                        onChange={handleChange}
                        label="Cell"
                        id="mobileNo"
                        // variant="standard"
                        size='small'
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
                          selectedCustomerDatas.travelsemail ||
                          formData.travelsemail ||
                          selectedCustomerData.travelsemail ||
                          book.travelsemail ||
                          ""
                        }
                        onChange={handleChange}
                        label="Travels Email"
                        id="travelsemail"
                        // variant="standard"
                        size='small'
                      />
                    </div>
                  </div>
                  <div>
                    <div className="Scroll-Styles tripsheet-table1">
                      <table>

                        <thead>
                          <tr>
                            <th className="table-head-booking table-heading-1"> Driver name</th>
                            {/* <th className="table-head-booking">Driver phone</th> */}
                            <th className="table-head-booking">Vehicle Name</th>
                            {/* <th className="table-head-booking">Vehicle Type</th> */}
                            <th className="table-head-booking">Vehicle Reg No</th>
                            {/* <th className="table-head-booking">HireTypes</th> */}
                            {/* <th className="table-head-booking">Grouphs</th> */}
                            {/* <th className="table-head-booking">Active</th> */}
                            <th className="table-head-booking">Travels Name</th>
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
                                {/* <td>{row.mobileNo}</td> */}
                                <td>{row.vehicleName}</td>
                                {/* <td>{row.vechtype}</td> */}
                                <td>{row.vehRegNo}</td>
                                {/* <td>{row.hiretypes}</td> */}
                                {/* <td>{row.Groups}</td> */}
                                {/* <td>{row.active}</td> */}
                                <td>{row.travelsname}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>

              </div>

              {/* )} */}


            </div>

            <div>
              <Box className="common-speed-dail">
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