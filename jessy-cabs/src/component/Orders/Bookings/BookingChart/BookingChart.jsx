import React, { useState, useCallback } from 'react';
import axios from "axios";
import "./BookingChart.css";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { VehicleModel } from "./BookingChart";

const BookingChart = () => {
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [vehicles, setVehicles] = useState(() => {
    const initialVehicles = VehicleModel.map((vehicle, index) => ({
      id: index + 1,
      registerno: index + 1,
      vehicleName: vehicle.carmodel,
      bookings: {},
    }));

    initialVehicles.forEach((vehicle) => {
      vehicle.length = vehicle.vehicleName.length;
    });

    return initialVehicles;
  });

  
  
  const showBookedStatusAll = useCallback(async (from, to) => {
    try {
      const response = await axios.get(`http://localhost:8081/booking`, {
        params: {
          fromDate: from.format('YYYY-MM-DD'),
          toDate: to.format('YYYY-MM-DD'),
        },
      });
      const bookingData = response.data;
      console.log('Booking Data:', bookingData);
      const bookingCounts = {};
      bookingData.forEach((booking) => {
        const vehicleName = booking.vehiclemodule;
        if (!bookingCounts[vehicleName]) {
          bookingCounts[vehicleName] = {
            count: 0,
          };
        }
        bookingCounts[vehicleName].count++;
      });
      console.log('Booking Counts:', bookingCounts);
      const updatedVehicles = vehicles.map((vehicle) => ({
        ...vehicle,
        bookings: {
          ...vehicle.bookings,
          count: bookingCounts[vehicle.vehicleName]?.count || 0,
        },
      }));
      console.log('Updated Vehicles:', updatedVehicles);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }, [vehicles]);



  const generateColumns = () => {
    const columns = [
      { field: "id", headerName: "Sno", width: 70 },
      { field: "vehicleName", headerName: "Vehicle Name", width: 130 },
    ];
  
    let currentDate = dayjs(fromDate);
    const lastDate = dayjs(toDate);
  
    while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate, "day")) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      columns.push({
        field: formattedDate,
        headerName: formattedDate,
        width: 130,
        // valueGetter: (params) => params.row.bookings.count || 0,
        valueGetter: (params) => {
          const vehicleBookings = params.row.bookings;
          return vehicleBookings = params.row.bookings.count || 0;
        },//wrong value
      });
  
      currentDate = currentDate.add(1, "day");
    }
  
    return columns;
  };
  

  const columns = generateColumns();

  
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
                    <DatePicker
                      label="From Date"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "460px" }}>
                  <Button
                    variant="contained"
                    onClick={() => showBookedStatusAll(fromDate, toDate)}
                  >
                    Show Booked Status All
                  </Button>
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
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingChart;
