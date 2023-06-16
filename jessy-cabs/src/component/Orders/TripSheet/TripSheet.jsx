import React from "react";
import {
  Apps,
  VehicleRate,
  Status,
  HireTypes,
  Department,
  DocumentType,
  Duty,
  Pickup,
  Email,
  Select,
} from "./TripSheetdata";
import "./TripSheet.css";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TabPanel from "@mui/joy/TabPanel";
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
import InputAdornment from "@mui/material/InputAdornment";
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
import EditNoteIcon from "@mui/icons-material/EditNote";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStamp } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

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
import { DataGrid } from "@mui/x-data-grid";
// UpdateTbaleRowsGPSSlider TABLE START
const UpdateTbaleColumnsGPSSlider = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "attachname", headerName: "Attach Name", width: 130 },
  { field: "attachpath", headerName: "Attach Path", width: 130 },
  { field: "tripid", headerName: "Trip ID", width: 90 },
];
const UpdateTbaleRowsGPSSlider = [
  {
    id: 1,
    attachname: 1,
    attachpath: "Employee 1",
    tripid: "John Doe",
  },
  {
    id: 2,
    attachname: 2,
    attachpath: "Band 2",
    tripid: "Employee 2",
  },
  // Add more rows as needed
];
// UpdateTbaleRowsGPSSlider TABLE END

// Update Table
const UpdateTbaleColumns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "document", headerName: "Document", width: 130 },
  { field: "documentname", headerName: "Document Name", width: 130 },
  { field: "filename", headerName: "File Name", width: 90 },
];

