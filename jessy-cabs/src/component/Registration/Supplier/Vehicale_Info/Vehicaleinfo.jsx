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
// import { FiUpload } from "react-icons/fi";
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
import { AiOutlineFileSearch } from "react-icons/ai";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssessmentIcon from "@mui/icons-material/Assessment";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useVehicleinfo from './useVehicleinfo';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import EmailIcon from "@mui/icons-material/Email";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import DateRangeIcon from '@mui/icons-material/DateRange';
// import { PiCarSimpleFill } from "react-icons/pi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { APIURL } from "../../../url";
import { FaCar } from "react-icons/fa";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { RiFileUploadLine } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import VehicleAddData from './VehicleAdddata';
import axios from 'axios'
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { Typography, } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import DeleteConfirmationDialog from '../../../DeleteData/DeleteData';


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

const style = {
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 'fit-content', // Adjust height dynamically based on content
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// const deletestyle = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 300,
//   height: 100,
//   bgcolor: 'background.paper',
//   // border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };
// export const vehicaleinfos = [
//   {
//     Option: "A/C",
//     // optionvalue: "a/c",
//   },
//   {
//     Option: "Non A/C",
//     // optionvalue: "non_a/c",
//   },
// ];
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
  {
    Option: "CNG",
    // optionvalue: "non_a/c",
  },
  {
    Option: "EV",
    // optionvalue: "non_a/c",
  },

];
export const Hire = [
  {
    Option: "Attached Vehicle",
    optionvalue: "Attached Vehicle",
  },
  {
    Option: "OutSide Travels",
    optionvalue: "OutSide Travels",
  },
  {
    Option: "Own Vehicle",
    optionvalue: "Own Vehicle",
  },
  {
    Option: "DCO Vehicle",
    optionvalue: "DCO Vehicle",
  }


];
const Vehicaleinfo = ({ stationName }) => {
  const apiUrl = APIURL;
  const {
    selectedCustomerData,
    rows,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    // handleRowClick,
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
    handleAutocompleteChange, handleUploadFile, handleKeyEnter, handleenterSearch,
    //  rows1,
     handleChangecredent, cerendentialdata, vehiclenames, setVehilcNames,
    loading, isVButonLoading,setDeletevehciledata,deletevehciledata
  } = useVehicleinfo();
  const { handleinputchnagevehicle, handleADDvehicledata, vechiclevalue, isOpenvehcile, setIsOpenvehicle, error1, errorMessage1, success1, successMessage1, hidePopup1,
    vehicleNamesList, handleVehicleDeleteName, handleVehicleEditName, editModal, setEditModal, deleteModal, setDeleteModal, vehicleNameEditFun,
    editData, setEditData, vehicleNameDeleteFun
  } = VehicleAddData()

  // useEffect(() => {

  //     handleClick('List');

  // }, [handleClick]);



  const handleClickOpen = () => {
    setIsOpenvehicle(true)
  }
  const handleClose = () => {
    setIsOpenvehicle(false)
  }

  const Addcolumns = [
    { field: 'id', headerName: 'S No', width: 90 },
    {
      field: 'VechicleNames',
      headerName: 'Vehicle Names',
      width: 150,
      editable: true,
    },

    {
      field: 'edit',
      headerName: 'Edit',
      width: 110,
      renderCell: (params) => (
        <IconButton onClick={() => handleVehicleEditName(params.row)} className='edit-btn'>
          <EditIcon style={{ fontSize: "20px" }} />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 110,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleVehicleDeleteName(params.row)} className='det-btn'>
          <DeleteIcon style={{ fontSize: "20px" }} />
        </IconButton>
      ),
    },

  ];

  // const handleView = (row) => {
  //   console.log('View row:', row);
  //   // Add your view logic here
  // };

  // const handleDelete = (row) => {
  //   console.log('Delete row:', row);
  //   // Add your delete logic here
  // };
  useEffect(() => {
    const fetchgetvehicleNames = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getvehicledatauniquevehicleNames`);
        const data = response.data
        // console.log(data, "checking vehicl")
        const names = data.map(res => res.VechicleNames)
        setVehilcNames(names)
      }
      catch (error) {
        console.log(error, "error");
      }
    };
    fetchgetvehicleNames()
  }, [apiUrl, isOpenvehcile, setVehilcNames])

  // Permission ------------
  const { permissions } = useContext(PermissionContext)
  const Supllier_read = permissions[12]?.read;
  const Supllier_new = permissions[12]?.new;
  const Supllier_modify = permissions[12]?.modify;
  const Supllier_delete = permissions[12]?.delete;

  const handleEditmodalClose = () => {
    setEditModal(false)
  }

  const handleEditVehicleData = (e) => {
    const { name, value } = e.target; // Extract name and value from the event
    setEditData((prevState) => ({
      ...prevState, // Spread the previous state to retain other properties
      [name]: value, // Update only the property that matches `name`
    }));
  };

  const handleDeleteNot = () => {
    setDeleteModal(false)
  }
  const handleDeletemodalClose = () => {
    setDeleteModal(false)
  }
  return (
    <div className="main-content-form">
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
                    // margin='normal'
                    size='small'
                    name="vehicleId"
                    value={selectedCustomerData?.vehicleId || ""}
                    onChange={handleChange}
                    label="Vehicle ID"
                    id="vehicleId"
                    className='full-width'
                  // variant="standard"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FaCar />
                  </div>
                  {/* <TextField
                    // margin='normal'
                    size='small'
                    name="vehicleName"
                    value={
                      book.vehicleName || selectedCustomerData?.vehicleName || ""}
                    onChange={handleChange}
                    onKeyDown={handleKeyEnter}
                    label="Vehicle Name"
                    id="vehicleName"
                    className='full-width'
                  // variant="standard"
                  /> */}

                  <Autocomplete
                    fullWidth
                    size="small"
                    id="vehicleName"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleName")}
                    // value={drivername.find((option) => option.optionvalue)?.label || selectedCustomerData?.driverName || ''}
                    value={book.vehicleName || selectedCustomerData?.vehicleName || ""}
                    // value={selectedCustomerData?.driverName || book.selectedCustomerData || ""}
                    options={vehiclenames?.map((option) => ({ label: option }))} // Use organizationName here
                    getOptionLabel={(option) => option.label || selectedCustomerData?.vehicleName || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Vehicle Name" name="vehicleName" onKeyDown={handleKeyEnter} inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AirportShuttleIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="hiretypes"
                    freeSolo
                    sx={{ width: "100%" }}
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
                {/* <div className="input radio">
                  <div className="icone">
                    <PiCarSimpleFill color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="vehType"
                    freeSolo
                    size="small"
                    value={book?.vehType || selectedCustomerData?.vehType || ''}
                    options={vehicaleinfos?.map((option) => ({
                      label: option?.Option,
                    }))}
                    onChange={(event, value) =>
                      handleAutocompleteChange(event, value, "vehType")
                    }
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Vehicle Type" inputRef={params.inputRef} />
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
                    value={book?.Groups || selectedCustomerData?.Groups || ''}
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
                <div className="input radio">
                  <div className="icone">
                    <BsFillFuelPumpFill color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="fueltype"
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
                <div className="input">
                  <div className='full-width' style={{ display: 'grid' }}>
                    <span className='full-width' style={{ display: 'flex' }}>
                      <div className="icone">
                        <CarCrashIcon color="action" />
                      </div>
                      <TextField
                        // margin="normal"
                        size="small"
                        id="vehRegNo"
                        className='full-width'
                        label="Vehicle Reg No"
                        name="vehRegNo"
                        value={selectedCustomerData?.vehRegNo || book.vehRegNo || ''}
                        // onChange={handleChange}
                        onChange={handleChangecredent}
                      />
                    </span>
                    <span style={{ textAlign: 'center' }}>
                      <span style={{ color: "red" }}>{cerendentialdata ? `vehRegno Already Exist` : ""}</span>
                    </span>
                  </div>
                </div>
                <div className="input">
                  <div className="icone">
                    <FaBuilding />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="stations"
                    freeSolo
                    sx={{ width: "100%" }}
                    value={stationName?.find((option) => option.Option)?.label || selectedCustomerData?.stations || ''}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "stations")}
                    options={stationName?.map((option) => ({
                      label: option.Stationname,
                    }))}
                    getOptionLabel={(option) => option.label || selectedCustomerData?.stations || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Station Name" name="stations" />
                      )
                    }
                    }
                  />
                </div>
                <div>
                  <div>
                    {!isEditMode &&
                      <>
                        <Button disabled={!Supllier_new} variant="outlined" onClick={handleClickOpen}>
                          Add Vehicle
                        </Button>
                      </>
                    }
                    <Dialog open={isOpenvehcile} onClose={handleClose}>
                      <DialogContent>
                        <div className='vech-modal'>


                          <TextField

                            id="name"
                            label="Vehicle Name"
                            type="text"
                            className='vehicleInput'
                            // fullWidth
                            variant="outlined"
                            value={vechiclevalue || ""}
                            onChange={handleinputchnagevehicle}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "40px",
                                padding: "5px",// Adjust the height here
                              },
                              "& .MuiInputLabel-root": {
                                lineHeight: "0.7", // Adjust label height alignment
                              },
                            }}

                          />
                          <Button onClick={handleADDvehicledata}>ADD</Button>

                        </div>
                        <Box
                          sx={{ padding: "20px" }}
                        >
                          <DataGrid
                            rows={vehicleNamesList}
                            columns={Addcolumns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                          // checkboxSelection
                          // disableRowSelectionOnClick
                          />
                        </Box>
                      </DialogContent>


                    </Dialog>
                  </div>
                </div>
              </div>
              {/* <div className="vehicaleinfo-container-right">
                <div className="vehicaleinfo-update-main">
                  <div className="vehicaleinfo-update">
                    <div
                      className="Scroll-Style vehicle-info-table1"
                    >
                      <table>
                        <thead id="update-header">
                          <tr>
                            <th className="table-head-booking vehicle-info-table-heading-first">ID</th>
                            <th className="table-head-booking">Vehicle_Name</th>
                            <th className="table-head-booking">Owner</th>
                            <th className="table-head-booking">Vehicle_Type</th>
                            <th className="table-head-booking">status</th>
                            <th className="table-head-booking vehicle-info-table-heading-last">Group</th>
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
                                <td>{row.vehicleName}</td>
                                <td>{row.owner}</td>
                                <td>{row.vehType}</td>
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
          </div>
          <div className="input-field vehicleinfo-inputfeild">
            <div className="input-permit-no">
              <div className="icone">
                <DocumentScannerIcon color="action" />
              </div>
              <TextField
                // margin="normal"
                size="small"
                name="statepermito"
                className='full-width'
                value={selectedCustomerData?.statepermito || book.statepermito || ""}
                onChange={handleChange}
                label="State Permit No"
                id="statepermito"
              />
              <div className='state-permit-copy-tooltip'>
                <Button size="md" component="label" className='vehicle-info-upload-btn'>
                  <span class="vehicle-info-upload-btn-width">
                    <span className='upload-icon'>
                      <RiFileUploadLine />
                    </span>
                    <input
                      type="file"
                      id="State_Permit"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setStatePermit(e.target.files[0]);
                        console.log('File selected:', e.target.files[0]);
                        handleUploadFile(e);
                      }}
                    />
                  </span>
                </Button>
                <span class="state-permit-copy-tooltiptext">Upload State Permit Copy</span>
              </div>
            </div>
            <div className="input">
              <div className='icone'>
                <CalendarMonthIcon />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="State Permit Date"
                  id="State_Permit"
                  className='full-width'
                  format="DD/MM/YYYY"
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

            <div className="input">
              <div className="icone">
                <EmojiTransportationIcon color="action" />
              </div>
              <TextField
                name="owner"
                className='full-width'
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
                className='full-width'
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
                className='full-width'
                value={selectedCustomerData?.email || book.email || ""}
                onChange={handleChange}
                label="Email"
                id="email"
              />
            </div>

            <div className="input-permit-no">
              <div className="icone">
                <ContactPhoneIcon color="action" />
              </div>
              <TextField
                // margin="normal"
                size="small"
                name="insuranceno"
                className='full-width'
                value={selectedCustomerData?.insuranceno || book.insuranceno || ""}
                onChange={handleChange}
                label="Insurance No"
                id="insuranceno"
              />
              <div className='insurance-copy-tooltip'>
                <Button size="md" className='vehicle-info-upload-btn' component="label">
                  <span class=" vehicle-info-upload-btn-width">
                    <span className='upload-icon'>
                      <RiFileUploadLine />

                    </span>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setInsurance(e.target.files[0])
                        console.log('File selected:', e.target.files[0]);
                        handleUploadFile(e);
                      }}
                    />
                  </span>
                </Button>
                <span class="insurance-copy-tooltiptext">Upload Insurance Copy</span>
              </div>
            </div>


            <div className="input">
              <div className='icone'>
                <CalendarMonthIcon />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Insurance Due Date"
                  id="Insurance_date"
                  className='full-width'
                  format="DD/MM/YYYY"
                  value={selectedCustomerData?.insduedate ? dayjs(selectedCustomerData.insduedate) : null}
                  onChange={(date) => handleDateChange(date, 'insduedate')}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '14px', // Adjust the size as needed
                    },
                  }}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='insduedate' value={selectedCustomerData.insduedate} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
            {/* <div className="input">
              <Button size="md" className='vehicle-info-upload-btn' component="label">

                <span class="button-29 vehicle-info-upload-btn-width">
                  <FiUpload />
                  <span>
                    Insurance Copy
                  </span>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setInsurance(e.target.files[0])}
                  />
                </span>
              </Button>
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
                onChange={(event, value) => handleAutocompleteChange(event, value, "driverName")}
                // value={drivername.find((option) => option.optionvalue)?.label || selectedCustomerData?.driverName || ''}
                value={selectedCustomerData?.driverName || book.selectedCustomerData || ""}
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
              <div className='icone'>
                <CalendarMonthIcon />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Attached Date"
                  id="Attached_date"
                  className='full-width'
                  format="DD/MM/YYYY"
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
            <div className="input">
              <div className='icone'>
                <CalendarMonthIcon />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="National Permit Date"
                  className='full-width'
                  format="DD/MM/YYYY"
                  value={
                    selectedCustomerData?.npdate
                      ? dayjs(selectedCustomerData?.npdate)
                      : null || book.npdate
                        ? dayjs(book.npdate)
                        : null
                  }
                  onChange={(date) => handleDateChange(date, 'npdate')}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '14px', // Adjust the size as needed
                    },
                  }}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} name='npdate' value={selectedCustomerData?.npdate} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
            <div className="input-permit-no">
              <div className="icone">
                <DocumentScannerIcon color="action" />
              </div>
              <TextField
                // margin="normal"
                size="small"
                name="nationalpermito"
                className='full-width'
                value={selectedCustomerData?.nationalpermito || book.nationalpermito || ""}
                onChange={handleChange}
                label="National Permit No"
                id="nationalpermito"
              />
              <div className='national-permit-copy-tooltip'>
                <Button size="md" className='vehicle-info-upload-btn' component="label">
                  <span class=" vehicle-info-upload-btn-width">
                    <span className='upload-icon'>
                      <RiFileUploadLine />

                    </span>                  <input
                      id="National_permit"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setNationalPermit(e.target.files[0])
                        console.log('File selected:', e.target.files[0]);
                        handleUploadFile(e);
                      }}

                    />
                  </span>
                </Button>
                <span class="national-permit-copy-tooltiptext">Upload National Permit Copy</span>
              </div>
            </div>

            {/* <div className="input">
              <Button size="md" className='vehicle-info-upload-btn' component="label">
                <span class="button-29 vehicle-info-upload-btn-width">
                  <FiUpload />
                  <span>National Permit Copy</span>
                  <input
                    id="National_permit"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setNationalPermit(e.target.files[0])}
                  />
                </span>
              </Button>
            </div> */}
            <div className="input">
              <div className="icone">
                <SpeedIcon color="action" />
              </div>
              <TextField
                className='full-width'
                name="avgmileage"
                value={selectedCustomerData?.avgmileage || book.avgmileage || ""}
                onChange={handleChange}
                label="AVG Mileage"
                id="avgmileage"
                size="small"
              />
            </div>

            {/* <div className="input">

              <Button size="md" component="label" className='vehicle-info-upload-btn'>
                <span class="button-29 vehicle-info-upload-btn-width">
                  <FiUpload />
                  <span>
                    State Permit Copy
                  </span>
                  <input
                    type="file"
                    id=" State_Permit "
                    style={{ display: "none" }}
                    onChange={(e) => setStatePermit(e.target.files[0])}
                  />
                </span>
              </Button>
            </div> */}
            <div className="input">
              <div className="icone">
                <AccountBalanceWalletIcon color="action" />
              </div>
              <TextField
                name="financer"
                value={selectedCustomerData?.financer || book.financer || ""}
                onChange={handleChange}
                label="Financer"
                className='full-width'
                id="financer"
                size="small"
              />
            </div>
            <div className="input">
              <div className="icone">
                <ContactMailIcon color="action" />
              </div>
              <TextField
                size="small"
                id="Segment"
                className='full-width'
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
                // margin="normal"
                size="small"
                className='full-width'
                id="year_model"
                name="yearModel"
                value={selectedCustomerData?.yearModel || book.yearModel || ""}
                onChange={handleChange}
                label="Year Model"
              />
            </div>
            <div className="input-permit-no">
              <div className="icone">
                <HistoryEduIcon color="action" />
              </div>
              <TextField
                // margin="normal"
                size="small"
                className='full-width'
                name="rcbookno"
                value={selectedCustomerData?.rcbookno || book.rcbookno || ""}
                onChange={handleChange}
                label="RC Book No"
                id="rcbookno"
              />
              <div className='rc-book-copy-tooltip'>
                <Button size="md" component="label" className='vehicle-info-upload-btn'>
                  <span class=" vehicle-info-upload-btn-width">
                    <span className='upload-icon'>
                      <RiFileUploadLine />

                    </span>
                    <input
                      id="rc_book"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setRcbook(e.target.files[0])
                        console.log('File selected:', e.target.files[0]);
                        handleUploadFile(e);
                      }}

                    />
                  </span>
                </Button>
                <span class="rc-book-copy-tooltiptext">Upload RC-Book Copy</span>
              </div>
            </div>

            <div className="input-permit-no">
            <div className="icone">
                    <AirportShuttleIcon color="action" />
                  </div>
              <TextField
                // margin="normal"
                size="small"
                className='full-width'
                name="rcbookno"
                value={selectedCustomerData?.rcbookno || book.rcbookno || ""}
                onChange={handleChange}
                label="Chassis / Engine No"
                id="rcbookno"
              />
              <div className='rc-book-copy-tooltip'>
                <Button size="md" component="label" className='vehicle-info-upload-btn'>
                  <span class=" vehicle-info-upload-btn-width">
                    <span className='upload-icon'>
                      <RiFileUploadLine />

                    </span>
                    <input
                      id="rc_book"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setRcbook(e.target.files[0])
                        console.log('File selected:', e.target.files[0]);
                        handleUploadFile(e);
                      }}

                    />
                  </span>
                </Button>
                <span class="rc-book-copy-tooltiptext">Upload RC-Book Copy</span>
              </div>
            </div>
            <div className="input-permit-no">
              <div className='icone'>
                <CalendarMonthIcon />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="FC Date"
                  format="DD/MM/YYYY"
                  id="fc_date"
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
              <div className='fc-copy-tooltip'>
                <Button size="md" component="label" className='vehicle-info-upload-btn'>
                  <span class="vehicle-info-upload-btn-width">
                    <span className='upload-icon'>
                      <RiFileUploadLine />

                    </span>
                    <input
                      id="fc_copy"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setFcCopy(e.target.files[0])
                        console.log('File selected:', e.target.files[0]);
                        handleUploadFile(e);
                      }}
                    />
                  </span>
                </Button>
                <span class="fc-copy-tooltiptext">Upload FC Copy</span>
              </div>
            </div>
            {/* <div className="input">
              <Button size="md" component="label" className='vehicle-info-upload-btn'>
                <span class="button-29 vehicle-info-upload-btn-width">
                  <FiUpload />
                  <span>
                    RC-Book Copy
                  </span>
                  <input
                    id="rc_book"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setRcbook(e.target.files[0])}
                  />
                </span>
              </Button>
            </div> */}
            {/* <div className="input">
              <Button size="md" component="label" className='vehicle-info-upload-btn'>
                <span class="button-29 vehicle-info-upload-btn-width">
                  <FiUpload />
                  <span>
                    FC Copy
                  </span>
                  <input
                    id="fc_copy"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFcCopy(e.target.files[0])}
                  />
                </span>
              </Button>
            </div> */}
            <div className="input">
              <div className="icone">
                <ContactPhoneIcon color="action" />
              </div>
              <TextField
                // margin="normal"
                size="small"
                className='full-width'
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
                  id="active"
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
            <div className="input">
              {isEditMode ? (
                // <Button variant="contained" disabled={!Supllier_modify} onClick={handleEdit}>Edit</Button>
                <LoadingButton loading={isVButonLoading} variant="contained" disabled={!Supllier_modify} onClick={handleEdit}>Edit</LoadingButton>
              ) : (
                // <Button variant="contained" disabled={!Supllier_new} onClick={handleAdd} >Add</Button>
                <LoadingButton loading={isVButonLoading} variant="contained" disabled={!Supllier_new} onClick={handleAdd} >Add</LoadingButton>
              )}
            </div>
          </div>
        </div>
        <div className='alert-popup-main'>
          {error && <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
            <p>{errorMessage}</p>
          </div>}
          {error1 && <div className='alert-popup Error' >
            <div className="popup-icon"> <ClearIcon /> </div>
            <span className='cancel-btn' onClick={hidePopup1}><ClearIcon color='action' /> </span>
            <p>{errorMessage1}</p>
          </div>}
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
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{successMessage}</p>
            </div>
          }
          {success1 &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <ClearIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup1}><ClearIcon color='action' /> </span>
              <p>{successMessage1}</p>
            </div>
          }
        </div>
{deletevehciledata &&
        <DeleteConfirmationDialog
                open={deletevehciledata}
                onClose={() => setDeletevehciledata(false)}
                onConfirm={handleClick}
              />
}


        <Box className='common-speed-dail'>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {Supllier_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event,"List")}
              />
            )}
            {Supllier_modify === 1 && isEditMode && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event,"Edit")}
              />
            )}
            {Supllier_delete === 1 && isEditMode && (
              // <SpeedDialAction
              //   key="delete"
              //   icon={<DeleteIcon />}
              //   tooltipTitle="Delete"
              //   onClick={() => handleClick("Delete")}
              // />
              <SpeedDialAction
              key="delete"
              icon={<DeleteIcon />}
              tooltipTitle="Delete"
              // onClick={() => handleClick("Delete")}
              onClick={() => setDeletevehciledata(true)}
            />
            )}
            {/* {edit ? "" : (Supllier_new === 1 && (
              <SpeedDialAction
                key="Add"
                icon={<BookmarkAddedIcon />}
                tooltipTitle="Add"
                onClick={(event) => handleClick(event, "Add")}
              />
            ))} */}
            {Supllier_new === 1 && !isEditMode && (
              <SpeedDialAction
                key="Add"
                icon={<BookmarkAddedIcon />}
                tooltipTitle="Add"
                onClick={(event) => handleClick(event,"Add")}
              />
            )}
            <SpeedDialAction
              key="Cancel"
              icon={<CancelPresentationIcon />}
              tooltipTitle="Cancel"
              onClick={(event) => handleClick(event,"Cancel")}
            />
          </StyledSpeedDial>
        </Box>
        <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", marginTop: "20px", paddingBottom: "15px" }}>


          <div className="Download-btn-vehiecleinfo">
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

          <div className="detail-container-vehicle-info">
            <div className="container-left">
              <div className="">
                <div className="input-field vehicle-info-search-input-field">
                  <div className="input">
                    <div className="icone">
                      <AiOutlineFileSearch color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="searchText"
                      className='full-width'
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
                        id="fromDate"
                        className='full-width'
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
                        id="toDate"
                        className='full-width'
                        label="To Date"
                        format="DD/MM/YYYY"
                        name="toDate"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="input">
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="table-bookingCopy-Booking">
          <div className='vehicle-info-main-table'>
            {/* <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick1}
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
                  rows={rows}
                  columns={columns}
                  onRowClick={handleRowClick1}
                  pageSize={5}
                />
              )}
            </Box>

          </div>
          {/* edit Vehicle name modal */}
          <Modal
            open={editModal}
            onClose={handleEditmodalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <TextField
                  size="small"
                  id="searchText"
                  // className='full-width'
                  label="vehicle Name"
                  name="VechicleNames"
                  value={editData?.VechicleNames}
                  onChange={handleEditVehicleData}
                />
                <Button onClick={() => vehicleNameEditFun()}>Edit</Button>
              </div>
            </Box>
          </Modal>

          {/* Delete vehicle name modal */}

          <Modal open={deleteModal} onClose={handleDeletemodalClose} aria-labelledby="modal-title">
            <Box sx={style}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography id="modal-title" variant="h6">
                  Confirm Action
                </Typography>
                <IconButton onClick={handleDeletemodalClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Typography variant="body1" mb={3}>
                Are you sure you want to Delete?
              </Typography>

              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" color="primary" onClick={() => vehicleNameDeleteFun()}>
                  Yes
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteNot()}>
                  No
                </Button>
              </Box>
            </Box>
          </Modal>

          <Dialog open={dialogOpen} onClose={handleCloseDialog} >
            <DialogContent>
              <div className='vehicle-info-dailog-box-div1'>
                <Button variant='contained' className='vehicle-info-dailog-box-btn' onClick={handleSelectAll}>
                  {selectAll ? 'Deselect All' : 'Select All'}
                </Button>
                {Array.isArray(allFile) && allFile.map((img, index) => (
                  <div key={index} className='vehicle-info-dailog-box-btn-division'>
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
              <div className='vehicle-info-dailog-box-delete-print-division'>
                <Button disabled={!Supllier_delete} variant="contained" onClick={() => handleimagedelete(deletefile)}>Delete</Button>
                <Button variant='contained' onClick={() => handleDocumentDownload()}>Print</Button>
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
      </form>
    </div>
  );
};

export default Vehicaleinfo;