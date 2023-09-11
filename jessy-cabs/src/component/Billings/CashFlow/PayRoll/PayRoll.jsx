import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./PayRoll.css";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AddCardIcon from '@mui/icons-material/AddCard';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import TimerIcon from '@mui/icons-material/Timer';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import Button from "@mui/material/Button";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import WorkOffIcon from '@mui/icons-material/WorkOff';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import HailIcon from '@mui/icons-material/Hail';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BadgeIcon from "@mui/icons-material/Badge";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SpeedDial from "@mui/material/SpeedDial";
import { styled } from "@mui/material/styles";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import MonthlyPayDetails from './SliderPaySlips/MonthlyPayDetails';
import EmployePaySlip from './SliderPaySlips/EmployePaySlip';
// import { saveAs } from 'file-saver';
// import jsPDF from 'jspdf';


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


const PayRoll = () => {
  const [value, setValue] = React.useState("monthlypaydetails");
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
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
    empid: '',
    empname: '',
    empemailid: '',
    empmobile: '',
    jobroll: '',
    workingdays: '',
    leavedays: '',
    salarydate: '',
    uanid: '',
    esino: '',
    grosspay: '',
    basicsalary: '',
    houserentallowance: '',
    otherallowance: '',
    overtime: '',
    outstation: '',
    extraworkingdays: '',
    cellwash: '',
    totalerningsamount: '',
    PF12: '',
    ESIC0_75: '',
    otherdeducations: '',
    professionaltax: '',
    incometax: '',
    advancepaid: '',
    advanceloan: '',
    totaldeductionamount: '',
    takehomeamount: '',

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
      empid: '',
      empname: '',
      empemailid: '',
      empmobile: '',
      jobroll: '',
      workingdays: '',
      leavedays: '',
      salarydate: '',
      uanid: '',
      esino: '',
      grosspay: '',
      basicsalary: '',
      houserentallowance: '',
      otherallowance: '',
      overtime: '',
      outstation: '',
      extraworkingdays: '',
      cellwash: '',
      totalerningsamount: '',
      PF12: '',
      ESIC0_75: '',
      otherdeducations: '',
      professionaltax: '',
      incometax: '',
      advancepaid: '',
      advanceloan: '',
      totaldeductionamount: '',
      takehomeamount: '',

    }));
    setSelectedCustomerData({});
    setFormData({});
  };
  // const handleRowClick = useCallback((params) => {
  //   console.log(params.row);
  //   const customerData = params.row;
  //   setSelectedCustomerData(customerData);
  //   setSelectedCustomerId(params.row.customerId);
  // }, []);
  const handleAdd = async () => {
    const empname = book.empname;
    if (!empname) {
      setError(true);
      setErrorMessage("fill mantatory fields");
      return;
    }
    try {
      console.log('Add button clicked');
      await axios.post('http://localhost:8081/payroll', book);
      console.log(book);
      handleCancel();// Assuming you have defined the handleCancel function to perform the necessary actions after the POST request is successful
    } catch (error) {
      console.error('Error adding customer:', error);
      // You can add error handling code here, like displaying an error message to the user
    }
  };
  const handleClick = async (event, actionName, empid) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/payroll');
        const data = response.data;
        setRows(data);
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/payroll/${empid}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.empid === empid);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/payroll/${empid}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      } else if (actionName === 'Add') {
        // await axios.post('http://localhost:8081/payroll', book);
        // console.log(book);
        // handleCancel();
        handleAdd();
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Check Network Connection")

    }
  };
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });

  const handleTapChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="PettyCash-form Scroll-Style-hide">
      <form action="">
        <div className="PettyCash-page-header">
          <div className="input-field">
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <BadgeIcon color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Employe ID"
                name="empid"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.empid || book.empid}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <PermIdentityIcon color="action" />
              </div>
              <TextField
                size="small"
                id="name"
                label="Name"
                name="empname"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.empname || book.empname}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <EmailIcon color="action" />
              </div>
              <TextField
                size="small"
                id="emailid"
                label="Email Id"
                name="empemailid"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.empemailid || book.empemailid}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <PhoneIphoneIcon color="action" />
              </div>
              <TextField
                size="small"
                id="mobile"
                label="Mobile"
                name="empmobile"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.empmobile || book.empmobile}
                autoFocus
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <WorkOutlineRoundedIcon color="action" />
              </div>
              <TextField
                size="small"
                id="jobroll"
                label="Job Roll"
                name="jobroll"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.jobroll || book.jobroll}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <WorkIcon color="action" />
              </div>
              <TextField
                type='number'
                size="small"
                id="workingdays"
                label="Working Days"
                name="workingdays"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.workingdays || book.workingdays}
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <WorkOffIcon color="action" />
              </div>
              <TextField
                type='number'
                size="small"
                id="leavedays"
                label="Leave Days"
                name="leavedays"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.leavedays || book.leavedays}
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Salary Date">
                  <DatePicker
                    value={formData.salarydate || selectedCustomerData.salarydate ? dayjs(selectedCustomerData.salarydate) : null}
                    onChange={(date) => handleDateChange(date, 'salarydate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.salarydate} />
                    )}
                  </DatePicker>
                </DemoItem>
              </LocalizationProvider>

            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "260px" }}>
              <div className="icone">
                <DeviceHubRoundedIcon color="action" />
              </div>
              <TextField
                size="small"
                id="uanid"
                label="UAN Id"
                name="uanid"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.uanid || book.uanid}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "260px" }}>
              <div className="icone">
                <MedicalInformationIcon color="action" />
              </div>
              <TextField
                size="small"
                id="esino"
                label="ESI No"
                name="esino"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.esino || book.esino}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "260px" }}>
              <div className="icone">
                <AccountBalanceWalletIcon color="action" />
              </div>
              <TextField
                type='number'
                size="small"
                id="grosspay"
                label="Gross Pay"
                name="grosspay"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.grosspay || book.grosspay}
                variant="standard"
              />
            </div>
          </div>
        </div>
        <div className='PayRoll-container'>
          <span className="Title-Name">Earnings</span>
          <div className="input-field">
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                < SwitchAccountIcon color="action" />
              </div>
              <TextField
                type='number'
                size="small"
                id="basicsalary"
                label="Basic Salary"
                name="basicsalary"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.basicsalary || book.basicsalary}
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <AddHomeWorkIcon color="action" />
              </div>
              <TextField
                type='number'
                size="small"
                id="houserentallowance"
                label="House Rent Allowance"
                name="houserentallowance"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.houserentallowance || book.houserentallowance}
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <FactCheckIcon color="action" />
              </div>
              <TextField
                type='number'
                size="small"
                id="otherallowance"
                label="Other Allowance"
                name="otherallowance"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.otherallowance || book.otherallowance}
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <TimerIcon color="action" />
              </div>
              <TextField
                size="small"
                id="overtime"
                label="Over Time"
                name="overtime"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.overtime || book.overtime}
                autoFocus
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <NaturePeopleIcon color="action" />
              </div>
              <TextField
                size="small"
                id="outstation"
                label="Out Station"
                name="outstation"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.outstation || book.outstation}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <WorkHistoryIcon color="action" />
              </div>
              <TextField
                size="small"
                id="extraworkingdays"
                label="Extra Working Days"
                name="extraworkingdays"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.extraworkingdays || book.extraworkingdays}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <HailIcon color="action" />
              </div>
              <TextField
                size="small"
                id="cellwash"
                label="Cell Wash"
                name="cellwash"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.cellwash || book.cellwash}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <CurrencyRupeeIcon color="action" />
              </div>
              <TextField
                size="small"
                id="totalerningsamount"
                label="Total Ernings Amount"
                name="totalerningsamount"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.totalerningsamount || book.totalerningsamount}
                variant="standard"
              />
            </div>
          </div>
        </div>
        <div className='PayRoll-container'>
          <span className="Title-Name">Deductions</span>
          <div className="input-field">
            <div className="input" style={{ width: "240px" }}>
              <div className="icone">
                <DeviceHubRoundedIcon color="action" />
              </div>
              <TextField
                size="small"
                id="PF12%"
                label="PF 12%"
                name="PF12"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.PF12 || book.PF12}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "240px" }}>
              <div className="icone">
                <MedicalInformationIcon color="action" />
              </div>
              <TextField
                size="small"
                id="ESIC0.75%"
                label="ESIC 0.75%"
                name="ESIC0_75"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.ESIC0_75 || book.ESIC0_75}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "240px" }}>
              <div className="icone">
                <ContactMailIcon color="action" />
              </div>
              <TextField
                type='number'
                size="small"
                id="otherdeducations"
                label="Other Deducations"
                name="otherdeducations"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.otherdeducations || book.otherdeducations}
              />
            </div>
            <div className="input" style={{ width: "240px" }}>
              <div className="icone">
                <ContactEmergencyIcon color="action" />
              </div>
              <TextField
                size="small"
                id="professionaltax"
                label="Professional Tax"
                name="professionaltax"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.professionaltax || book.professionaltax}
                autoFocus
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <NetworkPingIcon color="action" />
              </div>
              <TextField
                size="small"
                id="incometax"
                label="Income Tax"
                name="incometax"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.incometax || book.incometax}
                autoFocus
              />
            </div>
            <div className="input" >
              <div className="icone">
                <CreditScoreIcon color="action" />
              </div>
              <TextField
                size="small"
                id="advancepaid"
                label="Advance Paid"
                name="advancepaid"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.advancepaid || book.advancepaid}
                autoFocus
              />
            </div>
            <div className="input"  >
              <div className="icone">
                <AddCardIcon color="action" />
              </div>
              <TextField
                size="small"
                id="advance"
                label="Advance Loan"
                name="advanceloan"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.advanceloan || book.advanceloan}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "225px" }}>
              <div className="icone">
                <CurrencyRupeeIcon color="action" />
              </div>
              <TextField
                size="small"
                id="totaldeductionamount"
                label="Total Deduction Amount"
                name="totaldeductionamount"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.totaldeductionamount || book.totaldeductionamount}
                variant="standard"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "225px" }}>
              <div className="icone">
                <CurrencyRupeeIcon color="action" />
              </div>
              <TextField
                size="small"
                id="takehomeamount"
                label="Take Home Amount"
                name="takehomeamount"
                autoComplete="new-password"
                onChange={handleChange}
                value={selectedCustomerData?.takehomeamount || book.takehomeamount}
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "100px" }}>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
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
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>success fully submitted</p>
          </div>
        }
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
        <div className='payroll-slider'>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTapChange} aria-label="lab API tabs example">
                  <Tab label="Monthly Pay Details" value="monthlypaydetails" />
                  <Tab label="Employes Pay Slip" value="employespayslip" />
                </TabList>
              </Box>
              <TabPanel value="monthlypaydetails">
                <MonthlyPayDetails />
              </TabPanel>
              <TabPanel value="employespayslip">
                <EmployePaySlip />
              </TabPanel>
            </TabContext>
          </Box>
        </div>

      </form>
    </div>
  )
}

export default PayRoll