import React, { useState } from 'react';
import "./BookingCopy.css";
import { TextField } from "@mui/material";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import dayjs from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Sno', width: 70 },
  { field: 'bookingId', headerName: 'Booking ID', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'time', headerName: 'Time', width: 90 },
  { field: 'guestName', headerName: 'Guest Name', width: 160 },
  { field: 'mobile', headerName: 'Mobile', width: 130 },
  { field: 'rAddress', headerName: 'R.Address', width: 130 },
  { field: 'rAddress1', headerName: 'R.Address1', width: 130 },
  { field: 'rAddress2', headerName: 'R.Address2', width: 130 },
  { field: 'company', headerName: 'Company', width: 130 },
  { field: 'bookingID', headerName: 'BookingID', width: 130 },
];

const rows = [
  { id: 1, bookingId: 1, date: '2023-06-07', time: '10:00 AM', guestName: 'John Doe', mobile: '1234567890', rAddress: '123 Street', rAddress1: 'Apt 4B', rAddress2: 'City', company: 'ABC Company', bookingID: 'XYZ123' },
  { id: 2, bookingId: 2, date: '2023-06-08', time: '2:00 PM', guestName: 'Jane Smith', mobile: '9876543210', rAddress: '456 Avenue', rAddress1: 'Unit 8', rAddress2: 'Town', company: 'XYZ Corp', bookingID: 'ABC456' },
  // Add more rows as needed
];

const BookingCopy = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform upload or further processing of the selected file
      console.log('Selected file:', selectedFile);
    }
  };
  return (
    <div className="bookingcopy-form">
      <form action="">
        <span className="Title-Name">Booking Copy</span>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="input-field copy-title-btn">
              <div className="input">
                <div className="icone">
                  <AutoModeIcon color="action" />
                </div>
                <TextField
                  margin="normal"
                  size="small"
                  name="bookingno"
                  label="Booking No"
                  id="booingno"
                  autoFocus
                />
              </div>
              <div>
              <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
              </div>
              <div className="input" style={{ width: "50%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker label="From Date" defaultValue={dayjs()} />
                    <DatePicker label="To Date" defaultValue={dayjs()} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="input" style={{ width: "70px" }}>
                <Button variant="outlined">Show</Button>
              </div>
              <div className="input" style={{ width: "70px" }}>
                <Button variant="contained">Save</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-bookingCopy">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingCopy;
