import { useState, useEffect} from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";
import Excel from 'exceljs';

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "tripid", headerName: "TripNo", width: 130 },
    { field: "tripsheetdate", headerName: "Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD-MM-YYYY'), },
    { field: "customer", header: "Customer Name", width: 150 },
    { field: "travelsname", headerName: "Vendor Name", width: 130 },
    { field: "vendor_vehicle", headerName: "Vehicle", width: 90 },
    { field: "duty", headerName: "Duty", width: 160 },
    { field: "vendorshedoutkm", headerName: "Start-kMS", width: 130 },
    { field: "vendorshedinkm", headerName: "Close-kMS", width: 130 },
    { field: "vendortotalkm", headerName: "Total-kMS", width: 130 },
    { field: "vendorreporttime", headerName: "Start-Time", width: 130 },
    { field: "vendorshedintime", headerName: "Close-Time", width: 130 },
    { field: "vendortotaldays", headerName: "Total-Days", width: 130 },
    { field: "vendorTotaltime", headerName: "Run-Hours", width: 130 },
    { field: "vpermettovendor", headerName: "Vehicle-Permit", width: 130 },
    { field: "vendortoll", headerName: "Vehicle-Toll", width: 130 },
    { field: "vendorparking", headerName: "Vehicle-Parking", width: 130 },
    { field: "Vendor_BataTotalAmount", headerName: "Bata", width: 90 },
    // { field: "totalvendoramount", headerName: "Total Amount", width: 130 },
    // { field: "fuelamount", headerName: "Fuelamount", width: 130 },
    // { field: "advancepaidtovendor", headerName: "Driver Advance", width: 130 },
    // { field: "Vendor_FULLTotalAmount", headerName: "Balance", width: 130 },
    { field: "grandtotal", headerName: "Total Amount", width: 130 },
    { field: "totalfuelamount", headerName: "Fuel Amount", width: 130 },
    { field: "totalvendoramount", headerName: "Driver Advance", width: 130 },
    { field: "Vendor_FULLTotalAmount", headerName: "Balance", width: 130 },
   
];

