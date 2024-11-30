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
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const TransferDataEntry = ({ stationName, organizationNames }) => {
  const {
    rows,
    error,
    success,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    hidePopup,
    Billingdate,
    selectedCustomerDatas,
    invoiceno,
    // handleKeyenter,
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
    setGroupId,
    handleAddGroup,
    handleKeyDown,
    handleRemove,
    loading,
    setLoading,
    setServiceStation,
    setInfo,
    setINFOMessage,
    handlecustomer, isbtnloading, setisbtnloading, iseditloading, setiseditloading, isbillloading, setisbillloading,
    addEditTrigger, setAddEditTrigger
    //  groupstation
    // ... (other state variables and functions)
  } = useTransferdataentry();


  // useEffect(() => {
  //   if (actionName === 'List') {
  //     handleClick(null, 'List');
  //   }
  // }, [actionName, handleClick]);

  const { permissions } = useContext(PermissionContext)
  const Transfer_read = permissions[6]?.read;
  const Transfer_new = permissions[6]?.new;
  const Transfer_delete = permissions[6]?.new;
  const groupdisable = groupId ? true : false
  //  const ddd = groupId ? "uedd" : "moo"
  //   console.log(servicestation ,"stst",selectedCustomerDatas.station,"stationnsnsnnnns")
  //   console.log(ddd,"sttenary",groupstation)

const invoiceNoCheck = invoiceno==="" || invoiceno===null || invoiceno===undefined

  return (
    <div className="TransferDataEntry-form main-content-form Scroll-Style-hide">
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
                      className='full-width'
                      label="Group Trip ID"
                      name="tripid"
                      value={groupId || ''}
                      onKeyDown={handleKeyDown}
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
                          id="Billingdate"
                          className='full-width'
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
                      className='full-width'
                      label="Invoice No"
                      name="invoiceno"
                      value={invoiceno || ''}
                      onChange={(event) => handlechnageinvoice(event)}
                      autoComplete='off'
                      // onKeyDown={handleKeyenter}
                      disabled={groupdisable}

                    />
                  </div>
                  <div className="input">
                    <div className="icone">
                      <HailOutlinedIcon color="action" />
                    </div>
                    <Autocomplete
                      fullWidth
                      id="free-solo-Organization"
                      className='full-width'
                      freeSolo
                      size="small"
                      value={customer || ''}
                      options={organizationNames}

                      onChange={(event, value) => handlecustomer(value)}

                      //  onChange={(event, value) => {
                      //   if (!groupId) {
                      //     setCustomer(value)

                      //   }
                      //    else {

                      //     setInfo(true)
                      //     setINFOMessage("not change customer ")
                      //   }
                      //   }}
                      // onChange={(event, value) => setCustomer(value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
                        );
                      }}
                    />
                  </div>
                  <div className="input">
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="From Date"
                          id="fromDate"
                          className="full-width"
                          value={
                            fromDate || selectedCustomerDatas?.fromdate
                              ? dayjs(fromDate || selectedCustomerDatas?.fromdate)
                              : fromDate || formDataTransfer?.FromDate
                                ? dayjs(formDataTransfer?.FromDate)
                                : dayjs() // Set today's date if no value is available
                          }
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'fromdate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            setFromDate(formattedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField
                              {...inputProps}
                              inputRef={inputRef}
                              value={selectedCustomerDatas?.fromdate || fromDate || dayjs().format('DD/MM/YYYY')}
                            />
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
                          label="To Date"
                          id="toDate"
                          className='full-width'
                          value={toDate || selectedCustomerDatas.todate ? dayjs(toDate || selectedCustomerDatas.todate) : toDate || formDataTransfer?.EndDate ? dayjs(formDataTransfer?.EndDate) : "" || ''}
                          format="DD/MM/YYYY"
                          onChange={(date) => {
                            handleDateChange(date, 'todate');
                            const formattedDate = dayjs(date).format('YYYY-MM-DD');
                            const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                            setToDate(parsedDate);
                          }}
                        >
                          {({ inputProps, inputRef }) => (
                            <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.todate || toDate} />
                          )}
                        </DatePicker>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faBuilding} size="xl" />
                    </div>
                    {/* <Autocomplete
                      fullWidth
                      id="free-station"
                      className='full-width'
                      freeSolo
                     
                      size="small"
                      // value={servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || ''}
                      value={servicestation || selectedCustomerDatas.station || ''}
                      // value={groupId ? groupstation : servicestation }
                      // inputValue={groupId ? groupstation : servicestation || ""}
                      // inputValue={ servicestation || ""}
                      options={Statename.map((option) => ({
                          label:option.state
                        }))}
                        // options={stationName
                        //   .filter((option) => option.Stationname !== "All") // Filter out "All" before mapping
                        //   .map((option) => ({
                        //     label:option.Stationname
                        //   }))}
                      // options={stationName.map((option) => ({
                      //   label: option.Stationname,
                      // }))}
                      // onChange={(event, value) => {
                      //   if (!groupId) {
                      //     handleserviceInputChange(event, value)
                      //   } else {
                        
                      //     setInfo(true)
                      //     setINFOMessage("not change stations ")
                      //   }

                      // }}
                      onChange={(event)=>setServiceStation(event.target.value)}
                      // onChange={(event, value) => handleserviceInputChange(event, value)}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} label="State" name='station' inputRef={params.inputRef}
                          //  value={groupId ? groupstation : servicestation }  
                             />
                        );
                      }}
                    /> */}



                    <TextField
                      size="small"
                      id="freet-station"
                      className='full-width'

                      label="State"
                      name='station'
                      value={servicestation || ""}

                      autoComplete='off'
                    />
                  </div>
                  <div className="input">
                    <Button variant="contained" disabled={!Transfer_read} onClick={() => handleShow()} >List</Button>
                  </div>
                  <div className="input">
                    <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                  </div>
                  {invoiceno ? <></> :
                    <div className="input">
                      {/* <Button variant="outlined" disabled={!Transfer_new} onClick={handleClickGenerateBill} >Bill Generate</Button> */}
                      <LoadingButton loading={isbillloading} variant="outlined" disabled={!Transfer_new} onClick={handleClickGenerateBill} >Bill Generate</LoadingButton>
                    </div>
                  }
                  {groupId && customer && !addEditTrigger ? <div className="input">
                    {/* <Button variant="contained" disabled={!Transfer_new} onClick={handleAddGroup} >Edit</Button> */}
                    <LoadingButton loading={isbtnloading} variant="contained" disabled={!Transfer_new} onClick={handleAddGroup} >Edit</LoadingButton>
                  </div> :
                    <div className="input">
                      {/* <Button variant="contained" disabled={!Transfer_new} onClick={handleAddGroup} >ADD</Button> */}
                      <LoadingButton loading={isbtnloading} variant="contained" disabled={!Transfer_new} onClick={handleAddGroup} >ADD</LoadingButton>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="total-container-TransferDataEntry">
          <div className="Download-btn-transferdata">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <>
                  {/* <Button variant="contained" disabled={!Transfer_read} endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button> */}
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
              {/* <Button variant="contained" disabled={!Transfer_new} onClick={handleAddOrganization} >Add To List</Button> */}
            </div>
            <div className="total-inputs">
              <Button variant="outlined" disabled={!Transfer_delete} onClick={handleRemove} >Remove Selected</Button>
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
            {/* <Box
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
              {loading && (
    <Box
      sx={{
                        position: 'absolute', // Position the loading spinner absolutely
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', // Center the spinner
                                zIndex: 1, // Ensure it appears above the DataGrid
                                width: '100%', // Make it full width of the parent
                                height: '70%', // Make it full height of the parent
      }}
    >
      {[...Array(5)].map((_, index) => ( // Adjust the number of skeletons based on expected rows
        <Skeleton
          key={index}
          variant="rectangular"
          animation="wave"
          width="90%"
          height="20%" // Adjust height based on desired visibility
          sx={{ bgcolor: '#b0bec5', opacity: 0.7, marginTop: index === 0 ? 0 : '8px' }}
        />
      ))}
    </Box>
  )}
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
            </Box> */}
            <Box
              sx={{
                height: 400, // Adjust this value to fit your needs
                position: 'relative', // Necessary for absolute positioning of the loading indicator
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
              {loading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 56,
                    left: 0,
                    right: 0,
                    bottom: 0, // Cover the entire DataGrid area
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center vertically
                    alignItems: 'center', // Center horizontally
                    zIndex: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.8)', // Optional: add a slight background to distinguish loading
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <DataGrid
                rows={rows}
                columns={columns}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                  handleRowSelection(newRowSelectionModel);
                }}
                checkboxSelection
                disableRowSelectionOnClick
                // sx={{ height: '100%', width: '100%' }}
                sx={{
                  height: '100%',
                  width: '100%',
                  '& .MuiDataGrid-row': {
                    backgroundColor: invoiceNoCheck ? "red" : "green",
                    color: 'white', // Optional for text visibility
                    '&:hover': {
                      backgroundColor: invoiceNoCheck ? 'darkred' : 'darkgreen', // Highlight on hover
                    },
                  },
                  '& .Mui-selected': {
                    // backgroundColor: invoiceno === "" ? 'red' : 'green', // Same color for selected row
                    backgroundColor: invoiceNoCheck ? 'red !important' : 'green !important', // Prevent lighter selected row color

                    '&:hover': {
                      backgroundColor: invoiceNoCheck  ? 'darkred' : 'darkgreen', // Same hover effect for selected row
                    },
                  },
       }}
              />
            </Box>

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