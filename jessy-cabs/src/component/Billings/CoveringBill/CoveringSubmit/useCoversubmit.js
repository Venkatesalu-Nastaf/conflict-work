import { useState, useEffect } from 'react';

import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "Status", headerName: "Status", width: 130 },
    { field: "ReferenceNo", headerName: "Reference No", width: 130 },
    { field: "InvoiceDate", headerName: "Date", width: 130, valueFormatter: (params) => dayjs(params.value, 'DD/MM/YYYY').format('DD/MM/YYYY') },
    { field: "Customer", headerName: "Customer", width: 130 },
    { field: "FromDate", headerName: "From Date", width: 130, valueFormatter: (params) => dayjs(params.value, 'YYYY-MM-DD').format('DD/MM/YYYY') },
    { field: "ToDate", headerName: "To Date", width: 150, valueFormatter: (params) => dayjs(params.value, 'YYYY-MM-DD').format('DD/MM/YYYY') },
    // { field: "guestname", headerName: "UserName", width: 150 },
    { field: "Trips", headerName: "Trips", width: 150 },
    { field: "Amount", headerName: "Amount", width: 130 },
];

const useCoversubmit = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [tripData] = useState('');
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [customer, setCustomer] = useState("");
    const [success, setSuccess] = useState(false);
    const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({});
    const [servicestation, setServiceStation] = useState("");
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [invoiceColumn, setInvoiceColumn] = useState(false)
    const [warningMessage] = useState({});



    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "Cover.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Cover Submit", 10, 10);
        const tableData = rows.map((row) => [
            row['id'],
            row['Status'],
            row['InvoiceNo'],
            row['InvoiceDate'],
            row['Customer'],
            row['fromdate'],
            row['todate'],
            row['trips'],
            row['Totalamount']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Status', 'Invoice No', 'Date', 'Customer', 'From Date', 'To Date', 'Trips', 'Amount']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Cover.pdf');
    };

    // POP UP---------------------------------
    const hidePopup = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
    };

    useEffect(() => {
        if (error || success || warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning]);

    //----------------------------------------------------------

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');

        setSelectedCustomerDatas((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };



    const handleShow = async () => {
        const startDate = dayjs(fromDate).format('YYYY-MM-DD')
        const endDate = dayjs(toDate).format('YYYY-MM-DD')

        try {
            const response = await axios.get(`${apiUrl}/ListDetails`,
                {
                    params: {
                        Customer: customer,
                        FromDate: startDate,
                        ToDate: endDate,
                    },
                });
            const data = response.data;
            setInvoiceColumn(true)
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("No data found");
            }
        }

        catch (err) {
            console.log(err, 'error');
        }
    }


    const handleButtonClickTripsheet = (params) => {
        const data = params.row;
        const groupbillingurl = `/home/billing/coveringbill?tab=groupbilling&Tripid=${data.Trip_id || ''}&InvoiceNo=${data.InvoiceNo || ''}&InvoiceColumn=${invoiceColumn || ''}&InvoiceDate=${data.InvoiceDate}&FromDate=${data.FromDate || ''}&ToDate=${data.ToDate || ''}&ReferenceNo=${data.ReferenceNo}`
        window.location.href = groupbillingurl
    };
    // const handleShow = useCallback(async () => {

    //     try {
    //         const response = await axios.get(`${apiUrl}/payment-detail`, {
    //             params: {
    //                 customer: encodeURIComponent(customer),
    //                 fromDate: fromDate.format('YYYY-MM-DD'),
    //                 toDate: toDate.format('YYYY-MM-DD'),
    //                 servicestation: encodeURIComponent(servicestation),
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
    //             setSuccessMessage("Successfully listed");
    //         } else {
    //             setRows([]);
    //             setError(true);
    //             setErrorMessage("No data found");
    //         }
    //     } catch {
    //         setRows([]);
    //         setError(true);
    //         setErrorMessage("Check your Network Connection");
    //     }

    // }, [customer, fromDate, toDate, servicestation, apiUrl]);

    return {
        rows,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        hidePopup,
        customer,
        tripData,
        // bankOptions,
        setCustomer,
        selectedCustomerDatas,
        fromDate,
        handleDateChange,
        setFromDate,
        toDate,
        setToDate,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        handleButtonClickTripsheet
    };
};

export default useCoversubmit;