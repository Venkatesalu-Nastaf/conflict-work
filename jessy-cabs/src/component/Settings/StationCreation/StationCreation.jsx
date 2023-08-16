import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import "./StationCreation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";

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

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "Stationname", headerName: "Statio_Name", width: 130 },
  { field: "active", headerName: "Active", width: 160 },
  { field: "shortname", headerName: "Station", width: 130 },
  { field: "ownbranch", headerName: "Own_Branch", width: 130 },
];
// TABLE END
const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];
const StationCreation = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
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
    stationid: '',
    Stationname: '',
    shortname: '',
    active: '',
    ownbranch: '',

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




  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      stationid: '',
      Stationname: '',
      shortname: '',
      active: '',
      ownbranch: '',

    }));
    setSelectedCustomerData({});
  };
  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);
  const handleClick = async (event, actionName, stationid) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/stationcreation');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/stationcreation/${stationid}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.stationid === stationid);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/stationcreation/${stationid}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        await axios.post('http://localhost:8081/stationcreation', book);
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

  return (
    <div className="stationcreation-main">
      <div className="stationcreation-form-container">
        <form action="">
          <span className="Title-Name">Station Creation</span>
          <div className="stationcreation-header">
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
                  name="stationid"
                  value={selectedCustomerData?.stationid || book.stationid}
                  autoComplete="new-password"
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "380px" }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="Station-name"
                  label="Station Name"
                  sx={{ m: 1, width: "200ch" }}
                  name="Stationname"
                  value={selectedCustomerData?.Stationname || book.Stationname}
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </div>
              <div className="input" style={{ width: "300px" }}>
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="short-name"
                  label="Short Name"
                  sx={{ m: 1, width: "200ch" }}
                  name="shortname"
                  value={selectedCustomerData?.shortname || book.shortname}
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                {/* <TextField
                  margin="normal"
                  size="small"
                  id="Station-name"
                  label="Station Name"
                  sx={{ m: 1, width: "200ch" }}
                  name="Stationname"
                  value={selectedCustomerData?.Stationname || book.Stationname}
                  autoComplete="new-password"
                  onChange={handleChange}
                /> */}
              </div>
            </div>
            <div className="input-field">
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
                    value={selectedCustomerData?.active || book.active}
                    autoComplete="new-password"
                    onChange={handleChange}
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
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Own Branch
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="ownbranch"
                    value={selectedCustomerData?.ownbranch || book.ownbranch}
                    autoComplete="new-password"
                    onChange={handleChange}
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
              <div className="input" style={{ width: "100px" }}>
                <Button variant="contained" >Add</Button>
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
          <div className="stationcreation-table-container">
            <div className="table-stationcreation">
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
              // checkboxSelection
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationCreation;
