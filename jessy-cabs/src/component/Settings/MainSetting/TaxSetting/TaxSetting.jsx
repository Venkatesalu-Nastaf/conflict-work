import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import './TaxSetting.css';
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { TaxType } from './TaxSettingData.js'
import { DataGrid } from "@mui/x-data-grid";
// import IconButton from '@mui/material/IconButton';
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import { styled } from "@mui/material/styles";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
// FontAwesomeIcon Link
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

// date


// TABLE START
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "DateTaxFrom", headerName: "From_Date", width: 130 },
    { field: "DateTaxTo", headerName: "To_Date", width: 130 },
    { field: "STax", headerName: "STax", width: 160 },
    { field: "SBCess", headerName: "SBCess", width: 130 },
    { field: "KKCess", headerName: "KK_Cess", width: 130 },
    // { field: "Rid", headerName: "Rid", width: 130 },
    { field: "STax_Des", headerName: "StaxDes", width: 130 },
    { field: "SBCess_Des", headerName: "SBCessDes", width: 130 },
    { field: "KKCess_Des", headerName: "KKCessDes", width: 130 },
    { field: "taxtype", headerName: "TAX", width: 130 },
];
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
    // { icon: <BookmarkAddedIcon />, name: "Add" },
];

// Table End

const TaxSetting = () => {
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [formData] = useState({});
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

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
        DateTaxFrom: '',
        DateTaxTo: '',
        STax: '',
        SBCess: '',
        KKCess: '',
        STax_Des: '',
        SBCess_Des: '',
        KKCess_Des: '',
        taxtype: '',
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
            DateTaxFrom: '',
            DateTaxTo: '',
            STax: '',
            SBCess: '',
            KKCess: '',
            STax_Des: '',
            SBCess_Des: '',
            KKCess_Des: '',
            taxtype: '',
        }));
        setSelectedCustomerData({});
    };
    const handleRowClick = useCallback((params) => {
        console.log(params.row);
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);

    const handleAdd = async () => {
        try {
            console.log('Add button clicked');
            const response = await axios.post('http://localhost:8081/taxsettings', book);
            console.log('Customer added:', response.data);
            handleCancel(); // Assuming you have defined the handleCancel function to perform the necessary actions after the POST request is successful
        } catch (error) {
            console.error('Error adding customer:', error);
            // You can add error handling code here, like displaying an error message to the user
        }
    };
    const handleClick = async (event, actionName, id) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                console.log('List button clicked');
                const response = await axios.get('http://localhost:8081/taxsettings');
                const data = response.data;
                setRows(data);
            } else if (actionName === 'Cancel') {
                console.log('Cancel button clicked');
                handleCancel();
            } else if (actionName === 'Delete') {
                console.log('Delete button clicked');
                await axios.delete(`http://localhost:8081/taxsettings/${id}`);
                console.log('Customer deleted');
                setSelectedCustomerData(null);
                handleCancel();
            } else if (actionName === 'Edit') {
                console.log('Edit button clicked');
                const selectedCustomer = rows.find((row) => row.id === id);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`http://localhost:8081/taxsettings/${id}`, updatedCustomer);
                console.log('Customer updated');
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
        <div className="TaxSetting-form">
            <form onSubmit={handleClick}>
                <div className="TaxSetting-header">
                    <div className="input-field" style={{ padding: '0px 15px' }}>
                        <div className="input">
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Date Tax From">
                                    <DatePicker
                                        defaultValue={today}
                                        minDate={tomorrow}
                                        views={["year", "month", "day"]}
                                    />
                                </DemoItem>
                            </LocalizationProvider> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Date Tax From">
                                    <DatePicker
                                        value={formData.DateTaxFrom || selectedCustomerData.DateTaxFrom ? dayjs(selectedCustomerData.DateTaxFrom) : null}
                                        onChange={(date) => handleDateChange(date, 'DateTaxFrom')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.DateTaxFrom} />
                                        )}
                                    </DatePicker>
                                </DemoItem>
                            </LocalizationProvider>
                        </div>
                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Date Tax To">
                                    <DatePicker
                                        value={formData.DateTaxTo || selectedCustomerData.DateTaxTo ? dayjs(selectedCustomerData.DateTaxTo) : null}
                                        onChange={(date) => handleDateChange(date, 'DateTaxTo')}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.DateTaxTo} />
                                        )}
                                    </DatePicker>
                                </DemoItem>
                            </LocalizationProvider>
                        </div>
                        <div className="input">
                            <div className="icone">
                                <FontAwesomeIcon icon={faNewspaper} size="xl" />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="STax"
                                label="STax"
                                name="STax"
                                autoComplete="new-password"
                                value={selectedCustomerData?.STax || book.STax}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="SBCess"
                                label="SBCess"
                                name="SBCess"
                                autoComplete="new-password"
                                value={selectedCustomerData?.SBCess || book.SBCess}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="KKCess"
                                label="KKCess"
                                name="KKCess"
                                autoComplete="new-password"
                                value={selectedCustomerData?.KKCess || book.KKCess}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                    </div>
                    <div className="input-field" style={{ padding: '0px 15px' }}>
                        <div className="input">
                            <div className="icone">
                                <FontAwesomeIcon icon={faNewspaper} size="xl" />
                            </div>
                            <TextField
                                margin="normal"
                                size="small"
                                id="STax-Dess"
                                label="STax-Des"
                                name="STax_Des"
                                autoComplete="new-password"
                                value={selectedCustomerData?.STax_Des || book.STax_Des}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="SBCess-Des"
                                label="SBCess-Des"
                                name="SBCess_Des"
                                autoComplete="new-password"
                                value={selectedCustomerData?.SBCess_Des || book.SBCess_Des}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                margin="normal"
                                size="small"
                                id="KKCess"
                                label="KKCess-Des"
                                name="KKCess_Des"
                                autoComplete="new-password"
                                value={selectedCustomerData?.KKCess_Des || book.KKCess_Des}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        <div className="input">
                            <div className="icone">
                                <QuizOutlinedIcon color="action" />
                            </div>

                            <Autocomplete
                                fullWidth
                                size="small"
                                id="free-solo-demo-taxtype"
                                freeSolo
                                sx={{ width: "20ch" }}
                                onChange={(event, value) => handleAutocompleteChange(event, value, "taxtype")}
                                value={TaxType.find((option) => option.Option)?.label || ''}
                                options={TaxType.map((option) => ({
                                    label: option.Option,
                                }))}
                                getOptionLabel={(option) => option.label || ''}
                                renderInput={(params) => {
                                    params.inputProps.value = book.taxtype || selectedCustomerData?.taxtype || ''
                                    return (
                                        <TextField   {...params} label="Tax Type" name="taxtype" inputRef={params.inputRef} />
                                    )
                                }
                                }
                            />
                        </div>
                        <div className="input" style={{ width: "70px" }}>
                            <Button color="primary" variant="contained" onClick={handleAdd}>
                                Add
                            </Button>
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
                <div className="TaxSetting-table-container">
                    <div className="SpeedDial" style={{ padding: '26px', }}>
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
                    </div>
                    <div className="table-TaxSetting">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            onRowClick={handleRowClick}

                        />
                    </div>
                    <div className="input-field" style={{ marginTop: '-20px', marginLeft: '-25px', marginBottom: '25px' }}>
                        <div className="input" style={{ marginTop: '40px' }}>
                            <Button>
                                Refresh
                            </Button>
                        </div>
                        <div className="input" style={{ marginTop: '40px' }}>
                            <Button startIcon={<FontAwesomeIcon icon={faSave} size="lg" />} variant="contained">
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaxSetting