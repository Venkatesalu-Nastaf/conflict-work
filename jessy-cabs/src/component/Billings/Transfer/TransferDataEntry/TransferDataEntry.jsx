import React, { useEffect, useContext } from 'react';
import "./TransferDataEntry.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { Autocomplete } from "@mui/material";
import { PermissionContext } from '../../../context/permissionContext';
//for pdf

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { faBuilding, faFileInvoiceDollar, faTags } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useTransferdataentry from './useTransferdataentry';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TransferDataEntry = ({ stationName, organizationNames }) => {

  const {
    rows,
    actionName,
    error,
    success,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    handleClick,
    hidePopup,
    date,
    Billingdate,
    selectedCustomerDatas,
    invoiceno,
    handleKeyenter,
    customer,
    tripData,
    setCustomer,
    fromDate,
    handleDateChange,
    setFromDate,
    toDate,
    setToDate,
    info,
    infoMessage,
    servicestation,
    handleserviceInputChange,
    handleShow,
    handleCancel,
    handleClickGenerateBill,
    handleExcelDownload,
    handlePdfDownload,
    handleBillRemove,
    handleAddOrganization,
    totalKm,
    totalTime,
    totalAmount,
    columns,
    setRowSelectionModel,
    handleRowSelection,
    formDataTransfer,
    handlechnageinvoice,
    groupId,
    setGroupId
    // ... (other state variables and functions)
  } = useTransferdataentry();


  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const { permissions } = useContext(PermissionContext)
  const Transfer_read = permissions[6]?.read;
  const Transfer_new = permissions[6]?.new;

  return (
    <div className="TransferDataEntry-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main detail-container-main-transfer-data">
          <div className="TransferDataEntry">
            <div className="container-left-transferdata">
              <div className="copy-title-btn-TransferDataEntry">
                <div className="input-field input-feild-transferdata">
                  <div className="input">
                    <div className="icone">
                      <FontAwesomeIcon icon={faTags} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="tripid"
                      label="Group Trip ID"
                      name="tripid"
                      value={groupId || ''}
                      onChange={(e) => setGroupId(e.target.value)}
                      autoComplete='off'
                    />
                  </div>
                  <div className='input'>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="Date"
                          id="date"
                          name="date"
                          value={date}
                          format="DD/MM/YYYY"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className='input'>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          id="Billingdate"
                          label="Bill Date"
                          name="Billingdate"
                          value={Billingdate || selectedCustomerDatas?.Billingdate ? dayjs(selectedCustomerDatas?.Billingdate) : null}
                          format="DD/MM/YYYY"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="invoiceno"
                      label="Invoice No"
                      name="invoiceno"
                      value={invoiceno || ''}
                      onChange={(event) => handlechnageinvoice(event)}
                      autoComplete='off'
                      onKeyDown={handleKeyenter}
                    />
                  </div>
                  <div className="input">
                    <div className="icone">
                      <HailOutlinedIcon color="action" />
                    </div>
                    <Autocomplete
                      fullWidth
                      id="free-solo-Organization"
                      freeSolo
                      size="small"
                      value={customer || ''}
                      options={organizationNames}
                      onChange={(event, value) => setCustomer(value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
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
                        id="fromDate"
                          value={selectedCustomerDatas.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate || formDataTransfer?.FromDate ? dayjs(formDataTransfer?.FromDate) : "" || ''}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'fromdate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                            setFromDate(parsedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.fromdate} />
                          )}
                        </DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input">
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                        id="toDate"
                          value={selectedCustomerDatas.todate ? dayjs(selectedCustomerDatas.todate) : toDate || formDataTransfer?.EndDate ? dayjs(formDataTransfer?.EndDate) : "" || ''}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'todate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                            setToDate(parsedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.todate} />
                          )}
                        </DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faBuilding} size="xl" />
                    </div>
                    <Autocomplete
                      fullWidth
                      id="free-station"
                      freeSolo
                      size="small"
                      value={servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || ''}
                      options={stationName.map((option) => ({
                        label: option.Stationname,
                      }))}
                      onChange={(event, value) => handleserviceInputChange(event, value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Stations" name='station' inputRef={params.inputRef} />
                        );
                      }}
                    />
                  </div>
                  <div className="input">
                    <Button variant="contained" disabled={!Transfer_read} onClick={handleShow} >List</Button>
                  </div>
                  <div className="input">
                    <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                  </div>
                  <div className="input">
                    <Button variant="outlined" disabled={!Transfer_new} onClick={handleClickGenerateBill} >Bill Generate</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="total-container-TransferDataEntry">
          <div className="Download-btn">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <>
                  <Button variant="contained" disabled={!Transfer_read} endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                    <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          </div>
          <div className='amount-calculator'>
            <div className="total-inputs">
              <Button variant="contained" disabled={!Transfer_new} onClick={handleAddOrganization} >Add To List</Button>
            </div>
            <div className="total-inputs">
              <Button variant="outlined" onClick={handleBillRemove} >Remove Selected</Button>
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Kms:</label>
              <input type="text" value={totalKm} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Hours:</label>
              <input type="text" value={totalTime} readOnly />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Amount:</label>
              <input type="text" value={totalAmount} readOnly />
            </div>
          </div>
        </div>
        <div className="table-bookingCopy-TransferDataEntry">
          <div className='transfer-data-entry-table'>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
                handleRowSelection(newRowSelectionModel);
              }}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
          <div className='alert-popup-main'>
            {error &&
              <div className='alert-popup Error'>
                <div className="popup-icon"><ClearIcon /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                <p>{errorMessage}</p>
              </div>
            }
            {success &&
              <div className='alert-popup Success'>
                <div className="popup-icon"><FileDownloadDoneIcon /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                <p>{successMessage}</p>
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
          </div>
        </div>
      </form>
    </div>
  )
}

export default TransferDataEntry