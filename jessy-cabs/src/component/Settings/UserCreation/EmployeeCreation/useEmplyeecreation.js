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
                console.log("book123 ", book)

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
            console.log(updatedCustomer, "update c")
            await axios.put(`${apiUrl}/usercreation-edit/${book.userid}`, updatedCustomer);
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

    const handleRowClick = useCallback((params) => {
        const customerData = params.row;
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

    // console.log("roews", rows)
    // console.log("roews", rows[0].username)
    // console.log("roews", rows[0].designation)

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
        handleRowClick,
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
    };
};

export default useEmplyeecreation;