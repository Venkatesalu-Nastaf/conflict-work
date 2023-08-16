import React, { useState, useEffect, useCallback } from 'react';
import "./Employe.css";
import "jspdf-autotable";
import dayjs from "dayjs";
import axios from "axios";
import jsPDF from 'jspdf';
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { IconButton, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ChecklistIcon from "@mui/icons-material/Checklist";
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import TransgenderRoundedIcon from '@mui/icons-material/TransgenderRounded';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


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


// TABLE STRAT
const columns = [
    { field: "id", headerName: "Sno", width: 50 },
    { field: "empid", headerName: "Employe ID", width: 140 },
    { field: "empname", headerName: "Name", width: 130 },
    { field: "empemailid", headerName: "Email", width: 130 },
    { field: "empmobile", headerName: "Mobile", width: 130 },
    { field: "jobroll", headerName: "Job Roll", width: 130 },
    { field: "joiningdate", headerName: "Joining Date", width: 130 },
    { field: "gender", headerName: "Gender", width: 130 },
    { field: "bloodgroup", headerName: "Bloog Group", width: 130 },
    { field: "guardian", headerName: "Guardian", width: 130 },
    { field: "uanid", headerName: "UAN ID", width: 140 },
    { field: "esino", headerName: "ESI NO", width: 140 },
    { field: "fixedsalary", headerName: "Net Salary", width: 130 },
    { field: "licenceno", headerName: "Driving Licence No", width: 140 },
];
// TABLE END


const Employe = () => {
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [formData] = useState({});
    const [success, setSuccess] = useState(false);


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
        pdf.text("Employee Details", 10, 10);

        // Modify tableData to exclude the index number
        const tableData = rows.map((row) => [
            row['id'],
            row['empid'],
            row['empname'],
            row['empemailid'],
            row['empmobile'],
            row['jobroll'],
            row['joiningdate'],
            row['gender'],
            row['bloodgroup'],
            row['address1'],
            row['aadharcard'],
            row['pancard'],
            row['address2'],
            row['guardian'],
            row['fixedsalary'],
            row['uanid'],
            row['esino'],
            row['uanid']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Employe ID', 'Name', 'Email', 'Mobile', 'Job Roll', 'Joining Date', 'Gender', 'Blood Group', 'Guardian', 'UAN ID', 'ESI NO', 'Net Salary', 'Driving Licence No']],
            body: tableData,
            startY: 20,
            columnWidth: 'auto',
        });

        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Customer_Details.pdf');
    };



    const hidePopup = () => {
        setSuccess(false);
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
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [success]);

    const [book, setBook] = useState({
        empid: '',
        empname: '',
        empemailid: '',
        empmobile: '',
        jobroll: '',
        joiningdate: '',
        gender: '',
        bloodgroup: '',
        address1: '',
        aadharcard: '',
        pancard: '',
        address2: '',
        guardian: '',
        fixedsalary: '',
        uanid: '',
        esino: '',
        licenceno: '',

    });
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            // For checkboxes, update the state based on the checked value
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            // For other input fields, update the state based on the value
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleDateChange = (date, name) => {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: formattedDate,
        }));
    };
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            empid: '',
            empname: '',
            empemailid: '',
            empmobile: '',
            jobroll: '',
            joiningdate: '',
            gender: '',
            bloodgroup: '',
            address1: '',
            aadharcard: '',
            pancard: '',
            address2: '',
            guardian: '',
            fixedsalary: '',
            uanid: '',
            esino: '',
            licenceno: '',

        }));
        setSelectedCustomerData({});
    };

    const handleRowClick = useCallback((params) => {
        console.log(params.row);
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);

    const handleClick = async (event, actionName, empid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                console.log('List button clicked');
                const response = await axios.get('http://localhost:8081/employees');
                const data = response.data;
                setRows(data);
            } else if (actionName === 'Cancel') {
                console.log('Cancel button clicked');
                handleCancel();
            } else if (actionName === 'Delete') {
                console.log('Delete button clicked');
                await axios.delete(`http://localhost:8081/employees/${empid}`);
                console.log('Customer deleted');
                setSelectedCustomerData(null);
                handleCancel();
            } else if (actionName === 'Edit') {
                console.log('Edit button clicked');
                const selectedCustomer = rows.find((row) => row.empid === empid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://localhost:8081/employees/${empid}`, updatedCustomer);
                console.log('Customer updated');
                handleCancel();
            } else if (actionName === 'Add') {
                await axios.post('http://localhost:8081/employees', book);
                console.log(book);
                handleCancel();
            }
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    return (
        <div className="Employe-form Scroll-Style-hide">
            <form onSubmit={handleClick}>
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
                                    name="empid"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.empid || book.empid}
                                    onChange={handleChange}
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
                                    name="empname"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.empname || book.empname}
                                    onChange={handleChange}
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
                                    name="empemailid"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.empemailid || book.empemailid}
                                    onChange={handleChange}
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
                                    name="empmobile"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.empmobile || book.empmobile}
                                    onChange={handleChange}
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
                                    id="jobroll"
                                    label="Job Roll"
                                    name="jobroll"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.jobroll || book.jobroll}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </div>
                            <div className="input" >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Joining Date">
                                        <DatePicker
                                            value={formData.joiningdate || selectedCustomerData.joiningdate ? dayjs(selectedCustomerData.joiningdate) : null}
                                            onChange={(date) => handleDateChange(date, 'joiningdate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.joiningdate} />
                                            )}
                                        </DatePicker>
                                    </DemoItem>
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
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.gender || book.gender}
                                    onChange={handleChange}
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
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.bloodgroup || book.bloodgroup}
                                    onChange={handleChange}
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
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.address1 || book.address1}
                                    onChange={handleChange}
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
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.aadharcard || book.aadharcard}
                                    onChange={handleChange}
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
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.pancard || book.pancard}
                                    onChange={handleChange}
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
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.address2 || book.address2}
                                    onChange={handleChange}
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
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.guardian || book.guardian}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "215px" }}>
                                <div className="icone">
                                    <CurrencyRupeeIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="fixedsalary"
                                    label="Fixed Salary"
                                    name="fixedsalary"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.fixedsalary || book.fixedsalary}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "260px" }}>
                                <div className="icone">
                                    <DeviceHubRoundedIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="uanid"
                                    label="UAN Id"
                                    name="uanid"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.uanid || book.uanid}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "260px" }}>
                                <div className="icone">
                                    <MedicalInformationIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="esino"
                                    label="ESI No"
                                    name="esino"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.esino || book.esino}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </div>
                            <div className="input" style={{ width: "250px" }}>
                                <div className="icone">
                                    <DirectionsCarIcon color="action" />
                                </div>
                                <TextField
                                    size="small"
                                    id="drivinglicence no"
                                    label="Drving Licence No"
                                    name="licenceno"
                                    autoComplete="new-password"
                                    value={selectedCustomerData?.licenceno || book.licenceno}
                                    onChange={handleChange}
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
                        </div>
                        <div className="input-field">
                            <div className="input" style={{ width: "100px" }}>
                                <Button variant="contained" >Add</Button>
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
                {success &&
                    <div className='alert-popup Success' >
                        <span className='cancel-btn' onClick={hidePopup}>x</span>
                        <p>success fully submitted</p>
                    </div>
                }
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
                                onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
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
                <div className="table-bookingCopy-Employe ">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            className="Scroll-Style"
                            rows={rows}
                            columns={columns}
                            onRowClick={handleRowClick}
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