import React, { useEffect, useContext } from 'react';
import "./TransferList.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Box } from '@mui/material';
import { PdfData } from '../TransferReport/PdfContext';
// ICONS
import { faBuilding, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useTransferlist from './useTransferlist';
import { PermissionContext } from '../../../context/permissionContext';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CircularProgress } from '@mui/material';

// Assuming you have unique IDs in your data, you can set the `id` field dynamically

const TransferList = ({ stationName, organizationNames }) => {
    const {
        rows,
        actionName,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        hidePopup,
        customer,
        setCustomer,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        selectedStatus,
        setSelectedStatus,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        handleButtonClickTripsheet,
        loading,
        // setLoading
        info,
        infoMessage

    } = useTransferlist();

    // Permission ------------
    const { permissions } = useContext(PermissionContext)

    const Transfer_read = permissions[6]?.read;

    return (
        <div className="TransferList-form main-content-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left-transferlist">
                        <div className="copy-title-btn-TransferList">
                            <div className="input-field input-field-transferlist" >
                                <div className="input input-transferlist">
                                    <div className="icone">
                                        <HailOutlinedIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-Organization"
                                        className='full-width'
                                        freeSolo
                                        size="small"
                                        value={customer}
                                        options={organizationNames}
                                        onChange={(event, value) => setCustomer(value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input input-transferlist">
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                id="fromDate"
                                                className='full-width'
                                                label="From Date"
                                                format="DD/MM/YYYY"
                                                value={fromDate}
                                                onChange={(date) => setFromDate(date)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className='input input-transferlist'>
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                id="toDate"
                                                className='full-width'
                                                label="To Date"
                                                format="DD/MM/YYYY"
                                                value={toDate}
                                                onChange={(date) => setToDate(date)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="input input-transferlist">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faNewspaper} size="xl" />
                                    </div>
                                    <select name="status" className='input-select' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                        <option value="" disabled>Select Status</option>
                                        <option value="all">All</option>
                                        <option value="billed">Billed</option>
                                        <option value="notbilled">Not Billed</option>
                                    </select>
                                </div>
                                {/* <div className="input input-transferlist" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-Stations"
                                        freeSolo
                                        size="small"
                                        value={servicestation}
                                        options={stationName.map((option) => ({
                                            label: option.Stationname,
                                        }))}
                                        onChange={(event, value) => handleserviceInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Stations" inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div> */}
                                <div className="input input-transferlist">
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-Stations"
                                        freeSolo
                                        size="small"
                                        value={servicestation || "All"}
                                        // options={[{ label: "All" }, ...stationName.map((option) => ({ label: option.Stationname }))]} 
                                        options={stationName.map((option) => ({
                                            label: option.Stationname,
                                        }))}
                                        onChange={(event, value) => handleserviceInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Stations" inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input" style={{ justifyContent: 'start', position: 'relative', left: '32px' }}>
                                    <Button variant="contained" disabled={!Transfer_read} onClick={handleShow} >Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Download-btn">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button variant="contained" disabled={!Transfer_read} endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
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
                <div className="table-bookingCopy-TransferList">
                    <div className='transfer-list-table'>
                       
                        <Box
                            sx={{
                                height: 400,
                                position: 'relative', // Make Box relative to position the spinner
                                '& .MuiDataGrid-virtualScroller': {
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                        height: '8px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: '#f1f1f1',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#457cdc',
                                        borderRadius: '20px',
                                        minHeight: '60px',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        backgroundColor: '#3367d6',
                                    },
                                },
                            }}
                        >
                            {loading ? ( // Show loading spinner when loading
                                <Box
                                    sx={{
                                        position: 'absolute', // Position the spinner absolutely
                                        top: '50%', // Center vertically
                                        left: '50%', // Center horizontally
                                        transform: 'translate(-50%, -50%)', // Center the spinner
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    onRowClick={handleButtonClickTripsheet}
                                    pageSize={5}
                                    checkboxSelection
                                    getRowId={(row) => row.id}
                                    disableRowSelectionOnClick
                                />
                            )}
                        </Box>

                    </div>
                </div>

            </form>
            <div className='alert-popup-main'>
                {error &&
                    <div className='alert-popup Error'>
                        <div className="popup-icon"><ClearIcon /> </div>
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
                 {info &&
                    <div className='alert-popup Warning' >
                        <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                        <p>{infoMessage}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default TransferList