import React, { useEffect, useContext } from 'react';
import "./RateType.css";
import "jspdf-autotable";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, } from "@mui/material";
import useRatype from './useRatype.js';
import ChecklistIcon from "@mui/icons-material/Checklist";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { PermissionContext } from '../../../context/permissionContext.js';
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

const RateType = ({ stationName, organizationNames }) => {

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
        handleExcelDownload,
        handlePdfDownload,
        columns,
        isEditMode,
        handleEdit,
        handleDateChange,
    } = useRatype();

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
        <div className="ratetype-form Scroll-Style-hide">
            <form onSubmit={handleClick}>
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-RateType">
                            <div className="input-field rate-type-inputs">
                                <div className="input">
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
                                <div className="input">
                                    <div className="icone">
                                        <WarehouseIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        id="stations"
                                        freeSolo
                                        onChange={(event, value) => handleAutocompleteChange(event, value, "stations")}
                                        value={stationName.find((option) => option.Option)?.label || selectedCustomerData?.stations || ''}
                                        options={stationName.map((option) => ({
                                            label: option.Stationname,
                                        }))}
                                        getOptionLabel={(option) => option.label || selectedCustomerData?.stations || ''}
                                        renderInput={(params) => {
                                            return (
                                                <TextField   {...params} label="Stations" name="stations" inputRef={params.inputRef} />
                                            )
                                        }
                                        }
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <RateReviewIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        id="ratename"
                                        freeSolo
                                        sx={{ width: "100%" }}
                                        onChange={(event, value) => handleAutocompleteChange(event, value, "ratename")}
                                        value={selectedCustomerData?.ratename || book.selectedCustomerData || ""}
                                        options={organizationNames?.map((option) => ({ label: option }))} // Use organizationName here
                                        getOptionLabel={(option) => option.label || selectedCustomerData?.ratename || ''}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization Name" name="ratename" inputRef={params.inputRef} />
                                            )
                                        }
                                        }
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <FactCheckIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="validity"
                                        className='full-width'
                                        label="Validity"
                                        name="validity"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.validity || book.validity}
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
                                <div className="input">
                                    <div className='icone'>
                                        <CalendarMonthIcon className='ratetype-startdate-icon' />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoItem label="startDate">
                                            <DatePicker
                                                id="startDate"
                                                value={
                                                    selectedCustomerData.starttime
                                                        ? dayjs(selectedCustomerData.starttime)
                                                        : null || book.starttime
                                                            ? dayjs(book.starttime)
                                                            : dayjs()
                                                }
                                                format="DD/MM/YYYY"
                                                onChange={(date) => handleDateChange(date, "starttime")}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField
                                                        {...inputProps}
                                                        inputRef={inputRef}
                                                        value={selectedCustomerData?.starttime}
                                                    />
                                                )}
                                            </DatePicker>
                                        </DemoItem>
                                    </LocalizationProvider>
                                </div>
                                <div className="input">
                                    <div className='icone'>
                                        <CalendarMonthIcon className='ratetype-startdate-icon' />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoItem label="startDate">
                                            <DatePicker
                                                id="startDate2"
                                                value={
                                                    selectedCustomerData.closetime
                                                        ? dayjs(selectedCustomerData.closetime)
                                                        : null || book.closetime
                                                            ? dayjs(book.closetime)
                                                            : dayjs()
                                                }
                                                format="DD/MM/YYYY"
                                                onChange={(date) => handleDateChange(date, "closetime")}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField
                                                        {...inputProps}
                                                        inputRef={inputRef}
                                                        value={selectedCustomerData?.closetime}
                                                    />
                                                )}
                                            </DatePicker>
                                        </DemoItem>
                                    </LocalizationProvider>
                                </div>
                                <div className="input">
                                    {isEditMode ? (
                                        <Button variant="contained" disabled={INFO_modify} onClick={handleEdit}>Edit</Button>
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
                <Box
                    className="click-menu-icon"
                    sx={{ position: "relative", mt: 3, height: 320 }}>
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
                <div className="table-bookingCopy-RateType">
                    <div className='ratetype-table'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={handleRowClick}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RateType