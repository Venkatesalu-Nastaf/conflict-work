import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./UserInfo.css";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import { TextField, FormControl } from "@mui/material";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// REACT ICONS
// import { BsInfo } from "@react-icons/all-files/bs/BsInfo";


// FONTAWESOME
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
// import ImageDisplay from './ImageDisplay'; // Import your custom ImageDisplay component here

const UserSetting = ({ defaultImage, userid }) => {
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedCustomerId] = useState({});


    const [book, setBook] = useState({
        userid: '',
        ufirstname: '',
        ulastname: '',
        mobileno: '',
        email: '',
        designation: '',
        userpassword: '',
        userconfirmpassword: '',
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            userid: '',
            ufirstname: '',
            ulastname: '',
            mobileno: '',
            email: '',
            designation: '',
            userpassword: '',
            userconfirmpassword: '',
        }));
        setSelectedCustomerData({});
    };
    //password match
    useEffect(() => {
        if (error || !passwordsMatch) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds

            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [error, passwordsMatch]);

    const validatePasswordMatch = () => {
        const password = selectedCustomerData?.userpassword || book.userpassword;
        const confirmPassword = selectedCustomerData?.userconfirmpassword || book.userconfirmpassword;
        setPasswordsMatch(password === confirmPassword);
    };

    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const filterValue = event.target.value; // Get the input value
                const response = await axios.get(`http://localhost:8081/usercreation?filter=${filterValue}`);
                const bookingDetails = response.data;

                // Check if bookingDetails is an array and has at least one object
                if (Array.isArray(bookingDetails) && bookingDetails.length > 0) {
                    console.log('user details:', bookingDetails[0]); // Log the first object in the array

                    // Set the state variables with data from the first object in the array
                    setBook(bookingDetails[0]);
                    setSelectedCustomerData(bookingDetails[0]);
                } else {
                    console.log('No user details found.');
                }
            } catch (error) {
                console.error('Error retrieving user details:', error);
            }
        }
    }, []);


    const handleUpdate = async () => {
        if (password === confirmPassword) {
            setPasswordsMatch(true);
            validatePasswordMatch();
        }
        try {
            console.log('Edit button clicked');
            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`http://localhost:8081/usercreation/${book.userid}`, updatedCustomer);
            console.log('Customer updated');
            handleCancel();
            validatePasswordMatch();
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };


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

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFile(file);
        setSelectedImage(file);
    };

    const handleUpload = () => {
        if (!file) {
            setErrorMessage('Please select an image to upload.');
            setError(true);
            return;
        }
    };

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setErrorMessage('');
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer);
        }
    }, [success]);

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);
    };

    return (
        <div className="userinfo-form Scroll-Style-hide">
            <form>
                <div className="detail-container-main-userinfo">
                    <div className="container-userinfo">
                        <div className="container-userinfo-main">
                            <div className='container-userinfo-left'>
                                <div className="input-field">
                                    <div className="input">
                                        <Avatar sx={{ width: "12ch", height: "12ch" }}
                                            alt="userimage"
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImage}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className='input'>
                                        <Button color="primary" size='small' variant="contained" component="label">
                                            Upload
                                            <ModeEditIcon />
                                            <input
                                                onChange={handleFileChange}
                                                onClick={handleUpload}
                                                type="file"
                                                style={{ display: "none" }}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='container-userinfo-right'>
                                <div className="input-field">
                                    <div className="input" style={{ width: "300px" }}>
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
                                            onKeyDown={handleKeyDown}
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" style={{ width: "300px" }}>
                                        <div className="icone">
                                            <WorkspacePremiumIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="role"
                                            label="Role"
                                            name="designation"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.designation || book.designation}
                                            onChange={handleChange}
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input" >
                                        <div className="icone">
                                            <AccountCircleIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="role"
                                            label="UserName"
                                            name="designation"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.designation || book.designation}
                                            onChange={handleChange}
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" style={{ width: "200px" }}>
                                        <div className="icone">
                                            <BadgeIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="first-name"
                                            label="First Name"
                                            name="ufirstname"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.ufirstname || book.ufirstname}
                                            onChange={handleChange}
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" >
                                        <TextField
                                            size="small"
                                            id="last-name"
                                            label="Last Name"
                                            name="ulastname"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.ulastname || book.ulastname}
                                            onChange={handleChange}
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>

                                </div>
                                <div className="input-field">
                                    <div className="input" >
                                        <div className="icone">
                                            <SettingsPhoneIcon color="action" />
                                        </div>
                                        <TextField
                                            type='number'
                                            size="small"
                                            id="mobile"
                                            label="Mobile"
                                            name="mobileno"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.mobileno || book.mobileno}
                                            onChange={handleChange}
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" style={{ width: "415px" }}>
                                        <div className="icone">
                                            <AttachEmailIcon color="action" />
                                        </div>
                                        <TextField
                                            sx={{ width: "193ch" }}
                                            size="small"
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.email || book.email}
                                            onChange={handleChange}
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>

                                </div>
                                <div className="input-field">
                                    <div className="input" style={{ width: "309px" }}>
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
                                                disabled={!editMode}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPasswords}
                                                            onMouseDown={handleMouseDownPasswords}
                                                            disabled={!editMode}
                                                        >
                                                            {showPasswords ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="input" style={{ width: "309px" }}>
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
                                                disabled={!editMode}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="confirm-password"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            disabled={!editMode}
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                {editMode ? (
                                    <div className="input-field">
                                        <div className="input" style={{ width: "150px" }}>
                                            <Button variant="outlined" onClick={toggleEditMode}>
                                                Cancel
                                            </Button>
                                        </div>
                                        <div className="input" style={{ width: "150px" }}>
                                            <Button variant="contained"
                                                onClick={() => handleUpdate(selectedCustomerId)}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="user-photo-edit">
                                        <IconButton color="primary" onClick={toggleEditMode} size='small' variant="outlined" component="label">
                                            <ModeEditIcon />
                                        </IconButton>
                                    </div>
                                )}
                                {error &&
                                    <div className='alert-popup Error' >
                                        <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                        <p>{errorMessage}</p>
                                    </div>
                                }
                                {!passwordsMatch &&
                                    <div className='alert-popup Warning' >
                                        <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                        <p>Passwords do not match. Please try again.</p>
                                    </div>
                                }
                                {/* <div className='alert-popup Info' >
                                    <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                    <p>Info Messages !.</p>
                                </div> */}
                                {success &&
                                    <div className='alert-popup Success' >
                                        <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                                        <p>success fully submitted</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default UserSetting;