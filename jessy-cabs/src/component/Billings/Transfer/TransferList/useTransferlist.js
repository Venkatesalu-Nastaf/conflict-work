import { useState, useEffect, useCallback, useContext } from "react";
import { PermissionsContext } from "../../../permissionContext/permissionContext";
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

  // for page permission

  //--------------------------------------

  const [userPermissionss, setUserPermissions] = useState({});

  const { userPermissions } = useContext(PermissionsContext);
  // console.log("ratetype ", userPermissions)

  //----------------------------------------
  const navaigate = useNavigate()
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = 'CB Billing';
        // const response = await axios.get(`${apiUrl}/user-permi/${user_id}/${currentPageName}`);
        // setPermi(response.data);

        const permissions = await userPermissions.find(permission => permission.page_name === currentPageName);
        // console.log("org ", permissions)
        setUserPermissions(permissions);

      } catch {
      }
    };
    fetchPermissions();
  }, [userPermissions]);

  //---------------------------------------

  const checkPagePermission = () => {
    const currentPageName = "CB Billing";
    const permissions = userPermissionss || {};
    // console.log('aaaaaaaa', permissions)

    if (permissions.page_name === currentPageName) {
      return {
        read: permissions.read_permission === 1,
        new: permissions.new_permission === 1,
        modify: permissions.modify_permission === 1,
        delete: permissions.delete_permission === 1,
      };
    }
    return {
      read: false,
      new: false,
      modify: false,
      delete: false,
    };
  };

  //------------------------------


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
  const permissions = checkPagePermission();
  // Function to determine if a field should be read-only based on permissions
  const isFieldReadOnly = (fieldName) => {

    if (permissions.read) {
      // If user has read permission, check for other specific permissions
      if (fieldName === "delete" && !permissions.delete) {
        return true;
      }
      return false;
    }
    return true;
  };

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

  const hidePopup = () => {
    setError(false);
    setSuccess(false);
    setWarning(false);
  };
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

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
      // const response = await axios.get(`${apiUrl}/payment-detail`, {
      //   params: {
      //     customer: encodeURIComponent(customer),
      //     fromDate: fromDate.format("YYYY-MM-DD"),
      //     toDate: toDate.format("YYYY-MM-DD"),
      //     servicestation: encodeURIComponent(servicestation),
      //   },
      // });
      const response = await axios.get(`${apiUrl}/gettransfer_listdatas`, {
        // params: {
        //   customer: encodeURIComponent(customer),
        //   fromDate: fromDate.format("YYYY-MM-DD"),
        //   toDate: toDate.format("YYYY-MM-DD"),
        //   servicestation: encodeURIComponent(servicestation),
        // },
        params: {
          Status: selectedStatus,
          Organization_name: encodeURIComponent(customer),
          FromDate: fromDate.format("YYYY-MM-DD"),
          EndDate: toDate.format("YYYY-MM-DD"),
          // servicestation: encodeURIComponent(servicestation),
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
    isFieldReadOnly,
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