const useVehiclestatement = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [rows, setRows] = useState([]);
    const [travelsname, setTravelsname] = useState("");
    const [fromDate, setFromDate] = useState(dayjs());
    const [toDate, setToDate] = useState(dayjs());
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage,setWarningMessage] = useState({});
    const [infoMessage] = useState({});
    const [fullamountdata, setVendorfullamount] = useState(0)

    const [accountinfodata, setAccountInfoData] = useState([])

    //----popup------------------------

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };
    useEffect(() => {
        if (error || success || warning || info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success, warning, info]);



    // const handleExcelDownload = async () => {
    //     const workbook = new Excel.Workbook();
    //     const workSheetName = 'Worksheet-1';


    //     try {

    //         const fileName = "VendorStatement Reports"
    //         const worksheet = workbook.addWorksheet(workSheetName);
    //         const columns1 = columns.map(({ field, headerName, ...rest }) => ({
    //             key: field,
    //             header: headerName,
    //             ...rest
    //         }));

    //         worksheet.columns = columns1;


    //         // updated the font for first row.
    //         worksheet.getRow(1).font = { bold: true };

    //         // Set background color for header cells
    //         worksheet.getRow(1).eachCell((cell, colNumber) => {
    //             cell.fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: '9BB0C1' } // Green background color
    //             };
    //         });


    //         worksheet.getRow(1).height = 30;
    //         // loop through all of the columns and set the alignment with width.
    //         worksheet.columns.forEach((column) => {
    //             column.width = column.header.length + 5;
    //             column.alignment = { horizontal: 'center', vertical: 'middle' };
    //         });

    //         rows.forEach((singleData, index) => {
    //             console.log(rows,'datad of venode')

    //             singleData["balance"] = singleData["Vendor_FULLTotalAmount"]
    //             worksheet.addRow(singleData);

    //             // Adjust column width based on the length of the cell values in the added row
    //             worksheet.columns.forEach((column) => {
    //                 const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
    //                 const cellLength = cellValue.toString().length; // Get length of cell value as a string
    //                 const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

    //                 // Set column width to the maximum of current width and cell length plus extra space
    //                 column.width = Math.max(currentColumnWidth, cellLength + 5);
    //             });
    //         });
    //         const totalKms = rows.reduce((sum, row) => sum + parseInt(row.vendortotalkm || 0, 10), 0);
    //         const totalpermit = rows.reduce((sum, row) => sum + parseInt(row.vpermettovendor || 0, 10), 0);
    //         const totaltoll = rows.reduce((sum, row) => sum + parseInt(row.vendortoll || 0, 10), 0);
    //         const totalfullAmount = rows.reduce((sum, row) => sum + parseInt(row.totalvendoramount || 0, 10), 0);
    //         const advancedvendor = rows.reduce((sum, row) => sum + parseInt(row.advancepaidtovendor || 0, 10), 0);
    //         const balancefull = rows.reduce((sum, row) => sum + parseInt(row.Vendor_FULLTotalAmount || 0, 10), 0);
    //         const bataamount = rows.reduce((sum, row) => sum + parseInt(row.Vendor_BataTotalAmount || 0, 10), 0);
    //         // Add the total row
    //         const totalRow = worksheet.addRow({});
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Vendor Name') + 1).value = 'TOTAL';
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Total-kMS') + 1).value = totalKms;
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle-Permit') + 1).value = totalpermit;
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle-Toll') + 1).value = totaltoll;
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Total Amount') + 1).value = totalfullAmount;
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Driver Advance') + 1).value = advancedvendor;
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Balance') + 1).value = balancefull;
    //         totalRow.getCell(columns1.findIndex(col => col.header === 'Bata') + 1).value = bataamount;
           

    //         totalRow.eachCell((cell) => {
    //             cell.font = { bold: true };
    //             cell.alignment = { horizontal: 'center', vertical: 'middle' };
    //             cell.border = {
    //                 top: { style: 'thin' },
    //                 left: { style: 'thin' },
    //                 bottom: { style: 'thin' },
    //                 right: { style: 'thin' },
    //             };
    //         });

    //         // loop through all of the rows and set the outline style.
    //         worksheet.eachRow({ includeEmpty: false }, (row) => {
    //             // store each cell to currentCell
    //             const currentCell = row._cells;

    //             // loop through currentCell to apply border only for the non-empty cell of excel
    //             currentCell.forEach((singleCell) => {

    //                 const cellAddress = singleCell._address;

    //                 // apply border
    //                 worksheet.getCell(cellAddress).border = {
    //                     top: { style: 'thin' },
    //                     left: { style: 'thin' },
    //                     bottom: { style: 'thin' },
    //                     right: { style: 'thin' },
    //                 };
    //             });
    //         });


    //         // write the content using writeBuffer
    //         const buf = await workbook.xlsx.writeBuffer();

    //         // download the processed file
    //         saveAs(new Blob([buf]), `${fileName}.xlsx`);
    //     } catch (error) {
    //         console.error('Something Went Wrong', error.message);
    //     } finally {
    //         // removing worksheet's instance to create new one
    //         workbook.removeWorksheet(workSheetName);
    //     }

    // }


const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';

    try {
        const fileName = "VendorStatement Reports";
        const worksheet = workbook.addWorksheet(workSheetName);
        const columns1 = columns.map(({ field, headerName, ...rest }) => ({
            key: field,
            header: headerName,
            ...rest
        }));

        worksheet.columns = columns1;

        // updated the font for first row.
        worksheet.getRow(1).font = { bold: true };

        // Set background color for header cells
        worksheet.getRow(1).eachCell((cell, colNumber) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '9BB0C1' }
            };
        });

        worksheet.getRow(1).height = 30;

        // loop through all of the columns and set the alignment with width.
        worksheet.columns.forEach((column) => {
            column.width = column.header.length + 5;
            column.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // rows.forEach((singleData, index) => {
        //     // Format date fields to 'DD-MM-YYYY' using dayjs
        //     singleData["startdate"] = dayjs(singleData["startdate"]).format('DD-MM-YYYY');
        //     singleData["shedInDate"] = dayjs(singleData["shedInDate"]).format('DD-MM-YYYY');
        //     singleData["shedOutDate"] = dayjs(singleData["shedOutDate"]).format('DD-MM-YYYY');
        //     singleData["vendorshedInDate"] = dayjs(singleData["vendorshedInDate"]).format('DD-MM-YYYY');
        //     singleData["vendorshedOutDate"] = dayjs(singleData["vendorshedOutDate"]).format('DD-MM-YYYY');
        //     singleData["tripsheetdate"] = dayjs(singleData["tripsheetdate"]).format('DD-MM-YYYY');
            
        //     worksheet.addRow(singleData);

        //     // Adjust column width based on the length of the cell values in the added row
        //     worksheet.columns.forEach((column) => {
        //         const cellValue = singleData[column.key] || '';
        //         const cellLength = cellValue.toString().length;
        //         const currentColumnWidth = column.width || 0;

        //         column.width = Math.max(currentColumnWidth, cellLength + 5);
        //     });
        // });
        rows.forEach((singleData, index) => {

            console.log(rows,'data of roe')
            const dateFields = [
                "startdate",
                "shedInDate",
                "shedOutDate",
                "vendorshedInDate",
                "vendorshedOutDate",
                "tripsheetdate"
            ];
        
            dateFields.forEach(field => {
                const dateValue = singleData[field];
                // Check if date is valid using dayjs().isValid()
                if (dateValue && dayjs(dateValue).isValid()) {
                    singleData[field] = dayjs(dateValue).format('DD-MM-YYYY'); // Format valid dates
                } else {
                    singleData[field] = ''; // Set empty string if the date is invalid
                }
            });
        
            worksheet.addRow(singleData);
        
            // Adjust column width based on the length of the cell values in the added row
            worksheet.columns.forEach((column) => {
                const cellValue = singleData[column.key] || '';
                const cellLength = cellValue.toString().length;
                const currentColumnWidth = column.width || 0;
        
                column.width = Math.max(currentColumnWidth, cellLength + 5);
            });
        });
        
        const totalKms = rows.reduce((sum, row) => sum + parseInt(row.vendortotalkm || 0, 10), 0);
                const totalpermit = rows.reduce((sum, row) => sum + parseInt(row.vpermettovendor || 0, 10), 0);
                const totaltoll = rows.reduce((sum, row) => sum + parseInt(row.vendortoll || 0, 10), 0);
                const totalparking = rows.reduce((sum, row) => sum + parseInt(row.vendorparking || 0, 10), 0);
                const bataamount = rows.reduce((sum, row) => sum + parseInt(row.Vendor_BataTotalAmount || 0, 10), 0);
            
                // const totalfullAmount = rows.reduce((sum, row) => sum + parseInt(row.totalvendoramount || 0, 10), 0);
                // const advancedvendor = rows.reduce((sum, row) => sum + parseInt(row.advancepaidtovendor || 0, 10), 0);
                // const balancefull = rows.reduce((sum, row) => sum + parseInt(row.Vendor_FULLTotalAmount || 0, 10), 0);
                const totalfullAmount = rows.reduce((sum, row) => sum + parseInt(row.grandtotal || 0, 10), 0);
                const advancedvendor = rows.reduce((sum, row) => sum + parseInt(row.totalvendoramount || 0, 10), 0);
                const fuelamountvendor = rows.reduce((sum, row) => sum + parseInt(row.totalfuelamount || 0, 10), 0);
                const balancefull = rows.reduce((sum, row) => sum + parseInt(row.Vendor_FULLTotalAmount || 0, 10), 0);
             
                // Add the total row
                const totalRow = worksheet.addRow({});
                totalRow.getCell(columns1.findIndex(col => col.header === 'Vendor Name') + 1).value = 'TOTAL';
                totalRow.getCell(columns1.findIndex(col => col.header === 'Total-kMS') + 1).value = totalKms;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle-Permit') + 1).value = totalpermit;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle-Toll') + 1).value = totaltoll;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Total Amount') + 1).value = totalfullAmount;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Driver Advance') + 1).value = advancedvendor;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Vehicle-Parking') + 1).value = totalparking;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Fuel Amount') + 1).value = fuelamountvendor;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Balance') + 1).value = balancefull;
                totalRow.getCell(columns1.findIndex(col => col.header === 'Bata') + 1).value = bataamount;
               
    
                totalRow.eachCell((cell) => {
                    cell.font = { bold: true };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
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
    

        // Write the content using writeBuffer
        const buf = await workbook.xlsx.writeBuffer();

        // Download the processed file
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
        console.error('Something Went Wrong', error.message);
    } finally {
        workbook.removeWorksheet(workSheetName);
    }
};


    // const handlePdfDownload = () => {
    //     const pdf = new jsPDF({
    //         orientation: "landscape",
    //         unit: "mm",
    //         format: "tabloid" // [width, height] in inches
    //     });
    //     pdf.setFontSize(15);
    //     pdf.setFont('helvetica', 'normal');
    //     // pdf.text("VehicleStatement", 10, 10);
    //     //  const header = Object.keys(row[0]);
    //     const text = "VendorStatement";

    //     // Get page width
    //     const pageWidth = pdf.internal.pageSize.getWidth();

    //     // Calculate text width
    //     const textWidth = pdf.getTextWidth(text);

    //     // Calculate the x position to center the text
    //     const xPos = (pageWidth - textWidth) / 2;

    //     // Add text to PDF at calculated position
    //     pdf.text(text, xPos, 10);


    //     const header = columns.map(row => row.headerName)
    //     const rowValues = rows.map(row => {
    //         return columns.map(column => row[column.field]);
    //     });
    //    console.log(rows,'rows of pdf')

    //     const totalKms = rows.reduce((sum, row) => sum + parseInt(row.vendortotalkm || 0, 10), 0);
    //     const totalpermit = rows.reduce((sum, row) => sum + parseInt(row.vpermettovendor || 0, 10), 0);
    //     const totaltoll = rows.reduce((sum, row) => sum + parseInt(row.vendortoll || 0, 10), 0);
    //     const totalfullAmount = rows.reduce((sum, row) => sum + parseInt(row.totalvendoramount || 0, 10), 0);
    //     const advancedvendor = rows.reduce((sum, row) => sum + parseInt(row.advancepaidtovendor || 0, 10), 0);
    //     const balancefull = rows.reduce((sum, row) => sum + parseInt(row.Vendor_FULLTotalAmount || 0, 10), 0);
    //     const bataamount = rows.reduce((sum, row) => sum + parseInt(row.Vendor_BataTotalAmount || 0, 10), 0);

        

    //     // Create the total row
    //     const totalRow = columns.map(column => {
    //         if (column.field === 'vendortotalkm') return totalKms;
    //         if (column.field === 'vpermettovendor') return totalpermit;
    //         if (column.field === 'vendortoll') return totaltoll;
    //         if (column.field === 'totalvendoramount') return totalfullAmount;
    //         if (column.field === 'advancepaidtovendor') return advancedvendor;
    //         if (column.field === 'Vendor_FULLTotalAmount') return balancefull;
    //         if (column.field === 'Vendor_BataTotalAmount') return bataamount;
    //         if (column.headerName === 'Vendor Name') return 'Total';
    //         return '';
    //     });
    //     rowValues.push(totalRow);

    //     let fontdata = 1;
    //     if (header.length <= 13) {
    //         fontdata = 16;
    //     }
    //     else if (header.length >= 14 && header.length <= 18) {
    //         fontdata = 11;
    //     }
    //     else if (header.length >= 19 && header.length <= 20) {
    //         fontdata = 10;
    //     } else if (header.length >= 21 && header.length <= 23) {
    //         fontdata = 9;
    //     }
    //     else if (header.length >= 24 && header.length <= 26) {
    //         fontdata = 7;
    //     }
    //     else if (header.length >= 27 && header.length <= 30) {
    //         fontdata = 6;
    //     }
    //     else if (header.length >= 31 && header.length <= 33) {
    //         fontdata = 4;
    //     } else if (header.length >= 34 && header.length <= 35) {
    //         fontdata = 3;
    //     }
    //     else if (header.length >= 36 && header.length <= 40) {
    //         fontdata = 3;
    //     }
    //     else if (header.length >= 41 && header.length <= 46) {
    //         fontdata = 2;
    //     }
    //     else if (header.length >= 47 && header.length <= 50) {
    //         fontdata = 2;
    //     }

    //     pdf.autoTable({
    //         head: [header],
    //         body: rowValues,
    //         startY: 20,

    //         headStyles: {
    //             // fontSize: 5,
    //             fontSize: fontdata,
    //             cellPadding: 1.5, // Decrease padding in header

    //             minCellHeigh: 8,
    //             valign: 'middle',

    //             font: 'helvetica', // Set font type for body

    //             cellWidth: 'wrap',
    //             // cellWidth: 'auto'
    //         },

    //         bodyStyles: {
    //             fontSize: fontdata,
    //             valign: 'middle',
    //             cellWidth: 'auto'
    //             // Adjust the font size for the body

    //         },
    //         willDrawCell: function (data) {
    //             // Check if this cell is part of the total row
    //             if (data.row.index === rowValues.length - 1) {
    //                 const { cell } = data;
    //                 const { x, y, width, height } = cell;
    
    //                 // Set bold text and increased font size
    //                 pdf.setFont('helvetica', 'bold');
    //                 pdf.setFontSize(9); // Increase the font size as needed
    
    //                 // Draw top border
    //                 pdf.setDrawColor(0); // Black color
    //                 pdf.setLineWidth(0.5); // Line width
    //                 pdf.line(x, y, x + width, y); // Draw top border
    
    //                 // Draw bottom border
    //                 pdf.line(x, y + height, x + width, y + height); // Draw bottom border
    //             }},
    //         columnWidth: 'auto'

    //     });
    //     const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;

    //     // Scale content
    //     pdf.scale(scaleFactor, scaleFactor);
    //     const pdfBlob = pdf.output('blob');
    //     saveAs(pdfBlob, 'VendorStatement Reports.pdf');
    // };


