import React, { useEffect, useContext } from 'react';
import "./DriverCreation.css";
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
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { AiOutlineFileSearch } from "react-icons/ai";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Checkbox from '@mui/material/Checkbox';
import AddIcCallTwoToneIcon from "@mui/icons-material/AddIcCallTwoTone";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { PermissionContext } from '../../../context/permissionContext';
import ChecklistIcon from "@mui/icons-material/Checklist";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// FONTAWESOME
// import { faFileInvoice, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";
// REACT ICONS
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
// import ListAltIcon from "@mui/icons-material/ListAlt";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TaxiAlertIcon from '@mui/icons-material/TaxiAlert';
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import RateReviewIcon from "@mui/icons-material/RateReview";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
// import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import useDrivercreation from './useDrivercreation';
import { APIURL } from "../../../url";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
const DriverCreation = ({ stationName }) => {
    const apiUrl = APIURL;
    const {
        selectedCustomerData,
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
        handleRowClick,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        handleDateChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        columns,
        handleCloseDialog,
        dialogOpen,
        allFile,
        setFile,
        setLicencepdf,
        isEditMode,
        handleEdit,
        handleContextMenu,
        handleimagedelete,
        handleClosedeleteDialog,
        dialogdeleteOpen,
        handleExcelDownload,
        handlePdfDownload,
        handlecheckbox,
        deletefile,
        Deleted,
        selectAll,
        handleSelectAll,
        handleDocumentDownload,
        searchText, setSearchText, fromDate, setFromDate, toDate, setToDate, handleenterSearch, handleShowAll,
        handleFileChange

    } = useDrivercreation();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    // Permission ------------
    const { permissions } = useContext(PermissionContext)
    const Supllier_read = permissions[10]?.read;
    const Supllier_new = permissions[10]?.new;
    const Supllier_modify = permissions[10]?.modify;
    const Supllier_delete = permissions[10]?.delete;

    return (
        <div className="DriverCreation-main">
            <div className="DriverCreation-form-container">
                <form onSubmit={handleClick}>
                    <div className="DriverCreation-header">
                        <div className="input-field driver-info-inputs">
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="id"
                                    label="Driver ID"
                                    name="driverid"
                                    value={selectedCustomerData.driverid || book.driverid || ''}
                                    onChange={handleChange}
                                    variant="standard"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="drivername"
                                    label="Driver Name"
                                    name="drivername"
                                    value={selectedCustomerData?.drivername || book.drivername}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    value={selectedCustomerData?.username || book.username}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faImagePortrait} size="lg" />
                                </div>
                                <TextField
                                    margin="normal"
                                    size="small"
                                    id="Email"
                                    label="Email Id"
                                    name="Email"
                                    value={selectedCustomerData?.Email || book.Email}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                                </div>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    id="free-solo-demo-stationname"
                                    freeSolo
                                    sx={{ width: "100%" }}
                                    value={stationName.find((option) => option.Option)?.label || selectedCustomerData?.stations || ''}
                                    onChange={(event, value) => handleAutocompleteChange(event, value, "stations")}
                                    options={stationName.map((option) => ({
                                        label: option.Stationname,
                                    }))}
                                    getOptionLabel={(option) => option.label || selectedCustomerData?.stations || ''}
                                    renderInput={(params) => {
                                        return (
                                            <TextField {...params} label="Station Name" name="stations" />
                                        )
                                    }
                                    }
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <FontAwesomeIcon icon={faUnlockKeyhole} size="lg" />
                                </div>
                                <FormControl sx={{ m: 1, width: '100%' }}     >
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
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <AddHomeWorkIcon color="action" />
                                </div>
                                <TextField
                                    margin="normal"
                                    name="address1"
                                    multiline
                                    rows={2}
                                    sx={{ width: "100%" }}
                                    value={selectedCustomerData?.address1 || book.address1}
                                    onChange={handleChange}
                                    label="Address"
                                    id="address1"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
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
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className='icone'>
                                    <CalendarMonthIcon />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Badge Exp date "
                                        value={
                                            selectedCustomerData.badgeexpdate
                                                ? dayjs(selectedCustomerData.badgeexpdate)
                                                : null || book.badgeexpdate
                                                    ? dayjs(book.badgeexpdate)
                                                    : null
                                        }
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, "badgeexpdate")}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField
                                                {...inputProps}
                                                inputRef={inputRef}
                                                value={selectedCustomerData?.badgeexpdate}
                                            />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className="icone">
                                    <AddIcCallTwoToneIcon color="action" />
                                </div>
                                <TextField
                                    name="Mobileno"
                                    autoComplete="new-password"
                                    value={
                                        selectedCustomerData.Mobileno ||
                                        book.Mobileno ||
                                        ""
                                    }
                                    onChange={handleChange}
                                    label="Mobile No"
                                    id="mobile"
                                    variant="standard"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
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
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <Button color="primary" variant="contained" component="label">
                                    aadhar card
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Button>
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <Button color="primary" variant="contained" component="label">
                                    PROFILE IMAGE
                                    <input
                                        type="file"
                                        name="Profile_image"
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className='icone'>
                                    <CalendarMonthIcon />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="joining Date"
                                        value={
                                            selectedCustomerData.joiningdate
                                                ? dayjs(selectedCustomerData.joiningdate)
                                                : dayjs() || book.joiningdate
                                                    ? dayjs(book.joiningdate)
                                                    : dayjs()
                                        }
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, "joiningdate")}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField
                                                {...inputProps}
                                                inputRef={inputRef}
                                                value={selectedCustomerData?.joiningdate}
                                            />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
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
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <div className='icone'>
                                    <CalendarMonthIcon />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="License Exp Date "
                                        value={
                                            selectedCustomerData.licenseexpdate
                                                ? dayjs(selectedCustomerData.licenseexpdate)
                                                : null || book.licenseexpdate
                                                    ? dayjs(book.licenseexpdate)
                                                    : null
                                        }
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, "licenseexpdate")}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField
                                                {...inputProps}
                                                inputRef={inputRef}
                                                value={selectedCustomerData?.licenseexpdate}
                                            />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div>
                            <div className="input driver-input" style={{ paddingRight: '15px' }}>
                                <Button color="primary" variant="contained" component="label">
                                    License
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(e) => setLicencepdf(e.target.files[0])}
                                    />
                                </Button>
                            </div>
                            <div className="input radio driver-input">
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
                            <div className="input" style={{ width: "160px" }}>
                                {isEditMode ? (
                                    <Button variant="contained" disabled={!Supllier_modify} onClick={handleEdit}>Edit</Button>
                                ) : (
                                    <Button variant="contained" disabled={!Supllier_new} onClick={handleAdd}>Add</Button>
                                )}
                            </div>
                        </div>
                        <div className="detail-container-main detail-container-main-crivercreation">
                            <div className="container-left">
                                <div className="copy-title-btn-Booking">
                                    <div className="input-field" style={{ justifyContent: "center", flexWrap: 'wrap' }}>
                                        <div className="input" style={{ paddingRight: '15px' }}>
                                            <div className="icone">
                                                <AiOutlineFileSearch
                                                    color="action"
                                                    style={{ fontSize: "27px" }}
                                                />
                                            </div>
                                            <TextField
                                                size="small"
                                                id="search"
                                                label="Search"
                                                name="searchText"
                                                value={searchText || ""}
                                                onKeyDown={handleenterSearch}
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                        </div>
                                        <div className="input" style={{ paddingRight: '15px' }}>
                                            <div className='icone'>
                                                <CalendarMonthIcon />
                                            </div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="From Date"
                                                    name="fromDate"
                                                    format="DD/MM/YYYY"
                                                    value={fromDate}
                                                    onChange={(date) => setFromDate(date)}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="input" style={{ paddingRight: '15px' }}>
                                            <div className='icone'>
                                                <CalendarMonthIcon />
                                            </div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="To Date"
                                                    name="toDate"
                                                    format="DD/MM/YYYY"
                                                    value={toDate}
                                                    onChange={(date) => setToDate(date)}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="input" style={{ width: "140px" }}>
                                            <Button variant="contained"
                                                onClick={handleShowAll}
                                            >
                                                Search
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Download-btn">
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                                            Download
                                        </Button>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                                            <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
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
                    <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                        <StyledSpeedDial
                            ariaLabel="SpeedDial playground example"
                            icon={<SpeedDialIcon />}
                            direction="left"
                        >
                            {Supllier_read === 1 && (
                                <SpeedDialAction
                                    key="list"
                                    icon={<ChecklistIcon />}
                                    tooltipTitle="List"
                                    onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                                />
                            )}

                            {Supllier_modify === 1 && (
                                <SpeedDialAction
                                    key="edit"
                                    icon={<ModeEditIcon />}
                                    tooltipTitle="Edit"
                                    onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                                />
                            )}
                            {Supllier_delete === 1 && (
                                <SpeedDialAction
                                    key="delete"
                                    icon={<DeleteIcon />}
                                    tooltipTitle="Delete"
                                    onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                                />
                            )}

                            {Supllier_new === 1 && (
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
                        <Dialog open={dialogOpen} onClose={handleCloseDialog} >
                            <DialogContent>
                                <div style={{ position: 'relative' }}>
                                    <Button variant='contained' style={{ marginBottom: 10 }} onClick={handleSelectAll}>
                                        {selectAll ? 'Deselect All' : 'Select All'}
                                    </Button>                                    {Array.isArray(allFile) && allFile.map((img, index) => (
                                        <div key={index} style={{ borderBottom: '1px solid black' }} >
                                            {img.file_type === "image/jpg" || img.file_type === "image/jpeg" || img.file_type === "image/png" || img.file_type === "image/gif" || img.file_type === "image/svg"
                                                ? <img src={`${apiUrl}/public/driver_doc/` + img.fileName} alt="driverimage" type="application/pdf" width="100%" height="400px" /> :
                                                <embed src={`${apiUrl}/public/driver_doc/` + img.fileName} type="application/pdf" width="100%" height="400px" />}
                                            <Checkbox typeof='checked'
                                                checked={deletefile.includes(img.fileName)}
                                                onClick={(event) => {

                                                    handlecheckbox(img.fileName)

                                                }} />
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', padding: 10, gap: 15 }}>
                                    <Button variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
                                    <Button variant='contained' onClick={() => handleDocumentDownload()}>Print</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Dialog open={dialogdeleteOpen} onClose={handleClosedeleteDialog}>
                            <DialogContent>
                                <div>
                                    <h3>Are you sure you want to delete?</h3>
                                    <div>
                                        <Button onClick={handleContextMenu}>yes</Button>
                                        <Button onClick={handleClosedeleteDialog}>No</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Dialog open={Deleted}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: 25, paddingLeft: 10 }} />
                                <p style={{ fontSize: 15, color: 'green', fontWeight: 500, padding: 10 }}>Deleted Successfully...</p>
                            </div>
                        </Dialog>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DriverCreation