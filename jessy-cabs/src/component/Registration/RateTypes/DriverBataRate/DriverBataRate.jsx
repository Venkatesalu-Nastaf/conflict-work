import React, { useEffect, useContext } from 'react';
import dayjs from "dayjs";
import "./DriverBataRate.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment, TextField } from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { VehicleType, Duty } from "./DriverBataRateData.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

//ICONS
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import useDriverbatarate from './useDriverbatarate.js';
import { PermissionContext } from '../../../context/permissionContext.js';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

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

const DriverBataRate = () => {

  const {
    selectedCustomerData,
    selectedCustomerId,
    rows,
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
    columns,
    isEditMode,
    handleEdit,
    loading,
    isDBRButtonLoading
  } = useDriverbatarate();

 

  // Permission ---------------------
  const { permissions } = useContext(PermissionContext)
  const RateManagement_read = permissions[10]?.read;
  const RateManagement_new = permissions[10]?.new;
  const RateManagement_modify = permissions[10]?.modify;
  const RateManagement_delete = permissions[10]?.delete;

  return (
    <div className="ratetype-form main-content-form Scroll-Style-hide">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-DriverBataRate">
              <div className="input-field DriverBataRate-inputfeild">
                <div className="input DriverBataRate-input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="from_date"
                      className='full-width'
                      label="From Date"
                      format="DD/MM/YYYY"
                      value={selectedCustomerData.fromdate ? dayjs(selectedCustomerData.fromdate) : null}
                      onChange={(date) => handleDateChange(date, 'fromdate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='fromdate' value={selectedCustomerData.fromdate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input DriverBataRate-input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="to_end"
                      className='full-width'
                      label="To Date"
                      format="DD/MM/YYYY"
                      value={selectedCustomerData.todate ? dayjs(selectedCustomerData.todate) : null}
                      onChange={(date) => handleDateChange(date, 'todate')}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField {...inputProps} inputRef={inputRef} name='todate' value={selectedCustomerData.todate} />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input DriverBataRate-input">
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-VehicleType"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "VehicleType")}
                    value={VehicleType.find((option) => option.optionvalue)?.label || selectedCustomerData?.VehicleType || ''}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.VehicleType || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Vehicle Type" name="VehicleType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>

                {/* </div>
              <div className="input-field DriverBataRate-inputfeild"> */}
                <div className="input">
                  <div className="icone">
                    <EngineeringIcon />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-duty"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "Duty")}
                    value={Duty.find((option) => option.optionvalue)?.label || selectedCustomerData?.Duty || ''}
                    options={Duty.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.Duty || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Duty" name="Duty" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <TextField
                    type='number'
                    size="small"
                    id="ExtraHours"
                    className='full-width'
                    label="Extra Hours"
                    name="ExtraHours"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraHours || book.ExtraHours}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <TextField
                    type='number'
                    size="small"
                    id="ExtraDays"
                    className='full-width'
                    label="Extra Days"
                    name="ExtraDays"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraDays || book.ExtraDays}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CurrencyRupeeRoundedIcon color="action" />
                  </div>
                  <TextField
                    type='number'
                    size="small"
                    className='full-width'
                    id="ExtraPerHoursPrice"
                    label="Extra Per Hours Price"
                    name="ExtraPerHoursPrice"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraPerHoursPrice || book.ExtraPerHoursPrice}
                    onChange={handleChange}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                  //     </InputAdornment>
                  //   ),
                  // }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CurrencyRupeeRoundedIcon color="action" />
                  </div>
                  <TextField
                    type='number'
                    size="small"
                    className='full-width'
                    id="ExtraPerDayPrice"
                    label="Extra Per Day Price"
                    name="ExtraPerDayPrice"
                    autoComplete="new-password"
                    value={selectedCustomerData?.ExtraPerDayPrice || book.ExtraPerDayPrice}
                    onChange={handleChange}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">< CurrencyRupeeRoundedIcon color="action" />
                  //     </InputAdornment>
                  //   ),
                  // }}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CurrencyRupeeRoundedIcon color="action" />
                  </div>
                  <TextField
                    type='number'
                    size="small"
                    id="Bata"
                    className='full-width'
                    label="Bata"
                    name="Bata"
                    autoComplete="new-password"
                    value={selectedCustomerData?.Bata || book.Bata}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <Button variant="contained">Show</Button>
                </div>
                <div className="input">
                  {isEditMode ? (
                    // <Button variant="contained" disabled={!RateManagement_modify} onClick={handleEdit}>Edit</Button>
                    <LoadingButton loading={isDBRButtonLoading} variant="contained" disabled={!RateManagement_modify} onClick={handleEdit}>Edit</LoadingButton>
                  ) : (
                    // <Button variant="contained" disabled={!RateManagement_new} onClick={handleAdd} >Add</Button>
                    <LoadingButton loading={isDBRButtonLoading} variant="contained" disabled={!RateManagement_new} onClick={handleAdd} >Add</LoadingButton>
                  )}
                </div>
              </div>
            </div>
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
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{successMessage}</p>
            </div>
          }
          {info &&
            <div className='alert-popup Info' >
              <div className="popup-icon"> <BsInfo /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{infoMessage}</p>
            </div>
          }
        </div>
        <Box className='common-speed-dail'>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >

            {RateManagement_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event, "List", selectedCustomerId)}
              />
            )}
            {RateManagement_modify === 1 && isEditMode &&(
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
              />
            )}
            {RateManagement_delete === 1 &&  isEditMode &&(
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
              />
            )}
            <SpeedDialAction
              key="Cancel"
              icon={<CancelPresentationIcon />}
              tooltipTitle="Cancel"
              onClick={(event) => handleClick(event, "Cancel", selectedCustomerId)}
            />
            {RateManagement_new === 1 && !isEditMode &&(
              <SpeedDialAction
                key="Add"
                icon={<BookmarkAddedIcon />}
                tooltipTitle="Add"
                onClick={(event) => handleClick(event, "Add", selectedCustomerId)}
              />
            )}
          </StyledSpeedDial>
        </Box>
        <div className="table-bookingCopy-DriverBataRate">
          <div className='driver-bata-rate-table'>
            {/* <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
            /> */}



            <Box
              sx={{
                height: 400, // Adjust this value to fit your needs
                position: 'relative',
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
                pageSize={5}
              />
                            )}
            </Box>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DriverBataRate