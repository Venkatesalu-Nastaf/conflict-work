import React, { useState, useEffect, useCallback } from 'react';
import "./Booking.css";
import dayjs from "dayjs";
import axios from "axios";
import { Table } from "@mui/joy";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import { useLocation } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Duty, Hire, PayType, Report, VehicleModel, Service_Station } from "./Booking";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox } from "@mui/material";
// ICONS
import InfoIcon from "@mui/icons-material/Info";
import SellIcon from "@mui/icons-material/Sell";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CommuteIcon from "@mui/icons-material/Commute";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
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

const Booking = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [actionName] = useState('');
  const [rows, setRows] = useState([]);
  const [displayCopy, setDisplayCopy] = useState(false);
  const [value, setValue] = React.useState("billingaddress");
  const [triptime, setTripTime] = useState('');
  const [registertime, setRegisterTime] = useState('');
  const [starttime, setStartTime] = useState('');
  const [bookingtime, setBookingTime] = useState('');
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
    vehType: '',
    driverName: '',
    vehRegNo: '',
    mobileNo: '',
  });

  const hidePopup = () => {
    setError(false);
    setSuccess(false);
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
    const formData = {
      bookingno: params.get('bookingno'),
      bookingdate: params.get('bookingdate'),
      bookingtime: params.get('bookingtime'),
      status: params.get('status'),
      tripid: params.get('tripid'),
      customer: params.get('customer'),
      orderedby: params.get('orderedby'),
      mobileno: params.get('mobileno'),
      guestname: params.get('guestname'),
      guestmobileno: params.get('guestmobileno'),
      email: params.get('email'),
      employeeno: params.get('employeeno'),
      address1: params.get('address1'),
      address2: params.get('address2'),
      city: params.get('city'),
      report: params.get('report'),
      vehType: params.get('vehType'),
      paymenttype: params.get('paymenttype'),
      startdate: params.get('startdate'),
      starttime: params.get('starttime'),
      registertime: params.get('registertime'),
      duty: params.get('duty'),
      pickup: params.get('pickup'),
      costcode: params.get('costcode'),
      registerno: params.get('registerno'),
      flightno: params.get('flightno'),
      orderbyemail: params.get('orderbyemail'),
      remarks: params.get('remarks'),
      servicestation: params.get('servicestation'),
      advance: params.get('advance'),
      nameupdate: params.get('nameupdate'),
      address3: params.get('address3'),
      address4: params.get('address4'),
      cityupdate: params.get('cityupdate'),
      useage: params.get('useage'),
      username: params.get('username'),
      tripdate: params.get('tripdate'),
      triptime: params.get('triptime'),
      emaildoggle: params.get('emaildoggle'),
      hiretypes: params.get('hiretypes'),
      travelsname: params.get('travelsname'),
      vehicleregisterno: params.get('vehicleregisterno'),
      vehiclemodule: params.get('vehiclemodule'),
      driverName: params.get('driverName'),
      driverphone: params.get('driverphone'),
      travelsemail: params.get('travelsemail'),
    };
    setFormData(formData);
  }, [location]);

  const [book, setBook] = useState({
    bookingno: '',
    bookingdate: '',
    bookingtime: '',
    status: 'pending',
    tripid: '',
    customer: '',
    orderedby: '',
    mobileno: '',
    guestname: '',
    guestmobileno: '',
    email: '',
    employeeno: '',
    address1: '',
    address2: '',
    city: '',
    report: '',
    vehType: '',
    paymenttype: '',
    startdate: '',
    starttime: '',
    registertime: '',
    duty: '',
    pickup: '',
    costcode: '',
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
    vehicleregisterno: '',
    vehiclemodule: '',
    driverName: '',
    driverphone: '',
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
      mobileno: '',
      guestname: '',
      guestmobileno: '',
      email: '',
      employeeno: '',
      address1: '',
      address2: '',
      city: '',
      report: '',
      vehType: '',
      paymenttype: '',
      startdate: '',
      starttime: '',
      registertime: '',
      duty: '',
      pickup: '',
      costcode: '',
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
      vehicleregisterno: '',
      vehiclemodule: '',
      driverName: '',
      driverphone: '',
      travelsemail: '',
    }));
    setSelectedCustomerData({});
    setFormData({});
  };
  const handleChange = (event) => {
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
    } else if (type === 'radio') {
      const statusValue = value;
      setBook((prevBook) => ({
        ...prevBook,
        status: statusValue,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        status: statusValue,
      }));
      setFormData((prevData) => ({
        ...prevData,
        status: statusValue,
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
      setFormData((prevData) => ({
        ...prevData,
        [name]: fieldValue,
      }));
    }
  };



  const handleTabChange = (event, newValue) => {
    setValue(newValue);
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
        bookingtime: bookingtime,
        starttime: starttime,
        registertime: registertime,
        triptime: triptime,
      };
      await axios.post('http://localhost:8081/booking', updatedBook);
      console.log(updatedBook);
      handleCancel();
      setSuccess(true);

    } catch (error) {
      console.error('Error updating customer:', error);
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
        setFormData(null);
        handleCancel();
      } else if (actionName === 'Modify') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.bookingno === bookingno);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/booking/${book.bookingno}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
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
  // Local Storage

  useEffect(() => {
    // Retrieve the previously stored actives menu item from localStorage
    const activeMenuItem = localStorage.getItem("activeMenuItem");
    // Add 'actives' class to the actives menu item if it exists
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
        setSelectedCustomerData(bookingDetails);
        setSelectedCustomerId(bookingDetails.customerId);
      } catch (error) {
        console.error('Error retrieving booking details:', error);
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // If no file selected, exit the function
    const bookingno = book.bookingno; // Access the bookingno from the book object
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bookingno', bookingno);
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:8081/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleKeyEnter = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8081/name-customers/${event.target.value}`);
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
                  label="Booking No"
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
                      value={formData.bookingdate || selectedCustomerData.bookingdate ? dayjs(selectedCustomerData.bookingdate) : null}
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
                  value={formData.bookingtime || selectedCustomerData.bookingtime || book.bookingtime}
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
                  value={formData.tripid || selectedCustomerData.tripid || book.tripid}
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
                  name="customer"
                  autoComplete="new-password"
                  value={formData.customer || selectedCustomerDatas.customer || selectedCustomerData.customer || book.customer}
                  onChange={handleChange}
                  onKeyDown={handleKeyEnter}
                  label="Customer"
                  id="customer"
                  variant="standard"
                  required
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
                  value={formData.orderedby || selectedCustomerData.orderedby || book.orderedby}
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
                  name="mobileno"
                  autoComplete="new-password"
                  value={formData.mobileno || selectedCustomerData.mobileno || book.mobileno}
                  onChange={handleChange}
                  label="Mobile No"
                  id="mobileno"
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
                  value={formData.guestname || selectedCustomerData.guestname || book.guestname}
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
                  value={formData.guestmobileno || selectedCustomerData.guestmobileno || book.guestmobileno}
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
                  value={formData.email || selectedCustomerData.email || book.email}
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
                  value={formData.employeeno || selectedCustomerData.employeeno || book.employeeno}
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
                  value={formData.address1 || selectedCustomerData.address1 || book.address1}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <HomeTwoToneIcon color="action" />
                </div>
                <TextField
                  name="address2"
                  autoComplete="new-password"
                  value={formData.address2 || selectedCustomerData.address2 || book.address2}
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
                  value={formData.city || selectedCustomerData.city || book.city}
                  onChange={handleChange}
                  label="City"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">

                {/* <Autocomplete
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
                      <TextField {...params} label="Report" name="report" inputRef={params.inputRef} />
                    )
                  }
                  }
                /> */}
                <Autocomplete
                  fullWidth
                  id="free-solo-demo"
                  freeSolo
                  size="small"
                  options={Report.map((option) => ({
                    label: option.optionvalue,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "report")}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Report"
                        name="report"
                        inputRef={params.inputRef}
                        value={formData.report || selectedCustomerData.report || ""}
                        onChange={(event) => {
                          const newValue = event.target.value;
                          handleAutocompleteChange(event, newValue, "report");
                        }}
                      />
                    );
                  }}
                />

              </div>
              <div className="input">
                <div className="icone">
                  <TaxiAlertTwoToneIcon color="action" />
                </div>
                <TextField
                  name="vehType"
                  autoComplete="new-password"
                  value={formData.vehType || selectedCustomerData.vehType || book.vehType}
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
                {/* <Autocomplete
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
                /> */}
                <Autocomplete
                  fullWidth
                  id="free-solo-demo"
                  freeSolo
                  size="small"
                  options={PayType.map((option) => ({
                    label: option.optionvalue,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "paymenttype")}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Payment Type"
                        name="paymenttype"
                        inputRef={params.inputRef}
                        value={formData.paymenttype || selectedCustomerData.paymenttype || ""}
                        onChange={(event) => {
                          const newValue = event.target.value;
                          handleAutocompleteChange(event, newValue, "paymenttype");
                        }}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Report Date">
                    <DatePicker
                      value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
                      onChange={(date) => handleDateChange(date, 'startdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='startdate' value={formData.startdate || selectedCustomerData.startdate || ''} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input time">
                <label>Start Time</label>
                <input
                  type="time"
                  value={formData.starttime || selectedCustomerData.starttime || book.starttime}
                  onChange={(event) => {
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                  }}
                  name='starttime'
                />
              </div>
              <div className="input time">
                <label>Register Time</label>
                <input
                  type="time"
                  name='registertime'
                  value={formData.registertime || selectedCustomerData.registertime || book.registertime}
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
                {/* <Autocomplete
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
                /> */}
                <Autocomplete
                  fullWidth
                  id="free-solo-demo"
                  freeSolo
                  size="small"
                  options={Duty.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Duty"
                        name="duty"
                        inputRef={params.inputRef}
                        value={formData.duty || selectedCustomerData.duty || ""}
                        onChange={(event) => {
                          const newValue = event.target.value;
                          handleAutocompleteChange(event, newValue, "duty");
                        }}
                      />
                    );
                  }}
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
                  value={formData.pickup || selectedCustomerData.pickup || book.pickup}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <QrCodeIcon color="action" />
                </div>
                <TextField
                  name="costcode"
                  autoComplete="new-password"
                  value={formData.costcode || selectedCustomerData.costcode || book.costcode}
                  onChange={handleChange}
                  label="Cost Code"
                  id="costcode"
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
                  value={formData.registerno || selectedCustomerData.registerno || book.registerno}
                  onChange={handleChange}
                  label="Register No"
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
                  value={formData.flightno || selectedCustomerData.flightno || book.flightno}
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
                  value={formData.orderbyemail || selectedCustomerData.orderbyemail || book.orderbyemail}
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
                  value={formData.remarks || selectedCustomerData.remarks || book.remarks}
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
                {/* <Autocomplete
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
                /> */}
                <Autocomplete
                  fullWidth
                  id="free-solo-demo"
                  freeSolo
                  size="small"
                  options={Service_Station.map((option) => ({
                    label: option.optionvalue,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "servicestation")}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Service Station"
                        name="servicestation"
                        inputRef={params.inputRef}
                        value={formData.servicestation || selectedCustomerData.servicestation || ""}
                        onChange={(event) => {
                          const newValue = event.target.value;
                          handleAutocompleteChange(event, newValue, "servicestation");
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <InfoIcon color="action" />
                </div>
                <TextField
                  size='small'
                  type="number"
                  name='advance'
                  autoComplete="new-password"
                  value={formData.advance || selectedCustomerData.advance || book.advance}
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
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleTabChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="List" value="list" />
                      <Tab label="Billing Address" value="billingaddress" />
                      <Tab label="Email" value="email" />
                    </TabList>
                  </Box>
                  <TabPanel value="list">
                    <div className="booking-update">
                      <div className="Scroll-Style" style={{ overflow: 'scroll', height: '220px' }}>
                        <Table hoverRow borderAxis="y">
                          <thead>
                            <tr>
                              <th>Customer Name</th>
                              <th>Address</th>
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
                                <tr key={row.id} onClick={() => handleRowClick(row)}>
                                  <td>{row.printName}</td>
                                  <td>{row.address1}</td>
                                  <td>{row.address2}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="billingaddress">
                    <div className="booking-update">
                      <div className="booking-update-content">
                        <div className="input-field billing">
                          <div className="input">
                            <div className="icone">
                              <PermIdentityIcon color="action" />
                            </div>
                            <TextField
                              margin="normal"
                              size="small"
                              name="nameupdate"
                              autoComplete="new-password"
                              value={formData.guestname || selectedCustomerData.guestname || book.guestname}
                              onChange={handleChange}
                              label="Name"
                              id="name"
                              autoFocus
                            />
                          </div>
                          <div className="input">
                            <div className="icone">
                              <AddHomeWorkIcon color="action" />
                            </div>
                            <TextField
                              margin="normal"
                              size="small"
                              id="streetnameupdate"
                              label="No.Street Name"
                              name="address3"
                              autoComplete="new-password"
                              value={formData.address1 || selectedCustomerData.address1 || book.address1}
                              onChange={handleChange}
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="input-field billing">
                          <div className="input">
                            <div className="icone">
                              <HomeTwoToneIcon color="action" />
                            </div>
                            <TextField
                              name="address4"
                              autoComplete="new-password"
                              value={formData.address2 || selectedCustomerData.address2 || book.address2}
                              onChange={handleChange}
                              label="Address"
                              id="address4"
                              variant="standard"
                            />
                          </div>
                          <div className="input">
                            <div className="icone">
                              <LocationCityIcon color="action" />
                            </div>
                            <TextField
                              name="cityupdate"
                              autoComplete="new-password"
                              value={formData.city || selectedCustomerData.city || book.city}
                              onChange={handleChange}
                              label="City"
                              id="cityupdate"
                              variant="standard"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="email">
                    <div className="booking-update">
                      <div className="booking-update-content list-update">
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                        <p className="bottom-line">demo@gmail.com</p>
                      </div>
                    </div>
                  </TabPanel>

                </TabContext>
              </Box>
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
                  value="sendemail"
                  control={<Checkbox size="small" />}
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
                  value={formData.useage || selectedCustomerData.useage || book.useage}
                  onChange={handleChange}
                  autoFocus
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
                  value={formData.username || selectedCustomerData.username || book.username}
                  onChange={handleChange}
                  autoFocus
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
                        value={formData.tripdate || selectedCustomerData.tripdate ? dayjs(selectedCustomerData.tripdate) : null}
                        onChange={(date) => handleDateChange(date, 'tripdate')}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField {...inputProps} inputRef={inputRef} name='tripdate' value={formData.tripdate || selectedCustomerData.tripdate || ''} />
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
                    value={formData.triptime || selectedCustomerData.triptime || book.triptime}
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
                    value={formData.emaildoggle || selectedCustomerData.emaildoggle || book.emaildoggle}
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
                <Button color="primary" onClick={handleUpload} size="md" variant="outlined">
                  Attach File
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="vehicle-confirm">
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <AirportShuttleIcon color="action" />
              </div>
              {/* <Autocomplete
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
              /> */}
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                size="small"
                options={Service_Station.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) => option.label || ""}
                onChange={(event, value) => handleAutocompleteChange(event, value, "hiretypes")}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Hire Types"
                      name="hiretypes"
                      inputRef={params.inputRef}
                      value={formData.hiretypes || selectedCustomerData.hiretypes || ""}
                      onChange={(event) => {
                        const newValue = event.target.value;
                        handleAutocompleteChange(event, newValue, "hiretypes");
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="input">
              <div className="icone">
                <AltRouteIcon color="action" />
              </div>
              <TextField
                name="travelsname"
                autoComplete="new-password"
                value={formData.travelsname || selectedCustomerData.travelsname || book.travelsname}
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
                name="vehicleregisterno"
                autoComplete="new-password"
                value={formData.vehicleregisterno || selectedCustomerData.vehicleregisterno || book.vehicleregisterno}
                onChange={handleChange}
                label="Vehicle Register No"
                id="vehicleregisterno"
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
                value={formData.driverName || selectedCustomerData.driverName || book.driverName}
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
                name="driverphone"
                autoComplete="new-password"
                value={formData.driverphone || selectedCustomerData.driverphone || book.driverphone}
                onChange={handleChange}
                label="Driver Phone"
                id="driverphone"
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
                value={formData.travelsemail || selectedCustomerData.travelsemail || book.travelsemail}
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
      </form>
    </div>
  );
};

export default Booking;
