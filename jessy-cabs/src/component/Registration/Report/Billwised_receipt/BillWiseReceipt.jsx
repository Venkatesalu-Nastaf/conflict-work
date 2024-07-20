import React from 'react'
import "./BillWiseReceipt.css";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { MdOutlineEventNote } from "react-icons/md";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { FaIndianRupeeSign } from "react-icons/fa6";



// ICONS
import BadgeIcon from "@mui/icons-material/Badge";

const columns = [
  { field: 'id', headerName: 'Sno', width: 70 },
  {
    field: 'billNo',
    headerName: 'Bill No',
    type: 'number',
    width: 90,
  },
  { field: 'billDate', headerName: 'Bill Date', width: 130 },
  { field: 'tripNo', headerName: 'Trip No', width: 130 },
  { field: 'billAmt', headerName: 'Bill Amt', width: 130 },
  { field: 'recieved', headerName: 'Recieved', width: 130 },
  { field: 'disAm', headerName: 'Dis Am', width: 130 },
  { field: 'balance', headerName: 'Balanace', width: 130 },
  { field: 'billType', headerName: 'Bill Type', width: 130 },
  { field: 'uniqueId', headerName: 'Unique Id', width: 130 },
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
  { id: 1, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 2, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 3, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 4, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 5, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 6, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 7, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 8, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 9, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },
  { id: 10, billNo: 35, billDate: '17-07-2024', tripNo: '17-07-2024', billAmt: 'Vinoth', recieved: '20', disAm: '20', balance: '20', billType: '20', uniqueId: '20' },

];


const columnsPendingBill = [
  { field: 'id', headerName: 'Sno', width: 70 },
  {
    field: 'billNo',
    headerName: 'Bill No',
    type: 'number',
    width: 90,
  },
  { field: 'billDate', headerName: 'Bill Date', width: 130 },
  { field: 'amount', headerName: 'Amount', width: 130 },
];

const rowsPendingBill = [
  { id: 1, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 2, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 3, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 4, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 5, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 6, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 7, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 8, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 9, billNo: 35, billDate: '17-07-2024', amount: '50' },
  { id: 10, billNo: 35, billDate: '17-07-2024', amount: '50' },

];

export const BillWiseReceipt = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="main-content-form Scroll-Style-hide">
        <form >
          <div className="detail-container-main-Employe">
            <div className="container-Employe">
              <div className="input-field employee-input-feilds">
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="voucher ID"
                    className="full-width"
                    label="voucher ID"
                    name="voucher ID"
                    autoComplete="new-password"

                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <DatePicker
                      id="Date"
                      label=" Date"
                      format="DD/MM/YYYY"
                    >
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <MdOutlineEventNote color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="cover Note"
                    className="full-width"
                    label="cover Note"
                    name="cover Note"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <WorkOutlineRoundedIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="cheque No"
                    className="full-width"
                    label="cheque No"
                    name="cheque No"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <MdOutlineEventNote color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Narration"
                    className="full-width"
                    label="Narration"
                    name="Narration"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <AccountBalanceWalletIcon color="action" />
                  </div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Customer Id</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="Customer Id"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Account To</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="Account To"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="input-field " style={{ marginTop: "30px" }}>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="voucher ID"
                    className="full-width"
                    label="voucher ID"
                    name="voucher ID"
                    autoComplete="new-password"
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="icone">
                      <CalendarMonthIcon color="action" />
                    </div>
                    <DatePicker
                      id="Date"
                      label=" Date"
                      format="DD/MM/YYYY"
                    >
                    </DatePicker>
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <div className="icone">
                    <FaIndianRupeeSign color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Bill Amount"
                    className="full-width"
                    label="Bill Amount"
                    name="Bill Amount"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Advanced"
                    className="full-width"
                    label="Advanced"
                    name="Advanced"

                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FaIndianRupeeSign color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Paid"
                    className="full-width"
                    label="Paid"
                    name="Paid"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FaIndianRupeeSign color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Received"
                    className="full-width"
                    label="Received"
                    name="Received"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FaIndianRupeeSign color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Discount"
                    className="full-width"
                    label="Discount"
                    name="Discount"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <FaIndianRupeeSign color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="Balance"
                    className="full-width"
                    label="Balance"
                    name="Balance"
                  />
                </div>
                <div className="input">
                  <div className="icone">
                    <BadgeIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="unique id"
                    className="full-width"
                    label="unique id"
                    name="unique id"
                  />
                </div>
              </div>
              <div className='bill-wise-reciept-table-main' style={{ display: 'flex' }}>
                <div className='bill-wise-reciept-table-first'>
                  <div className='amount-calculator'>
                    <div className='total-inputs' >
                      <label htmlFor="">Amount:</label>
                      <input type="text" />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Recieved:</label>
                      <input type="text" />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Discount:</label>
                      <input type="text" />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Balance:</label>
                      <input type="text" />
                    </div>
                    <div className='total-inputs' >
                      <label htmlFor="">Tot Amt Recieved:</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className='bill-wise-reciept-table'>
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
                <div className='bill-wise-reciept-table-second'>
                  <div style={{ display: 'flex', gap: '10px', paddingBottom: '10px' }}>
                    <Button variant='contained'>Show Pending Bills</Button>
                    <Button variant='contained'>Apply to list</Button>
                  </div>
                  <div className='bill-wise-reciept-table-right-side'>
                    <DataGrid
                      rows={rowsPendingBill}
                      columns={columnsPendingBill}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                    />
                  </div>
                  <div style={{display: 'flex', paddingTop: '15px'}}>
                    <div className='total-inputs' style={{display: 'flex'}}>
                      <label htmlFor="">Amount:</label>
                      <input type="text" />
                    </div>
                    <div className='total-inputs' style={{display: 'flex'}}>
                      <label htmlFor="">Recieved:</label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
