import React, { useState } from 'react';
import './FuelDetails.css'
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailIcon from '@mui/icons-material/Email';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import BadgeIcon from "@mui/icons-material/Badge";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "jspdf-autotable";
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


// TABLE


const FuelDetails = () => {

  const [initialOdometer, setInitialOdometer] = useState(0);
  const [finalOdometer, setFinalOdometer] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState(0);
  const [mileage, setMileage] = useState(0);

  const calculateMileage = () => {
    const distance = finalOdometer - initialOdometer;
    const mileageValue = distance / fuelConsumption;
    setMileage(mileageValue);
  };

  // TABLE

  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "VehicleNo", headerName: "Vehicl eNo", width: 130 },
    { field: "VehicleName", headerName: "Vehicle Name", width: 130 },
    { field: "FillDate", headerName: "Fill Date", width: 130 },
    { field: "Emptydate", headerName: "Empty Date", width: 150 },
    { field: "DriverName", headerName: "Driver Name", width: 130 },
    { field: "InitialMeterReading", headerName: "Initial Odometer Reading", width: 130 },
    { field: "FinalMeterReading", headerName: "Final Odometer Reading", width: 130 },
    { field: "FuelConsumptionInLiters", headerName: "Fuel Consumption (in liters)", width: 130 },
  ];

  const rows = [
    {
      id: 1,
      VehicleNo: 1,
      VehicleName: "2023-06-07",
      FillDate: "2023-06-07",
      Emptydate: "9:00 AM",
      DriverName: 600,
      InitialMeterReading: 600,
      FinalMeterReading: 600,
      FuelConsumptionInLiters: 600,

    },
    {
      id: 2,
      VehicleNo: 2,
      VehicleName: "2023-06-07",
      FillDate: "2023-06-08",
      Emptydate: "7:00 PM",
      DriverName: 500,
      InitialMeterReading: 600,
      FinalMeterReading: 600,
      FuelConsumptionInLiters: 600,

    },
  ];

  return (
    <div className="form-container">
      <div className="FuelDetails-form">
        <form >
          <span className="Title-Name">Mailage Details</span>
          <div className="FuelDetails-page-header">
            <div className="detailsFuel">
              <div className="input-field">
                <div className="input" >
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleNo"
                    label="Vehicle No"
                    name="VehicleNo"
                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="VehicleName"
                    label="Vehicle Name"
                    name="VehicleName"
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fill Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="filldate"
                          inputRef={params.inputRef}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Empty Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="emptydate"
                          inputRef={params.inputRef}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <div className="input" >
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="DriverName"
                    label="Driver Name"
                    name="DriverName"
                  />
                </div>
                <div className="input" style={{ width: "250px" }}>
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="InitialOdometerReading"
                    label="Initial Odometer Reading"
                    name='InitialOdometerReading'
                    sx={{ width: "250px" }}
                    value={initialOdometer} onChange={(e) => setInitialOdometer(e.target.value)}
                    variant="standard"
                  />
                </div>
                <div className="input" style={{ width: "250px" }}>
                  <div className="icone">
                    <PermIdentityIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="FinalOdometerReading"
                    label="Final Odometer Reading"
                    sx={{ width: "250px" }}
                    name="FinalOdometerReading"
                    type="number" value={finalOdometer} onChange={(e) => setFinalOdometer(e.target.value)}
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "250px" }}>
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="FuelConsumptioninliters"
                    label="Fuel Consumption (in liters)"
                    sx={{ width: "250px" }}
                    name="FuelConsumptioninliters"
                    type="number" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)}
                    variant="standard"
                  />
                </div>
                <div className="input" >
                  <Button color="primary" variant="outlined" onClick={calculateMileage}>
                    Calculate Mileage
                  </Button>
                </div>
                <div className="input" style={{ width: "70px" }}>
                  <Button color="primary" variant="contained" onClick={calculateMileage}>
                    Add
                  </Button>
                </div>
              </div>

            </div>
            <div>
              <h2>Mileage: </h2> <p>{mileage.toFixed(2)} km/L</p>
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
            <div className="Download-btn">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                      Download
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>Excel</MenuItem>
                      <MenuItem >PDF</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <div className="table-bookingCopy-Employe">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                />
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  )
}

export default FuelDetails