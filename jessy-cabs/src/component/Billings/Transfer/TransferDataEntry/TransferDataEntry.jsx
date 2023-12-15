import React, { useState, useEffect, useCallback } from 'react';
import "./TransferDataEntry.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, FormControlLabel, Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { Autocomplete } from "@mui/material";

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { faBuilding, faFileInvoiceDollar, faTags } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { AiOutlineFileSearch } from 'react-icons/ai';


const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "startdate", headerName: "TripDate", width: 130 },
  { field: "tripid", headerName: "Trip No", width: 130 },
  { field: "customer", headerName: "Customer", width: 130 },
  { field: "vehRegNo", headerName: "VehicleReg.No", width: 130 },
  { field: "vehType", headerName: "VehicleType", width: 130 },
  { field: "guestname", headerName: "UserName", width: 150 },
  { field: "groupname", headerName: "GroupName", width: 130 },
  { field: "totaltime", headerName: "Hours", width: 150 },
  { field: "totaldays", headerName: "Days", width: 150 },
  { field: "duty", headerName: "Duty", width: 150 },
  { field: "permit", headerName: "Permit", width: 150 },
  { field: "parking", headerName: "Parking", width: 150 },
  { field: "billno", headerName: "BillNo", width: 130 },
  { field: "exHrs", headerName: "ExtraHrsAmount", width: 130 },
  { field: "exkm", headerName: "ExtrakmsAmount", width: 130 },
  { field: "netamount", headerName: "Amount", width: 130 },
  { field: "grouptripno", headerName: "GroupTripNo", width: 130 },
  { field: "billtype", headerName: "BillType", width: 130 },
  { field: "advancepaidtovendor", headerName: "Advance", width: 130 },
  { field: "taxStatus", headerName: "TaxStatus", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  // { field: "locked", headerName: "Locked", width: 130 },
];

const TransferDataEntry = () => {
  const [rows, setRows] = useState([]);
  const [customer, setCustomer] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [bankOptions, setBankOptions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const hidePopup = () => {
    setError(false);
    setSuccess(false);
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

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/tripsheet');
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
        console.error('Error retrieving booking details:', error);
      }
    }
  }, []);

   //calculate total amount in column
   useEffect(() => {
    const calculatedTotalAmount = rows.reduce((total, row) => total + parseFloat(row.netamount || 0), 0);
    console.log('calculatedTotalAmount', calculatedTotalAmount);
    if (!isNaN(calculatedTotalAmount)) {
      setTotalAmount(calculatedTotalAmount.toFixed(2));
    } else {
      setTotalAmount("0");
    }
  }, [rows]);

  return (
    <div className="TransferDataEntry-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="TransferDataEntry">
            <div className="container-left">
              <div className="copy-title-btn-TransferDataEntry">
                <div className="input-field" >
                  <div className="input" style={{ width: "230px" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faTags} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Group Trip ID"
                      name="tripid"
                      autoComplete='off'
                    />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                        format="DD/MM/YYYY"
                      />
                      <DatePicker
                        label="Bill Date"
                        format="DD/MM/YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input-field" >
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Invoice No"
                      name="invoiceno"
                      autoComplete='off'
                    />
                  </div>
                  <div className="input" style={{ width: "420px" }}>
                    <div className="icone">
                      <HailOutlinedIcon color="action" />
                    </div>
                    <Autocomplete
                      fullWidth
                      id="free-solo-demo"
                      freeSolo
                      size="small"
                      value={customer}
                      options={bankOptions}
                      onChange={(event, value) => setCustomer(value)}
                      onKeyDown={handleKeyDown}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Organization" name="customer" inputRef={params.inputRef} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="From Date"
                          format="DD/MM/YYYY"
                          value={fromDate}
                          onChange={(date) => setFromDate(date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="To Date"
                          format="DD/MM/YYYY"
                          value={toDate}
                          onChange={(date) => setToDate(date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input">
                    <Button variant="contained">Select</Button>
                  </div>
                </div>
                <div className="input-field" >
                  <div className="input">
                    <div className="icone">
                      <AiOutlineFileSearch color="action" style={{ fontSize: "27px" }} />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Search"
                      name="invoiceno"
                      autoComplete='off'
                    />
                  </div>
                  <div className="input" >
                    <TextField
                      size="small"
                      id="id"
                      label=""
                      autoComplete='off'
                    />
                  </div>
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faBuilding} size="xl" />
                    </div>
                    <select name="branch" className="input-select">
                      <option value="" disabled selected>Select a city</option>
                      <option value="all">Chennai</option>
                      <option value="billed">Bangalore</option>
                      <option value="notbilled">Hyderabad</option>
                    </select>
                  </div>
                </div>
                <div className="input-field">
                  <div className="input">
                    <FormControlLabel
                      value="guestsms"
                      control={<Checkbox size="small" />}
                      label="Group Billing"
                    />
                  </div>
                  <div className="input">
                    <Button variant="outlined">Add Trip</Button>
                  </div>
                  <div className="input">
                    <Button variant="contained">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='container-right-box'>
              <div className="TransferDataEntry-Box">
                <div class="booking-update">
                  <div class="Scroll-Style" style={{ overflow: 'scroll', height: '220px', width: '260px' }}>
                    <table>
                      <thead id="update-header">
                        <tr>
                          <th>CompanyName</th>
                          <th>RateType</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colspan="6">No data available.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <Button variant="contained">Add To List</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <Button variant="outlined">Bill Generate</Button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="total-container-TransferDataEntry">
          <div className="Download-btn">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem >Excel</MenuItem>
                    <MenuItem >PDF</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <div className='amount-calculator'>
            <div className="total-inputs" style={{ marginTop: '25px' }}>
              <Button variant="outlined" >Remove Selected</Button>
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Kms:</label>
              <input type="number"  />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Hours:</label>
              <input type="number" />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Amount:</label>
              <input type="number" value={totalAmount} />
            </div>
          </div>
        </div>

        <div className="table-bookingCopy-TransferDataEntry">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
          {error &&
            <div className='alert-popup Error'>
              <div className="popup-icon"><ClearIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{errorMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success'>
              <div className="popup-icon"><FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{successMessage}</p>
            </div>
          }
        </div>
      </form>
    </div>
  )
}

export default TransferDataEntry