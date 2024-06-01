import React, { useEffect, useContext } from 'react';
import dayjs from "dayjs";
import "./Ratevalidity.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import useRatevalidity from './useRatevalidity';
import { PermissionContext } from '../../../context/permissionContext';
import ChecklistIcon from "@mui/icons-material/Checklist";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

const Ratevalidity = () => {

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
        handleDateChange,
        columns,
        isEditMode,
        handleEdit,
    } = useRatevalidity();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    // Permission ------------
    const { permissions } = useContext(PermissionContext)
    const INFO_read = permissions[16]?.read;
    const INFO_new = permissions[16]?.new;
    const INFO_modify = permissions[16]?.modify;
    const INFO_delete = permissions[16]?.delete;

    return (
        <div className="RateValidity-form Scroll-Style-hide">
            <form action="">
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-RateValidity">
                            <div className="input-field RateValidity-input-feilds">
                                <div className="input RateValidity-input">
                                    <div className="icone">
                                        <BadgeIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="driverid"
                                        className='full-width'
                                        label="ID"
                                        name="driverid"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.driverid || book.driverid}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input RateValidity-input">
                                    <div className="icone">
                                        <RateReviewIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="ratename"
                                        className='full-width'
                                        label="Rate Name"
                                        name="ratename"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ratename || book.ratename}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input RateValidity-input">
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            id="fromdate"
                                            label="From Date"
                                            format="DD/MM/YYYY"
                                            value={selectedCustomerData.fromdate ? dayjs(selectedCustomerData.fromdate) : null}
                                            onChange={(date) => handleDateChange(date, 'fromdate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} name='fromdate' value={selectedCustomerData.fromdate} />
                                            )}
                                        </DatePicker>
                                    </LocalizationProvider>
                                </div>
                                <div className="input RateValidity-input">
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            id="todate"
                                            label="To Date"
                                            format="DD/MM/YYYY"
                                            value={selectedCustomerData.todate ? dayjs(selectedCustomerData.todate) : null}
                                            onChange={(date) => handleDateChange(date, 'todate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} name='todate' value={selectedCustomerData.todate} />
                                            )}
                                        </DatePicker>
                                    </LocalizationProvider>
                                </div>
                                <div className="input RateValidity-input">
                                    <div className="icone">
                                        <FactCheckIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="Remarks"
                                        className='full-width'
                                        label="ReMarks"
                                        name="Remarks"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.Remarks || book.Remarks}
                                        onChange={handleChange}
                                    />
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
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.active || book.active}
                                            onChange={handleChange}
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
                                <div className="input RateValidity-input">
                                    {isEditMode ? (
                                        <Button variant="contained" disabled={!INFO_modify} onClick={handleEdit}>Edit</Button>
                                    ) : (
                                        <Button variant="contained" disabled={!INFO_new} onClick={handleAdd} >Add</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='alert-popup-main'>
                    {error &&
                        <div className='alert-popup Error' >
                            <div className="popup-icon"> <ClearIcon /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{errorMessage}</p>
                        </div>
                    }
                    {warning &&
                        <div className='alert-popup Warning' >
                            <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{warningMessage}</p>
                        </div>
                    }
                    {success &&
                        <div className='alert-popup Success' >
                            <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{successMessage}</p>
                        </div>
                    }
                    {info &&
                        <div className='alert-popup Info' >
                            <div className="popup-icon"> <BsInfo /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                            <p>{infoMessage}</p>
                        </div>
                    }
                </div>
                <Box className="box-mui-icons" sx={{ position: "relative", mt: 3, height: 320 }}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<SpeedDialIcon />}
                        direction="left"
                    >
                     
                        {INFO_read === 1 && (
                            <SpeedDialAction
                                key="list"
                                icon={<ChecklistIcon />}
                                tooltipTitle="List"
                                onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                            />
                        )}
                        {INFO_modify === 1 && (
                            <SpeedDialAction
                                key="edit"
                                icon={<ModeEditIcon />}
                                tooltipTitle="Edit"
                                onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                            />
                        )}
                        {INFO_delete === 1 && (
                            <SpeedDialAction
                                key="delete"
                                icon={<DeleteIcon />}
                                tooltipTitle="Delete"
                                onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                            />
                        )}
                        {INFO_new === 1 && (
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
                <div className="table-bookingCopy-RateValidity">
                    <div className='rate-validity-table' style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={handleRowClick}
                            pageSize={5}
                        />
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Ratevalidity