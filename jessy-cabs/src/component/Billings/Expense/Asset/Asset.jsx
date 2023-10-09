import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import "./Asset.css";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import { AiFillAppstore } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
import { BsInfoSquareFill } from "react-icons/bs";
import { BiReceipt } from "react-icons/bi";
import { BsPersonExclamation } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { GiBackwardTime } from "react-icons/gi";
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineFileSearch } from "react-icons/ai";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import Box from "@mui/material/Box";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BadgeIcon from "@mui/icons-material/Badge";
import { Menu, TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  // { icon: <BookmarkAddedIcon />, name: "Add" },
];

// TABLE

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "assetno", headerName: "Asset No", width: 130 },
  { field: "assettype", headerName: "Asset Type", width: 130 },
  { field: "purchaseprice", headerName: "Purchase Price", width: 130 },
  { field: "ownerofasset", headerName: "Owner Of Asset", width: 150 },
  { field: "legaldocuments", headerName: "Legal Documents", width: 130 },
  { field: "registrationlicense", headerName: "Registration License", width: 130 },
  { field: "warrantyinformation", headerName: "Warranty Information", width: 130 },
  { field: "maintenancerecordes", headerName: "Maintenance Records", width: 130 },
  { field: "insuranceinformation", headerName: "Insurance Information", width: 130 },
  { field: "invoicecopy", headerName: "Invoice Copy", width: 130 },
];


