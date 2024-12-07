import React, { useEffect, useContext, useState } from "react";
import "./Agreement.css";
import "jspdf-autotable";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { Autocomplete } from "@mui/material";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { TextField } from "@mui/material";
import { AiOutlineFileSearch } from "react-icons/ai";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// ICONS
import useEmployee from "./useEmployee";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import DateRangeIcon from '@mui/icons-material/DateRange';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import DeviceHubRoundedIcon from "@mui/icons-material/DeviceHubRounded";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded";
import Checkbox from '@mui/material/Checkbox';
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { CircularProgress } from '@mui/material';
import { APIURL } from "../../../url";

// import DateRangeIcon from '@mui/icons-material/DateRange';
import { PermissionContext } from "../../../context/permissionContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

const Agreement = ({organizationNames}) => {
  const apiUrl = APIURL;
  const {
    selectedCustomerData,
    selectedCustomerId,
    rows,
    actionName,
    error,
    success,
    info,
    warning,
    // selectedCustomerDatas,
    successMessage,
    customer,
    setCustomer,
    handlecustomer,
    errorMessage,
    warningMessage,
    setSelectedCustomerData,
    infoMessage,
    book,
    handleClick,
    selectAll,
    handleSelectAll,  
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleDateChange,
    handleAutocompleteChange,
    handleExcelDownload,
    handlePdfDownload,
    setCustomerPDF,
    columns,
    searchText,
    setSearchText,
    handleShowAll,
    allFile,
    handleCloseDialog,
    dialogOpen,
    setFile,
    // setFromDate,
    toDate,
    fromdate,
    // setToDate,
    setBook,
    handleFileChange,
    fromDate,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleDocumentDownload,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    setError,
    setErrorMessage,
    deletefile,
    handlecheckbox,
    loading,
    setLoading

  } = useEmployee();
  // console.log(organizationNames,"ppppppppppppp")


  // permissions
  const { permissions } = useContext(PermissionContext)
  const Employee_read = permissions[20]?.read;
  const Employee_new = permissions[20]?.new;
  const Employee_modify = permissions[20]?.modify;
  const Employee_delete = permissions[20]?.delete;

  // const [fileName, setFileName] = useState("");

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFileName(file.name);
  //     console.log("Selected file:", file);
  //   }
  // };
  

  return (
    <div className="main-content-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="detail-container-main-Employe">
          <div className="container-Employe">
            <div className="input-field employee-input-feilds">
            {/* <div className="input input-transferlist">
                            <div className="icone">
                                <HailOutlinedIcon color="action" />
                            </div>
                            <Autocomplete
                                fullWidth
                                id="free-solo-Organization"
                                className="full-width"
                                freeSolo
                                size="small"
                                name="customer"
                                value={book.customer || ''}
                                options={organizationNames.map(option => (typeof option === 'string' ? { label: option } : option))} // Ensure options have a `label`
                                onChange={(event, value) =>
                                    handleAutocompleteChange(event, value, "customer")
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Organization" inputRef={params.inputRef} />
                                )}
                            />
                        </div> */}
                      <div className="input input-transferlist">
                        <div className="icone">
                          <HailOutlinedIcon color="action" />
                        </div>
                        <Autocomplete
                          fullWidth
                          id="free-solo-Organization"
                          className="full-width"
                          freeSolo
                          size="small"
                          name="customer"
                          value={selectedCustomerData?.customer || book.customer}
                          options={organizationNames.map((option) =>
                            typeof option === "string" ? { label: option } : option
                          )} // Map options to have a label
                          onChange={(event, value) => handleAutocompleteChange(event, value, "customer")}
                          onInputChange={(event, value) => handleAutocompleteChange(event, value, "customer")}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Organization"
                              inputRef={params.inputRef}
                            />
                          )}
                        />
                      </div>
                                <div className="input">
                              <div className="icone">
                                  <CalendarMonthIcon color="action" />
                              </div>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                                      <DatePicker
                                          id="fromdate"
                                          className="full-width"
                                          label="From Date"
                                          name="fromdate"
                                          value={selectedCustomerData?.fromdate? dayjs(selectedCustomerData.fromdate) : dayjs(fromdate)}
                                          format="DD/MM/YYYY"
                                          onChange={(date) => {
                                              handleDateChange(date, 'fromdate');
                                          }}
                                      />
                                  </DemoContainer>
                              </LocalizationProvider>
                          </div>


                        {/* <div className="input driver-input">
                                <div className='icone'>
                                    <CalendarMonthIcon />
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="From Date"
                                        id="fromdate"
                                        className='full-width'
                                        value={
                                            selectedCustomerData.fromdate
                                                ? dayjs(selectedCustomerData.fromdate)
                                                : dayjs() || book.fromdate
                                                    ? dayjs(book.fromdate)
                                                    : dayjs()
                                        }
                                        format="DD/MM/YYYY"
                                        onChange={(date) => handleDateChange(date, "fromdate")}
                                    >
                                        {({ inputProps, inputRef }) => (
                                            <TextField
                                                {...inputProps}
                                                inputRef={inputRef}
                                                value={selectedCustomerData?.fromdate}
                                            />
                                        )}
                                    </DatePicker>
                                </LocalizationProvider>
                            </div> */}

                              <div className="input">
                                  <div className="icone">
                                      <CalendarMonthIcon color="action" />
                                  </div>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                                          <DatePicker
                                              id="toDate"
                                              className="full-width"
                                              label="To Date"
                                              name="toDate"
                                              value={selectedCustomerData?.toDate ? dayjs(selectedCustomerData.toDate) : dayjs(toDate)}
                                              format="DD/MM/YYYY"
                                              onChange={(date) => {
                                                  handleDateChange(date, 'toDate');
                                                  // const formattedDate = dayjs(date).format('DD/MM/YYYY');
                                                  // setToDate(formattedDate);
                                              }}
                                          />
                                      </DemoContainer>
                                  </LocalizationProvider>
                              </div>

