
import { useState, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import { saveAs } from 'file-saver';
import { APIURL } from "../../../url";
import dayjs from "dayjs";

// TABLE

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "driverid", headerName: "Driver ID", width: 130 },
    { field: "ratename", headerName: "Rate Type", width: 130 },
    { field: "active", headerName: "Active", width: 130 },
    { field: "starttime", headerName: "Start Date", width: 230 },
    { field: "closetime", headerName: "Close Date", width: 230 },
];

const useRatype = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [isEditMode, setIsEditMode] = useState(false);
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
    const [warningMessage] = useState({});
    const [infoMessage, setInfoMessage] = useState({});
    const [organizationNames, setOrganizationName] = useState([])


    // handlechange-----------------
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

    //-----------------popup---------------

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


    //---------------------------------------------------

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
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text("Rate Type Details", 10, 10);

        const tableData = rows.map((row) => [
            row['id'],
            row['driverid'],
            row['ratename'],
            row['active'],
            row['starttime'],
            row['closetime']
        ]);

        pdf.autoTable({
            head: [['sno', 'Driver ID', 'Rate Type', 'Active', 'Start Time', 'Close Time']],
            body: tableData,
            startY: 20,
        });

        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'Rate_Type.pdf');
    };



    const [book, setBook] = useState({
        driverid: '',
        stations: '',
        ratename: '',
        validity: '',
        active: '',
        starttime: '',
        closetime: '',
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
    }, [apiUrl, setOrganizationName, organizationNames])
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            driverid: '',
            stations: '',
            ratename: '',
            validity: '',
            active: '',
            starttime: '',
            closetime: '',
        }));
        setSelectedCustomerData({});
        setIsEditMode(false);
    };
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
    }, []);


    const handleAdd = async () => {
        const ratename = book.ratename;
        if (!ratename) {
            setError(true);
            setErrorMessage("Check your Network Connection");
            return;
        }
        try {
            const updatedBook = {
                stations: book.stations || selectedCustomerData.stations,
                ratename: book.ratename || selectedCustomerData.ratename,
                validity: book.validity || selectedCustomerData.validity,
                active: book.active || selectedCustomerData.active,
                starttime: book.starttime || selectedCustomerData.starttime,
                closetime: book.closetime || selectedCustomerData.closetime
            };

            await axios.post(`${apiUrl}/ratetype`, updatedBook);
            handleCancel();
            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    useEffect(() => {
        const handlelist = async () => {

            const response = await axios.get(`${apiUrl}/ratetype`);
            const data = response.data;

            if (data.length > 0) {
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
            } else {
                setRows([]);
            }
        }
        handlelist();
    }, [apiUrl]);

    const handleEdit = async (driverid) => {
        const selectedCustomer = rows.find((row) => row.driverid === driverid);
        const updatedCustomer = {
            driverid: selectedCustomer,
            stations: selectedCustomerData.stations,
            ratename: selectedCustomerData.ratename,
            validity: selectedCustomerData.validity,
            active: selectedCustomerData.active,
            starttime: selectedCustomerData.starttime,
            closetime: selectedCustomerData.closetime
        };
        await axios.put(`${apiUrl}/ratetype/${selectedCustomerData?.driverid || book.driverid}`, updatedCustomer);
        setSuccess(true);
        setSuccessMessage("Successfully updated");
        handleCancel();
        setRows([]);
    };

    const handleClick = async (event, actionName, driverid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/ratetype`);
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
                setRows([]);
            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/ratetype/${selectedCustomerData?.driverid || book.driverid}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);

            } else if (actionName === 'Edit') {

                const selectedCustomer = rows.find((row) => row.driverid === driverid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`${apiUrl}/ratetype/${selectedCustomerData?.driverid || book.driverid}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();
                setRows([]);
            }

            else {
                setInfo(true);
                setInfoMessage("There is some issue.");
            }

        } catch (err) {
            setError(true);
            setErrorMessage("Check your Network Connection");
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
        handleRowClick,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        formData,
        setBook,
        handleExcelDownload,
        handlePdfDownload,
        columns,
        isEditMode,
        handleEdit,
        handleDateChange,
        organizationNames,
    };
};

export default useRatype;