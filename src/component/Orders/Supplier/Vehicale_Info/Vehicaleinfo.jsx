import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Vehicaleinfo.css";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { FaMoneyBillWave } from "react-icons/fa";
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CommuteIcon from "@mui/icons-material/Commute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import ChecklistIcon from "@mui/icons-material/Checklist";
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
const Vehicaleinfo = () => {
  const [book, setBook] = useState({
    vehicleId: '',
    doadate: '',
    vehRegNo: '',
    costCenter: '',
    vehType: '',
    yearModel: '',
    owner: '',
    mobileNo: '',
    fcdate: '',
    taxdate: '',
    npdate: '',
    insdate: '',
    stpermit: '',
    duedate: '',
    financer: '',
    avgmileage: '',
    routeno: '',
    driverName: '',
    dueAmount: '',
    tankCap: '',
    remarks: '',
    OwnerType: '',
    active: '',
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/vehicleinfo', book);
      console.log(book);
      navigate('/home/orders/supplier');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="vehicale-form">
      <form onSubmit={handleClick}>
        <span className="Title-Name">Vehicle Info</span>
        <div className="detail-container-main-vehicale">
          <div className="container-left-vehicale">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <MinorCrashIcon color="action" />
                </div>
                <TextField
                  name="vehicleId"
                  autoComplete="new-password"
                  onChange={handleChange}
                  label="Vehicle ID"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="D.O.A Date">
                    <DatePicker
                      name="doadate"
                      defaultValue={today}
                      minDate={tomorrow}
                      autoComplete="new-password"
                      onChange={handleChange}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <CarCrashIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="veh_reg_no"
                  label="Veh.Reg.No"
                  name="vehRegNo"
                  autoComplete="new-password"
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PriceChangeIcon color="action" />
                </div>
                <TextField
                  name="costCenter"
                  label="Cost Center"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CommuteIcon color="action" />
                </div>
                <TextField
                  name="vehType"
                  label="Veh.Type"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="veh_type"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AssessmentIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="year_model"
                  value={"2012"}
                  name="yearModel"
                  label="Year Model"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <EmojiTransportationIcon color="action" />
                </div>
                <TextField
                  name="owner"
                  autoComplete="new-password"
                  onChange={handleChange}
                  label="Owner"
                  id="owner"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="mobileNo"
                  autoComplete="new-password"
                  onChange={handleChange}
                  label="Mobile No"
                  id="mobile_no"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="FC Date">
                    <DatePicker
                      name="fcdate"
                      defaultValue={today}
                      minDate={tomorrow}
                      autoComplete="new-password"
                      onChange={handleChange}
                      views={["day", "month", "year"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input radio">
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Tax Date">
                      <DatePicker
                        name="taxdate"
                        defaultValue={today}
                        minDate={tomorrow}
                        autoComplete="new-password"
                        onChange={handleChange}
                        views={["day", "month", "year"]}
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input radio">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="NP Date">
                    <DatePicker
                      name="npdate"
                      defaultValue={today}
                      minDate={tomorrow}
                      autoComplete="new-password"
                      onChange={handleChange}
                      views={["day", "month", "year"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Ins.Date">
                    <DatePicker
                      name="insdate"
                      defaultValue={today}
                      minDate={tomorrow}
                      autoComplete="new-password"
                      onChange={handleChange}
                      views={["day", "month", "year"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input radio">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="St.Permit">
                    <DatePicker
                      name="stpermit"
                      defaultValue={today}
                      minDate={tomorrow}
                      autoComplete="new-password"
                      onChange={handleChange}
                      views={["day", "month", "year"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input radio">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Due Date">
                    <DatePicker
                      name="duedate"
                      defaultValue={today}
                      minDate={tomorrow}
                      autoComplete="new-password"
                      onChange={handleChange}
                      views={["day", "month", "year"]}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  name="financer"
                  label="Financer"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="financer"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <SpeedIcon color="action" />
                </div>
                <TextField
                  name="avgmileage"
                  label="AVG Mileage"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="avgmileage"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AltRouteIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="routeno"
                  label="Route No"
                  id="routeno"
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AirlineSeatReclineExtraIcon color="action" />
                </div>
                <TextField
                  name="driverName"
                  label="Driver Name"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="driver_name"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FaMoneyBillWave color="action" />
                </div>
                <TextField
                  name="dueAmount"
                  label="Due Amount"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="due_amount"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="tankCap"
                  label="Tank Cap"
                  id="tank_cap"
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AutoModeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="remarks"
                  label="Remarks"
                  id="remarks"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AssignmentIndTwoToneIcon color="action" />
                </div>
                <TextField
                  name="OwnerType"
                  label="owner_Type"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="owner_type"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
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
              <div className="input">
                <Button variant="outlined" startIcon={<SummarizeTwoToneIcon />}>
                  list
                </Button>
              </div>
            </div>
            <Button type="submit">Add</Button>
            {error && <p>Something went wrong!</p>}

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
          </div>

          <div className="container-right-vehicale">
            <div className="textbox">
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
                  </span>
                </div>
              </div>
              <div className="textboxupdate">
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Vehicaleinfo;
