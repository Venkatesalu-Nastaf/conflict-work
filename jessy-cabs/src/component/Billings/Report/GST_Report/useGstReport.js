import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { GiLog } from "react-icons/gi";


const useGstReport = () => {
    const [organization, setOrganization] = useState([]);
    const [department, setDepartment] = useState([]);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [rows, setRows] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [stationData, setStationData] = useState([]);
    const [gstTaxPercent, setGstTaxPercent] = useState(0);
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

    //Loading //
    const [isGstbtnloading, setisGstbtnloading] = useState(false)

    const columns = [
        { field: 'id', headerName: 'Sno', width: 70 },
        // { field: "", headerName: "Invoice No", width: 130 },
        // { field: "InvoiceDate", headerName: "Invoice Date", width: 130 },
        { field: 'invoiceNo', headerName: 'Invoice No', width: 90,},
        // { field: 'billdate', headerName: 'Invoice Date', width: 130,valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY') },
        { field: 'billdate', headerName: 'Invoice Date', width: 130, },
        { field: 'tripsheetdate', headerName: 'Trip Date', width: 130, valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY') },
        { field: 'customer', headerName: 'Customer Name', width: 130 },
        { field: 'gstNumber', headerName: 'GSTIN', width: 130 },
        { field: 'totalcalcAmount', headerName: 'GROSS', width: 130 },
        { field: 'gstTax', headerName: 'GST%', width: 130 },
        { field: 'cgst', headerName: 'CGST', width: 130 },
        { field: 'sgst', headerName: 'SGST', width: 130 },
        { field: 'igst', headerName: 'IGST', width: 130 },
        { field: 'billed', headerName: 'Billed', width: 130 },
        { field: "tripid", headerName: "Trip No", width: 130 },
    ];

    const apiUrl = APIURL;

    // fetch gst Tax Percentage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const customer = gstReport?.customer;

                const response = await axios.get(`${apiUrl}/customerDetailsAndGroupBillingDetails/${customer}`)
                console.log(response.data, 'customer response');
                const data = response.data;
                const customerDetails = data.customerDetails;
                const stationDetails = data.customerStations;

                setCustomerData(customerDetails)
                setStationData(stationDetails)


                if (customerDetails.length > 0) {
                    setisGstbtnloading(false)
                } else {
                    setisGstbtnloading(false)
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [apiUrl, gstReport.customer, isGstbtnloading])


    // Fetch all customers
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/allCustomers`);
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
                invoiceNo: 20,
                invoicedate: 20,
                // billingno: 20,
                // billdate: 20,
                tripsheetdate: 20,
                customer: 30,
                gstNumber: 20,
                totalcalcAmount: 20,
                gstTax: 15,
                cgst: 15,
                sgst: 15,
                igst: 15,
                tripid: 20,
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
                    invoiceNo: row.invoiceNo,
                    // invoicedate: row.invoicedate,
                     invoicedate: row.invoicedate,
                    billingno: row.billingno,
                    billdate: dayjs(row.billdate).format('DD-MM-YYYY'),
                    tripsheetdate: dayjs(row.tripsheetdate).format('DD-MM-YYYY'),
                    customer: row.customer,
                    gstNumber: row.gstNumber,
                    totalcalcAmount: row.totalcalcAmount,
                    gstTax: row.gstTax,
                    cgst: row.cgst,
                    sgst: row.sgst,
                    igst: row.igst,
                    tripid: row.tripid,
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
                Invoice_no: '',
                invoicedate: '',
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
                Trips: '',
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
            row.id, row.invoiceNo, dayjs(row.invoicedate).format('DD-MM-YYYY'), dayjs(row.tripsheetdate).format('DD-MM-YYYY'),
            row.customer,
            row.gstNumber, row.totalcalcAmount, row.gstTax, row.cgst, row.sgst, row.igst, row.tripid, row.billed
        ]);

        // Add the total row to the end of the table rows
        tableRows.push(totalRow);

        const columnWidths = [
            9, 15, 19, 19, 19,
            18, 18, 12, 15, 15, 14, 15
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
                    const { cell, } = data;
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

    const handleShowAll = async () => {
        if (
            !gstReport.customer ||
            gstReport.customer === undefined
        ) {

            setError(true)
            setErrorMessage('Please Enter the Customer.')
            return
        }

        try {
            const response = await axios.get(`${apiUrl}/getAllStateBilledDetails`, {
                params: gstReport
            });
            const { combinedResults, allTripDetails, tripsheetResults } = response.data;

            if (allTripDetails.length === 0) {
                setError(true)
                setErrorMessage("No Data Found")
                setRows([])
                setTaxReport({
                    TaxableValue: "",
                    cgst: "",
                    sgst: "",
                    igst: "",
                    totalGST: "",
                    totalAmount: ""
                })
                return
            }
            const updatedTripsheetResults = tripsheetResults.map(trip => {
                const tripDetails = allTripDetails.find(detail => detail.tripId === String(trip.tripid));

                if (tripDetails) {
                    return {
                        ...trip,
                        invoiceNo: tripDetails.invoiceNo,
                        invoiceDate: dayjs(tripDetails.invoiceDate).format('DD-MM-YYYY'),
                    };
                }

                return trip;
            });
          console.log(updatedTripsheetResults,"invoicedateresults");
          
            // Initialize totals
            let totalCGST = 0;
            let totalSGST = 0;
            let totalIGST = 0;
            let totalGST = 0;
            let totalAmount = 0;
            let totalCGSTAmount = 0;
            let totalIGSTAmount = 0;
            let cgstTax = customerData[0]?.gstTax / 2;
            let igstTax = customerData[0]?.gstTax

            const FinalTripsheetResults = updatedTripsheetResults.map((item, index) => {
                const billdate = item.invoiceDate;
                const customerDetails = item.customer;
                const gstTax = customerData[0]?.gstTax || 0;
                const totalcalcAmount = item.totalcalcAmount || 0;
                const cgst = customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? Math.round((cgstTax * totalcalcAmount) / 100) || 0 : 0
                const igst = customerData[0]?.state !== stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? Math.round((igstTax * totalcalcAmount) / 100) || 0 : 0
                const sgst = cgst;

                // Update totals
                totalCGST += cgst;
                totalSGST += sgst;
                totalIGST += igst;
                totalAmount += totalcalcAmount;
                totalGST += customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? cgst + sgst : igst;
                totalCGSTAmount += totalcalcAmount + cgst + sgst;
                totalIGSTAmount += totalcalcAmount + igst;
                const billedAmount = customerData[0]?.state === stationData[0]?.state 
                ? Math.round(totalcalcAmount + cgst + sgst) 
                : Math.round(totalcalcAmount + igst);

                return {
                    ...item,
                    id: index + 1,
                    billdate: billdate,
                    tripsheetdate: dayjs(item.tripsheetdate),
                    // billed: "Yes",
                    billed:billedAmount,
                    gstNumber: customerData[0]?.gstnumber || '',
                    gstTax: Math.round(gstTax),
                    cgst: cgst,
                    sgst: sgst,
                    igst: igst
                };
            });
            setRows(FinalTripsheetResults)
            setSuccess(true)
            setSuccessMessage('Successfully Listed')
            setTaxReport({
                TaxableValue: Math.round(totalAmount),
                cgst: Math.round(totalCGST),
                sgst: Math.round(totalSGST),
                igst: Math.round(totalIGST),
                totalGST: Math.round(totalGST),
                totalAmount: customerData[0]?.state === stationData[0]?.state ? Math.round(totalCGSTAmount) : Math.round(totalIGSTAmount)
            });

            // const { tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults } = response.data;
            // console.log(tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults, "gstresponse");
            // // Combine coveringBilledResults and transferBilledResults into a single array
            // const combinedData = [
            //     ...coveringBilledResults.map(item => ({
            //         billdate: dayjs(item.InvoiceDate).format('YYYY-MM-DD'),
            //         customer: item.Customer,
            //     })),
            //     ...transferBilledResults.map(item => ({
            //         billdate: dayjs(item.Billdate).format('YYYY-MM-DD'),
            //         customer: item.Organization_name,
            //     })),
            //     ...individualBilledResults.map(item => ({
            //         billdate: dayjs(item.Bill_Date).format('YYYY-MM-DD'),
            //         customer: item.Customer,
            //     }))
            // ];

            // // Create a map from combinedData for easy lookup
            // const billDateMap = combinedData.reduce((map, item) => {
            //     map[item.customer] = item.billdate;
            //     return map;
            // }, {});

            // // Create a map from customerResults for easy lookup
            // const customerMap = customerResults.reduce((map, item) => {
            //     map[item.customer] = {
            //         gstNumber: item.gstnumber,
            //         gstTax: item.gstTax
            //     };
            //     return map;
            // }, {});

            // // Initialize totals
            // let totalCGST = 0;
            // let totalSGST = 0;
            // let totalGST = 0;
            // let totalAmount = 0;

            // // Update tripsheetResults with the billdate and GST details from maps
            // const updatedTripsheetResults = tripsheetResults.map((item, index) => {
            //     const billdate = billDateMap[item.customer] || billDateMap[item.Organization_name] || null;
            //     const customerDetails = customerMap[item.customer] || {};
            //     const gstTax = customerDetails.gstTax || 0;
            //     let cgstTax = gstTax / 2;
            //     const totalcalcAmount = item.totalcalcAmount || 0;
            //     const cgst = Math.round((cgstTax * totalcalcAmount) / 100);
            //     const sgst = cgst;
            //     console.log(cgst, 'gggg', cgstTax);

            //     // Update totals
            //     totalCGST += cgst;
            //     totalSGST += sgst;
            //     totalGST += cgst + sgst;
            //     totalAmount += totalcalcAmount + cgst + sgst;

            //     return {
            //         ...item,
            //         id: index + 1,
            //         billdate: billdate,
            //         tripsheetdate: dayjs(item.tripsheetdate),
            //         billed: "Yes",
            //         gstNumber: customerDetails.gstNumber || '',
            //         gstTax: Math.round(gstTax),
            //         cgst: cgst,
            //         sgst: sgst,
            //         igst: 0
            //     };
            // });
            // console.log(updatedTripsheetResults, 'updatetrip');

            // // Set rows and tax report state
            // setRows(updatedTripsheetResults);
            // setSuccess(true)
            // setSuccessMessage('Successfully Listed')
            // setTaxReport({
            //     TaxableValue: Math.round(totalAmount - totalGST),
            //     cgst: Math.round(totalCGST),
            //     sgst: Math.round(totalSGST),
            //     igst: 0,
            //     totalGST: Math.round(totalGST),
            //     totalAmount: Math.round(totalAmount)
            // });

        }
        //  catch (error) {
        // console.error('Error fetching data:', error);
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error

            if (error.message) {
                setError(true);
                setErrorMessage("Check your internet connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Show : " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }

    }

    const handleShow = async () => {
        if (
            !gstReport.customer ||
            gstReport.customer === undefined
        ) {
            setError(true)
            setErrorMessage('Please Enter Customer.')
            return
        }
        if (

            !gstReport.department ||
            gstReport.department === undefined

        ) {

            setError(true)
            setErrorMessage('Please Enter Department.')
            return
        }

        try {
            const response = await axios.get(`${apiUrl}/getParticularStateBilledDetails`, {
                params: gstReport
            });

            console.log(response.data, 'gstreportdata');
            const { combinedResults, allTripDetails, tripsheetResults } = response.data;

            if (allTripDetails.length === 0) {
                setError(true)
                setErrorMessage("No Data Found")
                setRows([])
                setTaxReport({
                    TaxableValue: "",
                    cgst: "",
                    sgst: "",
                    igst: "",
                    totalGST: "",
                    totalAmount: ""
                })
                return
            }

            const updatedTripsheetResults = tripsheetResults.map(trip => {
                const tripDetails = allTripDetails.find(detail => detail.tripId === String(trip.tripid));

                if (tripDetails) {
                    return {
                        ...trip,
                        invoiceNo: tripDetails.invoiceNo,
                        invoiceDate: tripDetails.invoiceDate,
                    };
                }

                return trip;
            });


            // Initialize totals
            let totalCGST = 0;
            let totalSGST = 0;
            let totalIGST = 0;
            let totalGST = 0;
            let totalAmount = 0;
            let totalCGSTAmount = 0;
            let totalIGSTAmount = 0;
            let cgstTax = customerData[0]?.gstTax / 2;
            let igstTax = customerData[0]?.gstTax

            const FinalTripsheetResults = updatedTripsheetResults.map((item, index) => {
                // const billdate = item.invoiceDate;
                const billdate = dayjs(item.invoiceDate).format('DD-MM-YYYY'); 
                const customerDetails = item.customer;
                const gstTax = customerData[0]?.gstTax || 0;
                const totalcalcAmount = item.totalcalcAmount || 0;
                const cgst = customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? Math.round((cgstTax * totalcalcAmount) / 100) || 0 : 0
                const igst = customerData[0]?.state !== stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? Math.round((igstTax * totalcalcAmount) / 100) || 0 : 0
                const sgst = cgst;

                // Update totals
                totalCGST += cgst;
                totalSGST += sgst;
                totalIGST += igst;
                totalAmount += totalcalcAmount;
                totalGST += customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? cgst + sgst : igst;
                totalCGSTAmount += totalcalcAmount + cgst + sgst;
                totalIGSTAmount += totalcalcAmount + igst;

                const billedAmount = customerData[0]?.state === stationData[0]?.state 
                ? Math.round(totalcalcAmount + cgst + sgst) 
                : Math.round(totalcalcAmount + igst);

                return {
                    ...item,
                    id: index + 1,
                    billdate: billdate,
                    tripsheetdate: dayjs(item.tripsheetdate),
                    // billed: "Yes",
                    billed:billedAmount,
                    gstNumber: customerData[0]?.gstnumber || '',
                    gstTax: Math.round(gstTax),
                    cgst: cgst,
                    sgst: sgst,
                    igst: igst
                };
            });
            setRows(FinalTripsheetResults)
            setSuccess(true)
            setSuccessMessage('Successfully Listed')
            setTaxReport({
                TaxableValue: Math.round(totalAmount),
                cgst: Math.round(totalCGST),
                sgst: Math.round(totalSGST),
                igst: Math.round(totalIGST),
                totalGST: Math.round(totalGST),
                totalAmount: customerData[0]?.state === stationData[0]?.state ? Math.round(totalCGSTAmount) : Math.round(totalIGSTAmount)
            });


            //     const { tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults } = response.data;
            //     if (tripsheetResults.length === 0) {
            //         setError(true)
            //         setErrorMessage('No Data Found')
            //         return
            //     }

            //     // Combine coveringBilledResults and transferBilledResults into a single array
            //     const combinedData = [
            //         ...coveringBilledResults.map(item => ({
            //             billdate: dayjs(item.InvoiceDate).format('DD-MM-YYYY'),
            //             customer: item.Customer,
            //         })),
            //         ...transferBilledResults.map(item => ({
            //             billdate: dayjs(item.Billdate).format('DD-MM-YYYY'),
            //             customer: item.Organization_name,
            //         })),
            //         ...individualBilledResults.map(item => ({
            //             billdate: dayjs(item.Bill_Date).format('DD-MM-YYYY'),
            //             customer: item.Customer,
            //         }))
            //     ];

            //     // Create a map from combinedData for easy lookup
            //     const billDateMap = combinedData.reduce((map, item) => {
            //         map[item.customer] = item.billdate;
            //         return map;
            //     }, {});
            //   console.log(billDateMap,'bbbbbbbbb');

            //     // Create a map from customerResults for easy lookup
            //     const customerMap = customerResults.reduce((map, item) => {
            //         map[item.customer] = {
            //             gstNumber: item.gstnumber,
            //             gstTax: item.gstTax
            //         };
            //         return map;
            //     }, {});

            //     // Initialize totals
            //     let totalCGST = 0;
            //     let totalSGST = 0;
            //     let totalGST = 0;
            //     let totalAmount = 0;

            //     // Update tripsheetResults with the billdate and GST details from maps
            //     const updatedTripsheetResults = tripsheetResults.map((item, index) => {
            //         const billdate = billDateMap[item.customer] || billDateMap[item.Organization_name] || null;
            //         const customerDetails = customerMap[item.customer] || {};
            //         const gstTax = customerDetails.gstTax || 0;
            //         const totalcalcAmount = item.totalcalcAmount || 0;
            //         const cgst = Math.round((gstTax * totalcalcAmount) / 100);
            //         const sgst = cgst;

            //         // Update totals
            //         totalCGST += cgst;
            //         totalSGST += sgst;
            //         totalGST += cgst + sgst;
            //         totalAmount += totalcalcAmount + cgst + sgst;
            //         console.log(billdate,'bbbb6666');

            //         return {
            //             ...item,
            //             id: index + 1,
            //             billdate: billdate,
            //             tripsheetdate: dayjs(item.tripsheetdate),
            //             billed: "Yes",
            //             gstNumber: customerDetails.gstNumber || '',
            //             gstTax: Math.round(gstTax),
            //             cgst: cgst,
            //             sgst: sgst,
            //             igst: 0
            //         };
            //     });
            //     // Set rows and tax report state
            //     console.log(updatedTripsheetResults,'updatetrip');
            //     setRows(updatedTripsheetResults);
            //     setSuccess(true)
            //     setSuccessMessage('Successfully Listed')
            //     setTaxReport({
            //         TaxableValue: Math.round(totalAmount - totalGST),
            //         cgst: Math.round(totalCGST),
            //         sgst: Math.round(totalSGST),
            //         igst: 0,
            //         totalGST: Math.round(totalGST),
            //         totalAmount: Math.round(totalAmount)
            //     });

        }
        //  catch (error) {
        //     console.error('Error fetching data:', error);
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setErrorMessage("Check your internet connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Show: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };
    const hidePopup = () => {
        setError(false);
        setSuccess(false);

    };
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);
    return {
        organization,
        setGstReport,
        gstReport,
        department,
        handleShow,
        handleShowAll,
        rows,
        columns,
        taxReport,
        handleDownloadPdf,
        handleDownloadExcel,
        success,
        successMessage,
        error,
        errorMessage,
        hidePopup,
        isGstbtnloading, setisGstbtnloading
    };
};
export default useGstReport;
