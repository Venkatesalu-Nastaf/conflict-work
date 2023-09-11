import React, { useState, useEffect, useCallback } from 'react';
import "./UserCreation.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from "@mui/material/Autocomplete";
import Visibility from '@mui/icons-material/Visibility';
import { StationName, ViewFor } from "./UserCreationData";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// FONTAWESOME
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';  
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";



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

const UserCreation = () => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [success, setSuccess] = useState(false);

  // TABLE START
  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "username", headerName: "User_Name", width: 130 },
    { field: "userpassword", headerName: "Password", width: 130 },
    { field: "active", headerName: "Active", width: 160 },
    { field: "stationname", headerName: "Station", width: 130 },
    { field: "viewfor", headerName: "Access", width: 130 },
    { field: "designation", headerName: "Designation", width: 130 },
  ];

  const [book, setBook] = useState({
    userid: '',
    username: '',
    stationname: '',
    designation: '',
    userpassword: '',
    userconfirmpassword: '',
    active: '',
    viewfor: '',
  });

  // TABLE END

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
      if (name === 'userpassword') {
        setPassword(value);
      } else if (name === 'userconfirmpassword') {
        setConfirmPassword(value);
      }
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
      userid: '',
      username: '',
      stationname: '',
      designation: '',
      userpassword: '',
      userconfirmpassword: '',
      active: '',
      viewfor: '',
    }));
    setSelectedCustomerData({});
  };

  const handleAdd = async () => {
    const stationname = book.stationname;

    if (password === confirmPassword) {
      setPasswordsMatch(true);

      if (!stationname) {
        setError(true);
        setErrorMessage("Fill mandatory fields");
        return;
      }

      try {
        await axios.post('http://localhost:8081/usercreation', book);
        console.log(book);
        handleCancel();
        validatePasswordMatch();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    } else {
      setPasswordsMatch(false);
    }
  };


  const handleClick = async (event, actionName, userid) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/usercreation');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/usercreation/${userid}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.userid === userid);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/usercreation/${userid}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        handleAdd();
        handleCancel();
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Check Network Connection");
    }
  };
  const hidePopup = () => {
    setPasswordsMatch(true);
    setError(false);
    setSuccess(false);
  };
  useEffect(() => {
    if (error || !passwordsMatch) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error, passwordsMatch]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });
  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);

  const handleClickShowPasswords = () => {
    setShowPasswords((show) => !show);
  };

  const handleMouseDownPasswords = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validatePasswordMatch = () => {
    const password = selectedCustomerData?.userpassword || book.userpassword;
    const confirmPassword = selectedCustomerData?.userconfirmpassword || book.userconfirmpassword;
    setPasswordsMatch(password === confirmPassword);
  };

  return (
    <div className="usercreation-main">
      <div className="usercreation-form-container">
        <form onSubmit={handleClick}>
          <span className="Title-Name">User Creation</span>
          <div className="usercreation-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="id"
                  label="ID"
                  name="userid"
                  value={selectedCustomerData?.userid || book.userid}
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="user-name"
                  label="User Mail-Id"
                  name="username"
                  value={selectedCustomerData?.username || book.username}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-stationname"
                  freeSolo
                  sx={{ width: "20ch" }}
                  value={selectedCustomerData?.stationname || ''}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "stationname")}
                  options={StationName.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData?.stationname || ''
                    return (
                      <TextField {...params} label="Station Name" name="stationname" />
                    )
                  }
                  }
                />
              </div>
              <div className="input" style={{ width: "330px" }}>
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="designation"
                  value={selectedCustomerData?.designation || book.designation}
                  onChange={handleChange}
                  label="Designation"
                  id="designation"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "240px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                </div>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="userpassword"
                    value={selectedCustomerData?.userpassword || book.userpassword}
                    onChange={handleChange}
                    id="password"
                    type={showPasswords ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswords}
                          onMouseDown={handleMouseDownPasswords}
                        >
                          {showPasswords ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="input" style={{ width: "240px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faLock} size="lg" />
                </div>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                  <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                  <Input
                    name="userconfirmpassword"
                    value={selectedCustomerData?.userconfirmpassword || book.userconfirmpassword}
                    onChange={handleChange}
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="confirm-password"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

              </div>
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
                    onChange={handleChange}
                    value={selectedCustomerData?.active || book.active}
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
              <div className="input">
                <div className="icone">
                  <QuizOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-viewfor"
                  freeSolo
                  sx={{ width: "20ch" }}
                  value={selectedCustomerData?.viewfor || ''}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "viewfor")}
                  options={ViewFor.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData?.viewfor || ''
                    return (
                      <TextField {...params} label="View For" name="viewfor" />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "160px" }}>
                <Button variant="contained" onClick={handleAdd}>Add</Button>
              </div>
            </div>
          </div>
          {error &&
            <div className='alert-popup Error' >
              <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{errorMessage}</p>
            </div>
          }
          {!passwordsMatch &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>Passwords do not match. Please try again.</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>Successfully updated</p>
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
          <div className="usercreation-table-container">
            <div className="table-usercreations">
              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreation;
