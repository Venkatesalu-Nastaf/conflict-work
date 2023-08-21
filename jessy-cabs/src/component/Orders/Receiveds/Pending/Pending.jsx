import React, { useState, useEffect, useCallback } from 'react';
import "./Pending.css";
import axios from "axios";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Stations } from "./PendingData";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "bookingno", headerName: "Booking ID", width: 130 },
  { field: "tripid", headerName: "Tripsheet No", width: 130 },
  { field: "bookingdate", headerName: "Date", width: 130 },
  { field: "bookingtime", headerName: "Time", width: 90 },
  { field: "guestname", headerName: "Guest Name", width: 160 },
  { field: "mobileno", headerName: "Mobile", width: 130 },
  { field: "address1", headerName: "R.Address", width: 130 },
  { field: "address2", headerName: "R.Address1", width: 130 },
  { field: "city", headerName: "R.Address2", width: 130 },
  { field: "customer", headerName: "Company", width: 130 },
];

const Pending = () => {
  const [rows, setRows] = useState([]);
  const [servicestation, setServiceStation] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const hidePopup = () => {
    setSuccess(false);
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
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);

  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Pending Reports.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF('Landscape');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Pending Reports", 10, 10);

    // Modify tableData to exclude the index number
    const tableData = rows.map((row) => [
      row['id'],
      row['status'],
      row['bookingno'],
      row['tripid'],
      row['bookingdate'],
      row['bookingtime'],
      row['guestname'],
      row['mobileno'],
      row['address1'],
      row['address2'],
      row['customer'],
    ]);

    pdf.autoTable({
      head: [['Sno', 'Status', 'Booking ID', 'Tripsheet No', 'Date', 'Time', 'Guest Name', 'Mobile', 'R.Address', 'R.Address1', 'R.Address2', 'Company']],
      body: tableData,
      startY: 20,
    });

    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Pending Reports.pdf');
  };

  const handleInputChange = (event, newValue) => {
    setServiceStation(newValue ? newValue.label : ''); // Assuming the label field contains the station name
  };

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/pending-bookings?servicestation=${encodeURIComponent(
          servicestation
        )}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
          toDate.toISOString()
        )}`
      );
      const data = response.data;
      setRows(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
      setError(true);
    }
  }, [servicestation, fromDate, toDate]);


  const handleShowAll = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/booking`
      );
      const data = response.data;
      setRows(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
      setError(true);

    }
  }, []);

  const handleButtonClick = (row) => {
    setSelectedRow(row);
    setPopupOpen(true);
  };
  const handlePopupClose = () => {
    setSelectedRow(null);
    setPopupOpen(false);
  };
  const handleBookingClick = () => {
    const bookingPageUrl = `/home/customers/bookings?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&status=${selectedRow.status}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.city}&report=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehicleregisterno=${selectedRow.vehicleregisterno}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
    window.location.href = bookingPageUrl;
  };
  const handleTripsheetClick = () => {
    const bookingPageUrl = `/home/customers/tripsheet?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehicleregisterno=${selectedRow.vehicleregisterno}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
    window.location.href = bookingPageUrl;
  };
  const handleButtonbooking = () => {
    window.location.href = '/home/customers/bookings';
  };
  const handleButtontripsheet = () => {
    window.location.href = '/home/customers/tripsheet';
  };

  return (
    <div className="pending-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Pending">
              <div className="input-field">
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
                <div className="input" style={{ width: "130px" }} >
                  <Button variant="outlined" onClick={handleShow}>Show</Button>
                </div>
                <div className="input" style={{ width: "110px" }} >
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
                    value={servicestation}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={handleInputChange}
                    renderInput={(params) =>
                      <TextField {...params} label="Stations" />
                    }
                  />
                </div>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleButtonbooking}>New Booking</Button>
                </div>
                <div className="input" style={{ width: '170px' }}>
                  <Button variant="contained" onClick={handleButtontripsheet}>
                    New TripSheet
                  </Button>
                </div>
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
        {success &&
          <div className='alert-popup Success' >
            <span className='cancel-btn' onClick={hidePopup}>x</span>
            <p>success fully submitted</p>
          </div>
        }
        <div className="table-bookingCopy-Pending">
          <div className="Download-btn">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                    <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={(event) => handleButtonClick(event.row)}
              pageSize={5}
            />
            <Dialog open={popupOpen} onClose={handlePopupClose}>
              <DialogTitle>Select an Option</DialogTitle>
              <DialogContent>
                {selectedRow && (
                  <div>
                    <Button onClick={handleBookingClick}>Booking</Button>
                    <Button onClick={handleTripsheetClick}>Tripsheet</Button>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Pending