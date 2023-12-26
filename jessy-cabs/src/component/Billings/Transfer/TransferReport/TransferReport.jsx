import React, { useState, useEffect } from 'react';
import "./TransferReport.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import Mapinvoice from './Mapinvoice/Mapinvoice';
import Luxuryinvoice from './Luxuryinvoice/Luxuryinvoice';
import Reportinvoice from './Reportinvoice/Reportinvoice';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

//dialog box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { faBuilding, faFileInvoiceDollar, faNewspaper, faTags } from "@fortawesome/free-solid-svg-icons";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "vcode", headerName: "VCode", width: 130 },

];

const TransferReport = () => {
  const [pbpopupOpen, setpbPopupOpen] = useState(false);
  const [npopupOpen, setnPopupOpen] = useState(false);
  const [lxpopupOpen, setlxPopupOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [tripData, setTripData] = useState('');
  const [rows, setRows] = useState([]);

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

  const handleEInvoiceClick = (row) => {
    setpbPopupOpen(true);
  };
  const handleMapInvoiceClick = (row) => {
    setnPopupOpen(true);
  };

  const handleLuxuryInvoiceClick = (row) => {
    setlxPopupOpen(true);
  };

  const handlePopupClose = () => {
    setpbPopupOpen(false);
    setnPopupOpen(false);
    setlxPopupOpen(false);
  };

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  // const transformRow = (originalRow) => {
  //   return {
  //     id: originalRow.id,
  //     vcode: originalRow.vcode,
  //   };
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer = localStorage.getItem('selectedcustomer');
        console.log('localstorage customer name', customer);
        const response = await fetch(`http://localhost:8081/tripsheetcustomer/${customer}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json(); // Parse JSON data
        console.log('tripsheet data ', tripData);
        if (Array.isArray(tripData)) {
          setTripData(tripData);
          setRows(tripData);
        } else if (typeof tripData === 'object') {
          setRows(tripData);
        } else {
          console.error('Fetched data has unexpected format:', tripData);
        }
      } catch (error) {
        console.error('Error fetching tripsheet data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="TransferReport-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-TransferReport">
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faTags} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Reference No"
                    name="referenceno"
                    autoComplete='off'
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
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
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="MIS Format"
                    name="misformat"
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Customer Name"
                    value={tripData.customer || (tripData.length > 0 ? tripData[0].customer : '')}
                    sx={{ width: "400px" }}
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    label="Rate Type"
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Invoice Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <div className="input" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="From Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input" >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="To Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="outlined">List</Button>
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained">Excel</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" onClick={() => handleEInvoiceClick()}>PDF Bill</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="outlined" >Booking Mail</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained" onClick={() => handleMapInvoiceClick()}>Image With Invoice Normal</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained" onClick={() => handleLuxuryInvoiceClick()}>Image With Invoice Luxury</Button>
                </div>
              </div>
            </div>
            <Dialog open={pbpopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                {/* <Paymentinvoice tripSheetData={tripSheetData} BalanceValue={BalanceValue} TotalAmountValue={TotalAmountValue} roundOff={roundOffValue} book={book} selectedCustomerData={selectedCustomerData} /> */}
                <Reportinvoice />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* //mapinnvoice */}
            <Dialog open={npopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                {/* <Paymentinvoice tripSheetData={tripSheetData} BalanceValue={BalanceValue} TotalAmountValue={TotalAmountValue} roundOff={roundOffValue} book={book} selectedCustomerData={selectedCustomerData} /> */}
                <Mapinvoice />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* luxuryinvoice */}
            <Dialog open={lxpopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                {/* <Paymentinvoice tripSheetData={tripSheetData} BalanceValue={BalanceValue} TotalAmountValue={TotalAmountValue} roundOff={roundOffValue} book={book} selectedCustomerData={selectedCustomerData} /> */}
                <Luxuryinvoice />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
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
        <div className="billing-tables-TransferReport">
          <div className="table-bookingCopy-TransferReport">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </div>
          <div className="tripsheet-table-transferReport">
            <div className="TransferReport-Box">
              <div class="booking-update">
                <div class="Scroll-Style" style={{ overflow: 'scroll', height: 300, width: "100%" }}>
                  <table>
                    <thead id="update-header">
                      <tr>
                        <th>TripSheet No</th>
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
              <div className="input" style={{ width: "150px" }}>
                <Button variant="outlined">Select</Button>
              </div>
              <div className="input" style={{ width: "150px" }}>
                <Button variant="contained">Unselect</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TransferReport