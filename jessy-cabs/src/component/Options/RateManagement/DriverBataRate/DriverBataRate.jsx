import React from 'react'
import "./DriverBataRate.css";
import { VehicleType, Duty } from "./DriverBataRateData.js";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';


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

// Table
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "VehicleType", headerName: "Vehicle Type", width: 130 },
  { field: "Duty", headerName: "Duty", width: 130 },
  { field: "Hours", headerName: "Hours", width: 130 },
  { field: "KMS", headerName: "KMS", width: 130 },
  { field: "Rate", headerName: "Rate", width: 130 },
  { field: "PerHours", headerName: "PerHours", width: 130 },
  { field: "PerKMS", headerName: "PerKMS", width: 130 },
  { field: "ExtraHours", headerName: "ExtraHours", width: 130 },
  { field: "ExtraKMS", headerName: "ExtraKMS", width: 130 },
  { field: "ChTime", headerName: "ChTime", width: 130 },
  { field: "AllowKMS", headerName: "AllowKMS", width: 130 },
  { field: "ChKMS", headerName: "ChKMS", width: 130 },
  { field: "Batta", headerName: "Batta", width: 130 },
  { field: "NightHalt", headerName: "NightHalt", width: 130 },
  { field: "RateID", headerName: "RateID", width: 130 },
];

const rows = [
  {
    id: 1,
    VehicleType: 1,
    Duty: 13,
    Hours: "2023-06-08",
    KMS: 11,
    Rate: "7:00 PM",
    PerHours: "7:00 PM",
    PerKMS: "7:00 PM",
    ExtraHours: "7:00 PM",
    ExtraKMS: "7:00 PM",
    ChTime: "7:00 PM",
    AllowKMS: "7:00 PM",
    ChKMS: "7:00 PM",
    Batta: "7:00 PM",
    NightHalt: "7:00 PM",
    RateID: 1233,
  },
  {
    id: 2,
    VehicleType: 2,
    Duty: 13,
    Hours: "2023-06-08",
    KMS: 11,
    Rate: "7:00 PM",
    PerHours: "7:00 PM",
    PerKMS: "7:00 PM",
    ExtraHours: "7:00 PM",
    ExtraKMS: "7:00 PM",
    ChTime: "7:00 PM",
    AllowKMS: "7:00 PM",
    ChKMS: "7:00 PM",
    Batta: "7:00 PM",
    NightHalt: "7:00 PM",
    RateID: 1234,
  },
];

const DriverBataRate = () => {
  return (
    <div className="ratetype-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-DriverBataRate">
              <div className="input-field">
                <div className="input" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="From Date" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="To Date" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "300px" }}>
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={VehicleType.map((option) => option.optionvalue)}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Vehicle Type" />
                    )}
                  />
                </div>
                <div className="input" style={{ width: "111px" }}>
                  <Button variant="contained">Show</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "200px" }}>
                  <div className="icone">
                    <EngineeringIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
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
                <div className="input" style={{ width: "111px" }}>
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraHours"
                    name="ExtraHours"
                  />
                </div>
                <div className="input" style={{ width: "111px" }}>
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraDays"
                    name="ExtraDays"
                  />
                </div>
                <div className="input" style={{ width: "135px" }}>
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraPerHoursPrice"
                    name="ExtraPerHoursPrice"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="input" style={{ width: "125px" }}>
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="ExtraPerDayPrice"
                    name="ExtraPerDayPrice"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="input" style={{ width: "111px" }}>
                  <TextField
                    type='number'
                    size="small"
                    id="id"
                    label="Bata"
                    name="Bata"
                  />
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
        <div className="table-bookingCopy-DriverBataRate">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default DriverBataRate