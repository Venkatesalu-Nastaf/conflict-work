import "./Billing.css";
import {
    Autocomplete,
    InputAdornment,
    TextField,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import { fetchBankOptions } from './BillingData';
import React, { useState, useEffect, useCallback } from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GiMoneyStack } from "@react-icons/all-files/gi/GiMoneyStack";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

// ICONS
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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { faArrowRightArrowLeft, faMoneyBillTransfer, faBoxesPacking, faCloudMoon, faCoins, faEquals, faFileContract, faFileInvoiceDollar, faMagnifyingGlassChart, faMoneyBill1Wave, faNewspaper, faPercent, faPersonCircleCheck, faRoad, faSackDollar, faShapes, faStopwatch, faTags, faWindowRestore, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons"


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

    const [formData, setFormData] = useState({});
    const location = useLocation();
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
    const [selectedBankAccount, setSelectedBankAccount] = useState('');
    const [selectedCustomerData, setSelectedCustomerData] = useState({
        totalkm1: ''
    });
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
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
        MinHours: '',
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
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
            setSelectedCustomerDatas((prevValues) => ({
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
        setSelectedCustomerDatas((prevData) => ({
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
            MinHours: '',
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
        setSelectedCustomerDatas({});
        setSelectedBankAccount('');
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
                    ...selectedCustomerDatas,
                    ...selectedCustomer,
                    ...selecting,
                    MinKilometers: selectedCustomerDatas.minkm || selectedCustomerData.minkm || '',
                    MinHours: selectedCustomerDatas.minhrs || selectedCustomerData.minhrs || '',
                    minchargeamount: selectedCustomerData.netamount || selectedCustomerDatas.minchargeamount || book.minchargeamount,
                    MinCharges: selectedCustomerData.package || selectedCustomerDatas.MinCharges || book.MinCharges,
                    cfeamount: calculateTotalAmount() || selectedCustomerData.cfeamount || selectedCustomerDatas.cfeamount || book.cfeamount,
                    cfehamount: calculateTotalAmount2() || selectedCustomerData.cfehamount || selectedCustomerDatas.cfehamount || book.cfehamount,
                    nhamount: calculateTotalAmount3() || selectedCustomerData.nhamount || selectedCustomerDatas.nhamount || book.nhamount,
                    dbamount: calculateTotalAmount4() || selectedCustomerData.dbamount || selectedCustomerDatas.dbamount || book.dbamount
                };
                await axios.put(`http://localhost:8081/billing/${book.tripid || selecting.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid}`, updatedCustomer);
                console.log('Customer updated');
                handleCancel();
            } else if (actionName === 'Add') {
                const updatedBook = {
                    ...book,
                    ...selecting,
                    Billingdate: selectedCustomerData.Billingdate ? dayjs(selectedCustomerData.Billingdate) : null || book.Billingdate ? dayjs(book.Billingdate) : dayjs(),
                    cfeamount: calculateTotalAmount() || selectedCustomerData.cfeamount || selectedCustomerDatas.cfeamount || book.cfeamount,
                    cfehamount: calculateTotalAmount2() || selectedCustomerData.cfehamount || selectedCustomerDatas.cfehamount || book.cfehamount,
                    nhamount: calculateTotalAmount3() || selectedCustomerData.nhamount || selectedCustomerDatas.nhamount || book.nhamount,
                    dbamount: calculateTotalAmount4() || selectedCustomerData.dbamount || selectedCustomerDatas.dbamount || book.dbamount
                };
                await axios.post('http://localhost:8081/billing', updatedBook);
                console.log(updatedBook);
                handleCancel();
                setSuccess(true);
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
        const totalkm1 = selectedCustomerDatas?.totalkm1 || selectedCustomerData?.totalkm1 || book.ChargesForExtra;
        const ChargesForExtraamount = selectedCustomerDatas?.ChargesForExtraamount || selectedCustomerData?.ChargesForExtraamount || book.ChargesForExtraamount;
        if (totalkm1 !== undefined && ChargesForExtraamount !== undefined) {
            const totalKm = totalkm1 * ChargesForExtraamount;
            return totalKm.toFixed(2);
        }
        return '';
    };

    const calculateTotalAmount2 = () => {
        const totaltime = selectedCustomerData?.totaltime || selectedCustomerDatas?.totaltime || book.ChargesForExtraHRS;
        const ChargesForExtraHRSamount = selectedCustomerData?.ChargesForExtraHRSamount || selectedCustomerDatas?.ChargesForExtraHRSamount || book.ChargesForExtraHRSamount;

        if (totaltime !== undefined && ChargesForExtraHRSamount !== undefined) {
            const [hours, minutes] = totaltime.split('h');
            const hoursInMinutes = parseFloat(hours) * 60 + parseFloat(minutes);
            const ratePerHour = parseFloat(ChargesForExtraHRSamount);
            const totalAmount = hoursInMinutes * (ratePerHour / 60);

            if (isNaN(totalAmount)) {
                return "0.00";
            } else {
                return totalAmount.toFixed(2);
            }
        }
        return "0.00";
    };

    const calculateTotalAmount3 = () => {
        const NightHalt = selectedCustomerData.night || selectedCustomerDatas.NightHalt || book.NightHalt;
        const NightHaltamount = selectedCustomerData.NightHaltamount || selectedCustomerDatas.NightHaltamount || book.NightHaltamount;
        if (NightHalt !== undefined && NightHaltamount !== undefined) {
            const totalnights = NightHalt * NightHaltamount;
            return totalnights.toFixed(2);
        }
        return '';
    };

    const calculateTotalAmount4 = () => {
        const driverbata = selectedCustomerData.driverbata || selectedCustomerDatas.driverbata || book.driverbata;
        const driverbataamount = selectedCustomerData.driverbataamount || selectedCustomerDatas.driverbataamount || book.driverbataamount;
        if (driverbata !== undefined && driverbataamount !== undefined) {
            const totaldriverbata = driverbata * driverbataamount;
            return totaldriverbata.toFixed(2);
        }
        return '';
    };

    const calculatePayableAmount = () => {
        const DiscountAmount = selectedCustomerData.DiscountAmount || selectedCustomerDatas.DiscountAmount || book.DiscountAmount;
        const AdvanceReceived = selectedCustomerData.AdvanceReceived || selectedCustomerDatas.AdvanceReceived || book.AdvanceReceived;
        const netAmount = calculateGrossAmount() - DiscountAmount - AdvanceReceived;
        return netAmount.toFixed(2);
    };

    const calculatePendingAmount = () => {
        const totalamount = calculateroundedPayableAmount() || book.Totalamount;
        const paidamount = selectedCustomerData.paidamount || selectedCustomerDatas.paidamount || book.paidamount;
        if (totalamount !== undefined && paidamount !== undefined) {
            const totalpending = totalamount - paidamount;
            return totalpending.toFixed(2);
        }
        return '';
    };

    const calculateRoundOff = () => {
        const balanceAmount =
            parseFloat(calculatePayableAmount()) ||
            parseFloat(book.BalanceReceivable) ||
            0;
        const roundedGrossAmount = Math.ceil(balanceAmount);
        const roundOff = roundedGrossAmount - balanceAmount;
        return roundOff.toFixed(2);
    };

    const calculateroundedPayableAmount = () => {
        const balanceAmount = parseFloat(calculatePayableAmount() || book.BalanceReceivable) || 0;
        const roundOff = parseFloat(calculateRoundOff() || book.RoundedOff) || 0;

        const totalAmount = balanceAmount + roundOff;
        return totalAmount.toFixed(2);
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
            parkingtollcharges,
        } = selectedCustomerData || selectedCustomerDatas || book;

        const parsedValues = [
            parseFloat(calculateTotalAmount()) || 0,
            parseFloat(calculateTotalAmount2() || book.cfehamount) || 0,
            parseFloat(calculateTotalAmount3() || book.nhamount) || 0,
            parseFloat(calculateTotalAmount4() || book.dbamount) || 0,
            parseFloat(minchargeamount || selectedCustomerDatas.minchargeamount) || 0,
            parseFloat(cfeamount) || 0,
            parseFloat(netamount) || 0,
            parseFloat(cfehamount) || 0,
            parseFloat(nhamount) || 0,
            parseFloat(dbamount) || 0,
            parseFloat(OtherChargesamount || selectedCustomerDatas.OtherChargesamount || selectedCustomerData.OtherChargesamount) || 0,
            parseFloat(permitothertax || selectedCustomerDatas.permitothertax || selectedCustomerData.permitothertax) || 0,
            parseFloat(parkingtollcharges || selectedCustomerDatas.parkingtollcharges || selectedCustomerData.parkingtollcharges) || 0,
        ];

        const gross = parsedValues.reduce((sum, value) => sum + value, 0);
        // console.log(gross);
        return gross.toFixed(2);
    };



    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`http://localhost:8081/tripsheet/${event.target.value}`);
                const bookingDetails = response.data;
                setSelectedCustomerData(bookingDetails);
            } catch (error) {
                console.error('Error retrieving booking details:', error);
            }
        }
    }, []);

    const handleKeyenter = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`http://localhost:8081/billing/${event.target.value}`);
                const billingDetails = response.data;
                setSelectedCustomerDatas(billingDetails);
            } catch (error) {
                console.error('Error retrieving billings details:', error);
            }
        }
    }, []);

    const selecting = {
        tripid: selectedCustomerDatas.tripid || selectedCustomerData.tripid || '',
        billingno: selectedCustomerDatas.billingno || selectedCustomerData.billingno || '',
        // Billingdate: selectedCustomerData.Billingdate ? dayjs(selectedCustomerData.Billingdate) : null || book.Billingdate ? dayjs(book.Billingdate) : dayjs(),
        totalkm1: selectedCustomerDatas.totalkm1 || selectedCustomerData.totalkm1 || '',
        totaltime: selectedCustomerDatas.totaltime || selectedCustomerData.totaltime || '',
        customer: selectedCustomerDatas.customer || selectedCustomerData.customer || '',
        supplier: selectedCustomerDatas.supplier || selectedCustomerData.supplier || '',
        startdate: selectedCustomerDatas.startdate || selectedCustomerData.startdate || '',
        totaldays: selectedCustomerDatas.totaldays || selectedCustomerData.totaldays || '',
        guestname: selectedCustomerDatas.guestname || selectedCustomerData.guestname || '',
        rateType: selectedCustomerDatas.rateType || selectedCustomerData.rateType || '',
        vehRegNo: selectedCustomerDatas.vehRegNo || selectedCustomerData.vehRegNo || '',
        vehType: selectedCustomerDatas.vehType || selectedCustomerData.vehType || '',
        duty: selectedCustomerDatas.duty || selectedCustomerData.duty || '',
        MinCharges: selectedCustomerDatas.package || selectedCustomerData.package || '',
        minchargeamount: selectedCustomerDatas.netamount || selectedCustomerData.netamount || '',
        ChargesForExtra: selectedCustomerDatas.totalkm1 || selectedCustomerData.totalkm1 || '',
        ChargesForExtraamount: selectedCustomerDatas.ChargesForExtraamount || selectedCustomerData.ChargesForExtraamount || '',
        cfeamount: selectedCustomerDatas.cfeamount || selectedCustomerData.cfeamount || calculateTotalAmount() || '',
        ChargesForExtraHRS: selectedCustomerDatas.totaltime || selectedCustomerData.totaltime || '',
        ChargesForExtraHRSamount: selectedCustomerDatas.ChargesForExtraHRSamount || selectedCustomerData.ChargesForExtraHRSamount || '',
        cfehamount: selectedCustomerDatas.cfehamount || selectedCustomerData.cfehamount || calculateTotalAmount2() || '',
        NightHalt: selectedCustomerDatas.night || selectedCustomerData.night || book.NightHalt || '',
        NightHaltamount: selectedCustomerDatas.NightHaltamount || selectedCustomerData.NightHaltamount || '',
        nhamount: selectedCustomerDatas.nhamount || selectedCustomerData.nhamount || calculateTotalAmount3() || '',
        driverbata: selectedCustomerDatas.driverbata || selectedCustomerData.driverbata || '',
        driverbataamount: selectedCustomerDatas.driverbataamount || selectedCustomerData.driverbataamount || '',
        dbamount: selectedCustomerDatas.dbamount || selectedCustomerData.dbamount || calculateTotalAmount4() || '',
        OtherCharges: selectedCustomerDatas.OtherCharges || selectedCustomerData.OtherCharges || '',
        OtherChargesamount: selectedCustomerDatas.OtherChargesamount || selectedCustomerData.OtherChargesamount || '',
        permitothertax: selectedCustomerDatas.permitothertax || selectedCustomerData.permitothertax || '',
        parkingtollcharges: selectedCustomerDatas.parkingtollcharges || selectedCustomerData.parkingtollcharges || '',
        MinKilometers: selectedCustomerDatas.minkm || selectedCustomerData.minkm || '',
        MinHours: selectedCustomerDatas.minhrs || selectedCustomerData.minhrs || '',
        GrossAmount: selectedCustomerDatas.GrossAmount || selectedCustomerData.GrossAmount || calculateGrossAmount() || '',
        AfterTaxAmount: selectedCustomerDatas.AfterTaxAmount || selectedCustomerData.AfterTaxAmount || '',
        DiscountAmount: selectedCustomerDatas.DiscountAmount || selectedCustomerData.DiscountAmount || '',
        DiscountAmount2: selectedCustomerDatas.DiscountAmount2 || selectedCustomerData.DiscountAmount2 || '',
        AdvanceReceived: selectedCustomerDatas.AdvanceReceived || selectedCustomerData.AdvanceReceived || '',
        RoundedOff: selectedCustomerDatas.RoundedOff || selectedCustomerData.RoundedOff || calculateRoundOff() || '',
        BalanceReceivable: selectedCustomerDatas.BalanceReceivable || selectedCustomerData.BalanceReceivable || calculatePayableAmount() || '',
        NetAmount: selectedCustomerDatas.NetAmount || selectedCustomerData.NetAmount || calculateroundedPayableAmount() || '',
        Totalamount: selectedCustomerDatas.Totalamount || selectedCustomerData.Totalamount || calculateroundedPayableAmount() || '',
        paidamount: selectedCustomerDatas.paidamount || selectedCustomerData.paidamount || calculatePayableAmount() || '',
        pendingamount: selectedCustomerDatas.pendingamount || selectedCustomerData.pendingamount || calculatePendingAmount() || '',
        BankAccount: selectedCustomerDatas.BankAccount || selectedCustomerData.BankAccount || selectedBankAccount || '',
    }

    useEffect(() => {
        fetchBankOptions()
            .then((data) => {
                if (data) {
                    console.log('banknames', data);
                    setBankOptions(data);
                } else {
                    alert('Failed to fetch bank options.');
                }
            })
            .catch(() => {
                setError(true);
                setErrorMessage('Failed to fetch bank options.');
            });
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log(params);
        const formData = {};
        console.log('formdata console details', formData);

        const parameterKeys = [
            'tripid', 'billingno', 'Billingdate', 'totalkm1', 'totaltime', 'customer', 'supplier', 'startdate', 'totaldays', 'guestname', 'rateType', 'vehRegNo', 'vehType', 'duty', 'MinCharges', 'minchargeamount', 'ChargesForExtra', 'ChargesForExtraamount', 'cfeamount', 'ChargesForExtraHRS', 'ChargesForExtraHRSamount', 'cfehamount', 'NightHalt', 'NightHaltamount', 'nhamount', 'driverbata', 'driverbataamount', 'dbamount', 'OtherCharges', 'OtherChargesamount', 'permitothertax', 'parkingtollcharges', 'MinKilometers', 'MinHours', 'GrossAmount', 'AfterTaxAmount', 'DiscountAmount', 'DiscountAmount2', 'AdvanceReceived', 'RoundedOff', 'BalanceReceivable', 'NetAmount', 'Totalamount', 'paidamount', 'pendingamount', 'BankAccount'
        ];
        console.log('tripsheet colected data from dispatch', parameterKeys.value);

        // Loop through the parameter keys and set the formData if the parameter exists and is not null or "null"
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        setBook(formData);
        setFormData(formData);

    }, [location]);

    useEffect(() => {
        // Clear URL parameters
        window.history.replaceState(null, document.title, window.location.pathname);
        // Reset form data to initial/default values
        const initialFormData = {}; // You can set the initial/default values here
        setFormData(initialFormData);
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
                                    value={formData.tripid || selectedCustomerData.tripid || selectedCustomerDatas.tripid || book.tripid}
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
                                    value={formData.billingno || selectedCustomerData.billingno || selectedCustomerDatas.billingno || book.billingno}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyenter}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Billing Date"
                                        value={formData.Billingdate || selectedCustomerDatas.Billingdate ? dayjs(selectedCustomerDatas.Billingdate) : null || book.Billingdate ? dayjs(book.Billingdate) : dayjs()}
                                        onChange={(date) => handleDateChange(date, 'Billingdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.Billingdate} />
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
                                    value={formData.totalkm1 || selectedCustomerData.totalkm1 || selectedCustomerDatas.totalkm1 || book.totalkm1}
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
                                    value={formData.totaltime || selectedCustomerData.totaltime || selectedCustomerDatas.totaltime || book.totaltime}
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
                                    value={formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer || book.customer}
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
                                    value={formData.supplier || selectedCustomerData.supplier || selectedCustomerDatas.supplier || book.supplier}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Trip Date"
                                        value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null || selectedCustomerDatas.startdate ? dayjs(selectedCustomerDatas.startdate) : null}
                                        onChange={(date) => handleDateChange(date, 'startdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData.startdate || selectedCustomerDatas.startdate} />
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
                                    value={formData.totaldays || selectedCustomerData.totaldays || selectedCustomerDatas.totaldays || book.totaldays}
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
                                    value={formData.guestname || selectedCustomerData.guestname || selectedCustomerDatas.guestname || book.guestname}
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
                                    value={formData.rateType || selectedCustomerData.rateType || selectedCustomerDatas.rateType || book.rateType}
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
                                    value={formData.vehRegNo || selectedCustomerData.vehRegNo || selectedCustomerDatas.vehRegNo || book.vehRegNo}
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
                                        value={formData.vehType || selectedCustomerData.vehType || selectedCustomerDatas.vehType || book.vehType}
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
                                        value={formData.duty || selectedCustomerData.duty || selectedCustomerDatas.duty || book.duty}
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
                                        value={formData.MinCharges || selectedCustomerData.package || selectedCustomerDatas.MinCharges || book.MinCharges}
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
                                        value={formData.minchargeamount || selectedCustomerData.netamount || selectedCustomerDatas.minchargeamount || book.minchargeamount}
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
                                        value={formData.ChargesForExtra || selectedCustomerData.totalkm1 || selectedCustomerDatas.ChargesForExtra || book.ChargesForExtra}
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
                                        value={formData.ChargesForExtraamount || selectedCustomerData.ChargesForExtraamount || selectedCustomerDatas.ChargesForExtraamount || book.ChargesForExtraamount}
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
                                        // value={selectedCustomerData.cfeamount || selectedCustomerDatas.cfeamount || calculateTotalAmount() || book.cfeamount}
                                        value={calculateTotalAmount()}
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
                                        value={formData.ChargesForExtraHRS || selectedCustomerData.totaltime || selectedCustomerDatas.ChargesForExtraHRS || book.ChargesForExtraHRS}
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
                                        value={formData.ChargesForExtraHRSamount || selectedCustomerData.ChargesForExtraHRSamount || selectedCustomerDatas.ChargesForExtraHRSamount || book.ChargesForExtraHRSamount}
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
                                        name="cfehamount"
                                        autoComplete="new-password"
                                        // value={selectedCustomerData.cfehamount || selectedCustomerDatas.cfehamount || calculateTotalAmount2() || book.cfehamount}
                                        value={calculateTotalAmount2() || book.cfehamount}
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
                                        value={formData.NightHalt || selectedCustomerData.night || selectedCustomerDatas.NightHalt || book.NightHalt}
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
                                        value={formData.NightHaltamount || selectedCustomerData.NightHaltamount || selectedCustomerDatas.NightHaltamount || book.NightHaltamount}
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
                                        // value={selectedCustomerData.nhamount || selectedCustomerDatas.nhamount || book.nhamount || calculateTotalAmount3()}
                                        value={book.nhamount || calculateTotalAmount3()}
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
                                        value={formData.driverbata || selectedCustomerData.driverbata || selectedCustomerDatas.driverbata || book.driverbata}
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
                                        value={formData.driverbataamount || selectedCustomerData.driverbataamount || selectedCustomerDatas.driverbataamount || book.driverbataamount}
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
                                        // value={selectedCustomerData.dbamount || selectedCustomerDatas.dbamount || book.dbamount || calculateTotalAmount4()}
                                        value={book.dbamount || calculateTotalAmount4()}
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
                                        // type='number'
                                        name="OtherCharges"
                                        autoComplete="new-password"
                                        value={formData.OtherCharges || selectedCustomerData.OtherCharges || selectedCustomerDatas.OtherCharges || book.OtherCharges}
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
                                        value={formData.OtherChargesamount || selectedCustomerData.OtherChargesamount || selectedCustomerDatas.OtherChargesamount || book.OtherChargesamount}
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
                                        value={formData.permitothertax || selectedCustomerData.permitothertax || selectedCustomerDatas.permitothertax || book.permitothertax}
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
                                        value={formData.parkingtollcharges || selectedCustomerData.parkingtollcharges || selectedCustomerDatas.parkingtollcharges || book.parkingtollcharges}
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
                                        value={formData.MinKilometers || selectedCustomerData.minkm || selectedCustomerDatas.MinKilometers || book.MinKilometers}
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
                                        value={formData.MinHours || selectedCustomerData.minhrs || selectedCustomerDatas.MinHours || book.MinHours}
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
                                        // value={selectedCustomerData.GrossAmount || selectedCustomerDatas.GrossAmount || calculateGrossAmount() || book.GrossAmount}
                                        value={calculateGrossAmount() || book.GrossAmount}
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
                                        value={formData.AfterTaxAmount || selectedCustomerData.AfterTaxAmount || selectedCustomerDatas.AfterTaxAmount || book.AfterTaxAmount}
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
                                        value={formData.DiscountAmount || selectedCustomerData.DiscountAmount || selectedCustomerDatas.DiscountAmount || book.DiscountAmount}
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
                                        value={formData.DiscountAmount2 || selectedCustomerData.DiscountAmount2 || selectedCustomerDatas.DiscountAmount2 || book.DiscountAmount2}
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
                                        value={formData.AdvanceReceived || selectedCustomerData.AdvanceReceived || selectedCustomerDatas.AdvanceReceived || book.AdvanceReceived}
                                        onChange={handleChange}
                                    />
                                </div>
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
                                        // value={selectedCustomerData.BalanceReceivable || selectedCustomerDatas.BalanceReceivable || calculatePayableAmount() || book.BalanceReceivable}
                                        value={calculatePayableAmount()}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">

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
                                        // value={selectedCustomerData.RoundedOff || selectedCustomerDatas.RoundedOff || calculateRoundOff() || book.RoundedOff}
                                        value={calculateRoundOff()}
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
                                        // value={selectedCustomerData.NetAmount || selectedCustomerDatas.NetAmount || calculateroundedPayableAmount() || book.NetAmount}
                                        value={calculateroundedPayableAmount()}
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
                                        // value={selectedCustomerData.Totalamount || selectedCustomerDatas.Totalamount || calculateroundedPayableAmount() || book.Totalamount}
                                        value={calculateroundedPayableAmount()}
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
                                        value={formData.paidamount || selectedCustomerData.paidamount || selectedCustomerDatas.paidamount || book.paidamount}
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
                                        // value={selectedCustomerData.pendingamount || selectedCustomerDatas.pendingamount || calculatePendingAmount() || book.pendingamount}
                                        value={calculatePendingAmount()}
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
                                        onChange={(event, value) => {
                                            setSelectedBankAccount(value);
                                            handleAutocompleteChange(event, value, "BankAccount")
                                        }}
                                        value={formData.BankAccount || selectedBankAccount || selectedCustomerData.BankAccount || selectedCustomerDatas.BankAccount || book.BankAccount || ''}
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