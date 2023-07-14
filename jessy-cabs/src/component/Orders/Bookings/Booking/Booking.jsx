import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import "./Booking.css";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import Button from "@mui/material/Button";
import CommuteIcon from "@mui/icons-material/Commute";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import SellIcon from "@mui/icons-material/Sell";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import InfoIcon from "@mui/icons-material/Info";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TaxiAlertTwoToneIcon from "@mui/icons-material/TaxiAlertTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";
import AddIcCallTwoToneIcon from "@mui/icons-material/AddIcCallTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { Duty, Hire, PayType, Report, VehicleModel, Service_Station } from "./Booking";
import { useLocation } from "react-router-dom";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [error, setError] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [actionName] = useState('');
  const [rows, setRows] = useState([]);
  const [displayCopy, setDisplayCopy] = useState(false);
  const [value, setValue] = React.useState("list");
  const [currentTime, setCurrentTime] = useState("");
  const [triptime, setTripTime] = useState('');
  const [registertime, setRegisterTime] = useState('');
  const [starttime, setStartTime] = useState('');
  const [bookingtime, setBookingTime] = useState('');


  const [book, setBook] = useState({
    bookingno: '',
    bookingdate: '',
    bookingtime: '',
    status: '',
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
    vehicaltype: '',
    paymenttype: '',
    reportdate: '',
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
    drivername: '',
    driverphone: '',
    travelsemail: '',
  });

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      bookingno: '',
      bookingdate: '',
      bookingtime: '',
      status: '',
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
      vehicaltype: '',
      paymenttype: '',
      reportdate: '',
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
      drivername: '',
      driverphone: '',
      travelsemail: '',
    }));
    setSelectedCustomerData({});
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (event.target.type === 'checkbox') {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // Check if the field is the time field
      if (name === 'bookingtime') {
        const formattedTime = value; // Modify the time value if needed
        setBook((prevBook) => ({
          ...prevBook,
          [name]: formattedTime,
        }));
        setSelectedCustomerData((prevData) => ({
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
      }
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
      }

    } catch (err) {
      console.log(err);
      setError(true);
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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Handle key press logic
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 116) {
        // F5 key code is 116
        event.preventDefault();
        setIsChecked(!isChecked);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [isChecked]);

  const actions = [
    { icon: <LocalPostOfficeIcon />, name: "Email" },
    { icon: <CancelPresentationIcon />, name: "Clear" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Modify" },
    { icon: <ContentCopyIcon />, name: "Copy This" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
  ];
  // Local Storage
  const location = useLocation();

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
        console.log(bookingDetails);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  // TIMER END
  return (
    <div className="booking-form">
      <form onSubmit={handleClick}>
        <span className="Title-Name">Booking</span>
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
                  value={selectedCustomerData.bookingno || book.bookingno}
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
                      value={selectedCustomerData.bookingdate ? dayjs(selectedCustomerData.bookingdate) : null}
                      onChange={(date) => handleDateChange(date, 'bookingdate')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="bookingdate"
                          value={selectedCustomerData.bookingdate || ''}
                          inputRef={params.inputRef}
                        />
                      )}
                    />
                  </DemoItem>
                </LocalizationProvider>

              </div>
             
              <div className="input time">
                <label>Booking Time</label>
                <input
                  type="time"
                  value={selectedCustomerData.bookingtime || book.bookingtime}
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
                    value={selectedCustomerData.status || book.status}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="pending"
                      control={<Radio />}
                      label="Pending"
                      labelPlacement="end"
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
                  value={selectedCustomerData.tripid || book.tripid}
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
                  value={selectedCustomerData.customer || book.customer}
                  onChange={handleChange}
                  label="Customer"
                  id="customer"
                  variant="standard"
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
                  value={selectedCustomerData.orderedby || book.orderedby}
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
                  value={selectedCustomerData.mobileno || book.mobileno}
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
                  value={selectedCustomerData.guestname || book.guestname}
                  onChange={handleChange}
                  label="Guest Name"
                  id="guestname"
                  variant="standard"
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
                  value={selectedCustomerData.guestmobileno || book.guestmobileno}
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
                  value={selectedCustomerData.email || book.email}
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
                  value={selectedCustomerData.employeeno || book.employeeno}
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
                  value={selectedCustomerData.address1 || book.address1}
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
                  value={selectedCustomerData.address2 || book.address2}
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
                  value={selectedCustomerData.city || book.city}
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
                    params.inputProps.value = selectedCustomerData.report || ''
                    return (
                      <TextField {...params} label="Report" name="report" inputRef={params.inputRef} />
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
                  name="vehicaltype"
                  autoComplete="new-password"
                  value={selectedCustomerData.vehicaltype || book.vehicaltype}
                  onChange={handleChange}
                  label="Vehical Type"
                  id="vehicaltype"
                  variant="standard"
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
                    params.inputProps.value = selectedCustomerData.paymenttype || ''
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
                  <DemoItem label="Report Date">
                    <DatePicker
                      value={selectedCustomerData.reportdate ? dayjs(selectedCustomerData.reportdate) : null}
                      onChange={(date) => handleDateChange(date, 'reportdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='reportdate' value={selectedCustomerData.reportdate || ''} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              {/* <div className="input time">
                <label>Start Time</label>
                <input
                  type="time"
                  defaultValue={currentTime}
                  name='starttime'
                  value={starttime}
                  onChange={(event) => setStartTime(event.target.value)}
                />
              </div> */}
              <div className="input time">
                <label>Start Time</label>
                <input
                  type="time"
                  value={selectedCustomerData.starttime || book.starttime}
                  // onChange={(event) => setBook({ ...book, starttime: event.target.value })}
                  onChange={(event) => {
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                  }}
                  name='starttime'
                // onChange={(event) => setStartTime(event.target.value)}
                />
              </div>
              {/* <div className="input time">
                <label>Register Time</label>
                <input
                  type="time"
                  defaultValue={currentTime}
                  name='registertime'
                  value={registertime}
                  onChange={(event) => setRegisterTime(event.target.value)}
                />
              </div> */}
              <div className="input time">
                <label>Register Time</label>
                <input
                  type="time"
                  name='registertime'
                  value={selectedCustomerData.registertime || book.registertime}
                  // onChange={(event) => setBook({ ...book, registertime: event.target.value })}
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
                    params.inputProps.value = selectedCustomerData.duty || ''
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
                  value={selectedCustomerData.pickup || book.pickup}
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
                  value={selectedCustomerData.costcode || book.costcode}
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
                  value={selectedCustomerData.registerno || book.registerno}
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
                  value={selectedCustomerData.flightno || book.flightno}
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
                  value={selectedCustomerData.orderbyemail || book.orderbyemail}
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
                  value={selectedCustomerData.remarks || book.remarks}
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
                    params.inputProps.value = selectedCustomerData.servicestation || ''
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
                  type="number"
                  name='advance'
                  autoComplete="new-password"
                  value={selectedCustomerData.advance || book.advance}
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
                      <div className="booking-update-content list-update">
                        <span>
                          List Lorem ipsum dolor sit amet, consectetur
                          adipisicing elit. Harum veniam quos laborum. Dicta
                          suscipit voluptas laboriosam rem alias praesentium,
                          facere aliquam sed iste, officia excepturi quos
                          corporis. Facilis, reiciendis et. Lorem ipsum dolor
                          sit amet consectetur adipisicing elit. Cum nostrum
                          nihil minima debitis, nobis incidunt temporibus velit
                          accusantium dolore assumenda iusto quod ratione
                          praesentium maxime eveniet voluptas enim animi
                          laudantium.
                        </span>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="billingaddress">
                    <div className="booking-update">
                      <div className="booking-update-content">
                        <form action="">
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
                                value={selectedCustomerData.guestname || book.guestname}
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
                                value={selectedCustomerData.address1 || book.address1}
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
                                value={selectedCustomerData.address2 || book.address2}
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
                                value={selectedCustomerData.city || book.city}
                                onChange={handleChange}
                                label="City"
                                id="cityupdate"
                                variant="standard"
                              />
                            </div>
                          </div>
                          {/* <div className="input-field billing">
                            <Button
                              color="primary"
                              disabled={false}
                              onClick={actionName === 'Modify'}
                              size="md"
                              variant="outlined"
                            >
                              Update Address
                            </Button>
                          </div> */}
                        </form>
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
                  value="vehicleconfirm"
                  control={<Checkbox size="small" />}
                  label="Vehicle Confirm"
                  onChange={handleCheckboxChange}
                />
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
                  value={selectedCustomerData.useage || book.useage}
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
                  value={selectedCustomerData.username || book.username}
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
                        value={selectedCustomerData.tripdate ? dayjs(selectedCustomerData.tripdate) : null}
                        onChange={(date) => handleDateChange(date, 'tripdate')}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField {...inputProps} inputRef={inputRef} name='tripdate' value={selectedCustomerData.tripdate || ''} />
                        )}
                      </DatePicker>
                    </DemoItem>
                  </LocalizationProvider>
                </div>
                {/* <div className="input time">
                  <label>Trip Time</label>
                  <input
                    type="time"
                    defaultValue={currentTime}
                    name='triptime'
                    value={triptime}
                    onChange={(event) => setTripTime(event.target.value)}
                  />
                </div> */}
                <div className="input time">
                  <label>Trip Time</label>
                  <input
                    type="time"
                    name='triptime'
                    value={selectedCustomerData.triptime || book.triptime}
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
                    value={selectedCustomerData.emaildoggle || book.emaildoggle}
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
                <Button
                  color="primary"
                  disabled={false}
                  onClick={function () { }}
                  size="md"
                  variant="outlined"
                >
                  Attach File
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isChecked ? (
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
                    params.inputProps.value = selectedCustomerData.hiretypes || ''
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
                  value={selectedCustomerData.travelsname || book.travelsname}
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
                  value={selectedCustomerData.vehicleregisterno || book.vehicleregisterno}
                  onChange={handleChange}
                  label="Vehicle Register No"
                  id="vehicleregisterno"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
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
                    params.inputProps.value = selectedCustomerData.vehiclemodule || ''
                    return (
                      <TextField {...params} label="Vehicle Model" name="vehiclemodule" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <NoCrashIcon color="action" />
                </div>
                <TextField
                  name="drivername"
                  autoComplete="new-password"
                  value={selectedCustomerData.drivername || book.drivername}
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
                  value={selectedCustomerData.driverphone || book.driverphone}
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
                  value={selectedCustomerData.travelsemail || book.travelsemail}
                  onChange={handleChange}
                  label="Travels Email"
                  id="travelsemail"
                  variant="standard"
                />
              </div>
            </div>
            {error && <p>Something went wrong!</p>}
          </div>
        ) : null}

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
                // onClick={action.onClick}
                onClick={(event) => handleClick(event, action.name)}
              />
            ))}
          </StyledSpeedDial>
        </Box>
      </form>
    </div>
  );
};

export default Booking;
