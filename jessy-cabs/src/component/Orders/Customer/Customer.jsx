import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from 'file-saver';
import { ExportToCsv } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import {
  UnderGroup,
  states,
  Customertype,
  Select,
  BillingGroup,
} from "./Customerdata";

import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import "./Customer.css";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import dayjs from "dayjs";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

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
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "printName", headerName: "Customer_Name", width: 130 },
  { field: "address1", headerName: "Address", width: 130 },
  { field: "phoneno", headerName: "Phone", width: 90 },
  { field: "active", headerName: "Active", width: 160 },
  { field: "customerId", headerName: "ID", width: 130 },
  { field: "rateType", headerName: "Rate_Type", width: 130 },
  { field: "gstTax", headerName: "GST_NO", width: 130 },
  { field: "state", headerName: "State", width: 130 },
  { field: "enableDriverApp", headerName: "Driver_App", width: 130 },
];

const Customer = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  // const [showOptions, setShowOptions] = useState(false);

  const [rows, setRows] = useState([]);
  const [actionName] = useState('');


  const handleDownload = (format) => {
    // Perform data conversion and export based on the selected format
    if (format === 'excel') {
      const csvExporter = new ExportToCsv({
        filename: 'table-data.csv',
        useKeysAsHeaders: true, // Include header row
      });
      const csvData = rows.map(row => {
        // Customize this logic to match your table's column structure
        return {
          Sno: row.id,
          Customer_Name: row.printName,
          Address: row.address1,
          Phone: row.phoneno,
          Active: row.active,
          ID: row.customerId,
          Rate_Type: row.rateType,
          GST_NO: row.gstTax,
          State: row.state,
          Driver_App: row.enableDriverApp,
        };
      });
      const csvFormattedData = csvExporter.generateCsv(csvData, true);
      const blob = new Blob([csvFormattedData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'table-data.csv');
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      doc.autoTable({
        head: [columns.map(column => column.headerName)],
        body: rows.map(row => columns.map(column => row[column.field])),
      });
      doc.save('table-data.pdf');
    }
  };


  const [book, setBook] = useState({
    customerId: '',
    name: '',
    printName: '',
    customerType: '',
    date: '',
    address1: '',
    address2: '',
    city: '',
    email: '',
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
    state: '',
    entity: '',
    enableDriverApp: '',
    billingGroup: '',
  });

  const [error, setError] = useState(false);

  // const handleButtonClick = () => {
  //   setShowOptions(!showOptions);
  // };

  // const handleOptionClick = (option) => {
  //   // Implement your logic for handling the option (e.g., downloading the corresponding file)
  //   console.log(`Downloading ${option} file...`);
  // };

  // const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, checked } = event.target;
    const { value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
    setBook((prevBook) => ({
      ...prevBook,
      [name]: checked,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
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


  const handleDateChange = (date) => {
    const startOfDay = dayjs(date).startOf('day').format();
    setBook((prevBook) => ({
      ...prevBook,
      date: startOfDay,
    }));
  };

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      customerId: '',
      name: '',
      printName: '',
      customerType: '',
      date: '',
      address1: '',
      address2: '',
      city: '',
      email: '',
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
      state: '',
      entity: '',
      enableDriverApp: '',
      billingGroup: '',
    }));
    setSelectedCustomerData({});

  };

  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
  }, []);

  const handleClick = async (event, actionName) => {
    event.preventDefault();

    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/customers');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        // Perform the desired action when the "Delete" button is clicked
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        // Perform the desired action when the "Edit" button is clicked
      } else if (actionName === 'Add') {
        await axios.post('http://localhost:8081/customers', book);
        console.log(book);
        // navigate('/home/orders/supplier');
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

  const updateItems = ["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id."]; // Example data for update items

  return (
    <div className="form-container">
      <div className="customer-form">
        <form onSubmit={handleClick}>
          <span className="Title-Name">Customer Master</span>
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
                  value={selectedCustomerData.customerId || book.customerId}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  variant="standard"
                  autoFocus
                />
              </div>

              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="email"
                  label="Name"
                  value={selectedCustomerData.name || book.name}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.name || !!book.name, }}
                  autoComplete="new-password"
                  variant="standard"
                  onChange={handleChange}
                  name="name"
                  autoFocus
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="Print Name"
                  label="Print Name"
                  value={selectedCustomerData.printName || book.printName}
                  // InputLabelProps={{
                  //   shrink: !!selectedCustomerData.printName || !!book.printName,
                  // }}
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="printName"
                  autoFocus
                />
              </div>
              <div className="input">
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-customerType"
                  freeSolo
                  sx={{ mt: 1, width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "customerType")}
                  value={selectedCustomerData.customerType ? selectedCustomerData.customerType : null}
                  options={Customertype.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => (
                    <TextField {...params} label="Customer Type" name="customerType" inputRef={params.inputRef} />
                  )}
                /> */}

                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-customerType"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "customerType")}
                  value={Customertype.find((option) => option.Option)?.label || ''}
                  options={Customertype.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData.customerType || ''
                    return (
                      <TextField   {...params} label="Customer Type" name="customerType" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>


              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Date">
                    <DatePicker
                      value={selectedCustomerData.date ? dayjs(selectedCustomerData.date) : null}
                      onChange={handleDateChange}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData.date} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  label="Email"
                  autoComplete="new-password"
                  value={selectedCustomerData.email || book.email}
                  // InputLabelProps={{
                  //   shrink: !!selectedCustomerData.email || !!book.email,
                  // }}
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
                  value={selectedCustomerData.rateType || book.rateType}
                  // InputLabelProps={{
                  //   shrink: !!selectedCustomerData.rateType || !!book.rateType,
                  // }}
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
                  value={selectedCustomerData.opBalance || book.opBalance}
                  // InputLabelProps={{
                  //   shrink: !!selectedCustomerData.opBalance || !!book.opBalance,
                  // }}
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
                  value={selectedCustomerData.phoneno || book.phoneno}
                  // InputLabelProps={{
                  //   shrink: !!selectedCustomerData.phoneno || !!book.phoneno,
                  // }}
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
                    value={selectedCustomerData.acType || book.acType}
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
          <div className="Customer-page-secend-container">
            <div className="Customer-page-secend-container-left">
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="address1"
                    value={selectedCustomerData.address1 || book.address1}
                    // InputLabelProps={{
                    //   shrink: !!selectedCustomerData.address1 || !!book.address1,
                    // }}
                    label="Address"
                    autoComplete="new-password"
                    onChange={handleChange}
                    id="remark"
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <HomeTwoToneIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="address2"
                    value={selectedCustomerData.address2 || book.address2}
                    id="remark"
                    autoComplete="new-password"
                    onChange={handleChange}
                    sx={{ m: 1, width: "200ch" }}
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
                    value={selectedCustomerData.city || book.city}
                    autoComplete="new-password"
                    onChange={handleChange}
                    sx={{ m: 1, width: "200ch" }}
                    variant="standard"
                  />
                </div>
              </div>
            </div>
            <div className="Customer-page-secend-container-right">
              <div className="textboxlist">
                {updateItems.map((item, index) => (
                  <div className="textboxlist-customer list-update" key={`update-item-${index}`}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="detail-container-main-customer">
            <div className="input-field checkbox">
              <FormControlLabel
                name="printBill"
                value="Printbill"
                control={<Checkbox size="small" />}
                label="Print Bill"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData.printBill || book.printBill)}
              />
              <FormControlLabel
                name="userName"
                value="Username"
                control={<Checkbox size="small" />}
                label="User Name"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData.userName || book.userName)}

              />
              <FormControlLabel
                name="bookName"
                value="Bookname"
                control={<Checkbox size="small" />}
                label="Book Name"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData.bookName || book.bookName)}

              />
              <FormControlLabel
                name="division"
                value="Divistion"
                control={<Checkbox size="small" />}
                label="Divistion"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData.division || book.division)}

              />
              <FormControlLabel
                size="small"
                name="hourRoundedOff"
                value="Hourroundedoff"
                control={<Checkbox size="small" />}
                label="Hour Roundedoff"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData.hourRoundedOff || book.hourRoundedOff)}

              />
              <div className="input">
                {/* <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-select"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "selectOption")}
                  value={Select.find((option) => option.Option)?.label || ''}
                  options={Select.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => (
                    <TextField {...params} label="Select" name="selectOption" value={selectedCustomerData.selectOption} inputRef={params.inputRef} />
                  )}
                /> */}

                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-select"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "selectOption")}
                  value={Select.find((option) => option.Option)?.label || ''}
                  options={Select.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData.selectOption || ''
                    return (
                      <TextField   {...params} label="Select" name="selectOption" inputRef={params.inputRef} />
                    )
                  }
                  }
                />

              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-state"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "state")}
                  value={states.find((option) => option.state)?.label || ''}
                  options={states.map((option) => ({
                    label: option.state,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData.state || ''
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
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "underGroup")}
                  value={UnderGroup.find((option) => option.option)?.label || ''}
                  options={UnderGroup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData.underGroup || ''
                    return (
                      <TextField {...params} label="UnderGroup" name="underGroup" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-billingGroup"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "billingGroup")}
                  value={BillingGroup.find((option) => option.option)?.label || ''}
                  options={BillingGroup.map((option) => ({
                    label: option.option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => {
                    params.inputProps.value = selectedCustomerData.billingGroup || ''
                    return (
                      <TextField {...params} label="Billing Group" name="billingGroup" inputRef={params.inputRef} />
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
                  value={selectedCustomerData.entity || book.entity}
                  // InputLabelProps={{
                  //   shrink: !!selectedCustomerData.entity || !!book.entity,
                  // }}
                  onChange={handleChange}
                  label="Entity"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Incl. Address
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="inclAddress"
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={selectedCustomerData.inclAddress || book.inclAddress}

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
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={selectedCustomerData.active || book.active}

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
              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Enable Driver App
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="enableDriverApp"
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={selectedCustomerData.enableDriverApp || book.enableDriverApp}

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

              <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    GST Tax
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gstTax"
                    autoComplete="new-password"
                    onChange={handleChange}
                    // value={selectedCustomerData.gstTax || ''}
                    value={selectedCustomerData.gstTax || book.gstTax}

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
            </div>

            {error && <p>Something went wrong!</p>}

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
                      onClick={(event) => handleClick(event, action.name)}
                    />
                  ))}
                </StyledSpeedDial>
              </Box>
            </div>
          </div>
          <div className="customer-list-table-container">
            {/* <div className="input" style={{ width: "70px" }}>
              <Button variant="contained">Download</Button>
            </div> */}

            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    Dashboard
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => { handleDownload('excel'); popupState.close(); }}>Excel</MenuItem>
                    <MenuItem onClick={() => { handleDownload('pdf'); popupState.close(); }}>PDF</MenuItem>
                  </Menu>

                </React.Fragment>
              )}
            </PopupState>

            <div className="table-customer-list">

              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              // checkboxSelection
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customer;
