import React, { useState, useEffect, useCallback } from 'react';
import 'jspdf-autotable';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import axios from "axios";
import "./Accountinfo.css";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// ICONS
import StoreIcon from "@mui/icons-material/Store";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Undergroup, Vehicleinfo } from "./Accountinfo";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import InputAdornment from "@mui/material/InputAdornment";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
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
const Accuntinfo = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  // const [value, setValue] = React.useState("online_password");
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
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
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [info]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);


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
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Account_Info", 10, 10);

    // Modify tableData to exclude the index number
    const tableData = rows.map((row) => [
      row['id'],
      row['cperson'],
      row['accountNo'],
      row['address1'],
      row['phone'],
      row['isRunning'],
      row['vehicleInfo'],
      row['vehCommission'],
      row['rateType'],
      row['autoRefresh']
    ]);

    pdf.autoTable({
      head: [['Sno', 'Supplier_Name', 'Vehicle_No', 'Address', 'Phone', 'Active', 'Owner_Type', 'Percentage', 'Rate_Type', 'Driver']],
      body: tableData,
      startY: 20,
    });

    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Account_Info.pdf');
  };


  // TABLE START
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
  // TABLE END
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
  // const handleTabChange = (event, newValue) => {
  //   setValue(newValue);
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
    const startOfDay = dayjs(date).format('DD/MM/YYYY');
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

  const handleAdd = async () => {

    try {
      console.log('Add button clicked');
      await axios.post('http://localhost:8081/accountinfo', book);
      console.log(book);
      handleCancel();
      setSuccessMessage("Successfully Added");
    } catch (error) {
      console.error('Error updating customer:', error);
      setErrorMessage("Check your Network Connection");
    }
  };


  const handleClick = async (event, actionName, accountNo) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/accountinfo');
        const data = response.data;
        // setRows(data);
        if (data.length > 0) {
          setRows(data);
          setSuccess(true);
          setSuccessMessage("Successfully listed");
        } else {
          setRows([]);
          setError(true);
          setErrorMessage("No data found");
        }
        setSuccessMessage("Successfully listed");
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/accountinfo/${accountNo}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.accountNo === accountNo);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/accountinfo/${accountNo}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        handleAdd();
      }
    } catch (error) {
      console.log(error);
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
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null}
                    onChange={handleDateChange}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.date} />
                    )}
                  </DatePicker>
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
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="phone"
                  autoComplete="new-password"
                  value={selectedCustomerData?.phone || book.phone}
                  onChange={handleChange}
                  label="Phone"
                  id="phone"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="address1"
                  autoComplete="new-password"
                  value={selectedCustomerData?.address1 || book.address1}
                  onChange={handleChange}
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
                  label="C Person"
                  id="cperson"
                  variant="standard"
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
                  value={Undergroup.find((option) => option.Option)?.label || selectedCustomerData?.underGroup || ''}
                  options={Undergroup.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.underGroup || ''}
                  renderInput={(params) => {
                    // params.inputProps.value = selectedCustomerData?.underGroup || ''
                    return (
                      <TextField {...params} label="Under Group" name="underGroup" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <HomeTwoToneIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="streetNo"
                  autoComplete="new-password"
                  value={selectedCustomerData?.streetNo || book.streetNo}
                  onChange={handleChange}
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
                  label="Email"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <TextField
                  type="number"
                  name='vehCommission'
                  autoComplete="new-password"
                  value={selectedCustomerData?.vehCommission || book.vehCommission}
                  onChange={handleChange}
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
            </div>
            <div className="input-field">
              <div className="input" style={{ width: "415px" }}>
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="city"
                  autoComplete="new-password"
                  value={selectedCustomerData?.city || book.city}
                  onChange={handleChange}
                  id="address3"
                  sx={{ m: 1, width: "200ch" }}
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
                  label="Opening Balance"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-vehicleInfo"
                  freeSolo
                  sx={{ m: 1, width: "25ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleInfo")}
                  value={Vehicleinfo.find((option) => option.Option)?.label || selectedCustomerData?.vehicleInfo || ''}
                  options={Vehicleinfo.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.vehicleInfo || ''}
                  renderInput={(params) => {
                    // params.inputProps.value = selectedCustomerData?.vehicleInfo || ''
                    return (
                      <TextField {...params} label="Vehicle Info" name="vehicleInfo" inputRef={params.inputRef} />
                    )
                  }
                  }
                />
              </div>
            </div>
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
          <div className="input">
            <div className="icone">
              <RateReviewIcon color="action" />
            </div>
            <TextField
              name="rateType"
              autoComplete="new-password"
              value={selectedCustomerData?.rateType || book.rateType}
              onChange={handleChange}
              label="Rate Type"
              id="standard-size-normal"
              variant="standard"
            />
          </div>
          <div className="input" style={{ width: "100px" }}>
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
        {warning &&
          <div className='alert-popup Warning' >
            <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{warningMessage}</p>
          </div>
        }
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
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
            rows={rows}
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
      </form>
    </div>
  );
};

export default Accuntinfo;
