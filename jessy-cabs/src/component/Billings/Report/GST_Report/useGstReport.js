import { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../../url";
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
// import { GiLog } from "react-icons/gi";


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
    // const [gstTaxPercent, setGstTaxPercent] = useState(0);
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
    });
    // const [gstReportDatas, setGstReportDatas] = useState([])

    //Loading //
    const [isGstbtnloading, setisGstbtnloading] = useState(false)

    const columns = [
        { field: 'id', headerName: 'Sno', width: 70 },
        // { field: "", headerName: "Invoice No", width: 130 },
        // { field: "InvoiceDate", headerName: "Invoice Date", width: 130 },
        { field: 'Invoice_no', headerName: 'Invoice No', width: 90, },
        // { field: 'billdate', headerName: 'Invoice Date', width: 130,valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY') },
        { field: 'Billdate', headerName: 'Invoice Date', width: 130, valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY') },
        { field: 'FromDate', headerName: 'Trip Date', width: 130, valueFormatter: (params) => params.value ? dayjs(params.value).format('DD-MM-YYYY') : '' },
        { field: 'Organization_name', headerName: 'Customer Name', width: 130 },
        { field: 'gstNumber', headerName: 'GSTIN', width: 130 },
        // { field: 'Amount', headerName: 'GROSS', width: 130 },
        { field: 'GrossAmount', headerName: 'GROSS', width: 130 },
        { field: 'gstTax', headerName: 'GST%', width: 130 },
        { field: 'cgst', headerName: 'CGST', width: 130 },
        { field: 'sgst', headerName: 'SGST', width: 130 },
        { field: 'igst', headerName: 'IGST', width: 130 },
        { field: 'billed', headerName: 'Billed', width: 130 },
        { field: 'totalToll', headerName: 'Toll', width: 130 },
        { field: "Grouptrip_id", headerName: "GroupID", width: 130 },
    ];

    const apiUrl = APIURL;

    // fetch gst Tax Percentage
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const customer = gstReport?.customer;

    //             const response = await axios.get(`${apiUrl}/customerDetailsAndGroupBillingDetails/${customer}`)
    //             console.log(response.data, 'customer response');
    //             const data = response.data;
    //             const customerDetails = data.customerDetails;
    //             const stationDetails = data.customerStations;

    //             setCustomerData(customerDetails)
    //             setStationData(stationDetails)


    //             if (customerDetails.length > 0) {
    //                 setisGstbtnloading(false)
    //             } else {
    //                 setisGstbtnloading(false)
    //             }
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData()
    // }, [apiUrl, gstReport.customer, isGstbtnloading])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customer = gstReport?.customer;
                const fromDate = gstReport?.fromDate;
                const toDate = gstReport?.toDate;
                let customerAll;
                if (!customer) {
                    // console.log("Customer value is missing or undefined.");
                    return; // Prevent API call if customer is invalid
                }
                if (customer === "All") {
                    const requestUrl = `${apiUrl}/gettingCustomerList`;
                    const response = await axios.post(requestUrl, { fromDate, toDate });
                    // console.log(response.data, "GST Data Response");
                    customerAll = response.data?.map(item => item.Organization_name);
                    // console.log(customerAll,"all")
                    if(customerAll.length === 0){
                        return
                    }
                    else{

                    
                    const responsecustomer = await axios.post(`${apiUrl}/multipleCustomerGSTDetails`, {
                        customer: customerAll
                    })
                    if (Array.isArray(responsecustomer.data) && responsecustomer.data.length > 0) {
                        // Extract all customer details and station data
                        const allCustomerDetails = responsecustomer.data.map(item => item.customerDetails);
                        const allCustomerStations = responsecustomer.data.flatMap(item => item.customerStations);

                        // Set state with all data
                        // console.log(allCustomerDetails,"detaisl")
                        // console.log(allCustomerStations,"st")
                        setCustomerData(allCustomerDetails);
                        setStationData(allCustomerStations);
                    }
                }
                    return;
                }
                if (customer !== "All") {
                    const requestUrl = `${apiUrl}/customerDetailsAndGroupBillingDetails/${customer}`;

                    const response = await axios.get(requestUrl);

                    const data = response.data;
                    const customerDetails = data.customerDetails;
                    const stationDetails = data.customerStations;

                    setCustomerData(customerDetails);
                    setStationData(stationDetails);
                    setisGstbtnloading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (gstReport?.customer) {
            console.log("hello")
            fetchData();
        }
    }, [apiUrl, gstReport?.customer,gstReport?.fromDate,gstReport?.toDate]);



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
                // tripsheetdate: 20,
                FromDate: 20,
                Organization_name: 40,
                gstNumber: 20,
                Amount: 20,
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
                    Invoice_no: row.Invoice_no,
                    // invoicedate: row.invoicedate,
                    Billdate: dayjs(row.Billdate).format('DD-MM-YYYY'),
                    billingno: row.billingno,
                    billdate: dayjs(row.billdate).format('DD-MM-YYYY'),
                    // tripsheetdate: dayjs(row.tripsheetdate).format('DD-MM-YYYY'),
                    FromDate: row.FromDate ? dayjs(row.FromDate).format('DD-MM-YYYY') : '',
                    Organization_name: row.Organization_name,
                    gstNumber: row.gstNumber,
                    GrossAmount: row.GrossAmount,
                    gstTax: row.gstTax,
                    cgst: row.cgst,
                    sgst: row.sgst,
                    igst: row.igst,
                    // tripid: row.tripid,
                    billed: row.billed,
                    totalToll:row.totalToll,
                    Grouptrip_id: row.Grouptrip_id
                });

                // Center-align all data cells
                newRow.eachCell({ includeEmpty: true }, (cell) => {
                    cell.alignment = { horizontal: 'left', vertical: 'middle' };
                });
            });

            // Calculate totals
            const totalAmount = rows.reduce((sum, row) => sum + parseInt(row.Amount || 0), 0);
            const totalCGST = rows.reduce((sum, row) => sum + (row.cgst || 0), 0);
            const totalSGST = rows.reduce((sum, row) => sum + (row.sgst || 0), 0);
            // const grandTotal = totalAmount + totalCGST + totalSGST;

            // Add totals row at the bottom
            const totalsRow = worksheet.addRow({
                id: '',
                Invoice_no: '',
                Billdate: '',
                billingno: '',
                billdate: '',
                tripsheetdate: '',
                Organization_name: 'Totals',
                gstNumber: '',
                Amount: totalAmount,
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
                cell.alignment = { horizontal: 'left', vertical: 'middle' };
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
      
        // Determine font size based on column count
        const headerLength = tableColumn.length;
        let fontdata = 10;
        if (headerLength <= 13) fontdata = 10;
        else if (headerLength >= 14 && headerLength <= 18) fontdata = 6.5;
      
        // Calculate totals
        const totalSum = rows.reduce((acc, row) => acc + parseFloat(row.GrossAmount || 0), 0);
        const totalCgst = rows.reduce((acc, row) => acc + parseFloat(row.cgst || 0), 0);
        const totalSgst = rows.reduce((acc, row) => acc + parseFloat(row.sgst || 0), 0);
      
        // Create total row
        const totalRow = columns.map(column => {
          if (column.field === 'GrossAmount') return totalSum;
          if (column.field === 'cgst') return totalCgst;
          if (column.field === 'sgst') return totalSgst;
          if (column.headerName === 'Customer Name') return 'Total';
          return '';
        });
      
        // Prepare table rows
        const tableRows = rows.map(row => [
          row.id,
          row.Invoice_no,
          dayjs(row.invoicedate).format('DD-MM-YYYY'),
          row.FromDate ? dayjs(row.FromDate).format('DD-MM-YYYY') : '',
          row.Organization_name,
          row.gstnumber,
          row.Amount,
          row.gstTax,
          row.cgst,
          row.sgst,
          row.igst,
          row.billed,
          row.totalToll,
          row.Grouptrip_id,
        ]);
      
        // Add total row
        tableRows.push(totalRow);
      
        // Add title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        const title = "GST Report";
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(title, textX, 10);
      
        // Generate table without custom widths
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          headStyles: {
            fontSize: fontdata,
            cellPadding: 1.5,
            minCellHeight: 8,
            valign: 'middle',
            font: 'helvetica',
            cellWidth: 'wrap'
          },
          bodyStyles: {
            fontSize: fontdata,
            valign: 'middle',
            cellWidth: 'auto',
            overflow: 'linebreak',
            cellPadding: 2
          },
          margin: { left: 7, right: 5 },
          willDrawCell: function (data) {
            // Highlight total row
            if (data.row.index === tableRows.length - 1) {
              const { cell } = data;
              const { x, y, width, height } = cell;
      
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(7);
              doc.setDrawColor(0);
              doc.setLineWidth(0.5);
              doc.line(x, y, x + width, y);             // Top
              doc.line(x, y + height, x + width, y + height); // Bottom
            }
          }
        });
      
        // Save PDF
        doc.save('gst_report.pdf');
      };
      

    // const handleDownloadPdf = () => {
    //     const doc = new jsPDF();
    //     const tableColumn = columns.map(column => column.headerName);
    
    //     const headerLength = tableColumn.length;
    //     let fontdata = 10; // default
    //     if (headerLength <= 13) fontdata = 10;
    //     else if (headerLength >= 14 && headerLength <= 18) fontdata = 6.5;
    
    //     const totalSum = rows.reduce((acc, row) => acc + parseFloat(row.GrossAmount || 0), 0);
    //     const totalCgst = rows.reduce((acc, row) => acc + parseFloat(row.cgst || 0), 0);
    //     const totalSgst = rows.reduce((acc, row) => acc + parseFloat(row.sgst || 0), 0);
    
    //     const totalRow = columns.map(column => {
    //         if (column.field === 'GrossAmount') return totalSum;
    //         if (column.field === 'cgst') return totalCgst;
    //         if (column.field === 'sgst') return totalSgst;
    //         if (column.headerName === 'Customer Name') return 'Total';
    //         return '';
    //     });
        
    
    //     const tableRows = rows.map(row => [
    //         row.id, row.Invoice_no, dayjs(row.invoicedate).format('DD-MM-YYYY'),
    //         row.FromDate ? dayjs(row.FromDate).format('DD-MM-YYYY') : '',
    //         row.Organization_name,
    //         row.gstnumber, row.Amount, row.gstTax, row.cgst, row.sgst, row.igst, row.billed,row.totalToll, row.Grouptrip_id,
    //     ]);
    
    //     tableRows.push(totalRow);
    
    //     const columnWidths = [9, 14, 18, 18, 18, 18, 14, 12, 14, 14, 18, 10, 10];
    
    //     doc.setFontSize(16);
    //     doc.setFont('helvetica', 'normal');
    //     const title = "GST Report";
    //     const pageWidth = doc.internal.pageSize.getWidth();
    //     const textWidth = doc.getTextWidth(title);
    //     const textX = (pageWidth - textWidth) / 2;
    //     doc.text(title, textX, 10);
    
    //     doc.autoTable({
    //         head: [tableColumn],
    //         body: tableRows,
    //         startY: 20,
    //         columnStyles: Object.fromEntries(
    //             columnWidths.map((width, index) => [index, { cellWidth: width }])
    //         ),
    //         headStyles: {
    //             fontSize: fontdata,
    //             cellPadding: 1.5,
    //             minCellHeight: 8,
    //             valign: 'middle',
    //             font: 'helvetica',
    //             cellWidth: 'wrap'
    //         },
    //         bodyStyles: {
    //             fontSize: fontdata,
    //             valign: 'middle',
    //             cellWidth: 'auto',
    //             overflow: 'linebreak',
    //             cellPadding:2
    //         },
    //         margin: { left: 7, right: 5 },
    //         willDrawCell: function (data) {
    //             if (data.row.index === tableRows.length - 1) {
    //                 const { cell } = data;
    //                 const { x, y, width, height } = cell;
    
    //                 doc.setFont('helvetica', 'bold');
    //                 doc.setFontSize(9);
    //                 doc.setDrawColor(0);
    //                 doc.setLineWidth(0.5);
    //                 doc.line(x, y, x + width, y); // top
    //                 doc.line(x, y + height, x + width, y + height); // bottom
    //             }
    //         }
    //     });
    
    //     doc.save('gst_report.pdf');
    // };    

    // const handleShowAll = async () => {
    //     if (
    //         !gstReport.customer ||
    //         gstReport.customer === undefined
    //     ) {

    //         setError(true)
    //         setErrorMessage('Please Enter the Customer.')
    //         return
    //     }

    //     try {
    //         const response = await axios.get(`${apiUrl}/getAllStateBilledDetails`, {
    //             params: gstReport
    //         });
    //         const { allTripDetails, tripsheetResults } = response.data;

    //         if (allTripDetails.length === 0) {
    //             setError(true)
    //             setErrorMessage("No Data Found")
    //             setRows([])
    //             setTaxReport({
    //                 TaxableValue: "",
    //                 cgst: "",
    //                 sgst: "",
    //                 igst: "",
    //                 totalGST: "",
    //                 totalAmount: ""
    //             })
    //             return
    //         }
    //         const updatedTripsheetResults = tripsheetResults.map(trip => {
    //             const tripDetails = allTripDetails.find(detail => detail.tripId === String(trip.tripid));

    //             if (tripDetails) {
    //                 return {
    //                     ...trip,
    //                     invoiceNo: tripDetails.invoiceNo,
    //                     invoiceDate: dayjs(tripDetails.invoiceDate).format('DD-MM-YYYY'),
    //                 };
    //             }

    //             return trip;
    //         });
    //         // console.log(updatedTripsheetResults, "invoicedateresults");

    //         // Initialize totals
    //         let totalCGST = 0;
    //         let totalSGST = 0;
    //         let totalIGST = 0;
    //         let totalGST = 0;
    //         let totalAmount = 0;
    //         let totalCGSTAmount = 0;
    //         let totalIGSTAmount = 0;
    //         let cgstTax = customerData[0]?.gstTax / 2;
    //         let igstTax = customerData[0]?.gstTax

    //         const FinalTripsheetResults = updatedTripsheetResults.map((item, index) => {
    //             const billdate = item.invoiceDate;
    //             // const customerDetails = item.customer;
    //             const gstTax = customerData[0]?.gstTax || 0;
    //             const totalcalcAmount = item.totalcalcAmount || 0;
    //             const cgst = customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? Math.round((cgstTax * totalcalcAmount) / 100) || 0 : 0
    //             const igst = customerData[0]?.state !== stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? Math.round((igstTax * totalcalcAmount) / 100) || 0 : 0
    //             const sgst = cgst;

    //             // Update totals
    //             totalCGST += cgst;
    //             totalSGST += sgst;
    //             totalIGST += igst;
    //             totalAmount += totalcalcAmount;
    //             totalGST += customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? cgst + sgst : igst;
    //             totalCGSTAmount += totalcalcAmount + cgst + sgst;
    //             totalIGSTAmount += totalcalcAmount + igst;
    //             const billedAmount = customerData[0]?.state === stationData[0]?.state
    //                 ? Math.round(totalcalcAmount + cgst + sgst)
    //                 : Math.round(totalcalcAmount + igst);

    //             return {
    //                 ...item,
    //                 id: index + 1,
    //                 billdate: billdate,
    //                 tripsheetdate: dayjs(item.tripsheetdate),
    //                 // billed: "Yes",
    //                 billed: billedAmount,
    //                 gstNumber: customerData[0]?.gstnumber || '',
    //                 gstTax: Math.round(gstTax),
    //                 cgst: cgst,
    //                 sgst: sgst,
    //                 igst: igst,

    //             };
    //         });
    //         setRows(FinalTripsheetResults)
    //         setSuccess(true)
    //         setSuccessMessage('Successfully Listed')
    //         setTaxReport({
    //             TaxableValue: Math.round(totalAmount),
    //             cgst: Math.round(totalCGST),
    //             sgst: Math.round(totalSGST),
    //             igst: Math.round(totalIGST),
    //             totalGST: Math.round(totalGST),
    //             totalAmount: customerData[0]?.state === stationData[0]?.state ? Math.round(totalCGSTAmount) : Math.round(totalIGSTAmount)
    //         });

    //         // const { tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults } = response.data;
    //         // console.log(tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults, "gstresponse");
    //         // // Combine coveringBilledResults and transferBilledResults into a single array
    //         // const combinedData = [
    //         //     ...coveringBilledResults.map(item => ({
    //         //         billdate: dayjs(item.InvoiceDate).format('YYYY-MM-DD'),
    //         //         customer: item.Customer,
    //         //     })),
    //         //     ...transferBilledResults.map(item => ({
    //         //         billdate: dayjs(item.Billdate).format('YYYY-MM-DD'),
    //         //         customer: item.Organization_name,
    //         //     })),
    //         //     ...individualBilledResults.map(item => ({
    //         //         billdate: dayjs(item.Bill_Date).format('YYYY-MM-DD'),
    //         //         customer: item.Customer,
    //         //     }))
    //         // ];

    //         // // Create a map from combinedData for easy lookup
    //         // const billDateMap = combinedData.reduce((map, item) => {
    //         //     map[item.customer] = item.billdate;
    //         //     return map;
    //         // }, {});

    //         // // Create a map from customerResults for easy lookup
    //         // const customerMap = customerResults.reduce((map, item) => {
    //         //     map[item.customer] = {
    //         //         gstNumber: item.gstnumber,
    //         //         gstTax: item.gstTax
    //         //     };
    //         //     return map;
    //         // }, {});

    //         // // Initialize totals
    //         // let totalCGST = 0;
    //         // let totalSGST = 0;
    //         // let totalGST = 0;
    //         // let totalAmount = 0;

    //         // // Update tripsheetResults with the billdate and GST details from maps
    //         // const updatedTripsheetResults = tripsheetResults.map((item, index) => {
    //         //     const billdate = billDateMap[item.customer] || billDateMap[item.Organization_name] || null;
    //         //     const customerDetails = customerMap[item.customer] || {};
    //         //     const gstTax = customerDetails.gstTax || 0;
    //         //     let cgstTax = gstTax / 2;
    //         //     const totalcalcAmount = item.totalcalcAmount || 0;
    //         //     const cgst = Math.round((cgstTax * totalcalcAmount) / 100);
    //         //     const sgst = cgst;
    //         //     console.log(cgst, 'gggg', cgstTax);

    //         //     // Update totals
    //         //     totalCGST += cgst;
    //         //     totalSGST += sgst;
    //         //     totalGST += cgst + sgst;
    //         //     totalAmount += totalcalcAmount + cgst + sgst;

    //         //     return {
    //         //         ...item,
    //         //         id: index + 1,
    //         //         billdate: billdate,
    //         //         tripsheetdate: dayjs(item.tripsheetdate),
    //         //         billed: "Yes",
    //         //         gstNumber: customerDetails.gstNumber || '',
    //         //         gstTax: Math.round(gstTax),
    //         //         cgst: cgst,
    //         //         sgst: sgst,
    //         //         igst: 0
    //         //     };
    //         // });
    //         // console.log(updatedTripsheetResults, 'updatetrip');

    //         // // Set rows and tax report state
    //         // setRows(updatedTripsheetResults);
    //         // setSuccess(true)
    //         // setSuccessMessage('Successfully Listed')
    //         // setTaxReport({
    //         //     TaxableValue: Math.round(totalAmount - totalGST),
    //         //     cgst: Math.round(totalCGST),
    //         //     sgst: Math.round(totalSGST),
    //         //     igst: 0,
    //         //     totalGST: Math.round(totalGST),
    //         //     totalAmount: Math.round(totalAmount)
    //         // });

    //     }
    //     //  catch (error) {
    //     // console.error('Error fetching data:', error);
    //     // }
    //     catch (error) {
    //         // console.error("Error occurredddddd:", error);

    //         // Check if there's no response, indicating a network error

    //         if (error.message) {
    //             setError(true);
    //             setErrorMessage("Check your internet connection");
    //             // console.log('Network error');
    //         } else if (error.response) {
    //             setError(true);
    //             // Handle other Axios errors (like 4xx or 5xx responses)
    //             setErrorMessage("Failed to Show : " + (error.response.data.message || error.message));
    //         } else {
    //             // Fallback for other errors
    //             setError(true);
    //             setErrorMessage("An unexpected error occurred: " + error.message);
    //         }
    //     }

    // }

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
            const response = await axios.get(`${apiUrl}/getFromToBetweenParticularStateBilledDetails`, {
                params: gstReport
            });

            // console.log(response.data, 'gstreportdata');
            const { combinedResults, allTripDetails, tripsheetResults } = response.data;

            // const tollCalculationAmount = Object.values(
            //     tripsheetResults.reduce((acc, trip) => {
            //         const groupId = trip.groupid;
            //         const toll = parseFloat(trip.toll) || 0; // Convert toll to number (handle empty string)
            //         // const toll = (parseFloat(trip.toll) + parseFloat(trip.parking) + parseFloat(trip.permit)) || 0; // Convert toll to number (handle empty string)
            //         const permit = parseFloat(trip.permit) || 0;
            //         const parking = parseFloat(trip.parking) || 0;
            //         if (!acc[groupId]) {
            //             acc[groupId] = {
            //                 groupid: groupId,
            //                 totalToll: 0, // Initialize total toll
            //             };
            //         }

            //         acc[groupId].totalToll += toll; // Sum the toll amounts
            //         return acc;
            //     }, {})
            // );

