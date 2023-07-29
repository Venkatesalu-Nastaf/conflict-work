import React from 'react'
import "./PettyCash.css";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BadgeIcon from "@mui/icons-material/Badge";
import { Menu, TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';



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
const actions = [
    { icon: <ChecklistIcon />, name: "List" },
    { icon: <CancelPresentationIcon />, name: "Cancel" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Edit" },
    { icon: <BookmarkAddedIcon />, name: "Add" },
];

// download function
const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
};
const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Account_Info.csv");
};
const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);// Set the font size and font style
    pdf.setFont('helvetica', 'normal');
    pdf.text("Account_Info", 10, 10);// Add a title for the table
    const tableData = rows.map((row, index) => [index + 1, ...Object.values(row)]);
    pdf.autoTable({
        head: [['Sno', 'Customer ID', 'Name', 'Address', 'Phone', 'Active', 'Rate_Type', 'GST_NO', 'State', 'Driver_App']],
        body: tableData,
        startY: 20,
    }); // Create a table to display the data
    const pdfBlob = pdf.output('blob'); // Save the PDF to a Blob
    saveAs(pdfBlob, 'Account_Info.pdf'); // Download the PDF
};


// TABLE

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "VoucherNo", headerName: "VoucherNo", width: 130 },
    { field: "PaymentDate", headerName: "Payment Date", width: 130 },
    { field: "BillName", headerName: "Bill Name", width: 130 },
    { field: "PaymentCategory", headerName: "Payment Category", width: 150 },
    { field: "Amount", headerName: "Amount", width: 130 },
];

const rows = [
    {
        id: 1,
        VoucherNo: 1,
        PaymentDate: "2023-06-07",
        BillName: "2023-06-07",
        PaymentCategory: "9:00 AM",
        Amount: 600,

    },
    {
        id: 2,
        VoucherNo: 2,
        PaymentDate: "2023-06-07",
        BillName: "2023-06-08",
        PaymentCategory: "7:00 PM",
        Amount: 500,

    },
    // Add more rows as needed
];

// date
const today = dayjs();
const tomorrow = dayjs().add(1, "day");

const PettyCash = () => {
    return (
        <div className="PettyCash-form">
            <form action="">
                <div className="PettyCash-page-header">
                    <div className="input-field">
                        <div className="input" style={{ width: "300px" }}>
                            <div className="icone">
                                <BadgeIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="voucher"
                                label="Voucher No"
                                name="voucher"
                                autoFocus
                            />
                        </div>
                        <div className="input" style={{ width: "220px" }}>
                            <div className="icone">
                                <RateReviewIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="id"
                                label="Bill Name"
                                name="ratename"
                                autoFocus
                            />
                        </div>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    views={["year", "month", "day"]}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "300px" }}>
                            <div className="icone">
                                <FactCheckIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="id"
                                label="Payment Category"
                                name="PaymentCategory"
                                autoFocus
                            />
                        </div>
                        <div className="input" style={{ width: "220px" }}>
                            <div className="icone">
                                <BadgeIcon color="action" />
                            </div>
                            <TextField
                                size="small"
                                id="amount"
                                label="Amount"
                                name="amount"
                                autoFocus
                            />
                        </div>
                        <div className="input" style={{ width: "100px" }}>
                            <Button variant="contained">Add</Button>
                        </div>
                    </div>
                </div>
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-PettyCash">
                            <div className="input-field">
                                <div className="input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoItem label="From">
                                            <DatePicker
                                                defaultValue={today}
                                                minDate={tomorrow}
                                                views={["year", "month", "day"]}
                                            />
                                        </DemoItem>
                                    </LocalizationProvider>
                                </div>
                                <div className="input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoItem label="To">
                                            <DatePicker
                                                defaultValue={today}
                                                minDate={tomorrow}
                                                views={["year", "month", "day"]}
                                            />
                                        </DemoItem>
                                    </LocalizationProvider>
                                </div>
                                <div className="input" style={{ width: '123px', 'margin-top': "50px" }}>
                                    <Button variant="contained">Search</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<SpeedDialIcon />}
                        direction="left"
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
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
                <div className="table-bookingCopy-PettyCash">
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

export default PettyCash