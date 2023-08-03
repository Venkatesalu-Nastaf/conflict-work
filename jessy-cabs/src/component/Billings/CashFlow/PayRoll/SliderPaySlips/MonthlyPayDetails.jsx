import React, { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import SpeedDialAction from "@mui/material/SpeedDialAction";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
// import ChecklistIcon from "@mui/icons-material/Checklist";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import { styled } from "@mui/material/styles";
// import SpeedDial from "@mui/material/SpeedDial";
// import Box from "@mui/material/Box";
import { Menu } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';

const MonthlyPayDetails = () => {

    const [rows, setRows] = useState([]);
    const [empid] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [error, setError] = useState(false);

    

    // download function
    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "customer_details.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF('landscape');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Customer Details", 10, 10);
        // Modify tableData to exclude the index number
        const tableData = rows.map((row) => [
            row['id'],
            row['empid'],
            row['empname'],
            row['jobroll'],
            row['uanid'],
            row['esino'],
            row['salarydate'],
            row['empemailid'],
            row['empmobile'],
            row['takehomeamount']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Employe ID', 'Name', 'Job Roll', 'UAN ID', 'ESI NO', 'Joining Date', 'Email', 'Mobile', 'Take Home Amount']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Customer_Details.pdf');
    };

    const hidePopup = () => {
        setError(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [error]);



   

    const handleShow = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8081/payroll?empid=${empid}&fromDate=${fromDate.format('YYYY-MM-DD')}&toDate=${toDate.format('YYYY-MM-DD')}`);
            const data = response.data;
            setRows(data);
        } catch (error) {
            console.error('Error retrieving data:', error);
            setRows([]);
        }
    }, [empid, fromDate, toDate]);

    // TABLE

    const columns = [
        { field: "id", headerName: "Sno", width: 50 },
        { field: "empid", headerName: "Employe ID", width: 140 },
        { field: "empname", headerName: "Name", width: 130 },
        { field: "jobroll", headerName: "Job Roll", width: 130 },
        { field: "uanid", headerName: "UAN ID", width: 140 },
        { field: "esino", headerName: "ESI NO", width: 140 },
        { field: "salarydate", headerName: "Joining Date", width: 130 },
        { field: "empemailid", headerName: "Email", width: 130 },
        { field: "empmobile", headerName: "Mobile", width: 130 },
        { field: "PF12", headerName: "EPF", width: 130 },
        { field: "ESIC0_75", headerName: "ESIC", width: 130 },
        { field: "grosspay", headerName: "Gross Pay", width: 130 },
        { field: "workingdays", headerName: "Working Days", width: 130 },
        { field: "leavedays", headerName: "Leave Days", width: 130 },
        { field: "basicsalary", headerName: "Basic Salary", width: 130 },
        { field: "houserentallowance", headerName: "House Rent Allowance", width: 160 },
        { field: "otherallowance", headerName: "Other Allowances", width: 150 },
        { field: "overtime", headerName: "Over Time", width: 130 },
        { field: "outstation", headerName: "OutStation / Airport Duty", width: 160 },
        { field: "extraworkingdays", headerName: "Extra Working Days", width: 160 },
        { field: "cellwash", headerName: "Cell Wash", width: 130 },
        { field: "totalerningsamount", headerName: "Total Earning Amount", width: 170 },
        { field: "otherdeducations", headerName: "Other Deduction", width: 140 },
        { field: "professionaltax", headerName: "Professional Tax", width: 140 },
        { field: "incometax", headerName: "Income Tax", width: 140 },
        { field: "advancepaid", headerName: "Advance Paid", width: 140 },
        { field: "advanceloan", headerName: "Advance Loan", width: 140 },
        { field: "totaldeductionamount", headerName: "Total Deducation", width: 140 },
        { field: "takehomeamount", headerName: "Take Home Amount", width: 140 },
    ];


    // date
    // const today = dayjs();
    // const tomorrow = dayjs().add(1, "day");
    return (
        <>
            <div className="detail-container-main">
                <div className="container-left">
                    <div className="copy-title-btn-PettyCash">
                        <div className="input-field">
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="From">
                                        <DatePicker
                                            label="From Date"
                                            value={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="To">
                                        <DatePicker
                                            label="To Date"
                                            value={toDate}
                                            onChange={(date) => setToDate(date)}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: '80px', marginTop: "50px" }}>
                                <Button variant="contained" onClick={handleShow}>Search</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error &&
                <div className='alert-popup Error' >
                    <span className='cancel-btn' onClick={hidePopup}>x</span>
                    <p>Something went wrong!</p>
                </div>
            }
            {/* <Box sx={{ position: "relative", mt: 3, height: 320 }}>
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
            </Box> */}
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

export default MonthlyPayDetails