import { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import axios from "axios";
import Excel from 'exceljs';
import { saveAs } from "file-saver";
import dayjs from 'dayjs';
import JSZip from 'jszip';

import {  pdf } from '@react-pdf/renderer';
import { PDFDocument } from 'pdf-lib';

import PdfzipParticularData from './Pdfpatricularzipdata'





const useExeclpage = () => {
    // const [misformat,setMisformat]=useState('')
    const [error1, setError1] = useState(false)
    const [errormessage1, setErrorMessage1] = useState({})
    
    const columns2 = [
        { key: "SNo", header: "Ref", width: 130 },
        { key: "department", header: "Hub Location", width: 150 },
        { key: "request", header: "CAS Request ID/Route ID", width: 200 },
        { key: "tripid", header: "DS No", width: 100 },
        { key: "orderedby", header: "Category", width: 120 },
        { key: "duty", header: "Route Type", width: 120 },
        { key: "duty1", header: "Sub Route Type", width: 150 },

        { key: "VendorName", header: "Vendor Name", width: 150 },
        { key: "Vendor", header: "Vendor", width: 120 },
        { key: "vehRegNo", header: "Vehicle No", width: 120 },
        { key: "vehType", header: "Vehicle Type (Requested)", width: 200 },
        { key: "vechicletype", header: "Vehicle Actual Make", width: 180 },
        { key: "vehTypebilling", header: "Billing Vehicle Type", width: 180 },
        { key: "fueltype", header: "Fuel Type", width: 120 },
        { key: "tripsheetdate", header: "Date", width: 120 },
        { key: "employeeno", header: "Employee SAP Code", width: 150 },
        { key: "guestname", header: "Travelled Employee Name", width: 200 },
        { key: "Gender", header: "Gender", width: 100 },
        { key: "escort", header: "Escort Route", width: 150 },
        { key: "pickup", header: "Pickup Point / Shed", width: 180 },
        { key: "useage", header: "Drop Point", width: 120 },
        { key: "starttime1", header: "Shift Timing", width: 150 },
        { key: "UserNos_Occupancy", header: "User Nos / Occupancy", width: 180 },
        { key: "location", header: "Location", width: 120 },

        { key: "Groups", header: "Vehicle Category", width: 150 },
        { key: "remark", header: "Route Type (Pick/Drop)", width: 180 },
        { key: "starttime", header: "Garage Initial Time", width: 180 },
        { key: "reporttime", header: "Initial Time", width: 120 },
        { key: "closetime", header: "End Time", width: 120 },
        { key: "shedintime", header: "Garage End Time", width: 150 },
        { key: "totaltime", header: "Total Hrs.", width: 120 },
        { key: "shedout", header: "Garage Initial Km", width: 180 },
        { key: "startkm", header: "Initial Km", width: 120 },
        { key: "closekm", header: "End Km", width: 120 },
        { key: "shedin", header: "Garage End Km", width: 150 },
        { key: "totalkm2", header: "Total Km", width: 120 },
        { key: "totalkm1", header: "Final KMs", width: 120 },
        { key: "calcPackage", header: "Package", width: 120 },
        { key: "package_amount", header: "Base Amount", width: 120 },
        { key: "extraKM", header: "Extra KMs", width: 120 },
        { key: "extraHR", header: "Extra HRs", width: 120 },
        { key: "ex_kmAmount", header: "Extra KMs Amount", width: 160 },
        { key: "ex_hrAmount", header: "Extra HRs Amount", width: 160 },

        { key: "night_totalAmount", header: "Night Charges", width: 150 },
        { key: "driverBeta", header: "Driver Bhatta", width: 150 },
        { key: "OutstationCharges", header: "Outstation Charges", width: 180 },
        { key: "t", header: "Total Amount", width: 150 },
        { key: "PenaltyAmount", header: "Penalty Amount", width: 150 },
        { key: "gstTax", header: "GST%", width: 100 },
        { key: "permit", header: "Permit", width: 120 },
        { key: "parking", header: "Parking", width: 120 },
        { key: "toll", header: "Toll", width: 100 },
        { key: "driverBeta_amount", header: "DND/Toll/Parking Amount", width: 200 },
        { key: "totalcalcAmount", header: "Amount With All Taxes", width: 200 }


        // Add more keys as needed
    ];
    const columns = [
        { key: "SNo", header: "Ref", width: 130 },
        { key: "department", header: "Hub Location", width: 150 },
        { key: "request", header: "CAS Request ID/Route ID", width: 200 },
        { key: "tripid", header: "DS No", width: 100 },
        { key: "orderedby", header: "Category", width: 120 },
        { key: "duty", header: "Route Type", width: 120 },
        { key: "calcPackage", header: "Package", width: 150 },
        { key: "VendorName", header: "Vendor Name", width: 150 },
        { key: "vehRegNo", header: "Vehicle No", width: 120 },
        { key: "vehType", header: "Vehicle Make", width: 180 },
        { key: "vehType1", header: "Vehicle Type (Requested)", width: 200 },

        { key: "segement", header: "vehicle Segment", width: 180 },
        { key: "fueltype", header: "Fuel Used", width: 120 },
        { key: "tripsheetdate", header: "Date", width: 120 },
        { key: "employeeno", header: "User Name", width: 150 },
        { key: "Gender", header: "Gender", width: 100 },
        { key: "escort", header: "Escort Route", width: 150 },
        { key: "pickup", header: "Pickup Point", width: 180 },
        { key: "useage", header: "Drop Point", width: 120 },
        { key: "remark", header: "Runing Details", width: 150 },
        { key: "Zonetranfer", header: "Zone for Airport transfers", width: 150 },
        { key: "UserNos_Occupancy", header: "Occupancy", width: 180 },
        { key: "starttime", header: "shift Times", width: 180 },
        { key: "timeluxury", header: "Time (from Garage) LUXURY 2", width: 180 },
        { key: "reporttime", header: "Emp.Initial Time", width: 180 },
        { key: "shedintime", header: "Emp.End Time", width: 180 },
        { key: "Endtimeluxury", header: " End Time (At Garage) LUXURY 2", width: 180 },
        { key: "totaltime1", header: "Total Hrs.", width: 120 },
        { key: "totaltime", header: "Final Hrs.", width: 120 },
        { key: "shedout", header: " Initial Km (At Garage) LUXURY 2", width: 180 },
        { key: "startkm", header: "Emp.Initial km", width: 180 },
        { key: "closekm", header: "Emp.End Km", width: 180 },
        { key: "shedin", header: "End Km (At Garage)  LUXURY 2", width: 180 },
        { key: "totalkm1", header: "Total Km", width: 120 },
        { key: "driverBeta_amount", header: "DND/Toll/Parking Amount", width: 200 },
        { key: "totalcalcAmount", header: "Total Amount", width: 150 },
        { key: "opsremark", header: "Ops Remarks", width: 150 },

    ]

    useEffect(() => {
        if (error1) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error1]);
    const hidePopup = () => {

        setError1(false);


    };




    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';


    const handleExcelDownload = async (misformat, invoice, invoicedate) => {
        console.log(misformat, invoice, invoicedate, "zipexcel")
        const data = invoice;


        if (!misformat) {
            setError1(true)
            setErrorMessage1(" SELECT MIS  EXCEL FORMAT")
            return
        }
        
        if (misformat === "Old MIS") {
            try {
                const fileName = `OLD MIS ${dayjs(invoicedate).format(" MMMM D")}`
                // creating one worksheet in workbook
                const worksheet = workbook.addWorksheet(workSheetName);
                worksheet.columns = columns2;

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

                data.forEach((singleData, index) => {
                    singleData["SNo"] = index + 1;
                    // singleData["duty1"]=singleData["duty"]
                    const location = `${singleData.address1}, ${singleData.streetno}, ${singleData.city}`;
                    singleData['location'] = location

                    singleData["duty1"] = singleData["duty"]
                    singleData["Vendor"] = " Jesscy Cabs"
                    singleData["VendorName"] = " Jesscy Cabs"
                    singleData["vechicletype"] = singleData["vehType"]
                    singleData["vehTypebilling"] = singleData["vehType"]
                    singleData["totalkm2"] = singleData["totalkm1"]
                    singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
                    singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
                    singleData["starttime1"] = singleData["starttime"]
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

        else if (misformat === "New MIS") {
            try {

                const fileName = `MIS ${dayjs(invoicedate).format(" MMMM D")}`
                // creating one worksheet in workbook
                const worksheet = workbook.addWorksheet(workSheetName);
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

                data.forEach((singleData, index) => {
                    singleData["SNo"] = index + 1;
                    const location = `${singleData.address1}, ${singleData.streetno}, ${singleData.city}`;
                    singleData['location'] = location
                    singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
                    singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
                    singleData["VendorName"] = " Jesscy Cabs"
                    singleData["vehType1"] = singleData["vehType"]
                    singleData["PickupPoint_Shed"] = singleData["pickup"]
                    singleData["Zonetranfer"] = singleData["department"] ? ` ${singleData["department"]}-Airport Transfer` : ""
                    singleData["timeluxury"] = singleData["Groups"] === "Luxzury" ? singleData["starttime"] : "00.00"
                    singleData["Endtimeluxury"] = singleData["Groups"] === "Luxzury" ? singleData["shedintime"] : "00.00"
                    singleData["totaltime1"] = singleData["totaltime"]
                    singleData["opsremark"] = singleData["opsremark"] ? singleData["Opremark"] : ''

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
    }


    const handledatazipDownload = async (misformat, invoice, invoicedate,customer,organizationsdetail1,imageorganisation,rowSelectionModel ) => {
        // console.log(misformat,"m", invoice,"in", invoicedate, customer,"zipexcel",rowSelectionModel,"mo")
        const data = invoice;
        const customername=customer;
        const workbook = new Excel.Workbook();
        try {
            const zip = new JSZip();
              if(rowSelectionModel.length === 0){
                setError1(true)
                setErrorMessage1(" SELECT DATA ")
                return
              }

            if (!misformat) {
                setError1(true)
                setErrorMessage1(" SELECT MIS  EXCEL FORMAT")
                return
            }
           
            
            if (misformat === "Old MIS") {
                //    try {
                const fileName = `OLD MIS ${dayjs(invoicedate).format(" MMMM D")}`
                // creating one worksheet in workbook
                const worksheet = workbook.addWorksheet("workSheetName1");
                worksheet.columns = columns2;

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

                data.forEach((singleData, index) => {
                    singleData["SNo"] = index + 1;
                    // singleData["duty1"]=singleData["duty"]
                    const location = `${singleData.address1}, ${singleData.streetno}, ${singleData.city}`;
                    singleData['location'] = location

                    singleData["duty1"] = singleData["duty"]
                    singleData["Vendor"] = " Jesscy Cabs"
                    singleData["VendorName"] = " Jesscy Cabs"
                    singleData["vechicletype"] = singleData["vehType"]
                    singleData["vehTypebilling"] = singleData["vehType"]
                    singleData["totalkm2"] = singleData["totalkm1"]
                    singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
                    singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
                    singleData["starttime1"] = singleData["starttime"]
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
                const folderName = 'Old MIS FOLDER';
                const folder = zip.folder(folderName);

                // write the content using writeBuffer
                const buf = await workbook.xlsx.writeBuffer();
                const timestamp = new Date().getTime();
                folder.file(`${fileName}_${timestamp}.xlsx`, buf);


            }

            else if (misformat === "New MIS") {
                //    try {

                const fileName = `MIS ${dayjs(invoicedate).format(" MMMM D")}`
                // creating one worksheet in workbook
                const worksheet = workbook.addWorksheet("workSheetName1");
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

                data.forEach((singleData, index) => {
                    singleData["SNo"] = index + 1;
                    const location = `${singleData.address1}, ${singleData.streetno}, ${singleData.city}`;
                    singleData['location'] = location
                    singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
                    singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
                    singleData["VendorName"] = " Jesscy Cabs"
                    singleData["vehType1"] = singleData["vehType"]
                    singleData["PickupPoint_Shed"] = singleData["pickup"]
                    singleData["Zonetranfer"] = singleData["department"] ? ` ${singleData["department"]}-Airport Transfer` : ""
                    singleData["timeluxury"] = singleData["Groups"] === "Luxzury" ? singleData["starttime"] : "00.00"
                    singleData["Endtimeluxury"] = singleData["Groups"] === "Luxzury" ? singleData["shedintime"] : "00.00"
                    singleData["totaltime1"] = singleData["totaltime"]
                    singleData["opsremark"] = singleData["opsremark"] ? singleData["Opremark"] : ''

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
                const folderName = 'MIS Folder';
                const folder = zip.folder(folderName);
                const buf = await workbook.xlsx.writeBuffer();
                const timestamp = new Date().getTime();
                folder.file(`${fileName}_${timestamp}.xlsx`, buf)
             

            }
        

            //  let dataimagebook=[]
             const pdffolder = zip.folder("pdffolder");
            const pdfPromises = invoice?.map(async (pdfData, index) => {
            //   console.log(pdfData,"modedata")
            //  dataimagebook=pdfData.bookattachedimage
           
            
              const blob = await pdf(
                  <PdfzipParticularData
                     
                      particularPdf={[pdfData]} 
                      organisationdetail={organizationsdetail1} 
                      imagename={imageorganisation} 
                     
                  />
              ).toBlob();
             
              const pdfBytes = await blob.arrayBuffer(); 
              
            const reactPDFDocument = await PDFDocument.load(pdfBytes);
           
            // const filePath="http://localhost:8081/images/file_1714625961618.pdf"
            // const externalPDFBytes = await fetch(filePath).then((response) => response.arrayBuffer());
            
        
            const data=  await JSON.parse(pdfData.bookattachedimage)
            const uniqueArraybook = Array.from(new Set(data?.map(JSON.stringify)))?.map(JSON.parse);
            const uniqueJsonStringbook = JSON.stringify(uniqueArraybook);
            const datalink=JSON.parse(uniqueJsonStringbook)
          
          
            // return datalink
            
            
            // console.log(pdfPromises1,"pmisddd")
          
            const pdfDocuments = [];
            for (const data of datalink) {
                if(data.imagees !== null){
                    const data2=data.imagees.split('.').pop()
                    if(data2 === "pdf"){

                    
                 

                // Construct the file path for fetching the PDF
                // const filePath = `http://localhost:8081/images/${data.imagees}`;
                  const filePath = `http://localhost:8081/public/booking_doc/${data.imagees}`;
                
                // Fetch the PDF file
                const response = await fetch(filePath);
                const pdfBytes = await response.arrayBuffer();
               
                // Load the PDF document
                const pdfDocument = await PDFDocument.load(pdfBytes);
                console.log(pdfDocument)
            
                // Add the PDF document to the array
                pdfDocuments.push(pdfDocument);
                }
            }
            }
            
           
            // const filePath = `http://localhost:8081/images/${datalink.imagees}`;
// const response = await fetch(filePath);
// const pdfBytes3 = await response.arrayBuffer();
            // console.log(pdfBytes3,"byyyy")
            // const externalPDFDocument = await PDFDocument.load(pdfBytes3);
            // console.log(externalPDFDocument,"external",typeof(externalPDFDocument))
            const mergedPDFDocument = await PDFDocument.create();
            // console.log(mergedPDFDocument)

        // // Add pages from React PDF
        const [firstReactPage, ...restReactPages] = await mergedPDFDocument.copyPages(reactPDFDocument, reactPDFDocument.getPageIndices());
        mergedPDFDocument.addPage(firstReactPage);
        for (const page of restReactPages) {
            mergedPDFDocument.addPage(page);
        }

        // Add pages from external PDF

       

// Add pages from each PDF document to the merged PDF document
for (const pdfDocument of pdfDocuments) {
    // console.log(pdfDocument,"doc")
    const pages = await mergedPDFDocument.copyPages(pdfDocument, pdfDocument.getPageIndices());
    for (const page of pages) {
        // console.log(page,"docpage")
        mergedPDFDocument.addPage(page);
    }
}
        // const externalPages = await mergedPDFDocument.copyPages(externalPDFDocument, externalPDFDocument.getPageIndices());
        // for (const page of externalPages) {
        //     mergedPDFDocument.addPage(page);
        // }
             
              
            
              
        
        const mergedPDFBytes = await mergedPDFDocument.save();
              const fileName = `PDF_${index + 1}.pdf`; 
              // console.log(blob,"pdfblob")
              // zip.file(fileName, blob);
              pdffolder.file(fileName,mergedPDFBytes);
          
              // Return the filename for tracking
          });
          
          // Wait for all promises to resolve
          await Promise.all(pdfPromises);
          
            

                
            const zipContent = await zip.generateAsync({ type: 'blob' });
            // Download the ZIP file
            saveAs(zipContent, `HCL ${customername} ${dayjs(invoicedate).format(" MMMM D")}.zip`);
        }
        catch (error) {
            console.error('<<<ERROR>>>', error);
            console.error('Something Went Wrong', error.message);
        } finally {
            // Clean up resources
            workbook.removeWorksheet(workSheetName);
        }
    }
    return {
        handleExcelDownload, error1, errormessage1, handledatazipDownload
    }

}


export default useExeclpage