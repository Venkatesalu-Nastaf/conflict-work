import { useState, useEffect } from 'react';
import axios from 'axios';
import { useData1 } from '../../Dashboard/Maindashboard/DataContext';
import { APIURL } from "../../url";
import encryption from '../../dataEncrypt';


const useUserinfo = () => {
    const apiUrl = APIURL;
    const { SetDataTrigUser } = useData1(); // -->  its for context for image
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    const [originalData, setOriginalData] = useState(null);


    const [book, setBook] = useState({
        userid: '',
        username: '',
        // ufirstname: '',
        // ulastname: '',
        mobileno: '',
        email: '',
        designation: '',
        userpassword: '',
        // userconfirmpassword: '',
    });

    const handleUpdate = async (userid) => {
        try {

            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };

            const response = await axios.put(`${apiUrl}/usercreationdataupdate/${selectedCustomerData?.userid || book.userid}`, updatedCustomer);
            // console.log(response, "user response error");

            const dataresponse = response.data.affectedRows
            // console.log(dataresponse, "dataresp", updatedCustomer.username)
            if (dataresponse >= 1) {
                // console.log(dataresponse, "dataresp", updatedCustomer.username)
                localStorage.removeItem("username")
                localStorage.setItem("username", updatedCustomer.username)
                SetDataTrigUser(updatedCustomer.username)
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                setEditMode((prevEditMode) => !prevEditMode);
            }

        }
        catch (err) {
            // console.log(err, "user error");
            
            if (err.message === 'Network Error') {
                setError(true);
                setErrorMessage("Check network connection.");
            }
            else{
                setError(true);
            setErrorMessage("Data Not Update");
            }
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        setSelectedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    // profile image upload--------------------------------------

    // const handleUpload = () => {
    //     const input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = '.pdf, .jpg, .jpeg, .png';
    //     input.onchange = handleFileChange;
    //     input.click();
    // };

    // const handleFileChange = (event) => {
    //     const userid = selectedCustomerData[0]?.userid || book.userid || storeUserId;
    //     const file = event.target.files[0];
    //     if (!file) return;
    //     setSharedData(file.name);
    //     setSelectedImage(file)
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('image', file);
    //         axios.put(`${apiUrl}/userprofileupload/${userid}`, formData)
    //     }
    // };

    const useriddata = localStorage.getItem('useridno');

    useEffect(() => {
        const fetchData = async () => {
            const userid = localStorage.getItem('useridno');
            try {
                if (userid === "undefined") {
                    return;
                }
                const encrtyptedId = encryption(userid)
                // console.log(encrtyptedId,"checking id");               
                const response = await fetch(`${apiUrl}/userdataforuserinfo/${encrtyptedId}`);
                if (response.status === 200) {
                    const userDataArray = await response.json();
                    // console.log(userDataArray,"checking");                  
                    if (userDataArray.length > 0) {
                        setSelectedCustomerData(userDataArray[0]);
                        setBook(userDataArray[0])
                    }
                }
            }
            catch {

            }
        };
        fetchData();
    }, [apiUrl, useriddata]);

    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setInfo(false);
        setWarning(false);
    };

    useEffect(() => {
        if (success || warning || info || error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, warning, error, info]);

    const toggleEditMode = () => {
        if (!editMode) {
            setOriginalData({ ...book })
        } else {
            setBook({ ...originalData })
        }
        setEditMode(!editMode)

    };
    
    return {
        selectedCustomerData,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        setError,
        setErrorMessage,
        warningMessage,
        infoMessage,
        book,
        handleChange,
        hidePopup,
        // selectedImage,
        editMode,
        // handleFileChange,
        toggleEditMode,
        showPasswords,
        handleClickShowPasswords,
        handleClickShowPassword,
        handleMouseDownPassword,
        // handleUpload,
        handleMouseDownPasswords,
        showPassword,
        handleUpdate,
    };
};

export default useUserinfo;