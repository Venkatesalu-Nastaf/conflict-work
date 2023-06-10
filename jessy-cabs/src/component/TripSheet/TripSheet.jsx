import React from "react";
import {
  Apps,
  VehicleRate,
  Status,
  HireTypes,
  Department,
} from "./TripSheetdata";
import "./TripSheet.css";
import {
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Autocomplete from "@mui/material/Autocomplete";

//
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

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

const TripSheet = () => {
  return (
    <div className="form-container">
      <div className="customer-form">
        <form action="">
          <span className="Title-Name">Trip Sheet</span>
          <div className="Tripsheet-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="tripsheetno"
                  label="Tirp Sheet No"
                  name="tripsheetno"
                  autoFocus
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="bookingid"
                  label="Booking ID"
                  name="bookingid"
                  autoFocus
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  id="free-solo-demo"
                  freeSolo
                  value={Status.map((option) => option.optionvalue)}
                  options={Status.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="billingno"
                  label="Billing No"
                  name="billingno"
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input-field checkbox">
                <div className="input">
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    value={Apps.map((option) => option.optionvalue)}
                    options={Apps.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Apps" />
                    )}
                  />
                </div>
                <FormControlLabel
                  value="smsguest"
                  control={<Checkbox size="small" />}
                  label="SMS Guest"
                />
                <FormControlLabel
                  value="booker"
                  control={<Checkbox size="small" />}
                  label="Booker"
                />
                <FormControlLabel
                  value="email"
                  control={<Checkbox size="small" />}
                  label="Email"
                />
              </div>
            </div>
          </div>
          <div className="detail-container-main-customer">
            <div className="container-left-customer">
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <AttachEmailIcon color="action" />
                  </div>
                  <TextField
                    name="customer"
                    label="Customer"
                    id="standard-size-normal"
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    name="orderedby"
                    label="Ordered By"
                    id="standard-size-normal"
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    name="mobile"
                    label="Mobile"
                    id="standard-size-normal"
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="username"
                    label="User Name"
                    name="username"
                    autoFocus
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    name="Phoencell"
                    label="Phone (Cell)"
                    id="Phoencell"
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    name="email"
                    label="Email"
                    id="email"
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="streetname"
                    label="No.Street Name"
                    name="address"
                    autoFocus
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <HomeTwoToneIcon color="action" />
                  </div>
                  <TextField
                    name="address"
                    label="Address"
                    id="address"
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <LocationCityIcon color="action" />
                  </div>
                  <TextField
                    name="city"
                    label="City"
                    id="standard-size-normal"
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    value={HireTypes.map((option) => option.option)}
                    options={HireTypes.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Hire Types" />
                    )}
                  />
                </div>
                <div className="input">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    value={Department.map((option) => option.option)}
                    options={Department.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Department" />
                    )}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <LocationCityIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="vehiclerigsterno"
                    label="Vehicle Rigster No"
                    name="vehiclerigsterno"
                    autoFocus
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    value={VehicleRate.map((option) => option.optionvalue)}
                    options={VehicleRate.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Vehicle Rate" />
                    )}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  <TextField
                    name="drivername"
                    label="Driver Name"
                    id="drivername"
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  <TextField
                    name="cell"
                    label="Cell"
                    id="cell"
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input radio">
                  <FormControlLabel
                    value="GST"
                    control={<Checkbox size="small" />}
                    label="GST"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  <TextField
                    name="cell"
                    label="Driver SMS Ex Betta"
                    id="cell"
                    variant="standard"
                  />
                </div>
              </div>
              <Box sx={{ position: "relative", mt:3, height: 320 }}>
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
            </div>
            <div className="container-right-customer">
              <div className="textbox">
                <div className="textboxlist">
                  <div className="textboxlist-customer list-update">
                    <span>
                      List Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Harum veniam quos laborum. Dicta suscipit voluptas
                      laboriosam rem alias praesentium, facere aliquam sed iste,
                      officia excepturi quos corporis. Facilis, reiciendis et.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cum nostrum nihil minima debitis, nobis incidunt
                      temporibus velit accusantium dolore assumenda iusto quod
                      ratione praesentium maxime eveniet voluptas enim animi
                      laudantium.
                    </span>
                  </div>
                </div>
                <div className="textboxlist">
                  <div className="textboxupdate list-update">
                    <span>
                      List Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Harum veniam quos laborum. Dicta suscipit voluptas
                      laboriosam rem alias praesentium, facere aliquam sed iste,
                      officia excepturi quos corporis. Facilis, reiciendis et.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cum nostrum nihil minima debitis, nobis incidunt
                      temporibus velit accusantium dolore assumenda iusto quod
                      ratione praesentium maxime eveniet voluptas enim animi
                      laudantium.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripSheet;
