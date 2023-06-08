import React, { useState } from "react";
import "./Excelimport.css";
import { TextField } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import dayjs from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const columns: GridColDef[] = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "bookingId", headerName: "Booking ID", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "time", headerName: "Time", width: 90 },
  { field: "guestName", headerName: "Guest Name", width: 160 },
  { field: "mobile", headerName: "Mobile", width: 130 },
  { field: "rAddress", headerName: "R.Address", width: 130 },
  { field: "rAddress1", headerName: "R.Address1", width: 130 },
  { field: "rAddress2", headerName: "R.Address2", width: 130 },
  { field: "company", headerName: "Company", width: 130 },
  { field: "bookingID", headerName: "BookingID", width: 130 },
];

const rows = [
  {
    id: 1,
    bookingId: 1,
    date: "2023-06-07",
    time: "10:00 AM",
    guestName: "John Doe",
    mobile: "1234567890",
    rAddress: "123 Street",
    rAddress1: "Apt 4B",
    rAddress2: "City",
    company: "ABC Company",
    bookingID: "XYZ123",
  },
  {
    id: 2,
    bookingId: 2,
    date: "2023-06-08",
    time: "2:00 PM",
    guestName: "Jane Smith",
    mobile: "9876543210",
    rAddress: "456 Avenue",
    rAddress1: "Unit 8",
    rAddress2: "Town",
    company: "XYZ Corp",
    bookingID: "ABC456",
  },
  // Add more rows as needed
];

const Excelimport = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform upload or further processing of the selected file
      console.log("Selected file:", selectedFile);
    }
  };

  const handleInputClick = (event) => {
    event.target.value = null; // Reset the value to allow selecting the same file multiple times
  };

  return (
    <div className="bookingcopy-form">
      <form action="">
        <span className="Title-Name">Excel Import</span>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn">
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <BackupIcon color="action" />
                  </div>
                  <Button variant="outlined" component="label">
                    Choose File
                    <TextField
                      type="file"
                      onChange={handleFileChange}
                      onClick={handleInputClick}
                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker label="Booking Date" defaultValue={dayjs()} />
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
              <div className="input-field">
                <div className="input">
                  <div className="icone">
                    <BackupIcon color="action" />
                  </div>
                  <Button variant="outlined" component="label">
                    Choose File
                    <TextField
                      type="file"
                      onChange={handleFileChange}
                      onClick={handleInputClick}
                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
                <div className="input" style={{ width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker label="From Date" defaultValue={dayjs()} />
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

export default Excelimport;
