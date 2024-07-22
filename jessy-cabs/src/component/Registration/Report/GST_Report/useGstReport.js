import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';


const useGstReport = () => {
    const [organization, setOrganization] = useState([]);
    const [department, setDepartment] = useState([]);
    const [rows, setRows] = useState([]);
    const [gstReport, setGstReport] = useState({
        customer: '',
        fromDate: dayjs().format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD'),
        department: ''
    });
    const [taxReport, setTaxReport] = useState({
        TaxableValue: "",
        cgst: "",
        sgst: "",
        igst: "",
        totalGST: "",
        totalAmount: ""
    })

    const columns = [
        { field: 'id', headerName: 'Sno', width: 70 },
        { field: 'billingno', headerName: 'Bill No', width: 90 },
        { field: 'billdate', headerName: 'Bill Date', width: 130 },
        { field: 'tripsheetdate', headerName: 'Trip Date', width: 130 },
        { field: 'customer', headerName: 'Customer Name', width: 130 },
        { field: 'gstNumber', headerName: 'GSTIN', width: 130 },
        { field: 'totalcalcAmount', headerName: 'GROSS', width: 130 },
        { field: 'gstTax', headerName: 'GST%', width: 130 },
        { field: 'cgst', headerName: 'CGST', width: 130 },
        { field: 'sgst', headerName: 'SGST', width: 130 },
        { field: 'igst', headerName: 'IGST', width: 130 },
        { field: 'billed', headerName: 'Billed', width: 130 },
    ];

    const apiUrl = APIURL;

    // Fetch all customers
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/allCustomers`);
                console.log(response.data, 'customer');
                setOrganization(response.data);
                if (response.data.length > 0) {
                    setGstReport(prevGstReport => ({
                        ...prevGstReport,
                        customer: response.data.customer
                    }));
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };
        fetchCustomerData();
    }, [apiUrl]);

    // Fetch station names in station creation
    useEffect(() => {
        const fetchDepartmentData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/allDepartment`);
                console.log(response.data, 'department');
                setDepartment(response.data);
                if (response.data.length > 0) {
                    setGstReport(prevGstReport => ({
                        ...prevGstReport,
                        department: response.data.stationname
                    }));
                }
            } catch (error) {
                console.error('Error fetching department data:', error);
            }
        };
        fetchDepartmentData();
    }, [apiUrl]);



    const handleDownloadExcel = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';

        try {
            const fileName = "GST Report";
            const worksheet = workbook.addWorksheet(workSheetName);

            // Define column widths
            const columnWidths = {
                id: 10,
                billingno: 20,
                billdate: 20,
                tripsheetdate: 20,
                customer: 30,
                gstNumber: 20,
                totalcalcAmount: 20,
                gstTax: 15,
                cgst: 15,
                sgst: 15,
                igst: 15,
                billed: 10
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
                    id: row.id,
                    billingno: row.billingno,
                    billdate: row.billdate,
                    tripsheetdate: row.tripsheetdate,
                    customer: row.customer,
                    gstNumber: row.gstNumber,
                    totalcalcAmount: row.totalcalcAmount,
                    gstTax: row.gstTax,
                    cgst: row.cgst,
                    sgst: row.sgst,
                    igst: row.igst,
                    billed: row.billed
                });

                // Center-align all data cells
                newRow.eachCell({ includeEmpty: true }, (cell) => {
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                });
            });

            // Calculate totals
            const totalAmount = rows.reduce((sum, row) => sum + (row.totalcalcAmount || 0), 0);
            const totalCGST = rows.reduce((sum, row) => sum + (row.cgst || 0), 0);
            const totalSGST = rows.reduce((sum, row) => sum + (row.sgst || 0), 0);
            // const grandTotal = totalAmount + totalCGST + totalSGST;

            // Add totals row at the bottom
            const totalsRow = worksheet.addRow({
                id: '',
                billingno: '',
                billdate: '',
                tripsheetdate: '',
                customer: 'Totals',
                gstNumber: '',
                totalcalcAmount: totalAmount,
                gstTax: '',
                cgst: totalCGST,
                sgst: totalSGST,
                igst: '',
                billed: ''
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
    };

    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const tableColumn = columns.map(column => column.headerName);

        // Calculate the totals for the columns
        const totalSum = rows.reduce((acc, row) => acc + parseFloat(row.totalcalcAmount || 0), 0);
        const totalCgst = rows.reduce((acc, row) => acc + parseFloat(row.cgst || 0), 0);
        const totalSgst = rows.reduce((acc, row) => acc + parseFloat(row.sgst || 0), 0);

        // Create the total row
        const totalRow = columns.map(column => {
            if (column.field === 'totalcalcAmount') return totalSum;
            if (column.field === 'cgst') return totalCgst;
            if (column.field === 'sgst') return totalSgst;
            if (column.headerName === 'Customer Name') return 'Total';
            return '';
        });

        // Map the rows to the format needed for autoTable
        const tableRows = rows.map(row => [
            row.id, row.billingno, row.billdate, row.tripsheetdate, row.customer,
            row.gstNumber, row.totalcalcAmount, row.gstTax, row.cgst, row.sgst, row.igst, row.billed
        ]);

        // Add the total row to the end of the table rows
        tableRows.push(totalRow);

        const columnWidths = [
            10, 15, 19, 19, 19,
            20, 20, 15, 15, 15, 15, 14
        ];

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            columnStyles: {
                0: { cellWidth: columnWidths[0] },
                1: { cellWidth: columnWidths[1] },
                2: { cellWidth: columnWidths[2] },
                3: { cellWidth: columnWidths[3] },
                4: { cellWidth: columnWidths[4] },
                5: { cellWidth: columnWidths[5] },
                6: { cellWidth: columnWidths[6] },
                7: { cellWidth: columnWidths[7] },
                8: { cellWidth: columnWidths[8] },
                9: { cellWidth: columnWidths[9] },
                10: { cellWidth: columnWidths[10] },
                11: { cellWidth: columnWidths[11] }
            },
            styles: {
                cellPadding: 2,
                fontSize: 8,
                overflow: 'linebreak',
            },
            margin: { left: 7, right: 5 }, // Set the margin to ensure equal space on the left and right
            willDrawCell: function (data) {
                // Check if this cell is part of the total row
                if (data.row.index === tableRows.length - 1) {
                    const { cell, row, column } = data;
                    const { x, y, width, height } = cell;

                    // Set bold text and increased font size
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10); // Increase the font size as needed

                    // Draw top border
                    doc.setDrawColor(0); // Black color
                    doc.setLineWidth(0.5); // Line width
                    doc.line(x, y, x + width, y); // Draw top border

                    // Draw bottom border
                    doc.line(x, y + height, x + width, y + height); // Draw bottom border
                }
            }
        });

        doc.save('gst_report.pdf');
    };


    const handleShow = async () => {
        try {
            const response = await axios.get(`${apiUrl}/getBilledDetails`, {
                params: gstReport
            });
            console.log(response.data, 'reportdata');

            const { tripsheetResults, coveringBilledResults, transferBilledResults, customerResults } = response.data;

            // Combine coveringBilledResults and transferBilledResults into a single array
            const combinedData = [
                ...coveringBilledResults.map(item => ({
                    billdate: dayjs(item.InvoiceDate).format('YYYY-MM-DD'),
                    customer: item.Customer,
                })),
                ...transferBilledResults.map(item => ({
                    billdate: dayjs(item.Billdate).format('YYYY-MM-DD'),
                    customer: item.Organization_name,
                }))
            ];

            // Create a map from combinedData for easy lookup
            const billDateMap = combinedData.reduce((map, item) => {
                map[item.customer] = item.billdate;
                return map;
            }, {});

            // Create a map from customerResults for easy lookup
            const customerMap = customerResults.reduce((map, item) => {
                map[item.customer] = {
                    gstNumber: item.gstnumber,
                    gstTax: item.gstTax
                };
                return map;
            }, {});

            // Initialize totals
            let totalCGST = 0;
            let totalSGST = 0;
            let totalGST = 0;
            let totalAmount = 0;

            // Update tripsheetResults with the billdate and GST details from maps
            const updatedTripsheetResults = tripsheetResults.map((item, index) => {
                const billdate = billDateMap[item.customer] || billDateMap[item.Organization_name] || null;
                const customerDetails = customerMap[item.customer] || {};
                const gstTax = customerDetails.gstTax || 0;
                const totalcalcAmount = item.totalcalcAmount || 0;
                const cgst = (gstTax * totalcalcAmount) / 100;
                const sgst = cgst;

                // Update totals
                totalCGST += cgst;
                totalSGST += sgst;
                totalGST += cgst + sgst;
                totalAmount += totalcalcAmount + cgst + sgst;

                return {
                    ...item,
                    id: index + 1,
                    billdate: billdate,
                    tripsheetdate: dayjs(item.tripsheetdate).format('YYYY-MM-DD'),
                    billed: "Yes",
                    gstNumber: customerDetails.gstNumber || '',
                    gstTax: gstTax,
                    cgst: cgst,
                    sgst: sgst,
                    igst: 0
                };
            });

            // Set rows and tax report state
            setRows(updatedTripsheetResults);
            setTaxReport({
                TaxableValue: totalAmount - totalGST,
                cgst: totalCGST,
                sgst: totalSGST,
                igst: 0,
                totalGST: totalGST,
                totalAmount: totalAmount
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return {
        organization,
        setGstReport,
        gstReport,
        department,
        handleShow,
        rows,
        columns,
        taxReport,
        handleDownloadPdf,
        handleDownloadExcel
    };
};

export default useGstReport;
