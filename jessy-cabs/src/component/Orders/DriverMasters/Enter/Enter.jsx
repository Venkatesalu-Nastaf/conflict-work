import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./Enter.css";
import { Table } from "@mui/joy";
import Box from "@mui/material/Box";
import { CabDriver } from "./EnteryData";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faKey, faSheetPlastic } from "@fortawesome/free-solid-svg-icons";

// ICONS
import CallIcon from "@mui/icons-material/Call";
import BadgeIcon from "@mui/icons-material/Badge";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


// TABLE
// const columns = [
//   { field: "driverid", headerName: "Driver ID", width: 70 },
//   { field: "username", headerName: "Driver Name", width: 130 },
//   { field: "Phoencell", headerName: "Mobile", width: 130 },
// ];
// TABLE END

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

const Enter = () => {

  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
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


  const [book, setBook] = useState({
    driverid: '',
    username: '',
    ddate: '',
    Phoencell: '',
    email: '',
    cabdriver: '',
    address1: '',
    basicsalary: '',
    streetno: '',
    pfno: '',
    city: '',
    esino: '',
    dlno: '',
    dlexpdate: '',
    accountno: '',
    durationofyears: '',
    apppassword: '',

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
      driverid: '',
      username: '',
      ddate: '',
      Phoencell: '',
      email: '',
      cabdriver: '',
      address1: '',
      basicsalary: '',
      streetno: '',
      pfno: '',
      city: '',
      esino: '',
      dlno: '',
      dlexpdate: '',
      accountno: '',
      durationofyears: '',
      apppassword: '',

    }));
    setSelectedCustomerData({});
  };

  const handleClick = async (event, actionName, driverid) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/drivermaster');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/drivermaster/${driverid}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.driverid === driverid);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/drivermaster/${driverid}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        await axios.post('http://localhost:8081/drivermaster', book);
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
  const handleRowClick = useCallback((params) => {
    setSelectedCustomerData(params);
  }, []);

  return (
    <div className="masterEntery-form-container">
      <div className="masterEntery-form">
        <form onSubmit={handleClick}>
          <div className="masterEntery-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="id"
                  label="ID"
                  value={selectedCustomerData?.driverid || book.driverid}
                  onChange={handleChange}
                  name="driverid"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AssignmentIndIcon color="action" />
                </div>
                <TextField
                  id="username"
                  label="User Name"
                  name="username"
                  value={selectedCustomerData?.username || book.username}
                  onChange={handleChange}
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name="ddate" label="Date" defaultValue={dayjs()} />
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DemoItem label="Date"> */}
                  <DatePicker
                    label="Date"
                    value={selectedCustomerData.ddate ? dayjs(selectedCustomerData.ddate) : null}
                    onChange={(date) => handleDateChange(date, 'ddate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} name='ddate' value={selectedCustomerData.ddate} />
                    )}
                  </DatePicker>
                  {/* </DemoItem> */}
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field ">
              <div className="input">
                <div className="icone">
                  <CallIcon color="action" />
                </div>
                <TextField
                  type="number"
                  name="Phoencell"
                  value={selectedCustomerData?.Phoencell || book.Phoencell}
                  onChange={handleChange}
                  label="Phone (Cell)"
                  id="Phoencell"
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
                  value={selectedCustomerData?.email || book.email}
                  onChange={handleChange}
                  label="Email"
                  id="email"
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AppsOutageOutlinedIcon color="action" />
                </div>

                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-customerType"
                  freeSolo
                  sx={{ width: "20ch" }}
                  value={selectedCustomerData?.cabdriver || ''}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "cabdriver")}
                  options={CabDriver.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData?.cabdriver || ''
                    return (
                      <TextField {...params} label="Cab Driver" name="cabdriver" />
                    )
                  }
                  }
                />

              </div>
            </div>
          </div>
          <div className="detail-container-main-masterEntery">
            <div className="container-left-masterEntery">
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="address1"
                    value={selectedCustomerData?.address1 || book.address1}
                    onChange={handleChange}
                    label="Address"
                    id="address1"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="basicsalary"
                    label="Basic Salary"
                    value={selectedCustomerData?.basicsalary || book.basicsalary}
                    onChange={handleChange}
                    name="basicsalary"
                    autoFocus
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
                    value={selectedCustomerData?.streetno || book.streetno}
                    onChange={handleChange}
                    id="streetno"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FontAwesomeIcon icon={faSheetPlastic} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    name="pfno"
                    value={selectedCustomerData?.pfno || book.pfno}
                    onChange={handleChange}
                    label="PF No"
                    id="PFNo"
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
                    value={selectedCustomerData?.city || book.city}
                    onChange={handleChange}
                    id="address3"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="esino"
                    value={selectedCustomerData?.esino || book.esino}
                    onChange={handleChange}
                    label="ESI No"
                    id="ESINo"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="d.l.no"
                    label="D.L.No"
                    value={selectedCustomerData?.dlno || book.dlno}
                    onChange={handleChange}
                    name="dlno"
                    autoFocus
                  />
                </div>
                <div className="input" style={{ width: "185px" }}>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="D.L.Exp Date"
                      value={selectedCustomerData.dlexpdate ? dayjs(selectedCustomerData.dlexpdate) : null}
                      onChange={(date) => handleDateChange(date, 'dlexpdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='dlexpdate' value={selectedCustomerData.dlexpdate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="accountno"
                    value={selectedCustomerData?.accountno || book.accountno}
                    onChange={handleChange}
                    label="Account No"
                    id="standard-size-normal"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faFileInvoice} size="lg" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="durationofyears"
                    label="Duration Of Years"
                    value={selectedCustomerData?.durationofyears || book.durationofyears}
                    onChange={handleChange}
                    name="durationofyears"
                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faKey} size="lg" />
                  </div>
                  <TextField
                    type="password"
                    margin="normal"
                    size="small"
                    id="apppassword"
                    label="App Password"
                    name="apppassword"
                    value={selectedCustomerData?.apppassword || book.apppassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="container-right-masterEntery">
              <div className="textbox-masterEntery">
                <div className="textboxlist-masterEntery">
                  <div className="textboxlist-customer list-update">
                    <span>
                      <div>
                        <Table hoverRow borderAxis="y">
                          <thead>
                            <tr>
                              <th>Driver ID</th>
                              <th>Driver Name</th>
                              <th>Mobile</th>
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
                                  <td>{row.driverid}</td>
                                  <td>{row.username}</td>
                                  <td>{row.Phoencell}</td>
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
          {error &&
            <div className='alert-popup Error' >
              <span className='cancel-btn' onClick={hidePopup}>x</span>
              <p>Something went wrong!</p>
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
        </form>
      </div>
    </div>
  )
}

export default Enter