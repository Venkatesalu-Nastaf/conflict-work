import React, { useEffect, useContext } from 'react';
import "./Billing.css";
import {
    Autocomplete,
    InputAdornment,
    TextField,
} from "@mui/material";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import SpeedDial from "@mui/material/SpeedDial";

import Paymentinvoice from '../Accountsinvoice/Paymentinvoice';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GiMoneyStack } from "@react-icons/all-files/gi/GiMoneyStack";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
//dialog box
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
import useBilling from './useBilling';
import { PermissionContext } from '../../../context/permissionContext';
import { RiPinDistanceLine } from "react-icons/ri";
import { IoIosTime } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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


const Billing = () => {

    const {

        actionName,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        book,
        handleClick,
        handleChange,
        hidePopup,
        handleKeyDown,
        handleDateChange,
        setSelectedBankAccount,
        handleAutocompleteChange,
        selectedBankAccount,
        bankOptions,
        popupOpen,
        handlePopupClose,
        organizationdata,
        triprequest,
        tripcode,
        tripdepartment,
        routeData,
        tripShedkm,
        tripshedin,
        tripshedout,
        tripreporttime,
        selectedImage,
        tripshedintime,
        tripadditionaltime,
        tripstartkm,
        tripclosekm,
        tripstarttime,
        tripclosetime,
        tripstartdate,
        tripclosedate,
        organizationaddress1,
        organizationaddress2,
        organizationcity,
        organizationgstnumber,
        GmapimageUrl,
        mapimageUrl, total_GrossAmount, total_DriverBEta_Amount, total_Nighthalt_Amount, handleKeyenterBilling, discound_PercentageCalc,
        balanceRecivable, roundOffCalc, netAmountCalc, pendingAmountCalc, gst_taxAmountCalc, customerData,

        // ... (other state variables and functions)
    } = useBilling();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    const { permissions } = useContext(PermissionContext)
    const Billing_read = permissions[5]?.read;
    const Billing_new = permissions[5]?.new;
    const Billing_modify = permissions[5]?.modify;
    const Billing_delete = permissions[5]?.delete;

    return (
        <div className="form-container form-container-billing">
            <div className="Billing-form">
                <form onSubmit={handleClick}>
                    <div className="Billing-page-header">
                        <div className="input-field input-feild-booking">
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
                                    value={book.tripid || ''}
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
                                    value={book.billingno || ''}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyenterBilling}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="department"
                                    label="Station"
                                    name="department"
                                    autoComplete="new-password"
                                    value={book.department || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <CalendarMonthIcon color="action" />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id="billingDate"
                                        label="Billing Date"
                                        value={book.Billingdate ? dayjs(book.Billingdate) : dayjs() || ''}
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, 'Billingdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={book?.Billingdate} />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <RiPinDistanceLine color="action" />
                                </div>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    id="totalkm1"
                                    size="small"
                                    label="Total Kms"
                                    name="totalkm1"
                                    value={book.totalkm1 || ''}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone" >
                                    <IoIosTime color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="totaltime"
                                    label="Total Hours"
                                    name="totaltime"
                                    autoComplete="new-password"
                                    value={book.totaltime || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
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
                                    value={book.customer || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
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
                                    value={book.supplier || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <CalendarMonthIcon color="action" />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Trip Date"
                                        id="tripDate"
                                        value={book.startdate ? dayjs(book.startdate) : null}
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, 'startdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={book?.startdate} />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <CalendarMonthIcon color="action" />
                                </div>
                                <TextField
                                    type='number'
                                    margin="normal"
                                    size="small"
                                    id="totaldays"
                                    label="Total Days"
                                    name="totaldays"
                                    autoComplete="new-password"
                                    value={book.totaldays || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
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
                                    value={book.guestname || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
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
                                    value={book.rateType || customerData?.rateType || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
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
                                    value={book.vehRegNo || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <DirectionsCarFilledIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="Trips"
                                    label="Trips"
                                    name="trips"
                                    autoComplete="new-password"
                                    value={book.trips || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Billing-page-secend-container">
                        <div className="Billing-secend-left">
                            <div className="input-field input-feild-booking ">
                                <div className="input">
                                    <div className="icone">
                                        <CarCrashIcon color="action" />
                                    </div>
                                    <TextField
                                        name="vehType"
                                        autoComplete="new-password"
                                        value={book.vehType || ''}
                                        onChange={handleChange}
                                        label="Vehicle Type"
                                        id="vehType"
                                        size="small"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <EngineeringIcon color="action" />
                                    </div>
                                    <TextField
                                        label='Duty'
                                        name="duty"
                                        autoComplete="new-password"
                                        value={book.duty || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="duty"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input">
                                    <div className="icone">
                                        <Inventory2Icon color="action" />
                                    </div>
                                    <TextField
                                        name="calcPackage"
                                        autoComplete="new-password"
                                        value={book.calcPackage || ''}
                                        onChange={handleChange}
                                        label="Min.Charges"
                                        id="MinCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input min-charge-value-input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="package_amount"
                                        autoComplete="new-password"
                                        value={book.package_amount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            {/* for desktop view */}
                            <div className="desktop-division-one">
                                <div className="input-field">
                                    <div className="input">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faRoad} />
                                        </div>
                                        <TextField
                                            type='number'
                                            name="extraKM"
                                            autoComplete="new-password"
                                            value={book?.extraKM || ''}
                                            onChange={handleChange}
                                            label="Charges For Extra"
                                            id="extraKM"
                                            size="small"
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">KMS</InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="input biling-amount-input">
                                        <div className="icone">
                                            <TollTwoToneIcon color="action" />
                                        </div>
                                        <TextField size="small"
                                            type='number'
                                            name='extrakm_amount'
                                            id='extrakm_amountNumer'
                                            autoComplete="new-password"
                                            value={book.extrakm_amount || ''}
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
                                    <div className="input biling-amount-input-total">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faEquals} />
                                        </div>
                                        <TextField
                                            name="ex_kmAmount"
                                            autoComplete="new-password"
                                            value={book.ex_kmAmount || ''}
                                            onChange={handleChange}
                                            size="small"
                                            label="Amount1"
                                            id="ex_kmAmountEX"
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* for mobile view */}
                            <div className="input-field mobile-division-two">
                                <div className="input input-mobile" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="extraKM"
                                        autoComplete="new-password"
                                        value={book?.extraKM || ''}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="extraKM098"
                                        size="small"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">KMS</InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FaPlus />
                                </div>
                                <div className="input input-mobile" >
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='extrakm_amount'
                                        id='extrakm_amount'
                                        autoComplete="new-password"
                                        value={book.extrakm_amount || ''}
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
                                <div className='billing-calculation-icon'>
                                    <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <div className="input input-mobile">
                                    <TextField
                                        name="ex_kmAmount"
                                        autoComplete="new-password"
                                        value={book.ex_kmAmount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount1"
                                        id="ex_kmAmount78"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            {/* for desktop view */}
                            <div className="desktop-division-one">
                                <div className="input-field">
                                    <div className="input">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faStopwatch} />
                                        </div>
                                        <TextField
                                            name="extraHR"
                                            autoComplete="new-password"
                                            value={book.extraHR || ''}
                                            onChange={handleChange}
                                            label="Charges For Extra"
                                            id="extraHR"
                                            size="small"
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">HRS</InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="input biling-amount-input">
                                        <div className="icone">
                                            <TollTwoToneIcon color="action" />
                                        </div>
                                        <TextField size="small"
                                            type='number'
                                            name='extrahr_amount'
                                            id='extrahr_amount'
                                            autoComplete="new-password"
                                            value={book.extrahr_amount || ''}
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
                                    <div className="input biling-amount-input-total">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faEquals} />
                                        </div>
                                        <TextField
                                            name="ex_hrAmount"
                                            autoComplete="new-password"
                                            value={book.ex_hrAmount || ""}
                                            onChange={handleChange}
                                            size="small"
                                            label="Amount2"
                                            id="ex_hrAmount_Amount2"
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* for mobile view */}
                            <div className="input-field mobile-division-two">
                                <div className="input input-mobile" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                    </div>
                                    <TextField
                                        name="extraHR"
                                        autoComplete="new-password"
                                        value={book.extraHR || ''}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="extraHR_chargeForExtra"
                                        size="small"
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">HRS</InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FaPlus />
                                </div>
                                <div className="input input-mobile" >
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small"
                                        type='number'
                                        name='extrahr_amount'
                                        id='extrahr_amountEx'
                                        autoComplete="new-password"
                                        value={book.extrahr_amount || ''}
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
                                <div className='billing-calculation-icon'>
                                    <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <div className="input input-mobile" >
                                    <TextField
                                        name="ex_hrAmount"
                                        autoComplete="new-password"
                                        value={book.ex_hrAmount || ""}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount2"
                                        id="ex_hrAmount_A2"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            {/* for desktop view */}
                            <div className="desktop-division-one">
                                <div className="input-field">
                                    <div className="input">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faCloudMoon} />
                                        </div>
                                        <TextField
                                            type='number'
                                            name="nightBta"
                                            autoComplete="new-password"
                                            value={book.nightBta || ''}
                                            onChange={handleChange}
                                            label="Night Halt"
                                            id="nightBta_NB"
                                            size="small"
                                            variant="standard"
                                        />
                                    </div>
                                    <div className="input biling-amount-input">
                                        <div className="icone">
                                            <TollTwoToneIcon color="action" />
                                        </div>
                                        <TextField size="small" variant="standard"
                                            type='number'
                                            name='nightCount'
                                            id='nightCount_NC'
                                            autoComplete="new-password"
                                            value={book.nightCount || ''}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }} />
                                    </div>
                                    <div className="input biling-amount-input-total">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faEquals} />
                                        </div>
                                        <TextField
                                            type='number'
                                            name="nhamount"
                                            autoComplete="new-password"
                                            value={total_Nighthalt_Amount() || book.nhamount || ''}
                                            onChange={handleChange}
                                            size="small"
                                            label="Amount1"
                                            id="nhamountNA1"
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* for mobile view */}
                            <div className="input-field  mobile-division-two">
                                <div className="input  input-mobile" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faCloudMoon} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="nightBta"
                                        autoComplete="new-password"
                                        value={book.nightBta || ''}
                                        onChange={handleChange}
                                        label="Night Halt"
                                        id="nightBta"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FaPlus />
                                </div>
                                <div className="input  input-mobile">
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='nightCount'
                                        id='nightCount'
                                        autoComplete="new-password"
                                        value={book.nightCount || ''}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <div className="input input-mobile">
                                    <TextField
                                        type='number'
                                        name="nhamount"
                                        autoComplete="new-password"
                                        value={total_Nighthalt_Amount() || book.nhamount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="nhamount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            {/* for desktop view */}
                            <div className="desktop-division-one">
                                <div className="input-field">
                                    <div className="input">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faMoneyBill1Wave} />
                                        </div>
                                        <TextField
                                            type='number'
                                            label="Driver Bata"
                                            name='driverBeta'
                                            autoComplete="new-password"

                                            value={book.driverBeta || ''}
                                            onChange={handleChange}
                                            id="driverbataamount1"
                                            size="small"
                                            variant="standard"
                                        />
                                    </div>
                                    <div className="input biling-amount-input">
                                        <div className="icone">
                                            <TollTwoToneIcon color="action" />
                                        </div>
                                        <TextField size="small" variant="standard"
                                            type='number'
                                            name='driverbeta_Count'
                                            id='driverbeta_count67'
                                            autoComplete="new-password"
                                            value={book.driverbeta_Count || ''}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }} />
                                    </div>
                                    <div className="input biling-amount-input-total">
                                        <div className="icone">
                                            <FontAwesomeIcon icon={faEquals} />
                                        </div>
                                        <TextField
                                            type='number'
                                            name="driverBeta_amount"
                                            autoComplete="new-password"
                                            value={total_DriverBEta_Amount() || book.driverBeta_amount || ''}
                                            onChange={handleChange}
                                            size="small"
                                            label="Amount"
                                            id="driverBeta_amount12"
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* for mobile view */}
                            <div className="input-field mobile-division-two">
                                <div className="input input-mobile" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="Driver Bata"
                                        name='driverBeta'
                                        autoComplete="new-password"

                                        value={book.driverBeta || ''}
                                        onChange={handleChange}
                                        id="driverbata"
                                        size="small"
                                        variant="standard"
                                    />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FaPlus />
                                </div>
                                <div className="input input-mobile">
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField size="small" variant="standard"
                                        type='number'
                                        name='driverbeta_Count'
                                        id='driverbeta_Count'
                                        autoComplete="new-password"
                                        value={book.driverbeta_Count || ''}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FontAwesomeIcon icon={faEquals} />
                                </div>
                                <div className="input input-mobile">
                                    <TextField
                                        type='number'
                                        name="driverBeta_amount"
                                        autoComplete="new-password"
                                        value={total_DriverBEta_Amount() || book.driverBeta_amount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount"
                                        id="driverBeta_amount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                                    </div>
                                    <TextField
                                        name="OtherCharges"
                                        autoComplete="new-password"
                                        value={book.OtherCharges || ''}
                                        onChange={handleChange}
                                        label="Other Charges"
                                        id="OtherCharges"
                                        size="small"
                                        variant="standard"
                                        sx={{ m: 1, width: "60ch" }}
                                    />
                                </div>
                                <div className="input biling-amount-input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        type='number'
                                        name="OtherChargesamount"
                                        autoComplete="new-password"
                                        value={book.OtherChargesamount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="OtherChargesamount"
                                        variant="standard"
                                    />
                                </div>
                            </div>
                            <div className="input-field input-feild-left-bottom">
                                <div className="input billing-permit-input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileContract} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        name='permit'
                                        label="Permit"
                                        autoComplete="new-password"
                                        value={book.permit || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="permit"
                                    />
                                </div>
                                <div className="input c">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faWindowRestore} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="Parking"
                                        name='parking'
                                        autoComplete="new-password"
                                        value={book.parking || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="parking"
                                    />
                                </div>
                            </div>
                            <div className="input-field input-feild-left-bottom">
                                <div className="input billing-toll-input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileContract} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        name='toll'
                                        label="Toll"
                                        autoComplete="new-password"
                                        value={book.toll || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="toll"
                                    />
                                </div>
                                <div className="input billing-Vpermit-input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faWindowRestore} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="V-Permit-TO-Vendor"
                                        name='vpermettovendor'
                                        autoComplete="new-password"
                                        value={book.vpermettovendor || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="vpermettovendor"
                                    />
                                </div>
                            </div>
                            <div className="input-field input-feild-left-bottom">
                                <div className="input billing-vendortoll-input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileContract} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        name='vendortoll'
                                        label="Vendor Toll"
                                        autoComplete="new-password"
                                        value={book.vendortoll || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="vendortoll"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="Billing-secend-right">
                            <div className="input-field inputfeild-billing-right">
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="minKM"
                                        label="Min Kilometers"
                                        name="minKM"
                                        autoComplete="new-password"
                                        value={book?.minKM || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="minHour"
                                        label="Min Hours"
                                        name="minHour"
                                        autoComplete="new-password"
                                        value={book?.minHour || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field inputfeild-billing-right">
                                <div className="input input-billing">
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
                                        value={total_GrossAmount() || book.GrossAmount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
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
                                        value={book.AfterTaxAmount || gst_taxAmountCalc() || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field inputfeild-billing-right">
                                <div className="input input-billing">
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
                                        value={book.DiscountAmount || discound_PercentageCalc() || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faPercent} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        name='DiscountAmount2'
                                        id='DiscountAmount2'
                                        size="small"
                                        autoComplete="new-password"
                                        value={book.DiscountAmount2 || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field inputfeild-billing-right">
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faArrowRightArrowLeft} size="lg" />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="AdvanceReceived"
                                        label="Advance Received"
                                        name="customeradvance"
                                        autoComplete="new-password"
                                        value={book.customeradvance || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
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
                                        value={balanceRecivable() || book.BalanceReceivable || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field inputfeild-billing-right">
                                <div className="input input-billing" >
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
                                        value={roundOffCalc() || book.RoundedOff || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
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
                                        value={netAmountCalc() || book.NetAmount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field inputfeild-billing-right">
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <GiMoneyStack />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        id="Totalamount"
                                        label="Total Amount"
                                        name="Totalamount"
                                        autoComplete="new-password"
                                        value={netAmountCalc() || book.NetAmount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
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
                                        value={book.paidamount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field inputfeild-billing-right inputfeild-billing-right-margin-bottom">
                                <div className="input input-billing" >
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
                                        value={pendingAmountCalc() || book.pendingamount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
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
                                        value={selectedBankAccount || book.BankAccount || ''}
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
                    <Dialog open={popupOpen} onClose={handlePopupClose}>
                        <DialogContent>
                            <Paymentinvoice

                                triprequest={triprequest}
                                tripcode={tripcode}
                                selectedImage={selectedImage}
                                organizationdata={organizationdata}
                                tripdepartment={tripdepartment}
                                routeData={routeData}
                                book={book}
                                tripShedkm={tripShedkm}
                                tripshedin={tripshedin}
                                tripshedout={tripshedout}
                                tripreporttime={tripreporttime}
                                tripshedintime={tripshedintime}
                                tripadditionaltime={tripadditionaltime}
                                tripstartkm={tripstartkm}
                                tripclosekm={tripclosekm}
                                tripstarttime={tripstarttime}
                                tripclosetime={tripclosetime}
                                tripstartdate={tripstartdate}
                                tripclosedate={tripclosedate}
                                selectedCustomerDatas={book}
                                organizationaddress1={organizationaddress1}
                                organizationaddress2={organizationaddress2}
                                organizationcity={organizationcity}
                                organizationgstnumber={organizationgstnumber}
                                GmapimageUrl={GmapimageUrl}
                                mapimageUrl={mapimageUrl}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handlePopupClose} variant="contained" color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
                <div className='alert-popup-main'>
                    {error &&
                        <div className='alert-popup Error' >
                            <div className="popup-icon"> <ClearIcon /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{errorMessage}</p>
                        </div>
                    }
                    {info &&
                        <div className='alert-popup Info' >
                            <div className="popup-icon"> <BsInfo /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{infoMessage}</p>
                        </div>
                    }
                    {warning &&
                        <div className='alert-popup Warning' >
                            <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{warningMessage}</p>
                        </div>
                    }
                    {success &&
                        <div className='alert-popup Success' >
                            <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{successMessage}</p>
                        </div>
                    }
                </div>
                <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<SpeedDialIcon />}
                        direction="left"
                    >

                        {Billing_new === 1 && (
                            <SpeedDialAction
                                key="Add"
                                icon={<BookmarkAddedIcon />}
                                tooltipTitle="Add"
                                onClick={(event) => handleClick(event, "Add")}
                            />
                        )}
                        {Billing_modify === 1 && (
                            <SpeedDialAction
                                key="edit"
                                icon={<ModeEditIcon />}
                                tooltipTitle="Edit"
                                onClick={(event) => handleClick(event, "Edit")}
                            />
                        )}
                        {Billing_delete === 1 && (
                            <SpeedDialAction
                                key="delete"
                                icon={<DeleteIcon />}
                                tooltipTitle="Delete"
                                onClick={(event) => handleClick(event, "Delete")}
                            />
                        )}
                        <SpeedDialAction
                            key="Cancel"
                            icon={<CancelPresentationIcon />}
                            tooltipTitle="Cancel"
                            onClick={(event) => handleClick(event, "Cancel")}
                        />
                        {Billing_read === 1 && (
                            <SpeedDialAction
                                key="Print"
                                icon={<PrintIcon />}
                                tooltipTitle="Print"
                                onClick={(event) => handleClick(event, "Print")}
                            />
                        )}
                    </StyledSpeedDial>
                </Box>
            </div>
        </div>
    )
}

export default Billing