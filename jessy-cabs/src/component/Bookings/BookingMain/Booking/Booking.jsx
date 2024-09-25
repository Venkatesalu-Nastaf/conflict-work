import React, { useEffect, useContext } from "react";
import "./Booking.css";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
// import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
// import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CopyEmailHtmlBooking from "./CopyEmailBooking";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import {
  Duty,
  Hire,
  PayType,
  // Report,
  GroupTypes,
  vehicaleinfos
} from "./Booking";
import {
  TextField,
  FormControlLabel,
  FormControl,
  // FormLabel,
  // Radio,
  // RadioGroup,
  Checkbox,
} from "@mui/material";




// ICONS
import { PiCarSimpleFill } from "react-icons/pi";
import InfoIcon from "@mui/icons-material/Info";
// import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FmdBadIcon from "@mui/icons-material/FmdBad";

import AltRouteIcon from "@mui/icons-material/AltRoute";

import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EmailIcon from "@mui/icons-material/Email";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TaxiAlertTwoToneIcon from "@mui/icons-material/TaxiAlertTwoTone";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AddIcCallTwoToneIcon from "@mui/icons-material/AddIcCallTwoTone";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import useBooking from "./useBooking";
import { PermissionContext } from "../../../context/permissionContext";
//dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { APIURL } from "../../../url";

// spped dial 

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdDataUsage } from "react-icons/md";



import Select from '@mui/material/Select';

// import Button from '@mui/material/Button';


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

