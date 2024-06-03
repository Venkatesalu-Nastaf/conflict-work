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
    totalAmount,
    paidAmount,
    pendingAmount,
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
    <div className="PaymentDetail-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main detail-container-main-payment">
          <div className="container-left">
            <div className="copy-title-btn-PaymentDetail">
              <div className="input-field input-field-payment">
                <div className="input input-payment"  >
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="billingno"
                    label="Billing No"
                    name="billingno"
                    value={billingno || ''}
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
                    id="free-solo-Organization"
                    freeSolo
                    size="small"
                    value={customer}
                    options={organizationNames}
                    onChange={handleInputChange}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Organization" inputRef={params.inputRef} />
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
              </div>
              <div className="input-field payment-search-field">
                <div className="input">
                  <Button variant="contained" disabled={!Billing_read} onClick={handleShow} >Search</Button>
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
        <div className='total-container'>
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
          <div className='amount-calculator'>
            <div className='total-inputs' >
              <label htmlFor="toatlAmount">Total Amount:</label>
              <input type="number" id="toatlAmount" value={totalAmount} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="paindAmounts">Paid Amount:</label>
              <input type="number" id="paindAmounts" value={paidAmount} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="pendingAmount">Pending Amount:</label>
              <input type="number" id="pendingAmount" value={pendingAmount} readOnly />
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-PaymentDetail">
          <div className='payment-table'>
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowClick={(event) => handleButtonClickTripsheet(event.row)}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </form>
    </div>
  )

}

export default PaymentDetail