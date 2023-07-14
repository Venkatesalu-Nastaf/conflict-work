import React from "react";
import "./Pending.css";
import { Stations } from "./PendingData";
import Autocomplete from "@mui/material/Autocomplete";

import DescriptionIcon from "@mui/icons-material/Description";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "BookingId", headerName: "Booking Id", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "Time", headerName: "Time", width: 130 },
  { field: "UserName", headerName: "User Name", width: 130 },
  { field: "CustomerName", headerName: "Customer Name", width: 130 },
  { field: "VehicleType", headerName: "Vehicle Type", width: 130 },
  { field: "RAddress", headerName: "R Address", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
  { field: "VehicleRegistrationNo", headerName: "Vehicle Registration No", width: 170 },
  { field: "Station", headerName: "Station", width: 130 },
  { field: "employeno", headerName: "Employe No", width: 130 },
  { field: "customercode", headerName: "Customer Code", width: 130 },
];

const rows = [
  {
    id: 1,
    BookingId: 1,
    date: "2023-06-07",
    Time: "9:00 AM",
    UserName: "Morning",
    CustomerName: "123 Street, Apt 4B, City",
    VehicleType: "ABC Car",
    RAddress: "no/2 street nobody",
    Status: "booking",
    VehicleRegistrationNo: "2312",
    Station: "Chennai",
    employeno: "C2332",
    customercode: "f3-2332",


  },
  {
    id: 2,
    BookingId: 2,
    date: "2023-06-08",
    Time: "7:00 PM",
    UserName: "Evening",
    CustomerName: "456 Avenue, Unit 8, Town",
    VehicleType: "XYZ Car",
    RAddress: "no/2 street nobody",
    Status: "pending",
    VehicleRegistrationNo: "2313",
    Station: "Mumbai",
    employeno: "C2333",
    customercode: "t3-5420",

  },
  // Add more rows as needed
];

const Pending = () => {

  const handleButtonClickBooking = () => {
    window.location.href = '/home/orders/bookings';

  }

  const handleButtonClick = () => {
    window.location.href = '/home/orders/tripsheet';
  };

  return (
    <div className="pending-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn">
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
                <div className="input" style={{ width: "110px" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                  >
                    Excel
                    <input
                      type="file"

                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleButtonClickBooking}>New Booking</Button>
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
        <div className="table-bookingCopy">
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

export default Pending