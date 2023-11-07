import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import "./PaymentDetail.css";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Autocomplete, Menu, TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Organization } from './PaymentDetailData';

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripsheetno", headerName: "TripSheet No", width: 130 },
  { field: "organization", headerName: "Organization", width: 130 },
  { field: "billdate", headerName: "Bill Date", width: 130 },
  { field: "totalamount", headerName: "Total Amount", width: 130 },
  { field: "paid", headerName: "Paid", width: 130 },
  { field: "Pending", headerName: "Pending", width: 130 },
  { field: "bankaccount", headerName: "Bank Account", width: 150 },
];

const PaymentDetail = () => {
  const [organization, setOrganization] = useState("");
  const [tripsheetno, setTripsheetno] = useState("");
  const [rows, setRows] = useState([]);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [bankOptions, setBankOptions] = useState([]);
  const [infoMessage] = useState({});

  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "customer_details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Customer Details", 10, 10);
    const tableData = rows.map((row) => [
      row['id'],
      row['voucherno'],
      row['printName'],
      row['Billname'],
      row['date'],
      row['PaymentCategory'],
      row['amount']
    ]);
    pdf.autoTable({
      head: [['Sno', 'VoucherNo', 'Payment Date', 'Bill Name', 'Payment Category', 'Amount']],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Customer_Details.pdf');
  };

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
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (event, newValue) => {
    setOrganization(newValue ? newValue.label : '');
    setTripsheetno(newValue ? newValue.label : '');
  };

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/payment-details?customer=${encodeURIComponent(
          organization
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
  }, [organization, fromDate, toDate]);

  useEffect(() => {
    Organization()
      .then((data) => {
        if (data) {
          console.log('organization name', data);
          setBankOptions(data);
        } else {
          setError(true);
          setErrorMessage('Failed to fetch organization options.');
        }
      })
      .catch(() => {
        setError(true);
        setErrorMessage('Failed to fetch organization options.');
      });
  }, []);

  return (
    <div className="PaymentDetail-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-PaymentDetail">
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <ListAltIcon color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Tripsheet No"
                    name="tripsheetno"
                    value={tripsheetno}
                    onChange={(event, value) => handleInputChange(event, value)}
                    autoComplete='off'
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    onChange={(event, value) => handleInputChange(event, value)}
                    value={organization || ''}
                    options={bankOptions}
                    autoComplete='off'
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Organization" name="customer" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
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
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleShow}>Search</Button>
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
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
        <div className='total-container'>
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
          <div className='amount-calculator'>
            <div className='total-inputs' >
              <label htmlFor="">Total Amount:</label>
              <input type="number" />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Paid Amount:</label>
              <input type="number" />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Pending Amount:</label>
              <input type="number" />
            </div>
          </div>
        </div>
        {/* <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
              />
            ))}
          </StyledSpeedDial>
        </Box> */}
        <div className="table-bookingCopy-PaymentDetail">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              // onRowClick={handleRowClick}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PaymentDetail