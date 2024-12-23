import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { APIURL } from "../../../url";
import { useLocation } from "react-router-dom";
import { PdfData } from '../TransferReport/PdfContext';
import Excel from 'exceljs';


const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "department", headerName: "Station", width: 130 },
    { field: "apps", headerName: "Apps", width: 130 },
    { field: "startdate", headerName: "TripDate", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "tripid", headerName: "Trip No", width: 130 },
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "vehRegNo", headerName: "VehicleReg.No", width: 130 },
    { field: "vehType", headerName: "VehicleType", width: 130 },
    { field: "guestname", headerName: "UserName", width: 150 },
    { field: "groupname", headerName: "GroupName", width: 130 },
    { field: "totaltime", headerName: "Hours", width: 150 },
    { field: "totaldays", headerName: "Days", width: 150 },
    { field: "totalkm1", headerName: "KMS", width: 150 },
    { field: "duty", headerName: "Duty", width: 150 },
    { field: "permit", headerName: "Permit", width: 150 },
    { field: "parking", headerName: "Parking", width: 150 },
    { field: "billno", headerName: "BillNo", width: 130 },
    { field: "exHrs", headerName: "ExtraHrsAmount", width: 130 },
    { field: "exkm", headerName: "ExtrakmsAmount", width: 130 },
    { field: "totalcalcAmount", headerName: "Amount", width: 130 },
    { field: "grouptripno", headerName: "GroupTripNo", width: 130 },
    { field: "billtype", headerName: "BillType", width: 130 },
    { field: "advancepaidtovendor", headerName: "Advance", width: 130 },
    { field: "taxStatus", headerName: "TaxStatus", width: 130 },
];


