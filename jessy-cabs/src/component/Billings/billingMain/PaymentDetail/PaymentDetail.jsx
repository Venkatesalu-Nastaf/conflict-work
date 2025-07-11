import React, { useEffect, useContext } from 'react';
import "./PaymentDetail.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete, Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import ListAltIcon from "@mui/icons-material/ListAlt";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import usePaymentdetails from './usePaymentdetails';
import { PermissionContext } from '../../../context/permissionContext';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box } from '@mui/material';

const PaymentDetail = ({ organizationNames }) => {

  const {
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    handleClick,
    handleKeyDown,
    hidePopup,
    billingno,
    handleInputChange,
    customer,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShow,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    handleButtonClickTripsheet,
    columns

    // ... (other state variables and functions)
  } = usePaymentdetails();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);
  const { permissions } = useContext(PermissionContext)
  const Billing_read = permissions[5]?.read;

  return (
    <div className="PaymentDetail-form main-content-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-PaymentDetail">
              <div className="input-field input-field-payment">
                <div className="input input-payment"  >
                  <div className="icone">
                    <ListAltIcon color="action"/>
                  </div>
                  <TextField
                    size="small"
                    id="billingno"
                    className='full-width'
                    label="Billing No"
                    name="billingno"
                    value={billingno || ''}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    autoComplete='off'
                  />
                </div>
                <div className="input input-payment" >
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="organization"
                    freeSolo
                    size="small"
                    value={customer}
                    name="customer"
                    options={organizationNames?.map((option) => ({ label: option }))}
                    getOptionLabel={(option) => typeof option === "string" ? option : option.label || ''}  
                    onChange={(event,value) => handleInputChange(event,value,"customer")}
                    renderInput={(params) =>{
                      return (
                        <TextField {...params} label="Organization" name="customer" inputRef={params.inputRef} />
                      );
                    }}

                  />
                </div>
                <div className="input" >
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="From Date"
                        id="fromDate"
                        format="DD/MM/YYYY"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input" >
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="To Date"
                        id="toDate"
                        format="DD/MM/YYYY"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <Button className='full-width' variant="contained" disabled={!Billing_read} onClick={handleShow}>Search</Button>
                </div>
              </div>
              {/* <div className="input-field payment-search-field">
                <div className="input">
                  <Button variant="contained" disabled={!Billing_read} onClick={handleShow} >Search</Button>
                </div>
              </div> */}
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
        <div className='total-container' style={{ justifyContent: "flex-start" }}>
          <div className="Download-btn">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" disabled={!Billing_read} endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
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

        </div>
        <div className="table-bookingCopy-PaymentDetail">
          <div className='payment-table'>
            <Box
              sx={{
                height: 400, // Adjust this value to fit your needs
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
              <DataGrid
                rows={reversedRows}
                columns={columns}
                onRowClick={(event) => handleButtonClickTripsheet(event.row)}
                pageSize={5}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>

          </div>
        </div>
      </form>
    </div>
  )

}

export default PaymentDetail