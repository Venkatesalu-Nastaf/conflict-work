import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";





const useEmplyeecreation = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    // const [infoMessage, setInfoMessage] = useState({});


    // TABLE START
    const columns = [
        { field: "id", headerName: "Sno", width: 70 },
        { field: "userid", headerName: "User Id", width: 110 },
        { field: "username", headerName: "User_Name", width: 130 },
        { field: "userpassword", headerName: "Password", width: 130 },
        { field: "active", headerName: "Active", width: 100 },
        { field: "stationname", headerName: "Station", width: 130 },
        // { field: "viewfor", headerName: "Access", width: 130 },
        { field: "designation", headerName: "Designation", width: 150 },
        { field: "organizationname", headerName: "Organization", width: 130 }
    ];


    ////-------------permission --------------------------

    const initialPermissionsData = [

        { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
        { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
        { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
        { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },
        { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
        { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
        { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
        { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },
        { id: 8, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
        { id: 9, name: 'Customer', read: false, new: false, modify: false, delete: false },
        { id: 10, name: 'Supllier', read: false, new: false, modify: false, delete: false },
        { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },
        { id: 12, name: 'SETTING', read: false, new: false, modify: false, delete: false },
        { id: 13, name: 'User Creation', read: false, new: false, modify: false, delete: false },
        { id: 14, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
        { id: 15, name: 'Main Setting', read: false, new: false, modify: false, delete: false },
        { id: 16, name: 'INFO', read: false, new: false, modify: false, delete: false },
        { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
        { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
        { id: 19, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },

    ];


    const [permissionsData, setPermissionsData] = useState(initialPermissionsData);

    const handleSwitchChange = (permissionType) => () => {
        setPermissionsData(prevData =>
            prevData.map(permission => ({
                ...permission,
                [permissionType]: !permission[permissionType],
            }))
        );
    };



    const handleCheckboxChange = (id, field) => (event) => {
        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map(permission => {
                if (permission.id === id) {
                    return { ...permission, [field]: checked };
                }
                return permission;
            })
        );
    };




    ///----------------------------------------------------

    const [book, setBook] = useState({
        userid: '',
        username: '',
        stationname: '',
        designation: '',
        organizationname: '',
        userpassword: '',
        active: '',
    });

    // TABLE END

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        if (type === 'checkbox') {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: checked,
            }));

        } else {
            setBook((prevBook) => ({
                ...prevBook,
                [name]: value,
            }));

            if (name === 'userpassword') {
                setPassword(value);
            }
        }
    };

    const handleAutocompleteChange = (event, value, name) => {
        const selectedOption = value ? value.label : '';
        setBook((prevBook) => ({
            ...prevBook,
            [name]: selectedOption,
        }));

    };

    // crud functions-------------------------------------
    // cancel
    const handleCancel = () => {
        setBook((prevBook) => ({
            ...prevBook,
            userid: '',
            username: '',
            stationname: '',
            designation: '',
            organizationname: '',
            userpassword: '',
            active: '',
        }));
        // setBook({});
        setIsEditMode(false);
        setPermissionsData(initialPermissionsData);
    };

    // add
    const handleAdd = async () => {
        const stationname = book.userid;
        if (password) {
            if (!stationname) {
                setError(true);
                setErrorMessage("Fill mandatory fields");
                return;
            }
            try {

                await axios.post(`${apiUrl}/usercreation-add`, book);
                handleCancel();
                setRows([]);
                // setBook({})
                setSuccess(true);
                setSuccessMessage("Successfully Added");
            } catch (error) {
                setError(true);
                setErrorMessage("Check your Network Connection");
            }

        }
    };


    // edit
    const handleEdit = async (userid) => {
        try {

            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...book };
            const data = { updatedCustomer: updatedCustomer, permissionsData }

            await axios.put(`${apiUrl}/usercreation-edit/${book.userid}`, data);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();
            setRows([]);
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };

    // delete 
    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/usercreation-delete/${book.userid}`);
            setSuccess(true);
            setSuccessMessage("Successfully Deleted");
            handleCancel();
            setRows([]);
        }
        catch (err) {
            setError(true);
            setErrorMessage("Error in deleting");
        }

    }

    // show list
    const handleList = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/usercreation`);
            const data = response.data;
            const rowsWithUniqueId = data.map((row, index) => ({
                ...row,
                id: index + 1,
            }));
            setRows(rowsWithUniqueId);
            return data;
        } catch {
        }
    }, [apiUrl, setRows])

    //------------------------------------------------------

    // to show list automatically
    useEffect(() => {
        handleList();
    }, [apiUrl, handleList]);

    /// list of options ---------------------------------
    const handleClick = async (event, actionName, userid) => {
        event.preventDefault();
        try {
            if (actionName === 'List') {
                handleList().then((showlist) => {

                    if (showlist?.length > 0) {
                        setSuccess(true);
                        setSuccessMessage("Successfully listed");
                    } else {
                        setRows([]);
                        setError(true);
                        setErrorMessage("No data found");
                    }
                })
            } else if (actionName === 'Cancel') {
                handleCancel();
                setRows([]);
            } else if (actionName === 'Delete') {
                handleDelete();
            } else if (actionName === 'Edit') {
                handleEdit();
            }
            else if (actionName === 'Add') {
                handleAdd();
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };
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


    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    const handleRowClickUser = useCallback((params) => {
        setBook(params)
        setSelectedCustomerId(params.customerId);
        setIsEditMode(true);
    }, []);


    const handleRowClick = useCallback((params) => {
        const customerData = params?.row;
        setBook(customerData)
        setSelectedCustomerId(params.row.customerId);
        setIsEditMode(true);
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

    return {

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
        handleRowClick, handleRowClickUser,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        handleMouseDownPassword,
        showPassword,
        handleClickShowPassword,

        columns,
        isEditMode,
        handleEdit,

        //ffor permission
        permissionsData, handleSwitchChange, handleCheckboxChange
    };
};

export default useEmplyeecreation;