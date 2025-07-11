import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";
import Excel from 'exceljs';
// import encryption from '../../../dataEncrypt';
// import { toDate } from 'validator';

const useEmployee = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    // const [selectedCustomerData, setSelectedCustomerDatas] = useState({});
    const [selectedCustomerData, setSelectedCustomerData] = useState({}); //------------ 
    // const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [templateMessageData, setTemplateMessageData] = useState('');
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [customer, setCustomer] = useState("");
    const [formData] = useState({});
    const [error, setError] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [success, setSuccess] = useState(false);
    const [organizationNames, setOrganizationNames] = useState([]);
    const [fromdate, setFromdate] = useState(dayjs())
    const [toDate, setTodate] = useState(dayjs())
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    // const [fromDate, setFromDate] = useState(dayjs());
    const [checkbox, setCheckbox] = useState([]);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [organistaionsendmail, setOrganisationSendEmail] = useState([])
    const [warningMessage] = useState({});
    // const [infoMessage, setInfoMessage] = useState({});
    const [searchText, setSearchText] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [deleteAgreementdata, setDeleteAgreementdata] = useState(false)

    const handleButtonClick = (params) => {
        const { customer } = params.row;
        // if (!email) {
        //     setError(true);
        //     setErrorMessage("PLease Enter Booking No");
        //     return;
        // }
        setDeleteFile([])
        showPdf(customer);
    };


    // TABLE STRAT
    const columns = [
        { field: "id4", headerName: "Sno", width: 50 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <Button
                    onClick={() => handleButtonClick(params)}
                    aria-label="open-dialog"
                >
                    <Button variant="contained" color="primary">
                        <UploadFileIcon />
                        view
                    </Button>
                </Button>
            ),
        },
        { field: "customer", headerName: "Customer", width: 140 },
        {
            field: "fromdate",
            headerName: "From Date",
            width: 140,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), // Format to DD/MM/YYYY
        },
        {
            field: "todate",
            headerName: "To Date",
            width: 140,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'), // Format to DD/MM/YYYY
        },
        { field: "email", headerName: "Mail ID", width: 140 },
        { field: "mobileno", headerName: "Mobile No", width: 140 },
        { field: "address", headerName: "Address", width: 140 },
        { field: "gstno", headerName: "GST No", width: 140 },

    ];

    // TABLE END

    // };
    // };

    const handleExcelDownload = async () => {
        const workbook = new Excel.Workbook();
        const workSheetName = 'Worksheet-1';

        try {

            const fileName = "Employeedateils"
            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName);
            const headers = Object.keys(rows[0]);
            const columnsExcel = headers.map(key => ({ key, header: key }));

            worksheet.columns = columnsExcel;

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
                    const isHeader = row.number === 1;
                    worksheet.getCell(cellAddress).alignment = {
                        horizontal: isHeader ? 'center' : 'left',
                        vertical: 'middle',
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
        pdf.text("Employee Details", 10, 10);
        // const header = Object.keys(rows[0]);
        // Extracting body
        // const body = rows.map(row => Object.values(row));


        const selectedFields = ["id4", "customer", "fromdate", "todate", "mobileno","address","gstno"]
        const header = selectedFields;
        const body = rows.map(row =>selectedFields.map(field =>row[field]))

        let fontdata = 1;
        if (header.length <= 13) {
            fontdata = 16;
        }
        else if (header.length >= 14 && header.length <= 17) {
            fontdata = 11;
        }
        else if (header.length >= 18 && header.length <= 20) {
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

        // Scale content
        pdf.scale(scaleFactor, scaleFactor);
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'EmployeeReports.pdf');
    };


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


    const [book, setBook] = useState({
        customer: '',
        fromdate: dayjs(),
        todate: dayjs(),
        email: '',
        mobileno: '',
        address: '',
        gstno: '',
        // Agreement_Image:null,
    });

    // const [customerPDF, setCustomerPDF] = useState(null);


    // const licenceSubmit = async (customer) => {
    //     if (customerPDF !== null) {
    //         const formData = new FormData();
    //         formData.append("file", customerPDF);
    //         console.log(formData,"frontend");

    //         try {
    //             await axios.post(`${apiUrl}/Customer-Uploadpdf/${customer}`, formData,{
    //                 headers:{
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });
    //             setCustomerPDF(null);
    //         }
    //         catch {
    //             setError(true);
    //             setErrorMessage('Image not inserted');
    //         }
    //     } else {
    //         return
    //     }
    //     setCustomerPDF(null);
    // };


    const handleFileChange = (e) => {
        // console.log( e.target.files , "Uploaddddddddddddddd");
        setBook({
            ...book,
            Agreement_Image: e.target.files[0]
        });

        setSelectedCustomerData((prevValues) => ({

            ...prevValues,
            Agreement_Image: e.target.files[0],
        }));

        setSuccess(true);
        setSuccessMessage("Uploaded successfully");
    };


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

    const handleenterSearch = useCallback(async (e) => {
       
      if(searchText === '') return;
        
        if (e.key === "Enter") {
            // console.log("Search Text:", searchText);
            try {
                // Fetching data from the server
                const response = await fetch(`${apiUrl}/searchAgreementpage?searchText=${encodeURIComponent(searchText)}`);

                // Checking if the response is not OK
                if (!response.ok) {
                    // console.error("Network response not OK:", response.statusText);
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // console.log("Fetched data:", data);  // Log the data to ensure it's correct

                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId); // Set the fetched rows
                    setSuccess(true); // Set success state
                    setSuccessMessage("Successfully listed"); // Show success message
                } else {
                    setRows([]); // Clear rows if no data
                    setError(true);
                    setErrorMessage("No data found");
                }
            } catch (error) {
                console.error("Fetch error:", error); // Log the error for debugging
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        }
    }, [apiUrl, searchText]);

    const handleAutocompleteChange = (event, value, name) => {
        const manualInput = typeof value === "string" ? value : value?.label || "";
        // console.log("Manual Input:", manualInput);
        if (name === "customer") {
            const selectedOrganization = organizationNames?.find(
                (option) => option.customer === manualInput
            );
            //   console.log("Selected Organization:", selectedOrganization);
            setBook((prevState) => ({
                ...prevState,
                customer: manualInput,
                address: selectedOrganization?.address1,
                gstno: selectedOrganization?.gstnumber,
                // fromdate: selectedOrganization?.fromdate,
                email: selectedOrganization?.orderByEmail,
                mobileno: selectedOrganization?.orderByMobileNo,
            }));
            setSelectedCustomerData((prevState) => ({
                ...prevState,
                customer: manualInput,
                address: selectedOrganization?.address1,
                gstno: selectedOrganization?.gstnumber,
                // fromdate: selectedOrganization?.fromdate,
                email: selectedOrganization?.orderByEmail,
                mobileno: selectedOrganization?.orderByMobileNo
            }));
        }
    };
    //   console.log(dayjs())
    //   console.log(selectedCustomerData.fromdate ? dayjs(selectedCustomerData.fromdate).format("DD/MM/YYYY") : dayjs().format("DD/MM/YYYY"),"ppppp")
    //   console.log(selectedCustomerData.fromdate ? "hhh": "oooo","ppppp")

    //   const handleDateChange = (date, name) => {
    //     // if (!date || !dayjs(date).isValid()) {
    //     //     console.error("Invalid date selected");
    //     //     return;
    //     // }
    //     console.log(date,name,"ff")
    //     const formattedDate = dayjs(date).format("DD/MM/YYYY");
    //     const parsedDate = dayjs(formattedDate).format("DD/MM/YYYY");
    //     console.log(formattedDate,"fff")
    //     setBook((prevBook) => ({
    //         ...prevBook,
    //         [name]: parsedDate,
    //     }));
    //     setSelectedCustomerData((prevData) => ({
    //         ...prevData,
    //         [name]:parsedDate,
    //     }));
    // };

    // const handleDateChange = (date, name) => {
    //     const parsedDate = dayjs(date).format("DD/MM/YYYY");
    //     // const parsedDate = dayjs(formattedDate).format("DD-MM-YYYY");
    //     console.log(parsedDate,name,"HHHHHHHHH");



    //     setBook((prevBook) => ({
    //         ...prevBook,
    //         [name]: parsedDate,
    //     }));

    //     setSelectedCustomerData((prevValues) => ({
    //         ...prevValues,
    //         [name]: parsedDate,
    //     }));
    // };

    const handleDateChange = (date, name) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const parsedDate = dayjs(formattedDate).format("YYYY-MM-DD");

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
            customer: '',
            fromdate: dayjs(),
            todate: dayjs(),
            email: '',
            mobileno: '',
            address: '',
            gstno: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
        setDeleteAgreementdata(false)
    };

    const handleRowClick = (params) => {
        const customerData = params.row;
        // console.log(customerData, "row values")
        setSelectedCustomerData(customerData);

        setBook(customerData);

        // setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
        // console.log(customerData,'ddddddddddddddddddddd');
    };

    //--------show pdf---------------
    const [allFile, setAllFile] = useState([]);
    const showPdf = (showID) => {
        axios.get(`${apiUrl}/agreement_Docview/${showID}`)
            .then(res => {
                if (res.data.length > 0) {
                    setAllFile(res.data);
                    setDialogOpen(true);
                    // console.log(res.data, "yyyyyyyyyyyyyyyyyyyyyyy")
                } else {
                    setError(true);
                    setErrorMessage('No data found');
                }
            })
            .catch()
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectAll(false)
    };

    ///--------------------------------------------

    const id = book.customer || selectedCustomerData?.customer;
    const [file, setFile] = useState(null);

    const addPdf = async () => {
        if (file !== null) {
            const formData = new FormData();
            formData.append("file", file);

            try {

                await axios.post(`${apiUrl}/agreementpdf_Document/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })

            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
    }

    // const handleList = useCallback(async () => {
    //     setLoading(true)
    //     try {

    //         const response = await axios.get(`${apiUrl}/employees`);
    //         const data = response.data
    //         const rowsWithUniqueId = data.map((row, index) => ({
    //             ...row,
    //             id: index + 1,
    //         }));
    //         setRows(rowsWithUniqueId);
    //         if(data.length > 0){
    //             setLoading(false)
    //         } else{
    //             setLoading(false)
    //         }   
    //     } catch (err) {
    //         console.log(err);
    //     }finally {
    //         setLoading(false); 
    //     }
    // }, [apiUrl]); // Add any dependencies needed inside this array

    const handleList = useCallback(async () => {
        setLoading(true);
        setError(false); // Reset error state before each request
        try {
            const response = await axios.get(`${apiUrl}/agreementdata`);
            const data = response.data;
            // console.log(data, "getting the values");
            const rowsWithUniqueId = data.map((row, index) => ({
                ...row,
                id4: index + 1,
            }));

            setRows(rowsWithUniqueId);

        } catch (err) {
            if (err.message === 'Network Error') {
                setErrorMessage("Check network connection.");
            }
            // else {
            //     setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
            // }
            // setError(true);
        } finally {
            setLoading(false); // Ensure loading is false in all cases
        }
    }, [apiUrl]);


    useEffect(() => {
        handleList();
    }, [handleList]);

    //---------------------------------------------

    // const handleAdd = async () => {
    //     const customer = book.customer || selectedCustomerData.customer;
    //     if (!customer) {
    //         setError(true);
    //         setErrorMessage("Enter Organization Details");
    //         return;
    //     }

    //     try {
    //         const formData = new FormData();
    //         for (const key in book) {
    //             formData.append(key, book[key]);
    //         }

    //         // API call to upload data and file
    //         const response = await axios.post(`${apiUrl}/agreementdocumentimage`, formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });

    //         // Handle success
    //         setSuccess(true);
    //         setSuccessMessage(response.data.message || "Successfully Added");

    //         // Reset form and states
    //         handleCancel();
    //         addPdf();
    //         setCustomer();
    //         setRows([]);    
    //         handleList();
    //     } catch (error) {
    //         console.error("Error occurred:", error);

    //         // Error handling
    //         if (error.response) {
    //             setError(true);
    //             setErrorMessage(error.response.data.message || "Failed to add data");
    //         } else {
    //             setError(true);
    //             setErrorMessage("Check your Network Connection");
    //         }
    //     }
    // };
    const handlecheckmaildriver = async () => {
        try {
            // Add templateMessageData to the dataToSend object
            // const dataToSend = {
            //     customer: book.customer,
            //     email: book.email,
            //     fromDate: fromdate,
            //     todate: book.todate,
            //     Sendmailauth: organistaionsendmail.Sendmailauth,
            //     Mailauthpass: organistaionsendmail.Mailauthpass,
            //     templateMessageData
            // };

            // console.log("Sending data:", dataToSend); // For debugging purposes
            // await axios.post(`${apiUrl}/send-emailagreementdata`, dataToSend);
            setSuccess(true);
            setSuccessMessage("Mail Sent Successfully");
        } catch (error) {
            console.error("Error sending email:", error); // Added console log for debugging
            setError(true);
            setErrorMessage("An error occurred while sending mail");
        }
    };


    const handleAdd = async () => {
        const customer = book.customer || selectedCustomerData.customer;
        // console.log(book.customer,selectedCustomerData.customer, 'gtgtgtgtgtgtgtgtgtgtgttgtgtgtgtgt' )
        if (!customer) {
            setError(true);
            setErrorMessage("Enter Organization Details");
            return;
        }

        try {
            const formData = new FormData();
            // console.log(book,"llll")
            for (const key in book) {
                formData.append(key, book[key]);
            }

            // Step 1: Upload data and file
            const uploadResponse = await axios.post(`${apiUrl}/agreementdocumentimage`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Step 2: Fetch the last inserted ID if applicable
            // const lastIdResponse = await axios.get(`${apiUrl}/lastcustomergetimage`);
            // const lastDriverId = lastIdResponse.data.driverid;

            // Step 3: Handle dependent operations (PDF upload, email, etc.)
            // addPdf(lastDriverId);
            // licenceSubmit(book.customer);
            handlecheckmaildriver(book.customer)
            setSuccess(true);
            setSuccessMessage(uploadResponse.data.message || "Successfully Added");

            // Reset form and states
            handleCancel();
            setCustomer();
            setRows([]);
            handleList();
        } catch (error) {
            console.error("Error occurred:", error);

            // Error handling
            if (error.response) {
                setError(true);
                setErrorMessage(error.response.data.message || "Failed to add data");
            } else {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        }
    };


    const handleEdit = async () => {
        const { id4, id, Agreement_Image, ...rest } = selectedCustomerData;

        const updatedCustomer = { ...rest };
        try {
            await axios.put(`${apiUrl}/agreementedit/${id}`, updatedCustomer);

            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();
            addPdf();
            // licenceSubmit(updatedCustomer.customer)
            // console.log(updatedCustomer.customer, 'ggggggggggggg');
            setRows([]);
            handleList();
        } catch (error) {
            // console.error("Error occurred:", error);

            if (error.response) {
                setError(true);
                setErrorMessage(error.response.data.message || "Failed to add data");
            } else {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        }

    };
    const handleUpload = async (file) => {

        const customer = selectedCustomerData.customer

        // console.log(customer, "values");
        try {
            if (file) {
                const formData = new FormData();
                formData.append("Agreement_Image", file);

                await axios.post(`${apiUrl}/agreementpdf_Documents/${customer}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            }
        } catch (error) {
            // console.error("Error occurred:", error);

            if (error.response) {
                setError(true);
                setErrorMessage(error.response.data.message || "Failed to add data");
            } else {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        }
    }

    // const handleEdit = async () => {
    //     console.log("Editing data...");
    //     const { id4, ...rest } = selectedCustomerData;
    //     if (!id4) {
    //         setError(true);
    //         setErrorMessage("No valid customer ID provided for editing.");
    //         return;
    //     }
    //     const updatedCustomer = { ...rest };
    //     try {
    //         await axios.put(`${apiUrl}/agreementedit/${id4}`, updatedCustomer);
    //         setSuccess(true);
    //         setSuccessMessage("Successfully updated");
    //         handleCancel();
    //         addPdf();
    //         setRows([]);
    //         handleList();
    //     } catch (error) {
    //         if (error.message) {
    //             setError(true);
    //             setErrorMessage("Check your Network Connection");
    //         } else if (error.response) {
    //             setError(true);
    //             setErrorMessage("Failed to Update Data: " + (error.response.data.message || error.message));
    //         } else {
    //             setError(true);
    //             setErrorMessage("An unexpected error occurred: " + error.message);
    //         }
    //     }
    // };

    const handleSelectAll = () => {
        if (selectAll) {
            setDeleteFile([]);
            // setCheckbox([])
        } else {
            const allFiles = allFile.map(img => img.Agreement_Image);
            setDeleteFile(allFiles);
            // setCheckbox(allFiles)
            // setSelectAll(false)
        }
        setSelectAll(!selectAll);
    };


    const handleClick = async (event, actionName, empid) => {
        event.preventDefault();

        if (actionName === 'List') {
            try {
                const response = await axios.get(`${apiUrl}/employees`);
                const data = response.data;
                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed");
                    handleList();
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("No data found");
                }
            }
            catch {
                setError(true);
                setErrorMessage("Failed to Retrive Data");
            }
        }

        else if (actionName === 'Cancel') {
            handleCancel();
            setRows([]);
            handleList();
        }

        else if (actionName === 'Delete') {
            // const { id, ...rest } = selectedCustomerData; // Use only 'id' for delete
            const { id } =selectedCustomerData;
            // console.log(id, "value", selectedCustomerData);

            try {
                await axios.delete(`${apiUrl}/aggreementdeleteid/${id}`); // Pass only 'id' in the endpoint
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);
                handleList(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting data:', error);
                // setSuccess(false);
                // setSuccessMessage("Failed to delete data");
                if (error.response) {
                    setError(true);
                    setErrorMessage(error.response.data.message || "Failed to add data");
                } else {
                    setError(true);
                    setErrorMessage("Check your Network Connection");
                }
            }
        }
        else if (actionName === 'Add') {
            handleAdd()
         


        }
        else if (actionName === 'Edit'){
            handleEdit()
         }
        //  catch {
        //     setError(true);
        //     setErrorMessage("Check your Network Connection");
        // }
    };
    // useEffect(() => {
    //     const fetchOrganizationnames = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/drivernamedrivercreation`);
    //             const data = response.data
    //             setDrivername(data)
    //         }
    //         catch (error) {
    //             console.log(error, "error");
    //         }
    //     };
    //     fetchOrganizationnames()
    // }, [apiUrl])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/TemplateForAgreementMail`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    // console.log("Fetched data:", userDataArray);

                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData); // Ensure key matches exactly
                    }
                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    // }, [apiUrl], [templateMessageData]);
        }, [apiUrl]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/TemplateForAgreementOwnerMail`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    // console.log("Fetched data:", userDataArray);

                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData); // Ensure key matches exactly
                    }
                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    // }, [apiUrl], [templateMessageData]);
        }, [apiUrl]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/organisationdatafordriveremail`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    //   console.log(userDataArray,'userdata');
                    if (userDataArray.length > 0) {
                        setOrganisationSendEmail(userDataArray[0])
                        // setDatatrigger(!datatrigger)
                    } else {
                        setErrorMessage('User data not found.');
                        setError(true);
                    }
                }
            }
            catch {
            }
        };
        fetchData();
    }, [apiUrl]);



    useEffect(() => {
        const fetchOrganizationNames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/Customerdatasfetch`);
                const data = response.data;
                // console.log(data,"customer");
                setOrganizationNames(data);
            } catch (error) {
                console.error("Error fetching organization names:", error);
            }
        };

        fetchOrganizationNames();
    }, [apiUrl]);
    //   console.log(organizationNames,'dghjkkkkkkkkkkkk');


    const handleShowAll = async () => {
        try {
            const response = await fetch(`${apiUrl}/table-for-employee?searchText=${searchText}`);
            const data = await response.json();
            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("successfully listed")
            } else {
                setRows([]);
                setError(true);
                setErrorMessage("no data found")
            }
        }
        // catch {
        //     setError(true);
        //     setErrorMessage("Failed to Retrieve Data")
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
                setErrorMessage("Failed to Retrieve Data: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };

    const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

    const handleClosedeleteDialog = () => {
        setDialogdeleteOpen(false);
    };

    const [imagedata, setImagedata] = useState(null);

    const handleimagedelete = (imageName) => {
        setImagedata(imageName)
        setDialogdeleteOpen(true);
    };

    const handleDocumentDownload = async () => {
        try {
            // Filter selected files
            const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));

            // Download each file
            for (const file of selectedFiles) {
                const response = await axios.get(`${apiUrl}/public/employee_doc/` + file.fileName, {
                    responseType: 'blob', // Important to get a binary response
                });

                // Convert image blob to base64 data URL
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onloadend = () => {
                    const imageDataUrl = reader.result;

                    // Create PDF document
                    const pdf = new jsPDF();

                    // Manually set image width and height
                    const imgWidth = 150; // Set your desired width
                    const imgHeight = 150; // Set your desired height

                    // Get the PDF page dimensions
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();

                    // Calculate x and y positions to center the image
                    const x = (pageWidth - imgWidth) / 2;
                    const y = (pageHeight - imgHeight) / 2;

                    // Add the image with calculated x and y positions
                    pdf.addImage(imageDataUrl, 'JPEG', x, y, imgWidth, imgHeight);

                    // Save PDF file
                    pdf.save(file.fileName + '.pdf');
                    setDialogOpen(false);
                    setDeleteFile([]);
                };
            }
        } catch (error) {
            console.error('Error downloading files:', error);
            // Handle error if needed
        }
    };

    const [deletefile, setDeleteFile] = useState([])

    const handlecheckbox = (fileName) => {
        if (deletefile.includes(fileName)) {
            setDeleteFile(prevDeleteFile => prevDeleteFile.filter(file => file !== fileName));
        } else {
            setDeleteFile(prevDeleteFile => [...prevDeleteFile, fileName]);
            setCheckbox(prevDeleteFile => [...prevDeleteFile, fileName]);
        }
    };

    // const handleContextMenu = () => {
    //     axios.delete(`${apiUrl}/agreementimage-delete/` + imagedata)
    //         .then(res => {
    //             console.log("deleted")
    //             setSuccess(true); 
    //             setSuccessMessage("Successfully Deleted"); 
    //         })
    //         .catch(err => console.log(err))
    //         setError(true); 
    //         setErrorMessage("Failed to delete the image");
    //     setDialogdeleteOpen(false);
    //     setDialogOpen(false);
    // };


    const handleContextMenu = () => {
        if (Array.isArray(deletefile) && deletefile.length > 1) {
            deleteMultipleImage(deletefile);
            return;
        }
        if (imagedata) {
            axios
                .delete(`${apiUrl}/agreementimage-delete/` + imagedata)
                .then(res => {
                    console.log("Deleted successfully:", res.data);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                    setError(false);
                })
                .catch(err => {
                    console.error("Error deleting the image:", err);
                    setError(true);
                    setErrorMessage("Failed to delete the image");
                })
                .finally(() => {
                    setDialogdeleteOpen(false);
                    setDialogOpen(false);
                });
        } else {
            setError(true);
            setErrorMessage("No files selected for deletion");
        }
    };

    const deleteMultipleImage = async (files) => {
        try {
            const response = await axios.post(`${apiUrl}/agreementimage-delete-many`, { files });
            console.log(response.data);

            setSuccess(true);
            setSuccessMessage("All files deleted successfully");
            setDialogdeleteOpen(false);
            setDialogOpen(false);
        } catch (err) {
            console.error("Failed to delete files", err);
            setError(true);
            setErrorMessage("Failed to delete some or all files");
        }
    };



    return {
        selectedCustomerData,
        // selectedCustomerId,
        rows,
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
        setSelectedCustomerData,
        // selectedCustomerData,
        setBook,
        handleRowClick,
        handleAdd,
        setTemplateMessageData,
        templateMessageData,
        hidePopup,
        formData,
        handleDateChange,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        searchText,
        handleenterSearch,
        setSearchText,
        // fromDate,setFromDate,
        handleFileChange,
        // setCustomerPDF,
        handleShowAll,
        organizationNames,
        setOrganizationNames,
        handleSelectAll,
        selectAll,
        allFile,
        handleCloseDialog,
        dialogOpen,
        setFile,
        customer,
        setCustomer,
        isEditMode,
        handleEdit,
        handleContextMenu,
        toDate,
        setTodate,
        handleAutocompleteChange,
        fromdate, setFromdate,
        handleimagedelete,
        checkbox,
        setCheckbox,
        handlecheckbox,
        handleDocumentDownload,
        handleClosedeleteDialog,
        dialogdeleteOpen,
        setError,
        setErrorMessage,
        deletefile,
        loading,
        setLoading, deleteAgreementdata, setDeleteAgreementdata,
        handleUpload, deleteMultipleImage
    };
};

export default useEmployee;