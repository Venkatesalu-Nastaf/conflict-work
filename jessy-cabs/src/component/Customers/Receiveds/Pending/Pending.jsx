import React, { useState, useCallback } from 'react';
import "./Pending.css";
import axios from "axios";
// eslint-disable-next-line
import { saveAs } from 'file-saver';
import { ExportToCsv } from 'export-to-csv';

import { Stations } from "./PendingData";
import Autocomplete from "@mui/material/Autocomplete";
import DescriptionIcon from "@mui/icons-material/Description";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


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


const Pending = () => {
  const [rows, setRows] = useState([]);
  const [serviceStation, setServiceStation] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   handleShow([]); // Fetch initial data on component mount
  // }, []);

  const handleDownload = () => {
    const format = 'excel'; // Set the format to 'excel'
    // Perform data conversion and export based on the selected format
    if (format === 'excel') {
      const csvExporter = new ExportToCsv({
        filename: 'Customer_details.csv',
        useKeysAsHeaders: true, // Include header row
      });
      const csvRows = rows.map(({ id, bookingno, bookingdate, bookingtime, guestname, mobileno, address1, address2, city, customer, tripid }) => ({
        Sno: id,
        Booking_ID: bookingno,
        Date: bookingdate,
        Time: bookingtime,
        Guest_Name: guestname,
        Mobile: mobileno,
        R_Address: address1,
        R_Address1: address2,
        R_Address2: city,
        Company: customer,
        TripID: tripid,
      }));
      const csvFormattedData = csvExporter.generateCsv(csvRows, true);
      const blob = new Blob([csvFormattedData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'Customer_details.csv');
    }
  };

  const handleInputChange = (event) => {
    setServiceStation(event.target.value);
  };

  const handleShow = useCallback(async () => {
    try {
      // console.log('Selected Service Station:', serviceStation);
      const response = await axios.get(
        `http://localhost:8081/booking?servicestation=${serviceStation}&fromDate=${fromDate.format(
          'YYYY-MM-DD'
        )}&toDate=${toDate.format('YYYY-MM-DD')}`
      );
      // const response = await axios.get(
      //   `http://localhost:8081/booking/${serviceStation}?fromDate=${fromDate.format(
      //     'YYYY-MM-DD'
      //   )}&toDate=${toDate.format('YYYY-MM-DD')}`
      // );
      const data = response.data;
      // console.log(response.data); 
      setRows(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
    }
  }, [serviceStation, fromDate, toDate]);

  const handleShowAll = () => {
    handleShow(); // Call handleShow to get all data
  };

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
                <div className="input" >
                  <Button variant="outlined" onClick={handleShow}>Show</Button>
                </div>
                <div className="input">
                  <Button variant="outlined" onClick={handleShowAll}>Show All</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "300px" }}>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={serviceStation}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={(event, newValue) => setServiceStation(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} onChange={handleInputChange} label="Stations" />
                    )}
                  />
                  {/* <TextField
                  margin="normal"
                  size="small"
                  name="bookingno"
                  label="Booking No"
                  id="bookingno"
                  autoFocus
                  value={servicestation}
                  onChange={handleInputChange}
                /> */}
                </div>
                <div className="input" style={{ width: "110px" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                    onClick={() => { handleDownload('excel') }}
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