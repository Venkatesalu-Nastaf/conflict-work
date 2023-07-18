import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
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
import "./TripSheet.css";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TabPanel from "@mui/joy/TabPanel";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import PaymentsIcon from "@mui/icons-material/Payments";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import MinorCrashSharpIcon from "@mui/icons-material/MinorCrashSharp";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import StreamIcon from "@mui/icons-material/Stream";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SmsIcon from "@mui/icons-material/Sms";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Button from "@mui/material/Button";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputAdornment from "@mui/material/InputAdornment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StoreIcon from "@mui/icons-material/Store";
import { Table } from "@mui/joy";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Autocomplete from "@mui/material/Autocomplete";
import EditNoteIcon from "@mui/icons-material/EditNote";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStamp } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

//
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { DataGrid } from "@mui/x-data-grid";
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
  // Add more rows as needed
];
// UpdateTbaleRowsGPSSlider TABLE END

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
// UPDATE TABLE END
// TABLE
// function createData(name, address1, address2) {
//   return { name, address1, address2 };
// }

// const rows = [
//   createData("John Doe", "123 Main St", "Apt 4"),
//   createData("Jane Smith", "456 Elm St", "Unit 7"),
//   createData("Michael Johnson", "789 Oak Ave", "Suite 10"),
//   createData("Sarah Davis", "321 Pine St", "Floor 2"),
//   createData("Robert Wilson", "987 Maple Dr", "Building B"),
// ];

// TABLE END

// date
// const today = dayjs();
// const tomorrow = dayjs().add(1, "day");

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
  // { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];

