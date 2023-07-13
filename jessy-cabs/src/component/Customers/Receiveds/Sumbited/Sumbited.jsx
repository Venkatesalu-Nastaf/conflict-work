import React from 'react'
import './Sumbited.css'
import { SumbitStatus } from './SumbitData.js'
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
  { field: "sno", headerName: "Sno", width: 70 },
  { field: "id", headerName: "Id", width: 70 },
  { field: "time", headerName: "Time", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "Customer", headerName: "Customer", width: 130 },
  { field: "Guestname", headerName: "Guest Name", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
];

const rows = [
  {
    sno: 1,
    id: 1,
    time: "9:00 AM",
    date: "2023-06-07",
    Customer: "123 Street, Apt 4B, City",
    Guestname: "ABC Car",
    Status: "received",

  },
  {
    sno: 2,
    id: 2,
    time: "2:00 PM",
    date: "2023-06-08",
    Customer: "456 Avenue, Unit 8, Town",
    Guestname: "XYZ Car",
    Status: "booking",
  },
  // Add more rows as needed
];

const Sumbited = () => {
  return (
    <div className="submit-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn">
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
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained">Show</Button>
                </div>
                <div className="input" style={{ width: "200px" }}>
                  <Button variant="outlined">Cancel Selected</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={SumbitStatus.map((option) => option.optionvalue)}
                    options={SumbitStatus.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Sumbit Status" />
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
                <div className="input" style={{ width: "160px" }}>
                  <Button variant="contained">New Booking</Button>
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

export default Sumbited