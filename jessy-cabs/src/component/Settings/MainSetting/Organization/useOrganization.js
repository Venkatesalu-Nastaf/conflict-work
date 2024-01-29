import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useOrganization = () => {

    const user_id = localStorage.getItem('useridno');

    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);

    // const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState({});

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



    const [book, setBook] = useState({
        organizationname: '',
        organizationtype: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        contactPhoneNumber: '',
        contactEmail: '',
        location: '',
        website: '',
        ownershipLeadership: '',
        productsServices: '',
        marketPresence: '',
        employees: '',
        legalStructure: '',
        customerBase: '',
        partnershipsAlliances: '',
        recentNewsDevelopments: '',
        pannumber: '',
        gstnumber: '',
        socialMediaPresence: '',
        sustainabilityCSR: '',
        customerReviewsFeedback: '',
        industrySpecificDetails: '',
    });


    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);


    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const filterValue = event.target.value;
                const response = await axios.get(`http://localhost:8081/usercreation?filter=${filterValue}`);
                const bookingDetails = response.data;
                if (Array.isArray(bookingDetails) && bookingDetails.length > 0) {
                    setBook(bookingDetails[0]);
                    setSelectedCustomerData(bookingDetails[0]);
                } else {
                }
            } catch {
            }
        }
    }, []);

    const handleAdd = async () => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.new) {
            const name = selectedCustomerData?.organizationname || book.organizationname;
            if (!name) {
                setError(true);
                setErrorMessage("fill mantatory fields");
                return;
            }
            try {
                await axios.post('http://localhost:8081/addcompany', book);
                setSuccess(true);
                setSuccessMessage("Organization Added Successfully");
            } catch {
                setError(true);
                setErrorMessage("Something went wrong");
            }
        } else {
            setWarning(true);
            setWarningMessage("You do not have permission.");
        }
    };


    const handleUpdate = async (organizationname) => {
        const permissions = checkPagePermission();

        if (permissions.read && permissions.modify) {
            try {
                const selectedCustomer = rows.find((row) => row.organizationname === organizationname);
                const updatedCustomer = { ...selectedCustomer, ...selectedCustomerData };
                const companyname = encodeURIComponent(selectedCustomerData?.organizationname) || encodeURIComponent(book.organizationname);
                const encode = companyname;
                const decode = decodeURIComponent(encode);
                await axios.put(`http://localhost:8081/companyupdate/${decode}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                setEditMode((prevEditMode) => !prevEditMode);
            }
            catch {
                setError(true);
                setErrorMessage("Something went wrong");
            }
        } else {
            setWarning(true);
            setWarningMessage("You do not have permission.");
        }
    };


    const handleChange = (event) => {
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
        const companyname = localStorage.getItem('usercompany');
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('organizationname', selectedCustomerData?.organizationname || book.organizationname || companyname);
        try {
            const response = await axios.post('http://localhost:8081/uploads', formDataUpload);
            console.log(response);
        } catch {
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const organizationname = localStorage.getItem('usercompany');

                if (!organizationname) {
                    return;
                }
                const response = await fetch(`http://localhost:8081/get-companyimage/${organizationname}`);
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
            const encoded = localStorage.getItem('usercompany');
            localStorage.setItem('usercompanyname', encoded);
            const storedcomanyname = localStorage.getItem('usercompanyname');
            const organizationname = decodeURIComponent(storedcomanyname);
            try {
                const response = await fetch(`http://localhost:8081/organizationdata/${organizationname}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userDataArray = await response.json();
                if (userDataArray.length > 0) {
                    setSelectedCustomerData(userDataArray[0]);
                } else {
                   
                }
            } catch {
               
            }
        };

        fetchData();
    }, []);


    const hidePopup = () => {
        setSuccess(false);
        setError(false);
        setErrorMessage('');
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

    const toggleEditMode = () => {
        setEditMode((prevEditMode) => !prevEditMode);
    };

    return {
        selectedCustomerData,
        error,
        success,
        warning,
        successMessage,
        errorMessage,
        warningMessage,
        book,
        handleChange,
        isFieldReadOnly,
        handleAdd,
        hidePopup,
        selectedImage,
        editMode,
        handleFileChange,
        handleUpload,
        toggleEditMode,
        handleKeyDown,
        handleUpdate
    };
};

export default useOrganization;