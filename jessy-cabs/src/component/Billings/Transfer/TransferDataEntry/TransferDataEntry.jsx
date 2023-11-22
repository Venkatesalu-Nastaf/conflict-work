import React, { useState } from 'react';
import "./TransferDataEntry.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, FormControlLabel, Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faFileInvoiceDollar, faTags } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { AiOutlineFileSearch } from 'react-icons/ai';


const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "tripdate", headerName: "TripDate", width: 130 },
  { field: "tripno", headerName: "Trip No", width: 130 },
  { field: "customer", headerName: "Customer", width: 130 },
  { field: "vehicleregno", headerName: "VehicleReg.No", width: 130 },
  { field: "vehicletype", headerName: "VehicleType", width: 130 },
  { field: "username", headerName: "UserName", width: 150 },
  { field: "groupname", headerName: "GroupName", width: 130 },
  { field: "hrs", headerName: "Hours", width: 150 },
  { field: "days", headerName: "Days", width: 150 },
  { field: "duty", headerName: "Duty", width: 150 },
  { field: "permit", headerName: "Permit", width: 150 },
  { field: "parking", headerName: "Parking", width: 150 },
  { field: "billno", headerName: "BillNo", width: 130 },
  { field: "extraHrsamount", headerName: "ExtraHrsAmount", width: 130 },
  { field: "extraKmsamount", headerName: "ExtrakmsAmount", width: 130 },
  { field: "amount", headerName: "Amount", width: 130 },
  { field: "grouptripno", headerName: "GroupTripNo", width: 130 },
  { field: "billtype", headerName: "BillType", width: 130 },
  { field: "advance", headerName: "Advance", width: 130 },
  { field: "taxStatus", headerName: "TaxStatus", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
  { field: "locked", headerName: "Locked", width: 130 },
];

const TransferDataEntry = () => {
  const [rows] = useState([]);

  return (
    <div className="TransferDataEntry-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="TransferDataEntry">
            <div className="container-left">
              <div className="copy-title-btn-TransferDataEntry">
                <div className="input-field" >
                  <div className="input" style={{ width: "230px" }}>
                    <div className="icone">
                      <FontAwesomeIcon icon={faTags} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Group Trip ID"
                      name="tripid"
                      autoComplete='off'
                    />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                      />
                      <DatePicker
                        label="Bill Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input-field" >
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Invoice No"
                      name="invoiceno"
                      autoComplete='off'
                    />
                  </div>
                  <div className="input" style={{ width: "420px" }}>
                    <div className="icone">
                      <HailOutlinedIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      sx={{ width: "380px" }}
                      label="Customer"
                      name="customer"
                      autoComplete='off'
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="From Date"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input" >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="To Date"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="input">
                    <Button variant="contained">Select</Button>
                  </div>
                </div>
                <div className="input-field" >
                  <div className="input">
                    <div className="icone">
                      <AiOutlineFileSearch color="action" style={{ fontSize: "27px" }} />
                    </div>
                    <TextField
                      size="small"
                      id="id"
                      label="Search"
                      name="invoiceno"
                      autoComplete='off'
                    />
                  </div>
                  <div className="input" >
                    <TextField
                      size="small"
                      id="id"
                      label=""
                      autoComplete='off'
                    />
                  </div>
                  <div className="input" >
                    <div className="icone">
                      <FontAwesomeIcon icon={faBuilding} size="xl" />
                    </div>
                    <select name="branch" className="input-select">
                      <option value="" disabled selected>Select a city</option>
                      <option value="all">Chennai</option>
                      <option value="billed">Bangalore</option>
                      <option value="notbilled">Hyderabad</option>
                    </select>
                  </div>
                </div>
                <div className="input-field">
                  <div className="input">
                    <FormControlLabel
                      value="guestsms"
                      control={<Checkbox size="small" />}
                      label="Group Billing"
                    />
                  </div>
                  <div className="input">
                    <Button variant="outlined">Add Trip</Button>
                  </div>
                  <div className="input">
                    <Button variant="contained">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='container-right-box'>
              <div className="TransferDataEntry-Box">
                <div class="booking-update">
                  <div class="Scroll-Style" style={{ overflow: 'scroll', height: '220px', width: '260px' }}>
                    <table>
                      <thead id="update-header">
                        <tr>
                          <th>CompanyName</th>
                          <th>RateType</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colspan="6">No data available.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <Button variant="contained">Add To List</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input">
                  <Button variant="outlined">Bill Generate</Button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="total-container-TransferDataEntry">
          <div className="Download-btn">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem >Excel</MenuItem>
                    <MenuItem >PDF</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <div className='amount-calculator'>
            <div className="total-inputs" style={{ marginTop: '25px' }}>
              <Button variant="outlined" >Remove Selected</Button>
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Kms:</label>
              <input type="number" />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Total Hours:</label>
              <input type="number" />
            </div>
            <div className='total-inputs' >
              <label htmlFor="">Amount:</label>
              <input type="number" />
            </div>
          </div>
        </div>

        <div className="table-bookingCopy-TransferDataEntry">
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

export default TransferDataEntry