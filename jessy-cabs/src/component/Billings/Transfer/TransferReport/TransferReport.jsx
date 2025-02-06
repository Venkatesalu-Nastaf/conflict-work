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
import dayjs from "dayjs";
import { pdf } from '@react-pdf/renderer';
import PdfContent2 from './PdfContent2';
import { useData } from "../../../Dashboard/MainDash/Sildebar/DataContext2"
import PdfParticularData from './PdfParticularData';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
//for popup
import ClearIcon from '@mui/icons-material/Clear';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import axios from 'axios';
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
import { CircularProgress } from '@mui/material';
import { GiConsoleController } from 'react-icons/gi';
import LoadingButton from '@mui/lab/LoadingButton';
import Backdrop from '@mui/material/Backdrop';
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
    pdfzipdata,
    handleKeyDown,
    handleChange,
    tripID,
    handleGroupKeyDown,
    setGroupTripid,
    // handleRemove,
    billedStatusCheck,
    setBilledStatusCheck,
    loading,
    setLoading,
    billingGroupDetails,
    setBillingGroupDetails,
    setServiceStation,
    isButtonloading,
    setisButtonLoading
  } = useTransferreport();
  const {
    handleExcelDownload, error1, errormessage1,
    handledatazipDownload } = useExeclpage()
  const [invoicedata, setInvoicedata] = useState([])
  const [addressDetails, setAddressDetails] = useState([])
  const apiUrl = APIURL;
  const [organizationsdetail1, setOrganisationDetail] = useState([]);
  const { logo } = useData();
  const [particularPdf, setParticularPdf] = useState([])
  const [imageorganisation, setSelectedImageorganisation] = useState(null);
  const [tripno, setTripno] = useState('')
  const { pdfPrint, setPdfPrint, billGenerate, setBillGenerate } = PdfData()
  const [billId, setBillId] = useState()
  const [stateDetails, setStateDetails] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [stationData, setStationData] = useState([])
  const [isPdfloading, setIsPdfloading] = useState(false)

  // useEffect(() => {
  //   setSelectedImageorganisation(sharedData)
  // }, [sharedData])

  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  }, [actionName, handleClick]);

  const CustomNoRowsOverlay = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <div></div>
    </Box>
  );



  useEffect(() => {
    const fetchdata = async () => {
      try {

        if (!customer) return

        const response = await axios.get(`${apiUrl}/customeraddress/${customer}`);

        const addressdetail = await response.data;
        console.log(addressDetails, 'addressdetails');

        setAddressDetails(addressdetail);
      } catch (err) {
        console.error('Error fetching customer address:', err);
      }
    };

    fetchdata();

  }, [apiUrl, customer, groupTripid, pdfBillList]);


  useEffect(() => {
    const fetchStateDetails = async () => {
      try {
        // const response = await fetch('http://localhost:8081/statedetails')API URL
        const response = await fetch(`${apiUrl}/statedetails`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch state details');
        }

        const data = await response.json();
        setStateDetails(data); // Save the retrieved state details in state

        console.log(data, 'State details fetched'); // Log the fetched data
      } catch (err) {
        setError(err.message); // Handle errors
        // console.error('Error fetching state details:', err); // Log the error for debugging
      }
    };



    fetchStateDetails(); // Call the fetch function when the component mounts

  }, [customer]); // Empty dependency array ensures this runs once on mount




  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${apiUrl}/organisationpdfdata`);
        // console.log(response,'response');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const organizationdetails = await response.json();
        setOrganisationDetail(organizationdetails)

        // console.log(organizationdetails,"Organization detauillsssss")


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
        // const customer = decodeURIComponent(storedCustomer);
        // const trip = tripID?.join(',')

        // if (!customer || !tripid) return

        const response = await fetch(
          `${apiUrl}/newtripsheetcustomertripid/${encodeURIComponent(customer)}/${tripID}`);


        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json();
        console.log(tripData, 'tripdata');

        setBillId(tripData)
        setInvoicedata(tripData)
        if (tripData.length > 0) {
          setisButtonLoading(false)
          return
        }
      }
      catch (err) {
        console.log(err, 'triperr');
      }
    }
    fetchData()
  }, [apiUrl, billGenerate, misformat])

  useEffect(() => {
    if (addressDetails[0]?.billingGroup !== "") {
      const fetchData = async () => {
        const billingGroupCustomer = addressDetails[0]?.billingGroup
        console.log('GroupBillCustomer', billingGroupCustomer);
        try {
          const response = await axios.get(`${apiUrl}/gstdetails/${billingGroupCustomer}`);
          console.log(response.data, 'common state response data');
          setBillingGroupDetails(response.data)
        }
        catch (error) {
          console.log(error, 'error')

        }
      }
      fetchData()
    }
  }, [apiUrl, groupTripid, pdfBillList, addressDetails, billGenerate])

  useEffect(() => {
    if (pdfBillList === "PDF 1" || pdfBillList === "PDF 2") {
      setBillGenerate(!billGenerate)
    }
  }, [pdfBillList])

  const invoicenoCheck = invoiceno[0] === null || invoiceno[0] === undefined || invoiceno === "" || invoiceno[0] === "";

  const handleDownloadPdf = async () => {

    console.log(addressDetails[0]?.state, 'address details of ')
    if (groupTripid === "" || groupTripid === null || groupTripid === undefined) {
      setError(true)
      setErrorMessage(" Group Trip ID is empty")
      return
    }
    if (invoiceno === "" || invoiceno === null || invoiceno === undefined) {
      setError(true)
      setErrorMessage("Invoice No is empty")
      return
    }
    if (tripData === " ") {
      setError(true)
      setErrorMessage("Data's Empty")
      return
    }

    // const commonState = stateDetails.find(item => 
    //     item.state === addressDetails[0].state


    // );
    // console.log(stateDetails,"State details ")
    // console.log(commonState, "Common State");
    // console.log(commonState.length, "Common State Length");

    //   const commonState = stateDetails?.find(item => 
    //     item.state === addressDetails[0]?.state;
    //     setComparisonResult(commonState)
    // );

    // const commonState = stateDetails?.find(item => item.state === addressDetails[0]?.state);
    console.log(billingGroupDetails, 'common state====');
    console.log(stateDetails, 'common all state');


    const commonStates = stateDetails?.filter(item => item.state === addressDetails[0]?.state) || [];
    const groupBillingMatchState = stateDetails?.filter(item => item.state === billingGroupDetails[0]?.state) || [];
    console.log(commonStates, 'common all state', groupBillingMatchState, addressDetails);
    const commonState = billingGroupDetails.length > 0 ? groupBillingMatchState : commonStates

    console.log(commonState, 'common state', 'common state ', organizationsdetail1);
    console.log(groupBillingMatchState, 'groupmatching', commonStates);

    // console.log(stateDetails, "State details");
    // console.log(commonState, "Common State",commonState.length);

    // Check if commonState exists and log its "length"
    // console.log(commonState ? 1 : 0, "Common State Length");



    if (!pdfBillList) {
      setError(true)
      setErrorMessage('Select PDF Format')
      return
    }

    else if (pdfBillList === "PDF 1") {
      if (invoicedata === "" || invoicedata === null || invoicedata === undefined) {
        setError(true)
        setErrorMessage("Invoice Data is empty")
        return
      }
      const fileName = `${invoiceno} ${pdfBillList}.pdf`;
      const blob = await pdf(<PdfPage logo={logo} invdata={invoicedata} invoiceno={invoiceno} invoiceDate={invoiceDate} groupTripid={groupTripid} customeraddress={addressDetails} customer={customer} organisationdetail={organizationsdetail1} imagedata={imageorganisation} commonStateAdress={commonState} billingGroupDetails={billingGroupDetails} customerData={customerData} stationData={stationData} />).toBlob();
      saveAs(blob, fileName);
      localStorage.removeItem("selectedcustomerdata");
      localStorage.removeItem("selectedtripsheetid");
      // console.log( commonState,'Address for output')
      setComparisonResult(commonState);
    }
    else if (pdfBillList === "PDF 2") {
      console.log(pdfBillList, 'pdfBilllist');

      if (invoicedata === "" || invoicedata === null || invoicedata === undefined) {
        console.log(pdfBillList, 'pdfBilllist22');

        setError(true)
        setErrorMessage("Invoice Data is empty")
        return
      }
      console.log(pdfBillList, 'pdfBilllist22');
      console.log('checking', invoiceno, pdfBillList);

      const fileName = `${invoiceno} ${pdfBillList}.pdf`;
      const blob = await pdf(<PdfContent2 logo={logo} invdata={invoicedata} invoiceDate={invoiceDate} customeraddress={addressDetails} invoiceno={invoiceno} customer={customer} fromDate={fromDate} enddate={endDate} organisationname={organizationsdetail1} imagename={imageorganisation} commonStateAdress={commonState} billingGroupDetails={billingGroupDetails} customerData={customerData} stationData={stationData} />).toBlob();
      saveAs(blob, fileName);
      localStorage.removeItem("selectedcustomerdata");
      localStorage.removeItem("selectedtripsheetid");
    }

  }

  const handlePopup = () => {
    setPdfPrint(false)
  }

  const columns = [
    { field: "id", headerName: "Sno", width: 100 },
    { field: "vcode", headerName: "VCode", width: 200 },
    { field: "guestname", headerName: "Guest Name", width: 200 },
    { field: "tripid", headerName: "Trip No", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    // { field: "view", headerName: "View", width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(customer, 'customer =====');

        const response = await axios.get(`${apiUrl}/customerDetailsAndGroupBillingDetails/${customer}`)
        console.log(response.data, 'customer response');
        const data = response.data;
        const customerDetails = data.customerDetails;
        const stationDetails = data.customerStations;


        setCustomerData(customerDetails)
        setStationData(stationDetails)

      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [apiUrl, customer, misformat, pdfBillList])


  // const handleButtonClick = async (params) => {
  //   setPdfPrint(true)
  //   const { tripid, customer } = params.row;
  //   setTripno(tripid)
  //   const response = await fetch(`${apiUrl}/tripsheetcustomertripid/${customer}/${tripid}`);
  //   const pdfdetails = await response.json()
  //   setParticularPdf(pdfdetails)

  // };

  // Changes with loading untill all data fetch  
  const handleButtonClick = async (params) => {
    setIsPdfloading(true); // Start the loading screen

    const { tripid, customer } = params.row;
    setTripno(tripid);

    try {
      const response = await fetch(`${apiUrl}/tripsheetcustomertripid/${customer}/${tripid}`);
      const pdfdetails = await response.json();
      setParticularPdf(pdfdetails);
      setPdfPrint(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsPdfloading(false);
    }
  };

  const handleBothDownload = (misformat1, invoicedata1, invoiceDate1,customerData) => {    
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
    handleExcelDownload(misformat1, invoicedata1, invoiceDate1,customerData);
    handleDownloadPdf();
  };
  const tripheaderIndex = pdfzipdata?.map(li => li?.tripid)

  return (

    <div className="TransferReport-form main-content-form Scroll-Style-hide">

      <form >
        <div className="detail-container-main detail-container-main-tfreport">
          <div className="container-left-transfer-report">
            <div className="copy-title-btn-TransferReport">
              {/* <Backdrop
    open={isPdfloading}
    sx={{
      // zIndex: 9999, // Ensures it appears above all elements
      color: '#fff',
      position: 'fixed', // Ensures it covers the entire screen
      backgroundColor: 'rgba(0, 0, 0, 0.9)', // Darker background with high opacity
      display: 'flex', // Centers the spinner
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </Backdrop> */}
              <Backdrop
                open={isPdfloading}
                sx={{
                  zIndex: 9999,
                  color: '#fff',
                  position: 'fixed',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <CircularProgress />
                </div>
              </Backdrop>

              <div className="input-field input-field-transfer-report">
                <div className="input input-transfer-report" >

                  <div className="icone">
                    <FontAwesomeIcon icon={faTags} size="lg" />
                  </div>
                  <TextField
                    size="small"
                    id="id"
                    className='full-width'
                    label="Group Trip ID"
                    name="referenceno"
                    autoComplete='off'
                    onKeyDown={handleGroupKeyDown}
                    onChange={(e) => setGroupTripid(e.target.value)}
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
                    className='full-width'
                    label="Invoice No"
                    value={invoiceno}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
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
                    className='full-width'
                    freeSolo
                    size="small"
                    options={MISformat?.map((option) => ({
                      label: option?.Option,
                    }))}
                    // onChange={(event, value) => setMisformat(value?.label)}
                    onChange={(event, value) => {
                      setMisformat(value?.label)
                      setisButtonLoading(true);
                      // setTimeout(() => {
                      //   setisButtonLoading(false);
                      // }, 3000);
                    }}

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
                        className='full-width'
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
                    className='full-width'
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
                    className='full-width'
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
                    className='full-width'
                    label="Invoice Date"
                    // value={dayjs(invoiceDate).format('DD-MM-YYYY')}
                    value={invoiceDate ? dayjs(invoiceDate).format('DD/MM/YYYY') : ''}
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
                    className='full-width'
                    label="From Date"
                    // value={dayjs(fromDate).fo  rmat('DD-MM-YYYY')}
                    value={fromDate ? dayjs(fromDate).format('DD/MM/YYYY') : ''}
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
                    className='full-width'
                    label="To Date"
                    // value={dayjs(endDate).format('DD-MM-YYYY')}
                    value={endDate ? dayjs(endDate).format('DD/MM/YYYY') : ''}
                    name="todate"
                    autoComplete='off'
                  />
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faBuilding} size="xl" />
                  </div>

                  <TextField
                    size="small"
                    id="id"
                    className='full-width'
                    label="State"
                    // value={dayjs(endDate).format('DD-MM-YYYY')}
                    value={servicestation}
                    // onChange={(e)=>setServiceStation(e.target.value)}
                    name="State"
                    autoComplete='off'
                  />
                  {/* <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    className='full-width'
                    freeSolos
                    size="small"
                    value={servicestation || (tripData.length > 0 ? tripData[0].department : '') || ''}
                    options={stationName.map((option) => ({
                      label: option.Stationname,
                    }))}
                    onChange={(event, value) => handleserviceInputChange(event, value)}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="State" inputRef={params.inputRef} />
                      );
                    }}
                  /> */}
                </div>
                <div className="input input-transfer-report" >
                  <div className="icone">
                    <FontAwesomeIcon icon={faNewspaper} size="xl" />
                  </div>
                  <Autocomplete
                    fullWidth
                    id="free-solo-demo"
                    className='full-width'
                    freeSolo
                    size="small"
                    options={
                      invoicenoCheck
                        ? PDFbill?.filter(option => option.Option === "PDF 2").map(option => ({
                          label: option.Option,
                        }))
                        : PDFbill?.map(option => ({
                          label: option.Option,
                        }))
                    }
                    // options={ invoicenoCheck
                    //   ? PDFbill?.map(option => ({
                    //     label: option.Option,
                    //   })) : PDFbill?.filter(option => option.Option === "PDF 2").map(option => ({
                    //     label: option.Option,
                    //   }))

                    // }

                    value={pdfBillList}
                    // onChange={(event, value) => setPdfBillList(value?.label)}
                    onChange={(event, value) => {
                      setPdfBillList(value?.label);
                      setisButtonLoading(true);
                      // setTimeout(() => {
                      //   setisButtonLoading(false);
                      // }, 3000);
                    }}
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
                          {/* <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                            Download
                          </Button> */}
                          <LoadingButton loading={isButtonloading} variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                            Download
                          </LoadingButton>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={() => handleExcelDownload(misformat, invoicedata, invoiceDate, customerData)}>Excel</MenuItem>
                            <MenuItem onClick={() => handleDownloadPdf()}>PDF</MenuItem>
                            <MenuItem onClick={() => handleBothDownload(misformat, invoicedata, invoiceDate,customerData)}>Both</MenuItem>
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
            {billedStatusCheck === "Billed" ?
              <div className="input" >
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button variant="contained" endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                        Download ZIP
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        {/* <MenuItem onClick={handleExcelDownload}>Excel</MenuItem> */}
                        <MenuItem onClick={() => handledatazipDownload(tripheaderIndex, misformat, pdfzipdata, invoiceDate, customer, organizationsdetail1, logo, rowSelectionModel, customerData, stationData)}>  ZIP </MenuItem>
                        {/* <MenuItem onClick={handleDownloadZippdf}> PDF ZIP</MenuItem> */}
                        {/* <MenuItem onClick={handlePdfDownload}>ZIP</MenuItem> */}
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </div> : ""}
            {/* <div className="input">
              <Button variant="outlined" onClick={() => handleRemove()} >Remove</Button>
            </div> */}
          </div>
        </div>
        <div className="billing-tables-TransferReport">
          <div className="table-bookingCopy-TransferReport">
            <div className='transfer-report-table'>
              {/* <DataGrid
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
              /> */}

              {/* <Box
                sx={{
                  height: 400, // Adjust this value to fit your needs
                  '& .MuiDataGrid-virtualScroller': {
                    '&::-webkit-scrollbar': {
                      width: '8px', // Adjust the scrollbar width here
                      height: '8px', // Adjust the scrollbar width here
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#457cdc',
                      borderRadius: '20px',
                      minHeight: '60px', // Minimum height of the scrollbar thumb (scroll indicator)

                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: '#3367d6',
                    },
                  },
                }}
              >
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
              </Box> */}

              {/* code with loading  */}
              <Box
                sx={{
                  height: 400,
                  position: 'relative', // Make Box relative to position the spinner
                  '& .MuiDataGrid-virtualScroller': {
                    '&::-webkit-scrollbar': {
                      width: '8px',
                      height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#457cdc',
                      borderRadius: '20px',
                      minHeight: '60px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: '#3367d6',
                    },
                  },
                }}
              >
                {loading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1000, // Ensure the spinner is above other content
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
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
                  components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                  }}
                />
              </Box>


            </div>
          </div>
          {/* <div className="tripsheet-table-transferReport"> */}
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
          {/* </div> */}
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
              // border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              overflowY: 'auto'
            }}
          >
            <PdfParticularData logo={logo} customerData={customerData} stationData={stationData} addressDetails={addressDetails} particularPdf={particularPdf} organisationdetail={organizationsdetail1} imagename={imageorganisation} tripno={tripno} />
          </Box>
        </Modal>
      </form>
    </div>
  )
}

export default TransferReport