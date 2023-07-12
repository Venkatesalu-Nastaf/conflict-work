import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Vehicaleinfo.css";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { FaMoneyBillWave } from "react-icons/fa";
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CommuteIcon from "@mui/icons-material/Commute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import ChecklistIcon from "@mui/icons-material/Checklist";
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
const Vehicaleinfo = () => {
  // const [value] = React.useState("list");
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  // const [rows, setRows] = useState([]);
  const [actionName] = useState('');

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
        <span className="Title-Name">Vehicale Info</span>
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
            </div>
            <div className="input-field">
              <div className="input">
                <div className="icone">
                  <CarCrashIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="veh_reg_no"
                  label="Veh.Reg.No"
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
              <div className="input">
                <div className="icone">
                  <CommuteIcon color="action" />
                </div>
                <TextField
                  name="vehType"
                  value={selectedCustomerData.vehType || book.vehType}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: !!selectedCustomerData.customerId || !!book.customerId, }}
                  label="Veh.Type"
                  id="veh_type"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
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
                  <DemoItem label="NP Date">
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
                  <DemoItem label="Ins. Date">
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
  <DemoItem label="St. permit">
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
            </div>
            <div className="input-field">
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
                  label="owner_Type"
                  id="owner_type"
                  variant="standard"
                />
              </div>
            </div>
            <div className="input-field">
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
            {error && <p>Something went wrong!</p>}

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
          </div>

          <div className="container-right-vehicale">
            <div className="textbox">
              <div className="textboxlist">
                <div className="textboxlist-customer list-update">
                  <span>
                    List Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Harum veniam quos laborum. Dicta suscipit voluptas
                    laboriosam rem alias praesentium, facere aliquam sed iste,
                    officia excepturi quos corporis. Facilis, reiciendis et.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                    nostrum nihil minima debitis, nobis incidunt temporibus
                    velit accusantium dolore assumenda iusto quod ratione
                    praesentium maxime eveniet voluptas enim animi laudantium.
                  </span>
                </div>
              </div>
              <div className="textboxupdate">
                <div className="textboxlist">
                  <div className="textboxlist-customer list-update">
                    <span>
                      List Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Harum veniam quos laborum. Dicta suscipit voluptas
                      laboriosam rem alias praesentium, facere aliquam sed iste,
                      officia excepturi quos corporis. Facilis, reiciendis et.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cum nostrum nihil minima debitis, nobis incidunt
                      temporibus velit accusantium dolore assumenda iusto quod
                      ratione praesentium maxime eveniet voluptas enim animi
                      laudantium.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Vehicaleinfo;