// const handlePdfDownload = () => {
//     const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: "tabloid" // [width, height] in inches
//     });
//     pdf.setFontSize(15);
//     pdf.setFont('helvetica', 'normal');
//     const text = "VendorStatement";

//     // Get page width
//     const pageWidth = pdf.internal.pageSize.getWidth();

//     // Calculate text width
//     const textWidth = pdf.getTextWidth(text);

//     // Calculate the x position to center the text
//     const xPos = (pageWidth - textWidth) / 2;

//     // Add text to PDF at calculated position
//     pdf.text(text, xPos, 10);

//     const header = columns.map(row => row.headerName);
    
//     // Format the dates using Day.js and map the rows
//     // const rowValues = rows.map(row => {
        
//     //     return columns.map(column => {
//     //         if (column.field === 'startdate' || column.field === 'shedInDate' || column.field === 'shedOutDate' ||
//     //             column.field === 'vendorshedInDate' || column.field === 'vendorshedOutDate' || column.field === 'tripsheetdate') {
//     //             return dayjs(row[column.field]).format('DD-MM-YYYY'); // Format date fields
//     //         }
//     //         return row[column.field]; // Return other fields unchanged
//     //     });
//     // });
//     const rowValues = rows.map(row => {
//         return columns.map(column => {
//             if (
//                 column.field === 'startdate' || 
//                 column.field === 'shedInDate' || 
//                 column.field === 'shedOutDate' ||
//                 column.field === 'vendorshedInDate' || 
//                 column.field === 'vendorshedOutDate' || 
//                 column.field === 'tripsheetdate'
//             ) {
//                 // Check if the date is null or undefined
//                 const dateValue = row[column.field];
//                 if (!dateValue) {
//                     return ''; // Return empty string if date is null or undefined
//                 }
//                 return dayjs(dateValue).format('DD-MM-YYYY'); // Format date fields
//             }
//             return row[column.field]; // Return other fields unchanged
//         });
//     });
    

