import React, { useEffect } from 'react'
import './Booking.css'
import { Duty, PayType, PickUp, Report } from './Booking'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import ChecklistIcon from '@mui/icons-material/Checklist';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { styled } from "@mui/material/styles";
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2)
    }
}));


const actions = [
    { icon: <ChecklistIcon />, name: "List" },
    { icon: <CancelPresentationIcon />, name: "Cancel" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Edit" },
    { icon: <BookmarkAddedIcon />, name: "Add" }
];
//
const Booking = () => {
    const location = useLocation();

    useEffect(() => {
        // Retrieve the previously stored actives menu item from localStorage
        const activeMenuItem = localStorage.getItem('activeMenuItem');

        // Add 'actives' class to the actives menu item if it exists
        if (activeMenuItem) {
            const menuItems = document.querySelectorAll('.menu-link');
            menuItems.forEach((item) => {
                if (item.textContent === activeMenuItem) {
                    item.classList.add('actives');
                } else {
                    item.classList.remove('actives');
                }
            });
        }
    }, [location]);

    // Function to handle menu item clicks
    const handleMenuItemClick = (menuItem) => {
        // Store the clicked menu item in localStorage
        localStorage.setItem('activeMenuItem', menuItem);
    };

    return (
        <form action="" className='booking-form'>

            <span className='Title-Name'>Booking</span>
            <div className="detail-container-main">
                <div className="container-left">
                    <div className='input-field'>
                        <div className='input'>
                            <div className="icone">
                                <SwitchAccountIcon color="action" />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="bookingno"
                                label="Booking No"
                                name="bookingno"
                                autoFocus
                            />
                        </div>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Booking Date">
                                    <DatePicker
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={['year', 'month', 'day']}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </div>
                        <div className='input'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker", "MobileTimePicker"]}>
                                    <DemoItem label="Booking Time">
                                        <MobileTimePicker defaultValue={dayjs()} />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className="input radio">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                                    <FormControlLabel value="cancelled" control={<Radio />} label="Cancelled" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <LocationCityIcon color='action' />
                            </div>
                            <TextField
                                name="tripid"
                                label="Trip Id"
                                id="standard-size-normal"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <PermIdentityIcon color='action' />
                            </div>
                            <TextField
                                name="customer"
                                label="Customer"
                                id="customer"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className='input'>
                            <div className='icone'>
                                <AttachEmailIcon color='action' />
                            </div>
                            <TextField
                                name="orderedby"
                                label="Ordered by"
                                id="orderedby"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <ContactPhoneIcon color='action' />
                            </div>
                            <TextField
                                name="mobileno"
                                label="Mobile No"
                                id="mobileno"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <ContactPhoneIcon color='action' />
                            </div>
                            <TextField
                                name="guestname"
                                label="Guest Name"
                                id="guestname"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className='input'>
                            <div className='icone'>
                                <RateReviewIcon color='action' />
                            </div>
                            <TextField
                                name="guestmobileno"
                                label="Guest Mobile No"
                                id="guestmobileno"
                                variant="standard"
                            />
                        </div>
                        <div className="input radio">
                            <div className='icone'>
                                <RateReviewIcon color='action' />
                            </div>
                            <TextField
                                name="email"
                                label="Email"
                                id="email"
                                variant="standard"
                            />
                        </div>
                        <div className="input radio">
                            <div className='icone'>
                                <RateReviewIcon color='action' />
                            </div>
                            <TextField
                                name="employeeno"
                                label="Employee No"
                                id="employeeno"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className='input'>
                            <div className='icone'>
                                <AttachEmailIcon color='action' />
                            </div>
                            <TextField
                                name="orderedby"
                                label="Ordered by"
                                id="orderedby"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <ContactPhoneIcon color='action' />
                            </div>
                            <TextField
                                name="mobileno"
                                label="Mobile No"
                                id="mobileno"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <ContactPhoneIcon color='action' />
                            </div>
                            <TextField
                                name="guestname"
                                label="Guest Name"
                                id="guestname"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className='input'>
                            <div className="icone">
                                <AddHomeWorkIcon color='action' />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="address"
                                label="Street Name"
                                name="address"
                                autoFocus
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <PermIdentityIcon color='action' />
                            </div>
                            <TextField
                                name="address"
                                label="Address"
                                id="address"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <LocationCityIcon color='action' />
                            </div>
                            <TextField
                                name="city"
                                label="City"
                                id="standard-size-normal"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className="input">
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={Report.map((option) => option.optionvalue)}
                                options={Report.map((option) => option.Option)}
                                renderInput={(params) => <TextField {...params} label="Report" />}
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <PermIdentityIcon color='action' />
                            </div>
                            <TextField
                                name="vehicaltype"
                                label="Vehical Type"
                                id="vehicaltype"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <LocationCityIcon color='action' />
                            </div>
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={PayType.map((option) => option.optionvalue)}
                                options={PayType.map((option) => option.Option)}
                                renderInput={(params) => <TextField {...params} label="Payment Type" />}
                            />
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className='input'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Report Date">
                                    <DatePicker
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={['year', 'month', 'day']}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </div>
                        <div className='input'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker", "MobileTimePicker"]}>
                                    <DemoItem label="Start Time">
                                        <MobileTimePicker defaultValue={dayjs()} />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='input'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker", "MobileTimePicker"]}>
                                    <DemoItem label="RegisterTime">
                                        <MobileTimePicker defaultValue={dayjs()} />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="input-field">
                        <div className='input'>
                            <div className='icone'>
                                <LocationCityIcon color='action' />
                            </div>
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={Duty.map((option) => option.optionvalue)}
                                options={Duty.map((option) => option.Option)}
                                renderInput={(params) => <TextField {...params} label="Duty" />}
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <LocationCityIcon color='action' />
                            </div>
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={PickUp.map((option) => option.optionvalue)}
                                options={PickUp.map((option) => option.Option)}
                                renderInput={(params) => <TextField {...params} label="PickUp" />}
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <PermIdentityIcon color='action' />
                            </div>
                            <TextField
                                name="costcode"
                                label="Cost Code"
                                id="costcode"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className='input'>
                            <div className='icone'>
                                <PermIdentityIcon color='action' />
                            </div>
                            <TextField
                                name="registerno"
                                label="Register No"
                                id="registerno"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <PermIdentityIcon color='action' />
                            </div>
                            <TextField
                                name="flightno"
                                label="Flight No"
                                id="flight"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <PermIdentityIcon color='action' />
                            </div>
                            <TextField
                                name="orderbyemail"
                                label="Order By Email"
                                id="orederbyemail"
                                variant="standard"
                            />
                        </div>
                    </div>
                </div>
                <div className="container-right">
                    <div className='booking-update-main'>
                        <nav>
                            <Link
                                className={`update-link ${localStorage.getItem('activeMenuItem') === 'Customer Master' ? 'actives' : ''}`}
                                to='/home/orders/bookings/list'
                                onClick={() => handleMenuItemClick('Customer Master')}
                            >
                                List
                            </Link>
                            <Link
                                className={`update-link ${localStorage.getItem('activeMenuItem') === 'Customer Master' ? 'actives' : ''}`}
                                to="/home/orders/bookings/billingaddress"
                                onClick={() => handleMenuItemClick('Customer Master')}
                            >
                                Billing Address
                            </Link>
                            <Link
                                className={`update-link ${localStorage.getItem('activeMenuItem') === 'Customer Master' ? 'actives' : ''}`}
                                to='/home/orders/bookings/email'
                                onClick={() => handleMenuItemClick('Customer Master')}
                            >
                                Email
                            </Link>
                        </nav>
                        <div className='booking-update'>
                            <div className='booking-update-content'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                    <div className="inpu-field">
                        <div className='input'>
                            <FormControlLabel
                                value="vehicleconfirm"
                                control={<Checkbox size="small" />}
                                label="Vehicle Confirm"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="vehiclechanges"
                                control={<Checkbox size="small" />}
                                label="Vehicle Changes"
                                labelPlacement="right"
                            />
                        </div>
                        <div className='input'>
                            <FormControlLabel
                                value="guestsms"
                                control={<Checkbox size="small" />}
                                label="Guest SMS"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="bookingsms"
                                control={<Checkbox size="small" />}
                                label="Booking SMS"
                                labelPlacement="right"
                            />
                            <FormControlLabel
                                value="sendemail"
                                control={<Checkbox size="small" />}
                                label="Send Email"
                                labelPlacement="right"
                            />
                        </div>
                        <div className='input'>
                            <TextField
                                margin="normal"
                                size="small"
                                id="usage"
                                label="Usage"
                                name="useage"
                                autoFocus
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <LocationCityIcon color='action' />
                            </div>
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value="JESSY CABS 2019-2020"
                                options="JESSY CABS 2019-2020"
                                renderInput={(params) => <TextField {...params} label="Fin Years" />}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                <StyledSpeedDial
                    ariaLabel="SpeedDial playground example"
                    icon={<SpeedDialIcon />}
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
        </form>
    )
}

export default Booking