import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
// import { Organization } from "./PaymentDetailData";
import { APIURL } from "../../../url";
import Excel from 'exceljs';
const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "Trip_id", headerName: "TripSheet No", width: 130 },
  { field: "State", headerName: "State", width: 130 },
  { field: "Invoice_No", headerName: "Invoice No", width: 130 },
  { field: "billing_no", headerName: "Billing_no", width: 150 },
  { field: "Customer", headerName: "Organization", width: 130 },
  { field: "Bill_Date", headerName: "Bill Date", width: 130,valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
  { field: "Amount", headerName: "Total Amount", width: 130 },
  { field: "Status", headerName: "Status", width: 130 },
  { field: "guestname", headerName: "Guestname", width: 130 },
];

const usePaymentdetails = () => {
  const apiUrl = APIURL;
  const [customer, setCustomer] = useState("");
  const [billingno, setBillingNo] = useState("");
  const [rows, setRows] = useState([]);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [warning, setWarning] = useState(false);
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});


  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) =>
      columns.map((column) => row[column.field]).join(",")
    );
    return [header, ...rows].join("\n");
  };
  // const handleExcelDownload = () => {
  //   const csvData = convertToCSV(rows);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  //   saveAs(blob, "Individual_billing.csv");

  //   console.log(rows,'dats of individal bill')
  // };

