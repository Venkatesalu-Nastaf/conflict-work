import React, { useEffect, useContext } from 'react';
import "./Customer.css";
import dayjs from "dayjs";
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
import { UnderGroup, states, Customertype, Select } from "./Customerdata";
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
// import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CustomInput from './CustomInput';
import useCustomer from './useCustomer';
import { PermissionContext } from '../../context/permissionContext';
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { GrSelect } from "react-icons/gr";



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

const Customer = ({ stationName }) => {

  const {
    selectedCustomerData,
    selectedCustomerId,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    handleAutocompleteChange,
    handleDateChange,
    handleButtonClick,
    isInputVisible,
    handleExcelDownload,
    handlePdfDownload,
    rows,
    columns,
    isEditMode,
    handleEdit,
  } = useCustomer();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const { permissions } = useContext(PermissionContext)

  const Customer_read = permissions[9]?.read;
  const Customer_new = permissions[9]?.new;
  const Customer_modify = permissions[9]?.modify;
  const Customer_delete = permissions[19]?.delete;

  return (
    <div className="form-container">
      <div className="customer-form">
        <form onSubmit={handleClick}>
          <p className="head-tab-customer">
            <span className="Title-Name">Customer</span>

          </p>
          <div className="Customer-page-header">
            <div className="input-field Customer-page-input-field">
              <div className="input" style={{ paddingRight: '15px' }}>
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
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input" style={{ paddingRight: '15px' }}>
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
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
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
              <div className="input" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-customerType"
                  freeSolo
                  sx={{ width: "100%" }}
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
              <div className="input" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <CalendarMonthIcon color="action" />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={selectedCustomerData.date ? dayjs(selectedCustomerData.date) : null || book.date ? dayjs(book.date) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, 'date')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.date} />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              {/* </div>
            <div className="input-field"> */}
              <div className="input" style={{ paddingRight: '15px' }}>
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
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input" style={{ paddingRight: '15px' }}>
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
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input" style={{ paddingRight: '15px' }}>
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
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input" style={{ paddingRight: '15px' }}>
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
                  style={{ width: '100%' }}
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
            <div className="input-field  checkbox customer-input-feild">
              <div className="input input-address" style={{ width: "400px" }}>
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                {/* <TextField
                  size="small"
                  name="address1"
                  value={selectedCustomerData?.address1 || book.address1}
                  label="Address"
                  autoComplete="new-password"
                  onChange={handleChange}
                  id="remark"
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                /> */}

                <TextField
                  margin="normal"
                  id="remark"
                  label="Address"
                  name="address1"
                  multiline
                  rows={2}
                  sx={{ width: "100%" }}
                  autoComplete="new-password"
                  style={{ width: '100%' }}
                  value={selectedCustomerData?.address1 || book.address1}
                  onChange={handleChange}
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
              {/* </div>
            <div className="input-field"> */}
              {/* <div className="input input-address" style={{ width: "400px" }}>
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
              </div> */}
              <div className="input" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <DomainAddIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo"
                  freeSolo
                  sx={{ width: "100%" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "servicestation")}
                  value={stationName?.find((option) => option.optionvalue)?.label || selectedCustomerData.servicestation || book.servicestation || ''}
                  options={stationName?.map((option) => ({
                    label: option.Stationname,
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
              <div className="input" style={{ paddingRight: '15px' }}>
                <div className='icone'>
                  <GrSelect style={{ fontSize: '25px' }} />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="free-solo-demo-select"
                  freeSolo
                  sx={{ width: "100%" }}
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
              <div className="input" style={{ paddingRight: '15px' }}>
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
                  style={{ width: '100%' }}
                />
              </div>
              {/* </div>
            <div className="input-field"> */}
              {/* <div className="input" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  size="small"
                  name="city"
                  id="address3"
                  // value={selectedCustomerData?.city || book.city}
                  autoComplete="new-password"
                  onChange={handleChange}
                  sx={{ m: 1, width: "200ch" }}
                  variant="standard"
                  style={{ width: '100%' }}
                />
              </div> */}
              <div className="input" style={{ paddingRight: '15px' }}>
                <div className='icone'>
                  <GrSelect style={{ fontSize: '25px' }} />
                </div>
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
              <div className="input" style={{ paddingRight: '15px' }}>
                <div className='icone'>
                  <GrSelect style={{ fontSize: '25px' }} />
                </div>
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
              <div className="input dropdown" style={{ paddingRight: '15px' }}>
                <label htmlFor="">GST</label>
                {/* <select name="" id="">
                  <option value="">None</option>
                  <option value="">5%</option>
                  <option value="">12.5%</option>
                </select> */}
                <select name="gstTax" value={selectedCustomerData.gstTax || book.gstTax} onChange={handleChange} style={{ width: '100%' }}>
                  {/* <option value="" disabled>Select GST</option> */}
                  <option value="" >None</option>
                  <option value="5%">5%</option>
                  <option value="12%">12%</option>
                </select>
              </div>
            </div>
          </div>
          <div className="detail-container-main-customer">
            <div className="input-field customer-input-feild-add">
              <div className="input" style={{ display: 'grid' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormLabel>BillingGroup</FormLabel>
                  <Switch label='' onClick={handleButtonClick} />
                </div>
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
              {/* </div>
            <div className="input-field"> */}
              <div className="input" style={{ width: "160px" }}>
                {isEditMode ? (
                  <Button variant="contained" disabled={!Customer_modify} onClick={handleEdit}>Edit</Button>
                ) : (
                  <Button variant="contained" disabled={!Customer_new} onClick={handleAdd} >Add</Button>
                )}
              </div>
            </div>
            <div className='alert-popup-main'>
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
            </div>
            <div className="SpeedDial" style={{ padding: '26px', margin: '50px' }}>
              <Box sx={{ position: "relative", mt: 3, height: 320 }}>
                <StyledSpeedDial
                  ariaLabel="SpeedDial playground example"
                  icon={<SpeedDialIcon />}
                  direction="left"
                >
                  {/* {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
                    />
                  ))} */}

                  {Customer_read === 1 && (
                    <SpeedDialAction
                      key="list"
                      icon={<ChecklistIcon />}
                      tooltipTitle="List"
                      onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                    />
                  )}
                  {Customer_modify === 1 && (
                    <SpeedDialAction
                      key="edit"
                      icon={<ModeEditIcon />}
                      tooltipTitle="Edit"
                      onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                    />
                  )}
                  {Customer_delete === 1 && (
                    <SpeedDialAction
                      key="delete"
                      icon={<DeleteIcon />}
                      tooltipTitle="Delete"
                      onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                    />
                  )}
                  {Customer_new === 1 && (
                    <SpeedDialAction
                      key="Add"
                      icon={<BookmarkAddedIcon />}
                      tooltipTitle="Add"
                      onClick={(event) => handleClick(event, "Add", selectedCustomerId)}
                    />
                  )}
                  <SpeedDialAction
                    key="Cancel"
                    icon={<CancelPresentationIcon />}
                    tooltipTitle="Cancel"
                    onClick={(event) => handleClick(event, "Cancel", selectedCustomerId)}
                  />

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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customer;
