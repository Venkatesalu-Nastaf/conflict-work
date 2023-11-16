import React, { useState, useEffect } from 'react';
import "./AppUserList.css";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from "@mui/x-data-grid";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import DescriptionIcon from "@mui/icons-material/Description";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "driverName", headerName: "Driver Name", width: 130 },
  { field: "startdate", headerName: "Date", width: 130 },
  { field: "vehType", headerName: "Vehicle Type", width: 130 },
  { field: "apps", headerName: "Active", width: 130 },
  { field: "mobileNo", headerName: "Mobile", width: 130 },
];

// TABLE END
const AppUserList = () => {

  const [rows, setRows] = useState([]);
  const [apps, setApps] = useState('active'); // Default to 'active'
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});



  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [success]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [info]);

  const handleListButtonClick = () => {
    // Make an API request to fetch data based on the selected status
    fetch(`http://localhost:8081/tripsheet_driver_details?apps=${encodeURIComponent(apps)}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data as needed (e.g., update state to display it)
        console.log('driver details', data);
        if (data.length > 0) {
          setRows(data);
          setSuccess(true);
          setSuccessMessage("Successfully listed");
        } else {
          setRows([]);
          setError(true);
          setErrorMessage("No data found");
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChangeStatus = (event) => {
    setApps(event.target.value);
  };
  return (
    <div className="appuserlist-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-AppUserList">
              <div className="input-field">
                <div className="input radio">
                  <FormControl>
                    <FormLabel style={{ textAlign: 'center' }} id="demo-row-radio-buttons-group-label">
                      Active / Inactive
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="AppUserActive"
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
                <div className="input" style={{ width: "130px" }}>
                  <Button variant="contained" onClick={handleListButtonClick}>List</Button>
                </div>
                <div className="input" style={{ width: "130px" }}>
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
        <div className="table-bookingCopys">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AppUserList