import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import "./PackageRateEntery.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { RateType, PriceTag, VehicleType, Duty } from "./PackageRateEnteryData.js";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';

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
// Table START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "vehicleType", headerName: "Vehicle Type", width: 130 },
  { field: "duty", headerName: "Duty", width: 130 },
  { field: "Hours", headerName: "Hours", width: 130 },
  { field: "KMS", headerName: "KMS", width: 130 },
  { field: "Rate", headerName: "Rate", width: 130 },
  { field: "PerHour", headerName: "PerHours", width: 130 },
  { field: "PerKMS", headerName: "PerKMS", width: 130 },
  { field: "extraHours", headerName: "ExtraHours", width: 130 },
  { field: "extraKMS", headerName: "ExtraKMS", width: 130 },
  { field: "UptoHours", headerName: "ChTime", width: 130 },
  { field: "AKMS", headerName: "AllowKMS", width: 130 },
  { field: "ChKMS", headerName: "ChKMS", width: 130 },
  { field: "Bata", headerName: "Bata", width: 130 },
  { field: "NHalt", headerName: "NightHalt", width: 130 },
];
// TABLE END


const PackageRateEntery = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
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
    ratetype: '',
    pricetag: '',
    Validity: '',
    vehicleType: '',
    package: '',
    duty: '',
    Hours: '',
    KMS: '',
    Rate: '',
    PerHour: '',
    PerKMS: '',
    extraHours: '',
    extraKMS: '',
    UptoHours: '',
    AKMS: '',
    NHalt: '',
    Bata: '',
    chtime: '',
    ChKMS: '',
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


  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      ratetype: '',
      pricetag: '',
      package: '',
      Validity: '',
      vehicleType: '',
      duty: '',
      Hours: '',
      KMS: '',
      Rate: '',
      PerHour: '',
      PerKMS: '',
      extraHours: '',
      extraKMS: '',
      UptoHours: '',
      AKMS: '',
      NHalt: '',
      Bata: '',
      ChKMS: '',
      chtime: '',
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
    const duty = book.duty;
    if (!duty) {
      setErrorMessage("Check your Network Connection");
      // setErrorMessage("fill mantatory fields");
      return;
    }
    try {
      console.log('Add button clicked');
      await axios.post('http://localhost:8081/ratemanagement', book);
      console.log(book);
      handleCancel();
      setSuccessMessage("Successfully Added");
    } catch (error) {
      console.error('Error updating customer:', error);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleClick = async (event, actionName, duty) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/ratemanagement');
        const data = response.data;
        setSuccessMessage("Successfully listed");
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Client-side id before DELETE request:', selectedCustomerData.id);
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/ratemanagement/${selectedCustomerData.id}`);
        console.log('DELETE request URL:', `http://localhost:8081/ratemanagement/${selectedCustomerData.id}`);
        console.log('DELETE request sent');
        console.log(selectedCustomerData.id);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked'); 
        const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/ratemanagement/${selectedCustomerData.id}`, updatedCustomer);
        console.log('Customer updated');
        setSuccessMessage("Successfully updated");
        handleCancel();
      } else if (actionName === 'Add') {
        handleAdd();
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Check your Network Connection");
    }
  };
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });

  return (
    <div className="PackageRateEntery-form Scroll-Style-hide">
      <form action="">
        <div className="PackageRateEntery-container-main">
          <div className="container-left">
            <div className="copy-title-btn-PackageRateEntery">
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <TypeSpecimenOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-ratetype"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "ratetype")}
                    value={RateType.find((option) => option.optionvalue)?.label || ''}
                    options={RateType.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.ratetype || ''
                      return (
                        <TextField {...params} label="RateType" name="ratetype" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <LocalOfferOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-pricetag"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "pricetag")}
                    value={PriceTag.find((option) => option.optionvalue)?.label || ''}
                    options={PriceTag.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.pricetag || ''
                      return (
                        <TextField {...params} label="PriceTag" name="pricetag" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    sx={{ width: "300px" }}
                    label="Package"
                    name="package"
                    autoComplete="new-password"
                    value={selectedCustomerData?.package || book.package}
                    onChange={handleChange}
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    sx={{ width: "300px" }}
                    label="Validity"
                    name="Validity"
                    autoComplete="new-password"
                    value={selectedCustomerData?.Validity || book.Validity}
                    onChange={handleChange}
                    variant="standard"
                  />
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-vehicleType"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleType")}
                    value={VehicleType.find((option) => option.optionvalue)?.label || ''}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => {
                      params.inputProps.value = selectedCustomerData?.vehicleType || ''
                      return (
                        <TextField {...params} label="VehicleType" name="vehicleType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <Button variant="outlined">Show All Date</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='PackageRateEntery-container-bottom'>
          <div className="input-field">
            <div className="input" style={{ width: "200px" }}>
              <div className="icone">
                <EngineeringIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo-duty"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "duty")}
                value={Duty.find((option) => option.optionvalue)?.label || ''}
                options={Duty.map((option) => ({
                  label: option.option,
                }))}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => {
                  params.inputProps.value = selectedCustomerData?.duty || ''
                  return (
                    <TextField {...params} label="Duty" name="duty" inputRef={params.inputRef} />
                  )
                }
                }
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Hours"
                name="Hours"
                autoComplete="new-password"
                value={selectedCustomerData?.Hours || book.Hours}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="KMS"
                name="KMS"
                autoComplete="new-password"
                value={selectedCustomerData?.KMS || book.KMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="Rate"
                name="Rate"
                autoComplete="new-password"
                value={selectedCustomerData?.Rate || book.Rate}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="PerHour"
                name="PerHour"
                autoComplete="new-password"
                value={selectedCustomerData?.PerHour || book.PerHour}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="PerKMS"
                name="PerKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.PerKMS || book.PerKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "110px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="extraHours"
                name="extraHours"
                autoComplete="new-password"
                value={selectedCustomerData?.extraHours || book.extraHours}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="extraKMS"
                name="extraKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.extraKMS || book.extraKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="chtime"
                label="ChTime"
                name="chtime"
                autoComplete="new-password"
                value={selectedCustomerData?.chtime || book.chtime}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "110px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="UptoHours"
                name="UptoHours"
                autoComplete="new-password"
                value={selectedCustomerData?.UptoHours || book.UptoHours}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="A.KMS"
                name="AKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.AKMS || book.AKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <TextField
                type='number'
                size="small"
                id="id"
                label="N.Halt"
                name="NHalt"
                autoComplete="new-password"
                value={selectedCustomerData?.NHalt || book.NHalt}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
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
              <TextField
                type='number'
                size="small"
                id="id"
                label="ChKMS"
                name="ChKMS"
                autoComplete="new-password"
                value={selectedCustomerData?.ChKMS || book.ChKMS}
                onChange={handleChange}
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <Button variant="contained" onClick={handleAdd}>Save All</Button>
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
        <div className="table-bookingCopy-PackageRateEntery">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
            />
          </div>

        </div>
      </form>
    </div>
  )
}

export default PackageRateEntery