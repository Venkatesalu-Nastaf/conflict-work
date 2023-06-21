import React from "react";
import "./StationCreation.css";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
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

// Table Start
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "Statio_Name", headerName: "Statio_Name", width: 130 },
  { field: "Active", headerName: "Active", width: 160 },
  { field: "Station", headerName: "Station", width: 130 },
  { field: "Own_Branch", headerName: "Own_Branch", width: 130 },
];

const rows = [
  {
    id: 1,
    Statio_Name: 1,
    Active: "John Doe",
    Station: "Morning",
    Own_Branch: "9:00 AM",
  },
  {
    id: 2,
    Statio_Name: 2,
    Active: "Jane Smith",
    Station: "Evening",
    Own_Branch: "2:00 PM",
  },

  // Add more rows as needed
];
// Table End
const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];
//
const StationCreation = () => {
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
                  name="id"
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
                  name="Station-name"
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
                  name="short-name"
                />
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
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Own Branch
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

export default StationCreation;
