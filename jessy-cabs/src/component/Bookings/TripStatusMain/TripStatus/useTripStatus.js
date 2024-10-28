import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { APIURL } from "../../../url";
import Excel from 'exceljs';

const columns = [
  { field: "id5", headerName: "Sno", width: 50 },
  { field: "bookingno", headerName: "Booking No", width: 110 },
  { field: "tripid", headerName: "Tripsheet No", width: 110 },
  { field: "status", headerName: "Status", width: 110 },
  { field: "customer", headerName: "Customer", width: 130 },
  { field: "servicestation", headerName: "Service Station", width: 130 },
  { field: "vehRegNo", headerName: "VehicleRegNo", width: 130 },
  { field: "bookingdate", headerName: "Booking Date", width: 120, valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "" },
  { field: "shedOutDate", headerName: "ShedOut Date", width: 120, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
  { field: "startdate", headerName: "Start Date", width: 120, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
  { field: "reporttime", headerName: "ShedOut Time", width: 110 },
  { field: "starttime", headerName: "Start Time", width: 100 },
  { field: "guestname", headerName: "Guest Name", width: 140 },
  { field: "address1", headerName: "Address", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "employeeno", headerName: "Employee No", width: 110 },
 // { field: "report", headerName: "Report", width: 130 },
  { field: "driverName", headerName: "Driver Name", width: 130 },
  { field: "mobileNo", headerName: "Driver MobNo", width: 130 },
  { field: "vehType", headerName: "Rate For", width: 130 },
  { field: "duty", headerName: "Duty", width: 100 },
  { field: "customercode", headerName: "Cost Code", width: 110 },
  { field: "registerno", headerName: "Request Id", width: 130 },
  { field: "flightno", headerName: "Flight No", width: 130 },
  { field: "orderByEmail", headerName: "OrderedBy Email", width: 150 },
  { field: "remarks", headerName: "Remark", width: 130 },
  { field: "vehiclemodule", headerName: "Vehicle Type", width: 110 },
  { field: "paymenttype", headerName: "Payment Type", width: 130 },
  { field: "advance", headerName: "Advance", width: 90 },
  { field: "totaltime", headerName: "TotalHR", width: 90 },
  { field: "totalkm1", headerName: "TotalKM", width: 100 },
  { field: "toll", headerName: "Toll", width: 70 },
  { field: "permit", headerName: "Permit", width: 90 },
  { field: "parking", headerName: "Parking", width: 80 },
  { field: "totalcalcAmount", headerName: "TotalAmount", width: 100 },
];

const useDispatched = () => {
  const apiUrl = APIURL;
  const [rows, setRows] = useState([]);
  const [department, setdepartment] = useState([]);
  const [VehNo, setVehNo] = useState('')
  const [cutomerName, setCutomerName] = useState([])
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
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});
  const [statusvalue, setStatusValue] = useState("");
  const [columnshowall, setColumnShowall] = useState(true)

  const [loading, setLoading] = useState(false);
  const [isStations, setisStations] = useState([])


  //---------------------popup----------------------------

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

  //--------------------------------------------------------
  const filteredColumns = columns.filter(col => {
    // Columns to hide when status is "pending" or "cancelled"
    const hideColumns = ["totalkm1", "permit", "totaltime", "toll", "totalcalcAmount", "parking"];

    // Hide the columns when status is "pending" or "cancelled"
    return !hideColumns.includes(col.field) || (statusvalue !== "pending" && statusvalue !== "Cancelled");
  });

  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';
    try {
      const fileName = "Pending Reports"
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      const columndata = columns.map(key => ({ key: key.field, header: key.headerName }));
      const filteredcolumnsdata = filteredColumns.map(key => ({ key: key.field, header: key.headerName }));
      const newcolumndata = statusvalue === "pending" || statusvalue === "Cancelled" ? filteredcolumnsdata : columndata
      //worksheet.columns = columnsexcel
      worksheet.columns = newcolumndata;
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

      rows.forEach((singleData, index) => {
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

  const handlePdfDownload = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "tabloid" // [width, height] in inches
    });
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Booking Details", 10, 10);
    const fullcoumndata = columns.map(key => (key.field));
    const filteredcolumnsdata = filteredColumns.map(key => (key.field));
    const header = statusvalue === "pending" || statusvalue === "Cancelled" ? filteredcolumnsdata : fullcoumndata;
    const body = rows.map(row => {
      const rowData = [];
      header.forEach(columnName => {
        // Assuming row[columnName] exists and contains the value
        rowData.push(row[columnName]);
      });
      return rowData;
    });
    let fontdata = 1;
    if (header.length <= 13) {
      fontdata = 16;
    }
    else if (header.length >= 14 && header.length <= 18) {
      fontdata = 11;
    }
    else if (header.length >= 19 && header.length <= 20) {
      fontdata = 10;
    } else if (header.length >= 21 && header.length <= 23) {
      fontdata = 9;
    }
    else if (header.length >= 24 && header.length <= 26) {
      fontdata = 6.5;
    }
    else if (header.length >= 27 && header.length <= 30) {
      fontdata = 6;
    }
    else if (header.length >= 31 && header.length <= 33) {
      fontdata = 4;
    } else if (header.length >= 34 && header.length <= 35) {
      fontdata = 3;
    }
    else if (header.length >= 36 && header.length <= 40) {
      fontdata = 3;
    }
    else if (header.length >= 41 && header.length <= 46) {
      fontdata = 2;
    }
    else if (header.length >= 47 && header.length <= 50) {
      fontdata = 2;
    }

    pdf.autoTable({
      head: [header],
      body: body,
      startY: 20,
      headStyles: {
        // fontSize: 5,
        fontSize: fontdata,
        cellPadding: 1.5, // Decrease padding in header
        minCellHeigh: 8,
        valign: 'middle',
        font: 'helvetica', // Set font type for body
        cellWidth: 'wrap',
        // cellWidth: 'auto'
      },

      bodyStyles: {
        fontSize: fontdata - 1,
        valign: 'middle',
        cellWidth: 'auto'
        // Adjust the font size for the body
      },
      columnWidth: 'auto'
    });
    const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
    // Scale content
    pdf.scale(scaleFactor, scaleFactor);
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'pending Reports.pdf');
  };
  
  const handleInputChange = (event, newValue) => {
    setdepartment(newValue);
  }
  const handlestatusChange = (event, newValue) => {
    setStatusValue(newValue ? newValue.label : "");
  };
  const handleVechicleNoChange = (event, newValue) => {
    setVehNo(newValue ? newValue?.label : "")
  }
  const handleCustomerChange = (event, newValue) => {
    setCutomerName(newValue)
  }
  const reversedRows = [...rows].reverse();  // to reverse 

  // new working code
  const handleShow = useCallback(async () => {
   


    
    setLoading(true)
    console.log(isStations,"Station names ")
    if (!statusvalue) {
      setError(true);
      setErrorMessage("ENTER THE STATUS");
      setLoading(false)
      return;
    }
    setRows([]); // Clear rows to show empty grid
    try {
      // const response = await axios.get(
      //   `${apiUrl}/pending_tripsheet-show?department=${department.map(dep => dep.label).join(',')}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(toDate.toISOString())}&status=${encodeURIComponent(statusvalue)}&VehNo=${encodeURIComponent(VehNo)}&cutomerName=${cutomerName.map(dep => dep.label).join(',')}`
      // );
     
      //  console.log(stationsParam ,'stationsParam')
       console.log(isStations ,'isstationsParam')
       const filteredStations = isStations
    .filter(station => station.Stationname !== 'All')
    .map(station => station.Stationname);

console.log(filteredStations,'station values'); // ['Mumbai', 'chennai']


      const response = await axios.get(
        `${apiUrl}/pending_tripsheet-show?department=${department.map(dep => dep.label).join(',')}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(toDate.toISOString())}&status=${encodeURIComponent(statusvalue)}&VehNo=${encodeURIComponent(VehNo)}&cutomerName=${cutomerName.map(dep => dep.label).join(',')}&isStations=${filteredStations}`
      );
     
      const data = response.data;
      if(data && data.length > 0){
        setLoading(false); // Stop loading
    }
    console.log(data,'booking datas');
    
  
      if (statusvalue !== "All") {
        if (data.length > 0) {
          const rowsWithUniqueId = data.map((row, index) => ({
            ...row,
            id5: index + 1,
          }));
          setRows(rowsWithUniqueId);
          setColumnShowall(false);
          setSuccess(true);
          setSuccessMessage("Successfully listed");
        } else {
          setRows([]);
          setError(true);
          setErrorMessage("No data found");
        }
      } else {
        if (data && Array.isArray(data.tripsheet) && Array.isArray(data.booking)) {
          // Process tripsheet data
          const tripsheetRowsWithUniqueId = data.tripsheet.map((row, index) => ({
            ...row,
           // id5: `tripsheet-${index + 1}`, // Unique ID for tripsheet
          }));
          // Process booking data
          const bookingRowsWithUniqueId = data.booking.map((row, index) => ({
            ...row,
           // id5: `booking-${index + 1}`, // Unique ID for booking
          }));
          // Combine both sets of data
          // const combinedRows = [...tripsheetRowsWithUniqueId, ...bookingRowsWithUniqueId];
          const combinedRows = [...tripsheetRowsWithUniqueId, ...bookingRowsWithUniqueId].map((row, index) => ({
            ...row,
            id5: index + 1, // S.No for combined rows
          }))
          setRows(combinedRows);
          setColumnShowall(false);
          setSuccess(true);
          setSuccessMessage("Successfully listed");
        } else {
          setRows([]);
          setError(true);
          setErrorMessage("No data found");
        }
      }
    }
    //  catch (error) {
    //   // console.error("Error retrieving data:", error); 
    //   setRows([]);
    //   // setError(true);
    //   // setErrorMessage("Error retrieving data");
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
          setErrorMessage("Failed to Show: " + (error.response.data.message || error.message));
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
      }
  }
    finally {
      setLoading(false); // Stop loading
    
   }
  }, [department, fromDate, toDate, apiUrl, statusvalue, cutomerName, VehNo]);
  