//     const totalKms = rows.reduce((sum, row) => sum + parseInt(row.vendortotalkm || 0, 10), 0);
//     const totalpermit = rows.reduce((sum, row) => sum + parseInt(row.vpermettovendor || 0, 10), 0);
//     const totaltoll = rows.reduce((sum, row) => sum + parseInt(row.vendortoll || 0, 10), 0);
//     const totalfullAmount = rows.reduce((sum, row) => sum + parseInt(row.totalvendoramount || 0, 10), 0);
//     const advancedvendor = rows.reduce((sum, row) => sum + parseInt(row.advancepaidtovendor || 0, 10), 0);
//     const balancefull = rows.reduce((sum, row) => sum + parseInt(row.Vendor_FULLTotalAmount || 0, 10), 0);
//     const bataamount = rows.reduce((sum, row) => sum + parseInt(row.Vendor_BataTotalAmount || 0, 10), 0);

//     // Create the total row
//     const totalRow = columns.map(column => {
//         if (column.field === 'vendortotalkm') return totalKms;
//         if (column.field === 'vpermettovendor') return totalpermit;
//         if (column.field === 'vendortoll') return totaltoll;
//         if (column.field === 'totalvendoramount') return totalfullAmount;
//         if (column.field === 'advancepaidtovendor') return advancedvendor;
//         if (column.field === 'Vendor_FULLTotalAmount') return balancefull;
//         if (column.field === 'Vendor_BataTotalAmount') return bataamount;
//         if (column.headerName === 'Vendor Name') return 'Total';
//         return '';
//     });
//     rowValues.push(totalRow);

