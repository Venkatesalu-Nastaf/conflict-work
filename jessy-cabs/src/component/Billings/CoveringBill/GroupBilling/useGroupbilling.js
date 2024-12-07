import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import ReactDOMServer from 'react-dom/server';
import Coverpdf from './coverpdf/Coverpdf';
import { saveAs } from 'file-saver';
// import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { APIURL } from "../../../url";
import { useLocation } from 'react-router-dom';
import { ReferenceNo } from './RefenceNo';
import { RefPdfData } from './GroupBillingContext';
import Excel from 'exceljs';

const useGroupbilling = () => {
    const apiUrl = APIURL;

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [tripData, setTripData] = useState("");
    const [customer, setCustomer] = useState("");
    const [toDate, setToDate] = useState(dayjs());
    const [Billingdate, setBillingDate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [invoiceno, setInvoiceno] = useState("");
    const [totalValue, setTotalValue] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [errorMessage, setErrorMessage] = useState({});
    const [roundedAmount, setRoundedAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState({});
    const [servicestation, setServiceStation] = useState("");
    const [sumTotalAndRounded, setSumTotalAndRounded] = useState('');
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [rowSelectedValues, setRowSelectedValues] = useState([])
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [groupBillId, setGroupBillId] = useState([])
    const location = useLocation()
    const [groupInvoice, setGroupInvoice] = useState(false)
    const [groupInvoiceNumber, setGroupInvoiceNumber] = useState('')
    const [groupInvoiceDate, setGroupInvoiceDate] = useState('')
    const [referenceNo, setReferenceNo] = useState([])
    const [particularId, setParticularId] = useState([])
    const [refInvNo, setRefInvNo] = useState('')
    const [refInvDate, setRefInvDate] = useState('')
    const [refPdfData, setRefPdfData] = useState([])
    const [refFromDate, setRefFromDate] = useState('')
    const [refToDate, setRefToDate] = useState('')
    const [gstno, setGstno] = useState('')
    const [selectedRow, setSelectedRow] = useState([])
    const { setRefPdfPrint, setRefCustomer, setReferNo } = RefPdfData()
    const [groupBillAmount, setGroupBillAmount] = useState(0)
    const [trips, setTrips] = useState(0)
    const [department, setDepartment] = useState('');
    const [referInvoiceno,setReferINVOICENO]=useState('')
    const [groupAmount, setGroupAmount] = useState(0)
    const [stateDetails, setStateDetails] = useState([]);
    const [disabeldata,setDisabelData]=useState(false);

    // Loading//

    const [isSaveload , setisSaveload] = useState(false);
    const [isgroupEditload , setisGfoupEditload] = useState(false)
    const [isBllload , setisBillload] = useState(false)
   
    const [billingGroupDetails, setBillingGroupDetails] = useState('')
    const [groupBillingData, setGroupBillingData] = useState([])
    const [viewGroupBill, setViewGroupBill] = useState({
        InvoiceDate: '',
        FromDate: '',
        ToDate: '',
        Customer: '',
        station: ''
    })
    const [refernceinvoice_no,setRefernceInvoice_no]=useState([])
    // popup------------------------------
    const hidePopup = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
    };
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        {
            field: groupInvoice ? "InvoiceNo" : "billingno",
            headerName: groupInvoice ? "Invoice No" : "Bill No",
            width: 150
        },
        { field: "InvoiceDate", headerName: "Invoice Date", width: 130 },
        { field: "tripid", headerName: "Trip No", width: 150 },
        { field: "customer", headerName: "Customer", width: 130 },
        { field: "vehRegNo", headerName: "Vehcile No", width: 150 },
        { field: "vehType", headerName: "Vehcile Type", width: 150 },
        { field: "totalkm1", headerName: "KMS", width: 130 },
        { field: "totaltime", headerName: "Hours", width: 130 },
        { field: "totaldays", headerName: "Days", width: 130 },
        { field: "duty", headerName: "Duty", width: 130 },
        { field: "advancepaidtovendor", headerName: "Advance", width: 150 },
        { field: "gst", headerName: "GST%", width: 130 },
        { field: "permit", headerName: "Permit", width: 150 },
        { field: "toll", headerName: "Toll", width: 150 },
        { field: "parking", headerName: "Parking", width: 150 },
        { field: "totalcalcAmount", headerName: "Net Amount", width: 130 },
        { field: "guestname", headerName: "UserName", width: 150 },
    ];



    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const parameterKeys = [
            "Tripid", "InvoiceNo", "InvoiceColumn", "InvoiceDate", "FromDate", "ToDate", "ReferenceNo"
        ];
        const formData = {};
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        const grouplist = formData.Tripid?.split(',')
        setGroupBillId(grouplist)
        setGroupInvoiceNumber(formData.InvoiceNo)
        setGroupInvoice(formData.InvoiceColumn)
        setGroupInvoiceDate(formData.InvoiceDate)
        setRefFromDate(formData.FromDate)
        setRefToDate(formData.ToDate)
    }, [location])


    useEffect(() => {
        const fetchData = async () => {

            try {
                const id = groupBillId
                if (!id || id?.length === 0) return

                const response = await fetch(`${apiUrl}/ParticularLists/${id}`)
                const tripData = await response.json();
                // setRows(tripData)
                // const transformedTripData = tripData.map(item => ({
                //     ...item,
                //     ...(groupInvoice && { InvoiceNo: groupInvoiceNumber }), // Include InvoiceNo only if groupInvoice is true
                //     ...{ InvoiceDate: groupInvoiceDate }
                // }));
                // Ensure trip ID is included in the data structure
                const transformedTripData = tripData.map(item => ({
                    ...item,
                    ...(groupInvoice && { InvoiceNo: groupInvoiceNumber }), // Include InvoiceNo only if groupInvoice is true
                    InvoiceDate: groupInvoiceDate,
                    tripid: item.tripid // Make sure tripid is included
                }));
                setRows(transformedTripData);


            }
            catch (err) {
                console.log(err, 'error');
            }
        }
        fetchData()
    }, [apiUrl, groupBillId, groupInvoice, groupInvoiceDate, groupInvoiceNumber])

    useEffect(() => {
        ReferenceNo()
            .then((data) => {
                if (data) {
                    const referenceNos = data.map(item => item.ReferenceNo);
                    setReferenceNo(referenceNos);
                } else {
                }
            })
            .catch(() => {
            });
    }, [referenceNo])


    useEffect(() => {
        if (error || success || warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning]);

    //------------------------------

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setSelectedCustomerDatas((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const [book, setBook] = useState({
        Billingdate: '',
        invoiceno: '',
        customer: '',
        fromdate: '',
        todate: '',
        station: '',
    });


    const calculateNetAmountSum = useCallback((data) => {
        return data.reduce((sum, item) => {
            const netAmountValue = parseFloat(item.netamount, 10);
            if (isNaN(netAmountValue) || !isFinite(netAmountValue)) {
                return sum;
            }
            return sum + netAmountValue;
        }, 0);
    }, []);
    const handleKeyDown = async (event) => {
        setGroupInvoice(true)
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const response = await axios.get(`${apiUrl}/GroupReference/${invoiceno}`);
                const response2 = await axios.get(`${apiUrl}/GroupReferenceforinvoiceno/${invoiceno}`);
                console.log(response2.data)
                const referncenoinvoiceno = response2.data
                if(referncenoinvoiceno.length>0){
                setRefernceInvoice_no(referncenoinvoiceno)
                }
                else{
                    setRefernceInvoice_no([])  
                }
                const GroupReference = response.data;
                if(GroupReference.length > 0){
                console.log(GroupReference, 'GroupBill=====');
                setDisabelData(true)
             
                setViewGroupBill(response.data)
                // setRows(GroupReference)
                // const RefId = GroupReference.map((li) => li.Trip_id)
                // setParticularId(RefId)
                const RefId = GroupReference.map((li) => li.Trip_id.split(','));
                console.log(RefId, 'idddddddddd');

                setParticularId(RefId.flat());
                const RefInvoiceNo = GroupReference.map((li) => li.InvoiceNo)
                setRefInvNo(RefInvoiceNo)
                const RefInvDate = GroupReference.map((li) => li.InvoiceDate)
                setRefInvDate(RefInvDate)
                const ReferenceNo = GroupReference.map((li) => li.ReferenceNo)
                setReferNo(ReferenceNo)
                const fromdate = GroupReference.map((li) => li.FromDate)
                setRefFromDate(fromdate)
                const todate = GroupReference.map((li) => li.ToDate)
                setRefToDate(todate)
                const Amount = GroupReference.map((li) => li.Amount)
                setGroupAmount(Amount)
                }
                else{
                    setDisabelData(false) 
                    setRows([]);
                     setError(true);
                    setErrorMessage("No data found");
                }
               
                // const Tripsid = GroupReference.map((li) => li.Trip_id)
            }
            catch (err) {
                console.log("error", err)
            }
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            const id = particularId;

            try {
                if (!id || id?.length === 0) return
                const Tripresponse = await axios.get(`${apiUrl}/ParticularLists/${id}`);
                const TripDetails = await Tripresponse.data;
                const invoiceMap = refernceinvoice_no.reduce((map, invoice) => {
                    map[invoice.Tripid] = invoice.Invoice_No;
                    return map;
                  }, {});
        
               let RefTripDetails =[]
               if(refernceinvoice_no.length > 0){
                 RefTripDetails = TripDetails.map(item => ({
                    ...item,
                    // ...(groupInvoice && { InvoiceNo: refInvNo }),
                    ...(groupInvoice && { InvoiceNo: invoiceMap[item.tripid] }),
                    ...{ InvoiceDate: refInvDate }
                }));
            }
            else{
                 RefTripDetails = TripDetails.map(item => ({
                    ...item,
                    ...(groupInvoice && { InvoiceNo: refInvNo }),
                    // ...(groupInvoice && { InvoiceNo: invoiceMap[item.tripid] }),
                    ...{ InvoiceDate: refInvDate }
                }));
            }
                setRows(RefTripDetails)
                setSuccess(true)
                setSuccessMessage("Successfully Listed")
            } catch (error) {
                console.error('Error fetching Trip data:', error);
            }
        };

        fetchData();

        // No cleanup function needed in this case
    }, [particularId, apiUrl, refInvDate, refInvNo]);

    // const handleShow = useCallback(async () => {

    // if (!customer) {
    //     setError(true)
    //     setErrorMessage('Select a Orgaization')
    //     return
    //   } 


    //     setGroupInvoice(false);

    //     const servicestationValue = servicestation || selectedCustomerDatas?.station || (tripData.length > 0 ? tripData[0].department : '');

    //     // Corrected condition
    //     if (servicestation !== "" ) {

    //         // Call the Group-Billing API
    //         try {
    //             const customerValue = encodeURIComponent(customer || selectedCustomerDatas?.customer || (tripData.length > 0 ? tripData[0].customer : ''));
    //             const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
    //             const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
    //             console.log(customerValue,fromDateValue,toDateValue,servicestationValue,'groupbill');

    //             const response = await axios.get(`${apiUrl}/Group-Billing`, {
    //                 params: {
    //                     customer: customerValue,
    //                     fromDate: fromDateValue,
    //                     toDate: toDateValue,
    //                     servicestation: servicestationValue
    //                 },
    //             });

    //             const data = response.data;

    //             if (Array.isArray(data) && data.length > 0) {
    //                 setRows(data);
    //                 const netAmountSum = calculateNetAmountSum(data);
    //                 setTotalValue(netAmountSum);

    //                 const roundedGrossAmount = Math.ceil(netAmountSum);
    //                 const roundOff = roundedGrossAmount - netAmountSum;
    //                 const roundOffValue = roundOff.toFixed(2);
    //                 setRoundedAmount(roundOffValue);

    //                 const sumTotalAndRounded = netAmountSum + parseFloat(roundOffValue);
    //                 setSumTotalAndRounded(sumTotalAndRounded);

    //                 setTripData(data);
    //                 setSuccess(true);
    //                 setSuccessMessage("Successfully listed");
    //             } else {
    //                 setRows([]);
    //                 setError(true);
    //                 setErrorMessage("No data found11");
    //             }
    //         } 
    //         // catch {
    //         //     setRows([]);
    //         //     setError(true);
    //         //     setErrorMessage("Please fill All Fields");
    //         // }
    //         catch (error) {
    //             // console.error("Error occurredddddd:", error);

    //             // Check if there's no response, indicating a network error
    //             if (error.message ) {
    //                 setError(true);
    //                 setErrorMessage("Check your internet connection");
    //                 // console.log('Network error');
    //             } else if (error.response) {
    //                 // setError(true);
    //                 // // Handle other Axios errors (like 4xx or 5xx responses)
    //                 // setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
    //                     setRows([]);
    //                     setError(true);
    //                     setErrorMessage("Please fill All Fields");
    //             } else {
    //                 // Fallback for other errors
    //                 setError(true);
    //                 setErrorMessage("An unexpected error occurred: " + error.message);
    //             }
    //         }
    //     } else if (servicestation === "") {

    //         // Call the allGroup-Billing API
    //         try {
    //             const customerValue = encodeURIComponent(customer || selectedCustomerDatas?.customer || (tripData.length > 0 ? tripData[0].customer : ''));
    //             const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
    //             const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
    //             console.log(customerValue,fromDateValue,toDateValue,servicestationValue,'groupbill11');

    //             const response = await axios.get(`${apiUrl}/allGroup-Billing`, {
    //                 params: {
    //                     customer: customerValue,
    //                     fromDate: fromDateValue,
    //                     toDate: toDateValue,
    //                 },
    //             });

    //             const data = response.data;

    //             if (Array.isArray(data) && data.length > 0) {
    //                 setRows(data);
    //                 const netAmountSum = calculateNetAmountSum(data);
    //                 setTotalValue(netAmountSum);

    //                 const roundedGrossAmount = Math.ceil(netAmountSum);
    //                 const roundOff = roundedGrossAmount - netAmountSum;
    //                 const roundOffValue = roundOff.toFixed(2);
    //                 setRoundedAmount(roundOffValue);

    //                 const sumTotalAndRounded = netAmountSum + parseFloat(roundOffValue);
    //                 setSumTotalAndRounded(sumTotalAndRounded);

    //                 setTripData(data);
    //                 setSuccess(true);
    //                 setSuccessMessage("Successfully listed");
    //             } else {
    //                 setRows([]);
    //                 setError(true);
    //                 setErrorMessage("No data found");
    //             }
    //         }
    //         //  catch {
    //         //     setRows([]);
    //         //     setError(true);
    //         //     setErrorMessage("Please fill All Fields");
    //         // }
    //         catch (error) {
    //             // console.error("Error occurredddddd:", error);

    //             // Check if there's no response, indicating a network error
    //             if (error.message ) {
    //                 setError(true);
    //                 setErrorMessage("Check your internet connection");
    //                 // console.log('Network error');
    //             } else if (error.response) {
    //                 // setError(true);
    //                 // Handle other Axios errors (like 4xx or 5xx responses)
    //                 // setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
    //                 setRows([]);
    //                     setError(true);
    //                     setErrorMessage("Please fill All Fields");
    //             } else {
    //                 // Fallback for other errors
    //                 setError(true);
    //                 setErrorMessage("An unexpected error occurred: " + error.message);
    //             }
    //         }
    //     }
    // }, [customer, fromDate, toDate, servicestation, selectedCustomerDatas, tripData, calculateNetAmountSum, apiUrl]);

    const handleShow = async () => {
        if (!customer) {
            setError(true);
            setErrorMessage('Select an Organization');
            return;
        }

        setGroupInvoice(false);

        // const servicestationValue = servicestation || selectedCustomerDatas?.station || (tripData.length > 0 ? tripData[0].department : '');
        const customerValue = encodeURIComponent(customer || selectedCustomerDatas?.customer || (tripData.length > 0 ? tripData[0].customer : ''));
        const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
        const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
        console.log(fromDateValue, toDateValue, 'groupbill000');

        // Determine which API to call based on servicestationValue
        // const apiEndpoint = servicestationValue !== "" ? `${apiUrl}/Group-Billing` : `${apiUrl}/allGroup-Billing`;
        // const params = servicestationValue !== ""
        //     ? { customer: customerValue, fromDate: fromDateValue, toDate: toDateValue, servicestation: servicestationValue }
        //     : { customer: customerValue, fromDate: fromDateValue, toDate: toDateValue };
            const apiEndpoint =`${apiUrl}/allGroup-Billing`;
            const params =  { customer: customerValue, fromDate: fromDateValue, toDate: toDateValue };

        try {
            setRows([]);

            const response = await axios.get(apiEndpoint, { params });
            const data = response.data;
            console.log(data, 'group44');
            setRows(response.data);

            if (Array.isArray(data) && data.length > 0) {
                console.log(data, 'group4455');
                setRows(data);
                const netAmountSum = calculateNetAmountSum(data);
                setTotalValue(netAmountSum);

                const roundedGrossAmount = Math.ceil(netAmountSum);
                const roundOffValue = (roundedGrossAmount - netAmountSum).toFixed(2);
                setRoundedAmount(roundOffValue);

                const sumTotalAndRounded = netAmountSum + parseFloat(roundOffValue);
                setSumTotalAndRounded(sumTotalAndRounded);

                setTripData(data);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("No data found");
            }
        } catch (error) {
            setRows([]);
            setError(true);

            if (!error.response) {
                setErrorMessage("Check your internet connection");
            } else {
                setErrorMessage("Please fill all required fields");
            }
        }
    };


    // const handleExcelDownload = async () => {
    //     const workbook = new Excel.Workbook();
    //     const workSheetName = 'Worksheet-1';
    //     try {
    //         const fileName = "Group Billing"
    //         // creating one worksheet in workbook
    //         const worksheet = workbook.addWorksheet(workSheetName);
    //         const headers = Object.keys(rows[0]);
    //         //         console.log(headers,"hed")
            
    //         const columns = headers.map(key => ({ key, header: key }));
    //         //         worksheet.columns = columnsexcel
    //         worksheet.columns = columns;
    //         // updated the font for first row.
    //         worksheet.getRow(1).font = { bold: true };

    //         // Set background color for header cells
    //         worksheet.getRow(1).eachCell((cell, colNumber) => {
    //             cell.fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: '9BB0C1' } // Green background color
    //             };
    //         });


    //         worksheet.getRow(1).height = 30;
    //         // loop through all of the columns and set the alignment with width.
    //         worksheet.columns.forEach((column) => {
    //             column.width = column.header.length + 5;
    //             column.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });
    //         console.log(rows, "datas of row ")

    //         rows.forEach((singleData, index) => {

    //             singleData["SNo"] = index + 1;
    //             // singleData["duty1"]=singleData["duty"]
    //             const location = `${singleData.address1}`;
    //             singleData['location'] = location

    //             singleData["duty1"] = singleData["duty"]
    //             singleData["Vendor"] = " Jessy Cabs"
    //             singleData["VendorName"] = " Jessy Cabs"
    //             singleData["vechicletype"] = singleData["vehType"]
    //             singleData["vehTypebilling"] = singleData["vehType"]
    //             singleData["totalkm2"] = singleData["totalkm1"]
    //             singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
    //             singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
    //             singleData["shedInDate"]=singleData["shedInDate"] ? dayjs(singleData["shedInDate"]).format("DD-MM-YYYY"):""
    //              singleData["tripsheetdate"]=singleData["tripsheetdate"] ? dayjs(singleData["tripsheetdate"]).format("DD-MM-YYYY"):""
                

    //             worksheet.addRow(singleData);
    //             // Adjust column width based on the length of the cell values in the added row
    //             worksheet.columns.forEach((column) => {
    //                 const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
    //                 const cellLength = cellValue.toString().length; // Get length of cell value as a string
    //                 const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

    //                 // Set column width to the maximum of current width and cell length plus extra space
    //                 column.width = Math.max(currentColumnWidth, cellLength + 5);
    //             });
    //         });

    //         // loop through all of the rows and set the outline style.
    //         worksheet.eachRow({ includeEmpty: false }, (row) => {
    //             // store each cell to currentCell
    //             const currentCell = row._cells;

    //             // loop through currentCell to apply border only for the non-empty cell of excel
    //             currentCell.forEach((singleCell) => {

    //                 const cellAddress = singleCell._address;

    //                 // apply border
    //                 worksheet.getCell(cellAddress).border = {
    //                     top: { style: 'thin' },
    //                     left: { style: 'thin' },
    //                     bottom: { style: 'thin' },
    //                     right: { style: 'thin' },
    //                 };
    //             });
    //         });
    //         // write the content using writeBuffer
    //         const buf = await workbook.xlsx.writeBuffer();

    //         // download the processed file
    //         saveAs(new Blob([buf]), `${fileName}.xlsx`);
    //     } catch (error) {
    //         console.error('<<<ERRROR>>>', error);
    //         console.error('Something Went Wrong', error.message);
    //     } finally {
    //         // removing worksheet's instance to create new one
    //         workbook.removeWorksheet(workSheetName);
    //     }

    // }

    // const handleExcelDownload = async () => {
    //     const workbook = new Excel.Workbook();
    //     const workSheetName = 'Group Billing';
    //     try {
    //         const fileName = "Group Billing";
    //         const worksheet = workbook.addWorksheet(workSheetName);
    
    //         // Define the columns based on your data
    //         const columns = [
    //             {key: "SNo", header: "Ref", width: 130},
    //             { key: 'id', header: 'ID', width: 130 },
    //             { key: 'billingno', header: 'Billing No' , width: 130},
    //             { key: 'bookingno', header: 'Booking No' , width: 130},
    //             { key: 'vendor', header: 'Vendor' , width: 130},
    //             { key: 'customer', header: 'Customer' , width: 300},
    //             { key: 'guestname', header: 'Guest Name', width: 130 },
    //             { key: 'tripid', header: 'Trip ID', width: 130 },
    //             { key: 'vehRegNo', header: 'Vehicle No  ', width: 130 },
    //             { key: 'vehicleName', header: 'Vehicle Name', width: 130 },
    //             { key: 'driverName', header: 'Driver Name' , width: 130},
    //             { key: 'department', header: 'Department' , width: 130},
    //             { key: 'Groups', header: 'Group', width: 130 },
    //             { key: 'address1', header: 'Address',width: 190 },
    //             { key: 'apps', header: 'Application Status', width: 130 },
    //             { key: 'status', header: 'Status', width: 130 },
    //             { key: 'shedInDate', header: 'Shed In Date' , width: 130},
    //             { key: 'shedOutDate', header: 'Shed Out Date' , width: 130},
    //             { key: 'tripsheetdate', header: 'Trip Sheet Date', width: 130 },
    //             { key: 'mobileNo', header: 'Mobile Number' , width: 130},
    //             { key: 'startdate', header: 'Start Date  ', width: 130 },
    //             { key: 'starttime', header: 'Start Time' , width: 130},
    //             { key: 'closedate', header: 'Close Date' , width: 130},
    //             { key: 'closetime', header: 'Close Time', width: 130 },
               
                
    //             { key: 'totalcalcAmount', header: 'Total Calc Amount', width: 130 },
    //             { key: 'Vendor_Bata', header: 'Vendor Bata' , width: 130},
                
    //             // { key: 'guestname', header: 'Guest Name' , width: 130},
                      
    //             { key: 'pickup', header: 'Pickup ', width: 130 },
                

    //         ];
    
    //         worksheet.columns = columns;
    
    //         // Style the header row
    //         worksheet.getRow(1).font = { bold: true };
    //         worksheet.getRow(1).eachCell((cell) => {
    //             cell.fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: '9BB0C1' },
    //             };
    //         });
    //         worksheet.getRow(1).height = 30;
    
    //         // Format column width and alignment
    //         worksheet.columns.forEach((column) => {
    //             column.width = column.header.length + 5;
    //             column.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });
    
    //         // Add rows to the worksheet
    //         console.log(rows, "datas of row ")
    //         rows.forEach((row, index) => {
    //             const formattedRow = {
    //                 SNo: index + 1, 
                    
    //                 id: row.id || 'N/A',
    //                 billingno:row.billingno || 'N/A',
    //                 bookingno:row.bookingno || 'N/A',
    //                 vendor :"Jessy",
    //                 customer: row.customer || 'N/A',
    //                 guestname:row.guestname || 'N/A',
    //                 tripid: row.tripid || 'N/A',
    //                 vehRegNo:row.vehRegNo || 'N/A',
    //                 vehicleName: row.vehicleName || 'N/A',
    //                 shedOutDate:row.shedOutDate ? dayjs(row.shedOutDate).format("DD-MM-YYYY") : 'N/A',
    //                 driverName : row.driverName || 'N/A',
    //                 mobileNo: row.mobileNo || 'N/A',
    //                 startdate:row.startdate ? dayjs(row.startdate).format("DD-MM-YYYY") : 'N/A',
    //                 closedate:row.closedate ? dayjs(row.closedate).format("DD-MM-YYYY") : 'N/A',
    //                 Groups: row.Groups || 'N/A',
    //                 address1: row.address1 || 'N/A',
    //                 apps: row.apps || 'N/A',
    //                 starttime: row.starttime ? dayjs(row.starttime, "HH:mm:ss").format("HH:mm") : 'N/A',
    //                 closetime: row.closetime? dayjs(row.closetime, "HH:mm:ss").format("HH:mm") : 'N/A',
    //                 totalcalcAmount: row.totalcalcAmount || 0,
    //                 Vendor_Bata: row.Vendor_Bata || 0,
    //                 status: row.status || 'N/A',
    //                 shedInDate: row.shedInDate ? dayjs(row.shedInDate).format("DD-MM-YYYY") : 'N/A',
    //                 tripsheetdate: row.tripsheetdate ? dayjs(row.tripsheetdate).format("DD-MM-YYYY") : 'N/A',
    //                 guestname: row.guestname || 'N/A',
    //                 department:row.department || 'N/A',
    //                 pickup:row.pickup || 'N/A'
                   
                  
    //             };
            
    //             worksheet.addRow(formattedRow);
    //         });
            
    
    //         // Apply borders to all cells
    //         worksheet.eachRow({ includeEmpty: false }, (row) => {
    //             row.eachCell((cell) => {
    //                 cell.border = {
    //                     top: { style: 'thin' },
    //                     left: { style: 'thin' },
    //                     bottom: { style: 'thin' },
    //                     right: { style: 'thin' },
    //                 };
    //             });
    //         });
    
    //         // Write to a buffer and save the file
    //         const buf = await workbook.xlsx.writeBuffer();
    //         saveAs(new Blob([buf]), `${fileName}.xlsx`);
    //     } catch (error) {
    //         console.error('Error generating Excel:', error);
    //     } finally {
    //         workbook.removeWorksheet(workSheetName);
    //     }
    // };

    function removeSeconds(time) {
        // Split the time string by colon (:)
        const timeParts = time.split(':');
      
        // Check if there are seconds (length 3), return hours:minutes
        if (timeParts.length === 3) {
          return `${timeParts[0]}:${timeParts[1]}`;
        }
      
        // If there's only hours:minutes, return it as is
        return time;
      }

      function addPercentage(amount, percent) {
     
        let percentageValue = (amount * percent) / 100;
      
        const datapercent = amount + percentageValue
        const datas = Math.round(datapercent)
     
        return `${datas}.00`
    }

      function withoutTaxesdata(total,toll,parking,permit) {
        let withoutaxValue = total-toll-parking-permit;
        return withoutaxValue;
    }
    // const handleExcelDownload = async (customerData) => {
     
    //       if(rows.length === 0){
    //         setError(true);
    //         setErrorMessage("Data is Empty");
    //         return
    //       }




    //     const workbook = new Excel.Workbook();
    //     const workSheetName = 'Group Billing';
    
    //     try {
    //         const fileName = "Group Billing";
    //         const worksheet = workbook.addWorksheet(workSheetName);

    //         const columns = [
    //             { key: "SNo", header: "Ref" },
    //             { key:"customer", header: 'c.Name' },
    //             { key: 'tripid', header: 'DS NO' },
    //             { key: "duty", header: "Route Type"},
    //             { key: 'Vendor', header: 'Vendor' },
    //             { key: "vehicleName2", header: "Vehicle Name", width: 120 },
    //             { key: "vehRegNo", header: "Vehicle No", width: 120 },
    //             // { key: 'vehType', header: 'Vehicle Type (Requested)'},
    //             { key: "tripsheetdate", header: "Date" },
    //             { key: "employeeno", header: "Employee SAP Code"},
    //             { key: "guestname", header: "Travelled Employee Name"},
    //             { key: "address1", header: "Pickup Point / Shed" },
    //             { key: "useage", header: "Drop Point"},
    //             { key: "remark", header: "Route Type (Pick/Drop)"},
    //             { key: "starttime", header: "Garage Initial Time" },
    //             { key: "shedintime", header: "Garage End Time"},
    //             { key: "totaltime", header: "Total Hrs."},
    //             { key: "shedout", header: "Garage Initial Km" },
    //             { key: "shedin", header: "Garage End Km"},
    //             { key: "totalkm1", header: "Total Km"},
    //             { key: "calcPackage", header: "Package"},
    //             { key: "package_amount", header: "Base Amount"},
    //             { key: "extraKM", header: "Extra KMs"},
    //             { key: "extraHR", header: "Extra HRs"},
    //             { key: "ex_kmAmount", header: "Extra KMs Amount"},
    //             { key: "ex_hrAmount", header: "Extra HRs Amount"},
        
    //             { key: "night_totalAmount", header: "Night Charges"},
    //             { key: "driverBeta", header: "Driver Bhatta"},
    //             { key: "OutstationCharges", header: "Outstation Charges"},
    //             { key: "withoutTaxes", header: "Total Amount"},
    //             { key: "gsttaxdata", header: "GST%"},
    //             { key: "permit", header: "Permit"},
    //             { key: "parking", header: "Parking"},
    //             { key: "toll", header: "Toll"},
    //             { key: "driverBeta_amount", header: "DND/Toll/Parking Amount"},
    //             { key: "totalcalcAmount", header: "Amount With All Taxes"},

    //         ];
    
    //         worksheet.columns = columns;
    
    //         // Style the header row
    //         worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } }; // White text
    //         worksheet.getRow(1).eachCell((cell) => {
    //             cell.fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: '9BB0C1' }, // Light blue
    //             };
    //             cell.border = {
    //                 top: { style: 'thin' },
    //                 left: { style: 'thin' },
    //                 bottom: { style: 'thin' },
    //                 right: { style: 'thin' },
    //             };
    //             cell.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });
    
    //         worksheet.getRow(1).height = 30; // Adjust header row height

    //         worksheet.columns.forEach((column) => {
    //             column.width = column.header.length + 5;
    //             column.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });

    //         rows.forEach((singleData, index) => {
             
            
    //             singleData["SNo"] = index + 1;
    //             // singleData["duty1"]=singleData["duty"]
    //             singleData["toll"] =  singleData["toll"] || 0
    //             singleData["parking"] = singleData["parking"] || 0
    //             singleData["permit"] =  singleData["permit"]  || 0

    //             singleData["Vendor"] = " Jessy Cabs"
    //             singleData["gsttaxdata"] =`${customerData[0]?.gstTax|| 0}%`
    //              singleData["starttime"] = singleData["starttime"] ? removeSeconds(singleData["starttime"]):"00:00"
        
    //             singleData["withoutTaxes"]=  withoutTaxesdata(singleData["totalcalcAmount"],singleData["toll"] || 0,singleData["parking"] || 0,singleData["permit"] || 0)
    //             singleData["totalcalcAmount"] = customerData[0]?.gstTax === 0 ? singleData["totalcalcAmount"] || 0: addPercentage(singleData["totalcalcAmount"] || 0,customerData[0]?.gstTax)
    //             worksheet.addRow(singleData);

    //             // Adjust column width based on the length of the cell values in the added row
    //             worksheet.columns.forEach((column) => {
    //                 const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
    //                 const cellLength = cellValue.toString().length; // Get length of cell value as a string
    //                 const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

    //                 // Set column width to the maximum of current width and cell length plus extra space
    //                 column.width = Math.max(currentColumnWidth, cellLength + 5);
    //             });
    //         });
    
    //         // Add rows to the worksheet
    //         // rows.forEach((row, index) => {
    //         //     const formattedRow = {
    //         //         SNo: index + 1,
    //         //         id: row.id || 'N/A',
    //         //         billingno: row.billingno || 'N/A',
    //         //         bookingno: row.bookingno || 'N/A',
    //         //         vendor: "Jessy",
    //         //         customer: row.customer || 'N/A',
    //         //         guestname: row.guestname || 'N/A',
    //         //         tripid: row.tripid || 'N/A',
    //         //         vehRegNo: row.vehRegNo || 'N/A',
    //         //         vehicleName: row.vehicleName || 'N/A',
    //         //         shedOutDate: row.shedOutDate ? dayjs(row.shedOutDate).format("DD-MM-YYYY") : 'N/A',
    //         //         driverName: row.driverName || 'N/A',
    //         //         mobileNo: row.mobileNo || 'N/A',
    //         //         startdate: row.startdate ? dayjs(row.startdate).format("DD-MM-YYYY") : 'N/A',
    //         //         closedate: row.closedate ? dayjs(row.closedate).format("DD-MM-YYYY") : 'N/A',
    //         //         Groups: row.Groups || 'N/A',
    //         //         address1: row.address1 || 'N/A',
    //         //         apps: row.apps || 'N/A',
    //         //         starttime: row.starttime ? dayjs(row.starttime, "HH:mm:ss").format("HH:mm") : 'N/A',
    //         //         closetime: row.closetime ? dayjs(row.closetime, "HH:mm:ss").format("HH:mm") : 'N/A',
    //         //         totalcalcAmount: row.totalcalcAmount || 0,
    //         //         Vendor_Bata: row.Vendor_Bata || 0,
    //         //         status: row.status || 'N/A',
    //         //         shedInDate: row.shedInDate ? dayjs(row.shedInDate).format("DD-MM-YYYY") : 'N/A',
    //         //         tripsheetdate: row.tripsheetdate ? dayjs(row.tripsheetdate).format("DD-MM-YYYY") : 'N/A',
    //         //         department: row.department || 'N/A',
    //         //         pickup: row.pickup || 'N/A',
    //         //     };

          
    
    //         // Adjust column width dynamically based on content
    //         worksheet.eachRow({ includeEmpty: false }, (row) => {
    //             // store each cell to currentCell
    //             const currentCell = row._cells;

    //             // loop through currentCell to apply border only for the non-empty cell of excel
    //             currentCell.forEach((singleCell) => {
    //                 const cellAddress = singleCell._address;

    //                 // apply border
    //                 worksheet.getCell(cellAddress).border = {
    //                     top: { style: 'thin' },
    //                     left: { style: 'thin' },
    //                     bottom: { style: 'thin' },
    //                     right: { style: 'thin' },
    //                 };
    //             });
    //         });

    
    //         // Save the workbook
    //         const buffer = await workbook.xlsx.writeBuffer();
    //         const blob = new Blob([buffer], { type: "application/octet-stream" });
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         link.download = `${fileName}.xlsx`;
    //         link.click();
    //     } catch (error) {
    //         console.error("Error generating Excel file:", error);
    //     }
    // };

    // const handleExcelDownload = async (customerData) => {
    //     if (rows.length === 0) {
    //         setError(true);
    //         setErrorMessage("Data is Empty");
    //         return;
    //     }
    
    //     const workbook = new Excel.Workbook();
    //     const workSheetName = 'Group Billing';
    
    //     try {
    //         const fileName = "Group Billing";
    //         const worksheet = workbook.addWorksheet(workSheetName);
    
    //         const columns = [
    //             { key: "SNo", header: "Ref" },
    //             { key: "customer", header: 'c.Name' },
    //             { key: 'tripid', header: 'DS NO' },
    //             { key: "duty", header: "Route Type" },
    //             { key: 'Vendor', header: 'Vendor' },
    //             { key: "vehicleName2", header: "Vehicle Name", width: 120 },
    //             { key: "vehRegNo", header: "Vehicle No", width: 120 },
    //             { key: "tripsheetdate", header: "Date" },
    //             { key: "employeeno", header: "Employee SAP Code" },
    //             { key: "guestname", header: "Travelled Employee Name" },
    //             { key: "address1", header: "Pickup Point / Shed" },
    //             { key: "useage", header: "Drop Point" },
    //             { key: "remark", header: "Route Type (Pick/Drop)" },
    //             { key: "starttime", header: "Garage Initial Time" },
    //             { key: "shedintime", header: "Garage End Time" },
    //             { key: "totaltime", header: "Total Hrs." },
    //             { key: "shedout", header: "Garage Initial Km" },
    //             { key: "shedin", header: "Garage End Km" },
    //             { key: "totalkm1", header: "Total Km" },
    //             { key: "calcPackage", header: "Package" },
    //             { key: "package_amount", header: "Base Amount" },
    //             { key: "extraKM", header: "Extra KMs" },
    //             { key: "extraHR", header: "Extra HRs" },
    //             { key: "ex_kmAmount", header: "Extra KMs Amount" },
    //             { key: "ex_hrAmount", header: "Extra HRs Amount" },
    //             { key: "night_totalAmount", header: "Night Charges" },
    //             { key: "driverBeta", header: "Driver Bhatta" },
    //             { key: "OutstationCharges", header: "Outstation Charges" },
    //             { key: "withoutTaxes", header: "Total Amount" },
    //             { key: "gsttaxdata", header: "GST%" },
    //             { key: "permit", header: "Permit" },
    //             { key: "parking", header: "Parking" },
    //             { key: "toll", header: "Toll" },
    //             { key: "driverBeta_amount", header: "DND/Toll/Parking Amount" },
    //             { key: "totalcalcAmount", header: "Amount With All Taxes" },
    //         ];
    
    //         worksheet.columns = columns;
    
    //         // Style the header row
    //         worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } }; // White text
    //         worksheet.getRow(1).eachCell((cell) => {
    //             cell.fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: '9BB0C1' }, // Light blue
    //             };
    //             cell.border = {
    //                 top: { style: 'thin' },
    //                 left: { style: 'thin' },
    //                 bottom: { style: 'thin' },
    //                 right: { style: 'thin' },
    //             };
    //             cell.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });
    
    //         worksheet.getRow(1).height = 30; // Adjust header row height
    
    //         worksheet.columns.forEach((column) => {
    //             column.width = column.header.length + 5;
    //             column.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });
    
    //         rows.forEach((singleData, index) => {
    //             singleData["SNo"] = index + 1;
    //             singleData["toll"] = singleData["toll"] || 0;
    //             singleData["parking"] = singleData["parking"] || 0;
    //             singleData["permit"] = singleData["permit"] || 0;
    //             singleData["Vendor"] = "Jessy Cabs";
    //             singleData["gsttaxdata"] = `${customerData[0]?.gstTax || 0}%`;
    //             singleData["starttime"] = singleData["starttime"] ? removeSeconds(singleData["starttime"]) : "00:00";
                
    //             // Format date fields using dayjs
    //             if (singleData["tripsheetdate"]) {
    //                 singleData["tripsheetdate"] = dayjs(singleData["tripsheetdate"]).format("DD-MM-YYYY");
    //             }
    //             if (singleData["starttime"]) {
    //                 singleData["starttime"] = dayjs(singleData["starttime"], "HH:mm:ss").format("HH:mm");
    //             }
    //             if (singleData["shedintime"]) {
    //                 singleData["shedintime"] = dayjs(singleData["shedintime"], "HH:mm:ss").format("HH:mm");
    //             }
    //             singleData["withoutTaxes"] = withoutTaxesdata(singleData["totalcalcAmount"], singleData["toll"] || 0, singleData["parking"] || 0, singleData["permit"] || 0);
    //             singleData["totalcalcAmount"] = customerData[0]?.gstTax === 0 ? singleData["totalcalcAmount"] || 0 : addPercentage(singleData["totalcalcAmount"] || 0, customerData[0]?.gstTax);
    //             worksheet.addRow(singleData);
    
    //             // Adjust column width dynamically based on content
    //             worksheet.columns.forEach((column) => {
    //                 const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
    //                 const cellLength = cellValue.toString().length; // Get length of cell value as a string
    //                 const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined
    
    //                 // Set column width to the maximum of current width and cell length plus extra space
    //                 column.width = Math.max(currentColumnWidth, cellLength + 5);
    //             });
    //         });
    
    //         // Adjust column width dynamically based on content
    //         worksheet.eachRow({ includeEmpty: false }, (row) => {
    //             const currentCell = row._cells;
    //             currentCell.forEach((singleCell) => {
    //                 const cellAddress = singleCell._address;
    //                 worksheet.getCell(cellAddress).border = {
    //                     top: { style: 'thin' },
    //                     left: { style: 'thin' },
    //                     bottom: { style: 'thin' },
    //                     right: { style: 'thin' },
    //                 };
    //             });
    //         });
    
    //         // Save the workbook
    //         const buffer = await workbook.xlsx.writeBuffer();
    //         const blob = new Blob([buffer], { type: "application/octet-stream" });
    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         link.download = `${fileName}.xlsx`;
    //         link.click();
    //     } catch (error) {
    //         console.error("Error generating Excel file:", error);
    //     }
    // };

    const handleExcelDownload = async (customerData) => {
        if (rows.length === 0) {
            setError(true);
            setErrorMessage("Data is Empty");
            return;
        }
    
        const workbook = new Excel.Workbook();
        const workSheetName = 'Group Billing';
    
        try {
            const fileName = "Group Billing";
            const worksheet = workbook.addWorksheet(workSheetName);
    
            const columns = [
                { key: "SNo", header: "Ref" },
                { key: "customer", header: 'c.Name' },
                { key: 'tripid', header: 'DS NO' },
                { key: "duty", header: "Route Type" },
                { key: 'Vendor', header: 'Vendor' },
                { key: "vehicleName2", header: "Vehicle Name", width: 120 },
                { key: "vehRegNo", header: "Vehicle No", width: 120 },
                { key: "tripsheetdate", header: "Date" },
                { key: "employeeno", header: "Employee SAP Code" },
                { key: "guestname", header: "Travelled Employee Name" },
                { key: "address1", header: "Pickup Point / Shed" },
                { key: "useage", header: "Drop Point" },
                { key: "remark", header: "Route Type (Pick/Drop)" },
                { key: "starttime", header: "Garage Initial Time" },
                { key: "shedintime", header: "Garage End Time" },
                { key: "totaltime", header: "Total Hrs." },
                { key: "shedout", header: "Garage Initial Km" },
                { key: "shedin", header: "Garage End Km" },
                { key: "totalkm1", header: "Total Km" },
                { key: "calcPackage", header: "Package" },
                { key: "package_amount", header: "Base Amount" },
                { key: "extraKM", header: "Extra KMs" },
                { key: "extraHR", header: "Extra HRs" },
                { key: "ex_kmAmount", header: "Extra KMs Amount" },
                { key: "ex_hrAmount", header: "Extra HRs Amount" },
                { key: "night_totalAmount", header: "Night Charges" },
                { key: "driverBeta", header: "Driver Bhatta" },
                { key: "OutstationCharges", header: "Outstation Charges" },
                { key: "withoutTaxes", header: "Total Amount" },
                { key: "gsttaxdata", header: "GST%" },
                { key: "permit", header: "Permit" },
                { key: "parking", header: "Parking" },
                { key: "toll", header: "Toll" },
                { key: "driverBeta_amount", header: "DND/Toll/Parking Amount" },
                { key: "totalcalcAmount1", header: "Amount With All Taxes" },
            ];
    
            worksheet.columns = columns;
    
            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
            worksheet.getRow(1).eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '9BB0C1' },
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
    
            worksheet.getRow(1).height = 30;
    
            worksheet.columns.forEach((column) => {
                column.width = column.header.length + 5;
                column.alignment = { horizontal: 'center', vertical: 'middle' };
            });
    
            rows.forEach((singleData, index) => {
                singleData["SNo"] = index + 1;
                singleData["toll"] = singleData["toll"] || 0;
                singleData["parking"] = singleData["parking"] || 0;
                singleData["permit"] = singleData["permit"] || 0;
                singleData["Vendor"] = "Jessy Cabs";
                singleData["gsttaxdata"] = `${customerData[0]?.gstTax || 0}%`;
                singleData["starttime"] = singleData["starttime"] ? removeSeconds(singleData["starttime"]) : "";
    
                if (singleData["tripsheetdate"] && dayjs(singleData["tripsheetdate"]).isValid()) {
                    singleData["tripsheetdate"] = dayjs(singleData["tripsheetdate"]).format("DD-MM-YYYY");
                } else {
                    singleData["tripsheetdate"] = "";
                }
    
                if (singleData["starttime"] && dayjs(singleData["starttime"], "HH:mm:ss").isValid()) {
                    singleData["starttime"] = dayjs(singleData["starttime"], "HH:mm:ss").format("HH:mm");
                } else {
                    singleData["starttime"] = "";
                }
    
                if (singleData["shedintime"] && dayjs(singleData["shedintime"], "HH:mm:ss").isValid()) {
                    singleData["shedintime"] = dayjs(singleData["shedintime"], "HH:mm:ss").format("HH:mm");
                } else {
                    singleData["shedintime"] = "";
                }
    
                singleData["withoutTaxes"] = withoutTaxesdata(singleData["totalcalcAmount"], singleData["toll"] || 0, singleData["parking"] || 0, singleData["permit"] || 0);
                singleData["totalcalcAmount1"] = customerData[0]?.gstTax === 0 ? singleData["totalcalcAmount"] || 0 : addPercentage(singleData["totalcalcAmount"] || 0, customerData[0]?.gstTax);
    
                worksheet.addRow(singleData);
    
                worksheet.columns.forEach((column) => {
                    const cellValue = singleData[column.key] || '';
                    const cellLength = cellValue.toString().length;
                    const currentColumnWidth = column.width || 0;
                    column.width = Math.max(currentColumnWidth, cellLength + 5);
                });
            });
    
            worksheet.eachRow({ includeEmpty: false }, (row) => {
                const currentCell = row._cells;
                currentCell.forEach((singleCell) => {
                    const cellAddress = singleCell._address;
                    worksheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
            });
    
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: "application/octet-stream" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${fileName}.xlsx`;
            link.click();
        } catch (error) {
            console.error("Error generating Excel file:", error);
        }
    };
    
    
        
    

    const handleCoverPDFDownload = () => {
        if (rows.length === 0) {
            setError(true);
            setErrorMessage('No data available. Please fetch data');
            return;
        }
        const coverpdfComponent = <Coverpdf tripData={tripData} totalValue={totalValue} roundedAmount={roundedAmount} sumTotalAndRounded={sumTotalAndRounded} />;
        const coverpdfHtml = ReactDOMServer.renderToString(coverpdfComponent);
        return coverpdfHtml;
    };

    // const handleKeyenter = useCallback(async (event) => {

    //     if (event.key === 'Enter') {
    //         try {
    //             const invoiceNumber = book.invoiceno || invoiceno || selectedCustomerDatas.invoiceno;
    //             const response = await axios.get(`${apiUrl}/billingdata/${invoiceNumber}`);
    //             if (response.status === 200) {
    //                 const billingDetails = response.data;
    //                 if (billingDetails) {
    //                     setSelectedCustomerDatas(billingDetails);
                        
    //                    console.log("true",billingDetails)
    //                     setSuccess(true);
    //                     // setDisabelData(false)
    //                     setSuccessMessage("Successfully listed");
    //                 } else {
    //                     setRows([]);
    //                     setError(true);

    //                 }
    //             } else {
    //                 setError(true);
    //                 setErrorMessage(`Failed to retrieve billing details. Status: ${response.status}`);
    //             }
    //         } catch (error) {
    //             setError(true);
    //             setErrorMessage('Error retrieving billings details.', error);
    //         }
    //     }

    // }, [invoiceno, book, selectedCustomerDatas, apiUrl]);

    const handleButtonClickTripsheet = (params) => {

    };


    // const customerMotherdatagroupstation = async (customer) => {
    //     console.log(customer, "enetr")
    //     try {
    //         const resultresponse = await axios.get(`${apiUrl}/customerdatamothergroup/${customer}`)
    //         const datas = resultresponse.data;
    //         return datas

    //     }
    //     catch (err) {

    //     }
    // }


    const customerMotherdatagroupstation = async (customer) => {
        console.log(customer, "enetr")
        try {
            const resultresponse = await axios.get(`${apiUrl}/customerinvoicecreate/${customer}`)
            const datas = resultresponse.data;
            return datas

        }
        catch (err) {

        }
    }
    const handlecustomer = async(e)=>{
        console.log(e,"ppp")
        setCustomer(e)
      const data =  await customerMotherdatagroupstation(e);
    setServiceStation(data)
        

        
    }

    const handleRowSelection = (newSelectionModel) => {
        const selectedTripIds = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow.tripid : null;
            })
            .filter((tripid) => tripid !== null);
        // setRowselect(selectedTripIds)


        const selectedTrips = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? parseInt(selectedRow.totalcalcAmount) : null;
            })
            .filter((tripid) => tripid !== null);

        // const selectStation = newSelectionModel
        //     .filter((selectedId) => selectedId !== null)
        //     .map((selectedId) => {
        //         const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
        //         return selectedRow ? selectedRow.department : null;
        //     })
        //     .filter((tripid) => tripid !== null);
        // const selectStation = [...new Set(
        //     newSelectionModel
        //         .filter((selectedId) => selectedId !== null)
        //         .map((selectedId) => {
        //             const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
        //             return selectedRow ? selectedRow.department : null;
        //         })
        //         .filter((tripid) => tripid !== null)
        // )];


        const PdfSelectedTrips = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow : null;
            })
            .filter((tripid) => tripid !== null);

        const PdfSelectedcustomer = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow.customer : null;
            })
            .filter((tripid) => tripid !== null);
        console.log(PdfSelectedcustomer, 'pdf', invoiceno, PdfSelectedTrips);


        setRowSelectionModel(PdfSelectedTrips);
        // setDepartment(selectStation)
        setSelectedRow(selectedTripIds)
        setRowSelectedValues(selectedTrips)
        setRefPdfData(PdfSelectedTrips)
        setRefCustomer(PdfSelectedcustomer)
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!invoiceno) return
                const response = await axios.get(`${apiUrl}/GroupReference/${invoiceno}`);
                const GroupReference = response.data;
                const Amount = GroupReference.map((li) => li.Amount)
                setGroupBillAmount(Amount)
                const Trips = GroupReference.map((li) => li.Trips)
                const tripcount = parseInt(Trips)
                setTrips(tripcount)
            }
            catch (err) {
                console.log(err, 'error');
            }
        }
        fetchData()
    }, [rowSelectionModel, apiUrl, invoiceno, rowSelectionModel])



    const handlePopup = () => {
        setRefPdfPrint(false)
    }
    const handleGstPdf = () => {
        if(rowSelectionModel.length === 0){
            setError(true);
            setErrorMessage("Please Select The Row");
            return
        }
        if(!invoiceno){
            setError(true);
            setErrorMessage("RefrenceNo Not created");
            return
        }
      
        setRefPdfPrint(true)
    }

    // const handleRemoveData = async () => {
    //     const selectedIds = rowSelectionModel.map(row => row.id);
    //     // const tripIds = rowSelectionModel.map(row => row.tripid);
    //     const tripIds = rowSelectionModel.map(row => row.tripid.toString());

    //     // const tripid = rowSelectionModel?.map((li) => li.tripid.toString().replace(/,/g, ''));
    //     const tripid = rowSelectionModel?.map(li => li.tripid);
    //     // const tripIdArray = rowSelectionModel?.Trip_id.split(',').map(tripId => tripId.trim());


    //     const amounts = rowSelectionModel.map(row => row.netamount.split(',')).flat(); // Split the varchar field into an array and flatten it
    //     // Summing up the amounts
    //     const totalAmount = amounts.reduce((acc, curr) => acc + parseFloat(curr), 0);
    //     const Amount = groupBillAmount - totalAmount;

    //     const TripCount = trips - rowSelectionModel.length
    //     const Tripcounts = TripCount.toString()
    //     const groupUpdateList = {
    //         Trips: Tripcounts,
    //         Amount: Amount,
    //         Trip_id: tripIds
    //     }
    //     try {
    //         const response = await axios.post(`${apiUrl}/tripsheetstatusupdate`, {
    //             tripids: tripid,
    //             status: 'Closed',
    //         });
    //         console.log(response, 'response');
    //         const updatelist = await axios.put(`${apiUrl}/statusupdate`, groupUpdateList);
    //         console.log(updatelist, 'uplist');
    //         const Details = await axios.get(`${apiUrl}/getGroupList/${invoiceno}`)
    //         const result = Details.data;
    //         const tripno = result?.map((li) => li.Trip_id)
    //         const groupid = result?.map((li) => li.id)
    //         if (tripno[0] === "") {
    //             const getresponse = await axios.delete(`${apiUrl}/deleteGroup/${groupid}`)
    //             console.log(getresponse, 'Deleted Successfully');
    //         }
    //     } 
    //     // catch (error) {
    //     //     console.error('Error updating status:', error);
    //     // }
    //     catch (error) {
    //         // console.error("Error occurredddddd:", error);
    //         // Check if there's no response, indicating a network error
    //         if (error.message === "Network error") {
    //             setError(true);
    //             setErrorMessage("Check your internet connection");
    //             // console.log('Network error');
    //         } else if (error.response) {
    //             setError(true);
    //             // Handle other Axios errors (like 4xx or 5xx responses)
    //             setErrorMessage("Failed to Remove: " + (error.response.data.message || error.message));
    //         } else {
    //             // Fallback for other errors
    //             setError(true);
    //             setErrorMessage("An unexpected error occurred: " + error.message);
    //         }
    //     }

    // get GroupBilling All Datas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getGroupList/${invoiceno}`);
                console.log(response.data, 'groupresp');
                setGroupBillingData(response.data)
            }
            catch (err) {
                console.log(err);

            }
        }
        fetchData()
    }, [invoiceno])


    const handleRemoveData = async () => {
        const selectedIds = rowSelectionModel.map(row => row.id);

        // Check if no rows are selected
        if (selectedIds.length === 0) {
            setError(true);
            setErrorMessage("No rows selected. Please select a row to remove.");
            return; // Exit the function early
        }

        const tripIds = rowSelectionModel.map(row => row.tripid.toString());
        const amounts = rowSelectionModel.map(row => row.netamount.split(',')).flat(); // Split and flatten
        const totalAmount = amounts.reduce((acc, curr) => acc + parseFloat(curr), 0);
        const total = rows.reduce((sum, li) => sum + li.totalcalcAmount, 0);
        const selectedTotal = rowSelectedValues.reduce((sum, value) => sum + value, 0);
        const Amount = total - selectedTotal;
        console.log(amounts, totalAmount, Amount, 'remove-----', selectedTotal, total);

        const TripCount = trips - rowSelectionModel.length;
        const Tripcounts = TripCount.toString();
        const groupUpdateList = {
            Trips: Tripcounts,
            Amount: Amount,
            Trip_id: tripIds
        };
        console.log(trips, rowSelectionModel.length, TripCount, typeof (TripCount), 'remove33');

        console.log(groupUpdateList, 'removegroup');


        try {
            const response = await axios.post(`${apiUrl}/tripsheetstatusupdate`, {
                tripids: tripIds,
                status: 'Closed',
            });
            console.log(response, 'response');

            const updatelist = await axios.put(`${apiUrl}/statusupdate`, groupUpdateList);
            console.log(updatelist, 'uplist');

            const Details = await axios.get(`${apiUrl}/getGroupList/${invoiceno}`);
            const result = Details.data;
            const tripno = result?.map(li => li.Trip_id);
            const groupid = result?.map(li => li.id);

            if (tripno[0] === "") {
                const getresponse = await axios.delete(`${apiUrl}/deleteGroup/${groupid}`);
                console.log(getresponse, 'Removed Successfully');
            }
            setSuccess(true)
            setSuccessMessage("Successfully Removed")
            setSelectedRow([])
            setParticularId([])
        } catch (error) {
            //     // Handle errors
            //     console.error("Error occurred:", error);

            //     if (error.message === "Network Error") {
            //         // Handle network errors
            //         setError(true);
            //         setErrorMessage("Check your internet connection");
            //     } else {
            //         // Handle other Axios errors (like 4xx or 5xx responses)
            //         setError(true);
            //         setErrorMessage("Failed to Remove: " + (error.response.data.message || error.message));
            //     }
        }
        // };


        // const updatedRows = rows.filter(row => !selectedIds.includes(row.id));
        // setRows(updatedRows);
        setRows([])

        setRowSelectionModel([]);
    };

    // console.log( invoiceno, 'reference');
    const handlegroupData = async () => {
        const presentIds = selectedRow.filter(id => particularId.includes(id.toString()));
        const stateNamce = await customerMotherdatagroupstation(customer || selectedCustomerDatas?.customer);
        console.log(presentIds, 'present');
        if (presentIds.length > 0) {
            setError(true)
            setisSaveload(false)
            setErrorMessage("Already Entered This TripID.")
            return
        }

        // console.log(referenceNo, invoiceno, 'reference');

        if (invoiceno === "") {
            const TripsCount = rowSelectionModel.length;
            console.log(TripsCount, typeof (TripsCount), 'TripsCount');

            let TotalAmount = 0; // Change from const to let
            rowSelectedValues?.forEach((li) => {
                TotalAmount += li;
            });
            // const FromDate = dayjs(fromDate).format('YYYY-MM-DD')
            // const FromDate = dayjs(fromDate).format('DD-MM-YYYY')
            const FromDate = dayjs(refPdfData[0]?.startdate).format('YYYY-MM-DD')

            // const ToDate = dayjs(toDate).format('YYYY-MM-DD')
            // const ToDate = dayjs(toDate).format('DD-MM-YYYY')
            const ToDate = dayjs(refPdfData[refPdfData.length-1]?.startdate).format('YYYY-MM-DD')
            // const InvoiceDate = dayjs(Billingdate).format('YYYY-MM-DD')
            // const InvoiceDate = dayjs(Billingdate).format('DD-MM-YYYY')
            const InvoiceDate = dayjs(Billingdate).format('YYYY-MM-DD')
            if (rowSelectionModel.length === 0) {
                setError(true);
                setisSaveload(false)
                setErrorMessage("Please select the Row");
                return;
            }
            try {
                setisSaveload(true)
                const groupbillList = {
                    status: "Billed",
                    InvoiceDate: InvoiceDate,
                    Customer: customer,
                    FromDate: FromDate,
                    ToDate: ToDate,
                    Trips: TripsCount,
                    Amount: TotalAmount,
                    Trip_id: selectedRow,
                    State:stateNamce,
                    // station: department,
                    
                };
                console.log(groupbillList, 'group========');

                await axios.post(`${apiUrl}/GroupBillingList`, groupbillList);
                setSuccess(true)
                setisSaveload(false)
                setSuccessMessage("Successfully Added")
                setRows([])
            }
            // catch (err) {
            //     console.log(err, "errordetails");
            // }
            catch (error) {
                // console.error("Error occurredddddd:", error);

                // Check if there's no response, indicating a network error
                if (error.message) {
                    setError(true);
                    setisSaveload(false);
                    setErrorMessage("Check your internet connection");
                    // console.log('Network error');
                } else if (error.response) {
                    setError(true);
                    setisSaveload(false)
                    // Handle other Axios errors (like 4xx or 5xx responses)
                    setErrorMessage("Failed To Save: " + (error.response.data.message || error.message));
                } else {
                    // Fallback for other errors
                    setError(true);
                    setisSaveload(false)
                    setErrorMessage("An unexpected error occurred: " + error.message);
                }
            }
        }
        else {
            const TripsCount = rowSelectionModel.length;
            console.log(trips, 'tripssss', TripsCount, rows.length);

            let TotalAmount = 0; // Change from const to let
            rowSelectedValues?.forEach((li) => {
                TotalAmount += li;
            });
            console.log(rowSelectedValues,'rowselected values',groupAmount);
            
            const selectedTotal = rowSelectedValues?.reduce((sum, value) => sum + value, 0);
            const groupTotal = (groupAmount || []).reduce((sum, value) => sum + value, 0);
            console.log('groupbill22s', groupAmount, selectedTotal, 'tot', groupTotal + selectedTotal,'TotalAmount',TotalAmount);

            // const FromDate = dayjs(fromDate).format('YYYY-MM-DD')
            // const ToDate = dayjs(toDate).format('YYYY-MM-DD')
            // const InvoiceDate = dayjs(Billingdate).format('YYYY-MM-DD')
            const FromDate = dayjs(refPdfData[0]?.startdate).format('DD-MM-YYYY')
            const ToDate = dayjs(refPdfData[refPdfData.length-1]?.startdate).format('DD-MM-YYYY')
            const InvoiceDate = dayjs(Billingdate).format('DD-MM-YYYY')
            console.log(fromDate, ToDate, InvoiceDate, TripsCount, TotalAmount, 'usegroup');

            if (rowSelectionModel.length === 0) {
                setError(true);
                setErrorMessage("Please select the Row");
                return;
            }
            try {
                setisSaveload(true)
                const totalAmount = groupTotal + selectedTotal;
                // const trips = parseInt(groupBillingData[0].Trips)
                const Trip = particularId.length + rowSelectionModel.length
                const Trips = Trip.toString()
                const tripid = groupBillingData[0].Trip_id
                let tripIdArray = tripid.split(',');

                // Step 2: Add the selectedRow array to tripIdArray, then flatten it
                tripIdArray = [...tripIdArray, ...selectedRow.map(String)].flat();
                console.log(tripIdArray);
                const groupbillList = {
                    status: "Billed",
                    InvoiceDate: InvoiceDate,
                    Customer: customer,
                    FromDate: FromDate,
                    ToDate: ToDate,
                    Trips: Trips,
                    Amount: totalAmount,
                    Trip_id: tripIdArray,
                    State: stateNamce,
                    ReferenceNo: invoiceno
                };

                console.log(groupbillList, 'groupbill', groupBillingData, Trips, selectedRow, tripid, tripIdArray);
                await axios.post(`${apiUrl}/updateGroupBilling`, groupbillList)
                setSuccess(true)
                setisSaveload(false)
                setSuccessMessage("Successfully Added")
                setRows([])
            }
            catch (err) {
                setisSaveload(false)

            }
        }
    }

    const handleInvoicegenerate = async()=> {

        if (rowSelectionModel.length === 0) {
            setError(true);
            setErrorMessage("Please select the Row");
            return;
        }
        if (referInvoiceno === "created"){
            setError(true);
            setisBillload(false)
            setErrorMessage("Already INVOICE Generated");
            return;
        }
        console.log(selectedRow,"ROWTRIPD")
        try{
            setisBillload(true)
            const InvoiceDate1 = dayjs(Billingdate).format('YYYY-MM-DD')
          
            const groupinvoiceList = {
                InvoiceDate:InvoiceDate1,
                Trip_id: selectedRow,
                State:servicestation,
                ReferenceNo: invoiceno,
                Invoiceno:"created",
                
            };
            const response =await axios.post(`${apiUrl}/billgeneratecoveringbill`,groupinvoiceList)
            console.log(response)
            setSuccess(true)
            setisBillload(false)
            setSuccessMessage("Successfully Added")
            setRows([])


        }
        catch{
            setisBillload(false)
        }

    }


    return {
        rows,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleChange,
        hidePopup,
        invoiceno,
        setInvoiceno,
        selectedCustomerDatas,
        // handleKeyenter,
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
        handleCoverPDFDownload,
        columns,
        rowSelectionModel,
        setRowSelectionModel,
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
        handleInvoicegenerate,
        handlecustomer,disabeldata,referInvoiceno,setReferINVOICENO,isSaveload , setisSaveload,isgroupEditload , setisGfoupEditload,isBllload , setisBillload

    };
};

export default useGroupbilling;