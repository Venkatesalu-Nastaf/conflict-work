import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { APIURL } from "../../../url";


// TABLE START
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "DateTaxFrom", headerName: "From_Date", width: 130 },
    { field: "DateTaxTo", headerName: "To_Date", width: 130 },
    { field: "STax", headerName: "STax", width: 160 },
    { field: "SBCess", headerName: "SBCess", width: 130 },
    { field: "KKCess", headerName: "KK_Cess", width: 130 },
    { field: "STax_Des", headerName: "StaxDes", width: 130 },
    { field: "SBCess_Des", headerName: "SBCessDes", width: 130 },
    { field: "KKCess_Des", headerName: "KKCessDes", width: 130 },
    { field: "taxtype", headerName: "TAX", width: 130 },
];

const useTaxsettings = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [formData] = useState({});
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    // const [infoMessage, setInfoMessage] = useState({});

    //--------------------------------popup------------

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

    //-----------------------------------------------

    const [book, setBook] = useState({
        DateTaxFrom: '',
        DateTaxTo: '',
        STax: '',
        SBCess: '',
        KKCess: '',
        STax_Des: '',
        SBCess_Des: '',
        KKCess_Des: '',
        taxtype: '',
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
            DateTaxFrom: '',
            DateTaxTo: '',
            STax: '',
            SBCess: '',
            KKCess: '',
            STax_Des: '',
            SBCess_Des: '',
            KKCess_Des: '',
            taxtype: '',
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

    //add----
    const handleAdd = async () => {
        try {
            await axios.post(`${apiUrl}/taxsetting`, book);
            handleCancel();
            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    // edit------
    const handleEdit = async (STax) => {
        try {
            const selectedCustomer = rows.find((row) => row.STax === STax);
            const updatedCustomer = {
                ...selectedCustomer,
                ...selectedCustomerData,
            };
            await axios.put(`${apiUrl}/taxsetting/${book.STax || selectedCustomerData.STax}`, updatedCustomer);
            handleCancel();
            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully updated");

        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    useEffect(() => {
        const handlelist = async () => {
            const response = await axios.get(`${apiUrl}/taxsetting`);
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


    const handleClick = async (event, actionName, STax) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/taxsetting`);
                const data = response.data;
                const rowsWithUniqueId = data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setRows(rowsWithUniqueId);
                setSuccess(true);
                setSuccessMessage("Successfully listed");
            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/taxsetting/${selectedCustomerData?.STax || book.STax}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
            }

            else if (actionName === 'Edit') {
                const selectedCustomer = rows.find((row) => row.STax === STax);
                const updatedCustomer = {
                    ...selectedCustomer,
                    ...selectedCustomerData,
                };
                await axios.put(`${apiUrl}/taxsetting/${book.STax || selectedCustomerData.STax}`, updatedCustomer);
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
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
        // infoMessage,
        book,
        handleClick,
        handleChange,
        handleRowClick,
        handleAdd,
        hidePopup,
        formData,
        handleDateChange,
        handleAutocompleteChange,
        columns,
        isEditMode,
        handleEdit,
    };
};

export default useTaxsettings;