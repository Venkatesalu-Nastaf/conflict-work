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
import SpeedDial from "@mui/material/SpeedDial";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GiMoneyStack } from "@react-icons/all-files/gi/GiMoneyStack";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { faBuilding} from '@fortawesome/free-solid-svg-icons';
//dialog box
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
import InvoicePdf from '../Pdf/InvoicePdf';
import { useData } from '../../../Dashboard/MainDash/Sildebar/DataContext2';
import { PdfData } from '../../Transfer/TransferReport/PdfContext';
import Modal from '@mui/material/Modal';

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

const Billing = ({Statename}) => {
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
        handlePopupClose,
        // organizationaddress1,
        handleKeyenterinvoicdeno,popupOpen,
        total_GrossAmount, total_DriverBEta_Amount, total_Nighthalt_Amount,invoicestate,
        discound_PercentageCalc,invoiceno,setInvoiceNo,billadd,dataotherStations,handleserviceInputChange,datastate,handlefullTotalAmount,hanldetollpark,
        balanceRecivable, roundOffCalc, netAmountCalc, pendingAmountCalc, gst_taxAmountCalc, customerData,edit,selectbillingdata,billingdate,stateDetails,setStateDetails

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
    const { logo } = useData()
    const { particularPdf, organizationDetail } = PdfData()
   
  
    return (
        <div className="form-container form-container-billing main-content-billing">

            <div className="Billing-form">
                <form onSubmit={handleClick}>
                    <div className="Billing-page-header">
                        <div className="input-field input-feild-booking">
                            <div className="input">
                                <div className="icone">
                                    <ListAltIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="tripid"
                                    className='full-width'
                                    label="Trip Sheet No"
                                    name="tripid"
                                    autoFocus
                                    autoComplete="off"
                                    value={book.tripid || selectbillingdata.tripid || ""}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField                                   
                                    size="small"
                                    id="Billingno"
                                    className='full-width'
                                    label="Billing No"
                                    name="billingno"
                                    autoComplete="new-password"
                                    value={book.billingno || selectbillingdata.billingno || ''}
                                    onChange={handleChange}
                                    // onKeyDown={handleKeyenterBilling}
                                />
                            </div>
                          
                         
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="InvoiceNo"
                                    className='full-width'
                                    label="Invoice NO"
                                    name="Invoice_No"
                                    autoComplete="new-password"
                                    value={invoiceno || invoicestate ||''}
                                    onChange={(e)=>setInvoiceNo(e.target.value)}
                                    onKeyDown={handleKeyenterinvoicdeno}
                                />
                            </div>
                      
                            <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-Statebill"
                                        freeSolo
                                        size="small"
                                        value={datastate}
                                        // options={[{ label: "All" }, ...stationName.map((option) => ({ label: option.Stationname }))]} 
                                        options={Statename.map((option) => ({
                                            label: option.state,
                                        }))}
                                        onChange={(event, value) => handleserviceInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="State" inputRef={params.inputRef}value={datastate} />
                                            );
                                        }}
                                    />
                                    </div>
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="department"
                                    className='full-width'
                                    label="Station"
                                    name="department"
                                    autoComplete="new-password"
                                    value={book.department || selectbillingdata.department ||''}
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
                                        className='full-width'
                                        label="Billing Date"
                                        // value={book.Billingdate || selectbillingdata.Billingdate ? dayjs(book.Billingdate ||selectbillingdata.Billingdate ) : dayjs() || ''}
                                        value={billingdate ? dayjs(billingdate) : dayjs() }
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, 'Billingdate')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef}
                                            
                                            value={book?.Billingdate}
                                            />
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
                                    // margin="normal"
                                    id="totalkm1"
                                    className='full-width'
                                    size="small"
                                    label="Total Kms"
                                    name="totalkm1"
                                    value={book.totalkm1 || selectbillingdata.totalkm1|| ''}
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone" >
                                    <IoIosTime color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="totaltime"
                                    className='full-width'
                                    label="Total Hours"
                                    name="totaltime"
                                    autoComplete="new-password"
                                    value={book.totaltime ||  selectbillingdata.totaltime || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <HailOutlinedIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    className='full-width'
                                    id="Customer"
                                    label="Customer"
                                    name="customer"
                                    autoComplete="new-password"
                                    value={book.customer ||  selectbillingdata.customer ||''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faBoxesPacking} size="lg" />
                                </div>
                                <TextField
                                    size="small"
                                    className='full-width'
                                    id="Supplier"
                                    label="Supplier"
                                    name="supplier"
                                    autoComplete="new-password"
                                    value={book.supplier || selectbillingdata.supplier|| ''}
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
                                        className='full-width'
                                        value={book.startdate ||  selectbillingdata.startdate ? dayjs(book.startdate || selectbillingdata.startdate) : null}
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
                                    size="small"
                                    id="totaldays"
                                    className='full-width'
                                    label="Total Days"
                                    name="totaldays"
                                    autoComplete="new-password"
                                    value={book.totaldays || selectbillingdata.totaldays||''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faPersonCircleCheck} size="lg" />
                                </div>
                                <TextField
                                    size="small"
                                    sx={{ width: "300px" }}
                                    id="guestname"
                                    label="Guest Name"
                                    name="guestname"
                                    autoComplete="new-password"
                                    value={book.guestname || selectbillingdata.guestname || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                                </div>
                                <TextField
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
                                    size="small"
                                    id="vehRegNo"
                                    className='full-width'
                                    label="Vehicle No"
                                    name="vehRegNo"
                                    autoComplete="new-password"
                                    value={book.vehRegNo || selectbillingdata.vehRegNo || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <DirectionsCarFilledIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="Trips"
                                    className='full-width'
                                    label="Trips"
                                    name="trips"
                                    autoComplete="new-password"
                                    value={book.trips || selectbillingdata.trips|| ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="Billing-page-secend-container">
                        <div className="Billing-secend-left">
                            <div className="input-field vehicle-type-input-field">
                                <div className="input">
                                    <div className="icone">
                                        <CarCrashIcon color="action" />
                                    </div>
                                    <TextField
                                        name="vehType"
                                        autoComplete="new-password"
                                        value={book.vehType || selectbillingdata.vehType|| ''}
                                        onChange={handleChange}
                                        label="Vehicle Type"
                                        id="vehType"
                                        size="small"
                                        sx={{ width: "100%" }}
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
                                        value={book.duty || selectbillingdata.duty|| ''}
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
                                        value={book.calcPackage || selectbillingdata.calcPackage|| ''}
                                        onChange={handleChange}
                                        label="Min.Charges"
                                        id="MinCharges"
                                        size="small"
                                        sx={{ width: "100%" }}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faEquals} />
                                    </div>
                                    <TextField
                                        name="package_amount"
                                        autoComplete="new-password"
                                        value={book.package_amount || selectbillingdata.package_amount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="amount"
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
                                            value={book?.extraKM || selectbillingdata.extraKM || ''}
                                            onChange={handleChange}
                                            label="Charges For Extra"
                                            id="extraKM"
                                            size="small"
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
                                            value={book.extrakm_amount || selectbillingdata.extrakm_amount || ''}
                                            onChange={handleChange}
                                            // variant="standard"
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
                                            value={book.ex_kmAmount || selectbillingdata.ex_kmAmount || ''}
                                            onChange={handleChange}
                                            size="small"
                                            label="Amount"
                                            id="ex_kmAmountEX"
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
                                        value={book?.extraKM || selectbillingdata.extraKM || ''}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="extraKM098"
                                        size="small"
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
                                        value={book.extrakm_amount ||  selectbillingdata.extrakm_amount || ''}
                                        onChange={handleChange}
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
                                        value={book.ex_kmAmount || selectbillingdata.ex_kmAmount|| ''}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount1"
                                        id="ex_kmAmount78"
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
                                            value={book.extraHR || selectbillingdata.extraHR || ''}
                                            onChange={handleChange}
                                            label="Charges For Extra"
                                            id="extraHR"
                                            size="small"
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
                                            value={book.extrahr_amount || selectbillingdata.extrahr_amount || ''}
                                            onChange={handleChange}
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
                                            value={book.ex_hrAmount || selectbillingdata.ex_hrAmount || ""}
                                            onChange={handleChange}
                                            size="small"
                                            label="Amount"
                                            id="ex_hrAmount_Amount2"
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
                                        value={book.extraHR ||  selectbillingdata.extraHR ||''}
                                        onChange={handleChange}
                                        label="Charges For Extra"
                                        id="extraHR_chargeForExtra"
                                        size="small"
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
                                        value={book.extrahr_amount ||  selectbillingdata .extrahr_amount ||''}
                                        onChange={handleChange}
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
                                        value={book.ex_hrAmount || selectbillingdata.ex_hrAmount || ""}
                                        onChange={handleChange}
                                        size="small"
                                        label="Amount2"
                                        id="ex_hrAmount_A2"
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
                                            value={book.nightBta || selectbillingdata.nightBta || ''}
                                            onChange={handleChange}
                                            label="Night Halt"
                                            id="nightBta_NB"
                                            size="small"
                                        />
                                    </div>
                                    <div className="input biling-amount-input">
                                        <div className="icone">
                                            <TollTwoToneIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            type='number'
                                            name='nightCount'
                                            id='nightCount_NC'
                                            autoComplete="new-password"
                                            value={book.nightCount ||  selectbillingdata.nightCount || ''}
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
                                            label="Amount"
                                            id="nhamountNA1"
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
                                        value={book.nightBta || selectbillingdata.nightBta || ''}
                                        onChange={handleChange}
                                        label="Night Halt"
                                        id="nightBta"
                                        size="small"
                                    />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FaPlus />
                                </div>
                                <div className="input  input-mobile">
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        type='number'
                                        name='nightCount'
                                        id='nightCount'
                                        autoComplete="new-password"
                                        value={book.nightCount || selectbillingdata.nightCount || ''}
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
                                            value={book.driverBeta || selectbillingdata.driverBeta || ''}
                                            onChange={handleChange}
                                            id="driverbataamount1"
                                            size="small"
                                        />
                                    </div>
                                    <div className="input biling-amount-input">
                                        <div className="icone">
                                            <TollTwoToneIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            type='number'
                                            name='driverbeta_Count'
                                            id='driverbeta_count67'
                                            autoComplete="new-password"
                                            value={book.driverbeta_Count ||  selectbillingdata.driverbeta_Count ||''}
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
                                        value={book.driverBeta || selectbillingdata.driverBeta || ''}
                                        onChange={handleChange}
                                        id="driverbata"
                                        size="small"
                                    />
                                </div>
                                <div className='billing-calculation-icon'>
                                    <FaPlus />
                                </div>
                                <div className="input input-mobile">
                                    <div className="icone">
                                        <TollTwoToneIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        type='number'
                                        name='driverbeta_Count'
                                        id='driverbeta_Count'
                                        autoComplete="new-password"
                                        value={book.driverbeta_Count ||  selectbillingdata.driverbeta_Count ||''}
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
                                        value={book.OtherCharges || selectbillingdata.OtherCharges || ''}
                                        onChange={handleChange}
                                        label="Other Charges"
                                        id="OtherCharges"
                                        size="small"
                                        sx={{ width: "100%" }}
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
                                        value={book.OtherChargesamount || selectbillingdata.OtherChargesamount || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="OtherChargesamount"
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
                                        value={book.permit || selectbillingdata.permit || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="permit"
                                    />
                                </div>
                                <div className="input billing-permit-input">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faWindowRestore} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
                                        label="Parking"
                                        name='parking'
                                        autoComplete="new-password"
                                        value={book.parking || selectbillingdata.parking || ''}
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
                                        value={book.toll || selectbillingdata.toll ||''}
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
                                        label="V Permit To Vendor"
                                        name='vpermettovendor'
                                        autoComplete="new-password"
                                        value={book.vpermettovendor || selectbillingdata.vpermettovendor || ''}
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
                                        value={book.vendortoll || selectbillingdata.vendortoll || ''}
                                        onChange={handleChange}
                                        size="small"
                                        id="vendortoll"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="Billing-secend-right">
                            <div className="input-field inputfeild-billing-right billing-inputfield-last">
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faRoad} />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="minKM"
                                        label="Min Kilometers"
                                        name="minKM"
                                        autoComplete="new-password"
                                        value={book?.minKM || selectbillingdata.minKM || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="minHour"
                                        label="Min Hours"
                                        name="minHour"
                                        autoComplete="new-password"
                                        value={book?.minHour || selectbillingdata.minHour ||''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faMagnifyingGlassChart} size="lg" />
                                    </div>
                                    <TextField
                                        type='number'
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
                                        size="small"
                                        id="AfterTaxAmount"
                                        label="Tax Amount"
                                        name="AfterTaxAmount"
                                        autoComplete="new-password"
                                        value={book.AfterTaxAmount || gst_taxAmountCalc() || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faShapes} size="lg" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="TotalTollPark"
                                        label="Parking & Toll"
                                        name="Parking & Toll"
                                        autoComplete="new-password"
                                        value={hanldetollpark()}
                                        // onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faShapes} size="lg" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="Total Amount With Tax"
                                        label="Total Amount With Tax"
                                        name="Total Amount With Tax"
                                        autoComplete="new-password"
                                        value={handlefullTotalAmount()}
                                        // onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faTags} size="lg" />
                                    </div>
                                    <TextField                                   
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
                                        name='DiscountAmount2'
                                        id='DiscountAmount2'
                                        size="small"
                                        autoComplete="new-password"
                                        value={book.DiscountAmount2 ||  selectbillingdata.DiscountAmount2 ||''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faArrowRightArrowLeft} size="lg" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="AdvanceReceived"
                                        label="Advance Received"
                                        name="customeradvance"
                                        autoComplete="new-password"
                                        value={book.customeradvance || selectbillingdata.customeradvance || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faCoins} size="lg" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="BalanceReceivable"
                                        label="Balance Receivable"
                                        name="BalanceReceivable"
                                        autoComplete="new-password"
                                        value={balanceRecivable() || book.BalanceReceivable || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <ChangeCircleIcon color="active" />
                                    </div>
                                    <TextField
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
                                        size="small"
                                        id="NetAmount"
                                        label="Net Amount"
                                        name="NetAmount"
                                        autoComplete="new-password"
                                        value={netAmountCalc() || book.NetAmount || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <GiMoneyStack />
                                    </div>
                                    <TextField
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
                                        size="small"
                                        id="paidamount"
                                        label="Paid Amount"
                                        name="paidamount"
                                        autoComplete="new-password"
                                        value={book.paidamount || selectbillingdata.paidamount ||''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input input-billing" >
                                    <div className="icone">
                                        <PendingActionsIcon />
                                    </div>
                                    <TextField
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
                                        value={selectedBankAccount || book.BankAccount ||  selectbillingdata.BankAccount||''}
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
                    {/* <Dialog open={popupOpen} onClose={handlePopupClose}>
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
                    </Dialog> */}
                </form>

                    <Modal open={popupOpen} onClose={handlePopupClose} aria-labelledby="modal-title"
                        aria-describedby="modal-description">
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '834px',
                                height: '700px',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                                overflowY: 'auto'
                            }}
                        >
                            <InvoicePdf
                                book={book}
                                logo={logo}
                                // organizationaddress={organizationaddress1}
                                organizationdata={organizationDetail}
                                customerData={customerData}
                                billdatadate={billingdate}
                                stateDetails={stateDetails}
                                otherStations={dataotherStations}
                                invoicedata = {invoicestate || book.invoiceno}
                            />
                        </Box>
                        {/* <Paymentinvoice

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
                            /> */}

                    </Modal>
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

                <div style={{ position: 'relative', right: '86px' }}>
                    <Box className='common-speed-dail'>
                        <StyledSpeedDial
                            ariaLabel="SpeedDial playground example"
                            icon={<SpeedDialIcon />}
                            direction="left"
                        >

                            {Billing_new === 1 && billadd &&(
                                <SpeedDialAction
                                    key="Add"
                                    icon={<BookmarkAddedIcon />}
                                    tooltipTitle="Add"
                                    onClick={(event) => handleClick(event, "Add")}
                                />
                            )}
                            {/* {Billing_modify === 1 && (
                                <SpeedDialAction
                                    key="edit"
                                    icon={<ModeEditIcon />}
                                    tooltipTitle="Edit"
                                    onClick={(event) => handleClick(event, "Edit")}
                                />
                            )} */}
                            {/* {Billing_delete === 1 && (
                                <SpeedDialAction
                                    key="delete"
                                    icon={<DeleteIcon />}
                                    tooltipTitle="Delete"
                                    onClick={(event) => handleClick(event, "Delete")}
                                />
                            )}  */}

                            <SpeedDialAction
                                key="Cancel"
                                icon={<CancelPresentationIcon />}
                                tooltipTitle="Cancel"
                                onClick={(event) => handleClick(event, "Cancel")}
                            />
                            {Billing_read === 1 && edit &&(
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
        </div>
    )
}

export default Billing