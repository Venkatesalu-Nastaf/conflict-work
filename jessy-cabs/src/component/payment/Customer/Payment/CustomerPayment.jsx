import React, { useContext } from 'react';
import "jspdf-autotable";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import RateReviewIcon from '@mui/icons-material/RateReview';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoadingButton from '@mui/lab/LoadingButton';
import "./CustomerPayment.css"
import useCustomerPayment from './useCustomerPayment.js';
import { CustomerPaymentContext } from '../customerPaymentContext.js';


const CustomerPayment = () => {
  const {
    selectedCustomerData,
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
    handleAdd,
    hidePopup,
    handleExcelDownload,
    handlePdfDownload,
    columns,
    handleDateChange, cerendentialdata, handleChangecredent,
     isRateButtonLoading,
    rowdata,
    setUpdateRow,
    handleCellClick,
    apiRef
  } = useCustomerPayment();

  // Permission ------------

  const { paymentData } = useContext(CustomerPaymentContext)

  const row = [...rowdata, ...paymentData];


  return (
    <div className="main-content-form main-content-form-vendor Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-vendorpayment">
              <div className="input-field vendor-payment-inputs">

                <div className="input">
                  <div className='full-width' style={{ display: 'grid' }}>
                    <span className='full-width' style={{ display: 'flex' }}>
                      <div className="icone">
                        <RateReviewIcon color="action" />
                      </div>
                      <TextField
                        size="small"
                        id="ratename"
                        className='full-width'
                        label="Customers Name"
                        name="customersname"
                        value={selectedCustomerData?.ratename || book.ratename}
                        onChange={handleChangecredent}
                        style={{
                        }}
                      />
                    </span>
                    <span style={{ textAlign: 'center' }}>
                      <span style={{ color: "red" }}>{cerendentialdata ? `${selectedCustomerData?.ratetype || book.ratetype} Already Exist` : ""}</span>
                    </span>
                  </div>
                </div>

                <div className="input">
                  <div className='icone'>
                    <CalendarMonthIcon className='vendorpayment-startdate-icon' />
                  </div>
                  <div>
                    <label>From Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem>
                        <DatePicker
                          id="startDate"
                          value={
                            selectedCustomerData.starttime
                              ? dayjs(selectedCustomerData.starttime)
                              : null || book.starttime
                                ? dayjs(book.starttime)
                                : dayjs()
                          }
                          format="DD/MM/YYYY"
                          onChange={(date) => handleDateChange(date, "starttime")}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField
                              {...inputProps}
                              inputRef={inputRef}
                              value={selectedCustomerData?.starttime}
                            />
                          )}
                        </DatePicker>
                      </DemoItem>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="input">
                  <div className='icone'>
                    <CalendarMonthIcon className='vendorpayment-startdate-icon' />
                  </div>
                  <div>
                    <label>To Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem>
                        <DatePicker
                          id="startDate2"
                          value={
                            selectedCustomerData.closetime
                              ? dayjs(selectedCustomerData.closetime)
                              : null || book.closetime
                                ? dayjs(book.closetime)
                                : dayjs()
                          }
                          format="DD/MM/YYYY"
                          onChange={(date) => handleDateChange(date, "closetime")}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField
                              {...inputProps}
                              inputRef={inputRef}
                              value={selectedCustomerData?.closetime}
                            />
                          )}
                        </DatePicker>
                      </DemoItem>
                    </LocalizationProvider>
                  </div>

                </div>

                <div className="add-edit-vendorpayment input">
                  <LoadingButton loading={isRateButtonLoading} variant="contained"
                    onClick={handleAdd} >Submit</LoadingButton>
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
        <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", paddingBottom: "10px" }}>
          <div className="Download-btn">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    endIcon={<ExpandCircleDownOutlinedIcon />}
                    {...bindTrigger(popupState)}
                    style={{ marginTop: '20px' }}
                  >
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
                   
       
        <div className="table-bookingCopy-vendorpayment">
          <div className='vendorpayment-table'>
            <Box
              sx={{
                height: 400,
                position: 'relative', // Adjust this value to fit your needs
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
                apiRef={apiRef}
                rows={row}
                columns={columns}
                // onRowClick={handleRowClick}
                pageSize={5}
                checkboxSelection
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={(updatedRow) => {
                  const updatedRows = row.map(r => r.id === updatedRow.id ? updatedRow : r);
                  setUpdateRow(updatedRows);
                  return updatedRow;
                }}
                editMode="cell"
                onCellClick={handleCellClick}
                sx={{
                  '& .MuiDataGrid-root': {
                    height: '100px',
                  },
                  '& .MuiDataGrid-cell': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    textAlign: 'center',
                  },
                }}
              />

            </Box>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CustomerPayment;