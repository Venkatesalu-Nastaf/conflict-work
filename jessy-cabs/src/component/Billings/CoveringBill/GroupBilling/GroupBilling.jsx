import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./GroupBilling.css";
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import Coverpdf from './coverpdf/Coverpdf';
import { DataGrid } from "@mui/x-data-grid";
import ReactDOMServer from 'react-dom/server';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from "@mui/material";
import { Menu, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "billingno", headerName: "Bill No", width: 130 },
    { field: "billdate", headerName: "Bill Date", width: 130 },
    { field: "tripid", headerName: "Trip No", width: 150 },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "vehRegNo", headerName: "Vehcile No", width: 150 },
    { field: "vehType", headerName: "Vehcile Type", width: 150 },
    { field: "totalkm1", headerName: "KMS", width: 130 },
    { field: "totaltime", headerName: "Hours", width: 130 },
    { field: "totaldays", headerName: "Days", width: 130 },
    { field: "duty", headerName: "Duty", width: 130 },
    { field: "advancepaidtovendor", headerName: "Advance", width: 150 },
    { field: "gst", headerName: "GST%", width: 130 },
    { field: "permit", headerName: "Permit", width: 150 },
    { field: "toll", headerName: "Toll", width: 150 },
    { field: "parking", headerName: "Parking", width: 150 },
    { field: "netamount", headerName: "Net Amount", width: 130 },
    { field: "tripid", headerName: "Trip ID", width: 130 },
    { field: "guestname", headerName: "UserName", width: 150 },
];

const GroupBilling = () => {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [tripData, setTripData] = useState("");
    const [customer, setCustomer] = useState("");
    const [toDate, setToDate] = useState(dayjs());
    const [Billingdate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [invoiceno] = useState("");
    const [totalValue, setTotalValue] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [bankOptions, setBankOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [roundedAmount, setRoundedAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState({});
    const [servicestation, setServiceStation] = useState("");
    const [sumTotalAndRounded, setSumTotalAndRounded] = useState('');
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});

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

    // const handleInputChange = (event, newValue) => {
    //     if (event.target.name === 'customer') {
    //         setInvoiceNo(newValue ? newValue.label : '');
    //     }
    // };
    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };


    const [book, setBook] = useState({
        Billingdate: '',
        invoiceno: '',
        customer: '',
        fromdate: '',
        todate: '',
        station: '',
    });

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

    const calculateNetAmountSum = (data) => {
        return data.reduce((sum, item) => {
            const netAmountValue = parseFloat(item.netamount, 10);
            if (isNaN(netAmountValue) || !isFinite(netAmountValue)) {
                console.error(`Invalid netamount value: ${item.netamount}`);
                return sum;
            }
            return sum + netAmountValue;
        }, 0);
    };

    // const handleShow = useCallback(async () => {
    //     try {
    //         console.log('Selected values:', { invoiceno, customer, fromDate: fromDate.format('DD/MM/YYYY'), toDate: toDate.format('DD/MM/YYYY'), servicestation, });
    //         const response = await axios.get(`http://localhost:8081/Group-Billing`, {
    //             params: {
    //                 invoiceno,
    //                 customer: encodeURIComponent(customer),
    //                 fromDate: fromDate.format('YYYY-MM-DD'),
    //                 toDate: toDate.format('YYYY-MM-DD'),
    //                 servicestation: encodeURIComponent(servicestation),
    //             },
    //         });

    //         const data = response.data;

    //         if (Array.isArray(data)) {
    //             setRows(data);
    //             const netAmountSum = calculateNetAmountSum(data);
    //             setTotalValue(netAmountSum);
    //             const calculateRoundOff = () => {
    //                 const balanceAmount = parseFloat(totalValue);
    //                 const roundedGrossAmount = Math.ceil(balanceAmount);
    //                 const roundOff = roundedGrossAmount - balanceAmount;
    //                 return roundOff.toFixed(2);
    //             };
    //             const roundOffValue = calculateRoundOff();
    //             setRoundedAmount(roundOffValue);
    //             const sumTotalAndRounded = parseFloat(totalValue) + parseFloat(roundedAmount);
    //             setSumTotalAndRounded(sumTotalAndRounded);
    //             setTripData(data);
    //             setSuccess(true);
    //             setSuccessMessage("Successfully listed")
    //         } else {
    //             setRows([]);
    //             setError(true);
    //             setErrorMessage("No data found");
    //         }
    //     } catch (error) {
    //         setRows([]);
    //         setError(true);
    //         setErrorMessage("Check your Network Connection");
    //     }
    // }, [invoiceno, customer, fromDate, toDate, servicestation, roundedAmount, totalValue]);

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
            if (Array.isArray(data)) {
                setRows(data);
                const netAmountSum = calculateNetAmountSum(data);
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
                setTripData(data);
                setSuccess(true);
                setSuccessMessage("Successfully listed")
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("No data found");
            }
        } catch {
            setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    }, [customer, fromDate, toDate, servicestation, selectedCustomerDatas, tripData, roundedAmount, totalValue]);

    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Group Billing.csv");
    };

    const handleCoverPDFDownload = () => {
        if (rows.length === 0) {
            setError(true);
            setErrorMessage('No data available. Please fetch data');
            return;
        }
        const coverpdfComponent = <Coverpdf tripData={tripData} totalValue={totalValue} roundedAmount={roundedAmount} sumTotalAndRounded={sumTotalAndRounded} />;
        const coverpdfHtml = ReactDOMServer.renderToString(coverpdfComponent);
        return coverpdfHtml;
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

    return (
        <div className="GroupBilling-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-GroupBilling">
                            <div className="input-field" >
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                                    </div>
                                    {/* <TextField
                                        size="small"
                                        id="id"
                                        label="Invoice No"
                                        name="invoiceno"
                                        value={invoiceno || ''}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    /> */}
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
                                <div className="input" style={{ width: "230px" }}>
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
                                <div className="input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Bill Date"
                                                name="Billingdate"
                                                value={Billingdate || selectedCustomerDatas?.Billingdate ? dayjs(selectedCustomerDatas?.Billingdate) : null}
                                                format="DD/MM/YYYY"
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
                                                    setToDate(parsedDate);
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
                            <div className="input-field">
                                <div className="input" style={{ width: "140px" }}>
                                    <Button variant="contained" onClick={handleShow}>View Bill</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="download-container">
                    <div className="Download-btn">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                                        Download
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                                        <MenuItem onClick={handleCoverPDFDownload}>GST PDF</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "140px" }}>
                            <Button variant="contained">Delete Invoice</Button>
                        </div>
                        <div className="input" >
                            <Button variant="contained">Delete Selected Bill</Button>
                        </div>
                    </div>
                </div>

                <div className="table-bookingCopy-GroupBilling">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </div>
                    {error &&
                        <div className='alert-popup Error' >
                            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{errorMessage}</p>
                        </div>
                    }
                    {success &&
                        <div className='alert-popup Success' >
                            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{successMessage}</p>
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default GroupBilling