import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { APIURL } from "../../../url";
import { useLocation } from "react-router-dom";
import { PdfData } from '../TransferReport/PdfContext';
import Excel from 'exceljs';


const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "apps", headerName: "apps", width: 130 },
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
    { field: "netamount", headerName: "Amount", width: 130 },
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
    const [bankOptions, setBankOptions] = useState([]);
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
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
    // const [formData, setFormData] = useState({})
    const { billingPage, setBillingPage } = PdfData()



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
                // fontSize:4,
                // fontSize: fontdata-1
                fontSize: fontdata - 1,
                valign: 'middle',
                //  cellWidth: 'wrap',
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

    useEffect(() => {
        Organization()
            .then((data) => {
                if (data) {
                    setBankOptions(data);
                } else {
                    setError(true);
                    setErrorMessage('Failed to fetch organization options.');
                }
            })
            .catch(() => {
                setError(true);
                setErrorMessage('Failed to fetch organization options.');
            });
    }, []);


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
            "Groupid", "Invoice_no", "Status", "Billdate", "Organization_name", "Trip_id", "FromDate", "EndDate", "Amount", "billingsheet"
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
        const transferlist = updatedFormData.Trip_id?.split(',');
        setTransferId(transferlist);
        setInvoiceno(updatedFormData.Invoice_no);
        setGroupId(updatedFormData.Groupid);
        setCustomer(updatedFormData.Organization_name);
        setFromDate(updatedFormData.FromDate);
        setEndDate(updatedFormData.EndDate);
        setBillingdate(updatedFormData.Billdate);
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
            // setFormData({});
            setRows([])
            setRowSelectionModel([])
        }
    }, [billingPage, setBillingPage])
    useEffect(() => {
        const fetchData = async () => {
            try {

                if (transferId?.length > 0 && transferId !== undefined) {

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
                }
            }
            catch (error) {
                console.log(error, "error");
            }
        }
        fetchData()
    }, [transferId, billingPage, apiUrl, location])

    //calculate total amount in column
    useEffect(() => {
        const calculatedTotalAmount = rows.reduce((total, row) => total + parseFloat(row.netamount || 0), 0);
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

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

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
                return selectedRow ? selectedRow : null;
            })
            .filter((tripid) => tripid !== null);

        const selectedTripAmount = newSelectionModel
            .filter((selectedId) => selectedId !== null)
            .map((selectedId) => {
                const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
                return selectedRow ? parseInt(selectedRow.netamount) : null;
            })
            .filter((tripid) => tripid !== null);
        // selected trips

        const totalSelectedTripAmount = selectedTripAmount.reduce((total, amount) => total + amount, 0);
        setTripAmount(totalSelectedTripAmount)

        const handleselectTrips = selectedTrips;
        console.log(handleselectTrips, 'selectes Trips');
        setSelectedRow(selectedTrips)
        const tripsheetid = selectedTripIds;
        setRowSelectionModel(tripsheetid);
        localStorage.setItem('selectedtripsheetid', tripsheetid);
        const selectedRowCount = selectedTripIds.length;

        localStorage.setItem('selectedrowcount', selectedRowCount);
    };
    const handleClickGenerateBill = () => {

        // handleBillGenerate();
        //   handleAdd();
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
    const handleButtonClickTripsheet = async () => {
        try {
            // Validate rowSelectionModel
            if (!rowSelectionModel) {
                console.error('Error: rowSelectionModel is undefined or null');
                return;
            }

            const id = rowSelectionModel;
            const customerdata = encodeURIComponent(customer || selectedCustomerDatas.customer || tripData.customer || localStorage.getItem('selectedcustomer'));

            // Sending PUT requests
            const response = await axios.put(`${apiUrl}/statusChangeTransfer/${invoiceno}`);
            const Tripresponse = await axios.put(`${apiUrl}/statusChangeTripsheet/${id}`);
            console.log(response, Tripresponse, 'check response');
            // Setting selected customer data in local storage
            localStorage.setItem('selectedcustomer', customerdata);
            const storedCustomer = localStorage.getItem('selectedcustomer');
            const decodedCustomer = decodeURIComponent(storedCustomer);
            localStorage.setItem('selectedcustomerdata', decodedCustomer);

            // Constructing billing page URL
            const billingPageUrl = `/home/billing/transfer?tab=TransferReport&Invoice_no=${invoiceno}&Group_id=${groupId}&Customer=${customer}&FromDate=${fromDate}&EndDate=${endDate}&TripId=${id}&BillDate=${Billingdate}&TransferReport=true`;

            // Redirecting to billing page
            window.location.href = billingPageUrl;
        } catch (error) {
            // Handle any errors that occurred during the requests
            console.error('Error:', error.message); // You can add custom error handling here
        }
    };



    const handleBillGenerate = async () => {
        if (rowSelectionModel.length === 0) {
            setError(true);
            setErrorMessage('Please select rows before generating the bill.');
            return;
        }

        try {
            const tripids = rowSelectionModel;
            if (tripids.some((tripid) => tripid === null || tripid === undefined)) {
                setError(true);
                setErrorMessage('Invalid tripids. Please check the selected rows and try again.');
                return;
            }
            handleAdd(); 
            handleButtonClickTripsheet();
            const response = await axios.post(`${apiUrl}/updateStatus`, {
                tripids: tripids.filter((tripid) => tripid !== null && tripid !== undefined),
                status: 'CBilled',
            });
            if (response.status === 200) {
                setSuccess(true);
                setSuccessMessage('Bill generated successfully!');
            } else {
                setError(true);
                setErrorMessage('Failed to generate bill. Please try again.');
            }
        } catch {
            setError(true);
            setErrorMessage('An error occurred. Please try again later.');
        }

    };


    const handleAdd = async () => {

        const selectedRowCount = localStorage.getItem('selectedrowcount');
        const selectedTripIds = localStorage.getItem('selectedtripsheetid');
        const firstSelectedRow = rows.find(row => row.id === parseInt(selectedTripIds[0], 10));
        const guestnameFromFirstRow = firstSelectedRow ? firstSelectedRow.guestname : '';

        const updatedBook = {
            ...book,
            Billingdate: Billingdate || book.Billdate,
            Invoice_no: invoiceno || book.Invoice_no,
            customer: customer || selectedCustomerDatas?.customer || (tripData.length > 0 ? tripData[0].customer : '') || '',
            fromdate: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : book.fromdate.format('YYYY-MM-DD'),
            todate: toDate ? dayjs(toDate).format('YYYY-MM-DD') : book.todate.format('YYYY-MM-DD'),
            station: servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '',
            Totalamount: totalAmount,
            status: 'Billed',
            trips: selectedRowCount,
            guestname: guestnameFromFirstRow,
        };
        await axios.post(`${apiUrl}/billing`, updatedBook);
        setSuccess(true);
        setSuccessMessage("Successfully Added");

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
    const handleAddOrganization = async () => {
        if (rowSelectionModel.length === 0) {
            setError(true)
            setErrorMessage("Please select the Row")
            return
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


            const transferlist = {
                Status: billstatus,
                Billdate: billDate,
                Organization_name: OrganizationName,
                Trip_id: rowSelectionModel,
                FromDate: fromDate,
                EndDate: EndDate,
                Trips: Trips,
                Amount: tripAmount,

            }
            await axios.post(`${apiUrl}/transferlistdatatrip`, transferlist);
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
                const b = a.map((li) => parseInt(li))
                setLatestTripNo(b)
                const groupid = response?.map(li => li.Grouptrip_id)[0];
                const groupTripid = parseInt(groupid)
                setLatestGroupNo(groupTripid)

            }
        }
        fetchData()
    }, [apiUrl, groupId])


    const handleBillRemove = async () => {
        const tripid = selectedRow?.map(row => row.tripid.toString());
        // const tripid = selectedRow?.map((li)=>li.tripid.toString())
        const selectId = selectedRow?.map(row => row.id)
        const Amount = selectedRow?.map(li => li.netamount.split(',')).flat();
        const trips = transferId.length - tripid.length
        const Trips = trips.toString()
        const totalAmount = Amount.reduce((acc, curr) => acc + parseFloat(curr), 0);
        const amount = totalValue - totalAmount
        const TotalAmount = amount.toString()
        const updatedRows = rows.filter(row => !selectId.includes(row.id));

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

    const handleKeyenter = useCallback(async (event) => {

        if (event.key === 'Enter') {
            try {
                const invoiceNumber = book.Invoice_no || invoiceno || selectedCustomerDatas.invoiceno;
                const response = await axios.get(`${apiUrl}/billingdata/${invoiceNumber}`);
                if (response.status === 200) {
                    const billingDetails = response.data;
                    if (billingDetails) {
                        setSelectedCustomerDatas(billingDetails);
                        setSuccess(true);
                        setSuccessMessage("Successfully listed");
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage("No data found");
                    }
                } else {
                    setError(true);
                    setErrorMessage(`Failed to retrieve billing details. Status: ${response.status}`);
                }
            } catch (error) {
                setError(true);
                setErrorMessage('Error retrieving billings details.', error);
            }
        }

    }, [invoiceno, book, selectedCustomerDatas, apiUrl]);

    const handleShow = async () => {

        try {
            const customerValue = encodeURIComponent(customer) || selectedCustomerDatas.customer || (tripData.length > 0 ? tripData[0].customer : '');
            const fromDateValue = (selectedCustomerDatas?.fromdate ? dayjs(selectedCustomerDatas.fromdate) : fromDate).format('YYYY-MM-DD');
            const toDateValue = (selectedCustomerDatas?.todate ? dayjs(selectedCustomerDatas.todate) : toDate).format('YYYY-MM-DD');
            // const servicestationValue = servicestation || selectedCustomerDatas.station || (tripData.length > 0 ? tripData[0].department : '') || '';

            const response = await axios.get(`${apiUrl}/Transfer-Billing`, {
                params: {
                    customer: customerValue,
                    fromDate: fromDateValue,
                    toDate: toDateValue,
                    // servicestation: servicestationValue
                },
            });
            const data = response.data;
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("successfully listed")
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("no data found")
            }
        } catch {
            setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
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
        handleKeyenter,
        customer,
        tripData,
        bankOptions,
        setCustomer,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        info,
        servicestation,
        handleserviceInputChange,
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
        setGroupId
    };
};

export default useTransferdataentry;