const tollCalculationAmount = Object.values(
  tripsheetResults.reduce((acc, trip) => {
    const groupId = trip.groupid;
    const toll = parseFloat(trip.toll) || 0;
    const permit = parseFloat(trip.permit) || 0;
    const parking = parseFloat(trip.parking) || 0;

    const total = toll + parking + permit;

    if (!acc[groupId]) {
      acc[groupId] = {
        groupid: groupId,
        totalToll: 0,
      };
    }

    acc[groupId].totalToll += total;
    return acc;
  }, {})
);



            const billedgstReportDats = [
                ...combinedResults.transferListResults,
                ...combinedResults.groupBillingResults,
                ...combinedResults.individualBillingResults
            ]
                .filter(li => li.Invoice_no !== null && li.Invoice_no !== "")
                .map((item, index) => ({ ...item, id: index + 1 }));


            // const totalTollAmount = tripsheetResults.reduce((sum, li) => {
            //     return sum + (li.toll ? parseFloat(li.toll) : 0);
            // }, 0);

            const updatedBilledGstReportData = billedgstReportDats.map((bill) => {
                const matchingToll = tollCalculationAmount.find(
                    (toll) => toll.groupid === bill.Grouptrip_id
                );

                return {
                    ...bill,
                    totalToll: matchingToll ? matchingToll.totalToll : 0, // If no match, set to 0
                };
            });


            const updatedBilledgstReportDats = updatedBilledGstReportData.map(bill => {
                const matchingCustomer = customerData.find(customer => customer.customer === bill.Organization_name);

                if (matchingCustomer) {
                    return {
                        ...bill, // Spread the existing bill object
                        gstTax: matchingCustomer.gstTax, // Add gstTax
                        gstnumber: matchingCustomer.gstnumber // Add gstnumber
                    };
                }

                return bill;
            });



            // setRows(updatedBilledgstReportDats);


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

            // const updatedTripsheetResults = tripsheetResults.map(trip => {
            //     const tripDetails = allTripDetails.find(detail => detail.tripId === String(trip.tripid));
            //     // setGstReportDatas(tripDetails)
            //     if (tripDetails) {
            //         return {
            //             ...trip,
            //             invoiceNo: tripDetails.invoiceNo,
            //             invoiceDate: tripDetails.invoiceDate,
            //         };
            //     }

            //     return trip;
            // });


            // Initialize totals
            let totalCGST = 0;
            let totalSGST = 0;
            let totalIGST = 0;
            let totalGST = 0;
            let totalAmount = 0;
            let totalCGSTAmount = 0;
            let totalIGSTAmount = 0;
            // let cgstTax = customerData[0]?.gstTax / 2;
            // let igstTax = customerData[0]?.gstTax


            const FinalGstReportResults = updatedBilledgstReportDats.map((item, index) => {
                // Find the matching customer and station for the current bill
                const customer = customerData.find(c => c.customer === item.Organization_name); // or any other matching key
                const station = stationData.find(s => s.state === customer?.state); // matching station based on state, adjust as needed

                if (!customer || !station) {
                    return { ...item, id: index + 1, billed: 0, gstTax: 0, cgst: 0, sgst: 0, igst: 0 }; // return default if no match found
                }

                // Calculate taxes
                const cgstTax = customer.gstTax / 2;
                const igstTax = customer.gstTax;
                const billdate = dayjs(item.invoiceDate).format('DD-MM-YYYY');
                const gstTax = customer.gstTax || 0;
                const totalcalcAmount = parseInt(item.Amount || 0);

                const withoutTollCalc = parseInt(item.Amount || 0) - item.totalToll;

                const cgst = customer.state === station.state && customer.gstTax !== 0 && customer.gstTax !== undefined
                    ? Math.round((cgstTax * withoutTollCalc) / 100) || 0
                    : 0;
                const igst = customer.state !== station.state && customer.gstTax !== 0 && customer.gstTax !== null
                    ? Math.round((igstTax * withoutTollCalc) / 100) || 0
                    : 0;
                const sgst = cgst;

                // ✅ Correcting totalAmount accumulation
                totalAmount += withoutTollCalc;


                // Update totals
                totalCGST += cgst;
                totalSGST += sgst;
                totalIGST += igst;
                totalGST += customer.state === station.state ? cgst + sgst : igst;
                totalCGSTAmount += totalcalcAmount + cgst + sgst - item.totalToll;
                totalIGSTAmount += totalcalcAmount + igst - item.totalToll;

                const billedAmount = customer.state === station.state
                    ? Math.round(totalcalcAmount + cgst + sgst)
                    : Math.round(totalcalcAmount + igst);

                return {
                    ...item,
                    id: index + 1,
                    billdate: billdate,
                    tripsheetdate: dayjs(item.tripsheetdate),
                    billed: billedAmount,
                    gstNumber: customer.gstnumber || '',
                    gstTax: Math.round(gstTax),
                    cgst: cgst,
                    sgst: sgst,
                    igst: igst,
                    GrossAmount: totalcalcAmount - item.totalToll,
                };
            });


            setTaxReport({
                TaxableValue: totalAmount,
                cgst: Math.round(totalCGST),
                sgst: Math.round(totalSGST),
                igst: Math.round(totalIGST),
                totalGST: Math.round(totalGST),
                totalAmount: customerData[0]?.state === stationData[0]?.state ? Math.round(totalCGSTAmount) : Math.round(totalIGSTAmount)
            });

            setRows(FinalGstReportResults)
            

            // const FinalTripsheetResults = updatedTripsheetResults.map((item, index) => {
            //     // const billdate = item.invoiceDate;
            //     const billdate = dayjs(item.invoiceDate).format('DD-MM-YYYY');
            //     const customerDetails = item.customer;
            //     const gstTax = customerData[0]?.gstTax || 0;
            //     const totalcalcAmount = item.totalcalcAmount || 0;
            //     const cgst = customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? Math.round((cgstTax * totalcalcAmount) / 100) || 0 : 0
            //     const igst = customerData[0]?.state !== stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? Math.round((igstTax * totalcalcAmount) / 100) || 0 : 0
            //     const sgst = cgst;

            //     // Update totals
            //     totalCGST += cgst;
            //     totalSGST += sgst;
            //     totalIGST += igst;
            //     totalAmount += totalcalcAmount;
            //     totalGST += customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? cgst + sgst : igst;
            //     totalCGSTAmount += totalcalcAmount + cgst + sgst;
            //     totalIGSTAmount += totalcalcAmount + igst;

            //     const billedAmount = customerData[0]?.state === stationData[0]?.state
            //         ? Math.round(totalcalcAmount + cgst + sgst)
            //         : Math.round(totalcalcAmount + igst);

            //     return {
            //         ...item,
            //         id: index + 1,
            //         billdate: billdate,
            //         tripsheetdate: dayjs(item.tripsheetdate),
            //         // billed: "Yes",
            //         billed: billedAmount,
            //         gstNumber: customerData[0]?.gstnumber || '',
            //         gstTax: Math.round(gstTax),
            //         cgst: cgst,
            //         sgst: sgst,
            //         igst: igst
            //     };
            // });
            // setRows(FinalTripsheetResults)

            setSuccess(true)
            setSuccessMessage('Successfully Listed')



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
                console.log(error, "errororrrrrrrrrrrrrrrr");

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



    // const handleShow = async () => {
    //     if (
    //         !gstReport.customer ||
    //         gstReport.customer === undefined
    //     ) {
    //         setError(true)
    //         setErrorMessage('Please Enter Customer.')
    //         return
    //     }
    //     if (

    //         !gstReport.department ||
    //         gstReport.department === undefined

    //     ) {

    //         setError(true)
    //         setErrorMessage('Please Enter Department.')
    //         return
    //     }

    //     try {
    //         const response = await axios.get(`${apiUrl}/getParticularStateBilledDetails`, {
    //             params: gstReport
    //         });

    //         console.log(response.data, 'gstreportdata');
    //         const { combinedResults, allTripDetails, tripsheetResults } = response.data;

    //         if (allTripDetails.length === 0) {
    //             setError(true)
    //             setErrorMessage("No Data Found")
    //             setRows([])
    //             setTaxReport({
    //                 TaxableValue: "",
    //                 cgst: "",
    //                 sgst: "",
    //                 igst: "",
    //                 totalGST: "",
    //                 totalAmount: ""
    //             })
    //             return
    //         }

    //         const updatedTripsheetResults = tripsheetResults.map(trip => {
    //             const tripDetails = allTripDetails.find(detail => detail.tripId === String(trip.tripid));

    //             if (tripDetails) {
    //                 return {
    //                     ...trip,
    //                     invoiceNo: tripDetails.invoiceNo,
    //                     invoiceDate: tripDetails.invoiceDate,
    //                 };
    //             }

    //             return trip;
    //         });


    //         // Initialize totals
    //         let totalCGST = 0;
    //         let totalSGST = 0;
    //         let totalIGST = 0;
    //         let totalGST = 0;
    //         let totalAmount = 0;
    //         let totalCGSTAmount = 0;
    //         let totalIGSTAmount = 0;
    //         let cgstTax = customerData[0]?.gstTax / 2;
    //         let igstTax = customerData[0]?.gstTax

    //         const FinalTripsheetResults = updatedTripsheetResults.map((item, index) => {
    //             // const billdate = item.invoiceDate;
    //             const billdate = dayjs(item.invoiceDate).format('DD-MM-YYYY'); 
    //             const customerDetails = item.customer;
    //             const gstTax = customerData[0]?.gstTax || 0;
    //             const totalcalcAmount = item.totalcalcAmount || 0;
    //             const cgst = customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? Math.round((cgstTax * totalcalcAmount) / 100) || 0 : 0
    //             const igst = customerData[0]?.state !== stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== null ? Math.round((igstTax * totalcalcAmount) / 100) || 0 : 0
    //             const sgst = cgst;

    //             // Update totals
    //             totalCGST += cgst;
    //             totalSGST += sgst;
    //             totalIGST += igst;
    //             totalAmount += totalcalcAmount;
    //             totalGST += customerData[0]?.state === stationData[0]?.state && customerData[0]?.gstTax !== 0 && customerData[0]?.gstTax !== undefined ? cgst + sgst : igst;
    //             totalCGSTAmount += totalcalcAmount + cgst + sgst;
    //             totalIGSTAmount += totalcalcAmount + igst;

    //             const billedAmount = customerData[0]?.state === stationData[0]?.state 
    //             ? Math.round(totalcalcAmount + cgst + sgst) 
    //             : Math.round(totalcalcAmount + igst);

    //             return {
    //                 ...item,
    //                 id: index + 1,
    //                 billdate: billdate,
    //                 tripsheetdate: dayjs(item.tripsheetdate),
    //                 // billed: "Yes",
    //                 billed:billedAmount,
    //                 gstNumber: customerData[0]?.gstnumber || '',
    //                 gstTax: Math.round(gstTax),
    //                 cgst: cgst,
    //                 sgst: sgst,
    //                 igst: igst
    //             };
    //         });
    //         setRows(FinalTripsheetResults)
    //         setSuccess(true)
    //         setSuccessMessage('Successfully Listed')
    //         setTaxReport({
    //             TaxableValue: Math.round(totalAmount),
    //             cgst: Math.round(totalCGST),
    //             sgst: Math.round(totalSGST),
    //             igst: Math.round(totalIGST),
    //             totalGST: Math.round(totalGST),
    //             totalAmount: customerData[0]?.state === stationData[0]?.state ? Math.round(totalCGSTAmount) : Math.round(totalIGSTAmount)
    //         });


    //         //     const { tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults } = response.data;
    //         //     if (tripsheetResults.length === 0) {
    //         //         setError(true)
    //         //         setErrorMessage('No Data Found')
    //         //         return
    //         //     }

    //         //     // Combine coveringBilledResults and transferBilledResults into a single array
    //         //     const combinedData = [
    //         //         ...coveringBilledResults.map(item => ({
    //         //             billdate: dayjs(item.InvoiceDate).format('DD-MM-YYYY'),
    //         //             customer: item.Customer,
    //         //         })),
    //         //         ...transferBilledResults.map(item => ({
    //         //             billdate: dayjs(item.Billdate).format('DD-MM-YYYY'),
    //         //             customer: item.Organization_name,
    //         //         })),
    //         //         ...individualBilledResults.map(item => ({
    //         //             billdate: dayjs(item.Bill_Date).format('DD-MM-YYYY'),
    //         //             customer: item.Customer,
    //         //         }))
    //         //     ];

    //         //     // Create a map from combinedData for easy lookup
    //         //     const billDateMap = combinedData.reduce((map, item) => {
    //         //         map[item.customer] = item.billdate;
    //         //         return map;
    //         //     }, {});
    //         //   console.log(billDateMap,'bbbbbbbbb');

    //         //     // Create a map from customerResults for easy lookup
    //         //     const customerMap = customerResults.reduce((map, item) => {
    //         //         map[item.customer] = {
    //         //             gstNumber: item.gstnumber,
    //         //             gstTax: item.gstTax
    //         //         };
    //         //         return map;
    //         //     }, {});

    //         //     // Initialize totals
    //         //     let totalCGST = 0;
    //         //     let totalSGST = 0;
    //         //     let totalGST = 0;
    //         //     let totalAmount = 0;

    //         //     // Update tripsheetResults with the billdate and GST details from maps
    //         //     const updatedTripsheetResults = tripsheetResults.map((item, index) => {
    //         //         const billdate = billDateMap[item.customer] || billDateMap[item.Organization_name] || null;
    //         //         const customerDetails = customerMap[item.customer] || {};
    //         //         const gstTax = customerDetails.gstTax || 0;
    //         //         const totalcalcAmount = item.totalcalcAmount || 0;
    //         //         const cgst = Math.round((gstTax * totalcalcAmount) / 100);
    //         //         const sgst = cgst;

    //         //         // Update totals
    //         //         totalCGST += cgst;
    //         //         totalSGST += sgst;
    //         //         totalGST += cgst + sgst;
    //         //         totalAmount += totalcalcAmount + cgst + sgst;
    //         //         console.log(billdate,'bbbb6666');

    //         //         return {
    //         //             ...item,
    //         //             id: index + 1,
    //         //             billdate: billdate,
    //         //             tripsheetdate: dayjs(item.tripsheetdate),
    //         //             billed: "Yes",
    //         //             gstNumber: customerDetails.gstNumber || '',
    //         //             gstTax: Math.round(gstTax),
    //         //             cgst: cgst,
    //         //             sgst: sgst,
    //         //             igst: 0
    //         //         };
    //         //     });
    //         //     // Set rows and tax report state
    //         //     console.log(updatedTripsheetResults,'updatetrip');
    //         //     setRows(updatedTripsheetResults);
    //         //     setSuccess(true)
    //         //     setSuccessMessage('Successfully Listed')
    //         //     setTaxReport({
    //         //         TaxableValue: Math.round(totalAmount - totalGST),
    //         //         cgst: Math.round(totalCGST),
    //         //         sgst: Math.round(totalSGST),
    //         //         igst: 0,
    //         //         totalGST: Math.round(totalGST),
    //         //         totalAmount: Math.round(totalAmount)
    //         //     });

    //     }
    //     //  catch (error) {
    //     //     console.error('Error fetching data:', error);
    //     // }
    //     catch (error) {
    //         // console.error("Error occurredddddd:", error);

    //         // Check if there's no response, indicating a network error
    //         if (error.message) {
    //             setError(true);
    //             setErrorMessage("Check your internet connection");
    //             // console.log('Network error');
    //         } else if (error.response) {
    //             setError(true);
    //             // Handle other Axios errors (like 4xx or 5xx responses)
    //             setErrorMessage("Failed to Show: " + (error.response.data.message || error.message));
    //         } else {
    //             // Fallback for other errors
    //             setError(true);
    //             setErrorMessage("An unexpected error occurred: " + error.message);
    //         }
    //     }
    // };
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
        // handleShowAll,
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
