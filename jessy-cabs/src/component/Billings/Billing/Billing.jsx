import React, { useState, useEffect, useCallback } from 'react';
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
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
// import MyInput from '@mui/icons-material/TollTwoTone';
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
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const hidePopup = () => {
        setSuccess(false);
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
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [success]);

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
        payableamount: '',
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
            payableamount: '',
            SavePrint: '',
            document: '',
            Preview: '',
            Monthly: '',
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
                handleCancel();
            } else if (actionName === 'Edit') {
                console.log('Edit button clicked');
                const selectedCustomer = rows.find((row) => row.tripid === tripid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://localhost:8081/billing/${tripid}`, updatedCustomer);
                console.log('Customer updated');
                handleCancel();
            } else if (actionName === 'Add') {
                const updatedBook = {
                    ...book,
                    amount1: calculateTotalAmount(),
                };
                await axios.post('http://localhost:8081/billing', updatedBook);
                console.log(updatedBook);
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

    const calculateTotalAmount = () => {
        const totalkm1 = selectedCustomerData.totalkm1 || book.totalkm1;
        const ChargesForExtraamount = selectedCustomerData.ChargesForExtraamount || book.ChargesForExtraamount;

        if (totalkm1 !== undefined && ChargesForExtraamount !== undefined) {
            const totalKm = totalkm1 * ChargesForExtraamount;
            return totalKm;
        }

        return 0;
    };

    const calculatePayableAmount = () => {
        // const GrossAmount = selectedCustomerData.GrossAmount || book.GrossAmount;; // Replace with the actual GrossAmount
        const DiscountAmount = selectedCustomerData.DiscountAmount || book.DiscountAmount;; // Replace with the actual DiscountAmount
        const AdvanceReceived = selectedCustomerData.AdvanceReceived || book.AdvanceReceived;; // Replace with the actual AdvanceReceived

        const netAmount = calculateGrossAmount() - DiscountAmount - AdvanceReceived;
        return netAmount;
    };

    const calculateGrossAmount = () => {
        const {
            cfehamount,
            nhamount,
            dbamount,
            OtherChargesamount,
            permitothertax,
            parkingtollcharges
        } = selectedCustomerData || book;

        const parsedValues = [
            calculateTotalAmount(), cfehamount, nhamount, dbamount,
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
                setSelectedCustomerId(bookingDetails.customerId);
            } catch (error) {
                console.error('Error retrieving booking details:', error);
            }
        }
    }, []);

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
                                    id="tripid"
                                    label="Trip Sheet No"
                                    name="tripid"
                                    autoComplete="off"
                                    value={selectedCustomerData?.tripid || book.tripid}
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
                                    value={selectedCustomerData?.billingno || book.billingno}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Date">
                                        <DatePicker
                                            value={formData.Billingdate || selectedCustomerData.Billingdate ? dayjs(selectedCustomerData.Billingdate) : null}
                                            onChange={(date) => handleDateChange(date, 'Billingdate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.Billingdate} />
                                            )}
                                        </DatePicker>
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "120px" }}>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    label="Total Kms"
                                    name="totalkm1"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.totalkm1 || book.totalkm1}
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
                                    value={selectedCustomerData?.totaltime || book.totaltime}
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
                                    value={selectedCustomerData?.customer || book.customer}
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
                                    value={selectedCustomerData?.supplier || book.supplier}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Trip Date">
                                        <DatePicker
                                            value={formData.startdate || selectedCustomerData.startdate ? dayjs(selectedCustomerData.startdate) : null}
                                            onChange={(date) => handleDateChange(date, 'startdate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.startdate} />
                                            )}
                                        </DatePicker>
                                    </DemoItem>
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
                                    value={selectedCustomerData?.totaldays || book.totaldays}
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
                                    value={selectedCustomerData?.guestname || book.guestname}
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
                                    value={selectedCustomerData?.rateType || book.rateType}
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
                                    value={selectedCustomerData?.vehRegNo || book.vehRegNo}
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
                                        name="vehType"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.vehType || book.vehType}
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
                                        value={selectedCustomerData?.duty || book.duty}
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
                                        value={selectedCustomerData?.MinCharges || book.MinCharges}
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
                                        name="totalkm1"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.totalkm1 || book.totalkm1}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="totalkm1"
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
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="cfeamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.cfeamount || calculateTotalAmount() || book.cfeamount}
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
                                <div className="input" style={{ width: "170px", paddingTop: "20px" }}>
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
                                <div className="input" style={{ width: "170px", paddingTop: "10px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="cfehamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.cfehamount || book.cfehamount}
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
                                        value={selectedCustomerData?.NightHalt || book.NightHalt}
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
                                        value={selectedCustomerData?.NightHaltamount || book.NightHaltamount}
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
                                        value={selectedCustomerData?.nhamount || book.nhamount}
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
                                        value={selectedCustomerData?.driverbata || book.driverbata}
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
                                        value={selectedCustomerData?.driverbataamount || book.driverbataamount}
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
                                        value={selectedCustomerData?.dbamount || book.dbamount}
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
                                        value={selectedCustomerData?.OtherCharges || book.OtherCharges}
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
                                        value={selectedCustomerData?.OtherChargesamount || book.OtherChargesamount}
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
                                        value={selectedCustomerData?.permitothertax || book.permitothertax}
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
                                        type='number'
                                        margin="normal"
                                        size="small"
                                        id="GrossAmount"
                                        label="Gross Amount"
                                        name="GrossAmount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.GrossAmount || calculateGrossAmount() || book.GrossAmount}
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
                                        value={selectedCustomerData?.BalanceReceivable || calculatePayableAmount() || book.BalanceReceivable}
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
                                        value={selectedCustomerData?.NetAmount || calculatePayableAmount() || book.NetAmount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "220px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faCoins} size="lg" />
                                    </div>
                                    {/* <TextField
                                        margin="normal"
                                        size="small"
                                        id="payableamount"
                                        label="Payable Amount"
                                        name="payableamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.payableamount || calculatePayableAmount() || book.payableamount}
                                        onChange={handleChange}
                                    /> */}
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="payableamount"
                                        label="Payable Amount"
                                        name="payableamount"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.payableamount || calculatePayableAmount() || book.payableamount}
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
                {error &&
                    <div className='alert-popup Error' >
                        <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>Something went wrong!</p>
                    </div>
                }
                {success &&
                    <div className='alert-popup Success' >
                        <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>success fully submitted</p>
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