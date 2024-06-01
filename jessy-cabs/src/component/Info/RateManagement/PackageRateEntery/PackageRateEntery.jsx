import React, { useEffect, useContext } from 'react';
import "./PackageRateEntery.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { RateType, PriceTag, VehicleType, Duty } from "./PackageRateEnteryData.js";
import { PermissionContext } from '../../../context/permissionContext.js';

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import usePackagerateentry from './usePackagerateentry.js';
import dayjs from 'dayjs';
import { MdCancelPresentation } from "react-icons/md";

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

const PackageRateEntery = ({ organizationNames }) => {

  const {
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
    handleClick,
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    handleAutocompleteChange,
    columns,
    isEditMode,
    handleEdit,
    datevalidity,
    fieldSets, commonData, handleCancelUI, handleAddExtra,

  } = usePackagerateentry();

  const organizationName = organizationNames;

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const startdate = dayjs(datevalidity?.startdate).format(" MMMM YYYY");
  const enddate = dayjs(datevalidity?.enddate).format(" MMMM YYYY");
  const { permissions } = useContext(PermissionContext)
  const RateManagement_read = permissions[17]?.read;
  const RateManagement_new = permissions[17]?.new;
  const RateManagement_modify = permissions[17]?.modify;
  const RateManagement_delete = permissions[17]?.delete;

  //--------------------------------------------------------------------

  return (
    <div className="PackageRateEntery-form Scroll-Style-hide">
      <form action="">
        <div className="PackageRateEntery-container-main">
          <div className="container-left">
            <div className="copy-title-btn-PackageRateEntery">
              <div className="input-field PackageRateEntery-input-feild">
                <div className="input PackageRateEntery-input">
                  <div className="icone">
                    <TypeSpecimenOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-ratetype"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "ratetype")}
                    value={RateType?.find((option) => option.optionvalue)?.label || commonData?.ratetype || ''}
                    options={RateType?.map((option) => ({
                      label: option.Option,
                    }))}
                    getOptionLabel={(option) => option.label || commonData?.ratetype || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="RateType" name="ratetype" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input PackageRateEntery-input">
                  <div className="icone">
                    <LocalOfferOutlinedIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="OrganizationName"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "OrganizationName")}
                    value={PriceTag.find((option) => option.optionvalue)?.label || commonData?.OrganizationName || ''}
                    options={organizationName.map((option) => ({ label: option }))} // Use organizationName here
                    getOptionLabel={(option) => option.label || commonData?.OrganizationName || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Organization Name" name="OrganizationName" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input PackageRateEntery-input">
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-vehicleType"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleType")}
                    value={VehicleType.find((option) => option.optionvalue)?.label || commonData?.vehicleType || ''}
                    options={VehicleType.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || commonData?.vehicleType || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="VehicleType" name="vehicleType" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
                <div className="input PackageRateEntery-input">
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Validity"
                    sx={{ width: "300px" }}
                    label="Validity"
                    name="Validity"
                    autoComplete="new-password"
                    value={`datevalidity ? ${startdate}--${enddate} : ''`}
                    onChange={handleChange}
                    variant="standard"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //-----------------------------------------addpackage------------------------------- */}

        <div className='PackageRateEntery-container-bottom add-details'>

          {!isEditMode && <Button variant="contained" onClick={handleAddExtra} >Add Packages</Button>}

          {fieldSets.map((fieldSet, index) => (
            <div key={index} className="input-field feild-inputs">
              <div>
                <div className="input">
                  <div className="icone">
                    <EngineeringIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-duty"
                    freeSolo
                    sx={{ width: "20ch" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "duty", index)}
                    value={Duty.find((option) => option.optionvalue)?.label || fieldSet?.duty || ''}
                    options={Duty.map((option) => ({
                      label: option.option,
                    }))}
                    getOptionLabel={(option) => option.label || fieldSet?.duty || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Duty" name="duty" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>
              </div>
              <div>
                <div className='first'>
                  <div className="input">
                    <TextField
                      size="small"
                      id="Package"
                      className='full-width'
                      sx={{ width: "300px" }}
                      label="Package"
                      name="package"
                      autoComplete="new-password"
                      value={fieldSet.package || ""}
                      onChange={(e) => handleChange(e, index)}
                      variant="standard"
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="Hours"
                      className='full-width'
                      label="Hours"
                      name="Hours"
                      autoComplete="new-password"
                      value={fieldSet.Hours || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="kms"
                      className='full-width'
                      label="KMS"
                      name="KMS"
                      autoComplete="new-password"
                      value={fieldSet.KMS || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="Rate"
                      className='full-width'
                      label="Rate"
                      name="Rate"
                      autoComplete="new-password"
                      value={fieldSet.Rate || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="UptoHours"
                      className='full-width'
                      label="UptoHours  "
                      name="UptoHours"
                      autoComplete="new-password"
                      value={fieldSet.UptoHours || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="UptoKMS"
                      className='full-width'
                      label="UptoKMS"
                      name="UptoKMS"
                      autoComplete="new-password"
                      value={fieldSet.UptoKMS || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="extraHours"
                      className='full-width'
                      label="ExtraHours"
                      name="extraHours"
                      autoComplete="new-password"
                      value={fieldSet.extraHours || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="extraKMS"
                      className='full-width'
                      label="ExtraKMS"
                      name="extraKMS"
                      autoComplete="new-password"
                      value={fieldSet.extraKMS || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="AKMS"
                      className='full-width'
                      label="A.KMS"
                      name="AKMS"
                      autoComplete="new-password"
                      value={fieldSet.AKMS || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="NHalt"
                      className='full-width'
                      label="N.Halt"
                      name="NHalt"
                      autoComplete="new-password"
                      value={fieldSet.NHalt || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="input">
                    <TextField
                      type='number'
                      size="small"
                      id="Bata"
                      className='full-width'
                      label="Bata"
                      name="Bata"
                      autoComplete="new-password"
                      value={fieldSet.Bata || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  {index > 0 && <div onClick={() => handleCancelUI(index)} className='cancel-icon'>
                    <MdCancelPresentation className='icon-cancel' />
                  </div>}
                </div>
              </div>
            </div>
          ))}

          <div className="input package-rate-entry-edit-division">
            {isEditMode ? (
              <Button variant="contained" disabled={!RateManagement_modify} onClick={handleEdit}>Edit</Button>
            ) : (
              <Button variant="contained" disabled={!RateManagement_new} onClick={handleAdd} >Save</Button>
            )}
          </div>
        </div>

        <div className='alert-popup-main'>
          {error &&
            <div className='alert-popup Error' >
              <div className="popup-icon"> <ClearIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{errorMessage}</p>
            </div>
          }
          {warning &&
            <div className='alert-popup Warning' >
              <div className="popup-icon"> <ErrorOutlineIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{warningMessage}</p>
            </div>
          }
          {success &&
            <div className='alert-popup Success' >
              <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
              <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
              <p>{successMessage}</p>
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
        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
          >

            {RateManagement_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event, "List", selectedCustomerId)}
              />
            )}
            {RateManagement_modify === 1 && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
              />
            )}
            {RateManagement_delete === 1 && (
              <SpeedDialAction
                key="delete"
                icon={<DeleteIcon />}
                tooltipTitle="Delete"
                onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
              />
            )}
            <SpeedDialAction
              key="Cancel"
              icon={<CancelPresentationIcon />}
              tooltipTitle="Cancel"
              onClick={(event) => handleClick(event, "Cancel", selectedCustomerId)}
            />
            {RateManagement_new === 1 && (
              <SpeedDialAction
                key="Add"
                icon={<BookmarkAddedIcon />}
                tooltipTitle="Add"
                onClick={(event) => handleClick(event, "Add", selectedCustomerId)}
              />
            )}
          </StyledSpeedDial>
        </Box>
        <div className="table-bookingCopy-PackageRateEntery">
          <div className='package-rate-entry-table'>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PackageRateEntery