import React, { useState, useEffect } from 'react';
import "./UserInfo.css";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import { TextField, FormControl } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import InputAdornment from '@mui/material/InputAdornment';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// FONTAWESOME
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

const UserSetting = ({ defaultImage, onUpdate }) => {
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        onUpdate(file);
    };

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
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
                                                onChange={handleImageChange}
                                                type="file"
                                                style={{ display: "none" }}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='container-userinfo-right'>
                                <div className="input-field">
                                    <div className="input" style={{ width: "200px" }}>
                                        <div className="icone">
                                            <BadgeIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="first-name"
                                            label="First Name"
                                            name="first-name"
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" >
                                        <TextField
                                            size="small"
                                            id="last-name"
                                            label="Last Name"
                                            name="last-name"
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" >
                                        <div className="icone">
                                            <SettingsPhoneIcon color="action" />
                                        </div>
                                        <TextField
                                            type='number'
                                            size="small"
                                            id="mobile"
                                            label="Mobile"
                                            name="mobile"
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
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
                                            autoFocus
                                            disabled={!editMode}
                                        />
                                    </div>
                                    <div className="input" >
                                        <div className="icone">
                                            <WorkspacePremiumIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="role"
                                            label="Role"
                                            name="role"
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
                                                disabled={!editMode}
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
                                                disabled={!editMode}
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
                                            <Button variant="contained" onClick={() => {
                                                setSuccess(true);
                                                toggleEditMode();
                                            }}>
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
                                        <span className='cancel-btn' onClick={hidePopup}>x</span>
                                        <p>{errorMessage}</p>
                                    </div>
                                }
                                {success &&
                                    <div className='alert-popup Success' >
                                        <span className='cancel-btn' onClick={hidePopup}>x</span>
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