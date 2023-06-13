import React from "react";
import {
  Apps,
  VehicleRate,
  Status,
  HireTypes,
  Department,
  Duty,
  Pickup,
  Email,
} from "./TripSheetdata";
import "./TripSheet.css";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import PaymentsIcon from "@mui/icons-material/Payments";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import MinorCrashSharpIcon from "@mui/icons-material/MinorCrashSharp";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import StreamIcon from "@mui/icons-material/Stream";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SmsIcon from "@mui/icons-material/Sms";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Button from "@mui/material/Button";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StoreIcon from "@mui/icons-material/Store";
import { Table } from "@mui/joy";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Autocomplete from "@mui/material/Autocomplete";
// FontAwesomeIcon Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStamp } from '@fortawesome/free-solid-svg-icons'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'

//
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";

// TABLE
function createData(name, address1, address2) {
  return { name, address1, address2 };
}

const rows = [
  createData("John Doe", "123 Main St", "Apt 4"),
  createData("Jane Smith", "456 Elm St", "Unit 7"),
  createData("Michael Johnson", "789 Oak Ave", "Suite 10"),
  createData("Sarah Davis", "321 Pine St", "Floor 2"),
  createData("Robert Wilson", "987 Maple Dr", "Building B"),
];

// TABLE END

// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");

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
      <div className="Tripsheet-form">
        <form action="">
          <span className="Title-Name">Trip Sheet</span>
          <div className="Tripsheet-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <ListAltIcon color="action" />
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
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
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
                <div className="icone">
                  <QuizOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
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
                  <AccountBalanceWalletIcon color="action" />
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
            <div className="input-field checkbox">
              <div className="input">
                <div className="icone">
                  <AppsOutageOutlinedIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
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
              <div className="input">
                <div className="icone">
                  <HailOutlinedIcon color="action" />
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
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="mobile"
                  label="Mobile"
                  id="standard-size-normal"
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AssignmentIndIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  id="username"
                  label="User Name"
                  name="username"
                  size="small"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CallIcon color="action" />
                </div>
                <TextField
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
            </div>
          </div>

          <div className="detail-container-main-Tripsheet">
            <div className="container-left-Tripsheet">
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
            <div className="container-right-Tripsheet">
              <div className="textbox-TripSheet">
                <div className="textboxlist-TripSheet">
                  <div className="textboxlist-customer list-update">
                    <span>
                      <Table stickyHeader hoverRow borderAxis="y">
                        <thead>
                          <tr>
                            <th style={{ width: "20%" }}>User Name</th>
                            <th style={{ width: "35%" }}>Address</th>
                            <th style={{ width: "35%" }}>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr key={row.name}>
                              <td>{row.name}</td>
                              <td>{row.address1}</td>
                              <td>{row.address2}</td>
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
          <div className="secend-container">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <HowToRegIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
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
                <div className="icone">
                  <StoreIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
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
                  <CarCrashIcon color="action" />
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
                <div className="icone">
                  <NoCrashIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
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
                  <SensorOccupiedIcon color="action" />
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
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  name="cell"
                  label="Cell"
                  id="cell"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <FormControlLabel
                  value="GST"
                  control={<Checkbox size="small" />}
                  label="GST"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SmsIcon color="action" />
                </div>
                <TextField
                  name="cell"
                  label="Driver SMS Ex Betta"
                  id="cell"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <EngineeringIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Duty.map((option) => option.optionvalue)}
                  options={Duty.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Duty" />
                  )}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AirlineStopsIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Pickup.map((option) => option.optionvalue)}
                  options={Pickup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Pickup" />
                  )}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <DataUsageIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="usage"
                  label="Usage"
                  id="usage"
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
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
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Close Date">
                    <DatePicker
                      defaultValue={today}
                      minDate={tomorrow}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <DemoItem label="Total Days">
                  <TextField
                    size="small"
                    type="number"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "23ch" }}
                  />
                </DemoItem>
              </div>
              <div className="input">
                <div className="icone">
                  <StreamIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="request"
                  label="Request"
                  id="request"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["TimePicker", "MobileTimePicker"]}
                  >
                    <DemoItem label="Start time">
                      <MobileTimePicker defaultValue={dayjs()} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["TimePicker", "MobileTimePicker"]}
                  >
                    <DemoItem label="Close Time">
                      <MobileTimePicker defaultValue={dayjs()} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <RecentActorsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="empolyeeno"
                  label="Empolyee No"
                  id="empolyeeno"
                  variant="standard"
                />
              </div>
              <div className="input" style={{ width: "300px" }}>
                <div className="icone">
                  <CurrencyRupeeTwoToneIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="advance-paid-to-vendor"
                  label="Advance-Paid-To-Vendor"
                  id="advance-paid-to-vendor"
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <TextField
                  size="small"
                  label="Start KM"
                  type="number"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "23ch" }}
                />
              </div>
              <div className="input">
                <TextField
                  label="Close KM"
                  size="small"
                  type="number"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "23ch" }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  name="customer-code"
                  label="Customer Code"
                  id="customer-code"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
              <FontAwesomeIcon icon={faStamp} />
                </div>
                <TextField
                  name="permit"
                  label="Permit"
                  id="permit"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                <FontAwesomeIcon icon={faSquareParking} />
                </div>
                <TextField
                  name="parking"
                  label="Parking"
                  id="parking"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <TollTwoToneIcon color="action" />
                </div>
                <TextField
                  name="Toll"
                  label="Toll"
                  id="Toll"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <BackupTableSharpIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="v-permet-to-vendor"
                  label="v-permet-To-Vendor"
                  id="v-permet-to-vendor"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <MinorCrashSharpIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="vendor-toll"
                  label="Vendor-Toll"
                  id="vendor-toll"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PaymentsIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="customer-advance"
                  label="Customer-Advance"
                  id="customer-advance"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Email.map((option) => option.optionvalue)}
                  options={Email.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Email" />
                  )}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "450px" }}>
                <div className="icone">
                  <MarkChatReadIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="remark"
                  label="Remark"
                  id="remark"
                  sx={{ m: 1, width: "300ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <FormControlLabel
                  value="smsguest"
                  control={<Checkbox size="small" />}
                  label="Value & Print"
                />
              </div>
              <div className="input">
                <Button startIcon={<BorderColorIcon />} variant="outlined">
                  Edit Vehicle
                </Button>
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
        </form>
      </div>
    </div>
  );
};

export default TripSheet;
