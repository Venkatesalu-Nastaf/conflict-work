import React, { useEffect, useContext } from "react";
import "./Booking.css";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import {
  Duty,
  Hire,
  PayType,
  Report,
  GroupTypes,
  vehicaleinfos
} from "./Booking";
import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";

// ICONS
import { PiCarSimpleFill } from "react-icons/pi";
import InfoIcon from "@mui/icons-material/Info";
import SellIcon from "@mui/icons-material/Sell";
import ClearIcon from "@mui/icons-material/Clear";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { AiOutlineFileSearch } from "react-icons/ai";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
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
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TaxiAlertTwoToneIcon from "@mui/icons-material/TaxiAlertTwoTone";
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
import ChecklistIcon from "@mui/icons-material/Checklist";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdDataUsage } from "react-icons/md";

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

const Booking = ({ stationName }) => {

  const apiUrl = APIURL;
  const {
    selectedCustomerData,
    selectedCustomerId,
    rows,
    actionName,
    error,
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

    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleKeyDown,
    handleDateChange,
    getCurrentTime,
    setBook,
    setSelectedCustomerData,
    setBookingTime,
    selectedCustomerDatas,
    handleKeyEnter,
    formValues,
    handleenterSearch,
    handleAutocompleteChange,
    setFormData,
    setStartTime,
    // guestsms,
    // setGuestSms,
    sendEmail,
    setSendEmail,
    lastBookingNo,
    currentYear,
    // handleClickHide,
    searchText,
    setSearchText,
    setreporttime,
    storedUsername,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShowAll,
    popupOpen,
    handlePopupClose,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    columns,
    handletableClick,
    setFile,
    dialogOpen,
    handleCloseDialog,
    allFile,
    handleButtonClick,
    isEditMode,
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
    edit,
    handleKeyEnterdriver,
    vehileName,
    selectedCustomerdriver
  } = useBooking();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  // Permission ------------
  const { permissions } = useContext(PermissionContext)
  const Booking_read = permissions[1]?.read;
  const Booking_new = permissions[1]?.new;
  const Booking_modify = permissions[1]?.modify;
  const Booking_delete = permissions[1]?.delete;

  return (
    <div className="booking-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="booking-main-section1">
          <div className="sub-section1">
            <div className="first-division">
              <div className="input">
                <div className="icone">
                  <SwitchAccountIcon color="action" />
                </div>
                <TextField
                  name="bookingno"
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
                  variant="standard"
                  autoFocus
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CalendarMonthIcon color="action" className="booking-date-icon" />
                </div>
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
              <div className="booking-time-main-div">
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
              </div>
              <div className="input radio">
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
              </div>
              <div className="input">
                <div className="icone">
                  <SellIcon color="action" />
                </div>
                <TextField
                  name="tripid"
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
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="customer"
                  label="Customer"
                  name="customer"
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
                  value={book.servicestation || selectedCustomerData.servicestation || formData.servicestation || selectedCustomerDatas.servicestation || ''}
                  options={stationName?.map((option) => ({
                    label: option?.Stationname,
                  }))}
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "servicestation")
                  }
                  renderInput={(params) => {
                    return (
                      <TextField {...params} label="servicestation" name="servicestation" inputRef={params.inputRef} />
                    );
                  }}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FmdBadIcon color="action" />
                </div>
                <TextField
                  name="remarks"
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
                  variant="standard"
                />
              </div>
            </div>
          </div>
          <div className="sub-section2 sub-section2-booking">
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

          </div>
        </div>
        <div>
          <div className="second-division second-division-booking">
            <div className="input">
              <div className="icone">
                <HomeRepairServiceTwoToneIcon color="action" />
              </div>
              <TextField
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
                variant="standard"
              />
            </div>
            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="mobile"
                autoComplete="new-password"
                className="full-width"
                value={
                  formData.mobile ||
                  selectedCustomerData.mobile ||
                  selectedCustomerDatas.phoneno ||
                  book.mobile ||
                  ""
                }
                onChange={handleChange}
                label="Mobile No"
                id="mobile_no"
                variant="standard"
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
                variant="standard"
                required
              />
            </div>
            <div className="input">
              <div className="icone">
                <MdDataUsage />
              </div>
              <TextField
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
                variant="standard"
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
                label="Email"
                id="email"
                variant="standard"
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
                label="Employee No"
                id="employeeno"
                variant="standard"
              />
            </div>
            <div className="input">
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
              />
            </div>
            <div className="input">
              <div className="icone">
                <AddHomeWorkIcon color="action" />
              </div>
              <TextField
                margin="normal"
                id="address12"
                label="Address"
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
            </div>
            <div className="input">
              <div className="icone">
                <LocationCityIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="report"
                freeSolo
                sx={{ width: "100%" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "report")
                }
                value={
                  Report.find((option) => option.Option)?.label ||
                  formData.report ||
                  selectedCustomerData.report ||
                  book.report ||
                  ""
                }
                options={Report.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.report ||
                  selectedCustomerData.report ||
                  book.report ||
                  ""
                }
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Report"
                      autoComplete="password"
                      name="report"
                      inputRef={params.inputRef}
                    />
                  );
                }}
              />
            </div>
            <div className="input">
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
                <CalendarMonthIcon color="action" />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Report Date"
                  id="report_date"
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
            <div>
              <div className="input time">
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
              <div className="input time">
                <div className="icone">
                  <MdOutlineAccessTimeFilled />
                </div>
                <div className="input-type-grid">
                  <label>Report Time</label>
                  <input
                    type="time"
                    id="reporttime"
                    name="reporttime"
                    value={
                      formData.reporttime ||
                      selectedCustomerData.reporttime ||
                      book.reporttime ||
                      ""
                    }
                    onChange={(event) => {
                      setBook({ ...book, reporttime: event.target.value });
                      setreporttime(event.target.value);
                      setFormData({
                        ...formData,
                        reporttime: event.target.value,
                      });
                      setSelectedCustomerData({
                        ...selectedCustomerData,
                        reporttime: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>


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
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
            </div>
            <div className="input-dummy">
              <Button
                variant="outlined"
                onClick={handleButtonClick}
              >
                View
              </Button>
            </div>
          </div>

          <div className="booking-main-section2">
            <div className="sub-section1 sub-section-second-division">
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
                  <LocationCityIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="pickup"
                  label="PickUp"
                  name="pickup"
                  autoComplete="new-password"
                  value={
                    formData.pickup ||
                    selectedCustomerData.pickup ||
                    formValues.pickup ||
                    book.pickup ||
                    ""
                  }
                  onChange={handleChange}
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
                  label="Customer code"
                  id="customercode"
                  variant="standard"
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
                  label="Request No"
                  id="registerno"
                  variant="standard"
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
                  variant="standard"
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ForwardToInboxIcon color="action" />
                </div>
                <TextField
                  name="orderbyemail"
                  className="full-width"
                  autoComplete="new-password"
                  value={
                    formData.orderbyemail ||
                    selectedCustomerData.orderbyemail ||
                    selectedCustomerDatas.customeremail ||
                    book.orderbyemail ||
                    ""
                  }
                  onChange={handleChange}
                  label="Order By Email"
                  id="orederbyemail"
                  variant="standard"
                />
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
            </div>
            <div className="sub-section2-driver">
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
            </div>
          </div>
        </div>
        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {Booking_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event, "List", selectedCustomerId)}
              />
            )}
            {Booking_modify === 1 && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
              />
            )}
            {Booking_delete === 1 && (
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
              />
            )}
            {Booking_new === 1 && (
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
                sx={{ width: "20ch" }}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "hireTypes")
                }
                value={
                  Hire.find((option) => option.Option)?.label ||
                  formData.hireTypes ||
                  selectedCustomerData.hireTypes ||
                  book.hireTypes || selectedCustomerdriver.hireTypes ||
                  ""
                }
                options={Hire.map((option) => ({
                  label: option.Option,
                }))}
                getOptionLabel={(option) =>
                  option.label ||
                  formData.hireTypes ||
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
              <TextField
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
                variant="standard"
              />
            </div>

            <div className="input">
              <div className="icone">
                <CarCrashIcon color="action" />
              </div>
              <TextField
                name="vehRegNo"
                autoComplete="new-password"
                value={
                  formData.vehRegNo ||
                  selectedCustomerData.vehRegNo ||
                  book.vehRegNo || selectedCustomerdriver.vehRegNo ||
                  ""
                }
                onChange={handleChange}
                onKeyDown={handleKeyEnterdriver}
                label="Vehicle Register No"
                id="vehRegNo"
                variant="standard"
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
                  formData.vehiclemodule ||
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
                    <TextField {...params} label="Vehicle Type" inputRef={params.inputRef} />
                  );
                }}
              />
            </div>

            <div className="input">
              <div className="icone">
                <TaxiAlertTwoToneIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="vehType"
                freeSolo
                sx={{ width: "20ch" }}
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
                  formData.Groups ||
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
                <NoCrashIcon color="action" />
              </div>
              <TextField
                name="driverName"
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
                variant="standard"
              />
            </div>

            <div className="input">
              <div className="icone">
                <AddIcCallTwoToneIcon color="action" />
              </div>
              <TextField
                name="mobileNo"
                autoComplete="new-password"
                value={
                  formData.mobileNo ||
                  selectedCustomerData.mobileNo ||
                  book.mobileNo || selectedCustomerdriver.mobileNo ||
                  ""
                }
                onChange={handleChange}
                label="Driver Phone"
                id="mobileNo"
                variant="standard"
              />
            </div>

            <div className="input">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="travelsemail"
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
                variant="standard"
              />
            </div>

            <div className="input">
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
        </div>
        <div className="detail-container-main">
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
              </div>
            </div>
          </div>
        </div>
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
        <div className="table-bookingCopy-Booking">
          <div className="booking-main-table">
            <DataGrid
              rows={reversedRows}
              columns={columns}
              onRowClick={handletableClick}
              pageSize={5}
              checkboxSelection
            />

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
      </form >
    </div >
  );
};

export default Booking;