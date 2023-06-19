import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Accountinfo.css";
import Button from "@mui/material/Button";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import IconButton from "@mui/material/IconButton";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
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
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import InputAdornment from "@mui/material/InputAdornment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import StoreIcon from "@mui/icons-material/Store";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { Undergroup, Vehicleinfo } from "./Accountinfo";
import SpeedDial from "@mui/material/SpeedDial";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
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

const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];
const Accuntinfo = () => {
  const [value] = useState("list");
  const [book, setBook] = useState({
    accountNo: '',
    date: '',
    vehicleTravels: '',
    address1: '',
    cperson: '',
    streetNo: '',
    email: '',
    city: '',
    phone: '',
    vehCommission: '',
    rateType: '',
    printBill: '',
    underGroup: '',
    isRunning: '',
    entity: '',
    acType: '',
    vehicleInfo: '',
    autoRefresh: '',
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/accountinfo', book);
      console.log(book);
      navigate('/home/orders/supplier');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const listItems = ["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id."]; // Example data for list items
  const updateItems = ["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id.    "]; // Example data for update items


  return (
    <div className="account-form">
      <form onSubmit={handleClick}>
        <span className="Title-Name">Accounting Info</span>
        <div className="detail-container-main-account">
          <div className="container-left-account">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="accountno"
                  label="Account No"
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="accountNo"
                  autoFocus
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="DatePicker">
                    <DatePicker
                      name="date"
                      defaultValue={today}
                      minDate={tomorrow}
                      autoComplete="new-password"
                      onChange={handleChange}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <MinorCrashIcon color="action" />
                </div>
                <TextField
                  name="vehicleTravels"
                  label="Vehicle/Travels"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "400px" }}>
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="address1"
                  autoComplete="off"
                  onChange={handleChange}
                  label="Address"
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">

                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  name="cperson"
                  label="C Person"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="cperson"
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
                  name="streetNo"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  label="Email"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="standard-size-normal"
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
                  autoComplete="new-password"
                  onChange={handleChange}
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="phone"
                  label="Phone"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="phone"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <TextField
                  name="vehCommission"
                  type="number"
                  label="Veh.Commission"
                  autoComplete="new-password"
                  onChange={handleChange}
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
                <div className="icone">
                  <RateReviewIcon color="action" />
                </div>
                <TextField
                  name="rateType"
                  label="Rate Type"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <FormControlLabel
                  name="printBill"
                  value="Printbill"
                  autoComplete="new-password"
                  onChange={handleChange}
                  control={<Checkbox size="small" />}
                  label="Rate"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input radio">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Undergroup.map((option) => option.optionvalue)}
                  options={Undergroup.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Under Group" name="underGroup" autoComplete="new-password"
                      onChange={handleChange} />
                  )}
                />
              </div>
              <div className="input">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Is Runing
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="isRunning"
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
                <div className="icone">
                  <StoreIcon color="action" />
                </div>
                <TextField
                  name="entity"
                  label="Opening Balance"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    A/C Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="acType"
                    autoComplete="new-password"
                    onChange={handleChange}
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
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  value={Vehicleinfo.map((option) => option.optionvalue)}
                  options={Vehicleinfo.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Vehicle Info" name="vehicleInfo" autoComplete="new-password"
                      onChange={handleChange} />
                  )}
                />
              </div>
              <div className="input">
                <FormControlLabel
                  value="Auto_Refresh"
                  control={<Checkbox size="small" />}
                  label="Auto Refresh"
                  name="autoRefresh"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button type="submit">Add</Button>
            {error && <p>Something went wrong!</p>}


            <div className="SpeedDial" style={{ padding: '3px', }}>
              <Box sx={{ position: "relative", mt: -3, pt: 0, height: 90 }}>
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
            </div>
          </div>

          <div className="container-right-account">
            <div className="textbox-account">
              {/* <div className="textboxlist-account"> */}
              <div>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="List" value="list" />
                        <Tab label="Online Password" value="online_password" />
                      </TabList>
                    </Box>
                    <TabPanel value="list">
                      <div className="booking-update">
                        <div className="booking-update-content list-update">
                          {listItems.map((item, index) => (
                            <div className="textboxlist-customer list-update" key={`list-item-${index}`}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="online_password">
                      <div
                        className="booking-update"
                        style={{
                          position: "relative",
                        }}
                      >
                        <div
                          className="booking-update-content list-update"
                          style={{ overflow: "hidden" }}
                        >
                          <span className="temp-pass">
                            <div className="input-field">
                              <div className="input">
                                <div className="icone">
                                  <RateReviewIcon color="action" />
                                </div>
                                <TextField
                                  name="temporary_password"
                                  label="Temporary Password"
                                  id="standard-size-normal"
                                  variant="standard"
                                />
                              </div>
                            </div>
                            <div
                              className="input-field"
                              style={{ display: "block" }}
                            >
                              <div className="input">
                                <Button variant="outlined">Update</Button>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
              {/* </div> */}
            </div>
            <div className="print-excel">
              <div
                className="booking-update"
                style={{
                  position: "relative",
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                <div className="booking-update-content list-update">
                  {updateItems.map((item, index) => (
                    <div className="textboxupdate list-update" key={`update-item-${index}`}>
                      <span>{item}</span>
                    </div>
                  ))}
                  <span className="print-excel-btn">
                    <IconButton
                      aria-label="delete"
                      style={{ color: "#456ddc" }}
                    >
                      <DescriptionIcon />
                    </IconButton>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Accuntinfo;
