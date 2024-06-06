import React, { useEffect, useState } from 'react';
import "./TransferReport.css";
import { APIURL } from '../../../url';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from "@mui/material";
import Mapinvoice from './Mapinvoice/Mapinvoice';
import Luxuryinvoice from './Luxuryinvoice/Luxuryinvoice';
import Reportinvoice from './Reportinvoice/Reportinvoice';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Mailpdf from './Mailpdf/Mailpdf';
import PdfPage from './PdfPage';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import PdfContent2 from './PdfContent2';
import { useData } from "../../../Dashboard/MainDash/Sildebar/DataContext2"
import PdfParticularData from './PdfParticularData';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
//for popup
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

//for pdf

//dialog box
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { faBuilding, faFileInvoiceDollar, faNewspaper, faTags } from "@fortawesome/free-solid-svg-icons";
import useTransferreport from './useTransferreport';
import useExeclpage from './ExcelPage';
import { PdfData } from './PdfContext';
import { PiMoneyBold } from "react-icons/pi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const PDFbill = [
  {
    Option: "PDF 1",
    optionvalue: "oldpdf",
  },
  {
    Option: "PDF 2",
    optionvalue: "newpdf",
  },
];

export const MISformat = [
  {
    Option: "Old MIS",
    optionvalue: "oldmis",
  },
  {
    Option: "New MIS",
    optionvalue: "newmis",
  },
];

