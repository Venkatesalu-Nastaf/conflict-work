// useStationCreation.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../url";

const useStationCreation = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    // const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    //-----------------popup---------------------

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

    //-------------------------------------------------

    const [book, setBook] = useState({
        stationid: '',
        Stationname: '',
        shortname: '',
        active: '',
        ownbranch: '',
        address: '',
        gstno: '',

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

    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            stationid: '',
            Stationname: '',
            shortname: '',
            active: '',
            ownbranch: '',
            address: '',
            gstno: '',

        }));
        setSelectedCustomerData({});
        setRows([]);
        setIsEditMode(false);
    };
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
    }, []);

    const handleAdd = async () => {
        const Stationname = book.Stationname;
        if (!Stationname) {
            setError(true);
            setErrorMessage("Fill Mandatery Fields");
            return;
        }

        try {
            await axios.post(`${apiUrl}/stationcreation`, book);
            handleCancel();
            setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    const handleEdit = async (stationid) => {
        try {
            const selectedCustomer = rows.find((row) => row.stationid === stationid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid || book.stationid}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();

        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    useEffect(() => {
        const handlelist = async () => {

            const response = await axios.get(`${apiUrl}/stationcreation`);
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

    const handleClick = async (event, actionName, stationid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/stationcreation`);
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
            }

            else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid || book.stationid}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);

            }

            else if (actionName === 'Edit') {
                const selectedCustomer = rows.find((row) => row.stationid === stationid);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid || book.stationid}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();
            } else if (actionName === 'Add') {
                handleAdd();
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
        book,
        handleClick,
        handleChange,
        handleRowClick,
        handleAdd,
        hidePopup,
        isEditMode,
        handleEdit,
    };
};

export default useStationCreation;