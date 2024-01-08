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

//for popup
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

//for pdf
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

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
  { field: "guestname", headerName: "User Name", width: 130 },
];

const TransferReport = () => {
  const [pbpopupOpen, setpbPopupOpen] = useState(false);
  const [npopupOpen, setnPopupOpen] = useState(false);
  const [lxpopupOpen, setlxPopupOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [tripData, setTripData] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage,] = useState({});

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
  }, []);

  const tableData = rows.map((row) => [
    row['id'],
    row['tripid'],
    row['vcode'],
    row['guestname'],
  ]);
  const handleExcelDownload = () => {
    const header = ['Sno', 'Tripsheet No', 'VCode', 'Guest Name'];
    const csvData = [header, ...tableData.map(row => row.map(value => `"${value}"`))].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "customer_details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Customer Details", 10, 10);
    pdf.autoTable({
      head: [['Sno', 'Tripsheet No', 'VCode', 'Guest Name']],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Transfer Report.pdf');
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
    localStorage.removeItem('selectedcustomerdata');
    localStorage.removeItem('selectedcustomer');
  };

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripid = localStorage.getItem('selectedtripsheetid');
        const encoded = localStorage.getItem('selectedcustomerdata');
        localStorage.setItem('selectedcustomer', encoded);
        const storedCustomer = localStorage.getItem('selectedcustomer');
        const customer = decodeURIComponent(storedCustomer);
        console.log('final customer data', customer);
        console.log('collected data from dataentry', tripid, customer);
        const response = await fetch(`http://localhost:8081/tripsheetcustomertripid/${encodeURIComponent(customer)}/${tripid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json();
        if (Array.isArray(tripData)) {
          setTripData(tripData);
          const tripsheetNumbers = tripData.map((row, index) => ({
            id: index + 1,
            guestname: row.guestname,
            tripid: row.tripid
          }));
          setRows(tripsheetNumbers);
        } else if (typeof tripData === 'object') {
          const tripsheetNumbers = [{ id: 1, guestname: tripData.guestname, tripid: tripData.tripid }];
          setRows(tripsheetNumbers);
        } else {
        }
      } catch {
        setError(true);
        setErrorMessage("something went wrong.");
      }
    };
    fetchData();
  }, []);

  const customerName = localStorage.getItem('selectedcustomerdata');
  localStorage.setItem('selectedcustomer', customerName);

  //tripsheet data get for normal invoice
  const [routeData, setRouteData] = useState('');
  const [customerData, setCustomerData] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [roundedAmount, setRoundedAmount] = useState('');
  const [sumTotalAndRounded, setSumTotalAndRounded] = useState('');

  const calculateNetAmountSum = (data) => {
    return data.reduce((sum, item) => {
      const netAmountValue = parseFloat(item.netamount, 10);
      return sum + netAmountValue;
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tripid = localStorage.getItem('selectedtripsheetid');
      const customer = localStorage.getItem('selectedcustomer');
      if (customer) {
        try {
          const response = await fetch(`http://localhost:8081/tripsheetcustomertripid/${customer}/${tripid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            setRouteData(responseData);
            const netAmountSum = calculateNetAmountSum(responseData);
            setTotalValue(netAmountSum);
            const calculateRoundOff = () => {
              const balanceAmount = parseFloat(totalValue);
              const roundedGrossAmount = Math.ceil(balanceAmount);
              const roundOff = roundedGrossAmount - balanceAmount;
              return roundOff.toFixed(2);
            };
            const roundOffValue = calculateRoundOff();
            setRoundedAmount(roundOffValue);
            const sumTotalAndRounded = parseFloat(totalValue) + parseFloat(roundedAmount);
            setSumTotalAndRounded(sumTotalAndRounded);
          } else {
          }
        } catch {
        }
      }
    };
    fetchData();
  }, [totalValue, roundedAmount]);

  useEffect(() => {              //this is for getting organization details
    const fetchData = async () => {
      const customer = localStorage.getItem('selectedcustomerid');
      try {
        const response = await fetch(`http://localhost:8081/customers/${encodeURIComponent(customer)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const customerData = await response.json();
        setCustomerData(customerData);
      } catch {
      }
    };
    fetchData();
  }, []);

  const organizationaddress1 = customerData.address1;
  const organizationaddress2 = customerData.address2;
  const organizationcity = customerData.city;
  const organizationgstnumber = customerData.gstnumber;

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
                  <select name="branch" className="input-select" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                    <option value="" disabled>Select a city</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
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
                <Reportinvoice
                  routeData={routeData}
                  roundedAmount={roundedAmount}
                  sumTotalAndRounded={sumTotalAndRounded}
                  totalValue={totalValue}
                  organizationaddress1={organizationaddress1}
                  organizationaddress2={organizationaddress2}
                  organizationcity={organizationcity}
                  organizationgstnumber={organizationgstnumber}
                />
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
                  <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                  <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
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
                disableRowSelectionOnClick
              />
            </div>
          </div>
          <div className="tripsheet-table-transferReport">
            <div className="TransferReport-Box">
              <div className="booking-update">
                <div className="Scroll-Style" style={{ overflow: 'scroll', height: 300, width: "100%" }}>
                  <table>
                    <thead id="update-header">
                      <tr>
                        <th>TripSheet No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={6}>No data available.</td>
                        </tr>
                      ) : (
                        rows.map((rows) => (
                          <tr id='update-row' key={rows.tripid} >
                            <td>TS {rows.tripid}</td>
                          </tr>
                        ))
                      )}
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

export default TransferReport