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
// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

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
  { field: "User_Name", headerName: "User_Name", width: 130 },
  { field: "Password", headerName: "Password", width: 130 },
  { field: "Active", headerName: "Active", width: 160 },
  { field: "Station", headerName: "Station", width: 130 },
  { field: "Access", headerName: "Access", width: 130 },
  { field: "Designation", headerName: "Designation", width: 130 },
];

const rows = [
  {
    id: 1,
    User_Name: 1,
    Password: "Password 1",
    Active: "John Doe",
    Station: "Morning",
    Access: "9:00 AM",
    Designation: "ABC Car",
  },
  {
    id: 2,
    User_Name: 2,
    Password: "Password 2",
    Active: "Jane Smith",
    Station: "Evening",
    Access: "2:00 PM",
    Designation: "XYZ Car",
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
                  name="id"
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
                  label="User Name"
                  name="user-name"
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
                <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
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
                <FontAwesomeIcon icon={faLock} size="lg" />
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
              direction="left"
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
