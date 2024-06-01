import React, { useEffect, useContext } from 'react';
import 'jspdf-autotable';
import dayjs from "dayjs";
import "./Accountinfo.css";
import Box from "@mui/material/Box";
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
import { PermissionContext } from '../../../context/permissionContext';

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
// import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import LocationCityIcon from "@mui/icons-material/LocationCity";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useAccountinfo from './useAccountinfo';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { GrSelect } from "react-icons/gr";
import { FaCarOn } from "react-icons/fa6";

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

const Accuntinfo = () => {

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
    handleDateChange,
    handleAutocompleteChange,
    handleExcelDownload,
    handlePdfDownload,
    rows,
    columns,
    isEditMode,
    handleEdit,
  } = useAccountinfo();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  // Permission ------------
  const { permissions } = useContext(PermissionContext)
  const Supllier_read = permissions[10]?.read;
  const Supllier_new = permissions[10]?.new;
  const Supllier_modify = permissions[10]?.modify;
  const Supllier_delete = permissions[10]?.delete;

  return (
    <div className="account-form">
      <form onSubmit={handleClick}>
        <div className="detail-container-main-account">
          <div className="container-left-account">
            <div className="input-field account-info-input-feild">
              <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>
                <TextField
                  name="accountNo"
                  label="Account No"
                  margin="normal"
                  size="small"
                  id="accountNo"
                  className='full-width'
                  autoComplete="new-password"
                  value={selectedCustomerData?.accountNo || book.accountNo}
                  onChange={handleChange}
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CalendarMonthIcon color="action" />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    id="date1"
                    value={selectedCustomerData.Accdate ? dayjs(selectedCustomerData.Accdate) : null || book.Accdate ? dayjs(book.Accdate) : null}
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, 'Accdate')}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.Accdate} />
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
                  className='full-width'
                  value={selectedCustomerData?.vehicleTravels || book.vehicleTravels}
                  onChange={handleChange}
                  label="Vehicle/Travels"
                  id="vehicleTravels"
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
                  className='full-width'
                  value={selectedCustomerData?.phone || book.phone}
                  onChange={handleChange}
                  label="Phone"
                  id="phone"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  id="address123"
                  className='full-width'
                  label="Address"
                  name="address1"
                  multiline
                  rows={2}
                  sx={{ width: "100%" }}
                  autoComplete="new-password"
                  value={selectedCustomerData?.address1 || book.address1}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  name="cperson"
                  autoComplete="new-password"
                  className='full-width'
                  value={selectedCustomerData?.cperson || book.cperson}
                  onChange={handleChange}
                  label="C Person"
                  id="cperson"
                  variant="standard"
                />
              </div>
              <div className="input radio">
                <div className='icone'>
                  <GrSelect />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="underGroup"
                  freeSolo
                  sx={{ width: "100%" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "underGroup")}
                  value={Undergroup.find((option) => option.Option)?.label || selectedCustomerData?.underGroup || ''}
                  options={Undergroup.map((option) => ({
                    label: option.Option,
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
              <div className="input">
                <div className="icone">
                  <AttachEmailIcon color="action" />
                </div>
                <TextField
                  name="email"
                  autoComplete="new-password"
                  className='full-width'
                  value={selectedCustomerData?.email || book.email}
                  onChange={handleChange}
                  label="Email"
                  id="email"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className='icone'>
                  <FaCarOn />
                </div>
                <TextField
                  type="number"
                  name='vehCommission'
                  autoComplete="new-password"
                  value={selectedCustomerData?.vehCommission || book.vehCommission}
                  onChange={handleChange}
                  label="Veh.Commission"
                  size="small"
                  id="vehCommission"
                  sx={{ width: "100%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="input radio">
                <div className="icone">
                  <StoreIcon color="action" />
                </div>
                <TextField
                  name="entity"
                  autoComplete="new-password"
                  className='full-width'
                  value={selectedCustomerData?.entity || book.entity}
                  onChange={handleChange}
                  label="Opening Balance"
                  id="entity"
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className='icone'>
                  <FaCarOn />
                </div>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="vehicleInfo"
                  freeSolo
                  sx={{ width: "100%" }}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleInfo")}
                  value={Vehicleinfo.find((option) => option.Option)?.label || selectedCustomerData?.vehicleInfo || ''}
                  options={Vehicleinfo.map((option) => ({
                    label: option.Option,
                  }))}
                  getOptionLabel={(option) => option.label || selectedCustomerData?.vehicleInfo || ''}
                  renderInput={(params) => {
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
        <div className="input-field account-info-label">
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
              className='full-width'
              value={selectedCustomerData?.rateType || book.rateType}
              onChange={handleChange}
              label="Rate Type"
              id="rateType"
              variant="standard"
            />
          </div>
          <div className="input">
            {isEditMode ? (
              <Button variant="contained" disabled={!Supllier_modify} onClick={handleEdit}>Edit</Button>
            ) : (
              <Button variant="contained" disabled={!Supllier_new} onClick={handleAdd} >Add</Button>
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
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{warningMessage}</p>
            </div>
          }
          {info &&
            <div className='alert-popup Info' >
              <div className="popup-icon"> <BsInfo /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{infoMessage}</p>
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
        <div className="SpeedDial account-info-speed-dail">
          <Box sx={{ position: "relative", mt: 3, height: 320 }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<SpeedDialIcon />}
              direction="left"
            >
              {Supllier_read === 1 && (
                <SpeedDialAction
                  key="list"
                  icon={<ChecklistIcon />}
                  tooltipTitle="List"
                  onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                />
              )}
              {Supllier_modify === 1 && (
                <SpeedDialAction
                  key="edit"
                  icon={<ModeEditIcon />}
                  tooltipTitle="Edit"
                  onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                />
              )}
              {Supllier_delete === 1 && (
                <SpeedDialAction
                  key="delete"
                  icon={<DeleteIcon />}
                  tooltipTitle="Delete"
                  onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                />
              )}
              {Supllier_new === 1 && (
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
