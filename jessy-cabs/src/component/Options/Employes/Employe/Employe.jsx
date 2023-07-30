import React from 'react';
import "./Employe.css";
import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Menu from '@mui/material/Menu';
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TransgenderRoundedIcon from '@mui/icons-material/TransgenderRounded';
import BadgeIcon from "@mui/icons-material/Badge";
import { IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import "jspdf-autotable";


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
    { field: "Email", headerName: "Email", width: 130 },
    { field: "Mobile", headerName: "Mobile", width: 130 },
    { field: "Roll", headerName: "Roll", width: 130 },
    { field: "JoiningDate", headerName: "Joining Date", width: 130 },
    { field: "Gender", headerName: "Gender", width: 130 },
    { field: "BloogGroup", headerName: "Bloog Group", width: 130 },
    { field: "Guardian", headerName: "Guardian", width: 130 },
    { field: "UANID", headerName: "UAN ID", width: 140 },
    { field: "ESINO", headerName: "ESI NO", width: 140 },
    { field: "NetSalary", headerName: "Net Salary", width: 130 },
    { field: "DrivingLicenceNo", headerName: "Driving Licence No", width: 140 },
];

const rows = [
    {
        id: 1,
        EmployeID: 1,
        Name: "2023-06-07",
        Email: 600,
        Mobile: 600,
        Roll: 600,
        JoiningDate: "2023-06-07",
        Gender: 600,
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
        Roll: 600,
        JoiningDate: "2023-06-07",
        Gender: 600,
        BloogGroup: 600,
        Guardian: 600,
        UANID: 600,
        ESINO: 600,
        NetSalary: 600,
        DrivingLicenceNo: 600,
    },
];

const Employe = () => {


    return (
        <div className="Employe-form">
            <form>
                <div className="detail-container-main-Employe">
                    <div className="container-Employe">
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <BadgeIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="id"
                                    label="Employe ID"
                                    name="driverid"
                                    autoComplete="new-password"
                                    autoFocus
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <PermIdentityIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="new-password"
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <EmailIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="emailid"
                                    label="Email Id"
                                    name="emailid"
                                    autoComplete="new-password"
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <PhoneIphoneIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="mobile"
                                    label="Mobile"
                                    name="mobile"
                                    autoComplete="new-password"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input">
                                <div className="icone">
                                    <WorkOutlineRoundedIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="roll"
                                    label="Roll"
                                    name="roll"
                                    autoComplete="new-password"
                                    autoFocus
                                />
                            </div>
                            <div className="input" >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='Joining Date'
                                        defaultValue={dayjs()}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="joiningdate"
                                                inputRef={params.inputRef}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <TransgenderRoundedIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <BloodtypeIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="bloodgroup"
                                    label="Blood Group"
                                    name="bloodgroup"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "415px" }}>
                                <div className="icone">
                                    <AddHomeWorkIcon color="action" />
                                </div>
                                <TextField
                                    sx={{ width: "415px" }}
                                    size="small"
                                    id="address1"
                                    label="Address"
                                    name="address1"
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <ContactMailIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="aadharcard"
                                    label="Aadhar Card"
                                    name="aadharcard"
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <FactCheckIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="pancard"
                                    label="Pan Card"
                                    name="pancard"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "415px" }}>
                                <div className="icone">
                                    <LocationCityIcon color="action" />
                                </div>
                                <TextField
                                    sx={{ width: "415px" }}
                                    size="small"
                                    id="address2"
                                    name="address2"
                                    variant="standard"
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <EscalatorWarningIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="guardian"
                                    label="Guardian"
                                    name="guardian"
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <FactCheckIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="function"
                                    label="Function"
                                    name="function"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" >
                                <div className="icone">
                                    <DeviceHubRoundedIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="uanid"
                                    label="UAN Id"
                                    name="uanid"
                                    autoFocus
                                />
                            </div>
                            <div className="input">
                                <div className="icone">
                                    <MedicalInformationIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="esino"
                                    label="ESI No"
                                    name="esino"
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "190px" }}>
                                <div className="icone">
                                    <DirectionsCarIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="drivinglicence no"
                                    label="Drving Licence No"
                                    name="licence no"
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "20px" }}>
                                <IconButton color="primary" size="larger">
                                    <UploadFileIcon />
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </IconButton>
                            </div>
                            <div className="input" >
                                <div className="icone">
                                    <CurrencyRupeeIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="netsalary"
                                    label="Net Salary"
                                    name="netsalary"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        icon={<SpeedDialIcon />}
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
                <div className="table-bookingCopy-Employe">
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

export default Employe