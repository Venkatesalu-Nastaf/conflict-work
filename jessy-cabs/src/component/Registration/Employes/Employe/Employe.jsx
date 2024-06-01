import React, { useEffect, useContext } from "react";
import "./Employe.css";
import "jspdf-autotable";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { TextField } from "@mui/material";
import { AiOutlineFileSearch } from "react-icons/ai";
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
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
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

const Employe = () => {
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
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    book,
    handleClick,
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleDateChange,
    handleExcelDownload,
    handlePdfDownload,
    columns,
    searchText,
    setSearchText,
    handleShowAll,
    allFile,
    handleCloseDialog,
    dialogOpen,
    setFile,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    setError,
    setErrorMessage,
  } = useEmployee();

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  }, [actionName, handleClick]);

  // permissions
  const { permissions } = useContext(PermissionContext)
  const Employee_read = permissions[11]?.read;
  const Employee_new = permissions[11]?.new;
  const Employee_modify = permissions[11]?.modify;
  const Employee_delete = permissions[11]?.delete;

  return (
    <div className="Employe-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="detail-container-main-Employe">
          <div className="container-Employe">
            <div className="input-field employee-input-feilds">
              <div className="input">
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="empid"
                  className="full-width"
                  label="Employe ID"
                  name="empid"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empid || book.empid}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PermIdentityIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="empname"
                  className="full-width"
                  label="Name"
                  name="empname"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empname || book.empname}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <EmailIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="empemailid"
                  className="full-width"
                  label="Email Id"
                  name="empemailid"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empemailid || book.empemailid}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <PhoneIphoneIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="empmobile"
                  className="full-width"
                  label="Mobile"
                  name="empmobile"
                  autoComplete="new-password"
                  value={selectedCustomerData?.empmobile || book.empmobile}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <WorkOutlineRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="jobroll"
                  className="full-width"
                  label="Job Roll"
                  name="jobroll"
                  autoComplete="new-password"
                  value={selectedCustomerData?.jobroll || book.jobroll}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <DatePicker
                    id="Joining_Date"
                    label="Joining Date"
                    format="DD/MM/YYYY"
                    value={
                      formData.joiningdate || selectedCustomerData.joiningdate
                        ? dayjs(selectedCustomerData.joiningdate)
                        : null
                    }
                    onChange={(date) => handleDateChange(date, "joiningdate")}
                  >
                    {({ inputProps, inputRef }) => (
                      <TextField
                        {...inputProps}
                        inputRef={inputRef}
                        value={selectedCustomerData?.joiningdate}
                      />
                    )}
                  </DatePicker>
                </LocalizationProvider>
              </div>
              <div className="input">
                <div className="icone">
                  <TransgenderRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="gender"
                  className="full-width"
                  label="Gender"
                  name="gender"
                  autoComplete="new-password"
                  value={selectedCustomerData?.gender || book.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <BloodtypeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="bloodgroup"
                  className="full-width"
                  label="Blood Group"
                  name="bloodgroup"
                  autoComplete="new-password"
                  value={selectedCustomerData?.bloodgroup || book.bloodgroup}
                  onChange={handleChange}
                />
              </div>
              <div className="input input-address">
                <div className="icone">
                  <AddHomeWorkIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  id="address1"
                  className="full-width"
                  label="Address"
                  name="address1"
                  multiline
                  rows={2}
                  sx={{ width: "100%" }}
                  autoComplete="new-password"
                  value={selectedCustomerData?.address1 || book.address1}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <ContactMailIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="aadharcard"
                  className="full-width"
                  label="Aadhar Card"
                  name="aadharcard"
                  autoComplete="new-password"
                  value={selectedCustomerData?.aadharcard || book.aadharcard}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <FactCheckIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="pancard"
                  className="full-width"
                  label="Pan Card"
                  name="pancard"
                  autoComplete="new-password"
                  value={selectedCustomerData?.pancard || book.pancard}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <EscalatorWarningIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="guardian"
                  className="full-width"
                  label="Guardian"
                  name="guardian"
                  autoComplete="new-password"
                  value={selectedCustomerData?.guardian || book.guardian}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <CurrencyRupeeIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="fixedsalary"
                  className="full-width"
                  label="Fixed Salary"
                  name="fixedsalary"
                  autoComplete="new-password"
                  value={selectedCustomerData?.fixedsalary || book.fixedsalary}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <DeviceHubRoundedIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="uanid"
                  className="full-width"
                  label="UAN Id"
                  name="uanid"
                  autoComplete="new-password"
                  value={selectedCustomerData?.uanid || book.uanid}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <div className="icone">
                  <MedicalInformationIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="esino"
                  className="full-width"
                  label="ESI No"
                  name="esino"
                  autoComplete="new-password"
                  value={selectedCustomerData?.esino || book.esino}
                  onChange={handleChange}
                />
              </div>
              <div className="employee-licence-no-input-division">
                <div className="icone">
                  <DirectionsCarIcon color="action" />
                </div>
                <TextField
                  size="small"
                  id="licenceno"
                  label="Driving Licence No"
                  name="licenceno"
                  autoComplete="new-password"
                  value={selectedCustomerData?.licenceno || book.licenceno}
                  onChange={handleChange}
                />

                <div className="employee-file-upload-division">
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
                    <Button color="primary" variant="contained" onClick={() => {
                      setError(true);
                      setErrorMessage("Please Enter Booking No");
                    }}>
                      <UploadFileIcon />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="input-field">
              <div className="input">
                {isEditMode ? (
                  <Button variant="contained" disabled={!Employee_new} onClick={handleEdit}>Edit</Button>
                ) : (
                  <Button variant="contained" disabled={!Employee_modify} onClick={handleAdd} >Add</Button>
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
        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
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
                onClick={(event) => handleClick(event, "List", selectedCustomerId)}
              />
            )}
            {Employee_modify === 1 && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
              />
            )}
            {Employee_delete === 1 && (
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
              />
            )}
            {Employee_new === 1 && (
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
            <div className="input">
              <Button variant="contained" onClick={handleShowAll}>Search</Button>
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
        <div className="table-bookingCopy-Employe ">
          <div className="registration-employee-table">
            <DataGrid
              className="Scroll-Style"
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
            />
          </div>
          <Dialog open={dialogOpen} onClose={handleCloseDialog} >
            <DialogContent>
              <div className="employee-dialogbox-div1">
                {Array.isArray(allFile) && allFile.map((img, index) => (
                  <div key={index} className="employee-dialogbox-div2">

                    <embed src={`${apiUrl}/public/employee_doc/` + img.fileName} type="application/pdf" width="100%" height="600px" />
                    <button onClick={() => handleimagedelete(img.fileName)} className="employee-dialogbox-btn" />
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
      </form>
    </div>
  );
};

export default Employe;
