import React, { useEffect, useContext } from 'react';
import "./StationCreation.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from "@mui/icons-material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { faBuildingFlag } from "@fortawesome/free-solid-svg-icons";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import useStationCreation from './useStationCreation';
import { PermissionContext } from '../../context/permissionContext';

import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { MdNumbers } from "react-icons/md";



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

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "stationid", headerName: "Station_Id", width: 130 },
  { field: "gstno", headerName: "GST No", width: 130 },
  { field: "Stationname", headerName: "Station_Name", width: 140 },
  { field: "active", headerName: "Active", width: 80 },
  { field: "shortname", headerName: "Station", width: 130 },
  { field: "ownbranch", headerName: "Own_Branch", width: 130 },
  { field: "address", headerName: "address", width: 130 },

];
// TABLE END

const StationCreation = () => {
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
    isEditMode,
    handleEdit,
  } = useStationCreation();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  // Permission ------------
  const { permissions } = useContext(PermissionContext)

  const StationCreation_read = permissions[16]?.read;
  const StationCreation_new = permissions[16]?.new;
  const StationCreation_modify = permissions[16]?.modify;
  const StationCreation_delete = permissions[16]?.delete;

  return (
    <div className="stationcreation-main">
      <div className="stationcreation-form-container">
        <form action="">
          <p className="station-creation-heading">
            <span className="Title-Name ">Station Creation</span>

          </p>
          <div className="stationcreation-header">
            <div className="input-field station-creation-inputfeilds" style={{ padding: '10px' }}>
              <div className="input input-station-creaton" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <BadgeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="stationid"
                  label="ID"
                  name="stationid"
                  value={selectedCustomerData?.stationid || book.stationid}
                  autoComplete="new-password"
                  onChange={handleChange}
                  variant="standard"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input input-station-creaton" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="Station-name"
                  label="Station Name"
                  sx={{ m: 1, width: "200ch" }}
                  name="Stationname"
                  value={selectedCustomerData?.Stationname || book.Stationname}
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </div>
              <div className="input input-station-creaton" style={{ paddingRight: '15px' }}>
                <div className="icone">
                  <ListAltIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="short-name"
                  label="Short Name"
                  sx={{ m: 1, width: "200ch" }}
                  name="shortname"
                  value={selectedCustomerData?.shortname || book.shortname}
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </div>
              <div className='input' style={{ paddingRight: '15px' }}>
                <div className='icone'>
                  <AddHomeWorkIcon color='action' />
                </div>
                <TextField
                  size="small"
                  name="remark"
                  className='address-field'
                  value={selectedCustomerData?.address || book.address}
                  onChange={handleChange}
                  label="Address"
                  id="remark"
                  multiline
                  rows={4}
                  autoComplete="password"
                />
              </div>

              <div className='input' style={{ paddingRight: '15px' }}>
                <div className='icone'>
                  <MdNumbers color='action' />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  id="gstno"
                  label="GST No"
                  name="gstno"
                  value={selectedCustomerData?.gstno || book.gstno}
                  autoComplete="new-password"
                  onChange={handleChange}
                  variant="standard"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="input radio input-station-creaton">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Active
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="active"
                    id="radio1"
                    value={selectedCustomerData?.active || book.active}
                    autoComplete="new-password"
                    onChange={handleChange}
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
              <div className="input radio input-station-creaton">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Own Branch
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="ownbranch"
                    id="ownbranch"
                    value={selectedCustomerData?.ownbranch || book.ownbranch}
                    autoComplete="new-password"
                    onChange={handleChange}
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
              <div className="input input-station-creaton" style={{ width: "160px" }}>
                {isEditMode ? (
                  <Button variant="contained" disabled={!StationCreation_modify} onClick={handleEdit}>Edit</Button>
                ) : (
                  <Button variant="contained" disabled={!StationCreation_new} onClick={handleAdd} >Add</Button>
                )}
              </div>
            </div>
          </div>
          <div className='alert-popup-main'>
            {error &&
              <div className='alert-popup Error' >
                <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{errorMessage}</p>
              </div>
            }
            {warning &&
              <div className='alert-popup Warning' >
                <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{warningMessage}</p>
              </div>
            }
            {success &&
              <div className='alert-popup Success' >
                <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{successMessage}</p>
              </div>
            }
            {info &&
              <div className='alert-popup Info' >
                <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{infoMessage}</p>
              </div>
            }
          </div>
          <Box sx={{ position: "relative", mt: 3, height: 320 }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<SpeedDialIcon />}
              direction="left"
            >

              {StationCreation_read === 1 && (
                <SpeedDialAction
                  key="list"
                  icon={<ChecklistIcon />}
                  tooltipTitle="List"
                  onClick={(event) => handleClick(event, "List", selectedCustomerId)}
                />
              )}
              {StationCreation_modify === 1 && (
                <SpeedDialAction
                  key="edit"
                  icon={<ModeEditIcon />}
                  tooltipTitle="Edit"
                  onClick={(event) => handleClick(event, "Edit", selectedCustomerId)}
                />
              )}
              {StationCreation_delete === 1 && (
                <SpeedDialAction
                  key="delete"
                  icon={<DeleteIcon />}
                  tooltipTitle="Delete"
                  onClick={(event) => handleClick(event, "Delete", selectedCustomerId)}
                />
              )}
              {StationCreation_new === 1 && (
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
          <div className="stationcreation-table-container">
            <div className="table-stationcreation">
              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationCreation;
