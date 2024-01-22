import React, { useState, useEffect } from 'react';
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
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";


// FONTAWESOME
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

const UserSetting = ({ userid }) => {
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    const storeUserId = localStorage.getItem('useridno');//for getting userid 
    // console.log('Stored UserId:', storeUserId);

    const [book, setBook] = useState({
        userid: '',
        username: '',
        ufirstname: '',
        ulastname: '',
        mobileno: '',
        email: '',
        designation: '',
        userpassword: '',
        userconfirmpassword: '',
    });

    const handleUpdate = async () => {
        try {
            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`http://localhost:8081/usercreation/${selectedCustomerData?.userid || book.userid}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            setEditMode((prevEditMode) => !prevEditMode);
        }
        catch {
            setError(true);
            setErrorMessage("Something went wrong");
        }
    };

    const handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        console.log('Name:', name);
        console.log('Value:', value);

        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));

        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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

    useEffect(() => {
        // Retrieve the stored image URL from localStorage on component mount
        const storedImage = localStorage.getItem('uploadedImage');
        if (storedImage) {
            setSelectedImage(storedImage);
        }
    }, []);

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };
    //file upload
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setSelectedImage(file);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('userid', selectedCustomerData[0]?.userid || book.userid || storeUserId);
        try {
            const response = await axios.post('http://localhost:8081/uploads', formDataUpload);
            console.log(response);
            const imageUrl = response.data.imageUrl;
            setSelectedImage(imageUrl);
            localStorage.setItem('uploadedImage', imageUrl);
        } catch {
        }
    };
    //end file upload  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userid = localStorage.getItem('useridno');
                // console.log('user company display', userid);

                if (!userid) {
                    return;
                }
                const response = await fetch(`http://localhost:8081/get-profileimage/${userid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const attachedImageUrls = data.imagePaths.map(path => `http://localhost:8081/images/${path}`);
                // console.log(attachedImageUrls);
                setSelectedImage(attachedImageUrls);
            } catch {
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const userid = localStorage.getItem('useridno');
            try {
                const response = await fetch(`http://localhost:8081/userdataforuserinfo/${userid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userDataArray = await response.json(); // Parse JSON data
                if (userDataArray.length > 0) {
                    setSelectedCustomerData(userDataArray[0]);
                } else {
                    // Handle the case when the array is empty
                    setErrorMessage('User data not found.');
                    setError(true);
                }
            } catch {
                setError(true);
                setErrorMessage('Error fetching tripsheet data.');
            }
        };

        fetchData();
    }, []);
    // const orucompany = selectedCustomerData[0]?.username;
    // // console.log('collected company datas display', orucompany);

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [info]);

    const toggleEditMode = () => {
        // console.log('Toggling edit mode...');
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
                                            src={selectedImage}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className='input'>
                                        {editMode ? (
                                            <div className='input'>
                                                <Button color="primary" size='small' variant="contained" component="label" disabled={!editMode}>
                                                    update
                                                    <ModeEditIcon />
                                                    <input
                                                        onChange={handleFileChange}
                                                        onClick={handleUpload}
                                                        // type="file"
                                                        style={{ display: "none" }}
                                                    />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="user-photo-edit">
                                                <IconButton color="primary" onClick={toggleEditMode} size='small' variant="outlined" component="label">
                                                </IconButton>
                                            </div>
                                        )}
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
                                            label="Employee Id"
                                            name="userid"
                                            value={selectedCustomerData?.userid || book.userid || ''}
                                            onChange={handleChange}
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
                                            id="UserName"
                                            label="UserName"
                                            name="username"  // Ensure the name attribute matches your state variable name
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.username || book.username}
                                            onChange={handleChange}  // Ensure the onChange prop is set to handleChange
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
                                                onClick={handleUpdate}
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
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default UserSetting;