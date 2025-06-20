import { useState, useEffect} from "react";
import axios from "axios";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { APIURL } from "../../../url";
import Excel from 'exceljs';
const useTransferlist = () => {
  const apiUrl = APIURL;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [customer, setCustomer] = useState("");
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningMessage] = useState({});
  const [servicestation, setServiceStation] = useState("");
  const [loading, setLoading] = useState(false)
  // const [userastation,setUserStations]=useState([])
  const  userdata = localStorage.getItem("username");


  // const handleExcelDownload = async () => {
  //   const workbook = new Excel.Workbook();
  //   const workSheetName = 'Worksheet-1';
  //   console.log(rows, "exceldata")

  //   try {

  //     const fileName = "Transfer_list"
  //     // creating one worksheet in workbook
  //     const worksheet = workbook.addWorksheet(workSheetName);
  //     const headers = Object.keys(rows[0]);
  //     const idIndex = headers.indexOf('id');
  //     if (idIndex !== -1) {
  //       headers.splice(idIndex, 1);
  //       headers.unshift('id');

  //     }

  //     //         console.log(headers,"hed")
  //     const columns = headers.map(key => ({ key, header: key }));
  //     //         worksheet.columns = columnsexcel

  //     worksheet.columns = columns;


  //     // updated the font for first row.
  //     worksheet.getRow(1).font = { bold: true };

  //     // Set background color for header cells
  //     worksheet.getRow(1).eachCell((cell, colNumber) => {
  //       cell.fill = {
  //         type: 'pattern',
  //         pattern: 'solid',
  //         fgColor: { argb: '9BB0C1' } // Green background color
  //       };
  //     });


  //     worksheet.getRow(1).height = 30;
  //     // loop through all of the columns and set the alignment with width.
  //     worksheet.columns.forEach((column) => {
  //       column.width = column.header.length + 5;
  //       column.alignment = { horizontal: 'center', vertical: 'middle' };
  //     });
       
  //     rows.forEach((singleData, index) => {

  //       console.log(singleData,'datss of excel')
  //       worksheet.addRow(singleData);

  //       // Adjust column width based on the length of the cell values in the added row
  //       worksheet.columns.forEach((column) => {
  //         const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
  //         const cellLength = cellValue.toString().length; // Get length of cell value as a string
  //         const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined

  //         // Set column width to the maximum of current width and cell length plus extra space
  //         column.width = Math.max(currentColumnWidth, cellLength + 5);
  //       });
  //     });

  //     // loop through all of the rows and set the outline style.
  //     worksheet.eachRow({ includeEmpty: false }, (row) => {
  //       // store each cell to currentCell
  //       const currentCell = row._cells;

  //       // loop through currentCell to apply border only for the non-empty cell of excel
  //       currentCell.forEach((singleCell) => {

  //         const cellAddress = singleCell._address;

  //         // apply border
  //         worksheet.getCell(cellAddress).border = {
  //           top: { style: 'thin' },
  //           left: { style: 'thin' },
  //           bottom: { style: 'thin' },
  //           right: { style: 'thin' },
  //         };
  //       });
  //     });
  //     // write the content using writeBuffer
  //     const buf = await workbook.xlsx.writeBuffer();

  //     // download the processed file
  //     saveAs(new Blob([buf]), `${fileName}.xlsx`);
  //   } catch (error) {
  //     console.error('<<<ERRROR>>>', error);
  //     console.error('Something Went Wrong', error.message);
  //   } finally {
  //     // removing worksheet's instance to create new one
  //     workbook.removeWorksheet(workSheetName);
  //   }

  // }
     
  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';
    console.log(rows, "exceldata");
  
    try {
      const fileName = "Transfer_list";
  
      // Creating one worksheet in the workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      const headers = Object.keys(rows[0]);
      
      // Ensure 'id' is first in the header
      const idIndex = headers.indexOf('id');
      if (idIndex !== -1) {
        headers.splice(idIndex, 1);
        headers.unshift('id');
      }
  
      // Define columns for the worksheet
      const columns = headers.map(key => ({ key, header: key }));
      worksheet.columns = columns;
  
      // Update the font for the first row (header)
      worksheet.getRow(1).font = { bold: true };
  
      // Set background color for header cells
      worksheet.getRow(1).eachCell((cell, colNumber) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '9BB0C1' } // Light gray background color
        };
      });
  
      worksheet.getRow(1).height = 30;
  
      // Loop through all of the columns and set alignment and width
      worksheet.columns.forEach((column) => {
        column.width = column.header.length + 5;
        // column.alignment = { horizontal: 'center', vertical: 'middle' };
      });
  
      // Format date fields and add rows to the worksheet
      rows.forEach((singleData, index) => {
        // Loop through each field of the row and check if it contains a date
        const formattedRow = headers.map(key => {
          let value = singleData[key];
          
          // Format dates as 'DD-MM-YYYY' if it's a date
          if (key === 'Billdate' || key === 'EndDate' || key === 'FromDate' || key === 'ToDate') {
            // Check if the value is a valid date
            value = value ? dayjs(value).format('DD-MM-YYYY') : 'N/A';
          }
          
          return value;
        });
  
        // Add the formatted row to the worksheet
        worksheet.addRow(formattedRow);
  
        // Adjust column width based on the length of the cell values in the added row
        worksheet.columns.forEach((column) => {
          const cellValue = singleData[column.key] || ''; // Get cell value from singleData or use empty string if undefined
          const cellLength = cellValue.toString().length; // Get length of cell value as a string
          const currentColumnWidth = column.width || 0; // Get current column width or use 0 if undefined
  
          // Set column width to the maximum of current width and cell length plus extra space
          column.width = Math.max(currentColumnWidth, cellLength + 5);
        });
      });
  
      // Loop through all of the rows and set the outline style
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        const currentCell = row._cells;
  
        // Loop through currentCell to apply border only for the non-empty cells
        currentCell.forEach((singleCell) => {
          const cellAddress = singleCell._address;
  
          // Apply borders
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
  
      // Write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();
  
      // Download the processed file
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      // console.error('<<<ERROR>>>', error);
      console.error('Something went wrong', error.message);
    } finally {
      // Removing worksheet's instance to create new one
      workbook.removeWorksheet(workSheetName);
    }
  };
  

  // useme
  // const filteredStationNames = userastation
  // .filter((option) => option.Stationname !== "All") // Remove "All"
  // .map((option) => option.Stationname);

  // const filteredStationNames = useMemo(() => {
  //   return userastation
  //     .filter((option) => option.Stationname !== "All") // Remove "All"
  //     .map((option) => option.Stationname); // Map to only get the station names
  // }, [userastation]);

  // const filteredStationNames = useMemo(() => {
  //   return userastation
  //     .filter((option) => option.Stationname !== "All") // Remove "All"
  //     .flatMap((option) => option.Stationname.split(' ')); // Split multiple words into individual values
  // }, [userastation]); 

  // console.log(filteredStationNames,"ll")

  // const handlePdfDownload = () => {
  //   const pdf = new jsPDF({
  //     orientation: "landscape",
  //     unit: "mm",
  //     format: "tabloid" // [width, height] in inches
  //   });
  //   pdf.setFontSize(10);
  //   pdf.setFont('helvetica', 'normal');
  //   pdf.text("Transfer_list", 10, 10);
  //   const header = Object.keys(rows[0]);
  //   const idIndex = header.indexOf('id');
  //   if (idIndex !== -1) {
  //     header.splice(idIndex, 1);
  //     header.unshift('id');

  //   }

  //   // Extracting body
  //   const body = rows.map(row => Object.values(row));

  //   console.log(body,'datas of this pdf')

  //   let fontdata = 1;
  //   if (header.length <= 13) {
  //     fontdata = 16;
  //   }
  //   else if (header.length >= 14 && header.length <= 20) {
  //     fontdata = 11;
  //   } else if (header.length >= 21 && header.length <= 23) {
  //     fontdata = 9;
  //   }
  //   else if (header.length >= 24 && header.length <= 26) {
  //     fontdata = 7;
  //   }
  //   else if (header.length >= 27 && header.length <= 30) {
  //     fontdata = 6;
  //   }
  //   else if (header.length >= 31 && header.length <= 35) {
  //     fontdata = 4;
  //   }
  //   else if (header.length >= 36 && header.length <= 40) {
  //     fontdata = 4;
  //   }
  //   else if (header.length >= 41 && header.length <= 46) {
  //     fontdata = 2;
  //   }

  //   pdf.autoTable({
  //     head: [header],
  //     body: body,
  //     startY: 20,

  //     headStyles: {
  //       // fontSize: 5,
  //       fontSize: fontdata,
  //       cellPadding: 1.5, // Decrease padding in header

  //       minCellHeigh: 8,
  //       valign: 'middle',

  //       font: 'helvetica', // Set font type for body

  //       cellWidth: 'wrap',
  //       // cellWidth: 'auto'
  //     },

  //     bodyStyles: {
  //       // fontSize:4,
  //       // fontSize: fontdata-1
  //       fontSize: fontdata - 1,
  //       valign: 'middle',
  //       //  cellWidth: 'wrap',
  //       cellWidth: 'auto'
  //       // Adjust the font size for the body

  //     },
  //     columnWidth: 'auto'

  //   });
  //   const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
  //   console.log(scaleFactor, "SCALE")

  //   // Scale content
  //   pdf.scale(scaleFactor, scaleFactor);
  //   const pdfBlob = pdf.output('blob');
  //   saveAs(pdfBlob, 'Transfer_list.pdf');
  // };/
  const handlePdfDownload = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "tabloid",  // [width, height] in inches
    });
  
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Transfer_list", 10, 10);
  
    const header = Object.keys(rows[0]);
  
    // Ensure 'id' is first in the header
    const idIndex = header.indexOf('id');
    if (idIndex !== -1) {
      header.splice(idIndex, 1);  // Remove 'id' if it exists
      header.unshift('id');       // Add it to the start
    }
  
    // Extracting body with formatted dates
    const body = rows.map(row => {
      // Map the row values to an array in the correct order
      return [
        // row['id'],  // 'id' first
        // row['Grouptrip_id'],
        // row['Invoice_no'],
        // // row['InvoiceDate'] ? dayjs(row['InvoiceDate']).format('DD-MM-YYYY') : 'N/A',
        // row['Status'],
        // row['State'],
        // row['BillReportStatus '],
        // row['Billdate'] ? dayjs(row['Billdateate']).format('DD-MM-YYYY') : 'N/A',
        // // row['ToDate'] ? dayjs(row['ToDate']).format('DD-MM-YYYY') : 'N/A',
        // row['Organization_name'],
        // row['Trip_id'],
        // row['FromDate'] ? dayjs(row['FromDate']).format('DD-MM-YYYY') : 'N/A',
        // row['EndDate'] ? dayjs(row['EndDate']).format('DD-MM-YYYY') : 'N/A',
        // row['Trips'],
        // row['Amount'],
        // row['State'],
        row['id'],  
row['Grouptrip_id'],
row['Invoice_no'],
// row['InvoiceDate'] ? dayjs(row['InvoiceDate']).format('DD-MM-YYYY') : 'N/A',
row['Status'],
row['State'],
row['BillReportStatus '],
row['Billdate'] ? dayjs(row['Billdate']).format('DD-MM-YYYY') : 'N/A',
row['Organization_name'],
row['Trip_id'],
row['FromDate'] ? dayjs(row['FromDate']).format('DD-MM-YYYY') : 'N/A',
row['EndDate'] ? dayjs(row['EndDate']).format('DD-MM-YYYY') : 'N/A',
row['Trips'],
row['Amount'],
row['State']

      ];
    });
  
    console.log(body, 'Data for PDF');
  
    // Dynamically set font size based on the number of columns
    let fontSize = 10;
    if (header.length <= 13) {
      fontSize = 16;
    } else if (header.length >= 14 && header.length <= 20) {
      fontSize = 11;
    } else if (header.length >= 21 && header.length <= 23) {
      fontSize = 9;
    } else if (header.length >= 24 && header.length <= 26) {
      fontSize = 7;
    } else if (header.length >= 27 && header.length <= 30) {
      fontSize = 6;
    } else if (header.length >= 31 && header.length <= 35) {
      fontSize = 4;
    } else if (header.length >= 36 && header.length <= 40) {
      fontSize = 4;
    } else if (header.length >= 41 && header.length <= 46) {
      fontSize = 2;
    }
  
    // Generate the table
    pdf.autoTable({
      head: [header],      // Use the header array defined above
      body: body,          // Use the body array created with correctly aligned data
      startY: 20,          // Start the table at Y=20
      headStyles: {
        fontSize: fontSize,
        cellPadding: 1.5,  // Adjust cell padding as needed
        minCellHeight: 8,
        valign: 'middle',
        font: 'helvetica',
        cellWidth: 'wrap',  // Ensure column widths are appropriate for content
      },
      bodyStyles: {
        fontSize: fontSize - 1,  // Adjust font size for body
        valign: 'middle',
        cellWidth: 'auto',       // Allow columns to auto size based on content
      },
      columnWidth: 'auto',       // Allow columns to auto size based on content
    });
  
    // Scaling factor to fit content into the page
    const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;
    console.log(scaleFactor, "Scale factor");
  
    // Scale content if needed
    pdf.scale(scaleFactor, scaleFactor);
  
    // Output the PDF as a blob and save it
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Transfer_list.pdf');
  };


  //-----------popup--------------
  const hidePopup = () => {
    setError(false);
    setSuccess(false);
    setWarning(false);
    setInfo(false)
  };

  useEffect(() => {
    if (error || success || warning || info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, warning, info]);

  //--------------------------------------------------

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : "");
  };


  // const handleShow = useCallback(async () => {
  //   if (!customer) {
  //     setInfo(true);
  //     setInfoMessage("Enter The Customer")
  //     return

  //   }

  //   if (!selectedStatus) {
  //     setInfo(true);
  //     setInfoMessage("Enter The Status")
  //     return

  //   } try {
  //     const response = await axios.get(`${apiUrl}/gettransfer_listdatas`, {
  //       params: {
  //         Status: selectedStatus,
  //         Organization_name: encodeURIComponent(customer),
  //         FromDate: fromDate.format("YYYY-MM-DD"),
  //         EndDate: toDate.format("YYYY-MM-DD"),
  //       },

  //     });
  //     const data = response.data;
  //     if (data.length > 0) {
  //       const rowsWithUniqueId = data.map((row, index) => ({
  //         ...row,
  //         id: index + 1,
  //       }));
  //       setRows(rowsWithUniqueId);
  //       setSuccess(true);
  //       setSuccessMessage("Successfully listed");
  //     } else {
  //       setRows([]);
  //       setError(true);
  //       setErrorMessage("No data found");
  //     }
  //   } catch (err) {
  //     const errdata=err.response?.data;
  //     setRows([]);
  //     setError(true);
  //     setErrorMessage(errdata.message);
  //   }
  // }, [customer, fromDate, toDate, selectedStatus, apiUrl]);

  const handleShow = async () => {
    if (!customer) {
      setInfo(true);
      setInfoMessage("Enter The Customer");
      return;
    }
  
    if (!selectedStatus) {
      setInfo(true);
      setInfoMessage("Enter The Status");
      return;
    }
  
    try {
      console.log(selectedStatus,customer,servicestation,"details")
      const response = await axios.get(`${apiUrl}/gettransfer_listdatas`, {
        params: {
          Status: selectedStatus,
          Organization_name: encodeURIComponent(customer),
          FromDate: fromDate.format("YYYY-MM-DD"),
          EndDate: toDate.format("YYYY-MM-DD"),
          Station:servicestation,
      

          
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
        // console.log(errorMessage,'Error Mesage')
      }
    } catch (err) {
      // Check if the error is due to a network issue
      if (err.message) {
        setRows([]);
        setError(true);
        setErrorMessage("Check your Network Connection");
      } else {
        const errdata = err.response?.data;
        setRows([]);
        setError(true);
        setErrorMessage(errdata?.message || "An error occurred");
      }
      // console.log(err,'erro message')
    }
  }
   
  // }, [customer, fromDate, toDate, selectedStatus, apiUrl]);
  

  // Loading grid in the grid 
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     setLoading(true)
  //     try {
      
      
  //       const response = await axios.get(`${apiUrl}/gettransfer_list/${userdata}`)
  //       const data = response.data;


  //       if (data.length > 0) {
  //         const rowsWithUniqueId = data.map((row, index) => ({
  //           ...row,
  //           id: index + 1,
  //         }));
  //         setRows(rowsWithUniqueId);
  //         setLoading(false)
  //       } else {
  //         setRows([]);
  //         setError(true);
  //         setErrorMessage("No data found");
  //         setLoading(false)
  //       }
  //     } catch {
  //       setRows([]);
  //       setLoading(false)

  //     }
  //   }
  //   fetchdata()
  // }, [apiUrl])

  useEffect(() => {
    const fetchdata = async () => {
        setLoading(true);
        setError(false);
        setErrorMessage("");

        try {
            const response = await axios.get(`${apiUrl}/gettransfer_list/${userdata}`);
            const data = response.data;

            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setLoading(false);
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("No data found");
                setLoading(false);
            }
        } catch (err) {
            // console.error("Error fetching data:", err);
            setRows([]);
            setLoading(false);
            setError(true);
            if (err.message === 'Network Error') {
                setErrorMessage("Check network connection.");
            } else {
                setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
            }
        }
    };

    fetchdata();
}, [apiUrl, userdata]); // Added 'userdata' as dependency as it is used in the API call


  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: 'Grouptrip_id', headerName: "GroupID", width: 120 },
    { field: "Status", headerName: "Status", width: 130 },
    { field: "Invoice_no", headerName: "Invoice No", width: 130 },
    { field: "State", headerName: "State", width: 130 },
    {
      field: "Billdate",
      headerName: "Date",
      width: 130,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    { field: "Organization_name", headerName: "Customer", width: 180 },
    {
      field: "FromDate",
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
    // { field: "guestname", headerName: "UserName", width: 150 },
    { field: "Trips", headerName: "Trips", width: 150 },
    { field: "Amount", headerName: "Amount", width: 130 },
  ];





  const handleButtonClickTripsheet = (params) => {
    const data = params.row;
    localStorage.setItem("selectedtripsheetid", data.Trip_id);
    const customer = encodeURIComponent(data.Organization_name)
    localStorage.setItem("selectedcustomerdata", customer)
    if (data.Status === "notbilled") {
      const billingPageUrl = `/home/billing/transfer?tab=dataentry&Groupid=${data.Grouptrip_id || ''}&Invoice_no=${data.Invoice_no || ''}&Status=${data.Status || ''}&Billdate=${data.Billdate || ''}&Organization_name=${data.Organization_name || ''}&Trip_id=${data.Trip_id || ''}&FromDate=${data.FromDate || ''}&EndDate=${data.EndDate || ''}&Amount=${data.Amount || ''}&Stations=${data.State || ''}&billingsheet=true`
      window.location.href = billingPageUrl
    }
    else {
      const billingPageUrl = `/home/billing/transfer?tab=TransferReport&Group_id=${data.Grouptrip_id || ''}&Invoice_no=${data.Invoice_no || ''}&Status=Billed&BillDate=${data.Billdate || ''}&Customer=${data.Organization_name || ''}&TripId=${data.Trip_id || ''}&FromDate=${data.FromDate || ''}&EndDate=${data.EndDate || ''}&Amount=${data.Amount || ''}&State=${data.State || ''}&TransferReport=true`;
      window.location.href = billingPageUrl
    }

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
    setLoading,
    loading,
    info,
    infoMessage,
    // setUserStations
  };
};

export default useTransferlist;
