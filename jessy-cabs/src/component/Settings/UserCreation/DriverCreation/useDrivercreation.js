import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useDrivercreation = () => {

    const user_id = localStorage.getItem('useridno');

    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage,setInfoMessage] = useState({});

    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'Driver Master';
                const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
                setUserPermissions(response.data);
            } catch (error) {
                console.error('Error fetching user permissions:', error);
            }
        };

        fetchPermissions();
    }, [user_id]);

    const checkPagePermission = () => {
        const currentPageName = 'Driver Master';
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
            // If user has read permission, check for    other specific permissions
            if (fieldName === "delete" && !permissions.delete) {
                return true;
            }
            return false;
        }
        return true;
    };

    // TABLE START
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "username", headerName: "User_Name", width: 130 },
        { field: "userpassword", headerName: "Password", width: 130 },
        { field: "viewfor", headerName: "Access", width: 130 },
        { field: "designation", headerName: "Designation", width: 130 },
        { field: "stationname", headerName: "Station", width: 130 },
        { field: "licenseno", headerName: "License No", width: 130 },
        { field: "badgeno", headerName: "Badge No", width: 130 },
        { field: "aadharno", headerName: "Aadhar Card No", width: 130 },
        { field: "licenseexpdate", headerName: "License Exp Date", width: 130 },
        { field: "badgeexpdate", headerName: "Badge Exp Date", width: 130 },
        { field: "active", headerName: "Active", width: 160 },
    ];

    const [book, setBook] = useState({
        userid: '',
        username: '',
        stationname: '',
        designation: '',
        userpassword: '',
        userconfirmpassword: '',
        active: '',
        viewfor: '',
        address1: '',
        licenseno: '',
        basicsalary: '',
        licenseexpdate: '',
        streetno: '',
        esino: '',
        badgeno: '',
        badgeexpdate: '',
        city: '',
        pfno: '',
        durationofyears: '',
        aadharno: '',
    });

    // TABLE END

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
            if (name === 'userpassword') {
                setPassword(value);
            } else if (name === 'userconfirmpassword') {
                setConfirmPassword(value);
            }
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
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            userid: '',
            username: '',
            stationname: '',
            designation: '',
            userpassword: '',
            userconfirmpassword: '',
            active: '',
            viewfor: '',
            address1: '',
            licenseno: '',
            basicsalary: '',
            licenseexpdate: '',
            streetno: '',
            esino: '',
            badgeno: '',
            badgeexpdate: '',
            city: '',
            pfno: '',
            durationofyears: '',
            aadharno: '',
        }));
        setSelectedCustomerData({});
    };

    const handleAdd = async () => {
        const stationname = book.stationname;
        if (password === confirmPassword) {
            setPasswordsMatch(false);
            if (!stationname) {
                setError(true);
                setErrorMessage("Check your Network Connection");
                return;
            }
            const permissions = checkPagePermission();

            if (permissions.read && permissions.new) {
                try {
                    await axios.post('http://localhost:8081/drivercreation', book);
                    handleCancel();
                    setRows([]);
                    validatePasswordMatch();
                    setSuccess(true);
                    setSuccessMessage("Successfully Added");
                } catch (error) {
                    setError(true)
                    setErrorMessage("Check your Network Connection");
                }
            } else {
                // Display a warning or prevent the action
                setInfo(true);
                setInfoMessage("You do not have permission.");
            }
        } else {
            setPasswordsMatch(true);
        }
    };

    const handleClick = async (event, actionName, userid) => {
        event.preventDefault();

        try {
            const permissions = checkPagePermission();

            if (actionName === 'List') {
                if (permissions.read) {
                    const response = await axios.get('http://localhost:8081/drivercreation');
                    const data = response.data;

                    if (data.length > 0) {
                        setRows(data);
                        setSuccess(true);
                        setSuccessMessage('Successfully listed');
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage('No data found');
                    }
                } else {
                    setInfo(true);
                    setInfoMessage('You do not have permission.');
                }
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {
                if (permissions.read && permissions.delete) {
                    await axios.delete(`http://localhost:8081/drivercreation/${selectedCustomerData?.userid || userid}`);
                    setSelectedCustomerData(null);
                    setSuccess(true);
                    setSuccessMessage('Successfully Deleted');
                    handleCancel();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage('You do not have permission.');
                }
            } else if (actionName === 'Edit') {
                if (permissions.read && permissions.modify) {
                    const selectedCustomer = rows.find((row) => row.userid === userid);
                    const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                    await axios.put(`http://localhost:8081/drivercreation/${selectedCustomerData?.userid || userid}`, updatedCustomer);
                    setSuccess(true);
                    setSuccessMessage('Successfully updated');
                    handleCancel();
                    setRows([]);
                } else {
                    setInfo(true);
                    setInfoMessage('You do not have permission.');
                }
            } else if (actionName === 'Add') {
                handleAdd();
            }
        } catch (error) {
            setError(true);
            setErrorMessage('Check your Network Connection');
        }
    };
    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
        setPasswordsMatch(false);
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [error]);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [success]);
    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [warning]);
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [info]);
    useEffect(() => {
        if (passwordsMatch) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [passwordsMatch]);
    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });
    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
        setSelectedCustomerData(customerData);
        setSelectedCustomerId(params.row.customerId);
    }, []);

    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePasswordMatch = () => {
        const password = selectedCustomerData?.userpassword || book.userpassword;
        const confirmPassword = selectedCustomerData?.userconfirmpassword || book.userconfirmpassword;
        setPasswordsMatch(password !== confirmPassword);
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
        handleAutocompleteChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        passwordsMatch,
        columns,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
    };
};

export default useDrivercreation;