import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { Organization } from "../../billingMain/PaymentDetail/PaymentDetailData";
import { APIURL } from "../../../url";
import Excel from 'exceljs';

const useTransferlist = () => {
  const apiUrl = APIURL;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [customer, setCustomer] = useState("");
  const [bankOptions, setBankOptions] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningMessage] = useState({});
  const [servicestation, setServiceStation] = useState("");





  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';
    console.log(rows, "exceldata")

    try {

      const fileName = "Transfer_list"
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      const headers = Object.keys(rows[0]);
      const idIndex = headers.indexOf('id');
      if (idIndex !== -1) {
        headers.splice(idIndex, 1);
        headers.unshift('id');

      }

      //         console.log(headers,"hed")
      const columns = headers.map(key => ({ key, header: key }));
      //         worksheet.columns = columnsexcel

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
    pdf.text("Transfer_list", 10, 10);
    const header = Object.keys(rows[0]);
    const idIndex = header.indexOf('id');
    if (idIndex !== -1) {
      header.splice(idIndex, 1);
      header.unshift('id');

    }

    // Extracting body
    const body = rows.map(row => Object.values(row));

    let fontdata = 1;
    if (header.length <= 13) {
      fontdata = 16;
    }
    else if (header.length >= 14 && header.length <= 20) {
      fontdata = 11;
    } else if (header.length >= 21 && header.length <= 23) {
      fontdata = 9;
    }
    else if (header.length >= 24 && header.length <= 26) {
      fontdata = 7;
    }
    else if (header.length >= 27 && header.length <= 30) {
      fontdata = 6;
    }
    else if (header.length >= 31 && header.length <= 35) {
      fontdata = 4;
    }
    else if (header.length >= 36 && header.length <= 40) {
      fontdata = 4;
    }
    else if (header.length >= 41 && header.length <= 46) {
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
        // fontSize:4,
        // fontSize: fontdata-1
        fontSize: fontdata - 1,
        valign: 'middle',
        //  cellWidth: 'wrap',
        cellWidth: 'auto'
        // Adjust the font size for the body

      },
      columnWidth: 'auto'

    });
    const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
    console.log(scaleFactor, "SCALE")

    // Scale content
    pdf.scale(scaleFactor, scaleFactor);
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Transfer_list.pdf');
  };


  //-----------popup--------------
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

  //--------------------------------------------------

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : "");
  };

  useEffect(() => {
    Organization()
      .then((data) => {
        if (data) {
          setBankOptions(data);
        } else {
        }
      })
      .catch(() => { });
  }, []);

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/gettransfer_listdatas`, {
        params: {
          Status: selectedStatus,
          Organization_name: encodeURIComponent(customer),
          FromDate: fromDate.format("YYYY-MM-DD"),
          EndDate: toDate.format("YYYY-MM-DD"),
        },

      });
      const data = response.data;

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
    } catch {
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  }, [customer, fromDate, toDate, selectedStatus, apiUrl]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${apiUrl}/gettransfer_list`)
        const data = response.data;


        if (data.length > 0) {
          const rowsWithUniqueId = data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setRows(rowsWithUniqueId);
          // setSuccess(true);
          setSuccessMessage("Successfully listed");
        } else {
          setRows([]);
          setError(true);
          setErrorMessage("No data found");
        }
      } catch {
        setRows([]);
        setError(true);
        setErrorMessage("Check your Network Connection");
      }
    }
    fetchdata()
  }, [apiUrl])

  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "Status", headerName: "Status", width: 130 },
    { field: "Invoice_no", headerName: "Invoice No", width: 130 },
    {
      field: "Billdate",
      headerName: "Date",
      width: 130,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    { field: "Organization_name", headerName: "Customer", width: 130 },
    {
      field: "  FromDate",
      headerName: "From Date",
      width: 130,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "EndDate",
      headerName: "To Date",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    { field: "guestname", headerName: "UserName", width: 150 },
    { field: "Trips", headerName: "Trips", width: 150 },
    { field: "Amount", headerName: "Amount", width: 130 },
  ];



  const handleButtonClickTripsheet = (params) => {
    const data = params.row;
    const billingPageUrl = `/home/billing/transfer?tab=dataentry&Groupid=${data.Grouptrip_id || ''}&Invoice_no=${data.Invoice_no || ''}&Status=${data.Status || ''}&Billdate=${data.Billdate || ''}&Organization_name=${data.Organization_name || ''}&Trip_id=${data.Trip_id || ''}&FromDate=${data.FromDate || ''}&EndDate=${data.EndDate || ''}&Amount=${data.Amount || ''}&billingsheet=true`
    window.location.href = billingPageUrl
  };

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
    bankOptions,
    setCustomer,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    selectedStatus,
    setSelectedStatus,
    servicestation,
    handleserviceInputChange,
    handleShow,
    handleExcelDownload,
    handlePdfDownload,
    columns,
    handleButtonClickTripsheet,
  };
};

export default useTransferlist;
