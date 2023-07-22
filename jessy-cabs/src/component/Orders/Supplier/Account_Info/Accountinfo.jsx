import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./Accountinfo.css";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import InputAdornment from "@mui/material/InputAdornment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import StoreIcon from "@mui/icons-material/Store";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";
import { Undergroup, Vehicleinfo } from "./Accountinfo";
import SpeedDial from "@mui/material/SpeedDial";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const today = dayjs();
// const tomorrow = dayjs().add(1, "day");
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
const Accuntinfo = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [value, setValue] = React.useState("list");
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');

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

  // Table Start
  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "cperson", headerName: "Supplier_Name", width: 130 },
    { field: "accountNo", headerName: "Vehicle_No", width: 130 },
    { field: "address1", headerName: "Address", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "isRunning", headerName: "Active", width: 160 },
    { field: "vehicleInfo", headerName: "Owner_Type", width: 130 },
    { field: "vehCommission", headerName: "Percentage", width: 130 },
    { field: "rateType", headerName: "Rate_Type", width: 130 },
    { field: "autoRefresh", headerName: "Driver", width: 130 },
  ];

  const [book, setBook] = useState({
    accountNo: '',
    date: '',
    vehicleTravels: '',
    address1: '',
    cperson: '',
    streetNo: '',
    email: '',
    city: '',
    phone: '',
    vehCommission: '',
    rateType: '',
    printBill: '',
    underGroup: '',
    isRunning: '',
    entity: '',
    acType: '',
    vehicleInfo: '',
    autoRefresh: '',
  });

  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (event.target.type === 'checkbox') {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
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
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleChange = (event, newValue) => {
  //   const { name, value, checked, type } = event.target || {};

  //   if (type === "checkbox") {
  //     setBook((prevBook) => ({
  //       ...prevBook,
  //       [name]: checked,
  //     }));
  //     setSelectedCustomerData((prevData) => ({
  //       ...prevData,
  //       [name]: checked,
  //     }));
  //   } else if (typeof newValue !== "undefined") {
  //     setValue(newValue);
  //   } else {
  //     setBook((prevBook) => ({
  //       ...prevBook,
  //       [name]: value,
  //     }));
  //     setSelectedCustomerData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }
  // };

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
      accountNo: '',
      date: '',
      vehicleTravels: '',
      address1: '',
      cperson: '',
      streetNo: '',
      email: '',
      city: '',
      phone: '',
      vehCommission: '',
      rateType: '',
      printBill: '',
      underGroup: '',
      isRunning: '',
      entity: '',
      acType: '',
      vehicleInfo: '',
      autoRefresh: '',
    }));
    setSelectedCustomerData({});

  };

  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.accountNo);
  }, []);

  const handleClick = async (event, actionName, accountNo) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/accountinfo');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/accountinfo/${accountNo}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.accountNo === accountNo);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/accountinfo/${accountNo}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        await axios.post('http://localhost:8081/accountinfo', book);
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
    <div className="account-form">
      <form onSubmit={handleClick}>
        <span className="Title-Name">Accounting Info</span>
        <div className="detail-container-main-account">
          <div className="container-left-account">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>

                <TextField
                  name="accountNo"
                  label="Account No"
                  margin="normal"
                  size="small"
                  id="standard-size-normal"
                  autoComplete="new-password"
                  value={selectedCustomerData?.accountNo || book.accountNo}
                  onChange={handleChange}
                  variant="standard"
                  autoFocus
                />


                {/* <TextField
                  name="accountNo"
                  autoComplete="new-password"
                  value={selectedCustomerData.accountNo || book.accountNo}
                  onChange={handleChange}
                  label="Account No"
                  size="small"
                  id="accountno1"
                  variant="standard"
                  margin="normal"
                /> */}
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Date">
                    <DatePicker
                      value={selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null}
                      onChange={handleDateChange}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='date' value={selectedCustomerData?.date} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Date">
                    <DatePicker
                      value={selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null}
                      onChange={handleDateChange}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.date} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <MinorCrashIcon color="action" />
                </div>
                <TextField
                  name="vehicleTravels"
                  autoComplete="new-password"
                  value={selectedCustomerData?.vehicleTravels || book.vehicleTravels}
                  onChange={handleChange}
                  label="Vehicle/Travels"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "400px" }}>
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="address1"
                  autoComplete="new-password"
                  value={selectedCustomerData?.address1 || book.address1}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.address1 || !!book.address1, }}
                  label="Address"
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  name="cperson"
                  autoComplete="new-password"
                  value={selectedCustomerData?.cperson || book.cperson}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.cperson || !!book.cperson, }}
                  label="C Person"
                  id="cperson"
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
                  name="streetNo"
                  autoComplete="new-password"
                  value={selectedCustomerData?.streetNo || book.streetNo}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.streetNo || !!book.streetNo, }}
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  autoComplete="new-password"
                  value={selectedCustomerData?.email || book.email}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.email || !!book.email, }}
                  label="Email"
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
                  autoComplete="new-password"
                  value={selectedCustomerData?.city || book.city}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.city || !!book.city, }}
                  id="address3"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="phone"
                  autoComplete="new-password"
                  value={selectedCustomerData?.phone || book.phone}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.phone || !!book.phone, }}
                  label="Phone"
                  id="phone"
                  variant="standard"
                />
              </div>
            </div>
          </div>
          <div className="container-right-account">
            <div className="textbox-account">
              <div>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleTabChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="List" value="list" />
                        <Tab label="Online Password" value="online_password" />
                      </TabList>
                    </Box>
                    <TabPanel value="list">
                      <div className="booking-update">
                        <div className="booking-update-content list-update">
                          <span>
                            List Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Harum veniam quos laborum. Dicta
                            suscipit voluptas laboriosam rem alias praesentium,
                            facere aliquam sed iste, officia excepturi quos
                            corporis. Facilis, reiciendis et. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Cum nostrum
                            nihil minima debitis, nobis incidunt temporibus
                            velit accusantium dolore assumenda iusto quod
                            ratione praesentium maxime eveniet voluptas enim
                            animi laudantium.
                          </span>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="online_password">
                      <div
                        className="booking-update"
                        style={{
                          position: "relative",
                        }}
                      >
                        <div
                          className="booking-update-content list-update"
                          style={{ overflow: "hidden" }}
                        >
                          <span className="temp-pass">
                            <div className="input-field">
                              <div className="input">
                                <div className="icone">
                                  <RateReviewIcon color="action" />
                                </div>
                                <TextField
                                  name="temporary_password"
                                  autoComplete="new-password"
                                  value={selectedCustomerData?.customerId || book.customerId}
                                  onChange={handleChange}
                                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                                  label="Temporary Password"
                                  id="standard-size-normal"
                                  variant="standard"
                                />
                              </div>
                            </div>
                            <div
                              className="input-field"
                              style={{ display: "block" }}
                            >
                              <div className="input">
                                <Button variant="outlined">Update</Button>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="input-field">
            <div className="input">
              <TextField
                type="number"
                name='vehCommission'
                autoComplete="new-password"
                value={selectedCustomerData?.vehCommission || book.vehCommission}
                onChange={handleChange}
                // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                label="Veh.Commission"
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="input radio">
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo-vehicleInfo"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "underGroup")}
                value={Undergroup.find((option) => option.Option)?.label || ''}
                options={Undergroup.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => {
                  params.inputProps.value = selectedCustomerData?.underGroup || ''
                  return (
                    <TextField {...params} label="Under Group" name="underGroup" inputRef={params.inputRef} />
                  )
                }
                }
              />
            </div>
            <div className="input">
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo-vehicleInfo"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleInfo")}
                value={Vehicleinfo.find((option) => option.Option)?.label || ''}
                options={Vehicleinfo.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => {
                  params.inputProps.value = selectedCustomerData?.vehicleInfo || ''
                  return (
                    <TextField {...params} label="Vehicle Info" name="vehicleInfo" inputRef={params.inputRef} />
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
                name="rateType"
                autoComplete="new-password"
                value={selectedCustomerData?.rateType || book.rateType}
                onChange={handleChange}
                // InputLabelProps={{ shrink: !!selectedCustomerData.rateType || !!book.rateType, }}
                label="Rate Type"
                id="standard-size-normal"
                variant="standard"
              />
            </div>
            <div className="input radio">
              <div className="icone">
                <StoreIcon color="action" />
              </div>
              <TextField
                name="entity"
                autoComplete="new-password"
                value={selectedCustomerData?.entity || book.entity}
                onChange={handleChange}
                // InputLabelProps={{ shrink: !!selectedCustomerData.entity || !!book.entity, }}
                label="Opening Balance"
                id="standard-size-normal"
                variant="standard"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Runing
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="isRunning"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={selectedCustomerData?.isRunning || book.isRunning}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
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
                  <FormControlLabel value="Dr" control={<Radio />} label="Dr" />
                  <FormControlLabel value="Cr" control={<Radio />} label="Cr" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="input radio">
              <FormControlLabel
                name='printBill'
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.printBill || book.printBill)}
                control={<Checkbox size="small" />}
                value="Rate"
                // control={<Checkbox size="small" />}
                label="Rate"
              />
            </div>
            <div className="input">
              <FormControlLabel
                name='autoRefresh'
                value="Auto Refresh"
                autoComplete="new-password"
                onChange={handleChange}
                checked={Boolean(selectedCustomerData?.autoRefresh || book.autoRefresh)}
                control={<Checkbox size="small" />}
                label="Auto Refresh"
              />
            </div>
          </div>
          {error && <p>Something went wrong!</p>}

          <div className="SpeedDial" style={{ "paddingTop": "96px" }}>
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
        </div>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                Download
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
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
      </form>
    </div>
  );
};

export default Accuntinfo;
