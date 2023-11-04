import "./Billing.css";
import {
    Autocomplete,
    InputAdornment,
    TextField,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import Box from "@mui/material/Box";
// import { BankAccount } from "./BillingData";
import { fetchBankOptions } from './BillingData';//get data from billingdata
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import React, { useState, useEffect, useCallback } from 'react';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { GiMoneyStack } from "@react-icons/all-files/gi/GiMoneyStack";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { faArrowRightArrowLeft, faMoneyBillTransfer, faBoxesPacking, faCloudMoon, faCoins, faEquals, faFileContract, faFileInvoiceDollar, faMagnifyingGlassChart, faMoneyBill1Wave, faNewspaper, faPercent, faPersonCircleCheck, faRoad, faSackDollar, faShapes, faStopwatch, faTags, faWindowRestore, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons"

// IONIC 
import PendingActionsIcon from '@mui/icons-material/PendingActions';

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

    const [bankOptions, setBankOptions] = useState([]);
    // const [selectedBank] = useState('');
    // const [error, setError] = useState(null);

    const [formData] = useState({});
    const [info, setInfo] = useState(false);
    const [actionName] = useState('');
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});
    const [selectedCustomerData, setSelectedCustomerData] = useState({
        totalkm1: ''
    });
    //for popup
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

    const [book, setBook] = useState({
        tripid: '',
        billingno: '',
        Billingdate: '',
        totalkm1: '',
        totaltime: '',
        customer: '',
        supplier: '',
        startdate: '',
        totaldays: '',
        guestname: '',
        rateType: '',
        vehRegNo: '',
        vehType: '',
        duty: '',
        MinCharges: '',
        minchargeamount: '',
        ChargesForExtra: '',
        ChargesForExtraamount: '',
        cfeamount: '',
        ChargesForExtraHRS: '',
        ChargesForExtraHRSamount: '',
        cfehamount: '',
        NightHalt: '',
        NightHaltamount: '',
        nhamount: '',
        driverbata: '',
        driverbataamount: '',
        dbamount: '',
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
        Totalamount: '',
        paidamount: '',
        pendingamount: '',
        BankAccount: '',
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
            setSelectedCustomerData((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleAutocompleteChange = (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';

        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
    };

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
            tripid: '',
            billingno: '',
            Billingdate: '',
            totalkm1: '',
            totaltime: '',
            customer: '',
            supplier: '',
            startdate: '',
            totaldays: '',
            guestname: '',
            rateType: '',
            vehRegNo: '',
            vehType: '',
            duty: '',
            MinCharges: '',
            minchargeamount: '',
            ChargesForExtra: '',
            ChargesForExtraamount: '',
            cfeamount: '',
            ChargesForExtraHRS: '',
            ChargesForExtraHRSamount: '',
            cfehamount: '',
            NightHalt: '',
            NightHaltamount: '',
            nhamount: '',
            driverbata: '',
            driverbataamount: '',
            dbamount: '',
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
            Totalamount: '',
            paidamount: '',
            pendingamount: '',
            BankAccount: '',
        }));
        setSelectedCustomerData({});
    };

    const handleClick = async (event, actionName, tripid) => {
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
                await axios.delete(`http://localhost:8081/billing/${tripid}`);
                console.log('Customer deleted');
                setSelectedCustomerData(null);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
            } else if (actionName === 'Edit') {
                console.log('Edit button clicked');
                const selectedCustomer = rows.find((row) => row.tripid === tripid);
                const updatedCustomer = {
                    ...selectedCustomer,
                    ...selectedCustomerData,
                    cfeamount: calculateTotalAmount() || selectedCustomerData.cfeamount || book.cfeamount,
                    cfehamount: calculateTotalAmount2() || selectedCustomerData.cfehamount || book.cfehamount,
                    nhamount: calculateTotalAmount3() || selectedCustomerData.nhamount || book.nhamount,
                    dbamount: calculateTotalAmount4() || selectedCustomerData.dbamount || book.dbamount
                };
                await axios.put(`http://localhost:8081/billing/${tripid}`, updatedCustomer);
                console.log('Customer updated');
                handleCancel();
            } else if (actionName === 'Add') {
                const updatedBook = {
                    ...book,
                    ...selectedCustomerData,
                    cfeamount: calculateTotalAmount() || selectedCustomerData.cfeamount || book.cfeamount,
                    cfehamount: calculateTotalAmount2() || selectedCustomerData.cfehamount || book.cfehamount,
                    nhamount: calculateTotalAmount3() || selectedCustomerData.nhamount || book.nhamount,
                    dbamount: calculateTotalAmount4() || selectedCustomerData.dbamount || book.dbamount
                };
                await axios.post('http://localhost:8081/billing', updatedBook);
                console.log(updatedBook);
                handleCancel();
                setSuccessMessage("Successfully Added");
            }
        } catch (err) {
            console.log(err);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    const calculateTotalAmount = () => {
        const totalkm1 = selectedCustomerData?.totalkm1 || book.ChargesForExtra;
        const ChargesForExtraamount = selectedCustomerData?.ChargesForExtraamount || book.ChargesForExtraamount;
        if (totalkm1 !== undefined && ChargesForExtraamount !== undefined) {
            const totalKm = totalkm1 * ChargesForExtraamount;
            return totalKm;
        }
        return ' ';
    };

    const calculateTotalAmount2 = () => {
        const totaltime = selectedCustomerData?.totaltime || book.ChargesForExtraHRS;
        const ChargesForExtraHRSamount = selectedCustomerData?.ChargesForExtraHRSamount || book.ChargesForExtraHRSamount;

        if (totaltime !== undefined && ChargesForExtraHRSamount !== undefined) {
            const [hours, minutes] = totaltime.split('h');
            const hoursInMinutes = parseFloat(hours) * 60 + parseFloat(minutes);
            const ratePerHour = parseFloat(ChargesForExtraHRSamount);
            const totalAmount = hoursInMinutes * (ratePerHour / 60);
            return totalAmount.toFixed(2);
        }
        return 0.00;
    };

    const calculateTotalAmount3 = () => {
        const NightHalt = selectedCustomerData.night || book.NightHalt;
        const NightHaltamount = selectedCustomerData.NightHaltamount || book.NightHaltamount;
        if (NightHalt !== undefined && NightHaltamount !== undefined) {
            const totalnights = NightHalt * NightHaltamount;
            return totalnights;
        }
        return ' ';
    };

    const calculateTotalAmount4 = () => {
        const driverbata = selectedCustomerData.driverbata || book.driverbata;
        const driverbataamount = selectedCustomerData.driverbataamount || book.driverbataamount;
        if (driverbata !== undefined && driverbataamount !== undefined) {
            const totaldriverbata = driverbata * driverbataamount;
            return totaldriverbata;
        }
        return ' ';
    };

    const calculatePayableAmount = () => {
        const DiscountAmount = selectedCustomerData.DiscountAmount || book.DiscountAmount;
        const AdvanceReceived = selectedCustomerData.AdvanceReceived || book.AdvanceReceived;
        const netAmount = calculateGrossAmount() - DiscountAmount - AdvanceReceived;
        return netAmount;
    };

    const calculateGrossAmount = () => {
        const {
            minchargeamount,
            netamount,
            cfehamount,
            cfeamount,
            nhamount,
            dbamount,
            OtherChargesamount,
            permitothertax,
            parkingtollcharges
        } = selectedCustomerData || book;
        const parsedValues = [
            calculateTotalAmount(), calculateTotalAmount2(), calculateTotalAmount3(), calculateTotalAmount4(), minchargeamount, cfeamount, netamount, cfehamount, nhamount, dbamount,
            OtherChargesamount, permitothertax, parkingtollcharges
        ].map(value => parseFloat(value) || 0); // Convert to numbers, default to 0 if NaN
        const gross = parsedValues.reduce((sum, value) => sum + value, 0);
        return gross;
    };

    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`http://localhost:8081/tripsheet/${event.target.value}`);
                const bookingDetails = response.data;
                setSelectedCustomerData(bookingDetails);
                // setSelectedCustomerId(bookingDetails.customerId);
            } catch (error) {
                console.error('Error retrieving booking details:', error);
            }
        }
    }, []);
   

    useEffect(() => {
        fetchBankOptions()
            .then((data) => {
                if (data) {
                    console.log('banknames', data);
                    setBankOptions(data);
                } else {
                    alert('Failed to fetch bank options. Please check your network connection.');
                }
            })
            .catch(() => {
                setError(true);
                setErrorMessage('Failed to fetch bank options. Please check your network connection.');
            });
    }, []);


    return (
        <div className="form-container">
            <div className="Billing-form">
                <form onSubmit={handleClick}>
                    <div className="Billing-page-header">
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <ListAltIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="tripid"
                                    label="Trip Sheet No"
                                    name="tripid"
                                    autoFocus
                                    autoComplete="off"
                                    value={selectedCustomerData.tripid || book.tripid}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
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
                                    name="billingno"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.billingno || book.billingno}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Billing Date"
                                        value={formData.Billingdate || selectedCustomerData.Billingdate ? dayjs(selectedCustomerData.Billingdate) : null}
                                        onChange={(date) => handleDateChange(date, 'Billingdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.Billingdate} />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "120px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    label="Total Kms"
                                    name="totalkm1"
                                    value={selectedCustomerData.totalkm1 || book.totalkm1}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input" style={{ width: "120px" }}>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="TotalHours"
                                    label="Total Hours"
                                    name="totaltime"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.totaltime || book.totaltime}
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
                                    name="customer"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.customer || book.customer}
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
                                    name="supplier"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.supplier || book.supplier}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Trip Date"
                                        value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
                                        onChange={(date) => handleDateChange(date, 'startdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData.startdate} />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "111px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    id="totaldays"
                                    label="Total Days"
                                    name="totaldays"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.totaldays || book.totaldays}
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
                                    id="guestname"
                                    label="Gust Name"
                                    name="guestname"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.guestname || book.guestname}
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
                                    id="rateType"
                                    label="Rate Type"
                                    name="rateType"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.rateType || book.rateType}
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
                                    id="vehRegNo"
                                    label="Vehicle No"
                                    name="vehRegNo"
                                    autoComplete="new-password"
                                    value={selectedCustomerData.vehRegNo || book.vehRegNo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Billing-page-secend-container">
                        <div className="Billing-secend-left">
                            <div className="input-field">
                                <div className="input" style={{ width: "360px" }}>
                                    <div className="icone">
                                        <CarCrashIcon color="action" />
                                    </div>
                                    <TextField
                                        name="vehType"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.vehType || book.vehType}
                                        onChange={handleChange}
                                        label="Vehicle Type"
                                        id="vehType"
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
                                        name="duty"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.duty || book.duty}
                                        onChange={handleChange}
                                        size="small"
                                        id="duty"
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
                                        value={selectedCustomerData.package || book.MinCharges}
                                        onChange={handleChange}
                                        label="Min.Charges"
                                        id="MinCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="minchargeamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.netamount || book.minchargeamount}
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
                                        value={selectedCustomerData.totalkm1 || book.ChargesForExtra}
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
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='ChargesForExtraamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData.ChargesForExtraamount || book.ChargesForExtraamount}
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
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="cfeamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.cfeamount || calculateTotalAmount() || book.cfeamount}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="cfeamount"
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
                                        // type='number'
                                        name="ChargesForExtraHRS"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.totaltime || book.ChargesForExtraHRS}
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
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='ChargesForExtraHRSamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData.ChargesForExtraHRSamount || book.ChargesForExtraHRSamount}
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
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="cfehamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.cfehamount || book.cfehamount || calculateTotalAmount2()}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="cfehamount"
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
                                        type='number'
                                        name="NightHalt"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.night || book.NightHalt}
                                        onChange={handleChange}
                                        label="Night Halt"
                                        id="NightHalt"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='NightHaltamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData.NightHaltamount || book.NightHaltamount}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="nhamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.nhamount || book.nhamount || calculateTotalAmount3()}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="nhamount"
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
                                        type='number'
                                        label="Driver Bata"
                                        name='driverbata'
                                        autoComplete="new-password"
                                        value={selectedCustomerData.driverbata || book.driverbata}
                                        onChange={handleChange}
                                        id="driverbata"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='driverbataamount'
                                        autoComplete="new-password"
                                        value={selectedCustomerData.driverbataamount || book.driverbataamount}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="dbamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.dbamount || book.dbamount || calculateTotalAmount4()}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="dbamount"
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
                                        type='number'
                                        name="OtherCharges"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.OtherCharges || book.OtherCharges}
                                        onChange={handleChange}
                                        label="Other Charges"
                                        id="OtherCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="OtherChargesamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.OtherChargesamount || book.OtherChargesamount}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "260px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileContract} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        name='permitothertax'
                                        label="Permit / Other Tax"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.permitothertax || book.permitothertax}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                    />
                                </div>
                                <div className="input" style={{ width: "260px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faWindowRestore} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="Parking / Toll Charges"
                                        name='parkingtollcharges'
                                        autoComplete="new-password"
                                        value={selectedCustomerData.parkingtollcharges || book.parkingtollcharges}
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
                                        value={selectedCustomerData.MinKilometers || book.MinKilometers}
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
                                        value={selectedCustomerData.MinHours || book.MinHours}
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
                                        type='number'
                                        margin="normal"
                                        size="small"
                                        id="GrossAmount"
                                        label="Gross Amount"
                                        name="GrossAmount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.GrossAmount || calculateGrossAmount() || book.GrossAmount}
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
                                        value={selectedCustomerData.AfterTaxAmount || book.AfterTaxAmount}
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
                                        value={selectedCustomerData.DiscountAmount || book.DiscountAmount}
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
                                        value={selectedCustomerData.DiscountAmount2 || book.DiscountAmount2}
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
                                        value={selectedCustomerData.AdvanceReceived || book.AdvanceReceived}
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
                                        value={selectedCustomerData.RoundedOff || book.RoundedOff}
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
                                        value={selectedCustomerData.BalanceReceivable || calculatePayableAmount() || book.BalanceReceivable}
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
                                        value={selectedCustomerData.NetAmount || calculatePayableAmount() || book.NetAmount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" >
                                    <div className="icone">
                                        <GiMoneyStack style={{ fontSize: '23px' }} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="Totalamount"
                                        label="Total Amount"
                                        name="Totalamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.Totalamount || calculatePayableAmount() || book.Totalamount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBillTrendUp} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="paidamount"
                                        label="Paid Amount"
                                        name="paidamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.paidamount || calculatePayableAmount() || book.paidamount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" >
                                    <div className="icone">
                                        <PendingActionsIcon />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="pendingamount"
                                        label="Pending Amount"
                                        name="pendingamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData.pendingamount || calculatePayableAmount() || book.pendingamount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBillTransfer} size="lg" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        id="free-solo-demo-BankAccount"
                                        freeSolo
                                        sx={{ width: "20ch" }}
                                        onChange={(event, value) => handleAutocompleteChange(event, value, "BankAccount")}
                                        value={selectedCustomerData.BankAccount || ''}
                                        options={bankOptions}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Bank Account" name="BankAccount" inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {error &&
                    <div className='alert-popup Error' >
                        <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{errorMessage}</p>
                    </div>
                }
                {info &&
                    <div className='alert-popup Info' >
                        <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{infoMessage}</p>
                    </div>
                }
                {warning &&
                    <div className='alert-popup Warning' >
                        <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{warningMessage}</p>
                    </div>
                }
                {success &&
                    <div className='alert-popup Success' >
                        <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{successMessage}</p>
                    </div>
                }
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
                                onClick={(event) => handleClick(event, action.name)}

                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
            </div>
        </div>
    )
}

export default Billing