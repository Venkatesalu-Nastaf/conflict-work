import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  UnderGroup,
  states,
  Customertype,
  Select,
  BillingGroup,
} from "./Customerdata";
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
//
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

// date
const today = dayjs();
// const tomorrow = dayjs().add(1, 'day');
const Customer = () => {
  // const [formData] = useState({});
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

  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, value, name) => {
    const selectedOption = value?.label || '';
    setBook((prevBook) => ({
      ...prevBook,
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

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8081/customers', book);
      console.log(book);
      navigate('/home/orders/customer');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const listItems = ["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id."]; // Example data for list items
  const updateItems = ["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt doloremque quisquam quod quos laboriosam tempora totam, unde non illo ipsum asperiores, expedita quis, impedit necessitatibus cupiditate rem quibusdam ut id. "]; // Example data for update items


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
                  id="email"
                  label="Name"
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="email"
                  autoFocus
                />
              </div>
              <div className="input">
                <TextField
                  margin="normal"
                  size="small"
                  id="Print Name"
                  label="Print Name"
                  autoComplete="new-password"
                  onChange={handleChange}
                  name="printName"
                  autoFocus
                />
              </div>
              <div className="input">


               
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "20ch" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "customerType")}
                  value={Customertype.find((option) => option.optionvalue)?.label || ''}
                  options={Customertype.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => (
                    <TextField {...params} label="Customer Type" name="customerType" inputRef={params.inputRef} />
                  )}
                />

              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Date">
                    <DatePicker
                      defaultValue={today}
                      onChange={handleDateChange}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} />
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
                  onChange={handleChange}
                  id="standard-size-normal"
                  variant="standard"
                />
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
                    A/C Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="acType"
                    autoComplete="new-password"
                    onChange={handleChange}
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
                  <div className="textboxupdate list-update" key={`update-item-${index}`}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="detail-container-main-customer">
            <div className="container-left-customer">
              <div className="input-field checkbox">
                <FormControlLabel
                  name="printBill"
                  value="Printbill"
                  control={<Checkbox size="small" />}
                  label="Print Bill"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <FormControlLabel
                  name="userName"
                  value="Username"
                  control={<Checkbox size="small" />}
                  label="User Name"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <FormControlLabel
                  name="bookName"
                  value="Bookname"
                  control={<Checkbox size="small" />}
                  label="Book Name"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <FormControlLabel
                  name="division"
                  value="Divistion"
                  control={<Checkbox size="small" />}
                  label="Divistion"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <FormControlLabel
                  size="small"
                  name="hourRoundedOff"
                  value="Hourroundedoff"
                  control={<Checkbox size="small" />}
                  label="Hour Roundedoff"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <div className="input">

                 
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
                    renderInput={(params) => (
                      <TextField {...params} label="Select" name="selectOption" inputRef={params.inputRef} />
                    )}
                  />

                </div>
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
                    renderInput={(params) => (
                      <TextField {...params} label="State" name="state" inputRef={params.inputRef} />
                    )}
                  />


                </div>
                <div className="input">
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  <TextField
                    name="entity"
                    autoComplete="new-password"
                    onChange={handleChange}
                    label="Entity"
                    id="standard-size-normal"
                    variant="standard"
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
                    renderInput={(params) => (
                      <TextField {...params} label="Under Group" name="underGroup" inputRef={params.inputRef} />
                    )}
                  />

                </div>
              </div>
              <div className="input-field">
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
                    renderInput={(params) => (
                      <TextField {...params} label="Billing Group" name="billingGroup" inputRef={params.inputRef} />
                    )}
                  />

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
                        onClick={(event) => handleClick(event)}
                      />
                    ))}
                  </StyledSpeedDial>
                </Box>
              </div>
            </div>
            <div className="container-right-customer">
              <div className="textbox">
                <div className="textboxlist">
                  {listItems.map((item, index) => (
                    <div className="textboxlist-customer list-update" key={`list-item-${index}`}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customer;