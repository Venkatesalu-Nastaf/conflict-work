import React from 'react';
import "./MonthlyWise.css"
import Box from "@mui/material/Box";
import { APIURL } from "../../../url";
import { TextField } from "@mui/material";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import Button from "@mui/material/Button";
import useMonthlyWise from './useMonthlyWise';
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
// import Dialog from '@mui/material/Dialog';
// import Checkbox from '@mui/material/Checkbox';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ClearIcon from '@mui/icons-material/Clear';
// import DialogContent from '@mui/material/DialogContent';
import Autocomplete from "@mui/material/Autocomplete";
import { Customertype } from "../../Customer/Customerdata";


// const columns = [
//     { field: 'id5', headerName: 'Sno', width: 20 },
//     {
//         field: 'billingno',
//         headerName: 'Bill No',
//         type: 'number',
//         width: 90,
//     },
//     { field: 'customer', headerName: 'Customer Name', width: 180 },
//     { field: 'totalAmount', headerName: 'Amount', width: 130 },
//     { field: 'orderbyemail', headerName: 'Email', width: 180 },
//     { field: 'customertype', headerName: 'CustomerType', width: 130 },
//     { field: 'customerId', headerName: 'CID', width: 70 },

// ];

// const rows = [
//     { id: 2, billNo: 35, customerName: 'Zoho', amount: '2450', email: 'fahad@nastaf.com', customertype: 'Corporate', cid: '213' },
//     { id: 1, billNo: 35, customerName: 'Dhan Lakshmi Bank', amount: '3420', email: 'fahad@nastaf.com', customertype: 'Corporate', cid: '213' },
//     { id: 3, billNo: 35, customerName: 'IDFC Bank', amount: '20345', email: 'fahad@nastaf.com', customertype: 'Corporate', cid: '213' },
//     { id: 4, billNo: 35, customerName: 'Kottak Bank', amount: '34240', email: 'fahad@nastaf.com', customertype: 'Corporate', cid: '213' },
//     { id: 5, billNo: 35, customerName: 'NASTAF Technologies', amount: '2130', email: 'fahad@nastaf.com', customertype: 'Corporate', cid: '213' },
// ];
const MonthlyWise = () => {
    // const apiUrl = APIURL;
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
        customertypedata,
        handleAutocompleteChange,
        rows,
        handleExcelDownload,
        handlePdfDownload,
        fromDate, setFromDate, toDate, setToDate,
        handleShowAll,
        columns,
        handleShow,
    } = useMonthlyWise();
    console.log(rows, "font")
    return (
        <div className="MonthlyWise-main">
            <form >
                <div className='main-content-form'>
                    <div className='input-field' style={{flexWrap: 'wrap'}}>
                        <div className="input">
                            <div className="icone">
                                <MdOutlineCalendarMonth color="action" />
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker", "DatePicker"]}>
                                    <DatePicker
                                        label="From Date"
                                        format="DD/MM/YYYY"
                                        value={fromDate}
                                        onChange={(date) => setFromDate(date)}
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
                                        value={toDate}
                                        onChange={(date) => setToDate(date)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div className="input">
                            <div className="icone">
                                <GiMatterStates color="action" />
                            </div>
                            <Autocomplete
                                fullWidth
                                size="small"
                                id="free-solo-demo-customerType"
                                freeSolo
                                sx={{ width: "100%" }}
                                onChange={(event, value) => handleAutocompleteChange(event, value)}
                                value={customertypedata}
                                options={Customertype.map((option) => ({
                                    label: option.Option,
                                }))}
                                //   getOptionLabel={(option) => option.label || selectedCustomerData?.customerType || book.customerType || ''}
                                renderInput={(params) => {
                                    return (
                                        <TextField   {...params} label="Customer Type" name="customerType" inputRef={params.inputRef} />
                                    )
                                }
                                }
                            />
                        </div>

                        <div className='show-all-button'>
                            <div className="input" >
                                <Button variant="outlined" onClick={handleShow} >Show</Button>
                            </div>
                            <div className="input">
                                <Button className='text-nowrap' variant="contained" onClick={handleShowAll} style={{ whiteSpace: 'nowrap' }}>Show All</Button>
                            </div>
                        </div>
                    </div>
                    <div className="MonthlyWise-table-container">
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
                        <div className="table-MonthlyWise">
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
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                />
                            </Box>
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
                </div>
            </form>
        </div>
    )
}

export default MonthlyWise