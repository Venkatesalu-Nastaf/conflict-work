import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';


// TABLE STRAT
const columns = [
    { field: "id", headerName: "Sno", width: 50 },
    { field: "empid", headerName: "Employe ID", width: 140 },
    { field: "empname", headerName: "Name", width: 130 },
    { field: "empemailid", headerName: "Email", width: 130 },
    { field: "empmobile", headerName: "Mobile", width: 130 },
    { field: "jobroll", headerName: "Job Roll", width: 130 },
    { field: "joiningdate", headerName: "Joining Date", width: 130 },
    { field: "gender", headerName: "Gender", width: 130 },
    { field: "bloodgroup", headerName: "Bloog Group", width: 130 },
    { field: "guardian", headerName: "Guardian", width: 130 },
    { field: "uanid", headerName: "UAN ID", width: 140 },
    { field: "esino", headerName: "ESI NO", width: 140 },
    { field: "fixedsalary", headerName: "Net Salary", width: 130 },
    { field: "licenceno", headerName: "Driving Licence No", width: 140 },
];
// TABLE END

const useEmployee = () => {

    const user_id = localStorage.getItem('useridno');

    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [formData] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage, setWarningMessage] = useState({});
    const [infoMessage] = useState({});

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Employee PayRoll';
                const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch (error) {
                console.error('Error fetching user permissions:', error);
            }
        };

        fetchPermissions();
    }, [user_id]);

    const checkPagePermission = () => {
        const currentPageName = 'Employee PayRoll';
        const permissions = userPermissions || {};

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
        const rows = data.map((row) => columns.map((column) => row[column.field]).join(","));
        return [header, ...rows].join("\n");
    };
    const handleExcelDownload = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "customer_details.csv");
    };
    const handlePdfDownload = () => {
        const pdf = new jsPDF('landscape');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Employee Details", 10, 10);

        // Modify tableData to exclude the index number
        const tableData = rows.map((row) => [
            row['id'],
            row['empid'],
            row['empname'],
            row['empemailid'],
            row['empmobile'],
            row['jobroll'],
            row['joiningdate'],
            row['gender'],
            row['bloodgroup'],
            row['address1'],
            row['aadharcard'],
            row['pancard'],
            row['address2'],
            row['guardian'],
            row['fixedsalary'],
            row['uanid'],
            row['esino'],
            row['uanid']
        ]);
        pdf.autoTable({
            head: [['Sno', 'Employe ID', 'Name', 'Email', 'Mobile', 'Job Roll', 'Joining Date', 'Gender', 'Blood Group', 'Guardian', 'UAN ID', 'ESI NO', 'Net Salary', 'Driving Licence No']],
            body: tableData,
            startY: 20,
            columnWidth: 'auto',
        });

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
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [info]);

    const [book, setBook] = useState({
        empid: '',
        empname: '',
        empemailid: '',
        empmobile: '',
        jobroll: '',
        joiningdate: '',
        gender: '',
        bloodgroup: '',
        address1: '',
        aadharcard: '',
        pancard: '',
        address2: '',
        guardian: '',
        fixedsalary: '',
        uanid: '',
        esino: '',
        licenceno: '',
    });
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            // For checkboxes, update the state based on the checked value
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));
            setSelectedCustomerData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            // For other input fields, update the state based on the value
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
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        setBook((prevBook) => ({
            ...prevBook,
            [name]: formattedDate,
        }));
        setSelectedCustomerData((prevBook) => ({
            ...prevBook,
            [name]: formattedDate,
        }));
    };

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            empid: '',
            empname: '',
            empemailid: '',
            empmobile: '',
            jobroll: '',
            joiningdate: '',
            gender: '',
            bloodgroup: '',
            address1: '',
            aadharcard: '',
            pancard: '',
            address2: '',
            guardian: '',
            fixedsalary: '',
            uanid: '',
            esino: '',
            licenceno: '',
        }));
        setSelectedCustomerData({});
    };

    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);
    const handleAdd = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            const empname = book.empname;
            if (!empname) {
                setError(true);
                setErrorMessage("Check your Employee ID");
                return;
            }
            try {
                await axios.post('http://localhost:8081/employees', book);
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch {

            }
        } else {
            // Display a warning or prevent the action
            setWarning(true);
            setWarningMessage("You do not have permission.");
        }
    };


    const handleClick = async (event, actionName, empid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.read) {
                    const response = await axios.get('http://localhost:8081/employees');
                    const data = response.data;
                    if (data.length > 0) {
                        setRows(data);
                        setSuccess(true);
                        setSuccessMessage("Successfully listed");
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage("No data found");
                    }
                } else {
                    setWarning(true);
                    setWarningMessage("You do not have permission.");
                }
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://localhost:8081/employees/${book.empid || selectedCustomerData.empid}`);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                    handleCancel();
                    setRows([]);
                } else {
                    setWarning(true);
                    setWarningMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.empid === empid);
                    const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                    await axios.put(`http://localhost:8081/employees/${book.empid || selectedCustomerData.empid}`, updatedCustomer);
                    setSuccess(true);
                    setSuccessMessage("Successfully updated");
                    handleCancel();
                    setRows([]);
                } else {
                    setWarning(true);
                    setWarningMessage("You do not have permission.");
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

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };
    //file upload
    const handleFileChange = async (event, documentType) => {
        const file = event.target.files[0];
        if (!file) return;

        const uniqueFileName = `${documentType}_${Date.now()}_${file.name}`;
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('documenttype', book.documenttype || selectedCustomerData.documenttype);
        formDataUpload.append('documenttype', documentType);
        formDataUpload.append('empid', book.empid || selectedCustomerData.empid);
        formDataUpload.append('filename', uniqueFileName);
        try {
            const response = await axios.post('http://localhost:8081/uploads', formDataUpload);
            console.log(response);
        } catch {
        }
    };
    //end file upload


    return {
        selectedCustomerData,
        selectedCustomerId,
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
        isFieldReadOnly,
        handleRowClick,
        handleAdd,
        hidePopup,
        formData,
        handleDateChange,
        handleUpload,
        handleExcelDownload,
        handlePdfDownload,
        columns,
    };
};

export default useEmployee;