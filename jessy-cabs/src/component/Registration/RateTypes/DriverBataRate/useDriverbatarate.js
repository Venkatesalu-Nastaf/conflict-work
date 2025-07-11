import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { APIURL } from "../../../url";

// TABLE START
const columns = [
    { field: "id", headerName: "Sno", width: 100 },
    { field: "VehicleType", headerName: "Vehicle Type", width: 160 },
    { field: "Duty", headerName: "Duty", width: 160 },
    { field: "ExtraPerDayPrice", headerName: "ExtraPerDayPrice", width: 160 },
    { field: "ExtraHours", headerName: "ExtraHours", width: 160 },
    { field: "ExtraDays", headerName: "ExtraDays", width: 160 },
    { field: "fromdate", headerName: "From_Date", width: 160, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "todate", headerName: "To_Date", width: 160, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "Bata", headerName: "Bata", width: 160 },
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

    const [loading, setLoading] = useState(false)
    const [isDBRButtonLoading,setisDBRButtonLoading] = useState(false)
    const [islist,setislist] = useState(null)

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
        setisDBRButtonLoading(true)
        try {
            await axios.post(`${apiUrl}/driverbatarate`, book);
            handleCancel();
            setRows([]);
            setSuccess(true);
            setisDBRButtonLoading(false)
            setSuccessMessage("Successfully Added");
            setislist(!islist)
        } catch {
            setError(true);
            setisDBRButtonLoading(false)
            setErrorMessage("Check your Network Connection");
        }
    };


    const handleEdit = async () => {
        setisDBRButtonLoading(true)
        try {

            const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };

            updatedCustomer.fromdate = dayjs(updatedCustomer.fromdate).format('YYYY-MM-DD');
            updatedCustomer.todate = dayjs(updatedCustomer.todate).format('YYYY-MM-DD');

            await axios.put(`${apiUrl}/driverbatarate/${selectedCustomerData.id}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            setisDBRButtonLoading(false)
            handleCancel();
            setRows([]);
            setislist(!islist)

        } catch {
            setError(true);
            setisDBRButtonLoading(false)
            setErrorMessage("Check your Network Connection");
        }
    };

    // useEffect(() => {
    //     const handlelist = async () => {
    //         const response = await axios.get(`${apiUrl}/driverbatarate`);
    //         const data = response.data;
    //         setRows(data);
    //         console.log(data,'Data in driver')
    //     }
    //     handlelist();
    // }, [apiUrl]);

    // useEffect(() => {
    //     const handleList = async () => {
    //         setLoading(true)
    //         try {
    //             const response = await axios.get(`${apiUrl}/driverbatarate`);
    //             const data = response.data;
    //             setRows(data);
    //             // console.log(data, 'Data in driver');
    //             if (data.length > 0) {
    //                 setLoading(false)
    //             }else{
    //                 setLoading(false)
    //             }
    //         } catch (err) {
    //             console.error('Error fetching data:', err); // Handle any errors that occur during the API call
    //             setLoading(false)
    //         }finally {
    //             setLoading(false); // Set loading to false once the request is done, whether successful or not
    //         }
    //     };
    //     handleList();
    // }, [apiUrl]);

    useEffect(() => {
        const handleList = async () => {
            setLoading(true);
            setError(false);  
            setErrorMessage("");  
            
            try {
                const response = await axios.get(`${apiUrl}/driverbatarate`);
                const data = response.data;
    
                // Set rows with the fetched data
                setRows(data);
    
                // Check if data exists and update loading state
                if (data.length > 0) {
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
    
                // Check if it's a network error
                if (err.message === 'Network Error') {
                    setErrorMessage("Check network connection.");
                } else {
                    setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
                }
                
                setError(true);  
            } finally {
                setLoading(false);  
            }
        };
    
        handleList();
    }, [apiUrl,islist]);  
    
    

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
                setislist(!islist)

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
        setLoading,loading,isDBRButtonLoading,setisDBRButtonLoading
    };
};

export default useDriverbatarate;