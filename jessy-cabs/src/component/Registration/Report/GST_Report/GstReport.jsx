import React from 'react';
import "./GstReport.css";

import { Menu, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiMatterStates } from "react-icons/gi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuItem from '@mui/material/MenuItem';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useGstReport from './useGstReport';
import { Autocomplete } from "@mui/material";
import dayjs from 'dayjs';



export const GstReport = () => {
  const { organization, gstReport, setGstReport, department, handleShow, rows, columns, taxReport, handleDownloadPdf, handleDownloadExcel } = useGstReport();

  const handleDateChange = (field, date) => {
    setGstReport(prevGstReport => ({
      ...prevGstReport,
      [field]: dayjs(date).format('YYYY-MM-DD')
    }));
  };

  const handleDepartmentChange = (event, value) => {
    setGstReport(prevGstReport => ({
      ...prevGstReport,
      department: value || '', // Ensure value is not undefined
    }));
  };

  const handleCustomerChange = (event, value) => {
    setGstReport(prevGstReport => ({
      ...prevGstReport,
      customer: value || '', // Ensure value is not undefined
    }));
  };

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
                  value={dayjs(gstReport?.fromDate)}
                  onChange={(date) => handleDateChange('fromDate', date)}
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
                  value={dayjs(gstReport?.toDate)}
                  onChange={(date) => handleDateChange('toDate', date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="input">
            <div className="icone">
              <GiMatterStates color="action" />
            </div>
            <Autocomplete
              fullWidth
              id="free-solo-customer"
              freeSolo
              size="small"
              options={["All", ...department.map(org => org.stationname)]}
              value={gstReport.department}
              onChange={handleDepartmentChange}
              renderInput={(params) => (
                <TextField {...params} label="Department" name='department' inputRef={params.inputRef} />
              )}
            />
          </div>

          <div className="input">
            <div className="icone">
              <GiMatterStates color="action" />
            </div>
            <Autocomplete
              fullWidth
              id="free-solo-customer"
              freeSolo
              size="small"
              options={["All", ...organization.map(org => org.customer)]}
              value={gstReport.customer}
              onChange={handleCustomerChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Organization"
                  name='customer'
                  inputRef={params.inputRef}
                />
              )}
            />

          </div>

          <div className='show-all-button'>
            <div className="input" >
              <Button onClick={handleShow} variant="outlined">Show</Button>
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
              value={taxReport.TaxableValue}
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
              value={taxReport.cgst}
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
              value={taxReport.sgst}
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
              value={taxReport.igst}
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
              value={taxReport.totalGST}
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
              value={taxReport.totalAmount}
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
          <div className="input">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                    Download
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={handleDownloadExcel} >Excel</MenuItem>
                    <MenuItem onClick={handleDownloadPdf} >GST PDF</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        </div>

        <div className='gst-report-table'>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
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
