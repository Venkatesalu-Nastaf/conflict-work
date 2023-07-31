import React from 'react'
import "./PayRoll.css";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AddCardIcon from '@mui/icons-material/AddCard';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import TimerIcon from '@mui/icons-material/Timer';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import WorkOffIcon from '@mui/icons-material/WorkOff';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import MonthlyPayDetails from './SliderPaySlips/MonthlyPayDetails';
import EmployePaySlip from './SliderPaySlips/EmployePaySlip';



const PayRoll = () => {
  const [value, setValue] = React.useState("monthlypayslip");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="PettyCash-form">
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
                name="driverid"
                autoComplete="new-password"
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
                name="name"
                autoComplete="new-password"
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
                name="emailid"
                autoComplete="new-password"
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
                name="mobile"
                autoComplete="new-password"
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
                variant="standard"
              />
            </div>
            <div className="input" style={{ width: "215px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Salary Date'
                  defaultValue={dayjs()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="salarydate"
                      inputRef={params.inputRef}
                    />
                  )}
                />
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
                name="PF12%"
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
                name="ESIC0.75%"
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
                variant="standard"
              />
            </div>
          </div>
        </div>
        <div className='payroll-slider'>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
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