//   const handleShowAll = async () => {
//     setLoading(true)
//     setColumnShowall(false)
//     setRows([]); // Clear rows to show empty grid
//     try {
//       const filteredStations = isStations
//       .filter(station => station.Stationname !== 'All')
//       .map(station => station.Stationname);
//       // const response = await axios.get( `${apiUrl}/tripsheet-showall}?isStations=${filteredStations}` );
//       const response = await axios.get(`${apiUrl}/tripsheet-showall?isStations=${filteredStations}`);

//       const data = response.data;
//       if(data && data.length > 0){
//         setLoading(false); // Stop loading
//     }

//       if (data && data.tripsheet && data.booking) {
//         // Process tripsheet data
//         const tripsheetRowsWithUniqueId = data.tripsheet.map((row, index) => ({
//           ...row,
//           id1: index + 1,
//         }));
//         // Process booking data
//         const bookingRowsWithUniqueId = data.booking.map((row, index) => ({
//           ...row,
//           id1: index + 1,
//         }));
//         // Combine both sets of data
//         const combinedRows = [...tripsheetRowsWithUniqueId, ...bookingRowsWithUniqueId];
//         const tripsheetRowsWithUniqueId2 = combinedRows.map((row, index) => ({
//           ...row,
//           id5: index + 1,
//         }));
//         setRows(tripsheetRowsWithUniqueId2);
//         setSuccess(true);
//         setSuccessMessage("Successfully listed");
//       } else {
//         setRows([]);
//         setError(true);
//         setErrorMessage("no data found")
//       }
//     } 
//     // catch {
//     //   setRows([]);
//     //   // setError(true);
//     //   // setErrorMessage("Check your Network Connection");
//     // }
//     catch (error) {
//       // console.error("Error occurredddddd:", error);
   
