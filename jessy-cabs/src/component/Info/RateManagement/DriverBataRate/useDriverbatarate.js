import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { APIURL } from "../../../url";

// TABLE START
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "VehicleType", headerName: "Vehicle Type", width: 130 },
    { field: "Duty", headerName: "Duty", width: 130 },
    { field: "ExtraPerDayPrice", headerName: "ExtraPerDayPrice", width: 130 },
    { field: "ExtraHours", headerName: "ExtraHours", width: 130 },
    { field: "ExtraDays", headerName: "ExtraDays", width: 130 },
    { field: "fromdate", headerName: "From_Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "todate", headerName: "To_Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "Bata", headerName: "Bata", width: 130 },
];
// TABLE END

const useDriverbatarate = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
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
    const [isEditMode, setIsEditMode] = useState(false);

    // -------popup--------------------------
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

    ///-------------------------------------------------

    const [book, setBook] = useState({
        Bata: '',
        ExtraPerDayPrice: '',
        ExtraPerHoursPrice: '',
        ExtraDays: '',
        ExtraHours: '',
        Duty: '',
        VehicleType: '',
        todate: '',
        fromdate: '',
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
        setSelectedCustomerData((prevBook) => ({
            ...prevBook,
            [name]: parsedDate,
        }));
    };

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            Bata: '',
            ExtraPerDayPrice: '',
            ExtraPerHoursPrice: '',
            ExtraDays: '',
            ExtraHours: '',
            Duty: '',
            VehicleType: '',
            todate: '',
            fromdate: '',
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
        const VehicleType = book.VehicleType;
        if (!VehicleType) {
            setError(true);
            setErrorMessage("Check your Network Connection");
            return;
        }
        try {
            await axios.post(`${apiUrl}/driverbatarate`, book);
            handleCancel();
            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    const handleEdit = async () => {
        try {

            const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };

            updatedCustomer.fromdate = dayjs(updatedCustomer.fromdate).format('YYYY-MM-DD');
            updatedCustomer.todate = dayjs(updatedCustomer.todate).format('YYYY-MM-DD');

            await axios.put(`${apiUrl}/driverbatarate/${selectedCustomerData.id}`, updatedCustomer);
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
        const handlelist = async () => {
            const response = await axios.get(`${apiUrl}/driverbatarate`);
            const data = response.data;
            setRows(data);
        }
        handlelist();
    }, [apiUrl]);

    const handleClick = async (event, actionName, id) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/driverbatarate`);
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

            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {



                await axios.delete(`${apiUrl}/driverbatarate/${selectedCustomerData.id}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);

            }

            else if (actionName === 'Edit') {
                const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };

                updatedCustomer.fromdate = dayjs(updatedCustomer.fromdate).format('YYYY-MM-DD');
                updatedCustomer.todate = dayjs(updatedCustomer.todate).format('YYYY-MM-DD');

                await axios.put(`${apiUrl}/driverbatarate/${selectedCustomerData.id}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();
                setRows([]);
            }

            else if (actionName === 'Add') {
                handleAdd();
            }
        } catch (err) {
            setError(true);
            setErrorMessage("Check Network Connection");
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
        formData,
        handleDateChange,
        handleAutocompleteChange,
        columns,
        isEditMode,
        handleEdit,
    };
};

export default useDriverbatarate;