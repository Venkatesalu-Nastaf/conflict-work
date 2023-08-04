import React from 'react'
import "./AppUserList.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionIcon from "@mui/icons-material/Description";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

// TABLE START
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "DriverName", headerName: "Driver Name", width: 130 },
  { field: "UserId", headerName: "User Id", width: 130 },
  { field: "DriverType", headerName: "Driver Type", width: 130 },
  { field: "Active", headerName: "Active", width: 130 },
  { field: "Mobile", headerName: "Mobile", width: 130 },
];

const rows = [
  {
    id: 1,
    DriverName: "Surash",
    UserId: 71,
    DriverType: "Morning",
    Active: "Booking",
    Mobile: 9232889403,

  },
  {
    id: 2,
    DriverName: "Mani",
    UserId: 32,
    DriverType: "Evening",
    Active: "Closed",
    Mobile: 9933809403,
  },
];
// TABLE END

const AppUserList = () => {
  return (
    <div className="appuserlist-form">
      <form action="">
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-AppUserList">
              <div className="input-field">
                <div className="input radio">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      App User Active /<br /> Not Active 
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="AppUserActive"
                      autoComplete="new-password"
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="input" style={{ width: "130px" }}>
                  <Button variant="contained">List</Button>
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