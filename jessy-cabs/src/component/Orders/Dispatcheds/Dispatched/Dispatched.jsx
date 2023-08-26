import React from 'react'
import dayjs from "dayjs";
import "./Dispatched.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Stations } from "./DispatchedData.js";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "BookingId", headerName: "Booking Id", width: 130 },
  { field: "TripId", headerName: "Trip Id", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "Time", headerName: "Time", width: 130 },
  { field: "UserName", headerName: "User Name", width: 130 },
  { field: "ComapnyName", headerName: "Comapny Name", width: 130 },
  { field: "RAddress", headerName: "R Address", width: 130 },
  { field: "VehicleType", headerName: "Vehicle Type", width: 130 },
  { field: "VehicleRegistrationNo", headerName: "Vehicle Registration No", width: 170 },
  { field: "DriverName", headerName: "Driver Name", width: 170 },
  { field: "Status", headerName: "Status", width: 130 },
  { field: "Stations", headerName: "Stations", width: 130 },
  { field: "Reported", headerName: "Reported", width: 130 },
  { field: "Supplier", headerName: "Supplier", width: 130 },
  { field: "AdvancePaid", headerName: "Advance Paid", width: 130 },
];

const rows = [
  {
    id: 1,
    BookingId: 1,
    TripId: 12,
    date: "2023-06-07",
    Time: "9:00 AM",
    UserName: "Morning",
    ComapnyName: "123 Street, Apt 4B, City",
    RAddress: "no/2 street nobody",
    VehicleRegistrationNo: "2312",
    VehicleType: "ABC Car",
    DriverName: "Surash",
    Status: "booking",
    Stations: "booking",
    Reported: "C2332",
    Supplier: "Chennai",
    AdvancePaid: "f3-2332",


  },
  {
    id: 2,
    BookingId: 2,
    TripId: 13,
    date: "2023-06-08",
    Time: "7:00 PM",
    UserName: "Morning",
    ComapnyName: "123 Street, Apt 4B, City",
    RAddress: "no/2 street nobody",
    VehicleRegistrationNo: "2312",
    VehicleType: "ABC Car",
    DriverName: "Sai",
    Status: "booking",
    Stations: "booking",
    Reported: "C2333",
    Supplier: "Mumbai",
    AdvancePaid: "t3-5420",

  },
  // Add more rows as needed
];

const Dispatched = () => {

  const handleButtonClick = () => {
    window.location.href = '/home/customers/tripsheet';
  };

  return (
    <div className="dispatched-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Dispatched">
              <div className="input-field">
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="From Date" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="To Date" defaultValue={dayjs()} />
                  </LocalizationProvider>
                </div>
                <div className="input" >
                  <Button variant="contained">Show</Button>
                </div>
                <div className="input">
                  <Button variant="outlined">Show All</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={Stations.map((option) => option.optionvalue)}
                    options={Stations.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Stations" />
                    )}
                  />
                </div>
                <div className="input" >
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                  >
                    Download
                    <input
                      type="file"

                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
                <div className="input" style={{ width: '170px' }}>
                  <Button variant="contained" onClick={handleButtonClick}>
                    New TripSheet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-Dispatched">
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

export default Dispatched