const useTransferdataentry = () => {
    const apiUrl = APIURL;

    const [rows, setRows] = useState([]);
    const [totalKm, setTotalKM] = useState(0);
    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState("");
    const [tripData, setTripData] = useState('');
    const [toDate, setToDate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [totalTime, setTotalTime] = useState('');
    const [invoiceno, setInvoiceno] = useState("");
    const [groupId, setGroupId] = useState()
    const [fromDate, setFromDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [Billingdate, setBillingdate] = useState(dayjs());
    const [date] = useState(dayjs());
    const [totalAmount, setTotalAmount] = useState(0);
    // const [bankOptions, setBankOptions] = useState([]);
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [infoMessage, setINFOMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState({});
    const [servicestation, setServiceStation] = useState("");
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectedRow, setSelectedRow] = useState([])
    const [totalValue, setTotalValue] = useState(0)
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
    const [info, setInfo] = useState(false);
    const location = useLocation();
    const [transferId, setTransferId] = useState([])
    const [tripAmount, setTripAmount] = useState('')
    const [latestTripNo, setLatestTripNo] = useState([])
    const [latestGroupNo, setLatestGroupNo] = useState(0)
    const [lengthCheck, setLengthCheck] = useState()
    const [misGroupTripId, setMisGroupTripId] = useState([])
    const [removeTransferRow, setRemoveTransferRow] = useState(false)
    // const [formData, setFormData] = useState({})
    const { billingPage, setBillingPage } = PdfData()
    const [selectTripid, setSelectTripid] = useState([])
    const [loading, setLoading] = useState(false)
    const [matchTripID, setMatchTripID] = useState('')

    // loading //
    const [isbtnloading, setisbtnloading] = useState(false);
    const [iseditloading, setiseditloading] = useState(false);
    const [isbillloading, setisbillloading] = useState(false)

    //    Add and Edit Boolean 
    const [addEditTrigger, setAddEditTrigger] = useState(false)

    // Combined Rows for Grouptripid
    const [combinedRows, setCombinedRows] = useState([]);
    const [billedRowSelect, setBilledRowSelect] = useState(null)
    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';
        console.log(rows, "exceldata")

        try {

            const fileName = "Transfer_DataEntry"
            const worksheet = workbook.addWorksheet(workSheetName);
            const headers = Object.keys(rows[0]);
            const columns = headers.map(key => ({ key, header: key }));
            worksheet.columns = columns;

            // updated the font for first row.
            worksheet.getRow(1).font = { bold: true };

            // Set background color for header cells
            worksheet.getRow(1).eachCell((cell, colNumber) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '9BB0C1' } // Green background color
                };
            });

            worksheet.getRow(1).height = 30;
            // loop through all of the columns and set the alignment with width.
            worksheet.columns.forEach((column) => {
                column.width = column.header.length + 5;
                column.alignment = { horizontal: 'center', vertical: 'middle' };
            });

            rows.forEach((singleData, index) => {


                worksheet.addRow(singleData);

                // Adjust column width based on the length of the cell values in the added row
                worksheet.columns.forEach((column) => {
                    const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
                    const cellLength = cellValue.toString().length; // Get length of cell value as a string
                    const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

                    // Set column width to the maximum of current width and cell length plus extra space
                    column.width = Math.max(currentColumnWidth, cellLength + 5);
                });
            });

            // loop through all of the rows and set the outline style.
            worksheet.eachRow({ includeEmpty: false }, (row) => {
                // store each cell to currentCell
                const currentCell = row._cells;

                // loop through currentCell to apply border only for the non-empty cell of excel
                currentCell.forEach((singleCell) => {

                    const cellAddress = singleCell._address;

                    // apply border
                    worksheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
            });
            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (error) {
            console.error('<<<ERRROR>>>', error);
            console.error('Something Went Wrong', error.message);
        } finally {
            // removing worksheet's instance to create new one
            workbook.removeWorksheet(workSheetName);
        }
    }

    const handlePdfDownload = () => {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "tabloid" // [width, height] in inches
        });
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Transfer_DataEntry", 10, 10);
        const header = Object.keys(rows[0]);

        // Extracting body
        const body = rows.map(row => Object.values(row));
        let fontdata = 1;
        if (header.length <= 13) {
            fontdata = 16;
        }
        else if (header.length >= 14 && header.length <= 20) {
            fontdata = 11;
        } else if (header.length >= 21 && header.length <= 23) {
            fontdata = 9;
        }
        else if (header.length >= 24 && header.length <= 26) {
            fontdata = 7;
        }
        else if (header.length >= 27 && header.length <= 30) {
            fontdata = 6;
        }
        else if (header.length >= 31 && header.length <= 35) {
            fontdata = 4;
        }
        else if (header.length >= 36 && header.length <= 40) {
            fontdata = 4;
        }
        else if (header.length >= 41 && header.length <= 46) {
            fontdata = 2;
        }
        pdf.autoTable({
            head: [header],
            body: body,
            startY: 20,
            headStyles: {
                // fontSize: 5,
                fontSize: fontdata,
                cellPadding: 1.5, // Decrease padding in header
                minCellHeigh: 8,
                valign: 'middle',
                font: 'helvetica', // Set font type for body
                cellWidth: 'wrap',
                // cellWidth: 'auto'
            },

            bodyStyles: {
                fontSize: fontdata - 1,
                valign: 'middle',
                cellWidth: 'auto'
                // Adjust the font size for the body
            },
            columnWidth: 'auto'
        });
        const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
        console.log(scaleFactor, "SCALE")

        // Scale content
        pdf.scale(scaleFactor, scaleFactor);
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Transfer_DataEntry.pdf');
    };
    const handleCancel = () => {
        setBook('');
        setCustomer('');
        setRows([]);
        setTripData('');
        setServiceStation('');
        setSelectedCustomerDatas('');
        localStorage.removeItem('selectedcustomerdata');
        localStorage.removeItem('selectedcustomer');
        localStorage.removeItem('selectedcustomerid');
        localStorage.removeItem('fromDate');
        localStorage.removeItem('toDate');
        localStorage.removeItem('selectedRowCount');
    };

    // info box------------------

    const hidePopup = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setInfo(false);
    };
    useEffect(() => {
        if (error || success || warning || info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning, info]);

    //----------------------------------------------

    // useEffect(() => {
    //     Organization()
    //         .then((data) => {
    //             if (data) {
    //                 setBankOptions(data);
    //             } else {
    //                 setError(true);
    //                 setErrorMessage('Failed to fetch organization options.');
    //             }
    //         })
    //         .catch(() => {
    //             setError(true);
    //             setErrorMessage('Failed to fetch organization options.');
    //         });
    // }, []);

    // console.log(fromDate,toDate,'date');

    const [book, setBook] = useState({
        Billdate: '',
        Groupid: '',
        Invoice_no: '',
        customer: '',
        fromdate: '',
        todate: '',
        station: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const parameterKeys = [
            "Groupid", "Invoice_no", "Status", "Billdate", "Organization_name", "Trip_id", "FromDate", "EndDate", "Amount", "billingsheet", "Stations"
        ];

        const updatedFormData = {}; // New object to hold updated form data

        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                updatedFormData[key] = value; // Set the key-value pair in the new object
            }
        });
        // setFormData(updatedFormData); // Update formData state with the new object
        // Other state updates remain the same
        const transferlist = updatedFormData.Trip_id?.split(',').filter(item => item.trim() !== '');
        setTransferId(transferlist);
        setInvoiceno(updatedFormData.Invoice_no);
        setGroupId(updatedFormData.Groupid);
        setCustomer(updatedFormData.Organization_name);
        setFromDate(updatedFormData.FromDate || dayjs());
        setEndDate(updatedFormData.EndDate);
        setBillingdate(updatedFormData.Billdate);
        setServiceStation(updatedFormData.Stations);
        setTotalValue(parseInt(updatedFormData.Amount));
        setBillingPage(updatedFormData?.billingsheet)
        return () => {
            // setFormData({}); // Reset formData state to an empty object
        };
    }, [location, setBillingPage]);
    window.addEventListener('click', (event) => {
        if (event.target === window) {
            setBillingPage(false)
        }
    });
    useEffect(() => {
        if (billingPage === false) {
            setInvoiceno('');
            setTransferId([])
            setCustomer('');
            setGroupId('');
            setBook('')
            setSelectedCustomerDatas('');
            setServiceStation('');
            setFromDate(dayjs())
            // setFormData({});
            setRows([])
            setRowSelectionModel([])
        }
    }, [billingPage, setBillingPage])


    //old code  without loading
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {

    //             if (transferId?.length > 0 && transferId !== undefined) {

    //                 const response = await axios.get(`${apiUrl}/tripsheetiddata/${transferId}`);
    //                 const tripData = await response.data;
    //                 console.log("Transferlist to data entry")
    //                 if (Array.isArray(tripData)) {
    //                     const rowsWithUniqueId = tripData.map((row, index) => ({
    //                         ...row,
    //                         id: index + 1,
    //                     }));
    //                     setTripData(rowsWithUniqueId);
    //                     setRows(rowsWithUniqueId);
    //                 }
    //             }
    //         }
    //         catch (error) {
    //             console.log(error, "error");
    //         }
    //     }
    //     fetchData()
    // }, [transferId, billingPage, apiUrl, location])

    // my code with loading 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         //setLoading(true); // Set loading to true at the start

    //         try {
    //             if (transferId?.length > 0 && transferId !== undefined) {
    //                 const response = await axios.get(`${apiUrl}/tripsheetiddata/${transferId}`);
    //                 const tripData = await response.data;
    //                 console.log("Transferlist to data entry");

    //                 if (Array.isArray(tripData)) {
    //                     const rowsWithUniqueId = tripData.map((row, index) => ({
    //                         ...row,
    //                         id: index + 1,
    //                     }));
    //                     setTripData(rowsWithUniqueId);
    //                     setRows(rowsWithUniqueId);

    //                     // Check the length of tripData to set loading
    //                     if (rowsWithUniqueId.length !== 0) {
    //                         setLoading(false); // Set loading to false if tripData has items
    //                     } else {
    //                         setLoading(true); // Set loading to true if tripData is empty
    //                     }
    //                 } else {
    //                     setLoading(true); // Set loading to true if tripData is not an array
    //                 }
    //             } else {
    //                 setLoading(true); // Set loading to true if transferId is invalid
    //             }
    //         } catch (error) {
    //             console.log(error, "error");
    //             setLoading(true); // Set loading to true on error
    //         }
    //     };

    //     fetchData();
    // }, [transferId, billingPage, apiUrl, location]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true at the start

            try {
                if (transferId?.length > 0) {
                    const response = await axios.get(`${apiUrl}/tripsheetiddata/${transferId}`);
                    const tripData = await response.data;


                    if (Array.isArray(tripData)) {
                        const rowsWithUniqueId = tripData.map((row, index) => ({
                            ...row,
                            id: index + 1,
                        }));
                        setTripData(rowsWithUniqueId);
                        setRows(rowsWithUniqueId);
                    }
                    // No need to set loading here; it will be false at the end
                }
            } catch (error) {
                console.log(error, "error");
            } finally {
                // This will run after the try or catch block, ensuring loading is set to false when done
                setLoading(false); // Set loading to false after fetching is complete
            }
        };

        fetchData();
    }, [transferId, billingPage, apiUrl, location]);



    //calculate total amount in column
    useEffect(() => {
        const calculatedTotalAmount = rows.reduce((total, row) => total + parseFloat(row.totalcalcAmount || 0), 0);
        if (!isNaN(calculatedTotalAmount)) {
            setTotalAmount(calculatedTotalAmount.toFixed(2));
        } else {
            setTotalAmount("0");
        }
    }, [rows]);

    //calculate total KM in column
    useEffect(() => {
        const calculatedTotalKM = rows.reduce((total, row) => total + parseFloat(row.totalkm1 || 0), 0);
        if (!isNaN(calculatedTotalKM)) {
            setTotalKM(calculatedTotalKM.toFixed(2));
        } else {
            setTotalKM("0");
        }
    }, [rows]);

    //calculate total time in column
    const parseTimeToMinutes = (timeString) => {
        const [hoursStr, minutesStr] = timeString?.split(' ');
        const hours = parseInt(hoursStr?.replace('h', ''), 10) || 0;
        const minutes = parseInt(minutesStr?.replace('m', ''), 10) || 0;
        return hours * 60 + minutes;
    };

    // Calculate total time in minutes from the "totaltime" column
    useEffect(() => {
        const calculatedTotalTimeInMinutes = rows.reduce((totalMinutes, row) => {
            return totalMinutes + parseTimeToMinutes(row.totaltime || '0h 0m');
        }, 0);
        // Convert total minutes back to the format "3h 49m"
        const hours = Math.floor(calculatedTotalTimeInMinutes / 60);
        const minutes = calculatedTotalTimeInMinutes % 60;
        const formattedTotalTime = `${hours}h ${minutes}m`;
        setTotalTime(formattedTotalTime);
    }, [rows]);

    useEffect(() => {
        window.history.replaceState(null, document.title, window.location.pathname);
    }, []);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;

        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,

        }));

    }, [setBook]);
    const handlechnageinvoice = (event) => {
        setInvoiceno(event.target.value)
    }
    // const handleserviceInputChange = (event, newValue) => {
    //     console.log("sattaions added")
    //     setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    // };



    const handleRowSelection = (newSelectionModel) => {
        console.log(newSelectionModel, "enter select");

        const selectedTripIds = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow.tripid : null;
            })
            .filter((tripid) => tripid !== null);

        const selectedBilledTrips = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = combinedRows.find((row) => row.id === parseInt(selectedId));
                return selectedRow && selectedRow.status === "Billed" ? selectedRow : null;
            })
            .filter((tripid) => tripid !== null);
          
        setBilledRowSelect(selectedBilledTrips)

        const selectedTrips = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? selectedRow : null;
            })
            .filter((tripid) => tripid !== null);
        setSelectTripid(selectedTrips)

        const selectedTripAmount = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                const amount = selectedRow ? parseInt(selectedRow.totalcalcAmount) : null;
                // Only replace NaN with 0, keep other values as they are
                return isNaN(amount) ? 0 : amount;
            });

        // selected trips
        const totalSelectedTripAmount = selectedTripAmount.reduce((total, amount) => total + amount, 0) || 0;

        setTripAmount(totalSelectedTripAmount)
        setSelectedRow(selectedTrips)
        const tripsheetid = selectedTripIds;
        setRowSelectionModel(tripsheetid);
        localStorage.setItem('selectedtripsheetid', tripsheetid);
        const selectedRowCount = selectedTripIds.length;
        localStorage.setItem('selectedrowcount', selectedRowCount);
    };
    const handleClickGenerateBill = () => {
        handleButtonClickTripsheet();
    };

    // const handleButtonClickTripsheet = async() => {
    //     const customerdata = encodeURIComponent(customer || selectedCustomerDatas.customer || tripData.customer || localStorage.getItem('selectedcustomer'));
    //     const customername = customerdata;
    //     const response = await axios.put(`${apiUrl}/statusChangeTransfer/${invoiceno}`)
    //     localStorage.setItem('selectedcustomer', customername);
    //     const storedCustomer = localStorage.getItem('selectedcustomer');
    //     const decodedCustomer = decodeURIComponent(storedCustomer);
    //     localStorage.setItem('selectedcustomerdata', decodedCustomer);
    //     const billingPageUrl = `/home/billing/transfer?tab=TransferReport&Invoice_no=${invoiceno}&Group_id=${groupId}&Customer=${customer}&FromDate=${fromDate}&EndDate=${endDate}&BillDate=${Billingdate}`;
    //     window.location.href = billingPageUrl;
    // }
    // const handleButtonClickTripsheet = async () => {
    //     try {
    //         // Validate rowSelectionModel
    //         if (!rowSelectionModel) {
    //             console.error('Error: rowSelectionModel is undefined or null');
    //             return;
    //         }

    //         const id = rowSelectionModel;
    //         // console.log(id,'checkid');
    //         const customerdata = encodeURIComponent(customer || selectedCustomerDatas.customer || tripData.customer || localStorage.getItem('selectedcustomer'));

    //         // Sending PUT requests
    //         const response = await axios.put(`${apiUrl}/statusChangeTransfer/${invoiceno}`);
    //         const Tripresponse = await axios.put(`${apiUrl}/statusChangeTripsheet/${id}`);
    //         console.log(response, Tripresponse, 'check response');
    //         // Setting selected customer data in local storage
    //         localStorage.setItem('selectedcustomer', customerdata);
    //         const storedCustomer = localStorage.getItem('selectedcustomer');
    //         const decodedCustomer = decodeURIComponent(storedCustomer);
    //         localStorage.setItem('selectedcustomerdata', decodedCustomer);

    //         // Constructing billing page URL
    //         const billingPageUrl = `/home/billing/transfer?tab=TransferReport&Invoice_no=${invoiceno}&Group_id=${groupId}&Customer=${customer}&FromDate=${fromDate}&EndDate=${endDate}&TripId=${id}&BillDate=${Billingdate}&TransferReport=true&Status=Billed`;

    //         // Redirecting to billing page
    //         window.location.href = billingPageUrl;
    //     } catch (error) {
    //         // Handle any errors that occurred during the requests
    //         console.error('Error:', error.message); // You can add custom error handling here
    //     }
    // };

    // my code 
    const handleButtonClickTripsheet = async () => {
        try {

            // Validate rowSelectionModel
            // if (!rowSelectionModel) {
            //     console.error('Error: rowSelectionModel is undefined or null');
            //     return;
            // }
            if (rowSelectionModel.length === 0) {
                setError(true)
                setErrorMessage("Please select the Row")
                return
            }
            setisbillloading(true)

            const id = rowSelectionModel;
            const tripDetails = selectTripid.map(item => ({
                tripid: item.tripid,
                totalcalcAmount: item.totalcalcAmount
            }));

            // Filter valid trips and invalid trips
            const validTrips = tripDetails.filter(trip => trip.totalcalcAmount > 0);
            const invalidTrips = tripDetails.filter(trip => trip.totalcalcAmount === 0 || trip.totalcalcAmount === null);

            // If there are invalid trips, show an error message
            if (invalidTrips.length > 0) {
                const invalidTripIds = invalidTrips.map(trip => trip.tripid).join(', ');
                console.log(`The following trip IDs are invalid (amount is zero or null): ${invalidTripIds}`);
                setError(true);
                setErrorMessage(`Invalid trip IDs: ${invalidTripIds}`); // Set error message
            }

            // Proceed only with valid trips
            if (validTrips.length === 0) {
                return; // If there are no valid trips, exit the function
            }
            // console.log(id,'checkid');
            const customerdata = encodeURIComponent(customer || selectedCustomerDatas.customer || tripData.customer || localStorage.getItem('selectedcustomer'));

            // Sending PUT requests
            // const response = await axios.put(`${apiUrl}/statusChangeTransfer/${invoiceno}`);
            const response = await axios.put(`${apiUrl}/statusChangeTransfer/${groupId}/${servicestation}`);
            const Tripresponse = await axios.put(`${apiUrl}/statusChangeTripsheet/${id}`);
            const responseinvoice = await axios.get(`${apiUrl}/Transferlistgetinvoicenolast/${groupId}`);
            const invoicenodata = responseinvoice.data;
            const invoicenovalue = invoicenodata[0].Invoice_no
            console.log(response, Tripresponse, 'check response');
            // Setting selected customer data in local storage
            localStorage.setItem('selectedcustomer', customerdata);
            const storedCustomer = localStorage.getItem('selectedcustomer');
            const decodedCustomer = decodeURIComponent(storedCustomer);
            localStorage.setItem('selectedcustomerdata', decodedCustomer);

            // Constructing billing page URL
            // const billingPageUrl = `/home/billing/transfer?tab=TransferReport&Invoice_no=${invoiceno}&Group_id=${groupId}&Customer=${customer}&FromDate=${fromDate}&EndDate=${endDate}&TripId=${id}&BillDate=${Billingdate}&State=${servicestation}&TransferReport=true&Status=Billed`;
            const billingPageUrl = `/home/billing/transfer?tab=TransferReport&Invoice_no=${invoicenovalue}&Group_id=${groupId}&Customer=${customer}&FromDate=${fromDate}&EndDate=${endDate}&TripId=${id}&BillDate=${Billingdate}&State=${servicestation}&TransferReport=true&Status=Billed`;


            // Redirecting to billing page
            window.location.href = billingPageUrl;
            setisbillloading(false)
        }
        // catch (error) {
        //     // Handle any errors that occurred during the requests
        //     console.error('Error:', error.message); // You can add custom error handling here
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setisbillloading(false)
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                setisbillloading(false)
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setisbillloading(false)
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };




    // const handleBillGenerate = async () => {
    //     if (rowSelectionModel.length === 0) {
    //         setError(true);
    //         setErrorMessage('Please select rows before generating the bill.');
    //         return;
    //     }

    //     try {
    //         const tripids = rowSelectionModel;
    //         if (tripids.some((tripid) => tripid === null || tripid === undefined)) {
    //             setError(true);
    //             setErrorMessage('Invalid tripids. Please check the selected rows and try again.');
    //             return;
    //         }
    //         handleAdd();
    //         handleButtonClickTripsheet();
    //         const response = await axios.post(`${apiUrl}/updateStatus`, {
    //             tripids: tripids.filter((tripid) => tripid !== null && tripid !== undefined),
    //             status: 'CBilled',
    //         });
    //         if (response.status === 200) {
    //             setSuccess(true);
    //             setSuccessMessage('Bill generated successfully!');
    //         } else {
    //             setError(true);
    //             setErrorMessage('Failed to generate bill. Please try again.');
    //         }
    //     } catch {
    //         setError(true);
    //         setErrorMessage('An error occurred. Please try again later.');
    //     }

    // };


    // const handleAdd = async () => {

    //     const selectedRowCount = localStorage.getItem('selectedrowcount');
    //     const selectedTripIds = localStorage.getItem('selectedtripsheetid');
    //     const firstSelectedRow = rows.find(row => row.id === parseInt(selectedTripIds[0], 10));
    //     const guestnameFromFirstRow = firstSelectedRow ? firstSelectedRow.guestname : '';

    //     const updatedBook = {
    //         ...book,
    //         Billingdate: Billingdate || book.Billdate,
    //         Invoice_no: invoiceno || book.Invoice_no,
    //         customer: customer || selectedCustomerDatas?.customer || (tripData.length > 0 ? tripData[0].customer : '') || '',
    //         fromdate: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : book.fromdate.format('YYYY-MM-DD'),
    //         todate: toDate ? dayjs(toDate).format('YYYY-MM-DD') : book.todate.format('YYYY-MM-DD'),
    //         station: servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '',
    //         Totalamount: totalAmount,
    //         status: 'Billed',
    //         trips: selectedRowCount,
    //         guestname: guestnameFromFirstRow,
    //     };
    //     await axios.post(`${apiUrl}/billing`, updatedBook);
    //     setSuccess(true);
    //     setSuccessMessage("Successfully Added");

    // };

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
    // const handleAddOrganization = async () => {
    //     if (rowSelectionModel.length === 0) {
    //         setError(true)
    //         setErrorMessage("Please select the Row")
    //         return
    //     }
    //     try {
    //         if (!rows || rows.length === 0) {
    //             throw new Error("Rows data is empty");
    //         }

    //         const fromdate = rows[0]?.startdate;
    //         const enddate = rows[rows.length - 1]?.startdate;
    //         const fromDate = dayjs(fromdate).format('YYYY-MM-DD');
    //         const EndDate = dayjs(enddate).format('YYYY-MM-DD');

    //         const billdate = selectedCustomerDatas?.Billingdate || Billingdate;
    //         const billDate = dayjs(billdate).format('YYYY-MM-DD');

    //         const OrganizationName = selectedCustomerDatas.customer || customer;
    //         const Trips = rowSelectionModel.length;
    //         const billstatus = "notbilled";


    //         const transferlist = {
    //             Status: billstatus,
    //             Billdate: billDate,
    //             Organization_name: OrganizationName,
    //             Trip_id: rowSelectionModel,
    //             FromDate: fromDate,
    //             EndDate: EndDate,
    //             Trips: Trips,
    //             Amount: tripAmount,

    //         }
    //         await axios.post(`${apiUrl}/transferlistdatatrip`, transferlist);
    //         setSuccess(true);
    //         setSuccessMessage("Successfully added");
    //         setRows([])
    //         const billingPageUrl = `/home/billing/transfer`
    //         window.location.href = billingPageUrl



    //     } catch (error) {
    //         console.error("Error occurred:", error);
    //         setErrorMessage("Failed to add organization: " + error.message);
    //     }
    // }

    //my code
    const handleAddOrganization = async () => {
        if (rowSelectionModel.length === 0) {
            setError(true)
            setErrorMessage("Please select the Row")
            return
        }
        // Map to get trip details
        const tripDetails = selectTripid.map(item => ({
            tripid: item.tripid,
            totalcalcAmount: item.totalcalcAmount
        }));

        // Filter valid trips and invalid trips
        const validTrips = tripDetails.filter(trip => trip.totalcalcAmount > 0);
        const invalidTrips = tripDetails.filter(trip => trip.totalcalcAmount === 0 || trip.totalcalcAmount === null);

        // If there are invalid trips, show an error message
        if (invalidTrips.length > 0) {
            const invalidTripIds = invalidTrips.map(trip => trip.tripid).join(', ');
            console.log(`The following trip IDs are invalid (amount is zero or null): ${invalidTripIds}`);
            setError(true);
            // setErrorMessage(`Invalid trip IDs: ${invalidTripIds}`); // Set error message
            setErrorMessage(`Check ${invalidTripIds} Trip ID`); // Set error message
        }

        // Proceed only with valid trips
        if (validTrips.length === 0) {
            return; // If there are no valid trips, exit the function
        }
        try {
            if (!rows || rows.length === 0) {
                throw new Error("Rows data is empty");
            }

            const fromdate = rows[0]?.startdate;
            const enddate = rows[rows.length - 1]?.startdate;
            const fromDate = dayjs(fromdate).format('YYYY-MM-DD');
            const EndDate = dayjs(enddate).format('YYYY-MM-DD');

            const billdate = selectedCustomerDatas?.Billingdate || Billingdate;
            const billDate = dayjs(billdate).format('YYYY-MM-DD');

            const OrganizationName = selectedCustomerDatas.customer || customer;
            const Trips = rowSelectionModel.length;
            const billstatus = "notbilled";


            // const transferlist = {
            //     Status: billstatus,
            //     Billdate: billDate,
            //     Organization_name: OrganizationName,
            //     Trip_id: rowSelectionModel,
            //     FromDate: fromDate,
            //     EndDate: EndDate,
            //     Trips: Trips,
            //     Amount: tripAmount,

            // }

            // Construct the transfer list with valid trips and their amounts
            const transferlist = {
                Status: billstatus,
                Billdate: billDate,
                Organization_name: OrganizationName,
                Trip_id: validTrips.map(trip => trip.tripid), // Only include valid trip IDs
                Amount: validTrips.reduce((total, trip) => total + trip.totalcalcAmount, 0), // Sum of valid amounts
                FromDate: fromDate,
                EndDate: EndDate,
                Trips: Trips,
            };

            setMisGroupTripId(validTrips.map(trip => trip.tripid));

            // Log the valid trips and transfer list for debugging
            console.log(validTrips, 'Valid Trips for posting');
            console.log(transferlist, 'Transfer List to be posted');

            // await axios.post(`${apiUrl}/transferlistdatatrip`, transferlist);
            setSuccess(true);
            setSuccessMessage("Successfully added");
            setRows([])
            const billingPageUrl = `/home/billing/transfer`
            window.location.href = billingPageUrl



        } catch (error) {
            console.error("Error occurred:", error);
            setErrorMessage("Failed to add organization: " + error.message);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            // Execute the delete query and reset formData
            if (lengthCheck === 0 || lengthCheck !== undefined) {
                try {
                    // Execute the delete query
                    const getresponse = await axios.delete(`${apiUrl}/deleteTransfer/${latestGroupNo}`);
                    console.log(getresponse, 'Deleted Successfully');
                    setBillingPage(false)


                } catch (error) {
                    console.error(error, 'Error deleting transfer');
                    // Handle error if necessary
                }
            }
        };
        fetchData();
    }, [apiUrl, lengthCheck, latestGroupNo, location, setBillingPage]);


    useEffect(() => {
        const fetchData = async () => {

            if (groupId) {
                const result = await axios.get(`${apiUrl}/updateTransferListdata/${groupId}`)
                const response = result.data
                const trip = response?.map(li => li.Trip_id);
                const tripString = trip.join(','); // Join the trip IDs with commas
                const a = tripString.split(','); // Split the string into an array
                const b = a.map((li) => parseInt(li)) || ""
                //console.log(b, 'update34');

                setLatestTripNo(b)
                const groupid = response?.map(li => li.Grouptrip_id)[0];
                const groupTripid = parseInt(groupid)
                setLatestGroupNo(groupTripid)

            }
        }
        fetchData()
    }, [apiUrl, groupId, removeTransferRow])

    const handleRemove = async () => {
        const tripid = selectedRow?.map(row => row.tripid.toString());
        const totalPrice = selectedRow.reduce((sum, li) => sum + li.totalcalcAmount, 0);
        const ActualAmount = parseInt(totalAmount) - totalPrice
        const Trips = rows.length - selectedRow.length;
        const selectId = selectedRow?.map(row => row.id)

        const TransferUpdate = {
            Trip_id: tripid,
            Amount: ActualAmount,
            Trips: Trips,

        }
        try {
            const resultresponse = await axios.put(`${apiUrl}/updateList`, TransferUpdate)
            const updatedRows = rows.filter(row => !selectId.includes(row.id));
            setSuccess(true)
            setSuccessMessage("Successfully Removed")
            setRows(updatedRows);
            setSelectedRow([]);
            setMatchTripID('')
            setRowSelectionModel([])
            setCombinedRows(updatedRows)

            const responsedata = resultresponse.data
            if (responsedata.affectedRows > 0) {
                const updatedRows = rows.filter(row => !selectId.includes(row.id));

                setRemoveTransferRow(!removeTransferRow)
                setRowSelectionModel([])
                setRows(updatedRows);
                setSelectedRow([]);
                setCombinedRows(updatedRows)

            }

        }
        catch (err) {
            console.log(err, 'error');
        }

    }



    const handleBillRemove = async () => {
        const tripid = selectedRow?.map(row => row.tripid.toString());
        // const tripid = selectedRow?.map((li)=>li.tripid.toString())
        const selectId = selectedRow?.map(row => row.id)
        const Amount = selectedRow?.map(li => li.netamount.split(',')).flat();
        const trips = transferId.length - tripid?.length
        const Trips = trips.toString()
        const totalAmount = Amount.reduce((acc, curr) => acc + parseFloat(curr), 0);
        const amount = totalValue - totalAmount
        const TotalAmount = amount.toString()
        const updatedRows = rows.filter(row => !selectId.includes(row.id));
        const totalPrice = selectedRow.reduce((sum, li) => sum + li.totalcalcAmount, 0);
        const ActualAmount = parseInt(totalAmount) - totalPrice

        if (rowSelectionModel.length === 0) {
            setError(true);
            setErrorMessage('Please select rows before generating the bill.');
            return;
        }
        setRows(updatedRows);
        setSelectedRow([]);
        try {
            const response = await axios.post(`${apiUrl}/tripsheetUpdate`, {
                tripids: tripid,
                status: 'Opened',
            });
            console.log(response, 'Tripsheet Response Status');
            const tripids = rowSelectionModel;
            const TransferUpdate = {
                Trip_id: tripid,
                Amount: TotalAmount,
                Trips: Trips,

            }

            if (tripids.some((tripid) => tripid == null)) {
                setError(true);
                setErrorMessage('Invalid tripids. Please check the selected rows and try again.');
                return;
            }

            const updatedRows = rows.filter(row => !selectId.includes(row.id));

            setRows(updatedRows);
            setSelectedRow([]);
            const lengthofrow = selectedRow.length - latestTripNo.length;
            setLengthCheck(lengthofrow)
            try {
                const resultresponse = await axios.put(`${apiUrl}/updateList`, TransferUpdate)
                const updatedRows = rows.filter(row => !selectId.includes(row.id));

                setRows(updatedRows);
                setSelectedRow([]);
                const responsedata = resultresponse.data
                if (responsedata.affectedRows > 0) {
                    const updatedRows = rows.filter(row => !selectId.includes(row.id));

                    setRows(updatedRows);
                    setSelectedRow([]);
                    if (latestTripNo.length === 0) {
                        const getresponse = await axios.delete(`${apiUrl}/deleteTransfer/${latestGroupNo}`)
                        console.log(getresponse, 'Deleeeted Successfully');
                    }
                }

            }
            catch (err) {
                console.log(err, 'error');
            }

        } catch (err) {
            setError(true);
            setErrorMessage('An error occurred. Please try again later.');
            console.log(err, 'error');
        }
        setRows(updatedRows);
        setSelectedRow([]);
    };

    // const handleKeyenter = useCallback(async (event) => {

    //     if (event.key === 'Enter') {
    //         try {
    //             const invoiceNumber = book.Invoice_no || invoiceno || selectedCustomerDatas.invoiceno;
    //             console.log(invoiceNumber,"ppppppp")
    //             const response = await axios.get(`${apiUrl}/billingdata/${invoiceNumber}`);
    //             if (response.status === 200) {
    //                 const billingDetails = response.data;
    //                 if (billingDetails) {
    //                     setSelectedCustomerDatas(billingDetails);
    //                     setSuccess(true);
    //                     setSuccessMessage("Successfully listed");
    //                 } else {
    //                     setRows([]);
    //                     setError(true);
    //                     setErrorMessage("No data found");
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

    //     const handleShow = async () => {
    //         const servicestationValue = servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '';
    // console.log('11',servicestationValue);


    //         if (servicestationValue !== "" && servicestationValue !== "All") {
    //             try {
    //                 console.log('22',servicestationValue);

    //                 const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
    //                 const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
    //                 const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
    //                 const servicestationValue = servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '';

    //                 const response = await axios.get(`${apiUrl}/Transfer-Billing`, {
    //                     params: {
    //                         customer: customerValue,
    //                         fromDate: fromDateValue,
    //                         toDate: toDateValue,
    //                         servicestation: servicestationValue
    //                     },
    //                 });
    //                 const data = response.data;
    //                 if (data.length > 0) {
    //                     const rowsWithUniqueId = data.map((row, index) => ({
    //                         ...row,
    //                         id: index + 1,
    //                     }));
    //                     setRows(rowsWithUniqueId);
    //                     setSuccess(true);
    //                     setSuccessMessage("successfully listed")
    //                 } else {
    //                     setRows([]);
    //                     setError(true);
    //                     setErrorMessage("no data found")
    //                 }
    //             } catch {
    //                 console.log('33',servicestationValue);
    //                 setRows([]);
    //                 setError(true);
    //                 setErrorMessage("Check your Network Connection");
    //             }
    //         }
    //         else if (servicestationValue === "All" || servicestationValue === "") {
    //             try {
    //                 const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
    //                 const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
    //                 const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');

    //                 const response = await axios.get(`${apiUrl}/All-Transfer-Billing`, {
    //                     params: {
    //                         customer: customerValue,
    //                         fromDate: fromDateValue,
    //                         toDate: toDateValue,
    //                     },
    //                 });
    //                 const data = response.data;
    //                 if (data.length > 0) {
    //                     const rowsWithUniqueId = data.map((row, index) => ({
    //                         ...row,
    //                         id: index + 1,
    //                     }));
    //                     setRows(rowsWithUniqueId);
    //                     setSuccess(true);
    //                     setSuccessMessage("successfully listed")
    //                 } else {
    //                     setRows([]);
    //                     setError(true);
    //                     setErrorMessage("no data found")
    //                 }
    //             } catch {
    //                 setRows([]);
    //                 setError(true);
    //                 setErrorMessage("Check your Network Connection");
    //             }
    //         }

    //     };


    //working code
    const handleShow = async () => {
        setAddEditTrigger(true)
        if (!customer) {
            setError(true)
            setErrorMessage("Please Enter the Customer")
            return
        }
        setLoading(true); // Stop loading
        // const servicestationValue = servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '';

        // if (servicestationValue !== "" && servicestationValue !== "All") {

        try {

            const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
            const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate) || dayjs(fromDate).format('YYYY-MM-DD');
            const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate) || dayjs(toDate).format('YYYY-MM-DD');
            console.log('22', fromDate, toDate, fromDateValue, toDateValue);
            const enddate = dayjs(toDateValue).format('YYYY-MM-DD')
            const fromdate = dayjs(fromDateValue).format('YYYY-MM-DD')
            // console.log('22', servicestationValue, enddate, fromdate, customerValue);

            // console.log('Request URL:', `${apiUrl}/Transfer-Billing`);
            // console.log('Params:', {
            //     customer: customerValue,
            //     fromDate: fromdate,
            //     toDate: enddate,
            //     servicestation: servicestationValue

            // });
            // const stationsName = await customerMotherdatagroupstation(selectedCustomerDatas.customer || customer);
            // setServiceStation(stationsName)

            console.log(customerValue, fromDate, enddate, '=====================');

            const response = await axios.get(`${apiUrl}/Transfer-Billing`, {
                params: {
                    customer: customerValue,
                    fromDate: fromdate,
                    toDate: enddate,
                    // servicestation: servicestationValue
                },
            });

            const data = response.data;


            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                console.log(rowsWithUniqueId, "enter 1111");
                console.log(combinedRows, "enter 2222222");

                if (!combinedRows || combinedRows.length === 0) {
                    // setCombinedRows(rowsWithUniqueId);  // Initialize with rowsWithUniqueId if empty
                    setRows(rowsWithUniqueId);
                } else {
                    // Add rowsWithUniqueId to combinedRows
                    // setCombinedRows(prevCombinedRows => [
                    //     ...prevCombinedRows, 
                    //     ...rowsWithUniqueId
                    // ]);     
                    const newCombinedRows = [...combinedRows, ...rowsWithUniqueId];

                    const updatedCombinedRows = newCombinedRows.map((row, index) => ({
                        ...row,
                        id: index + 1, // Reassign id starting from 1
                    }));

                    console.log(updatedCombinedRows, " enter Combined and Updated Rows");

                    // Now update combinedRows with the updated data
                    // setCombinedRows(updatedCombinedRows);
                    setRows(updatedCombinedRows);

                }

                // setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("successfully listed");
                setLoading(false); // Stop loading

            } else {
                // setRows([]);
                setError(true);
                setErrorMessage("no data found");
            }
        } catch (error) {

            // setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
        } finally {
            setLoading(false); // Stop loading
        }
        // }
        // else if (servicestationValue === "All" || servicestationValue === "") {
        //     const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
        //     setLoading(true); // Stop loading
        //     try {
        //         // Ensure that date values are correctly formatted
        //         const fromDateValue = dayjs(selectedCustomerDatas?.fromdate ? selectedCustomerDatas.fromdate : fromDate).isValid()
        //             ? dayjs(selectedCustomerDatas?.fromdate ? selectedCustomerDatas.fromdate : fromDate).format('YYYY-MM-DD')
        //             : '';

        //         const toDateValue = dayjs(selectedCustomerDatas?.todate ? selectedCustomerDatas.todate : toDate).isValid()
        //             ? dayjs(selectedCustomerDatas?.todate ? selectedCustomerDatas.todate : toDate).format('YYYY-MM-DD')
        //             : '';

        //         // `toDateValue` is already formatted, so we don't need to reformat it again
        //         const enddate = toDateValue;
        //         const stationsName = await customerMotherdatagroupstation(selectedCustomerDatas.customer || customer);
        //         setServiceStation(stationsName)

        //         const response = await axios.get(`${apiUrl}/All-Transfer-Billing`, {
        //             params: {
        //                 customer: customerValue,
        //                 fromDate: fromDateValue,
        //                 toDate: enddate,
        //             },
        //         });

        //         // const data = response.data;
        //         // console.log('ResponseData',data)
        //         // console.log('Total Calculated Amount:', data.totalcalcAmount)

        //         // my code 

        //         const data = response.data;
        //         console.log('Full Response', data)


        //         const filteredData = data.filter(item => item.totalcalcAmount === 0 || item.totalcalcAmount === null);

        //         const mappedData = filteredData.map(item => {

        //             return {
        //                 id: item.id,
        //                 Tripid: item.tripid,
        //                 Booking: item.bookingno,
        //                 Status: item.status,
        //                 totalcalcAmount: item.totalcalcAmount,

        //             };
        //         });


        //         console.log('Filtered Data with totalcalcAmount as 0 or null:', mappedData);


        //         if (data.length > 0) {
        //             const rowsWithUniqueId = data.map((row, index) => ({
        //                 ...row,
        //                 id: index + 1,
        //             }));
        //             setRows(rowsWithUniqueId);
        //             setSuccess(true);
        //             setSuccessMessage("successfully listed");
        //         } else {
        //             setRows([]);
        //             setError(true);
        //             setErrorMessage("no data found");
        //         }
        //     } catch (error) {
        //         console.log('Error:', error.message);
        //         console.log('Error Details:', error);
        //         setRows([]);
        //         setError(true);
        //         setErrorMessage("Check your Network Connection");
        //     } finally {
        //         setLoading(false); // Stop loading
        //     }
        // }

    };

    // const handleShow = async () => {
    //     const servicestationValue = servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '';
    //     setLoading(true); // Start loading

    //     try {
    //         if (servicestationValue !== "" && servicestationValue !== "All") {
    //             const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
    //             const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate) || dayjs(fromDate).format('YYYY-MM-DD');
    //             const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate) || dayjs(toDate).format('YYYY-MM-DD');

    //             const enddate = dayjs(toDateValue).format('YYYY-MM-DD');

    //             const response = await axios.get(`${apiUrl}/Transfer-Billing`, {
    //                 params: {
    //                     customer: customerValue,
    //                     fromDate: fromDateValue,
    //                     toDate: enddate,
    //                     servicestation: servicestationValue,
    //                 },
    //             });

    //             const data = response.data;
    //             if (data && data.length > 0) {
    //                 const rowsWithUniqueId = data.map((row, index) => ({
    //                     ...row,
    //                     id: index + 1,
    //                 }));
    //                 setRows(rowsWithUniqueId);
    //                 setSuccess(true);
    //                 setSuccessMessage("successfully listed");
    //             } else {
    //                 setRows([]);
    //                 setError(true);
    //                 setErrorMessage("no data found");
    //             }
    //         } else if (servicestationValue === "All" || servicestationValue === "") {
    //             const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');

    //             const fromDateValue = dayjs(selectedCustomerDatas?.fromdate ? selectedCustomerDatas.fromdate : fromDate).isValid()
    //                 ? dayjs(selectedCustomerDatas?.fromdate ? selectedCustomerDatas.fromdate : fromDate).format('YYYY-MM-DD')
    //                 : '';

    //             const toDateValue = dayjs(selectedCustomerDatas?.todate ? selectedCustomerDatas.todate : toDate).isValid()
    //                 ? dayjs(selectedCustomerDatas?.todate ? selectedCustomerDatas.todate : toDate).format('YYYY-MM-DD')
    //                 : '';

    //             const response = await axios.get(`${apiUrl}/All-Transfer-Billing`, {
    //                 params: {
    //                     customer: customerValue,
    //                     fromDate: fromDateValue,
    //                     toDate: toDateValue,
    //                 },
    //             });

    //             const data = response.data;
    //             const filteredData = data.filter(item => item.totalcalcAmount === 0 || item.totalcalcAmount === null);
    //             const mappedData = filteredData.map(item => ({
    //                 id: item.id,
    //                 Tripid: item.tripid,
    //                 Booking: item.bookingno,
    //                 Status: item.status,
    //                 totalcalcAmount: item.totalcalcAmount,
    //             }));

    //             if (mappedData.length > 0) {
    //                 setRows(mappedData);
    //                 setSuccess(true);
    //                 setSuccessMessage("successfully listed");
    //             } else {
    //                 setRows([]);
    //                 setError(true);
    //                 setErrorMessage("no data found");
    //             }
    //         }
    //     } catch (error) {
    //         console.log('Error:', error.message);
    //         console.log('Error Details:', error);
    //         setRows([]);
    //         setError(true);
    //         // setErrorMessage("Check your Network Connection");
    //     } finally {
    //         setLoading(false); // Ensure loading is stopped in finally block
    //     }
    // };



    // const handleAddGroup = async () => {

    //     if (rowSelectionModel.length === 0) {
    //         setError(true)
    //         setErrorMessage("Please select the Row")
    //        // console.log("Row selection model is empty:", rowSelectionModel);
    //         return

    //     }
    //     if (groupId === "") {

    //         try {
    //             if (!rows || rows.length === 0) {
    //                 throw new Error("Rows data is empty");
    //             }

    //             const fromdate = rows[0]?.startdate;
    //             const enddate = rows[rows.length - 1]?.startdate;
    //             const fromDate = dayjs(fromdate).format('YYYY-MM-DD');
    //             const EndDate = dayjs(enddate).format('YYYY-MM-DD');

    //             const billdate = selectedCustomerDatas?.Billingdate || Billingdate;
    //             const billDate = dayjs(billdate).format('YYYY-MM-DD');

    //             const OrganizationName = selectedCustomerDatas.customer || customer;
    //             const Trips = rowSelectionModel.length;
    //             const billstatus = "notbilled";


    //             const transferlist = {
    //                 Status: billstatus,
    //                 Billdate: billDate,
    //                 Organization_name: OrganizationName,
    //                 Trip_id: rowSelectionModel,
    //                 FromDate: fromDate,
    //                 EndDate: EndDate,
    //                 Trips: Trips,
    //                 Amount: tripAmount,

    //             }

    //             setMisGroupTripId(rowSelectionModel)

    //             rowSelectionModel.forEach(tripId => {
    //                 const tripData = Trips.find(trip => trip.id === tripId); // Assuming Trips is an array of trip objects
    //                 if (tripData) {
    //                     console.log(`Trip ID: ${tripId}`, tripData); // Log the trip ID and its data
    //                 } else {
    //                     console.log(`Trip ID: ${tripId} not found in Trips`);
    //                 }
    //             });


    //             await axios.post(`${apiUrl}/transferlistdatatrip`, transferlist);
    //             setSuccess(true);
    //             setSuccessMessage("Successfully added");
    //             console.log(transferlist,'listtransfer')
    //             // setRows([])
    //             // const billingPageUrl = `/home/billing/transfer`
    //             // window.location.href = billingPageUrl



    //         } catch (error) {
    //             console.error("Error occurred:", error);
    //             setErrorMessage("Failed to add organization: " + error.message);
    //         }
    //     }
    //     else if (groupId !== "") {
    //         // updateTransferListTrip'
    //         try {
    //             if (!rows || rows.length === 0) {
    //                 throw new Error("Rows data is empty");
    //             }

    //             const fromdate2 = rows[0]?.startdate;
    //             const enddate = rows[rows.length - 1]?.startdate;
    //             const fromDate1 = dayjs(fromdate2).format('YYYY-MM-DD');
    //             const EndDate = dayjs(enddate).format('YYYY-MM-DD');

    //             const billdate = selectedCustomerDatas?.Billingdate || Billingdate;
    //             const billDate = dayjs(billdate).format('YYYY-MM-DD');

    //             const OrganizationName = selectedCustomerDatas.customer || customer;
    //             const Trips = rowSelectionModel.length;
    //             const billstatus = "notbilled";
    //             const grouptripid = parseInt(groupId)


    //             const response = await axios.get(`${apiUrl}/getParticularTransferListDetails`, {
    //                 params: {
    //                     groupId: grouptripid
    //                 }
    //             });

    //             const amount = response.data[0].Amount;
    //             const trips = response.data[0].Trips;
    //             const tripid = response.data[0].Trip_id;
    //             const fullTotalAmount = parseInt(amount) + parseInt(tripAmount)

    //             const TotalTrips = parseInt(trips) + parseInt(Trips)
    //             // Ensure rowSelectionModel is an array of strings
    //             const rowSelectionModelAsStrings = rowSelectionModel.map(String); // Converts [1358] to ["1358"]

    //             // Combine rowSelectionModelAsStrings and tripid into a new array
    //             const combinedArray = [...rowSelectionModelAsStrings, tripid]; // Results in ["1358", "1358"]
    //             const todate = toDate.format('YYYY-MM-DD')
    //             const totalamount = fullTotalAmount.toString()
    //             const tripscount = TotalTrips.toString()
    //             const transferlist = {
    //                 Billdate: billDate,
    //                 Organization_name: OrganizationName,
    //                 Trip_id: combinedArray,
    //                 FromDate: fromDate,
    //                 EndDate: todate,
    //                 Trips: tripscount,
    //                 Amount: totalamount,
    //                 grouptripid: grouptripid
    //             }

    //             const updateresponse = await axios.post(`${apiUrl}/updateParticularTransferList`, transferlist);
    //             setSuccess(true)
    //             setSuccessMessage("Successfully Added")

    //             // console.log(transferlist, rows, rowSelectionModel, 'transferlist');
    //             // setMisGroupTripId(rowSelectionModel)
    //             // await axios.post(`${apiUrl}/insertTransferListTrip`, transferlist);
    //             // setSuccess(true);
    //             // setSuccessMessage("Successfully added");
    //             // setRows([])
    //             // const billingPageUrl = `/home/billing/transfer`
    //             // window.location.href = billingPageUrl



    //         } catch (error) {
    //             console.error("Error occurred:", error);
    //             setErrorMessage("Failed to add organization: " + error.message);
    //         }
    //     }
    // }
    // console.log(rows,"kk")
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
    const handlecustomer = async (e) => {
        console.log(e, "ppp")
        setCustomer(e)
        const data = await customerMotherdatagroupstation(e);
        setServiceStation(data)



    }

    // console.log(customerMotherdatagroupstation(customer),"ll")

    // console.log(customer,"CUST")
    // console.log(rowSelectionModel, 'presentrowSelect', matchTripID);

    const handleAddGroup = async () => {
        const presentIds = rowSelectionModel?.filter(id => matchTripID.includes(id.toString()));

        if (billedRowSelect?.length >= 1) {
            setError(true)
            setErrorMessage("Remove Billed Row")
            return
        }
        if (presentIds.length > 0) {
            setError(true)
            setisbtnloading(false)
            setErrorMessage("Already Entered This TripID.")
            return
        }


        if (rowSelectionModel.length === 0) {
            setError(true);
            setErrorMessage("Please select the Row");
            return;

        }

        // customerMotherdatagroupstation(selectedCustomerDatas.customer || customer)

        // if (groupId === "") {
        // const tripDetails = selectTripid.map(item => {
        //     console.log(item.totalcalcAmount, 'Current item in mapping'); // Log each item
        //     console.log(item.tripid,'tripid of select');

        //     return {

        //         tripid: item.tripid,
        //         totalcalcAmount: item.totalcalcAmount
        //     };
        // });
        // try {
        //     if (!rows || rows.length === 0) {
        //         throw new Error("Rows data is empty");
        //     }

        //     const fromdate = rows[0]?.startdate;
        //     const enddate = rows[rows.length - 1]?.startdate;
        //     const fromDate = dayjs(fromdate).format('YYYY-MM-DD');
        //     const EndDate = dayjs(enddate).format('YYYY-MM-DD');

        //     const billdate = selectedCustomerDatas?.Billingdate || Billingdate;
        //     const billDate = dayjs(billdate).format('YYYY-MM-DD');

        //     const OrganizationName = selectedCustomerDatas.customer || customer;
        //     const Trips = rowSelectionModel.length;
        //     const billstatus = "notbilled";

        //     const transferlist = {
        //         Status: billstatus,
        //         Billdate: billDate,
        //         Organization_name: OrganizationName,
        //         Trip_id: rowSelectionModel,
        //         FromDate: fromDate,
        //         EndDate: EndDate,
        //         Trips: Trips,
        //         Amount: tripAmount,
        //     };

        //     setMisGroupTripId(rowSelectionModel);
        //     console.log(selectTripid, 'selected trips state');

        //     rowSelectionModel.forEach(tripId => {
        //         const tripData = Trips.find(trip => trip.id === tripId); // Assuming Trips is an array of trip objects
        //         if (tripData) {
        //             console.log(`Trip ID: ${tripId}`, tripData); // Log the trip ID and its data
        //         } else {
        //             console.log(`Trip ID: ${tripId} not found in Trips`);
        //         }
        //     });



        if (groupId === "") {
            // Map to get trip details

            const tripDetails = selectTripid.map(item => ({
                tripid: item.tripid,
                totalcalcAmount: item.totalcalcAmount
            }));

            // Filter valid trips and invalid trips
            const validTrips = tripDetails.filter(trip => trip.totalcalcAmount > 0);
            const invalidTrips = tripDetails.filter(trip => trip.totalcalcAmount === 0 || trip.totalcalcAmount === null);

            // If there are invalid trips, show an error message
            if (invalidTrips.length > 0) {
                const invalidTripIds = invalidTrips.map(trip => trip.tripid).join(', ');
                console.log(`The following trip IDs are invalid (amount is zero or null): ${invalidTripIds}`);
                setError(true);
                setisbtnloading(false)

                // setErrorMessage(`Invalid trip IDs: ${invalidTripIds}`); // Set error message
                setErrorMessage(`Check ${invalidTripIds} Trip ID`); // Set error message

            }

            // Proceed only with valid trips
            if (validTrips.length === 0) {
                return; // If there are no valid trips, exit the function
            }

            try {
                if (!rows || rows.length === 0) {
                    throw new Error("Rows data is empty");
                }
                setisbtnloading(true)

                const fromdate = rows[0]?.startdate;
                // const stationsName = rows[0]?.department;
                const stationsName = await customerMotherdatagroupstation(selectedCustomerDatas.customer || customer);
                const enddate = rows[rows.length - 1]?.startdate;
                const fromDate = dayjs(fromdate).format('YYYY-MM-DD');
                const EndDate = dayjs(enddate).format('YYYY-MM-DD');

                const billdate = selectedCustomerDatas?.Billingdate || Billingdate;
                const billDate = dayjs(billdate).format('YYYY-MM-DD');

                const OrganizationName = selectedCustomerDatas.customer || customer;
                // const OrganizationName =  await customerMotherdatagroupstation(selectedCustomerDatas.customer || customer);
                const Trips = validTrips.length;
                const billstatus = "notbilled";
                // Construct the transfer list with valid trips and their amounts

                const transferlist = {
                    Status: billstatus,
                    Billdate: billDate,
                    Organization_name: OrganizationName,
                    Trip_id: validTrips.map(trip => trip.tripid), // Only include valid trip IDs
                    Amount: validTrips.reduce((total, trip) => total + trip.totalcalcAmount, 0), // Sum of valid amounts
                    FromDate: fromDate,
                    EndDate: EndDate,
                    Trips: Trips,
                    Stations: stationsName,
                    State: stationsName
                };

                setMisGroupTripId(validTrips.map(trip => trip.tripid));

                // Log the valid trips and transfer list for debugging
                console.log(validTrips, 'Valid Trips for posting');


                // console.log(tripDetails, 'Selected Trip IDs and Amounts');

                await axios.post(`${apiUrl}/transferlistdatatrip`, transferlist);
                setSuccess(true);
                setisbtnloading(false)
                setAddEditTrigger(true)
                setSuccessMessage("Successfully added");
                setRows([])
                console.log(transferlist, 'listtransfer');

            }
            // catch (error) {
            //     console.error("Error occurred:", error);
            //     setErrorMessage("Failed to add organization: " + error.message);
            // }
            catch (error) {
                // console.error("Error occurredddddd:", error);

                // Check if there's no response, indicating a network error
                if (error.message) {
                    setError(true);
                    setisbtnloading(false)
                    setErrorMessage("Check your internet connection");
                    // console.log('Network error');
                } else if (error.response) {
                    setError(true);
                    setisbtnloading(false)
                    // Handle other Axios errors (like 4xx or 5xx responses)
                    setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
                } else {
                    // Fallback for other errors
                    setError(true);
                    setisbtnloading(false)
                    setErrorMessage("An unexpected error occurred: " + error.message);
                }
            }

        }
        else if (groupId !== "") {
            // updateTransferListTrip'
            if (rowSelectionModel.length === 0) {
                setError(true);
                setErrorMessage("Please select the Row");
                return;
    
            }
            try {
                if (!rows || rows.length === 0) {
                    throw new Error("Rows data is empty");
                }
                setisbtnloading(true)
                const fromdate2 = rows[0]?.startdate;
                const enddate = rows[rows.length - 1]?.startdate;
                const fromDate1 = dayjs(fromdate2).format('YYYY-MM-DD');
                const EndDate = dayjs(enddate).format('YYYY-MM-DD');

                const billdate = selectedCustomerDatas?.Billingdate || Billingdate;
                const billDate = dayjs(billdate).format('YYYY-MM-DD');

                const OrganizationName = selectedCustomerDatas.customer || customer;
                // const Trips = rowSelectionModel.length;
                // const billstatus = "notbilled";
                const grouptripid = parseInt(groupId)


                const response = await axios.get(`${apiUrl}/getParticularTransferListDetails`, {
                    params: {
                        groupId: grouptripid
                    }
                });

                const amount = response.data[0].Amount;
                const trips = response.data[0].Trips;
                const tripid = response.data[0].Trip_id;

                // const TotalTrips = parseInt(trips) + parseInt(Trips)
                // Ensure rowSelectionModel is an array of strings
                const rowSelectionModelAsStrings = rowSelectionModel.map(String); // Converts [1358] to ["1358"]
                // console.log(rowSelectionModelAsStrings,"tttttttt",tripid)
                const data = rowSelectionModelAsStrings.includes(tripid)
                const filteredRows = selectedRow
                    .filter(item => item.totalcalcAmount !== "" && item.totalcalcAmount !== 0)
                    .map(item => ({
                        tripid: item.tripid,
                        totalcalcAmount: item.totalcalcAmount
                    }));

                const invalidRow = selectedRow
                    .filter(item => item.totalcalcAmount === "" || item.totalcalcAmount === 0)
                    .map(item => ({
                        tripid: item.tripid,
                        totalcalcAmount: item.totalcalcAmount
                    }));
                const invalidTripId = invalidRow.map(item => String(item.tripid));

                const totalSum = filteredRows.reduce((sum, item) => sum + item.totalcalcAmount, 0);
                const fullTotalAmount = parseInt(amount) + parseInt(totalSum)
                const tripIds = filteredRows.map(item => String(item.tripid));
                const tripidArray = tripid?.split(',');

                const combinedTripIds = [...tripIds, ...tripidArray];

                if (invalidRow.length > 0) {
                    setError(true);
                    setisbtnloading(false)
                    setErrorMessage(`${invalidTripId} is Not Having Amount`);
                }
                if (data) {
                    setError(true);
                    setisbtnloading(false)
                    setErrorMessage("Already Tripid Id inserted");
                    return
                }
                // Combine rowSelectionModelAsStrings and tripid into a new array
                const combinedArray = [...rowSelectionModelAsStrings, tripid];
                // const uniqueTripIds = [...new Set(combinedArray)];
                // const uniqueTripIds = [...new Set(combinedArray)].filter(tripId => tripId !== "");
                const uniqueTripIds = [
                    ...new Set(
                        combinedArray
                            .flatMap((tripId) => tripId.split(',')) // Split comma-separated values into individual IDs
                            .filter((tripId) => tripId.trim() !== "") // Filter out empty strings after trimming
                    ),
                ];

                console.log(uniqueTripIds, "com")
                const dadatrip = uniqueTripIds.length
                const TotalTrips = parseInt(dadatrip) // Results in ["1358", "1358"]
                const todate = dayjs(toDate).format('YYYY-MM-DD')
                const totalamount = fullTotalAmount.toString()
                const tripscount = TotalTrips.toString()
                const statusUpdate = invoiceno ? "Billed" : "notbilled"

                const transferlist = {
                    Billdate: billDate,
                    Organization_name: OrganizationName,
                    Trip_id: combinedTripIds,
                    FromDate: fromDate,
                    EndDate: todate,
                    Trips: tripscount,
                    Amount: totalamount,
                    grouptripid: grouptripid,
                    Status:statusUpdate
                }
                console.log(transferlist, "not empty",filteredRows);

                if (filteredRows.length > 0) {

                    const updateresponse = await axios.post(`${apiUrl}/updateParticularTransferList`, transferlist);
                    setSuccess(true)
                    setisbtnloading(false)
                    setSuccessMessage("Successfully Added")
                    setRows([])

                    setMisGroupTripId(rowSelectionModel)
                    // await axios.post(`${apiUrl}/insertTransferListTrip`, transferlist);
                    // setSuccess(true);
                    // setSuccessMessage("Successfully added");
                    // const billingPageUrl = `/home/billing/transfer`
                    // window.location.href = billingPageUrl
                }


            }
            // catch (error) {
            //     console.error("Error occurred:", error);
            //     setErrorMessage("Failed to add organization: " + error.message);
            // }
            catch (error) {
                console.error("Error occurredddddd:", error);

                // Check if there's no response, indicating a network error
                if (error.message) {
                    setError(true);
                    setisbtnloading(false)
                    setErrorMessage("Check your internet connection");
                    // console.log('Network error');
                } else if (error.response) {
                    setError(true);
                    setisbtnloading(false)
                    // Handle other Axios errors (like 4xx or 5xx responses)
                    setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
                } else {
                    // Fallback for other errors
                    setError(true);
                    setisbtnloading(false)
                    setErrorMessage("An unexpected error occurred: " + error.message);
                }
            }

        }
    }


    useEffect(() => {
        const fetchdata = async () => {
            try {
                // Assuming `tripid` is the value you want to pass
                const tripid = misGroupTripId;

                // Use your actual `tripid` or state variable

                // Pass tripid as query parameter in the GET request
                if (tripid.length > 0) {
                    const response = await axios.get(`${apiUrl}/getparticulartransfer_list`, {
                        params: {
                            tripid: tripid,  // Send `tripid` as query param
                        },
                    });
                    const data = response.data;
                    setGroupId(data[0].Grouptrip_id)
                }

            } catch (error) {
                // Handle error
                console.error(error);
            }
        };

        fetchdata();
    }, [apiUrl, misGroupTripId]);

    // const handleKeyDown = async (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         const GroupTripId = event.target.value;

    //         try {
    //             // First API call to get Trip_id from GroupTripId
    //             const response = await axios.get(`${apiUrl}/getTripIdFromTransferList`, {
    //                 params: {
    //                     groupid: GroupTripId
    //                 }
    //             });
    //             console.log(response.data,rows.length,'transven');

    //             if (response.data && response.data.length > 0) {
    //                 const transferTripId = response.data[0].Trip_id;
    //                 console.log(transferTripId,'transven22');

    //                 const fromDate = dayjs(response.data[0].FromDate).format('YYYY-MM-DD');
    //                 const toDate = dayjs(response.data[0].EndDate).format('YYYY-MM-DD');

    //                 setFromDate(fromDate);
    //                 setToDate(toDate);

    //                 setToDate(dayjs(response.data[0].EndDate).format('YYYY-MM-DD'));
    //                 setFromDate(response.data[0].FromDate)
    //                 setCustomer(response.data[0].Organization_name)
    //                 setInvoiceno(response.data[0].Invoice_no)
    //                 setBillingdate(response.data[0].Billdate)

    //                 const tripsheetResponse = await axios.get(`${apiUrl}/getTripsheetDetailsFromTransferTripId`, {
    //                     params: {
    //                         transferTripId: transferTripId
    //                     }
    //                 });
    //                 const data = tripsheetResponse.data;
    //                 console.log(data.length,'transven33');

    //                 if (data.length > 0) {
    //                     const rowsWithUniqueId = data.map((row, index) => ({
    //                         ...row,
    //                         id: index + 1,
    //                     }));
    //                     setRows(rowsWithUniqueId);
    //                     setSuccess(true)
    //                     setSuccessMessage("Successfully Listed")
    //                 }
    //             } else {
    //                 console.log('No Trip_id found for the given GroupTripId');
    //             }
    //         } catch (error) {
    //             console.log(error, 'error');
    //         }
    //     }
    // };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const GroupTripId = event.target.value;

            try {
                // First API call to get Trip_id from GroupTripId
                const response = await axios.get(`${apiUrl}/getTripIdFromTransferList`, {
                    params: {
                        groupid: GroupTripId
                    }
                });

                if (response.data && response.data.length > 0) {
                    const transferTripId = response.data[0].Trip_id;
                    console.log(response.data, "repondedata", transferTripId)
                    setMatchTripID(transferTripId)

                    const fromDate1 = dayjs(response.data[0].FromDate).format('YYYY-MM-DD');
                    const toDate = dayjs(response.data[0].EndDate).format('YYYY-MM-DD');

                    setFromDate(fromDate1);
                    setToDate(toDate);

                    setCustomer(response.data[0].Organization_name);
                    setInvoiceno(response.data[0].Invoice_no);
                    setBillingdate(response.data[0].Billdate);
                    setServiceStation(response.data[0].State)


                    // Second API call to get tripsheet details using transferTripId
                    const tripsheetResponse = await axios.get(`${apiUrl}/getTripsheetDetailsFromTransferTripId`, {
                        params: {
                            transferTripId: transferTripId
                        }
                    });
                    const data = tripsheetResponse.data;
                    console.log(data, 'tripresponse');
                    // const allSameDepartment = data.every(item => item.department === data[0].department);

                    // if (allSameDepartment) {
                    //     console.log("All department values are the same:", data[0].department);
                    //     setServiceStation(data[0].department)
                    // } else {
                    //     setServiceStation('All')
                    //     console.log("Department values are not the same.");
                    // }


                    // Filter out rows where tripid is 0
                    if (data.length > 0) {
                        const filteredData = data.filter(row => row.tripid !== 0);
                        const rowsWithUniqueId = filteredData.map((row, index) => ({
                            ...row,
                            id: index + 1,
                        }));
                        console.log(rowsWithUniqueId, "enter datas");
                        setCombinedRows(rowsWithUniqueId)
                        setRows(rowsWithUniqueId);
                        setAddEditTrigger(false)
                        setSuccess(true);
                        setSuccessMessage("Successfully Listed");
                    }
                } else {
                    setRows([]);
                    setFromDate();
                    setToDate();

                    setCustomer();
                    setInvoiceno();
                    setBillingdate();
                    setServiceStation()
                    setError(true);
                    setErrorMessage("no data found")

                    console.log('No Trip_id found for the given GroupTripId');

                }
            } catch (error) {
                console.log(error, 'error');
            }
        }
    };




    // const handleShow = useCallback(async () => {

    //     try {
    //         const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
    //         const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
    //         const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
    //         const servicestationValue = servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '';

    //         const response = await axios.get(`${apiUrl}/Group-Billing`, {
    //             params: {
    //                 customer: customerValue,
    //                 fromDate: fromDateValue,
    //                 toDate: toDateValue,
    //                 // servicestation: servicestationValue
    //             },
    //         });
    //         const data = response.data;
    //         if (data.length > 0) {
    //             const rowsWithUniqueId = data.map((row, index) => ({
    //                 ...row,
    //                 id: index + 1,
    //             }));
    //             setRows(rowsWithUniqueId);
    //             setSuccess(true);
    //             setSuccessMessage("successfully listed")
    //         } else {
    //             setRows([]);
    //             setError(true);
    //             setErrorMessage("no data found")
    //         }
    //     } catch {
    //         setRows([]);
    //         setError(true);
    //         setErrorMessage("Check your Network Connection");
    //     }

    // }, [customer, fromDate, toDate, servicestation, selectedCustomerDatas, tripData, apiUrl]);

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
        date,
        Billingdate,
        selectedCustomerDatas,
        invoiceno,
        setInvoiceno,
        // handleKeyenter,
        customer,
        tripData,
        // bankOptions,
        setCustomer,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        info,
        servicestation,
        setServiceStation,
        // handleserviceInputChange,
        handleShow,
        handleCancel,
        handleClickGenerateBill,
        handleExcelDownload,
        handlePdfDownload,
        handleBillRemove,
        handleAddOrganization,
        totalKm,
        totalTime,
        totalAmount,
        columns,
        setRowSelectionModel,
        handleRowSelection,
        handlechnageinvoice,
        groupId,
        setGroupId,
        handleAddGroup,
        handleKeyDown,
        handleRemove,
        loading,
        setLoading,
        setInfo,
        addEditTrigger, setAddEditTrigger,
        infoMessage, setINFOMessage, handlecustomer, isbtnloading, setisbtnloading, iseditloading, setiseditloading, isbillloading, setisbillloading,
        combinedRows, setCombinedRows

    };
};

export default useTransferdataentry;