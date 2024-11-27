import React, { useEffect, useState, useContext } from 'react';
import dayjs from "dayjs";
import "./GroupBilling.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from "@mui/material";
import { Menu, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { APIURL } from '../../../url';
import { useData } from '../../../Dashboard/MainDash/Sildebar/DataContext2';
import axios from 'axios';
// ICONS
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { faBuilding, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import useGroupbilling from './useGroupbilling';
import { RefPdfData } from './GroupBillingContext';
import RefPdfParticularData from './RefPdfParticularData';
import { PermissionContext } from '../../../context/permissionContext';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LoadingButton from '@mui/lab/LoadingButton';

const GroupBilling = ({ stationName, organizationNames }) => {
    const apiurl = APIURL;
    const {
        rows,
        actionName,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleClick,
        hidePopup,
        invoiceno,
        setInvoiceno,
        selectedCustomerDatas,
        customer,
        tripData,
        setCustomer,
        Billingdate,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        columns,
        setRowSelectionModel,
        rowSelectionModel,
        handleRowSelection,
        handlegroupData,
        handleButtonClickTripsheet,
        referenceNo,
        handleKeyDown,
        handleGstPdf,
        handlePopup,
        refPdfData,
        refFromDate,
        refToDate,
        gstno,
        setGstno,
        handleRemoveData,
        viewGroupBill,
        setBillingDate,
        setServiceStation,
        stateDetails,
        setStateDetails,
        billingGroupDetails,
        setBillingGroupDetails,
        handlecustomer,
        disabeldata,
        handleInvoicegenerate,referInvoiceno,setReferINVOICENO,isSaveload , setisSaveload,isgroupEditload , setisGfoupEditload,isBllload , setisBillload
    } = useGroupbilling();


    const { refPdfPrint, refCustomer, referNo } = RefPdfData()
    const [organizationsdetail, setOrganizationDetail] = useState([]);
    const [imageorganisation, setSelectedImageorganisation] = useState(null);
    const { sharedData } = useData();
    const [customerData, setCustomerData] = useState([]);
    const [stationData, setStationData] = useState([])
    const apiUrl = APIURL

    //  get station and customer details
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
      }, [apiUrl, customer])



    useEffect(() => {
        const fetchStateDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/statedetails`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch state details');
                }

                const data = await response.json();
                setStateDetails(data);

                console.log(data, 'State details fetched');
            }
            catch (err) {
                // setError(err.message); // Handle errors
                console.error('Error fetching state details:', err);
            }
        };
        fetchStateDetails();
    }, [customer]);

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
                const response = await fetch(`${apiurl}/organisationpdfdata`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const organizationdetails = await response.json();
                setOrganizationDetail(organizationdetails)

            } catch (err) {
                console.error('Error fetching customer address:', err);
            }
        };

        fetchdata();
    }, [apiurl, customer]);


    useEffect(() => {
        const fetchData = async () => {
            const customer = refCustomer[0]
            if (refCustomer !== "") {
                try {
                    const response = await axios.get(`${apiUrl}/gstdetails/${customer}`);
                    setGstno(response.data)
                } catch (error) {
                    console.error('Errorgst', error);
                    throw error;
                }
            }
        }

        fetchData()
    }, [apiUrl, refCustomer, setGstno])

    // get billingGroupDetailss
    useEffect(() => {
        if (gstno[0]?.billingGroup !== "") {
            const fetchData = async () => {
                const billingGroupCustomer = gstno[0]?.billingGroup
                console.log('GroupBillCustomer', billingGroupCustomer);
                try {
                    const response = await axios.get(`${apiUrl}/gstdetails/${billingGroupCustomer}`);
                    console.log(response.data, 'response data');
                    setBillingGroupDetails(response.data)
                }
                catch (error) {
                    console.log(error, 'error');

                }
            }
            fetchData()
        }
    }, [apiUrl, refCustomer, gstno])

    // Permission ------------
    const { permissions } = useContext(PermissionContext)
    const CoveringBill_read = permissions[7]?.read;
    const CoveringBill_new = permissions[7]?.new;
    const CoveringBill_delete = permissions[7]?.delete;

    useEffect(() => {
        if (viewGroupBill && viewGroupBill.length > 0) {
            const firstBill = viewGroupBill[0];
            console.log(firstBill,"ll")
            setReferINVOICENO(firstBill.InvoiceNo)
            setBillingDate(dayjs(firstBill.InvoiceDate, "YYYY-MM-DD"));
            setCustomer(firstBill.Customer);
            setFromDate(dayjs(firstBill.FromDate, "YYYY-MM-DD"));
            setToDate(dayjs(firstBill.ToDate, "YYYY-MM-DD"));
            setServiceStation(firstBill.State)
            handleDateChange(dayjs(firstBill.InvoiceDate, "DD-MM-YYYY"), 'Billingdate');
        }
    }, [viewGroupBill]);
  
  
    return (
        <div className="main-content-form Scroll-Style-hide">
            <form >
                <div className="detail-container-main-groupbilling">
                    <div className="container-left-groupbilling">
                        <div className="copy-title-btn-GroupBilling">
                            <div className="input-field inputfeild-group-billing">
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-ReferenceNo"
                                        className="full-width"
                                        freeSolo
                                        size="small"
                                        // value={invoiceno || book.invoiceno || selectedCustomerDatas.invoiceno || ''}
                                        inputValue={invoiceno || book.invoiceno || selectedCustomerDatas.invoiceno || ''}
                                        options={referenceNo || []}
                                        onInputChange={(event, newInputValue) => setInvoiceno(newInputValue)}
                                        onChange={(event, newValue) => setInvoiceno(newValue || '')}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Reference No" name="ReferenceNo" inputRef={params.inputRef} />
                                        )}
                                        onKeyDown={handleKeyDown}
                                    />

                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <HailOutlinedIcon color="action" />
                                    </div>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-customer"
                                        className='full-width'
                                        freeSolo
                                        size="small"
                                        value={customer || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '') || ''}
                                        options={organizationNames}
                                        disabled={disabeldata}
                                        // onChange={(event, value) => setCustomer(value)}
                                        // onChange={handlecustomer}
                                           onChange={(event, value) => handlecustomer(value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Organization" name='customer' inputRef={params.inputRef} />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                id="Billingdate"
                                                className='full-width'
                                                label="Bill Date"
                                                name="Billingdate"
                                                disabled={disabeldata}
                                                value={
                                                    Billingdate ||
                                                    (viewGroupBill?.InvoiceDate ? dayjs(viewGroupBill.InvoiceDate) : null) ||
                                                    (selectedCustomerDatas?.Billingdate ? dayjs(selectedCustomerDatas.Billingdate) : null)
                                                }
                                                format="DD/MM/YYYY"
                                                onChange={(newValue) => handleDateChange(newValue, 'Billingdate')}

                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="input" >
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                id="fromdate"
                                                className='full-width'
                                                label="From Date"
                                                value={selectedCustomerDatas.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate || ''}
                                                format="DD/MM/YYYY"
                                                onChange={(date) => {
                                                    handleDateChange(date, 'fromdate');
                                                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                                                    setFromDate(parsedDate);
                                                }}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.fromdate} />
                                                )}
                                            </DatePicker>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="input">
                                    <div className="icone">
                                        <CalendarMonthIcon color="action" />
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                value={selectedCustomerDatas.todate ? dayjs(selectedCustomerDatas.todate) : toDate || ''}
                                                format="DD/MM/YYYY"
                                                id="todate"
                                                className='full-width'
                                                label="To Date"
                                                onChange={(date) => {
                                                    handleDateChange(date, 'todate');
                                                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                                                    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
                                                    setToDate(parsedDate);
                                                }}
                                            >
                                                {({ inputProps, inputRef }) => (
                                                    <TextField {...inputProps} inputRef={inputRef} value={selectedCustomerDatas?.todate} />
                                                )}
                                            </DatePicker>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="input" >
                                    <div className="icone">
                                        <FontAwesomeIcon icon={faBuilding} size="xl" />
                                    </div>
                                    {/* <Autocomplete
                                        fullWidth
                                        id="freestation"
                                        className='full-width'
                                        freeSolo
                                        size="small"
                                        // value={servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || ''}
                                        value={servicestation || selectedCustomerDatas.station}
                                        options={stationName.map((option) => ({
                                            label: option.Stationname,
                                        }))}
                                        onChange={(event, value) => handleserviceInputChange(event, value)}
                                        renderInput={(params) => {
                                            return (
                                                <TextField {...params} label="Stations" name='station' inputRef={params.inputRef} />
                                            );
                                        }}
                                    /> */}
                                       <TextField
                      size="small"
                       id="freet-station"
                      className='full-width'
                    
                      label="State" 
                      name='station'
                      value={servicestation || ""}
  
                      autoComplete='off'
                    />
                                </div>
                                { referInvoiceno === "created" ? <></> :
                                <div className="input">
                                    <Button variant="contained" disabled={!CoveringBill_read} onClick={() => handleShow()} >View Bill</Button>
                                </div>
}
                                {invoiceno && disabeldata &&  referInvoiceno != "created" && (

                                <div className="input">
                                    {/* <Button variant="contained" disabled={!CoveringBill_read} 
                                     onClick={() => handleInvoicegenerate()} >Bill Generate</Button> */}
                                      <LoadingButton loading={isBllload} variant="contained" disabled={!CoveringBill_read} 
                                     onClick={() => handleInvoicegenerate()} >Bill Generate</LoadingButton>
                                </div>)}
                            </div>
                            {/* <div className="input-field">
                                <div className="input">
                                    <Button variant="contained" disabled={!CoveringBill_read} onClick={handleShow} >View Bill</Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="download-container-groupbilling">
                    <div className="Download-btn">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button variant="contained" disabled={!CoveringBill_read} endIcon={<ExpandCircleDownOutlinedIcon />} {...bindTrigger(popupState)}>
                                        Download
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={handleExcelDownload}>Excel</MenuItem>
                                        <MenuItem onClick={handleGstPdf}>GST PDF</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                    <div className="input-field">
                   
                    {invoiceno && customer ? <div className="input">
                            {/* <Button variant="contained" disabled={!CoveringBill_new} onClick={handlegroupData}>Edit</Button> */}
                            <LoadingButton loading={isSaveload} variant="contained" disabled={!CoveringBill_new} onClick={handlegroupData}>Edit</LoadingButton>
                        </div>:<div className="input">
                            {/* <Button variant="contained" disabled={!CoveringBill_new} onClick={handlegroupData}>Save</Button> */}
                            <LoadingButton loading={isSaveload} variant="contained" disabled={!CoveringBill_new} onClick={handlegroupData}>Save</LoadingButton>
                        </div>}
                        
                        {/* <div className="input">
                            <Button variant="contained" disabled={!CoveringBill_new} onClick={handlegroupData}>Save</Button>
                        </div> */}
                        { referInvoiceno === "created" ? <></> :
                        <div className="input" >
                            <Button variant="contained" disabled={!CoveringBill_delete} onClick={handleRemoveData} >Remove</Button>
                        </div>
}
                    </div>
                </div>
                <div className="table-bookingCopy-GroupBilling">
                    <div className='group-billing-table'>
                        {/* <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            onRowClick={handleButtonClickTripsheet}
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                                handleRowSelection(newRowSelectionModel);
                            }}
                            selectionModel={rowSelectionModel}
                            getRowId={(row) => row.id}
                            checkboxSelection
                            disableRowSelectionOnClick
                        /> */}

                        <Box
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
                                onRowClick={handleButtonClickTripsheet}
                                onRowSelectionModelChange={(newRowSelectionModel) => {
                                    setRowSelectionModel(newRowSelectionModel);
                                    handleRowSelection(newRowSelectionModel);
                                }}
                                selectionModel={rowSelectionModel}
                                getRowId={(row) => row.id}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </div>
                    <div className='alert-popup-main'>
                        {error &&
                            <div className='alert-popup Error' >
                                <div className="popup-icon"> <ClearIcon /> </div>
                                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
                                <p>{errorMessage}</p>
                            </div>
                        }
                        {success &&
                            <div className='alert-popup Success' >
                                <div className="popup-icon"> <FileDownloadDoneIcon /> </div>
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
                    open={refPdfPrint}
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
                        <RefPdfParticularData pdfData={refPdfData} organizationdetails={organizationsdetail} imagename={imageorganisation} refFromDate={refFromDate} refToDate={refToDate} gstno={gstno} billingGroupData={billingGroupDetails} referenceno={referNo} Branchstate={stateDetails} customerData={customerData} stationData={stationData} />
                    </Box>
                </Modal>
            </form>
        </div>
    )
}

export default GroupBilling