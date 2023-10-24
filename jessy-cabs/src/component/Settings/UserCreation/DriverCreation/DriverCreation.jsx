import React, { useState, useEffect, useCallback } from 'react';
import "./DriverCreation.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from "@mui/material/Autocomplete";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import { StationName, ViewFor } from "./DriverCreationData";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// FONTAWESOME
import { faFileInvoice, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";

// REACT ICONS
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

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
    { icon: <ChecklistIcon />, name: "List" },
    { icon: <CancelPresentationIcon />, name: "Cancel" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Edit" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
];

const DriverCreation = () => {
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    // TABLE START
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "username", headerName: "User_Name", width: 130 },
        { field: "userpassword", headerName: "Password", width: 130 },
        { field: "viewfor", headerName: "Access", width: 130 },
        { field: "designation", headerName: "Designation", width: 130 },
        { field: "stationname", headerName: "Station", width: 130 },
        { field: "licenseno", headerName: "License No", width: 130 },
        { field: "badgeno", headerName: "Badge No", width: 130 },
        { field: "aadharno", headerName: "Aadhar Card No", width: 130 },
        { field: "licenseexpdate", headerName: "License Exp Date", width: 130 },
        { field: "badgeexpdate", headerName: "Badge Exp Date", width: 130 },
        { field: "active", headerName: "Active", width: 160 },
    ];

    const [book, setBook] = useState({
        userid: '',
        username: '',
        stationname: '',
        licenseno: '',
        badgeno: '',
        aadharno: '',
        licenseexpdate: '',
        badgeexpdate: '',
        designation: '',
        userpassword: '',
        userconfirmpassword: '',
        active: '',
        viewfor: '',
        licensepath: '',
        aadharcardpath: '',
    });

    // TABLE END

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
            if (name === 'userpassword') {
                setPassword(value);
            } else if (name === 'userconfirmpassword') {
                setConfirmPassword(value);
            }
        }
    };

    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
    };
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            userid: '',
            username: '',
            stationname: '',
            licenseno: '',
            badgeno: '',
            aadharno: '',
            licenseexpdate: '',
            badgeexpdate: '',
            designation: '',
            userpassword: '',
            userconfirmpassword: '',
            active: '',
            viewfor: '',
            licensepath: '',
            aadharcardpath: '',
        }));
        setSelectedCustomerData({});
    };

    const handleAdd = async () => {
        const stationname = book.stationname;
        if (password === confirmPassword) {
            setPasswordsMatch(false);
            if (!stationname) {
                setErrorMessage("Check your Network Connection");
                return;
            }
            try {
                await axios.post('http://localhost:8081/drivercreation', book);
                console.log(book);
                handleCancel();
                validatePasswordMatch();
                setSuccessMessage("Successfully Added");
            } catch (error) {
                console.error('Error adding user:', error);
                setErrorMessage("Check your Network Connection");
            }
        } else {
            setPasswordsMatch(true);
        }
    };

    const handleClick = async (event, actionName, userid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                console.log('List button clicked');
                const response = await axios.get('http://localhost:8081/drivercreation');
                const data = response.data;
                setSuccessMessage("Successfully listed");
                setRows(data);
            } else if (actionName === 'Cancel') {
                console.log('Cancel button clicked');
                handleCancel();
            } else if (actionName === 'Delete') {
                console.log('Delete button clicked');
                await axios.delete(`http://localhost:8081/drivercreation/${userid}`);
                console.log('Customer deleted');
                setSelectedCustomerData(null);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
            } else if (actionName === 'Edit') {
                console.log('Edit button clicked');
                const selectedCustomer = rows.find((row) => row.userid === userid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://localhost:8081/drivercreation/${userid}`, updatedCustomer);
                console.log('Driver updated');
                setSuccessMessage("Successfully updated");
                handleCancel();
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch (err) {
            console.log(err);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
        setPasswordsMatch(false);
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
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [info]);
    useEffect(() => {
        if (passwordsMatch) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [passwordsMatch]);
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });
    const handleRowClick = useCallback((params) => {
        console.log(params.row);
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);

    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePasswordMatch = () => {
        const password = selectedCustomerData?.userpassword || book.userpassword;
        const confirmPassword = selectedCustomerData?.userconfirmpassword || book.userconfirmpassword;
        setPasswordsMatch(password !== confirmPassword);
    };
    return (
        <div className="DriverCreation-main">
            <div className="DriverCreation-form-container">
                <form onSubmit={handleClick}>
                    <div className="DriverCreation-header">
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="id"
                                    label="ID"
                                    name="userid"
                                    value={selectedCustomerData?.userid || book.userid}
                                    onChange={handleChange}
                                    variant="standard"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="user-name"
                                    label="User Mail-Id"
                                    name="username"
                                    value={selectedCustomerData?.username || book.username}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                                </div>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    id="free-solo-demo-stationname"
                                    freeSolo
                                    sx={{ width: "20ch" }}
                                    value={selectedCustomerData?.stationname || ''}
                                    onChange={(event, value) => handleAutocompleteChange(event, value, "stationname")}
                                    options={StationName.map((option) => ({
                                        label: option.Option,
                                    }))}
                                    getOptionLabel={(option) => option.label || ''}
                                    renderInput={(params) => {
                                        params.inputProps.value = selectedCustomerData?.stationname || ''
                                        return (
                                            <TextField {...params} label="Station Name" name="stationname" />
                                        )
                                    }
                                    }
                                />
                            </div>
                            <div className="input" style={{ width: "330px" }}>
                                <div className="icone">
                                    <ListAltIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="designation"
                                    value={selectedCustomerData?.designation || book.designation}
                                    onChange={handleChange}
                                    label="Designation"
                                    id="designation"
                                    sx={{ m: 1, width: "200ch" }}
                                // variant="standard"
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "240px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                                </div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        name="userpassword"
                                        value={selectedCustomerData?.userpassword || book.userpassword}
                                        onChange={handleChange}
                                        id="password"
                                        type={showPasswords ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswords}
                                                    onMouseDown={handleMouseDownPasswords}
                                                >
                                                    {showPasswords ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="input" style={{ width: "240px" }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faLock} size="lg" />
                                </div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                    <Input
                                        name="userconfirmpassword"
                                        value={selectedCustomerData?.userconfirmpassword || book.userconfirmpassword}
                                        onChange={handleChange}
                                        id="confirm-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="confirm-password"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </div>
                            <div className="input radio">
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Active
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="active"
                                        onChange={handleChange}
                                        value={selectedCustomerData?.active || book.active}
                                    >
                                        <FormControlLabel
                                            value="yes"
                                            control={<Radio />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <QuizOutlinedIcon color="action" />
                                </div>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    id="free-solo-demo-viewfor"
                                    freeSolo
                                    sx={{ width: "20ch" }}
                                    options={ViewFor.map((option) => ({
                                        label: option.Option,
                                    }))}
                                    getOptionLabel={(option) => option.label || ''}
                                    renderInput={(params) => {
                                        params.inputProps.value = selectedCustomerData?.viewfor || ''
                                        return (
                                            <TextField {...params} label="View For" name="viewfor" />
                                        )
                                    }
                                    }
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "400px" }}>
                                <div className="icone">
                                    <AddHomeWorkIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="address1"
                                    label="Address"
                                    id="address1"
                                    sx={{ m: 1, width: "200ch" }}
                                    variant="standard"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <AccountBalanceWalletIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="basicsalary"
                                    label="Basic Salary"
                                    name="basicsalary"
                                    autoFocus
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <TaxiAlertIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="licenseno"
                                    value={selectedCustomerData?.licenseno || book.licenseno}
                                    onChange={handleChange}
                                    label="License No"
                                    id="licenseno"
                                // variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "170px" }}>
                                <TextField
                                    size="small"
                                    name="licenseexpdate"
                                    value={selectedCustomerData?.licenseexpdate || book.licenseexpdate}
                                    onChange={handleChange}
                                    label="License Exp Date"
                                    id="licenseexpdate"
                                    sx={{ m: 1, width: "140ch" }}
                                // variant="standard"
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "400px" }}>
                                <div className="icone">
                                    <HomeTwoToneIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="streetno"
                                    id="streetno"
                                    sx={{ m: 1, width: "200ch" }}
                                    variant="standard"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <RateReviewIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="esino"
                                    label="ESI No"
                                    id="ESINo"
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <PostAddIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="badgeno"
                                    value={selectedCustomerData?.badgeno || book.badgeno}
                                    onChange={handleChange}
                                    label="Badge No"
                                    id="badgeno"
                                // variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "170px" }}>
                                <TextField
                                    size="small"
                                    name="badgeexpdate"
                                    value={selectedCustomerData?.badgeexpdate || book.badgeexpdate}
                                    onChange={handleChange}
                                    label="Badge Exp Date"
                                    id="badgeexpdate"
                                    sx={{ m: 1, width: "140ch" }}
                                // variant="standard"
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "400px" }}>
                                <div className="icone">
                                    <LocationCityIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="city"
                                    id="address3"
                                    sx={{ m: 1, width: "200ch" }}
                                    variant="standard"
                                />
                            </div>

                            <div className="input">
                                <div className="icone">
                                    <FontAwesomeIcon icon={faSheetPlastic} size="lg" />
                                </div>
                                <TextField
                                    size="small"
                                    name="pfno"
                                    label="PF No"
                                    id="PFNo"
                                />
                            </div>
                            <div className="input" style={{ width: "160px" }}>
                                <Button color="primary" variant="contained" component="label">
                                    License
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>
                            </div>
                            <div className="input" >
                                <div className="icone">
                                    <FontAwesomeIcon icon={faFileInvoice} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="durationofyears"
                                    label="Duration Of Years"
                                    value={selectedCustomerData?.durationofyears || book.durationofyears}
                                    onChange={handleChange}
                                    name="durationofyears"
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "260px" }}>
                                <div className="icone">
                                    <AssignmentIndIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    name="aadharno"
                                    value={selectedCustomerData?.aadharno || book.aadharno}
                                    onChange={handleChange}
                                    label="Aadhar-card No"
                                    id="aadharno"
                                    sx={{ m: 1, width: "230ch" }}
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "160px" }}>
                                <Button color="primary" variant="contained" component="label">
                                    aadhar card
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>
                            </div>
                            <div className="input" style={{ width: "160px" }}>
                                <Button variant="contained" onClick={handleAdd}>Add</Button>
                            </div>
                        </div>
                    </div>
                    {error &&
                        <div className='alert-popup Error' >
                            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{errorMessage}</p>
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
                    {info &&
                        <div className='alert-popup Info' >
                            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{infoMessage}</p>
                        </div>
                    }
                    {passwordsMatch &&
                        <div className='alert-popup Warning' >
                            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>Passwords do not match. Please try again.</p>
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
                    <div className="DriverCreation-table-container">
                        <div className="table-DriverCreations">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                onRowClick={handleRowClick}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DriverCreation