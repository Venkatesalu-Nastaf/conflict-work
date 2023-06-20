import React from "react";
import "./UserCreation.css";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { StationName, ViewFor } from "./UserCreationData";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import Autocomplete from "@mui/material/Autocomplete";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

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
// Table Start
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "Customer_Name", headerName: "Customer_Name", width: 130 },
    { field: "Address", headerName: "Address", width: 130 },
    { field: "Phone", headerName: "Phone", width: 90 },
    { field: "Active", headerName: "Active", width: 160 },
    { field: "ID", headerName: "ID", width: 130 },
    { field: "Rate_Type", headerName: "Rate_Type", width: 130 },
    { field: "GST_NO", headerName: "GST_NO", width: 130 },
    { field: "State", headerName: "State", width: 130 },
    { field: "Driver_App", headerName: "Driver_App", width: 130 },
  ];
  
  const rows = [
    {
      id: 1,
      Customer_Name: 1,
      Address: "Address 1",
      Phone: "Employee 1",
      Active: "John Doe",
      ID: "2023-06-07",
      Rate_Type: "Morning",
      GST_NO: "9:00 AM",
      State: "123 Street, Apt 4B, City",
      Driver_App: "ABC Car",
    },
    {
      id: 2,
      Customer_Name: 2,
      Address: "Address 2",
      Phone: "Employee 2",
      Active: "Jane Smith",
      ID: "2023-06-08",
      Rate_Type: "Evening",
      GST_NO: "2:00 PM",
      State: "456 Avenue, Unit 8, Town",
      Driver_App: "XYZ Car",
    },
    
    // Add more rows as needed
  ];
  // Table End
const UserCreation = () => {
  return (
    <div className="usercreation-main">
      <div className="usercreation-form-container">
        <form action="">
          <span className="Title-Name">User Creation</span>
          <div className="Tripsheet-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="id"
                  label="ID"
                  name="id"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="user-name"
                  label="User Name"
                  name="user-name"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <QuizOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={StationName.map((option) => option.optionvalue)}
                  options={StationName.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Station Name" />
                  )}
                />
              </div>
              <div className="input" style={{ width: "330px" }}>
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="designation"
                  label="Designation"
                  id="designation"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
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
                  type="password"
                  id="temporary-password"
                  label="Temporary Password"
                  name="temporary-password"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  type="password"
                  id="confirm-password"
                  label="Confirm Password"
                  name="confirm-password"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="no"
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
                  id="free-solo-demo"
                  freeSolo
                  value={ViewFor.map((option) => option.optionvalue)}
                  options={ViewFor.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="View For" />
                  )}
                />
              </div>
            </div>
          </div>

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
                />
              ))}
            </StyledSpeedDial>
          </Box>
          <div className="usercreation-table-container">
            <div className="table-usercreation">
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreation;
