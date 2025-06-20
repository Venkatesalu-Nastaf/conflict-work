import React, { useContext, useRef, useEffect } from 'react'
import "./BillWiseReceipt.css";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { MdOutlineEventNote } from "react-icons/md";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import useBillWiseReceipt from './useBillWiseReceipt';
import dayjs from 'dayjs';
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
// ICONS
import BadgeIcon from "@mui/icons-material/Badge";
import { PermissionContext } from "../../../context/permissionContext";




export const BillWiseReceipt = () => {

  const { organization, accountDetails, billWiseReport, setBillWiseReport, handlePendingBills
    , rows, pendingBillRows, columns, columnsPendingBill, handleApplyBill, handleRowSelection,
    //  handleBalanceAmount,
    totals, handlechange, handleAddBillReceive, error, errorMessage, success, successMessage, hidePopup, handlePending, handleCollectedChange,
    voucherID, selectedRows
  } = useBillWiseReceipt();
  const { permissions } = useContext(PermissionContext)
  // const Report_read = permissions[1]?.read;
  const Report_add = permissions[1]?.new;

  // const Report_create = permissions[8]?.delete;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBillWiseReport((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    setBillWiseReport((prevState) => ({
      ...prevState,
      Date: date.format('YYYY-MM-DD'),
    }));
  };
  const voucherRef = useRef(null);

  useEffect(() => {
    if (voucherID && voucherRef.current) {
      voucherRef.current.focus();
    }
  }, [voucherID])

  return (
    <>
      <div className="main-content-form Scroll-Style-hide">
        <form >
          <div className="detail-container-main-Employe">
            <div className="container-Employe">
              <div className="input-field employee-input-feilds">
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="voucher ID"
                    className="full-width"
                    label="Voucher ID"
                    name="VoucherId"
                    value={voucherID || ""}
                    autoComplete="new-password"
                    inputRef={voucherRef}
                    // aria-readonly
                    
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <DatePicker
                      id="Date"
                      name='Date'
                      label=" Date"
                      format="DD/MM/YYYY"
                      value={dayjs(billWiseReport.Date)}
                      onChange={handleDateChange}                    >
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <MdOutlineEventNote color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="cover Note"
                    className="full-width"
                    label="Cover Note"
                    name="cover Note"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <WorkOutlineRoundedIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="cheque No"
                    className="full-width"
                    label="Cheque No"
                    name="cheque No"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <MdOutlineEventNote color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Narration"
                    className="full-width"
                    label="Narration"
                    name="Narration"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Customer Name</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Customer Id"
                      name='CustomerName'
                      onChange={handleInputChange}
                      value={billWiseReport.CustomerName}
                    >
                      {organization.map((org) => (
                        <MenuItem key={org} value={org}>
                          {org}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Account To</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Account To"
                      name='AccountDetails'
                      value={billWiseReport.AccountDetails}
                      onChange={handleInputChange}
                    >
                      {accountDetails.map((org) => (
                        <MenuItem key={org} value={org}>
                          {org}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="voucher ID"
                    className="full-width"
                    label="Voucher ID"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <DatePicker
                      id="Date"
                      label=" Date"
                      format="DD/MM/YYYY"
                    >
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="unique id"
                    className="full-width"
                    label="Unique Id"
                    name="UniqueID"
                  />
                </div>
              </div>
              <div className='bill-wise-reciept-table-main' style={{ display: 'flex', gap: "20px", }}>
                <div className='bill-wise-reciept-table-first'>
                  <div className='amount-calculator'>
                    <div className='total-inputs' >
                      <label htmlFor="">Amount:</label>
                      <input type="text" value={totals.amount} />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Recieved:</label>
                      <input type="text" value={totals.recieved} />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Discount:</label>
                      <input type="text" />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Total Amount:</label>
                      <input type="text" value={totals.totalAmount} />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Balance:</label>
                      <input type="text" value={totals.totalBalance} />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Collected Amount:</label>
                      <input type="text" value={totals.collectedAmount} onChange={(e) => handleCollectedChange(e)} />
                    </div>
                    <div className='total-inputsss'>
                      <Button variant='contained' onClick={handlePending}>Pending </Button>
                      <Button variant='contained' disabled={!Report_add} onClick={handleAddBillReceive}>ADD</Button>
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">On A/C:</label>
                      <input type="text" value={billWiseReport.AccountDetails} />
                    </div>

                    <div className='total-inputs' >
                      <label htmlFor="">TDS:</label>
                      <input type="text" onChange={(e) => handlechange(e)} value={totals.tds} />
                    </div>

                  </div>
                  <div className='bill-wise-reciept-table'>
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
                        rows={rows}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                      />
                    </Box>
                  </div>
                </div>

                <div className='bill-wise-reciept-table-second'>
                  <div style={{ display: 'flex', gap: '10px', paddingBottom: '10px' }}>
                    {/* <Button variant='contained' onClick={handleBalanceAmount}>Balance Amount</Button> */}
                    <Button variant='contained' onClick={handlePendingBills}>Show Pending Bills</Button>
                    <Button variant='contained' onClick={handleApplyBill}>Apply to list</Button>
                  </div>
                  <div className='bill-wise-reciept-table-right-side'>
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
                        rows={pendingBillRows}
                        columns={columnsPendingBill}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        rowSelectionModel={selectedRows} // Control selection
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                          handleRowSelection(newRowSelectionModel);
                        }}
                      />
                    </Box>
                  </div>
                </div>

              </div>
              <div className="alert-popup-main">
                {error && (
                  <div className="alert-popup Error">
                    <div className="popup-icon">
                      {" "}
                      <ClearIcon />{" "}
                    </div>
                    <span className="cancel-btn" onClick={hidePopup}>
                      <ClearIcon color="action" />{" "}
                    </span>
                    <p>{errorMessage}</p>
                  </div>
                )}
                {success && (
                  <div className="alert-popup Success">
                    <div className="popup-icon">
                      <FileDownloadDoneIcon />
                    </div>
                    <span className="cancel-btn" onClick={hidePopup}>
                      <ClearIcon color="action" />
                    </span>
                    <p>{successMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
