import React, { useState, useEffect, useCallback } from 'react';
import "./Booking.css";
import dayjs from "dayjs";
import axios from "axios";
import jsPDF from 'jspdf';
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { Duty, Hire, PayType, Report, VehicleModel, Service_Station } from "./Booking";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox } from "@mui/material";
// ICONS
import InfoIcon from "@mui/icons-material/Info";
import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { AiOutlineFileSearch } from "react-icons/ai";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CommuteIcon from "@mui/icons-material/Commute";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TaxiAlertTwoToneIcon from "@mui/icons-material/TaxiAlertTwoTone";
import AddIcCallTwoToneIcon from "@mui/icons-material/AddIcCallTwoTone";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";

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

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "bookingno", headerName: "Booking No", width: 130 },
  { field: "bookingdate", headerName: "Booking Date", width: 130 },
  { field: "bookingtime", headerName: "Booking Time", width: 130 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "tripid", headerName: "Trip ID", width: 130 },
  { field: "customer", headerName: "Customer", width: 90 },
  { field: "orderedby", headerName: "Ordered-By", width: 160 },
  { field: "mobileno", headerName: "Mobile No", width: 130 },
  { field: "guestname", headerName: "Guest-Name", width: 130 },
  { field: "guestmobileno", headerName: "Guest-Mobile-No", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "employeeno", headerName: "Employee No", width: 130 },
  { field: "address", headerName: "Address", width: 130 },
  { field: "report", headerName: "Report", width: 130 },
  { field: "vehicletype", headerName: "Vehicle Type", width: 130 },
  { field: "paymenttype", headerName: "Payment Type", width: 130 },
  { field: "usage", headerName: "Usage", width: 130 },
  { field: "username", headerName: "User Name", width: 130 },
  { field: "startdate", headerName: "Report Date", width: 130 },
  { field: "starttime", headerName: "Start Time", width: 130 },
  { field: "reporttime", headerName: "Report Time", width: 130 },
  { field: "duty", headerName: "Duty", width: 130 },
  { field: "pickup", headerName: "Pickup", width: 130 },
  { field: "customercode", headerName: "Cost Code", width: 130 },
  { field: "requestno", headerName: "Request No", width: 130 },
  { field: "flightno", headerName: "Flight No", width: 130 },
  { field: "orderbyemail", headerName: "Order By Email", width: 130 },
  { field: "remarks", headerName: "Remarks", width: 130 },
  { field: "servicestation", headerName: "Service Station", width: 130 },
  { field: "advance", headerName: "Advance", width: 130 },
  { field: "hiretype", headerName: "Hire Type", width: 130 },
  { field: "travelsname", headerName: "Travels Name", width: 130 },
  { field: "vehicleregisterno", headerName: "Vehicle Register No", width: 130 },
  { field: "vehiclemodle", headerName: "Vehicle Modle", width: 130 },
  { field: "drivername", headerName: "Driver Name", width: 130 },
  { field: "driverphone", headerName: "Driver Phone", width: 130 },
  { field: "travelsemail", headerName: "Travels Email", width: 130 },
];

