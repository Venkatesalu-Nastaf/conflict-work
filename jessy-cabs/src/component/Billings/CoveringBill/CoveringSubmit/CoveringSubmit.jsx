import React, { useEffect, useContext } from 'react';
import "./CoveringSubmit.css";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useCoversubmit from './useCoversubmit';
import { PermissionContext } from '../../../context/permissionContext';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


const CoveringSubmit = ({ stationName, organizationNames }) => {

    const {
        rows,
        actionName,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        handleClick,
        hidePopup,
        customer,
        tripData,
        setCustomer,
        selectedCustomerDatas,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleExcelDownload,
        handlePdfDownload,
        handleShow,
        columns,
        handleButtonClickTripsheet
    } = useCoversubmit();

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    }, [actionName, handleClick]);

    // Permission ------------
    const { permissions } = useContext(PermissionContext)
    const CoveringBill_read = permissions[7]?.read;

    return (
        <div className="CoveringSubmit-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main detail-container-main-coveringbill">
                    <div className="container-left-coveringbill">
                        <div className="copy-title-btn-CoveringSubmit">
                            <div className="input-field input-feild-coveringbill">
                                <div className="input">
                                    <div className="icone">
                                        <HailOutlinedIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-customer"
                                        freeSolo
                                        size="small"
                                        value={customer || (tripData.length > 0 ? tripData[0].customer : '') || ''}
                                        options={organizationNames}
                                        onChange={(event, value) => setCustomer(value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                            id="formdate"
                                                value={selectedCustomerDatas.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate || ''}
                                                format="DD/MM/YYYY"
                                                onChange={(date) => {
                                                    handleDateChange(date, 'fromdate');
                                                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                                                    setFromDate(parsedDate);
                                                }}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.fromdate} />
                                                )}
                                            </DatePicker>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                            id="toDate"
                                                value={selectedCustomerDatas.todate ? dayjs(selectedCustomerDatas.todate) : toDate || ''}
                                                format="DD/MM/YYYY"
                                                onChange={(date) => {
                                                    handleDateChange(date, 'todate');
                                                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                                                    setToDate(parsedDate);
                                                }}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.todate} />
                                                )}
                                            </DatePicker>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-station"
                                        freeSolo
                                        size="small"
                                        value={servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || ''}
                                        options={stationName.map((option) => ({
                                            label: option.Stationname,
                                        }))}
                                        onChange={(event, value) => handleserviceInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Stations" name='station' inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input">
                                    <Button variant="contained" disabled={!CoveringBill_read} onClick={handleShow} >Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Download-btn">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button variant="contained" disabled={!CoveringBill_read} endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
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
                <div className="table-bookingCopy-CoveringSubmit">
                    <div className='covering-submit-table'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            onRowClick={handleButtonClickTripsheet}
                        />
                    </div>
                </div>
            </form>
            <div className='alert-popup-main'>
                {error &&
                    <div className='alert-popup Error' >
                        <div className="popup-icon"> <ClearIcon /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{errorMessage}</p>
                    </div>
                }
                {success &&
                    <div className='alert-popup Success'>
                        <div className="popup-icon"><FileDownloadDoneIcon /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{successMessage}</p>
                    </div>
                }
                {warning &&
                    <div className='alert-popup Warning' >
                        <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{warningMessage}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CoveringSubmit