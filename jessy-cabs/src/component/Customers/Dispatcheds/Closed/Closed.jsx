import React from 'react'
import "./Closed.css";
import { Stations } from "./ClosedData.js";
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
  { field: "TirpId", headerName: "Trip Id", width: 130 },
  { field: "Date", headerName: "Trip Date", width: 130 },
  { field: "UserName", headerName: "User Name", width: 130 },
  { field: "CustomerName", headerName: "Customer Name", width: 130 },
  { field: "StartKM", headerName: "Start Km", width: 130 },
  { field: "CloseKM", headerName: "Close Km", width: 130 },
  { field: "TotalKM", headerName: "Total Km", width: 130 },
  { field: "StartTime", headerName: "Start Time", width: 130 },
  { field: "CloseTime", headerName: "Close Time", width: 130 },
  { field: "TotalTime", headerName: "Total Time", width: 130 },
  { field: "VehicleNo", headerName: "Vehicle No", width: 130 },
  { field: "Driver", headerName: "Driver", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
  { field: "BillingType", headerName: "Billing Type", width: 130 },
]; 

const rows = [
  {
    id: 1,
    TirpId: 1,
    Date: "2023-06-07",
    UserName: "Morning",
    CustomerName: "9:00 AM",
    StartKM: 12,
    CloseKM: 43,
    TotalKM: 21,
    StartTime: "9:00 AM",
    CloseTime: "13:00 AM",
    TotalTime: "4 Hours",
    VehicleNo: "123 Street, Apt 4B, City",
    Driver: "no/2 street nobody",
    Status: "no/2 street nobody",
    BillingType: "no/2 street nobody",


  },
  {
    id: 2,
    TirpId: 2,
    Date: "2023-06-08",
    UserName: "Morning",
    CustomerName: "7:00 PM",
    StartKM: 13,
    CloseKM: 23,
    TotalKM: 10,
    StartTime: "9:00 AM",
    CloseTime: "13:00 AM",
    TotalTime: "4 Hours",
    VehicleNo: "123 Street, Apt 4B, City",
    Driver: "no/2 street nobody",
    Status: "no/2 street nobody",
    BillingType: "no/2 street nobody",


  },
  // Add more rows as needed
];
const Closed = () => {

  const handleButtonClick = () => {
    window.location.href = '/home/orders/tripsheet';
  };

  return (
    <div className="Closed-form">
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
                    New Billing
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

export default Closed