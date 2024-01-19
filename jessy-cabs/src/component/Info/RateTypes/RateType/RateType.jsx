import React, { useState, useEffect, useCallback } from 'react';
import "./RateType.css";
import "jspdf-autotable";
import jsPDF from 'jspdf';
import axios from "axios";
import { saveAs } from 'file-saver';
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Stations } from "./RateTypeData.js";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, } from "@mui/material";


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
// TABLE

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "driverid", headerName: "Driver ID", width: 130 },
    { field: "ratename", headerName: "Rate Type", width: 130 },
    { field: "active", headerName: "Active", width: 130 },
    { field: "starttime", headerName: "Start Time", width: 130 },
    { field: "closetime", headerName: "Close Time", width: 130 },
];

const RateType = () => {
    const user_id = localStorage.getItem('useridno');

    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [starttime, setStartTime] = useState('');
    const [closetime, setCloseTime] = useState('');
    const [formData] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage, setWarningMessage] = useState({});
    const [infoMessage] = useState({});


    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Rate Type';
                const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
                console.log('permission data', response.data);
            } catch (error) {
                console.error('Error fetching user permissions:', error);
            }
        };

        fetchPermissions();
    }, [user_id]);

    const checkPagePermission = () => {
        const currentPageName = 'Rate Type';
        const permissions = userPermissions || {};

        if (permissions.page_name === currentPageName) {
            return {
                read: permissions.read_permission === 1,
                new: permissions.new_permission === 1,
                modify: permissions.modify_permission === 1,
                delete: permissions.delete_permission === 1,
            };
        }

        return {
            read: false,
            new: false,
            modify: false,
            delete: false,
        };
    };

    const permissions = checkPagePermission();

    // Function to determine if a field should be read-only based on permissions
    const isFieldReadOnly = (fieldName) => {
        if (permissions.read) {
            // If user has read permission, check for other specific permissions
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
    };


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
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Rate Type Details", 10, 10);

        // Modify tableData to exclude the index number
        const tableData = rows.map((row) => [
            row['id'],
            row['driverid'],
            row['ratename'],
            row['active'],
            row['starttime'],
            row['closetime']
        ]);

        pdf.autoTable({
            head: [['sno', 'Driver ID', 'Rate Type', 'Active', 'Start Time', 'Close Time']],
            body: tableData,
            startY: 20,
        });

        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Rate_Type.pdf');
    };


    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
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
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [info]);


    const [book, setBook] = useState({
        driverid: '',
        stations: '',
        ratename: '',
        validity: '',
        active: '',
        starttime: '',
        closetime: '',
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

    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
    };


    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            driverid: '',
            stations: '',
            ratename: '',
            validity: '',
            active: '',
            starttime: '',
            closetime: '',
        }));
        setSelectedCustomerData({});
    };
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);
    const handleAdd = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            const ratename = book.ratename;
            if (!ratename) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                return;
            }
            try {
                const updatedBook = {
                    ...book,
                    starttime: starttime,
                    closetime: closetime,
                };
                await axios.post('http://localhost:8081/ratetype', updatedBook);
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } else {
            // Display a warning or prevent the action
            setWarning(true);
            setWarningMessage("You do not have permission.");
        }
    };

    const handleClick = async (event, actionName, driverid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.read) {
                    const response = await axios.get('http://localhost:8081/ratetype');
                    const data = response.data;
                    if (data.length > 0) {
                        setRows(data);
                        setSuccess(true);
                        setSuccessMessage("Successfully listed");
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage("No data found");
                    }
                } else {
                    setWarning(true);
                    setWarningMessage("You do not have permission.");
                }
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://localhost:8081/ratetype/${selectedCustomerData?.driverid || book.driverid}`);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                    handleCancel();
                    setRows([]);
                } else {
                    setWarning(true);
                    setWarningMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.driverid === driverid);
                    const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                    await axios.put(`http://localhost:8081/ratetype/${selectedCustomerData?.driverid || book.driverid}`, updatedCustomer);
                    setSuccess(true);
                    setSuccessMessage("Successfully updated");
                    handleCancel();
                    setRows([]);
                } else {
                    setWarning(true);
                    setWarningMessage("You do not have permission.");
                }
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch (err) {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    return (
        <div className="ratetype-form Scroll-Style-hide">
            <form onSubmit={handleClick}>
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-RateType">
                            <div className="input-field">
                                <div className="input">
                                    <div className="icone">
                                        <BadgeIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="ID"
                                        name="driverid"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.driverid || book.driverid}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input" style={{ width: "300px" }}>
                                    <div className="icone">
                                        <WarehouseIcon color="action" />
                                    </div>

                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        id="free-solo-demo-customerType"
                                        freeSolo
                                        onChange={(event, value) => handleAutocompleteChange(event, value, "stations")}
                                        value={Stations.find((option) => option.Option)?.label || selectedCustomerData?.stations || ''}
                                        options={Stations.map((option) => ({
                                            label: option.Option,
                                        }))}
                                        getOptionLabel={(option) => option.label || selectedCustomerData?.stations || ''}
                                        renderInput={(params) => {
                                            return (
                                                <TextField   {...params} label="Stations" name="stations" inputRef={params.inputRef} />
                                            )
                                        }
                                        }
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <RateReviewIcon color="action" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Rate Name"
                                        name="ratename"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ratename || book.ratename}
                                        onChange={handleChange}
                                    />
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
                                        label="Validity"
                                        name="validity"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.validity || book.validity}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input radio" style={{ width: "120px" }}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                            Active
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="active"
                                            autoComplete="new-password"
                                            value={selectedCustomerData?.active || book.active}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value="yes"
                                                control={<Radio />}
                                                label="Yes"
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={<Radio />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="input times">
                                    <label>Start Time</label>
                                    <input
                                        type="time"
                                        value={formData.starttime || selectedCustomerData.starttime || book.starttime}
                                        onChange={(event) => {
                                            setBook({ ...book, starttime: event.target.value });
                                            setStartTime(event.target.value);
                                        }}
                                        name="starttime"
                                    />
                                </div>
                                <div className="input times">
                                    <label>Close Time</label>
                                    <input
                                        type="time"
                                        value={formData.closetime || selectedCustomerData.closetime || book.closetime}
                                        onChange={(event) => {
                                            setBook({ ...book, closetime: event.target.value });
                                            setCloseTime(event.target.value);
                                        }}
                                        name="closetime"
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "100px" }}>
                                    <Button variant="contained" onClick={handleAdd} disabled={isFieldReadOnly("new")}>Add</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {error &&
                    <div className='alert-popup Error' >
                        <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{errorMessage}</p>
                    </div>
                }
                {warning &&
                    <div className='alert-popup Warning' >
                        <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{warningMessage}</p>
                    </div>
                }
                {success &&
                    <div className='alert-popup Success' >
                        <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{successMessage}</p>
                    </div>
                }
                {info &&
                    <div className='alert-popup Info' >
                        <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                        <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                        <p>{infoMessage}</p>
                    </div>
                }
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
                                onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
                            />
                        ))}
                    </StyledSpeedDial>
                </Box>
                <div className="table-bookingCopy-RateType">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
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

export default RateType