//     let fontdata = 1;
//     if (header.length <= 13) fontdata = 16;
//     else if (header.length >= 14 && header.length <= 18) fontdata = 11;
//     else if (header.length >= 19 && header.length <= 20) fontdata = 10;
//     else if (header.length >= 21 && header.length <= 23) fontdata = 9;
//     else if (header.length >= 24 && header.length <= 26) fontdata = 7;
//     else if (header.length >= 27 && header.length <= 30) fontdata = 6;
//     else if (header.length >= 31 && header.length <= 33) fontdata = 4;
//     else if (header.length >= 34 && header.length <= 35) fontdata = 3;
//     else if (header.length >= 36 && header.length <= 40) fontdata = 3;
//     else if (header.length >= 41 && header.length <= 46) fontdata = 2;
//     else if (header.length >= 47 && header.length <= 50) fontdata = 2;

//     pdf.autoTable({
//         head: [header],
//         body: rowValues,
//         startY: 20,

//         headStyles: {
//             fontSize: fontdata,
//             cellPadding: 1.5, // Decrease padding in header
//             minCellHeigh: 8,
//             valign: 'middle',
//             font: 'helvetica', // Set font type for body
//             cellWidth: 'wrap',
//         },

//         bodyStyles: {
//             fontSize: fontdata,
//             valign: 'middle',
//             cellWidth: 'auto' // Adjust the font size for the body
//         },
//         willDrawCell: function (data) {
//             if (data.row.index === rowValues.length - 1) {
//                 const { cell } = data;
//                 const { x, y, width, height } = cell;

