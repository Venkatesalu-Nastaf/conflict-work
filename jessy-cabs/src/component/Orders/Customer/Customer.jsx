import React from 'react'
import { UnderGroup, states, Customertype, Select, BillingGroup } from './Customerdata'
import './Customer.css'
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StoreIcon from '@mui/icons-material/Store';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Autocomplete from '@mui/material/Autocomplete';


// 
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from '@mui/icons-material/Checklist';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';


// import Input from '@mui/material/Input';
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



const Customer = () => {
    // const [direction, setDirection] = React.useState("up");
    // const [hidden, setHidden] = React.useState(false);

    // const handleDirectionChange = (event) => {
    //     setDirection(event.target.value);
    // };

    // const handleHiddenChange = (event) => {
    //     setHidden(event.target.checked);
    // };

    return (
        <>
            <div className="form-container">
                <form action="">
                    <span className='Title-Name'>Customer Master</span>
                    <div className='input-field'>
                        <div className='input'>
                            <div className="icone">
                                <BadgeIcon color="action" />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="email"
                                label="Name"
                                name="email"
                                autoFocus

                            />
                        </div>
                        <div className='input'>
                            <TextField
                                margin="normal"
                                size="small"
                                id="Print Name"
                                label="Print Name"
                                name="Print Name"
                                autoFocus
                            />
                        </div>
                        <div className="input">
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={Customertype.map((option) => option.optionvalue)}
                                options={Customertype.map((option) => option.Option)}
                                renderInput={(params) => <TextField {...params} label="Customer Type " />}
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
                                id="address1"
                                label="Address 1"
                                name="address1"
                                autoFocus

                            />
                        </div>
                        <div className='input'>
                            <TextField
                                margin="normal"
                                size="small"
                                id="address2"
                                label="Address 2"
                                name="address2"
                                autoFocus
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
                        <div className='input'>
                            <div className='icone'>
                                <AttachEmailIcon color='action' />
                            </div>
                            <TextField
                                name="email"
                                label="Email"
                                id="standard-size-normal"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <RateReviewIcon color='action' />
                            </div>
                            <TextField
                                name="ratetype"
                                label="Rate Type"
                                id="standard-size-normal"
                                variant="standard"
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <AccountBalanceWalletIcon color='action' />
                            </div>
                            <TextField
                                name="opbalanace"
                                label="OP Balanace"
                                id="standard-size-normal"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className='input'>
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={UnderGroup.map((option) => option.optionvalue)}
                                options={UnderGroup.map((option) => option.option)}
                                renderInput={(params) => <TextField {...params} label="Under Group" />}
                            />
                        </div>
                        <div className="input radio">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">GST Tax</FormLabel>
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
                        <div className="input radio">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">A/C Type</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="Dr" control={<Radio />} label="Dr" />
                                    <FormControlLabel value="Cr" control={<Radio />} label="Cr" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className='input-field checkbox'>
                        <FormControlLabel
                            value="Printbill"
                            control={<Checkbox size="small" />}
                            label="Print Bill"
                            labelPlacement="right"
                        />
                        <FormControlLabel
                            value="Username"
                            control={<Checkbox size="small" />}
                            label="User Name"
                            labelPlacement="right"
                        />
                        <FormControlLabel
                            value="Bookname"
                            control={<Checkbox size="small" />}
                            label="Book Name"
                            labelPlacement="right"
                        />
                        <FormControlLabel
                            value="Divistion"
                            control={<Checkbox size="small" />}
                            label="Divistion"
                            labelPlacement="right"
                        />
                        <FormControlLabel
                            size="small"
                            value="Hourroundedoff"
                            control={<Checkbox size="small" />}
                            label="Hour Roundedoff"
                            labelPlacement="right"

                        />
                    </div>
                    <div className='input-field'>
                        <div className="input">
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={Select.map((option) => option.optionvalue)}
                                options={Select.map((option) => option.Option)}
                                renderInput={(params) => <TextField {...params} label="Select" />}
                            />
                        </div>
                        <div className="input radio">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Incl. Addres?</FormLabel>
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
                        <div className="input radio">
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
                    </div>
                    <div className='input-field'>
                        <div className="input">
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={states.map((option) => option.statevalue)}
                                options={states.map((option) => option.state)}
                                renderInput={(params) => <TextField {...params} label="State" />}
                            />
                        </div>
                        <div className='input'>
                            <div className='icone'>
                                <StoreIcon color='action' />
                            </div>
                            <TextField
                                name="entity"
                                label="Entity"
                                id="standard-size-normal"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className="input radio">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Enable Driver App</FormLabel>
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
                        <div className="input">
                            <Autocomplete fullWidth
                                id="free-solo-demo"
                                freeSolo
                                value={BillingGroup.map((option) => option.optionvalue)}
                                options={BillingGroup.map((option) => option.option)}
                                renderInput={(params) => <TextField {...params} label="Billing Group" />}
                            />
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
                </form >
                <div className='textbox'>
                    <div className="textboxlist">
                        <p>
                            List...
                        </p>
                    </div>
                    <div className='textboxupdate'>
                        <p>
                            Update...
                        </p>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Customer