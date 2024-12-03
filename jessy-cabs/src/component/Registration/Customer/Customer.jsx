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
import { AiOutlineFileSearch } from "react-icons/ai";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { UnderGroup, states, Customertype, Select,stateToStations,allStations } from "./Customerdata";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Checkbox, Switch, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FaPercent } from "react-icons/fa";
// ICONS
import StoreIcon from "@mui/icons-material/Store";
import BadgeIcon from "@mui/icons-material/Badge";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import DateRangeIcon from '@mui/icons-material/DateRange';
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import useCustomer from './useCustomer';
import { PermissionContext } from '../../context/permissionContext';
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { GrSelect } from "react-icons/gr";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { FaHashtag } from "react-icons/fa";
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

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
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleAutocompleteChange,
    handleDateChange,
    // handleButtonClick,
    // isInputVisible,
    handleExcelDownload,
    handlePdfDownload,
    rows,
    columns,
    isEditMode,
    handleEdit,
    handleSearch,
    searchText,
    setSearchText,
    handleenterSearch,
    customerfieldSets,
    handleChangecustomer, deletedialogbox, setDeletedDialog,
     setInfo, setInfoMessage,loading,
    handleAddExtra, BillingGroup, handleAutocompleteChangebilling, handleRemove, customerratetype, handleChangeuniquecustomer, 
    cerendentialdata ,selectedStation, setSelectedStation, selectedState, setSelectedState,handleStationChange,btnloading, setbtnLoading
  } = useCustomer();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const { permissions } = useContext(PermissionContext)

  const Customer_read = permissions[11]?.read;
  const Customer_new = permissions[11]?.new;
  const Customer_modify = permissions[11]?.modify;
  const Customer_delete = permissions[11]?.delete;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleClickOpen = () => {

    if (Customer_delete === 1) {
      setDeletedDialog(true)
    }
    else {
      setInfo(true)
      setInfoMessage("You don't Have Permission To Delete")
    }
  };

  const handleClose = () => {
    setDeletedDialog(false)
  }

  return (
    <div className="form-container form-container-customer">
      <div className="main-content-container">
        <form onSubmit={handleClick}>
          <p className="head-tab-type-2-all">
            <span className="Title-Name" style={{ padding: '12px 16px' }}>CUSTOMER</span>
          </p>
          <div className='main-content-form'>
            <div className="Customer-page-header">
              <div className="input-field Customer-page-input-field">
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    name="customerId"
                    label="Customer ID"
                    id="customerId"
                    className='full-width'
                    autoComplete="new-password"
                    value={selectedCustomerData?.customerId || ""}

                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="customer"
                    className='full-width'
                    label="Organization Name"
                    value={selectedCustomerData?.customer || book.customer}
                    autoComplete="new-password"
                    // onChange={handleChange}
                    onChange={handleChangeuniquecustomer}
                    name="customer"
                  />
                  <>
                    {cerendentialdata ?
                      <p style={{ color: 'red' }}>customer Adlready exist</p> : ""}
                  </>
                </div>
                <div className="input">
                  <div className="icone">
                    <PermIdentityIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="name"
                    className='full-width'
                    label="Organizer Name"
                    value={selectedCustomerData?.name || book.name}
                    autoComplete="new-password"
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div className="input">
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
                <div className="input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      className='full-width'
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

                <div className="input">
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="ratetype"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "rateType")}
                    value={selectedCustomerData?.rateType || book.rateType || ''}
                    options={customerratetype.map((option) => ({ label: option }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.rateType || book.rateType || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Rate Type" name="rateType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <TextField
                    margin='normal'
                    size='small'
                    name="opBalance"
                    label="OP Balanace"
                    className='full-width'
                    autoComplete="new-password"
                    value={selectedCustomerData?.opBalance || book.opBalance}
                    onChange={handleChange}
                    id="opBalance"
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
                      id="acType"
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
                <div className='customer-billing-group-input-division input'>
                  <FormLabel htmlFor='hybrid'>Hybrid</FormLabel>
                  <Switch
                    label='label'
                    id="hybrid"
                    name="hybrid"
                    onChange={handleChange}
                    checked={book.hybrid || selectedCustomerData.hybrid}
                  />
                </div>
                <div className='customer-billing-group-input-division input'>
                  <FormLabel htmlFor='TimeToggle'>TimeToggle</FormLabel>
                  <Switch
                    label='label'
                    id="TimeToggle"
                    name="TimeToggle"
                    onChange={handleChange}
                    checked={book.TimeToggle || selectedCustomerData.TimeToggle || 0}
                  />
                </div>
              </div>

              <div className="Customer-page-input-field-addbtn">
                {/* <div className='customer-add-btn'>
                  <Button disabled={!Customer_new} variant="contained" onClick={handleAddExtra} style={{ width: 'fit-content' }}>Add+</Button>
                </div> */}
                <div>

                  {customerfieldSets.map((datafield, index) => (
                     <React.Fragment key={datafield.id || index}>
                      <div className="input-field Customer-page-add-input-field" style={{ flexWrap: 'wrap', marginBottom: '20px' }}>
                        <div className="input" key={index}>
                          <div className="icone">
                            <PermIdentityIcon color="action" />
                          </div>
                          <TextField
                            size="small"
                            id="orderedbycutomer"
                            className='full-width'
                            sx={{ width: "300px" }}
                            label="Ordered By"
                            name="orderedby"
                            value={datafield.orderedby || ""}
                            onChange={(e) => handleChangecustomer(e, index)}
                          />
                        </div>
                        <div className="input" key={index}>
                          <div className="icone">
                            <AttachEmailIcon color="action" />
                          </div>
                          <TextField
                            size="small"
                            id="orderebyemail"
                            className='full-width'
                            label="Ordered By Email"
                            name="orderByEmail"
                            autoComplete="new-password"
                            value={datafield.orderByEmail || ""}
                            onChange={(e) => handleChangecustomer(e, index)}
                          />
                        </div>
                        <div className="input" key={index}>
                          <div className="icone">
                            <LocalPhoneIcon color="action" />
                          </div>
                          <TextField
                            size="small"
                            id="mobliecustomer"
                            className='full-width'
                            label="Mobile No"
                            name="orderByMobileNo"
                            autoComplete="new-password"
                            value={datafield.orderByMobileNo || ""}
                            onChange={(e) => handleChangecustomer(e, index)}
                          />
                        </div>
                        {index == 0 && (
                          <Button disabled={!Customer_new} variant="contained" onClick={handleAddExtra} style={{ width: 'fit-content' }}>Add+</Button>
                        )}
                        {index >= 1 && (
                          <Button variant="contained" color="error" onClick={handleClickOpen}>
                            x
                          </Button>
                        )}

                      </div>


                      <Dialog open={deletedialogbox} onClose={handleClose}>
                        <DialogTitle>{"Are you sure you want to delete this item?"}</DialogTitle>
                        <DialogContent>

                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleRemove(index, datafield.id)}
                            color="error">
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                      </React.Fragment>
                    // </>
                  ))}

                </div>
              </div>
            </div>

            <div className="Customer-page-secend-containers">
              <div className="input-field  checkbox customer-input-feild">
                <div className="input input-address">
                  <div className="icone">
                    <AddHomeWorkIcon color="action" />
                  </div>
                  <textarea
                    id="address1"
                    className='textarea-input'
                    name="address1"
                    rows="3"
                    value={selectedCustomerData?.address1 || book.address1}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>

                {/* <div className="input">
                  <div className="icone">
                    <DomainAddIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="servicestation"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChangestations(event, value, "servicestation")}
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
                </div> */}
                 <div className="input">
                  <div className="icone">
                    <DomainAddIcon color="action" />
                  </div>
                  {/* <Autocomplete
                    fullWidth
                    size="small"
                    id="servicestation"
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
                  /> */}
                  
                   {/* <Autocomplete
        fullWidth
        size="small"
        id="servicestation"
        freeSolo
        onChange={(event, value) => handleAutocompleteChange(event, value, "servicestation")}
        value={stationName?.find((option) => option.optionvalue)?.label || selectedCustomerData.servicestation || book.servicestation || selectedStation ||''}
        options={allStations.map((Stationname) => ({ label: Stationname }))}
        getOptionLabel={(option) => option.label || selectedCustomerData.servicestation || book.servicestation || ''}
        renderInput={(params) => (
          <TextField {...params} label="Service Station" name="servicestation" inputRef={params.inputRef} />
        )}
      /> */}
      <Autocomplete
  fullWidth
  size="small"
  id="servicestation"
  freeSolo
  onChange={(event, value) => {
    handleAutocompleteChange(event, value, "servicestation");
    if (!value) {
      setSelectedState(''); // Clear selectedState if servicestation is empty
    }
  }}
  value={stationName?.find((option) => option.optionvalue)?.label || selectedCustomerData.servicestation || book.servicestation || selectedStation || ''}
  options={allStations.map((Stationname) => ({ label: Stationname }))}
  getOptionLabel={(option) => option.label || selectedCustomerData.servicestation || book.servicestation || ''}
  renderInput={(params) => (
    <TextField {...params} label="Service Station" name="servicestation" inputRef={params.inputRef} />
  )}
/>
                </div>
                <div className="input">
                  <div className='icone'>
                    <GrSelect />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="selectOption"
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
                <div className="input">
                  <div className="icone">
                    <StoreIcon color="action" />
                  </div>
                  <TextField
                    margin='noraml'
                    size='small'
                    name="entity"
                    autoComplete="new-password"
                    className='full-width'
                    value={selectedCustomerData?.entity || book.entity}
                    onChange={handleChange}
                    label="Entity"
                    id="entity"
                  />
                </div>
                <div className="input">
                  <div className='icone'>
                    <GrSelect />
                  </div>
                  {/* <Autocomplete
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
                  /> */}
                  {/* <Autocomplete
        fullWidth
        size="small"
        id="free-solo-demo-state"
        freeSolo
        onChange={(event, value) => handleAutocompleteChange(event, value, "state")}
        value={ book.state || selectedState || ''}
        options={Object.keys(stateToStations).map((state) => ({ label: state }))}
        renderInput={(params) => ( 
          <TextField {...params} label="State" name="state" inputRef={params.inputRef}/>
        )}
      /> */}
      {/* <Autocomplete
    fullWidth
    size="small"
    id="free-solo-demo-state"
    freeSolo
    value={selectedState ||book.state || ""}  // Make sure selectedState is used here
    onChange={(event, value) => handleAutocompleteChange(event, value, "state")}
    options={Object.keys(stateToStations)}  // List of available states
    renderInput={(params) => (
        <TextField {...params} label="State" name="state" inputRef={params.inputRef} />
    )}
/> */}
{/* <TextField
    fullWidth
    size="small"
    id="state-input"
    value={selectedState || book.state || ""}
    onChange={(event) => handleAutocompleteChange(event, event.target.value, "state")}
    label="State"
    name="state"
    disabled
/> */}
<TextField
  fullWidth
  size="small"
  id="state-input"
  value={selectedState || book.state || ""}
  onChange={(event) => handleAutocompleteChange(event, event.target.value, "state")}
  label="State"
  name="state"
  disabled
/>





                </div>
                <div className="input">
                  <div className='icone'>
                    <GrSelect />
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
                        <TextField {...params} label="Under Group" name="underGroup" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input dropdown">
                  <label htmlFor="gstTax">GST</label>
                  <select id="gstTax" className='full-width' name="gstTax" value={selectedCustomerData.gstTax || book.gstTax} onChange={handleChange}>
                    <option value="" >None</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                  </select>
                </div>
                <div className="input customer-billing-group-input">
                  <div className='customer-billing-group-input-division'>
                    {/* <FormLabel htmlFor='billinggrouph'>Billing Group</FormLabel>
                    <Switch label='label' id="billinggrouph" onClick={handleButtonClick} checked={isInputVisible} /> */}
                  </div>
                  <Autocomplete
                  size='small'
                  style={{ width: 180 }}
                    options={BillingGroup}  
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Billing Group" />}
                    onChange={(event, value) => handleAutocompleteChangebilling(event, value, "billingGroup")}
                    value={selectedCustomerData?.billingGroup ||book.billingGroup}
                    />

                  {/* {isInputVisible && (
                    <Autocomplete
                      size='small'
                      multiple
                      id="checkboxes-tags-demo"
                      options={BillingGroup}
                      onChange={(event, value) => handleAutocompleteChangebilling(event, value, "billingGroup")}
                      value={selectedCustomerData?.billingGroup
                        ? (typeof selectedCustomerData.billingGroup === 'string'
                          ? selectedCustomerData.billingGroup.split(',').map(item => item.trim()) // Trim extra spaces
                          : selectedCustomerData.billingGroup)
                        : []
                      }
                      isOptionEqualToValue={(option, value) => option === value}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      style={{ width: 170 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Billing Group" placeholder="Organization" />
                      )}
                    />
                  )} */}
                </div>
                <div className="input">
                  <div className='icone'>
                    <FaHashtag />
                  </div>
                  <TextField
                    name="gstnumber"
                    className='full-width'
                    label="GST Number"
                    value={selectedCustomerData?.gstnumber || book.gstnumber}
                    autoComplete="new-password"
                    onChange={handleChange}
                    id="gstnumber"
                    size='small'
                  />
                </div>
                <div className="input">
                  <div className='icone'>
                    <PermIdentityIcon />
                  </div>
                  <TextField
                    name="SalesPerson"
                    className='full-width'
                    value={selectedCustomerData?.SalesPerson || book.SalesPerson}
                    autoComplete="new-password"
                    onChange={handleChange}
                    label="Sales Person"
                    id="SalesPerson"
                    size='small'
                  />
                </div>
                <div className="input">
                  <div className='icone'>
                    <FaPercent />
                  </div>
                  <TextField
                    type='number'
                    className='full-width'
                    name="salesPercentage"
                    value={selectedCustomerData?.salesPercentage || book.salesPercentage}
                    autoComplete="new-password"
                    onChange={handleChange}
                    label="Percentage"
                    id="salesPercentage"
                    size='small'
                  />
                </div>

                <div className="input">
                  {isEditMode ? (
                    // <Button variant="contained" disabled={!Customer_modify} onClick={handleEdit}>Edit</Button>
                    <LoadingButton loading={btnloading} variant="contained" disabled={!Customer_modify} onClick={handleEdit}>Edit</LoadingButton>
                  ) : (
                    // <Button
                    //   variant="contained"
                    //   disabled={!Customer_new}
                    //   onClick={handleAdd}
                    //   style={{ marginRight: "100px" }}
                    // >
                    //   Add
                    // </Button>
                    <LoadingButton loading={btnloading}
                    variant="contained"
                    disabled={!Customer_new}
                    onClick={handleAdd}
                    style={{ marginRight: "100px" }}
                  >
                    Add
                  </LoadingButton>
                  )}
                </div>
              </div>
              <div className='alert-popup-main'>
                {error &&
                  <div className='alert-popup Error' >
                    <div className="popup-icon"> <ClearIcon /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                    <p>{errorMessage}</p>
                  </div>
                }
                {info &&
                  <div className='alert-popup Info' >
                    <div className="popup-icon"> <BsInfo /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                    <p>{infoMessage}</p>
                  </div>
                }
                {warning &&
                  <div className='alert-popup Warning' >
                    <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                    <p>{warningMessage}</p>
                  </div>
                }
                {success &&
                  <div className='alert-popup Success' >
                    <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
                    <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                    <p>{successMessage}</p>
                  </div>
                }
              </div>
              <div className="customer-speeddail">
                <Box className='common-speed-dail'>
                  <StyledSpeedDial
                    ariaLabel="SpeedDial playground example"
                    icon={<SpeedDialIcon />}
                    direction="left"
                  >
                    {Customer_read === 1 && (
                      <SpeedDialAction
                        key="list"
                        icon={<ChecklistIcon />}
                        tooltipTitle="List"
                        onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                      />
                    )}
                    {Customer_modify === 1 && isEditMode && (

                      <SpeedDialAction
                        key="edit"
                        icon={<ModeEditIcon />}
                        tooltipTitle="Edit"
                        onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                      />
                    )}
                    {Customer_delete === 1 && isEditMode && (
                      <SpeedDialAction
                        key="delete"
                        icon={<DeleteIcon />}
                        tooltipTitle="Delete"
                        onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                      />
                    )}
                    {Customer_new === 1 && !isEditMode && (
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

            <div className="customer-list-table-container-download">
              <div className='down-search-portion'>
                <div className="Download-btn-customer">
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
                <div className="detail-container">
                  <div className="container-left">
                    <div className="">
                      <div className="input-field vehicle-info-search-input-field">
                        <div className="input">
                          <div className="icone">
                            <AiOutlineFileSearch color="action" />
                          </div>
                          <TextField
                            size="small"
                            id="searchText"
                            className='full-width'
                            label="Search"
                            name="searchText"
                            value={searchText}
                            onKeyDown={handleenterSearch}
                            onChange={(e) => setSearchText(e.target.value)}
                          />
                        </div>
                        <div className="input">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="icone">
                              <DateRangeIcon color="action" />
                            </div>
                            <DatePicker
                              id="fromDate"
                              className='full-width'
                              label="From Date"
                              format="DD/MM/YYYY"
                              name='fromDate'
                              value={fromDate}
                              onChange={(date) => setFromDate(date)}
                            />
                          </LocalizationProvider>
                        </div>
                        <div className="input">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="icone">
                              <DateRangeIcon color="action" />
                            </div>
                            <DatePicker
                              id="toDate"
                              className='full-width'
                              label="To Date"
                              format="DD/MM/YYYY"
                              name="toDate"
                              value={toDate}
                              onChange={(date) => setToDate(date)}
                            />
                          </LocalizationProvider>
                        </div>
                        <div className="input">
                          <Button variant="contained" onClick={handleSearch}>Search</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-customer-lists">
            
                <Box
                  sx={{
                    height: 400, 
                    position: 'relative',// Adjust this value to fit your needs
                    '& .MuiDataGrid-virtualScroller': {
                      '&::-webkit-scrollbar': {
                        width: '8px', // Adjust the scrollbar width here
                        height: '8px', // Adjust the scrollbar width here
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#457cdc',
                        borderRadius: '20px',
                        minHeight: '60px', // Minimum height of the scrollbar thumb (scroll indicator)
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#3367d6',
                      },
                    },
                  }}
                >
                  {loading ? ( 
                                <Box
                                    sx={{
                                        position: 'absolute', 
                                        top: '50%',
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%)', 
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
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
                            )}
                </Box>
                          
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customer;
