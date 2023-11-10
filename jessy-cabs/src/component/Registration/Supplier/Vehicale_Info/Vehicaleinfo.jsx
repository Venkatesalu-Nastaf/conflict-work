import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import "./Vehicaleinfo.css";
import { saveAs } from 'file-saver';
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// FONTAWESOME ICON
import { TbLicense } from "react-icons/tb";

// ICONS
import SpeedIcon from "@mui/icons-material/Speed";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
import CommuteIcon from "@mui/icons-material/Commute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssessmentIcon from "@mui/icons-material/Assessment";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';



const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "vehicleid", headerName: "Vehicle ID", width: 130 },
  { field: "attecheddate", headerName: "Atteched Date", width: 130 },
  { field: "vehicleregno", headerName: "Vehicle Reg No", width: 130 },
  { field: "costcenterlocation", headerName: "Cost Cennter Location", width: 170 },
  { field: "vehicletype", headerName: "Vehicle Type", width: 130 },
  { field: "owner", headerName: "Owner", width: 90 },
  { field: "mobileno", headerName: "Mobile No", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "yearmodel", headerName: "Year Model", width: 130 },
  { field: "insuranceno", headerName: "Insurance No", width: 130 },
  { field: "insuranceduedate", headerName: "Insurance Due Date", width: 150 },
  { field: "licenseno", headerName: "License No", width: 130 },
  { field: "licensebatchno", headerName: "License Batch No", width: 140 },
  { field: "licenseduedate", headerName: "License Due Date", width: 140 },
  { field: "notionalpermitno", headerName: "Notional Permit No", width: 150 },
  { field: "notionalpermitdate", headerName: "Notional Permit Date", width: 150 },
  { field: "statepermitno", headerName: "State Permit No", width: 130 },
  { field: "statepermitdate", headerName: "State Permit Date", width: 130 },
  { field: "rcbookno", headerName: "RC Book No", width: 130 },
  { field: "fcdate", headerName: "FC Date", width: 130 },
  { field: "avgmileage", headerName: "AVG Mileage", width: 130 },
  { field: "drivername", headerName: "Driver Name", width: 130 },
  { field: "tankcap", headerName: "Tank Cap", width: 130 },
  { field: "routeno", headerName: "Route No", width: 130 },
  { field: "remarks", headerName: "Remarks", width: 130 },
  { field: "ownertype", headerName: "Owner Type", width: 130 },
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
  // { icon: <ChecklistIcon />, name: "List" }, 
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];
const Vehicaleinfo = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [actionName] = useState('');
  const [rows] = useState([]);
  const [info, setInfo] = useState(false);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});



  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .jpg, .jpeg, .png';
    input.click();
  };
  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
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
  }
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [info]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [warning]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const [book, setBook] = useState({
    vehicleId: '',
    doadate: '',
    vehRegNo: '',
    costCenter: '',
    vehType: '',
    owner: '',
    mobileNo: '',
    email: '',
    yearModel: '',
    insuranceno: '',
    insduedate: '',
    licenseno: '',
    licensebatchno: '',
    licduedate: '',
    duedate: '',
    nationalpermito: '',
    npdate: '',
    avgmileage: '',
    statepermito: '',
    spdate: '',
    financer: '',
    rcbookno: '',
    fcdate: '',
    driverName: '',
    tankCap: '',
    routeno: '',
    remarks: '',
    OwnerType: '',
    active: '',
  });

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      vehicleId: '',
      doadate: '',
      vehRegNo: '',
      costCenter: '',
      vehType: '',
      owner: '',
      mobileNo: '',
      email: '',
      yearModel: '',
      insuranceno: '',
      insduedate: '',
      licenseno: '',
      licensebatchno: '',
      duedate: '',
      nationalpermito: '',
      npdate: '',
      avgmileage: '',
      statepermito: '',
      spdate: '',
      financer: '',
      rcbookno: '',
      fcdate: '',
      driverName: '',
      tankCap: '',
      routeno: '',
      remarks: '',
      OwnerType: '',
      active: '',
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
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date, name) => {
    const startOfDay = dayjs(date).format('DD/MM/YYYY');
    setBook((prevBook) => ({
      ...prevBook,
      [name]: startOfDay,
    }));
  };

  const handleAdd = async () => {

    try {
      console.log('Add button clicked');
      await axios.post('http://localhost:8081/vehicleinfo', book);
      console.log(book);
      handleCancel();
      setSuccess(true);
      setSuccessMessage("Successfully Added");
    } catch (error) {
      console.error('Error updating customer:', error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };


  const handleClick = async (event, actionName) => {
    event.preventDefault();

    try {
      if (actionName === 'List') {
        console.log('List button clicked');
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
        setSuccess(true);
        setSuccessMessage("Successfully listed");
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        setSuccess(true);
        setSuccessMessage("Successfully Deleted");
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
      } else if (actionName === 'Add') {
        handleAdd();
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });


  return (
    <div className="vehicale-form">
      <form action="">
        <div className="detail-container-main-vehicale">
          <div className="container-left-vehicale">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <MinorCrashIcon color="action" />
                </div>
                <TextField
                  name="vehicleId"
                  value={selectedCustomerData.vehicleId || book.vehicleId}
                  onChange={handleChange}
                  label="Vehicle ID"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Attached Date"
                    value={selectedCustomerData.doadate ? dayjs(selectedCustomerData.doadate) : null}
                    onChange={(date) => handleDateChange(date, 'doadate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='doadate' value={selectedCustomerData.doadate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <CarCrashIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="veh_reg_no"
                  label="Vehicle Reg No"
                  name="vehRegNo"
                  value={selectedCustomerData.vehRegNo || book.vehRegNo}
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "240px" }}>
                <div className="icone">
                  <PriceChangeIcon color="action" />
                </div>
                <TextField
                  name="costCenter"
                  value={selectedCustomerData.costCenter || book.costCenter}
                  onChange={handleChange}
                  label="Cost Center Location"
                  id="standard-size-normal"
                  size='small'
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <CommuteIcon color="action" />
                </div>
                <TextField
                  name="vehType"
                  value={selectedCustomerData.vehType || book.vehType}
                  onChange={handleChange}
                  label="Vehicle Type"
                  id="veh_type"
                  size='small'
                />
              </div>
              <div className="input">
                <div className="icone">
                  <EmojiTransportationIcon color="action" />
                </div>
                <TextField
                  name="owner"
                  value={selectedCustomerData.owner || book.owner}
                  onChange={handleChange}
                  label="Owner"
                  id="owner"
                  size='small'
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="mobileNo"
                  value={selectedCustomerData.mobileNo || book.mobileNo}
                  onChange={handleChange}
                  label="Mobile No"
                  id="mobile_no"
                  size='small'
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  size='small'
                  value={selectedCustomerData.email || book.email}
                  onChange={handleChange}
                  label="Email"
                  id="email"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AssessmentIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="year_model"
                  name="yearModel"
                  value={selectedCustomerData.yearModel || book.yearModel}
                  onChange={handleChange}
                  label="Year Model"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="insuranceno"
                  value={selectedCustomerData.insuranceno || book.insuranceno}
                  onChange={handleChange}
                  label="Insurance No"
                  id="tank_cap"
                />
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Insurance Due Date"
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='duedate' value={selectedCustomerData.duedate} />
                    )}
                  </DatePicker>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Insurance Due Date"
                    value={selectedCustomerData.insduedate ? dayjs(selectedCustomerData.insduedate) : null}
                    onChange={(date) => handleDateChange(date, 'insduedate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='insduedate' value={selectedCustomerData.insduedate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <Button color="primary" onClick={handleUpload} size="md" variant="contained">
                  Insurance Copy
                </Button>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <TbLicense color="action" style={{ fontSize: "23px" }} />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="licenseno"
                  value={selectedCustomerData.licenseno || book.licenseno}
                  onChange={handleChange}
                  label="License No"
                  id="tank_cap"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BatchPredictionIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="licensebatchno"
                  value={selectedCustomerData.licensebatchno || book.licensebatchno}
                  onChange={handleChange}
                  label="License Batch No"
                  id="tank_cap"
                />
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="License Due Date"
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='duedate' value={selectedCustomerData.duedate} />
                    )}
                  </DatePicker>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="License Due Date"
                    value={selectedCustomerData.licduedate ? dayjs(selectedCustomerData.licduedate) : null}
                    onChange={(date) => handleDateChange(date, 'licduedate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='licduedate' value={selectedCustomerData.licduedate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <Button color="primary" onClick={handleUpload} size="md" variant="contained">
                  License Copy
                </Button>
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "220px" }}>
                <div className="icone">
                  <DocumentScannerIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="nationalpermito"
                  value={selectedCustomerData.nationalpermito || book.nationalpermito}
                  onChange={handleChange}
                  label="National Permit No"
                  id="tank_cap"
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="National Permit Date"
                    value={selectedCustomerData.npdate ? dayjs(selectedCustomerData.npdate) : null}
                    onChange={(date) => handleDateChange(date, 'npdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='npdate' value={selectedCustomerData.npdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input" style={{ width: "220px" }}>
                <Button color="primary" onClick={handleUpload} size="md" variant="contained">
                  National Permit Copy
                </Button>
              </div>
              <div className="input">
                <div className="icone">
                  <SpeedIcon color="action" />
                </div>
                <TextField
                  name="avgmileage"
                  value={selectedCustomerData.avgmileage || book.avgmileage}
                  onChange={handleChange}
                  label="AVG Mileage"
                  id="avgmileage"
                  size="small"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "220px" }}>
                <div className="icone">
                  <DocumentScannerIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="statepermito"
                  value={selectedCustomerData.statepermito || book.statepermito}
                  onChange={handleChange}
                  label="State Permit No"
                  id="tank_cap"
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="State Permit Date"
                    value={selectedCustomerData.spdate ? dayjs(selectedCustomerData.spdate) : null}
                    onChange={(date) => handleDateChange(date, 'npdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='spdate' value={selectedCustomerData.spdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input" style={{ width: "220px" }}>
                <Button color="primary" onClick={handleUpload} size="md" variant="contained">
                  State Permit Copy
                </Button>
              </div>
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  name="financer"
                  value={selectedCustomerData.financer || book.financer}
                  onChange={handleChange}
                  label="Financer"
                  id="financer"
                  size="small"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "220px" }}>
                <div className="icone">
                  <HistoryEduIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="rcbookno"
                  value={selectedCustomerData.rcbookno || book.rcbookno}
                  onChange={handleChange}
                  label="RC Book No"
                  id="tank_cap"
                />
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="FC Date"
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='duedate' value={selectedCustomerData.duedate} />
                    )}
                  </DatePicker>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="FC Date"
                    value={selectedCustomerData.fcdate ? dayjs(selectedCustomerData.fcdate) : null}
                    onChange={(date) => handleDateChange(date, 'fcdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='fcdate' value={selectedCustomerData.fcdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <Button color="primary" onClick={handleUpload} size="md" variant="contained">
                  RC-Book Copy
                </Button>
              </div>
              <div className="input" style={{ width: "160px" }}>
                <Button color="primary" onClick={handleUpload} size="md" variant="contained">
                  FC Copy
                </Button>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AirlineSeatReclineExtraIcon color="action" />
                </div>
                <TextField
                  name="driverName"
                  value={selectedCustomerData.driverName || book.driverName}
                  onChange={handleChange}
                  label="Driver Name"
                  id="driver_name"
                  size="small"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="tankCap"
                  value={selectedCustomerData.tankCap || book.tankCap}
                  onChange={handleChange}
                  label="Tank Cap"
                  id="tank_cap"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AltRouteIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="routeno"
                  value={selectedCustomerData.routeno || book.routeno}
                  onChange={handleChange}
                  label="Route No"
                  id="routeno"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AutoModeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="remarks"
                  value={selectedCustomerData.remarks || book.remarks}
                  onChange={handleChange}
                  label="Remarks"
                  id="remarks"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AssignmentIndTwoToneIcon color="action" />
                </div>
                <TextField
                  name="OwnerType"
                  value={selectedCustomerData.OwnerType || book.OwnerType}
                  onChange={handleChange}
                  label="Owner Type"
                  id="owner_type"
                  size="small"
                />
              </div>
              <div className="input">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={selectedCustomerData.active || book.active}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="input" style={{ width: "80px" }}>
                <Button variant="outlined" startIcon={<SummarizeTwoToneIcon />}>
                  list
                </Button>
              </div>
              <div className="input" style={{ width: "80px" }}>
                <Button variant="contained" onClick={handleAdd}>Add</Button>
              </div>
            </div>

          </div>
        </div>
        {error && <div className='alert-popup Error' >
          <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
          <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
          <p>{errorMessage}</p>
        </div>}
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
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
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
                onClick={(event) => handleClick(event, action.name)}
              />
            ))}
          </StyledSpeedDial>
        </Box>
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
                    value={searchText}
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
                  <Button variant="contained">Search</Button>
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
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Vehicaleinfo;
