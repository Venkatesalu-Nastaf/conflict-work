import React, { useState, useEffect, useCallback } from 'react';
import "./Closed.css";
import axios from "axios";
import dayjs from "dayjs";
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import Menu from '@mui/material/Menu';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Stations } from "./ClosedData.js";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "tripid", headerName: "Trip Sheet No", width: 130 },
  { field: "startdate", headerName: "Trip Date", width: 130 },
  { field: "guestname", headerName: "User Name", width: 130 },
  { field: "customer", headerName: "Customer Name", width: 130 },
  { field: "startkm", headerName: "Start Km", width: 130 },
  { field: "closekm", headerName: "Close Km", width: 130 },
  { field: "totalkm1", headerName: "Total Km", width: 130 },
  { field: "starttime", headerName: "Start Time", width: 130 },
  { field: "closetime", headerName: "Close Time", width: 130 },
  { field: "totaltime", headerName: "Total Time", width: 130 },
  { field: "vehRegNo", headerName: "Vehicle No", width: 130 },
  { field: "driverName", headerName: "Driver", width: 130 },
  { field: "billingno", headerName: "Billing No", width: 130 },
];

const Closed = () => {

  const [rows, setRows] = useState([]);
  const [department, setDepartment] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);


  // download function
  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "closed_Details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF('landscape');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Customer Details", 10, 10);

    // Modify tableData to exclude the index number
    const tableData = rows.map((row) => [
      row['id'],
      row['tripid'],
      row['startdate'],
      row['guestname'],
      row['customer'],
      row['startkm'],
      row['closekm'],
      row['totalkm1'],
      row['starttime'],
      row['closetime'],
      row['totaltime'],
      row['vehRegNo'],
      row['driverName'],
      row['status'],
      row['billingno']
    ]);

    pdf.autoTable({
      head: [['Sno', 'Trip Sheet No', 'Trip Date', 'User Name', 'Customer Name', 'Start Km', 'Close Km', 'Total Km', 'Start Time', 'Close Time', 'Total Time', 'Vehicle No', 'Driver', 'Status', 'Billing No']],
      body: tableData,
      startY: 20,
      columnWidth: 'auto',

    });

    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Customer_Details.pdf');
  };

  // End

  const handleInputChange = (event, newValue) => {
    setDepartment(newValue ? newValue.label : ''); // Assuming the label field contains the station name
  };

  const reversedRows = [...rows].reverse();

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/closed-tripsheet?department=${encodeURIComponent(
          department
        )}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
          toDate.toISOString()
        )}`
      );
      const data = response.data;
      if (data.length > 0) {
        setRows(data);
        setSuccess(true);
        setSuccessMessage("Successfully listed");
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("No data found");
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  }, [department, fromDate, toDate]);

  const handleShowAll = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/tripsheet`
      );
      const data = response.data;
      if (data.length > 0) {
        setRows(data);
        setSuccess(true);
        setSuccessMessage("Successfully listed");
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("No data found");
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  }, []);
  const handleButtonClickTripsheet = (selectedRow) => {
    const bookingPageUrl = `/home/bookings/tripsheet?tripid=${selectedRow.tripid || ''}&bookingno=${selectedRow.bookingno || ''}&status=${selectedRow.status || ''}&billingno=${selectedRow.billingno || ''}&apps=${selectedRow.apps || ''}&customer=${selectedRow.customer || ''}&orderedby=${selectedRow.orderedby || ''}&mobile=${selectedRow.mobile || ''}&guestname=${selectedRow.guestname || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&employeeno=${selectedRow.employeeno || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&address1=${selectedRow.address1 || ''}&streetno=${selectedRow.streetno || ''}&city=${selectedRow.city || ''}&hireTypes=${selectedRow.hireTypes || ''}&department=${selectedRow.department || ''}&vehRegNo=${selectedRow.vehRegNo || ''}&vehType=${selectedRow.vehType || ''}&driverName=${selectedRow.driverName || ''}&mobileNo=${selectedRow.mobileNo || ''}&driversmsexbetta=${selectedRow.driversmsexbetta || ''}&gps=${selectedRow.gps || ''}&duty=${selectedRow.duty || ''}&pickup=${selectedRow.pickup || ''}&useage=${selectedRow.useage || ''}&request=${selectedRow.request || ''}&startdate=${selectedRow.startdate || ''}&closedate=${selectedRow.closedate || ''}&totaldays=${selectedRow.totaldays || ''}&employeeno=${selectedRow.employeeno || ''}&reporttime=${selectedRow.reporttime || ''}&shedkm=${selectedRow.shedkm || ''}&shedin=${selectedRow.shedin || ''}&shedout=${selectedRow.shedout || ''}&starttime=${selectedRow.starttime || ''}&closetime=${selectedRow.closetime || ''}&additionaltime=${selectedRow.additionaltime || ''}&advancepaidtovendor=${selectedRow.advancepaidtovendor || ''}&customercode=${selectedRow.customercode || ''}&startkm=${selectedRow.startkm || ''}&closekm=${selectedRow.closekm || ''}&permit=${selectedRow.permit || ''}&parking=${selectedRow.parking || ''}&toll=${selectedRow.toll || ''}&vpermettovendor=${selectedRow.vpermettovendor || ''}&vendortoll=${selectedRow.vendortoll || ''}&customeradvance=${selectedRow.customeradvance || ''}&email1=${selectedRow.email1 || ''}&remark=${selectedRow.remark || ''}&smsguest=${selectedRow.smsguest || ''}&documentnotes=${selectedRow.documentnotes || ''}&VendorTripNo=${selectedRow.VendorTripNo || ''}&vehicles=${selectedRow.vehicles || ''}&duty1=${selectedRow.duty1 || ''}&startdate1=${selectedRow.startdate1 || ''}&closedate1=${selectedRow.closedate1 || ''}&totaldays1=${selectedRow.totaldays1 || ''}&locks=${selectedRow.locks || ''}&starttime2=${selectedRow.starttime2 || ''}&closetime2=${selectedRow.closetime2 || ''}&totaltime=${selectedRow.totaltime || ''}&startkm1=${selectedRow.startkm1 || ''}&closekm1=${selectedRow.closekm1 || ''}&totalkm1=${selectedRow.totalkm1 || ''}&remark1=${selectedRow.remark1 || ''}&caramount=${selectedRow.caramount || ''}&minkm=${selectedRow.minkm || ''}&minhrs=${selectedRow.minhrs || ''}&package=${selectedRow.package || ''}&amount=${selectedRow.amount || ''}&exkm=${selectedRow.exkm || ''}&amount1=${selectedRow.amount1 || ''}&exHrs=${selectedRow.exHrs || ''}&amount2=${selectedRow.amount2 || ''}&night=${selectedRow.night || ''}&amount3=${selectedRow.amount3 || ''}&driverconvenience=${selectedRow.driverconvenience || ''}&amount4=${selectedRow.amount4 || ''}&netamount=${selectedRow.netamount || ''}&vehcommission=${selectedRow.vehcommission || ''}&caramount1=${selectedRow.caramount1 || ''}&manualbills=${selectedRow.manualbills || ''}&pack=${selectedRow.pack || ''}&amount5=${selectedRow.amount5 || ''}&exkm1=${selectedRow.exkm1 || ''}&amount6=${selectedRow.amount6 || ''}&exHrs1=${selectedRow.exHrs1 || ''}&amount7=${selectedRow.amount7 || ''}&night1=${selectedRow.night1 || ''}&amount8=${selectedRow.amount8 || ''}&driverconvenience1=${selectedRow.driverconvenience1 || ''}&amount9=${selectedRow.amount9 || ''}&rud=${selectedRow.rud || ''}&netamount1=${selectedRow.netamount1 || ''}&discount=${selectedRow.discount || ''}&ons=${selectedRow.ons || ''}&manualbills1=${selectedRow.manualbills1 || ''}&balance=${selectedRow.balance || ''}&fcdate=${selectedRow.fcdate || ''}&taxdate=${selectedRow.taxdate || ''}&insdate=${selectedRow.insdate || ''}&stpermit=${selectedRow.stpermit || ''}&maintenancetype=${selectedRow.maintenancetype || ''}&kilometer=${selectedRow.kilometer || ''}&selects=${selectedRow.selects || ''}&documenttype=${selectedRow.documenttype || ''}&on1=${selectedRow.on1 || ''}&smsgust=${selectedRow.smsgust || ''}&booker=${selectedRow.booker || ''}&emailcheck=${selectedRow.emailcheck || ''}&valueprint=${selectedRow.valueprint || ''}&manualbillss=${selectedRow.manualbillss || ''}&reload=${selectedRow.reload || ''}`;
    window.location.href = bookingPageUrl;
  }

  const handleButtonClick = () => {
    window.location.href = '/home/bookings/tripsheet';
  };

  return (
    <div className="Closed-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Closed">
              <div className="input-field">
                <div className="input" style={{ width: "70%" }}>
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
                <div className="input" style={{ width: '130px' }}>
                  <Button variant="contained" onClick={handleShow}>Show</Button>
                </div>
                <div className="input" style={{ width: '120px' }}>
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
                    value={department}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    onChange={(event, value) => handleInputChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Stations" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input" style={{ width: '150px' }}>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button variant="outlined" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
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
                <div className="input" style={{ width: '150px' }}>
                  <Button variant="contained" onClick={handleButtonClick}>
                    Tripsheet
                  </Button>
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
        <div className="table-bookingCopy-Closed">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowClick={(event) => handleButtonClickTripsheet(event.row)}
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