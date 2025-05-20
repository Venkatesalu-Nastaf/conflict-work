import React from 'react';
// import "./RateType.css";
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
import { TextField, DialogContent, DialogActions, Dialog, DialogTitle } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoadingButton from '@mui/lab/LoadingButton';

import "./CustomerInvoice.css"
import useCustomerInvoice from './useCustomerInvoice.js';
import { useCustomerPayment } from '../customerPaymentContext.js';
import CustomerPdfInvoice from './CustomerPdfInvoice.jsx';
import { useInvoiceCustomer } from './customerInvoiceContext.js';


const CustomerInvoice = ( {target} ) => {
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
    handleClick,
    handleRowClick,
    handleAdd,
    hidePopup,
    handleExcelDownload,
    handlePdfDownload,
    columns,
     isRateButtonLoading,
    rowdata,
    setDialogOpen,
    dialogOpen,

  } = useCustomerInvoice();

  const { openInvoice, setOpenInvoice } = useInvoiceCustomer()

  const { addPayment, paymentData } = useCustomerPayment()

  const handleGenerateInvoice = () => {

    const Id = rowdata.length + paymentData.length + 1;

    const newPayment = {
      ...selectedCustomerData,
      id: Id,
      status: "Pending",
      paymentdate: selectedCustomerData.date,
      totaltripsheet: selectedCustomerData.trips?.length || 1,
    };

    addPayment(newPayment);
    setDialogOpen(false);
  };

  return (
    <div className="main-content-form main-content-form-invoice Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-invoice">
              <div className="input-field invoice-inputs">

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
                        // value={selectedCustomerData?.ratename || book.ratename}
                        // onChange={handleChangecredent}
                        style={{
                        }}
                      />
                    </span>
                    {/* <span style={{ textAlign: 'center' }}>
                      <span style={{ color: "red" }}>{cerendentialdata ? `${selectedCustomerData?.ratetype || book.ratetype} Already Exist` : ""}</span>
                    </span> */}
                  </div>
                </div>

                <div className="input">
                  <div className='icone'>
                    <CalendarMonthIcon className='invoice-startdate-icon' />
                  </div>
                  <div>
                    <label>From Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem>
                        <DatePicker
                          id="startDate"
                          // value={
                          //   selectedCustomerData.starttime
                          //     ? dayjs(selectedCustomerData.starttime)
                          //     : null || book.starttime
                          //       ? dayjs(book.starttime)
                          //       : dayjs()
                          // }
                          format="DD/MM/YYYY"
                          // onChange={(date) => handleDateChange(date, "starttime")}
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
                    <CalendarMonthIcon className='invoice-startdate-icon' />
                  </div>
                  <div>
                    <label>To Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem>
                        <DatePicker
                          id="startDate2"
                          // value={
                          //   selectedCustomerData.closetime
                          //     ? dayjs(selectedCustomerData.closetime)
                          //     : null || book.closetime
                          //       ? dayjs(book.closetime)
                          //       : dayjs()
                          // }
                          format="DD/MM/YYYY"
                          // onChange={(date) => handleDateChange(date, "closetime")}
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

                <div className="add-edit-invoice input">
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
        
        <div className="table-bookingCopy-invoice">
          <div className='invoice-table'>
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
                rows={rowdata}
                columns={columns}
                onRowClick={handleRowClick}
                pageSize={5}
                checkboxSelection
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

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Customer Trip Details</DialogTitle>
        <DialogContent dividers>
          {selectedCustomerData && (
            <Box
              sx={{
                height: 400,
                width: '100%',
                position: 'relative',
                '& .MuiDataGrid-virtualScroller': {
                  '&::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#457cdc',
                    borderRadius: '20px',
                    minHeight: '60px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#3367d6',
                  },
                },
              }}
            >
              <DataGrid
                rows={(selectedCustomerData?.trips || []).map((trip, i) => ({
                  id: i + 1,
                  ...trip,
                  customername: selectedCustomerData.customername,
                }))}
                columns={[
                  { field: 'tripNo', headerName: 'TripNo', width: 70, headerAlign: 'center' },
                  { field: "customername", headerName: "Customer Name", width: 180, headerAlign: 'center' },
                  { field: "amount", headerName: "Amount", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
                  { field: "tollparking", headerName: "Toll Parking", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
                  { field: "advancepayment", headerName: "Advance Payment", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
                  { field: "totalkm", headerName: "TotalKM", width: 180, headerAlign: 'center', valueFormatter: (params) => `${params.value} km`, },
                  { field: "vehiclepermit", headerName: "Vehicle Permit", width: 180, headerAlign: 'center' },
                  { field: "fuelamount", headerName: "Fuel Amount", width: 180, headerAlign: 'center', valueFormatter: (params) => `₹${params.value}`, },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  '& .MuiDataGrid-cell': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    textAlign: 'center',
                  },
                  border: 0,
                }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary"
             onClick={() => { setOpenInvoice(true); setDialogOpen(false) }}
          >
            View Invoice
          </Button>
          <Button variant="contained" color="primary" onClick={handleGenerateInvoice} >
            Generate Invoice
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openInvoice}
        onClose={() => setOpenInvoice(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            height: '95vh',
            boxShadow: 10,
            overflow: 'hidden',
            backgroundColor: '#f0f2f5',
            borderRadius: 0,
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            m: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          <CustomerPdfInvoice />
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CustomerInvoice;
;