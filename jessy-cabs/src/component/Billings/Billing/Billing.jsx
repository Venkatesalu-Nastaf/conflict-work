import React from 'react';
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
const today = dayjs();
const tomorrow = dayjs().add(1, "day");

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
    return (
        <div className="form-container">
            <div className="Billing-form">
                <form>
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
                                    name="TripSheetno"
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
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Date">
                                        <DatePicker
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            views={["year", "month", "day"]}
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
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Trip Date">
                                        <DatePicker
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            views={["year", "month", "day"]}
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
                                        name="amount"
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
                                        name="amount"
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
                                        name="amount"
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
                                        label="Permit / Other Tax"
                                        name="amount"
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
                                        name="amount"
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
                                    />
                                </div>
                                <div className="input" style={{ width: "200px" }}>
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faPercent} />
                                    </div>
                                    <TextField
                                        margin="normal"
                                        size="small"
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
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input">
                                    <FormControlLabel
                                        name="SavePrint"
                                        value="SavePrint"
                                        control={<Checkbox size="small" />}
                                        label="Save Print"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="input">
                                    <FormControlLabel
                                        name="document"
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
                                        value="Preview"
                                        control={<Checkbox size="small" />}
                                        label="Preview"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="input">
                                    <FormControlLabel
                                        name="Monthly"
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
                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
            </div>
        </div>
    )
}

export default Billing