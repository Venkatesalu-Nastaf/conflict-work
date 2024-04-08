import { useState, useEffect, useCallback } from 'react';
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
    // const [infoMessage, setInfoMessage] = useState({});
    const { setSharedData, sharedData } = useData();

    // for logo-------------------
    useEffect(() => {
        setSelectedImage(sharedData)
    }, [sharedData])

    //----------------------popup----

    const hidePopup = () => {
        setSuccess(false);
        setWarning(false);
        setInfo(false);
        setError(false);
        setErrorMessage('');
    };

    useEffect(() => {
        if (error || info || warning || success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, warning, info, success]);

    //-----------------------

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
    };

    const handleUpdate = async (organizationname) => {
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
            const organizationname = localStorage.getItem('usercompany');

            try {
                const response = await fetch(`${apiUrl}/organizationdata/${organizationname}`);
                if (response.status === 200) {

                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setSelectedCustomerData(userDataArray[0]);
                    } else {
                        setErrorMessage('User data not found.');
                        setError(true);
                    }
                } else {
                    const timer = setTimeout(fetchData, 50);
                    return () => clearTimeout(timer);
                }
            }
            catch {
            }
        };
        fetchData();
    }, [apiUrl, selectedCustomerData]);




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
        handleAdd,
        hidePopup,
        selectedImage,
        info,
        // infoMessage,
        editMode,
        handleFileChange,
        handleUpload,
        toggleEditMode,
        handleKeyDown,
        handleUpdate
    };
};

export default useOrganization;