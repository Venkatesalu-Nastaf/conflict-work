import { useState, useEffect } from 'react';

import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";
import Excel from 'exceljs';

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "Status", headerName: "Status", width: 130 },
    { field: "State", headerName: "Station", width: 130 },
    { field: "InvoiceNo", headerName: "IvnoiceGenerated", width: 130 },
    { field: "ReferenceNo", headerName: "Reference No", width: 130 },
    { field: "InvoiceDate", headerName: "BillDate", width: 130, valueFormatter: (params) => dayjs(params.value, 'YYYY-MM-DD').format('DD/MM/YYYY') },
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
    // const [invoiceColumn, setInvoiceColumn] = useState(false)
    const [warningMessage] = useState({});



    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    // const handleExcelDownload = () => {
        
    //     const csvData = convertToCSV(rows);
    //     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    //     saveAs(blob, "Cover.csv");
    //     console.log(rows,'row of cover submit')
    // };

    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';
        try {
            const fileName = "cover_submit";
            const worksheet = workbook.addWorksheet(workSheetName);
    
            // Define only the headers you need
            const headers = [
                "id",
                "Status",
                "ReferenceNo",
                "InvoiceDate",
                "Customer",  
                "State",
                "FromDate",
                "ToDate",
                "Trips",   
               "Trip_id", 
                "Amount",     ];
    
            const formattedRows = rows.map(row => {
                const formattedRow = {};
                headers.forEach(header => {
                    formattedRow[header] = row[header] !== undefined ? row[header] : ''; 
                    if (header === 'FromDate' || header === 'InvoiceDate' || header === 'ToDate') {
                        formattedRow[header] = dayjs(formattedRow[header]).format('DD-MM-YYYY');
                    }
                });
                return formattedRow;
            });
            const columns = headers.map(key => ({ key, header: key }));
            worksheet.columns = columns;

            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '9BB0C1' }
                };
            });
            
            worksheet.getRow(1).height = 30;
            worksheet.columns.forEach((column) => {
                column.width = column.header.length + 5;
                // column.alignment = { horizontal: 'center', vertical: 'middle' };
            });
    
            formattedRows.forEach((singleData) => {
                worksheet.addRow(singleData);
                worksheet.columns.forEach((column) => {
                    const cellValue = singleData[column.key] || '';
                    const cellLength = cellValue.toString().length;
                    const currentColumnWidth = column.width || 0;
                    column.width = Math.max(currentColumnWidth, cellLength + 5);
                });
            });
            // worksheet.eachRow({ includeEmpty: false }, (row) => {
            //     row.eachCell((cell) => {
            //         cell.border = {
            //             top: { style: 'thin' },
            //             left: { style: 'thin' },
            //             bottom: { style: 'thin' },
            //             right: { style: 'thin' },
            //         };
            //         const isHeader = row.number === 1;
            //         worksheet.getCell(cell).alignment = {
            //             horizontal: isHeader ? 'center' : 'left',
            //             vertical: 'middle',
            //         };
            //     });
            // });

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
                    const isHeader = row.number === 1;
                    worksheet.getCell(cellAddress).alignment = {
                        horizontal: isHeader ? 'center' : 'left',
                        vertical: 'middle',
                    };
                });
            });
            const buf = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (error) {
            console.error('<<<ERROR>>>', error);
        } finally {
            workbook.removeWorksheet(workSheetName);
        }
    };
    
    
   
    // const handlePdfDownload = () => {
    //     const pdf = new jsPDF();
    //     pdf.setFontSize(12);
    //     pdf.setFont('helvetica', 'normal');
    //     pdf.text("Cover Submit", 10, 10);
    //     const tableData = rows.map((row) => [
    //         row['id'],
    //         row['Status'],
    //         row['InvoiceNo'],
    //         row['InvoiceDate'],
    //         row['Customer'],
    //         row['FromDate'],
    //         row['ToDate'],
    //         row['Trips'],
    //         row['Amount']
    //     ]);
    //     pdf.autoTable({
    //         head: [['Sno', 'Status', 'Invoice No', 'Date', 'Customer', 'FromDate', 'ToDate', 'Trips', 'Amount']],
    //         body: tableData,
    //         startY: 20,
    //     });
    //     const pdfBlob = pdf.output('blob');
    //     saveAs(pdfBlob, 'Cover.pdf');
    // };
    const handlePdfDownload = () => {
      
            const pdf = new jsPDF();
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.text("Cover Submit", 10, 10);

            // const tableData = [[
            //     row['id'],
            //     row['Status'],
            //     row['InvoiceNo'],
            //     row['InvoiceDate'],
            //     row['Customer'],
            //     row['FromDate'],
            //     row['ToDate'],
            //     row['Trips'],
            //     row['Amount']
            // ]];

         const tableData = rows.map((row) => [
                row['id'],
                row['Status'],
                // row['InvoiceNo'],
                row['ReferenceNo'],
                row['InvoiceDate'] ? dayjs(row['InvoiceDate']).format('DD-MM-YYYY') : 'N/A',
                row['Customer'],
                row['FromDate'] ? dayjs(row['FromDate']).format('DD-MM-YYYY') : 'N/A',
                row['ToDate'] ? dayjs(row['ToDate']).format('DD-MM-YYYY') : 'N/A',
                row['Trips'],
                row['Amount']
            ]);

            pdf.autoTable({
                head: [['Sno', 'Status', 'ReferenceNo', 'Date', 'Customer', 'FromDate', 'ToDate', 'Trips', 'Amount']],
                body: tableData,
                startY: 20,
            });

            const pdfBlob = pdf.output('blob');
            saveAs(pdfBlob, `covering submit.pdf`);
        
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
        if (!customer) {
            setError(true)
            setErrorMessage('Select a Orgaization')
            return
          } 
        //   if (!servicestation) {
        //     setError(true)
        //     setErrorMessage('Select a Station')
        //     return
        //   } 
        if (servicestation === "" ) {
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
                // console.log(data, 'data');

                // setInvoiceColumn(true)
                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    // setServiceStation("All")
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("No data found");
                }
            }

            // catch (err) {
            //     console.log(err, 'error');
            // }
            catch (error) {
                // console.error("Error occurredddddd:", error);
             
                // Check if there's no response, indicating a network error
                if (error.message  === "Network Error") {
                    setError(true);
                    setErrorMessage("Check your internet connection");
                    // console.log('Network error');
                // } else if (error.response) {
                //     setError(true);
                //     // Handle other Axios errors (like 4xx or 5xx responses)
                //     setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
                } else {
                    // Fallback for other errors
                    setError(true);
                    setErrorMessage("An unexpected error occurred: " + error.message);
                }
            }
        }
        else if (servicestation !== "") {
            try {
                const response = await axios.get(`${apiUrl}/ListDetailsWithStation`,
                    {
                        params: {
                            Customer: customer,
                            FromDate: startDate,
                            ToDate: endDate,
                            station: servicestation
                        },
                    });
                const data = response.data;
                // console.log(data, 'data');

                // setInvoiceColumn(true)
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

            // catch (err) {
            //     console.log(err, 'error');
            // }
            catch (error) {
                // console.error("Error occurredddddd:", error);
             
                // Check if there's no response, indicating a network error
                if (error.message  === "Network Error") {
                    setError(true);
                    setErrorMessage("Check your internet connection");
                    // console.log('Network error');
                // } else if (error.response) {
                //     setError(true);
                //     // Handle other Axios errors (like 4xx or 5xx responses)
                //     setErrorMessage("Failed to add organization: " + (error.response.data.message || error.message));
                } else {
                    // Fallback for other errors
                    setError(true);
                    setErrorMessage("An unexpected error occurred: " + error.message);
                }
            }
        }
    }


    // const handleButtonClickTripsheet = (params) => {
    //     const data = params.row;
    //     const groupbillingurl = `/home/billing/coveringbill?tab=groupbilling&Tripid=${data.Trip_id || ''}&InvoiceNo=${data.InvoiceNo || ''}&InvoiceColumn=${invoiceColumn || ''}&InvoiceDate=${data.InvoiceDate}&FromDate=${data.FromDate || ''}&ToDate=${data.ToDate || ''}&ReferenceNo=${data.ReferenceNo}`
    //     window.location.href = groupbillingurl
    // };
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
        // handleButtonClickTripsheet
    };
};

export default useCoversubmit;