//       // Check if there's no response, indicating a network error
//       if (error.message ) {
//           setError(true);
//           setErrorMessage("Check your Network Connection");
//           // console.log('Network error');
//       } else if (error.response) {
//           setError(true);
//           // Handle other Axios errors (like 4xx or 5xx responses)
//           setErrorMessage("Failed to Show : " + (error.response.data.message || error.message));
//       } else {
//           // Fallback for other errors
//           setError(true);
//           setErrorMessage("An unexpected error occurred: " + error.message);
//       }
//   }
//     finally {
//       setLoading(false); // Stop loading
    
   
// }
  // };
  const handleShowAll = async () => {
    setLoading(true);
    setColumnShowall(false);
    setRows([]); // Clear rows to show empty grid
  
    try {
      const filteredStations = isStations
        .filter(station => station.Stationname !== 'All')
        .map(station => station.Stationname);
  
      // Convert the array of station names to a comma-separated string
      const stationQueryString = filteredStations.join(',');
  
      const response = await axios.get(`${apiUrl}/tripsheet-showall?isStation=${stationQueryString}`);
  
      const data = response.data;
  
      if (data && data.length > 0) {
        setLoading(false); // Stop loading
      }
  
      if (data && data.tripsheet && data.booking) {
        // Process tripsheet data
        const tripsheetRowsWithUniqueId = data.tripsheet.map((row, index) => ({
          ...row,
          id1: index + 1,
        }));
  
        // Process booking data
        const bookingRowsWithUniqueId = data.booking.map((row, index) => ({
          ...row,
          id1: index + 1,
        }));
  
        // Combine both sets of data
        const combinedRows = [...tripsheetRowsWithUniqueId, ...bookingRowsWithUniqueId];
  
        const tripsheetRowsWithUniqueId2 = combinedRows.map((row, index) => ({
          ...row,
          id5: index + 1,
        }));
  
        setRows(tripsheetRowsWithUniqueId2);
        setSuccess(true);
        setSuccessMessage("Successfully listed");
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("No data found");
      }
    } catch (error) {
      // Handle errors
      if (error.message) {
        setError(true);
        setErrorMessage("Check your Network Connection");
      } else if (error.response) {
        setError(true);
        setErrorMessage("Failed to Show : " + (error.response.data.message || error.message));
      } else {
        setError(true);
        setErrorMessage("An unexpected error occurred: " + error.message);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  const handleButtonClick = (row) => {
    if (row.status === "Cancelled") {
      setError(true);
      setErrorMessage("booking cancelled")
      return
    }
    setSelectedRow(row);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedRow(null);
    setPopupOpen(false);
  };

  const dataget = async (bookingno) => {
    const bookdatano = bookingno
    const responsedata = await axios.get(`${apiUrl}/getdatafromboookingvalue/${bookdatano}`)
    return responsedata.data[0]
  }
  const handleTripsheetClick = async () => {
    const dispatchcheck = "true";
    const calcPackageString = selectedRow.calcPackage ? encodeURIComponent(selectedRow.calcPackage.toString()) : '';
    const vendorcalcPackageString = selectedRow.Vendor_Calcpackage ? encodeURIComponent(selectedRow.Vendor_Calcpackage.toString()) : '';
    const customerdata = selectedRow.customer ? encodeURIComponent(selectedRow.customer.toString()) : '';
    // const bookingPageUrl = `/home/bookings/tripsheet?dispatchcheck=${dispatchcheck}&travelsname=${selectedRow.travelsname}&travelsemail=${selectedRow.travelsemail}&vehicleName=${selectedRow.vehType}&tripid=${selectedRow.tripid || ''}&bookingno=${selectedRow.bookingno || ''}&status=${selectedRow.status || ''}&billingno=${selectedRow.billingno || ''}&apps=${selectedRow.apps || ''}&customer=${selectedRow.customer || ''}&orderedby=${selectedRow.orderedby || ''}&mobile=${selectedRow.orderByMobileNo || ''}&guestname=${selectedRow.guestname || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&employeeno=${selectedRow.employeeno || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&orderbyemail=${selectedRow.orderbyemail || ''}&address1=${selectedRow.address1 || ''}&hireTypes=${selectedRow.hireTypes || ''}&department=${selectedRow.department || selectedRow.servicestation}&vehRegNo=${selectedRow.vehRegNo || ''}&vehType=${selectedRow.vehiclemodule || ''}&driverName=${selectedRow.driverName || ''}&mobileNo=${selectedRow.mobileNo || ''}&driversmsexbetta=${selectedRow.driversmsexbetta || ''}&gps=${selectedRow.gps || ''}&duty=${selectedRow.duty || ''}&pickup=${selectedRow.pickup || ''}&useage=${selectedRow.useage || ''}&request=${selectedRow.request || selectedRow.registerno}&startdate=${selectedRow.startdate || ''}&closedate=${selectedRow.closedate || ''}&totaldays=${selectedRow.totaldays || ''}&employeeno=${selectedRow.employeeno || ''}&reporttime=${selectedRow.reporttime || ''}&shedintime=${selectedRow.shedintime || ''}&shedkm=${selectedRow.shedkm || ''}&shedin=${selectedRow.shedin || ''}&shedout=${selectedRow.shedout || ''}&starttime=${selectedRow.starttime || ''}&closetime=${selectedRow.closetime || ''}&additionaltime=${selectedRow.additionaltime || ''}&advancepaidtovendor=${selectedRow.advancepaidtovendor || selectedRow.advance}&customercode=${selectedRow.customercode || ''}&startkm=${selectedRow.startkm || ''}&closekm=${selectedRow.closekm || ''}&permit=${selectedRow.permit || ''}&parking=${selectedRow.parking || ''}&toll=${selectedRow.toll || ''}&vpermettovendor=${selectedRow.vpermettovendor || ''}&vendortoll=${selectedRow.vendortoll || ''}&customeradvance=${selectedRow.customeradvance || ''}&email1=${selectedRow.email1 || ''}&remark=${selectedRow.remark || ''}&smsguest=${selectedRow.smsguest || ''}&documentnotes=${selectedRow.documentnotes || ''}&VendorTripNo=${selectedRow.VendorTripNo || ''}&vehicles=${selectedRow.vehicles || ''}&duty1=${selectedRow.duty1 || ''}&startdate1=${selectedRow.startdate1 || ''}&closedate1=${selectedRow.closedate1 || ''}&totaldays1=${selectedRow.totaldays1 || ''}&locks=${selectedRow.locks || ''}&starttime2=${selectedRow.starttime2 || ''}&closetime2=${selectedRow.closetime2 || ''}&totaltime=${selectedRow.totaltime || ''}&startkm1=${selectedRow.startkm1 || ''}&closekm1=${selectedRow.closekm1 || ''}&totalkm1=${selectedRow.totalkm1 || ''}&remark1=${selectedRow.remark1 || ''}&escort=${selectedRow.escort || "No"}&transferreport=${selectedRow.transferreport || "No"}&calcPackage=${calcPackageString}&extraHR=${selectedRow.extraHR || ''}&extraKM=${selectedRow.extraKM || ''}&package_amount=${selectedRow.package_amount || ''}&extrakm_amount=${selectedRow.extrakm_amount || ''}&extrahr_amount=${selectedRow.extrahr_amount || ''}&ex_kmAmount=${selectedRow.ex_kmAmount || ''}&ex_hrAmount=${selectedRow.ex_hrAmount || ''}&nightBta=${selectedRow.nightBta || ''}&nightCount=${selectedRow.nightCount || ''}&night_totalAmount=${selectedRow.night_totalAmount || ''}&driverBeta=${selectedRow.driverBeta}&driverbeta_Count=${selectedRow.driverbeta_Count || ''}&driverBeta_amount=${selectedRow.driverBeta_amount || ''}&totalcalcAmount=${selectedRow.totalcalcAmount || ''}&vehcommission=${selectedRow.vehcommission || ''}&caramount1=${selectedRow.caramount1 || ''}&manualbills=${selectedRow.manualbills || ''}&pack=${selectedRow.pack || ''}&amount5=${selectedRow.amount5 || ''}&exkm1=${selectedRow.exkm1 || ''}&amount6=${selectedRow.amount6 || ''}&exHrs1=${selectedRow.exHrs1 || ''}&amount7=${selectedRow.amount7 || ''}&night1=${selectedRow.night1 || ''}&amount8=${selectedRow.amount8 || ''}&driverconvenience1=${selectedRow.driverconvenience1 || ''}&amount9=${selectedRow.amount9 || ''}&rud=${selectedRow.rud || ''}&netamount1=${selectedRow.netamount1 || ''}&discount=${selectedRow.discount || ''}&ons=${selectedRow.ons || ''}&manualbills1=${selectedRow.manualbills1 || ''}&balance=${selectedRow.balance || ''}&fcdate=${selectedRow.fcdate || ''}&taxdate=${selectedRow.taxdate || ''}&insdate=${selectedRow.insdate || ''}&stpermit=${selectedRow.stpermit || ''}&maintenancetype=${selectedRow.maintenancetype || ''}&kilometer=${selectedRow.kilometer || ''}&selects=${selectedRow.selects || ''}&documenttype=${selectedRow.documenttype || ''}&on1=${selectedRow.on1 || ''}&smsgust=${selectedRow.smsgust || ''}&booker=${selectedRow.booker || ''}&emailcheck=${selectedRow.emailcheck || ''}&valueprint=${selectedRow.valueprint || ''}&manualbillss=${selectedRow.manualbillss || ''}&reload=${selectedRow.reload || ''}&Groups=${selectedRow.Groups || ''}&orderbyemail=${selectedRow.orderbyemail || ''}&vendor_vehicle=${selectedRow.vendor_vehicle || ""}&vendor_duty=${selectedRow.vendor_duty || ""}&vendorshedOutDate=${selectedRow.vendorshedOutDate || ""}&vendorshedInDate=${selectedRow.vendorshedInDate || ""}&vendortotaldays=${selectedRow.vendortotaldays || ""}&vendorreporttime=${selectedRow.vendorreporttime || ""}&vendorshedintime=${selectedRow.vendorshedintime || ""}&vendorTotaltime=${selectedRow.vendorTotaltime || ""}&vendorshedoutkm=${selectedRow.vendorshedoutkm || ""}&vendorshedinkm=${selectedRow.vendorshedinkm || ""}&vendortotalkm=${selectedRow.vendortotalkm || ""}&vendorRemarks=${selectedRow.vendorRemarks || ""}&Vendor_Calcpackage=${vendorcalcPackageString}&Vendor_rateAmount=${selectedRow.Vendor_rateAmount || 0}&Vendor_ExtraKms=${selectedRow.Vendor_ExtraKms || 0}&Vendor_ExtraAmountKms=${selectedRow.Vendor_ExtraAmountKms || 0}&Vendor_totalAmountKms=${selectedRow.Vendor_totalAmountKms || 0}&Vendor_ExtraHours=${selectedRow.Vendor_ExtraHours || 0}&Vendor_ExtraAmountHours=${selectedRow.Vendor_ExtraAmountHours || 0}&Vendor_totalAmountHours=${selectedRow.Vendor_totalAmountHours || 0}&Vendor_NightHALT=${selectedRow.Vendor_NightHALT || 0}&Vendor_NightBataAmount=${selectedRow.Vendor_NightBataAmount || 0}&Vendor_NightbataTotalAmount=${selectedRow.Vendor_NightbataTotalAmount || 0}&Vendor_Bata=${selectedRow.Vendor_Bata || 0}&Vendor_BataAmount=${selectedRow.Vendor_BataAmount || 0}&Vendor_BataTotalAmount=${selectedRow.Vendor_BataTotalAmount || 0}&Vendor_FULLTotalAmount=${selectedRow.Vendor_FULLTotalAmount || 0}`;
    const bookingPageUrl = `/home/bookings/tripsheet?dispatchcheck=${dispatchcheck}&travelsname=${selectedRow.travelsname || ""}&travelsemail=${selectedRow.travelsemail || ""}&vehicleName=${selectedRow.vehicleName || ""}&vehicleName2=${selectedRow.vehicleName2 || selectedRow.vehicleName || ""}&tripid=${selectedRow.tripid || ''}&bookingno=${selectedRow.bookingno || ''}&status=${selectedRow.status || ''}&billingno=${selectedRow.billingno || ''}&apps=${selectedRow.apps || ''}&customer=${customerdata}&orderedby=${selectedRow.orderedby || ''}&mobile=${selectedRow.mobile || selectedRow.orderByMobileNo || ''}&guestname=${selectedRow.guestname || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&employeeno=${selectedRow.employeeno || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&orderbyemail=${selectedRow.orderbyemail || selectedRow.orderByEmail || ''}&address1=${selectedRow.address1 || ''}&hireTypes=${selectedRow.hireTypes || ''}&department=${selectedRow.department || selectedRow.servicestation}&vehRegNo=${selectedRow.vehRegNo || ''}&vehType=${selectedRow.vehType || selectedRow.vehiclemodule || ""}&driverName=${selectedRow.driverName || ''}&mobileNo=${selectedRow.mobileNo || ''}&driversmsexbetta=${selectedRow.driversmsexbetta || ''}&gps=${selectedRow.gps || ''}&duty=${selectedRow.duty || ''}&pickup=${selectedRow.pickup || ''}&useage=${selectedRow.useage || ''}&request=${selectedRow.request || selectedRow.registerno}&startdate=${selectedRow.startdate || ''}&closedate=${selectedRow.closedate || ''}&totaldays=${selectedRow.totaldays || ''}&employeeno=${selectedRow.employeeno || ''}&shedOutDate=${selectedRow.shedOutDate || ''}&shedInDate=${selectedRow.shedInDate || ''}&reporttime=${selectedRow.reporttime || ''}&shedintime=${selectedRow.shedintime || ''}&shedkm=${selectedRow.shedkm || ''}&shedin=${selectedRow.shedin || ''}&shedout=${selectedRow.shedout || ''}&starttime=${selectedRow.starttime || ''}&closetime=${selectedRow.closetime || ''}&additionaltime=${selectedRow.additionaltime || ''}&advancepaidtovendor=${selectedRow.advancepaidtovendor || ""}&customercode=${selectedRow.customercode || ''}&startkm=${selectedRow.startkm || ''}&closekm=${selectedRow.closekm || ''}&permit=${selectedRow.permit || ''}&parking=${selectedRow.parking || ''}&toll=${selectedRow.toll || ''}&vpermettovendor=${selectedRow.vpermettovendor || ''}&vendortoll=${selectedRow.vendortoll || ''}&customeradvance=${selectedRow.customeradvance || selectedRow.advance || ''}&email1=${selectedRow.email1 || ''}&remark=${selectedRow.remark || selectedRow.remarks || ''}&smsguest=${selectedRow.smsguest || ''}&documentnotes=${selectedRow.documentnotes || ''}&VendorTripNo=${selectedRow.VendorTripNo || ''}&vehicles=${selectedRow.vehicles || ''}&duty1=${selectedRow.duty1 || ''}&startdate1=${selectedRow.startdate1 || ''}&closedate1=${selectedRow.closedate1 || ''}&totaldays1=${selectedRow.totaldays1 || ''}&locks=${selectedRow.locks || ''}&starttime2=${selectedRow.starttime2 || ''}&closetime2=${selectedRow.closetime2 || ''}&totaltime=${selectedRow.totaltime || ''}&startkm1=${selectedRow.startkm1 || ''}&closekm1=${selectedRow.closekm1 || ''}&totalkm1=${selectedRow.totalkm1 || ''}&remark1=${selectedRow.remark1 || ''}&escort=${selectedRow.escort || "No"}&transferreport=${selectedRow.transferreport || "No"}&calcPackage=${calcPackageString}&extraHR=${selectedRow.extraHR || ''}&extraKM=${selectedRow.extraKM || ''}&package_amount=${selectedRow.package_amount || ''}&extrakm_amount=${selectedRow.extrakm_amount || ''}&extrahr_amount=${selectedRow.extrahr_amount || ''}&ex_kmAmount=${selectedRow.ex_kmAmount || ''}&ex_hrAmount=${selectedRow.ex_hrAmount || ''}&nightBta=${selectedRow.nightBta || ''}&nightCount=${selectedRow.nightCount || ''}&night_totalAmount=${selectedRow.night_totalAmount || ''}&driverBeta=${selectedRow.driverBeta}&driverbeta_Count=${selectedRow.driverbeta_Count || ''}&driverBeta_amount=${selectedRow.driverBeta_amount || ''}&totalcalcAmount=${selectedRow.totalcalcAmount || ''}&vehcommission=${selectedRow.vehcommission || ''}&caramount1=${selectedRow.caramount1 || ''}&manualbills=${selectedRow.manualbills || ''}&pack=${selectedRow.pack || ''}&amount5=${selectedRow.amount5 || ''}&exkm1=${selectedRow.exkm1 || ''}&amount6=${selectedRow.amount6 || ''}&exHrs1=${selectedRow.exHrs1 || ''}&amount7=${selectedRow.amount7 || ''}&night1=${selectedRow.night1 || ''}&amount8=${selectedRow.amount8 || ''}&driverconvenience1=${selectedRow.driverconvenience1 || ''}&amount9=${selectedRow.amount9 || ''}&rud=${selectedRow.rud || ''}&netamount1=${selectedRow.netamount1 || ''}&discount=${selectedRow.discount || ''}&ons=${selectedRow.ons || ''}&manualbills1=${selectedRow.manualbills1 || ''}&balance=${selectedRow.balance || ''}&fcdate=${selectedRow.fcdate || ''}&taxdate=${selectedRow.taxdate || ''}&insdate=${selectedRow.insdate || ''}&stpermit=${selectedRow.stpermit || ''}&maintenancetype=${selectedRow.maintenancetype || ''}&kilometer=${selectedRow.kilometer || ''}&selects=${selectedRow.selects || ''}&documenttype=${selectedRow.documenttype || ''}&on1=${selectedRow.on1 || ''}&smsgust=${selectedRow.smsgust || ''}&booker=${selectedRow.booker || ''}&emailcheck=${selectedRow.emailcheck || ''}&valueprint=${selectedRow.valueprint || ''}&manualbillss=${selectedRow.manualbillss || ''}&reload=${selectedRow.reload || ''}&Groups=${selectedRow.Groups || ''}&orderbyemail=${selectedRow.orderbyemail || ''}&vendor_vehicle=${selectedRow.vendor_vehicle || selectedRow?.vehicleName || ""}&vendor_duty=${selectedRow?.vendor_duty || selectedRow?.duty || ""}&vendor_ratename=${selectedRow?.vendor_ratename || selectedRow?.ratenamebook || ""}&vendor_vpermettovendor=${selectedRow?.vpermettovendor || ""}&vendor_advancepaidtovendor=${selectedRow?.advancepaidtovendor || ""}&vendor_toll=${selectedRow?.vendortoll || ""}&vendorshedOutDate=${selectedRow.vendorshedOutDate || selectedRow.shedOutDate || ""}&vendorshedInDate=${selectedRow.vendorshedInDate || ""}&vendortotaldays=${selectedRow.vendortotaldays || ""}&vendorreporttime=${selectedRow.vendorreporttime || selectedRow.reporttime}&vendorshedintime=${selectedRow.vendorshedintime || ""}&vendorTotaltime=${selectedRow.vendorTotaltime || ""}&vendorshedoutkm=${selectedRow.vendorshedoutkm || ""}&vendorshedinkm=${selectedRow.vendorshedinkm || ""}&vendortotalkm=${selectedRow.vendortotalkm || ""}&vendorRemarks=${selectedRow.vendorRemarks || selectedRow.remarks || ""}&Vendor_Calcpackage=${vendorcalcPackageString}&Vendor_rateAmount=${selectedRow.Vendor_rateAmount || 0}&Vendor_ExtraKms=${selectedRow.Vendor_ExtraKms || 0}&Vendor_ExtraAmountKms=${selectedRow.Vendor_ExtraAmountKms || 0}&Vendor_totalAmountKms=${selectedRow.Vendor_totalAmountKms || 0}&Vendor_ExtraHours=${selectedRow.Vendor_ExtraHours || 0}&Vendor_ExtraAmountHours=${selectedRow.Vendor_ExtraAmountHours || 0}&Vendor_totalAmountHours=${selectedRow.Vendor_totalAmountHours || 0}&Vendor_NightHALT=${selectedRow.Vendor_NightHALT || 0}&Vendor_NightBataAmount=${selectedRow.Vendor_NightBataAmount || 0}&Vendor_NightbataTotalAmount=${selectedRow.Vendor_NightbataTotalAmount || 0}&Vendor_Bata=${selectedRow.Vendor_Bata || 0}&Vendor_BataAmount=${selectedRow.Vendor_BataAmount || 0}&Vendor_BataTotalAmount=${selectedRow.Vendor_BataTotalAmount || 0}&Vendor_FULLTotalAmount=${selectedRow.Vendor_FULLTotalAmount || 0}`;
    window.location.href = await bookingPageUrl;
  }

  const handleButtontripsheet = () => {
    window.location.href = '/home/bookings/tripsheet';
  };


  const handleBookingClick = async () => {

    const dispatchcheck = "true";
    const selectedRow1 = await dataget(selectedRow.tripid)
    const customerdata = selectedRow1.customer ? encodeURIComponent(selectedRow1.customer.toString()) : '';
    const bookingPageUrl = `/home/bookings/booking?dispatchcheck=${dispatchcheck}&ratenamebook=${selectedRow1?.ratenamebook || ""}&paymenttype=${selectedRow1?.paymenttype || ''}&bookingdate=${selectedRow1?.bookingdate}&advance=${selectedRow1?.advance}&remarks=${selectedRow1?.remarks}&vehiclemodule=${selectedRow1?.vehiclemodule}&flightno=${selectedRow1?.flightno}&vehicleName=${selectedRow1?.vehicleName || ""}&Groups=${selectedRow1?.Groups}&servicestation=${selectedRow1?.servicestation}&registerno=${selectedRow1?.registerno}&travelsname=${selectedRow1?.travelsname || ""}&travelsemail=${selectedRow1?.travelsemail || ""}&tripid=${selectedRow1?.tripid || ''}&bookingno=${selectedRow1?.bookingno || ''}&status=${selectedRow1?.status || ''}&billingno=${selectedRow1?.billingno || ''}&apps=${selectedRow1?.apps || ''}&customer=${customerdata || ''}&orderedby=${selectedRow1?.orderedby || ''}&mobile=${selectedRow1?.mobile || selectedRow1?.orderByMobileNo || ''}&guestname=${selectedRow1?.guestname || ''}&guestmobileno=${selectedRow1?.guestmobileno || ''}&email=${selectedRow1?.email || ''}&employeeno=${selectedRow1?.employeeno || ''}&guestmobileno=${selectedRow1?.guestmobileno || ''}&orderbyemail=${selectedRow1?.orderbyemail || selectedRow1?.orderByEmail || ''}&address1=${selectedRow1?.address1 || ''}&hireTypes=${selectedRow1?.hireTypes || ''}&department=${selectedRow1?.department || selectedRow1?.servicestation}&vehRegNo=${selectedRow1?.vehRegNo || ''}&driverName=${selectedRow1?.driverName || ''}&mobileNo=${selectedRow1?.mobileNo || ''}&gps=${selectedRow1?.gps || ''}&duty=${selectedRow1?.duty || ''}&pickup=${selectedRow1?.pickup || ''}&useage=${selectedRow1?.useage || ''}&request=${selectedRow1?.request || selectedRow1?.registerno}&startdate=${selectedRow1?.startdate || ''}&employeeno=${selectedRow1?.employeeno || ''}&shedOutDate=${selectedRow1?.shedOutDate || ''}&shedInDate=${selectedRow1?.shedInDate || ''}&reporttime=${selectedRow1?.reporttime || ''}&shedintime=${selectedRow1?.shedintime || ''}&starttime=${selectedRow1?.starttime || ''}&customercode=${selectedRow1?.customercode || ''}&customeradvance=${selectedRow1?.customeradvance || selectedRow1?.advance || ''}&documentnotes=${selectedRow1?.documentnotes || ''}&vehicles=${selectedRow1?.vehicles || ''}&bookingtime=${selectedRow1?.bookingtime || ""}`;
    window.location.href = await bookingPageUrl;
  }

  return {
    fromDate, statusvalue, handlestatusChange, setCutomerName, setVehNo,
    setFromDate,
    toDate,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    infoMessage,
    setToDate,
    handleShow,
    handleShowAll,
    department,
    hidePopup,
    handleInputChange,
    handleButtontripsheet,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    handleButtonClick,
    popupOpen,
    handlePopupClose,
    selectedRow,
    handleTripsheetClick,
    columns, handleBookingClick,
    filteredColumns,
    columnshowall, VehNo, cutomerName, handleVechicleNoChange, handleCustomerChange,loading,setLoading,isStations,setisStations
  };
};

export default useDispatched;