const TripSheet = () => {
  const [error, setError] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [actionName] = useState('');
  const [rows, setRows] = useState([]);
  // const [displayCopy, setDisplayCopy] = useState(false);
  // const [value, setValue] = React.useState("list");
  const [currentTime, setCurrentTime] = useState("");
  const [starttime, setStartTime] = useState('');
  const [closetime, setCloseTime] = useState('');
  const [starttime2, setStartTime2] = useState('');
  const [closetime2, setCloseTime2] = useState('');
  // const [tripsheetno, setTripsheetno] = useState(null);

  const [book, setBook] = useState({
    tripsheetno: '',
    bookingid: '',
    status: '',
    billingno: '',
    apps: '',
    customer: '',
    orderedby: '',
    mobile: '',
    username: '',
    phonecell: '',
    email: '',
    address1: '',
    streetno: '',
    city: '',
    hireTypes: '',
    department: '',
    vehiclerigsterno: '',
    vehicleRate: '',
    drivername: '',
    cell: '',
    driversmsexbetta: '',
    gps: '',
    duty: '',
    pickup: '',
    usages: '',
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
      tripsheetno: '',
      bookingid: '',
      status: '',
      billingno: '',
      apps: '',
      customer: '',
      orderedby: '',
      mobile: '',
      username: '',
      phonecell: '',
      email: '',
      address1: '',
      streetno: '',
      city: '',
      hireTypes: '',
      department: '',
      vehiclerigsterno: '',
      vehicleRate: '',
      drivername: '',
      cell: '',
      driversmsexbetta: '',
      gps: '',
      duty: '',
      pickup: '',
      usages: '',
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
    setSelectedCustomerData({});
  };

  const handleDelete = async () => {
    if (!selectedCustomerData.tripsheetno) {
      console.log('No tripsheet number provided for deletion.');
      return;
    }
    try {
      console.log('Delete button clicked');
      await axios.delete(`http://localhost:8081/tripsheet/${selectedCustomerData.tripsheetno}`);
      console.log('Customer deleted');
      setSelectedCustomerData({}); // Clear the selected customer data
      handleCancel(); // Assuming you have a function named handleCancel to handle cancellation
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedCustomerData.tripsheetno) {
      console.log('No tripsheet number provided for editing.');
      return;
    }
  
    try {
      console.log('Edit button clicked');
      const selectedCustomer = rows.find((row) => row.tripsheetno === selectedCustomerData.tripsheetno);
      const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
      await axios.put(`http://localhost:8081/tripsheet/${selectedCustomerData.tripsheetno}`, updatedCustomer);
      console.log('Customer updated');
      handleCancel();
    } catch (error) {
      console.error('Error updating customer:', error);
      // Handle error state here, show a notification, or perform any other actions
      // For example, you can update a state to display an error message on the UI
      // setError('Failed to update customer. Please try again later.');
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
  const handleClick = async (event, actionName, tripsheetno) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        // await axios.delete(`http://localhost:8081/tripsheet/${tripsheetno}`);
        // console.log('Customer deleted');
        // setSelectedCustomerData(null);
        handleDelete();
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        // const selectedCustomer = rows.find((row) => row.tripsheetno === tripsheetno);
        // const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        // await axios.put(`http://localhost:8081/tripsheet/${tripsheetno}`, updatedCustomer);
        // console.log('Customer updated');
        handleEdit();
        // handleCancel();
      } else if (actionName === 'Add') {
        const updatedBook = {
          ...book,
          starttime: starttime,
          closetime: closetime,
          starttime2: starttime2,
          closetime2: closetime2,
        };
        await axios.post('http://localhost:8081/tripsheet', updatedBook);
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

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8081/tripsheet/${event.target.value}`);
        const bookingDetails = response.data;
        console.log(bookingDetails);

        setSelectedCustomerData(bookingDetails);
        setSelectedCustomerId(bookingDetails.tripsheetno);
      } catch (error) {
        console.error('Error retrieving booking details:', error);
      }
    }
  }, []);
  // TIMER START
  // const [currentTime, setCurrentTime] = useState("");

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
                  id="tripsheetno"
                  label="Tirp Sheet No"
                  name="tripsheetno"
                  value={selectedCustomerData.tripsheetno || book.tripsheetno}
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
                  name="bookingid"
                  value={selectedCustomerData.bookingid || book.bookingid}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <QuizOutlinedIcon color="action" />
                </div>
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ mt: 1, width: "200ch" }}
                  value={Status.map((option) => option.optionvalue)}
                  options={Status.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="status" label="Status" />
                  )}
                /> */}
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
                    params.inputProps.value = selectedCustomerData.status || ''
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
                  value={selectedCustomerData.billingno || book.billingno}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field checkbox">
              <div className="input">
                <div className="icone">
                  <AppsOutageOutlinedIcon color="action" />
                </div>
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Apps.map((option) => option.optionvalue)}
                  options={Apps.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="apps" label="Apps" />
                  )}
                /> */}
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
                    params.inputProps.value = selectedCustomerData.apps || ''
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
                  value={selectedCustomerData.customer || book.customer}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
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
                  value={selectedCustomerData.orderedby || book.orderedby}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
                  label="Ordered By"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              {/* <FormControlLabel
                value="smsguest"
                control={<Checkbox size="small" />}
                label="SMS Guest"
              /> */}
              <FormControlLabel
                name="smsguest"
                value="smsguest"
                control={<Checkbox size="small" />}
                label="SMS Guest"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.smsguest || book.smsguest)}
              />
              <FormControlLabel
                // value="booker"
                // control={<Checkbox size="small" />}
                // label="Booker"
                name="booker"
                value="booker"
                control={<Checkbox size="small" />}
                label="Booker"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.booker || book.booker)}
              />
              <FormControlLabel
                // value="email"
                // control={<Checkbox size="small" />}
                // label="Email"
                name="emailcheck"
                value="email"
                control={<Checkbox size="small" />}
                label="Email"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.emailcheck || book.emailcheck)}
              />
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobile"
                  value={selectedCustomerData.mobile || book.mobile}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
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
                  name="username"
                  value={selectedCustomerData.username || book.username}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CallIcon color="action" />
                </div>
                <TextField
                  name="phonecell"
                  value={selectedCustomerData.phonecell || book.phonecell}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
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
                  value={selectedCustomerData.email || book.email}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
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
                    value={selectedCustomerData.address1 || book.address1}
                    onChange={handleChange}
                    // onKeyDown={handleKeyDown}
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
                    value={selectedCustomerData.streetno || book.streetno}
                    onChange={handleChange}
                    // onKeyDown={handleKeyDown}
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
                    value={selectedCustomerData.city || book.city}
                    onChange={handleChange}
                    // onKeyDown={handleKeyDown}
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
                  <div className="textboxlist-customer list-update">
                    <span>
                      <Table stickyHeader hoverRow borderAxis="y">
                        <thead>
                          <tr>
                            <th style={{ width: "20%" }}>User Name</th>
                            <th style={{ width: "35%" }}>Address</th>
                            <th style={{ width: "35%" }}>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr key={row.name}>
                              <td>{row.name}</td>
                              <td>{row.address1}</td>
                              <td>{row.address2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
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
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={HireTypes.map((option) => option.option)}
                  options={HireTypes.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="hireTypes" label="Hire Types" />
                  )}
                /> */}
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
                    params.inputProps.value = selectedCustomerData.hireTypes || ''
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
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Department.map((option) => option.option)}
                  options={Department.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="department" label="Department" />
                  )}
                /> */}
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
                    params.inputProps.value = selectedCustomerData.department || ''
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
                  name="vehiclerigsterno"
                  value={selectedCustomerData.vehiclerigsterno || book.vehiclerigsterno}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <NoCrashIcon color="action" />
                </div>
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={VehicleRate.map((option) => option.optionvalue)}
                  options={VehicleRate.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="vehicleRate" label="Vehicle Rate" />
                  )}
                /> */}
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleRate")}
                  value={VehicleRate.find((option) => option.optionvalue)?.label || ''}
                  options={VehicleRate.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData.vehicleRate || ''
                    return (
                      <TextField {...params} label="Vehicle Rate" name="vehicleRate" inputRef={params.inputRef} />
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
                  name="drivername"
                  value={selectedCustomerData.drivername || book.drivername}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
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
                  name="cell"
                  value={selectedCustomerData.cell || book.cell}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
                  label="Cell"
                  id="cell"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <SmsIcon color="action" />
                </div>
                <TextField
                  name="driversmsexbetta"
                  value={selectedCustomerData.driversmsexbetta || book.driversmsexbetta}
                  onChange={handleChange}
                  // onKeyDown={handleKeyDown}
                  label="Driver SMS Ex Betta"
                  id="cell"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <FormControlLabel
                  // value="GPS"
                  // name="gps"

                  // // onKeyDown={handleKeyDown}
                  // control={<Checkbox size="small" />}
                  // label="GPS"
                  name="gps"
                  value="GPS"
                  control={<Checkbox size="small" />}
                  label="GPS"
                  autoComplete="new-password"
                  onChange={handleChange}
                  checked={Boolean(selectedCustomerData?.gps || book.gps)}
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
                  value={Duty.map((option) => option.optionvalue)}
                  options={Duty.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="duty" label="Duty" />
                  )}
                /> */}
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
                  <AirlineStopsIcon color="action" />
                </div>
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Pickup.map((option) => option.optionvalue)}
                  options={Pickup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="pickup" label="Pickup" />
                  )}
                /> */}
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
                    params.inputProps.value = selectedCustomerData.pickup || ''
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
                  name="usages"
                  value={selectedCustomerData.usages || book.usages}
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
                  value={selectedCustomerData.request || book.request}
                  onChange={handleChange}
                  label="Request"
                  id="request"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Start Date">
                    <DatePicker
                      name="startdate"
                      defaultValue={today}
                      minDate={tomorrow}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Start Date">
                    <DatePicker
                      value={selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
                      onChange={(date) => handleDateChange(date, 'startdate')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="startdate"
                          value={selectedCustomerData.startdate || ''}
                          inputRef={params.inputRef}
                        />
                      )}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Close Date">
                    <DatePicker
                      name="closedate"
                      defaultValue={today}
                      minDate={tomorrow}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Close Date">
                    <DatePicker
                      value={selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null}
                      onChange={(date) => handleDateChange(date, 'closedate')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="closedate"
                          value={selectedCustomerData.closedate || ''}
                          inputRef={params.inputRef}
                        />
                      )}
                    />
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
                    value={selectedCustomerData.totaldays || book.totaldays}
                    onChange={handleChange}
                    label="Total Days"
                    size="small"
                    type="number"
                    id="outlined-start-adornment"
                  />
                </DemoItem>
              </div>
              <div className="input">
                <div className="icone">
                  <RecentActorsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  value={selectedCustomerData.empolyeeno || book.empolyeeno}
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
                {/* <input
                  name="starttime"
                  type="time"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                /> */}
                <input
                  type="time"
                  value={selectedCustomerData.starttime || book.starttime}
                  onChange={(event) => {
                    setBook({ ...book, starttime: event.target.value });
                    setStartTime(event.target.value);
                  }}
                  name="starttime"
                />
              </div>
              <div className="input time">
                <label>Close Time</label>
                {/* <input
                  name="closetime"
                  type="time"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                /> */}
                <input
                  type="time"
                  value={selectedCustomerData.closetime || book.closetime}
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
                  value={selectedCustomerData.advancepaidtovendor || book.advancepaidtovendor}
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
                  value={selectedCustomerData.customercode || book.customercode}
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
                  value={selectedCustomerData.startkm || book.startkm}
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
                  value={selectedCustomerData.closekm || book.closekm}
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
                  value={selectedCustomerData.permit || book.permit}
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
                  value={selectedCustomerData.parking || book.parking}
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
                  value={selectedCustomerData.toll || book.toll}
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
                  value={selectedCustomerData.vpermettovendor || book.vpermettovendor}
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
                  value={selectedCustomerData.vendortoll || book.vendortoll}
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
                  value={selectedCustomerData.customeradvance || book.customeradvance}
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
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Email.map((option) => option.optionvalue)}
                  options={Email.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} name="email1" label="Email" />
                  )}
                /> */}
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
                    params.inputProps.value = selectedCustomerData.email1 || ''
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
                  value={selectedCustomerData.remark || book.remark}
                  onChange={handleChange}
                  label="Remark"
                  id="remark"
                  sx={{ m: 1, width: "300ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <FormControlLabel
                  // name="smsguest"

                  // value="smsguest"
                  // control={<Checkbox size="small" />}
                  // label="Value & Print"
                  name="valueprint"
                  value="value&print"
                  control={<Checkbox size="small" />}
                  label="Value & Print"
                  autoComplete="new-password"
                  onChange={handleChange}
                  checked={Boolean(selectedCustomerData?.valueprint || book.valueprint)}
                />
              </div>
              <div className="input">
                <Button startIcon={<BorderColorIcon />} variant="outlined">
                  Edit Vehicle
                </Button>
              </div>
            </div>
          </div>
          {error && <p>Something went wrong!</p>}

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
                  onClick={(event) => handleClick(event, action.name)}

                />
              ))}
            </StyledSpeedDial>
          </Box>
          <div className="Tipsheet-content-table-main">
            <Tabs
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
                      {/* <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={DocumentType.map((option) => option.optionvalue)}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField {...params} name="documenttype" label="Document Type" />
                        )}
                      /> */}
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
                          params.inputProps.value = selectedCustomerData.documenttype || ''
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
                        value={selectedCustomerData.documentnotes || book.documentnotes}
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
                        // value={selectedCustomerData.VendorTripNo || book.VendorTripNo}
                        value={selectedCustomerData.tripsheetno || book.tripsheetno}
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
                      {/* <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={VehicleRate.map((option) => option.optionvalue)}
                        options={VehicleRate.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="vehicles"
                            label="Vehicle"
                            variant="standard"
                            sx={{ m: 1, width: "25ch" }}
                          />
                        )}
                      /> */}
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
                          params.inputProps.value = selectedCustomerData.vehicleRate || ''
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
                      {/* <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={Duty.map((option) => option.optionvalue)}
                        options={Duty.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="duty1"
                            label="Duty"
                            variant="standard"
                          />
                        )}
                      /> */}
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
                          // params.inputProps.value = selectedCustomerData.duty1 || ''
                          params.inputProps.value = selectedCustomerData.duty || ''
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
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Start Date">
                          <DatePicker
                            name="startdate1"
                            defaultValue={today}
                            minDate={tomorrow}
                            views={["year", "month", "day"]}
                          />
                        </DemoItem>
                      </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Start Date">
                          <DatePicker
                            value={selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
                            onChange={(date) => handleDateChange(date, 'startdate1')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="startdate1"
                                value={selectedCustomerData.startdate || ''}
                                inputRef={params.inputRef}
                              />
                            )}
                          />
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Close Date">
                          <DatePicker
                            name="closedate1"
                            defaultValue={today}
                            minDate={tomorrow}
                            views={["year", "month", "day"]}
                          />
                        </DemoItem>
                      </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Close Date">
                          <DatePicker
                            value={selectedCustomerData.closedate ? dayjs(selectedCustomerData.closedate) : null}
                            onChange={(date) => handleDateChange(date, 'closedate1')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="closedate1"
                                value={selectedCustomerData.closedate || ''}
                                inputRef={params.inputRef}
                              />
                            )}
                          />
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
                          value={selectedCustomerData.totaldays || book.totaldays}
                          onChange={handleChange}
                          label="Total Days"
                          size="small"
                          type="number"
                          id="outlined-start-adornment"
                        />
                      </DemoItem>
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        // name="locks"
                        // value="lock"
                        // control={<Checkbox size="small" />}
                        // label="Lock"
                        name="locks"
                        value="lock"
                        control={<Checkbox size="small" />}
                        label="Lock"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(selectedCustomerData?.locks || book.locks)}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input time">
                      <label>Start Time</label>
                      {/* <input
                        name="starttime2"
                        type="time"
                        value={currentTime}
                        onChange={(e) => setCurrentTime(e.target.value)}
                      /> */}
                      <input
                        type="time"
                        value={selectedCustomerData.starttime2 || book.starttime2}
                        onChange={(event) => {
                          setBook({ ...book, starttime2: event.target.value });
                          setStartTime2(event.target.value);
                        }}
                        name="starttime2"
                      />
                    </div>
                    <div className="input time">
                      <label>Close Time</label>
                      {/* <input
                        name="closetime2"
                        type="time"
                        value={currentTime}
                        onChange={(e) => setCurrentTime(e.target.value)}
                      /> */}
                      <input
                        type="time"
                        value={selectedCustomerData.closetime2 || book.closetime2}
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
                        margin="normal"
                        size="small"
                        name="totaltime"
                        value={selectedCustomerData.totaltime || book.totaltime}
                        onChange={handleChange}
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
                        value={selectedCustomerData.startkm1 || book.startkm1}
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
                        value={selectedCustomerData.closekm1 || book.closekm1}
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
                        value={selectedCustomerData.totalkm1 || book.totalkm1}
                        onChange={handleChange}
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
                        value={selectedCustomerData.remark || book.remark}
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
                        value={selectedCustomerData.caramount || book.caramount}
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
                        value={selectedCustomerData.minhrs || book.minhrs}
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
                        value={selectedCustomerData.package || book.package}
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
                        value={selectedCustomerData.amount || book.amount}
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
                        value={selectedCustomerData.exkm || book.exkm}
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
                        value={selectedCustomerData.amount1 || book.amount1}
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
                        value={selectedCustomerData.exHrs || book.exHrs}
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
                        value={selectedCustomerData.amount2 || book.amount2}
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
                        value={selectedCustomerData.night || book.night}
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
                        value={selectedCustomerData.amount3 || book.amount3}
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
                        value={selectedCustomerData.driverconvenience || book.driverconvenience}
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
                        value={selectedCustomerData.amount4 || book.amount4}
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
                        value={selectedCustomerData.netamount || book.netamount}
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
                        value={selectedCustomerData.vehcommission || book.vehcommission}
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
                        value={selectedCustomerData.caramount || book.caramount}
                        onChange={handleChange}
                        size="small"
                        label="Car Amount"
                        id="car-amount"
                      />
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        // name="manualbills"
                        // value="manual-bills"
                        // control={<Checkbox size="small" />}
                        // label="Manual Bills"
                        name="manualbillss"
                        value="manual-bills"
                        control={<Checkbox size="small" />}
                        label="Manual Bills"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(selectedCustomerData?.manualbillss || book.manualbillss)}
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
                        value={selectedCustomerData.pack || book.pack}
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
                        value={selectedCustomerData.amount5 || book.amount5}
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
                        value={selectedCustomerData.exkm1 || book.exkm1}
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
                        value={selectedCustomerData.amount6 || book.amount6}
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
                        value={selectedCustomerData.exHrs1 || book.exHrs1}
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
                        value={selectedCustomerData.amount7 || book.amount7}
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
                        value={selectedCustomerData.night1 || book.night1}
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
                        value={selectedCustomerData.amount8 || book.amount8}
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
                        value={selectedCustomerData.driverconvenience1 || book.driverconvenience1}
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
                        value={selectedCustomerData.amount9 || book.amount9}
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
                        value={selectedCustomerData.rud || book.rud}
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
                        value={selectedCustomerData.netamount1 || book.netamount1}
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
                        value={selectedCustomerData.discount || book.discount}
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
                        value={selectedCustomerData.ons || book.ons}
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
                        // name="manualbills"
                        // value="manual-bills"
                        // control={<Checkbox size="small" />}
                        // label="Manual Bills"
                        name="manualbills"
                        value="manualbills"
                        control={<Checkbox size="small" />}
                        label="Manual Bills"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(selectedCustomerData?.manualbills || book.manualbills)}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <AccountBalanceWalletIcon color="action" />
                      </div>
                      <TextField
                        name="balance"
                        value={selectedCustomerData.balance || book.balance}
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
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="FC">
                          <DatePicker
                            name="fcdate"
                            defaultValue={today}
                            minDate={tomorrow}
                            views={["year", "month", "day"]}
                          />
                        </DemoItem>
                      </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="FC">
                          <DatePicker
                            value={selectedCustomerData.fcdate ? dayjs(selectedCustomerData.fcdate) : null}
                            onChange={(date) => handleDateChange(date, 'fcdate')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="fcdate"
                                value={selectedCustomerData.fcdate || ''}
                                inputRef={params.inputRef}
                              />
                            )}
                          />
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Tax Date">
                          <DatePicker
                            name="taxdate"
                            defaultValue={today}
                            minDate={tomorrow}
                            views={["year", "month", "day"]}
                          />
                        </DemoItem>
                      </LocalizationProvider> */}
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
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Ins">
                          <DatePicker
                          name="insdate"
                            defaultValue={today}
                            minDate={tomorrow}
                            views={["year", "month", "day"]}
                          />
                        </DemoItem>
                      </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Ins">
                          <DatePicker
                            value={selectedCustomerData.insdate ? dayjs(selectedCustomerData.insdate) : null}
                            onChange={(date) => handleDateChange(date, 'insdate')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="insdate"
                                value={selectedCustomerData.insdate || ''}
                                inputRef={params.inputRef}
                              />
                            )}
                          />
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="St.Permit">
                          <DatePicker
                          name="stpermit"
                            defaultValue={today}
                            minDate={tomorrow}
                            views={["year", "month", "day"]}
                          />
                        </DemoItem>
                      </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="St.Permit">
                          <DatePicker
                            value={selectedCustomerData.stpermit ? dayjs(selectedCustomerData.stpermit) : null}
                            onChange={(date) => handleDateChange(date, 'stpermit')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="stpermit"
                                value={selectedCustomerData.stpermit || ''}
                                inputRef={params.inputRef}
                              />
                            )}
                          />
                        </DemoItem>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField
                        name="maintenancetype"
                        value={selectedCustomerData.maintenancetype || book.maintenancetype}
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
                        value={selectedCustomerData.kilometer || book.kilometer}
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
                      {/* <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={Select.map((option) => option.optionvalue)}
                        options={Select.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField {...params} name="selects" label="Select" />
                        )}
                      /> */}
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
                          params.inputProps.value = selectedCustomerData.selects || ''
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
                      {/* <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={DocumentType.map((option) => option.optionvalue)}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField {...params} name="documenttype" label="Document Type" />
                        )}
                      /> */}
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
                          params.inputProps.value = selectedCustomerData.documenttype || ''
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
                        // value="reload"
                        // control={<Checkbox size="small" />}
                        // label="Reload"
                        name="reload"
                        value="reload"
                        control={<Checkbox size="small" />}
                        label="Reload"
                        autoComplete="new-password"
                        onChange={handleChange}
                        checked={Boolean(selectedCustomerData?.reload || book.reload)}
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
