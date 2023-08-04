import React, { useState, useCallback, useEffect } from 'react';
import "./BookingCopy.css";
import axios from "axios";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "bookingno", headerName: "Booking ID", width: 130 },
  { field: "bookingdate", headerName: "Date", width: 130 },
  { field: "bookingtime", headerName: "Time", width: 90 },
  { field: "guestname", headerName: "Guest Name", width: 160 },
  { field: "mobileno", headerName: "Mobile", width: 130 },
  { field: "address1", headerName: "R.Address", width: 130 },
  { field: "address2", headerName: "R.Address1", width: 130 },
  { field: "city", headerName: "R.Address2", width: 130 },
  { field: "customer", headerName: "Company", width: 130 },
  { field: "tripid", headerName: "BookingID", width: 130 },
];
// TABLE END
const BookingCopy = () => {
  const [rows, setRows] = useState([]);
  const [bookingno, setBookingNo] = useState("");
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


  const handleInputChange = (event) => {
    setBookingNo(event.target.value);
  };

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8081/booking?bookingno=${bookingno}&fromDate=${fromDate.format('YYYY-MM-DD')}&toDate=${toDate.format('YYYY-MM-DD')}`);
      const data = response.data;
      setRows(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
    }
  }, [bookingno, fromDate, toDate]);

  return (
    <div className="bookingcopy-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="input-field copy-title-btn-BookingCopy">
              <div className="input">
                <div className="icone">
                  <AutoModeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="bookingno"
                  label="Booking No"
                  id="bookingno"
                  autoFocus
                  value={bookingno}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input" style={{ width: "60%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="From Date"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                    <DatePicker
                      label="To Date"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="input" style={{ width: "70px" }}>
                <Button variant="outlined" onClick={handleShow}>Show</Button>
              </div>
              <div className="input" style={{ width: "70px" }}>
                <Button variant="contained">Save</Button>
              </div>
            </div>
          </div>
        </div>
        {error &&
          <div className='alert-popup Error' >
            <span className='cancel-btn' onClick={hidePopup}>x</span>
            <p>Something went wrong!</p>
          </div>
        }
        <div className="table-bookingCopy-BookingCopy">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
            // checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingCopy;
