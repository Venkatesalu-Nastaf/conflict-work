import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useData } from '../../../Dashboard/MainDash/Sildebar/DataContext2';
import { APIURL } from "../../../url";
import imageToBase64 from '../../../../helper/imagetoBase64';


const useOrganization = () => {
    const apiUrl = APIURL;
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [rows] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [info, setInfo] = useState(false);
    const { setLogoTrigger } = useData();
    const [dataclose, setDataclose] = useState(false)

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
        contactPhoneNumber: '',
        contactEmail: '',
        location: '',
        website: '',
        employees: '',
        partnershipsAlliances: '',
        pannumber: '',
        gstnumber: '',
        telephone: ''
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
    const handleCancel = async () => {
        setDataclose(true)
    }


    useEffect(() => {
        const fetchData = async () => {
            const organizationname = localStorage.getItem('usercompany');

            try {
                const response = await fetch(`${apiUrl}/organizationdata/${organizationname}`);
                if (response.status === 200) {

                    const userDataArray = await response.json();
                    if (userDataArray.length > 0) {
                        setSelectedCustomerData(userDataArray[0]);
                        setDataclose(false)
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
    }, [apiUrl, dataclose]);




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

    const handleFileChange = async (event) => {
        try {
            const organizationname = localStorage.getItem('usercompany');
            const file = event.target.files[0];
            if (!file) return;

            const base64Format = await imageToBase64(file)
             const response = await axios.put(`${apiUrl}/logo-base64/${organizationname}`, { data: base64Format }, { headers: { 'Content-Type': "application/json" } })

            if (response.status === 200) {
                setLogoTrigger(true)
            }
        } catch (err) {
            console.log(err)
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
        info,
        editMode,
        handleFileChange,
        handleUpload,
        toggleEditMode,
        handleKeyDown,
        handleUpdate,
        handleCancel
    };
};

export default useOrganization;