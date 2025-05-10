import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useData } from '../../../Dashboard/MainDash/Sildebar/DataContext2';
import { APIURL } from "../../../url";
import imageToBase64 from '../../../../helper/imagetoBase64';
import dayjs from "dayjs";

const useOrganization = () => {
    const apiUrl = APIURL;
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    // const [rows] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [warning, setWarning] = useState(false);
    const [warningMessage] = useState({});
    const [info, setInfo] = useState(false);
    const { setLogoTrigger} = useData();
    const [dataclose, setDataclose] = useState(false)

    // Apikey
    const [AddNewKey,setAddNewKey] = useState("");
    const [updateKey,setUpdateKey] = useState("");
    const [allApiKey,setAllApiKey] = useState([]);
    const [selectedApikey,setSelectedApikey] = useState('');
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
        telephone: '',
        Sender_Mail: '',
        EmailApp_Password: '',
        fileName:'',
        BankDetails:""
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
            setErrorMessage("Failed To Add Data");
        }
    };

    const handleUpdate = async () => {
        try {
            
            const updatedCustomer = {...selectedCustomerData };
            // console.log(updatedCustomer, "SELECT ID")
            await axios.put(`${apiUrl}/companyupdate/${updatedCustomer.id}`, updatedCustomer);
            // console.log(updatedCustomer,"checking updation")
            setLogoTrigger(true)
            setSuccess(true);
            setSuccessMessage("Successfully updated");
            setEditMode((prevEditMode) => !prevEditMode);

        }
        catch {
            setError(true);
            setErrorMessage("Failed to Update Data");
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
            // const organizationname = localStorage.getItem('usercompany');

            try {
                // if (!organizationname) return
                const response = await fetch(`${apiUrl}/organizationdata`);
                if (response.status === 200) {

                    const userDataArray = await response.json();

                    if (userDataArray.length > 0) {
                        setSelectedCustomerData(userDataArray[0]);
                        setDataclose(false)
                    } else {
                        // setErrorMessage('User data not found.');
                        // setError(true);
                    }
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
       

            const file = event.target.files[0];
            if (!file) return;

            const base64Format = await imageToBase64(file)
            setSelectedCustomerData((prevBook) => ({
                ...prevBook,
                "fileName":base64Format,
            }))
        //     const response = await axios.put(`${apiUrl}/logo-base64/${organizationname}`, { data: base64Format }, { headers: { 'Content-Type': "application/json" } })

        //     if (response.status === 200) {
        //         setLogoTrigger(true)
        //     }
        // } catch (err) {
        //     console.log(err)
        // }

    };

    //--------------------------------------------

    // Add New Api Key Function
    const handleAddNewAPIKey = async () => {
        try {
          const response = await axios.post(`${apiUrl}/newApiKeyGoogleMap`, {
            ApiKey: AddNewKey,
          });
          console.log(response.data, "Inserted API Key Successfully");
          setAddNewKey('')
        } catch (error) {
          console.log(error, "error");
        }
      };

    //   update Api key
    const handleUpdateApiKey = async()=>{
        const selected_date = dayjs().format("YYYY-MM-DD");
        try{
            const response = await axios.post(`${apiUrl}/selectedApiKeyUpdate`,{
             ApiKey:updateKey,
             selected_date:selected_date
            })
            console.log(response.data,"updateeeeeeeeee");
            setEditMode((prevEditMode) => !prevEditMode);

        }
        catch(error){
            console.log(error,"error");
            
        }
    }
      const handleApiKeyChange = (e)=>{
          setAddNewKey(e.target.value)
      }

      const handleUpdateChange = (e) => {
        setUpdateKey(e.target.value)
        setSelectedApikey(e.target.value)

      }

    //   get all apikey  
    useEffect(()=>{
        const fetchdata = async() =>{
          try{
             const response = await axios.get(`${apiUrl}/getAllApiKeyData`);
             console.log(response.data,"allapidataaaaaaaaaaaaaaaaa");
             const allApiKey = response.data.map(li=>li.ApiKey);
             setAllApiKey(allApiKey)
          }
          catch(error){
            console.log(error);
            
          }
        }
        fetchdata()
    },[apiUrl,AddNewKey])

    // selected api key 
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`${apiUrl}/selectedApiData`);
                console.log(response.data,"selectedapiiiiiiiiiiiii");
                const selectedApi = response.data.map(li=>li.ApiKey);
                setSelectedApikey(selectedApi)
            }
            catch(err){
                console.log(error);
                
            }
        }
        fetchData()
    },[apiUrl,editMode])

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
        handleCancel,
        AddNewKey,
        handleAddNewAPIKey,
        handleApiKeyChange,
        allApiKey,
        handleUpdateChange,
        updateKey,
        handleUpdateApiKey,
        selectedApikey
    };
};

export default useOrganization;