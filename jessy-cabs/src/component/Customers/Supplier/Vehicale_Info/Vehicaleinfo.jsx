import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./Vehicaleinfo.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// FONTAWESOME ICON
import { FaMoneyBillWave } from "react-icons/fa";

// ICONS
import SpeedIcon from "@mui/icons-material/Speed";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import CommuteIcon from "@mui/icons-material/Commute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";



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
  const [info, setInfo] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});


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
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);

  const [book, setBook] = useState({
    vehicleId: '',
    doadate: '',
    vehRegNo: '',
    costCenter: '',
    vehType: '',
    yearModel: '',
    owner: '',
    mobileNo: '',
    fcdate: '',
    taxdate: '',
    npdate: '',
    insdate: '',
    stpermit: '',
    duedate: '',
    financer: '',
    avgmileage: '',
    routeno: '',
    driverName: '',
    dueAmount: '',
    tankCap: '',
    remarks: '',
    OwnerType: '',
    active: '',
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
    const startOfDay = dayjs(date).startOf('day').format();
    setBook((prevBook) => ({
      ...prevBook,
      [name]: startOfDay,
    }));
  };

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      vehicleId: '',
      doadate: '',
      vehRegNo: '',
      costCenter: '',
      vehType: '',
      yearModel: '',
      owner: '',
      mobileNo: '',
      fcdate: '',
      taxdate: '',
      npdate: '',
      insdate: '',
      stpermit: '',
      duedate: '',
      financer: '',
      avgmileage: '',
      routeno: '',
      driverName: '',
      dueAmount: '',
      tankCap: '',
      remarks: '',
      OwnerType: '',
      active: '',
    }));
    setSelectedCustomerData({});

  };

  const handleAdd = async () => {

    try {
      console.log('Add button clicked');
      await axios.post('http://localhost:8081/vehicleinfo', book);
      console.log(book);
      handleCancel();
      setSuccessMessage("Successfully Added");
    } catch (error) {
      console.error('Error updating customer:', error);
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
        setSuccessMessage("Successfully listed");
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        setSuccessMessage("Successfully Deleted");
        // Perform the desired action when the "Delete" button is clicked
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        // Perform the desired action when the "Edit" button is clicked
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
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Vehicle ID"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="D.O.A Date"
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
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PriceChangeIcon color="action" />
                </div>
                <TextField
                  name="costCenter"
                  value={selectedCustomerData.costCenter || book.costCenter}
                  onChange={handleChange}
                  label="Cost Center"
                  id="standard-size-normal"
                  variant="standard"
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
                  variant="standard"
                />
              </div>
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
                  autoFocus
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
                  variant="standard"
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
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Tax Date"
                    value={selectedCustomerData.taxdate ? dayjs(selectedCustomerData.taxdate) : null}
                    onChange={(date) => handleDateChange(date, 'taxdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='taxdate' value={selectedCustomerData.taxdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
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
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Insurance Date"
                    value={selectedCustomerData.insdate ? dayjs(selectedCustomerData.insdate) : null}
                    onChange={(date) => handleDateChange(date, 'insdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='insdate' value={selectedCustomerData.insdate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="State permit"
                    value={selectedCustomerData.stpermit ? dayjs(selectedCustomerData.stpermit) : null}
                    onChange={(date) => handleDateChange(date, 'stpermit')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='stpermit' value={selectedCustomerData.stpermit || ''} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Due Date"
                    value={selectedCustomerData.duedate ? dayjs(selectedCustomerData.duedate) : null}
                    onChange={(date) => handleDateChange(date, 'duedate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='duedate' value={selectedCustomerData.duedate} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
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
                  variant="standard"
                />
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
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FaMoneyBillWave color="action" />
                </div>
                <TextField
                  name="dueAmount"
                  value={selectedCustomerData.dueAmount || book.dueAmount}
                  onChange={handleChange}
                  label="Due Amount"
                  id="due_amount"
                  variant="standard"
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
                  autoFocus
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
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
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
                  autoFocus
                />
              </div>
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
                  variant="standard"
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
            // hidden={hidden}
            icon={<SpeedDialIcon />}
          // direction={direction}
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
      </form>
    </div>
  );
};

export default Vehicaleinfo;
