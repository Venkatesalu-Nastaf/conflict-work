import { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import axios from "axios";
import Excel from 'exceljs';
import { saveAs } from "file-saver";
import dayjs from 'dayjs';
import JSZip from 'jszip';

import { pdf } from '@react-pdf/renderer';
import { PDFDocument } from 'pdf-lib';

import PdfzipParticularData from './Pdfpatricularzipdata'
import { APIURL } from "../../../url";





const useExeclpage = () => {
    // const [misformat,setMisformat]=useState('')
    const [error1, setError1] = useState(false)
    const [errormessage1, setErrorMessage1] = useState({})
    const apiurl = APIURL
    const columns2 = [
        { key: "SNo", header: "Ref", width: 130 },
        { key: "department", header: "Hub Location", width: 150 },
        { key: "customer", header: "Customer", width: 150 },
        { key: "request", header: "CAS Request ID/Route ID", width: 200 },
        { key: "tripid", header: "DS No", width: 100 },
        { key: "orderedby", header: "Category", width: 120 },
        { key: "duty", header: "Route Type", width: 120 },
        { key: "duty1", header: "Sub Route Type", width: 150 },
        { key: "VendorName", header: "Vendor Name", width: 150 },
        // { key: "Vendor", header: "Vendor", width: 120 },
        { key: "vehRegNo", header: "Vehicle No", width: 120 },
        { key: "vehicleName2", header: "Vehicle Name", width: 120 },
        { key: "vehicleName", header: "Vehicle Actual Make", width: 180 },
        { key: "vehType", header: "Vehicle Type (Requested)", width: 200 },
        // { key: "vechicletype", header: "Vehicle Actual Make", width: 180 },
        // { key: "vehTypebilling", header: "Billing Vehicle Type", width: 180 },
        { key: "fueltype", header: "Fuel Type", width: 120 },
        // { key: "tripsheetdate", header: "Date", width: 120 },
        { key: "sheoutDatetrip", header: "Date", width: 120 },
        // { key: "shedOutDate", header: "Date", width: 120 },
        { key: "employeeno", header: "Employee SAP Code", width: 150 },
        { key: "guestname", header: "Travelled Employee Name", width: 200 },
        { key: "Gender", header: "Gender", width: 100 },
        { key: "escort", header: "Escort Route", width: 150 },
 
        { key: "address1", header: "Pickup Point / Shed", width: 180 },
        { key: "useage", header: "Drop Point", width: 200},
        { key: "starttime", header: "Shift Timing", width: 150 },
        { key: "UserNos_Occupancy", header: "User Nos / Occupancy", width: 180 },
        { key: "location", header: "Location", width: 120 },

        { key: "Groups", header: "Vehicle Category", width: 150 },
        { key: "remark", header: "Route Type (Pick/Drop)", width: 180 },
        // { key: "starttime1", header: "Garage Initial Time", width: 180 },
        // { key: "reporttime", header: "Initial Time", width: 120 },

        { key: "reporttime", header: "Garage Initial Time", width: 180 },
        { key: "starttime1", header: "Initial Time", width: 120 },
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
        // { key: "driverBeta", header: "Driver Bhatta", width: 150 },
        { key: "driverBeta_amount", header: "Driver Bhatta", width: 150 },
        { key: "OutstationCharges", header: "Outstation Charges", width: 180 },
        { key: "withoutTaxes", header: "Total Amount", width: 150 },
        // { key: "PenaltyAmount", header: "Penalty Amount", width: 150 },
        { key: "gstTaxes", header: "GST%", width: 100 },
        { key: "gstTax1", header: "GST Amount", width: 100 },
        { key: "permit", header: "Permit", width: 120 },
        { key: "parking", header: "Parking", width: 120 },
        { key: "toll", header: "Toll", width: 100 },
        { key: "TOTALtollandpark", header: "DND/Toll/Parking Amount", width: 200 },
        { key: "totalcalcAmount1", header: "Amount With All Taxes", width: 200 },
        {key: "shedInDate",header: "End Date",width: 200, render: (row) => (row.shedInDate ? dayjs(row.shedInDate).format("DD-MM-YYYY") : "")},



        // Add more keys as needed
    ];
    const columns = [
        { key: "SNo", header: "Ref", width: 130 },
        { key: "department", header: "Hub Location", width: 150 },
        { key: "customer", header: "Customer", width: 150 },
        { key: "request", header: "CAS Request ID/Route ID", width: 200 },
        { key: "tripid", header: "DS No", width: 100 },
        { key: "orderedby", header: "Category", width: 120 },
        { key: "duty", header: "Route Type", width: 120 },
        { key: "calcPackage", header: "Package", width: 150 },
        { key: "VendorName", header: "Vendor Name", width: 150 },
        { key: "vehRegNo", header: "Vehicle No", width: 120 },
        { key: "vehicleName2", header: "Vehicle Name", width: 120 }, 
        // { key: "vehType", header: "Vehicle Make", width: 180 },
        { key: "vehicleName", header: "Vehicle Make", width: 180 },
        { key: "vehType1", header: "Vehicle Type (Requested)", width: 200 },
        { key: "segement", header: "vehicle Segment", width: 180 },
        { key: "fueltype", header: "Fuel Used", width: 120 },
        // { key: "tripsheetdate", header: "Date", width: 120 },
        { key: "sheoutDatetrip", header: "Date", width: 120 },
        // { key: "employeeno", header: "User Name", width: 150 },
        { key: "guestname", header: "User Name", width: 150 },
        { key: "Gender", header: "Gender", width: 100 },
        { key: "escort", header: "Escort Route", width: 150 },
        { key: "address1", header: "Pickup Point", width: 180 },
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
        { key: "TOTALtollandpark", header: "DND/Toll/Parking Amount", width: 200 },
        { key: "totalcalcAmount", header: "Total Amount", width: 150 },
        {key: "shedInDate",header: "End Date",width: 200, render: (row) => (row.shedInDate ? dayjs(row.shedInDate).format("DD-MM-YYYY") : "")},
        { key: "opsremark", header: "Ops Remarks", width: 150 }

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
    // function addPercentage(amount, percent) {
    
    //     amount = parseFloat(amount) || 0;
    //     percent = parseFloat(percent) || 0;
    
    //     let percentageValue = (amount * percent) / 100;
    
    //     const datapercent = amount + percentageValue;
    
    //     return datapercent.toFixed(2);
    // }


    function addPercentage(amount1, percent1,toll1) {
    
       let amount = parseFloat(amount1) || 0;
       let percent = parseFloat(percent1) || 0;
       let  tollamount = parseFloat(toll1) || 0;
    //    console.log(amount,percent,tollamount,'zipgstadddd')
    
      
    
        const datapercent = amount + percent + tollamount;
        // console.log(datapercent,'zipgstaddddpercent',Math.round(datapercent))
    
        return Math.round(datapercent);
    }
    

    // function addPercentage(amount, percent) {
    //     console.log(amount,percent,'zippppppppppppppppppppp');

    //     let percentageValue = (amount * percent) / 100 || 0;
      
    //     const datapercent = amount + percentageValue
    //     return datapercent.toFixed(2)
    // }
    
    function withoutTaxesdata(total,toll,parking,permit) {
        let withoutaxValue = total-toll-parking-permit;
        return withoutaxValue;
    }

    function totalamountgst(gst,total) {
        // console.log(gst,total,'zipgst')
        let gsttax = (gst * total) / 100;
        // console.log(gsttax,'zipgst')
        return gsttax.toFixed(2);

    }

    // function addTollparkparking(toll,parking,permit) {
    //     console.log(toll,parking,permit,'zip')
    //     let tollparkparking = Number(toll) || 0 + Number(parking) || 0 + Number(permit) || 0
    //     console.log(tollparkparking,'ziptotal')
    //     return tollparkparking;
    // }

    function addTollparkparking(toll, parking, permit) {
        // console.log(toll, parking, permit, 'zip');
        let tollparkparking = (Number(toll) || 0) + (Number(parking) || 0) + (Number(permit) || 0);
        // console.log(tollparkparking, 'ziptotal');
        return tollparkparking;
    }
    



    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';
    

    function removeSeconds(time) {
        // Split the time string by colon (:)
        const timeParts = time.split(':');
      
        // Check if there are seconds (length 3), return hours:minutes
        if (timeParts.length === 3) {
          return `${timeParts[0]}:${timeParts[1]}`;
        }
      
        // If there's only hours:minutes, return it as is
        return time;
      }

    const handleExcelDownload = async (misformat, invoice, invoicedate,customerData) => {
        console.log(misformat, invoice, invoicedate,customerData, "zipexcel")
        const data = invoice;
        const data2 = invoice;


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
                    column.alignment = { horizontal: 'left', vertical: 'left' };
                });

                data.map((singleData, index) => {
                    console.log(data,'datas of excel datss')

                    if (singleData["duty"] === "Outstation") {
                        singleData["originalExtraKM"] = singleData["extraKM"]; // Store original value
                        singleData["extraKM"] = 0;
                        singleData["extraHR"] = 0;
                    }
                    singleData["SNo"] = index + 1;
                    // singleData["duty1"]=singleData["duty"]
                    const location = `${singleData.address1}`;
                    singleData['location'] = location

                    singleData["duty1"] = singleData["duty"]
                    // singleData["Vendor"] = " Jessy Cabs"
                    singleData["VendorName"] = " Jessy Cabs"
                    singleData["UserNos_Occupancy"] = 1
                    singleData["OutstationCharges"] = 0
                    // singleData["calcPackage"] =  singleData["duty"] === "Transfer" || singleData["duty"] === "Outstation" ? singleData["duty"] :singleData["calcPackage"]
                    // singleData["calcPackage"] = singleData["duty"] === "Transfer" || singleData["duty"] === "Outstation"   ? (singleData["duty"] === "Outstation" ? `${singleData["extraKM"]} Rs@${singleData["extrakm_amount"]}` : singleData["duty"])  : singleData["calcPackage"];
                    singleData["calcPackage"] = singleData["duty"] === "Transfer" || singleData["duty"] === "Outstation"   ? (singleData["duty"] === "Outstation" ? `${singleData["extraKM"] || singleData["originalExtraKM"]} Rs@${singleData["extrakm_amount"]}` : singleData["duty"]): singleData["calcPackage"];
                    singleData["package_amount"] = singleData["duty"] === "Outstation"   ?   singleData["ex_kmAmount"] : singleData["package_amount"]
                    singleData["vechicletype"] = singleData["vehType"]
                    // singleData["vehTypebilling"] = singleData["vehType"]
                    singleData["totalkm2"] = singleData["totalkm1"]
                    singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
                    singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
    

                    singleData["shedInDate"]=singleData["shedInDate"] ? dayjs(singleData["shedInDate"]).format("DD/MM/YYYY"):""
                    singleData["sheoutDatetrip"]=singleData["shedOutDate"] ? dayjs(singleData["shedOutDate"]).format("DD/MM/YYYY"):""
                    singleData["starttime"]=singleData["starttime"] ? removeSeconds(singleData["starttime"]):"00:00"
                    singleData["starttime1"]= removeSeconds(singleData["starttime1"])
                    // singleData["gstTax1"] = totalamountgst(customerData[0]?.gstTax,singleData["totalcalcAmount"])
                    
                    singleData["closetime"]=singleData["closetime"] ? removeSeconds(singleData["closetime"]):"00:00"
                    singleData["withoutTaxes"] =  withoutTaxesdata(singleData["totalcalcAmount"],singleData["toll"],singleData["parking"],singleData["permit"])
                    singleData["gstTax1"] = totalamountgst(customerData[0]?.gstTax,singleData["withoutTaxes"])
                    singleData["gstTaxes"] = customerData[0]?.gstTax
                    singleData["TOTALtollandpark"] =  addTollparkparking(singleData["toll"],singleData["parking"],singleData["permit"])
                    // singleData["totalcalcAmount"]=singleData["gstTax"] === 0 ? singleData["totalcalcAmount"]: addPercentage(singleData["totalcalcAmount"],singleData["gstTax"])
                    // singleData["totalcalcAmount1"]= customerData[0]?.gstTax === 0 ? singleData["totalcalcAmount"]: addPercentage(singleData["totalcalcAmount"],customerData[0]?.gstTax)
                    singleData["totalcalcAmount1"] = customerData[0]?.gstTax === 0 ? singleData["totalcalcAmount"]: addPercentage(singleData["withoutTaxes"],singleData["gstTax1"], singleData["TOTALtollandpark"])
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
                const totalAmountnoaddpark = data.reduce((sum, row) => sum + parseInt(row.withoutTaxes || 0, 10), 0);
                const totalAmountgstAmount = data.reduce((sum, row) => sum + parseInt(row.gstTax1 || 0, 10), 0);
                const totalparkandtollAmount = data.reduce((sum, row) => sum + parseInt(row.TOTALtollandpark || 0, 10), 0);
                const Amountwithtax = data.reduce((sum, row) => sum + parseInt(row.totalcalcAmount1 || 0, 10), 0);
                const totalRow = worksheet.addRow({});
                totalRow.getCell(columns2.findIndex(col => col.header === 'Outstation Charges') + 1).value = 'TOTAL';
                totalRow.getCell(columns2.findIndex(col => col.header === 'Total Amount') + 1).value = totalAmountnoaddpark;
                totalRow.getCell(columns2.findIndex(col => col.header === 'GST Amount') + 1).value =  totalAmountgstAmount;
                totalRow.getCell(columns2.findIndex(col => col.header === 'DND/Toll/Parking Amount') + 1).value = totalparkandtollAmount;
                totalRow.getCell(columns2.findIndex(col => col.header === 'Amount With All Taxes') + 1).value = Amountwithtax;
                totalRow.eachCell((cell) => {
                    cell.font = { bold: true };
                    cell.alignment = { horizontal: 'left', vertical: 'left' };
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

                // write the content using writeBuffer
                const buf = await workbook.xlsx.writeBuffer();
                 
                // download the processed file

                saveAs(new Blob([buf]), `${fileName}.xlsx`);



            } catch (error) {
                console.log('<<<ERRROR>>>', error);
                console.log('Something Went Wrong', error.message);
            }
            //  finally {
            //     // removing worksheet's instance to create new one
            //     workbook.removeWorksheet(workSheetName);
            // }
        }

        else if (misformat === "New MIS") {
            try {
              

                const fileName = `MIS ${dayjs(invoicedate).format(" MMMM D")}`
                // creating one worksheet in workbook
                const worksheet1 = workbook.addWorksheet(workSheetName);
                worksheet1.columns = columns;

                // updated the font for first row.
                worksheet1.getRow(1).font = { bold: true };

                // Set background color for header cells
                worksheet1.getRow(1).eachCell((cell, colNumber) => {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '9BB0C1' } // Green background color
                    };
                });


                worksheet1.getRow(1).height = 30;
                // loop through all of the columns and set the alignment with width.
                worksheet1.columns.forEach((column) => {
                    column.width = column.header.length + 5;
                    column.alignment = { horizontal: 'left', vertical: 'left' };
                });

                data2.forEach((singleData2, index) => {
                   
                    singleData2["SNo"] = index + 1;
                    const location = `${singleData2.address1}`;
                    singleData2['location'] = location
                    singleData2["Gender"] = singleData2["gender"] ? singleData2["gender"] : "N/A"
                    singleData2["EscortRoute"] = singleData2["escort"] ? singleData2["escort"] : 'N/A'
                    singleData2["VendorName"] = " Jessy Cabs"
                    singleData2["UserNos_Occupancy"] = 1
                    singleData2["calcPackage"] =  singleData2["duty"] === "Transfer" || singleData2["duty"] === "Outstation" ? singleData2["duty"] :singleData2["calcPackage"]
                    singleData2["vehType1"] = singleData2["vehType"]
                    singleData2["PickupPoint_Shed"] = singleData2["pickup"]
                    singleData2["sheoutDatetrip"]=singleData2["shedOutDate"] ? dayjs(singleData2["shedOutDate"]).format("DD/MM/YYYY"):""
                    singleData2["shedInDate"]=singleData2["shedInDate"] ? dayjs(singleData2["shedInDate"]).format("DD/MM/YYYY"):""
                    singleData2["tripsheetdate"]=singleData2["tripsheetdate"] ? dayjs(singleData2["tripsheetdate"]).format("DD-MM-YYYY"):""
                    singleData2["Zonetranfer"] = singleData2["department"] ? ` ${singleData2["department"]}-Airport Transfer` : ""
                    singleData2["starttime"] = singleData2["starttime"] ? removeSeconds(singleData2["starttime"]):"00.00"
                    //  singleData2["starttime"] = singleData2["starttime"] 
                    singleData2["timeluxury"] = singleData2["Groups"] === "Luxzury" ? singleData2["starttime"] : "00.00"
                    singleData2["Endtimeluxury"] = singleData2["Groups"] === "Luxzury" ? singleData2["shedintime"] : "00.00"
                    singleData2["totaltime1"] = singleData2["totaltime"]
                    singleData2["TOTALtollandpark"] = addTollparkparking(singleData2["toll"],singleData2["parking"],singleData2["permit"])
                    singleData2["opsremark"] = singleData2["opsremark"] ? singleData2["Opremark"] : ''
                    // singleData2["totalcalcAmount1"] = singleData2["totalcalcAmount"]
                    // singleData2["totalcalcAmount1"] = singleData2["totalcalcAmount"]

                    worksheet1.addRow(singleData2);

                    // Adjust column width based on the length of the cell values in the added row
                    worksheet1.columns.forEach((column) => {
                        const cellValue = singleData2[column.key] || ''; // Get cell value from singleData or use empty string if undefined
                        const cellLength = cellValue.toString().length; // Get length of cell value as a string
                        const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

                        // Set column width to the maximum of current width and cell length plus extra space
                        column.width = Math.max(currentColumnWidth, cellLength + 5);
                    });
                });

                // loop through all of the rows and set the outline style.
                worksheet1.eachRow({ includeEmpty: false }, (row) => {
                    // store each cell to currentCell
                    const currentCell = row._cells;

                    // loop through currentCell to apply border only for the non-empty cell of excel
                    currentCell.forEach((singleCell) => {

                        const cellAddress = singleCell._address;

                        // apply border
                        worksheet1.getCell(cellAddress).border = {
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
            } 
            // finally {
            //     // removing worksheet's instance to create new one
            //     workbook.removeWorksheet(workSheetName);
            // }


        }
    }


    const handledatazipDownload = async (tripheaderIndex,misformat, invoice, invoicedate, customer, organizationsdetail1, imageorganisation, rowSelectionModel,customerData,stationData,bookingMail) => {
        console.log(misformat, "m", invoice, "in", invoicedate, customer, "zipexcel", rowSelectionModel, "mo", imageorganisation, " console for datas")
        
        const data = invoice;
        const customername = customer;
        const workbook = new Excel.Workbook();
        console.log(data,"exceldataaa");
        

        try {
            const zip = new JSZip();
            if (rowSelectionModel.length === 0) {
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
                    column.alignment = { horizontal: 'left', vertical: 'left' };
                });

                const uniqueData = data.filter((value, index, self) =>
                    index === self.findIndex((t) => t.tripid === value.tripid)
                );

                uniqueData.forEach((singleData, index) => {

                    singleData["SNo"] = index + 1;
                    // singleData["duty1"]=singleData["duty"]
                    const location = `${singleData.address1}`;
                    singleData['location'] = location

                    singleData["duty1"] = singleData["duty"]
                    singleData["Vendor"] = " Jessy Cabs"
                    singleData["VendorName"] = " Jessy Cabs"
                    singleData["UserNos_Occupancy"] = 1
                    singleData["OutstationCharges"] = 0
                    singleData["vechicletype"] = singleData["vehType"]
                    singleData["vehTypebilling"] = singleData["vehType"]
                    // singleData["calcPackage"] =  singleData["duty"] === "Transfer" || singleData["duty"] === "Outstation" ? singleData["duty"] :singleData["calcPackage"]
                    singleData["calcPackage"] = singleData["duty"] === "Transfer" || singleData["duty"] === "Outstation"   ? (singleData["duty"] === "Outstation" ? `${singleData["extraKM"]} Rs@${singleData["extrakm_amount"]}` : singleData["duty"])  : singleData["calcPackage"];
                    singleData["package_amount"] = singleData["duty"] === "Outstation"   ?   singleData["ex_kmAmount"] : singleData["package_amount"]
                    singleData["totalkm2"] = singleData["totalkm1"]
                    singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
                    singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
                    singleData["tripsheetdate"]=singleData["tripsheetdate"] ? dayjs(singleData["tripsheetdate"]).format("DD-MM-YYYY"):""
                    singleData["shedInDate"]=singleData["shedInDate"] ? dayjs(singleData["shedInDate"]).format("DD/MM/YYYY"):""
                    singleData["sheoutDatetrip"]=singleData["shedOutDate"] ? dayjs(singleData["shedOutDate"]).format("DD/MM/YYYY"):""
                    singleData["starttime"]=singleData["starttime"] ? removeSeconds(singleData["starttime"]):""
                    singleData["starttime1"] = removeSeconds(singleData["starttime"])
                    singleData["closetime"]=singleData["closetime"] ? removeSeconds(singleData["closetime"]):""
                    singleData["withoutTaxes"]=  withoutTaxesdata(singleData["totalcalcAmount"],singleData["toll"],singleData["parking"],singleData["permit"])
                    singleData["TOTALtollandpark"] = addTollparkparking(singleData["toll"],singleData["parking"],singleData["permit"])
                    // singleData["totalcalcAmount"]=singleData["gstTax"] === 0 ? singleData["totalcalcAmount"]: addPercentage(singleData["totalcalcAmount"],singleData["gstTax"])
                    singleData["gstTax1"] = totalamountgst(customerData[0]?.gstTax,singleData["withoutTaxes"])
                    singleData["gstTaxes"] = customerData[0]?.gstTax
                    // singleData["totalcalcAmount1"] = customerData[0]?.gstTax ? singleData["totalcalcAmount"] : addPercentage(singleData["withoutTaxes"],singleData["gstTax1"], singleData["TOTALtollandpark"])
                    singleData["totalcalcAmount1"] = addPercentage(singleData["withoutTaxes"],singleData["gstTax1"], singleData["TOTALtollandpark"])
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

                const totalAmountnoaddpark = data.reduce((sum, row) => sum + parseInt(row.withoutTaxes || 0, 10), 0);
                const totalAmountgstAmount = data.reduce((sum, row) => sum + parseInt(row.gstTax1 || 0, 10), 0);
                const totalparkandtollAmount = data.reduce((sum, row) => sum + parseInt(row.TOTALtollandpark || 0, 10), 0);
                const Amountwithtax = data.reduce((sum, row) => sum + parseInt(row.totalcalcAmount1 || 0, 10), 0);
                const totalRow = worksheet.addRow({});
                totalRow.getCell(columns2.findIndex(col => col.header === 'Outstation Charges') + 1).value = 'TOTAL';
                totalRow.getCell(columns2.findIndex(col => col.header === 'Total Amount') + 1).value = totalAmountnoaddpark;
                totalRow.getCell(columns2.findIndex(col => col.header === 'GST Amount') + 1).value =  totalAmountgstAmount;
                totalRow.getCell(columns2.findIndex(col => col.header === 'DND/Toll/Parking Amount') + 1).value = totalparkandtollAmount;
                totalRow.getCell(columns2.findIndex(col => col.header === 'Amount With All Taxes') + 1).value = Amountwithtax;
                totalRow.eachCell((cell) => {
                    cell.font = { bold: true };
                    cell.alignment = { horizontal: 'left', vertical: 'left' };
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
                    column.alignment = { horizontal: 'left', vertical: 'left' };
                });

                const uniqueData = data.filter((value, index, self) =>
                    index === self.findIndex((t) => t.tripid === value.tripid)
                );

                uniqueData.forEach((singleData, index) => {
                    singleData["SNo"] = index + 1;
                    const location = `${singleData.address1}`;
                    singleData['location'] = location
                    singleData["Gender"] = singleData["gender"] ? singleData["gender"] : "N/A"
                    singleData["EscortRoute"] = singleData["escort"] ? singleData["escort"] : 'N/A'
                    singleData["UserNos_Occupancy"] = 1
                    singleData["calcPackage"] =  singleData["duty"] === "Transfer" || singleData["duty"] === "Outstation" ? singleData["duty"] :singleData["calcPackage"]
                    singleData["VendorName"] = " Jesscy Cabs"
                    singleData["vehType1"] = singleData["vehType"]
                    singleData["PickupPoint_Shed"] = singleData["pickup"]
                    singleData["Zonetranfer"] = singleData["department"] ? ` ${singleData["department"]}-Airport Transfer` : ""
                    singleData["sheoutDatetrip"]=singleData["shedOutDate"] ? dayjs(singleData["shedOutDate"]).format("DD/MM/YYYY"):""
                    singleData["tripsheetdate"]=singleData["tripsheetdate"] ? dayjs(singleData["tripsheetdate"]).format("DD-MM-YYYY"):""
                    singleData["shedInDate"]=singleData["shedInDate"] ? dayjs(singleData["shedInDate"]).format("DD/MM/YYYY"):""
                    singleData["starttime"] = singleData["starttime"] ? removeSeconds(singleData["starttime"]):""
                    singleData["timeluxury"] = singleData["Groups"] === "Luxzury" ? singleData["starttime"] : "00.00"
                    singleData["Endtimeluxury"] = singleData["Groups"] === "Luxzury" ? singleData["shedintime"] : "00.00"
                    singleData["totaltime1"] = singleData["totaltime"]
                    singleData["TOTALtollandpark"] = addTollparkparking(singleData["toll"],singleData["parking"],singleData["permit"])
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
                console.log(data , "data of old format excel")
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
                        customerData={customerData}
                        stationData={stationData}

                    />
                ).toBlob();

                const pdfBytes = await blob.arrayBuffer();
            // dont delete this code
                const reactPDFDocument = await PDFDocument.load(pdfBytes);

                // const data = await JSON.parse(pdfData.bookattachedimage)
                // const uniqueArraybook = Array.from(new Set(data?.map(JSON.stringify)))?.map(JSON.parse);
                // const uniqueJsonStringbook = JSON.stringify(uniqueArraybook);
                // const datalink = JSON.parse(uniqueJsonStringbook)

                const data1 = await JSON.parse(pdfData.Attachedimage)
                const uniqueArraybook1 = Array.from(new Set(data1?.map(JSON.stringify)))?.map(JSON.parse);
                const uniqueJsonStringbook1 = JSON.stringify(uniqueArraybook1);
                const datalink1 = JSON.parse(uniqueJsonStringbook1)
                
                const data = await JSON.parse(pdfData.bookattachedimage)
                const uniqueArraybook = Array.from(new Set(data?.map(JSON.stringify)))?.map(JSON.parse);
                const uniqueJsonStringbook = JSON.stringify(uniqueArraybook);
                const datalink = JSON.parse(uniqueJsonStringbook)

                

                // return datalink


                // console.log(pdfPromises1,"pmisddd")

                // const pdfDocuments = [];
                // for (const data of datalink) {
                //     if (data.imagees !== null) {
                //         const data2 = data.imagees.split('.').pop()
                //         console.log(data2, "datalonk22")
                //         if (data2 === "pdf") {

                //             const filePath = `${apiurl}/images/${data.imagees}`;
                //             console.log(filePath, "datalinkpdfpath")

                //             // Fetch the PDF file
                //             const response = await fetch(filePath);
                //             const pdfBytes = await response.arrayBuffer();

                //             // Load the PDF document
                //             const pdfDocument = await PDFDocument.load(pdfBytes);
                //             console.log(pdfDocument)

                //             // Add the PDF document to the array
                //             pdfDocuments.push(pdfDocument);
                //         }
                //     }
                // }

                const pdfDocuments = [];

                for (const data of datalink1) {
                    if (data.attachedimageurl !== null) {
                        const data2 = data.attachedimageurl.split('.').pop()
                        console.log(data2, "datalonk22")
                        if (data2 === "pdf") {

                            const filePath = `${apiurl}/images/${data.attachedimageurl}`;
                            console.log(filePath, "datalinkpdfpath")

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
                if(bookingMail) {
                    console.log(bookingMail, "jhgfffffff")
                for (const data of datalink) {
                    if (data.imagees !== null) {
                        const data2 = data.imagees.split('.').pop()
                        console.log(data2, "datalonk22")
                        if (data2 === "pdf") {

                            const filePath = `${apiurl}/images/${data.imagees}`;
                            console.log(filePath, "datalinkpdfpath")

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
            }


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
                //   const fileName = `PDF_${index + 1}.pdf`; 
                const fileName = `PDF_${tripheaderIndex[index]}.pdf`;
                // const fileName = invoice?.map(li => `PDF_${li.tripid}.pdf`)
                // console.log(blob,"pdfblob")
                // zip.file(fileName, blob);
                pdffolder.file(fileName, mergedPDFBytes);

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