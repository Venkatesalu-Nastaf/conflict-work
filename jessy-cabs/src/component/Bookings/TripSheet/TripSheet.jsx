import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import "./TripSheet.css";
import {
  Apps,
  VehicleRate,
  Status,
  HireTypes,
  Department,
  DocumentType,
  Duty,
  Pickup,
  Email,
  Select,
} from "./TripSheetdata";
import dayjs from "dayjs";
import { Table } from "@mui/joy";
import Tabs from "@mui/joy/Tabs";
import Box from "@mui/material/Box";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Invoice from '../Invoice/Invoice';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { useLocation } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationCityIcon from "@mui/icons-material/LocationCity";
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
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faStamp } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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

const actions = [
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];

const maplogcolumns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripid", headerName: "TripSheet No", width: 130 },
  { field: "date", headerName: "Trip Date", width: 160 },
  { field: "time", headerName: "Trip Time", width: 130 },
  { field: "trip_type", headerName: "Trip Type", width: 160 },
  { field: "place_name", headerName: "Place Name", width: 600 },
];

const TripSheet = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
    vehType: '',
    driverName: '',
    vehRegNo: '',
    mobileNo: '',
  });
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);
  const [starttime, setStartTime] = useState('');
  const [closetime, setCloseTime] = useState('');
  const [reporttime, setreporttime] = useState('');
  const [shedintime, setshedintime] = useState('');
  const [starttime2, setStartTime2] = useState('');
  const [closetime2, setCloseTime2] = useState('');
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const [error, setError] = useState(false);
  const [shedKilometers, setShedKilometers] = useState('');
  const [additionalTime, setAdditionalTime] = useState('');
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [imgpopupOpen, setimgPopupOpen] = useState(false);
  const [mapimgpopupOpen, setMapimgPopupOpen] = useState(false);
  const [maplogimgpopupOpen, setMaplogimgPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});

  const [link, setLink] = useState('');
  const [isSignatureSubmitted] = useState(false);

  const [packageData, setPackageData] = useState({
    customer: '',
    vehType: '',
    duty: '',
    totalkm1: '',
    totaltime: '',
  });
  const [packageDetails, setPackageDetails] = useState({
    KMS: '',
    Hours: '',
    duty: '',
  });

  // const handleButtonClick = () => {
  //   const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
  //   console.log('Received tripid:', tripid);
  //   if (!tripid) {
  //     setError(true);
  //     setErrorMessage("please enter the tripid");
  //   }
  //   else {
  //     localStorage.setItem('selectedTripid', tripid);
  //     const newTab = window.open('/navigationmap', '_blank', 'noopener,noreferrer');
  //     newTab.focus();
  //   }
  // };

  const handleButtonClick = () => {
    const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
    console.log('Received tripid:', tripid);

    if (!tripid) {
      setError(true);
      setErrorMessage("Please enter the tripid");
    } else {
      localStorage.setItem('selectedTripid', tripid);

      // Open a new tab for the map with the tripid
      const newTab = window.open('/navigationmap', '_blank', 'noopener,noreferrer');

      // Check if the new tab is not null before focusing
      if (newTab) {
        newTab.focus();
      } else {
        console.error('Failed to open a new tab. Please check your popup settings.');
      }
    }
  };

  //generate link

  const generateLink = async () => {
    try {
      const tripid = selectedCustomerData.tripid || formData.tripid || book.tripid;
      const response = await axios.post(`http://localhost:8081/generate-link/${tripid}`)
      setLink(response.data.link);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const [mapimageUrl, setMapImageUrl] = useState('');
  const handleTripmapClick = async () => {
    try {
      const tripid = selectedRow?.tripid || book?.tripid || selectedCustomerData?.tripid || formData?.tripid;
      if (!tripid) {
        setError(true);
        setErrorMessage("Please enter the tripid");
      }
      const response = await fetch(`http://localhost:8081/get-mapimage/${tripid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const imageUrl = URL.createObjectURL(await response.blob());
      console.log('map image url', imageUrl);
      setMapImageUrl(imageUrl);
      setMapimgPopupOpen(true);
    } catch (error) {
      console.error('Error fetching map image:', error.message);
    }
  };

  const handleTripmaplogClick = async () => {
    try {
      const tripid = selectedRow?.tripid || book?.tripid || selectedCustomerData?.tripid || formData?.tripid;
      if (!tripid) {
        setError(true);
        setErrorMessage("Please enter the tripid");
      } else {
        const response = await axios.get(`http://localhost:8081/get-gmapdata/${tripid}`);
        const data = response.data;
        console.log('logmap', data)
        setRow(data);

        setMaplogimgPopupOpen(true);
      }
    } catch (error) {
      console.error('Error fetching map image:', error.message);
    }
  };

  //refresh button function
  const handleRefresh = async () => {
    const tripid = book.tripid || selectedCustomerData.tripid || formData.tripid;
    try {
      if (!tripid) {
        setError(true);
        setErrorMessage("Please enter the tripid");
      } else {
        console.log('Refresh button clicked');
        const response = await axios.get(`http://localhost:8081/tripuploadcollect/${tripid}`);
        const data = response.data;
        setRows(data);
      }
    } catch (error) {
      console.error('Error Refreshing customer:', error);
    }
  };
  //list data in row
  const [imageUrl, setImageUrl] = useState('');
  const handleTripRowClick = (params) => {
    setSelectedRow(params.row);
    console.log('Selected Image Path:', params.row.path);
    // Encode the path segment to handle special characters
    const encodedPath = encodeURIComponent(params.row.path);
    setimgPopupOpen(true);
    setImageUrl(`http://localhost:8081/get-image/${encodedPath}`);
  };
  const handleimgPopupClose = () => {
    setimgPopupOpen(false);
    setMapimgPopupOpen(false);
    setMaplogimgPopupOpen(false);
  };
  const [formValues, setFormValues] = useState({
    guestname: '',
    guestmobileno: '',
    email: '',
    pickup: '',
    useage: '',
    hireTypes: '',
    department: '',
    vehType: '',
    vehRegNo: '',
    driverName: '',
    mobileNo: '',
    reporttime: '',
    startdate: '',
  });
  const [sendEmail, setSendEmail] = useState(false);

  const handlecheck = async () => {
    if (sendEmail) {
      try {
        const dataToSend = {
          guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname,
          guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno,
          email: formValues.email || selectedCustomerData.email || book.email || formData.email,
          pickup: formValues.pickup || selectedCustomerData.pickup || book.pickup || formData.pickup,
          useage: formValues.useage || selectedCustomerData.useage || book.useage || formData.useage,
          hireTypes: formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || formData.hireTypes,
          department: formValues.department || selectedCustomerData.department || book.department || formData.department,
          vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
          vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
          driverName: formValues.driverName || selectedCustomerData.driverName || book.driverName || formData.driverName,
          mobileNo: formValues.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || formData.mobileNo
        };
        await axios.post('http://localhost:8081/send-tripsheet-email', dataToSend);
        setSuccess(true);
        console.log(dataToSend);
      } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email');
      }
    } else {
      console.log('Send mail checkbox is not checked. Email not sent.');
    }
  };

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusValue = params.get('status') || 'opened';
    const appsValue = params.get('apps') || 'Waiting';
    const formData = {};

    const parameterKeys = [
      'tripid', 'bookingno', 'status', 'billingno', 'apps', 'customer', 'orderedby', 'mobile', 'guestname', 'guestmobileno', 'email', 'address1', 'streetno', 'city', 'chireTypesity', 'department', 'vehRegNo', 'vehType', 'driverName', 'mobileNo', 'driversmsexbetta', 'gps', 'duty', 'pickup', 'useage', 'request', 'startdate', 'closedate', 'totaldays', 'employeeno', 'reporttime', 'starttime', 'closetime', 'shedintime', 'additionaltime', 'advancepaidtovendor', 'customercode', 'startkm', 'closekm', 'shedkm', 'shedin', 'shedout', 'permit', 'parking', 'toll', 'vpermettovendor', 'vendortoll', 'customeradvance', 'email1', 'remark', 'smsguest', 'documentnotes', 'VendorTripNo', 'vehicles', 'duty1', 'startdate1', 'closedate1', 'totaldays1', 'locks', 'starttime2', 'closetime2', 'totaltime', 'startkm1', 'closekm1', 'totalkm1', 'remark1', 'caramount', 'minkm', 'minhrs', 'package', 'amount', 'exkm', 'amount1', 'exHrs', 'amount2', 'night', 'amount3', 'driverconvenience', 'amount4', 'exkmTkm', 'exHrsTHrs', 'nightThrs', 'dtc', 'dtc2', 'nightThrs2', 'exkmTkm2', 'exHrsTHrs2', 'netamount', 'vehcommission', 'caramount1', 'manualbills', 'pack', 'amount5', 'exkm1', 'amount6', 'exHrs1', 'amount7', 'night1', 'amount8', 'driverconvenience1', 'amount9', 'rud', 'netamount1', 'discount', 'ons', 'manualbills1', 'balance', 'fcdate', 'taxdate', 'insdate', 'stpermit', 'maintenancetype', 'kilometer', 'selects', 'documenttype', 'on1', 'smsgust', 'booker', 'emailcheck', 'manualbillss', 'reload'
    ];
    console.log('tripsheet colected data from dispatch', parameterKeys.value);

    // Loop through the parameter keys and set the formData if the parameter exists and is not null or "null"
    parameterKeys.forEach(key => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        formData[key] = value;
      }
    });

    // Set the status separately
    formData['status'] = statusValue;
    formData['apps'] = appsValue;
    setTripSheetData(formData);
    setBook(formData);
    setFormData(formData);
  }, [location]);

  useEffect(() => {
    // Clear URL parameters
    window.history.replaceState(null, document.title, window.location.pathname);

    // Reset form data to initial/default values
    const initialFormData = {}; // You can set the initial/default values here
    setFormData(initialFormData);
  }, []);

  const [book, setBook] = useState({
    tripid: '',
    bookingno: '',
    status: '',
    billingno: '',
    apps: '',
    customer: '',
    orderedby: '',
    mobile: '',
    guestname: '',
    guestmobileno: '',
    email: '',
    address1: '',
    streetno: '',
    city: '',
    hireTypes: '',
    department: '',
    vehRegNo: '',
    vehType: '',
    driverName: '',
    mobileNo: '',
    driversmsexbetta: '',
    gps: '',
    duty: '',
    pickup: '',
    useage: '',
    request: '',
    startdate: '',
    closedate: '',
    employeeno: '',
    reporttime: '',
    starttime: '',
    closetime: '',
    shedintime: '',
    advancepaidtovendor: '',
    customercode: '',
    shedkm: '',
    shedin: '',
    shedout: '',
    startkm: '',
    closekm: '',
    permit: '',
    parking: '',
    toll: '',
    vpermettovendor: '',
    vendortoll: '',
    customeradvance: '',
    email1: '',
    documentnotes: '',
    VendorTripNo: '',
    vehicles: '',
    duty1: '',
    startdate1: '',
    closedate1: '',
    totaldays: '',
    starttime2: '',
    closetime2: '',
    totaltime: '',
    startkm1: '',
    closekm1: '',
    totalkm1: '',
    remark: '',
    caramount: '',
    minkm: '',
    minhrs: '',
    package: '',
    amount: '',
    exkm: '',
    amount1: '',
    exHrs: '',
    amount2: '',
    night: '',
    amount3: '',
    driverconvenience: '',
    amount4: '',
    netamount: '',
    vehcommission: '',
    manualbills: '',
    pack: '',
    amount5: '',
    exkm1: '',
    amount6: '',
    exHrs1: '',
    amount7: '',
    night1: '',
    amount8: '',
    driverconvenience1: '',
    amount9: '',
    rud: '',
    netamount1: '',
    discount: '',
    ons: '',
    balance: '',
    fcdate: '',
    taxdate: '',
    insdate: '',
    stpermit: '',
    maintenancetype: '',
    kilometer: '',
    selects: '',
    documenttype: '',
    on1: '',
    smsguest: '',
    booker: '',
    emailcheck: '',
    manualbillss: '',
    reload: '',
    locks: '',
  });

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      tripid: '',
      bookingno: '',
      status: '',
      billingno: '',
      apps: '',
      customer: '',
      orderedby: '',
      mobile: '',
      guestname: '',
      guestmobileno: '',
      email: '',
      address1: '',
      streetno: '',
      city: '',
      hireTypes: '',
      department: '',
      vehRegNo: '',
      vehType: '',
      driverName: '',
      mobileNo: '',
      driversmsexbetta: '',
      gps: '',
      duty: '',
      pickup: '',
      useage: '',
      request: '',
      startdate: '',
      closedate: '',
      employeeno: '',
      reporttime: '',
      starttime: '',
      closetime: '',
      shedintime: '',
      advancepaidtovendor: '',
      customercode: '',
      shedin: '',
      shedout: '',
      shedkm: '',
      startkm: '',
      closekm: '',
      permit: '',
      parking: '',
      toll: '',
      vpermettovendor: '',
      vendortoll: '',
      customeradvance: '',
      email1: '',
      documentnotes: '',
      VendorTripNo: '',
      vehicles: '',
      duty1: '',
      startdate1: '',
      closedate1: '',
      totaldays: '',
      starttime2: '',
      closetime2: '',
      totaltime: '',
      startkm1: '',
      closekm1: '',
      totalkm1: '',
      remark: '',
      caramount: '',
      minkm: '',
      minhrs: '',
      package: '',
      amount: '',
      exkm: '',
      amount1: '',
      exHrs: '',
      amount2: '',
      night: '',
      amount3: '',
      driverconvenience: '',
      amount4: '',
      netamount: '',
      vehcommission: '',
      manualbills: '',
      pack: '',
      amount5: '',
      exkm1: '',
      amount6: '',
      exHrs1: '',
      amount7: '',
      night1: '',
      amount8: '',
      driverconvenience1: '',
      amount9: '',
      rud: '',
      netamount1: '',
      discount: '',
      ons: '',
      balance: '',
      fcdate: '',
      taxdate: '',
      insdate: '',
      stpermit: '',
      maintenancetype: '',
      kilometer: '',
      selects: '',
      documenttype: '',
      on1: '',
      smsguest: '',
      booker: '',
      emailcheck: '',
      manualbillss: '',
      reload: '',
      locks: '',
    }));
    setSelectedCustomerDatas({});
    setSelectedCustomerData({});
    setFormData({});
    setFormValues({});
    setPackageData({});
    setPackageDetails({});
  };


  const handleETripsheetClick = (row) => {
    const tripid = book.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || formData.tripid;
    console.log('Received tripid:', tripid);
    if (!tripid) {
      setError(true);
      setErrorMessage("please enter the tripid");
    }
    else {
      localStorage.setItem('selectedTripid', tripid);
      setPopupOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedCustomerData.tripid) {
      console.log('No tripsheet number provided for deletion.');
      return;
    }
    try {
      console.log('Delete button clicked');
      await axios.delete(`http://localhost:8081/tripsheet/${selectedCustomerData.tripid}`);
      console.log('Customer deleted');
      setFormData({});
      setSelectedCustomerData({});
      handleCancel();
      setSuccess(true);
      setSuccessMessage("Successfully Deleted");
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const vehilcedetails = {
    vehRegNo: selectedCustomerDatas.vehRegNo || '',
    vehType: selectedCustomerDatas.vehType || '',
    driverName: selectedCustomerDatas.driverName || '',
    mobileNo: selectedCustomerDatas.mobileNo || '',
  }

  const handleEdit = async () => {

    try {
      console.log('Edit button clicked');
      const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid || book.tripid);
      const updatedCustomer = {
        ...book,
        ...selectedCustomer,
        // ...selectedCustomerDatas,
        ...vehilcedetails,
        ...selectedCustomerData,
        ...formData,
        starttime: starttime || book.starttime || formData.startTime || selectedCustomerData.startTime,
        closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
        reporttime: reporttime || book.reporttime || selectedCustomerData.reporttime || formData.reporttime,
        shedintime: shedintime || book.shedintime || selectedCustomerData.shedintime || formData.shedintime,
        starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
        closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
        additionaltime: additionalTime.additionaltime,
        shedkm: shedKilometers.shedkm,
        totaldays: calculateTotalDays(),
        totalkm1: calculateTotalKilometers(),
        totaltime: calculateTotalTime(),
        netamount: calculateTotalAmount(),
        exkm: packageDetails[0]?.extraKMS,
        exHrs: packageDetails[0]?.extraHours,
        night: packageDetails[0]?.NHalt,
        amount: packageDetails[0]?.Rate,
        exkm1: packageDetails[0]?.extraKMS,
        exHrs1: packageDetails[0]?.extraHours,
        night1: packageDetails[0]?.NHalt,
        amount5: packageDetails[0]?.Rate,
        amount1: calculateExkmAmount(),
        amount2: calculateExHrsAmount(),
        amount3: calculateNightAmount(),
        amount4: calculatedriverconvienceAmount(),
        package: packageDetails[0]?.package,
        pack: packageDetails[0]?.package,
        minhrs: packageDetails[0]?.Hours,
        minkm: packageDetails[0]?.KMS,
      };
      for (const key in updatedCustomer) {
        if (key === '0') {
          delete updatedCustomer[key];
        }
      }
      await axios.put(`http://localhost:8081/tripsheet/${selectedCustomerData.tripid || book.tripid || formData.tripid || packageDetails.tripid}`, updatedCustomer);
      console.log('Customer updated');
      handleCancel();
      handleDriverSendSMS();
      handleSendSMS();
      handlecheck();
      setSuccess(true);
      setSuccessMessage("Successfully updated");
    } catch (error) {
      console.error('Error updating customer:', error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleAdd = async () => {
    const customer = book.customer;
    if (!customer) {
      setError(true);
      setErrorMessage("fill mantatory fields");
      return;
    }
    try {
      console.log('Add button clicked');
      const updatedBook = {
        ...book,
        starttime: starttime || book.starttime || formData.startTime || selectedCustomerData.startTime,
        closetime: closetime || book.closetime || formData.closetime || selectedCustomerData.closetime,
        reporttime: reporttime || book.reporttime || formData.reporttime || selectedCustomerData.reporttime,
        shedintime: shedintime || book.shedintime || formData.shedintime || selectedCustomerData.shedintime,
        starttime2: starttime2 || book.starttime2 || formData.startTime2 || selectedCustomerData.starttime2,
        closetime2: closetime2 || book.closetime2 || formData.closetime2 || selectedCustomerData.closetime2,
        additionaltime: additionalTime.additionaltime,
        shedkm: shedKilometers.shedkm,
        totaldays: calculateTotalDays(),
        totalkm1: calculateTotalKilometers(),
        totaltime: calculateTotalTime(),
        netamount: calculateTotalAmount(),
        exkm: packageDetails[0]?.extraKMS,
        exHrs: packageDetails[0]?.extraHours,
        night: packageDetails[0]?.NHalt,
        amount: packageDetails[0]?.Rate,
        exkm1: packageDetails[0]?.extraKMS,
        exHrs1: packageDetails[0]?.extraHours,
        night1: packageDetails[0]?.NHalt,
        amount5: packageDetails[0]?.Rate,
        amount1: calculateExkmAmount(),
        amount2: calculateExHrsAmount(),
        amount3: calculateNightAmount(),
        amount4: calculatedriverconvienceAmount(),
        package: packageDetails[0]?.package,
        pack: packageDetails[0]?.package,
        minhrs: packageDetails[0]?.Hours,
        minkm: packageDetails[0]?.KMS,
      };
      await axios.post('http://localhost:8081/tripsheet', updatedBook);
      console.log(updatedBook);
      handleCancel();
      setSuccess(true);
      handleSendSMS();
      handleDriverSendSMS();
      handlecheck();
      setSuccessMessage("Successfully Added");
    } catch (error) {
      console.error('Error updating customer:', error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleAutocompleteChange = (event, value, name) => {
    const selectedOption = value ? value.label : '';
    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
    setTripSheetData((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const handleDateChange = (date, name) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
    setBook((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
    setSelectedCustomerData((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
    setTripSheetData((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
  };

  const handleClick = async (event, actionName) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');

      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        handleDelete();
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        handleEdit();
      } else if (actionName === 'Add') {
        handleAdd();
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Check Network Connection")
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .jpg, .jpeg, .png';
    input.onchange = handleFileChange;
    input.click();
  };
  //file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    // formDataUpload.append('documenttype', book.tripid || selectedCustomerData.tripid || formData.tripid);
    formDataUpload.append('tripid', book.tripid || selectedCustomerData.tripid || formData.tripid);
    console.log('uploaded file details', formDataUpload);
    try {
      const response = await axios.post('http://localhost:8081/uploads', formDataUpload);
      console.log('uploaded file details 2', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  //end file upload
  // Function to calculate total time
  const calculateTotalTime = useCallback(() => {
    const startTime = formData.starttime || selectedCustomerData.starttime || book.starttime;
    const closeTime = formData.closetime || selectedCustomerData.closetime || book.closetime;

    if (startTime && closeTime) {
      const startTimeObj = dayjs(startTime, 'HH:mm');
      const closeTimeObj = dayjs(closeTime, 'HH:mm');
      let totalTimeMinutes = closeTimeObj.diff(startTimeObj, 'minutes');

      // Add additional time if it is a valid number
      const additionalTimeValue = parseInt(additionalTime.additionaltime) || parseInt(formData.additionaltime) || parseInt(selectedCustomerData.additionaltime) || parseInt(book.additionaltime);
      if (!isNaN(additionalTimeValue)) {
        totalTimeMinutes += additionalTimeValue * 60;
      }

      const hours = Math.floor(totalTimeMinutes / 60);
      const minutes = totalTimeMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
    return '';
  }, [formData, selectedCustomerData, book, additionalTime]);

  const calculateExkmAmount = () => {
    const exkm = formData.exkm || selectedCustomerData.exkm || book.exkm || packageDetails[0]?.extraKMS;
    const exkmTkm = formData.exkmTkm || selectedCustomerData.exkmTkm || book.exkmTkm;
    if (exkm !== undefined && exkmTkm !== undefined) {
      const totalexKm = exkm * exkmTkm;
      return totalexKm;
    }
    return 0;
  };

  const calculateExHrsAmount = () => {
    const exHrs = formData.exHrs || selectedCustomerData.exHrs || book.exHrs || packageDetails[0]?.extraHours;
    const exHrsTHrs = formData.exHrsTHrs || selectedCustomerData.exHrsTHrs || book.exHrsTHrs;
    if (exHrs !== undefined && exHrsTHrs !== undefined) {
      const totalexhrs = exHrs * exHrsTHrs;
      return totalexhrs;
    }
    return 0;
  };

  const calculateNightAmount = () => {
    const night = formData.night || selectedCustomerData.night || book.night || packageDetails[0]?.NHalt;
    const nightThrs = formData.nightThrs || selectedCustomerData.nightThrs || book.nightThrs;
    if (night !== undefined && nightThrs !== undefined) {
      const totalnight = night * nightThrs;
      return totalnight;
    }
    return 0;
  };

  const calculatedriverconvienceAmount = () => {
    const driverconvenience = formData.driverconvenience || selectedCustomerData.driverconvenience || book.driverconvenience;
    const dtc = formData.dtc || selectedCustomerData.dtc || book.dtc;
    if (driverconvenience !== undefined && dtc !== undefined) {
      const totaldriverconvience = driverconvenience * dtc;
      return totaldriverconvience;
    }
    return 0;
  };


  const calculateExkmAmount2 = () => {
    const exkm1 = formData.exkm1 || selectedCustomerData.exkm1 || book.exkm1 || packageDetails[0]?.extraKMS;
    const exkmTkm2 = formData.exkmTkm2 || selectedCustomerData.exkmTkm2 || book.exkmTkm2;
    if (exkm1 !== undefined && exkmTkm2 !== undefined) {
      const totalexKm = exkm1 * exkmTkm2;
      return totalexKm;
    }
    return 0;
  };

  const calculateExHrsAmount2 = () => {
    const exHrs1 = formData.exHrs1 || selectedCustomerData.exHrs1 || book.exHrs1 || packageDetails[0]?.extraHours;
    const exHrsTHrs2 = formData.exHrsTHrs2 || selectedCustomerData.exHrsTHrs2 || book.exHrsTHrs2;
    if (exHrs1 !== undefined && exHrsTHrs2 !== undefined) {
      const totalexhrs = exHrs1 * exHrsTHrs2;
      return totalexhrs;
    }
    return 0;
  };

  const calculateNightAmount2 = () => {
    const night1 = formData.night || selectedCustomerData.night1 || book.night1 || packageDetails[0]?.NHalt;
    const nightThrs2 = formData.nightThrs2 || selectedCustomerData.nightThrs2 || book.nightThrs2;
    if (night1 !== undefined && nightThrs2 !== undefined) {
      const totalnight = night1 * nightThrs2;
      return totalnight;
    }
    return 0;
  };

  const calculatedriverconvienceAmount2 = () => {
    const driverconvenience1 = formData.driverconvenience1 || selectedCustomerData.driverconvenience1 || book.driverconvenience1;
    const dtc2 = formData.dtc2 || selectedCustomerData.dtc2 || book.dtc2;
    if (driverconvenience1 !== undefined && dtc2 !== undefined) {
      const totaldriverconvience = driverconvenience1 * dtc2;
      return totaldriverconvience;
    }
    return '';
  };

  const calculateTotalDays = () => {
    const startDate = formData.startdate || selectedCustomerData.startdate || book.startdate;
    const closeDate = formData.closedate || selectedCustomerData.closedate || book.closedate;

    if (startDate && closeDate) {
      const startDateObj = dayjs(startDate);
      const closeDateObj = dayjs(closeDate);
      const totalDays = closeDateObj.diff(startDateObj, 'days') + 1;
      return totalDays;
    }

    return 0;
  };

  const calculateTotalKilometers = () => {
    const startKm = formData.startkm || selectedCustomerData.startkm || book.startkm;
    const closeKm = formData.closekm || selectedCustomerData.closekm || book.closekm;

    if (startKm !== undefined && closeKm !== undefined) {
      let totalKm = closeKm - startKm;
      // Add shed kilometers if it is a valid number
      const shedKmValue = parseInt(shedKilometers.shedkm) || parseInt(formData.shedkm) || parseInt(selectedCustomerData.shedkm) || parseInt(book.shedkm);
      if (!isNaN(shedKmValue)) {
        totalKm += shedKmValue;
      }
      return totalKm;
    }
    return 0;
  };


  function calculateTotalAmount() {
    const amount = parseFloat(formData.amount || selectedCustomerData.amount || book.amount || packageDetails[0]?.Rate) || 0;
    const amount1 = parseFloat(formData.amount1 || selectedCustomerData.amount1 || book.amount1) || calculateExkmAmount() || 0;
    const amount2 = parseFloat(formData.amount2 || selectedCustomerData.amount2 || book.amount2) || calculateExHrsAmount() || 0;
    const amount3 = parseFloat(formData.amount3 || selectedCustomerData.amount3 || book.amount3) || calculateNightAmount() || 0;
    const amount4 = parseFloat(formData.amount4 || selectedCustomerData.amount4 || book.amount4) || calculatedriverconvienceAmount() || 0;

    // Calculate the total amount
    const totalAmount = amount + amount1 + amount2 + amount3 + amount4;

    return totalAmount;
  }


  function calculateTotalAmount2() {
    const amount5 = parseFloat(formData.amount5 || selectedCustomerData.amount5 || book.amount5 || packageDetails[0]?.Rate);
    const amount6 = parseFloat(formData.amount6 || selectedCustomerData.amount6 || book.amount6) || calculateExkmAmount2();
    const amount7 = parseFloat(formData.amount7 || selectedCustomerData.amount7 || book.amount7) || calculateExHrsAmount2();
    const amount8 = parseFloat(formData.amount8 || selectedCustomerData.amount8 || book.amount8) || calculateNightAmount2();
    const amount9 = parseFloat(formData.amount9 || selectedCustomerData.amount9 || book.amount9) || calculatedriverconvienceAmount2();

    // Calculate the total amount
    const totalAmount = amount5 + amount6 + amount7 + amount8 + amount9;

    return totalAmount;
  }

  const [tripSheetData, setTripSheetData] = useState({
    customer: '',
    address1: '',
    orderedby: '',
    employeeno: '',
    customercode: '',
    guestname: '',
    tripid: '',
    startdate: '',
    duty: '',
    vehType: '',
    vehRegNo: '',
    driverName: '',
    mobileNo: '',
    closedate: '',
    starttime: '',
    startkm: '',
    closetime: '',
    closekm: '',
    totalkm1: '',
    totaltime: '',
    totalDays: '',
    remark: '',
    parking: '',
    permit: '',
  });

  const handleChange = useCallback((event) => {
    const { name, value, checked } = event.target;

    setPackageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPackageDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setTripSheetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (event.target.type === 'checkbox') {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
      setTripSheetData((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else {
      // Check if the field is the time field
      if (name === 'starttime') {
        const formattedTime = value;
        setBook((prevBook) => ({
          ...prevBook,
          [name]: formattedTime,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: formattedTime,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: formattedTime,
        }));
        setTripSheetData((prevData) => ({
          ...prevData,
          [name]: formattedTime,
        }));
      } else {
        setBook((prevBook) => ({
          ...prevBook,
          [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setSelectedCustomerDatas((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        setTripSheetData((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        setShedKilometers((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        setAdditionalTime((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    }
  }, [setSelectedCustomerData, setFormData, setTripSheetData, setPackageDetails]);

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8081/tripsheet/${event.target.value}`);
        const bookingDetails = response.data;
        console.log(bookingDetails);

        setSelectedCustomerData(bookingDetails);
        setSelectedCustomerId(bookingDetails.tripid);
      } catch (error) {
        console.error('Error retrieving booking details:', error);
      }
    }
  }, []);

  const [enterPressCount, setEnterPressCount] = useState(0);

  const handleKeyEnter = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (enterPressCount === 0) {
        // First Enter key press - Display in the table
        try {
          const response = await axios.get(`http://localhost:8081/vehicleinfo/${event.target.value}`);
          const vehicleData = response.data;
          setRows([vehicleData]);
        } catch (error) {
          console.error('Error retrieving vehicle details:', error.message);
        }
      } else if (enterPressCount === 1) {
        // Second Enter key press (double Enter) - Display in the fields
        const selectedRow = rows[0]; // Assuming you want to use the first row
        if (selectedRow) {
          setSelectedCustomerDatas(selectedRow);
          handleChange({ target: { name: "vehRegNo", value: selectedRow.vehRegNo } });
          handleChange({ target: { name: "vehType", value: selectedRow.vehType } });
          handleChange({ target: { name: "driverName", value: selectedRow.driverName } });
          handleChange({ target: { name: "mobileNo", value: selectedRow.mobileNo } });
        }
      }
      // Increment the Enter key press count
      setEnterPressCount((prevCount) => prevCount + 1);
    }

    // Check if the input value is empty and reset enterPressCount to 0
    if (event.target.value === '') {
      setEnterPressCount(0);
    }
  }, [handleChange, rows, enterPressCount]);

  const handleRowClick = useCallback((params) => {
    console.log(params);
    setSelectedCustomerDatas(params);
    handleChange({ target: { name: "vehRegNo", value: params.vehRegNo } });
  }, [handleChange]);

  const totalKilometers = packageData.totalkm1 || selectedCustomerData.totalkm1 || selectedCustomerDatas.totalkm1 || book.totalkm1 || formData.totalkm1 || calculateTotalKilometers();
  const totalTime = packageData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime || formData.totaltime || calculateTotalTime();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/getPackageDetails', {
          params: {
            totalkm1: totalKilometers,
            totaltime: totalTime,
            vehType: packageData.vehType || selectedCustomerData.vehType || selectedCustomerDatas.vehType || book.vehType || formData.vehType,
            customer: packageData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer || formData.customer,
            duty: packageData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty || formData.duty,
          },
        });
        const packagedet = response.data;
        console.log('API Response:', response.data);
        setPackageDetails(packagedet);
        console.log('package Hours details', packagedet[0].KMS);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [
    book.duty, book.vehType, book.customer,
    formData.duty, formData.vehType, formData.customer,
    packageData.duty, packageData.vehType, packageData.customer,
    selectedCustomerData.customer, selectedCustomerData.duty, selectedCustomerData.vehType,
    selectedCustomerDatas.customer, selectedCustomerDatas.duty, selectedCustomerDatas.vehType,
    totalKilometers, totalTime
  ]);


  const [smsguest, setSmsGuest] = useState(false);

  const handleSendSMS = async () => {
    if (smsguest) {
      try {
        const dataToSend = {
          guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname || '',
          guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno || '',
          vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
          vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
          driverName: formValues.driverName || selectedCustomerData.driverName || book.driverName || formData.driverName,
          mobileNo: formValues.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || formData.mobileNo,
          reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
          startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || '',
          ofclanno: '044-49105959',
        };

        console.log("guest sms variables", dataToSend);

        const response = await fetch('http://localhost:8081/tripguest-send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        console.log('data sent to backend', response.data);

        if (response.ok) {
          console.log('SMS sent successfully');
          setSuccess(true);
          setSuccessMessage("SMS sent correctly");
        } else {
          console.error('Failed to send SMS');
          setError(true);
          setErrorMessage("Failed to send SMS");
        }
      } catch (error) {
        console.error('Error sending SMS:', error.message);
      }
    }
  };
  //send sms from tripsheet to driver
  const [DriverSMS, setDriverSMS] = useState(false);

  const handleDriverSendSMS = async () => {
    if (smsguest) {
      try {
        const dataSend = {
          guestname: formValues.guestname || selectedCustomerData.guestname || book.guestname || formData.guestname || '',
          guestmobileno: formValues.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno || formData.guestmobileno || '',
          vehRegNo: formValues.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || formData.vehRegNo,
          vehType: formValues.vehType || selectedCustomerData.vehType || book.vehType || formData.vehType,
          driverName: formValues.driverName || selectedCustomerData.driverName || book.driverName || formData.driverName,
          mobileNo: formValues.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || formData.mobileNo,
          reporttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || '',
          startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || '',
          ofclanno: '044-49105959',
        };

        console.log("driver sms variables", dataSend);

        const response = await fetch('http://localhost:8081/tripdriver-send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataSend),
        });

        console.log('data sent to backend', response.data);

        if (response.ok) {
          console.log('SMS sent successfully');
          setSuccess(true);
          setSuccessMessage("SMS sent correctly");
        } else {
          console.error('Failed to send SMS');
          setError(true);
          setErrorMessage("Failed to send SMS");
        }
      } catch (error) {
        console.error('Error sending SMS:', error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="Tripsheet-form">
        <form action="">
          <span className="Title-Name">Trip Sheet</span>
          <div className="Tripsheet-header">
            <div className="input-field">
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
                  id="bookingid"
                  label="Booking ID"
                  name="bookingno"
                  value={formData.bookingno || selectedCustomerData.bookingno || book.bookingno || ''}
                  onChange={handleChange}
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <QuizOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "status")}
                  value={Status.find((option) => option.optionvalue)?.label || formData.status || selectedCustomerData.status || book.status || 'Opened'}
                  options={Status.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.status || selectedCustomerData.status || book.status || 'Opened'}
                  renderInput={(params) => {
                    // params.inputProps.value = formData.status || selectedCustomerData.status || book.status || 'Opened'
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
            </div>
            <div className="input-field checkbox">
              <div className="input">
                <div className="icone">
                  <AppsOutageOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "apps")}
                  value={Apps.find((option) => option.optionvalue)?.label || formData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                  options={Apps.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.apps || selectedCustomerData.apps || book.apps || 'Waiting'}
                  renderInput={(params) => {
                    // params.inputProps.value = formData.apps || selectedCustomerData.apps || book.apps || 'Waiting'
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
                  id="standard-size-normal"
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
                  id="standard-size-normal"
                  variant="standard"
                  autoComplete="password"
                  required
                />
              </div>
              {/* <FormControlLabel
                name="smsguest"
                value="smsguest"
                control={<Checkbox size="small" />}
                label="SMS Guest"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(formData.smsguest || selectedCustomerData?.smsguest || book.smsguest)}
              /> */}
              <FormControlLabel
                value="smsguest"
                control={<Checkbox size="small" checked={smsguest} onChange={(event) => setSmsGuest(event.target.checked)} />}
                label="SMS Guest"
              />
              <FormControlLabel
                name="booker"
                value="booker"
                control={<Checkbox size="small" />}
                label="Booker"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(formData.booker || selectedCustomerData?.booker || book.booker)}
              />
              <FormControlLabel
                name="emailcheck"
                value="email"
                label="Email"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(formData.emailcheck || selectedCustomerData?.emailcheck || book.emailcheck)}
                control={<Checkbox size="small" checked={sendEmail} onChange={(event) => setSendEmail(event.target.checked)} />}
              />
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobile"
                  value={formData.mobile || selectedCustomerData.mobile || book.mobile || ''}
                  onChange={handleChange}
                  label="Mobile"
                  id="standard-size-normal"
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
                  id="username"
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
                  id="Phonecell"
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
            </div>
          </div>
          <div className="detail-container-main-Tripsheet">
            <div className="container-left-Tripsheet">
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="address1"
                    value={formData.address1 || selectedCustomerData.address1 || book.address1 || ''}
                    onChange={handleChange}
                    label="Address"
                    id="remark"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <HomeTwoToneIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="streetno"
                    value={formData.streetno || selectedCustomerData.streetno || book.streetno || ''}
                    onChange={handleChange}
                    id="remark"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <LocationCityIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="city"
                    value={formData.city || selectedCustomerData.city || book.city || ''}
                    onChange={handleChange}
                    id="address3"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                    autoComplete="password"
                  />
                </div>
              </div>
            </div>
            <div className="container-right-Tripsheet">
              <div className="textbox">
                <div className="textboxlist">
                  <div className="textboxlist-customer list-updates">
                    <span>
                      <div className="Scroll-Style" style={{ overflow: 'scroll',width:'500px', height: '220px' }}>
                        <Table hoverRow borderAxis="y">
                          <thead>
                            <tr>
                              <th>Vehicle_Name</th>
                              <th>Vehicle_Type</th>
                              <th>Driver_name</th>
                              <th>Driver_phone</th>
                              <th>Supplier</th>
                              <th>Online_Access</th>
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
                        </Table>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="secend-container">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <HowToRegIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "hireTypes")}
                  value={HireTypes.find((option) => option.option)?.label || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                  options={HireTypes.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''}
                  renderInput={(params) => {
                    // params.inputProps.value = formData.hireTypes || formValues.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || ''
                    return (
                      <TextField {...params} label="Hire Types" autoComplete="password" name="hireTypes" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <StoreIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "department")}
                  value={Department.find((option) => option.optionvalue)?.label || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                  options={Department.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.department || formValues.department || selectedCustomerData.department || book.department || ''}
                  renderInput={(params) => {
                    // params.inputProps.value = formData.department || formValues.department || selectedCustomerData.department || book.department || ''
                    return (
                      <TextField {...params} label="Department" autoComplete="password" name="department" inputRef={params.inputRef} />
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
                  id="vehiclerigsterno"
                  label="Vehicle Rigster No"
                  name="vehRegNo"
                  value={formData.vehRegNo || selectedCustomerData.vehRegNo || formValues.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyEnter}
                  autoComplete="password"
                />
              </div>
              <div className="input">
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
                  value={VehicleRate.find((option) => option.optionvalue)?.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                  options={VehicleRate.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                  renderInput={(params) => {
                    // params.inputProps.value = formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''
                    return (
                      <TextField {...params} label="Vehicle Rate" autoComplete="password" name="vehType" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SensorOccupiedIcon color="action" />
                </div>
                <TextField
                  name="driverName"
                  value={formData.driverName || selectedCustomerData.driverName || formValues.driverName || selectedCustomerDatas.driverName || book.driverName || ''}
                  onChange={handleChange}
                  label="Driver Name"
                  id="drivername"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobileNo"
                  value={formData.mobileNo || selectedCustomerData.mobileNo || formValues.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo || ''}
                  onChange={handleChange}
                  label="Cell"
                  id="cell"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
              <div className="input radio">
                {/* <FormControlLabel
                  name="driversmsexbetta"
                  value="Driver SMS"
                  control={<Checkbox size="small" />}
                  label="Driver SMS"
                  autoComplete="new-password"
                  onChange={handleChange}
                  checked={Boolean(formData.driversmsexbetta || selectedCustomerData?.driversmsexbetta || book.driversmsexbetta)}
                /> */}
                <FormControlLabel
                  value="DriverSMS"
                  control={<Checkbox size="small" checked={DriverSMS} onChange={(event) => setDriverSMS(event.target.checked)} />}
                  label="Driver SMS"
                />
              </div>
              <div className="input radio">
                <FormControlLabel
                  name="gps"
                  value="GPS"
                  control={<Checkbox size="small" />}
                  label="GPS"
                  autoComplete="new-password"
                  onChange={handleChange}
                  checked={Boolean(formData.gps || selectedCustomerData?.gps || book.gps)}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
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
                  onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                  value={Duty.find((option) => option.optionvalue)?.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                  options={Duty.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                  renderInput={(params) => {
                    // params.inputProps.value = formData.duty || selectedCustomerData.duty || book.duty || ''
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
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "pickup")}
                  value={Pickup.find((option) => option.optionvalue)?.label || formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                  options={Pickup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                  renderInput={(params) => {
                    // params.inputProps.value = formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''
                    return (
                      <TextField {...params} label="Pickup" autoComplete="password" name="pickup" inputRef={params.inputRef} />
                    )
                  }
                  }
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
                  id="usage"
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
                  value={formData.request || selectedCustomerData.request || book.request || ''}
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
                  id="customer-code"
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || book.startdate ? dayjs(book.startdate) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, 'startdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Close Date"
                    value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null || book.closedate ? dayjs(book.closedate) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, 'closedate')}
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
                    value={formData.totaldays || calculateTotalDays() || book.totaldays || ''}
                    label="Total Days"
                    size="small"
                    type="number"
                    id="total-days"
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
              <div className="input" style={{ width: "300px" }}>
                <div className="icone">
                  <CurrencyRupeeTwoToneIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="advancepaidtovendor"
                  value={formData.advancepaidtovendor || selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor || ''}
                  onChange={handleChange}
                  label="Advance-Paid-To-Vendor"
                  id="advance-paid-to-vendor"
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input time">
                <label>shed out Time</label>
                <input
                  type="time"
                  name='starttime'
                  value={formData.starttime || selectedCustomerData.starttime || book.starttime || ''}
                  onChange={(event) => {
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                    setFormData({ ...formData, starttime: event.target.value });
                    setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                  }}
                />
              </div>
              <div className="input time">
                <label>Report Time</label>
                <input
                  type="time"
                  name="reporttime"
                  value={formData.reporttime || selectedCustomerData.reporttime || book.reporttime || ''}
                  onChange={(event) => {
                    setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value });
                    setSelectedCustomerDatas({ ...selectedCustomerDatas, reporttime: event.target.value });
                    setBook({ ...book, reporttime: event.target.value });
                    setreporttime(event.target.value);
                  }}
                />
              </div>
              <div className="input time" >
                <label>Close Time</label>
                <input
                  type="time"
                  name="shedintime"
                  value={formData.shedintime || selectedCustomerData.shedintime || book.shedintime || ''}
                  onChange={(event) => {
                    setSelectedCustomerData({ ...selectedCustomerData, shedintime: event.target.value });
                    setSelectedCustomerDatas({ ...selectedCustomerDatas, shedintime: event.target.value });
                    setBook({ ...book, shedintime: event.target.value });
                    setshedintime(event.target.value);
                  }}
                />
              </div>
              <div className="input time" >
                <label>Shed-In Time</label>
                <input
                  type="time"
                  name="closetime"
                  value={formData.closetime || selectedCustomerData.closetime || book.closetime || ''}
                  onChange={(event) => {
                    setSelectedCustomerData({ ...selectedCustomerData, closetime: event.target.value });
                    setSelectedCustomerDatas({ ...selectedCustomerDatas, closetime: event.target.value });
                    setBook({ ...book, closetime: event.target.value });
                    setCloseTime(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faRoad} size="lg" />
                </div>
                <TextField
                  name="shedout"
                  value={formData.shedout || book.shedout || selectedCustomerData.shedout || ''}
                  onChange={handleChange}
                  label="Shed Out"
                  id="shedout"
                  size='small'
                  type="number"
                  // variant="standard"/
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "180px" }}>
                <TextField
                  name="startkm"
                  value={formData.startkm || selectedCustomerData.startkm || book.startkm || ''}
                  onChange={handleChange}
                  size="small"
                  label="Start KM"
                  type="number"
                  id="outlined-start-adornment"
                  // sx={{ m: 1, width: "23ch" }}/
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "180px" }}>
                <TextField
                  name="closekm"
                  value={formData.closekm || selectedCustomerData.closekm || book.closekm || ''}
                  onChange={handleChange}
                  label="Close KM"
                  size="small"
                  type="number"
                  id="outlined-start-adornment"
                  // sx={{ m: 1, width: "23ch" }}
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "180px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faRoad} size="lg" />
                </div>
                <TextField
                  name="shedin"
                  value={formData.shedin || book.shedin || selectedCustomerData.shedin || ''}
                  onChange={handleChange}
                  label="Shed In"
                  type="number"
                  id="shedin"
                  size='small'
                  // variant="standard"/
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
                  onChange={handleChange}
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
                  value={formData.totalkm1 || packageData.totalkm1 || book.totalkm1 || selectedCustomerData.totalkm1 || calculateTotalKilometers() || ''}
                  onChange={handleChange}
                  label="Total KM"
                  id="totalkm1"
                  type="number"
                  size='small'
                  // variant="standard"/
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
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
                  id="Toll"
                  variant="standard"
                  autoComplete="password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "250px" }}>
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
                  id="v-permet-to-vendor"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "250px" }}>
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
                  id="vendor-toll"
                  autoComplete="password"
                />
              </div>
              <div className="input" style={{ width: "250px" }}>
                <div className="icone">
                  <PaymentsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="customeradvance"
                  value={formData.customeradvance || selectedCustomerData.customeradvance || book.customeradvance || ''}
                  onChange={handleChange}
                  label="Customer-Advance"
                  id="customer-advance"
                  autoComplete="password"
                />
              </div>
              <div className="input">
                <Button startIcon={<BorderColorIcon />} variant="outlined" onClick={handleETripsheetClick}>
                  E-Tripsheet
                </Button>
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "400px" }}>
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
                  sx={{ m: 2, width: "400ch" }}
                  // variant="standard"
                  autoComplete="password"
                />
              </div>

              <Dialog open={popupOpen} onClose={handlePopupClose}>
                <DialogContent>
                  <Invoice tripSheetData={tripSheetData} formData={calculateTotalTime} book={book} selectedCustomerData={selectedCustomerData} selectedCustomerDatas={selectedCustomerDatas} selectedTripid={localStorage.getItem('selectedTripid')} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlePopupClose} variant="contained" color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <div className="input" style={{ width: "175px" }}>
                <Button variant="contained" onClick={handleAdd}>Add</Button>
              </div>
            </div>
          </div>
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
          <Box sx={{ position: "relative", mt: 3, height: 320 }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
                />
              ))}
            </StyledSpeedDial>
          </Box>
          <div className="Tipsheet-content-table-main">
            <Tabs
              className='Scroll-Style'
              size="sm"
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
                  <div className="input-field">
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
                  <div className="input-field">
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
                        value={DocumentType.find((option) => option.optionvalue)?.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''}
                        renderInput={(params) => {
                          // params.inputProps.value = formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''
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
                        value={formData.documentnotes || selectedCustomerData.documentnotes || book.documentnotes || ''}
                        onChange={handleChange}
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
                        value={formData.tripid || selectedCustomerData.tripid || book.tripid || ''}
                        onChange={handleChange}
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
                        value={VehicleRate.find((option) => option.optionvalue)?.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                        options={VehicleRate.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''}
                        renderInput={(params) => {
                          // params.inputProps.value = formData.vehType || selectedCustomerData.vehType || formValues.vehType || selectedCustomerDatas.vehType || packageData.vehType || book.vehType || ''
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
                        value={Duty.find((option) => option.optionvalue)?.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                        options={Duty.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.duty || selectedCustomerData.duty || book.duty || ''}
                        renderInput={(params) => {
                          // params.inputProps.value = formData.duty || selectedCustomerData.duty || book.duty || ''
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
                            value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || book.startdate ? dayjs(book.startdate) : null}
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
                            value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null || book.closedate ? dayjs(book.closedate) : null}
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
                        value={formData.starttime || selectedCustomerData.starttime || book.starttime || ''}
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
                        value={formData.closetime || selectedCustomerData.closetime || book.closetime || ''}
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
                        value={formData.totaltime || calculateTotalTime() || book.totaltime || selectedCustomerData.totaltime || ''}
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
                        value={formData.startkm || selectedCustomerData.startkm || book.startkm || ''}
                        onChange={handleChange}
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
                        value={formData.closekm || selectedCustomerData.closekm || book.closekm || ''}
                        onChange={handleChange}
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
                        value={formData.totalkm1 || calculateTotalKilometers() || book.totalkm1 || packageData.totalkm1 || selectedCustomerData.totalkm1 || ''}
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
                        value={formData.remark || selectedCustomerData.remark || book.remark || ''}
                        onChange={handleChange}
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
                        value={formData.caramount || selectedCustomerData.caramount || book.caramount || ''}
                        onChange={handleChange}
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
                    {/* <Button onClick={fetchPackageDetails}>Fetch Package Details</Button> */}
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faStopwatch} size="lg" />
                      </div>
                      <TextField
                        name="minhrs"
                        value={formData.minhrs || selectedCustomerData.minhrs || book.minhrs || packageDetails[0]?.Hours || ''}
                        onChange={handleChange}
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
                        value={formData.minkm || packageDetails[0]?.KMS || book.minkm || selectedCustomerData.minkm || ''}
                        label="Min.Km"
                        id="minkm"
                        // variant="standard"
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
                        value={formData.package || selectedCustomerData.package || book.package || packageDetails[0]?.package || ''}
                        onChange={handleChange}
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
                        value={formData.amount || selectedCustomerData.amount || book.amount || packageDetails[0]?.Rate || ''}
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
                        value={formData.exkmTkm || selectedCustomerData.exkmTkm || book.exkmTkm || ''}
                        onChange={handleChange}
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
                        value={formData.exHrs || selectedCustomerData.exHrs || book.exHrs || packageDetails[0]?.extraHours || ''}
                        onChange={handleChange}
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
                        value={formData.exHrsTHrs || selectedCustomerData.exHrsTHrs || book.exHrsTHrs || ''}
                        onChange={handleChange}
                        variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount2"
                        value={book.amount2 || calculateExHrsAmount() || ''}
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
                        <FontAwesomeIcon icon={faCloudMoon} />
                      </div>
                      <TextField
                        name="night"
                        value={formData.night || selectedCustomerData.night || book.night || packageDetails[0]?.NHalt || ''}
                        onChange={handleChange}
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
                        value={formData.nightThrs || selectedCustomerData.nightThrs || book.nightThrs || ''}
                        onChange={handleChange}
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
                        value={formData.driverconvenience || selectedCustomerData.driverconvenience || book.driverconvenience || ''}
                        onChange={handleChange}
                        label="Driver Convenience"
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
                        value={formData.dtc || selectedCustomerData.dtc || book.dtc || ''}
                        onChange={handleChange}
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
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 10px" }}
                      >
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
                        value={formData.vehcommission || selectedCustomerData.vehcommission || book.vehcommission || ''}
                        onChange={handleChange}
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
                        value={formData.caramount || selectedCustomerData.caramount || book.caramount || ''}
                        onChange={handleChange}
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
                        value={formData.pack || selectedCustomerData.pack || book.pack || packageDetails[0]?.package || ''}
                        onChange={handleChange}
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
                        value={formData.amount5 || selectedCustomerData.amount5 || book.amount5 || packageDetails[0]?.Rate || ''}
                        onChange={handleChange}
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
                        value={book.exkm1 || packageDetails[0]?.extraKMS || ''}
                        onChange={handleChange}
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
                        value={formData.exkmTkm2 || selectedCustomerData.exkmTkm2 || book.exkmTkm2 || ''}
                        onChange={handleChange}
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
                        value={book.amount6 || calculateExkmAmount2() || ''}
                        onChange={handleChange}
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
                        value={formData.exHrs1 || selectedCustomerData.exHrs1 || book.exHrs1 || packageDetails[0]?.extraHours || ''}
                        onChange={handleChange}
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
                        value={formData.exHrsTHrs2 || selectedCustomerData.exHrsTHrs2 || book.exHrsTHrs2 || ''}
                        onChange={handleChange}
                        variant="standard"
                      />

                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount7"
                        value={book.amount7 || calculateExHrsAmount2() || ''}
                        onChange={handleChange}
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
                        value={formData.night1 || selectedCustomerData.night1 || book.night1 || packageDetails[0]?.NHalt || ''}
                        onChange={handleChange}
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
                        value={formData.nightThrs2 || selectedCustomerData.nightThrs2 || book.nightThrs2 || ''}
                        onChange={handleChange}
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
                        value={formData.amount8 || selectedCustomerData.amount8 || book.amount8 || calculateNightAmount2() || ''}
                        onChange={handleChange}
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
                        value={formData.driverconvenience1 || selectedCustomerData.driverconvenience1 || book.driverconvenience1 || ''}
                        onChange={handleChange}
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
                        value={formData.dtc2 || selectedCustomerData.dtc2 || book.dtc2 || ''}
                        onChange={handleChange}
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
                        value={book.amount9 || calculatedriverconvienceAmount2() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        autoComplete="password"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        name="rud"
                        value={formData.rud || selectedCustomerData.rud || book.rud || ''}
                        onChange={handleChange}
                        label="Rud"
                        id="rud"
                        size="small"
                        autoComplete="password"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="netamount1"
                        value={book.netamount1 || calculateTotalAmount2() || ''}
                        onChange={handleChange}
                        size="small"
                        label="Net Amount"
                        id="net-amount"
                        autoComplete="password"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faTags} />
                      </div>
                      <TextField
                        name="discount"
                        value={formData.discount || selectedCustomerData.discount || book.discount || ''}
                        onChange={handleChange}
                        label="Discount"
                        id="discount"
                        size="small"
                        autoComplete="password"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="ons"
                        value={formData.ons || selectedCustomerData.ons || book.ons || ''}
                        onChange={handleChange}
                        size="small"
                        label="On"
                        autoComplete="password"
                        id="on"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input radio">
                      <FormControlLabel
                        name="manualbills"
                        value="manualbills"
                        control={<Checkbox size="small" />}
                        label="Manual Bills"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(formData.manualbills || selectedCustomerData?.manualbills || book.manualbills)}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <AccountBalanceWalletIcon color="action" />
                      </div>
                      <TextField
                        name="balance"
                        value={formData.balance || selectedCustomerData.balance || book.balance || ''}
                        onChange={handleChange}
                        size="small"
                        autoComplete="password"
                        label="Balance"
                        id="balance"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField size="small" variant="standard" autoComplete="password" />
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{
                          padding: "0px 10px 0px 0px",
                          "font-size": "20px",
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </div>
                      <TextField size="small" variant="standard" autoComplete="password" />
                    </div>
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
                        value={formData.maintenancetype || selectedCustomerData.maintenancetype || book.maintenancetype || ''}
                        onChange={handleChange}
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
                        value={formData.kilometer || selectedCustomerData.kilometer || book.kilometer || ''}
                        onChange={handleChange}
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
                        value={Select.find((option) => option.optionvalue)?.label || formData.selects || selectedCustomerData.selects || book.selects || ''}
                        options={Select.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || formData.selects || selectedCustomerData.selects || book.selects || ''}
                        renderInput={(params) => {
                          params.inputProps.value = formData.selects || selectedCustomerData.selects || book.selects || ''
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
                        <img className='dialogboximg' src={mapimageUrl} aria-label='summa' />
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
                          // params.inputProps.value = formData.documenttype || selectedCustomerData.documenttype || book.documenttype || ''
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
                        onChange={handleChange}
                        checked={Boolean(formData.reload || selectedCustomerData?.reload || book.reload)}
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
                        <img className='dialogboximg' src={imageUrl} alt={selectedRow.name} />
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
                            <div>
                              <textarea readOnly style={{ width: '400px', height: '8  0px' }}>{link}</textarea>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripSheet;
