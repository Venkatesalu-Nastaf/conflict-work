import React, { useContext, useEffect } from 'react';
import "./PackageRateEntery.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import Autocomplete from "@mui/material/Autocomplete";
import { RateType, PriceTag, Duty } from "./PackageRateEnteryData.js";
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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import usePackagerateentry from './usePackagerateentry.js';
import dayjs from 'dayjs';
import { MdCancelPresentation } from "react-icons/md";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteConfirmationDialog from '../../../DeleteData/DeleteData.jsx';
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

const PackageRateEntery = ({ vehileName, stationname }) => {

  // console.log(vehileName,"N")
  const {
    rows,
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
    handleAutocompleteMultipleChange,
    columns,
    isEditMode,
    handleEdit,
    handleChange11,
    // datevalidity,
    handleShow,
    fieldSets, commonData, handleCancelUI, handleAddExtra, ratename, validitydata, loading, setLoading, isbtnloading, setisbtnloading,
    multipleSelect,setSelectedRowDelete,selectedrowdelete,deletepackaagerate,setDeletePackagerate

  } = usePackagerateentry();


  const startdate = dayjs(validitydata[0]?.starttime).format(" MMMM YYYY");
  const enddate = dayjs(validitydata[0]?.closetime).format(" MMMM YYYY");
  const { permissions } = useContext(PermissionContext)
  const RateManagement_read = permissions[10]?.read;
  const RateManagement_new = permissions[10]?.new;
  const RateManagement_modify = permissions[10]?.modify;
  const RateManagement_delete = permissions[10]?.delete;

  //--------------------------------------------------------------------
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div className="PackageRateEntery-form main-content-form Scroll-Style-hide">
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
                    options={ratename.map((option) => ({ label: option }))}
                    getOptionLabel={(option) => option.label || commonData?.OrganizationName || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Rate Name" name="OrganizationName" inputRef={params.inputRef} />
                      )
                    }
                    }
                  />
                </div>

                <div className="input PackageRateEntery-input">
                  <div className="icone">
                    <CarCrashIcon color="action" />
                  </div>
                  {/* <Autocomplete
                    fullWidth
                    size="small"
                    id="free-solo-demo-vehicleType"
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "vehicleName")}
                    value={vehileName?.find((option) => option.optionvalue)?.label || commonData?.vehicleName || ''}
                    options={vehileName?.map((option) => ({
                      label: option,
                    }))}
                    getOptionLabel={(option) => option.label || commonData?.vehicleName || ''}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Vehicle Type" name="vehicleName" inputRef={params.inputRef} />
                      )
                    }
                    }
                  /> */}
                  <Autocomplete
                    fullWidth
                    // multiple={!multipleSelect}
                    multiple
                    id="free-solo-demo-vehicleType"
                    freeSolo
                    size="small"
                    sx={{ width: "100%" }}
                    options={vehileName?.map((option) => ({
                      label: option,
                    })) || []}
                    disableCloseOnSelect
                    value={Array.isArray(commonData?.vehicleName) ? commonData?.vehicleName.map(label => ({ label })) : []}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    onChange={(event, value) => handleAutocompleteMultipleChange(event, value, "vehicleName")}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Vehicle Type" name="vehicleName" inputRef={params.inputRef} />
                    )}
                  />

                </div>
                <div className="input">
                  <div className="icone">
                    <WarehouseIcon color="action" />
                  </div>
                  {/* <Autocomplete
                    fullWidth
                    size="small"
                    id="stations"
                    freeSolo
                    onChange={(event, value) => handleAutocompleteChange(event, value, "stations")}
                    value={stationname.find((option) => option.Option)?.label || commonData?.stations || ''}
                    options={stationname.map((option) => ({
                      label: option.Stationname,
                    }))}
                    getOptionLabel={(option) => option.label || commonData?.stations || ''}
                    renderInput={(params) => {
                      return (
                        <TextField   {...params} label="Stations" name="stations" inputRef={params.inputRef} />
                      )
                    }
                    }
                  /> */}
                  <Autocomplete
                    fullWidth
                    multiple
                    id="stations"
                    freeSolo
                    size="small"
                    // value={commonData?.stations?.map(label => ({ label })) || []} // Convert stored array back to objects
                    value={Array.isArray(commonData?.stations) ? commonData.stations.map(label => ({ label })) : []}
                    options={stationname.map(option => ({
                      label: option.Stationname,
                    }))}
                    disableCloseOnSelect
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    onChange={(event, value) => handleAutocompleteMultipleChange(event, value, "stations")}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Stations" inputRef={params.inputRef} />
                    )}
                  />


                </div>
                <div className=" PackageRateEntery-input">
                  <div className="icone">
                    <RateReviewIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Validity"
                    sx={{
                      minWidth: { xs: 200, sm: 350 }, // Responsive minWidth

                    }}
                    label="Validity"
                    name="Validity"
                    autoComplete="new-password"
                    value={validitydata?.length > 0 ? ` ${startdate} To${enddate} ` : ""}
                    // onChange={handleChange}
                    variant="standard"
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Button variant="contained" onClick={handleShow} >Show</Button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* //-----------------------------------------addpackage------------------------------- */}

        <div className='PackageRateEntery-container-bottom add-details'>

          {!isEditMode && <div className='add-packages-btn'><Button variant="contained" disabled={!RateManagement_new} onClick={handleAddExtra} >Add Packages</Button></div>}

          {fieldSets.map((fieldSet, index) => (
            <div key={index} className="input-field feild-inputs">
              <div>
                <div className='first'>
                  <div className="input">
                    <Autocomplete
                      fullWidth
                      size="small"
                      id="free-solo-demo-duty"
                      freeSolo
                      sx={{ width: "100%" }}
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
                    {console.log(fieldSet?.duty === "Local" ? true : false, "Local", fieldSet?.duty)}
                  </div>
                  <div className="input">
                    <TextField
                      size="small"
                      id="Package"
                      className='full-width'
                      sx={{ width: "300px" }}
                      label="Package"
                      name="package"
                      autoComplete="new-password"
                      disabled={fieldSet?.duty === "Local" ? true : false}
                      value={fieldSet.package || ""}
                      onChange={(e) => handleChange(e, index)}
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
                      // onChange={(e) => handleChange(e, index)}
                      onChange={(e) => {
                        if (fieldSet?.duty === "Local") {

                          handleChange11(e, index)
                          // handleChange(e, index)
                        }
                        else {
                          handleChange(e, index)
                        }
                      }
                      }
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
                      // onChange={(e) => handleChange(e, index)}
                      onChange={(e) => {
                        if (fieldSet?.duty === "Local") {


                          handleChange11(e, index)
                        }
                        else {
                          handleChange(e, index)
                        }
                      }
                      }
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
                      id="extraHours"
                      className='full-width'
                      label="Extra Hours"
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
                      label="Extra KMS"
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
                      id="UptoHours"
                      className='full-width'
                      label="Upto Hours  "
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
                      label="Upto KMS"
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
                  <div className="input package-rate-entry-edit-division" style={{ justifyContent: 'start' }}>
                    {isEditMode ? (
                      // <Button variant="contained" disabled={!RateManagement_modify} onClick={handleEdit}>Edit</Button>
                      <LoadingButton loading={isbtnloading} variant="contained" disabled={!RateManagement_modify} onClick={handleEdit}>Edit</LoadingButton>
                    ) : (
                      // <Button variant="contained" disabled={!RateManagement_new} onClick={handleAdd} >Save</Button>
                      <LoadingButton loading={isbtnloading} variant="contained" disabled={!RateManagement_new} onClick={handleAdd} >Save</LoadingButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
{deletepackaagerate && 
        <DeleteConfirmationDialog
                                open={deletepackaagerate}
                                onClose={() => setDeletePackagerate(false)}
                                onConfirm={handleClick}
                              />
}
        <Box className='common-speed-dail'>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >

            {RateManagement_read === 1 && (
              <SpeedDialAction
                key="list"
                icon={<ChecklistIcon />}
                tooltipTitle="List"
                onClick={(event) => handleClick(event, "List")}
              />
            )}
            {RateManagement_modify === 1 && isEditMode && (
              <SpeedDialAction
                key="edit"
                icon={<ModeEditIcon />}
                tooltipTitle="Edit"
                onClick={(event) => handleClick(event, "Edit")}
              />
            )}
            {(RateManagement_delete === 1 && selectedrowdelete.length > 0) && (
              // <SpeedDialAction
              //   key="delete"
              //   icon={<DeleteIcon />}
              //   tooltipTitle="Delete"
              //   onClick={(event) => handleClick(event, "Delete")}
              // />
              <SpeedDialAction
              key="delete"
              icon={<DeleteIcon />}
              tooltipTitle="Delete"
              onClick={() => setDeletePackagerate(true)}
            />
            )}
            <SpeedDialAction
              key="Cancel"
              icon={<CancelPresentationIcon />}
              tooltipTitle="Cancel"
              onClick={(event) => handleClick(event, "Cancel")}
            />
            {RateManagement_new === 1 && !isEditMode && (
              <SpeedDialAction
                key="Add"
                icon={<BookmarkAddedIcon />}
                tooltipTitle="Add"
                onClick={(event) => handleClick(event, "Add")}
              />
            )}
          </StyledSpeedDial>
        </Box>
        <div className="table-bookingCopy-PackageRateEntery">
          <div className='package-rate-entry-table'>

            <Box
              sx={{
                height: 400,
                position: 'relative',
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
                  onRowClick={handleRowClick}
                  pageSize={5}
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                console.log(newRowSelectionModel,"model")
                setSelectedRowDelete(newRowSelectionModel)
                

                  }}
                  checkboxSelection
                />
              )}
            </Box>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PackageRateEntery