import React, { useState, useEffect } from 'react';
import "./UserInfo.css";
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import InputLabel from '@mui/material/InputLabel';
import { TextField, FormControl } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import InputAdornment from '@mui/material/InputAdornment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

// FONTAWESOME
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";


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
];
const UserSetting = ({ defaultImage, onUpdate }) => {
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
        onUpdate(file); // Call the provided onUpdate function
    };
    const [errorMessage] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

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


    return (
        <div className="userinfo-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-userinfo">
                        <div className="container-userinfo-main">
                            <div className='container-userinfo-left'>
                                <div className="input-field">
                                    <div className="input user-photo" style={{ width: "200px" }}>
                                        <Avatar sx={{ width: "8ch", height: "8ch" }}
                                            alt="userimage"
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImage}
                                        />
                                        <div className='user-photo-edit'>
                                            <IconButton color="primary" size='small' variant="outlined" component="label">
                                                <ModeEditIcon />
                                                <input
                                                    onChange={handleImageChange}
                                                    type="file"
                                                    style={{ display: "none" }}
                                                />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container-userinfo-right'>
                                <div className="input-field">
                                    <div className="input" style={{ width: "200px" }}>
                                        <div className="icone">
                                            <FactCheckIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="id"
                                            label="First Name"
                                            name="First Name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="input" >
                                        <TextField
                                            size="small"
                                            id="id"
                                            label="Last Name"
                                            name="LastName"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="input" >
                                        <div className="icone">
                                            <BadgeIcon color="action" />
                                        </div>
                                        <TextField
                                            type='number'
                                            size="small"
                                            id="id"
                                            label="Mobile"
                                            name="Role"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input" style={{ width: "415px" }}>
                                        <div className="icone">
                                            <FactCheckIcon color="action" />
                                        </div>
                                        <TextField
                                            sx={{ width: "193ch" }}
                                            size="small"
                                            id="id"
                                            label="Email"
                                            name="email"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="input" >
                                        <div className="icone">
                                            <BadgeIcon color="action" />
                                        </div>
                                        <TextField
                                            size="small"
                                            id="id"
                                            label="Role"
                                            name="Role"
                                            autoFocus
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
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input" style={{ width: "150px" }}>
                                        <Button variant="outlined" >Cancel</Button>
                                    </div>
                                    <div className="input" style={{ width: "150px" }}>
                                        <Button variant="contained" >Save</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            </form>
        </div>
    )
}

export default UserSetting