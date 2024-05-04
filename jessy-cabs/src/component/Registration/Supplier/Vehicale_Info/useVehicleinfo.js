import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import { APIURL } from "../../../url";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

// import DeleteIcon from "@mui/icons-material/Delete";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";

const useVehicleinfo = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    // const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [actionName] = useState('');
    const [rows, setRows] = useState([]);
    const [rows1, setRows1] = useState([]);
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
    // const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [drivername, setDrivername] = useState([]);
    const [enterPressCount, setEnterPressCount] = useState(0);
    const [edit, setEdit] = useState(false)

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
        { field: "vehiclename", headerName: "Vehicle Name", width: 130 },
        {
            field: "doadate", headerName: "Attached Date", width: 130,

            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),

        },
        { field: "vehRegNo", headerName: "Vehicle Reg No", width: 130 },
        { field: "stations", headerName: "Stations", width: 170 },
        { field: "hiretypes", headerName: "Hire types", width: 170 },
        { field: "vechtype", headerName: "Vehicle Type", width: 130 },
        { field: "fueltype", headerName: "Fuel Type", width: 130 },
        { field: "Groups", headerName: "Groups Type", width: 130 },
        { field: "owner", headerName: "Owner", width: 90 },
        { field: "mobileNo", headerName: "Mobile No", width: 130 },
        { field: "email", headerName: "Email", width: 130 },
        { field: "segement", headerName: "Segment", width: 130 },
        { field: "yearModel", headerName: "Year Model", width: 130 },
        { field: "insuranceno", headerName: "Insurance No", width: 130 },
        {
            field: "insduedate", headerName: "Insurance Due Date", width: 150,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        // { field: "licenseno", headerName: "License No", width: 130 },
        // { field: "licensebatchno", headerName: "License Batch No", width: 140 },
        // { field: "licduedate", headerName: "License Due Date", width: 140 },
        { field: "nationalpermito", headerName: "Notional Permit No", width: 150 },
        {
            field: "npdate", headerName: "Notional Permit Date", width: 150,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        { field: "statepermito", headerName: "State Permit No", width: 130 },
        {
            field: "spdate", headerName: "State Permit Date", width: 130,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        {
            field: "rcbookno", headerName: "RC Book No", width: 130,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        {
            field: "fcdate", headerName: "FC Date", width: 130,
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
        },
        { field: "avgmileage", headerName: "AVG Mileage", width: 130 },
        { field: "driverName", headerName: "Driver Name", width: 130 },
        { field: "tankCap", headerName: "Tank Cap", width: 130 },
        // { field: "routeno", headerName: "Route No", width: 130 },
        // { field: "remarks", headerName: "Remarks", width: 130 },
        // { field: "OwnerType", headerName: "Owner Type", width: 130 },
    ];

    // const actions = [
    //     { icon: <CancelPresentationIcon />, name: "Cancel" },
    //     { icon: <DeleteIcon />, name: "Delete" },
    //     { icon: <ModeEditIcon />, name: "Edit" },
    //     edit ? "" : { icon: <BookmarkAddedIcon />, name: "Add" }
    // ];

    const handleSelectAll = () => {
        if (selectAll) {
            setDeleteFile([]);
        } else {
            const allFiles = allFile.map(img => img.fileName);
            setDeleteFile(allFiles);
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
        // if (!vehicleId) {
        //     setError(true);
        //     setErrorMessage("PLease Enter vehicleId");
        //     return;
        // }

        showPdf(vehicleId);
    };

    //-------popup---------------------
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

    //---------------------------------------


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


    useEffect(() => {
        const fetchOrganizationnames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/drivernamevechicleinfo`);
                const data = response.data
                const names = data.map(res => res.drivername)

                setDrivername(names)


            }
            catch (error) {
                console.log(error, "error");
            }
        };
        fetchOrganizationnames()
    }, [apiUrl])




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


    const [book, setBook] = useState({

        vehiclename: '',
        hiretypes: '',
        vechtype: '',
        fueltype: '',
        Groups: '',
        doadate: dayjs(),
        vehRegNo: '',
        stations: '',
        segement: '',
        // costCenter: '',
        // vehType: '',
        owner: '',
        mobileNo: '',
        email: '',
        yearModel: '',
        insuranceno: '',
        insduedate: '',
        // licenseno: '',
        // licensebatchno: '',
        // licduedate: '',
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
        // routeno: '',
        // remarks: '',
        // OwnerType: '',
        active: 'yes',
    });

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            vehiclename: '',
            hiretypes: '',
            vechtype: '',
            fueltype: '',
            Groups: '',
            doadate: dayjs(),
            vehRegNo: '',
            stations: '',
            segement: '',
            // costCenter: '',
            // vehType: '',
            owner: '',
            mobileNo: '',
            email: '',
            yearModel: '',
            insuranceno: '',
            insduedate: '',
            // licenseno: '',
            // licensebatchno: '',
            // licduedate: '',
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
            // routeno: '',
            // remarks: '',
            // OwnerType: '',
            active: 'yes',

        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
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


    const handleKeyEnter = useCallback(
        async (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                if (enterPressCount === 0) {
                    if (event.target.value !== "") {

                        try {
                            const data = event.target.value
                            // console.log(data,"tar",typeof(data))
                            const response = await axios.get(`${apiUrl}/vechiclenameinfo`, {
                                params: {
                                    vehicletypename: data
                                },
                            });
                            const vehicleData = response.data;

                            setRows1(vehicleData);
                            setSuccess(true)
                            setSuccessMessage("Successfully listed");
                        } catch (error) {
                            setRows1([])
                            setError(true);
                            setSelectedCustomerData({})
                            console.log(error.response.data.error, "enter")
                            setErrorMessage(error.response.data.error);
                        }
                    }
                    else {
                        setRows1([])
                        setSelectedCustomerData({})
                    }
                } else if (enterPressCount === 1) {
                    const selectedRow = rows1[0];
                    if (selectedRow) {
                        setSelectedCustomerData(selectedRow);
                        handleChange({
                            target: { name: "vehiclename", value: selectedRow.vehiclename },
                        });
                    }
                }
                setEnterPressCount((prevCount) => prevCount + 1);
            }
            if (event.target.value === "") {
                setEnterPressCount(0);
            }
        },
        [rows1, enterPressCount, apiUrl, setSelectedCustomerData]
    );




    // insurence copy-1
    const [insurance, setInsurance] = useState(null);
    const addInsurence_copy = async (vehicleid) => {
        if (insurance !== null) {
            const formData = new FormData();
            formData.append("file", insurance);
            try {
                await axios.post(`${apiUrl}/insurance-pdf/${vehicleid}`, formData)
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
    // const [licence, setLicence] = useState(null);
    // const addLicence_copy = async (vechicleid) => {
    //     if (licence !== null) {

    //         const formData = new FormData();
    //         formData.append("file", licence);
    //         try {
    //             await axios.post(`${apiUrl}/licence-pdf/${vechicleid}`, formData);
    //             setLicence(null)
    //         }
    //         catch {
    //             setError(true);
    //             setErrorMessage('something wrong');
    //         }
    //     } else {
    //         return
    //     }
    //     setLicence(null);
    // };

    // nationalPermit copyy---3
    const [nationalPermit, setNationalPermit] = useState(null);
    const addNationalPermit_copy = async (vehicleid) => {
        if (nationalPermit !== null) {
            const formData = new FormData();
            formData.append("file", nationalPermit);
            try {
                await axios.post(`${apiUrl}/nationalPermit-pdf/${vehicleid}`, formData);
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
    const addStatePermit_copy = async (vechicleid) => {
        if (statePermit !== null) {
            const formData = new FormData();
            formData.append("file", statePermit);
            try {
                await axios.post(`${apiUrl}/statePermit-pdf/${vechicleid}`, formData);
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
    const addRcBook_copy = async (vechicleid) => {
        if (rcBook !== null) {
            const formData = new FormData();
            formData.append("file", rcBook);
            try {
                await axios.post(`${apiUrl}/rcBook-pdf/${vechicleid}`, formData);
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
    const addFcCopy_copy = async (vechicleid) => {
        if (fcCopy !== null) {
            const formData = new FormData();
            formData.append("file", fcCopy);
            try {
                await axios.post(`${apiUrl}/fcCopy-pdf/${vechicleid}`, formData);
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


        if (!book.vehiclename) {
            setError(true);
            setErrorMessage("Enter Vehiclename");
            return;

        }
        if (!book.hiretypes) {
            setError(true);
            setErrorMessage("Enter Hiretypes");
            return;

        }
        if (!book.fueltype) {
            setError(true);
            setErrorMessage("Enter Fueltype");
            return;

        }
        if (!book.Groups) {
            setError(true);
            setErrorMessage("Enter Groups");
            return;

        }
        if (!book.vechtype) {
            setError(true);
            setErrorMessage("Choose vehicletype");
            return;

        }
        if (!book.mobileNo) {
            setError(true);
            setErrorMessage("Enter MobileNo");
            return;

        }
        if (!book.driverName) {
            setError(true);
            setErrorMessage(" Choose Drivername");
            return;

        }
        if (!book.vehRegNo) {
            setError(true);
            setErrorMessage("Enter VehicleRegNo");
            return;

        }
        if (!book.stations) {
            setError(true);
            setErrorMessage("Choose Stations");
            return;

        }
        if (!book.owner) {
            setError(true);
            setErrorMessage("Enter The Owner Name");
            return;

        }


        try {
            const data = { ...book }
            await axios.post(`${apiUrl}/vehicleinfo`, data);
            const response = await axios.get(`${apiUrl}/lastvechileinfogetid`);
            const lastvehicleidno = response.data.vehicleId;

            addFcCopy_copy(lastvehicleidno);
            addRcBook_copy(lastvehicleidno);
            addStatePermit_copy(lastvehicleidno);
            addNationalPermit_copy(lastvehicleidno);
            // addLicence_copy(lastvehicleidno);
            addInsurence_copy(lastvehicleidno);
            handleCancel();

            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
    const [deletefile, setDeleteFile] = useState([])


    const handlecheckbox = (fileName) => {
        console.log(fileName, ';;;;;;');

        if (deletefile.includes(fileName)) {
            setDeleteFile(prevDeleteFile => prevDeleteFile.filter(file => file !== fileName));
        } else {
            setDeleteFile(prevDeleteFile => [...prevDeleteFile, fileName]);

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



    const handleEdit = async (vehicleId) => {
        try {
            // const selectedCustomer = rows.find((row) => row.vehicleId === vehicleId);
            const { id, vehicleId, ...restselectedcustomerdata } = selectedCustomerData
            await axios.put(`${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId}`, restselectedcustomerdata);


            addFcCopy_copy(selectedCustomerData.vehicleId);
            addRcBook_copy(selectedCustomerData.vehicleId);
            addStatePermit_copy(selectedCustomerData.vehicleId);
            addNationalPermit_copy(selectedCustomerData.vehicleId);
            // addLicence_copy(selectedCustomerData.vehicleId);
            addInsurence_copy(selectedCustomerData.vehicleId);
            handleCancel();

            setRows1([]);
            setRows([])
            setSuccess(true);
            setSuccessMessage("Successfully Updated");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    const handleClick = async (event, actionName, vehicleId) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {

            }

            else if (actionName === 'Cancel') {
                handleCancel();
                setRows1([]);
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/vehicleinfo/${selectedCustomerData.vehicleId}`);
                setSelectedCustomerData({});
                handleCancel();
                setRows([]);
                setRows1([]);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
            }

            else if (actionName === 'Edit') {
                handleEdit()
            }

            else if (actionName === 'Add') {
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
        try {
            const response = await fetch(`${apiUrl}/searchvehicleinfo?searchText=${searchText}&fromDate=${fromDate}&toDate=${toDate}`);
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
            setErrorMessage("No data found")
        }
    };

    const handleenterSearch = async (e) => {
        if (e.key === "Enter") {

            try {
                const response = await fetch(
                    `${apiUrl}/searchvehicleinfo?searchText=${searchText}`
                );
                const data = await response.json();

                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setSuccess(true);
                    setSuccessMessage("successfully listed");
                } else {
                    setRows([]);
                    setError(true);
                    setErrorMessage("no data found");
                }
            } catch {
                setError(true);
                setErrorMessage("sorry");
            }

        }
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params
        setSelectedCustomerData(customerData);
        handleChange({
            target: { name: "vehiclename", value: customerData.vehiclename },
        });

        setEdit(true)
        setIsEditMode(true);
    }, []);
    const handleRowClick1 = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);

        setEdit(true)
        setIsEditMode(true);
    }, []);


    const [dialogdeleteOpen, setDialogdeleteOpen] = useState(false);

    const handleClosedeleteDialog = () => {
        setDialogdeleteOpen(false);
    };

    const [imagedata, setImagedata] = useState(null);

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
        // infoMessage,
        book,
        handleClick,
        handleChange,
        handleRowClick,
        handleRowClick1,
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
        // setLicence,
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
        handleDocumentDownload, drivername, handleAutocompleteChange, handleKeyEnter, handleenterSearch, rows1, edit,
    };
};

export default useVehicleinfo;