const UpdateTbaleRows = [
  {
    id: 1,
    document: 1,
    documentname: "Employee 1",
    filename: "John Doe",
  },
  {
    id: 2,
    document: 2,
    documentname: "Band 2",
    filename: "Employee 2",
  },
  // Add more rows as needed
];
// UPDATE TABLE END
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
            </div>
            <div className="input-field">
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
              <div className="input radio">
                <FormControlLabel
                  value="GPS"
                  control={<Checkbox size="small" />}
                  label="GPS"
                />
              </div>
            </div>
            <div className="input-field">
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
              <div className="input">
                <div className="icone">
                  <StreamIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="request"
                  label="Request"
                  id="request"
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
                <div className="icone">
                  <CalendarMonthIcon color="action" />
                </div>
                <DemoItem>
                  <TextField
                    label="Total Days"
                    size="small"
                    type="number"
                    id="outlined-start-adornment"
                  />
                </DemoItem>
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
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="customer-code"
                  label="Customer Code"
                  id="customer-code"
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
          <div className="Tipsheet-content-table-main">
            <Tabs
              size="sm"
              aria-label="Pricing plan"
              defaultValue={0}
              sx={(theme) => ({
                width: "100%",
                height: "330px",
                "--Tabs-gap": "0px",
                borderRadius: "lg",
                boxShadow: "sm",
                overflow: "auto",
                border: `2px solid #ccc`,
              })}
            >
              <TabList
                sx={{
                  "--ListItem-radius": "0px",
                  borderRadius: 0,
                  [`& .${tabClasses.root}`]: {
                    fontWeight: "lg",
                    flex: 1,
                    bgcolor: "background.body",
                    position: "relative",
                    [`&.${tabClasses.selected}`]: {
                      color: "primary.500",
                    },
                    [`&.${tabClasses.selected}:before`]: {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      bottom: -1,
                      width: "100%",
                      height: 2,
                      bgcolor: "primary.400",
                    },
                    [`&.${tabClasses.focusVisible}`]: {
                      outlineOffset: "-3px",
                    },
                  },
                }}
              >
                <Tab>Booking</Tab>
                <Tab>Vendor Info</Tab>
                <Tab>Vendor Bill</Tab>
                <Tab>Customer Bill</Tab>
                <Tab>Alert</Tab>
                <Tab>GPS Att</Tab>
                <Tab>Message</Tab>
              </TabList>
              <TabPanel value={0} sx={{ p: 2 }}>
                <div className="Customer-Booking-Slider">
                  <div className="input-field">
                    <div className="input" style={{ width: "200px" }}>
                      <Button
                        variant="outlined"
                        sx={{
                          bgcolor: "#9fed64",
                          color: "#fff",
                          border: `2px solid #fff`,
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "#9fed64",
                            border: `2px solid #9fed64`,
                          },
                        }}
                      >
                        SMS Waiting
                      </Button>
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button
                        variant="outlined"
                        sx={{
                          bgcolor: "#ed6464",
                          color: "#fff",
                          border: `2px solid #fff`,
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "#ed6464",
                            border: `2px solid #ed6464`,
                          },
                        }}
                      >
                        Failed
                      </Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faFolderOpen} size="lg" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={DocumentType.map((option) => option.optionvalue)}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField {...params} label="Document Type" />
                        )}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faFileLines} size="lg" />
                      </div>
                      <TextField
                        name="document-notes"
                        label="Document Notes"
                        id="document-notes"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="outlined">Select</Button>
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="contained">Refresh</Button>
                    </div>
                  </div>
                  <div className="table-TripSheet">
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={UpdateTbaleRows}
                        columns={UpdateTbaleColumns}
                        pageSize={5}
                        checkboxSelection
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={1} sx={{ p: 2 }}>
                <div className="Customer-Vendor-Info-Slider">
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faSuitcaseRolling} size="lg" />
                      </div>
                      <TextField
                        name="Vendor-Trip-No"
                        label="Vendor Trip No"
                        id="Vendor-Trip-No"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "250px" }}>
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
                          <TextField
                            {...params}
                            label="Vehicle"
                            variant="standard"
                            sx={{ m: 1, width: "25ch" }}
                          />
                        )}
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
                          <TextField
                            {...params}
                            label="Duty"
                            variant="standard"
                          />
                        )}
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
                      <div className="icone">
                        <CalendarMonthIcon color="action" />
                      </div>
                      <DemoItem>
                        <TextField
                          label="Total Days"
                          size="small"
                          type="number"
                          id="outlined-start-adornment"
                        />
                      </DemoItem>
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        value="lock"
                        control={<Checkbox size="small" />}
                        label="Lock"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["TimePicker", "MobileTimePicker"]}
                        >
                          <DemoItem>
                            <MobileTimePicker
                              defaultValue={dayjs()}
                              label="Start time"
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["TimePicker", "MobileTimePicker"]}
                        >
                          <DemoItem>
                            <MobileTimePicker
                              defaultValue={dayjs()}
                              label="Close Time"
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faStopwatch} size="lg" />
                      </div>
                      <TextField
                        margin="normal"
                        size="small"
                        name="total-time"
                        label="Total Time"
                        id="total-time"
                        variant="standard"
                      />
                    </div>
                    <div className="input">
                      <Button>Billing</Button>
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
                        <FontAwesomeIcon icon={faRoad} size="lg" />
                      </div>
                      <TextField
                        name="total-km"
                        label="Total KM"
                        id="total-km"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <EditNoteIcon color="action" />
                      </div>
                      <TextField
                        name="remark"
                        label="Remarks"
                        id="remark"
                        variant="standard"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      </div>
                      <TextField
                        name="car-amount"
                        label="Car Amount"
                        id="car-amount"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="outlined">Update</Button>
                    </div>
                    <div className="input" style={{ width: "250px" }}>
                      <Button variant="contained">Update Vendor Advance</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "250px" }}>
                      <Button>Click Here Load Original</Button>
                    </div>
                    <div className="input">
                      <p style={{ "font-weigh": "500" }}>
                        Give What Is The Status Of Trip Sheet
                      </p>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={2} sx={{ p: 2 }}>
                <div className="Customer-Vendor-Bill-Slider">
                  <div className="input-field">
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faRoad} size="lg" />
                      </div>
                      <TextField
                        name="min-km"
                        label="Min.Km"
                        id="min-km"
                        size="small"
                      />
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 5px" }}
                      >
                        <FontAwesomeIcon icon={faStopwatch} size="lg" />
                      </div>
                      <TextField
                        name="min-hrs"
                        label="Min.Hrs"
                        id="min-hrs"
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <div className="icone">
                        <Inventory2Icon color="action" />
                      </div>
                      <TextField
                        name="package"
                        label="Package"
                        id="package"
                        size="small"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faRoad} />
                      </div>
                      <TextField
                        name="ex-km"
                        label="Ex.Km"
                        id="ex-km"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faStopwatch} />
                      </div>
                      <TextField
                        name="ex-Hrs"
                        label="Ex.Hrs"
                        id="ex-Hrs"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faCloudMoon} />
                      </div>
                      <TextField
                        name="night"
                        label="Night"
                        id="night"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      </div>
                      <TextField
                        name="driver-convenience"
                        label="Driver Convenience"
                        id="driver-convenience"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="outlined">Uplock</Button>
                    </div>
                    <div className="input" style={{ width: "90px" }}>
                      <Button variant="contained">Update</Button>
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{ padding: "0px 10px 0px 10px" }}
                      >
                        <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg" />
                      </div>
                      <TextField
                        name="net-amount"
                        size="small"
                        label="Net Amount"
                        id="net-amount"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField
                        type="number"
                        label="Veh.Commission"
                        size="small"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "25ch" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div className="input">
                      <TextField
                        name="car-amount"
                        size="small"
                        label="Car Amount"
                        id="car-amount"
                      />
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        value="manual-bills"
                        control={<Checkbox size="small" />}
                        label="Manual Bills"
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={3} sx={{ p: 2 }}>
                <div className="Customer-Customer-Bill-Slider">
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <div className="icone">
                        <Inventory2Icon color="action" />
                      </div>
                      <TextField
                        name="pack"
                        label="Pack"
                        id="pack"
                        size="small"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faRoad} />
                      </div>
                      <TextField
                        name="ex-km"
                        label="Ex.Km"
                        id="ex-km"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faStopwatch} />
                      </div>
                      <TextField
                        name="ex-Hrs"
                        label="Ex.Hrs"
                        id="ex-Hrs"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faCloudMoon} />
                      </div>
                      <TextField
                        name="night"
                        label="Night"
                        id="night"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                      </div>
                      <TextField
                        name="driver-convenience"
                        label="Driver Convenience"
                        id="driver-convenience"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="amount"
                        size="small"
                        label="Amount"
                        id="amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField
                        name="rud"
                        label="Rud"
                        id="rud"
                        size="small"
                        variant="standard"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="net-amount"
                        size="small"
                        label="Net Amount"
                        id="net-amount"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "186px" }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faTags} />
                      </div>
                      <TextField
                        name="discount"
                        label="Discount"
                        id="discount"
                        size="small"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "187px" }}>
                      <div className="icone">
                        <TollTwoToneIcon color="action" />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faEquals} />
                      </div>
                      <TextField
                        name="on"
                        size="small"
                        label="On"
                        id="on"
                        variant="standard"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input radio">
                      <FormControlLabel
                        value="manual-bills"
                        control={<Checkbox size="small" />}
                        label="Manual Bills"
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <AccountBalanceWalletIcon color="action" />
                      </div>
                      <TextField
                        name="balance"
                        size="small"
                        label="Balance"
                        id="balance"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <TextField size="small" variant="standard" />
                    </div>
                    <div className="input">
                      <div
                        className="icone"
                        style={{
                          padding: "0px 10px 0px 0px",
                          "font-size": "20px",
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </div>
                      <TextField size="small" variant="standard" />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={4} sx={{ p: 2 }}>
                <div className="Customer-Alert-Slider">
                  <div className="input-field">
                    <div className="input">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="FC">
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
                        <DemoItem label="Tax Date">
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
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Ins">
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
                        <DemoItem label="St.Permit">
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
                    <div className="input" style={{ width: "390px" }}>
                      <TextField
                        name="maintenance-type"
                        label="Maintenance Type"
                        id="maintenance-type"
                        size="small"
                        sx={{ m: 1, width: "60ch" }}
                      />
                    </div>
                    <div className="input">
                      <TextField
                        name="kilometer"
                        size="small"
                        label="Kilometer"
                        id="kilometer"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "390px" }}>
                      <TextField size="small" sx={{ m: 1, width: "60ch" }} />
                    </div>
                    <div className="input">
                      <TextField size="small" />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <EngineeringIcon color="action" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={Select.map((option) => option.optionvalue)}
                        options={Select.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField {...params} label="Select" />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={5} sx={{ p: 2 }}>
                <div className="Customer-Gps-att-Slider">
                  <div className="input-field">
                    <div className="input">
                      <Button>View GPS TripSheet</Button>
                    </div>
                    <div className="input">
                      <Button>View GPS Map</Button>
                    </div>
                    <div className="input">
                      <Button>View GPS Log</Button>
                    </div>
                    <div className="input">
                      <Button>View Closing</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faFolderOpen} size="lg" />
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        value={DocumentType.map((option) => option.optionvalue)}
                        options={DocumentType.map((option) => ({
                          label: option.option,
                        }))}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => (
                          <TextField {...params} label="Document Type" />
                        )}
                      />
                    </div>
                    <div className="input">
                      <div className="icone">
                        <FontAwesomeIcon icon={faFileLines} size="lg" />
                      </div>
                      <TextField
                        name="on"
                        size="document-notes"
                        label="Document Notes"
                        id="document-notes"
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "220px" }}>
                      <Button variant="contained">Select File & Upload</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input" style={{ width: "400px" }}>
                      <div className="icone">
                        <MarkChatReadIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        sx={{ m: 1, width: "300ch" }}
                        variant="standard"
                      />
                    </div>
                    <div className="input">
                      <Button>Refresh</Button>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="input">
                      <Button>Manual Marking</Button>
                    </div>
                    <div className="input">
                      <Button>Delete GPS Log</Button>
                    </div>
                    <div className="input radio">
                      <FormControlLabel
                        value="reload"
                        control={<Checkbox size="small" />}
                        label="Reload"
                      />
                    </div>
                  </div>
                  <div className="table-TripSheet">
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={UpdateTbaleRowsGPSSlider}
                        columns={UpdateTbaleColumnsGPSSlider}
                        pageSize={5}
                        checkboxSelection
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={6} sx={{ p: 2 }}>
                <div className="Customer-Message-Slider">
                  <div className="input-field">
                    <div className="input" style={{ "padding-right": "300px" }}>
                      <Button>Manual Marking</Button>
                    </div>
                    <div className="input" style={{ width: "300px" }}>
                      <div className="icone">
                        <MarkChatReadIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        sx={{ m: 1, width: "300ch" }}
                        variant="standard"
                      />
                    </div>
                    <div className="input" style={{ width: "50px" }}>
                      <IconButton color="primary" aria-label="delete">
                        <WhatsAppIcon
                          fontSize="inherit"
                          sx={{ color: "#47dc53" }}
                        />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripSheet;
