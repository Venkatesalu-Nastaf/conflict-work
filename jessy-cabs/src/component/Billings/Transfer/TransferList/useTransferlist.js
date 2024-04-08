import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { Organization } from "../../billingMain/PaymentDetail/PaymentDetailData";
import { APIURL } from "../../../url";
import { useData } from "../../../Dashboard/Maindashboard/DataContext";
import { useNavigate } from "react-router-dom";

const useTransferlist = () => {
  const apiUrl = APIURL;
  // const user_id = localStorage.getItem("useridno");
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
  const { setOrganizationName } = useData()



  useEffect(() => {
    const organizationNames = async () => {
      try {
        const response = await axios.get(`${apiUrl}/customers`);
        const organisationData = response?.data;
        const names = organisationData.map(res => res.customer);
        setOrganizationName(names);
      } catch (error) {
        console.error('Error fetching organization names:', error);
      }
    };
    organizationNames();
  }, [apiUrl, setOrganizationName])


  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) =>
      columns.map((column) => row[column.field]).join(",")
    );
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Transfer_list.csv");
  };
  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Transfer_list", 10, 10);
    const tableData = rows.map((row) => [
      row["id"],
      row["status"],
      row["invoiceno"],
      row["Billingdate"],
      row["customer"],
      row["fromdate"],
      row["todate"],
      row["guestname"],
      row["trips"],
      row["Totalamount"],
    ]);
    pdf.autoTable({
      head: [
        [
          "Sno",
          "Status",
          "Invoice No",
          "Date",
          "Customer",
          "From Date",
          "To Date",
          "UserName",
          "Trips",
          "Amount",
        ],
      ],
      body: tableData,
      startY: 20,
    });
    const pdfBlob = pdf.output("blob");
    saveAs(pdfBlob, "Transfer_list.pdf");
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
  }, [customer, fromDate, toDate, servicestation, selectedStatus, apiUrl]);

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

  // const columns = [
  //   { field: "id", headerName: "Sno", width: 70 },
  //   { field: "status", headerName: "Status", width: 130 },
  //   { field: "invoiceno", headerName: "Invoice No", width: 130 },
  //   {
  //     field: "Billingdate",
  //     headerName: "Date",
  //     width: 130,
  //     valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  //   },
  //   { field: "customer", headerName: "Customer", width: 130 },
  //   {
  //     field: "fromdate",
  //     headerName: "From Date",
  //     width: 130,
  //     valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  //   },
  //   {
  //     field: "todate",
  //     headerName: "To Date",
  //     width: 150,
  //     valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  //   },
  //   { field: "guestname", headerName: "UserName", width: 150 },
  //   { field: "trips", headerName: "Trips", width: 150 },
  //   { field: "Totalamount", headerName: "Amount", width: 130 },
  // ];



  const handleButtonClickTripsheet = (params) => {
    const data = params.row;
    // const customername = encodeURIComponent(row.customer);
    // const encodedCustomer = customername;
    // localStorage.setItem("selectedcustomer", encodedCustomer);
    const storedCustomer = localStorage.getItem("selectedcustomer");
    const decodedCustomer = decodeURIComponent(storedCustomer);
    localStorage.setItem("selectedcustomer", decodedCustomer);
    // const billingPageUrl = `/home/billing/transfer?tab=dataentry`;
    // window.history.pushState({ path: billingPageUrl }, '', billingPageUrl);
    const billingPageUrl = `/home/billing/transfer?tab=dataentry&Groupid=${data.Grouptrip_id || ''}&Invoice_no=${data.Invoice_no || ''}&Status=${data.Status || ''}&Billdate=${data.Billdate || ''}&Organization_name=${data.Organization_name || ''}&Trip_id=${data.Trip_id || ''}&FromDate=${data.FromDate || ''}&EndDate=${data.EndDate || ''}&Amount=${data.Amount || ''}`
    // window.location.assign(billingPageUrl)
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
