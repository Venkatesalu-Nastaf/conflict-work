

import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";
import { useData } from '../../../Dashboard/Maindashboard/DataContext';

// Table START
const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "vehicleType", headerName: "Vehicle Type", width: 180 },
    { field: "duty", headerName: "Duty", width: 110 },
    { field: "package", headerName: "Package", width: 110 },
    { field: "Hours", headerName: "Hours", width: 80 },
    { field: "KMS", headerName: "KMS", width: 80 },
    { field: "Rate", headerName: "Rate", width: 80 },
    { field: "extraHours", headerName: "ExtraHours", width: 100 },
    { field: "extraKMS", headerName: "ExtraKMS", width: 100 },
    { field: "PerHour", headerName: "PerHours", width: 110 },
    { field: "PerKMS", headerName: "PerKMS", width: 100 },
    { field: "chtime", headerName: "ChTime", width: 100 },
    // { field: "AKMS", headerName: "AllowKMS", width: 130 },
    { field: "ChKMS", headerName: "ChKMS", width: 100 },
    { field: "Bata", headerName: "Bata", width: 100 },
    { field: "NHalt", headerName: "NightHalt", width: 100 },
];
// TABLE END

const usePackagerateentry = () => {
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
    const [infoMessage, setInfoMessage] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    const [validitydata, setValiditydata] = useState([])
    const [datevalidity, setDatevalidity] = useState()
    const { setOrganizationName } = useData()


    useEffect(() => {
        const fetchOrganizationnames = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ratetype`);
                const data = response.data
                const names = data.map(res => res.ratename)
                setValiditydata(data)
                setOrganizationName(names)
            }
            catch (error) {
                console.log(error, "error");
            }
        };
        fetchOrganizationnames()
    }, [apiUrl, setOrganizationName, validitydata])


    //// popup-----------------------------------------

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
        ratetype: '',
        pricetag: '',
        Validity: '',
        vehicleType: '',
        package: '',
        duty: '',
        Hours: '',
        KMS: '',
        Rate: '',
        PerHour: '',
        PerKMS: '',
        extraHours: '',
        extraKMS: '',
        UptoHours: '',
        AKMS: '',
        NHalt: '',
        Bata: '',
        chtime: '',
        ChKMS: '',
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

        if (name === "pricetag") {
            getStartEndTimesByRateName(selectedOption)

        }
    };

    function getStartEndTimesByRateName(rateName) {
        const filteredData = validitydata?.filter(item => item.ratename === rateName);
        const datas = filteredData?.map(item => ({
            startdate: item.starttime,
            enddate: item.closetime
        }));

        setDatevalidity(datas[0])
    }









    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            ratetype: '',
            pricetag: '',
            package: '',
            Validity: '',
            vehicleType: '',
            duty: '',
            Hours: '',
            KMS: '',
            Rate: '',
            PerHour: '',
            PerKMS: '',
            extraHours: '',
            extraKMS: '',
            UptoHours: '',
            AKMS: '',
            NHalt: '',
            Bata: '',
            ChKMS: '',
            chtime: '',
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
        const duty = book.duty;
        if (!duty) {
            setError(true);
            setErrorMessage("Check your Network Connection");
            return;
        }
        try {
            await axios.post(`${apiUrl}/ratemanagement`, book);
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
        const handleList = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ratemanagement`);
                const data = response.data;
                setRows(data);
            } catch {
            }
        }
        handleList();
    }, [apiUrl]);

    const handleEdit = async () => {
        try {
            const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`${apiUrl}/ratemanagement/${selectedCustomerData.id}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();
            setRows([]);

        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    const handleClick = async (event, actionName, duty) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const response = await axios.get(`${apiUrl}/ratemanagement`);
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
            }

            else if (actionName === 'Delete') {
                await axios.delete(`${apiUrl}/ratemanagement/${selectedCustomerData.id}`);
                setSelectedCustomerData(null);
                setSuccess(true);
                setSuccessMessage("Successfully Deleted");
                handleCancel();
                setRows([]);
            }

            else if (actionName === 'Edit') {
                const selectedCustomer = rows.find((row) => row.id === selectedCustomerData.id);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                await axios.put(`${apiUrl}/ratemanagement/${selectedCustomerData.id}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                handleCancel();
                setRows([]);
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
        columns,
        isEditMode,
        handleEdit,
        datevalidity
    };
};

export default usePackagerateentry;