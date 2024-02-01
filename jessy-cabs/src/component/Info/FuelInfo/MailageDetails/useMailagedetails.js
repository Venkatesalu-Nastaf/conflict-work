import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from "dayjs";

const columns = [
    { field: "id", headerName: "Sno", width: 70 },
    { field: "VehicleNo", headerName: "Vehicl eNo", width: 130 },
    { field: "VehicleName", headerName: "Vehicle Name", width: 130 },
    { field: "filldate", headerName: "Fill Date", width: 130, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "emptydate", headerName: "Empty Date", width: 150, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: "DriverName", headerName: "Driver Name", width: 130 },
    { field: "FuelPrice", headerName: "Fuel Price", width: 130 },
    { field: "InitialOdometerReading", headerName: "Initial Odometer Reading", width: 130 },
    { field: "FinalOdometerReading", headerName: "Final Odometer Reading", width: 130 },
    { field: "FuelConsumptioninliters", headerName: "Fuel Consumption (in liters)", width: 130 },
];



const useMailagedetails = () => {
    const user_id = localStorage.getItem('useridno');
    const [initialOdometer, setInitialOdometer] = useState(0);
    const [finalOdometer, setFinalOdometer] = useState(0);
    const [fuelConsumption, setFuelConsumption] = useState(0);
    const [mileage, setMileage] = useState(0);
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

    // for page permission

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'User Creation';
                const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch (error) {
                console.error('Error fetching user permissions:', error);
            }
        };

        fetchPermissions();
    }, [user_id]);

    const checkPagePermission = () => {
        const currentPageName = 'User Creation';
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
        VehicleNo: '',
        VehicleName: '',
        filldate: '',
        emptydate: '',
        DriverName: '',
        FuelPrice: '',
        InitialOdometerReading: '',
        FinalOdometerReading: '',
        FuelConsumptioninliters: '',
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
            VehicleNo: '',
            VehicleName: '',
            filldate: '',
            emptydate: '',
            DriverName: '',
            FuelPrice: '',
            InitialOdometerReading: '',
            FinalOdometerReading: '',
            FuelConsumptioninliters: '',
        }));
        setSelectedCustomerData({});
        setFuelConsumption(0);
        setFinalOdometer(0);
        setInitialOdometer(0);
    };
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);
    const handleAdd = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            // const vehiclename = selectedCustomerData.VehicleName;
            const VehicleName = book.VehicleName;
            if (!VehicleName) {
                setError(true);
                setErrorMessage("Check your Value");
                return;
            }
            try {
                const emptydate = selectedCustomerData.emptydate ? dayjs(selectedCustomerData.emptydate) : null || book.emptydate ? dayjs(book.emptydate) : dayjs();
                const filldate = selectedCustomerData.filldate ? dayjs(selectedCustomerData.filldate) : null || book.filldate ? dayjs(book.filldate) : dayjs();
                const updateBook = {
                    ...book,
                    emptydate: emptydate,
                    filldate: filldate,
                };
                await axios.post('http://localhost:8081/fueldetails', updateBook);
                handleCancel();
                setRows([]);
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }
        } else {
            // Display a warning or prevent the action
            setInfo(true);
            setInfoMessage("You do not have permission.");
        }
    };

    const handleClick = async (event, actionName, VehicleNo) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.read) {
                    const response = await axios.get('http://localhost:8081/fueldetails');
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
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://localhost:8081/fueldetails/${selectedCustomerData?.VehicleNo || book.VehicleNo}`);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage("Successfully Deleted");
                    handleCancel();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage("You do not have permission.");
                }
            } else if (actionName === 'Edit') {
                const permissions = checkPagePermission();

                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.VehicleNo === VehicleNo);
                    const emptydate = selectedCustomerData.emptydate ? dayjs(selectedCustomerData.emptydate) : null || book.emptydate ? dayjs(book.emptydate) : dayjs();
                    const filldate = selectedCustomerData.filldate ? dayjs(selectedCustomerData.filldate) : null || book.filldate ? dayjs(book.filldate) : dayjs();
                    const updatedCustomer = {
                        ...selectedCustomer,
                        ...selectedCustomerData,
                        emptydate: emptydate,
                        filldate: filldate,
                    };
                    await axios.put(`http://localhost:8081/fueldetails/${selectedCustomerData?.VehicleNo || book.VehicleNo}`, updatedCustomer);
                    setSuccess(true);
                    setSuccessMessage("Successfully updated");
                    handleCancel();
                    setRows([]);
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

    const calculateMileage = () => {
        const distance =
            (selectedCustomerData?.FinalOdometerReading || finalOdometer) -
            (selectedCustomerData?.InitialOdometerReading || initialOdometer);
        const fuelConsumptionValue = selectedCustomerData?.FuelConsumptioninliters || fuelConsumption;
        const mileageValue = distance / fuelConsumptionValue;
        setMileage(mileageValue);
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
        isFieldReadOnly,
        handleRowClick,
        handleAdd,
        hidePopup,
        formData,
        handleDateChange,
        initialOdometer,
        setInitialOdometer,
        finalOdometer,
        setFinalOdometer,
        fuelConsumption,
        setFuelConsumption,
        calculateMileage,
        mileage,
        columns,
    };
};

export default useMailagedetails;