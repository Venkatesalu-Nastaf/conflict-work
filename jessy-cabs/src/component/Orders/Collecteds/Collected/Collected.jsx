import React from "react";
import "./Collected.css";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { CustomerName } from "./CollectedData";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "billno", headerName: "Bill No", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "customerName", headerName: "Customer Name", width: 130 },
  { field: "billamount", headerName: "Bill Amount", width: 130 },
  { field: "collected", headerName: "Collected", width: 130 },
  { field: "balance", headerName: "Balance", width: 130 },
];

const rows = [
  {
    id: 1,
    billno: 1,
    date: "2023-06-07",
    customerName: "Morning",
    billamount: "9:00 AM",
    collected: "123 Street, Apt 4B, City",
    balance: "ABC Car",

  },
  {
    id: 2,
    billno: 2,
    date: "2023-06-08",
    customerName: "Evening",
    billamount: "2:00 PM",
    collected: "456 Avenue, Unit 8, Town",
    balance: "XYZ Car",
  },
];

// TABLE END

const Collected = () => {
  return (
    <div className="collected-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Collected">
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
                <div className="input" style={{ width: "80px" }}>
                  <Button variant="contained">Show</Button>
                </div>
                <div className="input" style={{ width: "80px" }}>
                  <Button variant="outlined">Pending</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={CustomerName.map((option) => option.optionvalue)}
                    options={CustomerName.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Customer Name" />
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
                  <Button variant="contained">New Receipts</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-Collected">
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

export default Collected