import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import './FuelDetails.css';
import "jspdf-autotable";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faGaugeHigh, faGaugeSimple } from "@fortawesome/free-solid-svg-icons";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import CommuteIcon from '@mui/icons-material/Commute';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

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
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "VehicleNo", headerName: "Vehicl eNo", width: 130 },
  { field: "VehicleName", headerName: "Vehicle Name", width: 130 },
  { field: "filldate", headerName: "Fill Date", width: 130 },
  { field: "emptydate", headerName: "Empty Date", width: 150 },
  { field: "DriverName", headerName: "Driver Name", width: 130 },
  { field: "InitialOdometerReading", headerName: "Initial Odometer Reading", width: 130 },
  { field: "FinalOdometerReading", headerName: "Final Odometer Reading", width: 130 },
  { field: "FuelConsumptioninliters", headerName: "Fuel Consumption (in liters)", width: 130 },
];

// TABLE END

const FuelDetails = () => {

  const [initialOdometer, setInitialOdometer] = useState(0);
  const [finalOdometer, setFinalOdometer] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [formData] = useState({});
  const [error, setError] = useState(false);

  const hidePopup = () => {
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

  const [book, setBook] = useState({
    VehicleNo: '',
    VehicleName: '',
    filldate: '',
    emptydate: '',
    DriverName: '',
    InitialOdometerReading: '',
    FinalOdometerReading: '',
    FuelConsumptioninliters: '',
  });
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === 'checkbox') {
      // For checkboxes, update the state based on the checked value
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // For other input fields, update the state based on the value
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
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: formattedDate,
    }));
  };
  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      VehicleNo: '',
      VehicleName: '',
      filldate: '',
      emptydate: '',
      DriverName: '',
      InitialOdometerReading: '',
      FinalOdometerReading: '',
      FuelConsumptioninliters: '',
    }));
    setSelectedCustomerData({});
    setFuelConsumption({});
    setFinalOdometer({});
    setInitialOdometer({});
  };
  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);
  const handleClick = async (event, actionName, VehicleNo) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/fueldetails');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/fueldetails/${VehicleNo}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.VehicleNo === VehicleNo);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/fueldetails/${VehicleNo}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        await axios.post('http://localhost:8081/fueldetails', book);
        console.log(book);
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


  // const calculateMileage = () => {
  //   const distance = finalOdometer - initialOdometer;
  //   const mileageValue = distance / fuelConsumption;
  //   setMileage(mileageValue);
  //   console.log(mileageValue);
  // };

  const calculateMileage = () => {
    const distance =
      (selectedCustomerData?.FinalOdometerReading || finalOdometer) -
      (selectedCustomerData?.InitialOdometerReading || initialOdometer);

    const fuelConsumptionValue = selectedCustomerData?.FuelConsumptioninliters || fuelConsumption;

    const mileageValue = distance / fuelConsumptionValue;
    setMileage(mileageValue);
    console.log(mileageValue);
  };

  // TABLE START


  return (
    <div className="form-container">
      <div className="FuelDetails-form">
        <form >
          <span className="Title-Name" >Mailage Details</span>
          <div className="FuelDetails-page-header">
            <div className="detailsFuel">
              <div className="input-field">
                <div className="input" >
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleNo"
                    label="Vehicle No"
                    name="VehicleNo"
                    autoComplete="new-password"
                    value={selectedCustomerData?.VehicleNo || book.VehicleNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <CommuteIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleName"
                    label="Vehicle Name"
                    name="VehicleName"
                    autoComplete="new-password"
                    value={selectedCustomerData?.VehicleName || book.VehicleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fill Date"
                      defaultValue={dayjs()}
                      value={formData.filldate || selectedCustomerData.filldate ? dayjs(selectedCustomerData.filldate) : null}
                      onChange={(date) => handleDateChange(date, 'filldate')}
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
                      label="Empty Date"
                      defaultValue={dayjs()}
                      value={formData.emptydate || selectedCustomerData.emptydate ? dayjs(selectedCustomerData.emptydate) : null}
                      onChange={(date) => handleDateChange(date, 'emptydate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <div className="input" >
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="DriverName"
                    label="Driver Name"
                    name="DriverName"
                    autoComplete="new-password"
                    value={selectedCustomerData?.DriverName || book.DriverName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <CurrencyRupeeIcon color='action' />
                  </div>
                  <TextField
                    size="small"
                    id="FuelPrice"
                    label="Fuel Price"
                    name="FuelPrice"
                    autoComplete="new-password"
                    value={selectedCustomerData?.DriverName || book.DriverName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faGaugeSimple} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="InitialOdometerReading"
                    label="Initial Odometer Reading"
                    name="InitialOdometerReading"
                    autoComplete="new-password"
                    value={selectedCustomerData?.InitialOdometerReading || book.InitialOdometerReading || initialOdometer}
                    sx={{ width: "250px" }}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setInitialOdometer(e.target.value);
                    }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faGaugeHigh} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="FinalOdometerReading"
                    label="Final Odometer Reading"
                    sx={{ width: "250px" }}
                    name="FinalOdometerReading"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FinalOdometerReading || book.FinalOdometerReading || finalOdometer}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setFinalOdometer(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "250px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faGasPump} size="xl" />
                  </div>
                  <TextField
                    size="small"
                    id="FuelConsumptioninliters"
                    label="Fuel Consumption (in liters)"
                    sx={{ width: "250px" }}
                    name="FuelConsumptioninliters"
                    autoComplete="new-password"
                    value={selectedCustomerData?.FuelConsumptioninliters || book.FuelConsumptioninliters || fuelConsumption}
                    variant="standard"
                    onChange={(e) => {
                      handleChange(e);
                      setFuelConsumption(e.target.value);
                    }}
                  />
                </div>
                <div className="input" >
                  <Button color="primary" variant="outlined" onClick={calculateMileage}>
                    Calculate Mileage
                  </Button>
                </div>
                <div className="input" style={{ width: "70px" }}>
                  <Button color="primary" variant="contained" >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h2>Mileage: </h2>
              <p>
                <span className="mailage-icone">
                  <FontAwesomeIcon icon={faGaugeHigh} size="lg" />
                </span>
                {mileage.toFixed(2)} km/L
              </p>
            </div>
            <Box sx={{ position: "relative", mt: 3, height: 320 }}>
              <StyledSpeedDial
                ariaLabel="SpeedDial playground example"
                icon={<SpeedDialIcon />}
                direction="left"
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
            <div className="Download-btn">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                      Download
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>Excel</MenuItem>
                      <MenuItem >PDF</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <div className="table-bookingCopy-Employe">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  onRowClick={handleRowClick}
                  pageSize={5}
                  checkboxSelection
                />
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  )
}

export default FuelDetails