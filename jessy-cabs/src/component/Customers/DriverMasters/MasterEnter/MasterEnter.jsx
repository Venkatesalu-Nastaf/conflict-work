import React from "react";
import {
  CabDriver,
} from "./MasterEnteryData";
import "./MasterEnter.css";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { TextField } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Table } from "@mui/joy";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Autocomplete from "@mui/material/Autocomplete";

//
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";


// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faKey, faSheetPlastic } from "@fortawesome/free-solid-svg-icons";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


// TABLE
function createData(driverName, mobile) {
  return { driverName, mobile };
}

const rows = [
  createData("John Doe", "9912277222"),
  createData("Jane Smith", "9123317892"),
  createData("Michael Johnson", "73421288938"),
  createData("Sarah Davis", "62779165285"),
  createData("Robert Wilson", "7729734456"),
];

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

const MasterEnter = () => {

  return (
    <div className="masterEntery-form-container">
      <div className="masterEntery-form">
        <form action="">
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
                  name="id"
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
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date" defaultValue={dayjs()} />
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
                  id="free-solo-demo"
                  freeSolo
                  value={CabDriver.map((option) => option.optionvalue)}
                  options={CabDriver.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Cab Driver" />
                  )}
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
                    label="Address"
                    id="remark"
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
                    id="remark"
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
                    name="PFNo"
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
                    name="ESINo"
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
                    name="d.l.no"
                    autoFocus
                  />
                </div>
                <div className="input" style={{ width: "185px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="D.L.Exp Date" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="AccountNo"
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
                  />
                </div>
              </div>
            </div>
            <div className="container-right-masterEntery">
              <div className="textbox-masterEntery">
                <div className="textboxlist-masterEntery">
                  <div className="textboxlist-customer list-update">
                    <span>
                      <Table stickyHeader hoverRow borderAxis="y">
                        <thead>
                          <tr>
                            <th style={{ width: "20%" }}>Driver Name</th>
                            <th style={{ width: "35%" }}>Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr key={row.name}>
                              <td>{row.driverName}</td>
                              <td>{row.mobile}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </span>
                  </div>
                </div>
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
        </form>
      </div>
    </div>
  )
}

export default MasterEnter