//                 pdf.setFont('helvetica', 'bold');
//                 pdf.setFontSize(9); // Increase the font size as needed

//                 // Draw top border
//                 pdf.setDrawColor(0); // Black color
//                 pdf.setLineWidth(0.5); // Line width
//                 pdf.line(x, y, x + width, y); // Draw top border

//                 // Draw bottom border
//                 pdf.line(x, y + height, x + width, y + height); // Draw bottom border
//             }
//         },
//         columnWidth: 'auto'
//     });

//     const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;

//     // Scale content
//     pdf.scale(scaleFactor, scaleFactor);
//     const pdfBlob = pdf.output('blob');
//     saveAs(pdfBlob, 'VendorStatement Reports.pdf');
// };


const handlePdfDownload = () => {
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "tabloid" // [width, height] in inches
    });

    pdf.setFontSize(15);
    pdf.setFont('helvetica', 'normal');
    const text = "VendorStatement";

    // Get page width
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Calculate text width
    const textWidth = pdf.getTextWidth(text);

    // Calculate the x position to center the text
    const xPos = (pageWidth - textWidth) / 2;

    // Add text to PDF at calculated position
    pdf.text(text, xPos, 10);

    const header = columns.map(row => row.headerName);

    // Modify the rowValues mapping
    const rowValues = rows.map(row => {
        return columns.map(column => {
            if (
                column.field === 'startdate' || 
                column.field === 'shedInDate' || 
                column.field === 'shedOutDate' ||
                column.field === 'vendorshedInDate' || 
                column.field === 'vendorshedOutDate' || 
                column.field === 'tripsheetdate'
            ) {
                const dateValue = row[column.field];

                // Check for null or undefined or invalid date
                if (!dateValue || dayjs(dateValue).isValid() === false) {
                    return ''; // Return empty string if date is null, undefined, or invalid
                }
                return dayjs(dateValue).format('DD-MM-YYYY'); // Format date fields
            }
            return row[column.field]; // Return other fields unchanged
        });
    });

    // Calculate totals for specific fields
    const totalKms = rows.reduce((sum, row) => sum + parseInt(row.vendortotalkm || 0, 10), 0);
    const totalpermit = rows.reduce((sum, row) => sum + parseInt(row.vpermettovendor || 0, 10), 0);
    const totaltoll = rows.reduce((sum, row) => sum + parseInt(row.vendortoll || 0, 10), 0);
    const totalfullAmount = rows.reduce((sum, row) => sum + parseInt(row.grandtotal || 0, 10), 0);
    const advancedvendor = rows.reduce((sum, row) => sum + parseInt(row.totalvendoramount || 0, 10), 0);
    const fuelamountvendor = rows.reduce((sum, row) => sum + parseInt(row.totalfuelamount || 0, 10), 0);
    const totalparking = rows.reduce((sum, row) => sum + parseInt(row.vendorparking || 0, 10), 0);
    const balancefull = rows.reduce((sum, row) => sum + parseInt(row.Vendor_FULLTotalAmount || 0, 10), 0);
    const bataamount = rows.reduce((sum, row) => sum + parseInt(row.Vendor_BataTotalAmount || 0, 10), 0);



   

    // Create the total row
    const totalRow = columns.map(column => {
        if (column.field === 'vendortotalkm') return totalKms;
        if (column.field === 'vpermettovendor') return totalpermit;
        if (column.field === 'vendortoll') return totaltoll;
        if (column.field === 'vendorparking') return totalparking;
        if (column.field === 'totalfuelamount') return fuelamountvendor;
        if (column.field === 'grandtotal') return totalfullAmount;
        if (column.field === 'totalvendoramount') return advancedvendor;
        if (column.field === 'Vendor_FULLTotalAmount') return balancefull;
        if (column.field === 'Vendor_BataTotalAmount') return bataamount;
        if (column.headerName === 'Vendor Name') return 'Total';
        return '';
    });
    rowValues.push(totalRow);

    // Set default font size for table content based on the number of columns
    let fontdata = 10;  // Default font size for readability
    if (header.length <= 13) fontdata = 16;
    else if (header.length >= 14 && header.length <= 18) fontdata = 11;
    else if (header.length >= 19 && header.length <= 20) fontdata = 10;
    else if (header.length >= 21 && header.length <= 23) fontdata = 9;
    else if (header.length >= 24 && header.length <= 26) fontdata = 7;
    else if (header.length >= 27 && header.length <= 30) fontdata = 6;
    else if (header.length >= 31 && header.length <= 33) fontdata = 4;
    else if (header.length >= 34 && header.length <= 35) fontdata = 3;

    pdf.autoTable({
        head: [header],
        body: rowValues,
        startY: 20,

        headStyles: {
            fontSize: fontdata,
            cellPadding: 1.5, // Adjust padding for header
            minCellHeight: 8,
            valign: 'middle',
            font: 'helvetica', // Use Helvetica font
            cellWidth: 'wrap',  // Wrap text inside cells
        },

        bodyStyles: {
            fontSize: fontdata,
            valign: 'middle',
            cellWidth: 'auto'  // Adjust column widths automatically
        },

        willDrawCell: function (data) {
            if (data.row.index === rowValues.length - 1) {
                const { cell } = data;
                const { x, y, width, height } = cell;

                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(9);

                // Draw top border
                pdf.setDrawColor(0);
                pdf.setLineWidth(0.5);
                pdf.line(x, y, x + width, y); // Draw top border

                // Draw bottom border
                pdf.line(x, y + height, x + width, y + height); // Draw bottom border
            }
        },
        columnWidth: 'auto'
    });

    // Save the PDF to file
    pdf.save('VendorStatement Reports.pdf');
};





    const handleInputChange = (event, newValue) => {
        const selectoption = newValue ? newValue.label : ''
        setTravelsname(selectoption);
    };

  

    const TotalAmoundata = (data) => {
        let totalAmount = 0;
      

        data.forEach(item => {
            if (item.Vendor_FULLTotalAmount !== null) {
                totalAmount += parseFloat(item.Vendor_FULLTotalAmount);
            }
        });
     

        return totalAmount;
        // console.log(totalAmount,"ammmm")

    }
    const handleShow = async () => {
 
        if(!travelsname){
            setWarning(true);
            setWarningMessage("Enter the Travelsname")
            return
        }
        try {
            const response = await axios.get(
                `${apiUrl}/VehicleStatement-bookings?Travelsname=${encodeURIComponent(
                    travelsname
                )}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
                    toDate.toISOString()
                )}`
            );
            const data = response.data;
            console.log(data)
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
               console.log(rowsWithUniqueId,"vendorrow")
                setRows(rowsWithUniqueId);
                setVendorfullamount(TotalAmoundata(rowsWithUniqueId))
                setSuccess(true);
                setSuccessMessage("successfully listed")
            } else {
                setRows([]);
                setVendorfullamount(0)
                setError(true);
                setErrorMessage("no data found")
            }
        } 
        // catch {
        //     setRows([]);
        //     setErrorMessage("Check your Network Connection");
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);
         
            // Check if there's no response, indicating a network error
            if (error.message ) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Show Vendor Statement : " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }

    }
         const handleShowAll = async () => {

        try {
            const    response = await axios.get(
                `${apiUrl}/tripsheetvendordata?fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
                    toDate.toISOString()
                )}`
            );
            const data = response.data;
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));

                setRows(rowsWithUniqueId);
                setVendorfullamount(TotalAmoundata(rowsWithUniqueId))
                setSuccess(true);
                setSuccessMessage("successfully listed")
            } else {
                setRows([]);
                setVendorfullamount(0)
                setError(true);
                setErrorMessage("no data found")
            }
        }
        //  catch {
        //     setRows([]);
        //     setErrorMessage("Check your Network Connection");
        // }
        catch (error) {
            console.log("Error occurredddddd:", error);
         
            // Check if there's no response, indicating a network error
            if (error.message ) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Show Vendor Statement: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }

    }

    const handleButtonClick = (row) => {
        setSelectedRow(row);
        setPopupOpen(true);
    };
    const handlePopupClose = () => {
        setSelectedRow(null);
        setPopupOpen(false);
    };
    // const handleBookingClick = () => {
    //     const bookingPageUrl = `/home/customers/bookings?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&status=${selectedRow.status}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.city}&report=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehRegNo=${selectedRow.vehRegNo}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
    //     window.location.href = bookingPageUrl;
    // };

    // const handleTripsheetClick = () => {
    //     const bookingPageUrl = `/home/customers/tripsheet?bookingno=${selectedRow.bookingno}&bookingdate=${selectedRow.bookingdate}&bookingtime=${selectedRow.bookingtime}&tripid=${selectedRow.tripid}&customer=${selectedRow.customer}&orderedby=${selectedRow.orderedby}&mobileno=${selectedRow.mobileno}&guestname=${selectedRow.guestname}&guestmobileno=${selectedRow.guestmobileno}&email=${selectedRow.email}&employeeno=${selectedRow.employeeno}&address1=${selectedRow.address1}&address2=${selectedRow.address2}&city=${selectedRow.report}&vehType=${selectedRow.vehType}&paymenttype=${selectedRow.paymenttype}&startdate=${selectedRow.startdate}&starttime=${selectedRow.starttime}&registertime=${selectedRow.registertime}&duty=${selectedRow.duty}&pickup=${selectedRow.pickup}&costcode=${selectedRow.costcode}&registerno=${selectedRow.registerno}&flightno=${selectedRow.flightno}&orderbyemail=${selectedRow.orderbyemail}&remarks=${selectedRow.remarks}&servicestation=${selectedRow.servicestation}&advance=${selectedRow.advance}&nameupdate=${selectedRow.nameupdate}&address3=${selectedRow.address3}&address4=${selectedRow.address4}&cityupdate=${selectedRow.cityupdate}&useage=${selectedRow.useage}&username=${selectedRow.username}&tripdate=${selectedRow.tripdate}&triptime=${selectedRow.triptime}&emaildoggle=${selectedRow.emaildoggle}&hiretypes=${selectedRow.hiretypes}&travelsname=${selectedRow.travelsname}&vehRegNo=${selectedRow.vehRegNo}&vehiclemodule=${selectedRow.vehiclemodule}&driverName=${selectedRow.driverName}&driverphone=${selectedRow.driverphone}&travelsemail=${selectedRow.travelsemail}`;
    //     window.location.href = bookingPageUrl;
    // };

    useEffect(() => {
        const fetchdataccountinfodata = async () => {
            try {
                const response = await axios.get(`${apiUrl}/tripaccounttravelname`)
                const data = response.data
                const data3 = data.map(res => res.travelsname)
                const data2 = ["All",...data3]
                
              
                setAccountInfoData(data2)

            }
            catch (err) {
                console.log(err)
            }
        }
        fetchdataccountinfodata()
    }, [apiUrl])


    return {
        rows,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        hidePopup,
        // servicestation,
        handleInputChange,
        fromDate,
        setFromDate,
        toDate,
        handleShow,
        handleShowAll,
        handleExcelDownload,
        handlePdfDownload,
        handleButtonClick,
        popupOpen,
        handlePopupClose,
        selectedRow,
        // handleBookingClick,
        // handleTripsheetClick,
        setToDate,
        columns,
        accountinfodata,
        travelsname,
        fullamountdata
    };
};

export default useVehiclestatement;