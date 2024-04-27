import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { APIURL } from "../../../url";
import { useData } from '../../../Dashboard/Maindashboard/DataContext';
import { useLocation } from "react-router-dom";

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
    // const user_id = localStorage.getItem('useridno');
    const [rows, setRows] = useState([]);
    const [totalKm, setTotalKM] = useState(0);
    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState("");
    const [tripData, setTripData] = useState('');
    const [toDate, setToDate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [totalTime, setTotalTime] = useState('');
    const [invoiceno, setInvoiceno] = useState("");
    const [groupId, setGroupId] = useState("")
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
    // const [rowselect, setRowselect] = useState()
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
    const [info, setInfo] = useState(false);
    // const [infoMessage, setInfoMessage] = useState({});
    const location = useLocation();
    const [transferId, setTransferId] = useState([])


    const { setOrganizationName } = useData()

    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Transfer_DataEntry.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF('landscape');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Transfer_DataEntry", 10, 10);
        const tableData = rows.map((row) => [
            row['id'],
            row['status'],
            row['startdate'],
            row['tripid'],
            row['customer'],
            row['vehRegNo'],
            row['vehType'],
            row['guestname'],
            row['netamount']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Status', 'TripDate', 'Trip No', 'Customer', 'VehicleReg.No', 'VehicleType', 'UserName', 'Amount']],
            body: tableData,
            startY: 20,
        });
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

    // for fetching the organization names
    useEffect(() => {
        const organizationNames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/customers`);
                const organisationData = response?.data;
                const names = organisationData.map(res => res.customer);
                setOrganizationName(names);
            } catch (error) {
                console.error('Error fetching organization names:', error);
            }
        };
        organizationNames();
    }, [apiUrl, setOrganizationName])

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

    // const transformRow = (originalRow) => {
    //     return {
    //         id: originalRow.id,
    //         startdate: originalRow.startdate,
    //         apps: originalRow.apps,
    //         tripid: originalRow.tripid,
    //         customer: originalRow.customer,
    //         department: originalRow.department,
    //         vehRegNo: originalRow.vehRegNo,
    //         vehType: originalRow.vehType,
    //         guestname: originalRow.guestname,
    //         groupname: originalRow.groupname,
    //         totaltime: originalRow.totaltime,
    //         totaldays: originalRow.totaldays,
    //         totalkm1: originalRow.totalkm1,
    //         duty: originalRow.duty,
    //         permit: originalRow.permit,
    //         parking: originalRow.parking,
    //         billno: originalRow.billno,
    //         exHrs: originalRow.exHrs,
    //         exkm: originalRow.exkm,
    //         netamount: originalRow.netamount,
    //         grouptripno: originalRow.grouptripno,
    //         billtype: originalRow.billtype,
    //         advancepaidtovendor: originalRow.advancepaidtovendor,
    //         taxStatus: originalRow.taxStatus,
    //         status: originalRow.status,
    //     };
    // };
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
            "Groupid", "Invoice_no", "Status", "Billdate", "Organization_name", "Trip_id", "FromDate", "EndDate", "Amount"
        ];

        const formData = {};
        parameterKeys.forEach(key => {
            const value = params.get(key);
            if (value !== null && value !== "null") {
                formData[key] = value;
            }
        });
        const transferlist = formData.Trip_id?.split(',')
        setTransferId(transferlist)
        setInvoiceno(formData.Invoice_no)
        setGroupId(formData.Groupid)
        setCustomer(formData.Organization_name)
        setFromDate(formData.FromDate)
        setEndDate(formData.EndDate)
        setBillingdate(formData.Billdate)
    }, [location])
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
    }, [transferId, apiUrl])

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

    const handleButtonClickTripsheet = () => {
        const customerdata = encodeURIComponent(customer || selectedCustomerDatas.customer || tripData.customer || localStorage.getItem('selectedcustomer'));
        const customername = customerdata;
        localStorage.setItem('selectedcustomer', customername);
        const storedCustomer = localStorage.getItem('selectedcustomer');
        const decodedCustomer = decodeURIComponent(storedCustomer);
        localStorage.setItem('selectedcustomerdata', decodedCustomer);
        const billingPageUrl = `/home/billing/transfer?tab=TransferReport&Invoice_no=${invoiceno}&Group_id=${groupId}&Customer=${customer}&FromDate=${fromDate}&EndDate=${endDate}&BillDate=${Billingdate}`;
        window.location.href = billingPageUrl;
    }

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
            const Trips = rows.length;
            const billstatus = "notbilled";



            const transferlist = {
                Status: billstatus,
                Billdate: billDate,
                Organization_name: OrganizationName,
                Trip_id: rowSelectionModel,
                FromDate: fromDate,
                EndDate: EndDate,
                Trips: Trips,
                Amount: totalAmount,

            }

            await axios.post(`${apiUrl}/transferlistdatatrip`, transferlist);
            setSuccess(true);
            setSuccessMessage("Successfully added");


        } catch (error) {
            console.error("Error occurred:", error);
            setErrorMessage("Failed to add organization: " + error.message);
        }
    }


    const handleBillRemove = async () => {
        if (rowSelectionModel.length === 0) {
            setError(true);
            setErrorMessage('Please select rows before generating the bill.');
            return;
        }
        try {
            const tripids = rowSelectionModel;
            if (tripids.some((tripid) => tripid == null)) {
                setError(true);
                setErrorMessage('Invalid tripids. Please check the selected rows and try again.');
                return;
            }
            const response = await axios.post(`${apiUrl}/updateStatusremove`, {
                tripids: tripids,
                status: 'Opened',
            });
            if (response.status === 200) {
                setSuccess(true);
                setSuccessMessage('Removed successfully!');
                setRows([])
            } else {
                setError(true);
                setErrorMessage('Failed to Remove bill. Please try again.');
            }
        } catch {
            setError(true);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    // const reversedRows = [...rows].reverse();



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

            const response = await axios.get(`${apiUrl}/Group-Billing`, {
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