import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./Ratevalidity.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";


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
    { field: "ratename", headerName: "Rate Validity", width: 130 },
    { field: "ReMarks", headerName: "Remarks", width: 130 },
    { field: "active", headerName: "Active", width: 130 },
    { field: "fromdate", headerName: "From Date", width: 130 },
    { field: "todate", headerName: "To Date", width: 130 },
];

const Ratevalidity = () => {

    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [formData] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

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
        ratename: '',
        fromdate: '',
        todate: '',
        ReMarks: '',
        active: '',

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
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        // const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: formattedDate,
        }));
    };
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            driverid: '',
            ratename: '',
            fromdate: '',
            todate: '',
            ReMarks: '',
            active: '',

        }));
        setSelectedCustomerData({});
    };
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);
    const handleAdd = async () => {
        const ratename = book.ratename;
        if (!ratename) {
            setError(true);
            setErrorMessage("fill mantatory fields");
            return;
        }
        try {
            await axios.post('http://localhost:8081/ratevalidity', book);
            handleCancel();
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    const handleClick = async (event, actionName, driverid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get('http://localhost:8081/ratevalidity');
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
            } else if (actionName === 'Cancel') {
                handleCancel();
            } else if (actionName === 'Delete') {
                await axios.delete(`http://localhost:8081/ratevalidity/${driverid}`);
                setSelectedCustomerData(null);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
            } else if (actionName === 'Edit') {
                const selectedCustomer = rows.find((row) => row.driverid === driverid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://localhost:8081/ratevalidity/${driverid}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();
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
        <div className="RateValidity-form Scroll-Style-hide">
            <form action="">
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-RateValidity">
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
                                <div className="input" style={{ width: "30%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/* <DemoItem label="From Date"> */}
                                        <DatePicker
                                            label='From Date'
                                            format="DD/MM/YYYY"
                                            defaultValue={dayjs()}
                                            value={formData.fromdate || selectedCustomerData.fromdate ? dayjs(selectedCustomerData.fromdate) : null}
                                            onChange={(date) => handleDateChange(date, 'fromdate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.fromdate} />
                                            )}
                                        </DatePicker>
                                    </LocalizationProvider>
                                </div>
                                <div className="input" style={{ width: "30%" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/* <DemoItem label="To Date"> */}
                                        <DatePicker
                                            label='To Date'
                                            format="DD/MM/YYYY"
                                            defaultValue={dayjs()}
                                            value={formData.todate || selectedCustomerData.todate ? dayjs(selectedCustomerData.todate) : null}
                                            onChange={(date) => handleDateChange(date, 'todate')}
                                        >
                                            {({ inputProps, inputRef }) => (
                                                <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.todate} />
                                            )}
                                        </DatePicker>
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
                                        label="ReMarks"
                                        name="ReMarks"
                                        autoComplete="new-password"
                                        value={selectedCustomerData?.ReMarks || book.ReMarks}
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
                                <div className="input" style={{ width: "100px" }}>
                                    <Button variant="contained" onClick={handleAdd}>Add</Button>
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
                <div className="table-bookingCopy-RateValidity">
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
            </form >
        </div >
    )
}

export default Ratevalidity