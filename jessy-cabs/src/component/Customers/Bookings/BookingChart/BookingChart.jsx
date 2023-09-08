import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./BookingChart.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { VehicleModel } from "./BookingChart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const BookingChart = () => {
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);

  const hidePopup = () => {
    setError(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error]);

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
      const bookingData = response.data; // Fetch the booking data from the API response
      const bookingCounts = {};
      bookingData.forEach((booking) => {
        const vehicleName = booking.vehType;
        const formattedDate = dayjs(booking.bookingdate).format("YYYY-MM-DD");
        if (!bookingCounts[vehicleName]) {
          bookingCounts[vehicleName] = {};
        }
        bookingCounts[vehicleName][formattedDate] = {
          count: (bookingCounts[vehicleName][formattedDate]?.count || 0) + 1,
        };
      });

      setVehicles((prevVehicles) => {
        const updatedVehicles = prevVehicles.map((vehicle) => ({
          ...vehicle,
          bookings: {
            ...vehicle.bookings,
            ...bookingCounts[vehicle.vehicleName],
          },
        }));
        return updatedVehicles;
      });
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }, []);

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
        valueGetter: createValueGetter(formattedDate),
      });

      currentDate = currentDate.add(1, "day");
    }

    return columns;
  };

  const createValueGetter = (bookingDate) => (params) => {
    return params.row.bookings[bookingDate]?.count || 0;
  };


  const columns = generateColumns();

  return (
    <div className="BookingChart-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-BookingChart">
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
              {/* <div className="input-field">
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
              </div> */}
            </div>
          </div>
        </div>
        {error &&
          <div className='alert-popup Error' >
            <span className='cancel-btn' onClick={hidePopup}>x</span>
            <p>Something went wrong!</p>
          </div>
        }
        <div className="table-bookingCopy-BookingChart">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              className="Scroll-Style" 
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