const Booking = ({ stationName, customerData }) => {

  const CustomerNames = customerData.map((el) => ({ customer: el?.customer }))

  // to tranform datas based on 
  const stationOptions = stationName?.filter(option => option?.Stationname !== "All").map(option => option?.Stationname)

  // console.log(stationOptions,"stationName1", stationName)

  const apiUrl = APIURL;

  const {
    selectedCustomerData, handleImagechange2, 
    // selectetImg, removeSelectedImage,
    selectedCustomerId,
    // rows,
    actionName,
    error, orderByDropDown,
    success,
    info,
    // warning,
    successMessage,
    errorMessage,
    // warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,

    // handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleKeyDown,
    handleDateChange,
    getCurrentTime,
    setBook,
    setSelectedCustomerData,
    // setBookingTime,
    selectedCustomerDatas,
    // handleKeyEnter,
    formValues,
    // handleenterSearch,
    handleAutocompleteChange,
    setFormData,
    setStartTime,
    handleChangeFile,
    handleDriverChange,
    handleVehicleChange,
    drivername,
    sendEmail,
    setSendEmail,
    lastBookingNo,
    // currentYear, 
    bookingStatus, setBookingStatus,
    // handleClickHide,
    // searchText,
    // setSearchText,
    setreporttime,
    storedUsername,
    // fromDate,
    // setFromDate,
    // toDate,
    // setToDate,
    // handleShowAll,
    popupOpen,
    handlePopupClose,
    // handleExcelDownload,
    // handlePdfDownload,
    // reversedRows,
    // columns,
    // handletableClick,
    // setFile,
    dialogOpen,
    handleCloseDialog,
    allFile,
    handleButtonClick,
    isEditMode,
    vechiledata,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    // handleprevent,
    rowdriver,
    handleRowClickdriver,
    // setErrorMessage,
    // setError,
    edit, AvilableimageCount,
    handleKeyEnterdriver,
    vehileName,
    selectedCustomerdriver,
    handleSelectAll, handlecheckbox, selectAll, deletefile,

    // imageDialogOpen, handleCloseImageDialog, setImageDialogOpen,
     handletravelsAutocompleteChange, accountinfodata, CopyEmail, setCopyEmail, setWarningMessage, setWarning, warningMessage, warning
  } = useBooking();

  const { getHtmlContentdata } = CopyEmailHtmlBooking();

  // useEffect(() => {
  //   if (actionName === "List") {
  //     handleClick(null, "List");
  //   }
  // }, [actionName, handleClick]);

  // Permission ------------
  const { permissions } = useContext(PermissionContext)
  // const Booking_read = permissions[1]?.read;
  const Booking_new = permissions[1]?.new;
  const Booking_modify = permissions[1]?.modify;
  const Booking_delete = permissions[1]?.delete;


  // varibale setting for
  const starttimeVar = formData.starttime || selectedCustomerData.starttime || book.starttime
  let reportTimeVar = formData.reporttime || selectedCustomerData.reporttime || book.reporttime


 



  const handleStatusChange = (event) => {
    setBookingStatus(event.target.value);
    setSelectedCustomerData({ ...selectedCustomerData, status: event.target.value })
  };



  const shedOutDateObj = new Date(formData?.shedOutDate || selectedCustomerDatas?.shedOutDate || selectedCustomerData?.shedOutDate || book?.shedOutDate || dayjs())
  const SatrtDateObj = new Date(formData?.startdate || selectedCustomerDatas?.startdate || selectedCustomerData?.startdate || book?.startdate || dayjs())


  const parcedShedOutDate = new Date(shedOutDateObj.getFullYear(), shedOutDateObj.getMonth(), shedOutDateObj.getDate())
  const parcedSatrtDate = new Date(SatrtDateObj.getFullYear(), SatrtDateObj.getMonth(), SatrtDateObj.getDate())

  const startDateCheckFun = () => {

    if (parcedSatrtDate !== "Invalid Date" && !isNaN(new Date(parcedSatrtDate).getTime())) {
      if (parcedShedOutDate !== "Invalid Date" && !isNaN(new Date(parcedShedOutDate.getTime()))) {
        if (parcedSatrtDate >= parcedShedOutDate) {
          return
        } else {
          return <label style={{ color: "red", fontSize: "14px", textAlign: "center", fontWeight: 'bold' }}>Invalid Date</label>
        }
      } else {
      }
    } else {
      return
    }
  }
  const userNamed = localStorage.getItem("username")

  const dataToSend = {
    guestname:
      formValues.guestname ||
      selectedCustomerData.guestname ||
      book.guestname ||
      formData.guestname,
    guestmobileno:
      formValues.guestmobileno ||
      selectedCustomerData.guestmobileno ||
      book.guestmobileno ||
      formData.guestmobileno,
    email: formValues.email || selectedCustomerData.email || book.email,
    pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
    useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
    starttime: formValues.starttime || formData.starttime || selectedCustomerData.starttime || book.starttime || "",
    // starttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || "",
    startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || dayjs() || "",
    driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
    // vehType: formData.vehType || selectedCustomerData.vehType || book.vehType || selectedCustomerdriver.vehType,
    vehicleName: formData.vehicleName || selectedCustomerData.vehicleName || book.vehicleName || selectedCustomerdriver.vehicleName,

    mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
    vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
    tripid: formData.tripid || selectedCustomerData.tripid || book.tripid,
    servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation,
    // status: book.status || formData.status || selectedCustomerData.status,
    requestno: formData.registerno || selectedCustomerData.registerno || book.registerno || "",
    duty: formData.duty || selectedCustomerData.duty || book.duty || "",
    bookingno: book.bookingno || selectedCustomerData.bookingno || formData.bookingno,
    customeremail: formData.orderByEmail || selectedCustomerData.orderByEmail || selectedCustomerDatas.orderByEmail || book.orderByEmail || "",
    username: userNamed,
    Address: formData.address1 || selectedCustomerData.address1 || book.address1 || "",
    status: selectedCustomerData.status || book.status || bookingStatus




  };

  const handlecopiedemailcontentbooking = () => {
    const tripidstatus = selectedCustomerData.status || book.status || bookingStatus;


    if (sendEmail) {
      return;
    }

    if (tripidstatus === "Cancelled" || tripidstatus === "pending") {
      const data = getHtmlContentdata(tripidstatus, dataToSend);
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = data;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextarea);
      setCopyEmail(true)

      setTimeout(() => {
        setCopyEmail(false)
      }, (2000));
    }
    else {

      setWarning(true)
      setWarningMessage("Check Your Trip Status")
    }
  }




  //  console.log(data,"copydara")     



  return (
    <div className="booking-form main-content-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div>
          <div className="booking-top-division Scroll-Style">
            <span className="d-grid">
              <label>Booking</label>
              <input
                type="text"
                id="standard-size-bookingno"
                value={
                  formData.bookingno ||
                  selectedCustomerData.bookingno ||
                  book.bookingno ||
                  ""
                }
                name="bookingno"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </span>
            {/* <div className="input">
              <div className="icone">
                <SwitchAccountIcon color="action" />
              </div>
              <TextField
                name="bookingno"
                margin="normal"
                size="small"
                className="full-width"
                label="Booking"
                id="standard-size-bookingno"
                autoComplete="new-password"
                value={
                  formData.bookingno ||
                  selectedCustomerData.bookingno ||
                  book.bookingno ||
                  ""
                }
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                // variant="standard"
                autoFocus
              />
            </div> */}
            <div className="radio booking-top-division-status-div">
              <label>Status</label>
              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    className="booking-top-section-status-main"
                    sx={{ padding: '0px 30px 0px 10px', fontSize: '14px' }}
                    value={['pending', 'Cancelled', "Opened"].includes(bookingStatus) ? bookingStatus : ''}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value={'pending'}>Pending</MenuItem>
                    <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                    <MenuItem value={'Opened'}>Opened</MenuItem>

                  </Select>
                </FormControl>
              </Box>
              {/* <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="status"
                  id="status"
                  autoComplete="new-password"
                  value={
                    formData.status ||
                    selectedCustomerData.status ||
                    book.status ||
                    ""
                  }
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="Cancelled"
                    control={<Radio />}
                    label="Cancelled"
                  />
                </RadioGroup>
              </FormControl> */}
            </div>

            {/* <span className="d-grid">
              <label>Ordered by</label>
              <input
                type="text"
                value={
                  formData.orderedby ||
                  selectedCustomerData.orderedby ||
                  selectedCustomerDatas.name ||
                  book.orderedby ||
                  ""
                }
              />
            </span> */}
            <span className="d-grid">
              <label>Username</label>
              <input type="text" value={formData.username ||
                selectedCustomerData.username ||
                book.username ||
                storedUsername ||
                ""} />
            </span>
            {/* <span className="d-grid"> */}
            {/* <label>Booking Date</label> */}
            {/* <input
                type="date"
                id="date-input"
                value={selectedDate}
                // onChange={handleSelectDateChange}
                onChange={(date) => handleDateChange(date, "bookingdate")}
              /> */}
            {/* <input type="date" value={
                formData.bookingdate || selectedCustomerData.bookingdate
                  ? dayjs(selectedCustomerData.bookingdate)
                  : null || book.bookingdate
                    ? dayjs(book.bookingdate)
                    : dayjs()
              } /> */}
            {/* <div className="booking-top-division-date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem label="Booking Date">
                    <DatePicker
                      value={
                        formData.bookingdate || selectedCustomerData.bookingdate
                          ? dayjs(selectedCustomerData.bookingdate)
                          : null || book.bookingdate
                            ? dayjs(book.bookingdate)
                            : dayjs()
                      }
                      format="DD/MM/YYYY"
                      onChange={(date) => handleDateChange(date, "bookingdate")}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField
                          {...inputProps}
                          inputRef={inputRef}
                          value={selectedCustomerData?.bookingdate}
                        />
                      )}
                    </DatePicker>
                  </DemoItem>
                </LocalizationProvider>
              </div> */}
            {/* </span> */}

            <span className="d-grid">
              <label className="tripsheet-top-division-date-label">Booking Date</label>
              <div className="tripsheet-top-division-date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker
                    // id="tripsheetdate"
                    value={
                      formData.bookingdate || selectedCustomerData.bookingdate
                        ? dayjs(selectedCustomerData.bookingdate)
                        : null || book.bookingdate
                          ? dayjs(book.bookingdate)
                          : dayjs()
                    }
                    format="DD/MM/YYYY"
                    // label='Booking Date'
                    // onChange={(date) => handleDateChange(date, "bookingdate")}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField
                        {...inputProps}
                        inputRef={inputRef}
                        value={selectedCustomerData?.bookingdate}
                      />
                    )}
                  </DatePicker> */}
                  <DatePicker
                    // id="tripsheetdate"
                    value={
                      formData.bookingdate || selectedCustomerData.bookingdate
                        ? dayjs(selectedCustomerData.bookingdate)
                        : null || book.bookingdate
                          ? dayjs(book.bookingdate)
                          : dayjs()
                    }
                    format="DD/MM/YYYY"
                    readOnly
                  // label='Booking Date'
                  // onChange={(date) => handleDateChange(date, "bookingdate")}

                  // disabled={true} // Disables the DatePicker to prevent changes
                  // renderInput={(params) => (
                  //   <TextField
                  //     {...params}
                  //     InputProps={{
                  //       readOnly: true, // Makes the input read-only
                  //     }}
                  //   />
                  // )}
                  />
                </LocalizationProvider>
              </div>
            </span>
            <span className="d-grid">
              <label>Booking Time</label>
              <input
                type="time"
                id="Booking_time"
                name="bookingtime"
                value={
                  formData.bookingtime ||
                  selectedCustomerData.bookingtime ||
                  book.bookingtime ||
                  getCurrentTime() ||
                  ""
                }
              // onChange={(event) => {
              //   setBook({ ...book, bookingtime: event.target.value });
              //   setSelectedCustomerData({
              //     ...selectedCustomerData,
              //     bookingtime: event.target.value,
              //   });
              //   setBookingTime(event.target.value);
              // }}
              />
            </span>
            {/* <span className="d-grid">
              <label>Fin Years</label>
              <input type="text" value={currentYear} />
              
            </span> */}

            <span className="d-grid">
              <label>Trip Id</label>
              <input
                type="text"
                value={
                  formData.tripid ||
                  selectedCustomerData.tripid ||
                  book.tripid ||
                  ""
                }
              />
            </span>
            <span>
              <div className="">
                <FormControlLabel
                  id="sendMailCheckbox"
                  value="sendemail"
                  control={
                    <Checkbox
                      size="small"
                      checked={sendEmail}
                      onChange={(event) => setSendEmail(event.target.checked)}
                    />
                  }
                  label="Send Email"
                />
                {isEditMode && !sendEmail && (
                  <>
                    <Button variant="outlined" size="small" onClick={handlecopiedemailcontentbooking}>
                      Copy
                    </Button>
                    <span style={{ color: 'green' }}>
                      {CopyEmail ? "Link Copied..." : ""}
                    </span>
                  </>
                )}
              </div>
            </span>
            {/* <span>
              {isEditMode ? (
                <div>
                  <div className="input-dummy">
                    <Button
                      color="primary"
                      variant="contained"
                      component="label"
                    >
                      Attach Image
                      <input
                        type="file"
                        style={{ display: "none" }}
                        // onChange={(e) => setFile(e.target.files[0])}
                        onChange={handleChangeFile}
                      />
                    </Button>
                  </div>
                  <div className="input-dummy" style={{ marginLeft: "10px" }}>
                    <Button
                      variant="outlined"
                      onClick={handleButtonClick}
                    >
                      View
                    </Button>
                  </div>
                  <div className="input-dummy" style={{ marginLeft: "10px" }}>
                    <p>Image Count : {AvilableimageCount}</p>
                  </div>
                </div>
              ) : (
                <div className="booking-image-attach-input-division">
                  <div className="input-dummy">
                    <Button
                      color="primary"
                      variant="contained"
                      component="label"
                      size="small"
                    >
                      Attach File
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleImagechange2}
                      />
                    </Button>
                  </div>
                  <div className="booking-image-attach-view-division">
                    <span>{selectetImg.length} images selected</span>
                    <Button variant="outlined" size="small" onClick={() => setImageDialogOpen(true)}>view</Button>
                  </div>
                </div>
              )}
            </span> */}
          </div>
          {/* <div className="input">
            <div className="icone">
              <PermIdentityIcon color="action" />
            </div>
            <TextField
              margin="normal"
              size="small"
              id="username"
              label="User Name"
              name="username"
              autoComplete="new-password"
              value={
                formData.username ||
                selectedCustomerData.username ||
                book.username ||
                storedUsername ||
                ""
              }
              onChange={handleChange}
              style={{ width: '20px', padding: '0px 0px' }}
            />
          </div> */}
          {/* <div className="input booking-date-input-division">
            <div className="icone">
              <CalendarMonthIcon color="action" className="booking-date-icon" />
            </div>
            <div className='full-width'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Booking Date">
                  <DatePicker
                    value={
                      formData.bookingdate || selectedCustomerData.bookingdate
                        ? dayjs(selectedCustomerData.bookingdate)
                        : null || book.bookingdate
                          ? dayjs(book.bookingdate)
                          : dayjs()
                    }
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, "bookingdate")}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField
                        {...inputProps}
                        inputRef={inputRef}
                        value={selectedCustomerData?.bookingdate}
                      />
                    )}
                  </DatePicker>
                </DemoItem>
              </LocalizationProvider>
            </div>
          </div> */}
          {/* <div className="booking-time-main-div">
            <div className="input time">
              <div className="icone">
                <MdOutlineAccessTimeFilled />
              </div>
              <div className="input-type-grid">
                <label>Booking Time</label>
                <input
                  type="time"
                  id="Booking_time"
                  value={
                    formData.bookingtime ||
                    selectedCustomerData.bookingtime ||
                    book.bookingtime ||
                    getCurrentTime() ||
                    ""
                  }
                  format="DD/MM/YYYY"
                  onChange={(event) => {
                    setBook({ ...book, bookingtime: event.target.value });
                    setSelectedCustomerData({
                      ...selectedCustomerData,
                      bookingtime: event.target.value,
                    });
                    setBookingTime(event.target.value);
                  }}
                  name="bookingtime"
                />
              </div>
            </div>
          </div> */}
          {/* <div className="input">
            <FormControlLabel
              id="sendMailCheckbox"
              value="sendemail"
              control={
                <Checkbox
                  size="small"
                  checked={sendEmail}
                  onChange={(event) => setSendEmail(event.target.checked)}
                />
              }
              label="Send Email"
            />
          </div> */}
          {/* <div className="input fin-years-input">
            <div className="icone">
              <CalendarMonthIcon color="action" />
            </div>
            <Autocomplete
              fullWidth
              size="small"
              id="fine_years"
              value={currentYear}
              options={[currentYear]}
              renderInput={(params) => (
                <TextField {...params} label="Fin Years" />
              )}
            />
          </div> */}
        </div>
        <div className="booking-main-section1">
          <div className="sub-section1">
            <div className="first-division">
              {/* <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>
                <TextField
                  name="bookingno"
                  margin="normal"
                  size="small"
                  className="full-width"
                  label="Booking"
                  id="standard-size-bookingno"
                  autoComplete="new-password"
                  value={
                    formData.bookingno ||
                    selectedCustomerData.bookingno ||
                    book.bookingno ||
                    ""
                  }
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  // variant="standard"
                  autoFocus
                />
              </div> */}
              {/* <div className="input booking-date-input-division">
                <div className="icone">
                  <CalendarMonthIcon color="action" className="booking-date-icon" />
                </div>
                <div className='full-width'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Booking Date">
                      <DatePicker
                        value={
                          formData.bookingdate || selectedCustomerData.bookingdate
                            ? dayjs(selectedCustomerData.bookingdate)
                            : null || book.bookingdate
                              ? dayjs(book.bookingdate)
                              : dayjs()
                        }
                        format="DD/MM/YYYY"
                        onChange={(date) => handleDateChange(date, "bookingdate")}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField
                            {...inputProps}
                            inputRef={inputRef}
                            value={selectedCustomerData?.bookingdate}
                          />
                        )}
                      </DatePicker>
                    </DemoItem>
                  </LocalizationProvider>
                </div>
              </div> */}
              {/* <div className="booking-time-main-div">
                <div className="input time">
                  <div className="icone">
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className="input-type-grid">
                    <label>Booking Time</label>
                    <input
                      type="time"
                      id="Booking_time"
                      value={
                        formData.bookingtime ||
                        selectedCustomerData.bookingtime ||
                        book.bookingtime ||
                        getCurrentTime() ||
                        ""
                      }
                      format="DD/MM/YYYY"
                      onChange={(event) => {
                        setBook({ ...book, bookingtime: event.target.value });
                        setSelectedCustomerData({
                          ...selectedCustomerData,
                          bookingtime: event.target.value,
                        });
                        setBookingTime(event.target.value);
                      }}
                      name="bookingtime"
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="input radio">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="status"
                    id="status"
                    autoComplete="new-password"
                    value={
                      formData.status ||
                      selectedCustomerData.status ||
                      book.status ||
                      ""
                    }
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="pending"
                      control={<Radio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      value="Cancelled"
                      control={<Radio />}
                      label="Cancelled"
                    />
                  </RadioGroup>
                </FormControl>
              </div> */}
              {/* <div className="input">
                <div className="icone">
                  <SellIcon color="action" />
                </div>
                <TextField
                  name="tripid"
                  margin="normal"
                  size="small"
                  autoComplete="new-password"
                  className="full-width"
                  value={
                    formData.tripid ||
                    selectedCustomerData.tripid ||
                    book.tripid ||
                    ""
                  }
                  onChange={handleChange}
                  label="Trip Id"
                  id="tripid"
                // variant="standard"
                />
              </div> */}
              {/* <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="customer"
                  label="Customer"
                  name="customer"
                  className="full-width"
                  value={
                    formData.customer ||
                    selectedCustomerData.customer ||
                    selectedCustomerDatas.customer ||
                    book.customer ||
                    ""
                  }
                  onChange={handleChange}
                  onKeyDown={handleKeyEnter}
                  autoComplete="new-password"
                />
              </div> */}
              {/* <div className="input service-station-input">
                <div className="icone">
                  <DomainAddIcon color="action" />
                </div>
                <Autocomplete
                  fullWidth
                  id="servicestation"
                  freeSolo
                  size="small"
                  value={book.servicestation || selectedCustomerData.servicestation || formData.servicestation || selectedCustomerDatas.servicestation || ''}
                  options={stationName?.map((option) => ({
                    label: option?.Stationname,
                  }))}
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "servicestation")
                  }
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="service station" name="servicestation" inputRef={params.inputRef} />
                    );
                  }}
                />
              </div> */}
              {/* <div className="input">
                <div className="icone">
                  <FmdBadIcon color="action" />
                </div>
                <TextField
                  name="remarks"
                  margin="normal"
                  size="small"
                  autoComplete="new-password"
                  className="full-width"
                  value={
                    formData.remarks ||
                    selectedCustomerData.remarks ||
                    book.remarks ||
                    ""
                  }
                  onChange={handleChange}
                  label="Remarks"
                  id="remarks"
                // variant="standard"
                />
              </div> */}
            </div>
          </div>
          {/* <div className="sub-section2 sub-section2-booking">
            <div className="first-table-driver">
              <div className="booking-update-main">
                <div className="booking-update">
                  <div className="Scroll-Style booking-update-main-table">
                    <table>
                      <thead id="update-header">
                        <tr >
                          <th className="table-head-booking table-heading-first">Organization_Name</th>
                          <th className="table-head-booking">Organizer</th>
                          <th className="table-head-booking">Email_Id</th>
                          <th className="table-head-booking">Address</th>
                          <th className="table-head-booking table-heading-last">Phone_No</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.length === 0 ? (
                          <tr>
                            <td colSpan={6}>No data available.</td>
                          </tr>
                        ) : (
                          rows.map((row) => (
                            <tr
                              id="update-row"
                              key={row.id}
                              onClick={() => handleRowClick(row)}
                            >
                              <td>{row.customer}</td>
                              <td>{row.name}</td>
                              <td>{row.email}</td>
                              <td>{row.address1}</td>
                              <td>{row.phoneno}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="input">

                <FormControlLabel
                  id="sendMailCheckbox"
                  value="sendemail"
                  control={
                    <Checkbox
                      size="small"
                      checked={sendEmail}
                      onChange={(event) => setSendEmail(event.target.checked)}
                    />
                  }
                  label="Send Email"
                />
              </div>
            </div>

          </div> */}
        </div>
        <div>
          <div className="second-division second-division-booking">
            {/* <div className="input">
              <div className="icone">
                <SwitchAccountIcon color="action" />
              </div>
              <TextField
                name="bookingno"
                margin="normal"
                size="small"
                className="full-width"
                label="Booking"
                id="standard-size-bookingno"
                autoComplete="new-password"
                value={
                  formData.bookingno ||
                  selectedCustomerData.bookingno ||
                  book.bookingno ||
                  ""
                }
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                // variant="standard"
                autoFocus
              />
            </div> */}
            {/* <div className="input booking-date-input-division">
                <div className="icone">
                  <CalendarMonthIcon color="action" className="booking-date-icon" />
                </div>
                <div className='full-width'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Booking Date">
                      <DatePicker
                        value={
                          formData.bookingdate || selectedCustomerData.bookingdate
                            ? dayjs(selectedCustomerData.bookingdate)
                            : null || book.bookingdate
                              ? dayjs(book.bookingdate)
                              : dayjs()
                        }
                        format="DD/MM/YYYY"
                        onChange={(date) => handleDateChange(date, "bookingdate")}
                      >
                        {({ inputProps, inputRef }) => (
                          <TextField
                            {...inputProps}
                            inputRef={inputRef}
                            value={selectedCustomerData?.bookingdate}
                          />
                        )}
                      </DatePicker>
                    </DemoItem>
                  </LocalizationProvider>
                </div>
              </div> */}
            {/* <div className="booking-time-main-div">
                <div className="input time">
                  <div className="icone">
                    <MdOutlineAccessTimeFilled />
                  </div>
                  <div className="input-type-grid">
                    <label>Booking Time</label>
                    <input
                      type="time"
                      id="Booking_time"
                      value={
                        formData.bookingtime ||
                        selectedCustomerData.bookingtime ||
                        book.bookingtime ||
                        getCurrentTime() ||
                        ""
                      }
                      format="DD/MM/YYYY"
                      onChange={(event) => {
                        setBook({ ...book, bookingtime: event.target.value });
                        setSelectedCustomerData({
                          ...selectedCustomerData,
                          bookingtime: event.target.value,
                        });
                        setBookingTime(event.target.value);
                      }}
                      name="bookingtime"
                    />
                  </div>
                </div>
              </div> */}
            {/* <div className="input radio">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="status"
                  id="status"
                  autoComplete="new-password"
                  value={
                    formData.status ||
                    selectedCustomerData.status ||
                    book.status ||
                    ""
                  }
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="Cancelled"
                    control={<Radio />}
                    label="Cancelled"
                  />
                </RadioGroup>
              </FormControl>
            </div> */}
            {/* <div className="input">
              <div className="icone">
                <SellIcon color="action" />
              </div>
              <TextField
                name="tripid"
                margin="normal"
                size="small"
                autoComplete="new-password"
                className="full-width"
                value={
                  formData.tripid ||
                  selectedCustomerData.tripid ||
                  book.tripid ||
                  ""
                }
                onChange={handleChange}
                label="Trip Id"
                id="tripid"
              // variant="standard"
              />
            </div> */}
            <div className="input">
              <div className="icone">
                <PermIdentityIcon color="action" />
              </div>
              {/* <TextField
                margin="normal"
                size="small"
                id="customer"
                label="Customer"
                name="customer"
                className="full-width"
                value={
                  formData.customer ||
                  selectedCustomerData.customer ||
                  selectedCustomerDatas.customer ||
                  book.customer ||
                  ""
                }
                onChange={handleChange}
                onKeyDown={handleKeyEnter}
                autoComplete="new-password"
              /> */}

              <Autocomplete
                fullWidth
                size="small"
                id="customer"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) => {
                  handleAutocompleteChange(event, value, "customer")
                  // handleCustomerEnter2(event)
                }}
                // value={book.customer || ''}
                value={
                  formData.customer ||
                  selectedCustomerData.customer ||
                  selectedCustomerDatas.customer ||
                  book.customer ||
                  ""}

                options={CustomerNames?.map((option) => ({
                  label: option.customer,
                }))}
                getOptionLabel={(option) => option.label || formData.customer || selectedCustomerData.customer || selectedCustomerDatas.customer ||
                  book.customer || ''}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Customer"
                      name="customer"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />


            </div>
            <div className="input">
              <div className="icone">
                <HomeRepairServiceTwoToneIcon color="action" />
              </div>


              {/* <TextField
                name="orderedby"
                autoComplete="new-password"
                className="full-width"
                value={
                  formData.orderedby ||
                  selectedCustomerData.orderedby ||
                  selectedCustomerDatas.name ||
                  book.orderedby ||
                  ""
                }
                onChange={handleChange}
                label="Ordered by"
                id="orderedby"
                // variant="standard"
                margin="normal"
                size="small"
              /> */}
              {/* {console.log("orderByDropDown", orderByDropDown)} */}
              <Autocomplete
                fullWidth
                size="small"
                id="orderedby"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "orderedby")


                }
                // value={book.orderedBy || ''}
                value={
                  formData.orderedby ||
                  selectedCustomerData.orderedby ||
                  selectedCustomerDatas.orderedby ||
                  book.orderedby ||
                  ""
                }
                options={orderByDropDown?.map((option) => ({

                  label: option?.orderedby,
                }))}
                getOptionLabel={(option) => option?.label || formData.orderedby || selectedCustomerData.orderedby || selectedCustomerDatas.orderedby || book.orderedby || ""}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Ordered By"
                      name="orderedby"
                      inputRef={params.inputRef}
                    />

                  );
                }}
              />


            </div>

            {/* <div className="input">
              <div className="icone">
                <FmdBadIcon color="action" />
              </div>
              <TextField
                name="remarks"
                margin="normal"
                size="small"
                autoComplete="new-password"
                className="full-width"
                value={
                  formData.remarks ||
                  selectedCustomerData.remarks ||
                  book.remarks ||
                  ""
                }
                onChange={handleChange}
                label="Remarks"
                id="remarks"
              // variant="standard"
              />
            </div> */}
            {/* {console.log(selectedCustomerData?.orderByMobileNo, book?.mobile, formData?.orderByMobileNo, selectedCustomerDatas?.orderByMobileNo, book?.orderByMobileNo, "MoBiLe")} */}
            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="orderByMobileNo"
                autoComplete="new-password"
                className="full-width"
                value={
                  selectedCustomerData?.orderByMobileNo ||
                  book?.mobile ||
                  book?.orderByMobileNo ||
                  formData?.orderByMobileNo ||
                  selectedCustomerDatas?.orderByMobileNo ||
                  
                  ""
                }
                onChange={handleChange}
                label="Order by Mobile No"
                id="orderByMobileNo"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>
            <div className="input">
              <div className="icone">
                <ForwardToInboxIcon color="action" />
              </div>

              {/* {console.log("book--", book)} */}
              <TextField
                name="orderByEmail"
                className="full-width"
                autoComplete="new-password"
                value={
                  selectedCustomerData.orderByEmail ||
                  book.orderByEmail || 
                  book.orderbyemail ||
                  formData.orderByemail ||
                 
                  selectedCustomerDatas.orderByEmail ||

                  ""
                }
                onChange={handleChange}
                label="Order By Email"
                id="orderByEmail"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>
            <div className="input service-station-input">
              <div className="icone">
                <DomainAddIcon color="action" />
              </div>

              <Autocomplete
                fullWidth
                id="servicestation"
                freeSolo
                size="small"
                // value={serviceStationFilterFun() || book.servicestation || selectedCustomerData.servicestation || formData.servicestation || selectedCustomerDatas.servicestation || ''}
                value={book.servicestation || selectedCustomerData.servicestation || formData.servicestation || selectedCustomerDatas.servicestation || ''}

                options={stationOptions}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "servicestation")
                }
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Service Station" name="servicestation" inputRef={params.inputRef} />
                  );
                }}
              />

              {/* <Autocomplete
                fullWidth
                id="servicestation"
                freeSolo
                size="small"
                value={book.servicestation || selectedCustomerData.servicestation || formData.servicestation || selectedCustomerDatas.servicestation || ''}
                options={stationOptions}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "servicestation")
                }
                renderInput={(params) => (
                  <TextField {...params} label="service station" name="servicestation" inputRef={params.inputRef} />
                )}
              /> */}

            </div>

            <div className="input booking-payment-type-input">
              <div className="icone">
                <AccountBalanceWalletTwoToneIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="paymenttype"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "paymenttype")
                }
                value={
                  PayType.find((option) => option.Option)?.label ||
                  formData.paymenttype ||
                  selectedCustomerData.paymenttype ||
                  book.paymenttype ||
                  ""
                }
                options={PayType.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.paymenttype ||
                  selectedCustomerData.paymenttype ||
                  book.paymenttype ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Payment Type"
                      name="paymenttype"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />
            </div>

            <div className="input">
              <div className="icone">
                <AccountCircleTwoToneIcon color="action" />
              </div>
              <TextField
                name="guestname"
                autoComplete="new-password"
                className="full-width"
                value={
                  formData.guestname ||
                  selectedCustomerData.guestname ||
                  book.guestname ||
                  formValues.guestname ||
                  ""
                }
                onChange={handleChange}
                label="Guest Name"
                id="guestname"
                // variant="standard"
                margin="normal"
                size="small"
                required
              />
            </div>
            <div className="input">
              <div className="icone">
                <ContactPhoneIcon color="action" />
              </div>
              <TextField
                name="guestmobileno"
                autoComplete="new-password"
                className="full-width"
                value={
                  formData.guestmobileno ||
                  selectedCustomerData.guestmobileno ||
                  formValues.guestmobileno ||
                  book.guestmobileno ||
                  ""
                }
                onChange={handleChange}
                label="Guest Mobile No"
                id="guestmobileno"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>
            <div className="input radio">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="email"
                className="full-width"
                autoComplete="new-password"
                value={
                  formData.email ||
                  selectedCustomerData.email ||
                  formValues.email ||
                  book.email ||
                  ""
                }
                onChange={handleChange}
                label="Guest Email"
                id="email"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>
            <div className="input pick-up-address-input">
              <div className="icone">
                <AddHomeWorkIcon color="action" />
              </div>
              <TextField
                margin="normal"
                id="address12"
                label="Pick up Address"
                name="address1"
                multiline
                rows={2}
                sx={{ width: "100%" }}
                autoComplete="new-password"
                value={
                  formData.address1 ||
                  selectedCustomerData.address1 ||
                  book.address1 ||
                  ""
                }
                onChange={handleChange}
              />
            </div>



            <div className="input">
              <div className="icone">
                <MdDataUsage />
              </div>
              <TextField
                className="full-width"
                margin="normal"
                size="small"
                id="usage"
                label="Usage"
                name="useage"
                autoComplete="new-password"
                value={
                  formData.useage ||
                  selectedCustomerData.useage ||
                  formValues.useage ||
                  book.useage ||
                  ""
                }
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <div className="icone">
                <EngineeringIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-duty"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "duty")
                }
                value={
                  Duty.find((option) => option.Option)?.label ||
                  formData.duty ||
                  selectedCustomerData.duty ||
                  book.duty ||
                  ""
                }
                options={Duty.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.duty ||
                  selectedCustomerData.duty ||
                  book.duty ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Duty"
                      name="duty"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />
            </div>



            <div className="input">
              <div className="icone">
                <AirplaneTicketIcon color="action" />
              </div>
              <TextField
                name="flightno"
                className="full-width"
                autoComplete="new-password"
                value={
                  formData.flightno ||
                  selectedCustomerData.flightno ||
                  book.flightno ||
                  ""
                }
                onChange={handleChange}
                label="Flight No"
                id="flightno"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>

            <div className="input radio">
              <div className="icone">
                <RateReviewIcon color="action" />
              </div>
              <TextField
                name="employeeno"
                className="full-width"
                autoComplete="new-password"
                value={
                  formData.employeeno ||
                  selectedCustomerData.employeeno ||
                  book.employeeno ||
                  ""
                }
                onChange={handleChange}
                label="Employee Id"
                id="employeeno"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>



            <div className="input">
              <div className="icone">
                <AppRegistrationIcon color="action" />
              </div>
              <TextField
                name="registerno"
                className="full-width"
                autoComplete="new-password"
                value={
                  formData.registerno ||
                  selectedCustomerData.registerno ||
                  book.registerno ||
                  ""
                }
                onChange={handleChange}
                label="Request Id"
                id="registerno"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>

            <div className="input">
              <div className="icone">
                <QrCodeIcon color="action" />
              </div>
              <TextField
                name="customercode"
                className="full-width"
                autoComplete="new-password"
                value={
                  formData.customercode ||
                  selectedCustomerData.customercode ||
                  book.customercode ||
                  ""
                }
                onChange={handleChange}
                label="Cost Code"
                id="customercode"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>

            <div className="input">
              <div className="icone">
                <TaxiAlertTwoToneIcon color="action" />
              </div>
              {/* <Autocomplete
                fullWidth
                size="small"
                id="vehType"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "vehType")
                }
                value={
                  formData.vehType ||
                  selectedCustomerData.vehType ||
                  book.vehType || selectedCustomerdriver.vehType ||
                  ""
                }
                options={vehileName.map((option) => ({
                  label: option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.vehType ||
                  selectedCustomerData.vehType ||
                  book.vehType || selectedCustomerdriver.vehType ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Vehicle Name"
                      name="vehType"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              /> */}

              <Autocomplete
                fullWidth
                size="small"
                id="vehicleName"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "vehicleName")
                }
                value={
                  formData.vehicleName ||
                  selectedCustomerData.vehicleName ||
                  book.vehicleName || selectedCustomerdriver.vehicleName ||
                  ""
                }
                options={vehileName.map((option) => ({
                  label: option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.vehicleName ||
                  selectedCustomerData.vehicleName ||
                  book.vehicleName || selectedCustomerdriver.vehicleName ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Vehicle Name"
                      name="vehicleName"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />
            </div>




            {/* <div className="input fin-years-input">
              <div className="icone">
                <CalendarMonthIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="fine_years"
                value={currentYear}
                options={[currentYear]}
                renderInput={(params) => (
                  <TextField {...params} label="Fin Years" />
                )}
              />
            </div> */}
            {/* <div className="input booking-report-input">
              <div className="icone">
                <LocationCityIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                name="report"
                className="full-width"
                autoComplete="new-password"
                value={
                  formData.report ||
                  selectedCustomerData.report ||
                  book.report ||
                  ""
                }
                onChange={handleChange}
                label="Report"
                id="Report"

              />
            </div> */}



            <div className="input booking-report-date-input">
              <div className="icone">
                <CalendarMonthIcon color="action" />
              </div>
              <div className="full-width">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="shed Out Date"
                    id="shedOutDate"
                    className="full-width"
                    value={
                      formData.shedOutDate || selectedCustomerData.shedOutDate
                        ? dayjs(selectedCustomerData.shedOutDate)
                        : dayjs() || book.shedOutDate
                          ? dayjs(book.shedOutDate)
                          : dayjs()
                    }
                    format="DD/MM/YYYY"
                    onChange={(date) => handleDateChange(date, "shedOutDate")}>
                    {({ inputProps, inputRef }) => (
                      <TextField
                        {...inputProps}
                        inputRef={inputRef}
                        value={selectedCustomerData?.shedOutDate}
                      />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
            </div>




            <div className="input booking-report-date-input" style={{ display: "grid" }}>
              {startDateCheckFun()}
              <div style={{ display: "flex" }}>
                <div className="icone">
                  <CalendarMonthIcon color="action" />
                </div>

                <div className="full-width">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Report Date"
                      id="report_date"
                      className="full-width"
                      value={
                        formData.startdate || selectedCustomerData.startdate
                          ? dayjs(selectedCustomerData.startdate)
                          : dayjs() || book.startdate
                            ? dayjs(book.startdate)
                            : dayjs()
                      }
                      format="DD/MM/YYYY"
                      onChange={(date) => handleDateChange(date, "startdate")}
                    >
                      {({ inputProps, inputRef }) => (
                        <TextField
                          {...inputProps}
                          inputRef={inputRef}
                          value={selectedCustomerData?.startdate}
                        />
                      )}
                    </DatePicker>
                  </LocalizationProvider>
                </div>

              </div>

            </div>


            {/* 
            <div>
              <div className="input time booking-start-time-input">
                <div className="icone">
                  <MdOutlineAccessTimeFilled />
                </div>
                <div className="input-type-grid">
                  <label>Start Time</label>
                  <input
                    type="time"
                    id="starttime"
                    value={
                      formData.starttime ||
                      selectedCustomerData.starttime ||
                      book.starttime ||
                      ""
                    }
                    onChange={(event) => {
                      reportTimeVar = ""
                      setFormData({ ...formData, starttime: event.target.value });
                      setSelectedCustomerData({
                        ...selectedCustomerData,
                        starttime: event.target.value,
                      });
                      setBook({ ...book, starttime: event.target.value });
                      setStartTime(event.target.value);
                    }}
                    name="starttime"
                  />
                </div>
              </div>
            </div>

  
            <div>
              <div className="input time booking-start-time-input">
                <div className="icone">
                  <MdOutlineAccessTimeFilled />
                </div>
                <div className="input-type-grid">
                  {starttimeVar && ((starttimeVar < reportTimeVar) ? (<label>Report Time</label>) : (<label style={{ color: "red" }}>Invalid Time</label>)) || !starttimeVar && <label>Report Time</label>}
                  <input
                    type="time"
                    id="reporttime"
                    name="reporttime"
                    value={starttimeVar && (starttimeVar < reportTimeVar) ? reportTimeVar : ""}
                    onChange={(event) => {
                      const strtTime = formData.starttime || selectedCustomerData.starttime || book.starttime;
                      const rTime = event.target.value;
                      if (strtTime && rTime <= strtTime) {
                        // alert("Report time must be greater than start time")\
                        return;
                      } else {
                        setBook({ ...book, reporttime: event.target.value });
                        setreporttime(event.target.value);
                        setFormData({ ...formData, reporttime: event.target.value });
                        setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value, });
                      }
                    }}
                  />
                </div>
              </div>
            </div> */}

            <div>
              <div className="input time booking-start-time-input">
                <div className="icone icone-with-margin-top">
                  <MdOutlineAccessTimeFilled />
                </div>
                <div className="input-type-grid">
                  <label>Shed Out Time</label>   <input
                    type="time"
                    id="reporttime"
                    name="reporttime"
                    value={formData.reporttime || selectedCustomerData.reporttime || book.reporttime || ""}
                    onChange={(event) => {
                      setBook({ ...book, reporttime: event.target.value });
                      setreporttime(event.target.value);
                      setFormData({ ...formData, reporttime: event.target.value });
                      setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value, });
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="input time booking-start-time-input">
                <div className="icone icone-with-margin-top">
                  <MdOutlineAccessTimeFilled />
                </div>
                <div className="input-type-grid">
                  {reportTimeVar ? (((reportTimeVar < starttimeVar) ? (<label>Report time</label>) : (<label>Report Time</label>)) || (!reportTimeVar && <label>Report Time</label>)) : <label> Report Time</label>}


                  <input
                    type="time"
                    id="starttime"
                    value={formData.starttime || selectedCustomerData.starttime || book.starttime || ""}
                    onChange={(event) => {
                      // const sTime = event.target.value;
                      // if (reportTimeVar && sTime <= reportTimeVar) {
                      //   return;
                      // }
                      setFormData({ ...formData, starttime: event.target.value });
                      setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                      setBook({ ...book, starttime: event.target.value });
                      setStartTime(event.target.value);
                    }}
                    name="starttime"
                  />
                </div>
              </div>
            </div>

            <div className="input advance-input">
              <div className="icone">
                <InfoIcon color="action" />
              </div>
              <TextField
                size="small"
                name="advance"
                autoComplete="new-password"
                value={
                  formData.advance ||
                  selectedCustomerData.advance ||
                  book.advance ||
                  ""
                }
                onChange={handleChange}
                label="Advance"
                id="advance"
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </div>




            {/* </div> */}

            {/* {isEditMode ? (
            <div>
              <div className="input-dummy">
                <Button
                  color="primary"
                  variant="contained"

                  component="label"
                >
                  Attach Image
                  <input
                    type="file"
                    style={{ display: "none" }}
                    // onChange={(e) => setFile(e.target.files[0])}
                    onChange={handleChangeFile}
                  />
                </Button>
              </div>
              <div className="input-dummy" style={{ marginLeft: "10px" }}>
                <Button
                  variant="outlined"
                  onClick={handleButtonClick}
                >
                  View
                </Button>
              </div>
              <div className="input-dummy" style={{ marginLeft: "10px" }}>
                <p>Image Count : {AvilableimageCount}</p>
              </div>
            </div>
          ) : (

            <div className="booking-image-attach-input-division">
              <div className="input-dummy">
                <Button
                  color="primary"
                  variant="contained"

                  component="label"
                >
                  Attach File
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImagechange2}
                  />
                </Button>
              </div>
              <div className="booking-image-attach-view-division">
                <span>{selectetImg.length} images selected</span>
                <Button variant="outlined" onClick={() => setImageDialogOpen(true)}>view</Button>
              </div>
            </div>
          )} */}


            {/* <Dialog open={imageDialogOpen} onClose={handleCloseImageDialog || selectetImg.length === 0}>
              {selectetImg.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    overflowX: "auto",
                    backgroundColor: "#E5E5E5",
                    padding: "10px",
                  }}
                >
                  {selectetImg.map((file, index) => (
                    <div
                      key={index}
                      style={{ marginLeft: "10px", backgroundColor: "#EAEAEA" }}
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{ width: "200px", height: "200px" }}
                        />
                      ) : file.type.startsWith("application/pdf")? (
                        <iframe
                          src={URL.createObjectURL(file)}
                          title={file.name}
                          style={{ width: "200px", height: "200px" }}
                        />
                      ) : (
                        <p>Unsupported file type</p>
                      )}
                      <p
                        style={{
                          width: "180px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {file.name}
                      </p>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={(e) => removeSelectedImage(index, e)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </Dialog> */}
            {isEditMode ? (
              <div>
                <div className="input-dummy">
                  <Button
                    color="primary"
                    variant="contained"

                    component="label"
                  >
                    Attach Image
                    <input
                      type="file"
                      style={{ display: "none" }}
                      // onChange={(e) => setFile(e.target.files[0])}
                      onChange={handleChangeFile}
                    />
                  </Button>
                </div>
                <div className="input-dummy" style={{ marginLeft: "10px" }}>
                  <Button
                    variant="outlined"
                    onClick={handleButtonClick}
                  >
                    View
                  </Button>
                </div>
                <div className="input-dummy" style={{ marginLeft: "10px" }}>
                  <p>Image Count : {AvilableimageCount}</p>
                </div>
              </div>
            ) : (

              <div className="booking-image-attach-input-division input">

                {/* <input
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                  color: "#333",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                type="file" multiple onChange={handleImagechange2} /> */}

                <div className="input-dummy">
                  <Button
                    color="primary"
                    variant="contained"
                    component="label"
                  >
                    Attach File
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImagechange2}
                    />
                  </Button>
                </div>
                <div className="booking-image-attach-view-division">
                  {/* <Tooltip title={`${selectetImg.length} images selected`} arrow>
                    <Button variant="outlined" onClick={() => setImageDialogOpen(true)}>view</Button>
                  </Tooltip> */}
                  {/* <span>{selectetImg.length} images selected</span>
                  <Button variant="outlined" onClick={() => setImageDialogOpen(true)}>view</Button> */}
                </div>
              </div>
            )}

            {/* <div className="input">
              <div className="icone">
                <FmdBadIcon color="action" />
              </div>
              <TextField
                name="remarks"
                margin="normal"
                size="small"
                autoComplete="new-password"
                className="full-width"
                value={
                  formData.remarks ||
                  selectedCustomerData.remarks ||
                  book.remarks ||
                  ""
                }
                onChange={handleChange}
                label="Remarks"
                id="remarks"
              // variant="standard"
              />
            </div> */}

            <div className="input pick-up-address-input">
              <div className="icone">
                <FmdBadIcon color="action" />
              </div>
              <TextField
                name="remarks"
                margin="normal"
                size="small"
                autoComplete="new-password"
                className="full-width"
                onChange={handleChange}
                label="Remarks"
                id="remarks"
                multiline
                rows={2}
                sx={{ width: "100%" }}
                value={
                  formData.remarks ||
                  selectedCustomerData.remarks ||
                  book.remarks ||
                  ""
                }
              />
            </div>
            <div className="input" style={{ marginTop: '0px' }}>
              <div className="input">
                {isEditMode ? (
                  <Button variant="contained" disabled={!Booking_modify} onClick={handleEdit}>
                    Edit
                  </Button>
                ) : (
                  <Button
                    disabled={!Booking_new}
                    variant="contained"
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* <div className="sub-section2-driver">
              <div className="second-table-driver">
                <div className="booking-update-main driver-table">
                  <div className="booking-update">
                    <div className="Scroll-Style booking-driver-table">
                      <table>
                        <thead id="update-header">
                          <tr>
                            <th className="table-head-booking table-heading-first">Driver_NAME</th>
                            <th className="table-head-booking">VEHICLE_Name</th>
                            <th className="table-head-booking">VEHICLE NO</th>
                            <th className="table-head-booking">HIRE TYPES</th>
                            <th className="table-head-booking table-heading-last">ACTIVE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rowdriver?.length === 0 ? (
                            <tr>
                              <td colSpan={6}>No data available.</td>
                            </tr>
                          ) : (
                            rowdriver?.map((row) => (
                              <tr
                                id="update-row"
                                key={row.id}
                                onClick={() => handleRowClickdriver(row)}
                              >
                                <td>{row.driverName}</td>
                                <td>{row.vehType}</td>
                                <td>{row.vehRegNo}</td>
                                <td>{row.hireTypes}</td>
                                <td>{row.active}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
        <Box className='common-speed-dail'>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {/* {Booking_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event, "List", selectedCustomerId)}
              />
            )} */}
            {Booking_modify === 1 && isEditMode && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
              />
            )}
            {Booking_delete === 1 &&  isEditMode &&  (
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
              />
            )}
            {Booking_new === 1 && !isEditMode &&  (
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
        {/**  helloo */}

        <div className="vehicle-confirm">
          <div className="input-field input-feild-vehicle-confirm">
            <div className="input">
              <div className="icone">
                <AirportShuttleIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="hireTypes"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "hireTypes")
                }
                value={
                  Hire.find((option) => option.Option)?.label ||
                  // formData.hireTypes ||
                  selectedCustomerData.hireTypes ||
                  book.hireTypes || selectedCustomerdriver.hireTypes ||
                  ""
                }
                options={Hire.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) => 
                  option.label ||
                  // formData.hireTypes ||
                  selectedCustomerData.hireTypes ||
                  book.hireTypes || selectedCustomerdriver.hireTypes ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Hire Types"
                      name="hireTypes"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />
            </div>

            <div className="input">
              <div className="icone">
                <AltRouteIcon color="action" />
              </div>
              {/* <TextField
                name="travelsname"
                autoComplete="new-password"
                value={
                  formData.travelsname ||
                  selectedCustomerData.travelsname ||
                  book.travelsname ||
                  ""
                }
                onChange={handleChange}
                label="Travels Name"
                id="travelsname"
                // variant="standard"
                margin="normal"
                size="small"
              /> */}


              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-travelmail"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) => handletravelsAutocompleteChange(event, value, "travelsname ")}
                value={
                  formData.travelsname ||
                  selectedCustomerData.travelsname ||
                  book.travelsname ||
                  ""
                }
                options={accountinfodata.map((option) => ({
                  label: option?.travelsname,
                }))}
                getOptionLabel={(option) => option.label ||
                  formData.travelsname ||
                  selectedCustomerData.travelsname ||
                  book.travelsname ||
                  ""}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Travels Name" name="travelsname" inputRef={params.inputRef} />
                  )
                }
                }
              />
            </div>

            {/* <div className="input">
              <div className="icone">
                <RateReviewIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="vehicleRegno"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) => handleVehicleChange(event, value, "vehRegNo")}
                onKeyDown={handleKeyEnterdriver}
                value={selectedCustomerData?.vehRegNo || book.vehRegNo || ''}
                options={vechiledata?.map((option) => ({ label: option?.vehRegNo }))}
                // getOptionLabel={(option) => option.label || selectedCustomerData?.vehRegNo || book.vehRegNo || ''}
                renderInput={(params) => (
                  <TextField {...params} label="Veh Reg No" name="vehRegNo" inputRef={params.inputRef} />
                )}
              />

            </div> */}

            {/* Entering Manually */}
            <div className="input">
              <div className="icone">
                <RateReviewIcon color="action" />
              </div>

              <Autocomplete
                fullWidth
                size="small"
                id="vehicleRegno"
                freeSolo  
                sx={{ width: "100%" }}
                onChange={(event, value) => handleVehicleChange(event, value, "vehRegNo")}
                onInputChange={(event, value) => handleVehicleChange(event, value, "vehRegNo")}  // Handle manual input
                onKeyDown={handleKeyEnterdriver}
                value={selectedCustomerData?.vehRegNo || book.vehRegNo || ''}  // Reflect vehRegNo correctly
                options={vechiledata?.map((option) => ({ label: option?.vehRegNo }))}  // Map vehRegNo from data
                getOptionLabel={(option) => typeof option === "string" ? option : option.label || ''}  // Adjust to show input value or option label
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Veh Reg No"
                    name="vehRegNo"
                    inputRef={params.inputRef}
                  />
                )}
              />
            </div>

            {console.log(formData.vehiclemodule)}
            <div className="input">
              <div className="icone">
                <PiCarSimpleFill color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="vehiclemodule"
                freeSolo
                size="small"
                value={
                  // formData.vehiclemodule ||
                  selectedCustomerData.vehiclemodule ||
                  book.vehiclemodule || selectedCustomerdriver.vehiclemodule ||
                  ""
                }
                options={vehicaleinfos?.map((option) => ({
                  label: option?.Option,
                }))}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "vehiclemodule")
                }
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Vehicle Type" name="vehicleType" inputRef={params.inputRef} />
                  );
                }}
              />
            </div>

            {/* <div className="input">
              <div className="icone">
                <TaxiAlertTwoToneIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="vehType"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "vehType")
                }
                value={
                  formData.vehType ||
                  selectedCustomerData.vehType ||
                  book.vehType || selectedCustomerdriver.vehType ||
                  ""
                }
                options={vehileName.map((option) => ({
                  label: option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.vehType ||
                  selectedCustomerData.vehType ||
                  book.vehType || selectedCustomerdriver.vehType ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Vehicle Name"
                      name="vehType"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />
            </div> */}

            <div className="input">
              <div className="icone">
                <EmailIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="Groups"
                freeSolo
                size="small"
                value={
                  // formData.Groups ||
                  selectedCustomerData.Groups ||
                  book.Groups || selectedCustomerdriver.Groups ||
                  ""
                }
                options={GroupTypes?.map((option) => ({
                  label: option?.Option,
                }))}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "Groups")
                }
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Groups" inputRef={params.inputRef} />
                  );
                }}
              />
            </div>

            {/* <div className="input">
              <div className="icone">
                <NoCrashIcon color="action" />
              </div>
              <TextField
                name="driverName"
                className="full-width"  
                autoComplete="new-password"
                value={
                  formData.driverName ||
                  selectedCustomerData.driverName ||
                  book.driverName || selectedCustomerdriver.driverName ||
                  ""
                }
                onChange={handleChange}
                onKeyDown={handleKeyEnterdriver}
                label="Driver Name"
                id="drivername"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div> */}
            <div className="input">
              <div className="icone">
                <AirlineSeatReclineExtraIcon color="action" />
              </div>

              <Autocomplete
                fullWidth
                size="small"
                id="driverName"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) => handleDriverChange(event, value, "driverName")}
                onInputChange={(event, value) => handleDriverChange(event, value, "driverName")}  // Handle manual input
                onKeyDown={handleKeyEnterdriver}
                value={selectedCustomerData?.driverName || book.driverName || ""} // Reflect the driverName correctly
                options={drivername?.map((option) => ({ label: option.drivername }))} // Map drivername from data
                getOptionLabel={(option) => typeof option === "string" ? option : option.label || ''} // Adjust to show input value or option label
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Driver Name"
                    name="driverName"
                    inputRef={params.inputRef}
                  />
                )}
              />
            </div>
            {/* {console.log(formData.mobileNo, selectedCustomerData.mobileNo, book.mobileNo, "sharan")} */}
            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="mobileNo"
                className="full-width"
                autoComplete="new-password"
                value={
                  // formData.mobileNo ||
                  selectedCustomerData.mobileNo ||
                  book.mobileNo || selectedCustomerdriver.mobileNo ||
                  ""
                }
                onChange={handleChange}
                label="Driver Phone"
                id="mobileNo"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>

            <div className="input">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="travelsemail"
                className="full-width"
                autoComplete="new-password"
                value={
                  formData.travelsemail ||
                  selectedCustomerData.travelsemail ||
                  book.travelsemail ||
                  ""
                }
                onChange={handleChange}
                label="Travels Email"
                id="travelsemail"
                // variant="standard"
                margin="normal"
                size="small"
              />
            </div>
            <div>
              {
                edit ?
                  <Button
                    variant="contained"
                    onClick={handleAdd}
                  >
                    Add New</Button> : <></>
              }
            </div>
          </div>
          <div className="sub-section2-driver">
            <div className="second-table-driver">
              <div className="booking-update-main driver-table">
                <div className="booking-update">
                  {/* <div className="booking-driver-table"> */}
                  {/* <div className="booking-driver-table Scroll-Style">
                    <table>
                      <thead id="update-header">
                        <tr>
                          <th className="table-head-booking table-heading-first">Driver NAME</th>
                          <th className="table-head-booking">Vehicle Name</th>
                          <th className="table-head-booking">Vehicle NO</th>
                          <th className="table-head-booking">Travels Name</th> */}
                  {/* <th className="table-head-booking">HIRE TYPES</th> */}
                  {/* <th className="table-head-booking table-heading-last">ACTIVE</th> */}
                  {/* </tr>
                      </thead>
                      <tbody>
                        {rowdriver?.length === 0 ? (
                          <tr>
                            <td colSpan={6}>No data available.</td>
                          </tr>
                        ) : (
                          rowdriver?.map((row) => (
                            <tr
                              id="update-row"
                              key={row.id}
                              onClick={() => handleRowClickdriver(row)}
                            >
                              <td>{row.driverName}</td>
                              <td>{row.vehType}</td>
                              <td>{row.vehRegNo}</td>
                              <td>{row.travelsname}</td> */}
                  {/* <td>{row.hireTypes}</td> */}
                  {/* <td>{row.active}</td> */}
                  {/* </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div> */}
                  {/* </div> */}


                </div>
              </div>
            </div>

            <div class="booking-table-new">
              <table class="table-condensed table-striped fixed_header">
                <thead class="BI_tablehead">
                  <tr>
                    <th className="table-head-booking table-heading-first">Driver NAME</th>
                    <th className="table-head-booking">Vehicle Name</th>
                    <th className="table-head-booking">Vehicle NO</th>
                    <th className="table-head-booking">Travels Name</th>
                    {/* <th className="table-head-booking">HIRE TYPES</th> */}
                    {/* <th className="table-head-booking table-heading-last">ACTIVE</th> */}
                  </tr>
                </thead>
                <tbody class="BI_tablebody Scroll-Style">
                  {rowdriver?.length === 0 ? (
                    <tr>
                      <td colSpan={6}>No data available.</td>
                    </tr>
                  ) : (
                    rowdriver?.map((row) => (
                      <tr
                        id="update-row"
                        key={row.id}
                        onClick={() => handleRowClickdriver(row)}
                      >
                        <td>{row.driverName}</td>
                        <td>{row.vehType}</td>
                        <td>{row.vehRegNo}</td>
                        <td>{row.travelsname}</td>
                        {/* <td>{row.hireTypes}</td> */}
                        {/* <td>{row.active}</td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Dialog open={popupOpen} onClose={handlePopupClose}>
          <DialogContent>
            Booking Number:
            <br /> <h1>{lastBookingNo}</h1>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handlePopupClose}
              variant="contained"
              color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
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
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{warningMessage}</p>
            </div>
          }
        </div>

        {/* <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Booking">
              <div className="input-field search-division">
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
                    value={searchText || ""}
                    onKeyDown={handleenterSearch}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      id="fromDate"
                      name="fromDate"
                      format="DD/MM/YYYY"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      name="toDate"
                      id="toDate"
                      format="DD/MM/YYYY"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <Button variant="contained" onClick={handleShowAll}>
                    Search
                  </Button>
                </div>
                <div className="booking-Download-btn">
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
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="table-bookingCopy-Booking">
          <div className="booking-main-table">
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowClick={handletableClick}
              pageSize={5}
              checkboxSelection
            /> */}


        {/* 
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogContent>
            <div className="booking-main-table-div1">
              {Array.isArray(allFile) &&
                allFile.map((img, index) => (
                  <div key={index} className="booking-main-table-div2">
                    <embed
                      src={`${apiUrl}/images/${img.path}`}
                      width="100%"
                      height="600px"
                      style={{ width: '800px', maxWidth: '100%' }}
                    />
                    <button
                      className="booking-main-table-btn"
                      onClick={() => handleimagedelete(img.path)}
                    />
                  </div>
                ))}
            </div>
          </DialogContent>
        </Dialog> */}

        {/* <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogContent>
            <div className='vehicle-info-dailog-box-div1' style={{ width: "600px" }}>
              <Button variant='contained' className='vehicle-info-dailog-box-btn' onClick={handleSelectAll}>
                {selectAll ? 'Deselect All' : 'Select All'}
              </Button>
              {Array.isArray(allFile) && allFile.map((img, index) => (
                <div key={index} className='vehicle-info-dailog-box-btn-division' style={{ marginBottom: "20px" }}>
                  {img.mimetype.startsWith("image/")
                    ? <img src={`${apiUrl}/images/${img.path}`} alt='vehicle_docimage' style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "contain" }} />
                    : <embed src={`${apiUrl}/images/${img.path}`} type="application/pdf" style={{ width: "100%", height: "400px" }} />}
                  <Checkbox
                    checked={deletefile.includes(img.path)}
                    onClick={() => handlecheckbox(img.path)}
                  />
                </div>
              ))}
            </div>
            <div className='vehicle-info-dailog-box-delete-print-division'>
              <Button variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog> */}

        {/* <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogContent>
            <div className='vehicle-info-dailog-box-div1' style={{ width: "600px", overflowY: "auto", maxHeight: "80vh" }}>
              <Button variant='contained' className='vehicle-info-dailog-box-btn' onClick={handleSelectAll}>
                {selectAll ? 'Deselect All' : 'Select All'}
              </Button>
              {Array.isArray(allFile) && allFile.map((img, index) => (
                <div key={index} className='vehicle-info-dailog-box-btn-division' style={{ marginBottom: "20px" }}>
                  {img.mimetype.startsWith("image/")
                    ? <img src={`${apiUrl}/images/${img.path}`} alt='vehicle_docimage' style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} />
                    : <embed src={`${apiUrl}/images/${img.path}`} type="application/pdf" style={{ width: "100%", height: "400px" }} />}
                  <Checkbox
                    checked={deletefile.includes(img.path)}
                    onClick={() => handlecheckbox(img.path)}
                  />
                </div>
              ))}
            </div>
            <div className='vehicle-info-dailog-box-delete-print-division'>
              <Button variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog> */}

        {/* <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogContent>
            <div className='vehicle-info-dailog-box-div1' style={{ width: "600px" }}>
              <Button variant='contained' style={{ margin: "5px" }} onClick={handleSelectAll}>
                {selectAll ? 'Deselect All' : 'Select All'}
              </Button>
              {Array.isArray(allFile) && allFile.map((img, index) => (
                <div key={index} className='vehicle-info-dailog-box-btn-division' style={{ marginBottom: "10px" }}>
                  {img.mimetype.startsWith("image/")
                    ? <img src={`${apiUrl}/images/${img.path}`} alt='vehicle_docimage' style={{ width: "100%", height: "400px", objectFit: "contain" }} />
                    : <embed src={`${apiUrl}/images/${img.path}`} type="application/pdf" style={{ width: "100%", height: "400px" }} />}
                  <Checkbox
                    checked={deletefile.includes(img.path)}
                    onClick={() => handlecheckbox(img.path)}
                  />
                </div>
              ))}
            </div>
            <div className=''>
              <Button variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog> */}

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogContent>
            <div className="vehicle-info-dailog-box-div1" style={{ width: "600px" }}>
              <Button variant="contained" style={{ margin: "5px" }} onClick={handleSelectAll}>
                {selectAll ? "Deselect All" : "Select All"}
              </Button>
              {Array.isArray(allFile) &&
                allFile.map((img, index) => (
                  <div key={index} className="vehicle-info-dailog-box-btn-division" style={{ marginBottom: "10px" }}>
                    {(img.mimetype === "jpeg" || img.mimetype === "png" || img.mimetype === "jpg") && (
                      <img
                        src={`${apiUrl}/images/${img.path}`}
                        alt="vehicle_docimage"
                        style={{ width: "100%", height: "400px", objectFit: "contain" }}
                      />
                    )}
                    {img.mimetype === "pdf" && (
                      <embed
                        src={`${apiUrl}/images/${img.path}`}
                        type="application/pdf"
                        style={{ width: "100%", height: "600px", display: "block", border: "none" }}
                        key={img.path}  // Use key to prevent re-rendering
                      />
                    )}
                    <Checkbox checked={deletefile.includes(img.path)} onClick={() => handlecheckbox(img.path)} />
                  </div>
                ))}
            </div>
            <div>
              <Button variant="contained" onClick={() => handleimagedelete(deletefile)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>




        {/* <Dialog open={dialogOpen} onClose={handleCloseDialog} >
          <DialogContent>
            <div className='vehicle-info-dailog-box-div1'>
              <Button variant='contained' className='vehicle-info-dailog-box-btn' onClick={handleSelectAll}>
                {selectAll ? 'Deselect All' : 'Select All'}
              </Button>
              {Array.isArray(allFile) && allFile.map((img, index) => (
                <div key={index} className='vehicle-info-dailog-box-btn-division'>
                  {img.mimetype === "image/jpg" || img.mimetype === "image/jpeg" || img.mimetype === "image/png" || img.mimetype === "image/gif" || img.mimetype === "image/svg"
                    ? <img src={`${apiUrl}/images/${img.path}`} alt='vehicle_docimage' type="application/pdf" width="100%" height="400px" /> :
                    <embed src={`${apiUrl}/images/${img.path}`} type="application/pdf" width="100%" height="400px" />}

                  <Checkbox typeof='checked'
                    checked={deletefile.includes(img.path)}
                    onClick={(event) => {
                      handlecheckbox(img.path)

                    }} />
                </div>
              ))}
            </div>
            <div className='vehicle-info-dailog-box-delete-print-division'>
              <Button variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog> */}

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

      </form >
    </div >
  );
};

export default Booking;