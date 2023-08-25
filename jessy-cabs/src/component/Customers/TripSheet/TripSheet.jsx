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
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { useLocation } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import CallIcon from "@mui/icons-material/Call";
import StoreIcon from "@mui/icons-material/Store";
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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PaymentsIcon from "@mui/icons-material/Payments";
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
const UpdateTbaleColumnsGPSSlider = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "attachname", headerName: "Attach Name", width: 130 },
  { field: "attachpath", headerName: "Attach Path", width: 130 },
  { field: "tripid", headerName: "Trip ID", width: 90 },
];
const UpdateTbaleRowsGPSSlider = [
  {
    id: 1,
    attachname: 1,
    attachpath: "Employee 1",
    tripid: "John Doe",
  },
  {
    id: 2,
    attachname: 2,
    attachpath: "Band 2",
    tripid: "Employee 2",
  },
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
  // Add more rows as needed
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
  const [starttime, setStartTime] = useState('');
  const [closetime, setCloseTime] = useState('');
  const [starttime2, setStartTime2] = useState('');
  const [closetime2, setCloseTime2] = useState('');
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusValue = params.get('status') || 'opened';
    const formData = {};

    // Define a list of parameter keys
    const parameterKeys = [
      'bookingno', 'bookingdate', 'bookingtime', 'status', 'tripid', 'customer', 'orderedby',
      'mobileno', 'guestname', 'guestmobileno', 'email', 'employeeno', 'address1', 'address2',
      'city', 'report', 'vehType', 'paymenttype', 'startdate', 'starttime', 'registertime',
      'duty', 'pickup', 'costcode', 'registerno', 'flightno', 'orderbyemail', 'remarks',
      'servicestation', 'advance', 'nameupdate', 'address3', 'address4', 'cityupdate', 'useage',
      'username', 'tripdate', 'triptime', 'emaildoggle', 'hiretypes', 'travelsname',
      'vehicleregisterno', 'vehiclemodule', 'driverName', 'driverphone', 'travelsemail'
    ];

    // Loop through the parameter keys and set the formData if the parameter exists and is not null or "null"
    parameterKeys.forEach(key => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        formData[key] = value;
      }
    });

    // Set the status separately
    formData['status'] = statusValue;

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
    guestmobile: '',
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
    empolyeeno: '',
    starttime: '',
    closetime: '',
    advancepaidtovendor: '',
    customercode: '',
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
    valueprint: '',
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
      guestmobile: '',
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
      empolyeeno: '',
      starttime: '',
      closetime: '',
      advancepaidtovendor: '',
      customercode: '',
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
      valueprint: '',
      manualbillss: '',
      reload: '',
      locks: '',
    }));
    setSelectedCustomerDatas({});
    setSelectedCustomerData({});
    setFormData({});
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
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEdit = async () => {
 
    try {
      console.log('Edit button clicked');
      const selectedCustomer = rows.find((row) => row.tripid === selectedCustomerData.tripid || formData.tripid);
      const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData, ...formData };
      await axios.put(`http://localhost:8081/tripsheet/${selectedCustomerData.tripid || formData.tripid}`, updatedCustomer);
      console.log('Customer updated');
      handleCancel();
    } catch (error) {
      console.error('Error updating customer:', error);
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
        starttime: starttime,
        closetime: closetime,
        starttime2: starttime2,
        closetime2: closetime2,
        totaldays: calculateTotalDays(), // Add the totaldays field here
        totalkm1: calculateTotalKilometers(), // Add the totaldays field here
        totaltime: calculateTotalTime(), // Add the totaldays field here
      };
      await axios.post('http://localhost:8081/tripsheet', updatedBook);
      console.log(updatedBook);
      handleCancel();
      setSuccess(true);

    } catch (error) {
      console.error('Error updating customer:', error);
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
  };

  const handleDateChange = (date, name) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: formattedDate,
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
  // Function to calculate total time
  const calculateTotalTime = () => {
    const startTime = formData.starttime || selectedCustomerData.starttime || book.starttime;
    const closeTime = formData.closetime || selectedCustomerData.closetime || book.closetime;

    if (startTime && closeTime) {
      const startTimeObj = dayjs(startTime, 'HH:mm');
      const closeTimeObj = dayjs(closeTime, 'HH:mm');
      const totalTimeMinutes = closeTimeObj.diff(startTimeObj, 'minutes');
      const hours = Math.floor(totalTimeMinutes / 60);
      const minutes = totalTimeMinutes % 60;
      return `${hours}h ${minutes}m`;
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
      const totalKm = closeKm - startKm;
      // console.log('Total Kilometers:', totalKm); // Add this line to log the totalKm value
      return totalKm;
    }

    return 0;
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSelectedCustomerData({ ...selectedCustomerData, [name]: value });
    setFormData({ ...formData, [name]: value });

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
    } else {
      // Check if the field is the time field
      if (name === 'starttime') {
        const formattedTime = value; // Modify the time value if needed
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
      }
    }
  };

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

  const handleKeyEnter = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8081/vehicleinfo/${event.target.value}`);
        const vehicleData = response.data;
        setRows([vehicleData]);
      } catch (error) {
        console.error('Error retrieving vehicle details:', error.message);
      }
    }
  }, []);

  const handleRowClick = useCallback((params) => {
    console.log(params);
    setSelectedCustomerDatas(params);
  }, []);

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
                  value={formData.tripid || selectedCustomerData.tripid || book.tripid}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
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
                  value={formData.bookingno || selectedCustomerData.bookingno || book.bookingno}
                  onChange={handleChange}
                  autoFocus
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
                  value={Status.find((option) => option.optionvalue)?.label || ''}
                  options={Status.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.status || selectedCustomerData.status || 'Opened'
                    return (
                      <TextField {...params} label="Status" name="status" inputRef={params.inputRef} />
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
                  value={formData.billingno || selectedCustomerData.billingno || book.billingno}
                  onChange={handleChange}
                  autoFocus
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
                  value={Apps.find((option) => option.optionvalue)?.label || ''}
                  options={Apps.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.apps || selectedCustomerData.apps || ''
                    return (
                      <TextField {...params} label="Apps" name="apps" inputRef={params.inputRef} />
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
                  value={formData.customer || selectedCustomerData.customer || book.customer}
                  onChange={handleChange}
                  label="Customer"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <RateReviewIcon color="action" />
                </div>
                <TextField
                  name="orderedby"
                  value={formData.orderedby || selectedCustomerData.orderedby || book.orderedby}
                  onChange={handleChange}
                  label="Ordered By"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <FormControlLabel
                name="smsguest"
                value="smsguest"
                control={<Checkbox size="small" />}
                label="SMS Guest"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(formData.smsguest || selectedCustomerData?.smsguest || book.smsguest)}
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
                control={<Checkbox size="small" />}
                label="Email"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(formData.emailcheck || selectedCustomerData?.emailcheck || book.emailcheck)}
              />
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobile"
                  value={formData.mobile || selectedCustomerData.mobile || book.mobile}
                  onChange={handleChange}
                  label="Mobile"
                  id="standard-size-normal"
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AssignmentIndIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  id="username"
                  label="User Name"
                  name="guestname"
                  value={formData.guestname || selectedCustomerData.guestname || book.guestname}
                  onChange={handleChange}
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CallIcon color="action" />
                </div>
                <TextField
                  name="guestmobile"
                  value={formData.guestmobile || selectedCustomerData.guestmobile || book.guestmobile}
                  onChange={handleChange}
                  label="Phone (Cell)"
                  id="Phonecell"
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  value={formData.email || selectedCustomerData.email || book.email}
                  onChange={handleChange}
                  label="Email"
                  id="email"
                  size="small"
                  autoFocus
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
                    value={formData.address1 || selectedCustomerData.address1 || book.address1}
                    onChange={handleChange}
                    label="Address"
                    id="remark"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
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
                    value={formData.streetno || selectedCustomerData.streetno || book.streetno}
                    onChange={handleChange}
                    id="remark"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
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
                    value={formData.city || selectedCustomerData.city || book.city}
                    onChange={handleChange}
                    id="address3"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                  />
                </div>
              </div>
            </div>
            <div className="container-right-Tripsheet">
              <div className="textbox-TripSheet">
                <div className="textboxlist-TripSheet">
                  <div className="textboxlist-customer list-updates">
                    <span>
                      <div className="Scroll-Style" style={{ overflow: 'scroll', height: '220px' }}>
                        <Table hoverRow borderAxis="y">
                          <thead>
                            <tr>
                              <th style={{ minWidth: '150px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>Vehicle Name</th>
                              <th style={{ minWidth: '150px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>Vehicle Type</th>
                              <th style={{ minWidth: '150px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dname</th>
                              <th style={{ minWidth: '150px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dphone</th>
                              <th style={{ minWidth: '150px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>Supplier</th>
                              <th style={{ minWidth: '150px', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }}>Online Access</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.length === 0 ? (
                              <tr>
                                <td colSpan={6}>No data available.</td>
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
                  value={HireTypes.find((option) => option.option)?.label || ''}
                  options={HireTypes.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.hireTypes || selectedCustomerData.hireTypes || ''
                    return (
                      <TextField {...params} label="Hire Types" name="hireTypes" inputRef={params.inputRef} />
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
                  value={Department.find((option) => option.optionvalue)?.label || ''}
                  options={Department.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.department || selectedCustomerData.department || ''
                    return (
                      <TextField {...params} label="Department" name="department" inputRef={params.inputRef} />
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
                  value={formData.vehRegNo || selectedCustomerData.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo}
                  onChange={handleChange}
                  onKeyDown={handleKeyEnter}
                  autoFocus
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
                  value={VehicleRate.find((option) => option.optionvalue)?.label || ''}
                  options={VehicleRate.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.vehType || selectedCustomerData.vehType || selectedCustomerDatas.vehType || ''
                    return (
                      <TextField {...params} label="Vehicle Rate" name="vehType" inputRef={params.inputRef} />
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
                  value={formData.driverName || selectedCustomerData.driverName || selectedCustomerDatas.driverName || book.driverName}
                  onChange={handleChange}
                  label="Driver Name"
                  id="drivername"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobileNo"
                  value={formData.mobileNo || selectedCustomerData.mobileNo || selectedCustomerDatas.mobileNo || book.mobileNo}
                  onChange={handleChange}
                  label="Cell"
                  id="cell"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <FormControlLabel
                  name="driversmsexbetta"
                  value="Driver SMS"
                  control={<Checkbox size="small" />}
                  label="Driver SMS"
                  autoComplete="new-password"
                  onChange={handleChange}
                  checked={Boolean(formData.driversmsexbetta || selectedCustomerData?.driversmsexbetta || book.driversmsexbetta)}
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
                  value={Duty.find((option) => option.optionvalue)?.label || ''}
                  options={Duty.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.duty || selectedCustomerData.duty || ''
                    return (
                      <TextField {...params} label="Duty" name="duty" inputRef={params.inputRef} />
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
                  value={Pickup.find((option) => option.optionvalue)?.label || ''}
                  options={Pickup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.pickup || selectedCustomerData.pickup || ''
                    return (
                      <TextField {...params} label="Pickup" name="pickup" inputRef={params.inputRef} />
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
                  value={formData.useage || selectedCustomerData.useage || book.useage}
                  onChange={handleChange}
                  label="Usage"
                  id="usage"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <StreamIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="request"
                  value={formData.request || selectedCustomerData.request || book.request}
                  onChange={handleChange}
                  label="Request"
                  id="request"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Start Date">
                    <DatePicker
                      value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
                      onChange={(date) => handleDateChange(date, 'startdate')}
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
                      value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null}
                      onChange={(date) => handleDateChange(date, 'closedate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate} />
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
                    value={formData.totaldays || calculateTotalDays() || book.totaldays}
                    label="Total Days"
                    size="small"
                    type="number"
                    id="total-days"
                    variant="standard"
                  />
                </DemoItem>
              </div>
              <div className="input">
                <div className="icone">
                  <RecentActorsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  value={formData.empolyeeno || selectedCustomerData.empolyeeno || book.empolyeeno}
                  onChange={handleChange}
                  name="empolyeeno"
                  label="Empolyee No"
                  id="empolyeeno"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input time">
                <label>Start Time</label>
                <input
                  type="time"
                  value={formData.starttime || selectedCustomerData.starttime || book.starttime}
                  onChange={(event) => {
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                  }}
                  name="starttime"
                />
              </div>
              <div className="input time">
                <label>Close Time</label>
                <input
                  type="time"
                  value={formData.closetime || selectedCustomerData.closetime || book.closetime}
                  onChange={(event) => {
                    setBook({ ...book, closetime: event.target.value });
                    setCloseTime(event.target.value);
                  }}
                  name="closetime"
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
                  value={formData.advancepaidtovendor || selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor}
                  onChange={handleChange}
                  label="Advance-Paid-To-Vendor"
                  id="advance-paid-to-vendor"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="customercode"
                  value={formData.customercode || selectedCustomerData.customercode || book.customercode}
                  onChange={handleChange}
                  label="Customer Code"
                  id="customer-code"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <TextField
                  name="startkm"
                  value={formData.startkm || selectedCustomerData.startkm || book.startkm}
                  onChange={handleChange}
                  size="small"
                  label="Start KM"
                  type="number"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "23ch" }}
                />
              </div>
              <div className="input">
                <TextField
                  name="closekm"
                  value={formData.closekm || selectedCustomerData.closekm || book.closekm}
                  onChange={handleChange}
                  label="Close KM"
                  size="small"
                  type="number"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "23ch" }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faStamp} />
                </div>
                <TextField
                  name="permit"
                  value={formData.permit || selectedCustomerData.permit || book.permit}
                  onChange={handleChange}
                  label="Permit"
                  id="permit"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faSquareParking} />
                </div>
                <TextField
                  name="parking"
                  value={formData.parking || selectedCustomerData.parking || book.parking}
                  onChange={handleChange}
                  label="Parking"
                  id="parking"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <TollTwoToneIcon color="action" />
                </div>
                <TextField
                  name="toll"
                  value={formData.toll || selectedCustomerData.toll || book.toll}
                  onChange={handleChange}
                  label="Toll"
                  id="Toll"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <BackupTableSharpIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="vpermettovendor"
                  value={formData.vpermettovendor || selectedCustomerData.vpermettovendor || book.vpermettovendor}
                  onChange={handleChange}
                  label="v-permet-To-Vendor"
                  id="v-permet-to-vendor"
                  autoFocus
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
                  value={formData.vendortoll || selectedCustomerData.vendortoll || book.vendortoll}
                  onChange={handleChange}
                  label="Vendor-Toll"
                  id="vendor-toll"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PaymentsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="customeradvance"
                  value={formData.customeradvance || selectedCustomerData.customeradvance || book.customeradvance}
                  onChange={handleChange}
                  label="Customer-Advance"
                  id="customer-advance"
                  autoFocus
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
                  value={Email.find((option) => option.optionvalue)?.label || ''}
                  options={Email.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.email1 || selectedCustomerData.email1 || ''
                    return (
                      <TextField {...params} label="Email" name="email1" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "450px" }}>
                <div className="icone">
                  <MarkChatReadIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="remark"
                  value={formData.remark || selectedCustomerData.remark || book.remark}
                  onChange={handleChange}
                  label="Remark"
                  id="remark"
                  sx={{ m: 1, width: "300ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <FormControlLabel
                  name="valueprint"
                  value="value&print"
                  control={<Checkbox size="small" />}
                  label="Value & Print"
                  autoComplete="new-password"
                  onChange={handleChange}
                  checked={Boolean(formData.valueprint || selectedCustomerData?.valueprint || book.valueprint)}
                />
              </div>
              <div className="input">
                <Button startIcon={<BorderColorIcon />} variant="outlined">
                  Edit Vehicle
                </Button>
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "175px" }}>
                <Button variant="contained" onClick={handleAdd}>Add</Button>
              </div>
            </div>
          </div>
          {error &&
            <div className='alert-popup Error' >
              <span className='cancel-btn' onClick={hidePopup}>x</span>
              <p>{errorMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success' >
              <span className='cancel-btn' onClick={hidePopup}>x</span>
              <p>success fully submitted</p>
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
                        value={DocumentType.find((option) => option.optionvalue)?.label || ''}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ''}
                        renderInput={(params) => {
                          params.inputProps.value = formData.documenttype || selectedCustomerData.documenttype || ''
                          return (
                            <TextField {...params} label="Document Type" name="documenttype" inputRef={params.inputRef} />
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
                        value={formData.documentnotes || selectedCustomerData.documentnotes || book.documentnotes}
                        onChange={handleChange}
                        label="Document Notes"
                        id="document-notes"
                        variant="standard"
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
                        value={formData.tripid || selectedCustomerData.tripid || book.tripid}
                        onChange={handleChange}
                        label="Vendor Trip No"
                        id="Vendor-Trip-No"
                        variant="standard"
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
                        onChange={(event, value) => handleAutocompleteChange(event, value, "vehicles")}
                        value={VehicleRate.find((option) => option.optionvalue)?.label || ''}

                        options={VehicleRate.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ''}
                        renderInput={(params) => {
                          // params.inputProps.value = selectedCustomerData.vehicles || ''
                          params.inputProps.value = formData.vehicleRate || selectedCustomerData.vehicleRate || ''
                          return (
                            <TextField {...params} label="Vehicle" name="vehicles" inputRef={params.inputRef} />
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
                        value={Duty.find((option) => option.optionvalue)?.label || ''}
                        options={Duty.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ''}
                        renderInput={(params) => {
                          params.inputProps.value = formData.duty || selectedCustomerData.duty || ''
                          return (
                            <TextField {...params} label="Duty" name="duty1" inputRef={params.inputRef} />
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
                            value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
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
                            value={formData.closedate || selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null}
                            onChange={(date) => handleDateChange(date, 'closedate1')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.closedate} />
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
                          value={calculateTotalDays()}
                          label="Total Days"
                          size="small"
                          type="number"
                          id="total-days"
                          variant="standard"
                        />
                      </DemoItem>
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        name="locks"
                        value="lock"
                        control={<Checkbox size="small" />}
                        label="Lock"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(formData.locks || selectedCustomerData?.locks || book.locks)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input time">
                      <label>Start Time</label>
                      <input
                        type="time"
                        value={formData.starttime || selectedCustomerData.starttime || book.starttime}
                        onChange={(event) => {
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
                        value={formData.closetime || selectedCustomerData.closetime || book.closetime}
                        onChange={(event) => {
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
                        value={formData.totaltime || calculateTotalTime() || book.totaltime}
                        label="Total Time"
                        id="total-time"
                        variant="standard"
                      />
                    </div>
                    <div className="input">
                      <Button>Billing</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField
                        name="startkm1"
                        value={formData.startkm || selectedCustomerData.startkm || book.startkm}
                        onChange={handleChange}
                        size="small"
                        label="Start KM"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "23ch" }}
                      />
                    </div>
                    <div className="input">
                      <TextField
                        name="closekm1"
                        value={formData.closekm || selectedCustomerData.closekm || book.closekm}
                        onChange={handleChange}
                        label="Close KM"
                        size="small"
                        type="number"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "23ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faRoad} size="lg" />
                      </div>
                      <TextField
                        name="totalkm1"
                        value={formData.totalkm1 || calculateTotalKilometers() || book.totalkm1}
                        label="Total KM"
                        id="total-km"
                        variant="standard"
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
                        value={formData.remark || selectedCustomerData.remark || book.remark}
                        onChange={handleChange}
                        label="Remarks"
                        id="remark"
                        variant="standard"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      </div>
                      <TextField
                        name="caramount"
                        value={formData.caramount || selectedCustomerData.caramount || book.caramount}
                        onChange={handleChange}
                        label="Car Amount"
                        id="car-amount"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="outlined">Update</Button>
                    </div>
                    <div className="input" style={{ width: "250px" }}>
                      <Button variant="contained">Update Vendor Advance</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "250px" }}>
                      <Button>Click Here Load Original</Button>
                    </div>
                    <div className="input">
                      <p style={{ "font-weigh": "500" }}>
                        Give What Is The Status Of Trip Sheet
                      </p>
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
                        <FontAwesomeIcon icon={faRoad} size="lg" />
                      </div>
                      <TextField
                        name="minkm"
                        label="Min.Km"
                        id="min-km"
                        size="small"
                      />
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faStopwatch} size="lg" />
                      </div>
                      <TextField
                        name="minhrs"
                        value={formData.minhrs || selectedCustomerData.minhrs || book.minhrs}
                        onChange={handleChange}
                        label="Min.Hrs"
                        id="min-hrs"
                        size="small"
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
                        value={formData.package || selectedCustomerData.package || book.package}
                        onChange={handleChange}
                        label="Package"
                        id="package"
                        size="small"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        value={formData.amount || selectedCustomerData.amount || book.amount}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
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
                        name="exkm"
                        value={formData.exkm || selectedCustomerData.exkm || book.exkm}
                        onChange={handleChange}
                        label="Ex.Km"
                        id="ex-km"
                        size="small"
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
                        name="amount1"
                        value={formData.amount1 || selectedCustomerData.amount1 || book.amount1}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
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
                        name="exHrs"
                        value={formData.exHrs || selectedCustomerData.exHrs || book.exHrs}
                        onChange={handleChange}
                        label="Ex.Hrs"
                        id="ex-Hrs"
                        size="small"
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
                        name="amount2"
                        value={formData.amount2 || selectedCustomerData.amount2 || book.amount2}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
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
                        name="night"
                        value={formData.night || selectedCustomerData.night || book.night}
                        onChange={handleChange}
                        label="Night"
                        id="night"
                        size="small"
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
                        name="amount3"
                        value={formData.amount3 || selectedCustomerData.amount3 || book.amount3}
                        onChange={handleChange}
                        size="small"
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
                        name="driverconvenience"
                        value={formData.driverconvenience || selectedCustomerData.driverconvenience || book.driverconvenience}
                        onChange={handleChange}
                        label="Driver Convenience"
                        id="driver-convenience"
                        size="small"
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
                        name="amount4"
                        value={formData.amount4 || selectedCustomerData.amount4 || book.amount4}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="outlined">Uplock</Button>
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="contained">Update</Button>
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 10px" }}
                      >
                        <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg" />
                      </div>
                      <TextField
                        name="netamount"
                        value={formData.netamount || selectedCustomerData.netamount || book.netamount}
                        onChange={handleChange}
                        size="small"
                        label="Net Amount"
                        id="net-amount"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField
                        name="vehcommission"
                        value={formData.vehcommission || selectedCustomerData.vehcommission || book.vehcommission}
                        onChange={handleChange}
                        type="number"
                        label="Veh.Commission"
                        size="small"
                        id="outlined-start-adornment"
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
                        value={formData.caramount || selectedCustomerData.caramount || book.caramount}
                        onChange={handleChange}
                        size="small"
                        label="Car Amount"
                        id="car-amount"
                      />
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        name="manualbillss"
                        value="manual-bills"
                        control={<Checkbox size="small" />}
                        label="Manual Bills"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(formData.manualbillss || selectedCustomerData?.manualbillss || book.manualbillss)}
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
                        value={formData.pack || selectedCustomerData.pack || book.pack}
                        onChange={handleChange}
                        label="Pack"
                        id="pack"
                        size="small"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount5"
                        value={formData.amount5 || selectedCustomerData.amount5 || book.amount5}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
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
                        value={formData.exkm1 || selectedCustomerData.exkm1 || book.exkm1}
                        onChange={handleChange}
                        label="Ex.Km"
                        id="ex-km"
                        size="small"
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
                        name="amount6"
                        value={formData.amount6 || selectedCustomerData.amount6 || book.amount6}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
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
                        value={formData.exHrs1 || selectedCustomerData.exHrs1 || book.exHrs1}
                        onChange={handleChange}
                        label="Ex.Hrs"
                        id="ex-Hrs"
                        size="small"
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
                        name="amount7"
                        value={formData.amount7 || selectedCustomerData.amount7 || book.amount7}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
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
                        value={formData.night1 || selectedCustomerData.night1 || book.night1}
                        onChange={handleChange}
                        label="Night"
                        id="night"
                        size="small"
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
                        name="amount8"
                        value={formData.amount8 || selectedCustomerData.amount8 || book.amount8}
                        onChange={handleChange}
                        size="small"
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
                        value={formData.driverconvenience1 || selectedCustomerData.driverconvenience1 || book.driverconvenience1}
                        onChange={handleChange}
                        label="Driver Convenience"
                        id="driver-convenience"
                        size="small"
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
                        name="amount9"
                        value={formData.amount9 || selectedCustomerData.amount9 || book.amount9}
                        onChange={handleChange}
                        size="small"
                        label="Amount"
                        id="amount"
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
                        value={formData.rud || selectedCustomerData.rud || book.rud}
                        onChange={handleChange}
                        label="Rud"
                        id="rud"
                        size="small"
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
                        value={formData.netamount1 || selectedCustomerData.netamount1 || book.netamount1}
                        onChange={handleChange}
                        size="small"
                        label="Net Amount"
                        id="net-amount"
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
                        value={formData.discount || selectedCustomerData.discount || book.discount}
                        onChange={handleChange}
                        label="Discount"
                        id="discount"
                        size="small"
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
                        value={formData.ons || selectedCustomerData.ons || book.ons}
                        onChange={handleChange}
                        size="small"
                        label="On"
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
                        value={formData.balance || selectedCustomerData.balance || book.balance}
                        onChange={handleChange}
                        size="small"
                        label="Balance"
                        id="balance"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField size="small" variant="standard" />
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
                      <TextField size="small" variant="standard" />
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
                            value={selectedCustomerData.fcdate ? dayjs(selectedCustomerData.fcdate) : null}
                            onChange={(date) => handleDateChange(date, 'fcdate')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.fcdate} />
                            )}
                          </DatePicker>
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Tax Date">
                          <DatePicker
                            value={selectedCustomerData.taxdate ? dayjs(selectedCustomerData.taxdate) : null}
                            onChange={(date) => handleDateChange(date, 'taxdate')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="taxdate"
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
                            value={selectedCustomerData.insdate ? dayjs(selectedCustomerData.insdate) : null}
                            onChange={(date) => handleDateChange(date, 'insdate')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.insdate} />
                            )}
                          </DatePicker>
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="St.Permit">
                          <DatePicker
                            value={selectedCustomerData.stpermit ? dayjs(selectedCustomerData.stpermit) : null}
                            onChange={(date) => handleDateChange(date, 'stpermit')}
                          >
                            {({ inputProps, inputRef }) => (
                              <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.stpermit} />
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
                        value={formData.maintenancetype || selectedCustomerData.maintenancetype || book.maintenancetype}
                        onChange={handleChange}
                        label="Maintenance Type"
                        id="maintenance-type"
                        size="small"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <TextField
                        name="kilometer"
                        value={formData.kilometer || selectedCustomerData.kilometer || book.kilometer}
                        onChange={handleChange}
                        size="small"
                        label="Kilometer"
                        id="kilometer"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
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
                        value={Select.find((option) => option.optionvalue)?.label || ''}
                        options={Select.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ''}
                        renderInput={(params) => {
                          params.inputProps.value = formData.selects || selectedCustomerData.selects || ''
                          return (
                            <TextField {...params} label="Select" name="selects" inputRef={params.inputRef} />
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
                      <Button>View GPS Map</Button>
                    </div>
                    <div className="input">
                      <Button>View GPS Log</Button>
                    </div>
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
                        value={DocumentType.find((option) => option.optionvalue)?.label || ''}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ''}
                        renderInput={(params) => {
                          params.inputProps.value = formData.documenttype || selectedCustomerData.documenttype || ''
                          return (
                            <TextField {...params} label="Document Type" name="documenttype" inputRef={params.inputRef} />
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
                        value={selectedCustomerData.on1 || book.on1}
                        onChange={handleChange}
                        size="document-notes"
                        label="Document Notes"
                        id="document-notes"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "220px" }}>
                      <Button variant="contained">Select File & Upload</Button>
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
                      />
                    </div>
                    <div className="input">
                      <Button>Refresh</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <Button>Manual Marking</Button>
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
                        rows={UpdateTbaleRowsGPSSlider}
                        columns={UpdateTbaleColumnsGPSSlider}
                        pageSize={5}
                        checkboxSelection
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={6} sx={{ p: 2 }}>
                <div className="Customer-Message-Slider">
                  <div className="input-field">
                    <div className="input" style={{ "padding-right": "300px" }}>
                      <Button>Manual Marking</Button>
                    </div>
                    <div className="input" style={{ width: "300px" }}>
                      <div className="icone">
                        <MarkChatReadIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        sx={{ m: 1, width: "300ch" }}
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "50px" }}>
                      <IconButton color="primary" aria-label="delete">
                        <WhatsAppIcon
                          fontSize="inherit"
                          sx={{ color: "#47dc53" }}
                        />
                      </IconButton>
                    </div>
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
