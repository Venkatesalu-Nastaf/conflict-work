import React, { useState, useEffect, useCallback } from 'react';
import "./TransferList.css";
import axios from "axios";
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { Stations } from "../../../Bookings/Receiveds/Pending/PendingData";

// ICONS
import { faBuilding, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

// Assuming you have unique IDs in your data, you can set the `id` field dynamically

const TransferList = () => {
    const user_id = localStorage.getItem('useridno');

    const [selectedStatus, setSelectedStatus] = useState('');
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [customer, setCustomer] = useState("");
    const [bankOptions, setBankOptions] = useState([]);
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState({});
    const [servicestation, setServiceStation] = useState("");

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

    const checkPagePermission = useCallback(async () => {
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
    }, [userPermissions]);


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
        setWarning(false);
    };
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);

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

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

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

    const handleShow = useCallback(async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.read) {
            try {
                const response = await axios.get(`http://localhost:8081/payment-detail`, {
                    params: {
                        customer: encodeURIComponent(customer),
                        fromDate: fromDate.format('YYYY-MM-DD'),
                        toDate: toDate.format('YYYY-MM-DD'),
                        servicestation: encodeURIComponent(servicestation),
                    },
                });

                const data = response.data;

                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                        Trips: row.trip_count,
                        toll: row.total_toll,
                        amount: row.total_Amount,
                        grossamount: row.total_Amount,
                        guestname: row.customer,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
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
        } else {
            setWarning(true);
            setWarningMessage("You do not have permission.");
        }
    }, [customer, fromDate, toDate, servicestation, checkPagePermission]);

    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "vcode", headerName: "VCode", width: 130 },
        { field: "invoiceno", headerName: "Invoice No", width: 130 },
        { field: "date", headerName: "Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
        { field: "customer", headerName: "Customer", width: 130 },
        { field: "monthid", headerName: "MonthID", width: 130 },
        { field: "fdate", headerName: "From Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
        { field: "tdate", headerName: "To Date", width: 150, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
        { field: "guestname", headerName: "UserName", width: 150 },
        { field: "Trips", headerName: "Trips", width: 150 },
        { field: "Subtotal", headerName: "SubTotal", width: 150 },
        { field: "grossamount", headerName: "GrossAmount", width: 150 },
        { field: "gst", headerName: "GST%", width: 130 },
        { field: "toll", headerName: "Toll", width: 130 },
        { field: "amount", headerName: "Amount", width: 130 },
        { field: "status", headerName: "Status", width: 130 },
        { field: "Diff", headerName: "Diff", width: 130 },
    ];

    const handleButtonClickTripsheet = (row) => {
        const customername = encodeURIComponent(row.customer);
        const encodedCustomer = customername;
        console.log(encodedCustomer);
        localStorage.setItem('selectedcustomer', encodedCustomer);
        const storedCustomer = localStorage.getItem('selectedcustomer');
        const decodedCustomer = decodeURIComponent(storedCustomer);
        localStorage.setItem('selectedcustomer', decodedCustomer);
        console.log(decodedCustomer);
        const billingPageUrl = `/home/billing/transfer?tab=dataentry`;
        window.location.href = billingPageUrl;
    }

    return (
        <div className="TransferList-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-TransferList">
                            <div className="input-field" style={{ justifyContent: 'center' }}>
                                <div className="input" style={{ width: "230px" }}>
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
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" inputRef={params.inputRef} />
                                            );
                                        }}
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
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faNewspaper} size="xl" />
                                    </div>
                                    <select name="status" className='input-select' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                        <option value="" disabled>Select Status</option>
                                        <option value="all">All</option>
                                        <option value="billed">Billed</option>
                                        <option value="notbilled">Not Billed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
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
                                <div className="input" style={{ width: "140px" }}>
                                    <Button variant="contained" onClick={handleShow} disabled={isFieldReadOnly("new")}>Search</Button>
                                </div>
                            </div>
                        </div>
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
                <div className="table-bookingCopy-TransferList">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={(event) => handleButtonClickTripsheet(event.row)}
                            pageSize={5}
                            checkboxSelection
                            getRowId={(row) => row.id}
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
            </form>
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
    )
}

export default TransferList