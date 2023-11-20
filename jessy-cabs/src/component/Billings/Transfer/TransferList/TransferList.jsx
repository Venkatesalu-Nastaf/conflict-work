import React, { useState } from 'react';
import "./TransferList.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "vcode", headerName: "VCode", width: 130 },
    { field: "billno", headerName: "Bill No", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "monthid", headerName: "MonthID", width: 130 },
    { field: "fdate", headerName: "FDate", width: 130 },
    { field: "tdate", headerName: "TDate", width: 150 },
    { field: "username", headerName: "UserName", width: 150 },
    { field: "Trips", headerName: "Trips", width: 150 },
    { field: "Subtotal", headerName: "SubTotal", width: 150 },
    { field: "grossamount", headerName: "GrossAmount", width: 150 },
    { field: "gst", headerName: "GST%", width: 130 },
    { field: "toll", headerName: "Toll", width: 130 },
    { field: "Amount", headerName: "Amount", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "Diff", headerName: "Diff", width: 130 },
];

const TransferList = () => {
    const [rows, setRows] = useState([]);

    return (
        <div className="TransferList-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-TransferList">
                            <div className="input-field" style={{ justifyContent: 'center' }}>
                                <div className="input" style={{ width: "230px" }}>
                                    <div className="icone">
                                        <HailOutlinedIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Organization"
                                        name="organization"
                                        autoComplete='off'
                                    />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                                        <DatePicker
                                            label="From Date"
                                        />
                                        <DatePicker
                                            label="To Date"
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className="input-field" style={{ justifyContent: 'center' }}>
                                <div className="input" style={{ width: "140px" }}>
                                    <Button variant="contained">Search</Button>
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
                                    <MenuItem >Excel</MenuItem>
                                    <MenuItem >PDF</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </div>
                <div className="table-bookingCopy-TransferList">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TransferList