import React from 'react'
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { TextField } from "@mui/material";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import BadgeIcon from "@mui/icons-material/Badge";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Box from "@mui/material/Box";
import { Menu } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const EmployePaySlip = () => {

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
        { field: "id", headerName: "Sno", width: 50 },
        { field: "EmployeID", headerName: "Employe ID", width: 140 },
        { field: "Name", headerName: "Name", width: 130 },
        { field: "JobRoll", headerName: "Job Roll", width: 130 },
        { field: "UANID", headerName: "UAN ID", width: 140 },
        { field: "ESINO", headerName: "ESI NO", width: 140 },
        { field: "JoiningDate", headerName: "Joining Date", width: 130 },
        { field: "Email", headerName: "Email", width: 130 },
        { field: "Mobile", headerName: "Mobile", width: 130 },
        { field: "AcountNumber", headerName: "Acount Number", width: 130 },
        { field: "EPF", headerName: "EPF", width: 130 },
        { field: "ESIC", headerName: "ESIC", width: 130 },
        { field: "GrossPay", headerName: "Gross Pay", width: 130 },
        { field: "WorkingDays", headerName: "Working Days", width: 130 },
        { field: "LeaveDays", headerName: "Leave Days", width: 130 },
        { field: "BasicSalary", headerName: "Basic Salary", width: 130 },
        { field: "HouseRentAllowance", headerName: "House Rent Allowance", width: 160 },
        { field: "OtherAllowances", headerName: "Other Allowances", width: 150 },
        { field: "OverTime", headerName: "Over Time", width: 130 },
        { field: "OutStation/AirportDuty", headerName: "OutStation / Airport Duty", width: 160 },
        { field: "ExtraWorkingDays", headerName: "Extra Working Days", width: 160 },
        { field: "CellWash", headerName: "Cell Wash", width: 130 },
        { field: "TotalEarningAmount", headerName: "Total Earning Amount", width: 170 },
        { field: "PF20Amount", headerName: "PF 20% Amount", width: 140 },
        { field: "Esic075Amount", headerName: "Esic 0.75% Amount", width: 140 },
        { field: "Otherdeduction", headerName: "Other Deduction", width: 140 },
        { field: "ProfessionalTax", headerName: "Professional Tax", width: 140 },
        { field: "IncomeTax", headerName: "Income Tax", width: 140 },
        { field: "AdvancePaid", headerName: "Advance Paid", width: 140 },
        { field: "AdvanceLoan", headerName: "Advance Loan", width: 140 },
        { field: "TotalDeducation", headerName: "Total Deducation", width: 140 },
        { field: "TakeHomeAmount", headerName: "Take Home Amount", width: 140 },
    ];

    const rows = [
        {
            id: 1,
            EmployeID: 1,
            Name: "2023-06-07",
            JobRoll: 600,
            Email: 600,
            Mobile: 600,
            JoiningDate: "2023-06-07",
            AcountNumber: 600,
            BloogGroup: 600,
            Guardian: 600,
            UANID: 600,
            ESINO: 600,
            NetSalary: 600,
            DrivingLicenceNo: 600,

        },
        {
            id: 2,
            EmployeID: 2,
            Name: "2023-06-08",
            Email: 600,
            Mobile: 600,
            JobRoll: 600,
            JoiningDate: "2023-06-07",
            AcountNumber: 600,
            BloogGroup: 600,
            Guardian: 600,
            UANID: 600,
            ESINO: 600,
            NetSalary: 600,
            DrivingLicenceNo: 600,
        },
    ];

    return (
        <>
            <div className="detail-container-main">
                <div className="container-left">
                    <div className="copy-title-btn-PettyCash">
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="id"
                                    label="Employe Id"
                                    name="employeid"
                                    autoComplete="new-password"
                                    autoFocus
                                />
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='From'
                                        defaultValue={dayjs()}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="salarydate"
                                                inputRef={params.inputRef}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='To'
                                        defaultValue={dayjs()}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="salarydate"
                                                inputRef={params.inputRef}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: '80px' }}>
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
        </>
    )
}

export default EmployePaySlip