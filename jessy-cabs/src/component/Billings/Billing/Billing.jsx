import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./Billing.css";
import {
    InputAdornment,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ListAltIcon from "@mui/icons-material/ListAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { styled } from "@mui/material/styles";
import BadgeIcon from "@mui/icons-material/Badge";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from '@mui/icons-material/Print';
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";

// FontAwesomeIcon Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faBoxesPacking, faCloudMoon, faCoins, faEquals, faFileContract, faFileInvoiceDollar, faMagnifyingGlassChart, faMoneyBill1Wave, faNewspaper, faPercent, faPersonCircleCheck, faRoad, faSackDollar, faShapes, faStopwatch, faTags, faWindowRestore } from "@fortawesome/free-solid-svg-icons"

// date


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));
const actions = [
    { icon: <PrintIcon />, name: "Print" },
    { icon: <CancelPresentationIcon />, name: "Cancel" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Edit" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
];

const Billing = () => {
    const [formData] = useState({});
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [error, setError] = useState(false);

    // const convertToCSV = (data) => {
    //   const header = columns.map((column) => column.headerName).join(",");
    //   const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    //   return [header, ...rows].join("\n");
    // };
    // const handleExcelDownload = () => {
    //   const csvData = convertToCSV(rows);
    //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    //   saveAs(blob, "customer_details.csv");
    // };
    // const handlePdfDownload = () => {
    //   const pdf = new jsPDF();
    //   pdf.setFontSize(12);
    //   pdf.setFont('helvetica', 'normal');
    //   pdf.text("Customer Details", 10, 10);

    //   // Modify tableData to exclude the index number
    //   const tableData = rows.map((row) => [
    //     row['id'],
    //     row['customerId'],
    //     row['printName'],
    //     row['address1'],
    //     row['phoneno'],
    //     row['Active'],
    //     row['active'],
    //     row['gstTax'],
    //     row['state'],
    //     row['enableDriverApp']
    //   ]);

    //   pdf.autoTable({
    //     head: [['Sno', 'Customer ID', 'Name', 'Address', 'Phone', 'Active', 'Rate_Type', 'GST_NO', 'State', 'Driver_App']],
    //     body: tableData,
    //     startY: 20,
    //   });

    //   const pdfBlob = pdf.output('blob');
    //   saveAs(pdfBlob, 'Customer_Details.pdf');
    // };


    const hidePopup = () => {
        setError(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [error]);

    const [book, setBook] = useState({
        tripsheetno: '',
        Billingno: '',
        Billingdate: '',
        totalkms: '',
        TotalHours: '',
        Customer: '',
        Supplier: '',
        tripdate: '',
        TotalDays: '',
        GustName: '',
        RateType: '',
        VehicleNo: '',
        VehicleType: '',
        Duty: '',
        MinCharges: '',
        minchargeamount: '',
        ChargesForExtra: '',
        ChargesForExtraamount: '',
        amount1: '',
        ChargesForExtraHRS: '',
        ChargesForExtraHRSamount: '',
        amount2: '',
        NightHalt: '',
        NightHaltamount: '',
        amount3: '',
        driverbata: '',
        driverbataamount: '',
        amount4: '',
        OtherCharges: '',
        OtherChargesamount: '',
        permitothertax: '',
        parkingtollcharges: '',
        MinKilometers: '',
        GrossAmount: '',
        AfterTaxAmount: '',
        DiscountAmount: '',
        DiscountAmount2: '',
        AdvanceReceived: '',
        RoundedOff: '',
        BalanceReceivable: '',
        NetAmount: '',
        SavePrint: '',
        document: '',
        Preview: '',
        Monthly: '',
    });
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            // For checkboxes, update the state based on the checked value
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            // For other input fields, update the state based on the value
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // const handleAutocompleteChange = (event, value, name) => {
    //     const selectedOption = value ? value.label : '';
    //     setBook((prevBook) => ({
    //         ...prevBook,
    //         [name]: selectedOption,
    //     }));
    //     setSelectedCustomerData((prevData) => ({
    //         ...prevData,
    //         [name]: selectedOption,
    //     }));
    // };

    const handleDateChange = (date, name) => {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: formattedDate,
        }));
    };
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            tripsheetno: '',
            Billingno: '',
            Billingdate: '',
            totalkms: '',
            TotalHours: '',
            Customer: '',
            Supplier: '',
            tripdate: '',
            TotalDays: '',
            GustName: '',
            RateType: '',
            VehicleNo: '',
            VehicleType: '',
            Duty: '',
            MinCharges: '',
            minchargeamount: '',
            MinHours: '',
            ChargesForExtra: '',
            ChargesForExtraamount: '',
            amount1: '',
            ChargesForExtraHRS: '',
            ChargesForExtraHRSamount: '',
            amount2: '',
            NightHalt: '',
            NightHaltamount: '',
            amount3: '',
            driverbata: '',
            driverbataamount: '',
            amount4: '',
            OtherCharges: '',
            OtherChargesamount: '',
            permitothertax: '',
            parkingtollcharges: '',
            MinKilometers: '',
            GrossAmount: '',
            AfterTaxAmount: '',
            DiscountAmount: '',
            DiscountAmount2: '',
            AdvanceReceived: '',
            RoundedOff: '',
            BalanceReceivable: '',
            NetAmount: '',
            SavePrint: '',
            document: '',
            Preview: '',
            Monthly: '',
        }));
        setSelectedCustomerData({});
    };
    // const handleRowClick = useCallback((params) => {
    //     console.log(params.row);
    //     const customerData = params.row;
    //     setSelectedCustomerData(customerData);
    //     setSelectedCustomerId(params.row.customerId);
    // }, []);
    const handleClick = async (event, actionName, tripsheetno) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                console.log('List button clicked');
                const response = await axios.get('http://localhost:8081/billing');
                const data = response.data;
                setRows(data);
            } else if (actionName === 'Cancel') {
                console.log('Cancel button clicked');
                handleCancel();
            } else if (actionName === 'Delete') {
                console.log('Delete button clicked');
                await axios.delete(`http://localhost:8081/billing/${tripsheetno}`);
                console.log('Customer deleted');
                setSelectedCustomerData(null);
                handleCancel();
            } else if (actionName === 'Edit') {
                console.log('Edit button clicked');
                const selectedCustomer = rows.find((row) => row.tripsheetno === tripsheetno);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://localhost:8081/billing/${tripsheetno}`, updatedCustomer);
                console.log('Customer updated');
                handleCancel();
            } else if (actionName === 'Add') {
                await axios.post('http://localhost:8081/billing', book);
                console.log(book);
                handleCancel();
            }
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });
    return (
        <div className="form-container">
            <div className="Billing-form">
                <form onSubmit={handleClick}>
                    <span className="Title-Name">Billing</span>
                    <div className="Billing-page-header">
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <ListAltIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="TripSheetno"
                                    label="Trip Sheet No"
                                    name="tripsheetno"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.tripsheetno || book.tripsheetno}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="Billingno"
                                    label="Billing No"
                                    name="Billingno"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.Billingno || book.Billingno}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Date">
                                        <DatePicker
                                            name="date"
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            views={["year", "month", "day"]}
                                        />
                                    </DemoItem>
                                </LocalizationProvider> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Date">
                                        <DatePicker
                                            value={formData.Billingdate || selectedCustomerData.Billingdate ? dayjs(selectedCustomerData.Billingdate) : null}
                                            onChange={(date) => handleDateChange(date, 'Billingdate')}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="Billingdate"
                                                    value={formData.Billingdate || selectedCustomerData.Billingdate || ''}
                                                    inputRef={params.inputRef}
                                                />
                                            )}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "120px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    id="TotalKms"
                                    label="Total Kms"
                                    name="TotalKms"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.TotalKms || book.TotalKms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "120px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    id="TotalHours"
                                    label="Total Hours"
                                    name="TotalHours"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.TotalHours || book.TotalHours}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="input-field" >
                            <div className="input" style={{ width: "310px" }}>
                                <div className="icone">
                                    <HailOutlinedIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="Customer"
                                    label="Customer"
                                    name="Customer"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.Customer || book.Customer}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "310px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faBoxesPacking} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="Supplier"
                                    label="Supplier"
                                    name="Supplier"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.Supplier || book.Supplier}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Trip Date">
                                        <DatePicker
                                            name="tripdate"
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            views={["year", "month", "day"]}
                                        />
                                    </DemoItem>
                                </LocalizationProvider> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Trip Date">
                                        <DatePicker
                                            value={formData.tripdate || selectedCustomerData.tripdate ? dayjs(selectedCustomerData.tripdate) : null}
                                            onChange={(date) => handleDateChange(date, 'tripdate')}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="Billingdate"
                                                    value={formData.tripdate || selectedCustomerData.tripdate || ''}
                                                    inputRef={params.inputRef}
                                                />
                                            )}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "111px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    id="TotalDays"
                                    label="Total Days"
                                    name="TotalDays"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.TotalDays || book.TotalDays}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="input-field" >
                            <div className="input" style={{ width: "335px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faPersonCircleCheck} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="GustName"
                                    label="Gust Name"
                                    name="GustName"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.GustName || book.GustName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "335px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="RateType"
                                    label="Rate Type"
                                    name="RateType"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.RateType || book.RateType}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "200px" }}>
                                <div className="icone">
                                    <DirectionsCarFilledIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="VehicleNo"
                                    label="Vehicle No"
                                    name="VehicleNo"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.VehicleNo || book.VehicleNo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Customer-page-secend-container">
                        <div className="Billing-secend-left">
                            <div className="input-field">
                                <div className="input" style={{ width: "360px" }}>
                                    <div className="icone">
                                        <CarCrashIcon color="action" />
                                    </div>
                                    <TextField
                                        name="VehicleType"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.VehicleType || book.VehicleType}
                                        onChange={handleChange}
                                        label="Vehicle Type"
                                        id="VehicleType"
                                        size="small"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <EngineeringIcon color="action" />
                                    </div>
                                    <TextField
                                        label='Duty'
                                        name="Duty"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.Duty || book.Duty}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "360px" }}>
                                    <div className="icone">
                                        <Inventory2Icon color="action" />
                                    </div>
                                    <TextField
                                        name="MinCharges"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.MinCharges || book.MinCharges}
                                        onChange={handleChange}
                                        label="Min.Charges"
                                        id="MinCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "20px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="minchargeamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.minchargeamount || book.minchargeamount}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="ChargesForExtra"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ChargesForExtra || book.ChargesForExtra}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="ChargesForExtra"
                                        size="small"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">KMS</InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='ChargesForExtraamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ChargesForExtraamount || book.ChargesForExtraamount}
                                        onChange={handleChange}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="amount1"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.amount1 || book.amount1}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="ChargesForExtraHRS"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ChargesForExtraHRS || book.ChargesForExtraHRS}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="ChargesForExtra"
                                        size="small"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">HRS</InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='ChargesForExtraHRSamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ChargesForExtraHRSamount || book.ChargesForExtraHRSamount}
                                        onChange={handleChange}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="amount2"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.amount2 || book.amount20}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faCloudMoon} />
                                    </div>
                                    <TextField
                                        name="NightHalt"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.NightHalt || book.NightHalt}
                                        onChange={handleChange}
                                        label="Night Halt"
                                        id="NightHalt"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='NightHaltamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.NightHaltamount || book.NightHaltamount}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="amount3"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.amount3 || book.amount3}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "170px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                                    </div>
                                    <TextField
                                        label="Driver Bata"
                                        name='driverbata'
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.driverbata || book.driverbata}
                                        onChange={handleChange}
                                        id="driverbata"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='driverbataamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.driverbataamount || book.driverbataamount}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="amount4"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.amount4 || book.amount4}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "355px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                                    </div>
                                    <TextField
                                        name="OtherCharges"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.OtherCharges || book.OtherCharges}
                                        onChange={handleChange}
                                        label="Other Charges"
                                        id="OtherCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", 'padding-top': "20px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="OtherChargesamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.OtherChargesamount || book.OtherChargesamount}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "260px", 'padding-top': "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileContract} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        name='permitothertax'
                                        label="Permit / Other Tax"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.permitothertax || book.permitothertax}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                    />
                                </div>
                                <div className="input" style={{ width: "260px", 'padding-top': "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faWindowRestore} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="Parking / Toll Charges"
                                        name='parkingtollcharges'
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.parkingtollcharges || book.parkingtollcharges}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="Billing-secend-right">
                            <div className="input-field" >
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="MinKilometers"
                                        label="Min Kilometers"
                                        name="MinKilometers"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.MinKilometers || book.MinKilometers}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="MinHours"
                                        label="Min Hours"
                                        name="MinHours"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.MinHours || book.MinHours}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMagnifyingGlassChart} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="GrossAmount"
                                        label="Gross Amount"
                                        name="GrossAmount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.GrossAmount || book.GrossAmount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faShapes} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="AfterTaxAmount"
                                        label="After Tax Amount"
                                        name="AfterTaxAmount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.AfterTaxAmount || book.AfterTaxAmount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faTags} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="DiscountAmount"
                                        label="Discount Amount"
                                        name="DiscountAmount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.DiscountAmount || book.DiscountAmount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faPercent} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        name='DiscountAmount2'
                                        size="small"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.DiscountAmount2 || book.DiscountAmount2}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "220px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faArrowRightArrowLeft} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="AdvanceReceived"
                                        label="Advance Received"
                                        name="AdvanceReceived"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.AdvanceReceived || book.AdvanceReceived}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "180px" }}>
                                    <div className="icone">
                                        <ChangeCircleIcon color="active" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="RoundedOff"
                                        label="Rounded Off"
                                        name="RoundedOff"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.RoundedOff || book.RoundedOff}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "220px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faCoins} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="BalanceReceivable"
                                        label="Balance Receivable"
                                        name="BalanceReceivable"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.BalanceReceivable || book.BalanceReceivable}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "180px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faSackDollar} size="xl" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="NetAmount"
                                        label="Net Amount"
                                        name="NetAmount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.NetAmount || book.NetAmount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input">
                                    <FormControlLabel
                                        name="SavePrint"
                                        onChange={handleChange}
                                        checked={Boolean(selectedCustomerData?.SavePrint || book.SavePrint)}
                                        value="SavePrint"
                                        control={<Checkbox size="small" />}
                                        label="Save Print"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="input">
                                    <FormControlLabel
                                        name="document"
                                        onChange={handleChange}
                                        checked={Boolean(selectedCustomerData?.document || book.document)}
                                        value="document"
                                        control={<Checkbox size="small" />}
                                        label="Document"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input">
                                    <FormControlLabel
                                        name="Preview"
                                        onChange={handleChange}
                                        checked={Boolean(selectedCustomerData?.Preview || book.Preview)}
                                        value="Preview"
                                        control={<Checkbox size="small" />}
                                        label="Preview"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="input">
                                    <FormControlLabel
                                        name="Monthly"
                                        onChange={handleChange}
                                        checked={Boolean(selectedCustomerData?.Monthly || book.Monthly)}
                                        value="Monthly"
                                        control={<Checkbox size="small" />}
                                        label="Monthly"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <Box sx={{ position: "relative", mt: 3, height: 320 }}>
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
                </Box>
            </div>
        </div>
    )
}

export default Billing