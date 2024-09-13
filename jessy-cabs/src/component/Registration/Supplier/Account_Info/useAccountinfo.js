

import { useState, useEffect, useCallback,useMemo } from 'react';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import axios from "axios";
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";
import Excel from 'exceljs';

const useAccountinfo = () => {
  const apiUrl = APIURL;
  // const user_id = localStorage.getItem('useridno');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerData, setSelectedCustomerData] = useState({});
  const [rows, setRows] = useState([]);
  const [actionName] = useState('');
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [toDate, setToDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(dayjs());
  const [warning, setWarning] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage, setWarningMessage] = useState({});
  const [infoMessage, setInfoMessage] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [suppilerrate, setSupplierRatetpe] = useState([])
  const [vechiledata, setVehicleData] = useState([]);
  const [cerendentialdata, setCredentialData] = useState()
  const [cerendentialdataforstations, setCredentialDataforstations] = useState()


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
  // const convertToCSV = (data) => {
  //   const header = columns.map((column) => column.headerName).join(",");
  //   const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
  //   return [header, ...rows].join("\n");
  // };
  // const handleExcelDownload = () => {
  //   const csvData = convertToCSV(rows);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  //   saveAs(blob, "Account_Info.csv");
  // };


  const handleExcelDownload = async () => {
    const workbook = new Excel.Workbook();
    const workSheetName = 'Worksheet-1';

    try {

      const fileName = "Account_Info"
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      const headers = Object.keys(rows[0]);
      //         console.log(headers,"hed")
      const columns = headers.map(key => ({ key, header: key }));
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

  //   const handlePdfDownload = () => {
  //     const pdf = new jsPDF('l');
  //     pdf.setFontSize(12);
  //     pdf.setFont('helvetica', 'normal');
  //     pdf.text("Account_Info", 10, 10);

  //     const tableData = rows.map((row) => [
  //       row['id'],
  //       row['cperson'],
  //       row['accountNo'],
  //       row['address1'],
  //       row['phone'],
  //       row['isRunning'],
  //       row['vehicleInfo'],
  //       row['vehCommission'],
  //       row['rateType'],
  //       row['autoRefresh']
  //     ]);

  //     pdf.autoTable({
  //       head: [['Sno', 'Supplier_Name', 'Vehicle_No', 'Address', 'Phone', 'Active', 'Owner_Type', 'Percentage', 'Rate_Type', 'Driver']],
  //       body: tableData,
  //       startY: 20,
  //       headStyles: {
  //         fontSize: 9,
  //         cellPadding: 1.5, // Decrease padding in header

  //         rowHeight: 8, 
  //         valign: 'middle',

  //         font: 'helvetica', // Set font type for body

  //         cellWidth: 'wrap'




  //        // Header text color
  //     },

  // bodyStyles: {
  //     fontSize: 9,
  //      valign: 'middle', // Adjust the font size for the body

  // },



  //     });

  //     const pdfBlob = pdf.output('blob');
  //     saveAs(pdfBlob, 'Account_Info.pdf');
  //   };

  const handlePdfDownload = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "tabloid" // [width, height] in inches
    });
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Account Details", 10, 10);
    const header = Object.keys(rows[0]);

    // Extracting body
    const body = rows.map(row => Object.values(row));
    console.log(header.length, "len")

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
    else if (header.length >= 31 && header.length <= 35) {
      fontdata = 4;
    }
    else if (header.length >= 36 && header.length <= 40) {
      fontdata = 4;
    }
    else if (header.length >= 41 && header.length <= 46) {
      fontdata = 2;
    }
    console.log(fontdata, "data")

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
    saveAs(pdfBlob, 'Account_Details.pdf');
  };

  // TABLE START
  const columns = [
    { field: "id", headerName: "Sno", width: 100 },
    { field: "cperson", headerName: "Supplier_Name", width: 160 },
    { field: "travelsname", headerName: "Travel_Name", width: 160 },
    { field: "stations", headerName: "Stations", width: 160 },
    { field: "Accdate", headerName: "Acc_Date", width: 160 },
    { field: "accountNo", headerName: "Vehicle_No", width: 160 },
    { field: "address1", headerName: "Address", width: 160 },
    { field: "phone", headerName: "Phone", width: 160 },
    { field: "vehicleInfo", headerName: "Owner_Type", width: 160 },
    { field: "vehCommission", headerName: "Percentage", width: 160 },
    { field: "rateType", headerName: "Rate_Type", width: 160 },
    { field: "acType", headerName: "Driver", width: 160 },
  ];
  // TABLE END
  const [book, setBook] = useState({
    Accdate: dayjs(),
    travelsname: '',
    address1: '',
    cperson: '',
    travelsemail: '',
    phone: '',
    vehCommission: '',
    rateType: '',
    underGroup: '',
    entity: '',
    acType: '',
    vehicleInfo: '',
    driverName: "",
    vehRegNo: "",
    stations: ""

  });

  // const [fields, setFields] = useState(['']);

  // // Function to handle adding a new input field
  // const handleAddExtra = () => {
  //   setFields([...fields, '']);

  // }
  // console.log(fields,"sharan")

  // Function to handle changes in input fields
  // const handleFieldChange = (index, event) => {
  //   const newFields = fields.slice();
  //   newFields[index] = event.target.value;
  //   setFields(newFields);
  // };

  // // Function to handle removal of an input field (optional)
  // const handleRemoveField = (index) => {
  //   const newFields = fields.filter((_, i) => i !== index);
  //   setFields(newFields);
  // };

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
    if (name === "vehRegNo") {

      const selectedOrder = vechiledata?.find(option => option?.vehRegNo === value?.label);

      if (selectedOrder) {

        setBook(prevState => ({
          ...prevState,
          vehRegNo: value?.label,
          driverName: selectedOrder.driverName,
          vehicleInfo: selectedOrder.hiretypes
        }));

        setSelectedCustomerData(prevState => ({
          ...prevState,
          vehRegNo: value?.label,
          driverName: selectedOrder.driverName,
          vehicleInfo: selectedOrder.hiretypes
        }));
      }
    }
    else if(name === "rateType") {


      setBook((prevBook) => ({
        ...prevBook,
        stations: '', // Clear the servicestation
        [name]: selectedOption,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        stations: '', // Clear the servicestation
        [name]: selectedOption,
      }));
    }
    else {


      setBook((prevBook) => ({
        ...prevBook,
        [name]: selectedOption,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: selectedOption,
      }));
    }
  };

  //search funtion
  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiUrl}/searchAccountinginfo?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`);
      const data = await response.json();
      console.log(data, "typedata")
      if (data.length > 0) {
        const rowsWithUniqueId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setRows(rowsWithUniqueId);
        setSelectedCustomerData(rowsWithUniqueId)
        setSuccess(true);
        setSuccessMessage("Successfully listed")
      } else {
        setRows([]);
        setError(true);
        setErrorMessage("No data found")
      }
    } catch {
      setError(true);
      setErrorMessage("Check your Network Connection")
    }
  };


  const handleenterSearch = useCallback(async (e) => {
    if (e.key === "Enter") {
      console.log("Search Text:", searchText);

      try {
        const response = await fetch(`${apiUrl}/searchAccountinginfo?searchText=${searchText}`);
        const data = await response.json();

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
        setError(true);
        setErrorMessage("Check your Network Connection");
      }
    }
  }, [apiUrl, searchText]);

  const handleDateChange = (date, field) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setBook((prevBook) => ({
      ...prevBook,
      [field]: formattedDate,
    }));
    setSelectedCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      [field]: formattedDate,
    }));
  };



  useEffect(() => {
    const fetchratedata = async () => {
      try {
        const response = await axios.get(`${apiUrl}/ratemanagmentSupplierdata`)
        const data = response.data
        setSupplierRatetpe(data.map(row => row.ratename))
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchratedata()
  }, [apiUrl])

  const handleCancel = () => {
    setBook((prevBook) => ({
      ...prevBook,

      Accdate: dayjs(),
      travelsname: '',
      address1: '',
      travelsemail: '',
      phone: '',
      vehCommission: '',
      rateType: '',
      underGroup: '',
      entity: '',
      acType: '',
      vehicleInfo: '',
      cperson: '',
      driverName: "",
      vehRegNo: "",
      stations: ""


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


  const uniquetravellname = async (traveldataname) => {
    // console.log(customerdataname,"namee")
    if (traveldataname) {

      const response = await axios.get(`${apiUrl}/getuniqueacccounttaveldata/${traveldataname}`)
      const responsedata = response.data;

      // console.log(response,"data")
      // console.log(responsedata?.length,"reeee")

      if (responsedata?.length >= 1) {
        setCredentialData(true)
        // return true;
      }
      else {
        setCredentialData(false)
        // return false;
      }
    }


  }

  const memoizedFetchStations = useMemo(() => {
    return async (stations) => {
        const ratetype = selectedCustomerData?.rateType || book.rateType
    const ratename = "Supplier"
       

        if (stations) {
            try {
                const response = await axios.get(`${apiUrl}/getratetypemanagentCustomerdatastations/${ratename}/${ratetype}/${stations}`);
                const responsedata = response.data;

                if (responsedata?.length === 0) {
                    setInfo(true);
                    setInfoMessage("Ratetype stations not registered");
                    setCredentialDataforstations(true);
                } else {
                    setSuccess(true);
                    setSuccessMessage("Ratetype stations registered");
                    setCredentialDataforstations(false);
                }
            } catch (error) {
                console.error("Error fetching data", error);
                // Handle the error as needed
            }
        }
    };
}, [selectedCustomerData?.rateType, book.rateType,selectedCustomerData.stations,book.stations, apiUrl]);

 
  const handleAutocompleteChangestations = async(event, value, name) => {
    const selectedOption = value ? value.label : '';
   
   await memoizedFetchStations(selectedOption)
      setBook((prevBook) => ({
        ...prevBook,
        [name]: selectedOption,
      }));
      setSelectedCustomerData((prevData) => ({
        ...prevData,
        [name]: selectedOption,
      }));
    }

  


  const handleChangeuniquetravelname = (event) => {
    const { name, value } = event.target;
    const datacrendital = uniquetravellname(value);
    
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
    setSelectedCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  }
  const handleAdd = async () => {
    const ratetype = book.rateType;
    const travelsname = book.travelsname;
    const vehiclinfo = book.vehicleInfo;
    // const Accdate = book.Accdate || dayjs().format('YYYY-MM-DD');
    const travelsemail = book.travelsemail;
    // const vehRegNo = book.vehRegNo;
    const stations = book.stations;

    if (!travelsname) {
      setWarning(true);
      setWarningMessage("Fill Vehicle Travels fields");
      return;
    }
    if (!travelsemail) {
      setWarning(true);
      setWarningMessage("Fill Travel Mail fields");
      return;
    }
    if (!vehiclinfo) {
      setWarning(true);
      setWarningMessage("Fill Vehicle info fields");
      return;
    }
    if (!ratetype) {
      setWarning(true);
      setWarningMessage("Fill Rate Type fields");
      return;
    }
    if (!stations) {
      setWarning(true);
      setWarningMessage("Fill stations fields");
      return;
    }
    if (cerendentialdata === true) {
      setWarning(true);
      setWarningMessage(" travelsname Already Exists");
      return;
    }
    if(cerendentialdataforstations === true){
      setError(true);
      setErrorMessage('RateType stations not registered ');
      return;
  }

    try {
      console.log(book, "datata")
      await axios.post(`${apiUrl}/accountinfo`, book);
      handleCancel();
      // setRows([]);
      setSuccess(true);
      handleList()
      setRows([]);
      setSuccessMessage("Successfully Added");
      setCredentialData()
      setCredentialDataforstations()
    } catch {
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleEdit = async () => {
    if (cerendentialdata === true) {
      setWarning(true);
      setWarningMessage(" travelsname Already Exists");
      return;
    }
    if(cerendentialdataforstations === true){
      setError(true);
      setErrorMessage('RateType stations not registered ');
      return;
  }
    try {
      // const selectedCustomer = rows.find((row) => row.accountNo === accountNo);
      const { id, ...restselectedcustomer } = selectedCustomerData
      // console.log(selectedCustomer,"cust")
      // console.log(selectedCustomerData,"datata")
      const updatedCustomer = { ...restselectedcustomer };
      await axios.put(`${apiUrl}/accountinfo/${selectedCustomerData.accountNo}`, updatedCustomer);
      setSuccess(true);
      setSuccessMessage("Successfully updated");
      handleCancel();
      setCredentialData()
      setCredentialDataforstations()
      setRows([]);
      handleList()
    } catch (err) {
      console.log(err)
      setError(true);
      setErrorMessage("Check your Network Connection");
    }
  };

  const handleList = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/accountinfo`);
      const data = response.data;
      const rowsWithUniqueId = data.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      setRows(rowsWithUniqueId);
    } catch (err) {
      console.log(err);
    }
  }, [apiUrl]); // Add dependencies like apiUrl

  useEffect(() => {
    handleList();
  }, [handleList]); // Run when handleList changes



  useEffect(() => {
    const fetchdatafromvehcileinfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/accountinfodatavehcile`)
        const data = response.data
        setVehicleData(data)

      }
      catch (err) {
        console.log(err)
      }
    }
    fetchdatafromvehcileinfo()
  }, [apiUrl])

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
        await axios.delete(`${apiUrl}/accountinfo/${selectedCustomerData.accountNo}`);
        setSelectedCustomerData(null);
        setSuccess(true);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
        setRows([]);
      }

      else if (actionName === 'Edit') {
        // const selectedCustomer = rows.find((row) => row.accountNo === accountNo);
        // const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
        // await axios.put(`${apiUrl}/accountinfo/${selectedCustomerData.accountNo}`, updatedCustomer);
        // setSuccess(true);
        // setSuccessMessage("Successfully updated");
        // handleCancel();
        // setRows([]);
        handleEdit()
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
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleAdd,
    // handleAddExtra,
    handleenterSearch,
    handleSearch,
    hidePopup,
    setSearchText,
    searchText,
    handleDateChange,
    handleAutocompleteChange,
    handleExcelDownload,
    // handleRemoveField,
    handlePdfDownload,
    // handleFieldChange,
    rows,
    columns,
    isEditMode,
    handleEdit, suppilerrate, vechiledata, handleChangeuniquetravelname, cerendentialdata, handleAutocompleteChangestations, infoMessage
  };
};

export default useAccountinfo;