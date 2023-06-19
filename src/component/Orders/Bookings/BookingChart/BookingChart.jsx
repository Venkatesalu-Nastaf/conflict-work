import React from "react";
import "./BookingChart.css";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { VehicleModel } from "./BookingChart";
// TABLE

// TABLE END
const BokkingChart = () => {
  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "registerno", headerName: "Register No", width: 130 },
    { field: "length", headerName: "Today booking", width: 130 },
    { field: "vehicalename", headerName: "Vehicle Name", width: 130 },
  ];

  const vehicles = VehicleModel.map((vehicle, index) => ({
    id: index + 1,
    registerno: index + 1,
    vehicalename: vehicle.carmodel,
  }));

  vehicles.forEach((vehicle) => {
    vehicle.length = vehicle.vehicalename.length;
  });

  return (
    <div className="bookingcopy-form">
      <form action="">
        <span className="Title-Name">Booking Chart</span>
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
                <div className="input" style={{ width: "460px" }}>
                  <Button variant="contained">Show Booked Status All</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <Button>Economy</Button>
                </div>
                <div className="input">
                  <Button>Luxury</Button>
                </div>
                <div className="input">
                  <Button>Midrange</Button>
                </div>
                <div className="input">
                  <Button>Midsize</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={vehicles}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BokkingChart;
