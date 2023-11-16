import React, { useState, useEffect, useCallback } from 'react';
import "./Organization.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// REACT ICONS
import { BiBuildings } from "@react-icons/all-files/bi/BiBuildings";

const Organization = ({ defaultImage, userid }) => {
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
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
        <div className="organisation-form Scroll-Style-hide">
            <form>
                <div className="detail-container-main-organisation">
                    <div className="container-organisation">
                        <div className="container-organisation-main">
                            <div className='container-organisation-left'>
                                <div className="input-field">
                                    <div className="input">
                                        <Avatar
                                            sx={{ width: "12ch", height: "12ch" }}
                                            alt="userimage"
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : undefined}
                                        >
                                            {selectedImage ? null : (
                                                <div style={{ 'fontSize': "55px" }}>
                                                    <BiBuildings />
                                                </div>
                                            )}
                                        </Avatar>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className='input'>
                                        <Button color="primary" size='small' variant="contained" component="label">
                                            Logo
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
                            <div className='container-organisation-right'>
                                <div className="input-field">
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <BadgeIcon color="action" />
                                        </div>
                                        <TextField
                                            margin="normal"
                                            size="small"
                                            id="id"
                                            label="Organization Name"
                                            name=""
                                            sx={{ width: "280px" }}
                                            value={selectedCustomerData?.userid || book.userid}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <WorkspacePremiumIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="role"
                                            label="Organization Type"
                                            name="designation"
                                            sx={{ width: "280px" }}
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.designation || book.designation}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <SettingsPhoneIcon color="action" />
                                        </div>
                                        <TextField
                                            type='number'
                                            size="small"
                                            id="mobile"
                                            label="Mobile"
                                            name="mobileno"
                                            sx={{ width: "280px" }}
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.mobileno || book.mobileno}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" style={{ width: "310px" }}>
                                        <div className="icone">
                                            <AttachEmailIcon color="action" />
                                        </div>
                                        <TextField
                                            sx={{ width: "280ch" }}
                                            size="small"
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.email || book.email}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                        />
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
                <div className="organisation-details">
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Organization Name</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "250ch" }}
                                size="small"
                                id="organizationName"
                                name="organizationName"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "160px" }}>
                            <p className='input-title'>Type of Organization</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="organizationType"
                                name="organizationType"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Office Address</p>
                        </div>
                        <div className='address-block'>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="addressLine1"
                                    name="addressLine1"
                                    label="Address"
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="addressLine2"
                                    name="addressLine2"
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="city"
                                    name="city"
                                    variant="standard"
                                />
                            </div>
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Contact Information</p>
                        </div>
                        <div className='address-block'>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="contactPhoneNumber"
                                    name="contactPhoneNumber"
                                    // variant="standard"
                                    label="Phone Number"
                                />
                            </div>
                            <div className="input" style={{ width: "250px" }}>
                                <TextField
                                    sx={{ width: "230ch" }}
                                    size="small"
                                    id="contactEmail"
                                    name="contactEmail"
                                    // variant="standard"
                                    label="Email Address"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Location</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="location"
                                name="location"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Website</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="website"
                                name="website"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Ownership and Leadership</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="ownershipLeadership"
                                name="ownershipLeadership"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Products/Services</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="productsServices"
                                name="productsServices"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Market Presence</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="marketPresence"
                                name="marketPresence"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Employees</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="employees"
                                name="employees"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Legal Structure</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="legalStructure"
                                name="legalStructure"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Customer Base</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="customerBase"
                                name="customerBase"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Partnerships and Alliances</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="partnershipsAlliances"
                                name="partnershipsAlliances"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Recent News and Developments</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="recentNewsDevelopments"
                                name="recentNewsDevelopments"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    {/* <div className="input-field">
                        <div className="input">
                            <p className='input-title'>Financial Statements</p>
                        </div>
                        <div className="input" style={{ width: "310px" }}>
                            <TextField
                                sx={{ width: "280ch" }}
                                size="small"
                                id="financialStatements"
                                name="financialStatements"
                                variant="standard"
                            />
                        </div>
                    </div> */}
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Organization PAN Number</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="taxIDNumber"
                                name="taxIDNumber"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>GST Number</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="taxIDNumber"
                                name="taxIDNumber"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Social Media Presence</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="socialMediaPresence"
                                name="socialMediaPresence"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Sustainability and CSR</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="sustainabilityCSR"
                                name="sustainabilityCSR"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Customer Reviews and Feedback</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="customerReviewsFeedback"
                                name="customerReviewsFeedback"
                            // variant="standard"
                            />
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <p className='input-title'>Industry-Specific Details</p>
                        </div>
                        <div className="input" style={{ width: "250px" }}>
                            <TextField
                                sx={{ width: "230ch" }}
                                size="small"
                                id="industrySpecificDetails"
                                name="industrySpecificDetails"
                            // variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "150px" }}>
                            <Button variant="outlined" >
                                Cancel
                            </Button>
                        </div>
                        <div className="input" style={{ width: "150px" }}>
                            <Button variant="contained">
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Organization