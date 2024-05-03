import React, { useEffect, useContext } from 'react';
import dayjs from "dayjs";
import "./Vehicaleinfo.css";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Autocomplete } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FiUpload } from "react-icons/fi";
import { PermissionContext } from '../../../context/permissionContext';

import ChecklistIcon from "@mui/icons-material/Checklist";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";


// FONTAWESOME ICON
// import { TbLicense } from "react-icons/tb";

// ICONS
import SpeedIcon from "@mui/icons-material/Speed";
import ClearIcon from '@mui/icons-material/Clear';
// import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
// import CommuteIcon from "@mui/icons-material/Commute";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
// import AutoModeIcon from "@mui/icons-material/AutoMode";
// import AltRouteIcon from "@mui/icons-material/AltRoute";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssessmentIcon from "@mui/icons-material/Assessment";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
// import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
// import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
// import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
// import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useVehicleinfo from './useVehicleinfo';
import EmailIcon from "@mui/icons-material/Email";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { StationName } from "../DriverCreation/DriverCreationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
// import { faImagePortrait } from "@fortawesome/free-solid-svg-icons";
import DateRangeIcon from '@mui/icons-material/DateRange';
import { PiCarSimpleFill } from "react-icons/pi";
import { BsFillFuelPumpFill } from "react-icons/bs";




import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { APIURL } from "../../../url";

import { FaCar } from "react-icons/fa";

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



export const vehicaleinfos = [
  {
    Option: "A/C",
    // optionvalue: "a/c",
  },
  {
    Option: "Non A/C",
    // optionvalue: "non_a/c",
  },
];
export const GroupTypes = [
  {
    Option: "Luxzury",
    // optionvalue: "a/c",
  },
  {
    Option: "Normal",
    // optionvalue: "non_a/c",
  },
  {
    Option: "Premium",
    // optionvalue: "a/c",
  },
  {
    Option: "Non-Premium",
    // optionvalue: "non_a/c",
  },
];