{/* <div className="input driver-input">
    <div className="icone">
        <CalendarMonthIcon />
    </div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="To Date"
            id="toDate"
            className="full-width"
            value={
                selectedCustomerData.toDate
                    ? dayjs(selectedCustomerData.toDate)
                    : book.toDate
                        ? dayjs(book.toDate)
                        : dayjs() // Default to today's date
            }
            format="DD/MM/YYYY"
            onChange={(date) => handleDateChange(date, "toDate")} 
        >
            {({ inputProps, inputRef }) => (
                <TextField
                    {...inputProps}
                    inputRef={inputRef}
                />
            )}
        </DatePicker>
    </LocalizationProvider>
</div> */}

                                
              <div className="input">
                <div className="icone">
                  <EmailIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="email"
                  className="full-width"
                  label="Email Id"
                  name="email"
                  autoComplete="new-password"
                  value={selectedCustomerData?.email || book.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="mobileno1"
                  className="full-width"
                  label="Mobile"
                  name="mobileno"
                  // autoComplete="new-password"
                  value={selectedCustomerData?.mobileno || book.mobileno || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="input input-address">
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <textarea
                  id="address"
                  className='textarea-input'
                  name="address"
                  rows="3"
                  value={selectedCustomerData?.address || book.address}
                  onChange={handleChange}
                  placeholder="Address"
                />

              </div>
              <div className="input">
                <div className="icone">
                  <ContactMailIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="gstno"
                  className="full-width"
                  label="GST"
                  name="gstno"
                  autoComplete="new-password"
                value={selectedCustomerData?.gstno|| book.gstno}
                onChange={handleChange}
                />
              </div>

              <div className="input">   
                <input
                  id="file-upload"
                  name="Agreement_Image"
                  type="file"
                  style={{ display: "none" }}
                  // onChange={handleFileChange}
                  onChange={(e) => {
                    setCustomerPDF(e.target.files[0]);
                      console.log('File selected:', e.target.files[0]);
                      handleFileChange(e);
                  }}
                />    
                <label htmlFor="file-upload">
                  <Button variant="outlined" component="span">
                    Upload
                  </Button>
                </label>
              </div>

              {/* <div className="employee-file-upload-division">
                  {selectedCustomerData?.empid || book.empid ? (
                    <Button component="label">
                      <UploadFileIcon />
                      <input
                        id="empid_file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </Button>
                  ) : (
                    <Button color="primary" onClick={() => {
                      setError(true);
                      setErrorMessage("Please Enter Booking No");
                    }}>
                      <UploadFileIcon />
                    </Button>
                  )}
                </div> */}

              <div className="input">
                {isEditMode ? (
                  <Button variant="contained" disabled={!Employee_modify} onClick={handleEdit}>Edit</Button>
                ) : ( 
                  <Button variant="contained" disabled={!Employee_new} onClick={handleAdd}>Add</Button>
                )}
              </div>
            </div>

          </div>
        </div>
        <div className='alert-popup-main'>
          {error && (
            <div className="alert-popup Error">
              <div className="popup-icon">
                <ClearIcon />
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" />
              </span>
              <p>{errorMessage}</p>
            </div>
          )}
          {warning && (
            <div className="alert-popup Warning">
              <div className="popup-icon">
                <ErrorOutlineIcon />
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" />
              </span>
              <p>{warningMessage}</p>
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
          {info && (
            <div className="alert-popup Info">
              <div className="popup-icon">

                <BsInfo />
              </div>
              <span className="cancel-btn" onClick={hidePopup}>
                <ClearIcon color="action" />
              </span>
              <p>{infoMessage}</p>
            </div>
          )}
        </div>
        <Box className='common-speed-dail'>
          <StyledSpeedDial

            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {Employee_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event, "List")}
              />
            )}
            {Employee_modify === 1 && isEditMode && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit")}
              />
            )}
            {Employee_delete === 1 && isEditMode && (
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete")}
              />
            )}
            {Employee_new === 1 && !isEditMode && (
              <SpeedDialAction
                key="Add"
                icon={<BookmarkAddedIcon />}
                tooltipTitle="Add"
                onClick={(event) => handleClick(event, "Add")}
              />
            )}
            <SpeedDialAction
              key="Cancel"
              icon={<CancelPresentationIcon />}
              tooltipTitle="Cancel"
              onClick={(event) => handleClick(event, "Cancel")}
            />
          </StyledSpeedDial>
        </Box>

        <div>
          <div className="download-search">
            <div className="Download-btn">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      endIcon={<ExpandCircleDownOutlinedIcon />}
                      {...bindTrigger(popupState)}
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

            <div className="Employe-search-container">
              <div className="input-field Employe-search-input">
                <div className="input">
                  <div className="icone">
                    <AiOutlineFileSearch
                      color="action"
                    />
                  </div>
                  <TextField
                    size="small"
                    id="searchText"
                    label="Search"
                    name="searchText"
                    value={searchText || ''}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="">
                  <Button variant="contained" onClick={handleShowAll}>Search</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="table-bookingCopy-Employe ">
            <div className="registration-employee-table">
              {/* <DataGrid
                className="Scroll-Style"
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
                    className="Scroll-Style"
                    rows={rows}
                    columns={columns}
                    onRowClick={handleRowClick}
                    pageSize={5}
                  />
                )}
              </Box>
            </div>
            {/* <Dialog open={dialogOpen} onClose={handleCloseDialog} >
              <DialogContent>
                <div className="employee-dialogbox-div1">
                  {Array.isArray(allFile) && allFile.map((img, index) => (
                    <div key={index} className="employee-dialogbox-div2">
                      <Checkbox typeof='checked'
                        checked={deletefile.includes(img.fileName)}
                        onClick={(event) => {
                          handlecheckbox(img.fileName)
                        }} />
                      <img src={`${apiUrl}/public/agreement_doc/`+ img.Agreement_Image} width="350" height="300" alt="" />
                    </div>
                  ))}
                </div>
                <div style={{ height: 1, backgroundColor: 'black', marginTop: 5, marginBottom: 10 }}></div>
                <div style={{ display: 'flex' }}>
                  <Button disabled={!Employee_delete} variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
                  <Button variant='contained' onClick={() => handleDocumentDownload()} style={{ marginLeft: '20px' }}>Print</Button>
                </div>
              </DialogContent>
            </Dialog> */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
  <DialogContent>
    <div className="employee-dialogbox-div1">
      <Button
        variant="contained"
        onClick={handleSelectAll} // Assuming handleSelectAll toggles the selectAll state
      >
        {selectAll ? 'Deselect All' : 'Select All'}
      </Button>

      {Array.isArray(allFile) &&
        allFile.map((file, index) => (
          
          <div key={index} className="employee-dialogbox-div2">
            {/* <Checkbox
              type="checkbox"
              checked={deletefile.includes(file.fileName)}
              onClick={() => handlecheckbox(file.fileName)} // handlecheckbox will manage individual selection
            /> */}

                                            <Checkbox typeof='checked'
                                                checked={deletefile.includes(file.Agreement_Image)}
                                                onClick={(event) => {

                                                    handlecheckbox(file.Agreement_Image)

                                                }} />
            {file.Agreement_Image.endsWith('.pdf') ? (
              <iframe
                src={`${apiUrl}/public/agreement_doc/` + file.Agreement_Image}
                width="350"
                height="300"
                title={`PDF ${index}`}
                style={{ border: "none" }}
              />
            ) : (
              <img
                src={`${apiUrl}/public/agreement_doc/` + file.Agreement_Image}
                width="350"
                height="300"
                alt=""
              />
            )}
          </div>
        ))}
    </div>

    <div style={{ height: 1, backgroundColor: 'black', marginTop: 5, marginBottom: 10 }}></div>
    
    <div style={{ display: 'flex' }}>
      <Button
        disabled={!Employee_delete}
        variant="contained"
        onClick={() => handleimagedelete(deletefile)}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDocumentDownload()}
        style={{ marginLeft: '20px' }}
      >
        Print
      </Button>
    </div>
  </DialogContent>
</Dialog>
            <Dialog open={dialogdeleteOpen} onClose={handleClosedeleteDialog}>
              <DialogContent>
                <div>
                  <h3>are you sure you want to delete</h3>
                  <div>
                    <Button onClick={handleContextMenu}>yes</Button>
                    <Button onClick={handleClosedeleteDialog}>No</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Agreement;
