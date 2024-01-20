import React, { useState, useEffect } from 'react';
import "./TransferReport.css";
import dayjs from "dayjs";
import axios from "axios";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import Mapinvoice from './Mapinvoice/Mapinvoice';
import Luxuryinvoice from './Luxuryinvoice/Luxuryinvoice';
import Reportinvoice from './Reportinvoice/Reportinvoice';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';

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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { faBuilding, faFileInvoiceDollar, faNewspaper, faTags } from "@fortawesome/free-solid-svg-icons";

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "vcode", headerName: "VCode", width: 130 },
  { field: "guestname", headerName: "User Name", width: 130 },
];

const TransferReport = () => {
  const user_id = localStorage.getItem('useridno');

  const [pbpopupOpen, setpbPopupOpen] = useState(false);
  const [npopupOpen, setnPopupOpen] = useState(false);
  const [lxpopupOpen, setlxPopupOpen] = useState(false);
  const [servicestation, setServiceStation] = useState("");
  const [customer, setCustomer] = useState("");
  const [date] = useState(dayjs());
  const [info, setInfo] = useState(false);
  const [bankOptions, setBankOptions] = useState([]);
  const [tripData, setTripData] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningMessage] = useState({});

  // for page permission

  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = 'CB Billing';
        const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
        setUserPermissions(response.data);
        console.log('permission data', response.data);
      } catch (error) {
        console.error('Error fetching user permissions:', error);
      }
    };

    fetchPermissions();
  }, [user_id]);

  const checkPagePermission = () => {
    const currentPageName = 'CB Billing';
    const permissions = userPermissions || {};

    if (permissions.page_name === currentPageName) {
      return {
        read: permissions.read_permission === 1,
        new: permissions.new_permission === 1,
        modify: permissions.modify_permission === 1,
        delete: permissions.delete_permission === 1,
      };
    }

    return {
      read: false,
      new: false,
      modify: false,
      delete: false,
    };
  };

  const permissions = checkPagePermission();

  // Function to determine if a field should be read-only based on permissions
  const isFieldReadOnly = (fieldName) => {
    if (permissions.read) {
      // If user has read permission, check for other specific permissions
      if (fieldName === "delete" && !permissions.delete) {
        return true;
      }
      return false;
    }
    return true;
  };


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
    if (rows.length === 0) {
      setError(true);
      setErrorMessage('No data available. Please fetch data');
      return;
    }
    setpbPopupOpen(true);
  };
  const handleMapInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage('No data available. Please fetch data');
      return;
    }
    setnPopupOpen(true);
  };

  const handleLuxuryInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage('No data available. Please fetch data');
      return;
    }
    setlxPopupOpen(true);
  };

  const handlePopupClose = () => {
    setpbPopupOpen(false);
    setnPopupOpen(false);
    setlxPopupOpen(false);
    localStorage.removeItem('selectedcustomerdata');
    localStorage.removeItem('selectedcustomer');
    localStorage.removeItem('selectedcustomerid');
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
          if (tripsheetNumbers.length > 0) {
            const rowsWithUniqueId = tripsheetNumbers.map((row, index) => ({
              ...row,
              id: index + 1,
            }));
            setRows(rowsWithUniqueId);
            setSuccess(true);
            setSuccessMessage("successfully listed")
          } else {
            setRows([]);
            setError(true);
            setErrorMessage("no data found")
          }
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

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
  };

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
      console.log('local storage customer name', customer);
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
            setError(true);
            setErrorMessage('Something went wrong.');
          }
        } catch {
          setError(true);
          setErrorMessage('Something went wrong.');
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


  useEffect(() => {
    Organization()
      .then((data) => {
        if (data) {
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

  const [routedData, setRoutedData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fromdate = localStorage.getItem('fromDate');
        const todate = localStorage.getItem('toDate');
        const customerValue = encodeURIComponent(customer) || (tripData.length > 0 ? tripData[0].customer : '');
        const fromDateValue = fromdate;
        const toDateValue = todate;
        const servicestationValue = servicestation || (tripData.length > 0 ? tripData[0].department : '');

        console.log('customer:', customerValue, 'fromDate:', fromDateValue, 'toDate:', toDateValue, 'servicestation:', servicestationValue);

        const response = await axios.get(`http://localhost:8081/Get-Billing`, {
          params: {
            customer: customerValue,
            fromDate: fromDateValue,
            toDate: toDateValue,
            servicestation: servicestationValue
          },
        });

        const routedData = response.data;
        setRoutedData(routedData);
        console.log(routedData);
      } catch (error) {
        setError(true);
        setErrorMessage('Error fetching tripsheet data.');
        console.error(error);
      }
    };

    fetchData();
  }, [customer, servicestation, tripData]);

  const [rateType, setRateType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const customer = localStorage.getItem('selectedcustomerid');
      try {
        const response = await fetch(`http://localhost:8081/customers/${encodeURIComponent(customer)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rateType = await response.json();
        setRateType(rateType);
        console.log('rate type', rateType);
      } catch {
        setError(true);
        setErrorMessage('Error fetching tripsheet data.');
      }
    };
    fetchData();
  }, []);

  const ratename = (rateType?.rateType) || '';
  console.log('ratetype name', ratename);


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
                    disabled={isFieldReadOnly("read")}
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
                    value={routedData?.[0]?.invoiceno || ''}
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
                        name="date"
                        value={date}
                        format="DD/MM/YYYY"
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
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={customer || (tripData.length > 0 ? tripData[0].customer : '')}
                    options={bankOptions}
                    onChange={(event, value) => setCustomer(value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Organization" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    label="Rate Type"
                    value={(rateType?.rateType) || ''}
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    label="Invoice Date"
                    value={(routedData?.[0]?.Billingdate) || ''}
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" >
                  <TextField
                    size="small"
                    id="id"
                    label="From Date"
                    value={(routedData?.[0]?.fromdate) || ''}
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
                <div className="input" >
                  <TextField
                    size="small"
                    id="id"
                    label="To Date"
                    value={(routedData?.[0]?.todate) || ''}
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faBuilding} size="xl" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={servicestation || (tripData.length > 0 ? tripData[0].department : '') || ''}
                    options={Stations.map((option) => ({
                      label: option.optionvalue,
                    }))}
                    onChange={(event, value) => handleserviceInputChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Stations" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained" onClick={() => handleEInvoiceClick()} disabled={isFieldReadOnly("new")}>PDF Bill</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="outlined" disabled={isFieldReadOnly("new")} >Booking Mail</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained" onClick={() => handleMapInvoiceClick()} disabled={isFieldReadOnly("new")}>Image With Invoice Normal</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained" onClick={() => handleLuxuryInvoiceClick()} disabled={isFieldReadOnly("new")}>Image With Invoice Luxury</Button>
                </div>
              </div>
            </div>
            <Dialog open={pbpopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Reportinvoice
                  routedData={routedData}
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
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{warningMessage}</p>
            </div>
          }
        </div>
      </form>
    </div>
  )
}

export default TransferReport