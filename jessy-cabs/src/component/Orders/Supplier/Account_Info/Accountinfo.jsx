import React from "react";
import "./Accountinfo.css";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import IconButton from "@mui/material/IconButton";
import DescriptionIcon from "@mui/icons-material/Description";
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
  const [value, setValue] = React.useState("list");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <form action="">
        <span className="Title-Name">Accounting Info</span>
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
              name="accountno"
              autoFocus
            />
          </div>
          <div className="input">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="DatePicker">
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
              <MinorCrashIcon color="action" />
            </div>
            <TextField
              name="vehicle_travels"
              label="Vehicle/Travels"
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
              id="address1"
              label="Address 1"
              name="address1"
              autoFocus
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
          <div className="input">
            <div className="icone">
              <PermIdentityIcon color="action" />
            </div>
            <TextField
              name="cperson"
              label="C Person"
              id="cperson"
              variant="standard"
            />
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
              <ContactPhoneIcon color="action" />
            </div>
            <TextField
              name="phone"
              label="Phone"
              id="phone"
              variant="standard"
            />
          </div>
          <div className="input">
            <TextField
              type="number"
              label="Veh.Commission"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="input-field">
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
          <div className="input radio">
            <FormControlLabel
              value="Printbill"
              control={<Checkbox size="small" />}
              label="Rate"
            />
          </div>
          <div className="input radio">
            <Autocomplete
              fullWidth
              id="free-solo-demo"
              freeSolo
              value={Undergroup.map((option) => option.optionvalue)}
              options={Undergroup.map((option) => ({ label: option.Option }))}
              getOptionLabel={(option) => option.label || ""}
              renderInput={(params) => (
                <TextField {...params} label="Under Group" />
              )}
            />
          </div>
        </div>
        <div className="input-field">
          <div className="input">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Is Runing
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
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
              id="standard-size-normal"
              variant="standard"
            />
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
                <FormControlLabel value="Dr" control={<Radio />} label="Dr" />
                <FormControlLabel value="Cr" control={<Radio />} label="Cr" />
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
              value={Vehicleinfo.map((option) => option.optionvalue)}
              options={Vehicleinfo.map((option) => ({ label: option.Option }))}
              getOptionLabel={(option) => option.label || ""}
              renderInput={(params) => (
                <TextField {...params} label="Vehicle Info" />
              )}
            />
          </div>
          <div className="input">
            <FormControlLabel
              value="Printbill"
              control={<Checkbox size="small" />}
              label="Auto Refreash"
            />
          </div>
        </div>

        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            // hidden={hidden}
            icon={<SpeedDialIcon />}
            // direction={direction}
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
      <div className="textbox">
        <div className="textboxlist">
          <div>
          <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="List" value="list" />
            <Tab label="Online Password" value="online_password" />
          </TabList>
        </Box>
        <TabPanel value="list">List</TabPanel>
        <TabPanel value="online_password">Online Password</TabPanel>
      </TabContext>
    </Box>
          </div>
        </div>
        <div className="textboxupdate">
          <div className="textbox-container">
            <div className="icon">
              <IconButton aria-label="delete">
                <DescriptionIcon />
              </IconButton>
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accuntinfo;
