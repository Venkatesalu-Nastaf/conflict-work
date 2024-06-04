import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";
// import { faMobilePhone } from '@fortawesome/free-solid-svg-icons';


const useEmplyeecreation = () => {
    const apiUrl = APIURL;
    const [showPasswords, setShowPasswords] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [rows, setRows] = useState([]);
    const [actionName] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});


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
        { id: 20, name: 'Dashbord', read: false },
    ];


    const [permissionsData, setPermissionsData] = useState(initialPermissionsData);

    const [readState, setReadState] = useState(false);
    const [newState, setNewState] = useState(false);
    const [modifyState, setModifyState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);


    //-------------------------------------------------------------------------
    // Function to update state based on permissions
    const updatePermissionsState = () => {
        setReadState(checkPermission('read'));
        setNewState(checkPermission('new'));
        setModifyState(checkPermission('modify'));
        setDeleteState(checkPermission('delete'));
    };

    // Function to check if any object in the array has the property set to true
    const checkPermission = (property) => {
        const data = permissionsData.some(permission => permission[property]);
        return data;
    }

    const handleSwitchChange = (permissionType) => () => {

        switch (permissionType) {
            case 'read':
                setReadState(prevState => !prevState);
                break;
            case 'new':
                setNewState(prevState => !prevState);
                break;
            case 'modify':
                setModifyState(prevState => !prevState);
                break;
            case 'delete':
                setDeleteState(prevState => !prevState);
                break;
            default:
                break;
        }

        // Use the corresponding state variable directly based on the permission type
        let newStateValue;
        switch (permissionType) {
            case 'read':
                newStateValue = readState;
                break;
            case 'new':
                newStateValue = newState;
                break;
            case 'modify':
                newStateValue = modifyState;
                break;
            case 'delete':
                newStateValue = deleteState;
                break;
            default:
                break;
        }

        // Update permissions data using the correct state value for the permission type
        setPermissionsData(prevData =>
            prevData.map(permission => ({
                ...permission,
                [permissionType]: !newStateValue
            }))
        );
    };


    //----------------------------------------------------

    const handleCheckboxChange = (index, field) => (event) => {
        if (index === 0 || index === 4 || index === 8 || index === 12 || index === 16) {
            handleMainCheckboxChange(index, field)
        }
        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, i) => {
                if (i === index) {
                    return { ...permission, [field]: checked };
                }
                return permission;
            })
        );
    }

    // its for set main checkbox state 
    const handleMainCheckboxChange = (index, field) => {
        setPermissionsData(prevData => {
            const newState = prevData.map((item, idx) => {
                if (idx >= index && idx < index + 4) {
                    return {
                        ...item,
                        [field]: !item[field]
                    };
                }
                return item;
            });

            const checked = newState[index][field];
            // Set all checkboxes within the range to match the checked state of the main checkbox
            for (let i = index + 1; i < index + 4; i++) {
                newState[i][field] = checked;
            }
            return newState;
        });
    };

    ///----------------------------------------------------

    const [book, setBook] = useState({
        userid: '',
        username: '',
        email: '',
        mobileno: '',
        stationname: '',
        designation: '',
        organizationname: '',
        userpassword: '',
        active: false,
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

            // if (name === 'userpassword') {
            //     setPassword(value);
            // }
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
            email: '',
            mobileno: '',
            stationname: '',
            designation: '',
            organizationname: '',
            userpassword: '',
            active: '',
        }));

        setPermissionsData(initialPermissionsData);
        setReadState(false)
        setDeleteState(false)
        setModifyState(false)
        setNewState(false);
        setIsEditMode(false)
    };

    // add
    const handleAdd = async () => {
        const username = book.username;
        const branchName = book.branchName;
        const designation = book.designation;
        const organisation = book.organizationname
        const active = book.active
        const email = book.email
        const mobileno = book.mobileno
        const password = book.userpassword

        if (!password) {
            setError(true);
            setErrorMessage("Fill password");
            return;
        }

        if (!username) {
            setError(true);
            setErrorMessage("Fill UserName..");
            return;
        }
        if (!email) {
            setError(true);
            setErrorMessage("Fill Email");
            return;
        }
        if (!mobileno) {
            setError(true);
            setErrorMessage("Fill Mobileno");
            return;
        }

        if (!branchName) {
            setError(true);
            setErrorMessage("Fill BranchName..");
            return;
        }

        if (!designation) {
            setError(true);
            setErrorMessage("Fill Designation..");
            return;
        }

        if (!organisation) {
            setError(true);
            setErrorMessage("Fill Organisation..");
            return;
        }


        if (!active) {
            setError(true);
            setErrorMessage("Fill Active..");
            return;
        }



        try {
            const data = { book, permissionsData }
            await axios.post(`${apiUrl}/usercreation-add`, data);
            handleCancel();
            setSuccess(true);
            setSuccessMessage("Successfully Added");
        } catch (error) {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }


    };


    // edit
    const handleEdit = async (userid) => {
        try {

            const username = book.username;
            const branchName = book.stationname;
            const designation = book.designation;
            const organisation = book.organizationname
            const active = book.active
            const email = book.email
            const mobileno = book.mobileno
            const password = book.userpassword


            // console.log("NASTAF Technologies", branchName, "book", book)

            if (!password) {
                setError(true);
                setErrorMessage("Fill password");
                return;
            }

            if (!username) {
                setError(true);
                setErrorMessage("Fill UserName..");
                return;
            }
            if (!email) {
                setError(true);
                setErrorMessage("Fill Email..");
                return;
            }
            if (!mobileno) {
                setError(true);
                setErrorMessage("Fill Mobile..");
                return;
            }

            if (!branchName) {
                setError(true);
                setErrorMessage("Fill BranchName..");
                return;
            }

            if (!designation) {
                setError(true);
                setErrorMessage("Fill Designation..");
                return;
            }

            if (!organisation) {
                setError(true);
                setErrorMessage("Fill Organisation..");
                return;
            }

            if (!active) {
                setError(true);
                setErrorMessage("Fill Active..");
                return;
            }

            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...book };
            const data = { updatedCustomer: updatedCustomer, permissionsData }
            // console.log(data)

            await axios.put(`${apiUrl}/usercreation-edit/${book.userid}`, data);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();

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

                        setError(true);
                        setErrorMessage("No data found");
                    }
                })
            } else if (actionName === 'Cancel') {

                handleCancel();
                handleList();
            } else if (actionName === 'Delete') {

                handleDelete();
                handleList();
            } else if (actionName === 'Edit') {
                handleEdit();
                handleList();
            }
            else if (actionName === 'Add') {
                handleAdd();
                handleList();
            }
        } catch {
            setError(true);
            setErrorMessage("Check your Network Connection");
        }
    };


    // its for notification-----------
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

    useEffect(() => {
        if (actionName === 'List') {
            handleClick(null, 'List');
        }
    });

    const permissiondata = async (userId) => {
        const userid = userId;
        if (userid) {
            try {
                const response = await axios.get(`${apiUrl}/user-permissionget/${userid}`);
                const permissiondata = response?.data;
                if (permissiondata.length > 0) {
                    return permissiondata;
                }
            }
            catch {
            }
        }
        return;
    }

    // to show list automatically
    useEffect(() => {
        handleList();
    }, [apiUrl, handleList]);

    const handleRowClickUser = async (params) => {
        setBook(params)
        console.log("params", params)

        const user_permission = await permissiondata(params.userid);
        if (user_permission?.length > 0) {
            setPermissionsData(user_permission);
        }

        setSelectedCustomerId(params.customerId);
        setIsEditMode(true);
        updatePermissionsState();
    };


    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
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
        handleRowClickUser,
        handleAdd,
        hidePopup,
        handleAutocompleteChange,
        showPasswords,
        handleClickShowPasswords,
        handleMouseDownPasswords,
        isEditMode,
        handleEdit,

        //ffor permission
        permissionsData, handleSwitchChange, handleCheckboxChange, setReadState, readState, newState, modifyState, deleteState,
    };
};

export default useEmplyeecreation;