export const fueltypes = [
  {
    Option: "Petrol",
    // optionvalue: "a/c",
  },
  {
    Option: "Diesel",
    // optionvalue: "non_a/c",
  },
];
export const Hire = [
  {
    Option: "Attached Vehicle",
    optionvalue: "attachedvehicle",
  },
  {
    Option: "Out Side Travels",
    optionvalue: "outsidetravels",
  },
  {
    Option: "Own  Vehicle",
    optionvalue: "ownvehicle",
  },

];
const Vehicaleinfo = () => {
  const apiUrl = APIURL;
  const {
    selectedCustomerData,
    rows,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    handleRowClick,
    handleRowClick1,
    book,
    handleClick,
    handleChange,
    handleAdd,
    hidePopup,
    handleDateChange,
    searchText,
    setSearchText,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleSearch,
    handleExcelDownload,
    handlePdfDownload,
    columns,
    setInsurance,
    // setLicence,
    setNationalPermit,
    setStatePermit,
    setRcbook,
    setFcCopy,
    allFile,
    handleCloseDialog,
    dialogOpen,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    // setError,
    // setErrorMessage,
    deletefile,

    handlecheckbox,
    // setSelectAll,
    selectAll,
    handleSelectAll,
    handleDocumentDownload,
    drivername,
    handleAutocompleteChange, handleKeyEnter, handleenterSearch, rows1, edit,
  } = useVehicleinfo();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);




  // Permission ------------
  const { permissions } = useContext(PermissionContext)

  const Supllier_read = permissions[10]?.read;
  const Supllier_new = permissions[10]?.new;
  const Supllier_modify = permissions[10]?.modify;
  const Supllier_delete = permissions[10]?.delete;




  return (
    <div className="vehicale-form">
      <form action="">
        <div className="detail-container-main-vehicale">

          <div className="vehicaleinfo-container">




            <div className="vehicaleinfo-container-left">
              <div className="input-field vehicleinfo-inputfeild">
                <div className="input">
                  <div className="icone">
                    <MinorCrashIcon color="action" />
                  </div>
                  <TextField
                    name="vehicleId"
                    value={selectedCustomerData?.vehicleId || ""}
                    onChange={handleChange}
                    label="Vehicle ID"
                    id="standard-size-normal"
                    variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FaCar />

                  </div>
                  <TextField
                    name="vehiclename"

                    value={
                      book.vehiclename || selectedCustomerData?.vehiclename || ""}
                    onChange={handleChange}
                    onKeyDown={handleKeyEnter}
                    label="Vehicle Name"
                    id="standard-size-normal"
                    variant="standard"
                  />
                  {/* </div> */}
                </div>

                {/* </div>
              <div className="input-field"> */}
                <div className="input">
                  <div className="icone">
                    <AirportShuttleIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) =>
                      handleAutocompleteChange(event, value, "hiretypes")
                    }
                    value={

                      selectedCustomerData?.hiretypes ||
                      book.hiretypes ||
                      ""
                    }
                    options={Hire?.map((option) => ({
                      label: option?.Option,
                    }))}
                    getOptionLabel={(option) =>
                      option.label ||
                      selectedCustomerData?.hiretypes ||
                      book.hiretypes ||
                      ""
                    }
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Hire Types"
                          name="hiretypes"
                          inputRef={params.inputRef}
                        />
                      );
                    }}
                  />
                </div>
                <div className="input radio">

                  <div className="icone">
                    <PiCarSimpleFill color="action" />
                  </div>

                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={book?.vechtype || selectedCustomerData?.vechtype || ''}
                    options={vehicaleinfos?.map((option) => ({
                      label: option?.Option,
                    }))}
                    // onChange={(event, value) => setVechiclebook((prevBook) => ({
                    //   ...prevBook,
                    //   "vechtype": value?.label,
                    // }))}
                    onChange={(event, value) =>
                      handleAutocompleteChange(event, value, "vechtype")
                    }
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Vehicle Type" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                {/* </div>
              <div className="input-field"> */}
                <div className="input">
                  <div className="icone">
                    <EmailIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={book?.Groups || selectedCustomerData?.Groups || ''}
                    options={GroupTypes?.map((option) => ({
                      label: option?.Option,
                    }))}
                    // onChange={(event, value) => setVechiclebook((prevBook) => ({
                    //   ...prevBook,
                    //   "Groups": value?.label,
                    // }))}
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
                <div className="input radio">

                  <div className="icone">
                    <BsFillFuelPumpFill color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={book.fueltype || selectedCustomerData?.fueltype || ''}
                    options={fueltypes?.map((option) => ({
                      label: option?.Option,
                    }))}
                    onChange={(event, value) =>
                      handleAutocompleteChange(event, value, "fueltype")
                    }
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="fuel Type" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                {/* </div>
              <div className="input-field"> */}
                <div className="input">
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="veh_reg_no"
                    label="Vehicle Reg No"
                    name="vehRegNo"
                    value={selectedCustomerData?.vehRegNo || book.vehRegNo || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>


                  <div className="icone">
                    <FontAwesomeIcon icon={faBuildingFlag} />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-stationname"
                    freeSolo
                    sx={{ width: "20ch" }}
                    value={StationName.find((option) => option.Option)?.label || selectedCustomerData?.stations || ''}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "stations")}
                    options={StationName.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.stations || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Station Name" name="stations" />
                      )
                    }
                    }
                  />
                  {/* </div> */}
                </div>

              </div>
              <div className="vehicaleinfo-container-right">
                <div className="vehicaleinfo-update-main">
                  <div className="vehicaleinfo-update">
                    <div
                      className="Scroll-Style"
                      style={{ overflow: "scroll", height: "220px" }}
                    >
                      <table>
                        <thead id="update-header">
                          <tr>
                            <th>ID</th>
                            <th>Vehicle_Name</th>
                            <th>Owner</th>
                            <th>Vehicle_Type</th>
                            <th>status</th>
                            <th>Group</th>
                          </tr>
                        </thead>
                        <tbody>

                          {rows1?.length === 0 ? (
                            <tr>
                              <td colSpan={6}>No data available.</td>
                            </tr>
                          ) : (
                            rows1?.map((row) => (
                              <tr
                                id="update-row"
                                key={row.id}
                                onClick={() => handleRowClick(row)}

                              >
                                <td>{row.vehicleId}</td>
                                <td>{row.vehiclename}</td>
                                <td>{row.owner}</td>
                                <td>{row.vechtype}</td>
                                <td>{row.active}</td>
                                <td>{row.Groups}</td>
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









            {/* <div className="vehicaleinfo-container-right">
              <div className="vehicaleinfo-update-main">
                <div className="vehicaleinfo-update">
                  <div
                    className="Scroll-Style"
                    style={{ overflow: "scroll", height: "220px" }}
                  >
                    <table>
                      <thead id="update-header">
                        <tr>
                          <th>ID</th>
                          <th>Vehicle_Name</th>
                          <th>Owner</th>
                          <th>Vehicle_Type</th>
                          <th>status</th>
                          <th>Group</th>
                        </tr>
                      </thead>
                      <tbody>

                        {rows1?.length === 0 ? (
                          <tr>
                            <td colSpan={6}>No data available.</td>
                          </tr>
                        ) : (
                          rows1?.map((row) => (
                            <tr
                              id="update-row"
                              key={row.id}
                              onClick={() => handleRowClick(row)}

                            >
                              <td>{row.vehicleId}</td>
                              <td>{row.vehiclename}</td>
                              <td>{row.owner}</td>
                              <td>{row.vechtype}</td>
                              <td>{row.active}</td>
                              <td>{row.Groups}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="input-field vehicleinfo-inputfeild">
            {/* <div className="input"> */}

            <div className="input" style={{ width: "215px" }}>
              <div className="icone">
                <ContactMailIcon color="action" />
              </div>
              <TextField
                size="small"
                id="Segment"
                label="Segment"
                name="segement"
                value={
                  book.segement || selectedCustomerData?.segement ||
                  ""
                }
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <div className="icone">
                <AssessmentIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                id="year_model"
                name="yearModel"
                value={selectedCustomerData?.yearModel || book.yearModel || ""}
                onChange={handleChange}
                label="Year Model"
              />
            </div>
            <div className="input">
              <div className="icone">
                <EmojiTransportationIcon color="action" />
              </div>
              <TextField
                name="owner"
                value={selectedCustomerData?.owner || book.owner || ""}
                onChange={handleChange}
                label="Owner"
                id="owner"
                size='small'
              />
            </div>
            <div className="input">
              <div className="icone">
                <ContactPhoneIcon color="action" />
              </div>
              <TextField
                name="mobileNo"
                value={selectedCustomerData?.mobileNo || book.mobileNo || ""}
                onChange={handleChange}
                label="Mobile No"
                id="mobile_no"
                size='small'
              />
            </div>
            <div className="input">
              <div className="icone">
                <AttachEmailIcon color="action" />
              </div>
              <TextField
                name="email"
                size='small'
                value={selectedCustomerData?.email || book.email || ""}
                onChange={handleChange}
                label="Email"
                id="email"
              />
            </div>
            {/* <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Attached Date"
                  format="DD/MM/YYYY"
                  value={selectedCustomerData.doadate ? dayjs(selectedCustomerData.doadate) : null}
                  onChange={(date) => handleDateChange(date, 'doadate')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='doadate' value={selectedCustomerData.doadate} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div> */}
            {/* </div>
          <div className="input-field"> */}
            <div className="input">
              <div className="icone">
                <ContactPhoneIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                name="insuranceno"
                value={selectedCustomerData?.insuranceno || book.insuranceno || ""}
                onChange={handleChange}
                label="Insurance No"
                id="tank_cap"
              />
            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Insurance Due Date"
                  format="DD/MM/YYYY"
                  value={selectedCustomerData?.insduedate ? dayjs(selectedCustomerData.insduedate) : null}
                  onChange={(date) => handleDateChange(date, 'insduedate')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='insduedate' value={selectedCustomerData.insduedate} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
            <div className="input">
              {/* {selectedCustomerData.vehicleId || book.vehicleId ? ( */}
              <Button color="primary" variant="contained" size="md" component="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiUpload />
                <span>
                  Insurance Copy

                </span>


                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setInsurance(e.target.files[0])}
                />
              </Button>
              {/* ) : (
                <Button color="primary" variant="contained" onClick={() => {
                  setError(true);
                  setErrorMessage("Please Enter Booking No");
                }}>
                  Insurance Copy
                </Button>
              )} */}
            </div>
            <div className="input">
              <div className="icone">
                <AirlineSeatReclineExtraIcon color="action" />
              </div>
              <Autocomplete
                fullWidth
                size="small"
                id="free-solo-demo-pricetag"
                freeSolo
                sx={{ width: "20ch" }}
                onChange={(event, value) => handleAutocompleteChange(event, value, "driverName")}
                // value={drivername.find((option) => option.optionvalue)?.label || selectedCustomerData?.driverName || ''}
                value={selectedCustomerData?.driverName || book.selectedCustomerData || ""}
                // options={PriceTag.map((option) => ({
                //   label: option.option,
                // }))}
                options={drivername?.map((option) => ({ label: option }))} // Use organizationName here
                getOptionLabel={(option) => option.label || selectedCustomerData?.driverName || ''}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Driver Name" name="driverName" inputRef={params.inputRef} />
                  )
                }
                }
              />

            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Attached Date"
                  format="DD/MM/YYYY"
                  // value={selectedCustomerData.doadate ? dayjs(selectedCustomerData.doadate) : dayjs()}
                  value={
                    selectedCustomerData?.doadate
                      ? dayjs(selectedCustomerData.doadate)
                      : dayjs() || book.doadate
                        ? dayjs(book.doadate)
                        : dayjs()
                  }
                  onChange={(date) => handleDateChange(date, 'doadate')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='doadate' value={selectedCustomerData?.doadate} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
            {/* </div> */}


            {/* <div className="input-field"> */}
            <div className="input" style={{ width: "220px" }}>
              <div className="icone">
                <DocumentScannerIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                name="nationalpermito"
                value={selectedCustomerData?.nationalpermito || book.nationalpermito || ""}
                onChange={handleChange}
                label="National Permit No"
                id="tank_cap"
              />
            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DatePicker
                  label="National Permit Date"
                  format="DD/MM/YYYY"
                  // value={selectedCustomerData.npdate ? dayjs(selectedCustomerData.npdate) : null||book.npdate||""}
                  value={
                    selectedCustomerData?.npdate
                      ? dayjs(selectedCustomerData?.npdate)
                      : null || book.npdate
                        ? dayjs(book.npdate)
                        : null
                  }
                  onChange={(date) => handleDateChange(date, 'npdate')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='npdate' value={selectedCustomerData?.npdate} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
            <div className="input" style={{ width: "220px" }}>

              <Button color="primary" variant="contained" size="md" component="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiUpload />
                <span>
                  National PermitCopy
                </span>

                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setNationalPermit(e.target.files[0])}
                />
              </Button>


            </div>
            <div className="input">
              <div className="icone">
                <SpeedIcon color="action" />
              </div>
              <TextField
                name="avgmileage"
                value={selectedCustomerData?.avgmileage || book.avgmileage || ""}
                onChange={handleChange}
                label="AVG Mileage"
                id="avgmileage"
                size="small"
              />
            </div>
            {/* </div>
          <div className="input-field"> */}
            <div className="input" style={{ width: "220px" }}>
              <div className="icone">
                <DocumentScannerIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                name="statepermito"
                value={selectedCustomerData?.statepermito || book.statepermito || ""}
                onChange={handleChange}
                label="State Permit No"
                id="tank_cap"
              />
            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="State Permit Date"
                  format="DD/MM/YYYY"
                  // value={selectedCustomerData.spdate ? dayjs(selectedCustomerData.spdate) : null|| book.spdate}
                  value={
                    selectedCustomerData?.spdate
                      ? dayjs(selectedCustomerData.spdate)
                      : null || book.spdate
                        ? dayjs(book.spdate)
                        : null
                  }
                  onChange={(date) => handleDateChange(date, 'spdate')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='spdate' value={selectedCustomerData?.spdate} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
            <div className="input" style={{ width: "220px" }}>

              <Button color="primary" variant="contained" size="md" component="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiUpload />
                <span>
                  State Permit Copy

                </span>


                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setStatePermit(e.target.files[0])}
                />
              </Button>

            </div>
            <div className="input">
              <div className="icone">
                <AccountBalanceWalletIcon color="action" />
              </div>
              <TextField
                name="financer"
                value={selectedCustomerData?.financer || book.financer || ""}
                onChange={handleChange}
                label="Financer"
                id="financer"
                size="small"
              />
            </div>
            {/* </div>
          <div className="input-field"> */}
            <div className="input" style={{ width: "220px" }}>
              <div className="icone">
                <HistoryEduIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                name="rcbookno"
                value={selectedCustomerData?.rcbookno || book.rcbookno || ""}
                onChange={handleChange}
                label="RC Book No"
                id="tank_cap"
              />
            </div>
            <div className="input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="FC Date"
                  format="DD/MM/YYYY"
                  value={
                    selectedCustomerData?.fcdate
                      ? dayjs(selectedCustomerData.fcdate)
                      : null || book.fcdate
                        ? dayjs(book.fcdate)
                        : null
                  }
                  onChange={(date) => handleDateChange(date, 'fcdate')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='fcdate' value={selectedCustomerData?.fcdate} />
                  )}
                </DatePicker>
              </LocalizationProvider>


            </div>
            <div className="input">

              <Button color="primary" variant="contained" size="md" component="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiUpload />
                <span>
                  RC-Book Copy

                </span>


                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setRcbook(e.target.files[0])}
                />
              </Button>

            </div>
            <div className="input" style={{ width: "160px" }}>

              <Button color="primary" variant="contained" size="md" component="label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiUpload />
                <span>
                  FC Copy
                </span>

                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFcCopy(e.target.files[0])}
                />
              </Button>

            </div>
            {/* </div>
          <div className="input-field"> */}

            <div className="input">
              <div className="icone">
                <ContactPhoneIcon color="action" />
              </div>
              <TextField
                margin="normal"
                size="small"
                name="tankCap"
                value={selectedCustomerData?.tankCap || book.tankCap}
                onChange={handleChange}
                label="Tank Capacity"
                id="tank_cap"
              />
            </div>

            <div className="input">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Active
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="active"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={selectedCustomerData?.active || book.active}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </div>


            {/* <div className="input" style={{ width: "80px" }}>
              <Button variant="outlined" startIcon={<SummarizeTwoToneIcon />}>
                list
              </Button>
            </div> */}
            <div className="input" style={{ width: "160px" }}>
              {isEditMode ? (
                <Button variant="contained" disabled={!Supllier_modify} onClick={handleEdit}>Edit</Button>
              ) : (
                <Button variant="contained" disabled={!Supllier_new} onClick={handleAdd} >Add</Button>
              )}
            </div>
          </div>
        </div>

        <div className='alert-popup-main'>
          {error && <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{errorMessage}</p>
          </div>}
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{warningMessage}</p>
            </div>
          }
          {info &&
            <div className='alert-popup Info' >
              <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{infoMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
              <p>{successMessage}</p>
            </div>
          }
        </div>

        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Booking">
              <div className="input-field" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <AiOutlineFileSearch color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Search"
                    name="searchText"
                    value={searchText}
                    onKeyDown={handleenterSearch}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <DateRangeIcon color="action" />
                    </div>
                    <DatePicker
                      label="From Date"
                      format="DD/MM/YYYY"
                      name='fromDate'
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <DateRangeIcon color="action" />
                    </div>
                    <DatePicker
                      label="To Date"
                      format="DD/MM/YYYY"
                      name="toDate"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained" onClick={handleSearch}>Search</Button>
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
            {/* {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(event) => handleClick(event, action.name)}
              />
            ))} */}
            {/* {actions.map((action) => (
              action.icon ? (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={(event) =>
                    handleClick(event, action.name)
                  }
                />
              ) : null
            ))} */}

            {Supllier_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event, "List")}
              />
            )}

            {Supllier_modify === 1 && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit")}
              />
            )}
            {Supllier_delete === 1 && (
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete")}
              />
            )}


            {edit ? "" : (Supllier_new === 1 && (
              <SpeedDialAction
                key="Add"
                icon={<BookmarkAddedIcon />}
                tooltipTitle="Add"
                onClick={(event) => handleClick(event, "Add")}
              />
            ))}

            <SpeedDialAction
              key="Cancel"
              icon={<CancelPresentationIcon />}
              tooltipTitle="Cancel"
              onClick={(event) => handleClick(event, "Cancel")}
            />



          </StyledSpeedDial>
        </Box>
        <div className="Download-btn">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
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
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick1}
              pageSize={5}
            />
          </div>

          <Dialog open={dialogOpen} onClose={handleCloseDialog} >
            <DialogContent>

              <div style={{ position: 'relative' }}>
                <Button variant='contained' style={{ marginBottom: 10 }} onClick={handleSelectAll}>
                  {selectAll ? 'Deselect All' : 'Select All'}
                </Button>                                    {Array.isArray(allFile) && allFile.map((img, index) => (
                  <div key={index} style={{ borderBottom: '1px solid black' }} >
                    {img.file_type === "image/jpg" || img.file_type === "image/jpeg" || img.file_type === "image/png" || img.file_type === "image/gif" || img.file_type === "image/svg"
                      ? <img src={`${apiUrl}/public/vehicle_doc/` + img.fileName} alt='vehicle_docimage' type="application/pdf" width="100%" height="400px" /> :
                      <embed src={`${apiUrl}/public/vehicle_doc/` + img.fileName} type="application/pdf" width="100%" height="400px" />}


                    <Checkbox typeof='checked'
                      checked={deletefile.includes(img.fileName)}
                      onClick={(event) => {

                        handlecheckbox(img.fileName)

                      }} />

                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', padding: 10, gap: 15 }}>

                <Button variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
                <Button variant='contained' onClick={() => handleDocumentDownload()}>Print</Button>
              </div>
            </DialogContent>
            {/* venkat */}

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
      </form>
    </div>
  );
};

export default Vehicaleinfo;