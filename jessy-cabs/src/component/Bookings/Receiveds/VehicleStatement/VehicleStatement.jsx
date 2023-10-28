import React, { useState, useEffect, useCallback } from 'react';
import "./VehicleStatement.css";
import axios from "axios";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Stations } from "./VehicleStatementData";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripno", headerName: "Trip No", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "ac", headerName: "A/C", width: 120 },
  { field: "vendorname", headerName: "Vendor Name", width: 130 },
  { field: "vehicle", headerName: "Vehicle", width: 90 },
  { field: "duty", headerName: "Duty", width: 160 },
  { field: "startkms", headerName: "Start-kMS", width: 130 },
  { field: "closekms", headerName: "Close-kMS", width: 130 },
  { field: "totalkms", headerName: "Total-kMS", width: 130 },
  { field: "starttime", headerName: "Start-Time", width: 130 },
  { field: "closetime", headerName: "Close-Time", width: 130 },
  { field: "totaldays", headerName: "Total-Days", width: 130 },
  { field: "runhours", headerName: "Run-Hours", width: 130 },
  { field: "vehicletoll", headerName: "Vehicle-Toll", width: 130 },
  { field: "totalamount", headerName: "Total Amount", width: 130 },
  { field: "driveradvance", headerName: "Driver Advance", width: 130 },
  { field: "bunkadvance", headerName: "Bunk Advance", width: 130 },
  { field: "balance", headerName: "Balance", width: 130 },
  { field: "bata", headerName: "Bata", width: 130 },
];

const VehicleStatement = () => {
  const [rows, setRows] = useState([]);
  const [servicestation, setServiceStation] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
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
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [info]);

  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "VehicleStatement Reports.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF('Landscape');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("VehicleStatement Reports", 10, 10);

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
      row['vehRegNo'],
    ]);

    pdf.autoTable({
      head: [['Sno', 'Status', 'Booking ID', 'Tripsheet No', 'Date', 'Time', 'Guest Name', 'Mobile', 'R.Address', 'R.Address1', 'R.Address2', 'Company', 'Register NO']],
      body: tableData,
      startY: 20,
    });

    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'VehicleStatement Reports.pdf');
  };

  const handleInputChange = (event, newValue) => {
    setServiceStation(newValue ? newValue.label : ''); // Assuming the label field contains the station name
  };

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/VehicleStatement-bookings?servicestation=${encodeURIComponent(
          servicestation
        )}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
          toDate.toISOString()
        )}`
      );
      const data = response.data;
      setRows(data);
      setSuccessMessage("Successfully listed");
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
      setErrorMessage("Check your Network Connection");
    }
  }, [servicestation, fromDate, toDate]);


  const handleShowAll = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/booking`
      );
      const data = response.data;
      setRows(data);
      setSuccessMessage("Successfully listed");
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
      setErrorMessage("Check your Network Connection");
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
    const bookingPageUrl = `/home/customers/bookings?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&status=${selectedRow.status}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.city}&report=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehRegNo=${selectedRow.vehRegNo}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
    window.location.href = bookingPageUrl;
  };

  const handleTripsheetClick = () => {
    const bookingPageUrl = `/home/customers/tripsheet?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehRegNo=${selectedRow.vehRegNo}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
    window.location.href = bookingPageUrl;
  };
  return (
    <div className="VehicleStatement-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="SearchContainer-VehicleStatement">
              <div className="input-field">
                <div className="input">
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
                      <TextField {...params} label="Vendor Name From" />
                    }
                  />
                </div>
                <div className="input">
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
                      <TextField {...params} label="Vendor Name To" />
                    }
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

              </div>
              <div className="input-field" style={{ justifyContent: "center" }}>
                <div className="input" style={{ width: "130px" }} >
                  <Button variant="outlined" onClick={handleShow}>Show</Button>
                </div>
                <div className="input" style={{ width: "110px" }} >
                  <Button variant="contained" onClick={handleShowAll}>Show All</Button>
                </div>
              </div>
              <div className="input-field" style={{ justifyContent: "end" }}>
                <div className="input" style={{ width: "130px" }}>
                  <TextField
                    margin="normal"
                    size="small"
                    id="paidamount"
                    label="Paid Amount"
                    name="paidamount"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {error &&
          <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{errorMessage}</p>
          </div>
        }
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{warningMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
        <div className="table-bookingCopy-VehicleStatement">
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

export default VehicleStatement