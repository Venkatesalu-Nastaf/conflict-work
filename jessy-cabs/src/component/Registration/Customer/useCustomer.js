import { useState, useEffect, useCallback, useMemo } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import Excel from 'exceljs';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { APIURL } from "../../url";
import 'jspdf-autotable'
import { Organization } from './Customerdata';
import { useData1 } from '../../Dashboard/Maindashboard/DataContext'

// TABLE START
const columns = [
    { field: "id", headerName: "S.No", width: 60 },
    { field: "customerId", headerName: "Customer ID", width: 130 },
    { field: "customer", headerName: "Name", width: 160 },
    { field: "address1", headerName: "Address", width: 130 },
    { field: "rateType", headerName: "Rate_Type", width: 130 },
    { field: "gstnumber", headerName: "GST_NO", width: 160 },
    { field: "state", headerName: "State", width: 160 },
    { field: "orderedby", headerName: "OrderedBy", width: 260 },
    { field: "orderByEmail", headerName: "Email", width: 260 },
    { field: "orderByMobileNo", headerName: "MobileNo", width: 260 },
];

// TABLE END

const useCustomer = () => {
    const apiUrl = APIURL;
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [toDate, setToDate] = useState(dayjs());
    const [fromDate, setFromDate] = useState(dayjs());
    const [warning, setWarning] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState({});
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [searchText, setSearchText] = useState('');
    const [warningMessage] = useState({});
    // const [isInputVisible, setIsInputVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [BillingGroup, setBillingGroup] = useState([]);
    const [customerratetype, setCustomerRatetype] = useState([])
    const [cerendentialdata, setCredentialData] = useState()
    const [deletedialogbox, setDeletedDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    // const [cerendentialdataforstations,setCredentialDataforstations]=useState()

    //---------------------------------------
    const { triggerCustomerAdd, setTriggerCustomerAdd } = useData1()
    // const handleButtonClick = () => {
    //     setIsInputVisible(!isInputVisible);
    // };
    const [customerfieldSets, setCustomerFieldSets] = useState([{
        // dinamic data
        orderedby: '',
        orderByEmail: '',
        orderByMobileNo: '',

    }]);
    useEffect(() => {
        Organization()
            .then((data) => {
                if (data) {
                    setBillingGroup(data);
                }
            })
    }, []);

    const handleChangecustomer = (event, index) => {
        const { name, value } = event.target;
        const newFieldSets = [...customerfieldSets];
        newFieldSets[index][name] = value;
        setCustomerFieldSets(newFieldSets);

    }
    const handleAddExtra = () => {
        setCustomerFieldSets([...customerfieldSets, {
            orderedby: '',
            orderByEmail: '',
            orderByMobileNo: '',
        }]);
    };

    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';
        try {

            const fileName = "customer_details"
            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName);
            const headers = Object.keys(rows[0]);
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
    const handlePdfDownload = () => {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "tabloid"
        });
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Customer Details", 10, 10);
        const header = Object.keys(rows[0]);
        // Extracting body
        const body = rows.map(row => Object.values(row));
        let fontdata = 1;
        if (header.length <= 13) {
            fontdata = 16;
        }
        else if (header.length >= 14 && header.length <= 20) {
            fontdata = 11;
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
            },

            bodyStyles: {
                fontSize: fontdata - 1,
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
        saveAs(pdfBlob, 'Customer_Details.pdf');
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

    const [book, setBook] = useState({
        // customerId: '',
        name: '',
        customer: '',
        customerType: '',
        servicestation: '',
        date: dayjs(),
        address1: '',
        rateType: '',
        opBalance: '',
        underGroup: '',
        gstTax: '',
        acType: '',
        entity: '',
        selectOption: '',
        state: '',
        gstnumber: '',
        SalesPerson: '',
        salesPercentage: '',
        // billingGroup: [],
        billingGroup:'',
        hybrid: false,
        TimeToggle: false,
    });

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        if (type === 'checkbox') {
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

    // const memoizedFetchStations = useMemo(() => {
    //     return async (stations) => {
    //         const ratetype = selectedCustomerData?.rateType || book.rateType;
    //         const ratename = "Customer";
    //         if (stations) {
    //             try {
    //                 const response = await axios.get(`${apiUrl}/getratetypemanagentCustomerdatastations/${ratename}/${ratetype}/${stations}`);
    //                 const responsedata = response.data;
    //                 // if (responsedata?.length === 0) {
    //                 //     setInfo(true);
    //                 //     setInfoMessage("Ratetype stations not registered");
    //                 //     setCredentialDataforstations(true);
    //                 // } else {
    //                 //     setSuccess(true);
    //                 //     setSuccessMessage("Ratetype stations registered");
    //                 //     setCredentialDataforstations(false);
    //                 // }
    //             } catch (error) {
    //                 console.error("Error fetching data", error);
    //                 // Handle the error as needed
    //             }
    //         }
    //     };
    // }, [selectedCustomerData?.rateType, book.rateType,selectedCustomerData.stations,book.stations, apiUrl]);
    // const handleAutocompleteChangestations=async(event, newValue, name) => {
    //     const selectedOption = newValue ? newValue.label : '';
    //     if(name === "servicestation"){
    //             await memoizedFetchStations(selectedOption)
    //             setBook((prevBook) => ({
    //                 ...prevBook,
    //                 [name]: selectedOption,
    //             }));
    //             setSelectedCustomerData((prevData) => ({
    //                 ...prevData,
    //                 [name]: selectedOption,
    //             }));
    //         }
    //     }

    const handleAutocompleteChange = async (event, newValue, name) => {
        const selectedOption = newValue ? newValue.label : '';
        // if(name === "rateType"){

        //         setBook((prevBook) => ({
        //             ...prevBook,
        //             servicestation: '', // Clear the servicestation
        //             [name]: selectedOption, // Update the ratetype
        //         }));
        //         setSelectedCustomerData((prevData) => ({
        //             ...prevData,
        //             servicestation: '', // Clear the servicestation
        //             [name]: selectedOption, // Update the ratetype
        //         }));
        //     }
        // else{
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: selectedOption,
        }));
        // }
    };
    const handleAutocompleteChangebilling = (event, newValue, name) => {

        setBook((prevBook) => ({
            ...prevBook,
            [name]: newValue,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };
    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const parsedDate = dayjs(formattedDate).format('YYYY-MM-DD');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
        setSelectedCustomerData((prevValues) => ({
            ...prevValues,
            [name]: parsedDate,
        }));
    };

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            // customerId: '',
            name: '',
            customer: '',
            customerType: '',
            servicestation: '',
            date: '',
            address1: '',
            // customeremail: '',
            rateType: '',
            opBalance: '',
            // phoneno: '',
            underGroup: '',
            gstTax: '',
            acType: '',
            selectOption: '',
            // active: '',
            entity: '',
            state: '',
            gstnumber: '',
            SalesPerson: '',
            salesPercentage: '',
            // billingGroup: [],
            billingGroup:'',
            hybrid: false,
            TimeToggle: false,
        }));
        setCustomerFieldSets([{
            // dinamic data
            orderedby: '',
            orderByEmail: '',
            orderByMobileNo: '',

        }])
        // setIsInputVisible(!isInputVisible)
        setSelectedCustomerData({});
        setIsEditMode(false);
    };
    const getcustomerdata = async (customerdata) => {
        const datacustomer = customerdata
        try {
            const response = await axios.get(`${apiUrl}/getcustomerorderdata/${datacustomer}`)
            const data = response.data
            if (data.length > 0) {
                setCustomerFieldSets(data)
            }
            else {
                setCustomerFieldSets(customerfieldSets)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const uniquecustomer = async (customerdataname) => {
        if (customerdataname) {
            const response = await axios.get(`${apiUrl}/getuniqueCustomerdata/${customerdataname}`)
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

    const handleChangeuniquecustomer = (event) => {
        const { name, value } = event.target;
        uniquecustomer(value);
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleRowClick = (params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        // const datta = customerData.billingGroup.split(',')
        // if (datta.length >= 2) {
        //     setIsInputVisible(!isInputVisible);
        // }
        setSelectedCustomerId(params.row.customerId);
        getcustomerdata(customerData.customer)
        setIsEditMode(true);
    }
    //search with date
    const handleSearch = async () => {
        try {
            const response = await fetch(`${apiUrl}/searchCustomer?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`);
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
        //     setError(true);
        //     setErrorMessage("Check your Network Connection")
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
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
                const response = await fetch(`${apiUrl}/searchCustomer?searchText=${encodeURIComponent(searchText)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
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
            } catch (error) {
                console.error("Fetch error:", error);
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        }
    }, [apiUrl, searchText]);

    const addCustomerToObjects = (arr, customerProp) => {
        console.log(arr)
        return arr.map(obj => ({
            ...obj,
            customer: customerProp
        }));
    };

    const removeEmptyObjects = (arr) => {
        return arr.filter(obj => {
            // Check if all specified fields are empty
            return obj.orderedby !== "" && obj.orderByEmail !== "" && obj.orderByMobileNo !== "";
        });
    };


    // Call the function to add customer property to each object
    const handleList = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${apiUrl}/customersgroup`);
            const data = response.data;
            const rowsWithUniqueId = data.map((row, index) => ({
                ...row,
                id: index + 1,
            }));
            setRows(rowsWithUniqueId);
            if (data.length > 0) {
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (err) {
            console.log(err);
            setLoading(false)
        } finally {
            setLoading(false); // Set loading to false once the request is done, whether successful or not
        }
    }, [apiUrl]); // Add dependencies like apiUrl

    useEffect(() => {
        handleList(); // Call the handleList function
    }, [handleList]);
    const handleAdd = async () => {
        // const hasEmptyFields = customerfieldSets.some(fieldSet =>
        //     !fieldSet.orderedby || !fieldSet.orderByEmail || !fieldSet.orderByMobileNo
        // );
        const name = book.name;
        const servicestation = book.servicestation;
        const rateType = book.rateType;
        const customer = book.customer;
        const address = book.address1;
        const gst = book.gstnumber;
        const stationstate = book.state;

        if (!name) {
            setError(true);
            setErrorMessage("fill mantatory fields");
            return;
        }
        if (!customer) {
            setError(true);
            setErrorMessage("fill mantatory fields");
            return;
        }
        if (!rateType) {
            setError(true);
            setErrorMessage("fill RateType fields");
            return;
        }
        if (!servicestation) {
            setError(true);
            setErrorMessage("fill Station fields");
            return;
        }
        if (!address) {
            setError(true);
            setErrorMessage("fill Address fields");
            return;
        }
        if (!gst) {
            setError(true);
            setErrorMessage("fill GstNumber fields");
            return;
        }
        if (!stationstate) {
            setError(true);
            setErrorMessage("fill State fields");
            return;
        }
        // if (hasEmptyFields) {
        //     setError(true);
        //     setErrorMessage('Fill mantatory orderedBy,orderByEmail,orderByMobileNo .');
        //     return;
        // }
        if (cerendentialdata === true) {
            setError(true);
            setErrorMessage('customer aldrreay exist.');
            return;
        }
        // if(cerendentialdataforstations === true){
        //     setError(true);
        //     setErrorMessage('RateType stations not registered ');
        //     return;
        // }
        // const removeEmptyObjects = (arr) => {
        //     return arr.filter(obj => {
        //         // Check if all specified fields are empty
        //         return obj.orderedby !== "" && obj.orderByEmail !== "" && obj.orderByMobileNo !== "";
        //     });
        // };

        //   console.log(removeEmptyObjects(customerfieldSets),"ppp")
        const dataordereddata = removeEmptyObjects(customerfieldSets)
        console.log(dataordereddata, "datat")
        try {
            let datasets = [];
            if (dataordereddata.length > 0) {
                console.log(dataordereddata, "enetrr")

                datasets = addCustomerToObjects(dataordereddata, book.customer);
            }


            console.log(book, "booked",)
            console.log(datasets, "ppppp")
            const response = await axios.post(`${apiUrl}/customers`, book);
            if (response.data.success) {
                if (datasets.length > 0) {
                    await axios.post(`${apiUrl}/customerorderdbydata`, datasets)
                }
                handleCancel();
                setTriggerCustomerAdd(prev => !prev)
                setRows([]);
                handleList();
                setSuccess(true);
                setSuccessMessage(response.data.message);
                setCredentialData()
                // setCredentialDataforstations()
            } else {
                setError(true);
                setErrorMessage(response.data.message);
                // }
            }
        }
        //  catch {
        //     setError(true);
        //     setErrorMessage("Check your Network Connection");
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Add: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };

    const handleEdit = async () => {
        // const hasEmptyFields = customerfieldSets.some(fieldSet =>
        //     !fieldSet.orderedby || !fieldSet.orderByEmail || !fieldSet.orderByMobileNo
        // );
        // if (hasEmptyFields) {
        //     setError(true);
        //     setErrorMessage('Fill mantatory orderedBy,orderByEmail,orderByMobileNo .');
        //     return;
        // }
        // if(cerendentialdataforstations === true){
        //     setError(true);
        //     setErrorMessage('RateType stations not registered ');
        //     return;
        // }
        const { id, orderByEmail, orderedby, orderByMobileNo, customerId, ...restselectedcustomerdata } = selectedCustomerData
        const updatedCustomer = {
            ...restselectedcustomerdata,
            date: selectedCustomerData?.date ? dayjs(selectedCustomerData?.date) : null,
        };
        const dataordereddata = removeEmptyObjects(customerfieldSets)
        let datasets = [];
        if (dataordereddata.length > 0) {
            datasets = addCustomerToObjects(dataordereddata, selectedCustomerData?.customer || book.customer);
        }
        // const datasets = addCustomerToObjects(customerfieldSets, selectedCustomerData?.customer || book.customer);
        await axios.put(`${apiUrl}/customers/${selectedCustomerData.customerId}`, updatedCustomer);
        if (datasets.length > 0) {
            await axios.put(`${apiUrl}/updatecustomerorderdata`, datasets);
        }
        // setIsInputVisible(!isInputVisible);
        setTriggerCustomerAdd(prev => !prev);
        handleCancel();
        setRows([]);
        handleList();
    };
    const deletedatecustomerorder = async (id) => {
        try {
            await axios.delete(`${apiUrl}/deletecustomerorderdatasdata/${id}`);
            setDeletedDialog(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleRemove = (index, id) => {
        setCustomerFieldSets(customerfieldSets.filter((_, i) => i !== index));
        if (id) {
            setCustomerFieldSets(customerfieldSets.filter((_, i) => i !== index));
            deletedatecustomerorder(id)
        }
        else {
            setCustomerFieldSets(customerfieldSets.filter((_, i) => i !== index));
            setDeletedDialog(false)
        }
    }
    useEffect(() => {
        const fetchcustomerratedata = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ratemanagmentCustomerdata`)
                const data = response.data
                setCustomerRatetype(data.map(row => row.ratename))
            }
            //   catch(err){
            //     console.log(err)
            //   }
            catch (error) {
                // console.error("Error occurredddddd:", error);

                // Check if there's no response, indicating a network error
                if (error.message) {
                    setError(true);
                    setErrorMessage("Check your Network Connection");
                    // console.log('Network error');
                } else if (error.response) {
                    setError(true);
                    // Handle other Axios errors (like 4xx or 5xx responses)
                    setErrorMessage("Failed to Edit Customer: " + (error.response.data.message || error.message));
                } else {
                    // Fallback for other errors
                    setError(true);
                    setErrorMessage("An unexpected error occurred: " + error.message);
                }
            }
        }
        fetchcustomerratedata()
    }, [apiUrl])



    // Use handleList as a dependency
    const handleClick = async (event, actionName, customerId) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/customers`);
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
                await axios.delete(`${apiUrl}/customers/${selectedCustomerData.customerId}`);
                await axios.delete(`${apiUrl}/deletecustomerorderdata/${selectedCustomerData.customer || book.customer}`);
                setSelectedCustomerData(null);
                handleCancel();
                setTriggerCustomerAdd(prev => !prev)
                setRows([]);
            }

            else if (actionName === 'Edit') {
                handleEdit()
            }

            else if (actionName === 'Add') {
                handleAdd();
            }
        } catch {
            setError(true);
            setErrorMessage("Check Network connection");
        }
    };
    // useEffect(() => {
    //     if (actionName === 'List') {
    //         handleClick(null, 'List');
    //     }
    // });

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
        infoMessage,
        book,
        handleClick,
        handleChange,
        handleRowClick,
        setToDate,
        toDate,
        setFromDate,
        fromDate,
        handleAdd,
        handleSearch,
        hidePopup,
        handleAutocompleteChange,
        handleDateChange,
        // handleButtonClick,
        setSearchText,
        // isInputVisible,
        handleExcelDownload,
        handlePdfDownload,
        handleenterSearch,
        rows,
        columns,
        isEditMode, setSelectedCustomerData,
        handleEdit,
        customerfieldSets, setBook, deletedialogbox, setDeletedDialog,loading,
        // handleAutocompleteChangestations,
        setInfo, setInfoMessage,
        handleChangecustomer, handleAddExtra, BillingGroup, handleAutocompleteChangebilling, handleRemove, customerratetype, handleChangeuniquecustomer, cerendentialdata
    };
};

export default useCustomer;