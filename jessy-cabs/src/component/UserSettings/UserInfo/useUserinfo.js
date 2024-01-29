import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserinfo = () => {

    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [warningMessage] = useState({});
    const [infoMessage] = useState({});

    const storeUserId = localStorage.getItem('useridno'); //for getting userid 


    const [book, setBook] = useState({
        userid: '',
        username: '',
        ufirstname: '',
        ulastname: '',
        mobileno: '',
        email: '',
        designation: '',
        userpassword: '',
        userconfirmpassword: '',
    });

    const handleUpdate = async (userid) => {
        try {
            const selectedCustomer = rows.find((row) => row.userid === userid);
            const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
            await axios.put(`http://localhost:8081/usercreation/${selectedCustomerData?.userid || book.userid}`, updatedCustomer);
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            setEditMode((prevEditMode) => !prevEditMode);
        }
        catch {
            setError(true);
            setErrorMessage("Something went wrong");
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

    useEffect(() => {
        const storedImage = localStorage.getItem('uploadedImage');
        if (storedImage) {
            setSelectedImage(storedImage);
        }
    }, []);

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };
    //file upload
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setSelectedImage(file);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('userid', selectedCustomerData[0]?.userid || book.userid || storeUserId);
        try {
            const response = await axios.post('http://localhost:8081/uploads', formDataUpload);
            const imageUrl = response.data.imageUrl;
            setSelectedImage(imageUrl);
            localStorage.setItem('uploadedImage', imageUrl);
        } catch {
        }
    };
    //end file upload  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userid = localStorage.getItem('useridno');

                if (!userid) {
                    return;
                }
                const response = await fetch(`http://localhost:8081/get-profileimage/${userid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const attachedImageUrls = data.imagePaths.map(path => `http://localhost:8081/images/${path}`);
                setSelectedImage(attachedImageUrls);
            } catch {
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const userid = localStorage.getItem('useridno');
            try {
                const response = await fetch(`http://localhost:8081/userdataforuserinfo/${userid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userDataArray = await response.json();
                if (userDataArray.length > 0) {
                    setSelectedCustomerData(userDataArray[0]);
                } else {
                    setErrorMessage('User data not found.');
                    setError(true);
                }
            } catch {
            }
        };

        fetchData();
    }, []);

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

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);
    };


    return {
        selectedCustomerData,
        error,
        success,
        info,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        infoMessage,
        book,
        handleChange,
        hidePopup,
        selectedImage,
        editMode,
        handleFileChange,
        toggleEditMode,
        showPasswords,
        handleClickShowPasswords,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleUpload,
        handleMouseDownPasswords,
        showPassword,
        handleUpdate,
    };
};

export default useUserinfo;