import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APIURL } from "../../../url";
import dayjs from 'dayjs';
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
    const [warningMessage, setWarningMessage] = useState({});
    const [templateMessageData, setTemplateMessageData] = useState(null);
    const [organistaionsendmail, setOrganisationSendEmail] = useState([])
    const [cerendentialdata, setCredentialData] = useState()
    const [showPermission, setShowPermission] = useState(true);


    ////-------------permission --------------------------

    // const initialPermissionsData = [

    //     { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
    //     { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
    //     { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
    //     { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },

    //     { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
    //     { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
    //     { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
    //     { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },

    //     { id: 8, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
    //     { id: 9, name: 'Customer', read: false, new: false, modify: false, delete: false },
    //     { id: 10, name: 'Supllier', read: false, new: false, modify: false, delete: false },
    //     { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },

    //     { id: 12, name: 'SETTING', read: false, new: false, modify: false, delete: false },
    //     { id: 13, name: 'User Creation', read: false, new: false, modify: false, delete: false },
    //     { id: 14, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
    //     { id: 15, name: 'Main Setting', read: false, new: false, modify: false, delete: false },

    //     { id: 16, name: 'INFO', read: false, new: false, modify: false, delete: false },
    //     { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
    //     { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
    //     { id: 19, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },
    //     { id: 20, name: 'Dashbord', read: false },
    //     { id: 21, name: 'Map', read: false, new: false, modify: false, delete: false  },
    //     { id: 22, name: 'RealTime', read: false, new: false, modify: false, delete: false  },
    //     { id: 23, name: 'Vehicle', read: false, new: false, modify: false, delete: false  },
    //     { id: 24, name: 'Reminders', read: false, new: false, modify: false, delete: false  },
    //     { id: 25, name: 'History', read: false, new: false, modify: false, delete: false  },
    //     { id: 26, name: 'Records', read: false, new: false, modify: false, delete: false  },
    // ];
    // dummy
    const initialPermissionsData = [

        { id: 0, name: 'BOOKING', read: false, new: false, modify: false, delete: false },
        { id: 1, name: 'Booking', read: false, new: false, modify: false, delete: false },
        { id: 2, name: 'Trip Status', read: false, new: false, modify: false, delete: false },
        { id: 3, name: 'Trip sheet', read: false, new: false, modify: false, delete: false },

        { id: 4, name: 'BILLING', read: false, new: false, modify: false, delete: false },
        { id: 5, name: 'Billing', read: false, new: false, modify: false, delete: false },
        { id: 6, name: 'Transfer', read: false, new: false, modify: false, delete: false },
        { id: 7, name: 'Covering Bill', read: false, new: false, modify: false, delete: false },
        { id: 8, name: 'Reports', read: false, new: false, modify: false, delete: false },

        { id: 9, name: 'REGISTER', read: false, new: false, modify: false, delete: false },
        { id: 10, name: 'Rate Type', read: false, new: false, modify: false, delete: false },
        { id: 11, name: 'Customer', read: false, new: false, modify: false, delete: false },
        { id: 12, name: 'Supllier', read: false, new: false, modify: false, delete: false },
        { id: 13, name: 'Station Creation', read: false, new: false, modify: false, delete: false },
        // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },

        { id: 14, name: 'SETTING', read: false, new: false, modify: false, delete: false },
        { id: 15, name: 'User Creation', read: false, new: false, modify: false, delete: false },
        { id: 16, name: 'Main Setting', read: false, new: false, modify: false, delete: false },

        { id: 17, name: 'INFO', read: false, new: false, modify: false, delete: false },
        // { id: 17, name: 'Rate Management', read: false, new: false, modify: false, delete: false },
        { id: 18, name: 'Mailers', read: false, new: false, modify: false, delete: false },
        { id: 19, name: 'Fuel Info', read: false, new: false, modify: false, delete: false },
        { id: 20, name: 'Employee', read: false, new: false, modify: false, delete: false },
        { id: 21, name: 'Dashboard', read: false },
        // { id: 11, name: 'Employee', read: false, new: false, modify: false, delete: false },
        { id: 22, name: 'Map', read: false, new: false, modify: false, delete: false },
        { id: 23, name: 'RealTime', read: false, new: false, modify: false, delete: false },
        { id: 24, name: 'Vehicle', read: false, new: false, modify: false, delete: false },
        { id: 25, name: 'Reminders', read: false, new: false, modify: false, delete: false },
        { id: 26, name: 'History', read: false, new: false, modify: false, delete: false },
        { id: 27, name: 'Records', read: false, new: false, modify: false, delete: false },
    ];



    const [permissionsData, setPermissionsData] = useState(initialPermissionsData);

    const [readState, setReadState] = useState(false);
    const [newState, setNewState] = useState(false);
    const [modifyState, setModifyState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);


    //-------------------------------------------------------------------------




    const updatePermissionsState = (permissionsData1) => {

        const isReadAllOne = !permissionsData1.some(permission => permission.read === 0);
        const isModifyAllOne = !permissionsData1.some(permission => permission.modify === 0);
        const isNewAllOne = !permissionsData1.some(permission => permission.new === 0);
        const isDeleteAllOne = !permissionsData1.some(permission => permission.delete === 0);


        setReadState(isReadAllOne);
        setNewState(isNewAllOne);
        setModifyState(isModifyAllOne);
        setDeleteState(isDeleteAllOne);
    };


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


    const handleSwitchforthatrow = (id) => (event) => {
        // console.log(id,"iiiiii")
        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, i) => {
                if (i === id) {
                    return {
                        ...permission,
                        read: checked,
                        new: checked,  // Toggles all the fields together
                        modify: checked,
                        delete: checked
                    }
                }
                return permission;
            })
        );
    }

    const handleSwitchforallrows = (id1, id2) => (event) => {
        // console.log(id1, id2, "mainid")


        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, id) => {
                for (let i = id1; i <= id2; i++) {
                    // newState[i][field] = checked;
                    console.log(i, "ll")

                    if (id === i) {
                        return {
                            ...permission,
                            read: checked,
                            new: checked,  // Toggles all the fields together
                            modify: checked,
                            delete: checked
                        }
                    }
                }
                return permission;
            })
        );
    }



    //----------------------------------------------------

    const handleCheckboxChange = (index, field) => (event) => {

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

   

    const handleCheckboxChangealldata = (index1, index2, field) => (event) => {
        
        const { checked } = event.target;
        setPermissionsData(prevData =>
            prevData.map((permission, id) => {
                for (let i = index1; i <= index2; i++) {
                    if (id === i) {
                        return { ...permission, [field]: checked };
                    }
                }
                return permission;
            })
        );
    }
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
        superAdmin: false,
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
            userid: '',
            username: '',
            email: '',
            mobileno: '',
            stationname: '',
            designation: '',
            organizationname: '',
            userpassword: '',
            active: false,
            superAdmin: false
        }));

        setPermissionsData(initialPermissionsData);
        setReadState(false)
        setDeleteState(false)
        setModifyState(false)
        setNewState(false);
        setIsEditMode(false)
    };
    
    useEffect(() => {
        const fetchData = async () => {
            //   const organizationname = localStorage.getItem('usercompany');
            try {
                // if (!organizationname) return
                const response = await fetch(`${apiUrl}/organizationdata`);
                if (response.status === 200) {
                     
                    const userDataArray = await response.json();
                    //   console.log(userDataArray,'userdata');
                    if (userDataArray.length > 0) {
                        setOrganisationSendEmail(userDataArray[0])
                        // setDatatrigger(!datatrigger)
                    } else {
                        setErrorMessage('User data not found.');
                        setError(true);
                    }
                }
            }
            catch {
            }
        };
        fetchData();
    }, [apiUrl]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/TemplateUser--Creation`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    console.log("Fetched data:", userDataArray);
                    
                    if (userDataArray.length > 0) {
                        setTemplateMessageData(userDataArray[0].TemplateMessageData);
                    } else {
                        setErrorMessage('User data not found.');
                        setError(true);
                    }

                } else {
                    console.log("Failed to fetch data, status:", response.status);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [apiUrl]);   
    console.log(templateMessageData,"shh")

    // useEffect(() => {
    //     const fetchTemplateMessage = async () => {
    //         try {
    //             const response = await fetch(`${apiUrl}/TemplateMessage`, {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ templateInfo: 'credential_template' }) // Use an identifier for the specific template
    //             });
    //             if (response.status === 200) {
    //                 const data = await response.json();
    //                 setTemplateMessageData(data); // Assuming this state holds the template message
    //             } else {
    //                 setErrorMessage('Template message not found.');
    //                 setError(true);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching template message:', error);
    //         }
    //     };
    //     fetchTemplateMessage();
    // }, [apiUrl]);


    const uniqueusercreationname = async (usernname) => {
     
        if (usernname) {

            const response = await axios.get(`${apiUrl}/getuniqueusercreationdata/${usernname}`)
            const responsedata = response.data;

      

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
    const handleChangeuniquecreation = (event) => {
        const { name, value } = event.target;
        const datacrendital = uniqueusercreationname(value);
        console.log(datacrendital, "cred")
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));



    }

    // show list
    const handleList = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/usercreation`);
            const data = response.data;

            setRows(data);
            // return data;
        } catch {
        }
    }, [apiUrl])
    useEffect(() => {
        handleList();
    }, [handleList]);


    const handleAdd = async () => {
        const username = book.username;
        const branchName = book.stationname;
        const designation = book.designation;
        const organisation = book.organizationname
        const active = book.active
        const email = book.email
        const mobileno = book.mobileno
        const password = book.userpassword



        if (!password) {
            setWarning(true);
            setWarningMessage("Fill password");
            return;
        }

        if (!username) {
            setWarning(true);
            setWarningMessage("Fill UserName..");
            return;
        }
        if (!email) {
            setWarning(true);
            setWarningMessage("Fill Email");
            return;
        }
        if (!mobileno) {
            setWarning(true);
            setWarningMessage("Fill Mobileno");
            return;
        }

        if (!branchName) {
            setWarning(true);
            setWarningMessage("Fill BranchName..");
            return;
        }

        if (!designation) {
            setWarning(true);
            setWarningMessage("Fill Designation..");
            return;
        }

        if (!organisation) {
            setWarning(true);
            setWarningMessage("Fill Organisation..");
            return;
        }


        if (!active) {
            setWarning(true);
            setWarningMessage("Fill Active..");
            return;
        }

        if (cerendentialdata === true) {
            setWarning(true);
            setWarningMessage(" User Name Already Exists");
            return;
        }



        try {
            const created_at = dayjs().format("YYYY-MM-DD")
            const data = { book, permissionsData, organistaionsendmail,templateMessageData, created_at }
            await axios.post(`${apiUrl}/usercreation-add`, data);
            handleCancel();
            handleList()
            setSuccess(true);
            setSuccessMessage("Successfully Added");
            setCredentialData()

        } catch (error) {
            setError(true);
            setErrorMessage("Failed To Add Data");
        }


    };

    // console.log(permissionsData,"ppp")
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
            const updatedCustomer = { ...selectedCustomer, ...book, };
            const data = { updatedCustomer: updatedCustomer, permissionsData }


            await axios.put(`${apiUrl}/usercreation-edit/${book.userid}`, data);
            handleList()
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            handleCancel();
            // handleList()



        } catch {
            setError(true);
            setErrorMessage("Failed to Update ");
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
            setErrorMessage("Failed to Delete Data");
        }
    }




    //------------------------------------------------------



    /// list of options ---------------------------------
    const handleClick = async (event, actionName, userid) => {
        event.preventDefault();


        if (actionName === 'List') {


            try {
                const response = await axios.get(`${apiUrl}/usercreation`);
                const data = response.data;

                setRows(data);
                setSuccess(true);
                setSuccessMessage("Successfully Listed");

            } catch {
                setError(true);
                setErrorMessage("Failed to Retrive Data ");
            }

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
        console.log("params-user", params)

        const user_permission = await permissiondata(params.userid);
        if (user_permission?.length > 0) {
            setPermissionsData(user_permission);
            updatePermissionsState(user_permission);

        }

        setSelectedCustomerId(params.customerId);
        setIsEditMode(true);
        // updatePermissionsState();
        // setShowPermission(false)
    };


    const handleClickShowPasswords = () => {
        setShowPasswords((show) => !show);
    };

    const handleMouseDownPasswords = (event) => {
        event.preventDefault();
    };

    const handleAutocompleteChangeStationName = (event, newValue, name) => {

        console.log(newValue, "bill")

        setBook((prevBook) => ({
            ...prevBook,
            [name]: newValue,
        }));
        // setSelectedCustomerData((prevData) => ({
        //     ...prevData,
        //     [name]: newValue,
        // }));
    };



    return {

        selectedCustomerId, handleAutocompleteChangeStationName,
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
        handleEdit, handleChangeuniquecreation, cerendentialdata, showPermission, setShowPermission, handleCheckboxChangealldata,

        //ffor permission
        permissionsData, handleSwitchChange, handleCheckboxChange, setReadState, readState, newState, modifyState, deleteState, handleSwitchforthatrow, handleSwitchforallrows
    };
};

export default useEmplyeecreation;