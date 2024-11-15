import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

const usePendingBill = () => {
    const columns = [
        { field: 'sno', headerName: 'S.no', width: 100 },
        { field: 'uniqueid', headerName: 'Bill No', width: 180 },
        { field: 'BillDate', headerName: 'Bill Date', width: 180, valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'),  },
        { field: 'CustomerName', headerName: 'Customer Name', width: 180 },
        { field: 'TotalAmount', headerName: 'Bill Amount', width: 180 },
        { field: 'Collected', headerName: 'Collected', width: 180 },
        { field: 'TotalBalance', headerName: 'Balance', width: 180 },
        { field: 'Account', headerName: 'Account', width: 180 },

    ];
    const [pendingBill, setPendingBill] = useState({
        fromDate: dayjs().format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD'),
        CustomerName: "",
        TotalAmount: "",
        Balance: ""
    })
    const [organization, setOrganization] = useState([]);
    const [rows, setRows] = useState([])
    const apiUrl = APIURL;
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false)
    // Fetch all customers
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/allCustomers`);
                const customerName = response.data.map(li => li.customer);
                setOrganization(customerName);
            } catch (error) {
                console.log('Error fetching customer data:', error);
            }
        };
        fetchCustomerData();
    }, [apiUrl]);

    const handlechange = (event) => {
        const { name, value } = event.target;
        setPendingBill(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFromDateChange = (date) => {
        setPendingBill((prevState) => ({
            ...prevState,
            fromDate: date.format('YYYY-MM-DD')
        }));
    };

    const handleToDateChange = (date) => {
        setPendingBill((prevState) => ({
            ...prevState,
            toDate: date.format('YYYY-MM-DD')
        }));
    };

    const addSerialNumber = (bills) => {
        return bills.map((bill, index) => ({
            sno: index + 1,
            ...bill
        }));
    };

    const fetchBills = async (endpoint, successMessage, errorMessage) => {
        if (pendingBill.CustomerName === "") {
            setError(true)
            setErrorMessage('Enter Customer Name')
            return
        }

        try {
            const { TotalAmount, Balance, ...customerData } = pendingBill;
            const response = await axios.post(`${apiUrl}/${endpoint}`, { customerData });

            if (response.data && response.data.length > 0) {
                const bills = addSerialNumber(response.data);
                const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalAmount), 0);
                const totalBalance = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalBalance), 0);

                setPendingBill(prevState => ({
                    ...prevState,
                    TotalAmount: totalAmount,
                    Balance: totalBalance
                }));
                setRows(bills);
                setSuccess(true);
                setSuccessMessage(successMessage);
            } else {
                setPendingBill(prevState => ({
                    ...prevState,
                    TotalAmount: "",
                    Balance: ""
                }));
                setRows([]);
                setError(true);
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.log(`Error fetching bills:`, error);
            if (error.message ) {
                setRows([])
                setError(true);
                setErrorMessage("Check your internet connection");
                // console.log('Network error');
            }else{  
            setPendingBill(prevState => ({
                ...prevState,
                TotalAmount: "",
                Balance: ""
            }))};
            // setRows([]);
            // setError(true);
            // setErrorMessage("Error fetching bills");
        }
    };

    const handleShowAllBills = () => {
        fetchBills('getAllBills', 'Successfully Listed', 'No data found');
    };

    const handleShowPendingBills = () => {
        fetchBills('getPendingBills', 'Successfully Listed', 'No data found');
    };

    //     const handleShowAllBills = async () => {
    //         try {
    //             const { TotalAmount, Balance, ...customerData } = pendingBill;

    //             const response = await axios.post(`${apiUrl}/getAllBills`, {
    //                 customerData
    //             });

    //             const bills = addSerialNumber(response.data);
    //             const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalAmount), 0);
    //             const totalBalance = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalBalance), 0);

    //             setPendingBill((prevState) => ({
    //                 ...prevState,
    //                 TotalAmount: totalAmount,
    //                 Balance: totalBalance
    //             }));

    //             setRows(bills);
    //         } catch (error) {
    //             console.log('Error fetching all bills:', error);
    //         }
    //     };

    //     const handleShowPendingBills = async () => {
    //     try {
    //         const { TotalAmount, Balance, ...customerData } = pendingBill;

    //         const response = await axios.post(`${apiUrl}/getPendingBills`, {
    //             customerData
    //         });

    //         if (response.data && response.data.length > 0) {
    //             const bills = addSerialNumber(response.data);
    //             const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalAmount), 0);
    //             const totalBalance = bills.reduce((sum, bill) => sum + parseFloat(bill.TotalBalance), 0);

    //             setPendingBill((prevState) => ({
    //                 ...prevState,
    //                 TotalAmount: totalAmount,
    //                 Balance: totalBalance
    //             }));

    //             setRows(bills);
    //             setSuccess(true);
    //             setSuccessMessage("Successfully Listed");
    //         } else {
    //             setPendingBill((prevState) => ({
    //                 ...prevState,
    //                 TotalAmount: "",
    //                 Balance: ""
    //             }));
    //             setRows([]);
    //             setError(true);
    //             setErrorMessage("No data found");
    //         }
    //     } catch (error) {
    //         console.log('Error fetching pending bills:', error);
    //         setPendingBill((prevState) => ({
    //             ...prevState,
    //             TotalAmount: "",
    //             Balance: ""
    //         }));
    //         setRows([]);
    //         setError(true);
    //         setErrorMessage("Error fetching pending bills");
    //     }
    // };


    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handlePdfDownload = () => {
        const doc = new jsPDF();

        const columns = [
            { field: 'sno', headerName: 'SNO' },
            { field: 'uniqueid', headerName: 'Unique ID' },
            { field: 'BillDate', headerName: 'Bill Date' },
            { field: 'CustomerName', headerName: 'Customer Name' },
            { field: 'TotalAmount', headerName: 'Total Amount' },
            { field: 'Collected', headerName: 'Collected' },
            { field: 'TotalBalance', headerName: 'Total Balance' },
            { field: 'Account', headerName: 'Account' }
        ];

        const tableColumn = columns.map(column => column.headerName);

        const totalSum = rows.reduce((acc, row) => acc + parseFloat(row.TotalAmount || 0), 0);
        const totalCollected = rows.reduce((acc, row) => acc + parseFloat(row.Collected || 0), 0);
        const totalBalance = rows.reduce((acc, row) => acc + parseFloat(row.TotalBalance || 0), 0);

        const totalRow = columns.map(column => {
            if (column.field === 'TotalAmount') return totalSum;
            if (column.field === 'Collected') return totalCollected;
            if (column.field === 'TotalBalance') return totalBalance;
            if (column.headerName === 'Customer Name') return 'Total';
            return '';
        });

        const tableRows = rows.map(row => [
            row.sno, row.uniqueid, row.BillDate, row.CustomerName, row.TotalAmount,
            row.Collected, row.TotalBalance, row.Account
        ]);

        tableRows.push(totalRow);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            columnStyles: {
                0: { cellWidth: 'wrap' },
                1: { cellWidth: 'wrap' },
                2: { cellWidth: 'wrap' },
                3: { cellWidth: 'wrap' },
                4: { cellWidth: 'wrap' },
                5: { cellWidth: 'wrap' },
                6: { cellWidth: 'wrap' },
                7: { cellWidth: 'wrap' }
            },
            styles: {
                cellPadding: 2,
                fontSize: 8,
                overflow: 'linebreak',
            },
            margin: { top: 10, bottom: 10 },
            tableWidth: 'auto',
            halign: 'center',
            willDrawCell: function (data) {
                if (data.row.index === tableRows.length - 1) {
                    const { cell, } = data;
                    const { x, y, width, height } = cell;

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);

                    doc.setDrawColor(0);
                    doc.setLineWidth(0.5);
                    doc.line(x, y, x + width, y);
                    doc.line(x, y + height, x + width, y + height);
                }
            }
        });

        doc.save('gst_report.pdf');
    }



    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';

        try {
            const fileName = "GST Report";
            const worksheet = workbook.addWorksheet(workSheetName);

            // Define columns with their field and headerName
            const columns = [
                { field: 'sno', headerName: 'SNO' },
                { field: 'uniqueid', headerName: 'Unique ID' },
                { field: 'BillDate', headerName: 'Bill Date' },
                { field: 'CustomerName', headerName: 'Customer Name' },
                { field: 'TotalAmount', headerName: 'Total Amount' },
                { field: 'Collected', headerName: 'Collected' },
                { field: 'TotalBalance', headerName: 'Total Balance' },
                { field: 'Account', headerName: 'Account' }
            ];

            // Define column widths
            const columnWidths = {
                id: 10,
                uniqueid: 20,
                BillDate: 20,
                CustomerName: 20,
                TotalAmount: 30,
                Collected: 20,
                TotalBalance: 20,
                Account: 15
            };

            // Set columns with widths
            worksheet.columns = columns.map(({ field, headerName }) => ({
                header: headerName,
                key: field,
                width: columnWidths[field] || 15 // Default width if not specified
            }));

            // Updated the font for the first row.
            worksheet.getRow(1).font = { bold: true };

            // Set background color for header cells
            worksheet.getRow(1).eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '9BB0C1' } // Light blue background color
                };
                cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Center-align headers
            });

            worksheet.getRow(1).height = 30;

            // Add rows to the worksheet
            rows.forEach(row => {
                const newRow = worksheet.addRow({
                    sno: row.sno,
                    uniqueid: row.uniqueid,
                    BillDate: row.BillDate,
                    CustomerName: row.CustomerName,
                    TotalAmount: row.TotalAmount,
                    Collected: row.Collected,
                    TotalBalance: row.TotalBalance,
                    Account: row.Account
                });

                // Center-align all data cells
                newRow.eachCell({ includeEmpty: true }, (cell) => {
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                });
            });

            // Calculate totals
            const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.TotalAmount || 0), 0);
            const totalCollected = rows.reduce((sum, row) => sum + parseFloat(row.Collected || 0), 0);
            const totalBalance = rows.reduce((sum, row) => sum + parseFloat(row.TotalBalance || 0), 0);

            // Add totals row at the bottom
            const totalsRow = worksheet.addRow({
                id: '',
                uniqueid: '',
                BillDate: '',
                CustomerName: 'Totals',
                TotalAmount: totalAmount,
                Collected: totalCollected,
                TotalBalance: totalBalance,
                Account: ''
            });

            totalsRow.font = { bold: true };

            // Increase the height of the totals row
            worksheet.getRow(totalsRow.number).height = 40; // Adjust the height as needed

            // Center-align the totals row cells
            totalsRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });

            const buf = await workbook.xlsx.writeBuffer();

            // Download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (err) {
            console.error('Error generating Excel file:', err);
        } finally {
            // Removing worksheet's instance to create a new one
            workbook.removeWorksheet(workSheetName);
        }
    }
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
    };

    return {
        pendingBill,
        setPendingBill,
        handlechange,
        handleFromDateChange,
        handleToDateChange,
        organization,
        handleShowAllBills,
        handleShowPendingBills,
        rows,
        columns,
        handleExcelDownload,
        handlePdfDownload,
        error,
        errorMessage,
        success,
        successMessage,
        hidePopup
    }
}
export default usePendingBill;