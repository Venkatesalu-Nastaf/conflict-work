import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { Organization } from "../../billingMain/PaymentDetail/PaymentDetailData";
import { APIURL } from "../../../url";
import { useLocation } from "react-router-dom";
import { PdfData } from "./PdfContext";


const useTransferreport = () => {
  const apiUrl = APIURL;

  const [pbpopupOpen, setpbPopupOpen] = useState(false);
  const [npopupOpen, setnPopupOpen] = useState(false);
  const [lxpopupOpen, setlxPopupOpen] = useState(false);
  const [servicestation, setServiceStation] = useState("");
  const [customer, setCustomer] = useState("");
  const [groupTripid, setGroupTripid] = useState("")
  const [invoiceno, setInvoiceno] = useState("")
  const [fromDate, setFromDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [date] = useState(dayjs());
  const [info, setInfo] = useState(false);
  const [bankOptions, setBankOptions] = useState([]);
  const [tripData, setTripData] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [warning, setWarning] = useState(false);
  const [warningMessage] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [misformat, setMisformat] = useState('')
  const [pdfBillList, setPdfBillList] = useState('')

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [pdfzipdata, setPdfzipdata] = useState([])
  const location = useLocation()
  const { transferReport, setTransferReport } = PdfData()

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const parameterKeys = [
      "Invoice_no", "Group_id", "Customer", "FromDate", "EndDate", "BillDate", "TransferReport", "TripId"
    ];

    const formData = {};
    parameterKeys.forEach(key => {
      const value = params.get(key);
      if (value !== null && value !== "null") {
        formData[key] = value;
      }
    });
    setCustomer(formData.Customer)
    setFromDate(formData.FromDate)
    setEndDate(formData.EndDate)
    setGroupTripid(formData.Group_id)
    setInvoiceno(formData.Invoice_no)
    setInvoiceDate(formData.BillDate)
    setTransferReport(formData.TransferReport)
  }, [location, setTransferReport])

  window.addEventListener('click', (event) => {
    if (event.target === window) {
      setTransferReport(false)
    }
  });
  useEffect(() => {
    if (transferReport === false || transferReport === undefined) {
      setCustomer('')
      setFromDate('')
      setEndDate('')
      setGroupTripid('')
      setRatetypeforpage("")
      setInvoiceno('')
      setInvoiceDate('')
      setGroupTripid('');
      setCustomerData("")
      setRows([])
      setRowSelectionModel([])
    }
  }, [transferReport, setTransferReport])
  useEffect(() => {
    window.history.replaceState(null, document.title, window.location.pathname);
  }, []);
  const tableData = rows.map((row) => [
    row["id"],
    row["tripid"],
    row["vcode"],
    row["guestname"],
    row["status"]
  ]);
  const handleExcelDownload = () => {
    const header = ["Sno", "Tripsheet No", "VCode", "Status", "Guest Name"];
    const csvData = [
      header,
      ...tableData.map((row) => row.map((value) => `"${value}"`)),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "customer_details.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Customer Details", 10, 10);
    pdf.autoTable({
      head: [["Sno", "Tripsheet No", "VCode", "Status", "Guest Name"]],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output("blob");
    saveAs(pdfBlob, "Transfer Report.pdf");
  };

  useEffect(() => {
    if (error || success || warning || info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, warning, info]);


  const handleEInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setpbPopupOpen(true);
  };
  const handleMapInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setnPopupOpen(true);
  };

  const handleLuxuryInvoiceClick = (row) => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setlxPopupOpen(true);
  };

  const handleETripsheetClick = () => {
    if (rows.length === 0) {
      setError(true);
      setErrorMessage("No data available. Please fetch data");
      return;
    }
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setpbPopupOpen(false);
    setnPopupOpen(false);
    setlxPopupOpen(false);
  };

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripid = localStorage.getItem("selectedtripsheetid");
        const encoded = localStorage.getItem("selectedcustomerdata");
        localStorage.setItem("selectedcustomer", encoded);
        const storedCustomer = localStorage.getItem("selectedcustomer");
        const customer = decodeURIComponent(storedCustomer);

        if (!customer || !tripid) return

        const response = await fetch(
          `${apiUrl}/tripsheetcustomertripid/${encodeURIComponent(
            customer
          )}/${tripid}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tripData = await response.json();
        if (Array.isArray(tripData)) {
          setTripData(tripData);
          const tripsheetNumbers = tripData.map((row, index) => ({
            id: index + 1,
            guestname: row.guestname,
            tripid: row.tripid,
            status: row.status,
            customer: row.customer
          }));
          if (tripsheetNumbers.length > 0) {
            const rowsWithUniqueId = tripsheetNumbers.map((row, index) => ({
              ...row,
              id: index + 1,
            }));
            setRows(rowsWithUniqueId);
            // setSuccess(true);
            setSuccessMessage("successfully listed");
          } else {
            setRows([]);
            setError(true);
            setErrorMessage("no data found");
          }
        } else if (typeof tripData === "object") {
          const tripsheetNumbers = [
            { id: 1, guestname: tripData.guestname, tripid: tripData.tripid },
          ];
          setRows(tripsheetNumbers);
        } else {
        }
      } catch { }
    };
    fetchData();
  }, [apiUrl]);

  const customerName = localStorage.getItem("selectedcustomerdata");
  localStorage.setItem("selectedcustomer", customerName);

  const handleserviceInputChange = (event, newValue) => {
    setServiceStation(newValue ? decodeURIComponent(newValue.label) : "");
  };

  //tripsheet data get for normal invoice
  const [routeData, setRouteData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [roundedAmount, setRoundedAmount] = useState("");
  const [sumTotalAndRounded, setSumTotalAndRounded] = useState("");
  const [ratetypeforpage, setRatetypeforpage] = useState("");

  const calculateNetAmountSum = (data) => {
    return data.reduce((sum, item) => {
      const netAmountValue = parseFloat(item.netamount, 10);
      return sum + netAmountValue;
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tripid = localStorage.getItem("selectedtripsheetid");
      const customer = localStorage.getItem("selectedcustomer");

      try {

        if (!tripid || !customer) return

        const response = await fetch(
          `${apiUrl}/tripsheetcustomertripid/${customer}/${tripid}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        if (Array.isArray(responseData)) {
          setRouteData(responseData);
          const netAmountSum = calculateNetAmountSum(responseData);
          setTotalValue(netAmountSum);

          const calculateRoundOff = () => {
            const balanceAmount = parseFloat(totalValue);
            const roundedGrossAmount = Math.ceil(balanceAmount);
            const roundOff = roundedGrossAmount - balanceAmount;
            return roundOff.toFixed(2);
          };

          const roundOffValue = calculateRoundOff();
          setRoundedAmount(roundOffValue);

          const sumTotalAndRounded =
            parseFloat(netAmountSum) + parseFloat(roundOffValue);
          setSumTotalAndRounded(sumTotalAndRounded);
        } else {
        }
      } catch { }

    };
    fetchData();
  }, [totalValue, roundedAmount, apiUrl]);

  useEffect(() => {
    //this is for getting organization details
    const fetchData = async () => {
      const customer = localStorage.getItem("selectedcustomerdata");
      try {

        if (!customer) return

        const response = await fetch(
          `${apiUrl}/customers/${encodeURIComponent(customer)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const customerData = await response.json();
        setCustomerData(customerData);
        const ratetype = customerData.rateType;
        setRatetypeforpage(ratetype)
      } catch { }
    };
    fetchData();
  }, [apiUrl]);



  const organizationaddress1 = customerData.address1;
  const organizationaddress2 = customerData.address2;
  const organizationcity = customerData.city;
  const organizationgstnumber = customerData.gstnumber;

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

  const [routedData, setRoutedData] = useState("");

  useEffect(() => {
    const fetchData4 = async () => {
      try {
        const fromdate = localStorage.getItem("fromDate");
        const todate = localStorage.getItem("toDate");
        const customerValue =
          encodeURIComponent(customer) ||
          (tripData.length > 0 ? tripData[0].customer : "");
        const fromDateValue = fromdate;
        const toDateValue = todate;
        const servicestationValue =
          servicestation || (tripData.length > 0 ? tripData[0].department : "");
        if (
          customerValue.trim() !== "" ||
          fromDateValue.trim() !== "" ||
          toDateValue.trim() !== "" ||
          servicestationValue.trim() !== ""
        ) {
          const response = await fetch(`${apiUrl}/Get-Billing`, {
            params: {
              customer: customerValue,
              fromDate: fromDateValue,
              toDate: toDateValue,
              servicestation: servicestationValue,
            },
          });

          const routedData = await response.json();
          setRoutedData(routedData);
        }
      } catch { }
    };

    fetchData4();
  }, [customer, servicestation, tripData, apiUrl]);

  const [attachedImage, setAttachedImage] = useState("");
//  its is booking table or tripsheettabel
//  i change api for booking mail pdf go to see booking.js
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripid = localStorage.getItem("selectedtripsheetid");
        if (!tripid) {
          return;
        }
        const response = await fetch(
          `${apiUrl}/get-attachedmailimage/${tripid}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const attachedImageUrls = data.imagePaths.map(
          (path) => `${apiUrl}/images/${path}`
        );
        setAttachedImage(attachedImageUrls);
      } catch { }
    };
    fetchData();
  }, [apiUrl]);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationname = localStorage.getItem("usercompany");
        if (!organizationname) {
          return;
        }
        const response = await fetch(
          `${apiUrl}/get-companyimage/${organizationname}`
        );
        if (response.status === 200) {
          const data = await response.json();
          const attachedImageUrls = data.imagePaths.map(
            (path) => `${apiUrl}/images/${path}`
          );
          localStorage.setItem(
            "selectedImage",
            JSON.stringify(attachedImageUrls)
          );
          setSelectedImage(attachedImageUrls);
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch { }
    };
    fetchData();
  }, [apiUrl]);

  const [organizationdata, setorganizationData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const encoded = localStorage.getItem("usercompany");
      localStorage.setItem("usercompanyname", encoded);
      const storedcomanyname = localStorage.getItem("usercompanyname");
      const organizationname = decodeURIComponent(storedcomanyname);
      try {
        const response = await fetch(
          `${apiUrl}/organizationdata/${organizationname}`
        );
        if (response.status === 200) {
          const userDataArray = await response.json();
          if (userDataArray.length > 0) {
            setorganizationData(userDataArray[0]);
          }
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch { }
    };

    fetchData();
  }, [apiUrl]);

  const handleRowSelection = (newSelectionModel) => {
    const selectedTripIds = newSelectionModel
      .filter((selectedId) => selectedId !== null)
      .map((selectedId) => {
        const selectedRow = rows.find((row) => row.id === parseInt(selectedId));
        return selectedRow ? selectedRow.tripid : null;
      })
      .filter((tripid) => tripid !== null);

    const tripsheetid = selectedTripIds;
    setRowSelectionModel(tripsheetid);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripid = rowSelectionModel
        const encoded = localStorage.getItem("selectedcustomerdata");
        localStorage.setItem("selectedcustomer", encoded);
        const storedCustomer = localStorage.getItem("selectedcustomer");
        const customer = decodeURIComponent(storedCustomer);

        if (tripid.length >= 1) {

          const response = await fetch(
            `${apiUrl}/pdfdatatransferreporttripid2/${encodeURIComponent(
              customer
            )}/${tripid}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const tripData = await response.json();

          setPdfzipdata(tripData)
          setSuccessMessage("successfully listed");
        }
        else {
          return
        }
      } catch { }
    };
    fetchData();
  }, [apiUrl, rowSelectionModel, pdfzipdata, rows]);

  return {
    rows,
    error,
    setError,
    success,
    warning,
    successMessage,
    errorMessage,
    setErrorMessage,
    warningMessage,
    organizationdata,
    hidePopup,
    routedData,
    date,
    customer,
    tripData,
    bankOptions,
    ratetypeforpage,
    attachedImage,
    setCustomer,
    servicestation,
    selectedImage,
    handleserviceInputChange,
    handleEInvoiceClick,
    handleMapInvoiceClick,
    handleLuxuryInvoiceClick,
    popupOpen,
    pbpopupOpen,
    handlePopupClose,
    npopupOpen,
    lxpopupOpen,
    handleExcelDownload,
    handlePdfDownload,
    handleETripsheetClick,
    routeData,
    roundedAmount,
    sumTotalAndRounded,
    totalValue,
    organizationaddress1,
    organizationaddress2,
    organizationcity,
    organizationgstnumber,
    invoiceno,
    groupTripid,
    fromDate,
    endDate,
    invoiceDate,
    misformat,
    setMisformat,
    pdfBillList,
    setPdfBillList,

    handleRowSelection,
    // rowzip,
    rowSelectionModel,

    setRowSelectionModel,
    pdfzipdata

  };
};

export default useTransferreport;
