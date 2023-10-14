import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./DriverBataRate.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment, TextField } from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { VehicleType, Duty } from "./DriverBataRateData.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

//ICONS
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ChecklistIcon from "@mui/icons-material/Checklist";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

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

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "VehicleType", headerName: "Vehicle Type", width: 130 },
  { field: "Duty", headerName: "Duty", width: 130 },
  { field: "ExtraPerDayPrice", headerName: "ExtraPerDayPrice", width: 130 },
  { field: "ExtraHours", headerName: "ExtraHours", width: 130 },
  { field: "ExtraDays", headerName: "ExtraDays", width: 130 },
  { field: "fromdate", headerName: "From_Date", width: 130 },
  { field: "todate", headerName: "To_Date", width: 130 },
  { field: "Bata", headerName: "Bata", width: 130 },
];
// TABLE END

const DriverBataRate = () => {

  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [formData] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
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
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [info]);


  const [book, setBook] = useState({
    Bata: '',
    ExtraPerDayPrice: '',
    ExtraPerHoursPrice: '',
    ExtraDays: '',
    ExtraHours: '',
    Duty: '',
    VehicleType: '',
    todate: '',
    fromdate: '',
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
  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      Bata: '',
      ExtraPerDayPrice: '',
      ExtraPerHoursPrice: '',
      ExtraDays: '',
      ExtraHours: '',
      Duty: '',
      VehicleType: '',
      todate: '',
      fromdate: '',
    }));
    setSelectedCustomerData({});
  };
  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);
  const handleAdd = async () => {
    const DivisionName = book.DivisionName;
    if (!DivisionName) {
      setErrorMessage("Check your Network Connection");
      // setErrorMessage("fill mantatory fields");
      return;
    }
    try {
      console.log('Add button clicked');
      await axios.post('http://localhost:8081/driverbatarate', book);
      console.log(book);
      handleCancel();
      
  setSuccessMessage("Successfully Added");
    } catch (error) {
      console.error('Error updating customer:', error);
      setErrorMessage("Check your Network Connection");
        
    }
  };

  const handleClick = async (event, actionName, id) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/driverbatarate');
        const data = response.data;
        setSuccessMessage("Successfully listed");
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/driverbatarate/${id}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.id === id);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/driverbatarate/${id}`, updatedCustomer);
        console.log('Customer updated');
        setSuccessMessage("Successfully updated");
        handleCancel();
      } else if (actionName === 'Add') {
        handleAdd();
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Check Network Connection");
    }
  };
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });


  return (
    <div className="ratetype-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-DriverBataRate">
              <div className="input-field">
                <div className="input" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="From Date"> */}
                    <DatePicker
                      label='From Date'
                      defaultValue={dayjs()}
                      value={formData.fromdate || selectedCustomerData.fromdate ? dayjs(selectedCustomerData.fromdate) : null}
                      onChange={(date) => handleDateChange(date, 'fromdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.fromdate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="To Date"> */}
                    <DatePicker
                      label='To Date'
                      defaultValue={dayjs()}
                      value={formData.todate || selectedCustomerData.todate ? dayjs(selectedCustomerData.todate) : null}
                      onChange={(date) => handleDateChange(date, 'todate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.todate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-VehicleType"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "VehicleType")}
                    value={VehicleType.find((option) => option.optionvalue)?.label || ''}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.VehicleType || ''
                      return (
                        <TextField {...params} label="Vehicle Type" name="VehicleType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ width: "111px" }}>
                  <Button variant="contained">Show</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "200px" }}>
                  <div className="icone">
                    <EngineeringIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-VehicleType"
                    freeSolo
                    // sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "Duty")}
                    value={Duty.find((option) => option.optionvalue)?.label || ''}
                    options={Duty.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.Duty || ''
                      return (
                        <TextField {...params} label="Duty" name="Duty" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraHours"
                    name="ExtraHours"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraHours || book.ExtraHours}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraDays"
                    name="ExtraDays"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraDays || book.ExtraDays}
                    onChange={handleChange}
                  />
                </div>

              </div>
              <div className="input-field">
                <div className="input">
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraPerHoursPrice"
                    name="ExtraPerHoursPrice"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraPerHoursPrice || book.ExtraPerHoursPrice}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="input" >
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraPerDayPrice"
                    name="ExtraPerDayPrice"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraPerDayPrice || book.ExtraPerDayPrice}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="input" style={{ width: "111px" }}>
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="Bata"
                    name="Bata"
                    autoComplete="new-password"
                    value={selectedCustomerData?.Bata || book.Bata}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" >Add</Button>
                </div>
              </div>
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
        <div className="table-bookingCopy-DriverBataRate">
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
      </form>
    </div>
  )
}

export default DriverBataRate