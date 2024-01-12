import React, { useState, useEffect, useCallback } from 'react';
import "./TransferDataEntry.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
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

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "startdate", headerName: "TripDate", width: 130 },
  { field: "tripid", headerName: "Trip No", width: 130 },
  { field: "customer", headerName: "Customer", width: 130 },
  { field: "vehRegNo", headerName: "VehicleReg.No", width: 130 },
  { field: "vehType", headerName: "VehicleType", width: 130 },
  { field: "guestname", headerName: "UserName", width: 150 },
  { field: "groupname", headerName: "GroupName", width: 130 },
  { field: "totaltime", headerName: "Hours", width: 150 },
  { field: "totaldays", headerName: "Days", width: 150 },
  { field: "totalkm1", headerName: "KMS", width: 150 },
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
];

const TransferDataEntry = () => {
  const [rows, setRows] = useState([]);
  const [totalKm, setTotalKM] = useState(0);
  const [error, setError] = useState(false);
  const [customer, setCustomer] = useState("");
  const [tripData, setTripData] = useState('');
  const [toDate, setToDate] = useState(dayjs());
  const [success, setSuccess] = useState(false);
  const [totalTime, setTotalTime] = useState('');
  const [invoiceno] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [Billingdate] = useState(dayjs());
  const [date] = useState(dayjs());
  const [totalAmount, setTotalAmount] = useState(0);
  const [bankOptions, setBankOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState({});
  const [servicestation, setServiceStation] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});

  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Transfer_DataEntry.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF('landscape');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Transfer_DataEntry", 10, 10);
    const tableData = rows.map((row) => [
      row['id'],
      row['status'],
      row['startdate'],
      row['tripid'],
      row['customer'],
      row['vehRegNo'],
      row['vehType'],
      row['guestname'],
      row['netamount']
    ]);
    pdf.autoTable({
      head: [['Sno', 'Status', 'TripDate', 'Trip No', 'Customer', 'VehicleReg.No', 'VehicleType', 'UserName', 'Amount']],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Transfer_DataEntry.pdf');
  };

  const handleCancel = () => {
    setBook('');
    setCustomer('');
    setRows([]);
    setTripData('');
    setServiceStation('');
    setSelectedCustomerDatas('');
    localStorage.removeItem('selectedcustomerdata');
    localStorage.removeItem('selectedcustomer');
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
      department: originalRow.department,
      vehRegNo: originalRow.vehRegNo,
      vehType: originalRow.vehType,
      guestname: originalRow.guestname,
      groupname: originalRow.groupname,
      totaltime: originalRow.totaltime,
      totaldays: originalRow.totaldays,
      totalkm1: originalRow.totalkm1,
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
          const rowsWithUniqueId = transformedRows.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setTripData(rowsWithUniqueId);
          setRows(rowsWithUniqueId);
          if (transformedRows.length > 0) {
            setFromDate(dayjs(transformedRows[0].startdate));
            setToDate(dayjs(transformedRows[transformedRows.length - 1].startdate));
          }
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

  //calculate total KM in column
  useEffect(() => {
    const calculatedTotalKM = rows.reduce((total, row) => total + parseFloat(row.totalkm1 || 0), 0);
    if (!isNaN(calculatedTotalKM)) {
      setTotalKM(calculatedTotalKM.toFixed(2));
    } else {
      setTotalKM("0");
    }
  }, [rows]);

  //calculate total time in column
  const parseTimeToMinutes = (timeString) => {
    const [hoursStr, minutesStr] = timeString.split(' ');
    const hours = parseInt(hoursStr.replace('h', ''), 10) || 0;
    const minutes = parseInt(minutesStr.replace('m', ''), 10) || 0;
    return hours * 60 + minutes;
  };

  // Calculate total time in minutes from the "totaltime" column
  useEffect(() => {
    const calculatedTotalTimeInMinutes = rows.reduce((totalMinutes, row) => {
      return totalMinutes + parseTimeToMinutes(row.totaltime || '0h 0m');
    }, 0);
    // Convert total minutes back to the format "3h 49m"
    const hours = Math.floor(calculatedTotalTimeInMinutes / 60);
    const minutes = calculatedTotalTimeInMinutes % 60;
    const formattedTotalTime = `${hours}h ${minutes}m`;
    console.log('total tiime: ', formattedTotalTime);
    setTotalTime(formattedTotalTime);
  }, [rows]);

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
  }, []);

  const [book, setBook] = useState({
    Billingdate: '',
    invoiceno: '',
    customer: '',
    fromdate: '',
    todate: '',
    station: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
  };

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
    handleAdd();
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

  const handleDateChange = (date, name) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
    setBook((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
    setSelectedCustomerDatas((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
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

  // const reversedRows = [...rows].reverse();

  const handleAdd = async () => {
    const updatedBook = {
      ...book,
      Billingdate: Billingdate || book.Billingdate,
      invoiceno: invoiceno || book.invoiceno,
      customer: customer || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '') || '',
      fromdate: (fromDate || book.fromdate).format('YYYY-MM-DD'),
      todate: (toDate || book.todate).format('YYYY-MM-DD'),
      station: servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '',
    };
    await axios.post('http://localhost:8081/billing', updatedBook);
    setSuccess(true);
    setSuccessMessage("Successfully Added");
  };

  const handleKeyenter = useCallback(async (event) => {
    if (event.key === 'Enter') {
      try {
        const invoiceNumber = book.invoiceno || invoiceno || selectedCustomerDatas.invoiceno;
        console.log('Sending request for invoiceno:', invoiceNumber);
        const response = await axios.get(`http://localhost:8081/billingdata/${invoiceNumber}`);
        if (response.status === 200) {
          const billingDetails = response.data;
          if (billingDetails) {
            setSelectedCustomerDatas(billingDetails);
            setSuccess(true);
            setSuccessMessage("Successfully listed");
          } else {
            setRows([]);
            setError(true);
            setErrorMessage("No data found");
          }
        } else {
          setError(true);
          setErrorMessage(`Failed to retrieve billing details. Status: ${response.status}`);
        }
      } catch (error) {
        setError(true);
        setErrorMessage('Error retrieving billings details.', error);
      }
    }
  }, [invoiceno, book, selectedCustomerDatas]);

  const handleShow = useCallback(async () => {
    try {
      const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
      const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
      const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
      const servicestationValue = servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '';

      console.log('Selected values:', { customer: customerValue, fromDate: fromDateValue, toDate: toDateValue, servicestation: servicestationValue });

      const response = await axios.get(`http://localhost:8081/Group-Billing`, {
        params: {
          customer: customerValue,
          fromDate: fromDateValue,
          toDate: toDateValue,
          servicestation: servicestationValue
        },
      });
      const data = response.data;
      if (data.length > 0) {
        const rowsWithUniqueId = data.map((row, index) => ({
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
    } catch {
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  }, [customer, fromDate, toDate, servicestation, selectedCustomerDatas, tripData]);

  const handleButtonClickBilling = (selectedRow) => {
    const billingPageUrl = `/home/billing/billing?Billingdate=${selectedRow.Billingdate || ''}&customer=${selectedRow.customer || ''}`;
    window.location.href = billingPageUrl;
  }

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
                        label="Date"
                        name="date"
                        value={date}
                        format="DD/MM/YYYY"
                      />
                      <DatePicker
                        label="Bill Date"
                        name="Billingdate"
                        value={Billingdate || selectedCustomerDatas?.Billingdate ? dayjs(selectedCustomerDatas?.Billingdate) : null}
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
                      value={invoiceno || book.invoiceno || selectedCustomerDatas.invoiceno || ''}
                      onChange={handleChange}
                      autoComplete='off'
                      onKeyDown={handleKeyenter}
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
                      value={customer || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '') || ''}
                      options={bankOptions}
                      onChange={(event, value) => setCustomer(value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
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
                          value={selectedCustomerDatas.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate || ''}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'fromdate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                            setFromDate(parsedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.fromdate} />
                          )}
                        </DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          value={selectedCustomerDatas.todate ? dayjs(selectedCustomerDatas.todate) : toDate || ''}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'todate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                            setFromDate(parsedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.todate} />
                          )}
                        </DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
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
                      value={servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || ''}
                      options={Stations.map((option) => ({
                        label: option.optionvalue,
                      }))}
                      onChange={(event, value) => handleserviceInputChange(event, value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Stations" name='station' inputRef={params.inputRef} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="input-field" >
                  <div className="input">
                    <Button variant="contained" onClick={handleShow}>List</Button>
                  </div>
                  <div className="input">
                    <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                  </div>
                  <div className="input">
                    <Button variant="outlined" onClick={handleClickGenerateBill}>Bill Generate</Button>
                  </div>
                </div>
                <div className="input-field">
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
              <input type="text" value={totalKm} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Hours:</label>
              <input type="text" value={totalTime} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Amount:</label>
              <input type="text" value={totalAmount} readOnly />
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-TransferDataEntry">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              // rows={reversedRows}
              rows={rows}
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