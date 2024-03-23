import { useState, useEffect, useCallback, useContext } from 'react';
import { PermissionsContext } from '../../../permissionContext/permissionContext';
import axios from 'axios';
import { useData } from '../../../Dashboard/MainDash/Sildebar/DataContext2';
import { APIURL } from "../../../url";

const useOrganization = () => {
    const apiUrl = APIURL;
    // const user_id = localStorage.getItem('useridno');
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [info, setInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState({});
    const { setSharedData, sharedData } = useData();




    useEffect(() => {
        console.log("1234555", sharedData)
        setSelectedImage(sharedData)
    }, [sharedData])


    //--------------------------------------


    const [userPermissionss, setUserPermissions] = useState({});

    const { userPermissions } = useContext(PermissionsContext);
    // console.log("ratetype ", userPermissions)

    //----------------------------------------

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const currentPageName = 'User Creation';
                // const response = await axios.get(`${apiUrl}/user-permi/${user_id}/${currentPageName}`);
                // setPermi(response.data);

                const permissions = await userPermissions.find(permission => permission.page_name === currentPageName);
                // console.log("org ", permissions)
                setUserPermissions(permissions);

            } catch {
            }
        };
        fetchPermissions();
    }, [userPermissions]);

    //---------------------------------------


    const checkPagePermission = () => {
        const currentPageName = 'User Creation';
        const permissions = userPermissionss || {};
        // console.log('aaaaaaaa', permissions)

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





    const isFieldReadOnly = (fieldName) => {
        const permissions = checkPagePermission();
        if (permissions.read) {
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
    useEffect(() => {
        if (info) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [info]);

    const handleKeyDown = useCallback(async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            try {
                const filterValue = event.target.value;
                const response = await axios.get(`${apiUrl}/usercreation?filter=${filterValue}`);
                const bookingDetails = response.data;
                if (Array.isArray(bookingDetails) && bookingDetails.length > 0) {
                    setBook(bookingDetails[0]);
                    setSelectedCustomerData(bookingDetails[0]);
                } else {
                }
            } catch {
            }
        }
    }, [apiUrl]);

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
                await axios.post(`${apiUrl}/addcompany`, book);
                setSuccess(true);
                setSuccessMessage("Organization Added Successfully");
            } catch {
                setError(true);
                setErrorMessage("Something went wrong");
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
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
                await axios.put(`${apiUrl}/companyupdate/${decode}`, updatedCustomer);
                setSuccess(true);
                setSuccessMessage("Successfully updated");
                setEditMode((prevEditMode) => !prevEditMode);
            }
            catch {
                setError(true);
                setErrorMessage("Something went wrong");
            }
        } else {
            setInfo(true);
            setInfoMessage("You do not have permission.");
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



    useEffect(() => {
        const fetchData = async () => {
            // const encoded = localStorage.getItem('usercompany');
            // localStorage.setItem('usercompanyname', encoded);
            // const storedcomanyname = localStorage.getItem('usercompanyname');

            // const organizationname = decodeURIComponent(storedcomanyname);
            // console.log(encoded, storedcomanyname, organizationname, "data 2local storage", storedcomanyname)


            const organizationname = localStorage.getItem('usercompany');
            // console.log(organizationname, "orggggg")

            try {
                const response = await fetch(`${apiUrl}/organizationdata/${organizationname}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userDataArray = await response.json();
                if (userDataArray.length > 0) {
                    console.log(userDataArray, "data fetch")
                    setSelectedCustomerData(userDataArray[0]);
                } else {

                }
            } catch {

            }
        };
        fetchData();
    }, [apiUrl, sharedData]);


    const hidePopup = () => {
        setSuccess(false);
        setWarning(false);
        setInfo(false);
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

    // logo image upload--------------------------------------

    const handleUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf, .jpg, .jpeg, .png';
        input.onchange = handleFileChange;
        input.click();
    };



    const handleFileChange = (event) => {

        try {
            const organizationname = localStorage.getItem('usercompany');
            const file = event.target.files[0];
            if (!file) return;
            console.log("organisa", organizationname)
            setSharedData(file.name);
            // setSelectedImage(file)

            if (file && organizationname !== "undefined") {
                // console.log("0", organizationname)
                const formData = new FormData();
                formData.append('image', file);
                axios.put(`${apiUrl}/logo-upload/${organizationname}`, formData)
            }
        } catch (err) {
            // console.log(err)
        }

    };

    //--------------------------------------------

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
        info,
        infoMessage,
        editMode,
        handleFileChange,
        handleUpload,
        toggleEditMode,
        handleKeyDown,
        handleUpdate
    };
};

export default useOrganization;