import { useState, useEffect, useCallback, useContext } from 'react';
import { PermissionsContext } from '../../../permissionContext/permissionContext';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";

const useVehicleinfo = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [actionName] = useState('');
    const [rows, setRows] = useState([]);
    const [info, setInfo] = useState(false);
    const [toDate, setToDate] = useState(dayjs());
    const [fromDate, setFromDate] = useState(dayjs());
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
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
                        view
                    </Button>
                </Button>
            ),
        },
        { field: "vehicleId", headerName: "Vehicle ID", width: 130 },
        { field: "doadate", headerName: "Atteched Date", width: 130 },
        { field: "vehRegNo", headerName: "Vehicle Reg No", width: 130 },
        { field: "costCenter", headerName: "Cost Center Location", width: 170 },
        { field: "vehType", headerName: "Vehicle Type", width: 130 },
        { field: "owner", headerName: "Owner", width: 90 },
        { field: "mobileNo", headerName: "Mobile No", width: 130 },
        { field: "email", headerName: "Email", width: 130 },
        { field: "yearModel", headerName: "Year Model", width: 130 },
        { field: "insuranceno", headerName: "Insurance No", width: 130 },
        { field: "insduedate", headerName: "Insurance Due Date", width: 150 },
        { field: "licenseno", headerName: "License No", width: 130 },
        { field: "licensebatchno", headerName: "License Batch No", width: 140 },
        { field: "licduedate", headerName: "License Due Date", width: 140 },
        { field: "nationalpermito", headerName: "Notional Permit No", width: 150 },
        { field: "npdate", headerName: "Notional Permit Date", width: 150 },
        { field: "statepermito", headerName: "State Permit No", width: 130 },
        { field: "spdate", headerName: "State Permit Date", width: 130 },
        { field: "rcbookno", headerName: "RC Book No", width: 130 },
        { field: "fcdate", headerName: "FC Date", width: 130 },
        { field: "avgmileage", headerName: "AVG Mileage", width: 130 },
        { field: "driverName", headerName: "Driver Name", width: 130 },
        { field: "tankCap", headerName: "Tank Cap", width: 130 },
        { field: "routeno", headerName: "Route No", width: 130 },
        { field: "remarks", headerName: "Remarks", width: 130 },
        { field: "OwnerType", headerName: "Owner Type", width: 130 },
    ];

    const handleSelectAll = () => {
        if (selectAll) {
            setDeleteFile([]);
            // setCheckbox([])
        } else {
            const allFiles = allFile.map(img => img.fileName);
            setDeleteFile(allFiles);
            // setCheckbox(allFiles)
            setSelectAll(false)
        }
        setSelectAll(prevState => !prevState);
    };
    //to see pdf
    const [allFile, setAllFile] = useState([]);
    const showPdf = (showID) => {
        axios.get(`${apiUrl}/vehicle-docView/${showID}`)
            .then(res => {
                if (res.data.length > 0) {
                    setAllFile(res.data);
                    setDialogOpen(true);
                } else {
                    setError(true);
                    setErrorMessage('No data found');
                }
            })
            .catch()
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleButtonClick = (params) => {
        const { vehicleId } = params.row;
        if (!vehicleId) {
            setError(true);
            setErrorMessage("PLease Enter Booking No");
            return;
        }

        showPdf(vehicleId);
    };

    // for page permission


    //--------------------------------------

    const [userPermissionss, setUserPermissions] = useState({});

    const { userPermissions } = useContext(PermissionsContext);
    // console.log("ratetype ", userPermissions)

    //----------------------------------------

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Supplier Master';
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
        const currentPageName = 'Supplier Master';
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

    const permissions = checkPagePermission();

    const isFieldReadOnly = (fieldName) => {
        if (permissions.read) {
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
    };

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };
    const convertToCSV = (data) => {
        const header = columns.map((column) => column.headerName).join(",");
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "VehicleStatement Reports.csv");
    };
    // const handlePdfDownload = () => {
    //     console.log(rows,'rrrrrr');
    //     const pdf = new jsPDF('Landscape');
    //     pdf.setFontSize(12);
    //     pdf.setFont('helvetica', 'normal');
    //     pdf.text("VehicleStatement Reports", 10, 10);
    // pdf.save("VehicleStatementReports.pdf");

    // }


    const handlePdfDownload = () => {
        const pdf = new jsPDF('p', 'pt', 'letter');
        pdf.setFontSize(16); // Increase font size for the title
        const title = "Vehicle Statement Reports";
        const titleWidth = pdf.getStringUnitWidth(title) * 16; // Calculate title width
        const centerX = (pdf.internal.pageSize.width - titleWidth) / 2; // Calculate center position for title
        pdf.text(title, centerX, 40); // Center the title
        pdf.setFontSize(12); // Reset font size for the data

        // Define the starting position for the data
        let yPos = 70;
        const labelWidth = 200; // Adjust as needed
        const valueWidth = 300; // Adjust as needed
        const lineHeight = 20; // Adjust as needed
        let totalPages = 1; // Initial number of pages

        // Iterate through the data and print labels and values
        rows.forEach((rowData) => {
            // Check if the current row will fit on the current page
            if (yPos + lineHeight > pdf.internal.pageSize.height - 40) {
                // Add a new page if the row won't fit
                pdf.addPage();
                yPos = 70; // Reset yPos for the new page
                totalPages++; // Increment total pages
            }

            // For each row, iterate through the properties of selectedCustomerData
            Object.entries(selectedCustomerData).forEach(([label, value]) => {
                // Skip if the label is 'id' or undefined value
                if (label === 'id' || rowData[label] === undefined) return;

                // Format label and value into a string
                // const text = `${label}: ${rowData[label]}`;

                // Check if the label is 'active'
                if (label === 'active') {
                    // Draw a line below the label 'active'
                    pdf.setDrawColor(0); // Set border color to black
                    pdf.setLineWidth(0.5); // Set border width
                    pdf.line(40, yPos + 15, 40 + labelWidth + valueWidth, yPos + 15);// Draw line
                }

                // Check if the text exceeds the remaining space on the page
                if (yPos + lineHeight > pdf.internal.pageSize.height - 40) {
                    // Add a new page if the text exceeds the remaining space
                    pdf.addPage();
                    yPos = 70; // Reset yPos for the new page
                    totalPages++; // Increment total pages
                }

                // Print label
                pdf.text(label, 40, yPos);

                // Print value next to the label
                pdf.text(rowData[label], 40 + labelWidth, yPos);

                // Move to the next line
                yPos += lineHeight;
            });

            // Add some space between rows
            yPos += lineHeight;
        });

        // Save the PDF file with the calculated number of pages
        pdf.save(`VehicleStatementReports (${totalPages} pages).pdf`);
    };




    // const handlePdfDownload = () => {
    //     // Convert Excel data to CSV format
    //     const csvData = convertToCSV(rows);

    //     // Generate PDF from CSV data
    //     const pdf = new jsPDF('p', 'pt', 'letter');
    //     pdf.setFontSize(12);
    //     pdf.text("Vehicle Statement Reports", 40, 40);

    //     // Parse CSV data to fit the details properly in the PDF
    //     const splitText = pdf.splitTextToSize(csvData, 500);
    //     pdf.text(splitText, 40, 60);

    //     // Save the PDF file
    //     pdf.save("VehicleStatementReports.pdf");
    // };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [info]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const [book, setBook] = useState({
        vehicleId: '',
        doadate: '',
        vehRegNo: '',
        costCenter: '',
        vehType: '',
        owner: '',
        mobileNo: '',
        email: '',
        yearModel: '',
        insuranceno: '',
        insduedate: '',
        licenseno: '',
        licensebatchno: '',
        licduedate: '',
        nationalpermito: '',
        npdate: '',
        avgmileage: '',
        statepermito: '',
        spdate: '',
        financer: '',
        rcbookno: '',
        fcdate: '',
        driverName: '',
        tankCap: '',
        routeno: '',
        remarks: '',
        OwnerType: '',
        active: '',
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            vehicleId: '',
            doadate: '',
            vehRegNo: '',
            costCenter: '',
            vehType: '',
            owner: '',
            mobileNo: '',
            email: '',
            yearModel: '',
            insuranceno: '',
            insduedate: '',
            licenseno: '',
            licensebatchno: '',
            licduedate: '',
            nationalpermito: '',
            npdate: '',
            avgmileage: '',
            statepermito: '',
            spdate: '',
            financer: '',
            rcbookno: '',
            fcdate: '',
            driverName: '',
            tankCap: '',
            routeno: '',
            remarks: '',
            OwnerType: '',
            active: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };

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

    const vehicleID = selectedCustomerData.vehicleId || book.vehicleId;

    // insurence copy-1
    const [insurance, setInsurance] = useState(null);
    const addInsurence_copy = async () => {
        if (insurance !== null) {
            const formData = new FormData();
            formData.append("file", insurance);
            try {
                await axios.post(`${apiUrl}/insurance-pdf/${vehicleID}`, formData)
                setInsurance(null)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
        setInsurance(null);
    };

    // licence copyy---2
    const [licence, setLicence] = useState(null);
    const addLicence_copy = async () => {
        if (licence !== null) {

            const formData = new FormData();
            formData.append("file", licence);
            try {
                await axios.post(`${apiUrl}/licence-pdf/${vehicleID}`, formData);
                setLicence(null)
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
        setLicence(null);
    };

    // nationalPermit copyy---3
    const [nationalPermit, setNationalPermit] = useState(null);
    const addNationalPermit_copy = async () => {
        if (nationalPermit !== null) {

            const formData = new FormData();
            formData.append("file", nationalPermit);
            try {
                await axios.post(`${apiUrl}/nationalPermit-pdf/${vehicleID}`, formData);
                setNationalPermit(null);
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
        setNationalPermit(null);
    };

    // statePermit copyy---4
    const [statePermit, setStatePermit] = useState(null);
    const addStatePermit_copy = async () => {
        if (statePermit !== null) {
            const formData = new FormData();
            formData.append("file", statePermit);
            try {
                await axios.post(`${apiUrl}/statePermit-pdf/${vehicleID}`, formData);
                setStatePermit(null);
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
        setStatePermit(null);
    };

    // rcBook copyy---5
    const [rcBook, setRcbook] = useState(null);
    const addRcBook_copy = async () => {
        if (rcBook !== null) {
            const formData = new FormData();
            formData.append("file", rcBook);
            try {
                await axios.post(`${apiUrl}/rcBook-pdf/${vehicleID}`, formData);
                setRcbook(null);
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
        setRcbook(null);
    };

    // FcCopy copyy---6
    const [fcCopy, setFcCopy] = useState(null);
    const addFcCopy_copy = async () => {
        if (fcCopy !== null) {
            const formData = new FormData();
            formData.append("file", fcCopy);
            try {
                await axios.post(`${apiUrl}/fcCopy-pdf/${vehicleID}`, formData);
                setFcCopy(null);
            }
            catch {
                setError(true);
                setErrorMessage('something wrong');
            }
        } else {
            return
        }
        setFcCopy(null);
    };

    const handleAdd = async () => {
        const permissions = checkPagePermission();

        const vehicleId = book.vehicleId;
        if (!vehicleId) {
            setError(true);
            setErrorMessage("Fill mandatory fields");
            return;
        }

        if (permissions.read && permissions.new) {
            try {
                await axios.post(`${apiUrl}/vehicleinfo`, book);
                handleCancel();

                addFcCopy_copy();
                addRcBook_copy();
                addStatePermit_copy();
                addNationalPermit_copy();
                addLicence_copy();
                addInsurence_copy();

                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };
    const [deletefile, setDeleteFile] = useState([])


    const handlecheckbox = (fileName) => {
        console.log(fileName, ';;;;;;');

        if (deletefile.includes(fileName)) {
            setDeleteFile(prevDeleteFile => prevDeleteFile.filter(file => file !== fileName));
            // setCheckbox(fileName)
        } else {
            setDeleteFile(prevDeleteFile => [...prevDeleteFile, fileName]);
            // setCheckbox(prevDeleteFile => [...prevDeleteFile, fileName]);
        }
    };
    const handleDocumentDownload = async () => {
        try {
            // Filter selected files
            const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));

            // Download each file
            for (const file of selectedFiles) {
                const response = await axios.get(`${apiUrl}/public/vehicle_doc/` + file.fileName, {
                    responseType: 'blob', // Important to get a binary response
                });

                // Convert image blob to base64 data URL
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onloadend = () => {
                    const imageDataUrl = reader.result;

                    // Create PDF document
                    const pdf = new jsPDF();
                    const imgWidth = pdf.internal.pageSize.getWidth();
                    const imgHeight = pdf.internal.pageSize.getHeight();
                    pdf.addImage(imageDataUrl, 'JPEG', 0, 0, imgWidth, imgHeight);

                    // Save PDF file
                    pdf.save(file.fileName + '.pdf');
                };
            }
        } catch (error) {
            console.error('Error downloading files:', error);
            // Handle error if needed
        }
    };
    // in this code file save in downloads

    // const handleDocumentDownload = async () => {
    //     try {
    //         // Filter selected files
    //         const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));

    //         // Download each file
    //         for (const file of selectedFiles) {
    //             const response = await axios.get(`${apiUrl}/public/vehicle_doc/` + file.fileName, {
    //                 responseType: 'blob', // Important to get a binary response
    //             });

    //             // Save the file to the downloads directory
    //             saveAs(response.data, file.fileName);
    //         }
    //     } catch (error) {
    //         console.error('Error downloading files:', error);
    //         // Handle error if needed
    //     }
    // };



    // in this code browser print

    // const handleDocumentDownload = () => {
    //     // Filter selected files
    //     const selectedFiles = allFile.filter((img) => deletefile.includes(img.fileName));

    //     // Open each file URL in a new tab
    //     selectedFiles.forEach((file, index) => {
    //         const url = `${apiUrl}/public/vehicle_doc/${file.fileName}`;
    //         console.log(url);
    //         window.open(url, '_blank');


    //     });
    // };



    const handleEdit = async (vehicleId) => {
        try {
            const permissions = checkPagePermission();

            if (permissions.read && permissions.modify) {
                const selectedCustomer = rows.find((row) => row.vehicleId === vehicleId);
                const updatedCustomer = {
                    ...selectedCustomer,
                    ...selectedCustomerData,
                };
                await axios.put(`${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId || book.vehicleId}`, updatedCustomer);
                handleCancel();

                addFcCopy_copy();
                addRcBook_copy();
                addStatePermit_copy();
                addNationalPermit_copy();
                addLicence_copy();
                addInsurence_copy();

                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Updated");
            } else {
                setInfo(true);
                setInfoMessage("You do not have permission.");
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    const handleClick = async (event, actionName, vehicleId) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.delete) {
                    await axios.delete(`${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId || book.vehicleId}`);
                    setSelectedCustomerData(null);
                    handleCancel();
                    setRows([]);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.vehicleId === vehicleId);
                    const updatedCustomer = {
                        ...selectedCustomer,
                        ...selectedCustomerData,
                    };
                    await axios.put(`${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId || book.vehicleId}`, updatedCustomer);
                    handleCancel();
                    //
                    addFcCopy_copy();
                    addRcBook_copy();
                    addStatePermit_copy();
                    addNationalPermit_copy();
                    addLicence_copy();
                    addInsurence_copy();
                    //
                    setRows([]);
                    setSuccess(true);
                    setSuccessMessage("Successfully Updated");
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    //search funtion
    const handleSearch = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.read) {
            try {
                const response = await fetch(`${apiUrl}/searchvehicleinfo?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`);
                const data = await response.json();
                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("Successfully listed")
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("No data found")
                }
            } catch {
                setError(true);
                setErrorMessage("No data found")
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
    }, []);


    const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

    const handleClosedeleteDialog = () => {
        setDialogdeleteOpen(false);
    };

    const [imagedata, setImagedata] = useState(null);

    //     const handleimagedelete = (imageName) => {
    //         console.log(deletefile, 'fileeee');

    //         if (deletefile.length > 0) {
    //             setImagedata(prevDeleteFile => [...prevDeleteFile, imageName]);

    //             setDialogdeleteOpen(true);
    //             setDeleteFile([]);
    //         }
    // }


    const handleimagedelete = (imageName) => {
        console.log(deletefile, 'fileeee');

        if (deletefile.length > 0) {
            setImagedata(prevDeleteFile => {
                if (!prevDeleteFile || !Array.isArray(prevDeleteFile)) {
                    return [imageName]; // Initialize as array if not already
                }
                return [...prevDeleteFile, imageName]; // Spread if already an array
            });

            setDialogdeleteOpen(true);
            setDeleteFile([]);
        }
    };

    const handleContextMenu = () => {
        try {
            console.log(imagedata, '---------');

            axios.delete(`${apiUrl}/vehicle_documents/` + imagedata)
                .then(() => {
                    setDialogdeleteOpen(false);
                    setDialogOpen(false);
                    setImagedata([]);
                    setDeleteFile([]);
                    setSelectAll(false)
                })
                .catch(error => {
                    console.log(error, 'error');
                });
        } catch (error) {
            console.log(error, 'error');
        }
        setDialogdeleteOpen(false);
        setDialogOpen(false);
        setSelectAll(false)
    };


    return {
        selectedCustomerData,
        rows,
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
        selectedCustomerId,
        handleRowClick,
        isFieldReadOnly,
        handleAdd,
        hidePopup,
        handleDateChange,
        searchText,
        setSearchText,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        handleSearch,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        setInsurance,
        setLicence,
        setNationalPermit,
        setStatePermit,
        setRcbook,
        setFcCopy,
        allFile,
        handleCloseDialog,
        dialogOpen,
        isEditMode,
        handleEdit,
        handleContextMenu, handleimagedelete, handleClosedeleteDialog, dialogdeleteOpen, setError, setErrorMessage,
        handlecheckbox,
        deletefile,
        setDeleteFile,
        setSelectAll,
        selectAll,
        handleSelectAll,
        handleDocumentDownload
    };
};

export default useVehicleinfo;