import { useState, useEffect, useCallback } from 'react';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import axios from "axios";
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";

const useAccountinfo = () => {
  const apiUrl = APIURL;
  // const user_id = localStorage.getItem('useridno');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  // const [infoMessage, setInfoMessage] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  //----------popup----------------------

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


  // download function
  const convertToCSV = (data) => {
    const header = columns.map((column) => column.headerName).join(",");
    const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
    return [header, ...rows].join("\n");
  };
  const handleExcelDownload = () => {
    const csvData = convertToCSV(rows);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Account_Info.csv");
  };

  const handlePdfDownload = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Account_Info", 10, 10);

    const tableData = rows.map((row) => [
      row['id'],
      row['cperson'],
      row['accountNo'],
      row['address1'],
      row['phone'],
      row['isRunning'],
      row['vehicleInfo'],
      row['vehCommission'],
      row['rateType'],
      row['autoRefresh']
    ]);

    pdf.autoTable({
      head: [['Sno', 'Supplier_Name', 'Vehicle_No', 'Address', 'Phone', 'Active', 'Owner_Type', 'Percentage', 'Rate_Type', 'Driver']],
      body: tableData,
      startY: 20,
    });

    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, 'Account_Info.pdf');
  };

  // TABLE START
  const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "cperson", headerName: "Supplier_Name", width: 130 },
    { field: "accountNo", headerName: "Vehicle_No", width: 130 },
    { field: "address1", headerName: "Address", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "isRunning", headerName: "Active", width: 160 },
    { field: "vehicleInfo", headerName: "Owner_Type", width: 130 },
    { field: "vehCommission", headerName: "Percentage", width: 130 },
    { field: "rateType", headerName: "Rate_Type", width: 130 },
    { field: "acType", headerName: "Driver", width: 130 },
  ];
  // TABLE END
  const [book, setBook] = useState({
    accountNo: '',
    Accdate: '',
    vehicleTravels: '',
    address1: '',
    cperson: '',
    streetNo: '',
    email: '',
    city: '',
    phone: '',
    vehCommission: '',
    rateType: '',
    printBill: '',
    underGroup: '',
    isRunning: '',
    entity: '',
    acType: '',
    vehicleInfo: '',
    autoRefresh: '',
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (event.target.type === 'checkbox') {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: checked,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAutocompleteChange = (event, value, name) => {
    const selectedOption = value ? value.label : '';
    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  const handleDateChange = (date, name) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
    setBook((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
    setSelectedCustomerData((prevBook) => ({
      ...prevBook,
      [name]: parsedDate,
    }));
  };

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,
      accountNo: '',
      Accdate: '',
      vehicleTravels: '',
      address1: '',
      cperson: '',
      streetNo: '',
      email: '',
      city: '',
      phone: '',
      vehCommission: '',
      rateType: '',
      printBill: '',
      underGroup: '',
      isRunning: '',
      entity: '',
      acType: '',
      vehicleInfo: '',
      autoRefresh: '',
    }));
    setSelectedCustomerData({});
    setIsEditMode(false);
  };

  const handleRowClick = useCallback((params) => {
    const customerData = params.row;
    setSelectedCustomerData(customerData);
    setSelectedCustomerId(params.row.accountNo);
    setIsEditMode(true);
  }, []);

  const handleAdd = async () => {
    const accountNo = book.accountNo;
    if (!accountNo) {
      setError(true);
      setErrorMessage("Fill mandatory fields");
      return;
    }
    try {
      await axios.post(`ttp://${apiUrl}/accountinfo`, book);
      handleCancel();
      setRows([]);
      setSuccess(true);
      setSuccessMessage("Successfully Added");
    } catch {
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleEdit = async (accountNo) => {
    try {
      const selectedCustomer = rows.find((row) => row.accountNo === accountNo);
      const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
      await axios.put(`${apiUrl}/accountinfo/${book.accountNo || selectedCustomerData.accountNo}`, updatedCustomer);
      setSuccess(true);
      setSuccessMessage("Successfully updated");
      handleCancel();
      setRows([]);
    } catch {
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  useEffect(() => {
    const handleList = async () => {
      try {
        const response = await axios.get(`${apiUrl}/accountinfo`);
        const data = response.data;
        const rowsWithUniqueId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setRows(rowsWithUniqueId);
      } catch {
      }
    }
    handleList();
  }, [apiUrl]);

  const handleClick = async (event, actionName, accountNo) => {
    event.preventDefault();
    try {
      if (actionName === 'List') {
        const response = await axios.get(`${apiUrl}/accountinfo`);
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
        setSuccessMessage("Successfully listed");
      }

      else if (actionName === 'Cancel') {
        handleCancel();
        setRows([]);
      }

      else if (actionName === 'Delete') {
        await axios.delete(`${apiUrl}/accountinfo/${book.accountNo || selectedCustomerData.accountNo}`);
        setSelectedCustomerData(null);
        setSuccess(true);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
        setRows([]);
      }

      else if (actionName === 'Edit') {
        const selectedCustomer = rows.find((row) => row.accountNo === accountNo);
        const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        await axios.put(`${apiUrl}/accountinfo/${book.accountNo || selectedCustomerData.accountNo}`, updatedCustomer);
        setSuccess(true);
        setSuccessMessage("Successfully updated");
        handleCancel();
        setRows([]);
      }

      else if (actionName === 'Add') {
        handleAdd();
      }
    } catch {
      setError(true);
      setErrorMessage("Check your connection");
    }
  };
  useEffect(() => {
    if (actionName === 'List') {
      handleClick(null, 'List');
    }
  });

  return {
    selectedCustomerData,
    selectedCustomerId,
    actionName,
    error,
    success,
    info,
    warning,
    successMessage,
    errorMessage,
    warningMessage,
    // infoMessage,
    book,
    handleClick,
    handleChange,
    handleRowClick,
    handleAdd,
    hidePopup,
    handleDateChange,
    handleAutocompleteChange,
    handleExcelDownload,
    handlePdfDownload,
    rows,
    columns,
    isEditMode,
    handleEdit,
  };
};

export default useAccountinfo;