const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';
    try {
        const fileName = "Individual_billing";
        const worksheet = workbook.addWorksheet(workSheetName);

        // Define only the headers you need
        const headers = [
            "id",
            "Trip_id",
            "State",
            "Status",
            "Invoice_No",
            "billing_no",
            "Customer",
            "Bill_Date",
            "guestname",
            "Trips",
            "Amount",
            
            
        ];

        const formattedRows = rows.map(row => {
            const formattedRow = {};
            headers.forEach(header => {
                if (header === 'Bill_Date') {
                    formattedRow[header] = dayjs(row[header]).format('DD-MM-YYYY');
                } else {
                    formattedRow[header] = row[header] !== undefined ? row[header] : '';
                }
            });
            return formattedRow;
        });

        const columns = headers.map(key => ({ key, header: key }));
        worksheet.columns = columns;
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '9BB0C1' },
            };
        });

        worksheet.getRow(1).height = 30;

        // Set default column width based on header length
        worksheet.columns.forEach((column) => {
            column.width = column.header.length + 5;
            column.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // Add rows of data
        formattedRows.forEach((singleData) => {
            const row = worksheet.addRow(singleData);
            worksheet.columns.forEach((column) => {
                const cellValue = singleData[column.key] || '';
                const cellLength = cellValue.toString().length;
                const currentColumnWidth = column.width || 0;
                column.width = Math.max(currentColumnWidth, cellLength + 5);
            });

            // Apply borders for each cell
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        // Write to buffer and save the file
        const buf = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.xlsx`);

    } catch (error) {
        console.error('<<<ERROR>>>', error);
    } finally {
        workbook.removeWorksheet(workSheetName);  // Clean up the worksheet
    }
};

  // const handlePdfDownload = () => {
  //   const pdf = new jsPDF();
  //   pdf.setFontSize(12);
  //   pdf.setFont("helvetica", "normal");
  //   pdf.text("Customer Details", 10, 10);
  //   const tableData = rows.map((row) => [
  //     row["id"],
  //     row["voucherno"],
  //     row["printName"],
  //     row["Billname"],
  //     row["date"],
  //     row["PaymentCategory"],
  //     row["amount"],
  //   ]);
  //   console.log(rows,'datss of roew inndualbilling')
  //   pdf.autoTable({
  //     head: [
  //       [
  //         "Sno",
  //         "VoucherNo",
  //         "Payment Date",
  //         "Bill Name",
  //         "Payment Category",
  //         "Amount",
  //       ],
  //     ],
  //     body: tableData,
  //     startY: 20,
  //   });
  //   const pdfBlob = pdf.output("blob");
  //   saveAs(pdfBlob, "Customer_Details.pdf");
  // };

const handlePdfDownload = () => {
  const pdf = new jsPDF();
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("Individual Billing Details", 10, 10);

  // Map over the rows and format the Bill_Date
  const tableData = rows.map((row) => [
    row["id"],
    row["Trip_id"],
    row["State"],
    row["Invoice_No"],
    row["billing_no"],
    row["Customer"],
    dayjs(row["Bill_Date"]).format('DD-MM-YYYY'),
    row["Amount"],
    row["Status"],
    row["guestname"]

  ]);

  console.log(rows, 'datss of roew inndualbilling');
  
  pdf.autoTable({
    head: [
      [
        "Sno",
        "TripSheetNo",
        "State",
        "Invoice No",
        "Billing No",
        "Organization",
        "Bill Date",
        "Total Amount",
        "Status",
        "Guest Name"
      ],
    ],
    body: tableData,
    startY: 20,
  });

  const pdfBlob = pdf.output("blob");
  saveAs(pdfBlob, "Individual_Billing.pdf");
};


  // for POPUP-----------------------
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

  //------------------------------------------------


  // const handleKeyDown = async (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); 
  //     const Billno = event.target.value;
  //     try {
  //       const response = await axios.get(`${apiUrl}/getBillnoFromIndividualBill`, {
  //         params: {
  //         billno: Billno
  //         }
  //       });

  //       if (response.data && response.data.length > 0) {
  //         const transferTripId = response.data[0].Trip_id;
  //         const fromDate = dayjs(response.data[0].fromDate).format('YYYY-MM-DD');
  //         const toDate = dayjs(response.data[0].EndDate).format('YYYY-MM-DD');
  //         setFromDate(fromDate);
  //         setToDate(toDate);
  //         setCustomer(response.data[0].customer);
  //         // Second API call to get tripsheet details using transferTripId
  //         const tripsheetResponse = await axios.get(`${apiUrl}/getTripsheetDetailsFromTransferTripId`, {
  //           params: {
  //             transferTripId: transferTripId
  //           }
  //         });
  //         const data = tripsheetResponse.data;

  //         // Filter out rows where tripid is 0
  //         if (data.length > 0) {
  //           const filteredData = data.filter(row => row.tripid !== 0);
  //           const rowsWithUniqueId = filteredData.map((row, index) => ({
  //             ...row,
  //             id: index + 1,
  //           }));

  //           setRows(rowsWithUniqueId);
  //           setSuccess(true);
  //           setSuccessMessage("Successfully Listed");
  //         }
  //       } else {
  //         console.log('No Trip_id found for the given GroupTripId');
  //       }
  //     } catch (error) {
  //       console.log(error, 'error');
  //     }
  //   }
  // };
  // const handleKeyDown = async (e) => {
  //   if (e.key === "Enter") {

  //     try {
  //       const response = await fetch(
  //         `${apiUrl}/getBillnoFromIndividualBill${billingno}`
  //       );
  //       const data = await response.json();
  //       if (data.length > 0) {
  //         const rowsWithUniqueId = data.map((row, index) => ({
  //           ...row,
  //           id: index + 1,
  //         }));
  //         setRows(rowsWithUniqueId);
  //         setSuccess(true);
  //         setSuccessMessage("successfully listed");
  //       } else {
  //         setRows([]);
  //         setError(true);
  //         setErrorMessage("no data found");
  //       }
  //     } catch {
  //       setError(true);
  //       setErrorMessage("Check your Network Connection");
  //     }
  //   }
  // };

  const handleKeyDown = useCallback(async (e) => {
    if (e.key === "Enter") {
      console.log(billingno, "billll");

      try {
        const response = await fetch(`${apiUrl}/getBillnoFromIndividualBill?billingno=${encodeURIComponent(billingno)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length > 0) {
          const rowsWithUniqueId = data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));

          setCustomer(rowsWithUniqueId[0].Customer)
          setRows(rowsWithUniqueId);
          setSuccess(true);
          setSuccessMessage("Successfully listed");
        } else {
          setRows([]);
          setError(true);
          setErrorMessage("No data found");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(true);
        setErrorMessage("Check your Network Connection");
      }
    }
  }, [apiUrl, billingno]);

  const handleInputChange = (event, value, name) => {
    if (name === "customer") {
      const selectedlabel = value ? value.label : ""
      setCustomer(selectedlabel);
    } else if (event.target.name === "billingno") {
      setBillingNo(event.target.value);
    }
  };

  const handleShow = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/payment-details?billingno=${billingno}
        &fromDate=${fromDate.format("YYYY-MM-DD")}&toDate=${toDate.format("YYYY-MM-DD")}&organizationNames=${customer}`
      );

      const data = response.data;
      if (data.length > 0) {
        const rowsWithUniqueId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setRows(rowsWithUniqueId);
        setSuccess(true);
        setSuccessMessage("successfully listed");
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("no data found");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setRows([]);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  }, [billingno, customer, fromDate, toDate, apiUrl]);

  const handleButtonClickTripsheet = async (rowdata) => {

    const selectedRow1 = rowdata;
    const dispatchcheck = "true";
    localStorage.setItem("searchdataurl", 0)


    const billingPageUrl = `/home/billing/billing?dispatchcheck=${dispatchcheck}&tripid=${selectedRow1.Trip_id || ""}&State=${selectedRow1.State || ""}&Billingdate=${selectedRow1.Bill_Date || ""}&Invoicedata=${selectedRow1.Invoice_No || ""}`

    window.location.href = billingPageUrl;
  };
  const reversedRows = [...rows].reverse();

  return {
    error,
    success,
    info,
    warning,
    successMessage,
    handleKeyDown,
    errorMessage,
    warningMessage,
    infoMessage,
    hidePopup,
    setSearchText,
    billingno,
    handleInputChange,
    customer,
    // bankOptions,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleShow,
    handleExcelDownload,
    handlePdfDownload,

    reversedRows,
    handleButtonClickTripsheet,
    columns,
  };
};

export default usePaymentdetails;
