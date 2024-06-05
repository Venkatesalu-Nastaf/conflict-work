import { useState, useEffect, useCallback, } from "react";
import axios from "axios";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useUser } from "../../../form/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { APIURL } from "../../../url.js";
import Excel from 'exceljs';
// import { toast } from 'react-toastify';

const columns = [
  { field: "id", headerName: "Sno", width: 70 },
  { field: "bookingno", headerName: "Booking No", width: 130 },
  {
    field: "bookingdate",
    headerName: "Booking Date",
    width: 130,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  { field: "bookingtime", headerName: "Booking Time", width: 130 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "tripid", headerName: "Trip ID", width: 130 },
  { field: "customer", headerName: "Customer", width: 190 },
  { field: "orderedby", headerName: "Ordered-By", width: 160 },
  { field: "mobile", headerName: "Mobile No", width: 130 },
  { field: "guestname", headerName: "Guest-Name", width: 130 },
  { field: "guestmobileno", headerName: "Guest-Mobile-No", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "employeeno", headerName: "Employee No", width: 130 },
  {
    field: "address1", // Assuming this is the key in your data for the address line 1
    headerName: "Address",
    width: 230,
  },
  { field: "report", headerName: "Report", width: 130 },
  { field: "vehType", headerName: "Vehicle Type", width: 130 },
  { field: "paymenttype", headerName: "Payment Type", width: 130 },
  { field: "useage", headerName: "Usage", width: 130 },
  { field: "username", headerName: "User Name", width: 130 },
  { field: "startdate", headerName: "Report Date", width: 130 },
  { field: "starttime", headerName: "Start Time", width: 130 },
  { field: "reporttime", headerName: "Report Time", width: 130 },
  { field: "duty", headerName: "Duty", width: 130 },
  { field: "pickup", headerName: "Pickup", width: 130 },
  { field: "customercode", headerName: "Cost Code", width: 130 },
  { field: "registerno", headerName: "Request No", width: 130 },
  { field: "flightno", headerName: "Flight No", width: 130 },
  { field: "orderbyemail", headerName: "Order By Email", width: 130 },
  { field: "remarks", headerName: "Remarks", width: 130 },
  { field: "servicestation", headerName: "Service Station", width: 130 },
  { field: "advance", headerName: "Advance", width: 130 },
  { field: "hireTypes", headerName: "Hire Type", width: 130 },
  { field: "travelsname", headerName: "Travels Name", width: 130 },
  { field: "vehRegNo", headerName: "Vehicle Register No", width: 130 },
  { field: "vehiclemodule", headerName: "Vehicle Modle", width: 130 },
  { field: "driverName", headerName: "Driver Name", width: 130 },
  { field: "mobileNo", headerName: "Driver Phone", width: 130 },
  { field: "travelsemail", headerName: "Travels Email", width: 130 },
];


const useBooking = () => {
  const apiUrl = APIURL;
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState({});
  const [actionName] = useState("");
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);
  const [rowdriver, setRowsdriver] = useState([]);
  const [displayCopy, setDisplayCopy] = useState(false);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [reporttime, setreporttime] = useState("");
  const [starttime, setStartTime] = useState("");
  const [bookingtime, setBookingTime] = useState("");
  const location = useLocation();
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  // const [warningMessage, setWarningMessage] = useState({});
  const [searchText, setSearchText] = useState("");
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupOpenmail, setpopupOpenmail] = useState(false);
  const [edit, setEdit] = useState(false)
  // const [guestsms, setGuestSms] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  // const [sendguestsms, setSendGuestsms] = useState(false);
  const [sendmailguestsms, setSendmailGuestsms] = useState(false);
  const handlePopupClose = () => {
    setPopupOpen(false);
    setpopupOpenmail(false);
  };


  const [formValues, setFormValues] = useState({
    guestname: "",
    guestmobileno: "",
    email: "",
    useage: "",
    tripid: "",
    reporttime: "",
    startdate: "",
    address1: "",
    streetno: "",
    city: "",
  });

  const { user } = useUser();


  const [selectedCustomerDatas, setSelectedCustomerDatas] = useState({
    customer: "",
  });
  const [selectedCustomerdriver, setSelectedCustomerdriver] = useState({});

  const transformRow = (originalRow) => {
    return {
      driverName: originalRow.driverName,
      vehRegNo: originalRow.vehRegNo,
      hireTypes: originalRow.hiretypes,
      vehType: originalRow.vehiclename,
      vehiclemodule: originalRow.vechtype,
      mobileNo: originalRow.driverno,
      active: originalRow.active,
      Groups: originalRow.Groups
    };
  };

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    if (error || warning || info || success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, warning, info, success]);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusValue = params.get("status") || "pending";
    const stationValue = params.get("servicestation");
    const payValue = params.get("paymenttype") || "BTC";
    const formData = {};

    const parameterKeys = [
      "bookingno",
      "bookingdate",
      "bookingtime",
      "status",
      "tripid",
      "customer",
      "orderedby",
      "mobile",
      "guestname",
      "guestmobileno",
      "email",
      "employeeno",
      "address1",
      "streetno",
      "city",
      "report",
      "vehType",
      "paymenttype",
      "startdate",
      "starttime",
      "reporttime",
      "duty",
      "pickup",
      "customercode",
      "registerno",
      "flightno",
      "orderbyemail",
      "remarks",
      "servicestation",
      "advance",
      "useage",
      "username",
      "emaildoggle",
      "hireTypes",
      "travelsname",
      "vehRegNo",
      "vehType",
      "driverName",
      "mobileNo",
      "travelsemail",
      "Groups"
    ];

    parameterKeys.forEach((key) => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        formData[key] = value;
      }
    });

    formData["status"] = statusValue;
    formData["servicestation"] = stationValue;
    formData["paymenttype"] = payValue;

    setBook(formData);
    setFormData(formData);
  }, [location]);

  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
    const initialFormData = {};
    setFormData(initialFormData);
  }, []);

  const [book, setBook] = useState({
    bookingno: "",
    bookingdate: dayjs(),
    bookingtime: "",
    status: "",
    tripid: "",
    customer: "",
    orderedby: "",
    mobile: "",
    guestname: "",
    guestmobileno: "",
    email: "",
    employeeno: "",
    address1: "",
    report: "",
    vehType: "",
    paymenttype: "",
    startdate: "",
    starttime: "",
    reporttime: "",
    duty: "",
    pickup: "",
    customercode: "",
    registerno: "",
    flightno: "",
    guestsms: "",
    sendemail: "",
    orderbyemail: "",
    remarks: "",
    servicestation: "",
    advance: "",
    useage: "",
    username: "",
    emaildoggle: "",
    hireTypes: "",
    travelsname: "",
    vehRegNo: "",
    vehiclemodule: "",
    driverName: "",
    mobileNo: "",
    travelsemail: "",
    Groups: ""
  });

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      bookingno: "",
      bookingdate: "",
      bookingtime: "",
      tripid: "",
      customer: "",
      orderedby: "",
      mobile: "",
      guestname: "",
      guestmobileno: "",
      email: "",
      employeeno: "",
      address1: "",
      report: "",
      vehType: "",
      paymenttype: "",
      startdate: "",
      starttime: "",
      reporttime: "",
      duty: "",
      pickup: "",
      customercode: "",
      registerno: "",
      flightno: "",
      orderbyemail: "",
      remarks: "",
      servicestation: "",
      advance: "",
      useage: "",
      username: "",
      emaildoggle: "",
      hireTypes: "",
      travelsname: "",
      vehRegNo: "",
      vehiclemodule: "",
      driverName: "",
      mobileNo: "",
      travelsemail: "",
      Groups: ""
    }));

    setFormValues({});
    setSelectedCustomerData({});
    setSelectedCustomerDatas({});
    setFormData({});
    setSelectedCustomerdriver({})

    setIsEditMode(false);
  };

  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';


    try {

      const fileName = "BookingStatement Reports"
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      const headers = Object.keys(row[0]);
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

      row.forEach((singleData, index) => {


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
    //  const header = Object.keys(row[0]);
    const keysToRemove = ["orderedby", "useage", "mobile", "username"];

    const header = Object.keys(row[0]).filter(key => !keysToRemove.includes(key));


    // Extracting body
    const body = row.map(row => Object.values(row));

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
        fontSize: fontdata,
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
    saveAs(pdfBlob, 'BookingStatement Reports.pdf');
  };


  // const handlePdfDownload = () => {
  //   const pdf = new jsPDF("Landscape");
  //   pdf.setFontSize(12);
  //   pdf.setFont("helvetica", "normal");
  //   pdf.text("Booking Statement Reports", 10, 10);

  //   // Modify tableData to exclude the index number
  //   const tableData = rows.map((row) => [
  //     row["id"],
  //     row["status"],
  //     row["bookingno"],
  //     row["tripid"],
  //     row["bookingdate"],
  //     row["bookingtime"],
  //     row["guestname"],
  //     row["mobileno"],
  //     row["address1"],
  //     row["streetno"],
  //     row["customer"],
  //     row["vehRegNo"],
  //   ]);

  //   pdf.autoTable({
  //     head: [
  //       [
  //         "Sno",
  //         "Status",
  //         "Booking ID",
  //         "Tripsheet No",
  //         "Date",
  //         "Time",
  //         "Guest Name",
  //         "Mobile",
  //         "R.Address",
  //         "R.Address1",
  //         "R.Address2",
  //         "Company",
  //         "Register NO",
  //       ],
  //     ],
  //     body: tableData,
  //     startY: 20,
  //   });

  //   const pdfBlob = pdf.output("blob");
  //   saveAs(pdfBlob, "BookingStatement Reports.pdf");
  // };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleChange = useCallback(
    (event) => {
      const { name, value, checked, type } = event.target;

      if (type === "checkbox") {
        setBook((prevBook) => ({
          ...prevBook,
          [name]: checked,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: checked,
        }));
      } else if (type === "radio") {
        setBook((prevBook) => ({
          ...prevBook,
          [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      } else {
        const fieldValue = value;
        setBook((prevBook) => ({
          ...prevBook,
          [name]: fieldValue,
        }));
        setSelectedCustomerData((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setSelectedCustomerDatas((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: fieldValue,
        }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: fieldValue,
        }));
        setSelectedCustomerdriver((prevValues) => ({
          ...prevValues,
          [name]: fieldValue,
        }));
      }
    },
    [
      setBook,
      setSelectedCustomerData,
      setFormData,
      setFormValues,
      setSelectedCustomerDatas,
      setSelectedCustomerdriver,
    ]
  );

  const handleAutocompleteChange = (event, value, name) => {
    const selectedOption = value ? value.label : "";
    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  const handleDateChange = (date, name) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");
    setBook((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
    setSelectedCustomerData((prevValues) => ({
      ...prevValues,
      [name]: parsedDate,
    }));
  };

  const [vehileName, setVehicleName] = useState([])


  useEffect(() => {
    const fetchgetvehicleName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/ge-tVehicleName`);
        const data = response.data
        const name = data?.map((res) => res.vehiclename)

        setVehicleName(name)


      }
      catch (error) {
        console.log(error, "error");
      }
    };
    fetchgetvehicleName()
  }, [apiUrl])

  // ------its for dialog--------------------
  const [dialogOpen, setDialogOpen] = useState(false);

  const booking_id =
    formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
  const handleButtonClick = () => {
    const booking_no = formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
    if (!booking_no) {
      setError(true);
      setErrorMessage("PLease Enter Booking No");
      return;
    }
    // setDialogOpen(true);
    showPdf();
  };

  // ------------------------------------------------------------
  const [allFile, setAllFile] = useState([]);

  const showPdf = async () => {
    try {
      const response = await axios.get(`${apiUrl}/booking-docPDFView/${booking_id}`)

      if (response.data.files.length > 0) {
        setAllFile(response.data.files);

        setDialogOpen(true);

      }
      else {
        setError(true);
        setErrorMessage("No data found");
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [file, setFile] = useState(null);

  const addPdf = async (lastbookid) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(`${apiUrl}/bookingdatapdf/${lastbookid}`, formData)
        setFile(null)

      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      return
    }
  };

  //--------------------------------------------------------------

  // const handleSendSMS = async (trip) => {
  //   const bookingno = trip

  //   // if (guestsms || formData.guestsms || book.guestsms) {
  //   if (guestsms || sendguestsms) {
  //     try {
  //       const dataToSend = {
  //         guestname:
  //           formValues.guestname ||
  //           selectedCustomerData.guestname ||
  //           book.guestname ||
  //           formData.guestname ||
  //           "",
  //         guestmobileno:
  //           formValues.guestmobileno ||
  //           selectedCustomerData.guestmobileno ||
  //           book.guestmobileno ||
  //           formData.guestmobileno ||
  //           "",
  //         tripid: bookingno,
  //         email:
  //           formValues.email ||
  //           selectedCustomerData.email ||
  //           book.email ||
  //           formData.pickup ||
  //           "",
  //         pickup:
  //           formValues.pickup ||
  //           selectedCustomerData.pickup ||
  //           book.pickup ||
  //           formData.pickup ||
  //           "",
  //         useage:
  //           formValues.useage ||
  //           selectedCustomerData.useage ||
  //           book.useage ||
  //           formData.useage ||
  //           "",
  //         reporttime:
  //           formValues.reporttime ||
  //           formData.reporttime ||
  //           selectedCustomerData.reporttime ||
  //           book.reporttime ||
  //           "",
  //         startdate:
  //           formValues.startdate ||
  //           formData.startdate ||
  //           selectedCustomerData.startdate ||
  //           book.startdate || dayjs() ||
  //           "",
  //         address1:
  //           formValues.address1 ||
  //           formData.address1 ||
  //           selectedCustomerData.address1 ||
  //           book.address1 ||
  //           "",
  //       };

  //       const response = await fetch(`${apiUrl}/send-sms`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(dataToSend),
  //       });

  //       if (response.ok) {
  //         setSuccess(true);
  //         setSuccessMessage("SMS sent correctly");
  //       } else {
  //         setError(true);
  //         setErrorMessage("Failed to send SMS");
  //       }
  //     } catch {
  //       setError(true);
  //       setErrorMessage("Error sending SMS");
  //     }
  //   }
  // };

  const handlecheck = async (lastBookingno) => {
    if (sendEmail || sendmailguestsms) {

      const datamode = isEditMode ? selectedCustomerData.status : book.status
      try {
        const user = localStorage.getItem("username")
        const dataToSend = {
          guestname:
            formValues.guestname ||
            selectedCustomerData.guestname ||
            book.guestname ||
            formData.guestname,
          guestmobileno:
            formValues.guestmobileno ||
            selectedCustomerData.guestmobileno ||
            book.guestmobileno ||
            formData.guestmobileno,
          email: formValues.email || selectedCustomerData.email || book.email,
          pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
          useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
          starttime: formValues.reporttime || formData.reporttime || selectedCustomerData.reporttime || book.reporttime || "",
          startdate: formValues.startdate || formData.startdate || selectedCustomerData.startdate || book.startdate || dayjs() || "",
          driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
          vehType: formData.vehType || selectedCustomerData.vehType || book.vehType || selectedCustomerdriver.vehType,
          mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
          vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
          tripid: formData.tripid || selectedCustomerData.tripid || book.tripid,
          servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation,
          // status: book.status || formData.status || selectedCustomerData.status,
          requestno: formData.registerno || selectedCustomerData.registerno || book.registerno || "",
          duty: formData.duty || selectedCustomerData.duty || book.duty || "",
          bookingno: lastBookingno || '',
          customeremail: formData.orderbyemail || selectedCustomerData.orderbyemail || selectedCustomerDatas.customeremail || book.orderbyemail || "",
          username: user,
          Address: formData.address1 || selectedCustomerData.address1 || book.address1 || "",
          status: datamode



        };
        await axios.post(`${apiUrl}/send-email`, dataToSend);
        setSuccess(true);
        setSuccessMessage("Mail Sent Successfully");
      } catch (error) {
        setError(true);
        setErrorMessage("An error occured while sending mail", error);
      }
    } else {
      setError(true);
      setErrorMessage("Send mail checkbox is not checked. Email not sent.");
    }
  };


  const [lastBookingNo, setLastBookingNo] = useState("");
  const reportdate = dayjs(book.startdate)


  const handleAdd = async () => {

    if (!selectedCustomerData.guestmobileno) {
      setError(true);
      setErrorMessage("Enter Guest Mobile Number");
      // setGuestSms(false);
      return;
    }

    if (!reportdate) {
      setError(true);
      setErrorMessage("Enter Report Date");
      return;
    }

    if (!selectedCustomerData.customer) {
      setError(true)
      setErrorMessage("Enter Customer Name")
      return
    }

    if (!selectedCustomerData.starttime) {
      setError(true)
      setErrorMessage("Enter starting Time")
      return
    }
    if (!selectedCustomerData.reporttime) {
      setError(true)
      setErrorMessage("Enter Report Time")
      return
    }
    if (!selectedCustomerData.guestname) {
      setError(true)
      setErrorMessage("Enter GuestName")
      return
    }
    if (!selectedCustomerData.address1) {
      setError(true);
      setErrorMessage("Enter Address Details");
      return;
    }
    const customer = book.status;
    if (customer === "") {
      setError(true);
      setErrorMessage("Fill mandatory fields");
      return;
    }

    try {


      const selectedBookingDate =
        selectedCustomerData.bookingdate || formData.bookingdate || dayjs();

      const bookingstartdate = selectedCustomerData.startdate || formData.startdate || book.startdate || dayjs();
      // Create a new object without the 'id' field from selectedCustomerData
      const { id, ...restSelectedCustomerData } = selectedCustomerData;
      let { customerId, customerType, ...restSelectedCustomerDatas } = selectedCustomerDatas;

      const updatedBook = {

        // ...book,
        // ...formData,
        // ...selectedCustomerData,
        // ...restSelectedCustomerData, // Use the modified object without 'id'
        // ...selectedCustomerDatas,
        // ...restSelectedCustomerDatas,
        bookingtime: bookingtime || getCurrentTime(),
        bookingdate: selectedBookingDate,
        starttime: restSelectedCustomerData.starttime,
        status: book.status,
        mobile: selectedCustomerDatas.phoneno || selectedCustomerData.mobile,
        guestname: selectedCustomerData.guestname || formData.guestname || book.guestname || formValues.guestname,
        guestmobileno: formData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno,
        email: formData.email || selectedCustomerData.email || formValues.email || book.email,
        employeeno: formData.employeeno || selectedCustomerData.employeeno || book.employeeno,
        address1: formData.address1 || selectedCustomerData.address1 || book.address1,
        // streetno: formData.streetno || selectedCustomerData.streetno || book.streetno,
        // city: formData.city || selectedCustomerData.city || book.city,
        report: formData.report || selectedCustomerData.report || book.report,
        vehType: formData.vehType || selectedCustomerData.vehType || book.vehType || selectedCustomerdriver.vehType,
        paymenttype: formData.paymenttype || selectedCustomerData.paymenttype || book.paymenttype,
        startdate: bookingstartdate,
        duty: formData.duty || selectedCustomerData.duty || book.duty,
        pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
        customercode: formData.customercode || selectedCustomerData.customercode || book.customercode,
        useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
        registerno: formData.registerno || selectedCustomerData.registerno || book.registerno,
        flightno: formData.flightno || selectedCustomerData.flightno || book.flightno,
        orderbyemail: formData.orderbyemail || selectedCustomerData.orderbyemail || selectedCustomerDatas.customeremail || book.orderbyemail,
        remarks: formData.remarks || selectedCustomerData.remarks || book.remarks,
        servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation,
        advance: formData.advance || selectedCustomerData.advance || book.advance,
        hireTypes: formData.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || selectedCustomerdriver.hireTypes,
        travelsname: formData.travelsname || selectedCustomerData.travelsname || book.travelsname,
        vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
        vehiclemodule: formData.vehiclemodule || selectedCustomerData.vehiclemodule || book.vehiclemodule || selectedCustomerdriver.vehiclemodule,
        driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
        mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
        travelsemail: formData.travelsemail || selectedCustomerData.travelsemail || book.travelsemail,
        reporttime: restSelectedCustomerData.reporttime,
        // triptime: triptime,
        username: storedUsername,
        Groups: selectedCustomerData.Groups || book.Groups || formData.Groups || selectedCustomerdriver.Groups,

        orderedby: restSelectedCustomerData.orderedby || formData.orderedby || book.orderedby || restSelectedCustomerDatas.name,
        customer: restSelectedCustomerData.customer
      };

      setSendmailGuestsms(true)
      await axios.post(`${apiUrl}/booking`, updatedBook);
      const response = await axios.get(`${apiUrl}/last-booking-no`);
      const lastBookingno = response.data.bookingno;

      setLastBookingNo(lastBookingno);
      setPopupOpen(true);
      handleCancel();
      setRowsdriver([])
      // addPdf(lastBookingNo);
      setRow([]);
      setRows([]);
      setSuccess(true);
      setSuccessMessage("Successfully Added");

      handlecheck(lastBookingno);
      addPdf(lastBookingno);

      setEdit(false)
    } catch (error) {
      console.error("An error occurred:", error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }

  };


  const handleEdit = async (userid) => {

    try {
      const selectedCustomer = rows.find(
        (row) =>
          row.bookingno === selectedCustomerData.bookingno ||
          formData.bookingno
      );


      const selectedBookingDate =
        selectedCustomerData.bookingdate || formData.bookingdate || dayjs();

      const bookingstartdate = selectedCustomerData.startdate || formData.startdate || book.startdate || dayjs();
      const booking_no =
        formData.bookingno || selectedCustomerData.bookingno || book.bookingno;
      const { id, ...restSelectedCustomerData } = selectedCustomerData;
      let { customerId, customerType, ...restSelectedCustomerDatas } = selectedCustomerDatas;
      const updatedCustomer = {
        ...selectedCustomer,
        //     // ...book,
        //     // ...formData,
        //     // ...selectedCustomerData,
        //     // ...restSelectedCustomerData, // Use the modified object without 'id'
        //     // ...selectedCustomerDatas,
        //     // ...restSelectedCustomerDatas,
        bookingtime: bookingtime || getCurrentTime(),
        bookingdate: selectedBookingDate,
        starttime: restSelectedCustomerData.starttime,
        status: selectedCustomerData.status,
        mobile: selectedCustomerDatas.phoneno || selectedCustomerData.mobile,
        guestname: selectedCustomerData.guestname || formData.guestname || book.guestname || formValues.guestname,
        guestmobileno: formData.guestmobileno || selectedCustomerData.guestmobileno || formValues.guestmobileno || book.guestmobileno,
        email: formData.email || selectedCustomerData.email || formValues.email || book.email,
        employeeno: formData.employeeno || selectedCustomerData.employeeno || book.employeeno,
        address1: formData.address1 || selectedCustomerData.address1 || book.address1,
        // streetno: formData.streetno || selectedCustomerData.streetno || book.streetno,
        // city: formData.city || selectedCustomerData.city || book.city,
        report: formData.report || selectedCustomerData.report || book.report,
        vehType: formData.vehType || selectedCustomerData.vehType || book.vehType || selectedCustomerdriver.vehType,
        paymenttype: formData.paymenttype || selectedCustomerData.paymenttype || book.paymenttype,
        startdate: bookingstartdate,
        duty: formData.duty || selectedCustomerData.duty || book.duty,
        pickup: formData.pickup || selectedCustomerData.pickup || formValues.pickup || book.pickup,
        customercode: formData.customercode || selectedCustomerData.customercode || book.customercode,
        useage: formData.useage || selectedCustomerData.useage || formValues.useage || book.useage,
        registerno: formData.registerno || selectedCustomerData.registerno || book.registerno,
        flightno: formData.flightno || selectedCustomerData.flightno || book.flightno,
        orderbyemail: formData.orderbyemail || selectedCustomerData.orderbyemail || selectedCustomerDatas.customeremail || book.orderbyemail,
        remarks: formData.remarks || selectedCustomerData.remarks || book.remarks,
        servicestation: formData.servicestation || selectedCustomerData.servicestation || book.servicestation || selectedCustomerDatas.servicestation || "",
        advance: formData.advance || selectedCustomerData.advance || book.advance,
        hireTypes: formData.hireTypes || selectedCustomerData.hireTypes || book.hireTypes || selectedCustomerdriver.hireTypes,
        travelsname: formData.travelsname || selectedCustomerData.travelsname || book.travelsname,
        vehRegNo: formData.vehRegNo || selectedCustomerData.vehRegNo || book.vehRegNo || selectedCustomerdriver.vehRegNo,
        vehiclemodule: formData.vehiclemodule || selectedCustomerData.vehiclemodule || book.vehiclemodule || selectedCustomerdriver.vehiclemodule,
        driverName: formData.driverName || selectedCustomerData.driverName || book.driverName || selectedCustomerdriver.driverName,
        mobileNo: formData.mobileNo || selectedCustomerData.mobileNo || book.mobileNo || selectedCustomerdriver.mobileNo,
        travelsemail: formData.travelsemail || selectedCustomerData.travelsemail || book.travelsemail,
        reporttime: restSelectedCustomerData.reporttime,
        // triptime: triptime,
        username: storedUsername,
        Groups: formData.Groups || selectedCustomerData.Groups || book.Groups || selectedCustomerdriver.Groups,

        orderedby: restSelectedCustomerData.orderedby || formData.orderedby || book.orderedby || restSelectedCustomerDatas.name,
        customer: restSelectedCustomerData.customer
      };
      const editbookno = book.bookingno || selectedCustomerData.bookingno || formData.bookingno

      const response = await axios.put(`${apiUrl}/booking/${book.bookingno || selectedCustomerData.bookingno || formData.bookingno}`,
        updatedCustomer
      )

      if (response.data.success) {
        if (response.status === 201) {
          setSuccess(true);
          setSuccessMessage(response.data.message);

        } else {
          setInfo(true);
          setInfoMessage(response.data.message);
        }

        setEdit(false)
        addPdf(booking_no);
        setRow([]);
        setRowsdriver([])
        setRows([]);
        handleCancel();
        if (sendEmail) {
          handlecheck(editbookno);
        }
      }

    } catch (error) {
      console.error("An error occurred:", error);
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };



  const handleClick = async (event, actionName) => {
    event.preventDefault();
    try {
      if (actionName === "Email") {
      } else if (actionName === "Clear") {
        handleCancel();
        setRows([]);
        setRow([]);
        setRowsdriver([])
      } else if (actionName === "Delete") {

        const response = await axios.delete(`${apiUrl}/booking/${book.bookingno || selectedCustomerData.bookingno}`);

        if (response.data.success) {
          if (response.status === 201) {
            setSuccess(true);
            setSuccessMessage(response.data.message);
          } else {
            setInfo(true);
            setInfoMessage(response.data.message)
          }
          setSelectedCustomerData(null);

          setFormData(null);
          handleCancel();
          setRow([]);
          setRows([]);
          setRowsdriver([])
        }

      } else if (actionName === "Modify") {

        setSendEmail(false)
        handleEdit()

      } else if (actionName === "Copy This") {
        handleClickShow();
      } else if (actionName === "Add") {
        handleAdd();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(true);
      setErrorMessage("Check Network Connection");
    }
  };

  useEffect(() => {
    if (actionName === "List") {
      handleClick(null, "List");
    }
  });

  const handleClickShow = () => {
    setDisplayCopy(true);
  };

  const handleClickHide = () => {
    setDisplayCopy(false);
  };

  const actions = [
    { icon: <LocalPostOfficeIcon />, name: "Email" },
    { icon: <CancelPresentationIcon />, name: "Clear" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <ModeEditIcon />, name: "Modify" },
    { icon: <ContentCopyIcon />, name: "Copy This" },
    edit ? "" : { icon: <BookmarkAddedIcon />, name: "Add" }
  ];

  const handleKeyDown = useCallback(async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const response = await axios.get(
          `${apiUrl}/booking/${event.target.value}`
        );
        const bookingDetails = response.data;
        setSelectedCustomerData(bookingDetails);
        setSelectedCustomerId(bookingDetails.tripid);
        setIsEditMode(true);
        setEdit(true)
        setSendEmail(false);
        // setGuestSms(false)
      } catch {
        setError(true);
        setErrorMessage("Error retrieving booking details");
      }
    }
  }, [apiUrl]);

  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const current = new Date().getFullYear();
    const pastYear = current - 1;
    const value = `JESSY CABS ${pastYear}-${current}`;
    setCurrentYear(value);
  }, []);

  const [enterPressCount, setEnterPressCount] = useState(0);

  const handleKeyEnter = useCallback(
    async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (enterPressCount === 0) {
          try {
            const response = await axios.get(
              `${apiUrl}/name-customers/${event.target.value}`
            );
            const vehicleData = response.data;

            setRows([vehicleData]);
          } catch (error) {
            setError(true);
            setErrorMessage("Error retrieving vehicle details.");
          }
        } else if (enterPressCount === 1) {
          const selectedRow = rows[0];
          if (selectedRow) {
            setSelectedCustomerDatas(selectedRow);
            handleChange({
              target: { name: "customer", value: selectedRow.customer },
            });
          }
        }
        setEnterPressCount((prevCount) => prevCount + 1);
      }
      if (event.target.value === "") {
        setEnterPressCount(0);
      }
    },
    [handleChange, rows, enterPressCount, apiUrl]
  );

  const handleKeyEnterdriver = useCallback(
    async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        try {
          const response = await axios.get(
            `${apiUrl}/drivername-details/${event.target.value}`
          );
          const vehicleData = response.data;
          const transformedRows = vehicleData.map(transformRow);


          setRowsdriver(transformedRows)
          setSuccess(true);
          setSuccessMessage("successfully listed");

        } catch (error) {
          setError(true);
          setErrorMessage("Error retrieving vehicle details.");
        }
      }

    },
    [apiUrl]
  );

  const handleRowClick = useCallback(
    (params) => {
      setSelectedCustomerDatas(params);
      handleChange({ target: { name: "customer", value: params.customer } });
    },
    [handleChange]
  );
  const handleRowClickdriver = (params) => {

    setSelectedCustomerdriver(params);
    // setSelectedCustomerDatas(params);
    const keys = Object.keys(params);

    // Iterate over the keys using forEach
    keys.forEach(key => {
      const value = params[key];

      handleChange({ target: { name: key, value: value } });
    });

  }



  const handletableClick = useCallback((params) => {
    // setGuestSms(false)
    setSendEmail(false)
    setEdit(true)
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.customerId);
    setIsEditMode(true);
  }, []);

  const reversedRows = [...row].reverse();
  // const reversedRows1 = [...row]

  const handleShowAll = async () => {

    try {
      const response = await fetch(
        `${apiUrl}/table-for-booking?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const rowsWithUniqueId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        setRow(rowsWithUniqueId);
        setSuccess(true);
        setSuccessMessage("successfully listed");
      } else {
        setRow([]);
        setError(true);
        setErrorMessage("no data found");
      }
    } catch {
      setError(true);
      setErrorMessage("sorry");
    }

  };


  const handleenterSearch = async (e) => {

    if (e.key === "Enter") {
      try {
        const response = await fetch(
          `${apiUrl}/table-for-booking?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const rowsWithUniqueId = data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setRow(rowsWithUniqueId);
          setSuccess(true);
          setSuccessMessage("successfully listed");
        } else {
          setRow([]);
          setError(true);
          setErrorMessage("no data found");
        }
      } catch {
        setError(true);
        setErrorMessage("There is some catch issue");
      }

    }
  };
  useEffect(() => {
    if (user && user.username) {
      const username = user.username;
      localStorage.setItem("username", username);
    }
  }, [user]);
  const storedUsername = localStorage.getItem("username");



  // const [attachedImage, setAttachedImage] = useState("");

  // const handleGetMail = useCallback(async () => {
  //   try {
  //     const bookingno = book.bookingno || selectedCustomerData.bookingno;
  //     if (!bookingno) {
  //       setError(true);
  //       setErrorMessage("Enter booking No");
  //       return;
  //     }
  //     const response = await fetch(
  //       `${apiUrl}/get-attachedmailimage/${bookingno}`
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setAttachedImage(data.files);
  //     setpopupOpenmail(true);
  //   } catch { }
  // }, [book.bookingno, selectedCustomerData.bookingno, apiUrl]);

  const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

  const handleClosedeleteDialog = () => {
    setDialogdeleteOpen(false);
  };

  const [imagedata, setImagedata] = useState(null);


  const handleimagedelete = (imageName) => {
    setImagedata(imageName);
    setDialogdeleteOpen(true);
  };


  const handleContextMenu = () => {
    axios
      .delete(`${apiUrl}/booking_doc/` + imagedata)
      .then((res) => { })
      .catch((err) => console.log(err));
    setDialogdeleteOpen(false);
    setDialogOpen(false);
  };

  return {
    selectedCustomerData,
    selectedCustomerId,
    rows,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    // warningMessage,
    book,
    handleClick,
    handleChange,
    // attachedImage,
    handleRowClick,
    handleAdd,
    hidePopup,
    formData,
    handleKeyDown,
    // handleGetMail,
    handleDateChange,
    getCurrentTime,
    setBook,
    setSelectedCustomerData,
    setBookingTime,
    selectedCustomerDatas,
    handleKeyEnter,
    formValues,
    handleAutocompleteChange,
    setFormData,
    setStartTime,
    // guestsms,
    // setGuestSms,
    popupOpenmail,
    sendEmail,
    setSendEmail,
    displayCopy,
    currentYear,
    handleClickHide,
    actions,
    searchText,
    setSearchText,
    lastBookingNo,
    setreporttime,
    storedUsername,
    fromDate,
    popupOpen,
    handlePopupClose,
    setFromDate,
    toDate,
    setToDate,
    handleShowAll,
    handleExcelDownload,
    handlePdfDownload,
    reversedRows,
    columns,
    handletableClick,
    setFile,
    dialogOpen,
    handleCloseDialog,
    allFile,
    handleButtonClick,
    isEditMode,
    handleEdit,
    handleContextMenu,
    handleimagedelete,
    handleClosedeleteDialog,
    dialogdeleteOpen,
    setErrorMessage,
    setError,
    handleenterSearch,
    edit,
    setEdit,
    reporttime,
    starttime,
    handleKeyEnterdriver,
    rowdriver,
    handleRowClickdriver,
    selectedCustomerdriver,
    vehileName, infoMessage
  };
};

export default useBooking;
