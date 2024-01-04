import React, { useState, useEffect, useCallback } from 'react';
import "./Customer.css";
import jsPDF from 'jspdf';
import axios from "axios";
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { UnderGroup, states, Customertype, Select, Service_Station } from "./Customerdata";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox, Switch } from "@mui/material";

// ICONS
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RateReviewIcon from "@mui/icons-material/RateReview";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CustomInput from './CustomInput';

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

// TABLE START
const columns = [
  { field: "customerId", headerName: "Customer ID", width: 130 },
  { field: "customer", headerName: "Name", width: 160 },
  { field: "customeremail", headerName: "E-mail", width: 160 },
  { field: "address1", headerName: "Address", width: 130 },
  { field: "phoneno", headerName: "Phone", width: 160 },
  { field: "rateType", headerName: "Rate_Type", width: 130 },
  { field: "gstnumber", headerName: "GST_NO", width: 160 },
  { field: "state", headerName: "State", width: 160 },
  { field: "enableDriverApp", headerName: "Driver_App", width: 130 },
];
// TABLE END

const Customer = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleButtonClick = () => {
    setIsInputVisible(!isInputVisible);
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
    pdf.text("Customer Details", 10, 10);

    // Modify tableData to exclude the index number
    const tableData = rows.map((row) => [
      row['id'],
      row['customerId'],
      row['customer'],
      row['address1'],
      row['phoneno'],
      row['Active'],
      row['active'],
      row['gstTax'],
      row['state'],
      row['enableDriverApp']
    ]);

    pdf.autoTable({
      head: [['Sno', 'Customer ID', 'Name', 'Address', 'Phone', 'Active', 'Rate_Type', 'GST_NO', 'State', 'Driver_App']],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Customer_Details.pdf');
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const [book, setBook] = useState({
    customerId: '',
    name: '',
    customer: '',
    customerType: '',
    servicestation: '',
    date: '',
    address1: '',
    address2: '',
    city: '',
    customeremail: '',
    rateType: '',
    opBalance: '',
    phoneno: '',
    underGroup: '',
    gstTax: '',
    acType: '',
    entity: '',
    printBill: '',
    userName: '',
    bookName: '',
    division: '',
    hourRoundedOff: '',
    selectOption: '',
    inclAddress: '',
    active: '',
    state: '',
    gstnumber: '',
    SalesPerson: '',
    salesPercentage: '',
    billingGroup: '',
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

  const handleAutocompleteChange = (event, newValue, name) => {
    const selectedOption = newValue ? newValue.label : '';

    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  const handleDateChange = (date) => {
    const startOfDay = dayjs(date).format('DD/MM/YYYY');
    setBook((prevBook) => ({
      ...prevBook,
      date: startOfDay,
    }));
    setSelectedCustomerData((prevBook) => ({
      ...prevBook,
      date: startOfDay,
    }));
  };

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      customerId: '',
      name: '',
      customer: '',
      customerType: '',
      servicestation: '',
      date: '',
      address1: '',
      address2: '',
      city: '',
      customeremail: '',
      rateType: '',
      opBalance: '',
      phoneno: '',
      underGroup: '',
      gstTax: '',
      acType: '',
      printBill: '',
      userName: '',
      bookName: '',
      division: '',
      hourRoundedOff: '',
      selectOption: '',
      inclAddress: '',
      active: '',
      entity: '',
      state: '',
      gstnumber: '',
      SalesPerson: '',
      salesPercentage: '',
      billingGroup: '',
    }));
    setSelectedCustomerData({});
  };

  const handleRowClick = useCallback((params) => {
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);

  const handleAdd = async () => {
    const name = book.name;
    if (!name) {
      setError(true);
      setErrorMessage("fill mantatory fields");
      return;
    }
    try {
      await axios.post('http://localhost:8081/customers', book);
      handleCancel();
      setSuccess(true);
      setSuccessMessage("Successfully Added");
    } catch {
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleClick = async (event, actionName, customerId) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        const response = await axios.get('http://localhost:8081/customers');
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
        await axios.delete(`http://localhost:8081/customers/${book.customerId || selectedCustomerData.customerId}`);
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        const selectedCustomer = rows.find((row) => row.customerId === customerId);
        const updatedCustomer = {
          ...selectedCustomer,
          ...selectedCustomerData,
          date: selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null,
        };
        await axios.put(`http://localhost:8081/customers/${book.customerId || selectedCustomerData.customerId}`, updatedCustomer);
        handleCancel();
      } else if (actionName === 'Add') {
        handleAdd();
      }
    } catch {
      setError(true);
      setErrorMessage("Check Network connection");
    }
  };
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });

  const reversedRows = [...rows].reverse();
  return (
    <div className="form-container">
      <div className="customer-form">
        <form onSubmit={handleClick}>
          <span className="Title-Name">Customer</span>
          <div className="Customer-page-header">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  name="customerId"
                  label="Customer ID"
                  id="standard-size-normal"
                  autoComplete="new-password"
                  value={selectedCustomerData?.customerId || book.customerId}
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="customer"
                  label="Organization Name"
                  value={selectedCustomerData?.customer || book.customer}
                  autoComplete="new-password"
                  variant="standard"
                  onChange={handleChange}
                  name="customer"
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="name"
                  label="Organizer Name"
                  value={selectedCustomerData?.name || book.name}
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-customerType"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "customerType")}
                  value={Customertype.find((option) => option.Option)?.label || selectedCustomerData?.customerType || ''}
                  options={Customertype.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.customerType || book.customerType || ''}
                  renderInput={(params) => {
                    return (
                      <TextField   {...params} label="Customer Type" name="customerType" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    format="DD/MM/YYYY"
                    value={selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null}
                    onChange={handleDateChange}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} name='date' inputRef={inputRef} value={selectedCustomerData?.date} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="customeremail"
                  label="Email"
                  autoComplete="new-password"
                  value={selectedCustomerData?.customeremail || book.customeremail}
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <RateReviewIcon color="action" />
                </div>
                <TextField
                  name="rateType"
                  label="Rate Type"
                  autoComplete="new-password"
                  value={selectedCustomerData?.rateType || book.rateType}
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  name="opBalance"
                  label="OP Balanace"
                  autoComplete="new-password"
                  value={selectedCustomerData?.opBalance || book.opBalance}
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <LocalPhoneIcon color="action" />
                </div>
                <TextField
                  name="phoneno"
                  label="Phone"
                  autoComplete="new-password"
                  value={selectedCustomerData?.phoneno || book.phoneno}
                  onChange={handleChange}
                  id="Phone"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    A/C Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="acType"
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={selectedCustomerData?.acType || book.acType}
                  >
                    <FormControlLabel
                      value="Dr"
                      control={<Radio />}
                      label="Dr"
                    />
                    <FormControlLabel
                      value="Cr"
                      control={<Radio />}
                      label="Cr"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="Customer-page-secend-containers">
            <div className="input-field  checkbox">
              <div className="input" style={{ width: "400px" }}>
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="address1"
                  value={selectedCustomerData?.address1 || book.address1}
                  label="Address"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <FormControlLabel
                name="printBill"
                value="Printbill"
                control={<Checkbox size="small" />}
                label="Print Bill"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.printBill || book.printBill)}
              />
              <FormControlLabel
                name="userName"
                value="Username"
                control={<Checkbox size="small" />}
                label="User Name"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.userName || book.userName)}
              />
              <FormControlLabel
                name="bookName"
                value="Bookname"
                control={<Checkbox size="small" />}
                label="Book Name"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.bookName || book.bookName)}
              />
              <FormControlLabel
                name="division"
                value="Divistion"
                control={<Checkbox size="small" />}
                label="Divistion"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.division || book.division)}
              />
              <FormControlLabel
                size="small"
                name="hourRoundedOff"
                value="Hourroundedoff"
                control={<Checkbox size="small" />}
                label="Hour Roundedoff"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.hourRoundedOff || book.hourRoundedOff)}
              />
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "400px" }}>
                <div className="icone">
                  <HomeTwoToneIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="address2"
                  value={selectedCustomerData?.address2 || book.address2}
                  id="remark"
                  autoComplete="new-password"
                  onChange={handleChange}
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <DomainAddIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "servicestation")}
                  value={Service_Station.find((option) => option.optionvalue)?.label || selectedCustomerData.servicestation || book.servicestation || ''}
                  options={Service_Station.map((option) => ({
                    label: option.optionvalue,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData.servicestation || book.servicestation || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="Service Station" name="servicestation" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-select"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "selectOption")}
                  value={Select.find((option) => option.Option)?.label || selectedCustomerData?.selectOption || ''}
                  options={Select.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.selectOption || ''}
                  renderInput={(params) => {
                    return (
                      <TextField   {...params} label="Select" name="selectOption" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <div className="icone">
                  <StoreIcon color="action" />
                </div>
                <TextField
                  name="entity"
                  autoComplete="new-password"
                  value={selectedCustomerData?.entity || book.entity}
                  onChange={handleChange}
                  label="Entity"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "400px" }}>
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="city"
                  id="address3"
                  value={selectedCustomerData?.city || book.city}
                  autoComplete="new-password"
                  onChange={handleChange}
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-state"
                  freeSolo
                  onChange={(event, value) => handleAutocompleteChange(event, value, "state")}
                  value={states.find((option) => option.state)?.label || selectedCustomerData?.state || ''}
                  options={states.map((option) => ({
                    label: option.state,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.state || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="State" name="state" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-underGroup"
                  freeSolo
                  onChange={(event, value) => handleAutocompleteChange(event, value, "underGroup")}
                  value={UnderGroup.find((option) => option.option)?.label || selectedCustomerData?.underGroup || ''}
                  options={UnderGroup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.underGroup || ''}
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="UnderGroup" name="underGroup" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input dropdown">
                <label htmlFor="">GST</label>
                <select name="" id="">
                  <option value="">None</option>
                  <option value="">5%</option>
                  <option value="">12.5%</option>
                </select>
              </div>
            </div>
          </div>
          <div className="detail-container-main-customer">
            <div className="input-field">
              <div className="input" style={{ width: "400px" }}>
                <FormLabel>BillingGroup</FormLabel>
                <Switch label='' onClick={handleButtonClick} />
                {isInputVisible && (
                  <CustomInput />
                )}
              </div>
              <div className="input">
                <TextField
                  name="gstnumber"
                  label="GST-Number"
                  value={selectedCustomerData?.gstnumber || book.gstnumber}
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="gstin"
                  size='small'
                />
              </div>
              <div className="input">
                <TextField
                  name="SalesPerson"
                  value={selectedCustomerData?.SalesPerson || book.SalesPerson}
                  autoComplete="new-password"
                  onChange={handleChange}
                  label="Sales-Person"
                  id="SalesPerson"
                  size='small'
                />
              </div>
              <div className="input">
                <TextField
                  type='number'
                  name="salesPercentage"
                  value={selectedCustomerData?.salesPercentage || book.salesPercentage}
                  autoComplete="new-password"
                  onChange={handleChange}
                  label="Percentage"
                  id="salesPercentage"
                  size='small'
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <Button variant="contained" onClick={handleAdd}>Add</Button>
              </div>
            </div>
            {error &&
              <div className='alert-popup Error' >
                <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{errorMessage}</p>
              </div>
            }
            {info &&
              <div className='alert-popup Info' >
                <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{infoMessage}</p>
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
            <div className="SpeedDial" style={{ padding: '26px', }}>
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
            </div>
          </div>
          <div className="customer-list-table-container">
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
            <div className="table-customer-lists">
              <DataGrid
                rows={reversedRows}
                columns={columns}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customer;
