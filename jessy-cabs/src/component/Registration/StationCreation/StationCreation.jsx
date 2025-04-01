import React, { useEffect, useContext } from 'react';
import "./StationCreation.css";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Autocomplete, TextField, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { UnderGroup, states, Customertype, Select, stateToStations, allStations } from "../Customer/Customerdata";
import { CircularProgress } from '@mui/material';
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


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 50 },
  { field: "stationid", headerName: "Station_Id", width: 80 },
  { field: "gstno", headerName: "GST No", width: 130 },
  { field: "Stationname", headerName: "Station_Name", width: 120 },
  { field: "state", headerName: "State", width: 120 },
  { field: "active", headerName: "Active", width: 60 },
  // { field: "shortname", headerName: "Station", width: 100 },
  { field: "ownbranch", headerName: "Own Branch", width: 100 },
  { field: "address", headerName: "address", width: 300 },

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
    handleEdit, cerendentialdata,
    handleChangeuniquestation,
    getMainBrachDetails,
    loading,
    setLoading,
    getStateFromStation,
    handleStationChange, selectedStation, setSelectedStation, selectedState, setSelectedState, handleStateChange, isDisabled, setisDisabled,
    handleStationAddData, stationDatas,open,setOpen,handleSubmiStation,handlestationOnChange
  } = useStationCreation();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Permission ------------
  const { permissions } = useContext(PermissionContext)

  const StationCreation_read = permissions[16]?.read;
  const StationCreation_new = permissions[16]?.new;
  const StationCreation_modify = permissions[16]?.modify;
  const StationCreation_delete = permissions[16]?.delete;

  return (
    <div className="stationcreation-main">
      <div className="main-content-container">
        <form action="">
          <p className="station-creation-heading head-tab-type-2-all">
            <span className="Title-Name ">Station Creation</span>
          </p>
          <div className='main-content-form'>
            <div className="stationcreation-header-top">
              <div className="input-field station-creation-inputfeilds" style={{ padding: '10px' }}>
                <div className="input input-station-creaton" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>

                  <TextField
                    // margin="normal"
                    size="small"
                    // id="stationid"
                    label="Station ID"
                    name="stationid"
                    value={selectedCustomerData?.stationid || ""}
                    // autoComplete="new-password"
                    // onChange={handleChange}
                    // variant="standard"
                    style={{ width: '100%' }}
                  // disabled={true}
                  />

                </div>

                <div className="input">
                  <div className='full-width' style={{ display: 'grid' }}>
                    <span className='full-width' style={{ display: 'flex' }}>
                      <div className="icone">
                        <FontAwesomeIcon icon={faBuildingFlag} size="lg" />
                      </div>
                      {/* <Autocomplete
  fullWidth
  size="small"
  id="state-autocomplete"
  freeSolo
  value={selectedCustomerData?.Stationname || book.Stationname || ""}
  options={(allStations || []).map((option) => ({
    label: option, // Ensure `option` is a string, or modify if it's an object
  }))}
  filterOptions={(options, state) => {
    const inputValue = state.inputValue.trim().toLowerCase();
    if (!inputValue) {
      return []; // Show no options when input is empty
    }

    return options.filter(option => 
      option.label && option.label.toLowerCase().includes(inputValue)
    );
  }}
  onChange={(event, value) => handleChange({
    target: { name: "Stationname", value: value ? value.label : "" },
  })}
  renderInput={(params) => (
    <TextField
      {...params}
      margin="normal"
      size="small"
      id="Station-name"
      label="Station Name"
      name="Stationname"
      className="full-width"
      autoComplete="new-password"
    />
  )}
/> */}


                      {/* <Autocomplete
        fullWidth
        size="small"
        id="station-autocomplete"
        freeSolo
        value={selectedStation || selectedCustomerData?.Stationname || book.Stationname || ""}
        options={(allStations || []).map((option) => ({
          label: option,
        }))}
        filterOptions={(options, state) => {
          const inputValue = state.inputValue.trim().toLowerCase();
          return options.filter(option =>
            option.label && option.label.toLowerCase().includes(inputValue)
          );
        }}
        onChange={handleStationChange}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="normal"
            size="small"
            label="Station Name"
            name="Stationname"
            className="full-width"
            autoComplete="new-password"
          />
        )}
      /> */}
                       <Autocomplete
                        fullWidth
                        size="small"
                        id="station-autocomplete"
                        freeSolo
                        value={selectedStation || selectedCustomerData?.Stationname || book.Stationname || ""}
                        options={(allStations || []).map((option) => ({
                          label: option,
                        }))}
                        // filterOptions={(options, state) => {
                        //   const inputValue = state.inputValue.trim().toLowerCase();
                        //   return options.filter(option =>
                        //     option.label && option.label.toLowerCase().includes(inputValue)
                        //   );

                        // }}
                        filterOptions={(options, state) => {
                          const inputValue = state.inputValue.trim().toLowerCase();

                          // Show suggestions that start with the input or match exactly
                          return options.filter(option => 
                            option.label.toLowerCase().startsWith(inputValue) || 
                            option.label.toLowerCase() === inputValue
                          );
                          
                        }}
                        
                        
                        onChange={handleStationChange} 
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            size="small"
                            label="Station Name"
                            name="Stationname"
                            className="full-width"
                            autoComplete="new-password"
                          />
                        )}
                      />


                      {/* <Autocomplete
                        fullWidth
                        size="small"
                        id="station-autocomplete"
                        freeSolo
                        value={selectedStation || selectedCustomerData?.Stationname || book.Stationname || ""}
                        options={(allStations || []).map((option) => ({
                          label: option,
                        }))}
                        // filterOptions={(options, state) => {
                        //   const inputValue = state.inputValue.trim().toLowerCase();
                        //   return options.filter(option =>
                        //     option.label && option.label.toLowerCase().includes(inputValue)
                        //   );

                        // }}
                        filterOptions={(options, state) => {
                          const inputValue = state.inputValue.trim().toLowerCase();

                          // Filter based on input value - case-insensitive
                          return options.filter(option => {
                            const label = option.label.toLowerCase();

                            // Match either the full label or a partial match at the start
                            return label.includes(inputValue); // Allow partial matching
                          });
                        }}
                        onChange={handleStationChange}  // Ensure `handleStationChange` is properly updating state
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            size="small"
                            label="Station Name"
                            name="Stationname"
                            className="full-width"
                            autoComplete="new-password"
                          />
                        )}
                      />
 */}






                      {/* <TextField
                        margin="normal"
                        size="small"
                        id="Station-name"
                        label="Station Name"
                        name="Stationname"
                        className='full-width'
                        value={selectedCustomerData?.Stationname || book.Stationname}
                        autoComplete="new-password"
                        // onChange={handleChange}
                        onChange={handleChangeuniquestation}

                      /> */}
                    </span>
                    <span style={{ textAlign: 'center' }}>
                      <span style={{ color: "red" }}>{cerendentialdata ? `StationName Already Exist` : ""}</span>
                    </span>
                  </div>
                </div>


                {/* <div className="input input-station-creaton" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="short-name"
                    label="State Name"
                    sx={{ m: 1, width: "200ch" }}
                    name="shortname"
                    value={selectedCustomerData?.shortname || book.shortname}
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </div> */}
                {/* <div className="input input-station-creation" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>
                  <Autocomplete
                    fullWidth
                    size="small"
                    id="state-autocomplete"
                    freeSolo
                    value={selectedCustomerData?.state || book.state}
                    options={states.map((option) => ({
                      label: option.state,
                    }))}
                    // getOptionLabel={(option) => option.label || ""}
                    onChange={(event, value) => handleChange({
                      target: { name: "state", value: value ? value.label : "" }
                    })}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State Name"
                        margin="normal"
                        size="small"
                        sx={{ m: 1, width: "200px" }}
                        name="state"
                        autoComplete="new-password"
                        value={selectedCustomerData?.state || book?.state}
                        onChange={handleChange}
                      />
                    )}
                  />
                </div> */}
                <div className="input input-station-creation" style={{ paddingRight: '15px' }}>
                  <div className="icone">
                    <ListAltIcon color="action" />
                  </div>


                  {/* <Autocomplete
                    fullWidth
                    size="small"
                    id="state-autocomplete"
                    freeSolo
                    value={selectedState || ""}
                    options={Object.keys(stateToStations)}
                    onChange={handleStateChange} 
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        margin="normal"
                        size="small"
                        name="state"
                        autoComplete="new-password"
                      />
                    )}
                  /> */}
                  <TextField
                    fullWidth
                    size="small"
                    id="state-textfield"
                    value={selectedState || ""}
                    onChange={handleStateChange}
                    label="State"
                    margin="normal"
                    name="state"
                    autoComplete="new-password"
                    disabled={true}
                  />


                </div>

                {/* <div className='input' style={{ paddingRight: '15px' }}>
                  <div className='icone'>
                    <AddHomeWorkIcon color='action' />
                  </div>
                  <textarea
                    id="remark"
                    className='textarea-input'
                    name="address"
                    rows="3"
                    disabled={getMainBrachDetails.length > 0 ||isDisabled }
                    value={selectedCustomerData?.address || book.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />

                </div> */}
                <div className='input' style={{ paddingRight: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AddHomeWorkIcon color='action' />
                    <textarea
                      id="remark"
                      className='textarea-input'
                      name="address"
                      rows="3"
                      // disabled={getMainBrachDetails.length > 0 || isDisabled}
                      // disabled={(getMainBrachDetails.length > 0 || isDisabled) && !isEditMode}
                      // disabled={(getMainBrachDetails.length > 0 || isDisabled) && !isEditMode}
                      // value={selectedCustomerData?.address || book.address}
                      value={selectedCustomerData?.address || book.address}
                      onChange={handleChange}
                      placeholder="Address"
                      style={{
                        flex: '1',
                        padding: '8px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        resize: 'none'
                      }}
                    />
                  </div>
                  {/* {isDisabled &&   (
                    <span style={{ color: 'red', fontSize: '12px', textAlign: 'left', marginLeft: '32px' }}>
                      Already registered
                    </span>
                  )} */}
                  {/* {isDisabled && !isEditMode && (
  <span style={{ color: 'red', fontSize: '12px', textAlign: 'left', marginLeft: '32px' }}>
    Already registered
  </span>
)} */}
                </div>


                {/* <div className='input' style={{ paddingRight: '15px' }}>
                  <div className='icone'>
                    <MdNumbers color='action' />
                  </div>
                  <TextField
                    margin="normal"
                    size="small"
                    id="gstno"
                    label="  GST No"
                    name="gstno"
                    disabled={getMainBrachDetails.length > 0 || isDisabled}
                    value={selectedCustomerData?.gstno || book.gstno}
                    autoComplete="new-password"
                    onChange={handleChange}
                    // variant="standard"
                    style={{ width: '100%' }}
                  />
                </div> */}

                <div className='input' style={{ paddingRight: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MdNumbers color='action' />
                    <TextField
                      margin="normal"
                      size="small"
                      id="gstno"
                      label="GST No"
                      name="gstno"
                      // disabled={getMainBrachDetails.length > 0 || isDisabled}
                      disabled={(getMainBrachDetails.length > 0 || isDisabled) && !isEditMode}
                      value={selectedCustomerData?.gstno || book.gstno}
                      autoComplete="new-password"
                      onChange={handleChange}
                      style={{ flex: 1 }}
                    />
                  </div>
                  {/* {isDisabled && (
                    <span style={{ color: 'red', fontSize: '12px', textAlign: 'left', marginLeft: '32px' }}>
                      Already registered
                    </span>
                  )} */}
                  {isDisabled && !isEditMode && (
                    <span style={{ color: 'red', fontSize: '12px', textAlign: 'left', marginLeft: '32px' }}>
                      Already registered
                    </span>
                  )}
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
                {/* <Button variant="contained" onClick={() => handleStationAddData()}>Add Station</Button> */}
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
            {/* station add Modal */}
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div style={{display:'flex',flexDirection:'column',gap:15}}>
                 <TextField 
                  id="station"
                  label="Station"
                  name="station"
                  value={stationDatas?.station}
                  onChange={handlestationOnChange}
                 />
                 <TextField 
                  id="state"
                  label="State"
                  name="state"
                  value={stationDatas?.state}
                  onChange={handlestationOnChange}
                  />
                 <Button variant='contained' onClick={()=>handleSubmiStation()}>Submit</Button>
                 </div>
                </Box>
              </Modal>
            </div>
            <Box className='common-speed-dail'>
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
                    onClick={(event) => handleClick(event, "List")}
                  />
                )}
                {StationCreation_modify === 1 && isEditMode && (
                  <SpeedDialAction
                    key="edit"
                    icon={<ModeEditIcon />}
                    tooltipTitle="Edit"
                    onClick={(event) => handleClick(event, "Edit")}
                  />
                )}
                {StationCreation_delete === 1 && isEditMode && (
                  <SpeedDialAction
                    key="delete"
                    icon={<DeleteIcon />}
                    tooltipTitle="Delete"
                    onClick={(event) => handleClick(event, "Delete")}
                  />
                )}
                {StationCreation_new === 1 && !isEditMode && (
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
                  onClick={(event) => handleClick(event, "Cancel", selectedCustomerId)}
                />
              </StyledSpeedDial>
            </Box>
            <div className="stationcreation-table-container">
              <div className="table-stationcreation">


                <Box
                  sx={{
                    height: 400, // Adjust this value to fit your needs
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
                      onRowClick={handleRowClick}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    />
                  )}
                </Box>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationCreation;
