import React, { useEffect, useContext, useState, useRef } from 'react';
import { CopyField } from '@eisberg-labs/mui-copy-field';
import EditMapComponent from './NavigationMap/EditMapComponent';
import EditMapCheckComponent from './NavigationMap/EditMapCheckComponent';
import { Typography, IconButton } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import "./TripSheet.css";
import {
  Apps,
  Status,
  HireTypes,
  OuststationStatus,
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
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MinorCrashSharpIcon from "@mui/icons-material/MinorCrashSharp";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
// FontAwesomeIcon Link
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faStamp } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { PermissionContext } from '../../context/permissionContext';
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
import { WhatsappShareButton } from 'react-share';
import LoadingButton from '@mui/lab/LoadingButton';
// UpdateTbaleRowsGPSSlider TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 60 },
  { field: "documenttype", headerName: "Document Type", width: 180 },
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

const style1 = {
  position: 'absolute',
  top: '50%',
  // height: '80%',
  height: 'fit-content',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 1300,
  width: "90%",
  bgcolor: 'background.paper',
  // bgcolor: 'yellow',
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};


const TripSheet = ({ stationName, logoImage }) => {

  const stationOptions = stationName?.filter(option => option?.Stationname !== "All")

  const {
    selectedCustomerData,
    driverBeta, driverbeta_Count, nightBta, nightCount,
    selectedCustomerId, setNightBeta, setNightCount,
    vehileNames,
    rows,
    handleimagedelete, maplogcolumns,
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
    vechiledata,
    handleVehicleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleKeyDown,
    handleDateChange,
    handleAutocompleteChange,
    setFormValues,
    packageData,
    smsguest,
    sendEmail,
    setSendEmail,
    handleDriverChange,
    handleKeyEnterdriver,
    drivername,
    formValues,
    selectedCustomerDatas,
    setDriverSMS,
    DriverSMS,
    setStartTime,
    setBook,
    setFormData,
    setSelectedCustomerData,
    selectedStatus,
    // setSelectedStatus, 
    setCloseTime,
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
    GmapimageUrl,
    handleTripmapClick,
    mapimgpopupOpen,
    handleimgPopupClose,
    mapimageUrls,
    handleTripmaplogClick,
    maplogimgpopupOpen,
    row,
    handleUpload,
    //  isHybridCustomer,
    handleRefresh,
    // handleButtonClick,
    handleTripRowClick,
    imgpopupOpen,
    selectedRow,
    imageUrl,
    isEditMode,
    handleEdit,
    driverdetails,
    calcPackage, extraHR, extraKM, package_amount,
    extrakm_amount, extrahr_amount,
    ex_kmAmount, ex_hrAmount, night_totalAmount,
    driverBeta_amount, setdriverBeta, setdriverbeta_Count, setdriverBeta_amount,
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
    maxconflict, setExtraKM, setextrakm_amount, setExtraHR, setextrahr_amount, handleRefreshsign, groupTripId,
    handleEditMap,
    handleDeleteMap, copydatalink, setCopyDataLink,
    //  conflictenddate,
    mapPopUp, setMapPopUp, manualTripID, calculatewithoutadditonalhour, hybridhclcustomer, setSuccess,
    setSuccessMessage,
    // timeToggle,HclKMCalculation,

    hybridhclnavigate, isAddload, setisAddload, isEditload, setisEditload, hideField, temporaryStatus, emptyState, editButtonStatusCheck, conflictCompareDatas,
    userStatus, minTimeData, maxTimeData, shedInTimeData, conflictLoad, selectedStatuschecking, openModalConflict, setOpenModalConflict,
    setError, setErrorMessage,outStationHide
  } = useTripsheet();
  const { getHtmlContentdata } = CopyEmailHtmlcontent();
  const dayhcl = hybridhclcustomer || hybridhclnavigate
  // console.log(dayhcl,"dayhcl",hybridhclcustomer,"nnnnn",hybridhclnavigate)
  const apiurl = APIURL
  // Permission ------------ayyan

  const { permissions } = useContext(PermissionContext)
  const fileInputRefdata = useRef(null);

  // const Tripsheet_read = permissions[3]?.read;
  const superpower = localStorage.getItem("SuperAdmin")
  const Tripsheet_new = permissions[3]?.new;
  const Tripsheet_modify = permissions[3]?.modify;
  const Tripsheet_delete = permissions[3]?.delete;
  const billing_read = permissions[4]?.read;

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

  // const handlesignatureimages = async () => {
  //   const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;
  //   // await getSignatureImage()
  //   if (!tripid) {

  //     setWarning(true);
  //     setWarningMessage("Enter The Tripid")
  //     return
  //   }
  //   const response = await fetch(`${apiurl}/get-signimage/${tripid}`);   /// prob004
  //   if (response.status === 200) {
  //     const imageUrl = URL.createObjectURL(await response.blob());
  //     setSignImageUrl(imageUrl);
  //     setSignaturepopup(true);
  //   }
  //   else if (signimageUrl === "") {
  //     if (fileInputRefdata.current) {
  //       fileInputRefdata.current.click();
  //       setSignatureupload(false)

  //     } else {
  //       console.error("File input ref is not available");
  //     }
  //   } else {
  //     setSignaturepopup(true);
  //     getSignatureImage()
  //   }
  // }

  /// changes 
  // const handlesignatureimages = async () => {
  //   const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;

  //   if (!tripid) {
  //     setWarning(true);
  //     setWarningMessage("Enter The Tripid");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${apiurl}/get-signimage/${tripid}`);

  //     if (response.status === 200) {
  //       const imageUrl = URL.createObjectURL(await response.blob());
  //       setSignImageUrl(imageUrl);
  //       setSignaturepopup(true);
  //       setSuccess(true)
  //       setWarning(false);
  //       setSuccessMessage("Signature loaded successfully!");
  //     } else if (signimageUrl === "") {
  //       if (fileInputRefdata.current) {
  //         fileInputRefdata.current.click();
  //         setSignatureupload(false);
  //         setSuccessMessage("Please upload a signature image.");
  //       } else {
  //         console.error("File input ref is not available");
  //       }
  //     } else {
  //       setSignaturepopup(true);
  //       getSignatureImage();
  //       setSuccessMessage("Signature loaded successfully!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching signature image:", error);
  //     setWarning(true);
  //     setWarningMessage("Failed to fetch signature image. Please try again.");
  //   }
  // };

  const handlesignatureimages = async () => {
    const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid;

    if (!tripid) {
      setWarning(true);
      setWarningMessage("Enter The Tripid");
      return;
    }

    try {
      const response = await fetch(`${apiurl}/get-signimage/${tripid}`);

      if (response.status === 200) {
        const imageUrl = URL.createObjectURL(await response.blob());
        setSignImageUrl(imageUrl); // Update state
        setSignaturepopup(true);
        setSuccess(true);
        setWarning(false);
        setSuccessMessage("Signature loaded successfully!");
      } else {
        setSignImageUrl(""); // Clear state
        if (fileInputRefdata.current) {
          fileInputRefdata.current.click();
          setSignatureupload(false);
          setSuccessMessage("Please upload a signature image.");
        } else {
          console.error("File input ref is not available");
        }
      }
    } catch (error) {
      console.error("Error fetching signature image:", error);
    }
  };


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
      }
    }
  }

  // Map PopUp Close
  const mapPopUpbox = localStorage.getItem('MapBoxClose');

  useEffect(() => {
    if (mapPopUpbox === '1') {
      setMapPopUp(false)
      localStorage.removeItem('MapBoxClose')
    }
  }, [mapPopUpbox])

  const tripID = book.tripid || selectedCustomerData.tripid || formData.tripid;
  // const shedOuttime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
  const customer = formData.customer || selectedCustomerData.customer || book.customer || packageData.customer;

  // const checkTimeandDateConflict = () => {
  //   if (ClosedTripData.length < 1 || !ClosedTripData) return

  //   let time = "00:00", tripid = null;
  //   for (const trip of ClosedTripData) {
  //     const shedInDate = new Date(trip.shedInDate);
  //     const parsedShedindate = new Date(shedInDate.getFullYear(), shedInDate.getMonth(), shedInDate.getDate());

  //     if ((parcedShedOutDate.getDate() === parsedShedindate.getDate()) && (parcedShedOutDate.getMonth() === parsedShedindate.getMonth()) && (parcedShedOutDate.getFullYear() === parsedShedindate.getFullYear())) {
  //       if (time < trip.shedintime) {
  //         time = trip.shedintime;
  //         tripid = trip.tripid;
  //       }
  //     }
  //   }
  //   if (shedOuttime && time) {
  //     if (shedOuttime <= time) {

  //       const sendLabel = (tripID !== tripid) ? <p style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Conflict maxTime :{time} | {tripid}</p> : null

  //       return sendLabel;
  //     }
  //     return
  //   } else {
  //     return
  //   }
  // }

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
    requestno: selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request,
    vehRegNo: formData.vehRegNo || selectedCustomerDatas.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || book.vehRegNo,
    mobileNo: formData.mobileNo || selectedCustomerDatas.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || book.mobileNo || '',
    vehType: selectedCustomerDatas.vehicleName || formData.vehicleName || selectedCustomerData.vehicleName || formValues.vehicleName || packageData.vehicleName || book.vehicleName,
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

  const checkForConflict = () => {
    // console.log(conflictCompareDatas, "data", conflictCompareDatas?.conflictmaxdate)
    // console.log(conflictenddate, "data2")
    const reportTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    const shedOutDate = dayjs(formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate).format("DD-MM-YYYY")
    const shedindate = formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate;
    const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid || '';
    // const formattedLatestTime = maxDateData.row?.latestTime?.replace(":", ".")
    // const finalLatestTime = parseFloat(formattedLatestTime).toFixed(2);
    const shedinTimeFormat = reportTime?.replace(":", ".")
    const finalshedinTimeFormat = parseFloat(shedinTimeFormat)?.toFixed(2);
    const lastestTimeFormat = conflictCompareDatas?.latestTime?.replace(":", ".")
    const leastTimeFormat = conflictCompareDatas?.leastTime?.replace(":", ".")
    const finallastestTimeFormat = parseFloat(lastestTimeFormat)?.toFixed(2)
    const finalleastTimeFormat = parseFloat(leastTimeFormat)?.toFixed(2)
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr?.split('-');
      return new Date(`${year}-${month}-${day}`);
    };
    const finalshedouttime = parseDate(shedOutDate || "")
    const finalmaxtime = parseDate(conflictCompareDatas?.conflictmaxdate || "")
    finalshedouttime?.setHours(0, 0, 0, 0);
    finalmaxtime?.setHours(0, 0, 0, 0);

    const finalShedoutFormat = parseFloat(finalshedinTimeFormat).toFixed(2)
    const finalLatestFormat = parseFloat(finallastestTimeFormat).toFixed(2)

    const isEqual = (

      // isEditMode &&
      conflictCompareDatas?.conflictmaxdate !== null &&
      conflictCompareDatas?.tripids !== null &&
      conflictCompareDatas?.tripids !== tripid &&
      finalshedouttime.getDate() === finalmaxtime.getDate() &&
      finalshedouttime.getMonth() === finalmaxtime.getMonth() &&
      finalshedouttime.getFullYear() === finalmaxtime.getFullYear() &&

      // !shedindate &&
      // reportTime <= conflictCompareDatas?.latestTime &&
      parseFloat(finalShedoutFormat || 0) === parseFloat(finalLatestFormat || 0)
      //  (parseFloat(a || 0) === parseFloat(b || 0) || parseFloat(a) < parseFloat(b) )
      // shedOutDate === conflictCompareDatas?.conflictmaxdate

    )

    const isLessThan = (
      // isEditMode &&
      conflictCompareDatas?.conflictmaxdate !== null &&
      conflictCompareDatas?.tripids !== null &&
      // conflictCompareDatas?.tripids !== tripID &&
      // !shedindate &&
      finalshedouttime.getDate() === finalmaxtime.getDate() &&
      finalshedouttime.getMonth() === finalmaxtime.getMonth() &&
      finalshedouttime.getFullYear() === finalmaxtime.getFullYear() &&
      parseFloat(finalShedoutFormat) === parseFloat(finalleastTimeFormat) &&
      parseFloat(finalShedoutFormat) <= parseFloat(finalLatestFormat)
      // Check if shedOutDate is less than conflictenddate
    );


    return isEqual;
  };


  const checkingMinimumData = () => {

    const reportTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    const shedOutDate = dayjs(formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate).format("DD-MM-YYYY")
    const shedindate = formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate;
    const shedintime = formData.shedintime || selectedCustomerData.shedintime || book.shedintime || '';
    const shedintimeformat = shedintime.replace(":", ".");
    const finalshedincalc = parseFloat(shedintimeformat).toFixed(2);
    const shedoutTimeFormat = reportTime?.replace(":", ".")
    const finalShedOutTime = parseFloat(shedoutTimeFormat).toFixed(2)
    const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid || '';
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr?.split('-');
      return new Date(`${year}-${month}-${day}`);
    };
    const minDate = dayjs(minTimeData?.date).format("DD-MM-YYYY")
    const maxDate = dayjs(maxTimeData?.date).format("DD-MM-YYYY")
    const finalshedoutdate = parseDate(shedOutDate || "");
    finalshedoutdate?.setHours(0, 0, 0, 0);
    const finalMindate = parseDate(minDate || "")
    finalMindate?.setHours(0, 0, 0, 0);
    const finalMaxdate = parseDate(maxDate || "")
    finalMaxdate?.setHours(0, 0, 0, 0);

    const equalDateCheck = (
      minTimeData?.tripid !== undefined &&
      tripid !== parseInt(minTimeData?.tripid) &&
      tripid !== parseInt(maxTimeData?.tripid) &&
      finalshedoutdate.getDate() === finalMindate.getDate() &&
      finalshedoutdate.getMonth() === finalMindate.getMonth() &&
      finalshedoutdate.getFullYear() === finalMindate.getFullYear() &&
      parseFloat(finalShedOutTime) >= parseFloat(minTimeData?.time) &&
      parseFloat(finalShedOutTime) <= parseFloat(maxTimeData?.time)

    )

    const minimumTimeNotAllowed = (
      minTimeData?.tripid !== undefined &&
      tripid !== parseInt(minTimeData?.tripid) &&
      finalshedoutdate.getDate() === finalMindate.getDate() &&
      finalshedoutdate.getMonth() === finalMindate.getMonth() &&
      finalshedoutdate.getFullYear() === finalMindate.getFullYear() &&
      !parseFloat(finalShedOutTime) >= parseFloat(minTimeData?.time) &&
      !parseFloat(finalShedOutTime) <= parseFloat(maxTimeData?.time))

    const maximumTimeNotAllowed = (
      maxTimeData?.tripid !== undefined &&
      tripid !== parseInt(maxTimeData?.tripid) &&
      finalshedoutdate.getDate() === finalMindate.getDate() &&
      finalshedoutdate.getMonth() === finalMindate.getMonth() &&
      finalshedoutdate.getFullYear() === finalMindate.getFullYear() &&
      parseFloat(finalShedOutTime) >= parseFloat(minTimeData?.time) &&
      parseFloat(finalShedOutTime) <= parseFloat(maxTimeData?.time)
    )



    return equalDateCheck || minimumTimeNotAllowed
  }

  const maxShedInDate = () => {
    const shedindate = dayjs(formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate).format("DD-MM-YYYY");
    const maximumShedInDate = dayjs(shedInTimeData?.[0]?.shedindate || "")?.format("DD-MM-YYYY")
    const shedOutDate = dayjs(formData.shedOutDate || selectedCustomerData.shedOutDate || book.shedOutDate).format("DD-MM-YYYY")
    const reportTime = formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime;
    const shedoutTimeFormat = reportTime?.replace(":", ".")
    const finalShedOutTime = parseFloat(shedoutTimeFormat).toFixed(2)

    const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid || '';
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr?.split('-');
      return new Date(`${year}-${month}-${day}`);
    };

    const minDate = dayjs(minTimeData?.date).format("DD-MM-YYYY")
    const maxDate = dayjs(maxTimeData?.date).format("DD-MM-YYYY")
    const finalShedInDate = parseDate(shedindate || "")
    finalShedInDate?.setHours(0, 0, 0, 0);
    const finalMaximumShedInDate = parseDate(maximumShedInDate || "");
    finalMaximumShedInDate?.setHours(0, 0, 0, 0);
    const finalshedoutdate = parseDate(shedOutDate || "");
    finalshedoutdate?.setHours(0, 0, 0, 0);
    const finalMindate = parseDate(minDate || "")
    finalMindate?.setHours(0, 0, 0, 0);
    const finalMaxdate = parseDate(maxDate || "")
    finalMaxdate?.setHours(0, 0, 0, 0);

    const shedInDateChecking = (
      parseInt(shedInTimeData?.[0]?.Tripid) !== tripid &&
      shedInTimeData?.length > 0 &&
      shedindate !== "" &&
      finalMaximumShedInDate.getDate() !== finalshedoutdate.getDate() &&
      finalMaximumShedInDate.getFullYear() === finalshedoutdate.getFullYear() &&
      finalMaximumShedInDate.getMonth() === finalshedoutdate.getMonth() &&
      parseFloat(finalShedOutTime) <= parseFloat(maxTimeData?.time)
    );
    const shedInDateLessTime = (
      parseInt(shedInTimeData?.[0]?.Tripid) !== tripid &&
      parseFloat(maxTimeData?.tripid) !== tripid &&
      parseFloat(minTimeData?.tripid) !== tripid &&
      shedInTimeData?.length > 0 &&
      shedindate !== "" &&
      finalMaximumShedInDate.getDate() == finalshedoutdate.getDate() &&
      finalMaximumShedInDate.getFullYear() === finalshedoutdate.getFullYear() &&
      finalMaximumShedInDate.getMonth() === finalshedoutdate.getMonth() &&
      parseFloat(finalShedOutTime) <= parseFloat(maxTimeData?.time) &&
      parseFloat(finalShedOutTime) >= parseFloat(minTimeData?.time)
    );
    const maxminTime = (
      parseInt(shedInTimeData?.[0]?.Tripid) !== tripid &&
      parseFloat(minTimeData?.tripid) !== tripid &&
      shedInTimeData?.length > 0 &&
      shedindate !== "" &&
      finalMaximumShedInDate.getDate() == finalshedoutdate.getDate() &&
      finalMaximumShedInDate.getFullYear() === finalshedoutdate.getFullYear() &&
      finalMaximumShedInDate.getMonth() === finalshedoutdate.getMonth() &&
      parseFloat(finalShedOutTime) <= parseFloat(maxTimeData?.time) &&
      parseFloat(finalShedOutTime) >= parseFloat(minTimeData?.time)
    );

    return shedInDateChecking || shedInDateLessTime

  }

  const handleCloseMapPopUp = () => {
    setMapPopUp(false)
  }
  const starttime = book.starttime || selectedCustomerData.starttime || selectedCustomerDatas.starttime || formData.starttime;
  const endtime = book.closetime || selectedCustomerData.closetime || selectedCustomerDatas.closetime || formData.closetime;
  const startdate = dayjs(book.startdate || selectedCustomerData.startdate || selectedCustomerDatas.startdate || formData.startdate).format('YYYY-MM-DD');
  const closedate = dayjs(book.closedate || selectedCustomerData.closedate || selectedCustomerDatas.closedate || formData.closedate).format('YYYY-MM-DD');
  const tripShedInDate = dayjs(formData.shedInDate || selectedCustomerData.shedInDate || book.shedInDate).format('YYYY-MM-DD')
  const data = formData.shedin || book.shedin || selectedCustomerData.shedin || selectedCustomerDatas.shedin;
  const tripshedoutdate = dayjs(formData?.shedOutDate || selectedCustomerData?.shedOutDate || book?.shedOutDate).format('YYYY-MM-DD')
  const tripid = formData.tripid || selectedCustomerData.tripid || book.tripid || '';
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString?.split(':');
    return `${hours}.${minutes}`;
  };
  const formattedReportTime = formatTime(reportTimeVar || ""); // "20.08"
  const formattedStartTime = formatTime(startTimeVar || ""); // "17.13"


  // for modal
  const [openmodal, setOpenmodal] = useState(false);

  const handleOpen = () => setOpenmodal(true);
  const handleClosemodal = () => setOpenmodal(false);

  const handleOk = () => {
    handleDeleteMap()
    console.log('OK button clicked');
    handleClosemodal();
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    handleClosemodal();
  };



  // for snack bar
  const [opensnack, setOpensnack] = useState(false);

  const handleClicksnack = () => {
    setOpensnack(true); // Show the Snackbar
  };

  const handleClosesnack = (event, reason) => {
    if (reason === 'clickaway') {
      return; // Ignore closing the Snackbar if user clicks away
    }
    setOpensnack(false); // Close the Snackbar
  };
  const duty = formData.duty || selectedCustomerData.duty || book.duty;

  // super Admin access
  const superAdminAccess = localStorage.getItem("SuperAdmin")
  // console.log(superAdminAccess,'superadminnn',typeof(superAdminAccess));

  function removeSeconds(time) {
    const data = time || 0;
    // Split the time string by colon (:)
    if (data !== 0) {
      const timeParts = time?.split(':');

      // Check if there are seconds (length 3), return hours:minutes
      if (timeParts.length === 3) {
        return `${timeParts[0]}:${timeParts[1]}`;
      }

      // If there's only hours:minutes, return it as is
      return time;
    }

  }

  const handleConflictPopup = () => {
    setOpenModalConflict(false)
  }

  const handleConflictModal = () => {
    setOpenModalConflict(true)
  }
  const conflictModalbox = (checkingMinimumData() && conflictLoad !== null && (shedInTimeData?.length === 0 || shedInTimeData === null)) || (maxShedInDate() && conflictLoad !== null);

  const signaturedisabled = signimageUrl === "" && temporaryStatus ? true : false

  const shedoutDisabled = temporaryStatus ? hideField : hideField;
  // status for conflict message
  useEffect(() => {
    let timeout;
    console.log(conflictModalbox, "conflictttttttttttt")
    if (conflictModalbox) {
      timeout = setTimeout(() => {
        setError(true);
        setErrorMessage("Conflict Error");
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [conflictModalbox]);

  return (
    <div className="form-container form-container-tripsheet">
      <div className="Tripsheet-form main-content-container">
        <form action="">
          <p className="head-tab-type-2-all">
            <span className="Title-Name">Trip Sheet</span>
          </p>
          <div className="Tripsheet-header main-content-form">

            <div>
              <div className='tripsheet-top-division'>
                <span className="d-grid">
                  <label>Booking ID</label>
                  <input type="text"
                    id="bookingno"
                    name="bookingno"
                    value={formData.bookingno || selectedCustomerData.bookingno || book.bookingno || ''}
                  // onChange={handleChange}
                  />
                </span>

                <span className="d-grid">
                  <label>Billing No</label>
                  <input type="text"
                    id="billingno"
                    name="billingno"
                    value={formData.billingno || selectedCustomerData.billingno || book.billingno || ''}
                  // onChange={handleChange}
                  />
                </span>

                <span className="d-grid">
                  <label className="tripsheet-top-division-date-label">Tripsheet Date</label>
                  <div className="tripsheet-top-division-date">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        id="tripsheetdate"
                        value={formData.tripsheetdate || selectedCustomerData.tripsheetdate ? dayjs(selectedCustomerData.tripsheetdate) : null || book.tripsheetdate ? dayjs(book.tripsheetdate) : dayjs()}
                        format="DD/MM/YYYY"
                        // label='Booking Date'
                        // onChange={(date) => handleDateChange(date, 'tripsheetdate')}
                        readOnly


                      />
                      {/* <DatePicker
                        id="tripsheetdate"
                        value={formData.tripsheetdate || selectedCustomerData.tripsheetdate ? dayjs(selectedCustomerData.tripsheetdate) : null || book.tripsheetdate ? dayjs(book.tripsheetdate) : dayjs()}
                        format="DD/MM/YYYY"
                        // label='Booking Date'
                        onChange={(date) => handleDateChange(date, 'tripsheetdate')}
                      >
                        
                      </DatePicker> */}
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
                    disabled={editButtonStatusCheck && superAdminAccess === "0"}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "status")}
                    value={Status.find((option) => option.optionvalue)?.label || formData.status || selectedCustomerData.status || book.status || 'Opened'}
                    // options={Status.map((option) => ({
                    //   label: option.Option,
                    // }))}
                    options={
                      !userStatus?.includes('Chennai') && !userStatus?.includes('All')
                        ? OuststationStatus?.map((option) => ({
                          label: option.Option,
                        }))
                        : Status.map((option) => ({
                          label: option.Option,
                        }))
                    }

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
                    disabled={editButtonStatusCheck && superAdminAccess === "0"}
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

                <div className='gt-sms-st' >
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

                {/* <div className="" style={{width:"200px"}}>
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

                <div className="input">
                  <TextField
                    name="GroupTripId"
                    size="small"
                    value={groupTripId || ""}
                    label="Group ID"
                    id="standard-size-customer"
                    autoFocus
                    autoComplete="password"
                    style={{ color: 'black' }}
                    InputProps={{
                      style: {
                        color: 'black',
                      },
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'black',
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-root.Mui-disabled": {
                        color: "black",
                      },
                      "& .MuiFormLabel-root.Mui-disabled": {
                        color: "black",
                      },
                    }}
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
                    disabled={hideField && superAdminAccess === "0"}
                    id="standard-size-customer"
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
                    disabled={hideField && superAdminAccess === "0"}
                    size="small"
                    value={formData.orderedby || selectedCustomerData.orderedby || book.orderedby || ''}
                    onChange={handleChange}
                    label="Ordered By"
                    id="standard-size-orderedby"
                    autoComplete="password"
                    required
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
                    disabled={hideField && superAdminAccess === "0"}
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
                    disabled={hideField && superAdminAccess === "0"}
                    label="Order By Email"
                    id="orderbyemail"
                    size="small"
                    autoComplete="password"
                  />
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
                    disabled={hideField && superAdminAccess === "0"}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "department")}
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

                <div className="input">
                  <div className="icone">
                    <AssignmentIndIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    id="guestname"
                    label="Guest Name"
                    name="guestname"
                    disabled={hideField && superAdminAccess === "0"}
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
                    disabled={hideField && superAdminAccess === "0"}
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
                    disabled={hideField && superAdminAccess === "0"}
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
                    disabled={hideField && superAdminAccess === "0"}
                    rows={2}
                    sx={{ width: "100%" }}
                    autoComplete="new-password"
                    value={formData.address1 || selectedCustomerData.address1 || book.address1 || ''}
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
                    disabled={hideField && superAdminAccess === "0"}
                    value={formData.useage || selectedCustomerData.useage || formValues.useage || book.useage || ''}
                    onChange={handleChange}
                    label="Usage"
                    id="useage"
                    autoComplete="password"
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
                    disabled={hideField && superAdminAccess === "0"}
                    onChange={(event, value) => {
                      handleAutocompleteChange(event, value, "duty")
                      // if (!lockdata) {
                      //   setVendorinfodata({ ...vendorinfo, vendor_duty: value.label })
                      // }
                      if (lockdata) {
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

                <div className="input">
                  <div className="icone">
                    <StreamIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="request"
                    disabled={hideField && superAdminAccess === "0"}
                    value={selectedCustomerDatas.request || selectedCustomerData.request || formValues.request || book.request || ''}
                    onChange={handleChange}
                    label="Request"
                    id="request"
                    autoComplete="password"
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
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customercode"
                    value={formData.customercode || selectedCustomerData.customercode || book.customercode || ''}
                    onChange={handleChange}
                    disabled={hideField && superAdminAccess === "0"}
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
                    disabled={hideField && superAdminAccess === "0"}
                    label="Employee No"
                    id="employeeno"
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
                        disabled={hideField && superAdminAccess === "0"}
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
                        disabled={hideField && superAdminAccess === "0"}
                        onChange={handleTransferChange}
                      >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                {emptyState ? "" :
                  <div className="input" style={{ display: "grid", position: "relative" }}>
                    {/* {checkForConflict() && <label className='invalid-km' style={{ paddingBottom: '5px' }}>
                      Conflict tripid: {conflictCompareDatas?.tripids}, Time: {conflictCompareDatas?.latestTime}, conflictdate:{conflictCompareDatas?.conflictmaxdate}
                    </label>} */}
                    {/* {checkingMinimumData() && conflictLoad !== null && (shedInTimeData?.length === 0 || shedInTimeData === null) && <label className='invalid-km' style={{ paddingBottom: '5px' }}>
                      Conflict Date: {dayjs(minTimeData?.date).format("DD-MM-YYYY")} MinTripId:  {minTimeData?.tripid} MinTime : {minTimeData?.time} - MaxTripId : {maxTimeData?.tripid} MaxTime : {maxTimeData?.time}
                    </label>}
                    {
                      maxShedInDate() && conflictLoad !== null &&
                      <label className='invalid-km' style={{ paddingBottom: '5px' }}> Shed in Date Achieved :{shedInTimeData[0]?.Tripid} {'\n'}  conflict Date :{dayjs(shedInTimeData[0]?.shedindate).format("DD-MM-YYYY")}  MinTripId:  {minTimeData?.tripid} MinTime : {minTimeData?.time} - MaxTripId : {maxTimeData?.tripid} MaxTime : {maxTimeData?.time}   </label>
                    } */}

                    <Modal
                      open={openModalConflict}
                      onClose={handleConflictPopup}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '48%',
                          left: '14%',
                          transform: 'translate(-50%, -50%)',
                          width: '250px',
                          height: '100px',
                          bgcolor: 'white',
                          // border: '1px solid #000',
                          borderRadius: 3,
                          textAlign: 'center',
                          boxShadow: 24,
                          p: 1,
                          overflowY: 'auto'
                        }}
                      >
                        {conflictModalbox ? (
                          <>
                            {checkingMinimumData() &&
                              conflictLoad !== null &&
                              (shedInTimeData?.length === 0 || shedInTimeData === null) && (
                                <label className="invalid-km" >
                                  Conflict Date: {dayjs(minTimeData?.date).format("DD-MM-YYYY")}<br />
                                  MinTripId: {minTimeData?.tripid}{'\n'}
                                  MinTime: {minTimeData?.time} <br />
                                  MaxTripId: {maxTimeData?.tripid}{'\n'}
                                  MaxTime: {maxTimeData?.time}
                                </label>
                              )}
                            {maxShedInDate() &&
                              conflictLoad !== null && (
                                <label className="invalid-km" >
                                  Shed in Date Achieved : {shedInTimeData[0]?.Tripid}<br />
                                  Conflict Date : {dayjs(shedInTimeData[0]?.shedindate).format("DD-MM-YYYY")}<br />
                                  MinTripId : {minTimeData?.tripid}{'\n'}
                                  MinTime : {minTimeData?.time} <br />
                                  MaxTripId : {maxTimeData?.tripid}{'\n'}
                                  MaxTime : {maxTimeData?.time}
                                </label>
                              )}

                          </>
                        ) : (
                          <>
                            <div className='No-Data'>
                              <label > No Conflict Data</label>

                            </div>
                          </>

                        )}


                      </Box>
                    </Modal>
                    {/* <div style={{ top: -17, left:27 ,cursor:'pointer',position: 'absolute', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: conflictModalbox ? 'red' : 'green' }} onClick={handleConflictModal}>
                      </div> */}
                    <div style={{ top: -24, left: 27, cursor: 'pointer', position: 'absolute', }} onClick={handleConflictModal}>
                      <p style={{ backgroundColor: conflictModalbox ? 'red' : '#457cdc', fontSize: '9px',height:'15px',width:'15px',textAlign:'center',borderRadius:'15px',color: '#fff',border: '1px solid',}}>!</p>
                    
                    </div>
                    <div style={{ display: "flex",marginTop:'2px' }}>

                      <div className="icone" >
                        <CalendarMonthIcon color="action" />
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Shed Out Date"
                          // disabled={hideField && superAdminAccess === "0" && temporaryStatus}
                          disabled={shedoutDisabled && superAdminAccess === "0"}

                          id="shedOutDate"
                          value={formData?.shedOutDate || selectedCustomerData?.shedOutDate ? dayjs(selectedCustomerData?.shedOutDate) : null || book?.shedOutDate ? dayjs(book?.shedOutDate) : null}
                          // value={formData?.shedOutDate || selectedCustomerData?.shedOutDate}

                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            setKmValue((prev) => ({ ...prev, shedOutDate: date }));
                            handleDateChange(date, 'shedOutDate')
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.shedOutDate} />
                          )}
                        </DatePicker>
                      </LocalizationProvider>
                    </div>
                  </div>
                }
                {emptyState ? "" :
                  <div style={{ display: "grid" }} className="input">
                    {startDateCheckFun()}
                    <div style={{ display: "flex" }}>
                      <div className="icone">
                        <CalendarMonthIcon color="action" />
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Report Date"
                          // disabled={hideField && superAdminAccess === "0" && temporaryStatus}
                          disabled={shedoutDisabled && superAdminAccess === "0"}
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
                  </div>}

                {emptyState ? "" :
                  // <div className="input" style={{ display: "grid" }}>
                  //   {closeDateCheckFun()}
                  //   <div style={{ display: "flex" }}>
                  //     <div className="icone">
                  //       <CalendarMonthIcon color="action" />
                  //     </div>
                  //     <LocalizationProvider dateAdapter={AdapterDayjs}>
                  //       <DatePicker
                  //         label="Close Date"
                  //         id="closedate"
                  //         disabled={temporaryStatus && superAdminAccess === "0"}
                  //         value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : dayjs(selectedCustomerData?.shedOutDate).format('DD/MM/YYYY') || book.closedate ? dayjs(book.closedate) : null}
                  //         format="DD/MM/YYYY"
                  //         onChange={(date) => {

                  //           handleDateChange(date, 'closedate')
                  //           setKmValue(prev => ({ ...prev, closeDate: date }))

                  //           // const startDate = formData.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate;
                  //           // const closeDate = date
                  //           // const shedindate = kmValue.shedInDate

                  //           // if (startDate && closeDate) {
                  //           //   const startDateObj = dayjs(startDate);
                  //           //   const closeDateObj = dayjs(closeDate);
                  //           //   const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
                  //           //   setKmValue(prev => ({ ...prev, close_totalDays: totalDays }))
                  //           // }

                  //           // if (shedindate && closeDate) {
                  //           //   const closedateObj = dayjs(closeDate);
                  //           //   const shedindateObj = dayjs(shedindate);
                  //           //   const totalDays = shedindateObj.diff(closedateObj, 'days') + 1;
                  //           //   setKmValue(prev => ({ ...prev, close_shedOut_totalDays: totalDays }))
                  //           // }
                  //         }}
                  //       >
                  //         {({ inputProps, inputRef }) => (
                  //           <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate || selectedCustomerData?.shedOutDate} />
                  //         )}
                  //       </DatePicker>
                  //     </LocalizationProvider>
                  //   </div>
                  // </div>
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
                          disabled={temporaryStatus && superAdminAccess === "0"}
                          value={
                            formData?.closedate ||
                              selectedCustomerData?.closedate
                              ? dayjs(selectedCustomerData.closedate)
                              : selectedCustomerData?.shedOutDate
                                ? dayjs(selectedCustomerData.shedOutDate)
                                : null ||
                                  book?.closedate ? dayjs(book?.closedate) : dayjs(book?.shedOutDate)
                          }
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'closedate');
                            setKmValue((prev) => ({ ...prev, closeDate: date }));

                            // Uncomment and use if you want to handle additional calculations
                            // const startDate = formData.startdate || selectedCustomerData.startdate || book.startdate;
                            // const closeDate = date;
                            // const shedindate = kmValue.shedInDate;

                            // if (startDate && closeDate) {
                            //   const startDateObj = dayjs(startDate);
                            //   const closeDateObj = dayjs(closeDate);
                            //   const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
                            //   setKmValue((prev) => ({ ...prev, close_totalDays: totalDays }));
                            // }

                            // if (shedindate && closeDate) {
                            //   const closedateObj = dayjs(closeDate);
                            //   const shedindateObj = dayjs(shedindate);
                            //   const totalDays = closedateObj.diff(shedindateObj, 'days') + 1;
                            //   setKmValue((prev) => ({ ...prev, close_shedOut_totalDays: totalDays }));
                            // }
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField
                              {...inputProps}
                              inputRef={inputRef}
                              value={
                                selectedCustomerData?.closedate ||
                                selectedCustomerData?.shedOutDate ||
                                ""
                              }
                            />
                          )}
                        </DatePicker>
                      </LocalizationProvider>
                    </div>
                  </div>

                }


                {emptyState ? "" :
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
                          disabled={temporaryStatus && superAdminAccess === "0"}
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

                  </div>}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <DemoItem>
                      <TextField
                        name="totaldays"
                        value={calculateTotalDay()}
                        label="Total Days"
                        disabled={temporaryStatus && superAdminAccess === "0"}
                        size="small"
                        type="number"
                        id="totaldays"
                        // variant="standard"
                        autoComplete="password"
                      />
                    </DemoItem>
                  </div>}

                <div className="input tripsheet-e-tripsheet-input">
                  <Button startIcon={<BorderColorIcon />} variant="outlined" onClick={handleETripsheetClick} >
                    E-Tripsheet
                  </Button>
                </div>

                {emptyState ? "" :
                  <div className="input time" style={{ display: "grid" }}>

                    <div style={{ display: "flex", alignItems: 'center' }}>
                      <div className='icone icone-margin-adjust'>
                        <MdOutlineAccessTimeFilled />
                      </div>

                      <div className='input-type-grid'>
                        <label>Shed Out Time</label>
                        <input
                          type="time"
                          name="reporttime"
                          // disabled={hideField && superAdminAccess === "0" && temporaryStatus}
                          disabled={shedoutDisabled && superAdminAccess === "0"}
                          value={formData.reporttime || selectedCustomerData.reporttime || selectedCustomerDatas.reporttime || book.reporttime || ''}
                          onChange={(event) => {
                            setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value });
                            setSelectedCustomerDatas({ ...selectedCustomerDatas, reporttime: event.target.value });
                            setBook({ ...book, reporttime: event.target.value });
                            setreporttime(event.target.value);
                            // if (!lockdata && dayhcl === 0) {
                            //   setVendorinfodata({ ...vendorinfo, vendorreporttime: event.target.value })
                            // }
                            // if (!lockdata && dayhcl === 1 && duty === "Outstation") {
                            //   setVendorinfodata({ ...vendorinfo, vendorreporttime: event.target.value })
                            // }
                            if (lockdata && dayhcl === 0) {
                              setVendorinfodata({ ...vendorinfo, vendorreporttime: event.target.value })
                            }
                            if (lockdata && dayhcl === 1 && duty === "Outstation") {
                              setVendorinfodata({ ...vendorinfo, vendorreporttime: event.target.value })
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div className="input time">
                    <div className='icone icone-margin-adjust'>
                      <MdOutlineAccessTimeFilled />
                    </div>
                    <div className='input-type-grid'>
                      {/* Display 'Invalid Time' conditionally based on the report and start times */}
                      {/* {(tripshedoutdate===startdate && ((reportTimeVar < startTimeVar) ? (
                      <label>Report Time</label>
                    ) : (
                      tripshedoutdate!==startdate || startdate==="" ?  <label>Report Time</label> : <label style={{ color: "red" }}>Invalid Time</label> 
                    ))) || (!reportTimeVar && <label>Report Time</label>)} */}
                      {tripshedoutdate === startdate && formattedReportTime < formattedStartTime ? <label>Report Time</label> :
                        (tripshedoutdate !== startdate || startTimeVar === "" || startTimeVar === undefined ? <label>Report Time</label> : <label style={{ color: "red" }}>Invalid Time</label>)
                      }

                      {/* Time input without restricting manual entry */}
                      <input
                        type="time"
                        id="starttime"
                        // disabled={hideField && superAdminAccess === "0" && temporaryStatus}
                        disabled={shedoutDisabled && superAdminAccess === "0"}
                        name="starttime"
                        value={formData.starttime || selectedCustomerData.starttime || book.starttime || selectedCustomerDatas.starttime || ''}
                        onChange={(event) => {
                          const rTime = event.target.value;
                          // Allow the input time to be entered without restriction
                          setBook({ ...book, starttime: rTime });
                          setStartTime(rTime);
                          setFormData({ ...formData, starttime: rTime });
                          setSelectedCustomerData({ ...selectedCustomerData, starttime: rTime });
                          // if (!lockdata && dayhcl === 1 && duty !== "Outstation") {
                          //   setVendorinfodata({ ...vendorinfo, vendorreporttime: rTime })
                          // }
                          if (lockdata && dayhcl === 1 && duty !== "Outstation") {
                            setVendorinfodata({ ...vendorinfo, vendorreporttime: rTime })
                          }
                        }}
                      />
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div className="input time">
                    <div className='icone icone-margin-adjust'>
                      <MdOutlineAccessTimeFilled />
                    </div>
                    <div className='closetime tripsheet-shed-in-time'>
                      {/* Display 'Invalid Time' conditionally based on the start and close times, and the total number of days */}
                      {calculateTotalDay() === 1 ? (
                        startTimeVar && ((startTimeVar < closeTimeVar) ? (
                          <label>Close Time</label>
                        ) : (
                          <label style={{ color: "red" }}>Invalid Time</label>
                        ))
                        || (!startTimeVar && <label>Close Time</label>)
                      ) : (
                        <label>Close Time</label>
                      )}
                      <input
                        type="time"
                        name="closetime"
                        id="closetime"
                        disabled={temporaryStatus && superAdminAccess === "0"}
                        value={formData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                        onChange={(event) => {
                          const rTime = event.target.value;

                          // Update the time without restriction
                          setSelectedCustomerData({ ...selectedCustomerData, closetime: rTime });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, closetime: rTime });
                          setBook({ ...book, closetime: rTime });
                          setCloseTime(rTime);
                          // if (!lockdata && dayhcl === 1 && duty !== "Outstation") {
                          //   setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                          // }
                          if (lockdata && dayhcl === 1 && duty !== "Outstation") {
                            setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                          }
                        }}
                      />
                    </div>

                  </div>}

                {emptyState ? "" :
                  <div className="input time">
                    <div className='icone icone-margin-adjust'>
                      <MdOutlineAccessTimeFilled />
                    </div>
                    <div className='input-type-grid'>
                      {/* Display the label and invalid message conditionally based on closeTimeVar and day difference */}
                      {/* {(closeTimeVar && calculateTotalDay() === 1 &&
                      ((closeTimeVar < shedInTimeVar)
                        ? (<label>Shed In Time</label>)
                        : (<label style={{ color: "red" }}>Invalid Time</label>)
                      ))
                      || ( <label>Shed In Time</label>)
                    } */}
                      {(closeTimeVar && calculateTotalDay() === 1 &&
                        ((closeTimeVar < shedInTimeVar)
                          ? (<label>Shed In Time</label>)
                          : (dayhcl === 1 && duty === "Outstation" ? <label style={{ color: "red" }}>Invalid Time</label> : <label>Shed In Time</label>)
                        ))
                        || (closeTimeVar >= shedInTimeVar && dayhcl === 1 && duty === "Outstation" && tripShedInDate === closedate ? <label style={{ color: "red" }}>Invalid Time</label> : <label>Shed In Time</label>)
                      }

                      {/* {calculateTotalDay() > 1 ? (<label>Shed In Time</label>) : ""} */}

                      {/* Time input field */}
                      <input
                        type="time"
                        name="shedintime"
                        disabled={temporaryStatus && superAdminAccess === "0"}
                        value={formData.shedintime || selectedCustomerData.shedintime || book.shedintime || ''}
                        onChange={(event) => {
                          const rTime = event.target.value;

                          // Always allow input and set the state
                          setSelectedCustomerData({ ...selectedCustomerData, shedintime: rTime });
                          setSelectedCustomerDatas({ ...selectedCustomerDatas, shedintime: rTime });
                          setBook({ ...book, shedintime: rTime });
                          setshedintime(rTime);

                          // Check if the day difference is 1, and validate the time
                          if (calculateTotalDay() === 1) {
                            if (closeTimeVar && rTime <= closeTimeVar) {
                              // If the shed in time is invalid, display an error message but allow input
                              console.log("Invalid Shed In Time");
                            } else {
                              // Valid input, you can handle any additional logic here
                              // if (!lockdata && dayhcl === 0) {
                              //   setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                              // }
                              // if (!lockdata && dayhcl === 1 && duty === "Outstation") {
                              //   setVendorinfodata((prev) => ({ ...prev, vendorshedintime: rTime }))
                              // }
                              if (lockdata && dayhcl === 0) {
                                setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                              }
                              if (lockdata && dayhcl === 1 && duty === "Outstation") {
                                setVendorinfodata((prev) => ({ ...prev, vendorshedintime: rTime }))
                              }
                            }
                          } else {
                            // If the day difference is more than 1, allow any time
                            // if (!lockdata && dayhcl === 0) {
                            //   setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                            // }
                            // if (!lockdata && dayhcl === 1 && duty === "Outstation") {
                            //   setVendorinfodata((prev) => ({ ...prev, vendorshedintime: rTime }))
                            // }
                            if (lockdata && dayhcl === 0) {
                              setVendorinfodata({ ...vendorinfo, vendorshedintime: rTime });
                            }
                            if (lockdata && dayhcl === 1 && duty === "Outstation") {
                              setVendorinfodata((prev) => ({ ...prev, vendorshedintime: rTime }))
                            }
                          }
                        }}
                      />
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div className="input" style={{ position: 'relative', top: '10px' }}>
                    <div className="icone icone-margin-adjust" style={{ marginBottom: '16px' }}>
                      <FontAwesomeIcon icon={faStopwatch} size="lg" />
                    </div>
                    <div className='tripsheet-total-time-div' style={{ display: 'grid', alignItems: 'center', marginBottom: '15px' }}>
                      <label>Add Time</label>
                      <div style={{ position: 'relative', top: '-4px' }}>
                        <TextField
                          name="additionaltime"
                          value={
                            formData.additionaltime ||
                            book.additionaltime ||
                            selectedCustomerData.additionaltime ||
                            additionalTime.additionaltime ||
                            ''
                          }
                          disabled={temporaryStatus && superAdminAccess === "0" || outStationHide}
                          onChange={handleChange}
                          id="additionaltime"
                          size="small"
                          autoComplete="password"
                        />
                      </div>
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone icone-margin-adjust">
                      <FontAwesomeIcon icon={faStopwatch} size="lg" />
                    </div>
                    <div className='tripsheet-total-time-div' style={{ display: 'grid', alignItems: 'center', marginTop: '5px' }}>
                      <label>Total Time</label>
                      <div style={{ position: 'relative', top: '-4px' }}>
                        <TextField
                          name="totaltime"
                          // value={ calculateTotalTimes()}
                          value={
                            (book.reporttime !== "" || selectedCustomerData.reporttime !== "") &&
                              (book.shedintime !== "" || selectedCustomerData.shedintime !== "" || selectedCustomerDatas.shedintime !== "")
                              ? calculateTotalTimes()
                              : ""
                          }
                          disabled={temporaryStatus && superAdminAccess === "0"}
                          onChange={handleChange}
                          id="totaltime"
                          size='small'
                          autoComplete="password"
                        />
                      </div>
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div className="input" style={{ display: "grid" }} >
                    {/* {kmValue.shedOutState && customer && !/hcl/i.test(customer) && ((Number(kmValue.shedOutState) <= Number(checkCloseKM.maxShedInkm)) && (tripID !== checkCloseKM.maxTripId && <lable className='invalid-km'>Conflict id: {checkCloseKM.maxTripId}, KM: {checkCloseKM.maxShedInkm}</lable>))} */}
                    {/* {kmValue.shedOutState && customer && !isHybridCustomer && ((Number(kmValue.shedOutState) <= Number(checkCloseKM.maxShedInkm)) && (tripID !== checkCloseKM.maxTripId && <lable className='invalid-km'>Conflict id: {checkCloseKM.maxTripId}, KM: {checkCloseKM.maxShedInkm}</lable>))} */}
                    {/* {conflictkm?.maximumkm !== 0 && tripID !== conflictkm.maxtripid && ((Number(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) <= Number(conflictkm.maximumkm)) && <lable className='invalid-km'>Conflict id: {conflictkm.maxtripid}, KM: {conflictkm.maximumkm}</lable>)} */}
                    {/* {conflictkm?.maximumkm !== 0 && tripID !== conflictkm.maxtripid && ((Number(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) <= Number(conflictkm.maximumkm)) && <lable className='invalid-km'>Conflict id: {conflictkm.maxtripid}, KM: {conflictkm.maximumkm}</lable>)} */}
                    {/* <br></br> */}
                    {/* {conflictkm?.maximumkm !== 0 && dayhcl === 0 && tripID !== conflictkm.maxtripid && data === undefined && (
                      (Number(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) <= Number(conflictkm.maximumkm)) && (
                        <label className='invalid-km' style={{ paddingBottom: '18px' }}>
                          Conflict id: {conflictkm.maxtripid}, KM: {conflictkm.maximumkm}
                        </label>
                      )
                    )} */}
                    {data === undefined && tripID !== maxconflict?.maxTripid && dayhcl === 0 && maxconflict?.maxconflictdata !== 0 && Number(kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) <= Number(maxconflict?.maxconflictdata) && (
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
                            // if (!lockdata && dayhcl === 0) {
                            //   setVendorinfodata((prev) => ({ ...prev, vendorshedoutkm: e.target.value }))
                            // }
                            // if (!lockdata && dayhcl === 1 && duty === "Outstation") {
                            //   setVendorinfodata((prev) => ({ ...prev, vendorshedoutkm: e.target.value }))
                            // }
                            if (lockdata && dayhcl === 0) {
                              setVendorinfodata((prev) => ({ ...prev, vendorshedoutkm: e.target.value }))
                            }
                            if (lockdata && dayhcl === 1 && duty === "Outstation") {
                              setVendorinfodata((prev) => ({ ...prev, vendorshedoutkm: e.target.value }))
                            }
                          }
                        }}
                        disabled={temporaryStatus && superAdminAccess === "0"}
                        label="Shed Out"
                        id="shedout"
                        size='small'
                        type="number"
                        autoComplete="password"
                      />
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div style={{ display: "grid" }} className="input">
                    {dayhcl === 0 && (kmValue.shedOutState || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout) && ((Number(kmValue.startKMState) || formData.startkm || selectedCustomerData.startkm || selectedCustomerDatas.startkm || book.startkm) <= (Number(kmValue.shedOutState) || formData.shedout || book.shedout || selectedCustomerDatas.shedout || selectedCustomerData.shedout)) && <lable className='invalid-km'>invalid KM</lable>}

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
                            // if (!lockdata && dayhcl === 1 && duty !== "Outstation") {
                            //   setVendorinfodata((prev) => ({ ...prev, vendorshedoutkm: e.target.value }))
                            // }
                            if (lockdata && dayhcl === 1 && duty !== "Outstation") {
                              setVendorinfodata((prev) => ({ ...prev, vendorshedoutkm: e.target.value }))
                            }
                          }
                        }}
                        disabled={temporaryStatus && superAdminAccess === "0"}
                        size="small"
                        label="Start KM"
                        type="number"
                        id="startkm"
                        autoComplete="password"
                      />
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div className="input" style={{ display: "grid" }}>
                    {dayhcl === 0 && kmValue.startKMState && (Number(kmValue.closeKMState || formData.closekm || selectedCustomerData.closekm || selectedCustomerDatas.closekm || book.closekm) <= Number(kmValue.startKMState)) && <lable className='invalid-km'>invalid KM</lable>}
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
                            // if (!lockdata && dayhcl === 1 && duty !== "Outstation") {
                            //   setVendorinfodata((prev) => ({ ...prev, vendorshedinkm: e.target.value }))
                            // }
                            if (lockdata && dayhcl === 1 && duty !== "Outstation") {
                              setVendorinfodata((prev) => ({ ...prev, vendorshedinkm: e.target.value }))
                            }
                          }
                        }}
                        disabled={temporaryStatus && superAdminAccess === "0"}
                        label="Close KM"
                        size="small"
                        type="number"
                        id="outlined-start-closekm"
                        autoComplete="password"
                      />
                    </div>
                  </div>}

                {emptyState ? "" :
                  <div style={{ display: "grid" }} className="input">
                    {dayhcl === 0 && kmValue.closeKMState && (Number(kmValue.shedInState) <= Number(kmValue.closeKMState)) && <lable className='invalid-km'>invalid KM</lable>}
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
                            // if (!lockdata && dayhcl === 0) {
                            //   setVendorinfodata((prev) => ({ ...prev, vendorshedinkm: e.target.value }))
                            // }
                            // if (!lockdata && dayhcl === 1 && duty === "Outstation") {
                            //   setVendorinfodata((prev) => ({ ...prev, vendorshedinkm: e.target.value }))
                            // }

                            if (lockdata && dayhcl === 0) {
                              setVendorinfodata((prev) => ({ ...prev, vendorshedinkm: e.target.value }))
                            }
                            if (lockdata && dayhcl === 1 && duty === "Outstation") {
                              setVendorinfodata((prev) => ({ ...prev, vendorshedinkm: e.target.value }))
                            }
                          }
                        }}
                        disabled={temporaryStatus && superAdminAccess === "0"}
                        label="Shed In"
                        type="number"
                        id="shedin"
                        size='small'
                        autoComplete="password"
                      />
                    </div>
                  </div>}

                {emptyState ? "" :
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
                      disabled={temporaryStatus && superAdminAccess === "0" || outStationHide}
                      label="Add KM"
                      type="number"
                      id="shedkm"
                      size='small'
                      autoComplete="password"
                    />
                  </div>}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <FontAwesomeIcon icon={faRoad} size="lg" />
                    </div>
                    <TextField
                      name="totalkm1"
                      value={calculateTotalKilometers()}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      onChange={handleChange}
                      label="Total KM"
                      id="totalkm1"
                      type="number"
                      size='small'
                      autoComplete="password"
                    />
                  </div>}



                {/* <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faStamp} />
                  </div>
                  <TextField
                    name="permit"
                    value={formData.permit || selectedCustomerData.permit || book.permit || ''}
                    onChange={handleChange}
                    label="Permit"
                    id="permit"
                    size='small'
                    autoComplete="password"
                  />
                </div> */}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <FontAwesomeIcon icon={faStamp} />
                    </div>
                    <TextField
                      name="permit"
                      value={formData.permit || selectedCustomerData.permit || book.permit || ''}
                      onChange={(e) => {
                        handleChange(e);
                        const value = e.target.value;
                        // Automatically update the Vendor permit field
                        setFormData((prevState) => ({
                          ...prevState,
                          vpermettovendor: value, // Syncing the value of "permit" to "vpermettovendor"
                        }));
                        setSelectedCustomerData((prevState) => ({
                          ...prevState,
                          vpermettovendor: value, // Syncing the value of "permit" to "vpermettovendor"
                        }));
                        setBook((prevState) => ({
                          ...prevState,
                          vpermettovendor: value, // Syncing the value of "permit" to "vpermettovendor"
                        }));
                        setVendorinfodata({
                          ...vendorinfo,
                          vendor_vpermettovendor: value, vpermettovendor: value
                        });
                      }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Permit"
                      id="permit"
                      size="small"
                      autoComplete="password"
                    />
                  </div>}
                {/* <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faSquareParking} />
                  </div>
                  <TextField
                    name="parking"
                    value={formData.parking || selectedCustomerData.parking || book.parking || ''}
                    onChange={handleChange}
                    label="Parking"
                    id="parking"
                    size='small'
                    autoComplete="password"
                  />
                </div> */}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <FontAwesomeIcon icon={faSquareParking} />
                    </div>
                    <TextField
                      name="parking"
                      value={formData.parking || selectedCustomerData.parking || book.parking || ''}
                      onChange={(e) => {
                        handleChange(e);
                        const value = e.target.value;
                        // Syncing the value of "parking" to "vendorparking"
                        setFormData((prevState) => ({
                          ...prevState,
                          vendorparking: value,
                        }));
                        setSelectedCustomerData((prevState) => ({
                          ...prevState,
                          vendorparking: value,
                        }));
                        setVendorinfodata({ ...vendorinfo, vendorparking: value });
                        setBook((prevState) => ({
                          ...prevState,
                          vendorparking: value,
                        }));
                      }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Parking"
                      id="parking"
                      size="small"
                      autoComplete="password"
                    />
                  </div>}
                {/* <div className="input">
                  <div className="icone">
                    <TollTwoToneIcon color="action" />
                  </div>
                  <TextField
                    name="toll"
                    value={formData.toll || selectedCustomerData.toll || book.toll || ''}
                    onChange={handleChange}
                    label="Toll"
                    id="toll"
                    size='small'
                    autoComplete="password"
                  />
                </div> */}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <TollTwoToneIcon color="action" />
                    </div>
                    <TextField
                      name="toll"
                      value={formData.toll || selectedCustomerData.toll || book.toll || ''}
                      onChange={(e) => {
                        handleChange(e);
                        const value = e.target.value;
                        // Syncing the value of "toll" to "vendortoll"
                        setFormData((prevState) => ({
                          ...prevState,
                          vendortoll: value,
                        }));
                        setSelectedCustomerData((prevState) => ({
                          ...prevState,
                          vendortoll: value,
                        }));
                        setVendorinfodata({ ...vendorinfo, vendor_toll: value, vendortoll: value })
                        setBook((prevState) => ({
                          ...prevState,
                          vendortoll: value,
                        }));
                      }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Toll"
                      id="toll"
                      size="small"
                      autoComplete="password"
                    />
                  </div>}

                <React.Fragment>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                      style: {
                        width: '1400px', // Adjust width here
                        maxWidth: 'none' // Disable maxWidth constraint
                      }
                    }}
                    maxWidth={false} // Remove any default max width constraint
                    fullWidth // Ensure the dialog takes full width of the viewport
                  >
                    <div className="Tipsheet-content-table-main">
                      <Tabs
                        className='Scroll-Style tripsheet-calculate-popup-main'
                        aria-label="Pricing plan"
                        defaultValue={0}
                        sx={(theme) => ({
                          width: "100%",
                          height: "430px",
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
                          {billing_read ? <Tab>Bill</Tab> : <> </>}
                          <Tab>GPS Attached</Tab>
                          <Tab>Messages</Tab>
                        </TabList>
                        <TabPanel value={billing_read ? 1 : 0} sx={{ p: 2 }}>
                          <div className="Customer-Gps-att-Slider tripsheet-vendor-gps-att-main">
                            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap" }}>
                              <div className='left-buttons'>
                                <div className="in-feild">
                                  <div className="input">
                                    <Button onClick={handleTripmapClick} variant='outlined' className='full-width'>View GPS Map</Button>
                                  </div>
                                  <Dialog open={mapimgpopupOpen} onClose={handleimgPopupClose}>
                                    <DialogContent>
                                      <img className='dialogboximg mapview' src={mapimageUrls} alt='imagess' />
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        // onClick={handleDeleteMap}
                                        onClick={handleOpen}
                                        variant="contained" color="primary" disabled={superAdminAccess === "0" && temporaryStatus}>
                                        Delete map
                                      </Button>
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
                                </div>
                                <div className="in-feild" style={{ marginTop: '10px' }}>
                                  <div className="input">
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
                                          <Button disabled={!Tripsheet_modify} onClick={handleEditMapDetails}>Submit</Button>
                                        </div>
                                      </div>
                                    </Box>
                                  </Modal>
                                  <div className="input">
                                    <Button variant="contained" disabled={!Tripsheet_modify || (superAdminAccess === "0" && temporaryStatus)} onClick={handleUpload} className='full-width'>Upload Doc</Button>
                                  </div>
                                </div>
                                <div className="in-feild" style={{ marginTop: '20px' }}>

                                  <div className="input">
                                    <Button variant="outlined" onClick={handleRefresh} className='full-width'>Refresh</Button>
                                  </div>
                                  <div className="input">
                                    <Button
                                      disabled={!Tripsheet_modify || (superAdminAccess === "0" && signaturedisabled)}
                                      // disabled={!Tripsheet_modify || (superAdminAccess === "0" && temporaryStatus)}
                                      onClick={handlesignatureimages}
                                      variant="contained"
                                      className={`full-width ${signimageUrl ? 'green-button' : ''}`}
                                      sx={!signimageUrl ? { backgroundColor: '' } : undefined}
                                    >
                                      Signature
                                    </Button>
                                    {/* <Button disabled={!Tripsheet_modify} onClick={handlesignatureimages} variant="contained" className='full-width'>signature</Button> */}
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
                                        disabled={!Tripsheet_modify}
                                        onClick={() => {
                                          handlesignaturemageDownload()
                                        }}
                                      >
                                        DOWNLOAD
                                      </Button>
                                      <Button variant="contained" onClick={() => {
                                        handlesignaturemageDelete()

                                      }} color="primary" disabled={!Tripsheet_delete}>
                                        Delete
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                                <div className="in-feild" style={{ marginTop: '10px' }}>
                                  {/* <div className="input">
                                    <Button disabled={!Tripsheet_modify} onClick={handleButtonClick} variant='outlined' className='full-width'>Manual Marking</Button>
                                  </div> */}
                                  <div className="input">
                                    {manualTripID.length > 0 ?
                                      <Button variant='outlined' disabled={!Tripsheet_modify || (superAdminAccess === "0" && temporaryStatus)} className='full-width' onClick={handleEditMap}>Edit Map</Button> :
                                      <Button variant='outlined' disabled={!Tripsheet_modify || (superAdminAccess === "0" && temporaryStatus)} className='full-width' onClick={handleEditMap} >Manual Marking</Button>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="table-TripSheet right-buttons">
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
                            </div>
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
                                        // style={{
                                        //   maxWidth: '100%',
                                        //   maxHeight: '600px',
                                        //   width: '100%',
                                        //   height: '600px',
                                        //   border: 'none',
                                        // }}
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '90vh',
                                          width: '90vw',
                                          height: '80vh',
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
                                  // disabled={!Tripsheet_delete}
                                  disabled={!Tripsheet_modify || (superAdminAccess === "0" && temporaryStatus)}
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


                          <Modal
                            open={openmodal}
                            onClose={handleClosemodal}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                boxShadow: 24,
                                p: 4,
                              }}
                            >
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography id="modal-title" variant="h6" component="h2">
                                  DELETE MAP
                                </Typography>
                                <IconButton onClick={handleClosemodal}>
                                  <CloseIcon />
                                </IconButton>
                              </Box>

                              <Typography id="modal-description" sx={{ mt: 2 }}>
                                Are You Sure Want To Delete ?
                              </Typography>

                              <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                                <Button onClick={handleCancel} sx={{ mr: 2 }}>
                                  Cancel
                                </Button>
                                <Button variant="contained" onClick={() => {
                                  handleOk();    // First function call
                                  handleClicksnack(); // Second function call (for showing Snackbar)
                                }}>
                                  OK
                                </Button>
                              </Box>
                            </Box>
                          </Modal>


                          <Snackbar
                            open={opensnack}
                            autoHideDuration={3000} // Auto hide after 3 seconds
                            onClose={handleClosesnack}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Top-right position

                          >
                            <Alert onClose={handleClosesnack} severity="success" sx={{ width: '100%' }}>
                              Deleted successfully
                            </Alert>
                          </Snackbar>


                        </TabPanel>
                        <TabPanel value={billing_read ? 2 : 1} sx={{ p: 2 }}>
                          <div className="Customer-Message-Slider">
                            <div className="input-field">
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                <div style={{ display: "blocks" }}>
                                  <Button disabled={!Tripsheet_modify} onClick={generateAndCopyLinkdata}>Generate Link</Button>
                                </div>
                                {appsstatus !== "Closed" && signaturelinkwhatsapp && <WhatsappShareButton url={signaturelinkwhatsapp} title={"Please Click the linke to close E-Tripsheet-"} separator=" - ">
                                  <button>Share on WhatsApp</button>
                                </WhatsappShareButton>
                                }
                                {copydatalink && signaturelinkwhatsapp &&
                                  <CopyField

                                    value={signaturelinkwhatsapp}
                                    onCopySuccess={() => setCopyDataLink(false)}
                                  />
                                }
                              </div>
                              <div>
                                <Button variant="contained" color="primary" onClick={handleRefreshsign}>
                                  Refresh
                                </Button>
                              </div>
                            </div>
                            {signaturelinkcopy ? <p style={{ color: 'green' }}>Link.....</p> : <></>}
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
                        {billing_read ? <TabPanel value={billing_read ? 0 : ""} sx={{ p: 2 }}>
                          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }} className='bill-section'>
                            <div className="Customer-Customer-Bill-Slider bill-section-third  tripsheet-vendor-info-main tripsheet-vendor-info-main-popup">

                              <p className='bill-topics'>Vendor Info</p>
                              <div className="input-field tripsheet-vendor-info-first-input-field">
                                <div className="input-g">
                                  <Autocomplete
                                    fullWidth
                                    size="small"
                                    id="free-solo-vendor_vehicle"
                                    freeSolo
                                    disabled={lockdata}
                                    onChange={(event, value) => {
                                      if (!lockdata) {
                                        handleAutocompleteVendor(event, value, "vendor_vehicle");
                                      } else {
                                        setWarning(true);
                                        setWarningMessage("IS not locked,locked Enter Again");
                                      }
                                    }}
                                    value={vendorinfo?.vendor_vehicle}
                                    options={vehileNames?.map((option) => ({
                                      label: option,
                                    }))}
                                    renderInput={(params) => (
                                      <TextField {...params} label="Rate For - F3" name="vendor_vehicle" inputRef={params.inputRef} />
                                    )}
                                  />
                                </div>
                                <div className="input-g" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                                  <Autocomplete
                                    fullWidth
                                    size="small"
                                    id="free-solo-duty"
                                    freeSolo
                                    sx={{ width: "100%" }}
                                    disabled={lockdata}
                                    onChange={(event, value) => {
                                      if (!lockdata) {
                                        handleAutocompleteVendor(event, value, "vendor_duty")
                                      } else {
                                        setWarning(true);
                                        setWarningMessage("IS not locked,locked Enter Again");
                                      }

                                    }}
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

                                <div className="input-g" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                                  <Checkbox
                                    size="small"
                                    checked={lockdata}
                                    onChange={(event) => setLockData(event.target.checked)}
                                  />
                                  <p style={{ margin: "0px" }}>Lock</p>
                                </div>
                              </div>
                              <div className="input-field" style={{ marginTop: '15px' }}>
                                <div className="input-g" >
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="StartDate"
                                      id="vendorshedOutDate"
                                      // value={vendorinfo.shedOutDate ? dayjs(vendorinfo.shedOutDate) : null || vendorinfo.vendorshedOutDate ? dayjs(vendorinfo.vendorshedOutDate) : null}
                                      value={vendorinfo.vendorshedOutDate ? dayjs(vendorinfo.vendorshedOutDate) : null}
                                      format="DD/MM/YYYY"
                                      disabled={lockdata}
                                      // onChange={(date) => {
                                      onChange={(date) => {
                                        if (!lockdata) {
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
                                <div className="input-g">
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <DatePicker
                                      label="CloseDate"
                                      id="vendorshedInDate"
                                      disabled={lockdata}

                                      // value={vendorinfo.shedInDate ? dayjs(vendorinfo.shedInDate) : null || vendorinfo.vendorshedInDate ? dayjs(vendorinfo.vendorshedInDate) : null}
                                      value={vendorinfo.vendorshedInDate ? dayjs(vendorinfo.vendorshedInDate) : null}
                                      format="DD/MM/YYYY"
                                      // onChange={(date) => { handleDatevendorChange(date, 'vendorshedInDate') }}
                                      onChange={(date) => {
                                        if (!lockdata) {
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

                                <div className="input-g">
                                  <TextField
                                    name="vendortotaldays"
                                    value={calculatevendorTotalDays()}
                                    label="Total Days"
                                    disabled={lockdata}
                                    size="small"
                                    type="number"
                                    id="totaldays"
                                    sx={{ width: "100%" }}
                                  />
                                </div>

                              </div>
                              <div className="input-field" style={{ marginBottom: '10px' }}>
                                <div className="input-g">
                                  <div className='input-g'>
                                    <div className='full-width' style={{ display: 'grid' }}>
                                      <label>Start Time</label>
                                      <input
                                        type="time"
                                        name="venodrreporttime"
                                        value={vendorinfo?.vendorreporttime}
                                        disabled={lockdata}
                                        onChange={(event) => {
                                          if (!lockdata) {
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

                                <div className="input-g">
                                  <div className='closetime tripsheet-shed-in-time'>
                                    <label>Close Time</label>

                                    <input
                                      type="time"
                                      name="vendorshedintime"
                                      value={vendorinfo?.vendorshedintime}
                                      disabled={lockdata}
                                      onChange={(event) => {
                                        if (!lockdata) {
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

                                <div className="input-g">
                                  <TextField
                                    name="vendorTotaltime"
                                    value={calculatevendorTotalTime() || ""}
                                    disabled={lockdata}
                                    label="Total Time"
                                    id="pack5"
                                    size="small"
                                    sx={{ width: "100%" }}
                                  />
                                </div>
                              </div>
                              <div className="input-field">

                                <div className="input-g" >
                                  <TextField
                                    name="vendorshedoutkm"
                                    value={vendorinfo?.vendorshedoutkm || ""}
                                    onChange={handlevendorinfofata}
                                    disabled={lockdata}
                                    label="starting Kilometers"
                                    id="vendorshedoutkm"
                                    size="small"
                                    sx={{ my: 1, width: "100%" }}
                                  />
                                </div>

                                <div className="input-g" >
                                  <TextField
                                    name="vendorshedinkm"
                                    value={vendorinfo?.vendorshedinkm || ""}
                                    label="closing Kilometers"
                                    onChange={handlevendorinfofata}
                                    disabled={lockdata}
                                    id="vendorshedinkm"
                                    size="small"
                                    sx={{ my: 1, width: "100%" }}
                                  />
                                </div>
                                <div className="input-g" >
                                  <TextField
                                    name="vendortotalkm"
                                    value={calculatevendorTotalKilometers() || ''}
                                    disabled={lockdata}
                                    label="Total kilometers"
                                    id="vendortotalkm"
                                    size="small"
                                    sx={{ my: 1, width: "100%" }}
                                  />
                                </div>
                              </div>
                              <div className="input-field">
                                <div className="input-g">
                                  <TextField
                                    name="vendorRemarks"
                                    value={vendorinfo?.vendorRemarks || ""}
                                    onChange={handlevendorinfofata}
                                    disabled={lockdata}
                                    label="Remarks"
                                    id="vendorRemarks"
                                    size="small"
                                    sx={{ my: 1, width: "100%" }}
                                  />
                                </div>
                                <div className="input-g">
                                  <Button
                                    variant='contained'
                                    onClick={handleVendorcalc}
                                    disabled={isEditMode ? !Tripsheet_modify : !Tripsheet_new}
                                  >
                                    Update
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className={Number(superpower) === 1 && billing_read === 1 ? "Customer-Customer-Bill-Slider bill-section-second tripsheet-vendor-bill-main tripsheet-popup-vendor-bill-vendor-info-main" : "Customer-Customer-Bill-Slider tripsheet-vendor-bill-main tripsheet-popup-vendor-bill-vendor-info-main"}>
                              <p className='bill-topics'>Vendor Bill</p>
                              <div className="input-field">
                                <div className="input-g">
                                  <TextField
                                    name="Vendor_Calcpackage"
                                    // value={vendorbilldata.Vendor_Calcpackage || vendorpassvalue.Vendor_Calcpackage || 0}
                                    value={vendorinfo?.vendor_duty === "Transfer" || vendorinfo?.vendor_duty === "Outstation" ? vendorinfo?.vendor_duty : vendorbilldata.Vendor_Calcpackage || vendorpassvalue.Vendor_Calcpackage || 0}
                                    // value={vendorbilldata.Vendor_Calcpackage || vendorpassvalue.Vendor_Calcpackage || 0}
                                    label="Package"
                                    id="Vendor_Calcpackage"
                                    disabled={lockdatavendorbill}
                                    size="small"
                                    sx={{ m: 1, width: "100%" }}
                                  />
                                </div>
                                <div className="input-g">
                                  <TextField
                                    name="Vendor_rateAmount"
                                    value={vendorbilldata.Vendor_rateAmount || vendorpassvalue.Vendor_rateAmount || 0}
                                    size="small"
                                    disabled={lockdatavendorbill}
                                    label="Amount"
                                    autoComplete="password"
                                    id="Vendor_rateAmount"
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
                                <div className="input-g">
                                  <TextField
                                    name="Vendor_ExtraKms"
                                    value={vendorbilldata.Vendor_ExtraKms || vendorpassvalue.Vendor_ExtraKms || 0}
                                    disabled={lockdatavendorbill}
                                    label="Ex.Km"
                                    id="Vendor_ExtraKms"
                                    onChange={handlevendor_billdata}
                                    size="small"
                                  />
                                </div>
                                <div className="input-g">
                                  <span>@</span>
                                  <TextField size="small"
                                    name='Vendor_ExtraAmountKms'
                                    disabled={lockdatavendorbill}
                                    value={vendorbilldata.Vendor_ExtraAmountKms || vendorpassvalue.Vendor_ExtraAmountKms || 0}
                                    onChange={handlevendor_billdata}
                                    id="Vendor_ExtraAmountKms"
                                  />
                                </div>
                                <div className="input-g">
                                  <div className="icone">
                                    <FontAwesomeIcon icon={faEquals} />
                                  </div>
                                  <TextField
                                    name="Vendor_totalAmountKms"
                                    value={vendorExtarkmTotalAmount || vendorbilldata.Vendor_totalAmountKms || vendorpassvalue.Vendor_totalAmountKms || 0}
                                    size="small"
                                    disabled={lockdatavendorbill}
                                    label="Amount"
                                    id="Vendor_totalAmountKms"
                                  />
                                </div>
                              </div>

                              <div className="input-field tripsheet-vendor-bill-amount-input-field">
                                <div className="input-g">
                                  <TextField
                                    name="Vendor_ExtraHours"
                                    value={vendorbilldata.Vendor_ExtraHours || vendorpassvalue.Vendor_ExtraHours || 0}
                                    label="Ex.Hrs"
                                    disabled={lockdatavendorbill}
                                    onChange={handlevendor_billdata}
                                    id="Vendor_ExtraHours"
                                    size="small"
                                  />
                                </div>
                                <div className="input-g">
                                  <span>@</span>
                                  <TextField
                                    size="small"
                                    name='Vendor_ExtraAmountHours'
                                    value={vendorbilldata.Vendor_ExtraAmountHours || vendorpassvalue.Vendor_ExtraAmountHours || 0}
                                    onChange={handlevendor_billdata}
                                    disabled={lockdatavendorbill}
                                    id="Vendor_ExtraAmountHours"
                                  />

                                </div>
                                <div className="input-g">
                                  <div className="icone">
                                    <FontAwesomeIcon icon={faEquals} />
                                  </div>
                                  <TextField
                                    name="Vendor_totalAmountHours"
                                    value={vendorExtrahrTotalAmount || vendorbilldata.Vendor_totalAmountHours || vendorpassvalue.Vendor_totalAmountHours || 0}
                                    size="small"
                                    label="Amount"
                                    disabled={lockdatavendorbill}
                                    id="Vendor_totalAmountHours"
                                  />
                                </div>
                              </div>
                              <div className="input-field tripsheet-vendor-bill-amount-input-field">
                                <div className="input-g">
                                  <TextField
                                    name="Vendor_NightHALT"
                                    value={vendorbilldata.Vendor_NightHALT || vendorpassvalue.Vendor_NightHALT || 0}
                                    onChange={handlevendor_billdata}
                                    disabled={lockdatavendorbill}
                                    label="Night"
                                    id="Vendor_NightHALT"
                                    size="small"
                                  />
                                </div>
                                <div className="input-g">
                                  <span>@</span>
                                  <TextField
                                    size="small"
                                    name='Vendor_NightBataAmount'
                                    value={vendorbilldata.Vendor_NightBataAmount || vendorpassvalue.Vendor_NightBataAmount || 0}
                                    onChange={handlevendor_billdata}
                                    disabled={lockdatavendorbill}
                                    id="Vendor_NightBataAmount"
                                    autoComplete="password"
                                  />
                                </div>
                                <div className="input-g">
                                  <div className="icone">
                                    <FontAwesomeIcon icon={faEquals} />
                                  </div>
                                  <TextField
                                    name="Vendor_NightbataTotalAmount"
                                    value={vendornightdatatotalAmount || vendorbilldata.Vendor_NightbataTotalAmount || vendorpassvalue.Vendor_NightbataTotalAmount || 0}
                                    size="small"
                                    disabled={lockdatavendorbill}
                                    label="Amount"
                                    id="Vendor_NightbataTotalAmount"
                                  />
                                </div>
                              </div>
                              <div className="input-field tripsheet-vendor-bill-amount-input-field">
                                <div className="input-g">
                                  <TextField
                                    name="Vendor_Bata"
                                    value={vendorbilldata.Vendor_Bata || vendorpassvalue.Vendor_Bata || 0}
                                    onChange={handlevendor_billdata}
                                    label="Bata"
                                    disabled={lockdatavendorbill}
                                    id="Vendor_Bata"
                                    autoComplete="password"
                                    size="small"
                                  />
                                </div>
                                <div className="input-g">
                                  <span>@</span>
                                  <TextField
                                    size="small"
                                    name='Vendor_BataAmount'
                                    value={vendorbilldata.Vendor_BataAmount || vendorpassvalue.Vendor_BataAmount || 0}
                                    onChange={handlevendor_billdata}
                                    disabled={lockdatavendorbill}
                                    id="Vendor_BataAmount"
                                  />
                                </div>
                                <div className="input-g">
                                  <div className="icone">
                                    <FontAwesomeIcon icon={faEquals} />
                                  </div>
                                  <TextField
                                    name="Vendor_BataTotalAmount"
                                    value={vendorbilldata.Vendor_BataTotalAmount || vendorpassvalue.Vendor_BataTotalAmount || 0}
                                    size="small"
                                    disabled={lockdatavendorbill}
                                    label="Amount"
                                    id="Vendor_BataTotalAmount"
                                  />
                                </div>
                              </div>
                              <div className="input-field">
                                <div className="input-g">
                                  <TextField
                                    name="Vendor_FULLTotalAmount"
                                    value={vendorbilldata.Vendor_FULLTotalAmount || 0}
                                    size="small"

                                    label="Net Amount"
                                    id="Vendor_FULLTotalAmount"
                                  />
                                </div>
                              </div>

                            </div>
                            {
                              Number(superpower) === 1 && billing_read === 1 ?
                                <div className="Customer-Customer-Bill-Slider Customer-Customer-Bill-Slider-popup">
                                  <p className='bill-topics'>Customer Bill</p>
                                  <div className="input-field">
                                    <div className="input-g">
                                      <div className="icone">
                                        <Inventory2Icon color="action" />
                                      </div>
                                      <TextField
                                        name="pack"
                                        // value={selectedCustomerData?.duty === "Transfer" ? "Transfer" : calcPackage || formData.calcPackage || ratepackage || ''}
                                        value={duty === "Transfer" || duty === "Outstation" ? duty : calcPackage || formData.calcPackage || ratepackage || ''}
                                        label="Pack"
                                        id="pack"
                                        size="small"
                                        variant="standard"
                                        disabled={lockdatacustomerbill}
                                        autoComplete="password"
                                        sx={{ m: 1, width: "60ch" }}
                                      />
                                    </div>
                                    <div className="input-g">
                                      <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                      </div>
                                      <TextField
                                        name="amount5"
                                        value={package_amount || formData.calcPackage || 0}
                                        size="small"
                                        label="Amount"
                                        autoComplete="password"
                                        id="amount5"
                                        variant="standard"
                                        disabled={lockdatacustomerbill}
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                      </div>
                                      <TextField
                                        name="exkm1"
                                        className='customer-bill-input'
                                        value={extraKM || formData.calcPackage || 0}
                                        disabled={lockdatacustomerbill}
                                        onChange={(e) => {
                                          if (!lockdatacustomerbill) {
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                      </div>
                                      <TextField size="small"
                                        name='exkmTkm2'
                                        className='customer-bill-input'
                                        value={extrakm_amount || formData.calcPackage || ''}
                                        onChange={(e) => {

                                          if (!lockdatacustomerbill) {
                                            setextrakm_amount(e.target.value)
                                          } else {
                                            setWarning(true);
                                            setWarningMessage("IS not locked,locked Enter Again");
                                          }
                                        }}
                                        id="exkmTkm2"
                                        variant="standard"
                                        disabled={lockdatacustomerbill}
                                        autoComplete="password"
                                      />
                                    </div>
                                    <div className="input-g">
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
                                        disabled={lockdatacustomerbill}
                                      />
                                    </div>
                                  </div>
                                  <div className="input-field">
                                    <div className="input-g">
                                      <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                      </div>
                                      <TextField
                                        name="exHrs1"
                                        className='customer-bill-input'
                                        value={extraHR || formData.calcPackage || 0}
                                        disabled={lockdatacustomerbill}
                                        onChange={(e) => {

                                          if (!lockdatacustomerbill) {
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                      </div>
                                      <TextField
                                        size="small"
                                        id="exHrsTHrs2"
                                        name='exHrsTHrs2'
                                        className='customer-bill-input'
                                        disabled={lockdatacustomerbill}
                                        value={extrahr_amount || formData.calcPackage || 0}
                                        onChange={(e) => {

                                          if (!lockdatacustomerbill) {
                                            setextrahr_amount(e.target.value)
                                          } else {
                                            setWarning(true);
                                            setWarningMessage("IS not locked,locked Enter Again");
                                          }
                                        }}
                                        variant="standard"
                                      />

                                    </div>
                                    <div className="input-g">
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
                                        disabled={lockdatacustomerbill}
                                      />
                                    </div>
                                  </div>
                                  <div className="input-field">
                                    <div className="input-g">
                                      <div className="icone">
                                        <FontAwesomeIcon icon={faCloudMoon} />
                                      </div>
                                      <TextField
                                        name="night1"
                                        className='customer-bill-input'
                                        value={nightBta}
                                        disabled={lockdatacustomerbill}
                                        onChange={(e) => {
                                          if (!lockdatacustomerbill) {
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                      </div>
                                      <TextField
                                        size="small"
                                        className='customer-bill-input'
                                        name='nightThrs2'
                                        id="nightThrs2"
                                        value={nightCount}
                                        disabled={lockdatacustomerbill}
                                        onChange={(e) => {

                                          if (!lockdatacustomerbill) {
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                      </div>
                                      <TextField
                                        name="amount8"
                                        className='customer-bill-input'
                                        disabled={lockdatacustomerbill}
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                                      </div>
                                      <TextField
                                        name="driverconvenience1"
                                        className='customer-bill-input'
                                        value={driverBeta}
                                        disabled={lockdatacustomerbill}
                                        onChange={(e) => {
                                          if (!lockdatacustomerbill) {
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                      </div>
                                      <TextField
                                        size="small"
                                        name='dtc2'
                                        id='dtc2'
                                        className='customer-bill-input'
                                        value={driverbeta_Count}
                                        disabled={lockdatacustomerbill}
                                        onChange={(e) => {
                                          if (!lockdatacustomerbill) {
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
                                    <div className="input-g">
                                      <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                      </div>
                                      <TextField
                                        name="amount9"
                                        className='customer-bill-input'
                                        value={driverBeta_amount}
                                        disabled={lockdatacustomerbill}
                                        // onChange={(e) => {
                                        //   if (!lockdatacustomerbill) {
                                        //     setdriverBeta_amount(e.target.value)
                                        //   } else {
                                        //     setWarning(true);
                                        //     setWarningMessage("IS not locked,locked Enter Again");
                                        //   }
                                        // }}
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
                                :
                                <></>
                            }
                          </div>
                        </TabPanel>
                          : <></>
                        }
                      </Tabs>
                      <DialogActions className='tripsheet-cancel-save-btn'>
                        <Button className='tripsheet-cancel-button' onClick={handleClose}>Cancel</Button>
                        {isEditMode ?
                          <Button variant="contained" onClick={handleEdit} disabled={superAdminAccess === "0" && temporaryStatus} >
                            Save
                          </Button>
                          : <></>
                        }
                      </DialogActions>
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

                  </Dialog>
                </React.Fragment>

                {/* <div className="input">
                  <div className="icone">
                    <BackupTableSharpIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="vpermettovendor"
                    value={formData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor || ""}
                    onChange={(e) => {
                      handleChange(e)
                      setVendorinfodata({ ...vendorinfo, vendor_vpermettovendor: e.target.value })
                    }}
                    label="Vendor permit"
                    id="vpermettovendor"
                    autoComplete="password"
                  />
                </div> */}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <BackupTableSharpIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      name="vpermettovendor"
                      value={formData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor || ''}
                      // onChange={(e) => {
                      //   handleChange(e);
                      //   setVendorinfodata({
                      //     ...vendorinfo,
                      //     vendor_vpermettovendor: e.target.value,
                      //   });
                      // }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Vendor permit"
                      id="vpermettovendor"
                      autoComplete="password"
                    />
                  </div>}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <FontAwesomeIcon icon={faSquareParking} />
                    </div>
                    <TextField
                      size="small"
                      name="vendorparking"
                      value={formData.vendorparking || selectedCustomerData.vendorparking || book.vendorparking || ""}
                      // onChange={(e) => {
                      //   handleChange(e)
                      //   setVendorinfodata({ ...vendorinfo, vendor_vendorparking: e.target.value })
                      // }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Vendor Parking"
                      id="vendorparking"
                      autoComplete="password"
                    />
                  </div>}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <MinorCrashSharpIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      name="vendortoll"
                      value={formData.vendortoll || selectedCustomerData.vendortoll || book.vendortoll || ""}
                      // onChange={(e) => {
                      //   handleChange(e)
                      //   setVendorinfodata({ ...vendorinfo, vendor_toll: e.target.value })
                      // }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Vendor Toll"
                      id="vendor-vendortoll"
                      autoComplete="password"
                    />
                  </div>}





                <div className="input tripsheet-remarks-division">
                  <div className="icone">
                    <MarkChatReadIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="remark"
                    value={formData.remark || selectedCustomerData.remark || book.remark || ''}
                    disabled={temporaryStatus && superAdminAccess === "0"}
                    onChange={(e) => {
                      handleChange(e);

                    }}
                    label="Remarks"
                    id="remark"
                    multiline
                    rows={3}
                    sx={{ width: "100%" }}
                    autoComplete="password"
                  />
                </div>

                {/* <div className="input">
                  <div className="icone">
                <AccountBalanceWalletTwoToneIcon color="action" />
              </div>
                  <TextField
                    name="fuelamount"
                    value={formData.fuelamount || selectedCustomerData.fuelamount|| book.fuelamount || ''}
                    onChange={handleChange}
                    label="Fuel Amount"
                    id="fuelamount"
                    size='small'
                    autoComplete="password"
                  />
                </div> */}
                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <AccountBalanceWalletTwoToneIcon color="action" />
                    </div>
                    <TextField
                      margin="normal"
                      size="small"
                      name="fuelamount"
                      value={vendorinfo.fuelamount || ""}
                      onChange={(e) => {
                        // handleChange(e)
                        setVendorinfodata({ ...vendorinfo, fuelamount: e.target.value })
                      }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Fuel Amount"
                      id="fuelamount"
                      autoComplete="password"
                      style={{ marginBottom: '20px' }}
                    />
                    {/* <TextField
                          margin="normal"
                          size="small"
                          name="fuelamount"
                          value={formData.fuelamount || selectedCustomerData.fuelamount || book.fuelamount|| ""}
                          onChange={(e) => {
                            handleChange(e)
                            setVendorinfodata({ ...vendorinfo, vendor_fuelamount: e.target.value })
                          }}
                          label="Fuel Amount"
                          id="fuelamount"
                          autoComplete="password"
                          style={{marginBottom:'20px'}}
                        /> */}
                  </div>}

                {emptyState ? "" :
                  <div className="input">
                    <div className="icone">
                      <CurrencyRupeeTwoToneIcon color="action" />
                    </div>
                    <TextField
                      margin="normal"
                      size="small"
                      name="advancepaidtovendor"
                      value={formData.advancepaidtovendor || selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor || ""}
                      onChange={(e) => {
                        handleChange(e)
                        setVendorinfodata({ ...vendorinfo, vendor_advancepaidtovendor: e.target.value, advancepaidtovendor: e.target.value })
                      }}
                      disabled={temporaryStatus && superAdminAccess === "0"}
                      label="Vendor Advance"
                      id="advance-paid-to-vendor"
                      autoComplete="password"
                      style={{ marginBottom: '20px' }}
                    />
                  </div>}

                <div className="input">
                  <div className="icone">
                    <PaymentsIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customeradvance"
                    value={formData.customeradvance || selectedCustomerData.customeradvance || book.customeradvance || ''}
                    onChange={handleChange}
                    label="Customer Advance"
                    id="customer-advance"
                    autoComplete="password"
                    disabled={Number(superpower) === 0}
                  />
                </div>


                <div style={{ display: "flex", flexWrap: "nowrap" }}>



                  <div className="input-tripsheet-btns-overview tripsheet-calculate-input">
                    <Button variant="contained"
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
                      Overview
                    </Button>
                  </div>
                  <Dialog open={popupOpen} onClose={handlePopupClose} maxWidth="md">
                    <DialogContent style={{ width: '210mm', maxWidth: 'none' }}>
                      {dayhcl === 1 ? (<InvoiceHCL customerAddress={customerAddress} fueltype={fueltype} pack={calcPackage || formData.calcPackage} airportTransfer={transferreport} tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={logoImage} attachedImage={attachedImage} routeData={routeData} Totaltimes={calculatewithoutadditonalhour()} TotalDays={calculateTotalDay()} book={book} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} />)
                        : (<Invoice tripSheetData={tripSheetData} organizationdata={organizationdata} selectedImage={logoImage} attachedImage={attachedImage} routeData={routeData} Totaltimes={calculatewithoutadditonalhour()} book={book} TotalDays={calculateTotalDay()} signimageUrl={signimageUrl} GmapimageUrl={GmapimageUrl} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} />)}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handlePopupClose} variant="contained" color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <div className="input-tripsheet-btns">
                    {isEditMode ? (<>
                      {/* <Button variant="contained" disabled={!Tripsheet_modify} onClick={handleEdit}>Edit</Button> */}
                      {editButtonStatusCheck && superAdminAccess === "0" ? "" : <LoadingButton loading={isEditload} variant="contained" disabled={!Tripsheet_modify} onClick={handleEdit}>Edit</LoadingButton>}
                    </>
                    ) : (
                      // <Button variant="contained" disabled={!Tripsheet_new} onClick={handleAdd} >Add</Button>
                      <LoadingButton loading={isAddload} variant="contained" disabled={!Tripsheet_new} onClick={handleAdd} >Add</LoadingButton>
                    )}
                  </div>
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
                        disabled={hideField && superAdminAccess === "0"}
                        onChange={(event, value) => handleAutocompleteChange(event, value, "hireTypes")}
                        value={
                          formData.hireTypes ||
                          formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                        options={HireTypes.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label
                          || formData.hireTypes
                          || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
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
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-travelmail"
                        freeSolo
                        sx={{ width: "100%" }}
                        disabled={hideField && superAdminAccess === "0"}
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
                        <RateReviewIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="vehicleRegno"
                        freeSolo
                        sx={{ width: "100%" }}
                        disabled={hideField && superAdminAccess === "0"}
                        onChange={(event, value) => handleVehicleChange(event, value, "vehRegNo")}
                        onInputChange={(event, value) => handleVehicleChange(event, value, "vehRegNo")}  // Handle manual input
                        onKeyDown={handleKeyEnterdriver}
                        value={selectedCustomerData?.vehRegNo || book.vehRegNo || ''}  // Reflect vehRegNo correctly
                        options={vechiledata?.map((option) => ({ label: option?.vehRegNo }))}  // Map vehRegNo from data
                        getOptionLabel={(option) => typeof option === "string" ? option : option.label || ''}  // Adjust to show input value or option label
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Veh Reg No"
                            name="vehRegNo"
                            inputRef={params.inputRef}
                          />
                        )}
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
                          selectedCustomerData.vehType ||
                          book.vehType || ""
                        }
                        options={vehicaleinfos?.map((option) => ({
                          label: option?.Option,
                        }))}
                        onChange={(event, value) =>
                          handleAutocompleteChange(event, value, "vehType")
                        }
                        disabled={hideField && superAdminAccess === "0"}
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
                        disabled={hideField && superAdminAccess === "0"}
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
                        disabled={hideField && superAdminAccess === "0"}
                        onChange={(event, value) => {
                          handleAutocompleteChange(event, value, "vehicleName");
                          if (lockdata && value) {
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
                        value={
                          selectedCustomerData.Groups ||
                          formData.Groups ||
                          selectedCustomerDatas.Groups ||
                          book.Groups || ""
                        }
                        disabled={hideField && superAdminAccess === "0"}
                        options={GroupTypes ? GroupTypes.map((option) => ({ label: option?.Option })) : []} // Fallback to an empty array
                        onChange={(event, value) => handleAutocompleteChange(event, value, "Groups")}
                        renderInput={(params) => {
                          return (
                            <TextField {...params} label="Groups" inputRef={params.inputRef} />
                          );
                        }}

                      />
                    </div>

                    {/* <div className="input">
                      <div className="icone">
                        <AirlineSeatReclineExtraIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="driverName"
                        freeSolo
                        sx={{ width: "100%" }}
                        disabled={hideField && superAdminAccess === "0"}
                        onChange={(event, value) => handleDriverChange(event, value, "driverName")}
                        onInputChange={(event, value) => handleDriverChange(event, value, "driverName")} // Handle manual input
                        // onKeyDown={handleKeyEnterdriver}
                        value={selectedCustomerData?.driverName || book.driverName || ""} // Reflect the driverName correctly
                        options={drivername?.map((option) => ({ label: option.drivername }))} // Map drivername from data
                        getOptionLabel={(option) => (typeof option === "string" ? option : option.label || "")} // Adjust to show input value or option label
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Driver Name"
                            name="driverName"
                            inputRef={params.inputRef}
                            onChange={(e) => {
                              handleChange(e);
                              const value = e.target.value;
                              setSelectedCustomerDatas({ ...selectedCustomerDatas, driverName: value });
                              setFormData({ ...formData, driverName: value });
                              setSelectedCustomerData({ ...selectedCustomerData, driverName: value });
                              setFormValues({ ...formValues, driverName: value });
                              setBook({ ...book, driverName: value });

                              if (!lockdata) {
                                setVendorinfodata({ ...vendorinfo, driverName: value });
                              }
                            }}
                          />
                        )}
                      />
                    </div> */}

                    <div className="input">
                      <div className="icone">
                        <AirlineSeatReclineExtraIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="driverName"
                        freeSolo
                        sx={{ width: "100%" }}
                        disabled={hideField && superAdminAccess === "0"}
                        onChange={(event, value) => handleDriverChange(event, value, "driverName")}
                        onInputChange={(event, value) => handleDriverChange(event, value, "driverName")}  // Handle manual input
                        // onKeyDown={handleKeyEnterdriver}
                        value={selectedCustomerData?.driverName || book.driverName || ""} // Reflect the driverName correctly
                        options={drivername?.map((option) => ({ label: option.drivername }))} // Map drivername from data
                        getOptionLabel={(option) => typeof option === "string" ? option : option.label || ''} // Adjust to show input value or option label
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Driver Name"
                            name="driverName"
                            inputRef={params.inputRef}
                          />
                        )}
                      />
                    </div>

                    <div className="input">
                      <div className="icone">
                        <PhoneIphoneIcon color="action" />
                      </div>
                      <TextField
                        name="mobileNo"
                        className='full-width'
                        value={
                          selectedCustomerData.mobileNo ||
                          book.mobileNo || selectedCustomerDatas.mobileNo || formData.mobileNo || ""}
                        onChange={handleChange}
                        disabled={hideField && superAdminAccess === "0"}
                        label="Driver Phone"
                        id="mobileNo"
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
                        disabled={hideField && superAdminAccess === "0"}
                        label="Travels Email"
                        id="travelsemail"
                        size='small'
                      />
                    </div>
                  </div>
                  {/* {selectedStatus === "Temporary Closed" && ( */}
                  {selectedStatuschecking === "Temporary Closed" && (
                    <div className='box-Container'>
                      <div className='bill-topi' style={{ paddingBottom: '6px', paddingLeft: '250px', fontWeight: 600, fontSize: '20px', }}>Vendor Info</div>
                      <div className="input-field tripsheet-vendor-info-first-input-field">
                        <div className="input-g">
                          <Autocomplete
                            fullWidth
                            size="small"
                            id="free-solo-vendor_vehicle"
                            freeSolo

                            onChange={(event, value) => {
                              if (!lockdata) {
                                handleAutocompleteVendor(event, value, "vendor_vehicle");
                              } else {
                                setWarning(true);
                                setWarningMessage("IS not locked,locked Enter Again");
                              }
                            }}

                            disabled={hideField && superAdminAccess === "0"}
                            value={vendorinfo?.vendor_vehicle}
                            options={vehileNames?.map((option) => ({
                              label: option,
                            }))}
                            renderInput={(params) => (
                              <TextField {...params} label="Rate For - F3" name="vendor_vehicle" inputRef={params.inputRef} />
                            )}
                          />
                        </div>
                        <div className="input-g" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                          <Autocomplete
                            fullWidth
                            size="small"
                            id="free-solo-duty"
                            freeSolo
                            sx={{ width: "100%" }}

                            disabled={hideField && superAdminAccess === "0"}
                            onChange={(event, value) => {
                              if (!lockdata) {
                                handleAutocompleteVendor(event, value, "vendor_duty")
                              } else {
                                setWarning(true);
                                setWarningMessage("IS not locked,locked Enter Again");
                              }
                            }}
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

                        <div className="input-g" style={{ alignItems: "center", gap: "5px", display: "flex" }}>
                          <Checkbox
                            size="small"
                            checked={lockdata}
                            onChange={(event) => setLockData(event.target.checked)}
                          />
                          <p style={{ margin: "0px" }}>Lock</p>
                        </div>
                      </div>
                      <div className="input-field" style={{ marginTop: '15px' }}>
                        <div className="input-g" >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="StartDate"
                              id="vendorshedOutDate"
                              disabled={lockdata}
                              // value={vendorinfo.shedOutDate ? dayjs(vendorinfo.shedOutDate) : null || vendorinfo.vendorshedOutDate ? dayjs(vendorinfo.vendorshedOutDate) : null}
                              value={vendorinfo.vendorshedOutDate ? dayjs(vendorinfo.vendorshedOutDate) : null}
                              format="DD/MM/YYYY"
                              // onChange={(date) => {
                              onChange={(date) => {
                                if (!lockdata) {
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
                        <div className="input-g">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DatePicker
                              label="CloseDate"
                              id="vendorshedInDate"
                              disabled={lockdata}


                              // value={vendorinfo.shedInDate ? dayjs(vendorinfo.shedInDate) : null || vendorinfo.vendorshedInDate ? dayjs(vendorinfo.vendorshedInDate) : null}
                              value={vendorinfo.vendorshedInDate ? dayjs(vendorinfo.vendorshedInDate) : null}
                              format="DD/MM/YYYY"
                              // onChange={(date) => { handleDatevendorChange(date, 'vendorshedInDate') }}
                              onChange={(date) => {
                                if (!lockdata) {
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

                        <div className="input-g">
                          <TextField
                            name="vendortotaldays"
                            value={calculatevendorTotalDays()}
                            label="Total Days"
                            disabled={lockdata}
                            size="small"
                            type="number"
                            id="totaldays"
                            sx={{ width: "100%" }}
                          />
                        </div>

                      </div>
                      <div className="input-field" style={{ marginBottom: '10px' }}>
                        <div className="input-g">
                          <div className='input-g'>
                            <div className='full-width' style={{ display: 'grid' }}>
                              <label>Start Time</label>
                              <input
                                type="time"
                                name="venodrreporttime"
                                disabled={lockdata}
                                value={vendorinfo?.vendorreporttime}
                                onChange={(event) => {
                                  if (!lockdata) {
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

                        <div className="input-g">
                          <div className='closetime tripsheet-shed-in-time'>
                            <label>Close Time</label>

                            <input
                              type="time"
                              name="vendorshedintime"
                              disabled={lockdata}
                              value={vendorinfo?.vendorshedintime}
                              onChange={(event) => {
                                if (!lockdata) {
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
                        <div className="input-g">
                          <TextField
                            name="vendorTotaltime"
                            value={calculatevendorTotalTime() || ""}
                            disabled={lockdata}
                            label="Total Time"
                            id="pack5"
                            size="small"
                            sx={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="input-field">

                        <div className="input-g" >
                          <TextField
                            name="vendorshedoutkm"
                            value={vendorinfo?.vendorshedoutkm || ""}
                            disabled={lockdata}
                            onChange={handlevendorinfofata}
                            label="starting Kilometers"
                            id="vendorshedoutkm"
                            size="small"
                            sx={{ my: 1, width: "100%" }}
                          />
                        </div>

                        <div className="input-g" >
                          <TextField
                            name="vendorshedinkm"
                            value={vendorinfo?.vendorshedinkm || ""}
                            disabled={lockdata}
                            label="closing Kilometers"
                            onChange={handlevendorinfofata}
                            id="vendorshedinkm"
                            size="small"
                            sx={{ my: 1, width: "100%" }}
                          />
                        </div>
                        <div className="input-g" >
                          <TextField
                            name="vendortotalkm"
                            value={calculatevendorTotalKilometers() || ''}
                            label="Total kilometers"
                            disabled={lockdata}
                            id="vendortotalkm"
                            size="small"
                            sx={{ my: 1, width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="input-field">
                        <div className="input-g">
                          <TextField
                            name="vendorRemarks"
                            value={vendorinfo?.vendorRemarks || ""}
                            onChange={handlevendorinfofata}
                            disabled={lockdata}
                            label="Remarks"
                            id="vendorRemarks"
                            size="small"
                            sx={{ my: 1, width: "100%" }}
                          />
                        </div>
                        <div className="input-g">
                          <Button
                            variant='contained'
                            onClick={handleVendorcalc}
                            disabled={isEditMode ? !Tripsheet_modify : !Tripsheet_new}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    {/* {selectedStatus !== "Temporary Closed" && ( */}
                    {selectedStatuschecking !== "Temporary Closed" && (
                      <div className="tripsheet-table1 Scroll-Style">
                        <table className="table-condensed table-striped fixed_header">
                          <thead className="BI_tablehead">
                            <tr>
                              <th className="table-head-booking table-heading-1">Driver name</th>
                              <th className="table-head-booking">Vehicle Name</th>
                              <th className="table-head-booking">Vehicle Reg No</th>
                              <th className="table-head-booking">Travels Name</th>
                            </tr>
                          </thead>
                          <tbody className="BI_tablebody Scroll-Style">
                            {driverdetails.length === 0 ? (
                              <tr>
                                <td colSpan={4}>No data available.</td>
                              </tr>
                            ) : (
                              driverdetails.map((row) => (
                                <tr key={row.id} onClick={() => handleRowClick(row)}>
                                  <td>{row.driverName}</td>
                                  <td>{row.vehicleName}</td>
                                  <td>{row.vehRegNo}</td>
                                  <td>{row.travelsname}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div >
              <Modal
                open={mapPopUp}
                onClose={handleCloseMapPopUp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style1}>
                  <Box>

                    {/* <div className='closebuttonhover'>
                        <IconButton onClick={handleCloseMapPopUp}>
                          <CloseIcon />
                        </IconButton>
                      </div> */}

                    <div style={{ display: 'flex', justifyContent: "space-between" }}>


                      <div style={{ display: 'flex', gap: "20px", padding: '0px', flexWrap: "nowrap", }}>
                        <label style={{ fontWeight: "600" }}>  Trip Id :<span>{tripid}</span> </label>
                        <label style={{ fontWeight: '600' }}>Start Date : <span>{dayjs(startdate).format("DD/MM/YYYY")}</span></label>
                        <label style={{ fontWeight: '600' }}>Close Date : <span>{dayjs(closedate).format("DD/MM/YYYY")}</span></label>
                        <label style={{ fontWeight: '600' }}>Start Time : <span>{removeSeconds(starttime)}</span></label>
                        <label style={{ fontWeight: '600' }}>Close Time : <span>{removeSeconds(endtime)}</span> </label>
                        <label style={{ display: "flex", gap: '10px' }}>
                          <span style={{ fontWeight: 'bold', height: "50px", display: "flex", flexWrap: 'nowrap', gap: "10px" }}>
                            <span style={{ fontWeight: '600' }}>Remarks</span>
                            <span> :</span>

                          </span>

                          <span style={{ height: '50px', border: "1px solid #ccc", overflow: 'auto', width: "300px", padding: "5px" }}>{formData.remark || selectedCustomerData.remark || book.remark}</span>

                        </label>                        </div>
                      {/* <div style={{ width: '60%', display: "flex", justifyContent: "space-around", padding: '10px' }}>
                          <label style={{ display: "flex", gap: '10px' }}>
                            <span style={{ fontWeight: 'bold', height: "50px", display: "flex", flexWrap: 'nowrap', gap: "10px" }}>
                              <span style={{ fontWeight: '600' }}>Remarks</span>
                              <span> :</span>

                            </span>

                            <span style={{ height: '50px', border: "1px solid #ccc", overflow: 'auto',width:"600px" }}>{formData.remark || selectedCustomerData.remark || book.remark}</span>

                          </label>

                        </div> */}
                      <div className='closebuttonhover'>
                        <IconButton onClick={handleCloseMapPopUp}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </div>

                  </Box>
                  <EditMapCheckComponent tripid={tripid} edit="editMode" starttime={starttime} startdate={startdate} closedate={closedate} closetime={endtime} />


                  {/* <EditMapComponent tripid={tripid} edit="editMode" starttime={starttime} startdate={startdate} closedate={closedate} closetime={endtime} /> */}

                  {/* <EditMapComponent startLatitude1={startLatitude} startLongitude1={startLongitude} endLatitude1={endLatitude} endLongitude1={endLongitude} wayLatitude1={wayLatitude} wayLongitude1={wayLongitude}tripid={tripid} edit="editMode" /> */}
                  {/* <MapComponent startLatitude={startLatitude} startLongitude={startLongitude} endLatitude={endLatitude} endLongitude={endLongitude} wayLatitude={wayLatitude} wayLongitude={wayLongitude} edit="editMode" /> */}
                </Box>
              </Modal>
            </div>

            <div>
              <Box className="common-speed-dail">
                <StyledSpeedDial
                  ariaLabel="SpeedDial playground example"
                  icon={<SpeedDialIcon />}
                  direction="left"
                >
                  {Tripsheet_modify === 1 && isEditMode && (
                    <SpeedDialAction
                      key="edit"
                      icon={<ModeEditIcon />}
                      tooltipTitle="Edit"
                      onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                    />
                  )}
                  {Tripsheet_delete === 1 && isEditMode && (
                    <SpeedDialAction
                      key="delete"
                      icon={<DeleteIcon />}
                      tooltipTitle="Delete"
                      onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                    />
                  )}
                  {Tripsheet_new === 1 && !isEditMode && (
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

          {open == false &&
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

          }


        </form>
      </div >
    </div >
  );
};

export default TripSheet;