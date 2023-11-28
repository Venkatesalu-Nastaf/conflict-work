import React, { useState, useEffect } from 'react';
import "./CoveringSubmit.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const CoveringSubmit = () => {
    const [rows] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [customer, setCustomer] = useState("");
    const [bankOptions, setBankOptions] = useState([]);

    const hidePopup = () => {
        setError(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleInputChange = (event, newValue) => {
        if (event.target.name === 'customer') {
            setCustomer(newValue ? newValue.label : '');
        }
    };

    useEffect(() => {
        Organization()
            .then((data) => {
                if (data) {
                    console.log('organization name', data);
                    setBankOptions(data);
                } else {
                    setError(true);
                    setErrorMessage('Failed to fetch organization options.');
                }
            })
            .catch(() => {
                setError(true);
                setErrorMessage('Failed to fetch organization options.');
            });
    }, []);

    return (
        <div className="CoveringSubmit-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-CoveringSubmit">
                            <div className="input-field" style={{ justifyContent: 'center' }}>
                                <div className="input" style={{ width: "230px" }}>
                                    <div className="icone">
                                        <HailOutlinedIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        size="small"
                                        value={customer}
                                        options={bankOptions}
                                        onChange={(event, value) => handleInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" inputRef={params.inputRef} />
                                            );
                                        }}
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
                            <div className="input-field" >
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <select name="branch" className="input-select">
                                        <option value="" disabled selected>Select a city</option>
                                        <option value="all">Chennai</option>
                                        <option value="billed">Bangalore</option>
                                        <option value="notbilled">Hyderabad</option>
                                    </select>
                                </div>
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
                <div className="table-bookingCopy-CoveringSubmit">
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
            {error &&
                <div className='alert-popup Error' >
                    <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                    <p>{errorMessage}</p>
                </div>
            }
        </div>
    )
}

export default CoveringSubmit