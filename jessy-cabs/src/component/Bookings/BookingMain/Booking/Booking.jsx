import React, { useContext, useRef, useState } from "react";
import "./Booking.css";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Textarea from '@mui/joy/Textarea';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CopyEmailHtmlBooking from "./CopyEmailBooking";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InputLabel from '@mui/material/InputLabel';
import {
  Duty,
  Hire,
  PayType,
  GroupTypes,
  vehicaleinfos
} from "./Booking";
import {
  TextField,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
// import Box from "@mui/material/Box";
// import TabList from "@mui/joy/TabList";
import Modal from '@mui/material/Modal';

// ICONS
import { PiCarSimpleFill } from "react-icons/pi";
import InfoIcon from "@mui/icons-material/Info";
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
// speed dial 
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import MessageIcon from '@mui/icons-material/Message';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdDataUsage } from "react-icons/md";
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import { Document, Page, pdfjs } from 'react-pdf';
// import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


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
  const apiUrl = APIURL;
  const {
    selectedCustomerData, handleImagechange2,

    selectedCustomerId,
    error, orderByDropDown,
    success,
    info,
    successMessage,
    errorMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    handleAdd,
    hidePopup,
    formData,
    handleKeyDown,
    handleDateChange,
    getCurrentTime,
    setBook,
    setSelectedCustomerData,
    selectedCustomerDatas,
    formValues,
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
    bookingStatus, setBookingStatus,
    setreporttime,
    storedUsername,
    popupOpen,
    handlePopupClose,
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
    rowdriver,
    handleRowClickdriver,
    edit, AvilableimageCount,
    // handleKeyEnterdriver,
    vehileName,
    selectedCustomerdriver, setNoChangeData, nochangedata,
    handleSelectAll, handlecheckbox, selectAll, deletefile, handleButtonClickwithouttripid, dialogOpentrail, handleCloseDialogtrail, handlecheckbox1, selectetImg, deletefiledata,
    handleimagedeletewithouttripid, handleChangetext, messagedited,messageditedbefore,
    handletravelsAutocompleteChange, accountinfodata, CopyEmail, setCopyEmail, setWarningMessage, setWarning, warningMessage, warning, handleMessageData, handleCloseMessage, dialogmessage,
    // handleBookEscortChange,handleAirportTransferChange,
    //  transferreport, 
    setTransferreport,
    //  escort,
    setEscort, isAddbtnload,
    // setisAddbtnload,
    isEditbtnload,
    //  setisEditbtnload
  } = useBooking();

  const { getHtmlContentdata } = CopyEmailHtmlBooking();

  // Permission ------------
  const { permissions } = useContext(PermissionContext)
  const Booking_new = permissions[1]?.new;
  const Booking_modify = permissions[1]?.modify;
  const Booking_delete = permissions[1]?.delete;
  const [numPages, setNumPages] = useState(null);
  const shedOutTimeRef = useRef(null);
  const reportTimeRef = useRef(null);

  const [prevHours, setPrevHours] = useState({
    shedOutTime: "",
    reportTime: ""
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);

  }

  // varibale setting for
  const starttimeVar = formData.starttime || selectedCustomerData.starttime || book.starttime
  let reportTimeVar = formData.reporttime || selectedCustomerData.reporttime || book.reporttime

  const handleStatusChange = (event) => {
    setBookingStatus(event.target.value);
    setSelectedCustomerData({ ...selectedCustomerData, status: event.target.value })
    setNoChangeData({ ...nochangedata, status: event.target.value })
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
    // pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
    useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
    starttime: formValues.starttime || formData.starttime || selectedCustomerData.starttime || book.starttime || "",
    startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || dayjs() || "",
    driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
    vehicleName: formData.vehicleName || selectedCustomerData.vehicleName || book.vehicleName || selectedCustomerdriver.vehicleName,
    mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
    vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
    tripid: formData.tripid || selectedCustomerData.tripid || book.tripid,
    servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation,
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
  // console.log(prevHours,"timeeeeeeee+++++++++++");
  const superAdminAccess = localStorage.getItem("SuperAdmin")
  const datahidecustomerdetails = superAdminAccess === "SuperAdmin" ? true : false;

  return (
    <div className="booking-form main-content-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div>
          <div className="booking-top-division Scroll-Style">
            <span className="d-grid">
              <label>Booking ID </label>
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

            <div className="radio booking-top-division-status-div">
              <label>Status</label>
              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
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
            </div>

            <span className="d-grid">
              <label>Username</label>
              <input type="text" value={formData.username ||
                selectedCustomerData.username ||
                book.username ||
                storedUsername ||
                ""} readOnly />
            </span>

            <span className="d-grid">
              <label className="tripsheet-top-division-date-label">Booking Date</label>
              <div className="tripsheet-top-division-date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DatePicker
                    id="bookdate"
                    value={
                      formData.bookingdate || selectedCustomerData.bookingdate
                        ? dayjs(selectedCustomerData.bookingdate)
                        : null || book.bookingdate
                          ? dayjs(book.bookingdate)
                          : dayjs()
                    }
                    format="DD/MM/YYYY"
                    readOnly
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
                readOnly
              />
            </span>

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
                readOnly
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

          </div>


        </div>
        <div>
          <div className="second-division second-division-booking">
            <div className="input">
              <div className="icone">
                <PermIdentityIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="customer"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) => {
                  handleAutocompleteChange(event, value, "customer")
                }}
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
              <Autocomplete
                fullWidth
                size="small"
                id="orderedby"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "orderedby")
                }
                onInputChange={(event, value) => {
                  if (event !== null) {
                    setNoChangeData({ ...nochangedata, orderedby: event.target.value })
                  }
                  handleAutocompleteChange(event, value, "orderedby")
                }}

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


            {datahidecustomerdetails ? <>
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
                  margin="normal"
                  size="small"
                />
              </div>


              <div className="input">
                <div className="icone">
                  <ForwardToInboxIcon color="action" />
                </div>
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
                  margin="normal"
                  size="small"
                />
              </div>

            </> : <>
              <div className="input">
                <div className="icone">
                  <AddIcCallTwoToneIcon color="action" />
                </div>
                <TextField
                  name="orderByMobileNo"
                  autoComplete="new-password"
                  className="full-width"

                  disabled={!datahidecustomerdetails}
                  label="Order by Mobile No"
                  id="orderByMobileNo"
                  margin="normal"
                  size="small"
                />
              </div>


              <div className="input">
                <div className="icone">
                  <ForwardToInboxIcon color="action" />
                </div>
                <TextField
                  name="orderByEmail"
                  className="full-width"
                  autoComplete="new-password"
                  disabled={!datahidecustomerdetails}
                  label="Order By Email"
                  id="orderByEmail"
                  margin="normal"
                  size="small"
                />
              </div>



            </>
            }

            <div className="input service-station-input">
              <div className="icone">
                <DomainAddIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                id="servicestation"
                freeSolo
                size="small"
                value={book.servicestation || selectedCustomerData.servicestation || formData.servicestation || selectedCustomerDatas.servicestation || ''}

                // options={stationOptions}
                options={stationOptions.map((option) => ({
                  label: option,
                }))}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "servicestation")
                }
                getOptionLabel={(option) => option.label || book.servicestation || selectedCustomerData.servicestation || formData.servicestation || selectedCustomerDatas.servicestation || ''}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Service Station" name="servicestation" inputRef={params.inputRef} />
                  );
                }}
              />
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
                margin="normal"
                size="small"
              />
            </div>

            <div className="input">
              <div className="icone">
                <TaxiAlertTwoToneIcon color="action" />
              </div>
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

            <div>
              <div className="input time booking-start-time-input">
                <div className="icone icone-with-margin-top">
                  <MdOutlineAccessTimeFilled />
                </div>
                <div className="input-type-grid">
                  <label>Shed Out Time</label>
                  <input
                    type="time"
                    id="reporttime"
                    name="reporttime"
                    ref={shedOutTimeRef}
                    value={formData.reporttime || selectedCustomerData.reporttime || book.reporttime || ""}
                    onChange={(event) => {
                      let value = event.target.value;
                      const [hours, minutes] = value.split(':');
                      setPrevHours((prevState) => ({
                        ...prevState,
                        shedOutTime: hours
                      }));
                      if (shedOutTimeRef.current && (parseInt(minutes) === 59) && prevHours?.shedOutTime === hours) {
                        shedOutTimeRef.current.focus();
                      }
                      setBook({ ...book, reporttime: event.target.value });
                      setreporttime(event.target.value);
                      setFormData({ ...formData, reporttime: event.target.value });
                      setSelectedCustomerData({ ...selectedCustomerData, reporttime: event.target.value, });
                      setNoChangeData({ ...nochangedata, reporttime: event.target.value, });
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
                    ref={reportTimeRef}
                    onChange={(event) => {
                      let value = event.target.value;
                      const [hours, minutes] = value.split(':');

                      setPrevHours((prevState) => ({
                        ...prevState,
                        reportTime: hours
                      }));
                      if (reportTimeRef.current && (parseInt(minutes) === 59) && prevHours?.reportTime === hours) {
                        reportTimeRef.current.focus();
                      }
                      setFormData({ ...formData, starttime: event.target.value });
                      setSelectedCustomerData({ ...selectedCustomerData, starttime: event.target.value });
                      setBook({ ...book, starttime: event.target.value });
                      setStartTime(event.target.value);
                      setNoChangeData({ ...nochangedata, starttime: event.target.value });
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
            <div className='input time booking-start-time-input'>


              <FormControl fullWidth size="small" sx={{ marginTop: "20px", width: "85%", marginLeft: "30px" }}>
                <InputLabel id="demo-simple-select-label">Escort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.escort || selectedCustomerData.escort || book.escort || "No"}
                  label="escort"
                  // onChange={handleBookEscortChange}
                  onChange={(event) => {
                    const selectedValue = event.target.value || "No";
                    setFormData({ ...formData, escort: selectedValue });
                    setSelectedCustomerData({ ...selectedCustomerData, escort: selectedValue });
                    setBook({ ...book, escort: event.target.value });
                    setEscort(selectedValue);
                    setNoChangeData({ ...nochangedata, escort: event.target.value });
                  }}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>

                </Select>
              </FormControl>

            </div>

            <div className='input time booking-start-time-input'>
              <FormControl fullWidth size="small" sx={{ marginTop: "20px", width: "85%", marginLeft: "25px" }}>
                <InputLabel className="input-type-grid">Airport Transfer</InputLabel>
                <Select
                  labelId="demo-simple-select-labelescort"
                  id="demo-simple-select"
                  value={formData.transferreport || selectedCustomerData.transferreport || book.transferreport || "No"}
                  label='transferreport'
                  // onChange={handleAirportTransferChange}
                  onChange={(event) => {
                    setFormData({ ...formData, transferreport: event.target.value });
                    setSelectedCustomerData({ ...selectedCustomerData, transferreport: event.target.value });
                    setBook({ ...book, transferreport: event.target.value });
                    setTransferreport(event.target.value);
                    setNoChangeData({ ...nochangedata, transferreport: event.target.value });
                  }}
                >
                  <MenuItem value={'Yes'}>Yes</MenuItem>
                  <MenuItem value={'No'}>No</MenuItem>
                </Select>
              </FormControl>
            </div>


            {isEditMode ? (
              <div>
                <div className="input-dummy">
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!Booking_modify}
                    component="label"
                  >
                    Attach Image
                    <input
                      type="file"
                      style={{ display: "none" }}
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
                <div className="input-dummy">
                  <Button
                    color="primary"
                    variant="contained"
                    component="label"
                    disabled={!Booking_new}
                  >
                    Attach File
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImagechange2}
                    />
                  </Button>
                </div>
                {selectetImg.length > 0 ?
                  <>
                    <div className="input-dummy" style={{ marginLeft: "10px" }}>
                      <Button
                        variant="outlined"
                        onClick={handleButtonClickwithouttripid}
                      >
                        View
                      </Button>
                    </div>
                    <div className="input-dummy" style={{ marginLeft: "10px" }}>
                      <p>Image Count : {selectetImg.length}</p>
                    </div>
                  </>
                  : <></>
                }
              </div>
            )}

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
                  // <Button variant="contained" disabled={!Booking_modify} onClick={handleEdit}>
                  //   Edit
                  // </Button>
                  <LoadingButton loading={isEditbtnload} variant="contained" disabled={!Booking_modify} onClick={handleEdit}>
                    Edit
                  </LoadingButton>
                ) : (
                  // <Button
                  //   disabled={!Booking_new}
                  //   variant="contained"
                  //   onClick={handleAdd}
                  // >
                  //   Add
                  // </Button>
                  <LoadingButton
                    disabled={!Booking_new}
                    variant="contained"
                    onClick={handleAdd}
                    loading={isAddbtnload}
                  >
                    Add
                  </LoadingButton>
                )}
              </div>
            </div>
          </div>
        </div>
        <Box className='common-speed-dail'>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {Booking_modify === 1 && isEditMode && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
              />
            )}
            {Booking_delete === 1 && isEditMode && (
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
              />
            )}
            {Booking_new === 1 && !isEditMode && (
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
            <SpeedDialAction
              key="Message"
              icon={<MessageIcon />}
              tooltipTitle="Message"
              onClick={handleMessageData}

            />
          </StyledSpeedDial>
        </Box>

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
                  selectedCustomerData.hireTypes ||
                  book.hireTypes || selectedCustomerdriver.hireTypes ||
                  ""
                }
                options={Hire.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
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
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-travelmail"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) => handletravelsAutocompleteChange(event, value, "travelsname")}
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
                // onInputChange={(event, value) => handleVehicleChange(event, value, "vehRegNo")}  // Handle manual input
                onInputChange={(event, value) => {
                  if (event !== null) {
                    setNoChangeData({ ...nochangedata, vehRegNo: value });
                  }
                  handleVehicleChange(event, value, "vehRegNo")
                }}
                // onKeyDown={handleKeyEnterdriver}
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
                // onInputChange={(event, value) => handleDriverChange(event, value, "driverName")}  // Handle manual input
                onInputChange={(event, value) => {
                  if (event !== null) {
                    setNoChangeData({ ...nochangedata, driverName: value });
                  }
                  handleDriverChange(event, value, "driverName")
                }}
                // onKeyDown={handleKeyEnterdriver}
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
            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="mobileNo"
                className="full-width"
                autoComplete="new-password"
                value={
                  selectedCustomerData.mobileNo ||
                  book.mobileNo || selectedCustomerdriver.mobileNo ||
                  ""
                }
                onChange={handleChange}
                label="Driver Phone"
                id="mobileNo"
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
                margin="normal"
                size="small"
              />
            </div>
            <div>
              {
                edit ?
                  <LoadingButton
                    disabled={!Booking_new}
                    variant="contained"
                    onClick={handleAdd}
                    loading={isAddbtnload}
                  >
                    Add New
                  </LoadingButton>

                  // <Button
                  //   variant="contained"
                  //   onClick={handleAdd}
                  //   disabled={!Booking_new}
                  // >
                  //   Add New</Button>
                  : <></>
              }
            </div>
          </div>
          <div className="sub-section2-driver">
            {/* <div className="second-table-driver">
              <div className="booking-update-main driver-table">
                <div className="booking-update">
                 
                </div>
              </div>
            </div> */}

            <div class="booking-table-new Scroll-Style">
              <table class="table-condensed table-striped fixed_header">
                <thead class="BI_tablehead">
                  <tr>
                    <th className="table-head-booking table-heading-first">Driver NAME</th>
                    <th className="table-head-booking">Vehicle Name</th>
                    <th className="table-head-booking">Vehicle NO</th>
                    <th className="table-head-booking">Travels Name</th>
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
        {/* {console.log(allFile, "filealll")} */}


        <Modal
          open={dialogmessage}
          onClose={handleCloseMessage}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: '40%',
              right: '-8%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '200px',
              bgcolor: 'white',
              // border: '1px solid #000',
              borderRadius: 2,
              textAlign: 'center',
              boxShadow: 24,
              p: 1,
              overflowY: 'auto'
            }}
          >


            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'self-start' }}>
              <p>Edited By: <span>{messageditedbefore}</span></p>

              <div className="input1 pick-up-address-input2">
                <TextField
                  name="MessageText"
                  margin="normal"
                  size="small"
                  autoComplete="new-password"
                  className="full-width"
                 
                  label="Message"
                  id="MessageText "
                  multiline
                  rows={2}
                  sx={{ width: "100%" }}
                  value={
                    formData.MessageText ||
                    selectedCustomerData.MessageText ||
                    book.MessageText ||
                    ""
                  }
                  // onChange={(event) => handleChangetext(event)}
                  onChange={(e) => {
                    handleChangetext(e)
                  }} 
                />

              </div>
              <div className="message_data">
                <Button onClick={handleCloseMessage}>Done</Button>
              </div>
            </div>
          </Box>
        </Modal>




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
                      // <embed
                      //   src={`${apiUrl}/images/${img.path}`}
                      //   type="application/pdf"
                      //   style={{ width: "100%", height: "600px", display: "block", border: "none" }}
                      //   key={img.path}  // Use key to prevent re-rendering
                      // />

                      <Document
                        file={`${apiUrl}/images/${img.path}`}

                        onLoadSuccess={onDocumentLoadSuccess}
                        style={{
                          width: "595px", // A4 width
                          height: "auto",
                          margin: "auto",
                        }}
                      >
                        {Array.from(new Array(numPages), (el, pageIndex) => (
                          <Page
                            key={`page_${pageIndex + 1}`}
                            pageNumber={pageIndex + 1}
                            scale={1}

                          />
                        ))}
                      </Document>
                    )}
                    <Checkbox checked={deletefile.includes(img.path)} onClick={() => handlecheckbox(img.path)} />
                  </div>
                ))}
            </div>
            <div>
              <Button disabled={!Booking_delete} variant="contained" onClick={() => handleimagedelete(deletefile)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={dialogdeleteOpen} onClose={handleClosedeleteDialog}>
          <DialogContent>
            <div>
              <h3>Are you sure you want to delete</h3>
              <div>
                <Button onClick={handleContextMenu}>yes</Button>
                <Button onClick={handleClosedeleteDialog}>No</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>



        <Dialog open={dialogOpentrail} onClose={handleCloseDialogtrail}>
          <DialogContent>
            <div className="vehicle-info-dailog-box-div1" style={{ width: "600px" }}>
              {/* <Button variant="contained" style={{ margin: "5px" }} onClick={handleSelectAll}>
                {selectAll ? "Deselect All" : "Select All"}
              </Button> */}
              {Array.isArray(selectetImg) &&
                selectetImg.map((img, index) => (
                  <div key={index} className="vehicle-info-dailog-box-btn-division" style={{ marginBottom: "10px" }}>

                    {img.type !== "application/pdf" ?
                      <>
                        <img
                          // src={`${apiUrl}/images/${img}`}
                          src={URL.createObjectURL(img)}
                          alt="vehicle_docimage"
                          style={{ width: "100%", height: "400px", objectFit: "contain" }}
                        />
                      </>
                      :
                      <>
                        <Document
                          file={img}
                          onLoadSuccess={onDocumentLoadSuccess}
                          style={{
                            width: "595px", // A4 width
                            height: "auto",
                            margin: "auto",
                          }}
                        >
                          {Array.from(new Array(numPages), (el, pageIndex) => (
                            <Page
                              key={`page_${pageIndex + 1}`}
                              pageNumber={pageIndex + 1}
                              scale={1}
                            // style={{
                            //   display: "block",
                            //   width: "595px",
                            //   height: "auto",
                            //   marginBottom: "20px",
                            //   pageBreakBefore: "always",
                            // }}
                            />
                          ))}
                        </Document>
                      </>
                    }



                    <Checkbox checked={deletefiledata.includes(img.name)} onClick={() => handlecheckbox1(img.name)} />
                  </div>
                ))}
            </div>
            <div>
              <Button disabled={!Booking_delete} variant="contained" onClick={() => handleimagedeletewithouttripid(deletefiledata)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>


      </form >
    </div >
  );
};
export default Booking;