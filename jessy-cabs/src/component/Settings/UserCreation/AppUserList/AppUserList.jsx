import React, { useEffect } from 'react';
import "./AppUserList.css";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from "@mui/x-data-grid";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DescriptionIcon from "@mui/icons-material/Description";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import useAppuserlist from './useAppuserlist';
import { Box } from '@mui/material';


const AppUserList = () => {

  const {
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
    hidePopup,
    apps,
    handleChangeStatus,
    handleListButtonClick,
    columns,

    // ... (other state variables and functions)
  } = useAppuserlist();

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  return (
    <div className="appuserlist-form main-content-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-AppUserList">
              <div className="input-field appuser-inputs" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                <div className="input radio">
                  <FormControl>
                    <FormLabel style={{ textAlign: 'center' }} id="demo-row-radio-buttons-group-label">
                      Active / Inactive
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="AppUserActive"
                      id="AppUserActive"
                      autoComplete="new-password"
                      value={apps}
                      onChange={handleChangeStatus}
                    >
                      <FormControlLabel
                        value="active"
                        control={<Radio />}
                        label="Active"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="inactive"
                        control={<Radio />}
                        label="Inactive"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="" style={{ width: "130px" }}>
                  <Button variant="contained" onClick={handleListButtonClick}>List</Button>
                </div>
                <div className="" style={{ width: "130px" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DescriptionIcon />}
                  >
                    Excel
                    <input
                      type="file"
                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
              </div>
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
        <div className="table-bookingCopys-main">
          <div className="table-bookingCopys">
            <div className='app-userlist-table-main'>
              {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
              /> */}

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
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                />
              </Box>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default AppUserList