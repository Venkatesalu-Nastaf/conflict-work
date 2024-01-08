import React, { useState, useEffect, useCallback } from 'react';
import "./TransferDataEntry.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, FormControlLabel, Menu, TextField } from "@mui/material";
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { Autocomplete } from "@mui/material";

//for pdf
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

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
];

const TransferDataEntry = () => {
  const [rows, setRows] = useState([]);
  const [customer, setCustomer] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [tripData, setTripData] = useState('');
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [bankOptions, setBankOptions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [invoiceno, setInvoiceNo] = useState("");
  const [servicestation, setServiceStation] = useState("");

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

  const transformRow = (originalRow) => {
    return {
      id: originalRow.id,
      startdate: originalRow.startdate,
      tripid: originalRow.tripid,
      customer: originalRow.customer,
      vehRegNo: originalRow.vehRegNo,
      vehType: originalRow.vehType,
      guestname: originalRow.guestname,
      groupname: originalRow.groupname,
      totaltime: originalRow.totaltime,
      totaldays: originalRow.totaldays,
      duty: originalRow.duty,
      permit: originalRow.permit,
      parking: originalRow.parking,
      billno: originalRow.billno,
      exHrs: originalRow.exHrs,
      exkm: originalRow.exkm,
      netamount: originalRow.netamount,
      grouptripno: originalRow.grouptripno,
      billtype: originalRow.billtype,
      advancepaidtovendor: originalRow.advancepaidtovendor,
      taxStatus: originalRow.taxStatus,
      status: originalRow.status,
    };
  };

  const handleShow = useCallback(async () => {
    try {
      console.log('Selected values:', { invoiceno, customer, fromDate: fromDate.format('DD/MM/YYYY'), toDate: toDate.format('DD/MM/YYYY'), servicestation, });
      const response = await axios.get(`http://localhost:8081/Group-Billing`, {
        params: {
          invoiceno,
          customer: encodeURIComponent(customer),
          fromDate: fromDate.format('YYYY-MM-DD'),
          toDate: toDate.format('YYYY-MM-DD'),
          servicestation: encodeURIComponent(servicestation),
        },
      });

      const data = response.data;

      if (data.length > 0) {
        setRows(data);
        setSuccess(true);
        setSuccessMessage("Successfully listed")
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("No data found");
      }
    } catch (error) {
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  }, [invoiceno, customer, fromDate, toDate, servicestation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer = localStorage.getItem('selectedcustomer');
        const response = await fetch(`http://localhost:8081/tripsheetcustomer/${customer}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json();
        if (Array.isArray(tripData)) {
          const transformedRows = tripData.map(transformRow);
          setTripData(transformedRows);
          setRows(transformedRows);
        } else if (typeof tripData === 'object') {
          setRows([transformRow(tripData)]);
        } else {
          setError(true);
          setErrorMessage('Fetched data has unexpected format.');
        }
      } catch {
      }
    };
    fetchData();
  }, []);

  //calculate total amount in column
  useEffect(() => {
    const calculatedTotalAmount = rows.reduce((total, row) => total + parseFloat(row.netamount || 0), 0);
    if (!isNaN(calculatedTotalAmount)) {
      setTotalAmount(calculatedTotalAmount.toFixed(2));
    } else {
      setTotalAmount("0");
    }
  }, [rows]);

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
  }, []);

  const [book, setBook] = useState({
    tripid: '',
    invoiceno: '',
    Search: '',
    emptyfield: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleInputChange = (event, newValue) => {
    if (event.target.name === 'customer') {
      setInvoiceNo(newValue ? newValue.label : '');
    }
  };

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
  };

  // const handleRowSelection = (newSelectionModel) => {
  //   const selectedTripIds = newSelectionModel
  //     .filter((selectedId) => selectedId !== null)
  //     .map((selectedId) => {
  //       const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
  //       return selectedRow ? selectedRow.tripid : null;
  //     })
  //     .filter((tripid) => tripid !== null);
  //   setRowSelectionModel(selectedTripIds);
  //   const tripsheetid = selectedTripIds;
  //   localStorage.setItem('selectedtripsheetid', tripsheetid);
  // };

  const handleRowSelection = (newSelectionModel) => {
    const selectedTripIds = newSelectionModel
      .filter((selectedId) => selectedId !== null)
      .map((selectedId) => {
        const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
        return selectedRow ? selectedRow.tripid : null;
      })
      .filter((tripid) => tripid !== null);

    setRowSelectionModel(selectedTripIds);
    const tripsheetid = selectedTripIds;
    localStorage.setItem('selectedtripsheetid', tripsheetid);

    console.log('Selected Trip IDs:', selectedTripIds);
  };

  const handleClickGenerateBill = () => {
    handleButtonClickTripsheet();
    handleBillGenerate();
  };

  const handleButtonClickTripsheet = (row) => {
    const customerdata = encodeURIComponent(customer || tripData.customer || localStorage.getItem('selectedcustomer'));
    const customername = customerdata;
    console.log('customer name', customername);
    localStorage.setItem('selectedcustomer', customername);
    const storedCustomer = localStorage.getItem('selectedcustomer');
    const decodedCustomer = decodeURIComponent(storedCustomer);
    localStorage.setItem('selectedcustomerdata', decodedCustomer);
    console.log(decodedCustomer);
    const billingPageUrl = `/home/billing/transfer?tab=TransferReport`;
    window.location.href = billingPageUrl;
  }

  const handleBillGenerate = async () => {
    if (rowSelectionModel.length === 0) {
      setError(true);
      setErrorMessage('Please select rows before generating the bill.');
      return;
    }

    try {
      const tripids = rowSelectionModel;

      if (tripids.some((tripid) => tripid === null || tripid === undefined)) {
        setError(true);
        setErrorMessage('Invalid tripids. Please check the selected rows and try again.');
        return;
      }

      const response = await axios.post('http://localhost:8081/updateStatus', {

        tripids: tripids.filter((tripid) => tripid !== null && tripid !== undefined),
        status: 'CBilled',
      });

      if (response.status === 200) {
        setSuccess(true);
        setSuccessMessage('Bill generated successfully!');
      } else {
        setError(true);
        setErrorMessage('Failed to generate bill. Please try again.');
      }
    } catch {
      setError(true);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleBillRemove = async () => {
    if (rowSelectionModel.length === 0) {
      setError(true);
      setErrorMessage('Please select rows before generating the bill.');
      return;
    }
    try {
      const tripids = rowSelectionModel;
      if (tripids.some((tripid) => tripid == null)) {
        setError(true);
        setErrorMessage('Invalid tripids. Please check the selected rows and try again.');
        return;
      }
      const response = await axios.post('http://localhost:8081/updateStatusremove', {
        tripids: tripids,
        status: 'Closed',
      });
      if (response.status === 200) {
        setSuccess(true);
        setSuccessMessage('Removed successfully!');
      } else {
        setError(true);
        setErrorMessage('Failed to Remove bill. Please try again.');
      }
    } catch {
      setError(true);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const reversedRows = [...rows].reverse();

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
                      value={book.tripid || ''}
                      onChange={handleChange}
                      autoComplete='off'
                    />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="From Date"
                        format="DD/MM/YYYY"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                      />
                      <DatePicker
                        label="To Date"
                        format="DD/MM/YYYY"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
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
                      value={invoiceno || ''}
                      onChange={handleInputChange}
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
                    <Button variant="contained" onClick={handleShow}>List</Button>
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
                      name="Search"
                      value={book.Search || ''}
                      onChange={handleChange}
                      autoComplete='off'
                    />
                  </div>
                  <div className="input" >
                    <TextField
                      size="small"
                      id="id"
                      name='emptyfield'
                      value={book.emptyfield || ''}
                      onChange={handleChange}
                      label=""
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
                      value={servicestation}
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
                <div className="booking-update">
                  <div className="Scroll-Style" style={{ overflow: 'scroll', height: '220px', width: '260px' }}>
                    <table>
                      <thead id="update-header">
                        <tr>
                          <th>CompanyName</th>
                          <th>RateType</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="6">No data available.</td>
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
                  <Button variant="outlined" onClick={handleClickGenerateBill}>Bill Generate</Button>
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
                    <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                    <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <div className='amount-calculator'>
            <div className="total-inputs" style={{ marginTop: '25px' }}>
              <Button variant="outlined" onClick={handleBillRemove} >Remove Selected</Button>
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Kms:</label>
              <input type="number" readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Hours:</label>
              <input type="number" readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Amount:</label>
              <input type="number" value={totalAmount} readOnly />
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-TransferDataEntry">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
                handleRowSelection(newRowSelectionModel);
              }}
              checkboxSelection
              disableRowSelectionOnClick
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