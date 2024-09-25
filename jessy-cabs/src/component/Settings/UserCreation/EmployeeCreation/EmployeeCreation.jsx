import React, { useEffect, useState, useContext,useMemo} from 'react';
import "./EmployeeCreation.css";
import Box from "@mui/material/Box";
import Input from '@mui/material/Input';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from "@mui/material/Autocomplete";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox,Switch } from "@mui/material";
// import Avatar from "../../../../assets/img/avatar.png"
import { UserPermission } from '../../../UserPermission/UserPermission'
import { PermissionContext } from '../../../context/permissionContext';

//material ui
import { AiOutlineSearch } from 'react-icons/ai';

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faUnlockKeyhole, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


// REACT ICONS
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";

// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import useEmplyeecreation from './useEmplyeecreation';
import Avatar from "@mui/material/Avatar";



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

const EmployeeCreation = ({ stationName }) => {
  // console.log("station", stationName)

  const {

    selectedCustomerId,
    rows,
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
    handleRowClickUser,
    handleAdd,
    hidePopup,
    // handleAutocompleteChange,
    showPasswords,
    handleClickShowPasswords,
    handleMouseDownPasswords, handleAutocompleteChangeStationName, handleChangeuniquecreation, cerendentialdata,
    isEditMode,
    handleEdit,showPermission, setShowPermission,handleCheckboxChangealldata,

    permissionsData, handleSwitchChange, handleCheckboxChange, setReadState, readState, newState, modifyState, deleteState,handleSwitchforthatrow,handleSwitchforallrows
  } = useEmplyeecreation();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  const [stationNameforUSer, setSationNameforUser] = useState([])
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {

    // console.log("stationName--", stationName)
    if (stationName?.length > 1) {
    //   // const data = stationName?.map(el => el.map(el => el.Stationname));
    //   const data = stationName?.map(el => el.Stationname);

    //   setSationNameforUser([...data, "ALL"]);
    // }
    //  else {
      const data = stationName.map(el => el.Stationname)
      setSationNameforUser(data); // Set the original array when length is not greater than 1
    }
  }, [stationName]);
 


  //  for showing table
  // const [showPermission, setShowPermission] = useState(false);
  // const [showPermission, setShowPermission] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState('');

  const togglePermission = (row) => {
    setShowPermission(true);
    setSelectedUserId(row.userid)
  };


  // Permission ------------
  const { permissions } = useContext(PermissionContext)

  const UserCreation_read = permissions[15]?.read;
  const UserCreation_new = permissions[15]?.new;
  const UserCreation_modify = permissions[15]?.modify;
  const UserCreation_delete = permissions[15]?.delete;

  // search operation ----------------
  const [searchUser, setSearchUser] = useState("")

  const handleSearchUser = (e) => {
    setSearchUser(e.target.value);
  }
  
  // console.log(rows, "filter")
 
  // const filteruser = rows.filter(user => user.username.toLowerCase().includes(searchUser.toLowerCase()))
  const filteruser = useMemo(() => {
    return rows.filter(user => 
      user.username.toLowerCase().includes(searchUser.toLowerCase())
    );
  }, [rows, searchUser]);

  return (
    <div className="EmployeeCreation-main">
      <div className='main-content-form'>
        <div className="EmployeeCreation-form-container">
          <form onSubmit={handleClick}>
            <div className="EmployeeCreation-header">
              <div className="input-field employee-creation-inputfeilds" style={{ padding: '10px' }}>
                <div className="input" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="userid"
                    label="ID"
                    name="userid"
                    value={book.userid || ''}
                    // onChange={handleChange}
                    // variant="standard"
                    style={{ width: '100%' }}
                  />
                </div>
               


                <div className="input">
                  <div className='full-width' style={{ display: 'grid' }}>
                    <span className='full-width' style={{ display: 'flex' }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                      </div>
                      <TextField
                        margin="normal"
                        size="small"
                        id="user-name"
                        label="User Name"
                        name="username"
                        className='full-width'
                        value={book.username || ''}
                        // onChange={handleChange}
                        onChange={handleChangeuniquecreation}
                      />
                    </span>
                    <span style={{ textAlign: 'center' }}>
                      <span style={{ color: "red" }}>{cerendentialdata ? `UserName Already Exist` : ""}</span>
                    </span>
                  </div>
                </div>


                <div className="input" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faMailBulk} size="lg" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="user-mail"
                    label="User Mail"
                    name="email"
                    value={book.email || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faPhone} size="lg" />
                  </div>
                  <TextField
                    type="number"
                    size="small"
                    id="mobile"
                    label="Mobile"
                    name="mobileno"
                    value={book.mobileno || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="designation"
                    value={book.designation || ''}
                    onChange={handleChange}
                    label="Designation"
                    id="designation"
                  />
                </div>
              
                <div className="input" style={{ paddingRight: '15px' }}>
                <FormLabel htmlFor='SuperAdmin'>SuperAdmin</FormLabel>
                <Switch
                    label='label'
                    id="superAdmin"
                    name="superAdmin"
                    onChange={handleChange}
                  

                    checked={book.superAdmin}
                  />
                </div>
                <div className="input user-creation-station-select-main">
                  <div className="icone">
                    <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                  </div>

                  <Autocomplete
                    size='small'
                    multiple
                    id="stationname-tags-demo"
                    options={stationNameforUSer}
                    onChange={(event, value) => handleAutocompleteChangeStationName(event, value, "stationname")}
                    value={book?.stationname
                      ? (typeof book.stationname === 'string'
                        ? book.stationname.split(',').map(item => item.trim()) // Trim extra spaces
                        : book.stationname)
                      : []
                    }
                    isOptionEqualToValue={(option, value) => option === value}

                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    // style={{ width: 170 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Station Name" placeholder="Organization" style={{ width: '330px' }} />
                    )}

                  />
                </div>

                <div className="input" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="organizationname"
                    value={book.organizationname || ''}
                    onChange={handleChange}
                    label="Organization"
                    id="organizationname"
                    // variant="standard"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="input" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                  </div>
                  <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="userpassword"
                      value={book.userpassword || ''}
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
                      value={book.active}
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
                <div className="input" style={{ width: "160px" }}>
                  {isEditMode ? (
                    <Button variant="contained" disabled={!UserCreation_modify} onClick={handleEdit}>Edit</Button>
                  ) : (
                    <div className='add-permission'>
                      <Button variant="contained" disabled={!UserCreation_new} onClick={togglePermission} className='user-permission-button' >Give Permission</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='alert-popup-main'>
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
            <Box className='common-speed-dail'>
              <StyledSpeedDial
                ariaLabel="SpeedDial playground example"
                icon={<SpeedDialIcon />}
                direction="left"
              >
                {UserCreation_read === 1 && (
                  <SpeedDialAction
                    key="list"
                    icon={<ChecklistIcon />}
                    tooltipTitle="List"
                    onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                  />
                )}
                {UserCreation_modify === 1 && isEditMode &&(
                  <SpeedDialAction
                    key="edit"
                    icon={<ModeEditIcon />}
                    tooltipTitle="Edit"
                    onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                  />
                )}
                {UserCreation_delete === 1 && isEditMode &&(
                  <SpeedDialAction
                    key="delete"
                    icon={<DeleteIcon />}
                    tooltipTitle="Delete"
                    onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                  />
                )}
                {UserCreation_new === 1 && !isEditMode && (
                  <SpeedDialAction
                    key="Add"
                    icon={<BookmarkAddedIcon />}
                    tooltipTitle="Add"
                    onClick={(event) => handleClick(event, "Add", selectedCustomerId)}
                  />
                )}
                <SpeedDialAction
                  key="Cancel"
                  icon={<CancelPresentationIcon />}
                  tooltipTitle="Cancel"
                  onClick={(event) => handleClick(event, "Cancel", selectedCustomerId)}
                />
              </StyledSpeedDial>
            </Box>
            <div className="EmployeeCreation-table-container">
              <div className='search-profile'>
                <div className="search-input-container">
                  <TextField
                    id="search-input"
                    label="Search"
                    variant="outlined"
                    value={searchUser}
                    onChange={handleSearchUser}
                    InputProps={{
                      endAdornment: <AiOutlineSearch />,
                    }}
                    style={{ marginLeft: '15px' }}
                  />
                  <div className='Scroll-Style-hide user-table-permission-main-div'>
                    {filteruser.map((row, index) => (
                      <div className='user-table-permission' style={{ cursor: "pointer" }} onClick={() => {
                        togglePermission(row);
                        handleRowClickUser(row)
                      }}
                        key={index}>
                        {/* <img src={row.profile_image} alt="profile" width="50" /> */}
                        <Avatar
                          alt="userimage"
                          src={row.profile_image} />
                        <div>
                          <h3 className="user-name-text">{row.username}</h3>
                          <p className="user-details-text">{row.designation}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                {showPermission && <UserPermission
                  userid={selectedUserId}
                  permissionsData={permissionsData}
                  handleSwitchChange={handleSwitchChange}
                  handleCheckboxChange={handleCheckboxChange}
                  setReadState={setReadState}
                  readState={readState}
                  newState={newState}
                  modifyState={modifyState}
                  deleteState={deleteState}
                  handleSwitchforthatrow={handleSwitchforthatrow}
                  handleSwitchforallrows={handleSwitchforallrows}
                  handleCheckboxChangealldata={handleCheckboxChangealldata}
                />}
              </div>
              {!isEditMode &&
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="contained" disabled={!UserCreation_new} onClick={handleAdd} className='add-user-button'>Done</Button>
                </div>
              }
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default EmployeeCreation;
