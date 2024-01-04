import React, { useState, useEffect } from 'react';
import "./GroupBilling.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from "@mui/material";
import { Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "billno", headerName: "Bill No", width: 130 },
    { field: "billdate", headerName: "Bill Date", width: 130 },
    { field: "tripno", headerName: "Trip No", width: 150 },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "Vehcileno", headerName: "Vehcile No", width: 150 },
    { field: "Vehciletype", headerName: "Vehcile Type", width: 150 },
    { field: "KMS", headerName: "KMS", width: 130 },
    { field: "hours", headerName: "Hours", width: 130 },
    { field: "days", headerName: "Days", width: 130 },
    { field: "duty", headerName: "Duty", width: 130 },
    { field: "advance", headerName: "Advance", width: 150 },
    { field: "gst", headerName: "GST%", width: 130 },
    { field: "permit", headerName: "Permit", width: 150 },
    { field: "parking", headerName: "Parking", width: 150 },
    { field: "netamount", headerName: "Net Amount", width: 130 },
    { field: "tripid", headerName: "Trip ID", width: 130 },
    { field: "username", headerName: "UserName", width: 150 },
];

const GroupBilling = () => {
    const [rows] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [customer, setCustomer] = useState("");
    const [bankOptions, setBankOptions] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

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
        <div className="GroupBilling-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main">
                    <div className="container-left">
                        <div className="copy-title-btn-GroupBilling">
                            <div className="input-field" >
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                                    </div>
                                    <TextField
                                        size="small"
                                        id="id"
                                        label="Invoice No"
                                        name="invoiceno"
                                        autoComplete='off'
                                    />
                                </div>
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
                                <div className="input">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Bill Date"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="input-field">
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
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    <select name="branch" className="input-select" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                                        <option value="" disabled>Select a city</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Bangalore">Bangalore</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input" style={{ width: "140px" }}>
                                    <Button variant="contained">View Bill</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="download-container">
                    <div className="Download-btn">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                                        Download
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem >Excel</MenuItem>
                                        <MenuItem >GST PDF</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                    <div className="input-field">
                        <div className="input" style={{ width: "140px" }}>
                            <Button variant="contained">Delete Invoice</Button>
                        </div>
                        <div className="input" >
                            <Button variant="contained">Delete Selected Bill</Button>
                        </div>
                    </div>
                </div>

                <div className="table-bookingCopy-GroupBilling">
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                    {error &&
                        <div className='alert-popup Error' >
                            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                            <p>{errorMessage}</p>
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default GroupBilling