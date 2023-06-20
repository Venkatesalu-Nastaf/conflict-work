import React from "react";
import "./Accountinfo.css";
import Button from "@mui/material/Button";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
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
import { DataGrid } from "@mui/x-data-grid";
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
  // Table Start
  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "Supplier_Name", headerName: "Supplier_Name", width: 130 },
    { field: "Vehicle_No", headerName: "Vehicle_No", width: 130 },
    { field: "Address", headerName: "Address", width: 130 },
    { field: "Phone", headerName: "Phone", width: 90 },
    { field: "Active", headerName: "Active", width: 160 },
    { field: "Owner_Type", headerName: "Owner_Type", width: 130 },
    { field: "Percentage", headerName: "Percentage", width: 130 },
    { field: "Rate_Type", headerName: "Rate_Type", width: 130 },
    { field: "Driver_App", headerName: "Driver_App", width: 130 },
  ];

  const rows = [
    {
      id: 1,
      Supplier_Name: 1,
      Vehicle_No: "Travels",
      Address: "Address 1",
      Phone: "Employee 1",
      Active: "John Doe",
      Owner_Type: "2023-06-07",
      Percentage: 9,
      Rate_Type: "Morning",
      Driver_App: "ABC Car",
    },
    {
      id: 2,
      Supplier_Name: 2,
      Vehicle_No: "Travels",
      Address: "Address 2",
      Phone: "Employee 2",
      Active: "Jane Smith",
      Owner_Type: "2023-06-08",
      Percentage: 9,
      Rate_Type: "Evening",
      Driver_App: "XYZ Car",
    },

    // Add more rows as needed
  ];
  // Table End
  return (
    <div className="account-form">
      <form action="">
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
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  label="Email"
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
                  id="phone"
                  variant="standard"
                />
              </div>
            </div>
          </div>
          <div className="container-right-account">
            <div className="textbox-account">
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
                          <span>
                            List Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Harum veniam quos laborum. Dicta
                            suscipit voluptas laboriosam rem alias praesentium,
                            facere aliquam sed iste, officia excepturi quos
                            corporis. Facilis, reiciendis et. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Cum nostrum
                            nihil minima debitis, nobis incidunt temporibus
                            velit accusantium dolore assumenda iusto quod
                            ratione praesentium maxime eveniet voluptas enim
                            animi laudantium.
                          </span>
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
            </div>
          </div>
        </div>
        <div>
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
                  <TextField {...params} label="Under Group" />
                )}
              />
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
                  <TextField {...params} label="Vehicle Info" />
                )}
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
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                  <FormControlLabel value="Dr" control={<Radio />} label="Dr" />
                  <FormControlLabel value="Cr" control={<Radio />} label="Cr" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="input radio">
              <FormControlLabel
                value="Printbill"
                control={<Checkbox size="small" />}
                label="Rate"
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
          <div className="SpeedDial" style={{ "padding-top": "96px" }}>
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
          </div>
        </div>
        <div className="table-customer-list">
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
      </form>
    </div>
  );
};

export default Accuntinfo;
