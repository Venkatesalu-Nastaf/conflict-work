import React, { useState } from 'react';
import "./AppUserList.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
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

  const handleListButtonClick = () => {
    // Make an API request to fetch data based on the selected status
    fetch(`http://localhost:8081/tripsheet_driver_details?apps=${encodeURIComponent(apps)}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data as needed (e.g., update state to display it)
        console.log('driver details', data);
        setRows(data);
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