const Asset = () => {
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});

  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "customer_details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Customer Details", 10, 10);
    // Modify tableData to exclude the index number
    const tableData = rows.map((row) => [
      row['id'],
      row['assetno'],
      row['assettype'],
      row['purchaseprice'],
      row['ownerofasset'],
      row['legaldocuments'],
      row['registrationlicense'],
      row['warrantyinformation'],
      row['maintenancerecordes'],
      row['insuranceinformation'],
      row['invoicecopy']
    ]);
    pdf.autoTable({
      head: [['Sno', 'assetNo', 'Payment Date', 'Bill Name', 'Payment Category', 'Amount']],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Customer_Details.pdf');
  };

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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const [book, setBook] = useState({
    assetno: '',
    assettype: '',
    purchaseprice: '',
    dateofacquisition: '',
    assetdescription: '',
    legaldocuments: '',
    ownerofasset: '',
    registrationslicenses: '',
    warrantyinformation: '',
    maintenancerecords: '',
    insuranceinformation: '',

  });
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox') {
      // For checkboxes, update the state based on the checked value
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      // For other input fields, update the state based on the value
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleDateChange = (date, name) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: formattedDate,
    }));
  };
  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      assetno: '',
      assettype: '',
      purchaseprice: '',
      dateofacquisition: '',
      ownerofasset: '',
      assetdescription: '',
      legaldocuments: '',
      registrationslicenses: '',
      warrantyinformation: '',
      maintenancerecords: '',
      insuranceinformation: '',
    }));
    setSelectedCustomerData({});
  };
  const handleRowClick = useCallback((params) => {
    console.log(params.row);
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
  }, []);

  const handleAdd = async () => {
    const assetno = book.assetno;
    if (!assetno) {
      setError(true);
      setErrorMessage("fill mantatory fields");
      return;
    }
    try {
      console.log('Add button clicked');
      const response = await axios.post('http://localhost:8081/asset', book);
      console.log('Customer added:', response.data);
      handleCancel();
      setSuccessMessage("Successfully Added");
    } catch (error) {
      console.error('Error adding customer:', error);
      setErrorMessage("Check your Network Connection");
    }
  };
  const handleClick = async (event, actionName, assetno) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        console.log('List button clicked');
        const response = await axios.get('http://localhost:8081/asset');
        const data = response.data;
        setRows(data);
        setSuccessMessage("Successfully listed");
      } else if (actionName === 'Cancel') {
        console.log('Cancel button clicked');
        handleCancel();
      } else if (actionName === 'Delete') {
        console.log('Delete button clicked');
        await axios.delete(`http://localhost:8081/asset/${assetno}`);
        console.log('Customer deleted');
        setSelectedCustomerData(null);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
      } else if (actionName === 'Edit') {
        console.log('Edit button clicked');
        const selectedCustomer = rows.find((row) => row.assetno === assetno);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`http://localhost:8081/asset/${assetno}`, updatedCustomer);
        console.log('Customer updated');
        handleCancel();
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage("Check Network Connection")
    }
  };
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });

  return (
    <div className="Asset-form Scroll-Style-hide">
      <form onSubmit={handleClick}>
        <div className="Asset-page-header">
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <BadgeIcon color="action" />
              </div>
              <TextField
                size="small"
                id="asset"
                label="Asset No"
                name="assetno"
                autoComplete="new-password"
                value={selectedCustomerData?.assetno || book.assetno}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input">
              <div className="icone">
                <RateReviewIcon color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Asset Type"
                name="assettype"
                value={selectedCustomerData?.assettype || book.assettype}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input">
              <div className="icone">
                <ImPriceTags style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Purchase Price"
                name="purchaseprice"
                value={selectedCustomerData?.purchaseprice || book.purchaseprice}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input">
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Acquisition"
                  value={selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null}
                  onChange={handleDateChange}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} name='dateofacquisition' inputRef={inputRef} value={selectedCustomerData?.date} />
                  )}
                </DatePicker>
              </LocalizationProvider> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Acquisition"
                  value={selectedCustomerData.dateofacquisition ? dayjs(selectedCustomerData.startdate) : null}
                  onChange={(date) => handleDateChange(date, 'dateofacquisition')}
                >
                  {({ inputProps, inputRef }) => (
                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerData?.dateofacquisition} />
                  )}
                </DatePicker>
              </LocalizationProvider>
            </div>
          </div>
          <div className="input-field">
            <div className="input">
              <div className="icone">
                <BsPersonExclamation style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Owner Of Asset"
                name="ownerofasset"
                value={selectedCustomerData?.ownerofasset || book.ownerofasset}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input">
              <div className="icone">
                <AiFillAppstore style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Asset Description"
                name="assetdescription"
                value={selectedCustomerData?.assetdescription || book.assetdescription}
                onChange={handleChange}
                autoComplete="new-password"
                autoFocus
              />
            </div>
            <div className="input">
              <div className="icone">
                <HiDocumentText style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Legal Documents"
                name="legaldocuments"
                value={selectedCustomerData?.legaldocuments || book.legaldocuments}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "240px" }}>
              <div className="icone">
                <FactCheckIcon color="action" />
              </div>
              <TextField
                size="small"
                id="id"
                label="Registrations Licenses"
                name="registrationslicenses"
                value={selectedCustomerData?.registrationslicenses || book.registrationslicenses}
                onChange={handleChange}
                autoComplete="new-password"
                autoFocus
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <GiBackwardTime style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="warrantyinformation"
                label="Warranty Information"
                name="warrantyinformation"
                value={selectedCustomerData?.warrantyinformation || book.warrantyinformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <BiReceipt style={{ fontSize: "25px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="maintenancerecords"
                label="Maintenance Records"
                name="maintenancerecords"
                value={selectedCustomerData?.maintenancerecords || book.maintenancerecords}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "230px" }}>
              <div className="icone">
                <BsInfoSquareFill style={{ fontSize: "22px" }} color="action" />
              </div>
              <TextField
                size="small"
                id="insuranceinformation"
                label="Insurance Information"
                name="insuranceinformation"
                value={selectedCustomerData?.insuranceinformation || book.insuranceinformation}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div className="input" style={{ width: "160px" }}>
              <Button color="primary" variant="contained" component="label">
                Invoice Copy
                <input
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
            </div>
          </div>
          <div className="input-field" >
            <div className="input" style={{ width: "100px" }}>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
            </div>
          </div>
        </div>
        <div className="detail-container-main">
          <div className="container-left">
            <div className="copy-title-btn-Asset">
              <div className="input-field" style={{ justifyContent: 'center' }}>
                <div className="input" style={{ width: "230px" }}>
                  <div className="icone">
                    <AiOutlineFileSearch color="action" style={{ fontSize: "27px" }} />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Search"
                    name="Search"
                    autoFocus
                  />
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From Date"
                      value={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To Date"
                      value={toDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input" style={{ width: "140px" }}>
                  <Button variant="contained">Search</Button>
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
        {info &&
          <div className='alert-popup Info' >
            <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{infoMessage}</p>
          </div>
        }
        {success &&
          <div className='alert-popup Success' >
            <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
            <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
            <p>{successMessage}</p>
          </div>
        }
        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(event) => handleClick(event, action.name, selectedCustomerId)}
              />
            ))}
          </StyledSpeedDial>
        </Box>
        <div className="Download-btn">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                  Download
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                  <MenuItem onClick={handlePdfDownload}>PDF</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>
        <div className="table-bookingCopy-Asset">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Asset