const TransferReport = ({ stationName }) => {

  const {
    invoiceno,
    groupTripid,
    fromDate,
    endDate,
    invoiceDate,
    rows,
    actionName,
    error,
    success,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    handleClick,
    ratetypeforpage,
    hidePopup,
    organizationdata,
    routedData,
    date,
    customer,
    tripData,
    // bankOptions,
    selectedImage,
    // setCustomer,
    misformat, setMisformat,
    servicestation,
    handleserviceInputChange,
    pbpopupOpen,
    handlePopupClose,
    npopupOpen,
    lxpopupOpen,
    routeData,
    roundedAmount,
    sumTotalAndRounded,
    totalValue,
    attachedImage,
    organizationaddress1,
    organizationaddress2,
    popupOpen,
    organizationcity,
    organizationgstnumber,
    pdfBillList,
    setPdfBillList,
    setError,
    setErrorMessage,
    handleRowSelection,
    // rowzip,
    rowSelectionModel,
    setRowSelectionModel,
    pdfzipdata
  } = useTransferreport();
  const {
    handleExcelDownload, error1, errormessage1,
    handledatazipDownload } = useExeclpage()
  const [invoicedata, setInvoicedata] = useState([])
  const [addressDetails, setAddressDetails] = useState([])
  const apiUrl = APIURL;
  const [organizationsdetail1, setOrganisationDetail] = useState([]);
  const { sharedData } = useData();
  const [particularPdf, setParticularPdf] = useState([])
  const [imageorganisation, setSelectedImageorganisation] = useState(null);
  const [tripno, setTripno] = useState('')
  const { pdfPrint, setPdfPrint } = PdfData()

  useEffect(() => {
    setSelectedImageorganisation(sharedData)
  }, [sharedData])
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);


  useEffect(() => {
    const fetchdata = async () => {
      try {

        if (!customer) return

        const response = await fetch(`${apiUrl}/customeraddress/${customer}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const addressdetail = await response.json();
        console.log(addressdetail, 'details');
        setAddressDetails(addressdetail);
      } catch (err) {
        console.error('Error fetching customer address:', err);
      }
    };

    fetchdata();
  }, [apiUrl, customer]);


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${apiUrl}/organisationpdfdata`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const organizationdetails = await response.json();
        setOrganisationDetail(organizationdetails)

      } catch (err) {
        console.error('Error fetching customer address:', err);
      }
    };

    fetchdata();
  }, [apiUrl, customer]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const tripid = localStorage.getItem("selectedtripsheetid");
        const encoded = localStorage.getItem("selectedcustomerdata");
        localStorage.setItem("selectedcustomer", encoded);
        const storedCustomer = localStorage.getItem("selectedcustomer");
        const customer = decodeURIComponent(storedCustomer);

        if (!customer || !tripid) return

        const response = await fetch(
          `${apiUrl}/tripsheetcustomertripid/${encodeURIComponent(customer)}/${tripid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json();
        setInvoicedata(tripData)
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [apiUrl])

  const handleDownloadPdf = async () => {
    if (!pdfBillList) {
      setError(true)
      setErrorMessage('Select PDF Format')
      return
    }

    else if (pdfBillList === "PDF 1") {
      const fileName = 'test.pdf';
      const blob = await pdf(<PdfPage invdata={invoicedata} invoiceno={invoiceno} invoiceDate={invoiceDate} groupTripid={groupTripid} customeraddress={addressDetails} customer={customer} organisationdetail={organizationsdetail1} imagedata={imageorganisation} />).toBlob();
      saveAs(blob, fileName);
      localStorage.removeItem("selectedcustomerdata");
      localStorage.removeItem("selectedtripsheetid");
    }
    else if (pdfBillList === "PDF 2") {
      const fileName = 'test.pdf';
      const blob = await pdf(<PdfContent2 invdata={invoicedata} invoiceDate={invoiceDate} customeraddress={addressDetails} invoiceno={invoiceno} customer={customer} fromDate={fromDate} enddate={endDate} organisationname={organizationsdetail1} imagename={imageorganisation} />).toBlob();
      saveAs(blob, fileName);
      localStorage.removeItem("selectedcustomerdata");
      localStorage.removeItem("selectedtripsheetid");
    }

  }

  const handlePopup = () => {
    setPdfPrint(false)
  }

  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "vcode", headerName: "VCode", width: 130 },
    { field: "guestname", headerName: "Guest Name", width: 130 },
    { field: "tripid", headerName: "Trip No", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    // { field: "view", headerName: "View", width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <Button
          onClick={() => handleButtonClick(params)}
          aria-label="open-dialog"
        >
          <Button variant="contained" color="primary">
            view
          </Button>

        </Button>
      ),
    },
  ];


  const handleButtonClick = async (params) => {
    setPdfPrint(true)
    const { tripid, customer } = params.row;
    setTripno(tripid)
    const response = await fetch(`${apiUrl}/tripsheetcustomertripid/${customer}/${tripid}`);
    const pdfdetails = await response.json()
    setParticularPdf(pdfdetails)

  };
  const handleBothDownload = (misformat1, invoicedata1, invoiceDate1) => {
    if (!misformat) {
      setError(true)
      setErrorMessage("SELECT MIS FORMAT AND PDF FORMAT")
      return
    }
    if (!pdfBillList) {
      setError(true)
      setErrorMessage("SELECT MIS FORMAT AND PDF FORMAT")
      return
    }
    handleExcelDownload(misformat1, invoicedata1, invoiceDate1);
    handleDownloadPdf();
  };

  return (
    <div className="TransferReport-form Scroll-Style-hide">
      <form >
        <div className="detail-container-main detail-container-main-tfreport">
          <div className="container-left-transfer-report">
            <div className="copy-title-btn-TransferReport">
              <div className="input-field input-field-transfer-report">
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faTags} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="GroupTrip Id"
                    name="referenceno"
                    autoComplete='off'
                    value={groupTripid}
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Invoice No"
                    value={invoiceno}
                    name="invoiceno"
                    autoComplete='off'
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    options={MISformat?.map((option) => ({
                      label: option?.Option,
                    }))}
                    onChange={(event, value) => setMisformat(value?.label)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="MIS Format" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Month"
                        name="month"
                        value={date}
                        format="MMMM YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <HailOutlinedIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="free-solo-demo"
                    label="Organization"
                    value={customer}
                    name="customer"
                    autoComplete='off'
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <PiMoneyBold color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Rate Type"
                    value={ratetypeforpage}
                    name="ratetype"
                    autoComplete='off'
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="Invoice Date"
                    value={invoiceDate}
                    name="Billdate"
                    autoComplete='off'
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="From Date"
                    value={fromDate}
                    name="fromdate"
                    autoComplete='off'
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <CalendarMonthIcon color="action" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    label="To Date"
                    value={endDate}
                    name="todate"
                    autoComplete='off'
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faBuilding} size="xl" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={servicestation || (tripData.length > 0 ? tripData[0].department : '') || ''}
                    options={stationName.map((option) => ({
                      label: option.Stationname,
                    }))}
                    onChange={(event, value) => handleserviceInputChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="Stations" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    options={PDFbill.map((option) => ({
                      label: option.Option,
                    }))}
                    value={pdfBillList}
                    onChange={(event, value) => setPdfBillList(value.label)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="PDF Bill" inputRef={params.inputRef} />
                      );
                    }}
                  />
                </div>
                <div className="input input-transfer-report" >
                  <FormControlLabel
                    value="bookingmail"
                    control={
                      <Checkbox
                        size="small"
                      />
                    }
                    label="Booking Mail"
                  />
                </div>
                <div className="input input-transfer-report" >
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Invoice With
                    </FormLabel>
                    <FormControlLabel
                      value="Normal"
                      control={
                        <Checkbox
                          size="small"
                        />
                      }
                      label="Normal"
                    />
                    <FormControlLabel
                      value="Luxury"
                      control={
                        <Checkbox
                          size="small"
                        />
                      }
                      label="Luxury"
                    />
                  </FormControl>
                </div>
                <div className="input input-transfer-report" >
                  <div className="Download-btn">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                            Download
                          </Button>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={() => handleExcelDownload(misformat, invoicedata, invoiceDate)}>Excel</MenuItem>
                            <MenuItem onClick={handleDownloadPdf}>PDF</MenuItem>
                            <MenuItem onClick={() => handleBothDownload(misformat, invoicedata, invoiceDate)}>Both</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </div>
                </div>
              </div>
            </div>
            {/* normal invoice */}
            <Dialog open={pbpopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Reportinvoice
                  organizationdata={organizationdata}
                  routedData={routedData}
                  selectedImage={selectedImage}
                  routeData={routeData}
                  roundedAmount={roundedAmount}
                  sumTotalAndRounded={sumTotalAndRounded}
                  totalValue={totalValue}
                  organizationaddress1={organizationaddress1}
                  organizationaddress2={organizationaddress2}
                  organizationcity={organizationcity}
                  organizationgstnumber={organizationgstnumber}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* booking mail dialog box */}
            <Dialog open={popupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Mailpdf attachedImage={attachedImage} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* mapinnvoice */}
            <Dialog open={npopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Mapinvoice />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* luxuryinvoice */}
            <Dialog open={lxpopupOpen} onClose={handlePopupClose}>
              <DialogContent>
                <Luxuryinvoice />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePopupClose} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="Download-btn">
          <div className="input-field">
            <div className="input" >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                      Download ZIP
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      {/* <MenuItem onClick={handleExcelDownload}>Excel</MenuItem> */}
                      <MenuItem onClick={() => handledatazipDownload(misformat, pdfzipdata, invoiceDate, customer, organizationsdetail1, imageorganisation, rowSelectionModel)}>  ZIP </MenuItem>
                      {/* <MenuItem onClick={handleDownloadZippdf}> PDF ZIP</MenuItem> */}
                      {/* <MenuItem onClick={handlePdfDownload}>ZIP</MenuItem> */}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <div className="input">
              <Button variant="outlined">Remove</Button>
            </div>
          </div>
        </div>
        <div className="billing-tables-TransferReport">
          <div className="table-bookingCopy-TransferReport">
            <div className='transfer-report-table'>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                  handleRowSelection(newRowSelectionModel);
                }}
                checkboxSelection
                disableRowSelectionOnClick
                selectionModel={rowSelectionModel}
              />
            </div>
          </div>
          <div className="tripsheet-table-transferReport">
            {/* <div className="TransferReport-Box">
              <div className="booking-update">
                <div className="Scroll-Style" style={{ overflow: 'scroll', height: 300, width: "100%" }}>
                  <table>
                    <thead id="update-header">
                      <tr>
                        <th>TripSheet No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={6}>No data available.</td>
                        </tr>
                      ) : (
                        rows.map((rows) => (
                          <tr id='update-row' key={rows.tripid} >
                            <td>TS {rows.tripid}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
          </div>
          <div className='alert-popup-main'>
            {error &&
              <div className='alert-popup Error'>
                <div className="popup-icon"><ClearIcon /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                <p>{errorMessage}</p>
              </div>
            }
            {error1 &&
              <div className='alert-popup Error'>
                <div className="popup-icon"><ClearIcon /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                <p>{errormessage1}</p>
              </div>
            }
            {success &&
              <div className='alert-popup Success'>
                <div className="popup-icon"><FileDownloadDoneIcon /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                <p>{successMessage}</p>
              </div>
            }
            {warning &&
              <div className='alert-popup Warning' >
                <div className="popup-icon"> <ErrorOutlineIcon /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                <p>{warningMessage}</p>
              </div>
            }
          </div>
        </div>
        <Modal
          open={pdfPrint}
          onClose={handlePopup}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '854px',
              height: '700px',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              overflowY: 'auto'
            }}
          >
            <PdfParticularData addressDetails={addressDetails} particularPdf={particularPdf} organisationdetail={organizationsdetail1} imagename={imageorganisation} tripno={tripno} />
          </Box>
        </Modal>
      </form>
    </div>
  )
}

export default TransferReport