import React from 'react'
import './Vehicaleinfo.css'
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { FaMoneyBillWave } from 'react-icons/fa';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CommuteIcon from '@mui/icons-material/Commute';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
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
const Vehicaleinfo = () => {
    return (
        <>
            <form action="">

                <span className='Title-Name'>Vehicale Info</span>
                <div className='input-field'>
                    <div className='input'>
                        <div className="icone">
                            <MinorCrashIcon color="action" />
                        </div>
                        <TextField
                            name="vehicaleid"
                            label="Vehicale ID"
                            id="standard-size-normal"
                            variant="standard"
                        />
                    </div>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="D.O.A Date">
                                <DatePicker
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    views={['year', 'month', 'day']}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='input-field'>
                    <div className='input'>
                        <div className="icone">
                            <CarCrashIcon color='action' />
                        </div>
                        <TextField
                            margin="normal"
                            size="small"
                            id="veh_reg_no"
                            label="Veh.Reg.No"
                            name="veh_reg_no"
                            autoFocus

                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <PriceChangeIcon color='action' />
                        </div>
                        <TextField
                            name="cost_center"
                            label="Cost Center"
                            id="standard-size-normal"
                            variant="standard"
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <CommuteIcon color='action' />
                        </div>
                        <TextField
                            name="veh_type"
                            label="Veh.Type"
                            id="veh_type"
                            variant="standard"
                        />
                    </div>
                </div>
                <div className='input-field'>
                    <div className='input'>
                        <div className='icone'>
                            <AssessmentIcon color='action' />
                        </div>
                        <TextField
                            margin="normal"
                            size="small"
                            id="year_model"
                            value={'2012'}
                            name="year_model"
                            label="Year Model"
                            autoFocus
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <EmojiTransportationIcon color='action' />
                        </div>
                        <TextField
                            name="owner"
                            label="Owner"
                            id="owner"
                            variant="standard"
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <ContactPhoneIcon color='action' />
                        </div>
                        <TextField
                            name="mobile_no"
                            label="Mobile No"
                            id="mobile_no"
                            variant="standard"
                        />
                    </div>
                </div>
                <div className='input-field'>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="FC Date">
                                <DatePicker
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    views={['day', 'month', 'year']}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                    <div className="input radio">
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Tax Date">
                                    <DatePicker
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={['day', 'month', 'year']}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="input radio">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="NP Date">
                                <DatePicker
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    views={['day', 'month', 'year']}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='input-field'>
                    <div className="input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="Ins.Date">
                                <DatePicker
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    views={['day', 'month', 'year']}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                    <div className="input radio">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="St.Permit">
                                <DatePicker
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    views={['day', 'month', 'year']}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                    <div className="input radio">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="Due Date">
                                <DatePicker
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    views={['day', 'month', 'year']}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='input-field'>
                    <div className='input'>
                        <div className='icone'>
                            <AccountBalanceWalletIcon color='action' />
                        </div>
                        <TextField
                            name="financer"
                            label="Financer"
                            id="financer"
                            variant="standard"
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <SpeedIcon color='action' />
                        </div>
                        <TextField
                            name="avgmileage"
                            label="AVG Mileage"
                            id="avgmileage"
                            variant="standard"
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <AltRouteIcon color='action' />
                        </div>
                        <TextField
                            margin="normal"
                            size="small"
                            name="routeno"
                            label="Route No"
                            id="routeno"
                            autoFocus
                        />
                    </div>
                </div>
                <div className='input-field'>
                    <div className='input'>
                        <div className='icone'>
                            <AirlineSeatReclineExtraIcon color='action' />
                        </div>
                        <TextField
                            name="driver_name"
                            label="Driver Name"
                            id="driver_name"
                            variant="standard"
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <FaMoneyBillWave color='action' />
                        </div>
                        <TextField
                            name="due_amount"
                            label="Due Amount"
                            id="due_amount"
                            variant="standard"
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <ContactPhoneIcon color='action' />
                        </div>
                        <TextField
                            margin="normal"
                            size="small"
                            name="tank_cap"
                            label="Tank Cap"
                            id="tank_cap"
                            autoFocus
                        />
                    </div>
                </div>
                <div className='input-field'>
                    <div className='input'>
                        <div className='icone'>
                            <AutoModeIcon color='action' />
                        </div>
                        <TextField
                            margin="normal"
                            size="small"
                            name="remarks"
                            label="Remarks"
                            id="remarks"
                            autoFocus
                        />
                    </div>
                    <div className='input'>
                        <div className='icone'>
                            <AssignmentIndTwoToneIcon color='action' />
                        </div>
                        <TextField
                            name="Owner Type"
                            label="owner_Type"
                            id="owner_type"
                            variant="standard"
                        />
                    </div>
                </div>
                <div className='input-field'>
                    <div className='input'>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Active</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='input'>
                        <Button variant="outlined" startIcon={<SummarizeTwoToneIcon />}>
                            list
                        </Button>
                    </div>
                </div>
                <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        // hidden={hidden}
                        icon={<SpeedDialIcon />}
                    // direction={direction}
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
            <div className='textbox'>
                <div className="textboxlist">
                    <p>
                    </p>
                </div>
                <div className='textboxupdate'>
                    <div className='textbox-container'>
                        <span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vehicaleinfo