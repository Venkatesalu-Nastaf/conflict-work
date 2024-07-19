import React, { useEffect, useState } from 'react';
import "./GstReport.css";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiMatterStates } from "react-icons/gi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";


const columns = [
  { field: 'id', headerName: 'Sno', width: 70 },
  {
    field: 'billNo',
    headerName: 'Bill No',
    type: 'number',
    width: 90,
  },
  { field: 'billDate', headerName: 'Bill Date', width: 130 },
  { field: 'tripDate', headerName: 'Trip Date', width: 130 },
  { field: 'customerName', headerName: 'Customer Name', width: 130 },
  { field: 'gstin', headerName: 'GSTIN', width: 130 },
  { field: 'gross', headerName: 'GROSS', width: 130 },
  { field: 'gst', headerName: 'GST%', width: 130 },
  { field: 'cgst', headerName: 'CGST', width: 130 },
  { field: 'sgst', headerName: 'SGST', width: 130 },
  { field: 'igst', headerName: 'IGST', width: 130 },
  { field: 'billed', headerName: 'Billed', width: 130 },



  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row?.firstName || ''} ${row?.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 2, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 3, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 4, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 5, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 6, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 7, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 8, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 9, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  { id: 10, billNo: 35, billDate: '17-07-2024', tripDate: '17-07-2024', customerName: 'Vinoth', gstin: '20', gross: '20', gst: '20', cgst: '20', sgst: '20', igst: '20', billed: 'yes'},
  
];


export const GstReport = () => {

  return (
    <>
      <div className='main-content-form'>
        <div className='input-field'>
          <div className="input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="From Date"
                  format="DD/MM/YYYY"
                // value={fromDate}
                // onChange={(date) => setFromDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="input dispatch-input">
            <div className="icone">
              <MdOutlineCalendarMonth color="action" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="To Date"
                  format="DD/MM/YYYY"
                // value={toDate}
                // onChange={(date) => setToDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="input">
            <div className="icone">
              <GiMatterStates color="action" />
            </div>
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="Department"
              id="department"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>

          <div className="input">
            <div className="icone">
              <GiMatterStates color="action" />
            </div>
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="Customer"
              id="customer"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>

          <div className='show-all-button'>
            <div className="input" >
              <Button variant="outlined">Show</Button>
            </div>
            <div className="input">
              <Button className='text-nowrap' variant="contained" style={{ whiteSpace: 'nowrap' }}>Show All</Button>
            </div>
          </div>
        </div>

        <div className='input-field'>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="Taxable Value"
              id="customer"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="CGST"
              id="customer"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="SGST"
              id="customer"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="IGST"
              id="customer"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="TOT.GST"
              id="customer"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>
          <div className="input">
            <TextField
              name="orderByMobileNo"
              autoComplete="new-password"
              className="full-width"
              // value={
              //   formData.orderByMobileNo ||
              //   selectedCustomerData.orderByMobileNo ||
              //   selectedCustomerDatas.orderByMobileNo ||
              //   book.orderByMobileNo ||
              //   ""
              // }
              // onChange={handleChange}
              label="Total Amount"
              id="customer"
              // variant="standard"
              margin="normal"
              size="small"
            />
          </div>
        </div>

        <div className='gst-report-table'>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </div>

      </div>
    </>
  )
}
