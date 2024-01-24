import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import { Organization } from '../../billingMain/PaymentDetail/PaymentDetailData';

const useTransferlist = () => {

    const user_id = localStorage.getItem('useridno');

    const [selectedStatus, setSelectedStatus] = useState('');
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [customer, setCustomer] = useState("");
    const [bankOptions, setBankOptions] = useState([]);
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [servicestation, setServiceStation] = useState("");

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'CB Billing';
                const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
                console.log('permission data', response.data);
            } catch (error) {
                console.error('Error fetching user permissions:', error);
            }
        };

        fetchPermissions();
    }, [user_id]);

    const checkPagePermission = () => {
        const currentPageName = 'CB Billing';
        const permissions = userPermissions || {};

        if (permissions.page_name === currentPageName) {
            return {
                read: permissions.read_permission === 1,
                new: permissions.new_permission === 1,
                modify: permissions.modify_permission === 1,
                delete: permissions.delete_permission === 1,
            };
        }

        return {
            read: false,
            new: false,
            modify: false,
            delete: false,
        };
    };

    const permissions = checkPagePermission();

    // Function to determine if a field should be read-only based on permissions
    const isFieldReadOnly = (fieldName) => {
        if (permissions.read) {
            // If user has read permission, check for other specific permissions
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
    };

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
        const tableData = rows.map((row) => [
            row['id'],
            row['voucherno'],
            row['printName'],
            row['Billname'],
            row['date'],
            row['PaymentCategory'],
            row['amount']
        ]);
        pdf.autoTable({
            head: [['Sno', 'VoucherNo', 'Payment Date', 'Bill Name', 'Payment Category', 'Amount']],
            body: tableData,
            startY: 20,
        });
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Customer_Details.pdf');
    };

    const hidePopup = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
    };
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleserviceInputChange = (event, newValue) => {
        setServiceStation(newValue ? decodeURIComponent(newValue.label) : '');
    };

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

    const handleShow = useCallback(async () => {

        try {
            const response = await axios.get(`http://localhost:8081/payment-detail`, {
                params: {
                    customer: encodeURIComponent(customer),
                    fromDate: fromDate.format('YYYY-MM-DD'),
                    toDate: toDate.format('YYYY-MM-DD'),
                    servicestation: encodeURIComponent(servicestation),
                },
            });

            const data = response.data;

            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                    Trips: row.trip_count,
                    toll: row.total_toll,
                    amount: row.total_Amount,
                    grossamount: row.total_Amount,
                    guestname: row.customer,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("No data found");
            }
        } catch {
            setRows([]);
            setError(true);
            setErrorMessage("Check your Network Connection");
        }

    }, [customer, fromDate, toDate, servicestation]);

    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "vcode", headerName: "VCode", width: 130 },
        { field: "invoiceno", headerName: "Invoice No", width: 130 },
        { field: "date", headerName: "Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
        { field: "customer", headerName: "Customer", width: 130 },
        { field: "monthid", headerName: "MonthID", width: 130 },
        { field: "fdate", headerName: "From Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
        { field: "tdate", headerName: "To Date", width: 150, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
        { field: "guestname", headerName: "UserName", width: 150 },
        { field: "Trips", headerName: "Trips", width: 150 },
        { field: "Subtotal", headerName: "SubTotal", width: 150 },
        { field: "grossamount", headerName: "GrossAmount", width: 150 },
        { field: "gst", headerName: "GST%", width: 130 },
        { field: "toll", headerName: "Toll", width: 130 },
        { field: "amount", headerName: "Amount", width: 130 },
        { field: "status", headerName: "Status", width: 130 },
        { field: "Diff", headerName: "Diff", width: 130 },
    ];

    const handleButtonClickTripsheet = (row) => {
        const customername = encodeURIComponent(row.customer);
        const encodedCustomer = customername;
        console.log(encodedCustomer);
        localStorage.setItem('selectedcustomer', encodedCustomer);
        const storedCustomer = localStorage.getItem('selectedcustomer');
        const decodedCustomer = decodeURIComponent(storedCustomer);
        localStorage.setItem('selectedcustomer', decodedCustomer);
        console.log(decodedCustomer);
        const billingPageUrl = `/home/billing/transfer?tab=dataentry`;
        window.location.href = billingPageUrl;
    }


    return {
        rows,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        isFieldReadOnly,
        hidePopup,
        customer,
        bankOptions,
        setCustomer,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        selectedStatus,
        setSelectedStatus,
        servicestation,
        handleserviceInputChange,
        handleShow,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        handleButtonClickTripsheet,
    };
};

export default useTransferlist;