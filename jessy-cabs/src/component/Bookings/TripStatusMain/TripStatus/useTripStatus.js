import { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import { APIURL } from "../../../url";
import Excel from 'exceljs';


const columns = [
  { field: "id5", headerName: "Sno", width: 50 },
  { field: "status", headerName: "Status", width: 110 },
  { field: "bookingno", headerName: "Booking ID", width: 110 },
  { field: "tripid", headerName: "Tripsheet No", width: 110 },
  { field: "bookingdate", headerName: "Start Date", width: 120, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
  { field: "startdate", headerName: "Start Date", width: 120, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
  { field: "guestname", headerName: "Guest Name", width: 160 },
  { field: "address1", headerName: "Address", width: 130 },
  { field: "customer", headerName: "Company", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "employeeno", headerName: "EmployeeNO", width: 130 },
  { field: "report", headerName: "Report", width: 130 },
  { field: "vehType", headerName: "vechicleType", width: 130 },
  { field: "paymenttype", headerName: "PaymentType", width: 130 },
  { field: "starttime", headerName: "StartTime", width: 130 },
  { field: "reporttime", headerName: "Report", width: 130 },
  { field: "duty", headerName: "Duty", width: 130 },
  { field: "pickup", headerName: "Pickup", width: 130 },
  { field: "customercode", headerName: "customercode", width: 130 },
  { field: "registerno", headerName: "registerNo", width: 130 },
  { field: "flightno", headerName: "flightNo", width: 130 },
  { field: "orderbyemail", headerName: "OrderedBy_Email", width: 130 },
  { field: "remarks", headerName: "Remark", width: 130 },
  { field: "servicestation", headerName: "Station", width: 130 },
  { field: "advance", headerName: "Advance", width: 130 },
  { field: "totaltime", headerName: "Totalhrs", width: 130 },
  { field: "totalkm1", headerName: "TotalKm1", width: 130 },
  { field: "toll", headerName: "Toll", width: 130 },
  { field: "permit", headerName: "Permit", width: 130 },
  { field: "parking", headerName: "Parking", width: 130 },
  { field: "totalcalcAmount", headerName: "TotalAmount", width: 130 },
];

const useDispatched = () => {
  const apiUrl = APIURL;
  const [rows, setRows] = useState([]);
  const [department, setdepartment] = useState("");
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
      //         worksheet.columns = columnsexcel

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
    setdepartment(newValue ? newValue.label : '');
  };

  const handlestatusChange = (event, newValue) => {
    setStatusValue(newValue ? newValue.label : "");
  };


  const reversedRows = [...rows].reverse();  // to reverse 

  const handleShow = useCallback(async () => {
    if (!statusvalue) {
      setError(true)
      setErrorMessage("ENTER THE STATUS")
      return
    }
    try {
      const response = await axios.get(
        `${apiUrl}/pending_tripsheet-show?department=${encodeURIComponent(
          department
        )}&fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
          toDate.toISOString()
        )}&status=${encodeURIComponent(statusvalue)}`
      );
      const data = response.data;

      if (data.length > 0) {
        const rowsWithUniqueId = data.map((row, index) => ({
          ...row,
          id5: index + 1,
        }));
        setRows(rowsWithUniqueId)
        setColumnShowall(false)
        setSuccess(true);
        setSuccessMessage("successfully listed")
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("no data found")
      }
    } catch {
      setRows([]);
      setError(true);
      setErrorMessage("Error retrieving data");
    }

  }, [department, fromDate, toDate, apiUrl, statusvalue]);

  const handleShowAll = async () => {
    setColumnShowall(false)
    try {
      const response = await axios.get(
        `${apiUrl}/tripsheet-showall`
      );

      const data = response.data;

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
        setErrorMessage("no data found")
      }
    } catch {
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
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


  const handleTripsheetClick = async () => {
    const dispatchcheck = "true";
    console.log("selectedRow", selectedRow)
    const calcPackageString = selectedRow.calcPackage ? encodeURIComponent(selectedRow.calcPackage.toString()) : '';

    const bookingPageUrl = `/home/bookings/tripsheet?dispatchcheck=${dispatchcheck}&travelsname=${selectedRow.travelsname}&travelsemail=${selectedRow.travelsemail}&vehicleName=${selectedRow.vehType}&tripid=${selectedRow.tripid || ''}&bookingno=${selectedRow.bookingno || ''}&status=${selectedRow.status || ''}&billingno=${selectedRow.billingno || ''}&apps=${selectedRow.apps || ''}&customer=${selectedRow.customer || ''}&orderedby=${selectedRow.orderedby || ''}&mobile=${selectedRow.mobile || ''}&guestname=${selectedRow.guestname || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&employeeno=${selectedRow.employeeno || ''}&guestmobileno=${selectedRow.guestmobileno || ''}&email=${selectedRow.email || ''}&address1=${selectedRow.address1 || ''}&hireTypes=${selectedRow.hireTypes || ''}&department=${selectedRow.department || selectedRow.servicestation}&vehRegNo=${selectedRow.vehRegNo || ''}&vehType=${selectedRow.vehiclemodule || ''}&driverName=${selectedRow.driverName || ''}&mobileNo=${selectedRow.mobileNo || ''}&driversmsexbetta=${selectedRow.driversmsexbetta || ''}&gps=${selectedRow.gps || ''}&duty=${selectedRow.duty || ''}&pickup=${selectedRow.pickup || ''}&useage=${selectedRow.useage || ''}&request=${selectedRow.request || selectedRow.registerno}&startdate=${selectedRow.startdate || ''}&closedate=${selectedRow.closedate || ''}&totaldays=${selectedRow.totaldays || ''}&employeeno=${selectedRow.employeeno || ''}&reporttime=${selectedRow.reporttime || ''}&shedintime=${selectedRow.shedintime || ''}&shedkm=${selectedRow.shedkm || ''}&shedin=${selectedRow.shedin || ''}&shedout=${selectedRow.shedout || ''}&starttime=${selectedRow.starttime || ''}&closetime=${selectedRow.closetime || ''}&additionaltime=${selectedRow.additionaltime || ''}&advancepaidtovendor=${selectedRow.advancepaidtovendor || selectedRow.advance}&customercode=${selectedRow.customercode || ''}&startkm=${selectedRow.startkm || ''}&closekm=${selectedRow.closekm || ''}&permit=${selectedRow.permit || ''}&parking=${selectedRow.parking || ''}&toll=${selectedRow.toll || ''}&vpermettovendor=${selectedRow.vpermettovendor || ''}&vendortoll=${selectedRow.vendortoll || ''}&customeradvance=${selectedRow.customeradvance || ''}&email1=${selectedRow.email1 || ''}&remark=${selectedRow.remark || ''}&smsguest=${selectedRow.smsguest || ''}&documentnotes=${selectedRow.documentnotes || ''}&VendorTripNo=${selectedRow.VendorTripNo || ''}&vehicles=${selectedRow.vehicles || ''}&duty1=${selectedRow.duty1 || ''}&startdate1=${selectedRow.startdate1 || ''}&closedate1=${selectedRow.closedate1 || ''}&totaldays1=${selectedRow.totaldays1 || ''}&locks=${selectedRow.locks || ''}&starttime2=${selectedRow.starttime2 || ''}&closetime2=${selectedRow.closetime2 || ''}&totaltime=${selectedRow.totaltime || ''}&startkm1=${selectedRow.startkm1 || ''}&closekm1=${selectedRow.closekm1 || ''}&totalkm1=${selectedRow.totalkm1 || ''}&remark1=${selectedRow.remark1 || ''}&escort=${selectedRow.escort || "No"}&transferreport=${selectedRow.transferreport || "No"}&calcPackage=${calcPackageString}&extraHR=${selectedRow.extraHR || ''}&extraKM=${selectedRow.extraKM || ''}&package_amount=${selectedRow.package_amount || ''}&extrakm_amount=${selectedRow.extrakm_amount || ''}&extrahr_amount=${selectedRow.extrahr_amount || ''}&ex_kmAmount=${selectedRow.ex_kmAmount || ''}&ex_hrAmount=${selectedRow.ex_hrAmount || ''}&nightBta=${selectedRow.nightBta || ''}&nightCount=${selectedRow.nightCount || ''}&night_totalAmount=${selectedRow.night_totalAmount || ''}&driverBeta=${selectedRow.driverBeta}&driverbeta_Count=${selectedRow.driverbeta_Count || ''}&driverBeta_amount=${selectedRow.driverBeta_amount || ''}&totalcalcAmount=${selectedRow.totalcalcAmount || ''}&vehcommission=${selectedRow.vehcommission || ''}&caramount1=${selectedRow.caramount1 || ''}&manualbills=${selectedRow.manualbills || ''}&pack=${selectedRow.pack || ''}&amount5=${selectedRow.amount5 || ''}&exkm1=${selectedRow.exkm1 || ''}&amount6=${selectedRow.amount6 || ''}&exHrs1=${selectedRow.exHrs1 || ''}&amount7=${selectedRow.amount7 || ''}&night1=${selectedRow.night1 || ''}&amount8=${selectedRow.amount8 || ''}&driverconvenience1=${selectedRow.driverconvenience1 || ''}&amount9=${selectedRow.amount9 || ''}&rud=${selectedRow.rud || ''}&netamount1=${selectedRow.netamount1 || ''}&discount=${selectedRow.discount || ''}&ons=${selectedRow.ons || ''}&manualbills1=${selectedRow.manualbills1 || ''}&balance=${selectedRow.balance || ''}&fcdate=${selectedRow.fcdate || ''}&taxdate=${selectedRow.taxdate || ''}&insdate=${selectedRow.insdate || ''}&stpermit=${selectedRow.stpermit || ''}&maintenancetype=${selectedRow.maintenancetype || ''}&kilometer=${selectedRow.kilometer || ''}&selects=${selectedRow.selects || ''}&documenttype=${selectedRow.documenttype || ''}&on1=${selectedRow.on1 || ''}&smsgust=${selectedRow.smsgust || ''}&booker=${selectedRow.booker || ''}&emailcheck=${selectedRow.emailcheck || ''}&valueprint=${selectedRow.valueprint || ''}&manualbillss=${selectedRow.manualbillss || ''}&reload=${selectedRow.reload || ''}&Groups=${selectedRow.Groups || ''}&orderbyemail=${selectedRow.orderbyemail || ''} `;

    window.location.href = await bookingPageUrl;


  };

  const handleButtontripsheet = () => {
    window.location.href = '/home/bookings/tripsheet';
  };

  return {
    fromDate, statusvalue, handlestatusChange,
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
    columns,
    filteredColumns,
    columnshowall
  };
};

export default useDispatched;