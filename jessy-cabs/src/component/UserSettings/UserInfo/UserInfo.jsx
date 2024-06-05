import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import { TextField, FormControl } from "@mui/material";

// ICONS
import ClearIcon from "@mui/icons-material/Clear";
import BadgeIcon from "@mui/icons-material/Badge";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsPhoneIcon from "@mui/icons-material/SettingsPhone";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import useUserinfo from "./useUserinfo";


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
// REACT ICONS
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

// FONTAWESOME

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { APIURL } from "../../url";

import avatar1 from "../../../assets/img/avatar1.jpg";
import avatar2 from "../../../assets/img/avatar2.jpg";
import avatar3 from "../../../assets/img/avatar3.jpg";
import avatar4 from "../../../assets/img/avatar4.jpg";
import avatar5 from "../../../assets/img/avatar5.jpg";
import avatar6 from "../../../assets/img/avatar6.jpg";



const UserSetting = () => {
  const apiUrl = APIURL;

  const {
    selectedCustomerData,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    hidePopup,
    selectedImage,
    editMode,
    toggleEditMode,
    showPasswords,
    handleClickShowPasswords,
    // handleClickShowPassword,
    // handleMouseDownPassword,
    handleUpload,
    handleMouseDownPasswords,
    // showPassword,
    handleUpdate,
  } = useUserinfo();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  };

  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userAvatarValue, setUserAvatarValue] = useState('');

  const avatarChangeValue = (value, avatarNumber) => {
    // const avatarElement = document.getElementById(`avatar-image-${avatarNumber}`);
    // if (avatarElement) {
    //   avatarElement.classList.add('selected-avatar');
    // }
    setUserAvatarValue(value);
  }

  const [userAvatar, setUserAvatar] = useState('');

  const avatarChange = (avatarValue) => {
    setUserAvatar(avatarValue);
    handleClose();
  }

  return (
    <div className="userinfo-form Scroll-Style-hide">
      <form>
        <div className="detail-container-main-userinfo">
          <div className="container-userinfo">
            <div className="container-userinfo-main">
              <div className="container-userinfo-left">
                <div className="input-field" onClick={handleOpen}>
                  <div className="input">
                    {(userAvatar == '') ? (
                      <Avatar
                        sx={{ width: "12ch", height: "12ch" }}
                        alt="userimage"
                        src={`${apiUrl}/public/user_profile/${selectedImage}`}
                      />
                    ) : (
                      <div>
                        <img src={userAvatar} alt="" className="user-selected-avatar" />
                      </div>
                    )}

                  </div>
                </div>
                <div className="input-field">
                  <div className="input">
                    <div className="input-field">
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={handleUpload}
                        component="label"
                      >
                        {" "}
                        update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-userinfo-right">
                <div className=" userInfo-inputs-feilds input-field">
                  <div className="input">
                    <div className="icone">
                      <BadgeIcon color="action" />
                    </div>
                    <TextField
                      margin="normal"
                      size="small"
                      id="id"
                      label="Employee Id"
                      name="userid"
                      value={selectedCustomerData?.userid || book.userid || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="input">
                    <div className="icone">
                      <WorkspacePremiumIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="role"
                      label="Role"
                      name="designation"
                      autoComplete="new-password"
                      value={
                        selectedCustomerData?.designation || book.designation
                      }
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="input">
                    <div className="icone">
                      <AccountCircleIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="UserName"
                      label="UserName"
                      name="username"
                      autoComplete="new-password"
                      value={selectedCustomerData?.username || book.username}
                      onChange={handleChange}
                      autoFocus
                      disabled={!editMode}
                    />
                  </div>
                  {/* <div className="input">
                    <div className="icone">
                      <BadgeIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="first-name"
                      label="First Name"
                      name="ufirstname"
                      autoComplete="new-password"
                      value={
                        selectedCustomerData?.ufirstname || book.ufirstname
                      }
                      onChange={handleChange}
                      autoFocus
                      disabled={!editMode}
                    />
                  </div>
                  <div className="input">
                    <div className="icone">
                      <BadgeIcon color="action" />
                    </div>
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
                  </div> */}
                  <div className="input">
                    <div className="icone">
                      <SettingsPhoneIcon color="action" />
                    </div>
                    <TextField
                      type="number"
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
                  <div className="input">
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
                  <div className="input">
                    <div className="icone">
                      <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                    </div>
                    <FormControl
                      sx={{ m: 1, width: "35ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        name="userpassword"
                        value={
                          selectedCustomerData?.userpassword ||
                          book.userpassword
                        }
                        onChange={handleChange}
                        id="password"
                        type={showPasswords ? "text" : "password"}
                        disabled={!editMode}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswords}
                              onMouseDown={handleMouseDownPasswords}
                              disabled={!editMode}
                            >
                              {showPasswords ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  {/* <div className="input">
                    <div className="icone">
                      <FontAwesomeIcon icon={faLock} size="lg" />
                    </div>
                    <FormControl
                      sx={{ m: 1, width: "35ch" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="confirm-password">
                        Confirm Password
                      </InputLabel>
                      <Input
                        name="userconfirmpassword"
                        value={
                          selectedCustomerData?.userconfirmpassword ||
                          book.userconfirmpassword
                        }
                        onChange={handleChange}
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        disabled={!editMode}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="confirm-password"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              disabled={!editMode}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div> */}
                </div>
                {editMode ? (
                  <div className="input-field">
                    <div className="input">
                      <Button variant="outlined" onClick={toggleEditMode}>
                        Cancel
                      </Button>
                    </div>
                    <div className="input">
                      <Button variant="contained" onClick={handleUpdate}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="user-photo-edit">
                    <IconButton
                      color="primary"
                      onClick={toggleEditMode}
                      size="small"
                      variant="outlined"
                      component="label"
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </div>
                )}
                <div className="alert-popup-main">
                  {error && (
                    <div className="alert-popup Error">
                      <div className="popup-icon">
                        {" "}
                        <ClearIcon />{" "}
                      </div>
                      <span className="cancel-btn" onClick={hidePopup}>
                        <ClearIcon color="action" />{" "}
                      </span>
                      <p>{errorMessage}</p>
                    </div>
                  )}
                  {warning && (
                    <div className="alert-popup Warning">
                      <div className="popup-icon">
                        {" "}
                        <ErrorOutlineIcon />{" "}
                      </div>
                      <span className="cancel-btn" onClick={hidePopup}>
                        <ClearIcon color="action" />{" "}
                      </span>
                      <p>{warningMessage}</p>
                    </div>
                  )}
                  {success && (
                    <div className="alert-popup Success">
                      <div className="popup-icon">
                        {" "}
                        <FileDownloadDoneIcon />{" "}
                      </div>
                      <span className="cancel-btn" onClick={hidePopup}>
                        <ClearIcon color="action" />{" "}
                      </span>
                      <p>{successMessage}</p>
                    </div>
                  )}
                  {info && (
                    <div className="alert-popup Info">
                      <div className="popup-icon">
                        {" "}
                        <BsInfo />{" "}
                      </div>
                      <span className="cancel-btn" onClick={hidePopup}>
                        <ClearIcon color="action" />{" "}
                      </span>
                      <p>{infoMessage}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Select the Avatar
              </Typography>
              <div className="avatar-list">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`avatar-${index + 1}`}
                    onClick={() => avatarChangeValue(avatar)}
                    className={`avatar ${userAvatarValue === avatar ? 'selected-avatar' : ''}`}
                    tabIndex="0" // Make the image focusable
                  />
                ))}
              </div>
              <div className="select-avatar-btn-division">
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={handleClose}
                  component="label"
                >
                  {" "}
                  Close
                </Button>

                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={() => avatarChange(userAvatarValue)}
                  component="label"
                >
                  {" "}
                  Done
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>


  );
};

export default UserSetting;
