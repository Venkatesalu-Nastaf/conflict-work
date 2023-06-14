import React from "react";
import {
  UnderGroup,
  states,
  Customertype,
  Select,
  BillingGroup,
} from "./Customerdata";
import "./Customer.css";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import dayjs from "dayjs";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const Customer = () => {
  return (
    <div className="form-container">
      <div className="customer-form">
        <form action="">
          <span className="Title-Name">Customer Master</span>
          <div className="Customer-page-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  name="customerid"
                  label="Customer ID"
                  id="standard-size-normal"
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
                  id="email"
                  label="Name"
                  name="email"
                  autoFocus
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="Print Name"
                  label="Print Name"
                  name="Print Name"
                  autoFocus
                />
              </div>
              <div className="input">
                <DemoItem label="Start Date">
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "20ch" }}
                    value={Customertype.map((option) => option.optionvalue)}
                    options={Customertype.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Customer Type " />
                    )}
                  />
                </DemoItem>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Start Date">
                    <DatePicker
                      defaultValue={today}
                      minDate={tomorrow}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  label="Email"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <RateReviewIcon color="action" />
                </div>
                <TextField
                  name="ratetype"
                  label="Rate Type"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  name="opbalanace"
                  label="OP Balanace"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    GST Tax
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
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    A/C Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Dr"
                      control={<Radio />}
                      label="Dr"
                    />
                    <FormControlLabel
                      value="Cr"
                      control={<Radio />}
                      label="Cr"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="Customer-page-secend-container">
            <div className="Customer-page-secend-container-left">
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
              </div>
            </div>
            <div className="Customer-page-secend-container-right">
              <div className="textboxlist">
                <div className="textboxlist-customer list-update">
                  <span>
                    List Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Harum veniam quos laborum. Dicta suscipit voluptas
                    laboriosam rem alias praesentium, facere aliquam sed iste,
                    officia excepturi quos corporis. Facilis, reiciendis et.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                    nostrum nihil minima debitis, nobis incidunt temporibus
                    velit accusantium dolore assumenda iusto quod ratione
                    praesentium maxime eveniet voluptas enim animi laudantium.
                    List Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Harum veniam quos laborum. Dicta suscipit voluptas
                    laboriosam rem alias praesentium, facere aliquam sed iste,
                    officia excepturi quos corporis. Facilis, reiciendis et.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                    nostrum nihil minima debitis, nobis incidunt temporibus
                    velit accusantium dolore assumenda iusto quod ratione
                    praesentium maxime eveniet voluptas enim animi laudantium.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-container-main-customer">
            <div className="container-left-customer">
              <div className="input-field checkbox">
                <FormControlLabel
                  value="Printbill"
                  control={<Checkbox size="small" />}
                  label="Print Bill"
                />
                <FormControlLabel
                  value="Username"
                  control={<Checkbox size="small" />}
                  label="User Name"
                />
                <FormControlLabel
                  value="Bookname"
                  control={<Checkbox size="small" />}
                  label="Book Name"
                />
                <FormControlLabel
                  value="Divistion"
                  control={<Checkbox size="small" />}
                  label="Divistion"
                />
                <FormControlLabel
                  size="small"
                  value="Hourroundedoff"
                  control={<Checkbox size="small" />}
                  label="Hour Roundedoff"
                />
              </div>
              <div className="input-field">
                <div className="input">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={Select.map((option) => option.optionvalue)}
                    options={Select.map((option) => ({ label: option.Option }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Select" />
                    )}
                  />
                </div>
                <div className="input radio">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Incl. Address
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
              </div>
              <div className="input-field">
                <div className="input">
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={states.map((option) => option.statevalue)}
                    options={states.map((option) => ({
                      label: option.statevalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="State" />
                    )}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  <TextField
                    name="entity"
                    label="Entity"
                    id="standard-size-normal"
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    value={UnderGroup.map((option) => option.optionvalue)}
                    options={UnderGroup.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Under Group" />
                    )}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input radio">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Enable Driver App
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
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={BillingGroup.map((option) => option.optionvalue)}
                    options={BillingGroup.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Billing Group" />
                    )}
                  />
                </div>
              </div>
              <div className="SpeedDial" style={{padding: '26px',}}>
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
              </div>
            </div>
            <div className="container-right-customer">
              <div className="textbox">
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

export default Customer;
