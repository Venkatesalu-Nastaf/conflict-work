import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import "./Vehicaleinfo.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// FONTAWESOME ICON
import { FaMoneyBillWave } from "react-icons/fa";

// ICONS
import SpeedIcon from "@mui/icons-material/Speed";
import DeleteIcon from "@mui/icons-material/Delete";
import CommuteIcon from "@mui/icons-material/Commute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";



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
  // { icon: <ChecklistIcon />, name: "List" }, 
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];
const Vehicaleinfo = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [actionName] = useState('');
  const [error, setError] = useState(false);

  const hidePopup = () => {
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


  // Table Start
  // const columns = [
  //   { field: "id", headerName: "Sno", width: 70 },
  //   { field: "cperson", headerName: "Supplier_Name", width: 130 },
  //   { field: "accountNo", headerName: "Vehicle_No", width: 130 },
  //   { field: "address1", headerName: "Address", width: 130 },
  //   { field: "phone", headerName: "Phone", width: 130 },
  //   { field: "isRunning", headerName: "Active", width: 160 },
  //   { field: "rateType", headerName: "Owner_Type", width: 130 },
  //   { field: "vehcommission", headerName: "Percentage", width: 130 },
  //   { field: "printBill", headerName: "Rate_Type", width: 130 },
  //   { field: "autoRefresh", headerName: "Driver_App", width: 130 },
  // ];

  const [book, setBook] = useState({
    vehicleId: '',
    doadate: '',
    vehRegNo: '',
    costCenter: '',
    vehType: '',
    yearModel: '',
    owner: '',
    mobileNo: '',
    fcdate: '',
    taxdate: '',
    npdate: '',
    insdate: '',
    stpermit: '',
    duedate: '',
    financer: '',
    avgmileage: '',
    routeno: '',
    driverName: '',
    dueAmount: '',
    tankCap: '',
    remarks: '',
    OwnerType: '',
    active: '',
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


  // const handleAutocompleteChange = (event, value, name) => {
  //   const selectedOption = value ? value.label : '';
  //   setBook((prevBook) => ({
  //     ...prevBook,
  //     [name]: selectedOption,
  //   }));
  //   setSelectedCustomerData((prevData) => ({
  //     ...prevData,
  //     [name]: selectedOption,
  //   }));
  // };


  // const handleDateChange = (date, name) => {
  //   const startOfDay = dayjs(date).startOf('day').format();
  //   setBook((prevBook) => ({
  //     ...prevBook,
  //     [name]: startOfDay,
  //   }));
  // };

  const handleDateChange = (date, name) => {
    const startOfDay = dayjs(date).startOf('day').format();
    setBook((prevBook) => ({
      ...prevBook,
      [name]: startOfDay,
    }));
  };

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      vehicleId: '',
      doadate: '',
      vehRegNo: '',
      costCenter: '',
      vehType: '',
      yearModel: '',
      owner: '',
      mobileNo: '',
      fcdate: '',
      taxdate: '',
      npdate: '',
      insdate: '',
      stpermit: '',
      duedate: '',
      financer: '',
      avgmileage: '',
      routeno: '',
      driverName: '',
      dueAmount: '',
      tankCap: '',
      remarks: '',
      OwnerType: '',
      active: '',
    }));
    setSelectedCustomerData({});

  };

  // const handleRowClick = useCallback((params) => {
  //   const customerData = params.row;
  //   setSelectedCustomerData(customerData);
  // }, []);

  const handleClick = async (event, actionName) => {
    event.preventDefault();

    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        // const response = await axios.get('http://localhost:8081/vehicleinfo');
        // const data = response.data;
        // setRows(data);
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
        await axios.post('http://localhost:8081/vehicleinfo', book);
        console.log(book);
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
    <div className="vehicale-form">
      <form action="">
        <div className="detail-container-main-vehicale">
          <div className="container-left-vehicale">
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <MinorCrashIcon color="action" />
                </div>
                <TextField
                  name="vehicleId"
                  value={selectedCustomerData.vehicleId || book.vehicleId}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Vehicle ID"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="D.O.A Date">
                    <DatePicker
                      defaultValue={today}
                      minDate={tomorrow}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="D.O.A Date">
                    <DatePicker
                      value={selectedCustomerData.doadate ? dayjs(selectedCustomerData.doadate) : null}
                      onChange={(date) => handleDateChange(date, 'doadate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='doadate' value={selectedCustomerData.doadate} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <CarCrashIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="veh_reg_no"
                  label="Vehicle Reg No"
                  name="vehRegNo"
                  value={selectedCustomerData.vehRegNo || book.vehRegNo}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PriceChangeIcon color="action" />
                </div>
                <TextField
                  name="costCenter"
                  value={selectedCustomerData.costCenter || book.costCenter}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Cost Center"
                  id="standard-size-normal"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <CommuteIcon color="action" />
                </div>
                <TextField
                  name="vehType"
                  value={selectedCustomerData.vehType || book.vehType}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Vehicle Type"
                  id="veh_type"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AssessmentIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="year_model"
                  // value={"2012"}
                  name="yearModel"
                  value={selectedCustomerData.yearModel || book.yearModel}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Year Model"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <EmojiTransportationIcon color="action" />
                </div>
                <TextField
                  name="owner"
                  value={selectedCustomerData.owner || book.owner}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Owner"
                  id="owner"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  name="mobileNo"
                  value={selectedCustomerData.mobileNo || book.mobileNo}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Mobile No"
                  id="mobile_no"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="FC Date">
                    <DatePicker
                      value={selectedCustomerData.fcdate ? dayjs(selectedCustomerData.fcdate) : null}
                      onChange={(date) => handleDateChange(date, 'fcdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='fcdate' value={selectedCustomerData.fcdate} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Tax Date">
                    <DatePicker
                      value={selectedCustomerData.taxdate ? dayjs(selectedCustomerData.taxdate) : null}
                      onChange={(date) => handleDateChange(date, 'taxdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='taxdate' value={selectedCustomerData.taxdate} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="National Permit Date">
                    <DatePicker
                      value={selectedCustomerData.npdate ? dayjs(selectedCustomerData.npdate) : null}
                      onChange={(date) => handleDateChange(date, 'npdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='npdate' value={selectedCustomerData.npdate} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <AccountBalanceWalletIcon color="action" />
                </div>
                <TextField
                  name="financer"
                  value={selectedCustomerData.financer || book.financer}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Financer"
                  id="financer"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Ins. Date">
                    <DatePicker
                      value={selectedCustomerData.date ? dayjs(selectedCustomerData.date) : null}
                      onChange={handleDateChange}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='insdate' value={selectedCustomerData.date} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Insurance Date">
                    <DatePicker
                      value={selectedCustomerData.insdate ? dayjs(selectedCustomerData.insdate) : null}
                      onChange={(date) => handleDateChange(date, 'insdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='insdate' value={selectedCustomerData.insdate} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="St Permit">
                    <DatePicker
                      value={selectedCustomerData.date ? dayjs(selectedCustomerData.date) : null}
                      onChange={handleDateChange}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='stpermit' value={selectedCustomerData.date} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="State permit">
                    <DatePicker
                      value={selectedCustomerData.stpermit ? dayjs(selectedCustomerData.stpermit) : null}
                      onChange={(date) => handleDateChange(date, 'stpermit')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='stpermit' value={selectedCustomerData.stpermit || ''} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div>
              <div className="input">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Due Date">
                    <DatePicker
                      value={selectedCustomerData.date ? dayjs(selectedCustomerData.date) : null}
                      onChange={handleDateChange}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='duedate' value={selectedCustomerData.date} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Due Date">
                    <DatePicker
                      value={selectedCustomerData.duedate ? dayjs(selectedCustomerData.duedate) : null}
                      onChange={(date) => handleDateChange(date, 'duedate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='duedate' value={selectedCustomerData.duedate} />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>

              </div>
              <div className="input">
                <div className="icone">
                  <SpeedIcon color="action" />
                </div>
                <TextField
                  name="avgmileage"
                  value={selectedCustomerData.avgmileage || book.avgmileage}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="AVG Mileage"
                  id="avgmileage"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AirlineSeatReclineExtraIcon color="action" />
                </div>
                <TextField
                  name="driverName"
                  value={selectedCustomerData.driverName || book.driverName}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Driver Name"
                  id="driver_name"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FaMoneyBillWave color="action" />
                </div>
                <TextField
                  name="dueAmount"
                  value={selectedCustomerData.dueAmount || book.dueAmount}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Due Amount"
                  id="due_amount"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactPhoneIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="tankCap"
                  value={selectedCustomerData.tankCap || book.tankCap}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Tank Cap"
                  id="tank_cap"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AltRouteIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="routeno"
                  value={selectedCustomerData.routeno || book.routeno}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Route No"
                  id="routeno"
                  autoFocus
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <AutoModeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="remarks"
                  value={selectedCustomerData.remarks || book.remarks}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Remarks"
                  id="remarks"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AssignmentIndTwoToneIcon color="action" />
                </div>
                <TextField
                  name="OwnerType"
                  value={selectedCustomerData.OwnerType || book.OwnerType}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Owner Type"
                  id="owner_type"
                  variant="standard"
                />
              </div>
              <div className="input">
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
              <div className="input">
                <Button variant="outlined" startIcon={<SummarizeTwoToneIcon />}>
                  list
                </Button>
              </div>
            </div>

          </div>
        </div>
        {error && <div className='alert-popup Error' >
          <span className='cancel-btn' onClick={hidePopup}>x</span>
          <p>Something went wrong!</p>
        </div>}

        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            // hidden={hidden}
            icon={<SpeedDialIcon />}
          // direction={direction}
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
      </form>
    </div>
  );
};

export default Vehicaleinfo;
