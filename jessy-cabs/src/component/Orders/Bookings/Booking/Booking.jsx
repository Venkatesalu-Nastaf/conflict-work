import React, { useEffect, useState } from "react";
import "./Booking.css";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import Button from "@mui/material/Button";
import CommuteIcon from "@mui/icons-material/Commute";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import SellIcon from "@mui/icons-material/Sell";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import InfoIcon from "@mui/icons-material/Info";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TaxiAlertTwoToneIcon from "@mui/icons-material/TaxiAlertTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";
import AddIcCallTwoToneIcon from "@mui/icons-material/AddIcCallTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { Duty, PayType, PickUp, Report, Service_Station } from "./Booking";
import { useLocation } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

const Booking = () => {
  //// copy button

  const [displayCopy, setDisplayCopy] = useState(false);

  const handleClickShow = () => {
    setDisplayCopy(true);
  };

  const handleClickHide = () => {
    setDisplayCopy(false);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 116) {
      // F5 key code is 116
      event.preventDefault();
      setIsChecked(!isChecked);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isChecked]);
  const actions = [
    { icon: <LocalPostOfficeIcon />, name: "Email" },
    { icon: <CancelPresentationIcon />, name: "Clear" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Modify" },
    { icon: <ContentCopyIcon />, name: "Copy This", onClick: handleClickShow },
    { icon: <BookmarkAddedIcon />, name: "Add" },
  ];
  // Local Storage
  const location = useLocation();

  useEffect(() => {
    // Retrieve the previously stored actives menu item from localStorage
    const activeMenuItem = localStorage.getItem("activeMenuItem");

    // Add 'actives' class to the actives menu item if it exists
    if (activeMenuItem) {
      const menuItems = document.querySelectorAll(".menu-link");
      menuItems.forEach((item) => {
        if (item.textContent === activeMenuItem) {
          item.classList.add("actives");
        } else {
          item.classList.remove("actives");
        }
      });
    }
  }, [location]);

  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const current = new Date().getFullYear();
    const pastYear = current - 1;
    const value = `JESSY CABS ${pastYear}-${current}`;
    setCurrentYear(value);
  }, []);
  //
  const [value, setValue] = React.useState("list");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <form action="" className="booking-form">
      <span className="Title-Name">Booking</span>
      <div className="detail-container-main">
        <div className="container-left">
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <SwitchAccountIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                id="bookingno"
                label="Booking No"
                name="bookingno"
                autoFocus
              />
            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Booking Date">
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
                <DemoContainer components={["TimePicker", "MobileTimePicker"]}>
                  <DemoItem label="Booking Time">
                    <MobileTimePicker defaultValue={dayjs()} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="input-field">
            <div className="input radio">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="cancelled"
                    control={<Radio />}
                    label="Cancelled"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="input">
              <div className="icone">
                <SellIcon color="action" />
              </div>
              <TextField
                name="tripid"
                label="Trip Id"
                id="standard-size-normal"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <PermIdentityIcon color="action" />
              </div>
              <TextField
                name="customer"
                label="Customer"
                id="customer"
                variant="standard"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <HomeRepairServiceTwoToneIcon color="action" />
              </div>
              <TextField
                name="orderedby"
                label="Ordered by"
                id="orderedby"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="mobileno"
                label="Mobile No"
                id="mobileno"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AccountCircleTwoToneIcon color="action" />
              </div>
              <TextField
                name="guestname"
                label="Guest Name"
                id="guestname"
                variant="standard"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <ContactPhoneIcon color="action" />
              </div>
              <TextField
                name="guestmobileno"
                label="Guest Mobile No"
                id="guestmobileno"
                variant="standard"
              />
            </div>
            <div className="input radio">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="email"
                label="Email"
                id="email"
                variant="standard"
              />
            </div>
            <div className="input radio">
              <div className="icone">
                <RateReviewIcon color="action" />
              </div>
              <TextField
                name="employeeno"
                label="Employee No"
                id="employeeno"
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
                value={Report.map((option) => option.optionvalue)}
                options={Report.map((option) => option.Option)}
                renderInput={(params) => (
                  <TextField {...params} label="Report" />
                )}
              />
            </div>
            <div className="input">
              <div className="icone">
                <TaxiAlertTwoToneIcon color="action" />
              </div>
              <TextField
                name="vehicaltype"
                label="Vehical Type"
                id="vehicaltype"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AccountBalanceWalletTwoToneIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                value={PayType.map((option) => option.optionvalue)}
                options={PayType.map((option) => option.Option)}
                renderInput={(params) => (
                  <TextField {...params} label="Payment Type" />
                )}
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Report Date">
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
                <DemoContainer components={["TimePicker", "MobileTimePicker"]}>
                  <DemoItem label="Start Time">
                    <MobileTimePicker defaultValue={dayjs()} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "MobileTimePicker"]}>
                  <DemoItem label="RegisterTime">
                    <MobileTimePicker defaultValue={dayjs()} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <EngineeringIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                value={Duty.map((option) => option.optionvalue)}
                options={Duty.map((option) => option.Option)}
                renderInput={(params) => <TextField {...params} label="Duty" />}
              />
            </div>
            <div className="input">
              <div className="icone">
                <LocationCityIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                value={PickUp.map((option) => option.optionvalue)}
                options={PickUp.map((option) => option.Option)}
                renderInput={(params) => (
                  <TextField {...params} label="PickUp" />
                )}
              />
            </div>
            <div className="input">
              <div className="icone">
                <QrCodeIcon color="action" />
              </div>
              <TextField
                name="costcode"
                label="Cost Code"
                id="costcode"
                variant="standard"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <AppRegistrationIcon color="action" />
              </div>
              <TextField
                name="registerno"
                label="Register No"
                id="registerno"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AirplaneTicketIcon color="action" />
              </div>
              <TextField
                name="flightno"
                label="Flight No"
                id="flight"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <ForwardToInboxIcon color="action" />
              </div>
              <TextField
                name="orderbyemail"
                label="Order By Email"
                id="orederbyemail"
                variant="standard"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <FmdBadIcon color="action" />
              </div>
              <TextField
                name="remarks"
                label="Remarks"
                id="remarks"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <DomainAddIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                value={Service_Station.map((option) => option.optionvalue)}
                options={Service_Station.map((option) => option.Option)}
                renderInput={(params) => (
                  <TextField {...params} label="Service Station" />
                )}
              />
            </div>
            <div className="input">
              <div className="icone">
                <InfoIcon color="action" />
              </div>
              <TextField
                type="number"
                label="Advance"
                id="advance"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div className="container-right">
          <div className="booking-update-main">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="List" value="list" />
                    <Tab label="Billing Address" value="billingaddress" />
                    <Tab label="Email" value="email" />
                  </TabList>
                </Box>
                <TabPanel value="list">
                  <div className="booking-update">
                    <div className="booking-update-content">
                      <span className="list-update">
                        List Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Harum veniam quos laborum. Dicta suscipit voluptas
                        laboriosam rem alias praesentium, facere aliquam sed
                        iste, officia excepturi quos corporis. Facilis,
                        reiciendis et.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nostrum nihil minima debitis, nobis incidunt temporibus velit accusantium dolore assumenda iusto quod ratione praesentium maxime eveniet voluptas enim animi laudantium.
                      </span>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="billingaddress">
                  <div className="booking-update">
                    <div className="booking-update-content">
                      <form action="" style={{ margin: "-10px" }}>
                        <div className="input-field billing">
                          <div className="input">
                            <div className="icone">
                              <PermIdentityIcon color="action" />
                            </div>
                            <TextField
                              margin="normal"
                              size="small"
                              name="nameupdate"
                              label="Name"
                              id="name"
                              autoFocus
                            />
                          </div>
                          <div className="input">
                            <div className="icone">
                              <AddHomeWorkIcon color="action" />
                            </div>
                            <TextField
                              margin="normal"
                              size="small"
                              id="streetnameupdate"
                              label="No.Street Name"
                              name="address"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="input-field billing">
                          <div className="input">
                            <div className="icone">
                              <HomeTwoToneIcon color="action" />
                            </div>
                            <TextField
                              name="addressupdate"
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
                              name="cityupdate"
                              label="City"
                              id="cityupdate"
                              variant="standard"
                            />
                          </div>
                        </div>
                        <div className="input-field billing">
                          <Button
                            color="primary"
                            disabled={false}
                            onClick={function() {}}
                            size="md"
                            variant="outlined"
                          >
                            Update Address
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="email">
                  <div className="booking-update">
                    <div className="booking-update-content">Email</div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <div className="inpu-field">
            <div className="input">
              <FormControlLabel
                value="vehicleconfirm"
                control={<Checkbox size="small" />}
                label="Vehicle Confirm"
                labelPlacement="right"
                onChange={handleCheckboxChange}
              />
              <FormControlLabel
                value="vehiclechanges"
                control={<Checkbox size="small" />}
                label="Vehicle Changes"
                labelPlacement="right"
              />
            </div>
            <div className="input">
              <FormControlLabel
                value="guestsms"
                control={<Checkbox size="small" />}
                label="Guest SMS"
                labelPlacement="right"
              />
              <FormControlLabel
                value="bookingsms"
                control={<Checkbox size="small" />}
                label="Booking SMS"
                labelPlacement="right"
              />
              <FormControlLabel
                value="sendemail"
                control={<Checkbox size="small" />}
                label="Send Email"
                labelPlacement="right"
              />
            </div>
            <div className="input">
              <TextField
                margin="normal"
                size="small"
                id="usage"
                label="Usage"
                name="useage"
                autoFocus
              />
            </div>
          </div>
          <div className={`copy-item ${displayCopy ? "block" : "none"}`}>
            <div className="input-field">
              <div className="input" style={{ width: "300px" }}>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  value={currentYear}
                  options={[currentYear]}
                  renderInput={(params) => (
                    <TextField {...params} label="Fin Years" />
                  )}
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="bookingno"
                  label="Booking No"
                  name="bookingno"
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Trip Date">
                    <DatePicker
                      size="small"
                      defaultValue={today}
                      minDate={tomorrow}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["TimePicker", "MobileTimePicker"]}
                  >
                    <DemoItem size="small" label="Trip Time">
                      <MobileTimePicker defaultValue={dayjs()} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field">
              <div className="input-btn">
                <span onClick={handleClickHide} className="btn">
                  Hide
                </span>
                <span className="btn">Copy</span>
              </div>
            </div>
          </div>
          <div className="inpu-field">
            <div className="input radio">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Email
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Local"
                    control={<Radio />}
                    label="Local"
                  />
                  <FormControlLabel
                    value="service"
                    control={<Radio />}
                    label="Service"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="input">
              <Button
                color="primary"
                disabled={false}
                onClick={function() {}}
                size="md"
                variant="outlined"
              >
                Attach File
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isChecked ? (
        <div className="vehicle-confirm">
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <AirportShuttleIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                value={Duty.map((option) => option.optionvalue)}
                options={Duty.map((option) => option.Option)}
                renderInput={(params) => (
                  <TextField {...params} label="Hire Types" />
                )}
              />
            </div>
            <div className="input">
              <div className="icone">
                <AltRouteIcon color="action" />
              </div>
              <TextField
                name="travelsname"
                label="Travels Name"
                id="travelsname"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <CarCrashIcon color="action" />
              </div>
              <TextField
                name="vehicleregisterno"
                label="Vehicle Register No"
                id="vehicleregisterno"
                variant="standard"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <CommuteIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="free-solo-demo"
                freeSolo
                value={Duty.map((option) => option.optionvalue)}
                options={Duty.map((option) => option.Option)}
                renderInput={(params) => (
                  <TextField {...params} label="Vehicle Module" />
                )}
              />
            </div>
            <div className="input">
              <div className="icone">
                <NoCrashIcon color="action" />
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
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="driverphone"
                label="Driver Phone"
                id="driverphone"
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="travelsemail"
                label="Travels Email"
                id="travelsemail"
                variant="standard"
              />
            </div>
          </div>
        </div>
      ) : null}
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
              onClick={action.onClick}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </form>
  );
};

export default Booking;
