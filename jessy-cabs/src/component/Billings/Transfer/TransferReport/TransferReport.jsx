import React, { useState } from 'react';
import "./TransferReport.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar, faNewspaper, faTags } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "vcode", headerName: "VCode", width: 130 },

];

const TransferReport = () => {
  const [rows] = useState([]);

  return (
    <div className="TransferReport-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-TransferReport">
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faTags} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Reference No"
                    name="referenceno"
                    autoComplete='off'
                  />
                </div>
                <div className="input" style={{ width: "230px" }}>
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
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="MIS Format"
                    name="misformat"
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "400px" }}>
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Customer Name"
                    sx={{ width: "400px" }}
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <TextField
                    size="small"
                    id="id"
                    label="Rate Type"
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Invoice Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="input-field">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="From Date"
                    />
                    <DatePicker
                      label="To Date"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="outlined">List</Button>
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained">Excel</Button>
                </div>
                <div className="input" style={{ width: "100px" }}>
                  <Button variant="contained">PDF Bill</Button>
                </div>
              </div>
              <div className="input-field">
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="outlined">Booking Mail</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained">Image With Invoice Normal</Button>
                </div>
                <div className="input" style={{ width: "180px" }}>
                  <Button variant="contained">Image With Invoice Luxury</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="billing-tables-TransferReport">
          <div className="table-bookingCopy-TransferReport">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </div>
          <div className="tripsheet-table-transferReport">
            <div className="TransferReport-Box">
              <div class="booking-update">
                <div class="Scroll-Style" style={{ overflow: 'scroll', height: 300, width: "100%" }}>
                  <table>
                    <thead id="update-header">
                      <tr>
                        <th>TripSheet No</th>
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
              <div className="input" style={{ width: "150px" }}>
                <Button variant="outlined">Select</Button>
              </div>
              <div className="input" style={{ width: "150px" }}>
                <Button variant="contained">Unselect</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TransferReport