const Booking = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [actionName] = useState('');
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);
  const [displayCopy, setDisplayCopy] = useState(false);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [triptime, setTripTime] = useState('');
  const [registertime, setRegisterTime] = useState('');
  const [starttime, setStartTime] = useState('');
  const [bookingtime, setBookingTime] = useState('');
  const location = useLocation();
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});
  const [searchText, setSearchText] = useState('');
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [formValues, setFormValues] = useState({
    guestname: '',
    guestmobileno: '',
    email: '',
    useage: '',
  });

  const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
    customer: '',
  });

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
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusValue = params.get('status') || 'pending';
    const formData = {};

    // Define a list of parameter keys
    const parameterKeys = [
      'bookingno', 'bookingdate', 'bookingtime', 'status', 'tripid', 'customer', 'orderedby',
      'mobile', 'guestname', 'guestmobileno', 'email', 'employeeno', 'address1', 'streetno',
      'city', 'report', 'vehType', 'paymenttype', 'startdate', 'starttime', 'registertime',
      'duty', 'pickup', 'customercode', 'registerno', 'flightno', 'orderbyemail', 'remarks',
      'servicestation', 'advance', 'nameupdate', 'address3', 'address4', 'cityupdate', 'useage',
      'username', 'tripdate', 'triptime', 'emaildoggle', 'hiretypes', 'travelsname',
      'vehRegNo', 'vehiclemodule', 'driverName', 'mobileNo', 'travelsemail'
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
    bookingno: '',
    bookingdate: dayjs(),
    bookingtime: '',
    status: '',
    tripid: '',
    customer: '',
    orderedby: '',
    mobile: '',
    guestname: '',
    guestmobileno: '',
    email: '',
    employeeno: '',
    address1: '',
    streetno: '',
    city: '',
    report: '',
    vehType: '',
    paymenttype: '',
    startdate: '',
    starttime: '',
    registertime: '',
    duty: '',
    pickup: '',
    customercode: '',
    registerno: '',
    flightno: '',
    orderbyemail: '',
    remarks: '',
    servicestation: '',
    advance: '',
    nameupdate: '',
    address3: '',
    address4: '',
    cityupdate: '',
    useage: '',
    username: '',
    tripdate: '',
    triptime: '',
    emaildoggle: '',
    hiretypes: '',
    travelsname: '',
    vehRegNo: '',
    vehiclemodule: '',
    driverName: '',
    mobileNo: '',
    travelsemail: '',
  });

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      bookingno: '',
      bookingdate: '',
      bookingtime: '',
      tripid: '',
      customer: '',
      orderedby: '',
      mobile: '',
      guestname: '',
      guestmobileno: '',
      email: '',
      employeeno: '',
      address1: '',
      streetno: '',
      city: '',
      report: '',
      vehType: '',
      paymenttype: '',
      startdate: '',
      starttime: '',
      registertime: '',
      duty: '',
      pickup: '',
      customercode: '',
      registerno: '',
      flightno: '',
      orderbyemail: '',
      remarks: '',
      servicestation: '',
      advance: '',
      nameupdate: '',
      address3: '',
      address4: '',
      cityupdate: '',
      useage: '',
      username: '',
      tripdate: '',
      triptime: '',
      emaildoggle: '',
      hiretypes: '',
      travelsname: '',
      vehRegNo: '',
      vehiclemodule: '',
      driverName: '',
      mobileNo: '',
      travelsemail: '',
    }));
    setFormValues({});
    setSelectedCustomerData({});
    setSelectedCustomerDatas({});
    setFormData({});
  };
  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "VehicleStatement Reports.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF('Landscape');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("VehicleStatement Reports", 10, 10);

    // Modify tableData to exclude the index number
    const tableData = rows.map((row) => [
      row['id'],
      row['status'],
      row['bookingno'],
      row['tripid'],
      row['bookingdate'],
      row['bookingtime'],
      row['guestname'],
      row['mobileno'],
      row['address1'],
      row['streetno'],
      row['customer'],
      row['vehRegNo'],
    ]);

    pdf.autoTable({
      head: [['Sno', 'Status', 'Booking ID', 'Tripsheet No', 'Date', 'Time', 'Guest Name', 'Mobile', 'R.Address', 'R.Address1', 'R.Address2', 'Company', 'Register NO']],
      body: tableData,
      startY: 20,
    });

    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'VehicleStatement Reports.pdf');
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleChange = useCallback((event) => {
    const { name, value, checked, type } = event.target;

    if (type === 'checkbox') {
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
    } else if (type === 'radio') {
      setBook((prevBook) => ({
        ...prevBook,
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
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      const fieldValue = value;
      setBook((prevBook) => ({
        ...prevBook,
        [name]: fieldValue,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: fieldValue,
      }));
      setSelectedCustomerDatas((prevData) => ({
        ...prevData,
        [name]: fieldValue,
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: fieldValue,
      }));
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: fieldValue,
      }));
    }
  }, [setBook, setSelectedCustomerData, setFormData, setFormValues, setSelectedCustomerDatas]);

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };
  const handleDateChange = (date, fieldName) => {
    setBook((prevData) => ({
      ...prevData,
      [fieldName]: date,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [fieldName]: date,
    }));
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
      const selectedBookingDate = selectedCustomerData.bookingdate || formData.bookingdate || dayjs();

      const updatedBook = {
        ...book,
        bookingtime: bookingtime || getCurrentTime(),
        starttime: starttime,
        registertime: registertime,
        triptime: triptime,
        bookingdate: selectedBookingDate,
      };
      await axios.post('http://localhost:8081/booking', updatedBook);
      console.log(updatedBook);
      handleCancel();
      setSuccess(true);
      setSuccessMessage("Successfully Added");
      handlecheck();
    } catch (error) {
      console.error('Error updating customer:', error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleClick = async (event, actionName, bookingno) => {
    event.preventDefault();

    try {
      if (actionName === 'Email') {
        console.log('List button clicked');
      } else if (actionName === 'Clear') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/booking/${book.bookingno}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        setSuccess(true);
        setSuccessMessage("Successfully Deleted");
        setFormData(null);
        handleCancel();
      } else if (actionName === 'Modify') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.bookingno === selectedCustomerData.bookingno || formData.bookingno);
        const updatedCustomer = {
          ...selectedCustomer,
          ...selectedCustomerData,
          bookingtime: bookingtime || getCurrentTime(),
          starttime: starttime,
          registertime: registertime,
          triptime: triptime,
          bookingdate: selectedCustomerData.bookingdate || formData.bookingdate || dayjs(),
        };
        await axios.put(`http://localhost:8081/booking/${book.bookingno || selectedCustomerData.bookingno || formData.bookingno}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
        handlecheck();
        setSuccess(true);
        setSuccessMessage("Successfully Updated");
      } else if (actionName === 'Copy This') {
        console.log('Copy This button clicked');
        handleClickShow();
      } else if (actionName === 'Add') {
        handleAdd();
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage("Check Network Connection")
    }
  };

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });

  const handleClickShow = () => {
    setDisplayCopy(true);
  };

  const handleClickHide = () => {
    setDisplayCopy(false);
  };

  const actions = [
    { icon: <LocalPostOfficeIcon />, name: "Email" },
    { icon: <CancelPresentationIcon />, name: "Clear" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Modify" },
    { icon: <ContentCopyIcon />, name: "Copy This" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
  ];

  useEffect(() => {
    const activeMenuItem = localStorage.getItem("activeMenuItem");
    if (activeMenuItem) {
      const menuItems = document.querySelectorAll(".menu-link");
      menuItems.forEach((item) => {
        if (item.textContent === activeMenuItem) {
          item.classList.add("actives");
        } else {
          item.classList.remove("actives");
        }
      });
    }
  }, [location]);

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8081/booking/${event.target.value}`);
        const bookingDetails = response.data;
        console.log(bookingDetails);
        setSelectedCustomerData(bookingDetails);
        setSelectedCustomerId(bookingDetails.tripid);
      } catch (error) {
        console.error('Error retrieving booking details:', error);
        setError(true);
        setErrorMessage("Error retrieving booking details");
      }
    }
  }, []);

  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const current = new Date().getFullYear();
    const pastYear = current - 1;
    const value = `JESSY CABS ${pastYear}-${current}`;
    setCurrentYear(value);
  }, []);

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
    const bookingno = book.bookingno;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bookingno', bookingno);
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:8081/uploads', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [enterPressCount, setEnterPressCount] = useState(0);

  const handleKeyEnter = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (enterPressCount === 0) {
        // First Enter key press - Display in the table
        try {
          const response = await axios.get(`http://localhost:8081/name-customers/${event.target.value}`);
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
          handleChange({ target: { name: "customer", value: selectedRow.customer } });
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
    handleChange({ target: { name: "customer", value: params.customer } });
  }, [handleChange]);

  const handletableClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);

  const [sendEmail, setSendEmail] = useState(false);
  const handlecheck = async () => {

    if (sendEmail) {
      try {
        const dataToSend = {
          guestname: formValues.guestname,
          guestmobileno: formValues.guestmobileno,
          email: formValues.email,
          pickup: formValues.pickup,
          useage: formValues.useage
        };

        await axios.post('http://localhost:8081/send-email', dataToSend);
        // alert('Email sent successfully');
        setSuccess(true);
        setSuccessMessage("Mail Sent Successfully")
        console.log(dataToSend);
      } catch (error) {
        console.error('Error sending email:', error);
        setError(true);
        setErrorMessage("An error occured while sending mail")
      }
    } else {
      console.log('Send mail checkbox is not checked. Email not sent.');
    }
  };

  const handleShowAll = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/booking_for_table?search=${encodeURIComponent(searchText)}&fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}`
      );
      const data = response.data;
      console.log(data);
      setRow(data);
      setSuccessMessage("Successfully listed");
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRow([]);
      setErrorMessage("Check your Network Connection");
    }
  }, [searchText, fromDate, toDate]);

  return (
    <div className="booking-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>
                <TextField
                  name="bookingno"
                  label="Booking"
                  id="standard-size-normal"
                  autoComplete="new-password"
                  value={formData.bookingno || selectedCustomerData.bookingno || book.bookingno || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  variant="standard"
                  autoFocus
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Booking Date">
                    <DatePicker
                      value={book.bookingdate ? dayjs(book.bookingdate) : dayjs()}
                      onChange={(date) => handleDateChange(date, 'bookingdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.bookingdate} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input time">
                <label>Booking Time</label>
                <input
                  type="time"
                  value={formData.bookingtime || selectedCustomerData.bookingtime || book.bookingtime || getCurrentTime() || ''}
                  onChange={(event) => {
                    setBook({ ...book, bookingtime: event.target.value });
                    setBookingTime(event.target.value);
                  }}
                  name="bookingtime"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="status"
                    autoComplete="new-password"
                    value={formData.status || selectedCustomerData.status || book.status || ''}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="pending"
                      control={<Radio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      value="cancelled"
                      control={<Radio />}
                      label="Cancelled"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="input">
                <div className="icone">
                  <SellIcon color="action" />
                </div>
                <TextField
                  name="tripid"
                  autoComplete="new-password"
                  value={formData.tripid || selectedCustomerData.tripid || book.tripid || ''}
                  onChange={handleChange}
                  label="Trip Id"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size='small'
                  id="customer"
                  label="Customer"
                  name="customer"
                  value={formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyEnter}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <HomeRepairServiceTwoToneIcon color="action" />
                </div>
                <TextField
                  name="orderedby"
                  autoComplete="new-password"
                  value={formData.orderedby || selectedCustomerData.orderedby || book.orderedby || ''}
                  onChange={handleChange}
                  label="Ordered by"
                  id="orderedby"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AddIcCallTwoToneIcon color="action" />
                </div>
                <TextField
                  name="mobile"
                  autoComplete="new-password"
                  value={formData.mobile || selectedCustomerData.mobile || book.mobile || ''}
                  onChange={handleChange}
                  label="Mobile No"
                  id="mobile"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AccountCircleTwoToneIcon color="action" />
                </div>
                <TextField
                  name="guestname"
                  autoComplete="new-password"
                  value={formData.guestname || selectedCustomerData.guestname || book.guestname || formValues.guestname || ''}
                  onChange={handleChange}
                  label="Guest Name"
                  id="guestname"
                  variant="standard"
                  required
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="guestmobileno"
                  autoComplete="new-password"
                  value={formData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno || ''}
                  onChange={handleChange}
                  label="Guest Mobile No"
                  id="guestmobileno"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  autoComplete="new-password"
                  value={formData.email || selectedCustomerData.email || formValues.email || book.email || ''}
                  onChange={handleChange}
                  label="Email"
                  id="email"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <div className="icone">
                  <RateReviewIcon color="action" />
                </div>
                <TextField
                  name="employeeno"
                  autoComplete="new-password"
                  value={formData.employeeno || selectedCustomerData.employeeno || book.employeeno || ''}
                  onChange={handleChange}
                  label="Employee No"
                  id="employeeno"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="streetname"
                  label="No.Street Name"
                  name="address1"
                  autoComplete="new-password"
                  value={formData.address1 || selectedCustomerData.address1 || book.address1 || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <HomeTwoToneIcon color="action" />
                </div>
                <TextField
                  name="streetno"
                  autoComplete="new-password"
                  value={formData.streetno || selectedCustomerData.streetno || book.streetno || ''}
                  onChange={handleChange}
                  label="Address"
                  id="address"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  name="city"
                  autoComplete="new-password"
                  value={formData.city || selectedCustomerData.city || book.city || ''}
                  onChange={handleChange}
                  label="City"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "report")}
                  value={Report.find((option) => option.Option)?.label || ''}
                  options={Report.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.report || selectedCustomerData.report || ''
                    return (
                      <TextField {...params} label="Report" autoComplete="password" name="report" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <TaxiAlertTwoToneIcon color="action" />
                </div>
                <TextField
                  name="vehType"
                  autoComplete="new-password"
                  value={formData.vehType || selectedCustomerData.vehType || book.vehType || ''}
                  onChange={handleChange}
                  label="Vehical Type"
                  id="vehicaltype"
                  variant="standard"
                  required
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletTwoToneIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "paymenttype")}
                  value={PayType.find((option) => option.Option)?.label || ''}
                  options={PayType.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.paymenttype || selectedCustomerData.paymenttype || ''
                    return (
                      <TextField {...params} label="Payment Type" name="paymenttype" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Report Date"
                    value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
                    onChange={(date) => handleDateChange(date, 'startdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input time">
                <label>Start Time</label>
                <input
                  type="time"
                  value={formData.starttime || selectedCustomerData.starttime || book.starttime || ''}
                  onChange={(event) => {
                    setFormData({ ...formData, starttime: event.target.value });
                    setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                  }}
                  name='starttime'
                />
              </div>
              <div className="input time">
                <label>Report Time</label>
                <input
                  type="time"
                  name='registertime'
                  value={formData.registertime || selectedCustomerData.registertime || book.registertime || ''}
                  onChange={(event) => {
                    setBook({ ...book, registertime: event.target.value });
                    setRegisterTime(event.target.value);
                  }}
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
                  value={Duty.find((option) => option.Option)?.label || ''}
                  options={Duty.map((option) => ({
                    label: option.Option,
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
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="streetname"
                  label="PickUp"
                  name="pickup"
                  autoComplete="new-password"
                  value={formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <QrCodeIcon color="action" />
                </div>
                <TextField
                  name="customercode"
                  autoComplete="new-password"
                  value={formData.customercode || selectedCustomerData.customercode || book.customercode || ''}
                  onChange={handleChange}
                  label="Customer code"
                  id="customercode"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AppRegistrationIcon color="action" />
                </div>
                <TextField
                  name="registerno"
                  autoComplete="new-password"
                  value={formData.registerno || selectedCustomerData.registerno || book.registerno || ''}
                  onChange={handleChange}
                  label="Request No"
                  id="registerno"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AirplaneTicketIcon color="action" />
                </div>
                <TextField
                  name="flightno"
                  autoComplete="new-password"
                  value={formData.flightno || selectedCustomerData.flightno || book.flightno || ''}
                  onChange={handleChange}
                  label="Flight No"
                  id="flight"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ForwardToInboxIcon color="action" />
                </div>
                <TextField
                  name="orderbyemail"
                  autoComplete="new-password"
                  value={formData.orderbyemail || selectedCustomerData.orderbyemail || book.orderbyemail || ''}
                  onChange={handleChange}
                  label="Order By Email"
                  id="orederbyemail"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <FmdBadIcon color="action" />
                </div>
                <TextField
                  name="remarks"
                  autoComplete="new-password"
                  value={formData.remarks || selectedCustomerData.remarks || book.remarks || ''}
                  onChange={handleChange}
                  label="Remarks"
                  id="remarks"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <DomainAddIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "servicestation")}
                  value={Service_Station.find((option) => option.optionvalue)?.label || ''}
                  options={Service_Station.map((option) => ({
                    label: option.optionvalue,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = formData.servicestation || selectedCustomerData.servicestation || ''
                    return (
                      <TextField {...params} label="Service Station" name="servicestation" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <InfoIcon color="action" />
                </div>
                <TextField
                  size='small'
                  name='advance'
                  autoComplete="new-password"
                  value={formData.advance || selectedCustomerData.advance || book.advance || ''}
                  onChange={handleChange}
                  label="Advance"
                  id="advance"
                  sx={{ m: 1, width: "25ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="container-right">
            <div className="booking-update-main">
              <div className="booking-update">
                <div className="Scroll-Style" style={{ overflow: 'scroll', height: '220px' }}>
                  <table >
                    <thead id='update-header'>
                      <tr>
                        <th>Customer Name</th>
                        <th>Customer Name</th>
                        {/* <th>Address</th> */}
                        <th>Address 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={6}>No data available.</td>
                        </tr>
                      ) : (
                        rows.map((row) => (
                          <tr id='update-row' key={row.id} onClick={() => handleRowClick(row)}>
                            <td>{row.customer}</td>
                            <td>{row.address1}</td>
                            <td>{row.streetno}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="inpu-field">
              <div className="input">
                <FormControlLabel
                  value="vehiclechanges"
                  control={<Checkbox size="small" />}
                  label="Vehicle Changes"
                />
              </div>
              <div className="input">
                <FormControlLabel
                  value="guestsms"
                  control={<Checkbox size="small" />}
                  label="Guest SMS"
                />
                <FormControlLabel
                  value="bookingsms"
                  control={<Checkbox size="small" />}
                  label="Booking SMS"
                />
                <FormControlLabel
                  id='sendMailCheckbox'
                  value="sendemail"
                  control={<Checkbox size="small" checked={sendEmail} onChange={(event) => setSendEmail(event.target.checked)} />}
                  label="Send Email"
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="usage"
                  label="Usage"
                  name="useage"
                  autoComplete="new-password"
                  value={formData.useage || selectedCustomerData.useage || formValues.useage || book.useage || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="new-password"
                  value={formData.username || selectedCustomerData.username || book.username || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`copy-item ${displayCopy ? "block" : "none"}`}>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    value={currentYear}
                    options={[currentYear]}
                    renderInput={(params) => (
                      <TextField {...params} label="Fin Years" />
                    )}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Trip Date">
                      <DatePicker
                        value={book.tripdate ? dayjs(book.tripdate) : dayjs()}
                        onChange={(date) => handleDateChange(date, 'tripdate')}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.tripdate} />
                        )}
                      </DatePicker>
                    </DemoItem>
                  </LocalizationProvider>
                </div>
                <div className="input time">
                  <label>Trip Time</label>
                  <input
                    type="time"
                    name='triptime'
                    value={formData.triptime || selectedCustomerData.triptime || book.triptime || ''}
                    onChange={(event) => {
                      setBook({ ...book, triptime: event.target.value });
                      setTripTime(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input-btn">
                  <span onClick={handleClickHide} className="btn">
                    Hide
                  </span>
                  <span className="btn">Copy</span>
                </div>
              </div>
            </div>
            <div className="inpu-field">
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Email
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="emaildoggle"
                    autoComplete="new-password"
                    value={formData.emaildoggle || selectedCustomerData.emaildoggle || book.emaildoggle || ''}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Local"
                      control={<Radio />}
                      label="Local"
                    />
                    <FormControlLabel
                      value="service"
                      control={<Radio />}
                      label="Service"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="input">
                {/* <Button color="primary" onClick={handleUpload} size="md" variant="outlined">
                  Attach File
                </Button> */}
                <Button variant="contained" onClick={handleUpload}>Attach File</Button>
              </div>
            </div>
          </div>
        </div>
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
        <div className="vehicle-confirm">
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <AirportShuttleIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "hiretypes")}
                value={Hire.find((option) => option.Option)?.label || ''}
                options={Hire.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => {
                  params.inputProps.value = formData.hiretypes || selectedCustomerData.hiretypes || ''
                  return (
                    <TextField {...params} label="Hire Types" name="hiretypes" inputRef={params.inputRef} />
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
                value={formData.travelsname || selectedCustomerData.travelsname || book.travelsname || ''}
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
                name="vehRegNo"
                autoComplete="new-password"
                value={formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || ''}
                onChange={handleChange}
                label="Vehicle Register No"
                id="vehRegNo"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <CommuteIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "vehiclemodule")}
                value={VehicleModel.find((option) => option.carmodel)?.label || ''}
                options={VehicleModel.map((option) => ({
                  label: option.carmodel,
                }))}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => {
                  params.inputProps.value = formData.vehiclemodule || selectedCustomerData.vehiclemodule || ''
                  return (
                    <TextField {...params} label="Vehicle Model" name="vehiclemodule" inputRef={params.inputRef} />
                  )
                }
                }
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <NoCrashIcon color="action" />
              </div>
              <TextField
                name="driverName"
                autoComplete="new-password"
                value={formData.driverName || selectedCustomerData.driverName || book.driverName || ''}
                onChange={handleChange}
                label="Driver Name"
                id="drivername"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="mobileNo"
                autoComplete="new-password"
                value={formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || ''}
                onChange={handleChange}
                label="Driver Phone"
                id="mobileNo"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="travelsemail"
                autoComplete="new-password"
                value={formData.travelsemail || selectedCustomerData.travelsemail || book.travelsemail || ''}
                onChange={handleChange}
                label="Travels Email"
                id="travelsemail"
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
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
          {info &&
            <div className='alert-popup Info' >
              <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{infoMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{successMessage}</p>
            </div>
          }
        </div>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Booking">
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <AiOutlineFileSearch color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Search"
                    name="searchText"
                    value={searchText || ''}
                    onChange={(e) => setSearchText(e.target.value)}
                  />

                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      name='fromDate'
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      name="toDate"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleShowAll}>Search</Button>
                </div>
              </div>
            </div>
          </div>
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
        <div className="table-bookingCopy-Booking">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={row}
              columns={columns}
              onRowClick={handletableClick}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Booking;
