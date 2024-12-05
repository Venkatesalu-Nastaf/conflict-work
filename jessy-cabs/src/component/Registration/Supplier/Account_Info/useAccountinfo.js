

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

  const [loading, setLoading] = useState(false)
  const [isAButtonLoading,setisAButtonLoading] = useState(false)



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



  // const handleExcelDownload = async () => {
  //   const workbook = new Excel.Workbook();
  //   const workSheetName = 'Worksheet-1';

  //   try {

  //     const fileName = "Account_Info"
  //     // creating one worksheet in workbook
  //     const worksheet = workbook.addWorksheet(workSheetName);
  //     const headers = Object.keys(rows[0]);
  //     //         console.log(headers,"hed")
  //     const columns = headers.map(key => ({ key, header: key }));
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
  
  //       console.log(singleData,'data in acc excel')

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

    try {
        const fileName = "Account_Info";
        const worksheet = workbook.addWorksheet(workSheetName);

        // Define headers
        const headers = Object.keys(rows[0]);
        const columns = headers.map(key => ({ key, header: key }));
        worksheet.columns = columns;

        // Style the header row
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '9BB0C1' }, // Light blue background color
            };
        });
        worksheet.getRow(1).height = 30;

        // Set default column alignment and width
        worksheet.columns.forEach(column => {
            column.width = column.header.length + 5;
            column.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // Transform date format
        const transformDate = (dateStr) => {
            return dateStr ? dayjs(dateStr).format('DD-MM-YYYY') : null;
        };

        // Preprocess rows to format dates
        const processedRows = rows.map(row => {
            const newRow = { ...row };
            // List of fields to format as dates
            const dateFields = ['Accdate']; // Add other date fields if needed
            dateFields.forEach(field => {
                if (newRow[field]) {
                    newRow[field] = transformDate(newRow[field]);
                }
            });
            return newRow;
        });

        // Add rows to the worksheet
        processedRows.forEach(singleData => {
            worksheet.addRow(singleData);

            // Adjust column width based on the cell values
            worksheet.columns.forEach(column => {
                const cellValue = singleData[column.key] || ''; // Get value or empty string if undefined
                const cellLength = cellValue.toString().length; // Get length of the value
                column.width = Math.max(column.width, cellLength + 5); // Adjust column width
            });
        });

        // Add borders to cells
        worksheet.eachRow({ includeEmpty: false }, (row) => {
            row.eachCell({ includeEmpty: false }, (cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        // Write workbook to buffer and download
        const buf = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
        console.error('<<<ERROR>>>', error);
        console.error('Something Went Wrong', error.message);
    } finally {
        // Remove worksheet instance
        workbook.removeWorksheet(workSheetName);
    }
};


 

  // const handlePdfDownload = () => {
  //   const pdf = new jsPDF({
  //     orientation: "landscape",
  //     unit: "mm",
  //     format: "tabloid" // [width, height] in inches
  //   });
  //   pdf.setFontSize(10);
  //   pdf.setFont('helvetica', 'normal');
  //   pdf.text("Account Details", 10, 10);
  //   const header = Object.keys(rows[0]);

  //   // Extracting body
  //   const body = rows.map(row => Object.values(row));
  //  console.log(rows ,'data in acc pdf')

  //   let fontdata = 1;
  //   if (header.length <= 13) {
  //     fontdata = 16;
  //   }
  //   else if (header.length >= 14 && header.length <= 18) {
  //     fontdata = 11;
  //   }
  //   else if (header.length >= 19 && header.length <= 20) {
  //     fontdata = 10;
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


  //   // Scale content
  //   pdf.scale(scaleFactor, scaleFactor);
  //   const pdfBlob = pdf.output('blob');
  //   saveAs(pdfBlob, 'Account_Details.pdf');
  // };

  const handlePdfDownload = () => {
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "tabloid" // [width, height] in inches
    });
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text("Account Details", 10, 10);

    // Transform date format
    const transformDate = (dateStr) => {
        return dateStr ? dayjs(dateStr).format('DD-MM-YYYY') : null;
    };

    // Preprocess rows to format dates
    const processedRows = rows.map(row => {
        const newRow = { ...row };
        // List of fields to format as dates
        const dateFields = ['Accdate']; // Add other date fields if needed
        dateFields.forEach(field => {
            if (newRow[field]) {
                newRow[field] = transformDate(newRow[field]);
            }
        });
        return newRow;
    });

    const header = Object.keys(processedRows[0]);

    // Extracting body
    const body = processedRows.map(row => Object.values(row));

    let fontdata = 1;
    if (header.length <= 13) {
        fontdata = 16;
    } else if (header.length >= 14 && header.length <= 18) {
        fontdata = 11;
    } else if (header.length >= 19 && header.length <= 20) {
        fontdata = 10;
    } else if (header.length >= 21 && header.length <= 23) {
        fontdata = 9;
    } else if (header.length >= 24 && header.length <= 26) {
        fontdata = 7;
    } else if (header.length >= 27 && header.length <= 30) {
        fontdata = 6;
    } else if (header.length >= 31 && header.length <= 35) {
        fontdata = 4;
    } else if (header.length >= 36 && header.length <= 40) {
        fontdata = 4;
    } else if (header.length >= 41 && header.length <= 46) {
        fontdata = 2;
    }

    pdf.autoTable({
        head: [header],
        body: body,
        startY: 20,
        headStyles: {
            fontSize: fontdata,
            cellPadding: 1.5, // Decrease padding in header
            minCellHeight: 8,
            valign: 'middle',
            font: 'helvetica', // Set font type for body
            cellWidth: 'wrap',
        },
        bodyStyles: {
            fontSize: fontdata - 1,
            valign: 'middle',
            cellWidth: 'auto', // Adjust the font size for the body
        },
        columnWidth: 'auto',
    });

    const scaleFactor = pdf.internal.pageSize.getWidth() / pdf.internal.scaleFactor * 1.5;

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
    // { field: "stations", headerName: "Stations", width: 160 },
    { field: "Accdate", headerName: "Acc_Date", width: 160 , valueFormatter: (params) => {
      // Format the date to DD-MM-YYYY
      return params.value ? dayjs(params.value).format('DD-MM-YYYY') : '';
    },},
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
    TimeToggle: false,
    
    // stations: ""

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
    // else if(name === "rateType") {


    //   setBook((prevBook) => ({
    //     ...prevBook,
    //     stations: '', // Clear the servicestation
    //     [name]: selectedOption,
    //   }));
    //   setSelectedCustomerData((prevData) => ({
    //     ...prevData,
    //     stations: '', // Clear the servicestation
    //     [name]: selectedOption,
    //   }));
    // }
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
    } 
    // catch {
    //   setError(true);
    //   setErrorMessage("Failed to Search Data")
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);
   
      // Check if there's no response, indicating a network error
      if (error.message ) {
          setError(true);
          setErrorMessage("Check your Network Connection");
          // console.log('Network error');
      } else if (error.response) {
          setError(true);
          // Handle other Axios errors (like 4xx or 5xx responses)
          setErrorMessage("Failed to Search: " + (error.response.data.message || error.message));
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
      }
  }
  };


  const handleenterSearch = useCallback(async (e) => {
    if (e.key === "Enter") {
      
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
        setErrorMessage("Failed to Search Data")
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
      TimeToggle:false,
      // stations: ""


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
    
    if (traveldataname) {

      const response = await axios.get(`${apiUrl}/getuniqueacccounttaveldata/${traveldataname}`)
      const responsedata = response.data;


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

//   const memoizedFetchStations = useMemo(() => {
//     return async (stations) => {
//         const ratetype = selectedCustomerData?.rateType || book.rateType
//     const ratename = "Supplier"
       

//         if (stations) {
//             try {
//                 const response = await axios.get(`${apiUrl}/getratetypemanagentCustomerdatastations/${ratename}/${ratetype}/${stations}`);
//                 const responsedata = response.data;

//             } catch (error) {
//                 console.error("Error fetching data", error);
//                 // Handle the error as needed
//             }
//         }
//     };
// }, [selectedCustomerData?.rateType, book.rateType,selectedCustomerData.stations,book.stations, apiUrl]);

 
  // const handleAutocompleteChangestations = async(event, value, name) => {
  //   const selectedOption = value ? value.label : '';
   
  // //  await memoizedFetchStations(selectedOption)
  //     setBook((prevBook) => ({
  //       ...prevBook,
  //       [name]: selectedOption,
  //     }));
  //     setSelectedCustomerData((prevData) => ({
  //       ...prevData,
  //       [name]: selectedOption,
  //     }));
  //   }

  


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
  
    // const Accdate = book.Accdate || dayjs().format('YYYY-MM-DD');
    const travelsemail = book.travelsemail;
    // const vehRegNo = book.vehRegNo;
    // const stations = book.stations;

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
    if (!ratetype) {
      setWarning(true);
      setWarningMessage("Fill Rate Type fields");
      return;
    }
    // if (!stations) {
    //   setWarning(true);
    //   setWarningMessage("Fill stations fields");
    //   return;
    // }
    if (cerendentialdata === true) {
      setWarning(true);
      setWarningMessage(" travelsname Already Exists");
      return;
    }
  //   if(cerendentialdataforstations === true){
  //     setError(true);
  //     setErrorMessage('RateType stations not registered ');
  //     return;
  // }
  setisAButtonLoading(true)
    try {
     
      await axios.post(`${apiUrl}/accountinfo`, book);
      handleCancel();
      // setRows([]);
      setSuccess(true);
      handleList()
      setRows([]);
      setSuccessMessage("Successfully Added");
      setCredentialData()
      setisAButtonLoading(false)
      // setCredentialDataforstations()
    }
    // catch {
    //   setError(true);
    //   setErrorMessage("Failed to Add Data");
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);
   
      // Check if there's no response, indicating a network error
      if (error.message ) {
          setError(true);
          setErrorMessage("Check your Network Connection");
          // console.log('Network error');
          setisAButtonLoading(false)
      } else if (error.response) {
          setError(true);
          // Handle other Axios errors (like 4xx or 5xx responses)
          setErrorMessage("Failed to Add: " + (error.response.data.message || error.message));
          setisAButtonLoading(false)
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
          setisAButtonLoading(false)
      }
  }
  };

  const handleEdit = async () => {
    if (cerendentialdata === true) {
      setWarning(true);
      setWarningMessage(" travelsname Already Exists");
      return;
    }
  //   if(cerendentialdataforstations === true){
  //     setError(true);
  //     setErrorMessage('RateType stations not registered ');
  //     return;
  // }
  setisAButtonLoading(true)
    try {
    
      const { id, ...restselectedcustomer } = selectedCustomerData
      const updatedCustomer = { ...restselectedcustomer };
      await axios.put(`${apiUrl}/accountinfo/${selectedCustomerData.accountNo}`, updatedCustomer);
      setSuccess(true);
      setSuccessMessage("Successfully updated");
      setisAButtonLoading(false)
      handleCancel();
      setCredentialData()
      // setCredentialDataforstations()
      setRows([]);
      handleList()
    } 
    // catch (err) {
    //   console.log(err)
    //   setError(true);
    //   setErrorMessage("Failed to Edit Data");
    // }
    catch (error) {
      // console.error("Error occurredddddd:", error);
   
      // Check if there's no response, indicating a network error
      if (error.message ) {
          setError(true);
          setErrorMessage("Check your Network Connection");
          // console.log('Network error');
          setisAButtonLoading(false)
      } else if (error.response) {
          setError(true);
          // Handle other Axios errors (like 4xx or 5xx responses)
          setErrorMessage("Failed to Edit Account Info: " + (error.response.data.message || error.message));
          setisAButtonLoading(false)
      } else {
          // Fallback for other errors
          setError(true);
          setErrorMessage("An unexpected error occurred: " + error.message);
          setisAButtonLoading(false)
      }
  }
  };

  // const handleList = useCallback(async () => {
  //   setLoading(true)
  //   try {
  //     const response = await axios.get(`${apiUrl}/accountinfo`);
  //     const data = response.data;
  //     const rowsWithUniqueId = data.map((row, index) => ({
  //       ...row,
  //       id: index + 1,
  //     }));
  //     setRows(rowsWithUniqueId);
  //     // console.log(data,'Datas of suplier  name ')
  //     if (data.length > 0) {
  //       setLoading(false)
  //   }else{
  //       setLoading(false)
  //   }
  //   } catch (err) {
  //     console.log(err);
  //   }finally {
  //     setLoading(false); // Set loading to false once the request is done, whether successful or not
  // }
  // }, [apiUrl]); // Add dependencies like apiUrl

  const handleList = useCallback(async () => {
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
        const response = await axios.get(`${apiUrl}/accountinfo`);
        const data = response.data;
        const rowsWithUniqueId = data.map((row, index) => ({
            ...row,
            id: index + 1,
        }));
        setRows(rowsWithUniqueId);

        if (data.length > 0) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    } catch (err) {
        console.error(err);

        if (err.message === 'Network Error') {
            setErrorMessage("Check network connection.");
        } else {
            setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
        }
        setError(true);
        setLoading(false);
    } finally {
        setLoading(false);
    }
}, [apiUrl]);


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
   
      }

      else if (actionName === 'Cancel') {
        handleCancel();
        handleList();
        setRows([]);
      }

      else if (actionName === 'Delete') {
        await axios.delete(`${apiUrl}/accountinfo/${selectedCustomerData.accountNo}`);
        setSelectedCustomerData(null);
        setSuccess(true);
        setSuccessMessage("Successfully Deleted");
        handleCancel();
        handleList();
        setRows([]);
      }

      else if (actionName === 'Edit') {
        handleEdit()
      }

      else if (actionName === 'Add') {
        handleAdd();
      }
    } 
  

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
    handleEdit, suppilerrate, vechiledata, handleChangeuniquetravelname, cerendentialdata, 
    // handleAutocompleteChangestations, 
    infoMessage,
    loading,setLoading,isAButtonLoading,setisAButtonLoading
  };
};

export default useAccountinfo;