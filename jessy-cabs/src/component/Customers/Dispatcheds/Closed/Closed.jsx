import React, { useState, useCallback } from 'react';
import "./Closed.css";
import axios from "axios";
import { saveAs } from 'file-saver';
import { ExportToCsv } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import { Stations } from "./ClosedData.js";
import Autocomplete from "@mui/material/Autocomplete";
import DescriptionIcon from "@mui/icons-material/Description";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';



const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripsheetno", headerName: "Trip Sheet No", width: 130 },
  { field: "startdate", headerName: "Trip Date", width: 130 },
  { field: "username", headerName: "User Name", width: 130 },
  { field: "customer", headerName: "Customer Name", width: 130 },
  { field: "startkm", headerName: "Start Km", width: 130 },
  { field: "closekm", headerName: "Close Km", width: 130 },
  { field: "totalkm1", headerName: "Total Km", width: 130 },
  { field: "starttime", headerName: "Start Time", width: 130 },
  { field: "closetime", headerName: "Close Time", width: 130 },
  { field: "totaltime", headerName: "Total Time", width: 130 },
  { field: "vehiclerigsterno", headerName: "Vehicle No", width: 130 },
  { field: "drivername", headerName: "Driver", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "billingno", headerName: "Billing No", width: 130 },
]; 


const Closed = () => {

  const [rows, setRows] = useState([]);
  const [tripsheetno, setTripsheetNo] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());


   // download function
   const handleDownload = (format) => {
    // Perform data conversion and export based on the selected format
    if (format === 'excel') {
      const csvExporter = new ExportToCsv({
        filename: 'Customer_details.csv',
        useKeysAsHeaders: true, // Include header row
      });
      const csvRows = rows.map(({ id, tripsheetno, startdate, username, customer, startkm, closekm, totalkm1, starttime, closetime, totaltime, vehiclerigsterno, drivername, status, billingno }) => ({
        Sno: id,
        Trip_Sheet_No: tripsheetno,
        Trip_Date: startdate,
        User_Name: username,
        Customer_Name: customer,
        Start_Km: startkm,
        Close_Km: closekm,
        Total_Km: totalkm1,
        Start_Time: starttime,
        Close_Time: closetime,
        Total_Time: totaltime,
        Vehicle_No: vehiclerigsterno,
        Driver: drivername,
        Status: status,
        Billing_No: billingno,
      }));
      const csvFormattedData = csvExporter.generateCsv(csvRows, true);
      const blob = new Blob([csvFormattedData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'Customer_details.csv');
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      const headerNames = columns.map(column => column.headerName);
      const bodyData = rows.map(row => columns.map(column => row[column.field]));
      doc.autoTable({
        head: [headerNames],
        body: bodyData,
      });
      doc.save('Customer_details.pdf');
    }
  };
  // End

  const handleInputChange = (event) => {
    setTripsheetNo(event.target.value);
  };

  const handleDateChange = (date, dateType) => {
    if (dateType === "fromDate") {
      setFromDate(date);
    } else {
      setToDate(date);
    }
  };

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8081/tripsheet?tripsheetno=${tripsheetno}&fromDate=${fromDate.format('YYYY-MM-DD')}&toDate=${toDate.format('YYYY-MM-DD')}`);
      const data = response.data;
      setRows(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
    }
  }, [tripsheetno, fromDate, toDate]);


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
                <Button variant="contained" onClick={handleShow}>Show</Button>
                </div>
                <div className="input">
                <Button variant="outlined" onClick={handleShow}>Show All</Button>
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
                  {/* <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                  >
                    Download
                    <input
                      type="file"
                      style={{ display: "none" }}
                    />
                  </Button> */}
                   <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="outlined" {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => { handleDownload('excel'); popupState.close(); }}>Excel</MenuItem>
                    <MenuItem onClick={() => { handleDownload('pdf'); popupState.close(); }}>PDF</MenuItem>
                  </Menu>

                </React.Fragment>
              )}
            </PopupState>
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