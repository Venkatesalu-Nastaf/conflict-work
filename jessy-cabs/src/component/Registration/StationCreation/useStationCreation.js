// useStationCreation.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../url";
import dayjs from 'dayjs';

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
    const [warningMessage, setWarningMessage] = useState({});
    const [getMainBrachDetails, setGetMainBranchDetails] = useState('');
    const [loading, setLoading] = useState(false)
    // const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [cerendentialdata, setCredentialData] = useState()

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
        // stationid: '',
        Stationname: '',
        shortname: '',
        state: '',
        active: '',
        ownbranch: '',
        address: '',
        gstno: '',
        created_at: dayjs(),

    });
    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        console.log(name, value, 'mainbranch7777', book?.state);

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
            // stationid: '',
            Stationname: '',
            state: '',
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


    const uniquestation = async (stationname) => {
        // console.log(customerdataname,"namee")
        if (stationname) {

            const response = await axios.get(`${apiUrl}/getcreduniquestationname/${stationname}`)
            const responsedata = response.data;

            // console.log(response,"data")
            // console.log(responsedata?.length,"reeee")

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

    const handleChangeuniquestation = (event) => {
        const { name, value } = event.target;
        const datacrendital = uniquestation(value);
        console.log(datacrendital, "cred")
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


    }
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
        console.log(customerData, "Customer data")
    }, []);

    const handleAdd = async () => {
        const Stationname = book.Stationname;
        if (!Stationname) {
            setWarning(true);
            setWarningMessage("Fill Mandatery Fields");
            return;
        }
        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage(" Station Name Already Exists");
            return;
        }

        try {
            await axios.post(`${apiUrl}/stationcreation`, book);
            handleCancel();
            // setRows([]);
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        }
        // catch {
        //     setError(true);
        //     setErrorMessage("Failed to Add Stations");
        // }
        catch (error) {
            // console.error("Error occurredddddd:", error);

            // Check if there's no response, indicating a network error
            if (error.message) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                console.log(book, 'Datas of stations')
                // console.log('Network error');
            } else if (error.response) {
                setError(true);
                // Handle other Axios errors (like 4xx or 5xx responses)
                setErrorMessage("Failed to Add Stations: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };


    const handleEdit = async () => {
        try {
            // const selectedCustomer = rows.find((row) => row.stationid === stationid);
            // console.log(selectedCustomer,"slecu")
            // const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            const updatedCustomer = { ...selectedCustomerData };

            await axios.put(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();

        }
        //  catch {
        //     setError(true);
        //     setErrorMessage("Failed to Edit StationS");
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
                setErrorMessage("Failed to Edit Stations: " + (error.response.data.message || error.message));
            } else {
                // Fallback for other errors
                setError(true);
                setErrorMessage("An unexpected error occurred: " + error.message);
            }
        }
    };
    // console.log(selectedCustomerData?.state, 'mainbranchstate===',selectedCustomerData);

    // get particular statedetails 
    useEffect(() => {
        const statename = selectedCustomerData?.state;
        if (statename && statename !== "") {
            const fetchData = async () => {
                console.log(statename, 'state22');
                try {
                    const response = await axios.get(`${apiUrl}/getAllStationDetails/${statename}`);
                    console.log(response.data, 'mainbranch');
                    setGetMainBranchDetails(response.data);

                    // Check if response data is empty
                    if (response.data && response.data.length > 0) {
                        const address = response.data[0]?.address;
                        const gst = response.data[0]?.gstno;
                        console.log(address, 'mainbranchaddress');

                        setSelectedCustomerData(prevData => ({
                            ...prevData,
                            address: address,
                            gstno: gst,
                        }));
                    } else {
                        setSelectedCustomerData(prevData => ({
                            ...prevData,
                            address: "",
                            gstno: ""
                        }));
                    }

                } catch (error) {
                    console.log(error, 'error');
                }
            };
            fetchData();
        }
    }, [apiUrl, selectedCustomerData?.state, book?.state]);

    useEffect(() => {
        const handleList = async () => {
            setLoading(true);
            setError(false);
            setErrorMessage("");

            try {
                const response = await axios.get(`${apiUrl}/stationcreation`);
                const data = response.data;

                if (data.length > 0) {
                    const rowsWithUniqueId = data.map((row, index) => ({
                        ...row,
                        id: index + 1,
                    }));
                    setRows(rowsWithUniqueId);
                    setLoading(false);
                } else {
                    setRows([]);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching station creation data:', err);

                if (err.message === 'Network Error') {
                    setErrorMessage("Check network connection.");
                } else {
                    setErrorMessage("Failed to fetch data: " + (err.response?.data?.message || err.message));
                }
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        handleList();
    }, [apiUrl]);

    // useEffect(() => {
    //     const handlelist = async () => {

    //         const response = await axios.get(`${apiUrl}/stationcreation`);
    //         const data = response.data;

    //         if (data.length > 0) {
    //             const rowsWithUniqueId = data.map((row, index) => ({
    //                 ...row,
    //                 id: index + 1,
    //             }));
    //             setRows(rowsWithUniqueId);
    //             // console.log(data, "Station Dtaaaytaa")
    //         } else {
    //             setRows([]);
    //         }
    //     }

    //     handlelist();
    // }, [apiUrl, rows]);


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
                await axios.delete(`${apiUrl}/stationcreation/${selectedCustomerData?.stationid}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);

            }

            else if (actionName === 'Edit') {
                handleEdit()
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch (err) {
            setError(true);
            setErrorMessage("Failed to Retrive data");
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
        cerendentialdata,
        handleChangeuniquestation,
        getMainBrachDetails,
        loading,
        setLoading
    };
};

export default useStationCreation;