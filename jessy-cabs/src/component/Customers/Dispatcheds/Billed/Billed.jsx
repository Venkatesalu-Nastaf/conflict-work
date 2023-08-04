import React from 'react';
import "./Billed.css";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Stations } from "./BilledData.js";
import { DataGrid } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "TirpNo", headerName: "Trip No", width: 130 },
  { field: "BillNo", headerName: "Bill No", width: 130 },
  { field: "Tripdate", headerName: "Trip Date", width: 130 },
  { field: "CustomerName", headerName: "Customer Name", width: 130 },
  { field: "UserName", headerName: "User Name", width: 130 },
  { field: "ServiceTax", headerName: "Service Tax", width: 130 },
  { field: "Payable", headerName: "Payable", width: 130 },
];

const rows = [
  {
    id: 1,
    TirpNo: 1,
    BillNo: 12,
    Tripdate: "2023-06-07",
    CustomerName: "9:00 AM",
    UserName: "Morning",
    ServiceTax: "123 Street, Apt 4B, City",
    Payable: "no/2 street nobody",


  },
  {
    id: 2,
    TirpNo: 2,
    BillNo: 13,
    Tripdate: "2023-06-08",
    CustomerName: "7:00 PM",
    UserName: "Morning",
    ServiceTax: "123 Street, Apt 4B, City",
    Payable: "no/2 street nobody",

  },
  // Add more rows as needed
];

const Billed = () => {

  const handleButtonClick = () => {
    window.location.href = '/home/orders/tripsheet';
  };

  return (
    <div className="billed-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Billed">
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
        <div className="table-bookingCopy-Billed">
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

export default Billed