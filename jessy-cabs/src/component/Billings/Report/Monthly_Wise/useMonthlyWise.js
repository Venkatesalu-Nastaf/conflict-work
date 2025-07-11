import { useState, useEffect } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from "dayjs";
import Excel from 'exceljs';
const useMonthlyWise = () => {
  const apiUrl = APIURL;

  const [rows, setRows] = useState([]);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage, setWarningMessage] = useState({});
  const [fromDate, setFromDate] = useState(dayjs())
  const [toDate, setToDate] = useState(dayjs())
  const [customertypedata, setCustpmerType] = useState('')


  const columns = [
    { field: 'id', headerName: 'Sno', width: 20 },
    // {
    //   field: 'billingno',
    //   headerName: 'Bill No',
    //   // type: 'number',
    //   width: 90,
    // },
    { field: 'customer', headerName: 'Customer Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'finalAmount', headerName: 'Amount', width: 130 },
    { field: 'orderByEmail', headerName: 'Email', width: 180 },
    { field: 'customerType', headerName: 'CustomerType', width: 130 },
    // { field: 'customerId', headerName: 'CustomerID', width: 130 },

  ];

  const excelcolumns = [
    { field: 'id', headerName: 'Sno', width: 20 },
    // {
    //   field: 'billingno',
    //   headerName: 'Bill No',
    //   // type: 'number',
    //   width: 90,
    // },
    { field: 'customer', headerName: 'Customer Name', width: 180 },
    { field: 'finalAmount', headerName: 'Amount', width: 130 },
        { field: 'address', headerName: 'Address', width: 300 },
    { field: 'orderByEmail', headerName: 'Email', width: 180 },
    { field: 'customerType', headerName: 'CustomerType', width: 130 },
    // { field: 'customerId', headerName: 'CustomerID', width: 130 },

  ];

  const handleAutocompleteChange = (event, value) => {
    const selectedOption = value ? value.label : '';
    setCustpmerType(selectedOption)
  };

  const handleShow = async () => {

    if (!customertypedata) {
      setWarning(true)
      setWarningMessage("Enter The Customertype")
      return
    }

    try {
      // const response1 = await axios.get(
      //   `${apiUrl}/Monthilywisedatatrip?fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
      //     toDate.toISOString())}&customer=${encodeURIComponent(customertypedata)}`
      // );
      const response = await axios.post(`${apiUrl}/monthlyWiseBillingDataReport`, {
        customerType: customertypedata,
        fromDate: fromDate,
        toDate: toDate
      })
      // console.log(response.data, "monthlyresponsedata");
      // const { customerDetails, transferList, individualBilling, groupBilling } = response.data;
      const customerDetails  = response.data;
      if(customerDetails.length > 0){
        //       const rowsWithUniqueId = customerDetails.map((row, index) => ({
        //   ...row,
        //   id: index + 1,
        // }));
        const rowsWithUniqueId = customerDetails.map((row, index) => ({
    ...row,
    id: index + 1,
    finalAmount: row.gstTax !== 0 
      ? Math.round(row.totalAmount + (row.totalAmount * row.gstTax / 100))
      : row.totalAmount
  })); 
               setSuccess(true);
        setSuccessMessage("successfully listed")
        setRows(rowsWithUniqueId)
      }
      else{
                setRows([]);
        setError(true);
        setErrorMessage("no data found")
      }
      // setRows(customerDetails)
      // Create a map to store total amounts for each organization
      // const amountMap = new Map();

      // // Helper function to accumulate amounts
      // const accumulateAmount = (data) => {
      //   data.forEach(({ Organization_name, Amount }) => {
      //     if (Organization_name) {
      //       amountMap.set(Organization_name, (amountMap.get(Organization_name) || 0) + parseInt(Amount));
      //     }
      //   });
      // };

      // // Aggregate amounts from all billing sources
      // accumulateAmount(transferList);
      // accumulateAmount(individualBilling);
      // accumulateAmount(groupBilling);

      // // Filter and merge customer details
      // const mergedCustomerDetails = customerDetails
      //   .map(({ customerType, customer, orderByEmail, address }) => ({
      //     customerType,
      //     customer,
      //     orderByEmail,
      //     address: address,
      //     totalAmount: amountMap.get(customer) || 0, // Assign total amount if available
      //   }))
      //   .filter(({ totalAmount }) => totalAmount > 0); // Return only matched customers

      // console.log(mergedCustomerDetails, "Final Merged Customer Details");
    

      // if (mergedCustomerDetails.length > 0) {
      //   const rowsWithUniqueId = mergedCustomerDetails.map((row, index) => ({
      //     ...row,
      //     id: index + 1,
      //   }));
      //   setRows(rowsWithUniqueId)
      //   // setRows([])
      //   setSuccess(true);
      //   setSuccessMessage("successfully listed")
      // }
      // else {
      //   setRows([]);
      //   setError(true);
      //   setErrorMessage("no data found")
      // }
    }
    // catch {
    //   setRows([]);
    //   setError(true);
    //   setErrorMessage("Error retrieving data");
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);

      // Check if there's no response, indicating a network error
      if (error.message) {
        setError(true);
        // console.log(error, "error Message");
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

  // const handleShow = async () => {

  //   if (!customertypedata) {
  //     setWarning(true)
  //     setWarningMessage("Enter The Customertype")
  //     return
  //   }

  //   try {
  //     const response = await axios.get(
  //       `${apiUrl}/Monthilywisedatatrip?fromDate=${encodeURIComponent(fromDate.toISOString())}&toDate=${encodeURIComponent(
  //         toDate.toISOString())}&customer=${encodeURIComponent(customertypedata)}`
  //     );
  //     const data = response.data;
  //     console.log(data)

  //     if (data.length > 0) {
  //       const rowsWithUniqueId = data.map((row, index) => ({
  //         ...row,
  //         id: index + 1,
  //       }));
  //       setRows(rowsWithUniqueId)
  //       // setRows([])
  //       setSuccess(true);
  //       setSuccessMessage("successfully listed")
  //     } else {
  //       setRows([]);
  //       setError(true);
  //       setErrorMessage("no data found")
  //     }
  //   }
  //   // catch {
  //   //   setRows([]);
  //   //   setError(true);
  //   //   setErrorMessage("Error retrieving data");
  //   // }
  //   catch (error) {
  //     // console.error("Error occurredddddd:", error);

  //     // Check if there's no response, indicating a network error
  //     if (error.message) {
  //       setError(true);
  //       setErrorMessage("Check your internet connection");
  //       // console.log('Network error');
  //     } else if (error.response) {
  //       setError(true);
  //       // Handle other Axios errors (like 4xx or 5xx responses)
  //       setErrorMessage("Failed to Show : " + (error.response.data.message || error.message));
  //     } else {
  //       // Fallback for other errors
  //       setError(true);
  //       setErrorMessage("An unexpected error occurred: " + error.message);
  //     }
  //   }

  // }

  const handleShowAll = async () => {

    try {
      const response = await axios.get(`${apiUrl}/montlywisedataall`);

      const data = response.data;
      console.log(data)
      if (data.length > 0) {


        // Combine both sets of data

        const tripsheetRowsWithUniqueId2 = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        setRows(tripsheetRowsWithUniqueId2);
        setSuccess(true);
        setSuccessMessage("Successfully listed");
      }
      else {
        setRows([]);
        setError(true);
        setErrorMessage("no data found")
      }
    }
    catch {
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };


  // const user__id = selectedCustomerData?.driverid || book.driverid;



  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';


    try {

      const fileName = "Monthylywise Reports"
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      const columndata = excelcolumns.map(key => ({ key: key.field, header: key.headerName }));
      //         worksheet.columns = columnsexcel

      worksheet.columns = columndata;


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
        // column.alignment = { horizontal: 'center', vertical: 'middle' };
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

      const totalKms = rows.reduce((sum, row) => sum + parseInt(row.finalAmount || 0, 10), 0);
      const totalRow = worksheet.addRow({});
      totalRow.getCell(columndata.findIndex(col => col.header === 'Customer Name') + 1).value = 'TOTAL';
      totalRow.getCell(columndata.findIndex(col => col.header === 'Amount') + 1).value = totalKms;

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
          
          
          const isHeader = row.number === 1;
          worksheet.getCell(cellAddress).alignment = {
              horizontal: isHeader ? 'center' : 'left',
              vertical: 'middle',
          };
        });
      });


      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
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
    pdf.setFontSize(17);
    pdf.setFont('helvetica', 'normal');
    // pdf.text("Monthlywise Details", 10, 10);
    //  const header = Object.keys(row[0]);
    //  const header = Object.keys(row[0]);
    const text = "Monthlywise Details";

    // Get page width
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Calculate text width
    const textWidth = pdf.getTextWidth(text);

    // Calculate the x position to center the text
    const xPos = (pageWidth - textWidth) / 2;

    // Add text to PDF at calculated position
    pdf.text(text, xPos, 10);





    // Extracting body  const header = columns.map(row => row.headerName)
    const header = columns.map(row => row.headerName)
    const rowValues = rows.map(row => {
      return columns.map(column => row[column.field]);
    });

    const totalSum = rows.reduce((sum, row) => sum + row['finalAmount'], 0);

    // Add the total row
    const totalRow = columns.map(column => column.field === 'finalAmount' ? totalSum : (column.headerName === 'Customer Name' ? 'Total' : ''));
    rowValues.push(totalRow);

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
      fontdata = 7;
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
      body: rowValues,
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
        fontSize: fontdata,
        valign: 'middle',
        cellWidth: 'auto',

        // Adjust the font size for the body

      },
      willDrawCell: function (data) {
        // Check if this cell is part of the total row
        if (data.row.index === rowValues.length - 1) {
          const { cell } = data;
          const { x, y, width, height } = cell;

          // Set bold text and increased font size
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(16); // Increase the font size as needed

          // Draw top border
          pdf.setDrawColor(0); // Black color
          pdf.setLineWidth(0.5); // Line width
          pdf.line(x, y, x + width, y); // Draw top border

          // Draw bottom border
          pdf.line(x, y + height, x + width, y + height); // Draw bottom border
        }
      },
      columnWidth: 'auto'

    });
    const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;

    // Scale content
    pdf.scale(scaleFactor, scaleFactor);
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'MonthlyWise Reports.pdf');
  };


  //---------- popup------------------
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

  //------------------------------------




  return {

    rows,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    // infoMessage,
    // book,

    handleAutocompleteChange,

    setErrorMessage, fromDate, setFromDate, toDate, setToDate,
    handleShowAll,
    handleShow,
    customertypedata,
    columns,
    handlePdfDownload,
    handleExcelDownload,


    // venkat
  };
};
export default useMonthlyWise;
