import React from 'react';
import "./SelectedSales.css"
import Box from "@mui/material/Box";
import { APIURL } from "../../../url";
import { TextField } from "@mui/material";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import Button from "@mui/material/Button";
import useSelectedSales from './useSelectedSales';
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiMatterStates } from "react-icons/gi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ClearIcon from '@mui/icons-material/Clear';
import DialogContent from '@mui/material/DialogContent';
import { MdOutlineEventNote } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";


const columns = [
    { field: 'id', headerName: 'Sno', width: 20 },
    {
        field: 'billNo',
        headerName: 'Bill No',
        type: 'number',
        width: 90,
    },
    { field: 'billdate', headerName: 'Bill Date', width: 120 },
    { field: 'tripid', headerName: 'Trip ID', width: 70 },
    { field: 'tripdate', headerName: 'Trip Date', width: 100 },
    { field: 'customername', headerName: 'Customer Name', width: 180 },
    { field: 'guestname', headerName: 'Guest Name', width: 180 },
    { field: 'orderBy', headerName: 'OrderBy', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'dutytype', headerName: 'DutyType', width: 100 },

];

const rows = [
    { id: 1, billNo: 35, billdate: '22/07/2024', tripid: '2325', tripdate: '22/07/2024', customername: 'Dhan Lakshmi Bank', guestname: 'fahad', orderBy: 'Corporate', amount: '3420', email: 'fahad@nastaf.com', dutytype: 'oneway' },
    { id: 2, billNo: 35, billdate: '20/07/2024', tripid: '2305', tripdate: '20/07/2024', customername: 'Zoho', guestname: 'fahad', orderBy: 'Corporate', amount: '2450', email: 'fahad@nastaf.com', dutytype: 'local' },
    { id: 3, billNo: 35, billdate: '24/07/2024', tripid: '2345', tripdate: '24/07/2024', customername: 'IDFC Bank', guestname: 'fahad', orderBy: 'Corporate', amount: '20345', email: 'fahad@nastaf.com', dutytype: 'local' },
    { id: 4, billNo: 35, billdate: '26/07/2024', tripid: '2365', tripdate: '26/07/2024', customername: 'Kottak Bank', guestname: 'fahad', orderBy: 'Corporate', amount: '34240', email: 'fahad@nastaf.com', dutytype: 'local' },
    { id: 5, billNo: 35, billdate: '28/07/2024', tripid: '2385', tripdate: '28/07/2024', customername: 'NASTAF Technologies', guestname: 'fahad', orderBy: 'Corporate', amount: '2130', email: 'fahad@nastaf.com', dutytype: 'local' },

];
const SelectedSales = () => {
    const apiUrl = APIURL;
    const {
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        success,
        info,
        warning,
        error,
        hidePopup,
        deletefile,
        dialogOpen,
        handleRowClick,
        handlecheckbox,
        handleExcelDownload,
        handlePdfDownload,
        handleCloseDialog,
        selectAll,
        allFile,
        handleimagedelete,
        dialogdeleteOpen,
        handleDocumentDownload,
        handleClosedeleteDialog,
        handleSelectAll,
        handleContextMenu,
        Deleted,
    } = useSelectedSales();
    return (
        <div className="SelectedSales-main">
            <form >
                <div className='main-content-form'>
                    <div className='input-field'>
                        <div className="input">
                            <div className="icone">
                                <MdOutlineCalendarMonth color="action" />
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker", "DatePicker"]}>
                                    <DatePicker
                                        label="From Date"
                                        format="DD/MM/YYYY"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="input dispatch-input">
                            <div className="icone">
                                <MdOutlineCalendarMonth color="action" />
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker", "DatePicker"]}>
                                    <DatePicker
                                        label="To Date"
                                        format="DD/MM/YYYY"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="input">
                            <div className="icone">
                                <GiMatterStates color="action" />
                            </div>
                            <TextField
                                name="orderByMobileNo"
                                autoComplete="CustomerName"
                                className="full-width"
                                label="CustomerName"
                                id="CustomerName"
                                margin="normal"
                                size="small"
                            />
                        </div>

                        <div className='show-all-button'>
                            <div className="input" >
                                <Button variant="outlined">Show</Button>
                            </div>
                            <div className="input">
                                <Button className='text-nowrap' variant="contained" style={{ whiteSpace: 'nowrap' }}>Show All</Button>
                            </div>
                        </div>
                    </div>
                    <div className='input-field'>
                        <div className="input">
                            <div className="icone">
                                <MdOutlineEventNote color="action" />
                            </div>
                            <TextField
                                name="totalbill"
                                autoComplete="new-password"
                                className="full-width"
                                label="Total Bill"
                                id="totalbill"
                                margin="normal"
                                size="small"
                            />
                        </div>
                        <div className="input">
                            <div className="icone">
                                <FaIndianRupeeSign color="action" />
                            </div>
                            <TextField
                                name="totalamount"
                                autoComplete="new-password"
                                className="full-width"
                                label="Total Amount"
                                id="totalamount"
                                margin="normal"
                                size="small"
                            />
                        </div>
                    </div>
                    <div className="SelectedSales-table-container">
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
                        <div className="table-SelectedSales">
                            <Box
                                sx={{
                                    height: 400, // Adjust this value to fit your needs
                                    '& .MuiDataGrid-virtualScroller': {
                                        '&::-webkit-scrollbar': {
                                            width: '8px', // Adjust the scrollbar width here
                                            height: '8px', // Adjust the scrollbar width here
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            backgroundColor: '#f1f1f1',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: '#457cdc',
                                            borderRadius: '20px',
                                            minHeight: '60px', // Minimum height of the scrollbar thumb (scroll indicator)

                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            backgroundColor: '#3367d6',
                                        },
                                    },
                                }}
                            >
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
                            </Box>
                        </div>
                        <Dialog open={dialogOpen} onClose={handleCloseDialog} >
                            <DialogContent>
                                <div className='driver-creation-dialog-box-div1'>
                                    <Button variant='contained' className='driver-creation-dialog-box-btn' onClick={handleSelectAll}>
                                        {selectAll ? 'Deselect All' : 'Select All'}
                                    </Button>                                    {Array.isArray(allFile) && allFile.map((img, index) => (
                                        <div key={index} className='driver-creation-dialog-box-div2'>
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
                                <div className='driver-creation-delete-print-btn-section'>
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
                            <div className='driver-creation-delete-succesfully'>
                                <FontAwesomeIcon icon={faCheckCircle} className='driver-creation-delete-succesfully-icon' />
                                <p className='driver-creation-delete-succesfully-text'>Deleted Successfully...</p>
                            </div>
                        </Dialog>
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

                </div>
            </form>
        </div>
    )
}

export default SelectedSales