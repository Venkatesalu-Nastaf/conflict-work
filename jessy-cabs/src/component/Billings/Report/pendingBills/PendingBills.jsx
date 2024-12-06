
import React from 'react'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Menu from '@mui/material/Menu';
import "./PendingBills.css"
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";
import { IoCash } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import usePendingBill from './usePendingBill';
import dayjs from 'dayjs';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ClearIcon from "@mui/icons-material/Clear";

export const PendingBills = () => {

    const { handlechange, organization, pendingBill, handleFromDateChange, handleToDateChange,
        handleShowAllBills, handleShowPendingBills, rows, columns, handlePdfDownload, handleExcelDownload, success, successMessage,
        error, errorMessage, hidePopup
    } = usePendingBill()

    return (

        <>
            <div className='main-content-form'>
                <div className='input-field pending-bills-input-field' style={{ marginBottom: '15px' }}>

                    <div className="inut" style={{ display: "flex", alignItems: "center" }}>
                        <div className="icone">
                            <MdOutlineCalendarMonth color="action" />
                        </div>

                        <FormControl sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-helper-label">Customer Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name='CustomerName'
                                value={pendingBill.CustomerName}
                                label="Owner Type"
                                onChange={handlechange}
                            >
                                {organization.map((org) => (
                                    <MenuItem key={org} value={org}>
                                        {org}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>


                    <div className="input">
                        <div className="icone">
                            <MdOutlineCalendarMonth color="action" />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker", "DatePicker"]}>
                                <DatePicker
                                    label="From Date"
                                    format="DD/MM/YYYY"
                                    name='fromDate'
                                    onChange={handleFromDateChange}
                                    value={dayjs(pendingBill.fromDate)}
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
                                    name='toDate'
                                    onChange={handleToDateChange}
                                    value={dayjs(pendingBill.toDate)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>


                    <div className="input bill-btn-main" style={{ gap: '15px' }}>
                        <Button variant='contained' className='bill-btn' onClick={handleShowAllBills}>All Bills</Button>
                        <Button variant='contained' className='bill-btn' onClick={handleShowPendingBills}>Pending Bills</Button>
                    </div>


                </div>
                <div style={{ display: "flex", alignItems: 'center', gap: "2rem" }}>

                    <div className="Download-btn download-btn-pending">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                                        Download
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={handleExcelDownload} >Excel</MenuItem>
                                        <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>


                    <div className="input">
                        <div className="icone">
                            <IoCash color="action" />
                        </div>
                        <TextField
                            name="TotalAmount"
                            autoComplete="totalName"
                            className="full-width"
                            label="Total Amount"
                            margin="normal"
                            size="small"
                            value={pendingBill.TotalAmount}
                        />
                    </div>

                    <div className="input">
                        <div className="icone">
                            <MdAccountBalanceWallet color="action" />
                        </div>
                        <TextField
                            name="Balance"
                            autoComplete="Balance"
                            className="full-width"
                            label="Balance"
                            margin="normal"
                            size="small"
                            value={pendingBill.Balance}
                        />
                    </div>
                </div>
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
                    {success && (
                        <div className="alert-popup Success">
                            <div className="popup-icon">
                                <FileDownloadDoneIcon />
                            </div>
                            <span className="cancel-btn" onClick={hidePopup}>
                                <ClearIcon color="action" />
                            </span>
                            <p>{successMessage}</p>
                        </div>
                    )}
                </div>
                <div className='pendingbill-table'>
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
        </>)
}

